/**
 * 記事の脚注と論点表の出典を、手元の原典テキストと照合する。
 *
 *   pnpm verify:citations
 *
 * - 脚注: `[ラベル](https://scaife.perseus.org/reader/<URN>:<箇所>/) «原文»` の原文が、
 *   原典の該当箇所に含まれているか (途中を「…」で省いた引用は、各部分が順に含まれているか)。
 *   CTS URN のない作品は、出典レジストリの URL を使って `[ラベル](<url>#<箇所>) «原文»` と書く
 * - 論点表 (src/data/claims/*.ts): 出典の箇所が原典に実在するか
 *
 * 原典の場所は環境変数 MYTH_CORPUS (既定は ~/Documents/greek-mythology)。
 * Perseus と First1KGreek の原典は TEI XML から作った txt で、ファイル名は `<URN の作品部分>.txt`。
 * そのほかの原典は、出典レジストリ (src/data/sources.ts) にファイルのパスと形式を書く。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  type LocalFormat,
  SCAIFE_READER,
  sourceUrl,
  type Work,
  works,
} from '../src/data/sources.ts';
import type { ArticleClaims } from '../src/lib/claims.ts';

const ROOT = join(import.meta.dirname, '..');
const CORPUS = process.env.MYTH_CORPUS ?? join(homedir(), 'Documents/greek-mythology');
const CONTENT_DIR = join(ROOT, 'src/content/docs');
const CLAIMS_DIR = join(ROOT, 'src/data/claims');

/**
 * 見出しのうち、箇所の番号として数えるもの (`# Book 1` など)。
 * 原典の TEI XML が CTS の引用単位として宣言している区分に合わせる。
 * 2行目は First1KGreek の断片集と古注、Perseus のエピグラムで使う。
 */
const NUMBERING_HEADINGS = new Set([
  ...['Book', 'Chapter', 'Section', 'Poem'],
  ...['Volume', 'Work', 'Fragment', 'Epigram', 'Epigraph', 'Line', 'Part'],
]);

const errors: string[] = [];
let checkedQuotes = 0;
let checkedClaims = 0;

function listFiles(dir: string, pattern: RegExp): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((name) => pattern.test(name))
    .map((name) => join(dir, name));
}

// ---------- 原典テキスト ----------

const corpusFiles = new Map(
  listFiles(CORPUS, /\.txt$/).map((path) => [
    path
      .split('/')
      .at(-1)
      ?.replace(/\.txt$/, ''),
    path,
  ]),
);

/** 照合する原典。CTS URN、または原典ファイルのパスと形式で指定する。 */
type Source = { urn: string } | { file: string; format: LocalFormat };

function describe(source: Source): string {
  return 'urn' in source ? source.urn : source.file;
}

/** 箇所 (`4.765` など) → 本文 の組を、原典の出てくる順に並べたもの。 */
type Passages = [key: string, text: string][];

function appendPassage(passages: Passages, key: string, text: string): void {
  const last = passages.at(-1);
  if (last && last[0] === key) last[1] += ` ${text}`;
  else passages.push([key, text]);
}

/** TEI XML から作った txt。見出し (`# Book 1`) と韻文の行番号が箇所になる。 */
function parseTei(lines: string[]): Passages {
  const headingPath: (string | undefined)[] = [];
  const passages: Passages = [];
  for (const line of lines) {
    const heading = line.match(/^(#+)\s+(\S+)\s+(\S+)/);
    if (heading) {
      const [, hashes, word, value] = heading;
      if (NUMBERING_HEADINGS.has(word)) {
        headingPath.length = hashes.length - 1;
        headingPath[hashes.length - 1] = value;
      }
      continue;
    }
    if (line.startsWith('#') || line.trim() === '') continue;
    const prefix = headingPath.filter((part) => part !== undefined);
    const verse = line.match(/^\s*(\d+[a-z]?)\s{2}(.*)$/);
    if (verse) appendPassage(passages, [...prefix, verse[1]].join('.'), verse[2]);
    else appendPassage(passages, prefix.join('.'), line.trim());
  }
  return passages;
}

/**
 * DFHG の txt。`--- fragment 22  [典拠]  (FHG p.75)` の行から次の断片までが 1 つの箇所。
 * 同じ番号の断片が複数の典拠で続くときは、1 つの箇所にまとめる。
 */
function parseDfhg(lines: string[]): Passages {
  const passages: Passages = [];
  let fragment: string | undefined;
  for (const line of lines) {
    const start = line.match(/^--- fragment (\S+)/);
    if (start) fragment = start[1];
    else if (fragment && !line.startsWith('#') && line.trim() !== '') {
      appendPassage(passages, fragment, line.replace(/^\[Lat\.\]\s*/, '').trim());
    }
  }
  return passages;
}

const ROMAN_DIGITS: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function romanToNumber(roman: string): number {
  return [...roman].reduce((total, letter, index) => {
    const value = ROMAN_DIGITS[letter] ?? 0;
    return (ROMAN_DIGITS[roman[index + 1] ?? ''] ?? 0) > value ? total - value : total + value;
  }, 0);
}

const MAX_CHAPTER_GAP = 20;

/**
 * 章を「12.」「XII.」で始まる行で区切った txt。節は「3 」「[3] 」で始まる行で区切る。
 * 章の最初の、節の番号がない部分は第 1 節とする。箇所は `12.3` (ローマ数字はアラビア数字に直す)。
 * ローマ数字は、前の章より大きく、差が MAX_CHAPTER_GAP 以内の番号だけを章とみなす
 * (「C. Iulius」のような行を章と取り違えないため。本文の伝わらない章は番号が飛ぶ)。
 */
function parseNumbered(lines: string[]): Passages {
  const passages: Passages = [];
  let chapter = 0;
  let section = '1';
  for (const line of lines) {
    const start = line.match(/^\s*(?:(\d+)|([IVXLCDM]+))\.(?:\s+(.*))?$/);
    const next = start?.[1] ? Number(start[1]) : start?.[2] ? romanToNumber(start[2]) : undefined;
    let text = line.trim();
    if (
      next !== undefined &&
      (start?.[1] || (next > chapter && next <= chapter + MAX_CHAPTER_GAP))
    ) {
      chapter = next;
      section = '1';
      text = start?.[3] ?? '';
    } else {
      const sub = line.match(/^\s*(?:\[(\d+)\]|(\d+))\s+(.*)$/);
      if (sub) {
        section = sub[1] ?? sub[2];
        text = sub[3];
      }
    }
    if (chapter > 0 && text !== '') appendPassage(passages, `${chapter}.${section}`, text);
  }
  return passages;
}

/**
 * Eulogikon の Markdown。本文は「## Text」から次の「## 」まで。
 * 「### 」の見出しが箇所になる。「book 」と括弧の注記は除き、空白は「.」に直す
 * (`### book 1.3` → `1.3`、`### 2 (t)` → `2`、`### 1 5R` → `1.5R`)。
 */
function parseEulogikon(lines: string[]): Passages {
  const passages: Passages = [];
  let inText = false;
  let key: string | undefined;
  for (const line of lines) {
    if (line.startsWith('## ')) inText = line.trim() === '## Text';
    else if (!inText) continue;
    else if (line.startsWith('### ')) {
      key = line
        .slice(4)
        .replace(/^book\s+/, '')
        .replace(/\s*[([].*$/, '')
        .trim()
        .replace(/\s+/g, '.');
    } else if (key && line.trim() !== '') appendPassage(passages, key, line.trim());
  }
  return passages;
}

const LOCAL_PARSERS: Record<LocalFormat, (lines: string[]) => Passages> = {
  dfhg: parseDfhg,
  numbered: parseNumbered,
  eulogikon: parseEulogikon,
};

const passageCache = new Map<string, Passages>();

function loadPassages(source: Source): Passages {
  const cacheKey = describe(source);
  const cached = passageCache.get(cacheKey);
  if (cached) return cached;

  let path: string | undefined;
  if ('urn' in source) {
    const workPart = source.urn.split(':').at(-1) ?? '';
    path = corpusFiles.get(workPart);
    if (!path) throw new Error(`原典ファイルが見つからない: ${workPart}.txt (${CORPUS})`);
  } else {
    path = join(CORPUS, source.file);
    if (!existsSync(path)) throw new Error(`原典ファイルが見つからない: ${path}`);
  }

  const lines = readFileSync(path, 'utf8').split('\n');
  const body = lines.slice(lines.findIndex((line) => /^={10,}$/.test(line)) + 1);
  const passages = 'urn' in source ? parseTei(body) : LOCAL_PARSERS[source.format](body);
  passageCache.set(cacheKey, passages);
  return passages;
}

/** `4.765-803` を始点 `4.765` と終点 `4.803` に分ける。終点の省略された上位の番号は始点から補う。 */
function splitRange(loc: string): [string, string] {
  const [start, end] = loc.split('-');
  if (!end) return [start, start];
  const startParts = start.split('.');
  const endParts = end.split('.');
  return [
    start,
    [...startParts.slice(0, startParts.length - endParts.length), ...endParts].join('.'),
  ];
}

function matchesKey(key: string, ref: string): boolean {
  return key === ref || key.startsWith(`${ref}.`);
}

/** 原典の箇所の本文を返す。見つからなければ undefined。 */
function getPassage(source: Source, loc: string): string | undefined {
  const passages = loadPassages(source);
  const [start, end] = splitRange(loc);
  const from = passages.findIndex(([key]) => matchesKey(key, start));
  const to = passages.findLastIndex(([key]) => matchesKey(key, end));
  if (from === -1 || to === -1 || to < from) return undefined;
  return passages
    .slice(from, to + 1)
    .map(([, text]) => text)
    .join(' ');
}

/** 照合用の正規化。アポストロフィの字形、校訂記号、空白、行区切りの「/」の違いを無視する。 */
function normalize(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[ʼ’'᾽΄]/g, 'ʼ')
    .replace(/[[\]⟨⟩†/]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 引用の各部分 (「…」で区切る) が、本文に順に含まれているか。 */
function containsQuote(passage: string, quote: string): boolean {
  const text = normalize(passage);
  let position = 0;
  for (const piece of quote.split('…').map(normalize).filter(Boolean)) {
    const found = text.indexOf(piece, position);
    if (found === -1) return false;
    position = found + piece.length;
  }
  return true;
}

// ---------- 脚注 ----------

const LINK = /\]\(([^)\s]+)\)/g;
const SCAIFE_REF = /^(urn:cts:[^:]+:[^:]+):([^/]+)\/?$/;

const localWorks = new Map(
  Object.values<Work>(works).flatMap((work) => ('urn' in work ? [] : [[work.url, work]])),
);

/** 脚注のリンク先から、原典と箇所を求める。出典へのリンクでなければ undefined。 */
function resolveLink(url: string): { source: Source; loc: string } | undefined {
  if (url.startsWith(SCAIFE_READER)) {
    const ref = url.slice(SCAIFE_READER.length).match(SCAIFE_REF);
    return ref ? { source: { urn: ref[1] }, loc: ref[2] } : undefined;
  }
  const hash = url.lastIndexOf('#');
  const work = hash === -1 ? undefined : localWorks.get(url.slice(0, hash));
  return work ? { source: work, loc: decodeURIComponent(url.slice(hash + 1)) } : undefined;
}

function verifyFootnote(where: string, definition: string): void {
  const links = [...definition.matchAll(LINK)].flatMap((match) => {
    const resolved = resolveLink(match[1]);
    return resolved ? [{ ...resolved, index: match.index, length: match[0].length }] : [];
  });
  if (links.length === 0) {
    errors.push(`${where}: 脚注に出典 (Scaife Viewer か出典レジストリの URL) へのリンクがない`);
    return;
  }
  links.forEach((link, index) => {
    const { source, loc } = link;
    const ref = `${describe(source)}:${loc}`;
    const segmentEnd = links[index + 1]?.index ?? definition.length;
    const segment = definition.slice(link.index + link.length, segmentEnd);
    const quote = segment.match(/«([^»]+)»/)?.[1];
    if (!quote) {
      errors.push(`${where}: ${loc} の原文 «…» がない`);
      return;
    }
    let passage: string | undefined;
    try {
      passage = getPassage(source, loc);
    } catch (error) {
      errors.push(`${where}: ${(error as Error).message}`);
      return;
    }
    if (passage === undefined) {
      errors.push(`${where}: 箇所 ${ref} が原典にない`);
    } else if (!containsQuote(passage, quote)) {
      errors.push(`${where}: 引用が ${ref} の本文と一致しない\n    引用: ${quote}`);
    }
    checkedQuotes += 1;
  });
}

for (const file of listFiles(CONTENT_DIR, /\.mdx?$/)) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      if (/^\[\^[^\]]+\]:/.test(line)) {
        verifyFootnote(`${relative(ROOT, file)}:${index + 1}`, line);
      }
    });
}

// ---------- 論点表 ----------

for (const file of listFiles(CLAIMS_DIR, /\.ts$/)) {
  const module = (await import(pathToFileURL(file).href)) as { default: ArticleClaims };
  for (const topic of module.default) {
    for (const variant of topic.variants) {
      for (const source of variant.sources) {
        const where = `${relative(ROOT, file)}: ${topic.label} / ${variant.label}`;
        try {
          if (getPassage(works[source.work], source.loc) === undefined) {
            errors.push(`${where}: 箇所 ${sourceUrl(source.work, source.loc)} が原典にない`);
          }
        } catch (error) {
          errors.push(`${where}: ${(error as Error).message}`);
        }
        checkedClaims += 1;
      }
    }
  }
}

for (const error of errors) console.error(`✗ ${error}`);
console.log(`脚注の引用 ${checkedQuotes} 件、論点表の出典 ${checkedClaims} 件を照合した。`);
if (errors.length > 0) {
  console.error(`${errors.length} 件の問題がある。`);
  process.exit(1);
}

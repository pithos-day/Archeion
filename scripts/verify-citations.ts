/**
 * 記事の脚注と論点表の出典を、手元の原典テキストと照合する。
 *
 *   pnpm verify:citations
 *
 * - 脚注: `[ラベル](https://scaife.perseus.org/reader/<URN>:<箇所>/) «原文»` の原文が、
 *   原典の該当箇所に含まれているか (途中を「…」で省いた引用は、各部分が順に含まれているか)
 * - 論点表 (src/data/claims/*.ts): 出典の箇所が原典に実在するか
 *
 * 原典の場所は環境変数 MYTH_CORPUS (既定は ~/Documents/greek-mythology)。
 * 原典は Perseus と First1KGreek の TEI XML から作った txt で、ファイル名は `<URN の作品部分>.txt`。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { scaifeUrl, works } from '../src/data/sources.ts';
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

/** 箇所 (`4.765` など) → 本文 の組を、原典の出てくる順に並べたもの。 */
type Passages = [key: string, text: string][];

const passageCache = new Map<string, Passages>();

function loadPassages(urn: string): Passages {
  const cached = passageCache.get(urn);
  if (cached) return cached;
  const workPart = urn.split(':').at(-1) ?? '';
  const path = corpusFiles.get(workPart);
  if (!path) throw new Error(`原典ファイルが見つからない: ${workPart}.txt (${CORPUS})`);

  const lines = readFileSync(path, 'utf8').split('\n');
  const bodyStart = lines.findIndex((line) => /^={10,}$/.test(line)) + 1;
  const headingPath: (string | undefined)[] = [];
  const passages: Passages = [];
  const append = (key: string, text: string) => {
    const last = passages.at(-1);
    if (last && last[0] === key) last[1] += ` ${text}`;
    else passages.push([key, text]);
  };

  for (const line of lines.slice(bodyStart)) {
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
    if (verse) append([...prefix, verse[1]].join('.'), verse[2]);
    else append(prefix.join('.'), line.trim());
  }
  passageCache.set(urn, passages);
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
function getPassage(urn: string, loc: string): string | undefined {
  const passages = loadPassages(urn);
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

const SCAIFE_LINK =
  /\]\(https:\/\/scaife\.perseus\.org\/reader\/(urn:cts:[^:]+:[^:]+):([^/)]+)\/?\)/g;

function verifyFootnote(where: string, definition: string): void {
  const links = [...definition.matchAll(SCAIFE_LINK)];
  if (links.length === 0) {
    errors.push(`${where}: 脚注に Scaife Viewer へのリンクがない`);
    return;
  }
  links.forEach((link, index) => {
    const [, urn, loc] = link;
    const segmentEnd = links[index + 1]?.index ?? definition.length;
    const segment = definition.slice((link.index ?? 0) + link[0].length, segmentEnd);
    const quote = segment.match(/«([^»]+)»/)?.[1];
    if (!quote) {
      errors.push(`${where}: ${loc} の原文 «…» がない`);
      return;
    }
    let passage: string | undefined;
    try {
      passage = getPassage(urn, loc);
    } catch (error) {
      errors.push(`${where}: ${(error as Error).message}`);
      return;
    }
    if (passage === undefined) {
      errors.push(`${where}: 箇所 ${urn}:${loc} が原典にない`);
    } else if (!containsQuote(passage, quote)) {
      errors.push(`${where}: 引用が ${urn}:${loc} の本文と一致しない\n    引用: ${quote}`);
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
          if (getPassage(works[source.work].urn, source.loc) === undefined) {
            errors.push(`${where}: 箇所 ${scaifeUrl(source.work, source.loc)} が原典にない`);
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

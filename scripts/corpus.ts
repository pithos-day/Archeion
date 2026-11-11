/**
 * 手元の原典テキストを読み、箇所や文に分ける。照合 (verify-citations) と文の一覧 (show-sentences) で使う。
 *
 * 原典の場所は環境変数 MYTH_CORPUS (既定は ~/Documents/greek-mythology)。
 * 原典の txt は、どの入手元のものも同じ形式 (`=====` の行までがヘッダ、`# Book 1` などの見出し)。
 * Perseus と First1KGreek の原典は、ファイル名が `<URN の作品部分>.txt`。
 * そのほかの原典は、出典レジストリ (src/data/sources.ts) にファイルのパスを書く。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { SENTENCE_END, splitSentences } from '../src/lib/passages.ts';

const CORPUS = process.env.MYTH_CORPUS ?? join(homedir(), 'Documents/greek-mythology');

/**
 * 見出しのうち、箇所の番号として数えるもの (`# Book 1` など)。
 * 原典の TEI XML が CTS の引用単位として宣言している区分に合わせる。
 * 2行目は First1KGreek の断片集と古注、Perseus のエピグラム、
 * Perseus 以外の原典 (原典コレクションの scripts/normalize.py が見出しを付ける) で使う。
 */
const NUMBERING_HEADINGS = new Set([
  ...['Book', 'Chapter', 'Section', 'Poem'],
  ...['Volume', 'Work', 'Fragment', 'Epigram', 'Epigraph', 'Line', 'Part', 'Page'],
]);

export function listFiles(dir: string, pattern: RegExp): string[] {
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

/** 照合する原典。CTS URN、または原典ファイルのパスで指定する。 */
export type Source = { urn: string } | { file: string };

export function describe(source: Source): string {
  return 'urn' in source ? source.urn : source.file;
}

/** 箇所 (`4.765` など) → 本文 の組を、原典の出てくる順に並べたもの。verse は韻文の行。 */
export type Passages = [key: string, text: string, verse: boolean][];

function appendPassage(passages: Passages, key: string, text: string, verse: boolean): void {
  const last = passages.at(-1);
  if (last && last[0] === key) last[1] += ` ${text}`;
  else passages.push([key, text, verse]);
}

/** 原典の txt を箇所ごとに分ける。見出し (`# Book 1`) と韻文の行番号が箇所になる。 */
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
    if (verse) appendPassage(passages, [...prefix, verse[1]].join('.'), verse[2], true);
    else appendPassage(passages, prefix.join('.'), line.trim(), false);
  }
  return passages;
}

const passageCache = new Map<string, Passages>();

export function loadPassages(source: Source): Passages {
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
  const passages = parseTei(body);
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
export function getPassage(source: Source, loc: string): string | undefined {
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
export function normalize(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[ʼ’'᾽΄]/g, 'ʼ')
    .replace(/[[\]⟨⟩†/]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 引用の各部分 (「…」で区切る) が、本文に順に含まれているか。 */
export function containsQuote(passage: string, quote: string): boolean {
  const text = normalize(passage);
  let position = 0;
  for (const piece of quote.split('…').map(normalize).filter(Boolean)) {
    const found = text.indexOf(piece, position);
    if (found === -1) return false;
    position = found + piece.length;
  }
  return true;
}

/** 原典の箇所を文に分ける。番号は引用レジストリの文の番号と同じ。 */
export function sentencesOf(source: Source, loc: string): string[] | undefined {
  const text = getPassage(source, loc);
  return text === undefined ? undefined : splitSentences(normalize(text));
}

/** 原典の韻文の一文と、その行の範囲。 */
export interface CorpusVerseSentence {
  start: string;
  end: string;
  text: string;
}

const verseCache = new Map<string, CorpusVerseSentence[]>();

/**
 * 韻文の原典を、巻ごとに文に分ける。文の区切りは splitSentences と同じ。
 * 前の文が終わった行の途中で始まる文は、その行から始まる。
 */
export function verseSentencesOf(source: Source): CorpusVerseSentence[] {
  const cacheKey = describe(source);
  const cached = verseCache.get(cacheKey);
  if (cached) return cached;
  const sentences: CorpusVerseSentence[] = [];
  let current: CorpusVerseSentence | undefined;
  let book: string | undefined;
  const flush = () => {
    if (current && current.text.trim() !== '')
      sentences.push({ ...current, text: current.text.trim() });
    current = undefined;
  };
  for (const [key, text, verse] of loadPassages(source)) {
    if (!verse) continue;
    const keyBook = key.split('.').slice(0, -1).join('.');
    if (keyBook !== book) {
      flush();
      book = keyBook;
    }
    const pieces = splitSentences(normalize(text));
    const endsSentence = SENTENCE_END.test(normalize(text));
    pieces.forEach((piece, index) => {
      if (piece === '') return;
      if (!current) current = { start: key, end: key, text: '' };
      current.text += ` ${piece}`;
      current.end = key;
      if (index < pieces.length - 1 || endsSentence) flush();
    });
  }
  flush();
  verseCache.set(cacheKey, sentences);
  return sentences;
}

/** 行の範囲の書き方 (`12.39-40`)。 */
export function linesOf(sentence: CorpusVerseSentence): string {
  if (sentence.start === sentence.end) return sentence.start;
  const startParts = sentence.start.split('.');
  const endParts = sentence.end.split('.');
  return `${sentence.start}-${endParts.slice(startParts.length - 1).join('.')}`;
}

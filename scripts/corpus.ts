/**
 * 原典コーパス (Archeion-corpus) を読み、箇所や文に分ける。照合 (verify-citations) と文の一覧 (show-sentences) で使う。
 *
 * コーパスの場所は環境変数 MYTH_CORPUS (既定は ~/ghq/github.com/pithos-day/Archeion-corpus)。
 * 使うコーパスの commit は corpus.lock に書いてあり、コーパスがその commit でなければエラーにする。
 * コーパスを更新するときは、corpus.lock を書き換えて pnpm verify:citations を通す。
 *
 * コーパスの catalog.json がテキストの一覧、texts/<テキストの id>.jsonl が箇所ごとの本文。
 * Scaife Viewer で開ける作品は CTS URN で、そのほかの作品は出典レジストリ (src/data/sources.ts) の
 * text (テキストの id) でテキストを指す。
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compactRange, rangeEnds } from '../src/data/sources.ts';
import { SENTENCE_END, splitSentences } from '../src/lib/passages.ts';

const CORPUS =
  process.env.MYTH_CORPUS ?? join(homedir(), 'ghq/github.com/pithos-day/Archeion-corpus');
const LOCK = join(dirname(fileURLToPath(import.meta.url)), '..', 'corpus.lock');

/** コーパスが corpus.lock の commit かを確かめる。 */
function checkVersion(): void {
  const wanted = readFileSync(LOCK, 'utf8').trim();
  let actual: string;
  try {
    actual = execFileSync('git', ['-C', CORPUS, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    throw new Error(`原典コーパスが見つからない (git のリポジトリでない): ${CORPUS}`);
  }
  if (actual !== wanted)
    throw new Error(
      `原典コーパスの commit が corpus.lock と違う: ${actual} (corpus.lock は ${wanted})。` +
        `git -C ${CORPUS} checkout ${wanted} で合わせる`,
    );
}

/** catalog.json のテキストの項目のうち、ここで使うもの。 */
interface CatalogText {
  id: string;
  urn?: string;
  anchors?: string[];
}

let catalogCache: Map<string, CatalogText> | undefined;

function catalog(): Map<string, CatalogText> {
  if (!catalogCache) {
    checkVersion();
    const { texts } = JSON.parse(readFileSync(join(CORPUS, 'catalog.json'), 'utf8')) as {
      texts: CatalogText[];
    };
    catalogCache = new Map(texts.map((text) => [text.id, text]));
  }
  return catalogCache;
}

/** 照合する原典。CTS URN、またはコーパスのテキストの id で指定する。 */
export type Source = { urn: string } | { text: string };

function describe(source: Source): string {
  return 'urn' in source ? source.urn : source.text;
}

/** 原典のテキストの id。 */
function textIdOf(source: Source): string {
  if ('text' in source) {
    if (!catalog().has(source.text)) throw new Error(`原典コーパスにないテキスト: ${source.text}`);
    return source.text;
  }
  const found = [...catalog().values()].find((text) => text.urn === source.urn);
  if (!found) throw new Error(`原典コーパスにない CTS URN: ${source.urn}`);
  return found.id;
}

/**
 * 原典の入手元のページにある id 属性の値。出典のリンクのアンカーが実在するかを確かめるのに使う
 * (catalog.json の anchors)。
 */
export function pageIdsOf(source: Source): Set<string> {
  return new Set(catalog().get(textIdOf(source))?.anchors ?? []);
}

/** 箇所の本文の項目 (texts/<id>.jsonl の 1 行) のうち、ここで使うもの。DFHG の断片集は urn もある。 */
interface CorpusRecord {
  loc: string;
  text: string;
  verse: boolean;
  urn?: string;
}

const recordCache = new Map<string, CorpusRecord[]>();

function recordsOf(source: Source): CorpusRecord[] {
  const id = textIdOf(source);
  let records = recordCache.get(id);
  if (!records) {
    const path = join(CORPUS, 'texts', `${id}.jsonl`);
    if (!existsSync(path)) throw new Error(`原典ファイルが見つからない: ${path}`);
    records = readFileSync(path, 'utf8')
      .split('\n')
      .filter((line) => line !== '')
      .map((line) => JSON.parse(line) as CorpusRecord);
    recordCache.set(id, records);
  }
  return records;
}

/** DFHG の断片集の、断片の URN (DFHG のサイトで断片を開くアンカー)。 */
export function dfhgUrnsOf(source: Source): Set<string> {
  return new Set(recordsOf(source).flatMap((record) => (record.urn ? [record.urn] : [])));
}

export function listFiles(dir: string, pattern: RegExp): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((name) => pattern.test(name))
    .map((name) => join(dir, name));
}

// ---------- 原典テキスト ----------

/** 箇所 (`4.765` など) → 本文 の組を、原典の出てくる順に並べたもの。verse は韻文の行。 */
export type CorpusLocs = [key: string, text: string, verse: boolean][];

const corpusCache = new Map<string, CorpusLocs>();

/** 原典を読み、箇所ごとの本文に分ける。 */
export function loadCorpus(source: Source): CorpusLocs {
  const cacheKey = describe(source);
  const cached = corpusCache.get(cacheKey);
  if (cached) return cached;
  const locs: CorpusLocs = recordsOf(source).map((record) => [
    record.loc,
    record.text,
    record.verse,
  ]);
  corpusCache.set(cacheKey, locs);
  return locs;
}

function matchesKey(key: string, ref: string): boolean {
  return key === ref || key.startsWith(`${ref}.`);
}

/** 原典の箇所の本文を返す。見つからなければ undefined。 */
export function corpusText(source: Source, loc: string): string | undefined {
  const locs = loadCorpus(source);
  const [start, end] = rangeEnds(loc);
  const from = locs.findIndex(([key]) => matchesKey(key, start));
  const to = locs.findLastIndex(([key]) => matchesKey(key, end));
  if (from === -1 || to === -1 || to < from) return undefined;
  return locs
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

/** 原典の箇所を文に分ける。番号は引用レジストリの文の番号と同じ。 */
export function sentencesOf(source: Source, loc: string): string[] | undefined {
  const text = corpusText(source, loc);
  return text === undefined ? undefined : splitSentences(normalize(text));
}

/** 行の番号 (`12.39`) の巻 (`12`)。巻のない作品 (`278`) は空文字列。 */
export function bookOf(line: string): string {
  return line.split('.').slice(0, -1).join('.');
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
  for (const [key, text, verse] of loadCorpus(source)) {
    if (!verse) continue;
    const keyBook = bookOf(key);
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
  return compactRange(sentence.start, sentence.end);
}

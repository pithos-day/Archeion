/**
 * 引用レジストリ (src/data/passages/) の型と、脚注からの参照の解決。
 *
 * 原文と訳は、原典の箇所 (節や行のまとまり) ごとに、文を単位にして持つ。文の区切りと番号は
 * 原典テキストから機械的に決まる (splitSentences)。同じ文の訳はレジストリに一つだけ書き、
 * 記事の脚注には `[^id]: @<作品 id>/<箇所>:<文の番号>` と参照だけを書く。参照はビルド時に
 * `[出典](URL)。«原文»（訳）` に展開する (src/lib/footnote-plugin.ts)。
 *
 * 散文の作品 (ProsePassages) の参照の書き方:
 * - `@apollod-lib/1.1.5`         1.1.5 の全文
 * - `@apollod-lib/1.1.5:2`       1.1.5 の 2 文目
 * - `@apollod-lib/1.1.5:1-2,4`   1.1.5 の 1〜2 文目と 4 文目 (間は «…» … «…» と「……」でつなぐ)
 * - `@apollod-lib/1.9.16:3-4+1.9.17:1`  箇所をまたぐ引用。出典表記は 1.9.16–17 になる
 *
 * 韻文の作品 (VersePassages) は、文が行をまたぎ、行の途中で始まることもあるので、文ごとに
 * 行の範囲を持たせる。参照には行の範囲を書き、その範囲に収まる文を引く:
 * - `@hom-od/12.39-46`           12.39〜46 行にある文 (範囲の始まりと終わりは文の切れ目に合わせる)
 * - `@hom-od/12.173-175+12.178`  続いていない範囲を «…» … «…» と「……」でつなぐ。出典表記は 12.173–178
 */
import { passages } from '../data/passages/index.ts';
import { citeLabel, sourceUrl, type WorkId } from '../data/sources.ts';

interface Sentence {
  /** 原文の一文。原典テキストの文を、照合用の正規化 (verify-citations) をした形で書く。 */
  original: string;
  /** 日本語訳 (Archeion による)。文末の句読点まで書く。 */
  translation: string;
  /**
   * 訳についての保守用の記録 (本文の読みの判断など)。脚注には出さない。
   * 訳文の中に注釈を書かず、ここに書く。
   */
  note?: string;
}

/** 韻文の一文。 */
interface VerseSentence extends Sentence {
  /**
   * 文のある行の範囲 (`12.39-40`、巻のない作品は `278-279`、1 行に収まる文は `41`)。
   * 前の文が終わった行の途中で始まる文は、その行から数える。
   */
  lines: string;
}

interface Section {
  /** 原典のこの箇所にある文の数。 */
  length: number;
  /** 文の番号 (1 始まり) → 文。引用している文だけを書く。 */
  sentences: Record<number, Sentence>;
}

/** 散文の作品の引用。キーは原典の箇所 (`1.1.5` など)。 */
export type ProsePassages = Record<string, Section>;

/** 韻文の作品の引用。原典に出てくる順に並べる。 */
export type VersePassages = VerseSentence[];

/** 作品ごとの引用。 */
export type WorkPassages = ProsePassages | VersePassages;

/** 文の終わり。「.」「;」「·」「?」「!」に、閉じの引用符が続いてもよい。 */
export const SENTENCE_END = /[.;·?!][”’"»]*$/;
const SENTENCE_BREAK = /(?<=[.;·?!][”’"»]*)\s+/;

/**
 * 原文を文に分ける。区切りは、文の終わり（SENTENCE_END）のあとの空白。
 * 引用レジストリの文の番号は、照合用に正規化した原典の本文をこの関数で分けたもの。
 */
export function splitSentences(text: string): string[] {
  return text
    .split(SENTENCE_BREAK)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

/** 脚注の本文が引用の参照だけでできているか。 */
export const PASSAGE_REFS = /^@[\w-]+\/\S+(?:\s+@[\w-]+\/\S+)*$/;

interface SentenceRef {
  section: string;
  number: number;
}

export interface ResolvedPassage {
  url: string;
  label: string;
  /** 原典で続いている文のまとまりごとの原文。 */
  original: string[];
  /** original と同じまとまりごとの訳。 */
  translation: string[];
}

/** `1-2,4` を [1, 2, 4] にする。省略なら 1〜length。 */
function parseSelection(selection: string | undefined, length: number): number[] {
  if (selection === undefined) return Array.from({ length }, (_, index) => index + 1);
  return selection.split(',').flatMap((part) => {
    const [from, to = from] = part.split('-').map(Number);
    if (!Number.isInteger(from) || !Number.isInteger(to) || to < from)
      throw new Error(`文の番号の指定が正しくない: ${selection}`);
    return Array.from({ length: to - from + 1 }, (_, index) => from + index);
  });
}

/** 箇所の範囲の出典表記用の形 (`1.9.16` と `1.9.17` → `1.9.16-17`)。 */
function locRange(first: string, last: string): string {
  if (first === last) return first;
  const firstParts = first.split('.');
  const lastParts = last.split('.');
  let shared = 0;
  while (
    shared < firstParts.length - 1 &&
    shared < lastParts.length - 1 &&
    firstParts[shared] === lastParts[shared]
  )
    shared += 1;
  return `${first}-${lastParts.slice(shared).join('.')}`;
}

/** 行の番号 (`12.39`、`123a`) を、比べられる数の並びにする。 */
function lineKey(line: string): number[] {
  return line.split('.').map((part) => {
    const match = part.match(/^(\d+)([a-z]?)$/);
    if (!match) return Number.NaN;
    return Number(match[1]) + (match[2] ? (match[2].charCodeAt(0) - 96) / 100 : 0);
  });
}

/** 行 a と b の前後。同じ巻でなければ NaN。 */
function compareLines(a: string, b: string): number {
  const keyA = lineKey(a);
  const keyB = lineKey(b);
  if (keyA.length !== keyB.length || keyA.slice(0, -1).some((part, i) => part !== keyB[i]))
    return Number.NaN;
  return (keyA.at(-1) ?? 0) - (keyB.at(-1) ?? 0);
}

/** 行の範囲 `12.39-46` を始まり `12.39` と終わり `12.46` に分ける。 */
export function lineRange(lines: string): [start: string, end: string] {
  const [start, end] = lines.split('-');
  if (end === undefined) return [start, start];
  const startParts = start.split('.');
  const endParts = end.split('.');
  return [
    start,
    [...startParts.slice(0, startParts.length - endParts.length), ...endParts].join('.'),
  ];
}

/** 行の範囲 [start, end] に収まる行の範囲か。 */
export function linesWithin(lines: string, start: string, end: string): boolean {
  const [from, to] = lineRange(lines);
  const inside = (line: string) => compareLines(line, start) >= 0 && compareLines(line, end) <= 0;
  return inside(from) && inside(to);
}

/** 韻文の参照の、範囲ごとの文。範囲の始まりと終わりが文の切れ目に合わなければ例外を投げる。 */
function verseBlocks(ref: string, work: VersePassages, spec: string): VerseSentence[][] {
  return spec.split('+').map((piece) => {
    const [start, end] = lineRange(piece);
    const block = work.filter((sentence) => linesWithin(sentence.lines, start, end));
    if (block.length === 0) throw new Error(`引用レジストリにない行: ${ref} (${piece})`);
    const first = lineRange(block[0]?.lines ?? '')[0];
    const last = lineRange(block.at(-1)?.lines ?? '')[1];
    if (first !== start || last !== end)
      throw new Error(`行の範囲が文の切れ目に合わない: ${ref} (${piece} の文は ${first}〜${last})`);
    return block;
  });
}

/** 参照を作品 id と、その後ろ (箇所と文の番号、または行の範囲) に分ける。 */
export function parseRef(ref: string): { workId: WorkId; spec: string; work: WorkPassages } {
  const match = ref.match(/^@([\w-]+)\/(\S+)$/);
  if (!match) throw new Error(`引用の参照の形が正しくない: ${ref}`);
  const [, workId, spec] = match;
  const work = passages[workId as WorkId];
  if (!work) throw new Error(`引用レジストリにない作品: ${ref}`);
  return { workId: workId as WorkId, spec, work };
}

/**
 * `@apollod-lib/1.1.5:1-2`、`@hom-od/12.39-46` を、原文と訳のまとまり、出典表記に解決する。
 * 見つからなければ例外を投げる。
 */
export function resolvePassage(ref: string): ResolvedPassage {
  const { workId: id, spec, work } = parseRef(ref);
  if (Array.isArray(work)) {
    const blocks = verseBlocks(ref, work, spec);
    const start = lineRange(blocks[0]?.[0]?.lines ?? '')[0];
    const end = lineRange(blocks.at(-1)?.at(-1)?.lines ?? '')[1];
    const loc = locRange(start, end);
    return {
      url: sourceUrl(id, loc),
      label: citeLabel(id, loc),
      original: blocks.map((block) => block.map((sentence) => sentence.original).join(' ')),
      translation: blocks.map((block) => block.map((sentence) => sentence.translation).join('')),
    };
  }

  const refs: SentenceRef[] = spec.split('+').flatMap((part) => {
    const [section, selection] = part.split(':');
    const entry = work[section];
    if (!entry) throw new Error(`引用レジストリにない箇所: ${ref}`);
    return parseSelection(selection, entry.length).map((number) => ({ section, number }));
  });

  const original: string[] = [];
  const translation: string[] = [];
  refs.forEach((current, index) => {
    const sentence = work[current.section]?.sentences[current.number];
    if (!sentence)
      throw new Error(`引用レジストリにない文: ${ref} (${current.section}:${current.number})`);
    const previous = refs[index - 1];
    const continues =
      previous !== undefined &&
      ((previous.section === current.section && previous.number + 1 === current.number) ||
        (previous.section !== current.section &&
          current.number === 1 &&
          previous.number === work[previous.section]?.length));
    if (continues) {
      original[original.length - 1] += ` ${sentence.original}`;
      translation[translation.length - 1] += sentence.translation;
    } else {
      original.push(sentence.original);
      translation.push(sentence.translation);
    }
  });

  const sections = refs.map((sentenceRef) => sentenceRef.section);
  const loc = locRange(sections[0] ?? '', sections.at(-1) ?? '');
  return { url: sourceUrl(id, loc), label: citeLabel(id, loc), original, translation };
}

/** 脚注に出す「«原文» … «原文»（訳……訳）」。訳の末尾の「。」は、これまでの脚注に合わせて落とす。 */
export function quoteText(passage: ResolvedPassage): string {
  const original = passage.original.map((piece) => `«${piece}»`).join(' … ');
  const translation = passage.translation.join('……').replace(/。$/, '');
  return `${original}（${translation}）`;
}

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
 * - `@hyg-fab/pr:3b`              部分 (parts) に分けた長い文の 2 つ目の部分。`3a-3b`、`2-3a` とも書ける。
 *                                 部分に分けた文を `3` と書くと、すべての部分を引く
 *
 * 韻文の作品 (VersePassages) は、文が行をまたぎ、行の途中で始まることもあるので、文ごとに
 * 行の範囲を持たせる。参照には行の範囲を書き、その範囲に収まる文を引く:
 * - `@hom-od/12.39-46`           12.39〜46 行にある文 (範囲の始まりと終わりは文の切れ目に合わせる)
 * - `@hom-od/12.173-175+12.178`  続いていない範囲を «…» … «…» と「……」でつなぐ。出典表記は 12.173–178
 *
 * 長い文 (韻文は PART_MIN_LINES 行以上、散文は PART_MIN_CHARS 字以上) は、部分 (parts) に分けて、
 * 部分ごとに訳を持たせてよい。引用の範囲を、引きたいところより広げないため。韻文の部分は文と同じく
 * 行の範囲を持ち、参照の行の範囲は部分の切れ目に合わせてよい。
 */
import { passages } from '../data/passages/index.ts';
import {
  citeLabel,
  compactRange,
  rangeEnds,
  sourceUrl,
  type WorkId,
  works,
} from '../data/sources.ts';

/** 一文をそのまま持つ。 */
interface WholeSentence {
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

/** 長い文の一部。 */
export interface Part {
  /** 部分の原文。文の部分をすべて空白一つでつなぐと、文の原文になる。 */
  original: string;
  /**
   * 部分の訳。文の部分の訳をつなぐと、文の訳として読めるように書く。
   * どの脚注も引いていない部分は省いてよい (引くと例外を投げる)。
   */
  translation?: string;
}

/** 長い文を部分に分けて持つ。 */
interface SplitSentence<P extends Part> {
  /** 文の部分。原文の順に並べる。 */
  parts: P[];
  /** WholeSentence の note と同じ。 */
  note?: string;
}

type Sentence = WholeSentence | SplitSentence<Part>;

/** 韻文の文の部分。 */
interface VersePart extends Part {
  /** 部分のある行の範囲。書き方は VerseSentence の lines と同じ。 */
  lines: string;
}

/** 韻文の一文。 */
type VerseSentence = (WholeSentence | SplitSentence<VersePart>) & {
  /**
   * 文のある行の範囲 (`12.39-40`、巻のない作品は `278-279`、1 行に収まる文は `41`)。
   * 前の文が終わった行の途中で始まる文は、その行から数える。
   */
  lines: string;
};

interface Section {
  /** 原典のこの箇所にある文の数。 */
  length: number;
  /** 文の番号 (1 始まり) → 文。引用している文だけを書く。 */
  sentences: Record<number, Sentence>;
}

/** 文の原文。部分に分けた文は、部分の原文を空白一つでつなぐ。 */
export function originalOf(sentence: WholeSentence | SplitSentence<Part>): string {
  return 'parts' in sentence
    ? sentence.parts.map((part) => part.original).join(' ')
    : sentence.original;
}

const LETTER_A = 'a'.charCodeAt(0);

/** 0 → `a`、1 → `b` … の記号。部分に分けた文の部分 (`3a`) と、脚注の戻りリンク (「^ a b」) に使う。 */
export function letterAt(index: number): string {
  return String.fromCharCode(LETTER_A + index);
}

/** 部分に分けてよい文の長さ。韻文は行の数、散文は原文の字数。 */
export const PART_MIN_LINES = 5;
export const PART_MIN_CHARS = 400;

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
  /** 箇所の単位の並び (proseUnits) での位置。 */
  index: number;
  /** 箇所の単位の数。 */
  count: number;
  unit: ProseUnit;
}

export interface ResolvedPassage {
  url: string;
  label: string;
  /** 原典で続いている文のまとまりごとの原文。 */
  original: string[];
  /** original と同じまとまりごとの訳。 */
  translation: string[];
}

/** 散文の箇所の、引用の単位 (文、部分に分けた文はその部分)。 */
interface ProseUnit {
  /** 文の番号。 */
  number: number;
  /** 参照での書き方 (`3`、部分は `3a`)。 */
  key: string;
  /** 引用する部分 (部分に分けていない文は文そのもの)。レジストリにない文は undefined。 */
  part: Part | undefined;
}

/** 箇所の文を、引用の単位に並べる。 */
function proseUnits(entry: Section): ProseUnit[] {
  return Array.from({ length: entry.length }, (_, index) => index + 1).flatMap((number) => {
    const sentence = entry.sentences[number];
    if (sentence && 'parts' in sentence)
      return sentence.parts.map((part, index) => ({
        number,
        key: `${number}${letterAt(index)}`,
        part: part,
      }));
    return [{ number, key: `${number}`, part: sentence }];
  });
}

/** `1-2,4`、`2-3a` を、単位の位置の並びにする。省略ならすべての単位。 */
function parseSelection(selection: string | undefined, units: ProseUnit[]): number[] {
  if (selection === undefined) return units.map((_, index) => index);
  const find = (token: string, last: boolean): number => {
    const match = token.match(/^(\d+)([a-z]?)$/);
    if (!match) return -1;
    const matches = (unit: ProseUnit) =>
      match[2] ? unit.key === token : unit.number === Number(match[1]);
    return last ? units.findLastIndex(matches) : units.findIndex(matches);
  };
  return selection.split(',').flatMap((piece) => {
    const [from, to = from] = piece.split('-');
    const start = find(from ?? '', false);
    const end = find(to, true);
    if (start === -1 || end === -1 || end < start)
      throw new Error(`文の番号の指定が正しくない: ${selection}`);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });
}

/** 引用する単位の訳。訳を省いた部分なら例外を投げる。 */
function translationOf(ref: string, unit: Part, where: string): string {
  if (unit.translation === undefined)
    throw new Error(`訳のない部分を引いている: ${ref} (${where})`);
  return unit.translation;
}

/** 行の番号 (`12.39`、`123a`) を、比べられる数の並びにする。`123a` は 123.01、`123b` は 123.02。 */
function lineKey(line: string): number[] {
  return line.split('.').map((part) => {
    const match = part.match(/^(\d+)([a-z]?)$/);
    if (!match) return Number.NaN;
    return Number(match[1]) + (match[2] ? (match[2].charCodeAt(0) - LETTER_A + 1) / 100 : 0);
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

/** 行の範囲 [start, end] に収まる行の範囲か。 */
export function linesWithin(lines: string, start: string, end: string): boolean {
  const [from, to] = rangeEnds(lines);
  const inside = (line: string) => compareLines(line, start) >= 0 && compareLines(line, end) <= 0;
  return inside(from) && inside(to);
}

/** 韻文の引用の単位 (文、部分に分けた文はその部分) を、原典の順に並べる。 */
function verseUnits(registry: VersePassages): (Part & { lines: string })[] {
  return registry.flatMap((sentence) => ('parts' in sentence ? sentence.parts : [sentence]));
}

/** 韻文の参照の、範囲ごとの単位。範囲の始まりと終わりが単位の切れ目に合わなければ例外を投げる。 */
function verseBlocks(ref: string, registry: VersePassages, spec: string): VersePart[][] {
  const units = verseUnits(registry);
  return spec.split('+').map((piece) => {
    const [start, end] = rangeEnds(piece);
    const block = units.filter((unit) => linesWithin(unit.lines, start, end));
    if (block.length === 0) throw new Error(`引用レジストリにない行: ${ref} (${piece})`);
    const first = rangeEnds(block[0]?.lines ?? '')[0];
    const last = rangeEnds(block.at(-1)?.lines ?? '')[1];
    if (first !== start || last !== end)
      throw new Error(
        `行の範囲が文 (部分) の切れ目に合わない: ${ref} (${piece} の文は ${first}〜${last})`,
      );
    return block;
  });
}

/** 参照を作品 id と、その後ろ (箇所と文の番号、または行の範囲) に分ける。 */
export function parseRef(ref: string): { workId: WorkId; spec: string; registry: WorkPassages } {
  const match = ref.match(/^@([\w-]+)\/(\S+)$/);
  if (!match) throw new Error(`引用の参照の形が正しくない: ${ref}`);
  const [, workId, spec] = match;
  const registry = passages[workId as WorkId];
  if (!registry) throw new Error(`引用レジストリにない作品: ${ref}`);
  return { workId: workId as WorkId, spec, registry };
}

/** 韻文の参照を解決する。 */
function resolveVerse(
  ref: string,
  id: WorkId,
  registry: VersePassages,
  spec: string,
): ResolvedPassage {
  const blocks = verseBlocks(ref, registry, spec);
  const start = rangeEnds(blocks[0]?.[0]?.lines ?? '')[0];
  const end = rangeEnds(blocks.at(-1)?.at(-1)?.lines ?? '')[1];
  const loc = compactRange(start, end);
  return {
    url: sourceUrl(id, loc),
    label: citeLabel(id, loc),
    original: blocks.map((block) => block.map((sentence) => sentence.original).join(' ')),
    translation: blocks.map((block) =>
      block.map((unit) => translationOf(ref, unit, unit.lines)).join(''),
    ),
  };
}

/** 引用する単位 current が、直前の単位 previous から原典で続いているか。 */
function continuesFrom(previous: SentenceRef | undefined, current: SentenceRef): boolean {
  if (previous === undefined) return false;
  if (previous.section === current.section) return previous.index + 1 === current.index;
  const previousEndsSection = previous.index === previous.count - 1;
  const currentStartsSection = current.index === 0;
  return previousEndsSection && currentStartsSection;
}

/** 散文の参照を解決する。 */
function resolveProse(
  ref: string,
  id: WorkId,
  registry: ProsePassages,
  spec: string,
): ResolvedPassage {
  const refs: SentenceRef[] = spec.split('+').flatMap((piece) => {
    const [section, selection] = piece.split(':');
    const entry = registry[section];
    if (!entry) throw new Error(`引用レジストリにない箇所: ${ref}`);
    const units = proseUnits(entry);
    return parseSelection(selection, units).map((index) => ({
      section,
      index,
      count: units.length,
      unit: units[index] as ProseUnit,
    }));
  });

  const original: string[] = [];
  const translation: string[] = [];
  refs.forEach((current, index) => {
    const { part } = current.unit;
    const where = `${current.section}:${current.unit.key}`;
    if (!part) throw new Error(`引用レジストリにない文: ${ref} (${where})`);
    if (continuesFrom(refs[index - 1], current)) {
      original[original.length - 1] += ` ${part.original}`;
      translation[translation.length - 1] += translationOf(ref, part, where);
    } else {
      original.push(part.original);
      translation.push(translationOf(ref, part, where));
    }
  });

  const sections = refs.map((sentenceRef) => sentenceRef.section);
  if ('dfhg' in works[id] && new Set(sections).size > 1)
    throw new Error(`DFHG の典拠をまたいで「+」でつながない (典拠ごとに参照を分ける): ${ref}`);
  const loc = compactRange(sections[0] ?? '', sections.at(-1) ?? '');
  return { url: sourceUrl(id, loc), label: citeLabel(id, loc), original, translation };
}

/**
 * `@apollod-lib/1.1.5:1-2`、`@hom-od/12.39-46` を、原文と訳のまとまり、出典表記に解決する。
 * 見つからなければ例外を投げる。
 */
export function resolvePassage(ref: string): ResolvedPassage {
  const { workId, spec, registry } = parseRef(ref);
  return Array.isArray(registry)
    ? resolveVerse(ref, workId, registry, spec)
    : resolveProse(ref, workId, registry, spec);
}

/**
 * 脚注に出す「«原文» … «原文»（訳……訳）」。訳の末尾の「。」は、これまでの脚注に合わせて落とす。
 * 文の途中で終わる部分の訳の末尾の「、」も落とす。
 */
export function quoteText(passage: ResolvedPassage): string {
  const original = passage.original.map((piece) => `«${piece}»`).join(' … ');
  const translation = passage.translation
    .map((piece) => piece.replace(/、$/, ''))
    .join('……')
    .replace(/。$/, '');
  return `${original}（${translation}）`;
}

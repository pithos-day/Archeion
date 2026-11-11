/**
 * 引用レジストリ (src/data/passages/) の型と、脚注からの参照の解決。
 *
 * 原文と訳は、原典の箇所 (節や行のまとまり) ごとに、文を単位にして持つ。文の区切りと番号は
 * 原典テキストから機械的に決まる (splitSentences)。同じ文の訳はレジストリに一つだけ書き、
 * 記事の脚注には `[^id]: @<作品 id>/<箇所>:<文の番号>` と参照だけを書く。参照はビルド時に
 * `[出典](URL)。«原文»（訳）` に展開する (src/lib/footnote-plugin.ts)。
 *
 * 参照の書き方:
 * - `@apollod-lib/1.1.5`         1.1.5 の全文
 * - `@apollod-lib/1.1.5:2`       1.1.5 の 2 文目
 * - `@apollod-lib/1.1.5:1-2,4`   1.1.5 の 1〜2 文目と 4 文目 (間は «…» … «…» と「……」でつなぐ)
 * - `@apollod-lib/1.9.16:3-4+1.9.17:1`  箇所をまたぐ引用。出典表記は 1.9.16–17 になる
 */
import { passages } from '../data/passages/index.ts';
import { citeLabel, sourceUrl, type WorkId } from '../data/sources.ts';

interface Sentence {
  /** 原文の一文。原典テキストの文を、照合用の正規化 (verify-citations) をした形で書く。 */
  original: string;
  /** 日本語訳 (Archeion による)。文末の句読点まで書く。 */
  translation: string;
}

interface Section {
  /** 原典のこの箇所にある文の数。 */
  length: number;
  /** 文の番号 (1 始まり) → 文。引用している文だけを書く。 */
  sentences: Record<number, Sentence>;
}

/** 作品ごとの引用。キーは原典の箇所 (`1.1.5` など)。 */
export type WorkPassages = Record<string, Section>;

/**
 * 原文を文に分ける。区切りは、空白か末尾が続く「.」「;」「·」。
 * 引用レジストリの文の番号は、照合用に正規化した原典の本文をこの関数で分けたもの。
 */
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.;·])\s+/)
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

/** `@apollod-lib/1.1.5:1-2` を、原文と訳のまとまり、出典表記に解決する。見つからなければ例外を投げる。 */
export function resolvePassage(ref: string): ResolvedPassage {
  const match = ref.match(/^@([\w-]+)\/(\S+)$/);
  if (!match) throw new Error(`引用の参照の形が正しくない: ${ref}`);
  const [, workId, spec] = match;
  const work = passages[workId as WorkId];
  if (!work) throw new Error(`引用レジストリにない作品: ${ref}`);

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
  const id = workId as WorkId;
  return { url: sourceUrl(id, loc), label: citeLabel(id, loc), original, translation };
}

/** 脚注に出す「«原文» … «原文»（訳……訳）」。訳の末尾の「。」は、これまでの脚注に合わせて落とす。 */
export function quoteText(passage: ResolvedPassage): string {
  const original = passage.original.map((piece) => `«${piece}»`).join(' … ');
  const translation = passage.translation.join('……').replace(/。$/, '');
  return `${original}（${translation}）`;
}

/**
 * 記事の脚注と論点表の出典を、手元の原典テキストと照合する。
 *
 *   pnpm verify:citations
 *
 * - 脚注に直接書いた引用 (引用レジストリに移す前の形): `[ラベル](https://scaife.perseus.org/reader/<URN>:<箇所>/) «原文»`
 *   の原文が、原典の該当箇所に含まれているか (途中を「…」で省いた引用は、各部分が順に含まれているか)。
 *   いまの脚注はすべて引用レジストリの参照で、この形は使っていない
 * - 脚注の引用レジストリの参照 (`@作品/箇所:文`): 参照する文がレジストリにあるか。
 *   同じ記事で同じ引用を 2 つの脚注に書いていないか
 * - 引用レジストリ (src/data/passages/*.ts): 箇所の文の数と、各文の原文が、原典を文に分けたものと一致するか。
 *   部分 (parts) に分けた文は、文が十分に長いか、部分をつなぐと文になるか、韻文なら部分の行の範囲が正しいか。
 *   韻文の作品は、各文の行の範囲と原文が、原典の文と一致するか。脚注の参照の行の範囲に収まる原典の文が、
 *   すべてレジストリにあるか (途中の文が抜けたまま続けて表示しないため)
 * - 論点表 (src/data/claims/*.ts): 出典の箇所が原典に実在するか
 * - 脚注と論点表の出典のリンクのアンカー (ラテン語版ウィキソースの `#CVIII` など) が、入手元のページにあるか。
 *   DFHG の断片のリンクは、断片の URN が原典 (元の JSON) にあるか
 *
 * 原典の読み方は scripts/corpus.ts。
 */
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { passages } from '../src/data/passages/index.ts';
import {
  fullRange,
  rangeEnds,
  SCAIFE_READER,
  sourceUrl,
  type Work,
  type WorkId,
  works,
} from '../src/data/sources.ts';
import type { ArticleClaims } from '../src/lib/claims.ts';
import {
  linesWithin,
  originalOf,
  PART_MIN_CHARS,
  PART_MIN_LINES,
  PASSAGE_REFS,
  type Part,
  parseRef,
  resolvePassage,
  type VersePassages,
} from '../src/lib/passages.ts';
import {
  type CorpusVerseSentence,
  containsQuote,
  corpusText,
  describe,
  dfhgUrnsOf,
  linesOf,
  listFiles,
  loadCorpus,
  normalize,
  pageIdsOf,
  type Source,
  sentencesOf,
  verseSentencesOf,
} from './corpus.ts';

const ROOT = join(import.meta.dirname, '..');
const CONTENT_DIR = join(ROOT, 'src/content/docs');
const CLAIMS_DIR = join(ROOT, 'src/data/claims');

const errors: string[] = [];
let checkedQuotes = 0;
let checkedClaims = 0;

// ---------- 脚注 ----------

const LINK = /\]\(([^)\s]+)\)/g;
const SCAIFE_REF = /^(urn:cts:[^:]+:[^:]+):([^/]+)\/?$/;

const localWorks = Object.values<Work>(works).flatMap((work) => ('urn' in work ? [] : [work]));

/**
 * 脚注のリンク先から、原典と箇所を求める。出典へのリンクでなければ undefined。
 * `anchored` は、箇所の代わりに原典のアンカー (DFHG の断片の URN) を指しているとき。
 */
function resolveLink(url: string): { source: Source; loc: string; anchored: boolean } | undefined {
  if (url.startsWith(SCAIFE_READER)) {
    const ref = url.slice(SCAIFE_READER.length).match(SCAIFE_REF);
    return ref ? { source: { urn: ref[1] }, loc: ref[2], anchored: false } : undefined;
  }
  for (const work of localWorks) {
    const anchorStart = work.url.indexOf('#');
    if (anchorStart !== -1) {
      if (url.startsWith(work.url))
        return { source: work, loc: url.slice(anchorStart + 1), anchored: true };
      continue;
    }
    const head = Object.entries(work.pages ?? {}).find(([, page]) => page === url)?.[0];
    if (head !== undefined) return { source: work, loc: head, anchored: false };
  }
  return undefined;
}

/** 出典のリンクのアンカーが、入手元のページにあるか。なければ errors に足す。 */
function verifyAnchor(where: string, workId: WorkId, url: string): void {
  const work: Work = works[workId];
  const anchor = url.split('#')[1];
  if ('urn' in work || anchor === undefined) return;
  if (work.dfhg) {
    if (!dfhgUrnsOf(work.file).has(anchor))
      errors.push(`${where}: リンクの断片の URN #${anchor} が原典にない (${url})`);
    return;
  }
  if (work.url.includes('#')) return;
  if (!pageIdsOf(work.file).has(decodeURIComponent(anchor)))
    errors.push(`${where}: リンクのアンカー #${anchor} が入手元のページにない (${url})`);
}

/** 原典に `[アンカー]` と書いてある箇所。なければ undefined。 */
function locOfAnchor(source: Source, anchor: string): string | undefined {
  return loadCorpus(source).find(([, text]) => text.includes(`[${anchor}]`))?.[0];
}

// ---------- 引用レジストリ ----------

/** 韻文の原典の行 (行の番号と、照合用に正規化した本文)。 */
function verseLinesOf(source: Source): [key: string, text: string][] {
  return loadCorpus(source).flatMap(([key, text, verse]) =>
    verse ? [[key, normalize(text)]] : [],
  );
}

/** 行の範囲の行の本文を、空白一つでつなぐ。範囲が原典になければ undefined。 */
function textOfLines(lines: [string, string][], start: string, end: string): string | undefined {
  const from = lines.findIndex(([key]) => key === start);
  const to = lines.findIndex(([key]) => key === end);
  if (from === -1 || to < from) return undefined;
  return lines
    .slice(from, to + 1)
    .map(([, text]) => text)
    .join(' ');
}

/** 部分に分けた韻文の文の、長さと部分の行の範囲。 */
function verifyVerseParts(
  file: string,
  source: Source,
  sentence: { lines: string; parts: (Part & { lines: string })[] },
): void {
  const lines = verseLinesOf(source);
  const [start, end] = rangeEnds(sentence.lines);
  const count =
    lines.findIndex(([key]) => key === end) - lines.findIndex(([key]) => key === start) + 1;
  if (count < PART_MIN_LINES)
    errors.push(
      `${file}: ${sentence.lines} の文は ${count} 行で、部分に分けるには短い (${PART_MIN_LINES} 行から)`,
    );
  if (sentence.parts.length < 2) errors.push(`${file}: ${sentence.lines} の部分が 1 つしかない`);
  const first = sentence.parts[0];
  const last = sentence.parts.at(-1);
  if (first && rangeEnds(first.lines)[0] !== start)
    errors.push(`${file}: ${sentence.lines} の最初の部分が文の始まりの行から始まっていない`);
  if (last && rangeEnds(last.lines)[1] !== end)
    errors.push(`${file}: ${sentence.lines} の最後の部分が文の終わりの行で終わっていない`);
  sentence.parts.forEach((part, index) => {
    const [partStart, partEnd] = rangeEnds(part.lines);
    const original = normalize(part.original);
    const text = textOfLines(lines, partStart, partEnd);
    const inner = (from: number, to: number) => {
      const slice = lines.slice(
        lines.findIndex(([key]) => key === partStart) + from,
        lines.findIndex(([key]) => key === partEnd) + 1 - to,
      );
      return slice.map(([, line]) => line).join(' ');
    };
    if (text === undefined || !text.includes(original))
      errors.push(
        `${file}: ${part.lines} の部分が、その行の本文にない\n    原文: ${part.original}`,
      );
    else if (
      partStart !== partEnd &&
      (inner(1, 0).includes(original) || inner(0, 1).includes(original))
    )
      errors.push(`${file}: ${part.lines} の部分の行の範囲が広すぎる`);
    const previous = sentence.parts[index - 1];
    const next = sentence.parts[index + 1];
    if (
      partStart === partEnd &&
      previous &&
      next &&
      rangeEnds(previous.lines)[1] === partStart &&
      rangeEnds(next.lines)[0] === partStart
    )
      errors.push(`${file}: ${part.lines} の部分は前後の部分と同じ行にあり、行の範囲で引けない`);
  });
}

function verifyVerseRegistry(file: string, source: Source, registry: VersePassages): void {
  let corpus: CorpusVerseSentence[];
  try {
    corpus = verseSentencesOf(source);
  } catch (error) {
    errors.push(`${file}: ${(error as Error).message}`);
    return;
  }
  let previous = -1;
  for (const sentence of registry) {
    const [start, end] = rangeEnds(sentence.lines);
    const original = originalOf(sentence);
    const index = corpus.findIndex(
      (candidate) =>
        candidate.start === start &&
        candidate.end === end &&
        candidate.text === normalize(original),
    );
    if (index === -1) {
      const near = corpus
        .filter((candidate) => candidate.start === start || candidate.end === end)
        .map((candidate) => `${linesOf(candidate)}: ${candidate.text}`);
      errors.push(
        `${file}: ${sentence.lines} の文が原典の文と一致しない\n    原文: ${original}${near
          .map((line) => `\n    原典 ${line}`)
          .join('')}`,
      );
    } else if (index <= previous) {
      errors.push(`${file}: ${sentence.lines} の文が原典の順に並んでいない`);
    } else {
      previous = index;
    }
    if ('parts' in sentence) verifyVerseParts(file, source, sentence);
    else if (sentence.translation.trim() === '')
      errors.push(`${file}: ${sentence.lines} の訳がない`);
    checkedQuotes += 1;
  }
}

function verifyRegistry(): void {
  for (const [workId, registry] of Object.entries(passages)) {
    const file = `src/data/passages/${workId}.ts`;
    if (!(workId in works)) {
      errors.push(`${file}: 出典レジストリにない作品`);
      continue;
    }
    const source: Source = works[workId as WorkId];
    if (Array.isArray(registry)) {
      verifyVerseRegistry(file, source, registry);
      continue;
    }
    for (const [loc, section] of Object.entries(registry ?? {})) {
      let corpus: string[] | undefined;
      try {
        corpus = sentencesOf(source, loc);
      } catch (error) {
        errors.push(`${file}: ${loc}: ${(error as Error).message}`);
        continue;
      }
      if (corpus === undefined) {
        errors.push(`${file}: 箇所 ${loc} が原典にない`);
        continue;
      }
      if (section.length !== corpus.length)
        errors.push(`${file}: ${loc} の文の数は ${corpus.length} (length: ${section.length})`);
      for (const [number, sentence] of Object.entries(section.sentences)) {
        const expected = corpus[Number(number) - 1];
        if (expected === undefined) errors.push(`${file}: ${loc}:${number} は原典にない文の番号`);
        else if (normalize(originalOf(sentence)) !== expected)
          errors.push(
            `${file}: ${loc}:${number} の原文が原典の文と一致しない\n    原典: ${expected}\n    原文: ${originalOf(sentence)}`,
          );
        if (!('parts' in sentence)) {
          if (sentence.translation.trim() === '')
            errors.push(`${file}: ${loc}:${number} の訳がない`);
        } else {
          if (expected !== undefined && expected.length < PART_MIN_CHARS)
            errors.push(
              `${file}: ${loc}:${number} の文は ${expected.length} 字で、部分に分けるには短い (${PART_MIN_CHARS} 字から)`,
            );
          if (sentence.parts.length < 2)
            errors.push(`${file}: ${loc}:${number} の部分が 1 つしかない`);
        }
        checkedQuotes += 1;
      }
    }
  }
}

/**
 * 韻文の参照の行の範囲に収まる原典の文 (部分に分けた文は部分) が、すべてレジストリにあるか。
 * 続いている範囲を「+」で分けていないか。
 */
function verifyVerseRef(where: string, ref: string): void {
  const { workId, spec, registry } = parseRef(ref);
  if (!Array.isArray(registry)) return;
  const units = verseSentencesOf(works[workId]).flatMap((sentence) => {
    const lines = linesOf(sentence);
    const entry = registry.find(
      (candidate) =>
        candidate.lines === lines && normalize(originalOf(candidate)) === sentence.text,
    );
    if (entry && 'parts' in entry)
      return entry.parts.map((part) => ({
        lines: part.lines,
        text: part.original,
        registered: true,
      }));
    return [{ lines, text: sentence.text, registered: entry !== undefined }];
  });
  const pieces = spec.split('+');
  pieces.forEach((piece, index) => {
    const next = pieces[index + 1];
    if (next === undefined) return;
    const lastIndex = units.findLastIndex((unit) => linesWithin(unit.lines, ...rangeEnds(piece)));
    const following = units[lastIndex + 1];
    if (following && rangeEnds(next)[0] === rangeEnds(following.lines)[0])
      errors.push(`${where}: ${ref} の ${piece} と ${next} は続いているので、一つの範囲にまとめる`);
  });
  for (const piece of pieces) {
    const [start, end] = rangeEnds(piece);
    for (const unit of units) {
      if (unit.registered || !linesWithin(unit.lines, start, end)) continue;
      errors.push(`${where}: ${ref} の範囲の文がレジストリにない (${unit.lines}: ${unit.text})`);
    }
  }
}

/** 脚注が引用レジストリの参照 (`@作品/箇所:文`) だけなら、参照先があるかを確かめて true を返す。 */
function verifyPassageRefs(where: string, definition: string): boolean {
  const body = definition.replace(/^\[\^[^\]]+\]:\s*/, '').trim();
  if (!PASSAGE_REFS.test(body)) return false;
  for (const ref of body.split(/\s+/)) {
    try {
      verifyAnchor(where, parseRef(ref).workId, resolvePassage(ref).url);
      verifyVerseRef(where, ref);
    } catch (error) {
      errors.push(`${where}: ${(error as Error).message}`);
    }
  }
  return true;
}

function verifyFootnote(where: string, definition: string): void {
  if (verifyPassageRefs(where, definition)) return;
  const links = [...definition.matchAll(LINK)].flatMap((match) => {
    const resolved = resolveLink(match[1]);
    return resolved ? [{ ...resolved, index: match.index, length: match[0].length }] : [];
  });
  if (links.length === 0) {
    errors.push(`${where}: 脚注に出典 (Scaife Viewer か出典レジストリの URL) へのリンクがない`);
    return;
  }
  links.forEach((link, index) => {
    const { source, loc, anchored } = link;
    const ref = `${describe(source)}:${loc}`;
    if ('urn' in source && fullRange(loc) !== loc)
      errors.push(`${where}: 範囲の終わりを始まりと同じ形で書く (${loc} → ${fullRange(loc)})`);
    const segmentEnd = links[index + 1]?.index ?? definition.length;
    const segment = definition.slice(link.index + link.length, segmentEnd);
    const quote = segment.match(/«([^»]+)»/)?.[1];
    if (!quote) {
      errors.push(`${where}: ${loc} の原文 «…» がない`);
      return;
    }
    let passage: string | undefined;
    try {
      const at = anchored ? locOfAnchor(source, loc) : loc;
      passage = at === undefined ? undefined : corpusText(source, at);
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
  /** 引用レジストリの参照だけの脚注の、展開した原文 → 最初の脚注の id。同じ引用を 2 つの脚注に書かないため。 */
  const quoted = new Map<string, string>();
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      const footnote = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
      if (!footnote) return;
      const where = `${relative(ROOT, file)}:${index + 1}`;
      verifyFootnote(where, line);
      const [, id, body] = footnote;
      if (!PASSAGE_REFS.test(body)) return;
      let text: string;
      try {
        text = body
          .split(/\s+/)
          .map((ref) => resolvePassage(ref).original.join(' '))
          .join(' | ');
      } catch {
        return;
      }
      const first = quoted.get(text);
      if (first)
        errors.push(
          `${where}: 脚注 ${id} は ${first} と同じ引用なので、本文から ${first} を参照する`,
        );
      else quoted.set(text, id);
    });
}

verifyRegistry();

// ---------- 論点表 ----------

for (const file of listFiles(CLAIMS_DIR, /\.ts$/)) {
  const module = (await import(pathToFileURL(file).href)) as { default: ArticleClaims };
  for (const topic of module.default) {
    for (const variant of topic.variants) {
      for (const source of variant.sources) {
        const where = `${relative(ROOT, file)}: ${topic.label} / ${variant.label}`;
        try {
          verifyAnchor(where, source.work, sourceUrl(source.work, source.loc));
          if (corpusText(works[source.work], source.loc) === undefined) {
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

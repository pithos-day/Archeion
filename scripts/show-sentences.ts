/**
 * 原典の箇所を、引用レジストリの文の単位に分けて表示する。レジストリに文を加えるときに使う。
 *
 *   pnpm show:sentences <作品 id> <箇所>
 *
 * 散文の作品は、箇所 (`1.9.24`) の文を番号付きで出す。韻文の作品は、行の範囲 (`12.39-46`) に
 * かかる文を、レジストリに書く行の範囲 (lines) 付きで出す。
 */
import { rangeEnds, type WorkId, works } from '../src/data/sources.ts';
import { linesOf, sentencesOf, verseSentencesOf } from './corpus.ts';

const [workId, loc] = process.argv.slice(2);
if (!workId || !loc || !(workId in works)) {
  console.error('使い方: pnpm show:sentences <作品 id> <箇所>');
  process.exit(1);
}
const source = works[workId as WorkId];
const verse = verseSentencesOf(source);
if (verse.length > 0) {
  const [start, end] = rangeEnds(loc);
  const book = start.split('.').slice(0, -1).join('.');
  const lineNumber = (line: string) => Number.parseFloat(line.split('.').at(-1) ?? '');
  for (const sentence of verse) {
    const sentenceBook = sentence.start.split('.').slice(0, -1).join('.');
    if (sentenceBook !== book) continue;
    if (
      lineNumber(sentence.end) < lineNumber(start) ||
      lineNumber(sentence.start) > lineNumber(end)
    )
      continue;
    console.log(`${linesOf(sentence)}\t${sentence.text}`);
  }
} else {
  const sentences = sentencesOf(source, loc);
  if (sentences === undefined) {
    console.error(`箇所 ${loc} が原典にない`);
    process.exit(1);
  }
  console.log(`length: ${sentences.length}`);
  for (const [index, sentence] of sentences.entries()) console.log(`${index + 1}\t${sentence}`);
}

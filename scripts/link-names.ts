/**
 * 記事の本文で初めて出てくる固有名詞に、記事へのリンクを付ける。
 *
 * - 名前と slug の対応は src/data/names.ts。記事のない名前もリンクする (赤リンクになる)
 * - 出典の著者 (src/data/sources.ts の authors) は、著者の一覧の行 (`/authors/#<id>`) へリンクする
 * - 記事ごとに、同じリンク先へは最初の 1 回だけ。すでにリンクがあれば付けない
 * - 見出し、脚注、表、JSX の行、『作品名』、«原文»、既存のリンクの中は対象外
 * - 前後がカタカナの箇所は別の語の一部とみなす (「ヘラ」と「ヘラクレス」など)
 * - names.ts の unlinkedPhrases の語句の中は対象外 (「アルゴス人」など)
 * - より長い登録名の中は対象外 (「トロイアの木馬」の中の「トロイア」など)
 * - 同じ表記に手で別のリンク先を付けた記事では、その表記にはリンクしない (同名の別人を誤ってリンクしないため)
 *
 * 使い方: node scripts/link-names.ts [ファイル...]  (省略時は記事と版のすべて)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { names, unlinkedPhrases } from '../src/data/names.ts';
import { authors } from '../src/data/sources.ts';

const DOCS = 'src/content/docs';
const KATAKANA = /[ァ-ヴー・]/;
const PROTECTED = new RegExp(
  [
    '『[^』]*』',
    '\\[[^\\]]*\\]\\([^)]*\\)',
    '\\[\\^[^\\]]*\\]',
    '«[^»]*»',
    ...unlinkedPhrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
  ].join('|'),
  'g',
);
const SKIPPED_LINE = /^(#|\[\^|import |<|\||\s)/;

/** 表記 → リンク先。長い表記から先に探す (「ペルセウス」より前に「ペルセ」を見ないように)。 */
const targets: [string, string][] = [
  ...Object.entries(names).map(([name, slug]): [string, string] => [name, `/articles/${slug}/`]),
  ...Object.entries(authors).map(([id, { name }]): [string, string] => [name, `/authors/#${id}`]),
].sort(([a], [b]) => b.length - a.length);

function articleFiles(): string[] {
  const files = readdirSync(join(DOCS, 'articles')).map((name) => join(DOCS, 'articles', name));
  for (const dir of readdirSync(join(DOCS, 'versions'))) {
    for (const name of readdirSync(join(DOCS, 'versions', dir))) {
      files.push(join(DOCS, 'versions', dir, name));
    }
  }
  return files.filter((file) => /\.mdx?$/.test(file));
}

/** その記事自身の slug (版なら総合版の slug)。 */
function ownSlug(file: string, text: string): string {
  const slug = text.match(/^slug: articles\/([a-z0-9-]+)/m)?.[1];
  return slug ?? file.replace(/^.*\/([^/]+)\.mdx?$/, '$1');
}

/** 行の中で、保護区間と別の語の一部を除いた、最初の `name` の位置。 */
function findName(line: string, name: string): number {
  const protectedRanges = [...line.matchAll(PROTECTED)].map((m) => [
    m.index,
    m.index + m[0].length,
  ]);
  for (const longer of targets) {
    if (longer[0].length <= name.length || !longer[0].includes(name)) continue;
    for (let at = line.indexOf(longer[0]); at !== -1; at = line.indexOf(longer[0], at + 1)) {
      protectedRanges.push([at, at + longer[0].length]);
    }
  }
  for (let at = line.indexOf(name); at !== -1; at = line.indexOf(name, at + 1)) {
    const end = at + name.length;
    if (protectedRanges.some(([from, to]) => at >= from && at < to)) continue;
    if (KATAKANA.test(line[at - 1] ?? '') || KATAKANA.test(line[end] ?? '')) continue;
    return at;
  }
  return -1;
}

function linkFile(file: string): string[] {
  const text = readFileSync(file, 'utf8');
  const bodyStart = text.startsWith('---') ? text.indexOf('\n---\n', 3) + 5 : 0;
  const lines = text.slice(bodyStart).split('\n');
  const own = ownSlug(file, text);
  const linked = new Set([`/articles/${own}/`]);
  for (const [, href] of text.matchAll(/(?:\]\(|href=")(\/(?:articles|authors)\/[^)"]*)/g)) {
    linked.add(href);
  }
  /** 手でリンクを付けた表記 → リンク先。 */
  const manual = new Map<string, Set<string>>();
  for (const [, name, href] of text.matchAll(/\[([^\]^]+)\]\((\/(?:articles|authors)\/[^)]*)\)/g)) {
    manual.set(name, (manual.get(name) ?? new Set()).add(href));
  }

  const added: string[] = [];
  for (const [name, href] of targets) {
    if (linked.has(href)) continue;
    if ([...(manual.get(name) ?? [])].some((other) => other !== href)) continue;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? '';
      if (line.trim() === '' || SKIPPED_LINE.test(line)) continue;
      const at = findName(line, name);
      if (at === -1) continue;
      lines[i] = `${line.slice(0, at)}[${name}](${href})${line.slice(at + name.length)}`;
      linked.add(href);
      added.push(name);
      break;
    }
  }
  if (added.length > 0) writeFileSync(file, text.slice(0, bodyStart) + lines.join('\n'));
  return added;
}

const files = process.argv.length > 2 ? process.argv.slice(2) : articleFiles();
for (const file of files) {
  const added = linkFile(file);
  if (added.length > 0) console.log(`${file}: ${added.join('、')}`);
}

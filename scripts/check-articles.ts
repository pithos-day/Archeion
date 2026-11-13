/**
 * 記事の本文と表記レジストリが、編集方針に沿っているかを確かめる。
 *
 *   pnpm check:articles
 *
 * - 表記レジストリ (src/data/names.ts): names には一つの記事 (slug) につき表記が一つだけか。
 *   aliases の表記が names と重ならず、aliases の slug が names にあるか (エラー)
 * - 本文で著者の名前を出すとき: 文頭の「アポロドロスによれば、」「『キュプリア』では、」のような前置き (警告)。
 *   編集方針の例外 (著者の意見、同じ箇所での比較、著者や作品そのものが話題) に当たるなら、そのままでよい
 * - 論点表で採用も併記もされない説: 脚注の出典がすべて、その記事の論点表で併記しない説 (minor) の出典にしか
 *   当たらない文 (警告)
 *
 * 警告を確かめて、編集方針の例外や誤検知だと判断した段落は、その直前の行に抑制マーカーを書くと警告しない。
 *
 *   .mdx: `{/* check:articles ok 著者名の前置き: <理由> *\/}` (`*\/` の `\` は書かない)
 *   .md:  `<!-- check:articles ok 併記しない説: <理由> -->`
 *
 * マーカーは次の空でない行 (段落) の、その種類の警告だけを抑える。理由のないマーカーはエラー、
 * 抑える警告のないマーカーは警告にする (本文を直したあとに残ったマーカーを消すため)。
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { aliases, names } from '../src/data/names.ts';
import { authors, type WorkId } from '../src/data/sources.ts';
import { type ArticleClaims, scoreTopic, type VariantStatus } from '../src/lib/claims.ts';

const DOCS = 'src/content/docs';
const errors: string[] = [];
const warnings: string[] = [];

// ---------- 表記レジストリ ----------

const nameOfSlug = new Map<string, string>();
for (const [name, slug] of Object.entries(names)) {
  const other = nameOfSlug.get(slug);
  if (other)
    errors.push(`names.ts: ${slug} に表記が二つある (${other}、${name})。一つを aliases に移す`);
  else nameOfSlug.set(slug, name);
}
for (const [alias, slug] of Object.entries(aliases)) {
  if (alias in names) errors.push(`names.ts: ${alias} が names と aliases の両方にある`);
  if (!nameOfSlug.has(slug))
    errors.push(`names.ts: aliases の ${alias} の slug (${slug}) が names にない`);
}

// ---------- 記事の本文 ----------

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(path);
    return /\.mdx?$/.test(entry.name) ? [path] : [];
  });
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const authorNames = [...new Set(Object.values(authors).map(({ name }) => name))]
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp);
/** 文頭の著者名の前置き。「〜によれば、」「〜では、」「〜の『…』では、」。 */
const AUTHOR_PREFIX = new RegExp(
  `^(?:(?:${authorNames.join('|')})(?:の『[^』]+』)?|『[^』]+』)(?:によれば|では)、`,
);

/** 本文の行か (frontmatter、見出し、脚注の定義、JSX、MDX の式、表、import を除く)。 */
const BODY_LINE = /^(?!#|\[\^|import |<|\{|\||\s|$)/;

const WARNING_KINDS = ['著者名の前置き', '併記しない説'] as const;
type WarningKind = (typeof WARNING_KINDS)[number];
/** 抑制マーカー。`{/* check:articles ok <種類>: <理由> *\/}` (.mdx) か `<!-- … -->` (.md)。 */
const SUPPRESS_MARKER = /^(?:\{\/\*|<!--)\s*check:articles ok\s*(.*?)\s*(?:\*\/\}|-->)\s*$/;

interface Marker {
  line: number;
  kind: WarningKind;
  used: boolean;
}

/** 抑制マーカーを集める。対象の行 (マーカーの次の空でない行) の番号 → マーカー。 */
function suppressMarkers(file: string, lines: string[]): Map<number, Marker[]> {
  const markers = new Map<number, Marker[]>();
  lines.forEach((line, index) => {
    const body = line.match(SUPPRESS_MARKER)?.[1];
    if (body === undefined) return;
    const where = `${file}:${index + 1}`;
    const [, kind, reason] = body.match(/^([^:：]+)[:：]\s*(.*)$/) ?? [];
    if (!WARNING_KINDS.includes(kind as WarningKind)) {
      errors.push(`${where}: 抑制マーカーの種類は ${WARNING_KINDS.join('、')} のどれか: ${body}`);
      return;
    }
    if (!reason) {
      errors.push(`${where}: 抑制マーカーに理由がない`);
      return;
    }
    let target = index + 1;
    while (
      target < lines.length &&
      ((lines[target] ?? '').trim() === '' || SUPPRESS_MARKER.test(lines[target] ?? ''))
    )
      target++;
    const list = markers.get(target) ?? [];
    list.push({ line: index + 1, kind: kind as WarningKind, used: false });
    markers.set(target, list);
  });
  return markers;
}
const stripLinks = (text: string) => text.replace(/\[([^\]^][^\]]*)\]\([^)]*\)/g, '$1');

interface SourceStatus {
  work: WorkId;
  loc: string;
  status: VariantStatus;
}

/** 脚注の箇所 (`2.5.11`) が、論点表の出典の箇所 (`2.5.11`、`11.543-547` など) に当たるか。 */
function sameLoc(footnoteLoc: string, claimLoc: string): boolean {
  if (footnoteLoc === claimLoc) return true;
  if (footnoteLoc.startsWith(`${claimLoc}.`) || claimLoc.startsWith(`${footnoteLoc}.`)) return true;
  const range = claimLoc.match(/^(.*?)(\d+)-(\d+)$/);
  const point = footnoteLoc.match(/^(.*?)(\d+)(?:-(\d+))?$/);
  if (!range || !point || range[1] !== point[1]) return false;
  const [from, to] = [Number(range[2]), Number(range[3])];
  return Number(point[2]) >= from && Number(point[3] ?? point[2]) <= to;
}

async function claimSources(text: string): Promise<SourceStatus[]> {
  const match = text.match(/^import claims from '[./]*data\/claims\/([\w-]+)';$/m);
  if (!match) return [];
  const module = (await import(pathToFileURL(`src/data/claims/${match[1]}.ts`).href)) as {
    default: ArticleClaims;
  };
  return module.default.flatMap((topic) =>
    scoreTopic(topic).variants.flatMap(({ sources, status }) =>
      sources.map(({ work, loc }) => ({ work, loc, status })),
    ),
  );
}

/** 脚注の定義 (`[^id]: @work/loc:1 @work/loc`) の、作品と箇所の並び。 */
function footnoteRefs(text: string): Map<string, { work: WorkId; loc: string }[]> {
  const refs = new Map<string, { work: WorkId; loc: string }[]>();
  for (const [, id, body] of text.matchAll(/^\[\^([^\]]+)\]:\s*(.*)$/gm)) {
    const list = [...(body ?? '').matchAll(/@([\w-]+)\/(\S+)/g)].flatMap(([, work, spec]) =>
      (spec ?? '').split('+').map((part) => ({
        work: work as WorkId,
        loc: part.split(':')[0] ?? part,
      })),
    );
    refs.set(id ?? '', list);
  }
  return refs;
}

for (const file of listFiles(DOCS).filter((path) => /\/(articles|versions)\//.test(path))) {
  const text = readFileSync(file, 'utf8');
  const sources = await claimSources(text);
  const refs = footnoteRefs(text);
  const lines = text.split('\n');
  const bodyStart = lines.indexOf('---', 1) + 1;
  const markers = suppressMarkers(file, lines);
  lines.forEach((line, index) => {
    if (index < bodyStart || !BODY_LINE.test(line)) return;
    const where = `${file}:${index + 1}`;
    const warn = (kind: WarningKind, message: string) => {
      const marker = markers.get(index)?.find((candidate) => candidate.kind === kind);
      if (marker) marker.used = true;
      else warnings.push(`${where}: ${message}`);
    };
    for (const raw of line.split(/(?<=。(?:\[\^[^\]]+\])*)/)) {
      const sentence = stripLinks(raw).replace(/^[-*]\s+/, '');
      const plain = sentence.replace(/\[\^[^\]]+\]/g, '');
      if (AUTHOR_PREFIX.test(plain)) warn('著者名の前置き', `著者名の前置き: ${plain}`);

      const cited = [...sentence.matchAll(/\[\^([^\]]+)\]/g)].flatMap(
        ([, id]) => refs.get(id ?? '') ?? [],
      );
      if (cited.length === 0 || sources.length === 0) continue;
      const statuses = cited.map((ref) =>
        sources
          .filter((source) => source.work === ref.work && sameLoc(ref.loc, source.loc))
          .map((source) => source.status),
      );
      if (statuses.every((list) => list.length > 0 && list.every((status) => status === 'minor')))
        warn('併記しない説', `併記しない説の出典だけで書いた文: ${plain}`);
    }
  });
  for (const marker of [...markers.values()].flat())
    if (!marker.used)
      warnings.push(`${file}:${marker.line}: 抑制マーカーが抑える警告がない (${marker.kind})`);
}

for (const warning of warnings) console.warn(`△ ${warning}`);
for (const error of errors) console.error(`✗ ${error}`);
console.log(`エラー ${errors.length} 件、警告 ${warnings.length} 件。`);
if (errors.length > 0) process.exitCode = 1;

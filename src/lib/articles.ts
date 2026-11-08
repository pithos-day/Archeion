import { type CollectionEntry, getCollection } from 'astro:content';
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

export type Article = CollectionEntry<'docs'>;

/** 記事エントリーからページの URL を作る。 */
export function articleHref(article: Article): string {
  return article.id === 'index' ? '/' : `/${article.id}/`;
}

/** カテゴリページの URL を作る。 */
export function categoryHref(category: string): string {
  return `/categories/${encodeURIComponent(category)}/`;
}

/** 記事のページ (著者別の版を含む) をすべて返す。メインページや編集方針などは含まない。 */
function getAllPages(): Promise<Article[]> {
  return getCollection('docs', (entry) => entry.id.startsWith('articles/') && !entry.data.draft);
}

/** 著者別の版を除いた記事 (総合版) を、タイトル順で返す。 */
export async function getArticles(): Promise<Article[]> {
  const entries = (await getAllPages()).filter((entry) => !entry.data.versionOf);
  return entries.sort((a, b) => a.data.title.localeCompare(b.data.title, 'ja'));
}

/** 総合版の id から、その記事の著者別の版をタブの並び順で返す。 */
export async function getVersions(rootId: string): Promise<Article[]> {
  const entries = (await getAllPages()).filter((entry) => entry.data.versionOf === rootId);
  return entries.sort((a, b) => a.data.versionOrder - b.data.versionOrder);
}

/** カテゴリ名 → 所属記事 の Map を、カテゴリ名順で返す。 */
export async function getCategoryMap(): Promise<Map<string, Article[]>> {
  const map = new Map<string, Article[]>();
  for (const article of await getArticles()) {
    for (const category of article.data.categories) {
      map.set(category, [...(map.get(category) ?? []), article]);
    }
  }
  return new Map([...map].sort(([a], [b]) => a.localeCompare(b, 'ja')));
}

/**
 * 記事の最終更新日時。frontmatter の lastUpdated があればそれを使い、
 * なければ git の最終コミット日時、未コミットならファイルの更新日時を使う。
 */
function getUpdatedAt(article: Article): Date {
  const { lastUpdated } = article.data;
  if (lastUpdated instanceof Date) return lastUpdated;
  if (!article.filePath) return new Date(0);
  try {
    const committedAt = execFileSync('git', ['log', '-1', '--format=%cI', '--', article.filePath], {
      encoding: 'utf8',
    }).trim();
    if (committedAt) return new Date(committedAt);
  } catch {
    // git が使えない環境ではファイルの更新日時にフォールバックする
  }
  return statSync(article.filePath).mtime;
}

/** 更新日時の新しい順に記事を返す。 */
export async function getRecentArticles(): Promise<{ article: Article; updatedAt: Date }[]> {
  const articles = await getArticles();
  return articles
    .map((article) => ({ article, updatedAt: getUpdatedAt(article) }))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

/** 本文中のサイト内絶対リンク ( `](/path/)` や `href="/path/"` ) を取り出す。 */
function extractInternalHrefs(body: string): string[] {
  const pattern = /(?:\]\(|href=["'])(\/[^)"'\s#?]*)/g;
  return [...body.matchAll(pattern)].map(([, path]) => normalizePath(path));
}

/** URL のパスを、デコード済み・末尾スラッシュ付きの形にそろえる。 */
export function normalizePath(path: string): string {
  const decoded = decodeURI(path);
  return decoded.endsWith('/') ? decoded : `${decoded}/`;
}

let backlinkMap: Promise<Map<string, Article[]>> | undefined;

/** リンク先のパス → そのページにリンクしている記事 の Map を返す。 */
export function getBacklinkMap(): Promise<Map<string, Article[]>> {
  backlinkMap ??= (async () => {
    const map = new Map<string, Article[]>();
    // 著者別の版からのリンクも数える
    for (const article of await getAllPages()) {
      // 同じ記事の総合版と版のあいだのリンクは数えない
      const family = `/${article.data.versionOf ?? article.id}/`;
      for (const href of new Set(extractInternalHrefs(article.body ?? ''))) {
        if (href.startsWith(family)) continue;
        map.set(href, [...(map.get(href) ?? []), article]);
      }
    }
    return map;
  })();
  return backlinkMap;
}

export interface WantedArticle {
  slug: string;
  /** 本文で最も多く使われているリンクの表記。 */
  name: string;
  /** その名前にリンクしている記事 (総合版にまとめる)。 */
  linkedFrom: Article[];
}

/** 本文からリンクされているが、まだ記事のないページを、リンク元の多い順で返す。 */
export async function getWantedArticles(): Promise<WantedArticle[]> {
  const pages = await getAllPages();
  const existing = new Set(pages.map((page) => page.id));
  const byId = new Map(pages.map((page) => [page.id, page]));
  const wanted = new Map<string, { names: Map<string, number>; linkedFrom: Set<Article> }>();
  for (const page of pages) {
    const root = byId.get(page.data.versionOf ?? page.id) ?? page;
    for (const [, name = '', slug = ''] of (page.body ?? '').matchAll(
      /\[([^\]]+)\]\(\/articles\/([a-z0-9-]+)\/\)/g,
    )) {
      if (existing.has(`articles/${slug}`)) continue;
      const entry = wanted.get(slug) ?? { names: new Map(), linkedFrom: new Set() };
      entry.names.set(name, (entry.names.get(name) ?? 0) + 1);
      entry.linkedFrom.add(root);
      wanted.set(slug, entry);
    }
  }
  return [...wanted]
    .map(([slug, { names, linkedFrom }]) => ({
      slug,
      name: [...names].sort(([, a], [, b]) => b - a)[0]?.[0] ?? slug,
      linkedFrom: [...linkedFrom].sort((a, b) => a.data.title.localeCompare(b.data.title, 'ja')),
    }))
    .sort(
      (a, b) => b.linkedFrom.length - a.linkedFrom.length || a.name.localeCompare(b.name, 'ja'),
    );
}

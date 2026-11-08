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

/** メインページを除いた全記事を、タイトル順で返す。 */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection('docs', (entry) => entry.id !== 'index' && !entry.data.draft);
  return entries.sort((a, b) => a.data.title.localeCompare(b.data.title, 'ja'));
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
    for (const article of await getArticles()) {
      const self = articleHref(article);
      for (const href of new Set(extractInternalHrefs(article.body ?? ''))) {
        if (href === self) continue;
        map.set(href, [...(map.get(href) ?? []), article]);
      }
    }
    return map;
  })();
  return backlinkMap;
}

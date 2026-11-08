import { type CollectionEntry, getCollection } from 'astro:content';

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
async function getArticles(): Promise<Article[]> {
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

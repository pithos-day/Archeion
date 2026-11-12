/**
 * まだ記事のないページへのリンクを、Wikipedia の赤リンクにする Sätteri の hast プラグイン。
 *
 * `/articles/<slug>/` へのリンクで、`src/content/docs/articles/<slug>.md(x)` がないか下書き (`draft: true`) のものに
 * class `new` を付け、リンク先を執筆待ちのページ (`/wanted/<slug>/`) に向ける。執筆待ちの一覧
 * (src/lib/articles.ts の getWantedArticles) も、下書きの記事をまだない記事として数える。
 */

import { existsSync, readFileSync } from 'node:fs';
import type { Element } from 'hast';
import type { HastPlugin } from './hast-plugin';

const ARTICLE_HREF = /^\/articles\/([a-z0-9-]+)\/$/;

/** 記事のファイルがあり、下書きでないか。 */
function articlePublished(slug: string): boolean {
  const base = `src/content/docs/articles/${slug}`;
  const file = [`${base}.md`, `${base}.mdx`].find((path) => existsSync(path));
  if (!file) return false;
  const frontmatter = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  return !/^draft:\s*true\s*$/m.test(frontmatter);
}

function textContent(node: Element): string {
  return node.children.map((child) => ('value' in child ? child.value : '')).join('');
}

export const redLinks: HastPlugin = {
  name: 'red-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const link = node as Element;
      const slug = String(link.properties.href ?? '').match(ARTICLE_HREF)?.[1];
      if (!slug || articlePublished(slug)) return;
      ctx.replaceNode(node, {
        ...link,
        properties: {
          ...link.properties,
          href: `/wanted/${slug}/`,
          className: ['new'],
          title: `${textContent(link)}（未作成）`,
        },
      });
    },
  },
};

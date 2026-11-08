/**
 * まだ記事のないページへのリンクを、Wikipedia の赤リンクにする Sätteri の hast プラグイン。
 *
 * `/articles/<slug>/` へのリンクで、`src/content/docs/articles/<slug>.md(x)` がないものに
 * class `new` を付け、リンク先を執筆待ちのページ (`/wanted/<slug>/`) に向ける。
 */

import { existsSync } from 'node:fs';
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import type { Element } from 'hast';

type HastPlugin = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

const ARTICLE_HREF = /^\/articles\/([a-z0-9-]+)\/$/;

function articleExists(slug: string): boolean {
  const base = `src/content/docs/articles/${slug}`;
  return existsSync(`${base}.md`) || existsSync(`${base}.mdx`);
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
      if (!slug || articleExists(slug)) return;
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

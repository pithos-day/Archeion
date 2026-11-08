// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { wikiFootnotes } from './src/lib/footnote-plugin.ts';
import { redLinks } from './src/lib/red-link-plugin.ts';

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [wikiFootnotes, redLinks],
      features: {
        gfm: {
          footnotes: {
            label: '脚注',
            backLabel: (referenceNumber, rerunIndex) =>
              `本文の参照 ${referenceNumber}${rerunIndex > 1 ? `-${rerunIndex}` : ''} に戻る`,
          },
        },
      },
    }),
  },
  integrations: [
    starlight({
      title: 'Archeion',
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pithos-day/Archeion' }],
      lastUpdated: true,
      customCss: ['./src/styles/wiki.css'],
      pagination: false,
      // 右カラムの目次は使わず、本文内の目次ボックス (TocBox) で表示する
      tableOfContents: false,
      components: {
        Footer: './src/components/overrides/Footer.astro',
        MarkdownContent: './src/components/overrides/MarkdownContent.astro',
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      sidebar: [
        {
          label: '案内',
          items: [
            { label: 'メインページ', link: '/' },
            { label: '最近の更新', link: '/recent-changes/' },
            { label: 'おまかせ表示', link: '/random/' },
            { label: 'カテゴリ一覧', link: '/categories/' },
            { label: '執筆待ちの記事', link: '/wanted/' },
            { label: '編集方針', link: '/policy/' },
          ],
        },
        {
          label: '記事',
          items: [{ autogenerate: { directory: 'articles' } }],
        },
      ],
    }),
  ],
});

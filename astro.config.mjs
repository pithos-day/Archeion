// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
          label: 'ガイド',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'リファレンス',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
  ],
});

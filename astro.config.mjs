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

import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** 記事が属するカテゴリ。ページ末尾に表示し、カテゴリページで一覧化する。 */
        categories: z.array(z.string()).default([]),
        /** 著者別の版のとき、総合版の id (例: `articles/heracles`)。 */
        versionOf: z.string().optional(),
        /** 版のタブに出す名前 (例: `ヘシオドス版`)。 */
        versionLabel: z.string().optional(),
        /** 版のタブの並び順。小さいほど左。 */
        versionOrder: z.number().default(0),
        /** 記事を作成した日。手で書く (例: `created: 2026-11-11`)。 */
        created: z.date().optional(),
        /** 本文右上に表示する情報ボックス。 */
        infobox: z
          .object({
            title: z.string().optional(),
            image: z.string().optional(),
            caption: z.string().optional(),
            rows: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
          })
          .optional(),
      }),
    }),
  }),
};

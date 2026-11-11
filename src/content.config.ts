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
        /** 版を作った理由 (編集方針の「著者別の版を作る条件」)。 */
        versionReason: z
          .object({
            /** 総合版と、人物や筋の中心がどう違うか。 */
            difference: z.string(),
            /** その語りが後世に受け継がれている根拠。 */
            reception: z.string(),
          })
          .optional(),
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

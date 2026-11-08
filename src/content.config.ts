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

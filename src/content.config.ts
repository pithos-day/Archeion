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
      }),
    }),
  }),
};

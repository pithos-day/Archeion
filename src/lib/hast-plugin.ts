import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

/** Sätteri の hast プラグイン。 */
export type HastPlugin = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

/** 引用レジストリ。作品 id → その作品の引用。型と使い方は src/lib/passages.ts。 */
import type { WorkPassages } from '../../lib/passages.ts';
import type { WorkId } from '../sources.ts';
import aethiopis from './aethiopis.ts';
import apollodEp from './apollod-ep.ts';
import apollodLib from './apollod-lib.ts';
import cypria from './cypria.ts';
import hygAstr from './hyg-astr.ts';
import hygFab from './hyg-fab.ts';
import iliasParva from './ilias-parva.ts';
import iliouPersis from './iliou-persis.ts';
import nosti from './nosti.ts';
import telegonia from './telegonia.ts';

export const passages: Partial<Record<WorkId, WorkPassages>> = {
  'apollod-lib': apollodLib,
  'apollod-ep': apollodEp,
  cypria,
  'ilias-parva': iliasParva,
  aethiopis,
  nosti,
  'iliou-persis': iliouPersis,
  telegonia,
  'hyg-fab': hygFab,
  'hyg-astr': hygAstr,
};

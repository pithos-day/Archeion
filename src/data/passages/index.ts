/** 引用レジストリ。作品 id → その作品の引用。型と使い方は src/lib/passages.ts。 */
import type { WorkPassages } from '../../lib/passages.ts';
import type { WorkId } from '../sources.ts';

export const passages: Partial<Record<WorkId, WorkPassages>> = {};

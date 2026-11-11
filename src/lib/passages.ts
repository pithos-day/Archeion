/**
 * 引用レジストリ (src/data/passages/) の型と、脚注からの参照の解決。
 *
 * 脚注には `[^id]: @<作品 id>/<引用 id>` と書き、ビルド時に
 * `[出典](URL)。«原文»（訳）` に展開する (src/lib/footnote-plugin.ts)。
 * 同じ箇所の訳を一か所で直せるように、原文と訳はレジストリにだけ書く。
 */
import { passages } from '../data/passages';
import { citeLabel, sourceUrl, type WorkId } from '../data/sources';

export interface Passage {
  /** 箇所。`1.2.3`、`2.5.11`、`1.9.16-17` など。 */
  loc: string;
  /** 原文。途中を省いたときは、省いたところで分ける (脚注では «…» … «…» になる)。 */
  original: string[];
  /** 日本語訳 (Archeion による)。 */
  translation: string;
}

/** 作品ごとの引用。キーは引用 id (箇所、または `<箇所>:<名前>`)。 */
export type WorkPassages = Record<string, Passage>;

/** 脚注の本文が引用の参照だけでできているとき、その参照 (`@作品/引用`) を返す。 */
export const PASSAGE_REFS = /^@[\w-]+\/\S+(?:\s+@[\w-]+\/\S+)*$/;

export interface ResolvedPassage extends Passage {
  url: string;
  label: string;
}

/** `@apollod-lib/1.2.3` を、引用と出典表記に解決する。見つからなければ例外を投げる。 */
export function resolvePassage(ref: string): ResolvedPassage {
  const match = ref.match(/^@([\w-]+)\/(\S+)$/);
  if (!match) throw new Error(`引用の参照の形が正しくない: ${ref}`);
  const [, workId, passageId] = match;
  const passage = passages[workId as WorkId]?.[passageId];
  if (!passage) throw new Error(`引用レジストリにない: ${ref}`);
  const work = workId as WorkId;
  return { ...passage, url: sourceUrl(work, passage.loc), label: citeLabel(work, passage.loc) };
}

/** 脚注に出す「«原文» … «原文»（訳）」。 */
export function quoteText(passage: Passage): string {
  return `${passage.original.map((piece) => `«${piece}»`).join(' … ')}（${passage.translation}）`;
}

/**
 * 論点表のスコア計算。基準は編集方針 (/policy/) に書いたものと同じ。
 *
 *   score(説) = Σ 年代係数(著者) × 記述係数(出典)
 *   - 記述係数: 直接の叙述 1.0 / 言及・暗示 0.5
 *   - 同じ著者が同じ説を複数箇所で述べても、その著者の寄与は最大値 1 回分だけ
 *   - 採用: 最高点の説。同点なら支持する著者数 → 最古の著者の順
 *   - 異説の併記: 最高点の 50% 以上
 *   - 版を作る: 4 論点以上に出典として現れ、2 論点以上で採用説と異なる説を採る著者
 */
import { type AuthorId, authors, type WorkId, works } from '../data/sources';

type SourceKind = 'narrative' | 'mention';

interface ClaimSource {
  work: WorkId;
  /** 箇所。`270-283`、`4.765-803`、`2.4.2` など。 */
  loc: string;
  kind: SourceKind;
}

interface Variant {
  /** 説の要約。 */
  label: string;
  sources: ClaimSource[];
}

export interface Topic {
  /** 論点の名前。 */
  label: string;
  variants: Variant[];
}

export type ArticleClaims = Topic[];

const KIND_WEIGHT: Record<SourceKind, number> = { narrative: 1, mention: 0.5 };
/** 最高点に対してこの割合以上の説は、総合版に異説として併記する。 */
const ALTERNATIVE_RATIO = 0.5;
/** 版を作る条件: 出典として現れる論点の数の下限。 */
const VERSION_MIN_TOPICS = 4;
/** 版を作る条件: 採用説と異なる説を採る論点の数の下限。 */
const VERSION_MIN_DIFFERENCES = 2;

export type VariantStatus = 'adopted' | 'alternative' | 'minor';

interface ScoredVariant extends Variant {
  score: number;
  /** 説を支持する著者 (古い順)。 */
  authorIds: AuthorId[];
  status: VariantStatus;
}

export interface ScoredTopic {
  label: string;
  variants: ScoredVariant[];
}

function authorOf(source: ClaimSource): AuthorId {
  return works[source.work].author;
}

/** 著者ごとの寄与 (最大値) を合計してスコアを出す。 */
function scoreVariant(variant: Variant): { score: number; authorIds: AuthorId[] } {
  const best = new Map<AuthorId, number>();
  for (const source of variant.sources) {
    const author = authorOf(source);
    const weight = authors[author].era * KIND_WEIGHT[source.kind];
    best.set(author, Math.max(best.get(author) ?? 0, weight));
  }
  const authorIds = [...best.keys()].sort((a, b) => authors[a].year - authors[b].year);
  const score = [...best.values()].reduce((sum, weight) => sum + weight, 0);
  return { score, authorIds };
}

function oldestYear(authorIds: AuthorId[]): number {
  return Math.min(...authorIds.map((id) => authors[id].year));
}

/** 論点の説を、スコアの高い順 (同点は著者数 → 最古の著者の順) に並べて判定する。 */
export function scoreTopic(topic: Topic): ScoredTopic {
  const scored = topic.variants
    .map((variant) => ({ ...variant, ...scoreVariant(variant) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.authorIds.length - a.authorIds.length ||
        oldestYear(a.authorIds) - oldestYear(b.authorIds),
    );
  const top = scored[0]?.score ?? 0;
  const variants = scored.map((variant, index): ScoredVariant => {
    const status: VariantStatus =
      index === 0 ? 'adopted' : variant.score >= top * ALTERNATIVE_RATIO ? 'alternative' : 'minor';
    return { ...variant, status };
  });
  return { label: topic.label, variants };
}

export interface AuthorSummary {
  authorId: AuthorId;
  /** 出典として現れる論点の数。 */
  topics: number;
  /** 採用説と異なる説だけを採る論点の数。 */
  differences: number;
  /** 版を作る条件を満たすか。 */
  needsVersion: boolean;
}

/** 著者ごとに、版を作る条件を満たすかを判定する。古い著者から順に返す。 */
export function summarizeAuthors(topics: ScoredTopic[]): AuthorSummary[] {
  const summaries = new Map<AuthorId, { topics: number; differences: number }>();
  for (const topic of topics) {
    const supported = new Map<AuthorId, Set<VariantStatus>>();
    for (const variant of topic.variants) {
      for (const author of variant.authorIds) {
        supported.set(author, (supported.get(author) ?? new Set()).add(variant.status));
      }
    }
    for (const [author, statuses] of supported) {
      const summary = summaries.get(author) ?? { topics: 0, differences: 0 };
      summary.topics += 1;
      if (!statuses.has('adopted')) summary.differences += 1;
      summaries.set(author, summary);
    }
  }
  return [...summaries]
    .map(([authorId, { topics, differences }]) => ({
      authorId,
      topics,
      differences,
      needsVersion: topics >= VERSION_MIN_TOPICS && differences >= VERSION_MIN_DIFFERENCES,
    }))
    .sort((a, b) => authors[a.authorId].year - authors[b.authorId].year);
}

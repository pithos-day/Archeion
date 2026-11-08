import type { ArticleClaims } from '../../lib/claims';

/** オデュッセウスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '父',
    variants: [
      {
        label: 'ラエルテス',
        sources: [
          { work: 'hom-od', loc: '24.269-270', kind: 'narrative' },
          { work: 'hom-od', loc: '9.19', kind: 'mention' },
          { work: 'apollod-lib', loc: '3.10.8', kind: 'mention' },
          { work: 'apollod-ep', loc: '3.12', kind: 'narrative' },
        ],
      },
      {
        label: 'シーシュポス',
        sources: [
          { work: 'soph-aj', loc: '189-190', kind: 'mention' },
          { work: 'soph-ph', loc: '417', kind: 'mention' },
          { work: 'eur-cyc', loc: '104', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '出征を逃れようとしたか',
    variants: [
      {
        label: '狂気を装ったが、パラメデスに見破られた',
        sources: [{ work: 'apollod-ep', loc: '3.7', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'アキレウスの武具',
    variants: [
      {
        label: 'アイアスと争って勝ち取った',
        sources: [
          { work: 'hom-od', loc: '11.543-547', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.6', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ピロクテテスを迎えに行った仲間',
    variants: [
      {
        label: 'ネオプトレモス',
        sources: [{ work: 'soph-ph', loc: '1-7', kind: 'narrative' }],
      },
      {
        label: 'ディオメデス',
        sources: [{ work: 'apollod-ep', loc: '5.8', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '木馬',
    variants: [
      {
        label: 'オデュッセウスが計略として城内へ送り込んだ',
        sources: [
          { work: 'hom-od', loc: '8.492-495', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.14', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '漂流の期間',
    variants: [
      {
        label: '出征から二十年目に帰国した',
        sources: [{ work: 'hom-od', loc: '2.174-176', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'カリュプソのもとにいた期間',
    variants: [
      {
        label: '七年',
        sources: [{ work: 'hom-od', loc: '7.259-260', kind: 'narrative' }],
      },
      {
        label: '五年',
        sources: [{ work: 'apollod-ep', loc: '7.24', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '死',
    variants: [
      {
        label: '老年に穏やかな死を迎える（テイレシアスの予言）',
        sources: [{ work: 'hom-od', loc: '11.134-137', kind: 'mention' }],
      },
      {
        label: 'キルケーとの子テレゴノスに誤って殺された',
        sources: [{ work: 'apollod-ep', loc: '7.36', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

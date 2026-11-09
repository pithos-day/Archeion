import type { ArticleClaims } from '../../lib/claims';

/** キルケーの論点表。 */
const claims: ArticleClaims = [
  {
    label: '両親',
    variants: [
      {
        label: 'ヘリオスとペルセ（ペルセイス）の娘',
        sources: [
          { work: 'hom-od', loc: '10.135-139', kind: 'narrative' },
          { work: 'hes-th', loc: '956-957', kind: 'narrative' },
          { work: 'ov-met', loc: '14.10', kind: 'mention' },
          { work: 'apollod-ep', loc: '7.14', kind: 'narrative' },
          { work: 'hyg-fab', loc: 'pr', kind: 'narrative' },
        ],
      },
      {
        label: 'アイエテスとヘカテの娘',
        sources: [{ work: 'diod-1-5', loc: '4.45.3', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '住まい',
    variants: [
      {
        label: 'アイアイエ島',
        sources: [
          { work: 'hom-od', loc: '10.135-136', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.24', kind: 'narrative' },
          { work: 'apollod-ep', loc: '7.14', kind: 'narrative' },
        ],
      },
      {
        label: 'イタリアの岬（キルカイオン）',
        sources: [{ work: 'diod-1-5', loc: '4.45.5', kind: 'mention' }],
      },
      {
        label: 'アエナリア島',
        sources: [{ work: 'hyg-fab', loc: '125.8', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'オデュッセウスの部下を変えた姿',
    variants: [
      {
        label: '豚',
        sources: [
          { work: 'hom-od', loc: '10.237-240', kind: 'narrative' },
          { work: 'ov-met', loc: '14.276-286', kind: 'narrative' },
        ],
      },
      {
        label: '狼、豚、驢馬、獅子',
        sources: [{ work: 'apollod-ep', loc: '7.15', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'オデュッセウスの滞在',
    variants: [
      {
        label: '一年',
        sources: [
          { work: 'hom-od', loc: '10.467-469', kind: 'narrative' },
          { work: 'ov-met', loc: '14.308', kind: 'narrative' },
          { work: 'apollod-ep', loc: '7.17', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'オデュッセウスとの子',
    variants: [
      {
        label: 'アグリオスとラティノス',
        sources: [{ work: 'hes-th', loc: '1011-1013', kind: 'narrative' }],
      },
      {
        label: 'テレゴノス',
        sources: [
          { work: 'telegonia', loc: 'telegonia', kind: 'mention' },
          { work: 'apollod-ep', loc: '7.16', kind: 'narrative' },
        ],
      },
      {
        label: 'ナウシトオスとテレゴノス',
        sources: [{ work: 'hyg-fab', loc: '125.10', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'オデュッセウスの死後',
    variants: [
      {
        label: 'テレマコスがキルケーを妻とした',
        sources: [
          { work: 'telegonia', loc: 'telegonia', kind: 'narrative' },
          { work: 'hyg-fab', loc: '127.3', kind: 'narrative' },
        ],
      },
    ],
  },
];

export default claims;

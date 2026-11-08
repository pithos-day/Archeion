import type { ArticleClaims } from '../../lib/claims';

/** アルキュオネウスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '素性',
    variants: [
      {
        label: 'ガイアから生まれた巨人族（ギガース）の一人',
        sources: [
          { work: 'apollod-lib', loc: '1.6.1', kind: 'narrative' },
          { work: 'nonn-dion', loc: '48.71-76', kind: 'narrative' },
        ],
      },
      {
        label: '山のように大きい牛飼い',
        sources: [{ work: 'pind-i', loc: '6.31-35', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '戦いの場所',
    variants: [
      {
        label: 'プレグラ',
        sources: [
          { work: 'pind-i', loc: '6.31-35', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.6.1', kind: 'mention' },
        ],
      },
      {
        label: '故郷のパレネ',
        sources: [{ work: 'apollod-lib', loc: '1.6.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '討った者',
    variants: [
      {
        label: 'ヘラクレス',
        sources: [
          { work: 'pind-n', loc: '4.25-30', kind: 'mention' },
          { work: 'pind-i', loc: '6.31-35', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.6.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '殺し方',
    variants: [
      {
        label: 'ヘラクレスが弓で射た',
        sources: [
          { work: 'pind-i', loc: '6.31-35', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.6.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '不死の条件',
    variants: [
      {
        label: '生まれた土地で戦うかぎり不死であり、外へ引きずり出されて死んだ',
        sources: [{ work: 'apollod-lib', loc: '1.6.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ヘリオスの牛',
    variants: [
      {
        label: 'エリュテイアからヘリオスの牛を奪った',
        sources: [{ work: 'apollod-lib', loc: '1.6.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '石による武勇',
    variants: [
      {
        label: '石で戦車十二台と、その英雄二十四人を倒した',
        sources: [{ work: 'pind-n', loc: '4.27-30', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ディオニュソスとの戦い',
    variants: [
      {
        label: 'ディオニュソスに向けて、トラキアのハイモス山の峰を投げつけた',
        sources: [{ work: 'nonn-dion', loc: '48.71-76', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

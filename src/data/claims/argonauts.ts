import type { ArticleClaims } from '../../lib/claims';

/** アルゴナウタイの論点表。 */
const claims: ArticleClaims = [
  {
    label: '乗組員の人数',
    variants: [
      {
        label: 'イアソンを含めて五十四人',
        sources: [{ work: 'diod-1-5', loc: '4.41.2', kind: 'narrative' }],
      },
      {
        label: '名簿に四十四人の名を挙げる（イアソンを除く）',
        sources: [{ work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ヘラクレスの離脱',
    variants: [
      {
        label: 'ミュシアでヒュラスを探すうちに、置き去りにされた',
        sources: [
          { work: 'ap-rh', loc: '1.1240-1283', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.19', kind: 'narrative' },
          { work: 'hyg-fab', loc: '14.25', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.44.5', kind: 'mention' },
        ],
      },
      {
        label: '離脱せず、帰路まで同行した',
        sources: [
          { work: 'diod-1-5', loc: '4.49.3-4.49.6', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.53.4', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: 'ヘラクレスが置き去りにされたわけ',
    variants: [
      {
        label: '船が風を受けて出航し、ヘラクレスが残された',
        sources: [
          { work: 'ap-rh', loc: '1.1273-1283', kind: 'narrative' },
          { work: 'hyg-fab', loc: '14.25', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'アプシュルトスを殺した者',
    variants: [
      {
        label: 'イアソンが、神殿の前で打った',
        sources: [{ work: 'ap-rh', loc: '4.464-469', kind: 'narrative' }],
      },
      {
        label: 'メデイアが殺し、遺体を切り刻んで海に投げた',
        sources: [{ work: 'apollod-lib', loc: '1.9.24', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '金羊毛を守る竜',
    variants: [
      {
        label: 'メデイアが薬で眠らせた',
        sources: [
          { work: 'ap-rh', loc: '4.156-161', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.23', kind: 'narrative' },
        ],
      },
      {
        label: 'メデイアが薬で殺した',
        sources: [{ work: 'diod-1-5', loc: '4.48.3', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'リビュアでの船の運搬',
    variants: [
      {
        label: '船と積み荷を担いで十二日間、砂漠を越えた',
        sources: [
          { work: 'pind-p', loc: '4.25-27', kind: 'narrative' },
          { work: 'ap-rh', loc: '4.1381-1392', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ペリアスを殺した方法',
    variants: [
      {
        label: 'メデイアの策で、娘たちが父を煮た',
        sources: [
          { work: 'apollod-lib', loc: '1.9.27', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.51.1-4.52.2', kind: 'narrative' },
          { work: 'hyg-fab', loc: '24.2-24.4', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'シュムプレガデスの通り方',
    variants: [
      {
        label: 'ピネウスの助言で、鳩を先に放った',
        sources: [
          { work: 'apollod-lib', loc: '1.9.22', kind: 'narrative' },
          { work: 'hyg-fab', loc: '19.4', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'イアソンがサンダルを失った川',
    variants: [
      {
        label: 'アナウロス川',
        sources: [{ work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' }],
      },
      {
        label: 'エウヘヌス川',
        sources: [{ work: 'hyg-fab', loc: '12.2', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

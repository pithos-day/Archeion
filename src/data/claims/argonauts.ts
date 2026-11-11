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
        label: '名簿の四十四人にイアソンを加えた四十五人',
        sources: [{ work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ヘラクレスが離脱した場所',
    variants: [
      {
        label: 'ミュシア（ヒュラスを探した地）',
        sources: [
          { work: 'apollod-lib', loc: '1.9.19', kind: 'narrative' },
          { work: 'hyg-fab', loc: '14.25', kind: 'narrative' },
        ],
      },
      {
        label: 'アジア（水汲みに出た地）',
        sources: [{ work: 'diod-1-5', loc: '4.44.5', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ヘラクレスが置き去りにされた理由',
    variants: [
      {
        label: '船が風に流され、ヘラクレスを待てなかった',
        sources: [
          { work: 'hyg-fab', loc: '14.25', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.19', kind: 'mention' },
        ],
      },
      {
        label: 'イアソンがヘラクレスの名声をおさえるため、わざと置き去りにした',
        sources: [{ work: 'ap-rh', loc: '1.1290-1292', kind: 'narrative' }],
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
        sources: [{ work: 'apollod-lib', loc: '1.9.23', kind: 'narrative' }],
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
          { work: 'diod-1-5', loc: '4.50.5', kind: 'mention' },
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

import type { ArticleClaims } from '../../lib/claims';

/** シーシュポスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '父',
    variants: [
      {
        label: 'アイオロス',
        sources: [
          { work: 'hom-il', loc: '6.152-155', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.7.3', kind: 'narrative' },
          { work: 'ov-met', loc: '13.26', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '妻',
    variants: [
      {
        label: 'アトラスの娘メロペ',
        sources: [
          { work: 'apollod-lib', loc: '1.9.3', kind: 'narrative' },
          { work: 'apollod-lib', loc: '3.10.1', kind: 'mention' },
          { work: 'ov-fast', loc: '4.175', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '子',
    variants: [
      {
        label: 'グラウコス',
        sources: [
          { work: 'hom-il', loc: '6.152-155', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.3', kind: 'narrative' },
          { work: 'paus', loc: '2.4.3', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'コリントスとの関わり',
    variants: [
      {
        label: 'エピュラ（コリントス）に住み、あるいは建てた',
        sources: [
          { work: 'hom-il', loc: '6.152-155', kind: 'narrative' },
          { work: 'pind-o', loc: '13.52', kind: 'mention' },
          { work: 'eur-med', loc: '1381', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.9.3', kind: 'narrative' },
        ],
      },
      {
        label: 'メデイアから支配権を譲られた',
        sources: [{ work: 'paus', loc: '2.3.11', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '人物像',
    variants: [
      {
        label: '策略にすぐれていた',
        sources: [
          { work: 'hom-il', loc: '6.152-155', kind: 'narrative' },
          { work: 'pind-o', loc: '13.52', kind: 'narrative' },
          { work: 'ov-met', loc: '13.31-32', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: 'オデュッセウスの父',
    variants: [
      {
        label: 'ラエルテス',
        sources: [
          { work: 'hom-od', loc: '24.269-270', kind: 'narrative' },
          { work: 'hom-od', loc: '9.19', kind: 'mention' },
          { work: 'apollod-lib', loc: '3.10.8', kind: 'mention' },
        ],
      },
      {
        label: 'シーシュポス',
        sources: [
          { work: 'soph-aj', loc: '189-190', kind: 'mention' },
          { work: 'soph-ph', loc: '417', kind: 'mention' },
          { work: 'eur-cyc', loc: '104', kind: 'mention' },
          { work: 'eur-ia', loc: '1362', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '罰を受けた理由',
    variants: [
      {
        label: 'ゼウスがアイギナをさらったことを、アソポスに告げた',
        sources: [
          { work: 'apollod-lib', loc: '1.9.3', kind: 'narrative' },
          { work: 'paus', loc: '2.5.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '罰の内容',
    variants: [
      {
        label: '冥府で岩を押し上げ続ける',
        sources: [
          { work: 'hom-od', loc: '11.593-600', kind: 'narrative' },
          { work: 'eur-her', loc: '1103', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.9.3', kind: 'narrative' },
          { work: 'ov-met', loc: '4.460', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '岩の動かし方',
    variants: [
      {
        label: '手と足で押し上げる',
        sources: [{ work: 'hom-od', loc: '11.593-600', kind: 'narrative' }],
      },
      {
        label: '手と頭で転がす',
        sources: [{ work: 'apollod-lib', loc: '1.9.3', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

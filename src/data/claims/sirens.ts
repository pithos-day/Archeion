import type { ArticleClaims } from '../../lib/claims';

/** セイレーンの論点表。 */
const claims: ArticleClaims = [
  {
    label: '数',
    variants: [
      {
        label: '二人',
        sources: [
          { work: 'hom-od', loc: '12.52', kind: 'mention' },
          { work: 'hom-od', loc: '12.167', kind: 'narrative' },
        ],
      },
      {
        label: '三人',
        sources: [
          { work: 'apollod-ep', loc: '7.18', kind: 'narrative' },
          { work: 'hyg-fab', loc: 'pr', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '両親',
    variants: [
      {
        label: '河神アケロオスとムーサの娘',
        sources: [
          { work: 'ap-rh', loc: '4.895-896', kind: 'narrative' },
          { work: 'ov-met', loc: '5.552', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.3.4', kind: 'narrative' },
          { work: 'apollod-ep', loc: '7.18', kind: 'narrative' },
          { work: 'paus', loc: '9.34.3', kind: 'mention' },
          { work: 'hyg-fab', loc: '141.1', kind: 'mention' },
        ],
      },
      {
        label: '大地の娘',
        sources: [{ work: 'eur-hel', loc: '167-169', kind: 'mention' }],
      },
    ],
  },
  {
    label: '姿',
    variants: [
      {
        label: '鳥の体と乙女の顔をもつ',
        sources: [
          { work: 'eur-hel', loc: '167-169', kind: 'mention' },
          { work: 'ap-rh', loc: '4.898-899', kind: 'narrative' },
          { work: 'ov-met', loc: '5.552-553', kind: 'narrative' },
          { work: 'apollod-ep', loc: '7.19', kind: 'narrative' },
          { work: 'hyg-fab', loc: '125.13', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ペルセポネとの関わり',
    variants: [
      {
        label: 'かつてペルセポネに仕えていた',
        sources: [
          { work: 'ap-rh', loc: '4.896-898', kind: 'narrative' },
          { work: 'ov-met', loc: '5.554-555', kind: 'narrative' },
          { work: 'hyg-fab', loc: '141.1', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '翼を得たわけ',
    variants: [
      {
        label: 'ペルセポネを探すため、自ら願って翼を得た',
        sources: [{ work: 'ov-met', loc: '5.552-563', kind: 'narrative' }],
      },
      {
        label: 'ペルセポネを助けなかった罰として、デメテルに翼のある姿にされた',
        sources: [{ work: 'hyg-fab', loc: '141.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'アルゴ船の通過',
    variants: [
      {
        label: 'オルペウスの竪琴の歌に打ち消された',
        sources: [
          { work: 'ap-rh', loc: '4.905-909', kind: 'narrative' },
          { work: 'herodor', loc: '39', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.9.25', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'オデュッセウスが通り過ぎた後',
    variants: [
      {
        label: '船が通り過ぎたら死ぬ定めで、死んだ',
        sources: [
          { work: 'apollod-ep', loc: '7.19', kind: 'narrative' },
          { work: 'hyg-fab', loc: '141.2', kind: 'narrative' },
        ],
      },
    ],
  },
];

export default claims;

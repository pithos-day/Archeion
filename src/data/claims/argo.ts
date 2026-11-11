import type { ArticleClaims } from '../../lib/claims';

/** アルゴー船の論点表。 */
const claims: ArticleClaims = [
  {
    label: '名前の由来',
    variants: [
      {
        label: '建造者アルゴスの名から',
        sources: [
          { work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.41.3', kind: 'narrative' },
          { work: 'hyg-astr', loc: '2.37', kind: 'narrative' },
        ],
      },
      {
        label: '速さから（古い語で「アルゴス」は「速い」の意）',
        sources: [
          { work: 'diod-1-5', loc: '4.41.3', kind: 'narrative' },
          { work: 'hyg-astr', loc: '2.37', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '建造者と助けた神',
    variants: [
      {
        label: 'アルゴスが、アテナの指図で造った',
        sources: [
          { work: 'ap-rh', loc: '1.18-19', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' },
          { work: 'hyg-fab', loc: '14.33', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '建造者アルゴスの系譜',
    variants: [
      {
        label: 'アレストルの子',
        sources: [{ work: 'ap-rh', loc: '1.111-112', kind: 'narrative' }],
      },
      {
        label: 'プリクソスの子',
        sources: [{ work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' }],
      },
      {
        label: 'ポリュボスとアルギアの子、あるいはダナオスの子',
        sources: [
          { work: 'hyg-fab', loc: '14.10', kind: 'narrative' },
          { work: 'hyg-fab', loc: '14.32', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '船の木材',
    variants: [
      {
        label: 'ペリオン山の木',
        sources: [
          { work: 'eur-med', loc: '3-4', kind: 'mention' },
          { work: 'ap-rh', loc: '2.1187-1189', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.41.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '建造の場所',
    variants: [
      {
        label: 'パガサイ（イオルコスの港）',
        sources: [
          { work: 'ap-rh', loc: '1.318-319', kind: 'mention' },
          { work: 'strab', loc: '9.5.15', kind: 'narrative' },
          { work: 'hyg-astr', loc: '2.37', kind: 'narrative' },
        ],
      },
      {
        label: 'マグネシアの町デメトリアス',
        sources: [{ work: 'hyg-astr', loc: '2.37', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '物言う船材の位置',
    variants: [
      {
        label: '竜骨（アポロニオスの語は「ステイラ」）',
        sources: [
          { work: 'ap-rh', loc: '1.524-527', kind: 'narrative' },
          { work: 'ap-rh', loc: '4.580-583', kind: 'narrative' },
        ],
      },
      {
        label: '船首',
        sources: [{ work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '船の大きさ',
    variants: [
      {
        label: '五十の櫂をもつ船',
        sources: [{ work: 'apollod-lib', loc: '1.9.16', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '最初の船か',
    variants: [
      {
        label: 'アルゴー船が最初の船（あるいは最初の大型船）',
        sources: [
          { work: 'eratosth-cat', loc: '35', kind: 'narrative' },
          { work: 'hyg-astr', loc: '2.37', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.41.1', kind: 'mention' },
          { work: 'val-flac', loc: '1.1-2', kind: 'mention' },
        ],
      },
      {
        label: 'ダナオスが、アテナの指図で最初の船を造った',
        sources: [
          { work: 'apollod-lib', loc: '2.1.4', kind: 'narrative' },
          { work: 'hyg-fab', loc: '168.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '岩を通り抜けるときの助け',
    variants: [
      {
        label: 'ヘラが助けた',
        sources: [
          { work: 'hom-od', loc: '12.69-72', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.22', kind: 'narrative' },
        ],
      },
      {
        label: 'アテナが岩を押さえ、船を押し出した',
        sources: [{ work: 'ap-rh', loc: '2.598-603', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '岩を通り抜けて失ったもの',
    variants: [
      {
        label: '船尾の飾り（アプラストン）の先端',
        sources: [
          { work: 'ap-rh', loc: '2.601-602', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.9.22', kind: 'narrative' },
          { work: 'val-flac', loc: '4.691-692', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'リビュアでの船',
    variants: [
      {
        label: '船を担いで十二日間、陸を運んだ',
        sources: [
          { work: 'pind-p', loc: '4.25-27', kind: 'narrative' },
          { work: 'ap-rh', loc: '4.1381-1392', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '航海後の船',
    variants: [
      {
        label: 'コリントスのイストモスでポセイドンに奉納された',
        sources: [
          { work: 'apollod-lib', loc: '1.9.27', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.53.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'イアソンの死',
    variants: [
      {
        label: 'アルゴー船の残骸に頭を打たれて死ぬ（メデイアの予言）',
        sources: [{ work: 'eur-med', loc: '1386-1388', kind: 'narrative' }],
      },
      {
        label: '悲嘆に耐えられず、自ら命を絶った',
        sources: [{ work: 'diod-1-5', loc: '4.55.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '星座になった理由',
    variants: [
      {
        label: 'アテナが造った船だから、アテナが星座にした',
        sources: [
          { work: 'eratosth-cat', loc: '35', kind: 'narrative' },
          { work: 'hyg-fab', loc: '14.33', kind: 'narrative' },
        ],
      },
      {
        label: '最初の船だったから',
        sources: [{ work: 'hyg-astr', loc: '2.37', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

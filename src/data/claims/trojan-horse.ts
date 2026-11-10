import type { ArticleClaims } from '../../lib/claims';

/** トロイアの木馬の論点表。 */
const claims: ArticleClaims = [
  {
    label: '造った者',
    variants: [
      {
        label: 'エペイオスが造った',
        sources: [
          { work: 'hom-od', loc: '8.492-495', kind: 'mention' },
          { work: 'hom-od', loc: '11.523', kind: 'mention' },
          { work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' },
          { work: 'eur-tro', loc: '9-12', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.14', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.264', kind: 'mention' },
          { work: 'hyg-fab', loc: '108.1', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '12.106-110', kind: 'narrative' },
          { work: 'paus', loc: '1.23.8', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '誰の考えか',
    variants: [
      {
        label: 'アテナの意向や助言による',
        sources: [
          { work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' },
          { work: 'eur-tro', loc: '9-12', kind: 'mention' },
          { work: 'hyg-fab', loc: '108.1', kind: 'narrative' },
        ],
      },
      {
        label: 'オデュッセウスが考え、エペイオスに造らせた',
        sources: [
          { work: 'apollod-ep', loc: '5.14', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '12.21-45', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '中に入った人数',
    variants: [
      {
        label: '9人の名を挙げる',
        sources: [
          { work: 'hyg-fab', loc: '108.1', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.259-264', kind: 'mention' },
        ],
      },
      {
        label: '50人',
        sources: [{ work: 'apollod-ep', loc: '5.14', kind: 'narrative' }],
      },
      {
        label: '30人の名を挙げ、ほかにも入ったとする',
        sources: [{ work: 'quint-smyrn', loc: '12.314-335', kind: 'narrative' }],
      },
      {
        label: '3000人（『小イリアス』の説として）',
        sources: [{ work: 'apollod-ep', loc: '5.14', kind: 'mention' }],
      },
    ],
  },
  {
    label: '木馬についての議論',
    variants: [
      {
        label: '壊すか、崖から落とすか、神への捧げ物として残すかで分かれ、残すことになった',
        sources: [
          { work: 'hom-od', loc: '8.500-513', kind: 'narrative' },
          { work: 'iliou-persis', loc: 'iliou_persis', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.16-5.17', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.31-39', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '市内への入れ方',
    variants: [
      {
        label: '城壁の一部を壊して入れた',
        sources: [
          { work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.234-240', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '蛇に殺された者',
    variants: [
      {
        label: 'ラオコーンと、息子の一人',
        sources: [{ work: 'iliou-persis', loc: 'iliou_persis', kind: 'narrative' }],
      },
      {
        label: 'ラオコーンと、二人の息子',
        sources: [
          { work: 'verg-aen', loc: '2.199-227', kind: 'narrative' },
          { work: 'hyg-fab', loc: '135.2', kind: 'narrative' },
        ],
      },
      {
        label: 'ラオコーンの二人の息子',
        sources: [
          { work: 'apollod-ep', loc: '5.18', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '12.447-480', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '蛇を送った神',
    variants: [
      {
        label: 'アポロン',
        sources: [
          { work: 'apollod-ep', loc: '5.18', kind: 'narrative' },
          { work: 'hyg-fab', loc: '135.2', kind: 'narrative' },
        ],
      },
      {
        label: 'アテナ',
        sources: [
          { work: 'quint-smyrn', loc: '12.447-480', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.225-227', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: 'ヘレネの呼びかけ',
    variants: [
      {
        label: 'ヘレネが妻たちの声をまねて中の者を呼び、オデュッセウスが答えさせなかった',
        sources: [
          { work: 'hom-od', loc: '4.271-289', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.19', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'シノンの役目',
    variants: [
      {
        label: '火を掲げて、テネドスの艦隊に合図を送った',
        sources: [
          { work: 'iliou-persis', loc: 'iliou_persis', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.15', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.19', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '13.23-29', kind: 'narrative' },
        ],
      },
      {
        label: '艦隊の船が掲げた火を合図に、木馬を開けた',
        sources: [
          { work: 'verg-aen', loc: '2.254-259', kind: 'narrative' },
          { work: 'hyg-fab', loc: '108.3', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '木馬の正体',
    variants: [
      {
        label: '勇士たちを中に隠した木の馬',
        sources: [
          { work: 'hom-od', loc: '8.500-515', kind: 'narrative' },
          { work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' },
          { work: 'iliou-persis', loc: 'iliou_persis', kind: 'narrative' },
          { work: 'eur-tro', loc: '9-12', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.14-5.20', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.13-20', kind: 'narrative' },
          { work: 'hyg-fab', loc: '108.1-108.3', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '12.314-335', kind: 'narrative' },
        ],
      },
      {
        label: '城壁を壊すための仕掛け（攻城の道具）',
        sources: [{ work: 'paus', loc: '1.23.8', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

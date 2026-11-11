import type { ArticleClaims } from '../../lib/claims';

/** イリオス（トロイア）の論点表。 */
const claims: ArticleClaims = [
  {
    label: '王家の系譜',
    variants: [
      {
        label: 'ダルダノス、エリクトニオス、トロス、イロス、ラオメドン、プリアモスと下る',
        sources: [
          { work: 'hom-il', loc: '20.215-240', kind: 'narrative' },
          { work: 'apollod-lib', loc: '3.12.1-3.12.3', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.75.1-4.75.4', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'イリオスを建てた者',
    variants: [
      {
        label: 'イロスが建て、自分の名にちなんで名づけた',
        sources: [
          { work: 'apollod-lib', loc: '3.12.3', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.75.3', kind: 'narrative' },
          { work: 'strab', loc: '13.1.25', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'パラディオンの由来',
    variants: [
      {
        label: 'アテナが、倒れたパラスに似せて造った像を、ゼウスがイロスのもとへ投げ落とした',
        sources: [{ work: 'apollod-lib', loc: '3.12.3', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'パラディオンの持ち出し',
    variants: [
      {
        label: 'オデュッセウスとディオメデスが、陥落の前にイリオスから盗み出した',
        sources: [
          { work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.10', kind: 'mention' },
          { work: 'apollod-ep', loc: '5.13', kind: 'narrative' },
          { work: 'verg-aen', loc: '2.162-170', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '城壁を築いた神',
    variants: [
      {
        label: 'ポセイドンとアポロンが、ラオメドンのために築いた',
        sources: [
          { work: 'hom-il', loc: '7.452-453', kind: 'mention' },
          { work: 'eur-tro', loc: '4-7', kind: 'mention' },
          { work: 'apollod-lib', loc: '2.5.9', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.1', kind: 'narrative' },
          { work: 'ov-met', loc: '11.199-204', kind: 'narrative' },
        ],
      },
      {
        label: 'ポセイドンが築き、アポロンは牛を飼っていた',
        sources: [{ work: 'hom-il', loc: '21.441-457', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '城壁の建設に加わった人間',
    variants: [
      {
        label: 'アイアコスが、神々に呼ばれて加わった',
        sources: [{ work: 'pind-o', loc: '8.31-46', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ラオメドンの違約',
    variants: [
      {
        label: '約束した賃金を払わなかった',
        sources: [
          { work: 'hom-il', loc: '21.441-457', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.9', kind: 'narrative' },
          { work: 'ov-met', loc: '11.204-206', kind: 'narrative' },
        ],
      },
      {
        label: 'その年に生まれる家畜を捧げる誓いを破った',
        sources: [{ work: 'hyg-fab', loc: '89.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '海獣の派遣',
    variants: [
      {
        label: 'ポセイドンが海獣を送り、ヘシオネが生贄に差し出された',
        sources: [
          { work: 'hom-il', loc: '20.144-148', kind: 'mention' },
          { work: 'apollod-lib', loc: '2.5.9', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.42.2-4.42.4', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.2-89.3', kind: 'narrative' },
          { work: 'ov-met', loc: '11.207-213', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ヘラクレスが海獣を退治した機会',
    variants: [
      {
        label: 'アルゴー船の遠征の途上',
        sources: [
          { work: 'diod-1-5', loc: '4.42.1-4.42.7', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.3', kind: 'narrative' },
        ],
      },
      {
        label: 'アマゾンの帯を取りに行った帰り（第九の功業）',
        sources: [{ work: 'apollod-lib', loc: '2.5.9', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ヘラクレスの遠征の船の数',
    variants: [
      {
        label: '六隻',
        sources: [
          { work: 'hom-il', loc: '5.640-642', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.32.2', kind: 'narrative' },
        ],
      },
      {
        label: '十八隻の五十橈船',
        sources: [
          { work: 'apollod-lib', loc: '2.6.4', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.32.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '最初に城壁を破った者と、ヘシオネの行方',
    variants: [
      {
        label: 'テラモンが最初に城内へ入り、褒賞としてヘシオネを与えられた',
        sources: [
          { work: 'apollod-lib', loc: '2.6.4', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.32.5', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.5', kind: 'narrative' },
          { work: 'ov-met', loc: '11.216-217', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '陥落のあとに王となった者',
    variants: [
      {
        label: 'ポダルケスが王となり、のちプリアモスと呼ばれた',
        sources: [
          { work: 'apollod-lib', loc: '3.12.5', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.4', kind: 'narrative' },
        ],
      },
      {
        label: 'ラオメドンに逆らったプリアモスに、正義のゆえに王位が与えられた',
        sources: [
          { work: 'diod-1-5', loc: '4.32.4-4.32.5', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.49.6', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'イリオス陥落後のアイネイアス',
    variants: [
      {
        label: '一行を連れて船出し、新しい土地を求めた',
        sources: [
          { work: 'iliou-persis', loc: 'iliou_persis', kind: 'mention' },
          { work: 'verg-aen', loc: '3.1-3.12', kind: 'narrative' },
          { work: 'strab', loc: '13.1.53', kind: 'narrative' },
        ],
      },
      {
        label: 'アイネイアスとその子孫が、トロイア人を治める',
        sources: [{ work: 'hom-il', loc: '20.302-308', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '後世のイリオス',
    variants: [
      {
        label: '古いイリオスの跡ではなく、約30スタディオン離れた別の場所にある',
        sources: [
          { work: 'strab', loc: '13.1.25', kind: 'narrative' },
          { work: 'strab', loc: '13.1.35', kind: 'narrative' },
          { work: 'strab', loc: '13.1.38', kind: 'narrative' },
        ],
      },
      {
        label: 'イリオス人は、昔と同じ都市だと主張した',
        sources: [{ work: 'strab', loc: '13.1.42', kind: 'mention' }],
      },
    ],
  },
];

export default claims;

import type { ArticleClaims } from '../../lib/claims';

/** ポセイドンの論点表。 */
const claims: ArticleClaims = [
  {
    label: '幼時に呑まれたか',
    variants: [
      {
        label: 'クロノスに呑まれ、のちにゼウスの策で吐き出された',
        sources: [
          { work: 'hes-th', loc: '453-467', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.1.5', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
        ],
      },
      {
        label: 'レアが仔馬をすり替え、呑まれずにアルカディアで育った',
        sources: [{ work: 'paus', loc: '8.8.2', kind: 'narrative' }],
      },
      {
        label: 'クロノスに波の下へ投げ込まれた',
        sources: [{ work: 'hyg-fab', loc: '139.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '兄弟を吐き出させた手段',
    variants: [
      {
        label: 'ガイアの計略にかかって吐き出した',
        sources: [{ work: 'hes-th', loc: '492-497', kind: 'narrative' }],
      },
      {
        label: 'メティスが飲ませた薬で吐き出した',
        sources: [{ work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ゼウスとの長幼',
    variants: [
      {
        label: 'ポセイドンが年長で、ゼウスは末子',
        sources: [
          { work: 'hom-od', loc: '13.141-142', kind: 'narrative' },
          { work: 'hes-th', loc: '477-479', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.1.5', kind: 'mention' },
        ],
      },
      {
        label: 'ゼウスが年長',
        sources: [
          { work: 'hom-il', loc: '13.354-355', kind: 'narrative' },
          { work: 'hom-il', loc: '15.165-166', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '世界の分け前',
    variants: [
      {
        label: 'ゼウス、ポセイドン、ハデスがくじで分け、ポセイドンは海を得た',
        sources: [
          { work: 'hom-il', loc: '15.187-193', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'アムピトリテとの結婚',
    variants: [
      {
        label: 'アムピトリテを妻とし、トリトンをもうけた',
        sources: [
          { work: 'hes-th', loc: '930-933', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.4.5', kind: 'narrative' },
          { work: 'eratosth-cat', loc: '31', kind: 'narrative' },
          { work: 'hyg-astr', loc: '2.17', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'アテナイをめぐる争いの審判',
    variants: [
      {
        label: '十二神が裁いた',
        sources: [
          { work: 'apollod-lib', loc: '3.14.1', kind: 'narrative' },
          { work: 'ov-met', loc: '6.70-82', kind: 'mention' },
        ],
      },
      {
        label: 'ゼウスが裁いた',
        sources: [{ work: 'hyg-fab', loc: '164.1', kind: 'narrative' }],
      },
      {
        label: 'ケクロプスとクラナオスが裁いた',
        sources: [{ work: 'apollod-lib', loc: '3.14.1', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'アテナイをめぐる争いの結末',
    variants: [
      {
        label: '三叉の矛で海水を湧かせたポセイドンが、オリーブを植えたアテナに敗れた',
        sources: [
          { work: 'hdt', loc: '8.55', kind: 'mention' },
          { work: 'apollod-lib', loc: '3.14.1', kind: 'narrative' },
          { work: 'hyg-fab', loc: '164.1-164.3', kind: 'narrative' },
          { work: 'ov-met', loc: '6.70-82', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '敗れたポセイドンの怒り',
    variants: [
      {
        label: 'トリアシア平野を水浸しにし、アッティカを水没させた',
        sources: [{ work: 'apollod-lib', loc: '3.14.1', kind: 'narrative' }],
      },
      {
        label: '海水を流そうとしたが、ゼウスの命を受けたヘルメスに止められた',
        sources: [{ work: 'hyg-fab', loc: '164.2', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'アレイオンの親',
    variants: [
      {
        label: 'ポセイドンと、牝馬に姿を変えたデメテル',
        sources: [{ work: 'paus', loc: '8.25.5-8.25.7', kind: 'narrative' }],
      },
      {
        label: '大地ガイア（アンティマコスの説）',
        sources: [{ work: 'paus', loc: '8.25.8-8.25.9', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'ペガソスの父',
    variants: [
      {
        label: 'ポセイドンがメドゥーサと交わってもうけた',
        sources: [
          { work: 'hes-th', loc: '278-281', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.3', kind: 'narrative' },
          { work: 'hyg-fab', loc: '151.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'イリオスの城壁を築いた者',
    variants: [
      {
        label: 'ポセイドンとアポロンが、ラオメドンに雇われて築いた',
        sources: [
          { work: 'hom-il', loc: '7.452-453', kind: 'narrative' },
          { work: 'pind-o', loc: '8.31-33', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.9', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.1', kind: 'narrative' },
        ],
      },
      {
        label: 'ポセイドンが築き、アポロンは牛を飼った',
        sources: [{ work: 'hom-il', loc: '21.443-449', kind: 'narrative' }],
      },
      {
        label: '二神が築くとき、人間のアイアコスが加わった',
        sources: [{ work: 'pind-o', loc: '8.31-33', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ラオメドンへの報復',
    variants: [
      {
        label: 'ラオメドンが報酬を払わず、ポセイドンが海の怪物を送った',
        sources: [
          { work: 'hom-il', loc: '21.450-457', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.9', kind: 'narrative' },
          { work: 'hyg-fab', loc: '89.1-89.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ゼウスへの反抗',
    variants: [
      {
        label:
          'ヘラ、アテナとともにゼウスを縛ろうとし、トロイア戦争ではゼウスに背いてギリシャ方を助けた',
        sources: [
          { work: 'hom-il', loc: '1.396-406', kind: 'narrative' },
          { work: 'hom-il', loc: '13.10-16', kind: 'narrative' },
          { work: 'hom-il', loc: '14.135-152', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'オデュッセウスへの怒り',
    variants: [
      {
        label: '子のポリュペモスを盲目にされて怒り、オデュッセウスの帰国を妨げた',
        sources: [
          { work: 'hom-od', loc: '1.68-75', kind: 'narrative' },
          { work: 'hom-od', loc: '9.526-536', kind: 'narrative' },
          { work: 'apollod-ep', loc: '7.9', kind: 'narrative' },
          { work: 'hyg-fab', loc: '125.17', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'テセウスの父',
    variants: [
      {
        label: 'アイゲウスの子（アイトラは同じ夜にポセイドンとも交わった）',
        sources: [
          { work: 'apollod-lib', loc: '3.15.7', kind: 'narrative' },
          { work: 'hyg-fab', loc: '37.1', kind: 'narrative' },
        ],
      },
      {
        label: 'ポセイドンの子（ピッテウスがそう言い広めた）',
        sources: [{ work: 'plut-thes', loc: '6.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ミノスの牡牛',
    variants: [
      {
        label:
          'ミノスの祈りに応えて海から牡牛を送ったが、ミノスが生贄にしなかったため、牡牛を荒れさせた',
        sources: [
          { work: 'apollod-lib', loc: '3.1.3', kind: 'narrative' },
          { work: 'apollod-lib', loc: '3.1.4', kind: 'narrative' },
        ],
      },
    ],
  },
];

export default claims;

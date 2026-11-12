import type { ArticleClaims } from '../../lib/claims';

/** ハデスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '誕生',
    variants: [
      {
        label: '生まれるたびにクロノスに呑まれ、のちに吐き出された',
        sources: [
          { work: 'hes-th', loc: '453-467', kind: 'narrative' },
          { work: 'hes-th', loc: '493-497', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.1.5', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ハデスの兜',
    variants: [
      {
        label: 'ハデスは兜を持ち、それをかぶると姿が見えなくなる',
        sources: [
          { work: 'hom-il', loc: '5.844-845', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '世界の分け方',
    variants: [
      {
        label: 'ゼウス、ポセイドン、ハデスが三つに分け、ハデスが冥府を得た',
        sources: [
          { work: 'hom-il', loc: '15.187-193', kind: 'narrative' },
          { work: 'h-hymn-2', loc: '85-87', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
          { work: 'ov-met', loc: '5.368-372', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: 'ペルセポネをさらった動機',
    variants: [
      {
        label: 'ハデスが妻にしたいと望んだ',
        sources: [
          { work: 'h-hymn-2', loc: '78-81', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.5.1', kind: 'narrative' },
          { work: 'claud-rapt', loc: '1.1.32-36', kind: 'narrative' },
        ],
      },
      {
        label: 'アプロディテの命でエロスの矢に射られた',
        sources: [{ work: 'ov-met', loc: '5.363-384', kind: 'narrative' }],
        reception: 'オウィディウス『変身物語』の語りとして、後代に広く知られている。',
      },
    ],
  },
  {
    label: 'ゼウスの関与',
    variants: [
      {
        label: 'ゼウスが娘をハデスに与えた、または計らった',
        sources: [
          { work: 'h-hymn-2', loc: '78-79', kind: 'narrative' },
          { work: 'hes-th', loc: '912-914', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.5.1', kind: 'narrative' },
          { work: 'hyg-fab', loc: '146.1', kind: 'narrative' },
          { work: 'ov-met', loc: '5.523-532', kind: 'mention' },
          { work: 'claud-rapt', loc: '1.1.215-221', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '略奪の場所',
    variants: [
      {
        label: 'シケリアのエンナ（アイトナ山のふもと）の草原',
        sources: [
          { work: 'hyg-fab', loc: '146.1', kind: 'narrative' },
          { work: 'diod-1-5', loc: '5.3.2-5.3.3', kind: 'narrative' },
          { work: 'ov-met', loc: '5.385-394', kind: 'narrative' },
          { work: 'claud-rapt', loc: '2.1.72', kind: 'narrative' },
        ],
      },
      {
        label: 'ニュサの野',
        sources: [{ work: 'h-hymn-2', loc: '4-20', kind: 'narrative' }],
      },
      {
        label: 'エレウシスの近く（ケフィソス川のそば）から冥府へ降りた',
        sources: [{ work: 'paus', loc: '1.38.5', kind: 'mention' }],
      },
      {
        label: 'レルナから冥府へ降りた',
        sources: [{ work: 'paus', loc: '2.36.7', kind: 'mention' }],
      },
    ],
  },
  {
    label: '柘榴の実',
    variants: [
      {
        label: 'ハデスが一粒を与えた',
        sources: [
          { work: 'h-hymn-2', loc: '371-374', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.5.3', kind: 'narrative' },
        ],
      },
      {
        label: 'ペルセポネが庭で自分で摘み、七粒を食べた',
        sources: [{ work: 'ov-met', loc: '5.534-538', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '柘榴を食べたのを見た者',
    variants: [
      {
        label: 'アスカラポスが告げ、のち罰を受けた',
        sources: [
          { work: 'apollod-lib', loc: '1.5.3', kind: 'narrative' },
          { work: 'ov-met', loc: '5.539-550', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ペルセポネが冥府で過ごす期間',
    variants: [
      {
        label: '一年の三分の一',
        sources: [
          { work: 'h-hymn-2', loc: '398-400', kind: 'narrative' },
          { work: 'h-hymn-2', loc: '445-447', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.5.3', kind: 'narrative' },
        ],
      },
      {
        label: '一年の半分',
        sources: [
          { work: 'hyg-fab', loc: '146.2', kind: 'narrative' },
          { work: 'ov-met', loc: '5.564-567', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ヘラクレスと戦った場所',
    variants: [
      {
        label: 'ピュロス（そこでヘラクレスの矢を肩に受けた）',
        sources: [
          { work: 'hom-il', loc: '5.395-402', kind: 'narrative' },
          { work: 'pind-o', loc: '9.31-35', kind: 'mention' },
          { work: 'paus', loc: '6.25.2-6.25.3', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ハデスを祀る場所',
    variants: [
      {
        label: 'エリス地方（エリスの町、トリピュリアのピュロスの近く）にハデスの神域がある',
        sources: [
          { work: 'paus', loc: '6.25.2-6.25.3', kind: 'narrative' },
          { work: 'strab', loc: '8.3.14-8.3.15', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ケルベロスを連れ出す許し',
    variants: [
      {
        label: 'ハデスが、武器を使わずに取り押さえるなら、と許した',
        sources: [{ work: 'apollod-lib', loc: '2.5.12', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'テセウスとペイリトオスの結末',
    variants: [
      {
        label: 'ヘラクレスがテセウスだけを救い、ペイリトオスは戻らなかった',
        sources: [
          { work: 'apollod-lib', loc: '2.5.12', kind: 'narrative' },
          { work: 'apollod-ep', loc: '1.23-1.24', kind: 'narrative' },
          { work: 'plut-thes', loc: '31.4', kind: 'narrative' },
          { work: 'plut-thes', loc: '35.1', kind: 'narrative' },
          { work: 'paus', loc: '1.17.4', kind: 'mention' },
          { work: 'diod-1-5', loc: '4.63.4', kind: 'narrative' },
        ],
      },
      {
        label: 'ヘラクレスが二人とも連れ戻した',
        sources: [
          { work: 'hyg-fab', loc: '79.2-79.3', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.26.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'オルペウスの願いを聞き入れた者',
    variants: [
      {
        label: 'ハデスとペルセポネの二人',
        sources: [
          { work: 'eur-alc', loc: '357-359', kind: 'mention' },
          { work: 'ov-met', loc: '10.40-52', kind: 'narrative' },
        ],
      },
      {
        label: 'ハデス',
        sources: [{ work: 'apollod-lib', loc: '1.3.2', kind: 'narrative' }],
      },
      {
        label: 'ペルセポネ',
        sources: [{ work: 'diod-1-5', loc: '4.25.4', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

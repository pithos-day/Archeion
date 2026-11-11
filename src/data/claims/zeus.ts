import type { ArticleClaims } from '../../lib/claims';

/** ゼウスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '兄弟のなかの生まれ順',
    variants: [
      {
        label: 'クロノスとレアの子のうち末子',
        sources: [
          { work: 'hes-th', loc: '453-479', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.1.5-1.1.6', kind: 'narrative' },
          { work: 'callim-h-1', loc: '58-59', kind: 'mention' },
        ],
      },
      {
        label: '兄弟のうち最初に生まれた（長子）',
        sources: [
          { work: 'hom-il', loc: '13.355', kind: 'mention' },
          { work: 'hom-il', loc: '15.166', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '生まれた場所',
    variants: [
      {
        label: 'クレタのリュクトス',
        sources: [{ work: 'hes-th', loc: '477-484', kind: 'narrative' }],
      },
      {
        label: 'アルカディア（リュカイオン山のあたり）',
        sources: [
          { work: 'callim-h-1', loc: '10-14', kind: 'narrative' },
          { work: 'paus', loc: '8.36.3', kind: 'mention' },
        ],
      },
      {
        label: 'クレタのディクテ山の洞窟',
        sources: [{ work: 'apollod-lib', loc: '1.1.6', kind: 'narrative' }],
      },
      {
        label: 'クレタのイデ山',
        sources: [{ work: 'diod-1-5', loc: '5.70.2', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'クロノスに呑ませたもの',
    variants: [
      {
        label: '産着にくるんだ石',
        sources: [
          { work: 'hes-th', loc: '485-491', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.1.7', kind: 'narrative' },
          { work: 'ov-fast', loc: '4.205', kind: 'narrative' },
          { work: 'hyg-fab', loc: '139.2', kind: 'narrative' },
          { work: 'paus', loc: '8.36.3', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '養い育てた者',
    variants: [
      {
        label: 'ニンフたちが山羊アマルテイアの乳で育てた',
        sources: [
          { work: 'callim-h-1', loc: '46-49', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.1.6-1.1.7', kind: 'narrative' },
          { work: 'diod-1-5', loc: '5.70.2-5.70.3', kind: 'narrative' },
          { work: 'ov-fast', loc: '5.115-121', kind: 'narrative' },
        ],
      },
      {
        label: 'ガイアが引き取って育てた',
        sources: [{ work: 'hes-th', loc: '479-480', kind: 'narrative' }],
      },
      {
        label: '乳母アマルテイアが、揺りかごを木に吊るして隠した',
        sources: [{ work: 'hyg-fab', loc: '139.3', kind: 'narrative' }],
      },
      {
        label: 'のちに星座の熊となったものたちが、ディクテの洞窟で一年育てた',
        sources: [{ work: 'arat-phaen', loc: '30-35', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'クーレテスの役目',
    variants: [
      {
        label: '武具を打ち鳴らして、赤子の泣き声をクロノスに聞かせなかった',
        sources: [
          { work: 'callim-h-1', loc: '52-54', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.1.7', kind: 'narrative' },
          { work: 'ov-fast', loc: '4.207-210', kind: 'narrative' },
          { work: 'hyg-fab', loc: '139.3', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '兄姉を吐き出させた手段',
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
    label: 'ティタノマキアの勝因',
    variants: [
      {
        label: '地下に縛られていた百腕の巨人を解き放ち、味方にした',
        sources: [
          { work: 'hes-th', loc: '617-720', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
        ],
      },
      {
        label: 'プロメテウスの策（力ではなく計略で勝つ）による',
        sources: [{ work: 'aesch-pv', loc: '199-223', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '世界の分け方',
    variants: [
      {
        label: '兄弟三人でくじを引き、ゼウスが天空を得た',
        sources: [
          { work: 'hom-il', loc: '15.187-193', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.1', kind: 'narrative' },
        ],
      },
      {
        label: '神々に推されて王となり、ゼウスが神々に権能を分け与えた',
        sources: [{ work: 'hes-th', loc: '881-885', kind: 'narrative' }],
      },
      {
        label: 'くじではなく、自らの力で王となった',
        sources: [{ work: 'callim-h-1', loc: '60-67', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'テュポンの親',
    variants: [
      {
        label: 'ガイアとタルタロス',
        sources: [
          { work: 'hes-th', loc: '820-822', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.6.3', kind: 'narrative' },
          { work: 'hyg-fab', loc: '152.1', kind: 'narrative' },
        ],
      },
      {
        label: 'ゼウスに怒ったヘラが一人で産んだ',
        sources: [{ work: 'h-hymn-3', loc: '305-355', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'テュポンとの戦いの経過',
    variants: [
      {
        label: 'ゼウスが雷で打ち倒した',
        sources: [
          { work: 'hes-th', loc: '853-868', kind: 'narrative' },
          { work: 'aesch-pv', loc: '356-364', kind: 'mention' },
          { work: 'hyg-fab', loc: '152.2', kind: 'narrative' },
        ],
      },
      {
        label: 'ゼウスは一度敗れて腱（または雷）を奪われ、取り戻してから勝った',
        sources: [
          { work: 'apollod-lib', loc: '1.6.3', kind: 'narrative' },
          { work: 'nonn-dion', loc: '1.154-164', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'テュポンが閉じこめられた場所',
    variants: [
      {
        label: 'シケリアのアイトナ山の下',
        sources: [
          { work: 'pind-p', loc: '1.15-20', kind: 'mention' },
          { work: 'aesch-pv', loc: '365-367', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.6.3', kind: 'narrative' },
          { work: 'hyg-fab', loc: '152.2', kind: 'narrative' },
        ],
      },
      {
        label: 'タルタロス',
        sources: [
          { work: 'hes-th', loc: '868', kind: 'narrative' },
          { work: 'pind-p', loc: '1.15', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '妻',
    variants: [
      {
        label: 'メティスを最初に、ヘラを最後に、女神たちを次々に妻とした',
        sources: [{ work: 'hes-th', loc: '886-923', kind: 'narrative' }],
      },
      {
        label: '妻はヘラで、ほかの女神とは交わっただけ',
        sources: [
          { work: 'hom-il', loc: '14.315-328', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.3.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'アテナの誕生で、ゼウスの頭を割った者',
    variants: [
      {
        label: 'ヘパイストス',
        sources: [
          { work: 'pind-o', loc: '7.35-38', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.3.6', kind: 'mention' },
        ],
      },
      {
        label: 'プロメテウス',
        sources: [
          { work: 'eur-ion', loc: '452-457', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.3.6', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '大洪水を起こした理由',
    variants: [
      {
        label: 'リュカオンの悪行を見て、人間の種族を滅ぼそうとした',
        sources: [{ work: 'ov-met', loc: '1.163-261', kind: 'narrative' }],
      },
      {
        label: '青銅の種族を滅ぼそうとした',
        sources: [{ work: 'apollod-lib', loc: '1.7.2', kind: 'narrative' }],
      },
      {
        label: 'パエトンの起こした火を消すと見せかけて、人間を滅ぼした',
        sources: [{ work: 'hyg-fab', loc: '152.2', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

import type { ArticleClaims } from '../../lib/claims';

/** アトラスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '父',
    variants: [
      {
        label: 'イアペトス',
        sources: [
          { work: 'hes-th', loc: '507-509', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.3', kind: 'narrative' },
          { work: 'hyg-fab', loc: 'pr', kind: 'narrative' },
        ],
      },
      {
        label: 'ウラノス（王位を継いだ兄弟にクロノスがいる）',
        sources: [{ work: 'diod-1-5', loc: '3.60.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '母',
    variants: [
      {
        label: 'クリュメネ',
        sources: [
          { work: 'hes-th', loc: '507-509', kind: 'narrative' },
          { work: 'hyg-fab', loc: 'pr', kind: 'narrative' },
        ],
      },
      {
        label: 'アシア',
        sources: [{ work: 'apollod-lib', loc: '1.2.3', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '支えているもの',
    variants: [
      {
        label: '天（頭と手、または肩で支える）',
        sources: [
          { work: 'hes-th', loc: '517-520', kind: 'narrative' },
          { work: 'pind-p', loc: '4.289-290', kind: 'narrative' },
          { work: 'aesch-pv', loc: '425-430', kind: 'narrative' },
          { work: 'eur-hipp', loc: '742-751', kind: 'mention' },
          { work: 'verg-aen', loc: '4.246-251', kind: 'narrative' },
          { work: 'ov-met', loc: '2.296-297', kind: 'mention' },
          { work: 'apollod-lib', loc: '1.2.3', kind: 'mention' },
          { work: 'hyg-fab', loc: '150.2', kind: 'narrative' },
        ],
      },
      {
        label: '天と地（天地を隔てる柱を持つ、または天地の柱を肩で支える）',
        sources: [
          { work: 'hom-od', loc: '1.52-54', kind: 'mention' },
          { work: 'aesch-pv', loc: '349-352', kind: 'narrative' },
          { work: 'paus', loc: '5.11.5', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '天を支える理由',
    variants: [
      {
        label: 'ゼウスが割り当てた定めで、理由は語られない',
        sources: [{ work: 'hes-th', loc: '517-520', kind: 'narrative' }],
      },
      {
        label: 'ティタノマキアでティターンの将だったため、ゼウスに課された',
        sources: [
          { work: 'hyg-fab', loc: '150.2', kind: 'narrative' },
          { work: 'aesch-pv', loc: '425-430', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '立っている場所',
    variants: [
      {
        label: '大地の西の果て、ヘスペリデスの近く',
        sources: [
          { work: 'hes-th', loc: '517-520', kind: 'narrative' },
          { work: 'aesch-pv', loc: '349-352', kind: 'narrative' },
          { work: 'eur-hipp', loc: '742-751', kind: 'narrative' },
          { work: 'eur-her', loc: '403-407', kind: 'mention' },
          { work: 'ov-met', loc: '4.627-634', kind: 'narrative' },
          { work: 'diod-1-5', loc: '3.60.1', kind: 'narrative' },
        ],
      },
      {
        label: 'ヒュペルボレオイの地',
        sources: [{ work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '神か人か',
    variants: [
      {
        label: 'ティターン神族の神',
        sources: [
          { work: 'hes-th', loc: '507-520', kind: 'narrative' },
          { work: 'aesch-pv', loc: '425-430', kind: 'narrative' },
          { work: 'apollod-lib', loc: '1.2.3', kind: 'narrative' },
          { work: 'hyg-fab', loc: '150.2', kind: 'narrative' },
        ],
      },
      {
        label: '人間の王（巨人のような大男）',
        sources: [
          { work: 'diod-1-5', loc: '3.60.1', kind: 'narrative' },
          { work: 'ov-met', loc: '4.631-632', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '天文との関わり',
    variants: [
      {
        label: '天文に通じ、その知識を人に伝えた',
        sources: [
          { work: 'diod-1-5', loc: '3.60.2', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.27.4-5', kind: 'narrative' },
          { work: 'paus', loc: '9.20.3', kind: 'narrative' },
          { work: 'verg-aen', loc: '1.741', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: 'ヘラクレスの林檎の入手',
    variants: [
      {
        label: 'アトラスが林檎を取りに行き、そのあいだヘラクレスが天を支えた',
        sources: [
          { work: 'pherecyd', loc: '33', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
          { work: 'paus', loc: '5.18.4', kind: 'narrative' },
        ],
      },
      {
        label: 'ヘラクレスが竜を殺して自分で取った',
        sources: [
          { work: 'eur-her', loc: '394-399', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
          { work: 'hyg-astr', loc: '2.3', kind: 'mention' },
        ],
      },
      {
        label: 'アトラスが、娘たちを救われた礼として林檎を与えた',
        sources: [{ work: 'diod-1-5', loc: '4.27.4', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '林檎を取ってきたあとのアトラス',
    variants: [
      {
        label: '天を担ぎ直したがらず、ヘラクレスの口実に乗せられて天を引き受け直した',
        sources: [
          { work: 'pherecyd', loc: '33', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'アトラス山との関係',
    variants: [
      {
        label: 'リビアに「アトラス」という山があり、土地の人はそれを天の柱と呼ぶ',
        sources: [{ work: 'hdt', loc: '4.184.3', kind: 'narrative' }],
      },
      {
        label: 'ペルセウスにメドゥーサの首を見せられて石になり、山そのものになった',
        sources: [{ work: 'ov-met', loc: '4.655-662', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'アトラス山の所在',
    variants: [
      {
        label: 'リビア（北アフリカ）の西部にある山',
        sources: [
          { work: 'hdt', loc: '4.184.3', kind: 'narrative' },
          { work: 'strab', loc: '17.3.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'プレイアデスの母',
    variants: [
      {
        label: 'プレイオネ',
        sources: [
          { work: 'apollod-lib', loc: '3.10.1', kind: 'narrative' },
          { work: 'hyg-fab', loc: '192.1', kind: 'narrative' },
        ],
      },
      {
        label: 'アイトラ（ムーサイオスの説として）',
        sources: [{ work: 'hyg-astr', loc: '2.21', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'ヘスペリデスの親',
    variants: [
      {
        label: 'ニュクス',
        sources: [{ work: 'hes-th', loc: '215-216', kind: 'narrative' }],
      },
      {
        label: 'ゼウスとテミス',
        sources: [{ work: 'pherecyd', loc: '33b', kind: 'narrative' }],
      },
      {
        label: 'アトラス',
        sources: [
          { work: 'diod-1-5', loc: '4.27.2', kind: 'narrative' },
          { work: 'pherecyd', loc: '33a', kind: 'mention' },
          { work: 'hyg-astr', loc: '2.3', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: 'ヒュアデスの出自',
    variants: [
      {
        label: 'ディオニュソスの乳母になったドドネのニンフ',
        sources: [{ work: 'pherecyd', loc: '46', kind: 'narrative' }],
      },
      {
        label: 'アトラスの娘（息子ヒュアスの姉妹）',
        sources: [{ work: 'hyg-fab', loc: '192.1-192.2', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

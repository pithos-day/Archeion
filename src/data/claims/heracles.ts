import type { ArticleClaims } from '../../lib/claims';

/** ヘラクレスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '父',
    variants: [
      {
        label: 'ゼウス（双子の弟イピクレスの父はアムピトリュオン）',
        sources: [
          { work: 'hom-il', loc: '14.323-324', kind: 'mention' },
          { work: 'hes-sc', loc: '48-56', kind: 'narrative' },
          { work: 'h-hymn-15', loc: '1-3', kind: 'narrative' },
          { work: 'pind-n', loc: '1.35-36', kind: 'mention' },
          { work: 'eur-her', loc: '1-3', kind: 'mention' },
          { work: 'diod-1-5', loc: '4.9.3', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.8', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '生まれた地',
    variants: [
      {
        label: 'テーバイ',
        sources: [
          { work: 'hom-il', loc: '19.98-99', kind: 'narrative' },
          { work: 'hes-sc', loc: '48-49', kind: 'narrative' },
          { work: 'h-hymn-15', loc: '1-3', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.8', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '揺りかごの蛇',
    variants: [
      {
        label: 'ヘラが殺そうとして送った',
        sources: [
          { work: 'pind-n', loc: '1.37-47', kind: 'narrative' },
          { work: 'eur-her', loc: '1266-1268', kind: 'mention' },
          { work: 'diod-1-5', loc: '4.10.1', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.8', kind: 'narrative' },
        ],
      },
      {
        label: 'どちらが自分の子か試すため、アムピトリュオンが入れた',
        sources: [{ work: 'apollod-lib', loc: '2.4.8', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'エウリュステウスに仕えた理由',
    variants: [
      {
        label: 'ヘラの策略でエウリュステウスが先に生まれ、ヘラクレスはその下に立つ定めとなった',
        sources: [
          { work: 'hom-il', loc: '19.96-133', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.9.5', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.5', kind: 'narrative' },
        ],
      },
      {
        label: '父アムピトリュオンがアルゴスへ帰るための代償として',
        sources: [{ work: 'eur-her', loc: '13-21', kind: 'narrative' }],
      },
      {
        label: '子殺しの後、デルポイの神託に命じられた',
        sources: [{ work: 'apollod-lib', loc: '2.4.12', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '狂気と子殺しの時期',
    variants: [
      {
        label: '功業を始める前',
        sources: [
          { work: 'diod-1-5', loc: '4.11.1', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.12', kind: 'narrative' },
        ],
      },
      {
        label: '功業をすべて終えた後',
        sources: [{ work: 'eur-her', loc: '827-832', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '死の経緯',
    variants: [
      {
        label: 'デイアネイラがネッソスの血を塗った衣に苦しみ、オイテ山で火葬の薪に登った',
        sources: [
          { work: 'soph-tr', loc: '555-581', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.38.1-4', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.7.7', kind: 'narrative' },
        ],
      },
      {
        label: '運命とヘラの怒りに屈した（経緯は語られない）',
        sources: [{ work: 'hom-il', loc: '18.117-119', kind: 'mention' }],
      },
    ],
  },
  {
    label: '死後',
    variants: [
      {
        label: '神々に加わり、ヘーベーを妻とした',
        sources: [
          { work: 'hom-od', loc: '11.602-604', kind: 'narrative' },
          { work: 'hes-th', loc: '950-955', kind: 'narrative' },
          { work: 'h-hymn-15', loc: '7-8', kind: 'narrative' },
          { work: 'pind-n', loc: '1.69-72', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.38.5', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.7.7', kind: 'narrative' },
        ],
      },
      {
        label: '死すべき者として冥府へ下る',
        sources: [
          { work: 'hom-il', loc: '18.117-119', kind: 'mention' },
          { work: 'eur-her', loc: '1331-1333', kind: 'mention' },
        ],
      },
    ],
  },
];

export default claims;

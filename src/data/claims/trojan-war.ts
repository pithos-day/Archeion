import type { ArticleClaims } from '../../lib/claims';

/** トロイア戦争の論点表。 */
const claims: ArticleClaims = [
  {
    label: 'ゼウスが戦争を起こした目的',
    variants: [
      {
        label: '地上の人間の多さを減らし、ギリシアで最も強い者を名高くするため',
        sources: [{ work: 'eur-hel', loc: '36-41', kind: 'narrative' }],
      },
      {
        label: '半神の種族を滅ぼすため',
        sources: [{ work: 'apollod-ep', loc: '3.1', kind: 'narrative' }],
      },
      {
        label: '娘ヘレネを名高くするため',
        sources: [{ work: 'apollod-ep', loc: '3.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'パリスがヘレネを奪った動機',
    variants: [
      {
        label: '審判でアプロディテを選び、その褒美としてヘレネを約束された',
        sources: [
          { work: 'hom-il', loc: '24.25-30', kind: 'mention' },
          { work: 'cypria', loc: 'cypria', kind: 'narrative' },
          { work: 'eur-hel', loc: '23-30', kind: 'narrative' },
          { work: 'eur-tro', loc: '924-932', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.2', kind: 'narrative' },
          { work: 'hyg-fab', loc: '92.1-92.4', kind: 'narrative' },
        ],
      },
      {
        label: 'メデイアなどの略奪が罰せられなかったのを聞き、ギリシアから妻を奪おうとした',
        sources: [{ work: 'hdt', loc: '1.3.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'ヘレネはイリオスへ行ったか',
    variants: [
      {
        label: 'パリスとともにイリオスへ行った',
        sources: [
          { work: 'hom-il', loc: '3.121-244', kind: 'narrative' },
          { work: 'cypria', loc: 'cypria', kind: 'narrative' },
          { work: 'aesch-ag', loc: '403-408', kind: 'mention' },
          { work: 'eur-tro', loc: '914-965', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.4', kind: 'narrative' },
        ],
      },
      {
        label: 'イリオスへは行かず、エジプトのプロテウスのもとにいた',
        sources: [
          { work: 'eur-hel', loc: '31-48', kind: 'narrative' },
          { work: 'hdt', loc: '2.113.1-2.120.5', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.5', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '求婚者の誓いを考え出した者',
    variants: [
      {
        label: 'オデュッセウスがテュンダレオスに勧めた',
        sources: [
          { work: 'apollod-lib', loc: '3.10.9', kind: 'narrative' },
          { work: 'hyg-fab', loc: '78.2', kind: 'narrative' },
        ],
      },
      {
        label: 'テュンダレオス自身が考え出した',
        sources: [{ work: 'eur-ia', loc: '57-71', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'オデュッセウスの偽りの狂気を見破った方法',
    variants: [
      {
        label: 'パラメデスが幼いテレマコスを奪い、殺すそぶりを見せた',
        sources: [
          { work: 'cypria', loc: 'cypria', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.7', kind: 'narrative' },
        ],
      },
      {
        label: 'パラメデスがテレマコスを鋤の前に置いた',
        sources: [{ work: 'hyg-fab', loc: '95.2', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'イピゲネイアの結末',
    variants: [
      {
        label: 'アルテミスが鹿とすり替えて連れ去った',
        sources: [
          { work: 'cypria', loc: 'cypria', kind: 'narrative' },
          { work: 'eur-ia', loc: '1580-1595', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.22', kind: 'narrative' },
          { work: 'ov-met', loc: '12.27-38', kind: 'narrative' },
          { work: 'hyg-fab', loc: '98.4', kind: 'narrative' },
        ],
      },
      {
        label: '祭壇で殺された',
        sources: [
          { work: 'pind-p', loc: '11.22-23', kind: 'mention' },
          { work: 'aesch-ag', loc: '223-247', kind: 'narrative' },
          { work: 'aesch-ag', loc: '1417', kind: 'mention' },
          { work: 'soph-el', loc: '566-576', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ピロクテテスが蛇に咬まれた場所',
    variants: [
      {
        label: 'テネドス島',
        sources: [
          { work: 'cypria', loc: 'cypria', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.27', kind: 'narrative' },
        ],
      },
      {
        label: 'クリュセの社',
        sources: [{ work: 'soph-ph', loc: '1326-1328', kind: 'mention' }],
      },
      {
        label: 'レムノス島',
        sources: [{ work: 'hyg-fab', loc: '102.1', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'プロテシラオスを討った者',
    variants: [
      {
        label: 'ヘクトル',
        sources: [
          { work: 'cypria', loc: 'cypria', kind: 'narrative' },
          { work: 'apollod-ep', loc: '3.30', kind: 'narrative' },
          { work: 'ov-met', loc: '12.67-68', kind: 'mention' },
          { work: 'hyg-fab', loc: '103.1', kind: 'narrative' },
        ],
      },
      {
        label: '名の挙がらないダルダノス人の男',
        sources: [{ work: 'hom-il', loc: '2.698-702', kind: 'mention' }],
      },
    ],
  },
  {
    label: '戦争の年数',
    variants: [
      {
        label: '十年（十年目にイリオスが落ちた）',
        sources: [
          { work: 'hom-il', loc: '2.328-329', kind: 'mention' },
          { work: 'hom-od', loc: '14.240-241', kind: 'mention' },
          { work: 'aesch-ag', loc: '40-47', kind: 'mention' },
          { work: 'apollod-ep', loc: '5.8', kind: 'narrative' },
          { work: 'hyg-fab', loc: '108.1', kind: 'mention' },
        ],
      },
      {
        label: 'ヘレネの連れ去りから数えて二十年',
        sources: [
          { work: 'hom-il', loc: '24.765-766', kind: 'mention' },
          { work: 'apollod-ep', loc: '3.18', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'アキレウスを討った者',
    variants: [
      {
        label: 'パリスとアポロン',
        sources: [
          { work: 'hom-il', loc: '22.359-360', kind: 'mention' },
          { work: 'aethiopis', loc: 'aethiopis', kind: 'narrative' },
          { work: 'verg-aen', loc: '6.56-58', kind: 'mention' },
          { work: 'ov-met', loc: '12.597-606', kind: 'narrative' },
          { work: 'apollod-ep', loc: '5.3', kind: 'narrative' },
        ],
      },
      {
        label: 'アポロン',
        sources: [
          { work: 'hom-il', loc: '21.277-278', kind: 'mention' },
          { work: 'soph-ph', loc: '334-335', kind: 'mention' },
          { work: 'quint-smyrn', loc: '3.60-66', kind: 'narrative' },
        ],
      },
      {
        label: 'パリス',
        sources: [
          { work: 'eur-hec', loc: '387-388', kind: 'mention' },
          { work: 'eur-andr', loc: '655', kind: 'mention' },
        ],
      },
      {
        label: 'パリスの姿をとったアポロン',
        sources: [{ work: 'hyg-fab', loc: '107.1', kind: 'narrative' }],
      },
      {
        label: 'パリスとデイポボスが、話し合いに来たところを討った',
        sources: [{ work: 'hyg-fab', loc: '110.1', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'アキレウスの武具の判定を下した者',
    variants: [
      {
        label: 'ギリシア軍の将たち',
        sources: [
          { work: 'pind-n', loc: '8.26-27', kind: 'mention' },
          { work: 'soph-aj', loc: '1135-1136', kind: 'mention' },
          { work: 'ov-met', loc: '13.1-383', kind: 'narrative' },
          { work: 'hyg-fab', loc: '107.2', kind: 'narrative' },
        ],
      },
      {
        label: 'トロイア人',
        sources: [
          { work: 'hom-od', loc: '11.543-547', kind: 'mention' },
          { work: 'apollod-ep', loc: '5.6', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '5.157-320', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ピロクテテスの傷を癒やした者',
    variants: [
      {
        label: 'マカオン',
        sources: [{ work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' }],
      },
      {
        label: 'ポダレイリオス',
        sources: [
          { work: 'apollod-ep', loc: '5.8', kind: 'narrative' },
          { work: 'quint-smyrn', loc: '9.461-466', kind: 'narrative' },
        ],
      },
      {
        label: 'アスクレピオス',
        sources: [{ work: 'soph-ph', loc: '1437-1438', kind: 'mention' }],
      },
    ],
  },
  {
    label: 'パリスを討った者',
    variants: [
      {
        label: 'ピロクテテスがヘラクレスの弓で射た',
        sources: [
          { work: 'ilias-parva', loc: 'ilias_parva', kind: 'narrative' },
          { work: 'soph-ph', loc: '1426-1427', kind: 'mention' },
          { work: 'apollod-ep', loc: '5.8', kind: 'narrative' },
          { work: 'hyg-fab', loc: '112.4', kind: 'mention' },
          { work: 'quint-smyrn', loc: '10.223-245', kind: 'narrative' },
        ],
      },
    ],
  },
];

export default claims;

import type { ArticleClaims } from '../../lib/claims';

/** アンタイオスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '親',
    variants: [
      {
        label: 'ポセイドンの子',
        sources: [
          { work: 'pherecyd', loc: '33e', kind: 'mention' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
        ],
      },
      {
        label: '大地（ガイア）の子',
        sources: [
          { work: 'ov-met', loc: '9.182-184', kind: 'mention' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'mention' },
          { work: 'hyg-fab', loc: '31.1', kind: 'mention' },
        ],
      },
    ],
  },
  {
    label: '住まいと立場',
    variants: [
      {
        label: 'リビアに住む（王であった）',
        sources: [
          { work: 'pherecyd', loc: '33d', kind: 'mention' },
          { work: 'pind-i', loc: '4.52-55', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.17.4', kind: 'narrative' },
        ],
      },
      {
        label: 'オシリスが、エチオピアとリビアの統治者に任じた',
        sources: [{ work: 'diod-1-5', loc: '1.17.3', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '異邦人への仕打ち',
    variants: [
      {
        label: '訪れた異邦人に相撲を強い、負けた者を殺した',
        sources: [
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.17.4', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.27.3', kind: 'mention' },
          { work: 'ov-ibis', loc: '395', kind: 'mention' },
          { work: 'hyg-fab', loc: '31.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ヘラクレスの旅の目的',
    variants: [
      {
        label: 'ヘスペリデスの黄金の林檎を求める旅の途中',
        sources: [
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.26.2-4.27.3', kind: 'mention' },
        ],
      },
      {
        label: 'ゲリュオンの牛を取りに行く遠征の途中',
        sources: [{ work: 'diod-1-5', loc: '4.17.1-4', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '殺した異邦人の頭蓋骨',
    variants: [
      {
        label: 'ポセイドンの神殿の屋根を葺くのに使おうとした',
        sources: [{ work: 'pind-i', loc: '4.52-55', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '力の源',
    variants: [
      {
        label: '大地に触れていると強くなる',
        sources: [
          { work: 'ov-met', loc: '9.182-184', kind: 'mention' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ヘラクレスとの戦い',
    variants: [
      {
        label: '功業の途上で、ヘラクレスが相撲で討った',
        sources: [
          { work: 'pherecyd', loc: '33e', kind: 'narrative' },
          { work: 'pind-i', loc: '4.52-55', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.17.4', kind: 'narrative' },
          { work: 'hyg-fab', loc: '31.1', kind: 'mention' },
          { work: 'paus', loc: '9.11.6', kind: 'mention' },
          { work: 'plut-thes', loc: '11.1', kind: 'mention' },
          { work: 'ov-met', loc: '9.182-184', kind: 'mention' },
        ],
      },
      {
        label: 'オシリスと同じ時代の人で、ヘラクレスに罰せられた',
        sources: [{ work: 'diod-1-5', loc: '1.21.4', kind: 'mention' }],
      },
    ],
  },
  {
    label: '決め手',
    variants: [
      {
        label: 'ヘラクレスが宙に持ち上げて殺した',
        sources: [{ work: 'apollod-lib', loc: '2.5.11', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '墓',
    variants: [
      {
        label: 'ティンギスにあり、遺体は60ペーキュスの長さであった',
        sources: [{ work: 'plut-sert', loc: '9.3', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '妻',
    variants: [
      {
        label: '妻イピノエがヘラクレスと交わり、パライモン（ポレモン）が生まれた',
        sources: [{ work: 'pherecyd', loc: '33e', kind: 'narrative' }],
      },
      {
        label: '妻ティンゲがヘラクレスと交わり、ソパクスが生まれた',
        sources: [{ work: 'plut-sert', loc: '9.4', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

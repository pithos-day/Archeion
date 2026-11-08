import type { ArticleClaims } from '../../lib/claims';

/** メドゥーサの論点表。 */
const claims: ArticleClaims = [
  {
    label: '両親',
    variants: [
      {
        label: 'ポルキュスとケトの娘',
        sources: [
          { work: 'hes-th', loc: '270-276', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.2', kind: 'narrative' },
          { work: 'paus', loc: '2.21.5', kind: 'narrative' },
          { work: 'ov-met', loc: '4.743', kind: 'mention' },
        ],
      },
      {
        label: '巨人族との戦いのときにガイアが生んだ',
        sources: [{ work: 'eur-ion', loc: '987-989', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '不死か',
    variants: [
      {
        label: 'ゴルゴン三姉妹のうちメドゥーサだけが死すべき者',
        sources: [
          { work: 'hes-th', loc: '276-277', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '姿',
    variants: [
      {
        label: '初めから恐ろしい怪物の姿（蛇の髪、翼など）',
        sources: [
          { work: 'hom-il', loc: '5.741', kind: 'mention' },
          { work: 'hes-sc', loc: '229-237', kind: 'narrative' },
          { work: 'pind-p', loc: '12.9', kind: 'mention' },
          { work: 'aesch-pv', loc: '798-800', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.2', kind: 'narrative' },
        ],
      },
      {
        label: '美しい娘だったが、アテナに髪を蛇に変えられた',
        sources: [{ work: 'ov-met', loc: '4.794-801', kind: 'narrative' }],
      },
      {
        label: '怪物ではなく、リビアの女王',
        sources: [
          { work: 'diod-1-5', loc: '3.55.3', kind: 'narrative' },
          { work: 'paus', loc: '2.21.5', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'ポセイドンとの交わり',
    variants: [
      {
        label: '春の花の咲く柔らかな草地で交わった',
        sources: [
          { work: 'hes-th', loc: '278-279', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.3', kind: 'mention' },
        ],
      },
      {
        label: 'アテナの神殿で辱めた',
        sources: [{ work: 'ov-met', loc: '4.798-799', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '討った者',
    variants: [
      {
        label: 'ペルセウス',
        sources: [
          { work: 'hes-th', loc: '280', kind: 'narrative' },
          { work: 'pind-p', loc: '12.11-16', kind: 'narrative' },
          { work: 'diod-1-5', loc: '3.55.3', kind: 'narrative' },
          { work: 'ov-met', loc: '4.782-785', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.2', kind: 'narrative' },
          { work: 'paus', loc: '2.21.5', kind: 'narrative' },
        ],
      },
      {
        label: 'アテナ（巨人族との戦いで）',
        sources: [{ work: 'eur-ion', loc: '989-991', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '首から生まれたもの',
    variants: [
      {
        label: 'ペガソスとクリュサオル',
        sources: [
          { work: 'hes-th', loc: '280-281', kind: 'narrative' },
          { work: 'ov-met', loc: '4.785-786', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.2', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '見た者に及ぼす力',
    variants: [
      {
        label: '石に変える',
        sources: [
          { work: 'ov-met', loc: '4.780-781', kind: 'narrative' },
          { work: 'apollod-lib', loc: '2.4.2', kind: 'narrative' },
          { work: 'paus', loc: '9.34.2', kind: 'narrative' },
        ],
      },
      {
        label: '見た者は息絶える',
        sources: [{ work: 'aesch-pv', loc: '798-800', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '首のその後',
    variants: [
      {
        label: 'アテナのアイギス（または盾）に付けられた',
        sources: [
          { work: 'hom-il', loc: '5.741', kind: 'mention' },
          { work: 'eur-ion', loc: '995-996', kind: 'mention' },
          { work: 'apollod-lib', loc: '2.4.3', kind: 'narrative' },
          { work: 'paus', loc: '9.34.2', kind: 'mention' },
        ],
      },
      {
        label: '冥府にある',
        sources: [{ work: 'hom-od', loc: '11.634-635', kind: 'mention' }],
      },
      {
        label: 'アルゴスのアゴラの塚に埋められた',
        sources: [{ work: 'paus', loc: '2.21.5', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

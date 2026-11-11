import type { ProsePassages } from '../../lib/passages.ts';

/** ヒュギーヌス『天文詩』の引用。 */
const passages: ProsePassages = {
  '2.37': {
    length: 10,
    sentences: {
      2: {
        original: 'Hanc nonnulli propter celeritatem Graece dixerunt Argo appellatam;',
        translation:
          'この船は、速さのためにギリシア語でアルゴーと呼ばれたのだと言う者が少なくない。',
      },
      3: {
        original: 'alii quod Argus eius fuerit inventor.',
        translation: 'また、アルゴスがその考案者だったからだという者もいる。',
      },
      4: {
        original:
          'Hanc autem primam in mari fuisse conplures dixerunt, et hac re maxime stellis esse figuratam.',
        translation:
          'また、この船は海に出た最初の船だったと言う者が多く、このことのために、とりわけ星々で形づくられたのだという。',
      },
      8: {
        original:
          'Aeschylus autem et nonnulli aiunt a Minerva quandam materiam loquentem eodem esse coniunctam.',
        translation:
          'アイスキュロスと幾人かの者は、アテナによって、物を言うある材がそこに組み込まれたと言う。',
      },
      9: {
        original: 'Sed huius non tota effigies inter astra videtur;',
        translation: 'ただし、この船の像の全体が星々のなかに見えるのではない。',
      },
      10: {
        original:
          'divisa enim est a puppi usque ad malum, significans, ne homines navibus fractis pertimescerent.',
        translation:
          '船尾から帆柱までで切られているのであり、それは、船が壊れても人々がひどく恐れることのないようにという意味である。',
      },
    },
  },
};

export default passages;

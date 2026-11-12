import type { ProsePassages } from '../../lib/passages.ts';

/** ヘロドロス『断片集』の引用。箇所は `<断片>.<典拠の番号>`。 */
const passages: ProsePassages = {
  '39.1': {
    length: 5,
    sentences: {
      3: {
        original: 'Ζητεῖται δὲ διὰ τί Ὀρφεὺς ἀσθενὴς ὢν συνέπλει τοῖς ἥρωσιν·',
        translation: 'なぜオルペウスは、弱い身でありながら英雄たちと船出したのかが問われる。',
      },
      4: {
        original:
          'ὅτι μάντις ὢν ὁ Χείρων ἔχρησε μὴ δύνασθαι τὰς Σειρῆνας παρελθεῖν αὐτοὺς Ὀρφέως μὴ συμπλέοντος.',
        translation:
          '予言者であったケイロンが、オルペウスが同乗しなければ、彼らはセイレーンのそばを通り過ぎることができないと告げたからである。',
      },
      5: {
        original: 'Οὕτως Ἡρόδωρος.',
        translation: 'ヘロドロスはそう言う。',
      },
    },
  },
};

export default passages;

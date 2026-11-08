/**
 * 出典レジストリ。記事の脚注と論点表 (src/data/claims/) から参照する原典の一覧。
 *
 * 年代係数 (era) は編集方針 (/policy/) の定量基準で使う。
 *   3: 前8〜7世紀 / 2: 前6〜5世紀 / 1: 前4世紀以降
 */

export interface Author {
  /** 著者名 (日本語)。 */
  name: string;
  /** 年代係数。 */
  era: 1 | 2 | 3;
  /** おおよその活動年 (紀元前は負)。同点のときに古い方を選ぶのに使う。 */
  year: number;
}

export const authors = {
  homer: { name: 'ホメロス', era: 3, year: -750 },
  hesiod: { name: 'ヘシオドス', era: 3, year: -700 },
  'homeric-hymns': { name: 'ホメロス風讃歌', era: 3, year: -600 },
  pindar: { name: 'ピンダロス', era: 2, year: -470 },
  bacchylides: { name: 'バッキュリデス', era: 2, year: -470 },
  aeschylus: { name: 'アイスキュロス', era: 2, year: -470 },
  sophocles: { name: 'ソフォクレス', era: 2, year: -440 },
  euripides: { name: 'エウリピデス', era: 2, year: -420 },
  herodotus: { name: 'ヘロドトス', era: 2, year: -430 },
  'apollonius-rhodius': { name: 'アポロニオス', era: 1, year: -250 },
  'diodorus-siculus': { name: 'ディオドロス', era: 1, year: -40 },
  ovid: { name: 'オウィディウス', era: 1, year: 8 },
  apollodorus: { name: 'アポロドロス', era: 1, year: 150 },
  pausanias: { name: 'パウサニアス', era: 1, year: 160 },
} as const satisfies Record<string, Author>;

export type AuthorId = keyof typeof authors;

export interface Work {
  author: AuthorId;
  /** 作品名 (日本語)。 */
  title: string;
  /** Perseus の CTS URN (版まで含む)。原典ファイル名と Scaife Viewer のリンクに使う。 */
  urn: string;
}

export const works = {
  'hom-il': {
    author: 'homer',
    title: 'イリアス',
    urn: 'urn:cts:greekLit:tlg0012.tlg001.perseus-grc2',
  },
  'hom-od': {
    author: 'homer',
    title: 'オデュッセイア',
    urn: 'urn:cts:greekLit:tlg0012.tlg002.perseus-grc2',
  },
  'h-hymn-15': {
    author: 'homeric-hymns',
    title: '第15歌 ヘラクレス讃歌',
    urn: 'urn:cts:greekLit:tlg0013.tlg015.perseus-grc2',
  },
  'hes-th': {
    author: 'hesiod',
    title: '神統記',
    urn: 'urn:cts:greekLit:tlg0020.tlg001.perseus-grc2',
  },
  'hes-sc': {
    author: 'hesiod',
    title: 'ヘラクレスの盾',
    urn: 'urn:cts:greekLit:tlg0020.tlg003.perseus-grc2',
  },
  'pind-o': {
    author: 'pindar',
    title: 'オリュンピア祝勝歌',
    urn: 'urn:cts:greekLit:tlg0033.tlg001.perseus-grc2',
  },
  'pind-p': {
    author: 'pindar',
    title: 'ピュティア祝勝歌',
    urn: 'urn:cts:greekLit:tlg0033.tlg002.perseus-grc2',
  },
  'pind-n': {
    author: 'pindar',
    title: 'ネメア祝勝歌',
    urn: 'urn:cts:greekLit:tlg0033.tlg003.perseus-grc2',
  },
  'pind-i': {
    author: 'pindar',
    title: 'イストミア祝勝歌',
    urn: 'urn:cts:greekLit:tlg0033.tlg004.perseus-grc2',
  },
  'bacchyl-ep': {
    author: 'bacchylides',
    title: '祝勝歌',
    urn: 'urn:cts:greekLit:tlg0199.tlg001.perseus-grc2',
  },
  'aesch-pv': {
    author: 'aeschylus',
    title: '縛られたプロメテウス',
    urn: 'urn:cts:greekLit:tlg0085.tlg003.perseus-grc2',
  },
  'aesch-sept': {
    author: 'aeschylus',
    title: 'テーバイ攻めの七将',
    urn: 'urn:cts:greekLit:tlg0085.tlg004.perseus-grc2',
  },
  'soph-tr': {
    author: 'sophocles',
    title: 'トラキスの女たち',
    urn: 'urn:cts:greekLit:tlg0011.tlg001.perseus-grc2',
  },
  'soph-aj': {
    author: 'sophocles',
    title: 'アイアス',
    urn: 'urn:cts:greekLit:tlg0011.tlg003.perseus-grc2',
  },
  'soph-ot': {
    author: 'sophocles',
    title: 'オイディプス王',
    urn: 'urn:cts:greekLit:tlg0011.tlg004.perseus-grc2',
  },
  'soph-ph': {
    author: 'sophocles',
    title: 'ピロクテテス',
    urn: 'urn:cts:greekLit:tlg0011.tlg006.perseus-grc2',
  },
  'eur-cyc': {
    author: 'euripides',
    title: 'キュクロプス',
    urn: 'urn:cts:greekLit:tlg0006.tlg001.perseus-grc2',
  },
  'eur-hel': {
    author: 'euripides',
    title: 'ヘレネ',
    urn: 'urn:cts:greekLit:tlg0006.tlg014.perseus-grc2',
  },
  'eur-phoen': {
    author: 'euripides',
    title: 'フェニキアの女たち',
    urn: 'urn:cts:greekLit:tlg0006.tlg015.perseus-grc2',
  },
  'eur-alc': {
    author: 'euripides',
    title: 'アルケスティス',
    urn: 'urn:cts:greekLit:tlg0006.tlg002.perseus-grc2',
  },
  'eur-her': {
    author: 'euripides',
    title: 'ヘラクレス',
    urn: 'urn:cts:greekLit:tlg0006.tlg009.perseus-grc2',
  },
  'eur-ion': {
    author: 'euripides',
    title: 'イオン',
    urn: 'urn:cts:greekLit:tlg0006.tlg010.perseus-grc2',
  },
  hdt: { author: 'herodotus', title: '歴史', urn: 'urn:cts:greekLit:tlg0016.tlg001.perseus-grc2' },
  'ap-rh': {
    author: 'apollonius-rhodius',
    title: 'アルゴナウティカ',
    urn: 'urn:cts:greekLit:tlg0001.tlg001.perseus-grc2',
  },
  'diod-1-5': {
    author: 'diodorus-siculus',
    title: '歴史叢書',
    urn: 'urn:cts:greekLit:tlg0060.tlg001.perseus-grc5',
  },
  'ov-met': {
    author: 'ovid',
    title: '変身物語',
    urn: 'urn:cts:latinLit:phi0959.phi006.perseus-lat2',
  },
  'apollod-lib': {
    author: 'apollodorus',
    title: 'ビブリオテーケー',
    urn: 'urn:cts:greekLit:tlg0548.tlg001.perseus-grc2',
  },
  'apollod-ep': {
    author: 'apollodorus',
    title: '摘要',
    urn: 'urn:cts:greekLit:tlg0548.tlg002.perseus-grc2',
  },
  paus: {
    author: 'pausanias',
    title: 'ギリシア案内記',
    urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2',
  },
} as const satisfies Record<string, Work>;

export type WorkId = keyof typeof works;

/** Scaife Viewer で原文の該当箇所を開く URL。`loc` は `4.765-803` のような箇所。 */
export function scaifeUrl(workId: WorkId, loc: string): string {
  return `https://scaife.perseus.org/reader/${works[workId].urn}:${loc}/`;
}

/** 「ヘシオドス『神統記』270–283」のような出典表記。 */
export function citeLabel(workId: WorkId, loc: string): string {
  const work = works[workId];
  return `${authors[work.author].name}『${work.title}』${loc.replace('-', '–')}`;
}

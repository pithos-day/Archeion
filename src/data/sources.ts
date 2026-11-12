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
  plutarch: { name: 'プルタルコス', era: 1, year: 100 },
  nonnus: { name: 'ノンノス', era: 1, year: 450 },
  pherecydes: { name: 'ペレキュデス', era: 2, year: -450 },
  'pseudo-eratosthenes': { name: '偽エラトステネス', era: 1, year: 100 },
  hyginus: { name: 'ヒュギーヌス', era: 1, year: 150 },
  'antoninus-liberalis': { name: 'アントニヌス・リベラリス', era: 1, year: 200 },
  // 叙事詩の環。散逸した作品はプロクロスの梗概で読むが、年代係数は元の作品の年代で数える。
  stasinus: { name: 'スタシノス', era: 3, year: -650 },
  lesches: { name: 'レスケス', era: 3, year: -650 },
  arctinus: { name: 'アルクティノス', era: 3, year: -650 },
  agias: { name: 'アギアス', era: 3, year: -650 },
  eugammon: { name: 'エウガモン', era: 2, year: -570 },
  // 古注と辞典は、編纂物を一人の著者として数える。引用元の著者名は脚注の訳文に書く。
  'scholia-pindar': { name: 'ピンダロス古注', era: 1, year: 500 },
  suda: { name: 'スーダ', era: 1, year: 970 },
  'asclepiades-tragilensis': { name: 'アスクレピアデス', era: 1, year: -340 },
  herodorus: { name: 'ヘロドロス', era: 2, year: -400 },
  virgil: { name: 'ウェルギリウス', era: 1, year: -19 },
  'quintus-smyrnaeus': { name: 'クイントゥス', era: 1, year: 350 },
  strabo: { name: 'ストラボン', era: 1, year: 10 },
  'valerius-flaccus': { name: 'ウァレリウス・フラックス', era: 1, year: 80 },
  callimachus: { name: 'カリマコス', era: 1, year: -270 },
  aratus: { name: 'アラトス', era: 1, year: -270 },
  claudian: { name: 'クラウディアヌス', era: 1, year: 400 },
} as const satisfies Record<string, Author>;

export type AuthorId = keyof typeof authors;

interface WorkBase {
  author: AuthorId;
  /** 作品名 (日本語)。 */
  title: string;
}

/** Scaife Viewer で開ける作品 (Perseus、First1KGreek)。 */
interface CtsWork extends WorkBase {
  /** CTS URN (版まで含む)。原典ファイル名と Scaife Viewer のリンクに使う。 */
  urn: string;
}

/** CTS URN のない作品。リンク先と原典ファイルを個別に指定する。 */
interface LocalWork extends WorkBase {
  /**
   * 出典のリンク先 (原典のページ)。箇所ごとのリンクは sourceUrl が pages と anchor から作る。
   * DFHG の断片集は、著者のアンカー (`#urn:lofts:fhg.1.<著者>`) まで含めて書く。脚注では
   * その続きに断片の URN の残りを書く (`<url>.pherecydis_fragmenta.historiai.liber_secundus:27`)。
   * 断片の URN は、原典ファイルの断片の見出しの下にある。
   */
  url: string;
  /**
   * 原典ファイル。原典コレクションの最上位からの相対パス。
   * 箇所は、ファイルの見出しの番号を「.」でつないだもの (`# Chapter 30` の `## Section 2` は `30.2`)。
   */
  file: string;
  /** 出典表記で箇所の前に付ける語 (断片集の「断片」など)。 */
  unit?: string;
  /**
   * 原典ファイルの一部だけがこの作品のとき (プロクロスの梗概の『小イリアス』など)、その箇所 (`loc`) と、
   * 出典表記で箇所の代わりに書く語 (`label`)。論点表と脚注の箇所は `loc` と同じにする。
   */
  part?: { loc: string; label: string };
  /**
   * 原典がいくつかのページに分かれているとき、箇所の最初の番号 (`2.37` の `2`、序の `pr`) ごとのページ。
   * ここにない箇所は url のページを開く。
   */
  pages?: Record<string, string>;
  /**
   * ページの中の箇所のアンカーの付け方。省略すると、ページの先頭を開く (箇所のアンカーがないサイト)。
   * - `roman`: 箇所の最初の番号をローマ数字にする (ラテン語版ウィキソースの『神話集』の `#CVIII`)
   */
  anchor?: 'roman';
  /** 出典表記で箇所の代わりに書く語 (『神話集』の序 `pr` の「序」など)。 */
  locLabels?: Record<string, string>;
}

export type Work = CtsWork | LocalWork;

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
  'diod-frag': {
    author: 'diodorus-siculus',
    title: '歴史叢書',
    url: 'https://el.wikisource.org/w/index.php?title=%CE%99%CF%83%CF%84%CE%BF%CF%81%CE%B9%CE%BA%CE%AE_%CE%92%CE%B9%CE%B2%CE%BB%CE%B9%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7&oldid=105741',
    file: 'Wikisource/diodorus-siculus/historical-library/txt/historical-library.txt',
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
  'nonn-dion': {
    author: 'nonnus',
    title: 'ディオニュシアカ',
    urn: 'urn:cts:greekLit:tlg2045.tlg001.perseus-grc2',
  },
  'plut-sert': {
    author: 'plutarch',
    title: 'セルトリウス伝',
    urn: 'urn:cts:greekLit:tlg0007.tlg042.perseus-grc2',
  },
  'eur-ia': {
    author: 'euripides',
    title: 'アウリスのイピゲネイア',
    urn: 'urn:cts:greekLit:tlg0006.tlg018.perseus-grc2',
  },
  'eur-tro': {
    author: 'euripides',
    title: 'トロイアの女たち',
    urn: 'urn:cts:greekLit:tlg0006.tlg011.perseus-grc2',
  },
  'eur-med': {
    author: 'euripides',
    title: 'メデイア',
    urn: 'urn:cts:greekLit:tlg0006.tlg003.perseus-grc2',
  },
  'ov-fast': {
    author: 'ovid',
    title: '祭暦',
    urn: 'urn:cts:latinLit:phi0959.phi007.perseus-lat2',
  },
  'ov-ibis': {
    author: 'ovid',
    title: 'イビス',
    urn: 'urn:cts:latinLit:phi0959.phi010.perseus-lat2',
  },
  'plut-thes': {
    author: 'plutarch',
    title: 'テセウス伝',
    urn: 'urn:cts:greekLit:tlg0007.tlg001.perseus-grc2',
  },
  pherecyd: {
    author: 'pherecydes',
    title: '歴史',
    url: 'http://www.dfhg-project.org/DFHG/index.php?volume=Volumen%20primum#urn:lofts:fhg.1.pherecydes',
    file: 'DFHG/pherecydes-of-athens/PHERECYDES.txt',
    unit: '断片',
  },
  // 箇所は章 (`5`)。本文系統が 2 つある章は `5.R` (Marcianus 444) と `5.D` (写本 L・M・O・S)。
  'eratosth-cat': {
    author: 'pseudo-eratosthenes',
    title: 'カタステリスモイ',
    url: 'https://eulogikon.org/works/eratosthenes-cyrene-catasterisms-kly-ab',
    file: 'Eulogikon/eratosthenes/catasterismi/txt/eratosthenes-cyrene-catasterisms-kly-ab.grc.txt',
  },
  'hyg-fab': {
    author: 'hyginus',
    title: '神話集',
    url: 'https://la.wikisource.org/w/index.php?title=Genealogiarum_liber/Fabulae&oldid=248081',
    pages: {
      pr: 'https://la.wikisource.org/w/index.php?title=Genealogiarum_liber/Praefatio&oldid=239523',
    },
    anchor: 'roman',
    locLabels: { pr: '序' },
    file: 'Wikisource/hyginus/fabulae/txt/fabulae.txt',
  },
  'hyg-astr': {
    author: 'hyginus',
    title: '天文詩',
    url: 'https://www.thelatinlibrary.com/hyginus.html',
    pages: {
      1: 'https://www.thelatinlibrary.com/hyginus/hyginus1.shtml',
      2: 'https://www.thelatinlibrary.com/hyginus/hyginus2.shtml',
      3: 'https://www.thelatinlibrary.com/hyginus/hyginus3.shtml',
      4: 'https://www.thelatinlibrary.com/hyginus/hyginus4.shtml',
    },
    file: 'TheLatinLibrary/hyginus/de-astronomia/txt/de-astronomia.txt',
  },
  'ant-lib': {
    author: 'antoninus-liberalis',
    title: '変身物語集',
    url: 'https://el.wikisource.org/w/index.php?title=%CE%9C%CE%B5%CF%84%CE%B1%CE%BC%CE%BF%CF%81%CF%86%CF%8E%CF%83%CE%B5%CF%89%CE%BD_%CF%83%CF%85%CE%BD%CE%B1%CE%B3%CF%89%CE%B3%CE%AE&oldid=148338',
    file: 'Wikisource/antoninus-liberalis/metamorphoses/txt/metamorphoses.txt',
  },
  cypria: {
    author: 'stasinus',
    title: 'キュプリア',
    url: 'https://eulogikon.org/works/proclus-chrestomathy-uqy-aq',
    file: 'Eulogikon/proclus/chrestomathia/txt/proclus-chrestomathy-uqy-aq.grc.txt',
    part: { loc: 'cypria', label: 'プロクロスの梗概' },
  },
  'ilias-parva': {
    author: 'lesches',
    title: '小イリアス',
    url: 'https://eulogikon.org/works/proclus-chrestomathy-uqy-aq',
    file: 'Eulogikon/proclus/chrestomathia/txt/proclus-chrestomathy-uqy-aq.grc.txt',
    part: { loc: 'ilias_parva', label: 'プロクロスの梗概' },
  },
  aethiopis: {
    author: 'arctinus',
    title: 'アイティオピス',
    url: 'https://eulogikon.org/works/proclus-chrestomathy-uqy-aq',
    file: 'Eulogikon/proclus/chrestomathia/txt/proclus-chrestomathy-uqy-aq.grc.txt',
    part: { loc: 'aethiopis', label: 'プロクロスの梗概' },
  },
  nosti: {
    author: 'agias',
    title: 'ノストイ',
    url: 'https://eulogikon.org/works/proclus-chrestomathy-uqy-aq',
    file: 'Eulogikon/proclus/chrestomathia/txt/proclus-chrestomathy-uqy-aq.grc.txt',
    part: { loc: 'nosti', label: 'プロクロスの梗概' },
  },
  'iliou-persis': {
    author: 'arctinus',
    title: 'イリオス落城',
    url: 'https://eulogikon.org/works/proclus-chrestomathy-uqy-aq',
    file: 'Eulogikon/proclus/chrestomathia/txt/proclus-chrestomathy-uqy-aq.grc.txt',
    part: { loc: 'iliou_persis', label: 'プロクロスの梗概' },
  },
  telegonia: {
    author: 'eugammon',
    title: 'テレゴニア',
    url: 'https://eulogikon.org/works/proclus-chrestomathy-uqy-aq',
    file: 'Eulogikon/proclus/chrestomathia/txt/proclus-chrestomathy-uqy-aq.grc.txt',
    part: { loc: 'telegonia', label: 'プロクロスの梗概' },
  },
  'schol-pind-n': {
    author: 'scholia-pindar',
    title: 'ネメア祝勝歌古注',
    urn: 'urn:cts:greekLit:tlg5034.tlg001c.perseus-grc1',
  },
  'suda-lex': {
    author: 'suda',
    title: 'スーダ辞典',
    urn: 'urn:cts:greekLit:tlg9010.tlg001.1st1K-grc1',
  },
  asclep: {
    author: 'asclepiades-tragilensis',
    title: '悲劇の題材',
    url: 'http://www.dfhg-project.org/DFHG/index.php?volume=Volumen%20tertium#urn:lofts:fhg.3.asclepiades_tragilensis',
    file: 'DFHG/asclepiades-of-tragilos/ASCLEPIADES_TRAGILENSIS.txt',
    unit: '断片',
  },
  herodor: {
    author: 'herodorus',
    title: '断片集',
    url: 'http://www.dfhg-project.org/DFHG/index.php?volume=Volumen%20secundum#urn:lofts:fhg.2.herodorus_heracleensis',
    file: 'DFHG/herodorus/HERODORUS_HERACLEENSIS.txt',
  },
  'verg-aen': {
    author: 'virgil',
    title: 'アエネイス',
    urn: 'urn:cts:latinLit:phi0690.phi003.perseus-lat2',
  },
  'quint-smyrn': {
    author: 'quintus-smyrnaeus',
    title: 'トロイア戦記',
    urn: 'urn:cts:greekLit:tlg2046.tlg001.perseus-grc2',
  },
  'hes-wd': {
    author: 'hesiod',
    title: '仕事と日',
    urn: 'urn:cts:greekLit:tlg0020.tlg002.perseus-grc2',
  },
  'h-hymn-2': {
    author: 'homeric-hymns',
    title: '第2歌 デメテル讃歌',
    urn: 'urn:cts:greekLit:tlg0013.tlg002.perseus-grc2',
  },
  'h-hymn-3': {
    author: 'homeric-hymns',
    title: '第3歌 アポロン讃歌',
    urn: 'urn:cts:greekLit:tlg0013.tlg003.perseus-grc2',
  },
  'h-hymn-5': {
    author: 'homeric-hymns',
    title: '第5歌 アプロディテ讃歌',
    urn: 'urn:cts:greekLit:tlg0013.tlg005.perseus-grc2',
  },
  'h-hymn-22': {
    author: 'homeric-hymns',
    title: '第22歌 ポセイドン讃歌',
    urn: 'urn:cts:greekLit:tlg0013.tlg022.perseus-grc2',
  },
  'aesch-ag': {
    author: 'aeschylus',
    title: 'アガメムノン',
    urn: 'urn:cts:greekLit:tlg0085.tlg005.perseus-grc2',
  },
  'eur-hec': {
    author: 'euripides',
    title: 'ヘカベ',
    urn: 'urn:cts:greekLit:tlg0006.tlg007.perseus-grc2',
  },
  'eur-andr': {
    author: 'euripides',
    title: 'アンドロマケ',
    urn: 'urn:cts:greekLit:tlg0006.tlg006.perseus-grc2',
  },
  strab: {
    author: 'strabo',
    title: '地理誌',
    urn: 'urn:cts:greekLit:tlg0099.tlg001.perseus-grc2',
  },
  'val-flac': {
    author: 'valerius-flaccus',
    title: 'アルゴナウティカ',
    urn: 'urn:cts:latinLit:phi1035.phi001.perseus-lat2',
  },
  'callim-h-1': {
    author: 'callimachus',
    title: 'ゼウス讃歌',
    urn: 'urn:cts:greekLit:tlg0533.tlg015.perseus-grc3',
  },
  'arat-phaen': {
    author: 'aratus',
    title: 'パイノメナ',
    urn: 'urn:cts:greekLit:tlg0653.tlg001.perseus-grc2',
  },
  'claud-rapt': {
    author: 'claudian',
    title: 'プロセルピナの略奪',
    urn: 'urn:cts:latinLit:stoa0089.stoa005.perseus-lat2',
  },
  'eur-hipp': {
    author: 'euripides',
    title: 'ヒッポリュトス',
    urn: 'urn:cts:greekLit:tlg0006.tlg005.perseus-grc2',
  },
  'soph-el': {
    author: 'sophocles',
    title: 'エレクトラ',
    urn: 'urn:cts:greekLit:tlg0011.tlg005.perseus-grc2',
  },
  'verg-geo': {
    author: 'virgil',
    title: '農耕詩',
    urn: 'urn:cts:latinLit:phi0690.phi002.perseus-lat2',
  },
} as const satisfies Record<string, Work>;

export type WorkId = keyof typeof works;

export const SCAIFE_READER = 'https://scaife.perseus.org/reader/';

/**
 * 範囲の終わりを、始まりと同じ形に補う。Scaife Viewer は `10.343-347` を読めないので `10.343-10.347` にする。
 */
export function fullRange(loc: string): string {
  const [start, end] = loc.split('-');
  if (end === undefined) return loc;
  const startParts = start.split('.');
  const endParts = end.split('.');
  return `${start}-${[...startParts.slice(0, startParts.length - endParts.length), ...endParts].join('.')}`;
}

/** 1〜3999 をローマ数字にする。 */
export function romanNumeral(value: number): string {
  const digits: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let rest = value;
  let result = '';
  for (const [unit, symbol] of digits) {
    while (rest >= unit) {
      result += symbol;
      rest -= unit;
    }
  }
  return result;
}

/**
 * 原文の該当箇所を開く URL。`loc` は `4.765-803` のような箇所。
 * CTS URN のある作品は Scaife Viewer。ない作品は、箇所のあるページ (pages、なければ url) を開き、
 * anchor の決まりがあれば箇所のアンカーを付ける。
 * url にアンカーを含む作品 (DFHG) は、箇所から断片の URN を作れないので、著者の位置を開く。
 */
export function sourceUrl(workId: WorkId, loc: string): string {
  const work: Work = works[workId];
  if ('urn' in work) return `${SCAIFE_READER}${work.urn}:${fullRange(loc)}/`;
  const head = loc.split(/[.-]/)[0] ?? loc;
  const page = work.pages?.[head] ?? work.url;
  if (work.anchor === 'roman' && /^\d+$/.test(head)) return `${page}#${romanNumeral(Number(head))}`;
  return page;
}

/** 「ヘシオドス『神統記』270–283」「ペレキュデス『歴史』断片 22」のような出典表記。 */
export function citeLabel(workId: WorkId, loc: string): string {
  const work: Work = works[workId];
  if ('part' in work && work.part?.loc === loc)
    return `${authors[work.author].name}『${work.title}』（${work.part.label}）`;
  const label = 'urn' in work ? undefined : work.locLabels?.[loc];
  if (label) return `${authors[work.author].name}『${work.title}』${label}`;
  const unit = 'unit' in work && work.unit ? `${work.unit} ` : '';
  return `${authors[work.author].name}『${work.title}』${unit}${loc.replace('-', '–')}`;
}

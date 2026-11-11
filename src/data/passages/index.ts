/** 引用レジストリ。作品 id → その作品の引用。型と使い方は src/lib/passages.ts。 */
import type { WorkPassages } from '../../lib/passages.ts';
import type { WorkId } from '../sources.ts';
import aeschAg from './aesch-ag.ts';
import aeschPv from './aesch-pv.ts';
import aethiopis from './aethiopis.ts';
import apRh from './ap-rh.ts';
import apollodEp from './apollod-ep.ts';
import apollodLib from './apollod-lib.ts';
import aratPhaen from './arat-phaen.ts';
import callimH1 from './callim-h-1.ts';
import cypria from './cypria.ts';
import diod15 from './diod-1-5.ts';
import eratosthCat from './eratosth-cat.ts';
import eurAlc from './eur-alc.ts';
import eurCyc from './eur-cyc.ts';
import eurHel from './eur-hel.ts';
import eurHer from './eur-her.ts';
import eurHipp from './eur-hipp.ts';
import eurIa from './eur-ia.ts';
import eurIon from './eur-ion.ts';
import eurMed from './eur-med.ts';
import eurPhoen from './eur-phoen.ts';
import eurTro from './eur-tro.ts';
import hHymn2 from './h-hymn-2.ts';
import hHymn3 from './h-hymn-3.ts';
import hHymn15 from './h-hymn-15.ts';
import hHymn22 from './h-hymn-22.ts';
import hdt from './hdt.ts';
import hesSc from './hes-sc.ts';
import hesTh from './hes-th.ts';
import hesWd from './hes-wd.ts';
import homIl from './hom-il.ts';
import homOd from './hom-od.ts';
import hygAstr from './hyg-astr.ts';
import hygFab from './hyg-fab.ts';
import iliasParva from './ilias-parva.ts';
import iliouPersis from './iliou-persis.ts';
import nonnDion from './nonn-dion.ts';
import nosti from './nosti.ts';
import ovFast from './ov-fast.ts';
import ovMet from './ov-met.ts';
import paus from './paus.ts';
import pindI from './pind-i.ts';
import pindN from './pind-n.ts';
import pindO from './pind-o.ts';
import pindP from './pind-p.ts';
import plutSert from './plut-sert.ts';
import plutThes from './plut-thes.ts';
import quintSmyrn from './quint-smyrn.ts';
import sophAj from './soph-aj.ts';
import sophEl from './soph-el.ts';
import sophOt from './soph-ot.ts';
import sophPh from './soph-ph.ts';
import sophTr from './soph-tr.ts';
import strab from './strab.ts';
import sudaLex from './suda-lex.ts';
import telegonia from './telegonia.ts';
import valFlac from './val-flac.ts';
import vergAen from './verg-aen.ts';
import vergGeo from './verg-geo.ts';

export const passages: Partial<Record<WorkId, WorkPassages>> = {
  'apollod-lib': apollodLib,
  'apollod-ep': apollodEp,
  cypria,
  'ilias-parva': iliasParva,
  aethiopis,
  nosti,
  'iliou-persis': iliouPersis,
  telegonia,
  'hyg-fab': hygFab,
  'hyg-astr': hygAstr,
  'diod-1-5': diod15,
  paus,
  strab,
  hdt,
  'plut-thes': plutThes,
  'plut-sert': plutSert,
  'suda-lex': sudaLex,
  'eratosth-cat': eratosthCat,
  'hes-th': hesTh,
  'hom-od': homOd,
  'hom-il': homIl,
  'ov-met': ovMet,
  'ap-rh': apRh,
  'eur-her': eurHer,
  'eur-cyc': eurCyc,
  'eur-hel': eurHel,
  'eur-phoen': eurPhoen,
  'eur-alc': eurAlc,
  'eur-ion': eurIon,
  'eur-ia': eurIa,
  'eur-tro': eurTro,
  'eur-med': eurMed,
  'eur-hipp': eurHipp,
  'soph-tr': sophTr,
  'soph-aj': sophAj,
  'soph-ot': sophOt,
  'soph-ph': sophPh,
  'soph-el': sophEl,
  'aesch-pv': aeschPv,
  'aesch-ag': aeschAg,
  'pind-o': pindO,
  'pind-p': pindP,
  'pind-n': pindN,
  'pind-i': pindI,
  'h-hymn-2': hHymn2,
  'h-hymn-3': hHymn3,
  'h-hymn-15': hHymn15,
  'h-hymn-22': hHymn22,
  'hes-wd': hesWd,
  'hes-sc': hesSc,
  'callim-h-1': callimH1,
  'arat-phaen': aratPhaen,
  'nonn-dion': nonnDion,
  'quint-smyrn': quintSmyrn,
  'verg-aen': vergAen,
  'verg-geo': vergGeo,
  'val-flac': valFlac,
  'ov-fast': ovFast,
};

/** 引用レジストリ。作品 id → その作品の引用。型と使い方は src/lib/passages.ts。 */
import type { WorkPassages } from '../../lib/passages.ts';
import type { WorkId } from '../sources.ts';
import aeschAg from './aesch-ag.ts';
import aeschPv from './aesch-pv.ts';
import aethiopis from './aethiopis.ts';
import apRh from './ap-rh.ts';
import apollodEp from './apollod-ep.ts';
import apollodLib from './apollod-lib.ts';
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
import hdt from './hdt.ts';
import hesTh from './hes-th.ts';
import homIl from './hom-il.ts';
import homOd from './hom-od.ts';
import hygAstr from './hyg-astr.ts';
import hygFab from './hyg-fab.ts';
import iliasParva from './ilias-parva.ts';
import iliouPersis from './iliou-persis.ts';
import nosti from './nosti.ts';
import ovMet from './ov-met.ts';
import paus from './paus.ts';
import plutSert from './plut-sert.ts';
import plutThes from './plut-thes.ts';
import sophAj from './soph-aj.ts';
import sophEl from './soph-el.ts';
import sophOt from './soph-ot.ts';
import sophPh from './soph-ph.ts';
import sophTr from './soph-tr.ts';
import strab from './strab.ts';
import sudaLex from './suda-lex.ts';
import telegonia from './telegonia.ts';

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
};

import type { ArticleClaims } from '../../lib/claims';

/** スフィンクスの論点表。 */
const claims: ArticleClaims = [
  {
    label: '両親',
    variants: [
      {
        label: 'オルトスと交わった母（エキドナ、またはキマイラ）の子',
        sources: [{ work: 'hes-th', loc: '326-327', kind: 'narrative' }],
      },
      {
        label: '大地とエキドナの子',
        sources: [{ work: 'eur-phoen', loc: '1019-1020', kind: 'mention' }],
      },
      {
        label: 'テュポンとエキドナの子',
        sources: [
          { work: 'apollod-lib', loc: '3.5.8', kind: 'narrative' },
          { work: 'hyg-fab', loc: '151.1', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: 'テーバイに送った者',
    variants: [
      {
        label: '冥府のハデス',
        sources: [{ work: 'eur-phoen', loc: '806-811', kind: 'mention' }],
      },
      {
        label: 'ヘラ',
        sources: [{ work: 'apollod-lib', loc: '3.5.8', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '姿',
    variants: [
      {
        label: '乙女の顔、獣の体、鳥の翼をもつ怪物',
        sources: [
          { work: 'aesch-sept', loc: '541', kind: 'mention' },
          { work: 'soph-ot', loc: '1198-1200', kind: 'mention' },
          { work: 'eur-phoen', loc: '806-809', kind: 'mention' },
          { work: 'diod-1-5', loc: '4.64.3', kind: 'mention' },
          { work: 'apollod-lib', loc: '3.5.8', kind: 'narrative' },
        ],
      },
      {
        label: '怪物ではなく、海賊の女',
        sources: [{ work: 'paus', loc: '9.26.2', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '謎',
    variants: [
      {
        label: '四本足にも二本足にも三本足にもなるものは何か（答えは人間）',
        sources: [
          { work: 'asclep', loc: '21', kind: 'narrative' },
          { work: 'diod-1-5', loc: '4.64.3-4', kind: 'narrative' },
          { work: 'apollod-lib', loc: '3.5.8', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '最期',
    variants: [
      {
        label: 'オイディプスに殺された',
        sources: [
          { work: 'soph-ot', loc: '1198-1200', kind: 'mention' },
          { work: 'eur-phoen', loc: '1504-1507', kind: 'mention' },
          { work: 'paus', loc: '9.26.2', kind: 'narrative' },
        ],
      },
      {
        label: '謎を解かれて身を投げた',
        sources: [
          { work: 'diod-1-5', loc: '4.64.4', kind: 'narrative' },
          { work: 'apollod-lib', loc: '3.5.8', kind: 'narrative' },
          { work: 'hyg-fab', loc: '67.5', kind: 'narrative' },
        ],
      },
    ],
  },
];

export default claims;

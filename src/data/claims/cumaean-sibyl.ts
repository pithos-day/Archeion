import type { ArticleClaims } from '../../lib/claims';

/** クマエのシビュラの論点表。 */
const claims: ArticleClaims = [
  {
    label: '名',
    variants: [
      {
        label: 'グラウコスの娘デイポベ',
        sources: [{ work: 'verg-aen', loc: '6.35-36', kind: 'narrative' }],
      },
      {
        label: 'デモ',
        sources: [{ work: 'paus', loc: '10.12.8', kind: 'narrative' }],
      },
    ],
  },
  {
    label: '長命の由来',
    variants: [
      {
        label: 'アポロンに、ひとつかみの砂の粒の数だけの年を願ったが、若さを願い忘れた',
        sources: [{ work: 'ov-met', loc: '14.132-146', kind: 'narrative' }],
      },
    ],
  },
  {
    label: 'アイネイアスの冥府行き',
    variants: [
      {
        label: 'シビュラがアイネイアスを冥府へ案内した',
        sources: [
          { work: 'verg-aen', loc: '6.262-263', kind: 'narrative' },
          { work: 'ov-met', loc: '14.110-121', kind: 'narrative' },
        ],
      },
    ],
  },
  {
    label: '金枝のありかを示したもの',
    variants: [
      {
        label: 'アプロディテの二羽の鳩が、アイネイアスを金枝の木へ導いた',
        sources: [{ work: 'verg-aen', loc: '6.190-204', kind: 'narrative' }],
      },
      {
        label: 'シビュラが金枝を示した',
        sources: [{ work: 'ov-met', loc: '14.113-115', kind: 'narrative' }],
      },
    ],
  },
];

export default claims;

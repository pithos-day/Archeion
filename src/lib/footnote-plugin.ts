/**
 * 脚注の一覧を Wikipedia 風に組み直す Sätteri の hast プラグイン。
 *
 * - 本文へ戻るリンクを先頭に置く。参照が 1 か所なら「^」、2 か所以上なら「^ a b」
 * - 脚注の原文 «…» は「原語で表示」で折りたたみ、続く（訳）を本文として出す
 *
 * 脚注の書き方は `[ラベル](URL)。«原文»（訳）`（/policy/ の「出典の示し方」）。
 */
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import type { Element, ElementContent, Text } from 'hast';

type HastPlugin = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

const GREEK = /[Ͱ-Ͽἀ-῿]/;

function text(value: string): Text {
  return { type: 'text', value };
}

function element(
  tagName: string,
  properties: Element['properties'],
  children: ElementContent[],
): Element {
  return { type: 'element', tagName, properties, children };
}

function isBackref(node: ElementContent): node is Element {
  return (
    node.type === 'element' && node.tagName === 'a' && 'dataFootnoteBackref' in node.properties
  );
}

/** 「^」または「^ a b」の戻りリンク。 */
function backrefLinks(backrefs: Element[]): Element {
  const link = (backref: Element, children: ElementContent[]) =>
    element(
      'a',
      { href: backref.properties.href, ariaLabel: backref.properties.ariaLabel },
      children,
    );
  const [first] = backrefs;
  if (backrefs.length === 1 && first) {
    return element('span', { className: ['fn-backrefs'] }, [link(first, [text('^')])]);
  }
  const letters = backrefs.flatMap((backref, index) => [
    text(' '),
    element('sup', {}, [link(backref, [text(String.fromCharCode(97 + index))])]),
  ]);
  return element('span', { className: ['fn-backrefs'] }, [text('^'), ...letters]);
}

/** `start` の位置の「（」に対応する「）」の位置。入れ子の括弧を数える。 */
function closingParen(value: string, start: number): number {
  let depth = 0;
  for (let i = start; i < value.length; i++) {
    if (value[i] === '（') depth += 1;
    else if (value[i] === '）' && --depth === 0) return i;
  }
  return -1;
}

/** テキストから «原文»（訳）を取り出し、訳だけを残したテキストと原文の一覧を返す。 */
function extractQuotes(value: string): { rest: string; quotes: string[] } {
  const quotes: string[] = [];
  let rest = '';
  let position = 0;
  for (let open = value.indexOf('«'); open !== -1; open = value.indexOf('«', position)) {
    const close = value.indexOf('»', open);
    if (close === -1) break;
    quotes.push(value.slice(open + 1, close));
    rest += value.slice(position, open);
    position = close + 1;
    // 原文の直後の（訳）は括弧を外して本文にする
    if (value[position] === '（') {
      const end = closingParen(value, position);
      if (end !== -1) {
        rest += value.slice(position + 1, end);
        position = end + 1;
      }
    }
  }
  return { rest: rest + value.slice(position), quotes };
}

function rebuildFootnote(item: Element): Element | undefined {
  const paragraph = item.children.find(
    (child): child is Element => child.type === 'element' && child.tagName === 'p',
  );
  if (!paragraph) return undefined;

  const backrefs = paragraph.children.filter(isBackref);
  const quotes: string[] = [];
  const body: ElementContent[] = [];
  for (const child of paragraph.children) {
    if (isBackref(child)) continue;
    if (child.type === 'text') {
      const extracted = extractQuotes(child.value);
      quotes.push(...extracted.quotes);
      body.push(text(extracted.rest));
    } else {
      body.push(child);
    }
  }
  // 戻りリンクの前後に残る空白を落とす
  while (body.at(-1)?.type === 'text' && (body.at(-1) as Text).value.trim() === '') body.pop();
  const last = body.at(-1);
  if (last?.type === 'text') last.value = last.value.trimEnd();

  const children: ElementContent[] = [
    backrefLinks(backrefs),
    text(' '),
    element('span', { className: ['fn-body'] }, body),
  ];
  if (quotes.length > 0) {
    const originals = quotes.flatMap((quote, index) => [
      ...(index > 0 ? [element('br', {}, [])] : []),
      element('span', { lang: GREEK.test(quote) ? 'grc' : 'la' }, [text(quote)]),
    ]);
    children.push(
      element('details', { className: ['fn-original'] }, [
        element('summary', {}, [text('［原語で表示］')]),
        element('p', {}, originals),
      ]),
    );
  }
  return element('li', item.properties, children);
}

export const wikiFootnotes: HastPlugin = {
  name: 'wiki-footnotes',
  element: {
    filter: ['li'],
    visit(node, ctx) {
      if (!String(node.properties.id ?? '').startsWith('user-content-fn-')) return;
      const rebuilt = rebuildFootnote(node as Element);
      if (rebuilt) ctx.replaceNode(node, rebuilt);
    },
  },
};

# Archeion

ギリシャ神話の記事を、原典の記述にもとづいて書く日本語のウィキ。Astro + Starlight。

記事の内容の規則（どの説を採るか、本文の書き方、出典の示し方、表記）の正本は編集方針 `src/content/docs/policy.md`。ここやスキルに規則を写さず、編集方針を読んで従う。編集方針に足りない規則が見つかったら、編集方針を直す。

## ファイル

| 場所 | 中身 |
| --- | --- |
| `src/content/docs/articles/<slug>.mdx` | 記事 (総合版)。frontmatter の型は `src/content.config.ts` |
| `src/content/docs/versions/<slug>/<著者>.md` | 著者別の版 (`versionOf`、`versionReason`) |
| `src/content/docs/policy.md` | 編集方針 |
| `src/data/claims/<slug>.ts` | 記事の論点表。スコアの計算は `src/lib/claims.ts` |
| `src/data/passages/<作品 id>.ts` | 引用レジストリ (脚注の原文と訳)。作品を足したら `passages/index.ts` にも登録する |
| `src/data/sources.ts` | 出典レジストリ (著者 `authors`、作品 `works`) |
| `src/data/names.ts` | 表記レジストリ (`names`、`aliases`、`unlinkedPhrases`) |
| `scripts/` | 確認とリンク付けのスクリプト (下のコマンド) |

記事の一覧、カテゴリ、赤リンク、執筆待ちの一覧はコンテンツから自動で作られるので、記事を足すときに `astro.config.mjs` などへの登録は要らない。

原典テキストはリポジトリの外にあり、`MYTH_CORPUS` (既定は `~/Documents/greek-mythology`) から読む。読み方は `scripts/corpus.ts`。

## コマンド

| コマンド | 用途 |
| --- | --- |
| `pnpm check:articles` | 表記レジストリ、著者名の前置き、併記しない説だけの文を確かめる。エラーで終了コード 1、警告は人が判断する |
| `pnpm verify:citations` | 脚注、引用レジストリ、論点表の出典を原典と照合する |
| `pnpm show:sentences <作品 id> <箇所>` | 原典の箇所を文に分けて表示する。レジストリに文を加えるときに使う |
| `pnpm link:names [ファイル...]` | 固有名詞に記事へのリンクを付ける (ファイルを書き換える) |
| `pnpm lint` / `pnpm check` / `pnpm knip` | Biome / 型チェック / 未使用のコード |

## 作業の手順

- 記事や版を書く: `write-article` スキル
- 出典を加える、論点表を直す: `add-source` スキル
- 記事を確かめる: `audit-article` スキル

## 開発サーバー

開発サーバーはバックグラウンドで起動する。

```
astro dev --background
```

`astro dev stop`、`astro dev status`、`astro dev logs` で管理する。Astro の使い方は https://docs.astro.build を参照する。

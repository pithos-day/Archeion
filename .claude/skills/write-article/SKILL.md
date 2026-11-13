---
name: write-article
description: >-
  Archeion のギリシャ神話の記事 (総合版) や著者別の版を新しく書く時に使用する。
  原典の収集、論点表 (src/data/claims) の作成とスコアによる採用説の決定、引用レジストリへの文と訳の追加、
  本文と脚注の執筆、表記レジストリへの登録とリンク付け、監査までを行う。
  「記事を書いて」「〜の記事を追加」「赤リンクを埋めて」「〜版を作って」で起動する。
  既存の記事に出典を足すだけなら add-source、確かめるだけなら audit-article を使用する。
---

# 記事の執筆

規則は編集方針 `src/content/docs/policy.md` に従う。作業の前に全文を読む。

## 1. 対象を決める

- slug は英語名の小文字 (`sphinx`、`trojan-horse`)。`src/data/names.ts` に登録済みなら、その slug を使う。
- 表記 (記事のタイトル) は `names.ts` の `names` の表記にそろえる。未登録なら、ここで決めて登録する。
- 著者別の版は、編集方針の「著者別の版を作る条件」を満たすかを、作る前にユーザーに確認する。満たさない違いは、総合版の「一説には…」と論点表で示す。

## 2. 原典を集める

- 主要な原典 (ホメロス、ヘシオドス、悲劇、アポロドロス、ディオドロス、ヒュギーヌス、オウィディウス、パウサニアスなど) で、その人物や出来事を語る箇所を探す。原典テキストは `MYTH_CORPUS` (既定は `~/Documents/greek-mythology`) にある。
- 箇所の文は `pnpm show:sentences <作品 id> <箇所>` で確かめる。未登録の作品は、`add-source` スキルの手順 2 で登録する。

## 3. 論点表を作る

- `src/data/claims/<slug>.ts` を作る。既存のもの (`sphinx.ts` など) を手本にする。
- 原典のあいだで記述が分かれる点を論点にし、説ごとに出典を `{ work, loc, kind }` で並べる。論点の問いに答えていない記述は数えない。
- 論点が、ほかの記事の論点表にもあるかを `grep -rn "label: '<論点名>'" src/data/claims/` で探し、同じ出典でそろえる。
- スコアと判定を表示して、採用説と併記する説を決める（コマンドは `add-source` スキルの手順 4）。

## 4. 引用レジストリに文を加える

脚注で引く文を `src/data/passages/<作品 id>.ts` に加える。手順と注意は `add-source` スキルの手順 3。

## 5. 本文を書く

- frontmatter: `title`、`description`、`created` (今日の日付)、`categories`、必要なら `infobox`。版は `slug`、`versionOf`、`versionLabel`、`versionOrder`、`versionReason`。手本は `articles/sphinx.mdx` と `versions/medusa/ovid.md`。
- 総合版の末尾に「諸説の比較」(`<ClaimsTable claims={claims} />`) と「脚注」の節を置く。
- 本文は採用説で書き、併記する説だけを「一説には…」で書く。`minor` の説は本文に書かない。
- 同じ事実は一文で書き、脚注は最大 3 件。
- 著者名の前置き、別名の括弧書き、装飾的な形容を書かない。
- 脚注は `[^id]: @<作品 id>/<箇所>:<文>` の参照だけで書く。

## 6. 表記とリンク

- 本文の新しい固有名詞を `names.ts` に登録する（記事がまだなくてよい。赤リンクになる）。別名は `aliases`、リンクしない語句は `unlinkedPhrases`。
- `pnpm link:names src/content/docs/articles/<slug>.mdx` を実行し、同名の別人へのリンクを手で直す。

## 7. 確かめる

`audit-article` スキルの手順で、新しい記事と、論点表を触ったほかの記事を確かめる。

## コミット

記事 1 本 (またはその版) ごとにコミットする（commit スキル、type は `docs`）。ほかの記事の論点表をそろえた変更は、別のコミットにする。

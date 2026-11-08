# 開発・CV更新ガイド

React / TypeScript / Viteで作成した研究者ポートフォリオです。

## CV・業績の更新

**更新元は [content/cv/Shunta_Ide_CV.docx](../content/cv/Shunta_Ide_CV.docx) です。** Word原本は`public/`の外に置き、サイト用データと公開PDFを生成します。

1. Word原本を編集して保存する。
2. `npm run cv:sync`を実行する。
3. `npm run dev`で表示を確認する。
4. Word原本、`src/data/generated/cv.json`、`public/CV.pdf`を一緒にコミットする。

取り込みは学歴、研究歴、教育歴、職歴、活動、受賞、論文、学会発表に対応しています。サイトの`resume.ts`・`publications.ts`・`presentations.ts`は生成データを参照するため、個別に編集する必要はありません。

```sh
npm run cv:preview # 読み取り確認のみ。ファイルは変更しない
npm run cv:sync    # サイト用データとPDFをまとめて更新
npm run cv:check   # Word・データ・PDFが同期しているか確認
npm run cv:test    # 取り込み処理のテスト
```

`npm run build`でも同期状態を確認します。Wordだけ変更して取り込みを忘れた場合は、ビルドを停止し、`npm run cv:sync`を案内します。生成済みファイルが同期していれば、CIでWordやPDF変換ソフトを起動する必要はありません。

### Wordの書式

現在の原本の書式に合わせて取り込みます。通常の文章編集や項目追加は、そのまま行えます。

- 大見出しの名前を維持する：`EDUCATION`、`RESEARCH EXPERIENCE`、`TEACHING EXPERIENCE`、`PUBLICATIONS`、`CONFERENCE PRESENTATIONS`、`PROFESSIONAL EXPERIENCE`、`LEADERSHIP & ACTIVITIES`、`HONORS & AWARDS`。
- 経歴は「項目名 → Tab → 期間」の段落を作り、続く段落に所属や説明を書く。職歴では、最初の行が企業名、次の行が役職。
- 論文・発表は1項目1段落とし、タイトルを`“…”`または`"…"`で囲む。著者名や句読点の書式を維持する。
- 発表は`Oral Presentation`／`Poster Presentation`の下に置く。末尾は`November 2, 2026.`のような日付にする。
- 論文は会議名・年・DOIまたはarXiv番号を記載する。`Submitted For Publication`や`to appear`も取り込む。

テキストボックスの件数表示、変更履歴の削除部分、冒頭の個人情報、`ADDITIONAL INFORMATION`以降はサイト用データに取り込みません。PDFにはWord文書全体を出力します。日付と会議名の年が違う場合は注意を表示しますが、Wordの値をそのまま採用します。

段組みや表への変更、大見出しの変更など、文書構造を変える場合は取り込み処理の調整が必要です。読み取りに失敗したときは、既存のデータとPDFを更新しません。

### PDF出力

Python 3.9以降が必要です。macOSでMicrosoft Wordがインストールされている場合は、WordからPDFを生成します。一時コピーを開いて出力するため、原本や編集中の文書を上書きしません。初回はmacOSからWordの操作許可を求められる場合があります。

Wordがない環境ではLibreOfficeの`soffice`または`libreoffice`コマンドを使います。レイアウトはWordと異なる場合があります。

手動でWordから出力したPDFを使うこともできます。**同じ更新済みWordから出力したPDF**を指定してください。

```sh
npm run cv:sync -- --pdf /absolute/path/to/exported-CV.pdf
```

### サイトだけの補足情報

[content/cv/site-extras.json](../content/cv/site-extras.json)には、Wordにない会議・企業へのリンク、開発経験の説明、学科情報を残しています。Wordに説明を追加した場合はWordを優先します。会議名や企業名・役職名を変えた場合、対応する補足情報のキーも変更してください。新規項目は補足情報がなくても取り込めます。

研究紹介やRecent publicationsの短い解説はサイト固有の文章として管理しています。論文タイトル・著者・日付など、CVと重複する事実はWordから読み取ります。

## 開発

```sh
npm ci
npm run dev
npm run build
```

ローカルプレビュー：`http://localhost:5173/`

トップページに研究紹介、Recent publications、論文・発表一覧、CV、過去の開発活動を掲載しています。従来の`/#/publications`・`/#/presentations`・`/#/resume`などのURLは、トップページの対応するセクションへ移動します。

# LFDA Website

**Living Fully in the Digital Age** — AI時代を生きる若者からのデジタルメディア、LFDAの公式ウェブサイト。

🌐 **公開URL**: https://lfda-website.github.io/lfda-website/ *(GitHub Pages)*

---

## 概要

| 項目 | 内容 |
|------|------|
| フレームワーク | Vite + React 18 |
| スタイリング | CSS Modules |
| 公開先 | GitHub Pages |
| デプロイ | GitHub Actions（mainブランチへのpushで自動デプロイ） |
| デザイン | エディトリアル・雑誌風（Playfair Display × Noto Serif JP × Space Mono） |

---

## ローカル起動

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173/lfda-website/ を開く。

```bash
npm run build    # 本番ビルド → dist/
npm run preview  # ビルド結果をローカルでプレビュー
```

---

## ディレクトリ構成

```
src/
├── data/               # 静的コンテンツデータ（JS定数）
│   ├── members.js      # メンバー情報
│   ├── pillars.js      # コンテンツシリーズ（3本柱）
│   ├── podcasts.js     # Podcastプラットフォームリンク
│   ├── platforms.js    # 全プラットフォームリンク
│   ├── vmv.js          # Vision / Mission
│   └── values.js       # 5つのバリュー
├── services/
│   └── noteRss.js      # note RSS フェッチ・XML解析
├── hooks/
│   ├── useNoteArticles.js   # note記事の取得状態管理
│   └── useActiveSection.js  # スクロール位置連動のアクティブタブ
└── components/
    ├── Nav              # スティッキーナビゲーション
    ├── Hero             # メインビジュアル + Instagram CTA
    ├── Pullquote        # ミッション引用
    ├── Pillars          # コンテンツシリーズ紹介（3カラム）
    ├── contents/        # Contentsセクション（note / Podcast / Instagram）
    │   ├── Contents          # 組み立て役
    │   ├── NoteArticles      # note RSS 記事グリッド
    │   ├── PodcastLinks      # Podcast 3プラットフォームリンク
    │   └── InstagramBanner   # Instagram フォロー導線バナー
    ├── Members          # メンバー紹介グリッド
    ├── VMV              # Vision / Mission（黒背景）
    ├── Values           # 5つのバリュー
    ├── Platforms        # プラットフォーム一覧
    └── Footer           # フッター
```

---

## コンテンツの更新方法

### メンバーを追加・変更する

`src/data/members.js` を編集する。

```js
{ id: 1, name: '田中 花子', nameEn: 'Hanako Tanaka', role: '編集長', comment: 'コメント（80文字程度）', photo: 'member-01.jpg' }
```

顔写真は `public/members/member-01.jpg`〜`member-06.jpg` に配置（400×400px 以上の正方形推奨）。  
`photo: null` のままにするとイニシャルアバターが表示される。

### テキストコンテンツを変更する

| 変更したい箇所 | ファイル |
|--------------|---------|
| Vision / Mission | `src/data/vmv.js` |
| バリュー（5項目） | `src/data/values.js` |
| コンテンツシリーズ紹介 | `src/data/pillars.js` |
| Podcastリンク | `src/data/podcasts.js` |
| プラットフォームリンク | `src/data/platforms.js` |

---

## プラットフォーム

| メディア | URL |
|---------|-----|
| Instagram | [@fillingyourdigitalwellbeing](https://www.instagram.com/fillingyourdigitalwellbeing/) |
| note | [note.com/genial_iris250](https://note.com/genial_iris250) |
| Apple Podcasts | [帰り道のTech Talk](https://podcasts.apple.com/jp/podcast/%E5%B8%B0%E3%82%8A%E9%81%93%E3%81%AEtech-talk-%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%A6%E3%82%A7%E3%83%AB%E3%83%93%E3%83%BC%E3%82%A4%E3%83%B3%E3%82%B0%E5%AD%A6%E7%94%9F%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2lfda/id1874514411) |
| Spotify | [帰り道のTech Talk](https://open.spotify.com/show/3hRAPg1USA102GEQKlYGLj) |
| LISTEN | [listen.style/p/lfda_digitalwellbeing](https://listen.style/p/lfda_digitalwellbeing) |

---

## note RSS について

トップページにnoteの最新記事（最大5件）をRSSから自動取得して表示している。  
CORS回避のため [allorigins.win](https://api.allorigins.win) プロキシを経由してフェッチしている。

フェッチ失敗時はnoteへの直リンクボタンにフォールバックする。

> **代替方針**: allorigins.win が不安定な場合は、GitHub Actionsで定期フェッチして `public/note-cache.json` にキャッシュする方式に切り替える。その場合 `src/services/noteRss.js` のみ差し替えればよく、他のファイルの変更は不要。

---

## お問い合わせ

lfda.digitalwellbeing@gmail.com

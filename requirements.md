# LFDA Website — 要件定義書

> Claude Code向け実装指示書 v1.2 / 2026-04-15

---

## 概要

**プロジェクト名**: LFDA Website  
**技術スタック**: Vite + React + CSS Modules  
**公開先**: GitHub Pages  
**参照デザイン**: エディトリアル・雑誌風（Playfair Display × Noto Serif JP × Space Mono）

---

## アーキテクチャ方針

本プロジェクトは以下の3層に責務を分離する。

| 層 | ディレクトリ | 責務 |
|----|------------|------|
| データ層 | `src/data/` | 静的コンテンツデータ（JS定数）|
| サービス層 | `src/services/` | 外部API・RSSフェッチ、レスポンス変換 |
| フック層 | `src/hooks/` | Reactの状態管理（useEffectでサービスを呼ぶ）|
| プレゼンテーション層 | `src/components/` | UI描画のみ（データ取得ロジックを持たない）|

コンポーネントはデータを`props`として受け取るか、フックを経由して取得する。  
フェッチ処理・XML解析・データ加工をコンポーネント内に直接書かない。

---

## ディレクトリ構成（完成形）

```
lfda-website/
├── public/
│   ├── logo.png              # 透過PNG（黒文字）← 別途配置済み
│   └── members/
│       └── member-01.jpg 〜 member-06.jpg   # 顔写真（任意）
├── src/
│   ├── main.jsx
│   ├── index.css             # グローバルCSS変数・リセット
│   ├── App.jsx               # コンポーネント組み立て
│   ├── data/                 # 静的コンテンツデータ
│   │   ├── members.js
│   │   ├── pillars.js
│   │   ├── podcasts.js
│   │   ├── platforms.js
│   │   ├── vmv.js
│   │   └── values.js
│   ├── services/             # 外部通信・データ変換（副作用層）
│   │   └── noteRss.js        # RSS フェッチ＋XML解析
│   ├── hooks/                # Reactカスタムフック（状態管理層）
│   │   ├── useNoteArticles.js  # noteRss.js を呼び出しローディング/エラー状態を管理
│   │   └── useActiveSection.js # IntersectionObserver でアクティブセクションを管理
│   └── components/
│       ├── Nav.jsx / Nav.module.css
│       ├── Hero.jsx / Hero.module.css
│       ├── Pullquote.jsx / Pullquote.module.css
│       ├── Pillars.jsx / Pillars.module.css
│       ├── contents/                         # Contentsセクション（サブディレクトリ）
│       │   ├── Contents.jsx / Contents.module.css   # 組み立て役（3ブロックをimport）
│       │   ├── NoteArticles.jsx / NoteArticles.module.css
│       │   ├── PodcastLinks.jsx / PodcastLinks.module.css
│       │   └── InstagramBanner.jsx / InstagramBanner.module.css
│       ├── Members.jsx / Members.module.css
│       ├── VMV.jsx / VMV.module.css
│       ├── Values.jsx / Values.module.css
│       ├── Platforms.jsx / Platforms.module.css
│       └── Footer.jsx / Footer.module.css
├── index.html
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml        # GitHub Actions自動デプロイ
```

---

## デザイントークン（index.css）

```css
:root {
  /* カラー */
  --ink: #1a1a18;
  --paper: #f5f2ec;
  --cream: #ede9e0;
  --accent: #2d5a3d;
  --muted: #8a8679;
  --rule: #c8c4ba;

  /* フォント */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-jp: 'Noto Serif JP', serif;
  --font-mono: 'Space Mono', monospace;

  /* ブレークポイント（CSS変数はメディアクエリに使えないため、使用箇所はコメントで参照） */
  /* --bp-md: 900px  ← タブレット境界 */
  /* --bp-sm: 600px  ← モバイル境界 */
}
```

> **ブレークポイント統一ルール**  
> 全コンポーネントで `@media (max-width: 900px)` / `@media (max-width: 600px)` の2段階のみ使用する。`768px` は使わない。

Google Fontsで読み込む:
- `Playfair Display`: ital,wght@0,400;0,700;1,400
- `Noto Serif JP`: wght@300;400
- `Space Mono`: wght@400

---

## ページ・タブ構成

### ナビゲーション構造

サイトは**シングルページ + タブ切り替え**方式。Navの右側にタブリンクを配置し、クリックで対応セクションにスクロール。

```
Nav（sticky）
├── 左: ロゴ
├── 中: タブリンク About | Contents | Members | Contact
└── 右端: Instagramアイコン（#E1306C）← 常時表示、全ページで見える
```

**タブの動作**:
- `About` → `#about`（Hero）へスクロール
- `Contents` → `#contents`（note / Podcast / Instagram を内包）へスクロール
- `Members` → `#members` へスクロール
- `Contact` → `mailto:lfda.digitalwellbeing@gmail.com`

**アクティブ状態**: `useActiveSection` フックで自動更新、`border-bottom: 1.5px solid var(--ink)` で強調

---

## セクション構成（上から順）

```
Nav（sticky、タブ + Instagramアイコン常時表示）
Hero             ← #about   ★ Instagram CTA ボタン（最重要導線）
Pullquote
Pillars
Contents         ← #contents（note / Podcast / Instagram を内包）
Members          ← #members
VMV
Values
Platforms
Footer           ← Instagram テキストリンク（離脱前の最後の導線）
```

---

## データ定義（src/data/）

### members.js

```js
export const members = [
  { id: 1, name: 'Member 01', nameEn: 'Member One',   role: '編集長',          comment: 'デジタルと人間の関係を探求しています。',   photo: null },
  { id: 2, name: 'Member 02', nameEn: 'Member Two',   role: 'ライター',        comment: 'テクノロジーと日常のあいだを書いています。', photo: null },
  { id: 3, name: 'Member 03', nameEn: 'Member Three', role: 'ポッドキャスター', comment: '帰り道のTech Talkでしゃべっています。',      photo: null },
  { id: 4, name: 'Member 04', nameEn: 'Member Four',  role: 'デザイナー',      comment: 'LFDAのビジュアルを担当しています。',         photo: null },
]
```

### pillars.js

```js
export const pillars = [
  {
    id: 1,
    series: 'Series 01',
    emoji: '🛠',
    title: 'Daily Hacks',
    body: '毎日の悩みを、ツールで解決する。日常の具体的な課題に対し、実用的なデジタルツールやワークフローを提案するシリーズ。',
  },
  {
    id: 2,
    series: 'Series 02',
    emoji: '🔍',
    title: 'Tools & Trends',
    body: '知らなかったことを、知りたくなる。注目のツール・アプリ・テックトレンドを、実際に体験しながら深掘りするシリーズ。',
  },
  {
    id: 3,
    series: 'Series 03',
    emoji: '🎤',
    title: 'Voices',
    body: '編集部の、頭の中。AIには生成できない、人間の声と温度をそのまま届けるPodcastシリーズ。',
  },
]
```

### podcasts.js

```js
export const podcasts = [
  {
    id: 'apple',
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/jp/podcast/帰り道のtech-talk-デジタルウェルビーイング学生メディアlfda/id1874514411',
    color: '#FC3C44',
    description: 'Apple Podcastsで聴く',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: 'https://open.spotify.com/show/3hRAPg1USA102GEQKlYGLj',
    color: '#1DB954',
    description: 'Spotifyで聴く',
  },
  {
    id: 'listen',
    name: 'LISTEN',
    url: 'https://listen.style/p/lfda_digitalwellbeing',
    color: '#333333',
    description: 'LISTENで聴く',
  },
]
```

### platforms.js

```js
export const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/fillingyourdigitalwellbeing/',
    description: '各種アップデート・日常の発信',
    hasIcon: true, // SVGグラデーションアイコンを表示
  },
  {
    id: 'note',
    name: 'note',
    url: 'https://note.com/genial_iris250',
    description: '長編記事・深掘りコンテンツ',
    hasIcon: false,
  },
  {
    id: 'apple-podcasts',
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/jp/podcast/帰り道のtech-talk-デジタルウェルビーイング学生メディアlfda/id1874514411',
    description: '帰り道のTech Talk',
    hasIcon: false,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: 'https://open.spotify.com/show/3hRAPg1USA102GEQKlYGLj',
    description: '帰り道のTech Talk',
    hasIcon: false,
  },
]
```

### vmv.js

```js
export const vmv = {
  vision: 'テクノロジーを使って幸せに生きる — ワクワクするデジタル空間を作る',
  mission: '問いを立て、心を揺らし、社会にオルタナティブを提案する',
}
```

### values.js

```js
export const values = [
  {
    id: 1,
    no: '01',
    title: '心理的安全性を守り、多様な意見を踏まえる',
    body: '疑問や懸念も素直に安心して表現できることを大事にします。多様なアイデアを掛け合わせながら創造的なコンテンツをつくります。',
  },
  {
    id: 2,
    no: '02',
    title: '思い浮かんだら、即行動',
    body: '思いついた瞬間に試し、形にする。ひらめいた一瞬の熱を殺さず、そのままの温度で世界に実装しよう。',
  },
  {
    id: 3,
    no: '03',
    title: '手ざわりのある経験・自分の人生からの言葉を',
    body: 'AIが語れるような理論ではなく、自分たちの日常から生まれたリアルな実感を大切にする。',
  },
  {
    id: 4,
    no: '04',
    title: '未来を生きる当事者',
    body: 'この先数十年を生きる当事者として課題に向き合う。短期的な損得ではなく、長期的なウェルビーイングを優先する。',
  },
  {
    id: 5,
    no: '05',
    title: '若者の感性、大きな大人にはできないこと',
    body: '自分たちのリアルを自分たちの言葉で語り、そこから文化をつくっていく。',
  },
]
```

---

## サービス層（src/services/）

### noteRss.js

```js
const RSS_URL = 'https://note.com/genial_iris250/rss'
const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`

/**
 * note RSS を取得してパースした記事配列を返す
 * @returns {Promise<Array<{title, link, pubDate, thumbnail}>>} 最大5件
 */
export async function fetchNoteArticles() {
  const res = await fetch(PROXY_URL)
  if (!res.ok) throw new Error('RSS fetch failed')
  const { contents } = await res.json()
  const doc = new DOMParser().parseFromString(contents, 'text/xml')
  const items = [...doc.querySelectorAll('item')].slice(0, 5)
  return items.map((item) => ({
    title: item.querySelector('title')?.textContent ?? '',
    link: item.querySelector('link')?.textContent ?? '',
    pubDate: item.querySelector('pubDate')?.textContent ?? '',
    thumbnail: extractThumbnail(item.querySelector('description')?.textContent ?? ''),
  }))
}

function extractThumbnail(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/)
  return match ? match[1] : null
}
```

> **allorigins.win の代替方針**  
> allorigins.win がCORS/可用性の問題を起こす場合は、GitHub Actionsで定期フェッチしてJSONキャッシュ（`public/note-cache.json`）に書き出す方式へ切り替える。その場合 `noteRss.js` の `fetchNoteArticles` のみ差し替えればよく、フック・コンポーネントの変更は不要。

---

## フック層（src/hooks/）

### useNoteArticles.js

```js
import { useState, useEffect } from 'react'
import { fetchNoteArticles } from '../services/noteRss'

export function useNoteArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNoteArticles()
      .then(setArticles)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { articles, loading, error }
}
```

### useActiveSection.js

```js
import { useState, useEffect } from 'react'

/**
 * 指定セクションIDのいずれかが viewport に入ったとき activeId を更新する
 * @param {string[]} sectionIds  例: ['about', 'contents', 'members']
 * @returns {string} activeId
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
```

---

## コンポーネント仕様

### Nav

- 左: `<img src={import.meta.env.BASE_URL + 'logo.png'} alt="LFDA" height="32" />`
- 中: タブリンク（About / Contents / Members / Contact）
- 右端: Instagramアイコン（SVGインライン、`#E1306C`）← **常時表示、全スクロール位置で見える**
  - リンク先: `https://www.instagram.com/fillingyourdigitalwellbeing/`
  - `target="_blank" rel="noopener noreferrer"`
- `position: sticky; top: 0; background: var(--paper); z-index: 100`
- フォント: `var(--font-mono)`, 0.65rem, letter-spacing: 0.15em, uppercase
- **アクティブタブ**: `border-bottom: 1.5px solid var(--ink)` でアンダーライン表示
- `useActiveSection(['about', 'contents', 'members'])` でアクティブタブを自動更新
- モバイル: Instagramアイコンは常時表示、タブはハンバーガーメニューに収納

---

### Hero

- 2カラムグリッド（左:テキスト / 右:ビジュアル）、`min-height: 85vh`
- 左カラム:
  - `Digital Wellbeing Media — Est. 2024`（モノスペース小文字タグ）
  - h1: "Living Fully in the *Digital Age*"（イタリックをaccent色に）
  - サブテキスト: `AI時代を生きる若者からのデジタルメディア。アルゴリズムに流されるのではなく、自分でデジタルを再デザインする。`
  - CTAボタン: `Follow on Instagram` → `https://www.instagram.com/fillingyourdigitalwellbeing/`
- 右カラム:
  - 背景グラデーション（`#d4cfbf → #9e9890`）
  - 透かし文字 "LFDA"（Playfair Display, 9rem, opacity 0.15）
  - 将来的に写真に差し替え可能な構造にしておく（コメントで案内）

---

### Pullquote

- 2カラム（左: 大きな `"` 装飾 / 右: 引用文）
- 引用: `アルゴリズムに流されるのではなく、自分でデジタルを再デザインする。`
- Playfair Display italic, 2rem
- cite: `— LFDA Mission Statement`

---

### Pillars

`pillars.js` からデータをimportして3カラムグリッド（border区切り）で表示する。

---

### Contents（統合セクション）

**セクションID**: `id="contents"`  
**目的**: note / Podcast / Instagram の3媒体をまとめて紹介し、各プラットフォームへの導線を提供する  
**実装**: `Contents.jsx` が `NoteArticles` / `PodcastLinks` / `InstagramBanner` を組み立てる役に徹する

```jsx
// Contents.jsx の構造イメージ
import NoteArticles from './NoteArticles'
import PodcastLinks from './PodcastLinks'
import InstagramBanner from './InstagramBanner'

export default function Contents() {
  return (
    <section id="contents">
      <h2>Contents</h2>
      <NoteArticles />
      <PodcastLinks />
      <InstagramBanner />
    </section>
  )
}
```

---

#### Contents > NoteArticles

`useNoteArticles()` フックでデータを取得し、カードグリッドで表示する。

**カードレイアウト（1件分）**:
```
[ サムネイル画像 (16:9, object-fit: cover) ]
  公開日（Space Mono, muted）
  タイトル（Playfair Display, 1.1rem）
  → noteで読む（リンク）
```

**グリッド**: `repeat(auto-fill, minmax(220px, 1fr))`、最大5件

**ローディング/エラー処理**:
- ローディング中: スケルトンUI（グレーのアニメーション）
- フェッチ失敗時: "noteで最新記事を読む →" ボタン1つにフォールバック（`https://note.com/genial_iris250`）

---

#### Contents > PodcastLinks

`podcasts.js` からデータをimportし、3カード横並びで表示する。

**見出し**: "帰り道の Tech Talk"（Playfair italic）  
各カード: プラットフォーム名 + 短い説明 + `→` リンク、`target="_blank" rel="noopener noreferrer"`

---

#### Contents > InstagramBanner

横長バナー型カード1枚。データはコンポーネント内に定数として持つ（外部フェッチなし）。

**表示要素**:
- Instagramアイコン（SVG、`#E1306C`）
- 見出し: `@fillingyourdigitalwellbeing`
- 説明文: 「日常の発信はInstagramでチェックしてください」
- CTAボタン: `Instagram をフォローする →`
  - リンク先: `https://www.instagram.com/fillingyourdigitalwellbeing/`
  - `target="_blank" rel="noopener noreferrer"`
  - スタイル: `background: #E1306C; color: white`

---

### Members

**セクションID**: `id="members"`  
**データ**: `members.js` からimport  
**SNSリンク**: 表示しない（メンバーカードに個人SNSアイコン・リンクは一切置かない）

**各メンバーカードの構成**（上から順）:

```
[ 顔写真 / アバター ]   ← 正方形、object-fit: cover
  役割タグ              ← Space Mono, 0.65rem, accent色
  名前                  ← Playfair Display, 1.3rem
  一言コメント          ← Noto Serif JP, 0.9rem, muted, 最大3行
```

**グリッド**: `repeat(auto-fill, minmax(260px, 1fr))`, gap: 0（border区切り）

**写真の扱い**:
- `public/members/` フォルダに `member-01.jpg` 〜 `member-06.jpg` を配置
- `photo: null` の場合はイニシャルアバター（名前の頭文字、背景 `var(--cream)`）を表示
- 画像サイズ推奨: 400×400px 以上の正方形

**セクション見出しエリア**:
```
左: "Members"（Playfair Display italic, 3rem）
右: "LFDAをともに作るメンバー" + 採用リンク「参加したい方はこちら →」
    リンク先: https://www.instagram.com/fillingyourdigitalwellbeing/ のDM
```

**レスポンシブ**:
- デスクトップ: 3カラム
- `@media (max-width: 900px)`: 2カラム
- `@media (max-width: 600px)`: 1カラム

---

### VMV

`vmv.js` からデータをimport。黒背景（`var(--ink)`）セクション。

- 左カラム: "Vision, Mission, Values"（Playfair italic, 3rem）
- 右カラム: Vision / Mission テキスト

---

### Values

`values.js` からデータをimport。5件を2カラムグリッド（最後の1枚はfull-width）で表示。

---

### Platforms

`platforms.js` からデータをimport。4カラムグリッド（hover時に背景色変化）で表示。

**Instagramカード**（`hasIcon: true`）にSVGグラデーションアイコンを追加（サイズ: 20×20px、カード内タイトル左横に配置）。

各カード: `target="_blank" rel="noopener noreferrer"`

---

### Footer

黒背景（`var(--ink)`）:
- 左: テキスト "LFDA — Living Fully in Digital Age"（Space Mono）
- 中: `lfda.digitalwellbeing@gmail.com`（リンク）+ Instagramテキストリンク「日常の発信はInstagramで →」
- 右: `© LFDA 2024`

※ ロゴは黒PNGのため、フッターでは**ロゴ画像を使わず**テキストのみ

---

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lfda-website/', // GitHubリポジトリ名に合わせて変更
})
```

---

## GitHub Actions 自動デプロイ（.github/workflows/deploy.yml）

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

concurrency:
  group: pages
  cancel-in-progress: true

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## レスポンシブ対応

ブレークポイント: `900px` / `600px`（全コンポーネント統一）

| セクション | デスクトップ | `≤900px` | `≤600px` |
|-----------|------------|----------|---------|
| Hero | 2カラム | 2カラム | 1カラム（ビジュアルが上） |
| Pillars | 3カラム | 2カラム | 1カラム |
| Contents > note | 5列グリッド | 3列グリッド | 2列グリッド |
| Contents > Podcast | 3カード横並び | 3カード横並び | 1カラム縦積み |
| Contents > Instagram | 横長バナー1枚 | 横長バナー1枚 | 縦長バナー1枚 |
| Members | 3カラム | 2カラム | 1カラム |
| VMV | 2カラム | 2カラム | 1カラム |
| Values | 2カラム | 2カラム | 1カラム |
| Platforms | 4カラム | 2カラム | 2カラム |

---

## ロゴファイルの配置

アップロードされた透過PNG（`logo.png`）を以下に配置:

```
lfda-website/
└── public/
    └── logo.png   ← ここに置く
```

Navでの使用:
```jsx
<img
  src={import.meta.env.BASE_URL + 'logo.png'}
  alt="LFDA"
  height="32"
  style={{ display: 'block' }}
/>
```

> `vite.config.js` の `base` を `/lfda-website/` に設定している場合、
> `public/` 内のファイルは自動的にベースパスが付与されるため、
> srcは `/logo.png` ではなく `import.meta.env.BASE_URL + 'logo.png'` を使うのが確実。

---

## 未解決・後回し事項

- [ ] note RSS の CORS が allorigins.win で解決しない場合 → GitHub Actionsで定期フェッチしてJSONキャッシュ（`public/note-cache.json`）に書き出す方式に切り替える（`noteRss.js` のみ差し替えで対応可）
- [ ] ロゴの白抜き版（フッター・SNSサムネイル用）
- [ ] OGP / Twitter Card メタタグの追加
- [ ] Google Analytics / アクセス解析の追加
- [ ] メンバー実データの差し替え（`src/data/members.js` を編集）
- [ ] メンバー写真の追加（`public/members/` に配置）

---

*以上が実装に必要な全要件。デザインプレビューは Claude.ai のチャット履歴を参照。*

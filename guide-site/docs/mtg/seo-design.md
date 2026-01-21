# SEO最強化 設計書

**作成者**: 🦉 山田リン (テックリード)
**作成日**: 2026-01-21
**ステータス**: 実装中

---

## 1. 概要

guide-siteのSEO最強化のための技術設計書。
Google検索でのランキング向上、SNSシェア時の見栄え改善、リッチリザルト表示を目指す。

---

## 2. 実装項目

### 2.1 メタデータ設定

#### 2.1.1 グローバルメタデータ（layout.tsx）
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://x-algorithm-guide.com'),
  title: {
    default: 'Xアルゴリズム攻略ガイド',
    template: '%s | Xアルゴリズム攻略ガイド',
  },
  description: 'X（旧Twitter）の推薦アルゴリズムを徹底解析...',
  keywords: ['Xアルゴリズム', 'Twitter', '推薦システム', ...],
  authors: [{ name: 'X Algorithm Guide Team' }],
  creator: 'X Algorithm Guide Team',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Xアルゴリズム攻略ガイド',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@x_algo_guide',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

#### 2.1.2 各ページのメタデータ

| ページ | title | description |
|--------|-------|-------------|
| / | Xアルゴリズム攻略ガイド | X（旧Twitter）の推薦アルゴリズムをオープンソースコードから徹底解析。全12章で仕組みを完全理解。 |
| /chapters/1 | 第1章 全体像と思想 | Xアルゴリズムの設計思想、3層アーキテクチャ、8段階パイプラインを解説。 |
| /chapters/2 | 第2章 エンゲージメント19種類 | いいね、リプライ、リポストなど19種類のエンゲージメントと重み付けを解説。 |
| /chapters/3 | 第3章 Two-Tower検索 | User TowerとContent Towerによる候補検索の仕組みを解説。 |
| /chapters/4 | 第4章 Phoenix MLモデル | 機械学習モデルPhoenixによるエンゲージメント予測を解説。 |
| /chapters/5 | 第5章 スコアリングシステム | 投稿スコアの計算方法と重み付けの詳細を解説。 |
| /chapters/6 | 第6章 12種類のフィルター | スパム、NSFW、ブロックなど12種類のフィルターを解説。 |
| /chapters/7 | 第7章 IN vs OON | In-Network（フォロー内）とOut-of-Network（フォロー外）の違いを解説。 |
| /chapters/8 | 第8章 著者多様性と投稿タイミング | 表示の多様性確保と最適な投稿時間を解説。 |
| /chapters/9 | 第9章 動画コンテンツとVQV | 動画のスコアリングとVideo Quality Viewの仕組みを解説。 |
| /chapters/10 | 第10章 投稿テンプレート5種類 | 高エンゲージメントを狙う5種類の投稿テンプレートを紹介。 |
| /chapters/11 | 第11章 アカウント設計 | アルゴリズムに最適化したプロフィール設計を解説。 |
| /chapters/12 | 第12章 データ分析と継続的改善 | アナリティクスを活用した継続的な改善方法を解説。 |
| /glossary | 用語集 | Xアルゴリズムに関する専門用語を解説。Phoenix、Two-Tower、エンゲージメントなど。 |
| /specs | 技術仕様 | Xアルゴリズムの技術仕様ドキュメント一覧。 |
| /complete | 学習完了 | 全12章の学習完了ページ。 |

---

### 2.2 構造化データ（JSON-LD）

#### 2.2.1 WebSite（トップページ）
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Xアルゴリズム攻略ガイド",
  "url": "https://x-algorithm-guide.com",
  "description": "X（旧Twitter）の推薦アルゴリズムを徹底解析",
  "inLanguage": "ja"
}
```

#### 2.2.2 Article（各章ページ）
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "第1章 Xアルゴリズムの全体像と思想",
  "description": "...",
  "author": {
    "@type": "Organization",
    "name": "X Algorithm Guide Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "X Algorithm Guide"
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-21"
}
```

#### 2.2.3 BreadcrumbList（パンくずリスト）
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "第1章", "item": "/chapters/1" }
  ]
}
```

---

### 2.3 サイトマップ

**ファイル**: `app/sitemap.ts`

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://x-algorithm-guide.com';

  const chapters = Array.from({ length: 12 }, (_, i) => ({
    url: `${baseUrl}/chapters/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    ...chapters,
    { url: `${baseUrl}/glossary`, priority: 0.7 },
    { url: `${baseUrl}/specs`, priority: 0.6 },
  ];
}
```

---

### 2.4 robots.txt

**ファイル**: `app/robots.ts`

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://x-algorithm-guide.com/sitemap.xml',
  };
}
```

---

### 2.5 パンくずリストコンポーネント

**ファイル**: `components/ui/Breadcrumb.tsx`

- ホーム > 第N章 の形式
- 構造化データ（JSON-LD）を自動出力
- モバイル対応

---

### 2.6 OG画像

**Phase 1**: 静的画像を使用（`/public/og-image.png`）
**Phase 2**: 動的OG画像生成（`app/api/og/route.tsx`）

---

## 3. ファイル構成

```
src/
├── app/
│   ├── layout.tsx          # グローバルメタデータ更新
│   ├── page.tsx            # トップページメタデータ
│   ├── sitemap.ts          # 新規作成
│   ├── robots.ts           # 新規作成
│   ├── chapters/
│   │   └── [id]/
│   │       └── page.tsx    # 各章メタデータ
│   ├── glossary/
│   │   └── page.tsx        # 用語集メタデータ
│   └── specs/
│       └── page.tsx        # 仕様ページメタデータ
├── components/
│   └── ui/
│       ├── Breadcrumb.tsx  # 新規作成
│       └── JsonLd.tsx      # 新規作成
└── lib/
    └── seo.ts              # 新規作成（SEOユーティリティ）
```

---

## 4. 実装順序

1. `lib/seo.ts` - SEOユーティリティ関数
2. `components/ui/JsonLd.tsx` - 構造化データコンポーネント
3. `components/ui/Breadcrumb.tsx` - パンくずリスト
4. `app/sitemap.ts` - サイトマップ
5. `app/robots.ts` - robots.txt
6. `app/layout.tsx` - グローバルメタデータ更新
7. 各ページのメタデータ設定

---

## 5. 検証項目

- [ ] Google Search Console での確認
- [ ] リッチリザルトテストツール
- [ ] OGP確認ツール（Twitter Card Validator等）
- [ ] Lighthouse SEOスコア
- [ ] モバイルフレンドリーテスト

---

**承認**: ✅ 佐藤マコト (SEOスペシャリスト)
**実装担当**: 🐱 田中ユイ (フロントエンドエンジニア)

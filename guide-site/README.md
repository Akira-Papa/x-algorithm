# X アルゴリズム ガイドサイト

Xの「おすすめ」フィードを動かすアルゴリズムを解説するWebサイトです。

## プロジェクト概要

このサイトでは、Xのレコメンドシステムがどのように投稿をランキングするかを、わかりやすく日本語で解説しています。

### 主なコンテンツ

- **エンゲージメント重み**: いいね、リプライ、リポストなど各アクションの重み付け
- **スコアリング仕組み**: Phoenix Scorer と Weighted Scorer による最終スコア計算
- **やったほうがいい・やってはいけない行動ランキング**: エンゲージメント重みに基づく行動指針
- **用語集**: アルゴリズム関連の専門用語解説

### データソース

掲載している重みデータは、2023年4月のTwitter公式オープンソースリリースに基づいています。

- [twitter/the-algorithm-ml](https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md)

> **注意**: 2026年現在のX（旧Twitter）は、xai-org/x-algorithm に移行しており、Grokベースの Phoenix Scorer を使用しています。会話の内容や意味がAIによって測定・評価されるようになっています。

## 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI**: [Material-UI (MUI)](https://mui.com/)
- **言語**: TypeScript
- **フォント**: Geist (next/font で最適化)

## 開発環境の起動

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとサイトが表示されます。

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router ページ
│   ├── chapters/          # チャプター別解説
│   ├── specs/             # 技術仕様
│   ├── rankings/          # 行動ランキング
│   └── glossary/          # 用語集
├── components/            # 共通コンポーネント
└── lib/                   # ユーティリティ・データ
```

## ビルド・デプロイ

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start
```

## ライセンス

このプロジェクトは MIT ライセンスで公開されています。

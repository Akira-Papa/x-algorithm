# X Algorithm 技術仕様書

X（旧Twitter）の「For You」フィード推薦アルゴリズムの技術仕様書です。

## 目次

| ドキュメント | 説明 |
|-------------|------|
| [00-overview.md](./00-overview.md) | プロジェクト概要・システム全体像 |
| [01-architecture.md](./01-architecture.md) | システムアーキテクチャ・8段階パイプライン |
| [02-phoenix-ml.md](./02-phoenix-ml.md) | Phoenix MLモデル（Grok Transformer） |
| [03-scoring.md](./03-scoring.md) | スコアリングシステム・重み計算 |
| [04-filtering.md](./04-filtering.md) | フィルタリングシステム |
| [05-thunder-pipeline.md](./05-thunder-pipeline.md) | Thunder & Candidate Pipeline |

## クイックリファレンス

### システム構成

```
┌─────────────────────────────────────────────────────────────┐
│                      HOME MIXER                              │
│                   (オーケストレーション)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │   THUNDER   │    │   PHOENIX   │    │  CANDIDATE  │     │
│   │ (インネット │    │    (ML)     │    │  PIPELINE   │     │
│   │   ワーク)   │    │             │    │             │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 主要コンポーネント

| コンポーネント | 役割 | 技術 |
|--------------|------|------|
| Home Mixer | オーケストレーション | Rust, gRPC |
| Thunder | インネットワーク投稿ストア | Rust, Kafka |
| Phoenix | ML検索・ランキング | Python, JAX |
| Candidate Pipeline | パイプラインフレームワーク | Rust |

### スコアリング概要

```
Final Score = Σ (weight_i × P(action_i))

ポジティブアクション: いいね, リプライ, リツイート, シェア...
ネガティブアクション: ブロック, ミュート, 報告... (負の重み)
```

### パイプライン8段階

1. **Query Hydration** - ユーザーコンテキスト取得
2. **Candidate Sources** - Thunder + Phoenix から候補取得
3. **Hydration** - メタデータ付与
4. **Pre-Scoring Filters** - 事前フィルタリング
5. **Scoring** - MLスコアリング
6. **Selection** - Top-K選択
7. **Post-Selection** - 最終フィルタリング
8. **Side Effects** - キャッシュ更新

---

*Last updated: 2026-01-21*

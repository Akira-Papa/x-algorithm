# 会議記録: テンプレート一覧ページ機能強化

**日時**: 2026-01-21
**議題**: テンプレート一覧ページの統合・ページネーション・検索/ソート機能追加
**参照**: docs/designs/templates-list-page-design.md

---

## 1. 会議目的

現在のテンプレート構造（14カテゴリ × 10テンプレート = 140件）を、より使いやすい統合一覧ページに改善する。

---

## 2. 現状分析

### 2.1 現在の構造

| ページ | 役割 | 課題 |
|--------|------|------|
| `/templates` | カテゴリ一覧（14カテゴリのカード） | テンプレート直接検索できない |
| `/templates/[category]` | カテゴリ別一覧（10件固定） | カテゴリ横断検索不可 |
| `/templates/[category]/[id]` | 詳細ページ | 問題なし |

### 2.2 サイドバーの現状

- 各カテゴリが `/templates/[category]` に直接リンク
- カテゴリ別ページに遷移してしまう
- 統合一覧でフィルタリングできない

---

## 3. 要件定義

### 3.1 機能要件

| 要件 | 詳細 | 優先度 |
|------|------|--------|
| 統合一覧表示 | 140件すべてを一つのページで管理 | 必須 |
| ページネーション | 20件ずつ表示、7ページ構成 | 必須 |
| 表示切替 | リスト表示 / カード表示 | 必須 |
| カテゴリフィルター | サイドバーからの遷移でフィルタ適用 | 必須 |
| 検索機能 | タイトル、説明、効果で全文検索 | 必須 |
| ソート機能 | 複数条件でソート可能 | 必須 |

### 3.2 ソート条件

1. **新着順** (デフォルト) - ID降順
2. **カテゴリ順** - カテゴリID順
3. **難易度順** - beginner → intermediate → advanced
4. **エンゲージメント期待度順** - 総合スコア順

### 3.3 フィルター条件

1. **カテゴリ** - 14カテゴリから複数選択可
2. **難易度** - 3段階から選択
3. **エンゲージメント種別** - いいね/リプライ/リポスト/ブックマーク

---

## 4. 決定事項

### 4.1 URL設計

```
/templates                          → 全テンプレート一覧（デフォルト）
/templates?category=engagement      → エンゲージメントでフィルタ
/templates?category=viral,thread    → 複数カテゴリフィルタ
/templates?search=質問              → 検索結果
/templates?sort=difficulty&order=asc → ソート指定
/templates?page=2                   → ページ指定
/templates?view=list                → リスト表示
/templates?view=card                → カード表示
```

### 4.2 サイドバー変更

**変更前:**
```
/templates/engagement → カテゴリ専用ページ
```

**変更後:**
```
/templates?category=engagement → 統合一覧でフィルタ
```

### 4.3 表示切替

| 表示モード | 特徴 | 1行の表示数 |
|-----------|------|-------------|
| カード表示 | 画像・詳細を含むリッチ表示 | 2-3列 |
| リスト表示 | コンパクトな行表示 | 1列 |

---

## 5. 技術設計

### 5.1 状態管理

- URL SearchParams でステート管理（SSR対応）
- useSearchParams + useRouter で状態更新
- クライアントサイドフィルタリング

### 5.2 コンポーネント構成

```
/templates/page.tsx
├── TemplatesHeader (タイトル、統計)
├── TemplatesFilters (検索、フィルター、ソート)
├── ViewToggle (リスト/カード切替)
├── TemplatesList (リスト表示)
│   └── TemplateListItem
├── TemplatesGrid (カード表示)
│   └── TemplateCard (既存)
└── Pagination
```

### 5.3 既存コンポーネント再利用

- `TemplateCard` - カード表示で使用
- `CategoryBadge` - カテゴリ表示
- `DifficultyBadge` - 難易度表示
- `EngagementIndicator` - エンゲージメント表示

---

## 6. 実装タスク

### フェーズ1: 設計ドキュメント
- ✅ 会議MD作成
- ⬜ 設計MD作成

### フェーズ2: コンポーネント実装
- ⬜ TemplateListItem コンポーネント作成
- ⬜ ViewToggle コンポーネント作成
- ⬜ Pagination コンポーネント作成
- ⬜ TemplatesFilters コンポーネント作成
- ⬜ SearchInput コンポーネント作成
- ⬜ SortSelect コンポーネント作成
- ⬜ CategoryFilter コンポーネント作成
- ⬜ DifficultyFilter コンポーネント作成

### フェーズ3: ページ実装
- ⬜ /templates/page.tsx 全面リニューアル
- ⬜ store.ts に高度なフィルタ/ソート関数追加

### フェーズ4: サイドバー更新
- ⬜ Sidebar.tsx のテンプレートリンク変更

### フェーズ5: テスト・検証
- ⬜ ビルド確認
- ⬜ 各フィルター/ソート動作確認

---

## 7. 備考

- 既存の `/templates/[category]` ページは残す（SEO維持）
- `/templates/[category]/[id]` 詳細ページは変更なし
- 静的生成との互換性を考慮（dynamic rendering必要）

---

**会議終了**: 2026-01-21
**次のアクション**: 設計MD作成 → コンポーネント実装

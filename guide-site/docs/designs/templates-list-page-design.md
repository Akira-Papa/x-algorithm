# 設計書: テンプレート一覧ページ機能強化

**作成日**: 2026-01-21
**バージョン**: 1.0
**参照**: docs/meetings/2026-01-21-templates-list-enhancement.md

---

## 1. 概要

テンプレート一覧ページを、検索・フィルター・ソート・ページネーション機能を備えた統合一覧ページにリニューアルする。

---

## 2. URL設計

### 2.1 クエリパラメータ仕様

| パラメータ | 型 | デフォルト | 例 |
|-----------|-----|-----------|-----|
| `category` | string (カンマ区切り) | null (全て) | `engagement,viral` |
| `difficulty` | string | null (全て) | `beginner` |
| `search` | string | '' | `質問` |
| `sort` | enum | `default` | `difficulty`, `category` |
| `order` | enum | `asc` | `asc`, `desc` |
| `page` | number | 1 | `2` |
| `view` | enum | `card` | `list`, `card` |

### 2.2 URL例

```
# 基本
/templates

# カテゴリフィルタ（サイドバーから遷移）
/templates?category=engagement

# 複合フィルタ
/templates?category=engagement,viral&difficulty=beginner&search=投稿&sort=difficulty&page=2&view=list
```

---

## 3. コンポーネント設計

### 3.1 ファイル構成

```
src/
├── app/templates/
│   └── page.tsx                    # メインページ（リニューアル）
├── components/templates/
│   ├── TemplateCard.tsx            # 既存（変更なし）
│   ├── TemplateListItem.tsx        # 新規：リスト表示用行
│   ├── TemplatesFilters.tsx        # 新規：フィルターコンテナ
│   ├── TemplatesSearchInput.tsx    # 新規：検索入力
│   ├── TemplatesSortSelect.tsx     # 新規：ソート選択
│   ├── TemplatesCategoryFilter.tsx # 新規：カテゴリフィルター
│   ├── TemplatesDifficultyFilter.tsx # 新規：難易度フィルター
│   ├── TemplatesViewToggle.tsx     # 新規：表示切替
│   └── TemplatesPagination.tsx     # 新規：ページネーション
└── lib/templates/
    └── store.ts                    # 更新：フィルタ/ソート関数追加
```

### 3.2 コンポーネント詳細

#### TemplateListItem

```typescript
interface TemplateListItemProps {
  template: Template;
}

// 表示内容
- カテゴリバッジ（色付き）
- タイトル（リンク）
- 説明（1行、truncate）
- 難易度（星表示）
- エンゲージメント（アイコン）
- 詳細ボタン
```

#### TemplatesFilters

```typescript
interface TemplatesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: CategoryId[];
  onCategoriesChange: (categories: CategoryId[]) => void;
  selectedDifficulty: Difficulty | null;
  onDifficultyChange: (difficulty: Difficulty | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}
```

#### TemplatesViewToggle

```typescript
interface TemplatesViewToggleProps {
  view: 'list' | 'card';
  onChange: (view: 'list' | 'card') => void;
}
```

#### TemplatesPagination

```typescript
interface TemplatesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}
```

---

## 4. 状態管理設計

### 4.1 URL同期ステート

```typescript
// page.tsx で管理
const searchParams = useSearchParams();
const router = useRouter();

// 状態読み取り
const category = searchParams.get('category')?.split(',') || [];
const difficulty = searchParams.get('difficulty') as Difficulty | null;
const search = searchParams.get('search') || '';
const sort = (searchParams.get('sort') || 'default') as SortOption;
const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
const page = parseInt(searchParams.get('page') || '1', 10);
const view = (searchParams.get('view') || 'card') as 'list' | 'card';

// 状態更新
const updateParams = (updates: Record<string, string | null>) => {
  const params = new URLSearchParams(searchParams);
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null) params.delete(key);
    else params.set(key, value);
  });
  router.push(`/templates?${params.toString()}`);
};
```

### 4.2 派生状態

```typescript
// フィルタリング
const filteredTemplates = useMemo(() => {
  let result = getAllTemplates();

  // カテゴリフィルタ
  if (category.length > 0) {
    result = result.filter(t => category.includes(t.category));
  }

  // 難易度フィルタ
  if (difficulty) {
    result = result.filter(t => t.difficulty === difficulty);
  }

  // 検索フィルタ
  if (search) {
    const query = search.toLowerCase();
    result = result.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.effects.some(e => e.toLowerCase().includes(query))
    );
  }

  return result;
}, [category, difficulty, search]);

// ソート
const sortedTemplates = useMemo(() => {
  const sorted = [...filteredTemplates];

  switch (sort) {
    case 'category':
      sorted.sort((a, b) => a.category.localeCompare(b.category));
      break;
    case 'difficulty':
      const diffOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
      break;
    case 'engagement':
      // エンゲージメントスコア計算
      const engScore = (t: Template) => {
        const levels = { low: 1, medium: 2, high: 3 };
        return Object.values(t.expectedEngagement)
          .reduce((sum, l) => sum + levels[l], 0);
      };
      sorted.sort((a, b) => engScore(b) - engScore(a));
      break;
  }

  if (order === 'desc') sorted.reverse();
  return sorted;
}, [filteredTemplates, sort, order]);

// ページネーション
const ITEMS_PER_PAGE = 20;
const totalPages = Math.ceil(sortedTemplates.length / ITEMS_PER_PAGE);
const paginatedTemplates = sortedTemplates.slice(
  (page - 1) * ITEMS_PER_PAGE,
  page * ITEMS_PER_PAGE
);
```

---

## 5. UI設計

### 5.1 レイアウト構成

```
┌─────────────────────────────────────────────────────────────┐
│ ヘッダー                                                      │
│ テンプレート一覧 | 140件 | 14カテゴリ                           │
├─────────────────────────────────────────────────────────────┤
│ フィルターバー                                                 │
│ [🔍 検索...                    ] [ソート ▼] [↑↓] [📋][🗂️]    │
├─────────────────────────────────────────────────────────────┤
│ カテゴリフィルター                                             │
│ [すべて] [エンゲージ] [バイラル] [スレッド] [...] [+3]          │
├─────────────────────────────────────────────────────────────┤
│ 難易度フィルター                                               │
│ [すべて] [初級 ⭐] [中級 ⭐⭐] [上級 ⭐⭐⭐]                    │
├─────────────────────────────────────────────────────────────┤
│ 結果表示                                                      │
│ 「エンゲージメント」カテゴリの10件を表示中 (1/1ページ)            │
├─────────────────────────────────────────────────────────────┤
│ コンテンツエリア                                               │
│                                                             │
│ 【カード表示の場合】                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                         │
│ │  Card   │ │  Card   │ │  Card   │                         │
│ └─────────┘ └─────────┘ └─────────┘                         │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                         │
│ │  Card   │ │  Card   │ │  Card   │                         │
│ └─────────┘ └─────────┘ └─────────┘                         │
│                                                             │
│ 【リスト表示の場合】                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [カテゴリ] タイトル           説明...        [⭐⭐] [詳細]│ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [カテゴリ] タイトル           説明...        [⭐⭐] [詳細]│ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [カテゴリ] タイトル           説明...        [⭐⭐] [詳細]│ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ページネーション                                               │
│ [← 前] [1] [2] [3] ... [7] [次 →]  20件/ページ               │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 レスポンシブ対応

| ブレークポイント | カード列数 | フィルター表示 |
|-----------------|-----------|--------------|
| sm (< 640px) | 1列 | 折りたたみ |
| md (640-1024px) | 2列 | 横並び |
| lg (> 1024px) | 3列 | 横並び |

---

## 6. サイドバー変更

### 6.1 変更箇所

**ファイル**: `src/components/ui/Sidebar.tsx`

```typescript
// 変更前
{ href: "/templates/engagement", label: "エンゲージ", icon: HeartIcon },
{ href: "/templates/viral", label: "バイラル", icon: FireIcon },
// ...

// 変更後
{ href: "/templates?category=engagement", label: "エンゲージ", icon: HeartIcon },
{ href: "/templates?category=viral", label: "バイラル", icon: FireIcon },
// ...
```

### 6.2 アクティブ状態検知

```typescript
// 変更前
pathname.startsWith(item.href)

// 変更後
pathname === "/templates" && searchParams?.get("category") === item.category
// または
item.href.includes(`category=${extractCategoryFromHref(item.href)}`)
```

---

## 7. 型定義追加

### 7.1 新規型

```typescript
// src/lib/templates/types.ts に追加

export type SortOption = 'default' | 'category' | 'difficulty' | 'engagement';

export interface TemplateFilters {
  categories: CategoryId[];
  difficulty: Difficulty | null;
  search: string;
}

export interface TemplateSorting {
  sortBy: SortOption;
  order: 'asc' | 'desc';
}

export interface TemplatePagination {
  page: number;
  itemsPerPage: number;
}

export type ViewMode = 'list' | 'card';
```

---

## 8. store.ts 拡張

### 8.1 追加関数

```typescript
// 高度なフィルタリング
export function filterTemplates(
  templates: Template[],
  filters: TemplateFilters
): Template[] {
  let result = templates;

  if (filters.categories.length > 0) {
    result = result.filter(t => filters.categories.includes(t.category));
  }

  if (filters.difficulty) {
    result = result.filter(t => t.difficulty === filters.difficulty);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.effects.some(e => e.toLowerCase().includes(query))
    );
  }

  return result;
}

// ソート
export function sortTemplates(
  templates: Template[],
  sorting: TemplateSorting
): Template[] {
  const sorted = [...templates];

  switch (sorting.sortBy) {
    case 'category':
      sorted.sort((a, b) => a.category.localeCompare(b.category));
      break;
    case 'difficulty':
      const diffOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
      break;
    case 'engagement':
      sorted.sort((a, b) => getEngagementScore(b) - getEngagementScore(a));
      break;
  }

  if (sorting.order === 'desc') sorted.reverse();
  return sorted;
}

// エンゲージメントスコア計算
export function getEngagementScore(template: Template): number {
  const levels = { low: 1, medium: 2, high: 3 };
  return Object.values(template.expectedEngagement)
    .reduce((sum, level) => sum + levels[level], 0);
}

// ページネーション
export function paginateTemplates(
  templates: Template[],
  pagination: TemplatePagination
): Template[] {
  const { page, itemsPerPage } = pagination;
  const start = (page - 1) * itemsPerPage;
  return templates.slice(start, start + itemsPerPage);
}
```

---

## 9. 実装順序

### Phase 1: 型・ユーティリティ
1. types.ts に新規型追加
2. store.ts にフィルタ/ソート関数追加

### Phase 2: コンポーネント（並列実装可能）
1. TemplateListItem.tsx
2. TemplatesSearchInput.tsx
3. TemplatesSortSelect.tsx
4. TemplatesCategoryFilter.tsx
5. TemplatesDifficultyFilter.tsx
6. TemplatesViewToggle.tsx
7. TemplatesPagination.tsx
8. TemplatesFilters.tsx（統合コンテナ）

### Phase 3: ページ実装
1. /templates/page.tsx リニューアル

### Phase 4: サイドバー更新
1. Sidebar.tsx テンプレートリンク変更

### Phase 5: 検証
1. ビルド確認
2. 動作確認

---

## 10. 考慮事項

### 10.1 SEO

- `use client` が必要なため、メタデータは静的に定義
- 既存の `/templates/[category]` ページは残す（インデックス維持）

### 10.2 パフォーマンス

- 140件はクライアントサイドフィルタで問題なし
- useMemo で再計算を最適化
- ページネーションで DOM 負荷軽減

### 10.3 アクセシビリティ

- フォーカス管理（ページ切替時）
- aria-label 適切に設定
- キーボードナビゲーション対応

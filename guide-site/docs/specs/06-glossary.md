# 用語集ページ仕様

## 概要

Xアルゴリズムに関連する専門用語を解説するページ。

## ページ構成

```
┌─────────────────────────────────────────────┐
│ [サイドバー]                                │
├─────────────────────────────────────────────┤
│                                             │
│ 📖 用語集                                   │
│ Xアルゴリズムの専門用語を解説します          │
│                                             │
│ [検索バー]                                  │
│ ┌─────────────────────────────────────────┐ │
│ │ 🔍 用語を検索...                        │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [カテゴリフィルター]                        │
│ ○ すべて ● ML ○ スコアリング ○ フィルター  │
│                                             │
│ [用語一覧]                                  │
│ ┌─────────────────────────────────────────┐ │
│ │ Two-Tower                    [ML]       │ │
│ │ 検索システムの基盤となる機械学習...      │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Phoenix                      [ML]       │ │
│ │ ユーザーの長期的な興味関心を...          │ │
│ └─────────────────────────────────────────┘ │
│ ...                                         │
│                                             │
└─────────────────────────────────────────────┘
```

## データ構造

```typescript
interface GlossaryTerm {
  id: string;           // URL用のスラッグ
  term: string;         // 用語名
  reading?: string;     // 読み方（カタカナ）
  category: string;     // カテゴリ
  shortDescription: string;  // 短い説明（1文）
  description: string;  // 詳細説明
  relatedTerms?: string[];  // 関連用語のID
  relatedChapters?: number[];  // 関連する章番号
}

// カテゴリ定義
const categories = [
  { id: 'ml', label: '機械学習', color: 'blue' },
  { id: 'scoring', label: 'スコアリング', color: 'green' },
  { id: 'filtering', label: 'フィルター', color: 'orange' },
  { id: 'engagement', label: 'エンゲージメント', color: 'purple' },
  { id: 'system', label: 'システム', color: 'gray' },
];
```

## 用語データ例

```typescript
const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'two-tower',
    term: 'Two-Tower',
    reading: 'ツータワー',
    category: 'ml',
    shortDescription: 'コンテンツとユーザーを別々のニューラルネットワークで処理する検索アーキテクチャ',
    description: `
Two-Towerは、Xの推薦システムの根幹をなす機械学習アーキテクチャです。

**仕組み**
- ユーザータワー：ユーザーの属性や行動履歴をベクトル化
- コンテンツタワー：ツイートの内容や特徴をベクトル化
- 両者のベクトルの類似度でマッチングスコアを算出

**特徴**
- 大規模データに対応可能
- リアルタイム推論が高速
- 候補生成フェーズで使用
    `,
    relatedTerms: ['phoenix', 'embedding', 'candidate-generation'],
    relatedChapters: [3, 4],
  },
  {
    id: 'phoenix',
    term: 'Phoenix',
    reading: 'フェニックス',
    category: 'ml',
    shortDescription: 'ユーザーの長期的な興味関心を予測するMLモデル',
    description: `
Phoenixは、Xの推薦システムで使用される機械学習モデルの1つです。

**目的**
ユーザーが将来どのようなコンテンツに興味を持つかを予測します。

**特徴**
- 長期的な興味関心をモデリング
- ユーザーの行動パターンから学習
- 19種類のエンゲージメント予測に使用
    `,
    relatedTerms: ['two-tower', 'engagement'],
    relatedChapters: [4],
  },
  // ... 他の用語
];
```

## UI コンポーネント

### 検索バー

```tsx
<div className="relative">
  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
  <input
    type="text"
    placeholder="用語を検索..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
  />
</div>
```

### カテゴリフィルター

```tsx
<div className="flex flex-wrap gap-2">
  <button
    onClick={() => setSelectedCategory(null)}
    className={cn(
      'px-3 py-1 rounded-full text-sm transition-colors',
      selectedCategory === null
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted text-muted-foreground hover:bg-muted/80'
    )}
  >
    すべて
  </button>
  {categories.map((cat) => (
    <button
      key={cat.id}
      onClick={() => setSelectedCategory(cat.id)}
      className={cn(
        'px-3 py-1 rounded-full text-sm transition-colors',
        selectedCategory === cat.id
          ? `bg-${cat.color}-500 text-white`
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      )}
    >
      {cat.label}
    </button>
  ))}
</div>
```

### 用語カード

```tsx
<div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
  <div className="flex items-start justify-between">
    <div>
      <h3 className="font-bold text-lg">{term.term}</h3>
      {term.reading && (
        <span className="text-sm text-muted-foreground">（{term.reading}）</span>
      )}
    </div>
    <span className={`px-2 py-1 rounded text-xs bg-${categoryColor}-100 text-${categoryColor}-700`}>
      {categoryLabel}
    </span>
  </div>
  <p className="mt-2 text-muted-foreground">{term.shortDescription}</p>
  {term.relatedChapters && (
    <div className="mt-3 flex gap-2">
      {term.relatedChapters.map((ch) => (
        <Link
          key={ch}
          href={`/chapters/${ch}`}
          className="text-xs text-primary hover:underline"
        >
          第{ch}章
        </Link>
      ))}
    </div>
  )}
</div>
```

## 検索・フィルタリング

### 検索ロジック

```typescript
const filteredTerms = glossaryTerms.filter((term) => {
  // カテゴリフィルター
  if (selectedCategory && term.category !== selectedCategory) {
    return false;
  }

  // テキスト検索
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    return (
      term.term.toLowerCase().includes(query) ||
      term.reading?.toLowerCase().includes(query) ||
      term.shortDescription.toLowerCase().includes(query)
    );
  }

  return true;
});
```

### ソート

デフォルトは用語名のアルファベット順（日本語読みでソート）。

```typescript
const sortedTerms = filteredTerms.sort((a, b) => {
  const readingA = a.reading || a.term;
  const readingB = b.reading || b.term;
  return readingA.localeCompare(readingB, 'ja');
});
```

## アクセシビリティ

- 検索入力にはラベルを関連付け
- カテゴリボタンはラジオボタングループとして実装
- 検索結果の件数をスクリーンリーダーに通知

```tsx
<div aria-live="polite" className="sr-only">
  {filteredTerms.length}件の用語が見つかりました
</div>
```

## レスポンシブ対応

| ブレークポイント | レイアウト |
|----------------|-----------|
| モバイル (<768px) | 1カラム、フィルター折りたたみ |
| タブレット (768px-1024px) | 2カラムグリッド |
| デスクトップ (>1024px) | 3カラムグリッド |

# 共通コンポーネント仕様

## コンポーネント一覧

| コンポーネント | ファイル | 用途 |
|---------------|---------|------|
| Sidebar | `Sidebar.tsx` | サイドバーナビゲーション |
| ChapterNav | `ChapterNav.tsx` | 章間移動ナビゲーション |
| Quiz | `Quiz.tsx` | 理解度チェッククイズ |
| FAQ | `FAQ.tsx` | よくある質問（アコーディオン） |
| CodeBlock | `CodeBlock.tsx` | コードブロック表示 |
| ThemeToggle | `ThemeToggle.tsx` | ダーク/ライトモード切替 |

## Sidebar コンポーネント

### 構成

```
┌─────────────────────────┐
│ [アイコン] Xアルゴリズム   │
│           攻略ガイド      │
├─────────────────────────┤
│ 🏠 ホーム                │
├─────────────────────────┤
│ ─── 目次 ───            │
│ [01] 全体像と思想        │
│ [02] エンゲージメント...  │
│ ...                     │
│ [12] データ分析...       │
├─────────────────────────┤
│ ─── 用語・仕様 ───       │
│ 📖 用語集               │
│ 📋 仕様概要             │
│ 🏗️ アーキテクチャ        │
│ ...                     │
├─────────────────────────┤
│ ✅ 学習完了              │
├─────────────────────────┤
│ 全12章 | オープンソース解析 │
└─────────────────────────┘
```

### Props

```typescript
interface SidebarProps {
  currentPath: string;
  isOpen?: boolean;
  onClose?: () => void;
}
```

### スタイル

| 状態 | スタイル |
|------|---------|
| 通常 | `text-muted-foreground hover:text-foreground hover:bg-muted` |
| アクティブ | `bg-primary/10 text-primary font-medium` |
| セクション区切り | `text-xs uppercase tracking-wide text-muted-foreground` |

## ChapterNav コンポーネント

### 概要

章間を移動するためのナビゲーションコンポーネント。各章ページの上部と下部に配置。

### 構成

```
┌────────────────────────────────────────────────┐
│ ← 前の章: 第N-1章タイトル    次の章: 第N+1章タイトル → │
└────────────────────────────────────────────────┘
```

### Props

```typescript
interface ChapterNavProps {
  currentChapter: number;
  totalChapters: number;
}
```

### 動作仕様

| 条件 | 表示 |
|------|------|
| 第1章 | 「前の章」非表示、「次の章」のみ表示 |
| 中間章 | 両方表示 |
| 最終章 | 「前の章」のみ表示、「次の章」非表示 |

### スタイル

```tsx
<div className="flex items-center justify-between py-6 border-t border-border">
  {/* 前の章 */}
  <Link
    href={`/chapters/${prevChapter}`}
    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
  >
    <ArrowLeftIcon className="w-5 h-5" />
    <span>前の章</span>
  </Link>

  {/* 次の章 */}
  <Link
    href={`/chapters/${nextChapter}`}
    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
  >
    <span>次の章</span>
    <ArrowRightIcon className="w-5 h-5" />
  </Link>
</div>
```

## Quiz コンポーネント

→ [04-quiz.md](./04-quiz.md) を参照

## FAQ コンポーネント

### 概要

アコーディオン形式のFAQセクション。

### Props

```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;  // デフォルト: "よくある質問"
}
```

### 動作仕様

1. 質問をクリックで回答を展開/折りたたみ
2. 複数の質問を同時に展開可能
3. 初期状態は全て閉じた状態

### スタイル

```tsx
<div className="border border-border rounded-lg divide-y divide-border">
  {items.map((item, index) => (
    <div key={index} className="p-4">
      <button
        onClick={() => toggle(index)}
        className="w-full flex items-center justify-between text-left font-medium"
      >
        <span>{item.question}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-3 text-muted-foreground">
          {item.answer}
        </div>
      )}
    </div>
  ))}
</div>
```

## CodeBlock コンポーネント

### 概要

コードスニペットを表示するコンポーネント。

### Props

```typescript
interface CodeBlockProps {
  children: string;
  title?: string;
  language?: string;
}
```

### スタイル

```tsx
<div className="my-6 border border-border rounded overflow-hidden">
  {title && (
    <div className="bg-muted px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
      {title}
    </div>
  )}
  <pre
    className="p-4 overflow-x-auto"
    style={{ background: '#1e293b', color: '#e2e8f0' }}
  >
    <code className="text-sm whitespace-pre font-mono">{children}</code>
  </pre>
</div>
```

## ThemeToggle コンポーネント

### 概要

ダークモード/ライトモードを切り替えるボタン。

### Props

```typescript
interface ThemeToggleProps {
  className?: string;
}
```

### 動作仕様

1. クリックでテーマを切り替え
2. システム設定を初期値として使用
3. 選択状態は `localStorage` に保存

### スタイル

```tsx
<button
  onClick={toggleTheme}
  className="p-2 rounded-lg hover:bg-muted transition-colors"
  aria-label="テーマを切り替え"
>
  {isDark ? (
    <SunIcon className="w-5 h-5" />
  ) : (
    <MoonIcon className="w-5 h-5" />
  )}
</button>
```

## アイコン使用規則

すべてのアイコンは `@heroicons/react/24/outline` から使用する。

### 使用アイコン一覧

| 用途 | アイコン |
|------|---------|
| ホーム | `HomeIcon` |
| 章ナビ（前） | `ArrowLeftIcon` |
| 章ナビ（次） | `ArrowRightIcon` |
| FAQ展開 | `ChevronDownIcon` |
| 正解 | `CheckCircleIcon` |
| 不正解 | `XCircleIcon` |
| 解説 | `LightBulbIcon` |
| ダークモード | `MoonIcon` |
| ライトモード | `SunIcon` |
| メニュー | `Bars3Icon` |
| 閉じる | `XMarkIcon` |

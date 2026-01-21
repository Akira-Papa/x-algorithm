# ナビゲーション仕様

## 概要

サイト内のナビゲーション要素の仕様。

## 章移動ナビゲーション

### 配置

- **上部**: 章タイトル下、本文開始前
- **下部**: クイズセクション後、フッター前

### レイアウト

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ← 前の章: 第1章 全体像と思想      次の章: 第3章 Two-Tower検索 →  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 表示条件

| 現在の章 | 前の章ボタン | 次の章ボタン |
|---------|-------------|-------------|
| 第1章 | 非表示 | 表示 |
| 第2章〜第11章 | 表示 | 表示 |
| 第12章 | 表示 | 非表示（または学習完了へ） |

### インタラクション

| 状態 | スタイル |
|------|---------|
| 通常 | `text-muted-foreground` |
| ホバー | `text-foreground` |
| フォーカス | `ring-2 ring-primary` |

### コード例

```tsx
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ChapterNavProps {
  currentChapter: number;
  totalChapters?: number;
}

const chapters = [
  { id: 1, title: '全体像と思想' },
  { id: 2, title: 'エンゲージメント19種類' },
  // ...
  { id: 12, title: 'データ分析と継続的改善' },
];

export function ChapterNav({ currentChapter, totalChapters = 12 }: ChapterNavProps) {
  const prevChapter = currentChapter > 1 ? chapters[currentChapter - 2] : null;
  const nextChapter = currentChapter < totalChapters ? chapters[currentChapter] : null;

  return (
    <nav className="flex items-center justify-between py-6 border-t border-border">
      {prevChapter ? (
        <Link
          href={`/chapters/${prevChapter.id}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <div className="text-sm">
            <div className="text-xs text-muted-foreground">前の章</div>
            <div>第{prevChapter.id}章 {prevChapter.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextChapter ? (
        <Link
          href={`/chapters/${nextChapter.id}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-right"
        >
          <div className="text-sm">
            <div className="text-xs text-muted-foreground">次の章</div>
            <div>第{nextChapter.id}章 {nextChapter.title}</div>
          </div>
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <Link
          href="/complete"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group text-right"
        >
          <div className="text-sm">
            <div className="text-xs">おめでとうございます！</div>
            <div>学習完了ページへ</div>
          </div>
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </nav>
  );
}
```

## サイドバーナビゲーション

### セクション構成

```
1. ロゴ・サイト名
2. ホームリンク
3. 目次セクション（章一覧）
4. 用語・仕様セクション
5. 学習完了リンク
6. フッター情報
```

### セクション区切り

```tsx
<div className="px-4 py-2">
  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
    ─── 目次 ───
  </span>
</div>
```

### アクティブ状態

現在のページに対応するリンクは視覚的に強調する。

```tsx
const isActive = pathname === href;

<Link
  href={href}
  className={cn(
    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
    isActive
      ? 'bg-primary/10 text-primary font-medium'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
  )}
>
  {children}
</Link>
```

## パンくずナビゲーション

### 表示位置

章ページの上部、タイトル直前。

### 構成

```
📖 Xアルゴリズム攻略ガイド > 第N章
```

### スタイル

```tsx
<nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
  <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
    <BookOpenIcon className="w-4 h-4" />
    Xアルゴリズム攻略ガイド
  </Link>
  <span>/</span>
  <span className="text-foreground">第{chapter}章</span>
</nav>
```

## モバイルナビゲーション

### ハンバーガーメニュー

- 768px未満で表示
- クリックでサイドバーをスライドイン
- オーバーレイ背景でクリックして閉じる

### 実装

```tsx
// ハンバーガーボタン
<button
  onClick={() => setIsOpen(true)}
  className="lg:hidden p-2 rounded-lg hover:bg-muted"
  aria-label="メニューを開く"
>
  <Bars3Icon className="w-6 h-6" />
</button>

// モバイルサイドバー
<div className={cn(
  'fixed inset-0 z-50 lg:hidden',
  isOpen ? 'block' : 'hidden'
)}>
  {/* オーバーレイ */}
  <div
    className="absolute inset-0 bg-black/50"
    onClick={() => setIsOpen(false)}
  />

  {/* サイドバー */}
  <div className="absolute left-0 top-0 h-full w-72 bg-background shadow-xl">
    <Sidebar onClose={() => setIsOpen(false)} />
  </div>
</div>
```

## キーボードナビゲーション

### サポートするキー

| キー | 動作 |
|------|------|
| `Tab` | フォーカス移動 |
| `Enter` / `Space` | リンクをクリック |
| `Escape` | モバイルメニューを閉じる |
| `←` / `→` | 前/次の章へ移動（章ページ内） |

### フォーカス管理

- フォーカス可能な要素に `tabindex` を適切に設定
- フォーカス状態を視覚的に明示（`focus-visible:ring-2`）
- モーダル・オーバーレイ表示時はフォーカストラップを適用

## アクセシビリティ

### ARIA属性

```tsx
// ナビゲーションランドマーク
<nav aria-label="章ナビゲーション">
  ...
</nav>

// 現在のページ
<a aria-current="page">第3章</a>

// 展開状態
<button aria-expanded={isOpen}>
  メニュー
</button>
```

### スクリーンリーダー対応

- ナビゲーション要素には適切な `aria-label` を付与
- 動的に変化するコンテンツには `aria-live` を使用
- アイコンのみのボタンには `aria-label` を付与

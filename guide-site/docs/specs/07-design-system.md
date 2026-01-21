# デザインシステム

## 概要

Xアルゴリズム攻略ガイドのデザインシステム仕様。

## カラーシステム

### セマンティックカラー

```css
/* ライトモード */
--background: #ffffff;
--foreground: #0f172a;
--card: #ffffff;
--card-foreground: #0f172a;
--primary: #3b82f6;
--primary-foreground: #ffffff;
--secondary: #f1f5f9;
--secondary-foreground: #0f172a;
--muted: #f1f5f9;
--muted-foreground: #64748b;
--accent: #f1f5f9;
--accent-foreground: #0f172a;
--destructive: #ef4444;
--destructive-foreground: #ffffff;
--border: #e2e8f0;
--ring: #3b82f6;

/* ダークモード */
--background: #0f172a;
--foreground: #f8fafc;
--card: #1e293b;
--card-foreground: #f8fafc;
--primary: #60a5fa;
--primary-foreground: #0f172a;
--secondary: #1e293b;
--secondary-foreground: #f8fafc;
--muted: #1e293b;
--muted-foreground: #94a3b8;
--accent: #1e293b;
--accent-foreground: #f8fafc;
--destructive: #f87171;
--destructive-foreground: #0f172a;
--border: #334155;
--ring: #60a5fa;
```

### 機能カラー

| 用途 | ライト | ダーク |
|------|--------|--------|
| 正解 | `#22c55e` (green-500) | `#4ade80` (green-400) |
| 不正解 | `#ef4444` (red-500) | `#f87171` (red-400) |
| 警告 | `#f59e0b` (amber-500) | `#fbbf24` (amber-400) |
| 情報 | `#3b82f6` (blue-500) | `#60a5fa` (blue-400) |
| 解説 | `#3b82f6` (blue-500) | `#60a5fa` (blue-400) |

## タイポグラフィ

### フォントファミリー

```css
font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### フォントサイズ

| 名前 | サイズ | 行間 | 用途 |
|------|--------|------|------|
| xs | 12px | 16px | キャプション、バッジ |
| sm | 14px | 20px | 補足テキスト |
| base | 16px | 24px | 本文 |
| lg | 18px | 28px | サブ見出し |
| xl | 20px | 28px | セクション見出し |
| 2xl | 24px | 32px | 章タイトル |
| 3xl | 30px | 36px | ページタイトル |

### フォントウェイト

| 名前 | 値 | 用途 |
|------|-----|------|
| normal | 400 | 本文 |
| medium | 500 | 強調テキスト |
| semibold | 600 | サブ見出し |
| bold | 700 | 見出し |

## スペーシング

### 基本単位

4px ベースのスペーシングシステム。

| 名前 | 値 | 用途 |
|------|-----|------|
| 0 | 0px | - |
| 1 | 4px | 最小間隔 |
| 2 | 8px | アイコン間隔 |
| 3 | 12px | 要素内パディング |
| 4 | 16px | カード内パディング |
| 5 | 20px | セクション間 |
| 6 | 24px | コンポーネント間 |
| 8 | 32px | セクション間（大） |
| 10 | 40px | ページセクション間 |
| 12 | 48px | 大きなセクション間 |

### レイアウトスペーシング

```css
/* コンテナ */
.container {
  max-width: 1280px;
  padding-left: 16px;
  padding-right: 16px;
}

/* セクション */
.section {
  padding-top: 48px;
  padding-bottom: 48px;
}

/* カード */
.card {
  padding: 24px;
}
```

## ボーダー

### ボーダー半径

| 名前 | 値 | 用途 |
|------|-----|------|
| none | 0px | - |
| sm | 4px | 小さなボタン |
| md | 8px | カード、入力 |
| lg | 12px | 大きなカード |
| xl | 16px | モーダル |
| full | 9999px | ピル型ボタン |

### ボーダースタイル

```css
border: 1px solid var(--border);
```

## シャドウ

```css
/* 小 */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* 中 */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* 大 */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* XL */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## コンポーネントスタイル

### ボタン

```css
/* プライマリ */
.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 150ms;
}

.btn-primary:hover {
  background-color: var(--primary) / 0.9;
}

/* セカンダリ */
.btn-secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
}

/* ゴースト */
.btn-ghost {
  background-color: transparent;
  color: var(--foreground);
  padding: 8px 16px;
  border-radius: 8px;
}

.btn-ghost:hover {
  background-color: var(--muted);
}
```

### カード

```css
.card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}
```

### 入力フィールド

```css
.input {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 16px;
}

.input:focus {
  outline: none;
  ring: 2px;
  ring-color: var(--ring);
}
```

## 特殊ボックス

### ポイントボックス

```tsx
<div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
  <div className="flex items-start gap-2">
    <LightBulbIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
    <div>
      <span className="font-bold text-yellow-800 dark:text-yellow-300">ポイント</span>
      <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
        {content}
      </p>
    </div>
  </div>
</div>
```

### 情報ボックス

```tsx
<div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
  <div className="flex items-start gap-2">
    <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
    <div>
      <span className="font-bold text-blue-800 dark:text-blue-300">情報</span>
      <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
        {content}
      </p>
    </div>
  </div>
</div>
```

### 警告ボックス

```tsx
<div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
  <div className="flex items-start gap-2">
    <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
    <div>
      <span className="font-bold text-red-800 dark:text-red-300">注意</span>
      <p className="mt-1 text-sm text-red-700 dark:text-red-300">
        {content}
      </p>
    </div>
  </div>
</div>
```

## アニメーション

### トランジション

```css
/* 基本 */
transition-property: color, background-color, border-color;
transition-duration: 150ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* 変形 */
transition-property: transform;
transition-duration: 200ms;

/* すべて */
transition-property: all;
transition-duration: 300ms;
```

### ホバーアニメーション

```css
/* スケール */
.hover-scale:hover {
  transform: scale(1.02);
}

/* シフト */
.hover-shift:hover {
  transform: translateX(4px);
}

/* 回転（展開アイコン） */
.rotate-expanded {
  transform: rotate(180deg);
}
```

## レスポンシブブレークポイント

| 名前 | 値 | 説明 |
|------|-----|------|
| sm | 640px | 大きめのモバイル |
| md | 768px | タブレット |
| lg | 1024px | 小さいデスクトップ |
| xl | 1280px | デスクトップ |
| 2xl | 1536px | 大きいデスクトップ |

## ダークモード

### 実装方法

```tsx
// ThemeProvider
<html className={theme === 'dark' ? 'dark' : ''}>
  <body>...</body>
</html>
```

### 切り替え

```typescript
const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

### 初期値

```typescript
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};
```

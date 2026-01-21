# 設計書: ランキングページ

## 概要

Xアルゴリズムの「やったほうがいい」「やってはいけない」行動を一目で把握できるランキングページ。

---

## ファイル構成

```
src/
├── app/
│   └── rankings/
│       └── page.tsx          # ランキングページ本体
├── lib/
│   └── rankings.ts           # ランキングデータ定義
└── components/
    └── ui/
        └── Sidebar.tsx       # リンク追加
```

---

## データ構造

### RankingItem 型定義

```typescript
interface RankingItem {
  rank: number;
  title: string;
  description: string;
  impact: string;           // スコア影響度 (例: "+13.5倍", "-5倍")
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
  relatedChapters: number[];
  tips?: string;            // 追加のアドバイス
}

interface RankingData {
  dos: RankingItem[];       // やったほうがいい
  donts: RankingItem[];     // やってはいけない
}
```

---

## UI設計

### レイアウト

```
┌─────────────────────────────────────────────────┐
│  🏆 Xアルゴリズム ランキング                      │
│  アルゴリズムに好まれる行動・避けるべき行動       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────┐  ┌─────────────────┐      │
│  │ ✅ やったほうが  │  │ ❌ やってはいけ  │      │
│  │    いい TOP10   │  │    ない TOP10   │      │
│  │                 │  │                 │      │
│  │ 1. リプライ獲得 │  │ 1. 外部リンク   │      │
│  │    +13.5倍     │  │    -5倍        │      │
│  │ ─────────────  │  │ ─────────────  │      │
│  │ 2. 画像・動画  │  │ 2. ハッシュタグ │      │
│  │    +2倍       │  │    乱用        │      │
│  │ ...           │  │ ...           │      │
│  └─────────────────┘  └─────────────────┘      │
│                                                 │
│  📚 関連ガイド章へのリンク                       │
└─────────────────────────────────────────────────┘
```

### カラースキーム

- **DO（やったほうがいい）**:
  - 背景: `bg-success/10` (緑系)
  - ボーダー: `border-success-border`
  - アイコン: ✅ または上向き矢印

- **DON'T（やってはいけない）**:
  - 背景: `bg-destructive/10` (赤系)
  - ボーダー: `border-destructive-border`
  - アイコン: ❌ または警告マーク

### インパクトレベル表示

| Level | 表示 | 色 |
|-------|------|-----|
| critical | ⚡ 最重要 | 赤/緑（濃い） |
| high | 🔥 重要 | オレンジ |
| medium | 📌 普通 | 黄色 |
| low | 💡 軽微 | グレー |

---

## コンポーネント設計

### RankingCard

```tsx
interface RankingCardProps {
  item: RankingItem;
  type: 'do' | 'dont';
}
```

- ランク番号（大きく表示）
- タイトル
- 説明文
- インパクト表示（バッジ）
- 関連章リンク

### RankingSection

```tsx
interface RankingSectionProps {
  title: string;
  items: RankingItem[];
  type: 'do' | 'dont';
}
```

---

## サイドバー変更

### 追加位置

ホームリンクの直後、ガイドセクションの前に配置。

```tsx
{/* ホームリンク */}
<Link href="/">ホーム</Link>

{/* ★ 新規追加 */}
<Link href="/rankings">ランキング</Link>

{/* ガイドセクション */}
<div>ガイド...</div>
```

### アイコン

`TrophyIcon` または `ChartBarSquareIcon` を使用。

---

## レスポンシブ対応

- **デスクトップ**: 2カラム（DO / DON'T 横並び）
- **タブレット**: 2カラム（幅狭め）
- **モバイル**: 1カラム（縦積み）

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <RankingSection type="do" />
  <RankingSection type="dont" />
</div>
```

---

## SEO/メタデータ

```tsx
export const metadata: Metadata = {
  title: 'ランキング | Xアルゴリズム攻略ガイド',
  description: 'Xアルゴリズムでやったほうがいいこと・やってはいけないことをランキング形式で解説。スコアへの影響度も一目でわかります。',
};
```

---

## 実装順序

1. `src/lib/rankings.ts` - データ定義
2. `src/app/rankings/page.tsx` - ページ実装
3. `src/components/ui/Sidebar.tsx` - リンク追加
4. ビルド確認

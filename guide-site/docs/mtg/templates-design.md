# 戦略的投稿テンプレート集 設計書

**作成者**: 🦉 山田リン (テックリード)
**作成日**: 2026-01-21
**ステータス**: 実装中

---

## 1. 概要

Xアルゴリズムに最適化された140個の投稿テンプレート集。
14カテゴリ × 10テンプレートの構成で、各テンプレートには例文・解説・ポイント・注意点・参考リンクを付与。

---

## 2. ページ構成

```
/templates                        # テンプレート一覧（全140件）
/templates/[category]             # カテゴリ別一覧（14カテゴリ）
/templates/[category]/[id]        # テンプレート詳細（140ページ）
```

---

## 3. データ構造

### 3.1 型定義（lib/templates/types.ts）

```typescript
export type CategoryId =
  | 'engagement'
  | 'viral'
  | 'thread'
  | 'question'
  | 'value'
  | 'story'
  | 'news'
  | 'opinion'
  | 'visual'
  | 'video'
  | 'cta'
  | 'community'
  | 'timing'
  | 'personal';

export type EngagementLevel = 'low' | 'medium' | 'high';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface EngagementExpectation {
  likes: EngagementLevel;
  replies: EngagementLevel;
  reposts: EngagementLevel;
  bookmarks: EngagementLevel;
}

export interface Template {
  id: string;                      // "engagement-01"
  category: CategoryId;
  title: string;
  description: string;
  effects: string[];               // 狙える効果
  example: string;                 // 例文
  explanation: string;             // 解説
  points: string[];                // ポイント（3-5個）
  cautions: string[];              // 注意点（2-3個）
  relatedChapters: number[];       // 関連章
  relatedTemplates: string[];      // 関連テンプレートID
  difficulty: Difficulty;
  expectedEngagement: EngagementExpectation;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;                    // Heroiconの名前
  color: string;                   // Tailwindカラークラス
  targetEngagement: string[];
}
```

### 3.2 カテゴリ定義（lib/templates/categories.ts）

```typescript
export const categories: Category[] = [
  {
    id: 'engagement',
    name: 'エンゲージメント獲得',
    description: 'いいねやリプライを増やす基本テンプレート',
    icon: 'HeartIcon',
    color: 'rose',
    targetEngagement: ['いいね', 'リプライ'],
  },
  {
    id: 'viral',
    name: 'バイラル拡散',
    description: 'リポストや引用RTで拡散を狙うテンプレート',
    icon: 'ArrowPathRoundedSquareIcon',
    color: 'purple',
    targetEngagement: ['リポスト', '引用RT'],
  },
  {
    id: 'thread',
    name: 'スレッド・長文',
    description: '滞在時間と保存を増やすスレッド形式',
    icon: 'QueueListIcon',
    color: 'blue',
    targetEngagement: ['滞在時間', '保存'],
  },
  {
    id: 'question',
    name: '質問・対話',
    description: 'リプライと会話を生むテンプレート',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'green',
    targetEngagement: ['リプライ', '会話'],
  },
  {
    id: 'value',
    name: '価値提供・教育',
    description: '保存とフォローを増やす有益コンテンツ',
    icon: 'AcademicCapIcon',
    color: 'amber',
    targetEngagement: ['保存', 'フォロー'],
  },
  {
    id: 'story',
    name: 'ストーリー・体験',
    description: '共感といいねを獲得する体験談',
    icon: 'BookOpenIcon',
    color: 'orange',
    targetEngagement: ['共感', 'いいね'],
  },
  {
    id: 'news',
    name: 'ニュース・速報',
    description: 'リポストとクリックを狙う速報形式',
    icon: 'NewspaperIcon',
    color: 'red',
    targetEngagement: ['リポスト', 'クリック'],
  },
  {
    id: 'opinion',
    name: '意見・主張',
    description: '引用RTと議論を生む意見表明',
    icon: 'MegaphoneIcon',
    color: 'indigo',
    targetEngagement: ['引用RT', '議論'],
  },
  {
    id: 'visual',
    name: 'ビジュアル・画像',
    description: 'いいねと保存を増やす画像活用',
    icon: 'PhotoIcon',
    color: 'pink',
    targetEngagement: ['いいね', '保存'],
  },
  {
    id: 'video',
    name: '動画・VQV',
    description: '視聴時間といいねを増やす動画形式',
    icon: 'VideoCameraIcon',
    color: 'cyan',
    targetEngagement: ['視聴時間', 'いいね'],
  },
  {
    id: 'cta',
    name: 'CTA・誘導',
    description: 'クリックとコンバージョンを狙う誘導',
    icon: 'CursorArrowRaysIcon',
    color: 'emerald',
    targetEngagement: ['クリック', 'コンバージョン'],
  },
  {
    id: 'community',
    name: 'コミュニティ・交流',
    description: 'フォローとメンションを増やす交流',
    icon: 'UserGroupIcon',
    color: 'violet',
    targetEngagement: ['フォロー', 'メンション'],
  },
  {
    id: 'timing',
    name: 'タイミング・トレンド',
    description: 'インプレッションを最大化する投稿時間',
    icon: 'ClockIcon',
    color: 'sky',
    targetEngagement: ['インプレッション'],
  },
  {
    id: 'personal',
    name: 'パーソナル・自己開示',
    description: '信頼とフォローを獲得する自己開示',
    icon: 'UserCircleIcon',
    color: 'teal',
    targetEngagement: ['信頼', 'フォロー'],
  },
];
```

---

## 4. コンポーネント設計

### 4.1 テンプレート一覧ページ（/templates）

**レイアウト:**
- ヒーローセクション（タイトル、説明、統計）
- カテゴリフィルター（14カテゴリのタブ/ボタン）
- 難易度フィルター（初級/中級/上級）
- テンプレートグリッド（カード形式）
- ページネーション or 無限スクロール

**コンポーネント:**
- `TemplateHero` - ヒーローセクション
- `CategoryFilter` - カテゴリフィルター
- `DifficultyFilter` - 難易度フィルター
- `TemplateGrid` - テンプレートグリッド
- `TemplateCard` - テンプレートカード

### 4.2 カテゴリ別ページ（/templates/[category]）

**レイアウト:**
- カテゴリヘッダー（アイコン、名前、説明）
- カテゴリ内テンプレート一覧（10件）
- 他カテゴリへのリンク

### 4.3 テンプレート詳細ページ（/templates/[category]/[id]）

**セクション構成:**
1. **ヘッダー**: タイトル、カテゴリバッジ、難易度
2. **効果**: 狙えるアルゴリズム効果
3. **例文**: コピー可能な例文ボックス
4. **解説**: 詳細な解説文
5. **ポイント**: 成功のポイント（リスト）
6. **注意点**: 気をつけること（警告スタイル）
7. **期待値**: エンゲージメント期待値（グラフ）
8. **参考ガイド**: 関連章へのリンク
9. **関連テンプレート**: 関連テンプレートカード
10. **ナビゲーション**: 前後テンプレートへのリンク

---

## 5. ファイル構成

```
src/
├── app/
│   └── templates/
│       ├── page.tsx                    # テンプレート一覧
│       ├── layout.tsx                  # レイアウト（メタデータ）
│       └── [category]/
│           ├── page.tsx                # カテゴリ別一覧
│           └── [id]/
│               └── page.tsx            # テンプレート詳細
├── components/
│   └── templates/
│       ├── TemplateHero.tsx
│       ├── CategoryFilter.tsx
│       ├── DifficultyFilter.tsx
│       ├── TemplateGrid.tsx
│       ├── TemplateCard.tsx
│       ├── TemplateDetail.tsx
│       ├── ExampleBox.tsx              # コピー可能な例文
│       ├── EngagementChart.tsx         # 期待値チャート
│       └── RelatedTemplates.tsx
└── lib/
    └── templates/
        ├── types.ts                    # 型定義
        ├── categories.ts               # カテゴリ定義
        ├── index.ts                    # エクスポート
        └── data/
            ├── engagement.ts           # 01-10
            ├── viral.ts                # 11-20
            ├── thread.ts               # 21-30
            ├── question.ts             # 31-40
            ├── value.ts                # 41-50
            ├── story.ts                # 51-60
            ├── news.ts                 # 61-70
            ├── opinion.ts              # 71-80
            ├── visual.ts               # 81-90
            ├── video.ts                # 91-100
            ├── cta.ts                  # 101-110
            ├── community.ts            # 111-120
            ├── timing.ts               # 121-130
            └── personal.ts             # 131-140
```

---

## 6. 実装順序（10サブエージェント）

| Agent | 担当 | ファイル |
|-------|------|----------|
| 1 | 型定義・カテゴリ定義 | types.ts, categories.ts, index.ts |
| 2 | テンプレート一覧ページ | /templates/page.tsx, layout.tsx |
| 3 | コンポーネント（Hero, Filter, Grid, Card） | components/templates/*.tsx |
| 4 | コンポーネント（Detail, ExampleBox, Chart） | components/templates/*.tsx |
| 5 | データ（engagement, viral, thread） | data/engagement.ts, viral.ts, thread.ts |
| 6 | データ（question, value, story, news） | data/question.ts, value.ts, story.ts, news.ts |
| 7 | データ（opinion, visual, video） | data/opinion.ts, visual.ts, video.ts |
| 8 | データ（cta, community, timing, personal） | data/cta.ts, community.ts, timing.ts, personal.ts |
| 9 | カテゴリ別ページ | /templates/[category]/page.tsx |
| 10 | 詳細ページ + サイドバー更新 | /templates/[category]/[id]/page.tsx, Sidebar.tsx |

---

## 7. SEO対策

### メタデータ

**一覧ページ:**
```typescript
export const metadata: Metadata = {
  title: '戦略的投稿テンプレート集 | 140個の実践例',
  description: 'Xアルゴリズムに最適化された140個の投稿テンプレート。カテゴリ別に例文・解説・ポイント・注意点付きで紹介。',
};
```

**カテゴリページ:**
```typescript
export function generateMetadata({ params }): Metadata {
  const category = getCategory(params.category);
  return {
    title: `${category.name}テンプレート | 10個の実践例`,
    description: `${category.description}。${category.targetEngagement.join('・')}を狙う10個のテンプレート。`,
  };
}
```

**詳細ページ:**
```typescript
export function generateMetadata({ params }): Metadata {
  const template = getTemplate(params.category, params.id);
  return {
    title: `${template.title} | 投稿テンプレート`,
    description: template.description,
  };
}
```

### 構造化データ

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "共感を呼ぶ自己体験シェア",
  "description": "...",
  "step": [...]
}
```

---

## 8. 検証項目

- [ ] 全140テンプレートの表示確認
- [ ] カテゴリフィルターの動作
- [ ] 難易度フィルターの動作
- [ ] コピー機能の動作
- [ ] レスポンシブ対応
- [ ] ダークモード対応
- [ ] SEOメタデータ確認
- [ ] パフォーマンス（LCP, CLS）

---

**承認**: ✅ 鈴木ケンタ (コンテンツマーケター)
**実装担当**: 🐱 田中ユイ (フロントエンドエンジニア)

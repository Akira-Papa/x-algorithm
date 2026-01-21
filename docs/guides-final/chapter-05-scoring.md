# 第5章：スコアリングシステム完全攻略

## 5.1 なぜ複数のスコアラーがあるのか

第4章で解説したPhoenixは、19種類のエンゲージメント確率を予測します。しかし、それだけでは最終的なランキングは決まりません。

Xの推薦システムには、Phoenix以外にも複数の**スコアラー（Scorer）**が存在します。これらが組み合わさって、最終的な表示順位が決定されます。

```
【複数スコアラーが必要な理由】

Phoenix単独の限界:
├── ML予測は「エンゲージメント確率」のみ
├── ビジネスルール（多様性、鮮度等）は考慮しない
├── ユーザー体験の全体最適化ができない
└── 短期的なエンゲージメント最適に偏りがち

複数スコアラーによる補完:
├── OON Scorer: フォロー関係を考慮
├── Author Diversity: 著者の偏りを防ぐ
├── VQV Scorer: 動画品質を評価
└── その他: 鮮度、トピック多様性など
```

重要なのは、これらのスコアは**掛け算**で合成されることです。足し算ではありません。

```
【スコア合成の仕組み】

足し算の場合（実際とは異なる）:
最終スコア = Phoenix + OON + Diversity + VQV
→ 一つが低くても、他で補える

掛け算の場合（実際の仕組み）:
最終スコア = Phoenix × OON × Diversity × VQV
→ 一つでも低いと、全体が大きく下がる
```

これは非常に重要な理解です。**一つでも弱い要素があると、全体のスコアが大きく下がる**のです。

---

## 5.2 Phoenix Scorer：ML予測スコア

まず、Phoenixによる基礎スコアの計算を詳しく見ましょう。

### 計算式

```rust
// phoenix_scorer.rs より

fn calculate_phoenix_score(predictions: &EngagementPredictions) -> f32 {
    let mut score = 0.0;

    // 19種類の予測確率に重みを掛けて合計
    score += predictions.favorited * 0.5;
    score += predictions.retweeted * 1.0;
    score += predictions.replied * 13.5;
    score += predictions.quoted * 1.1;
    score += predictions.profile_clicked * 12.0;
    score += predictions.followed * 4.0;
    score += predictions.video_quality_view * 1.5;
    // ... 残り12種類も同様

    // ネガティブエンゲージメントは減算
    score += predictions.reported * (-10.0);
    score += predictions.blocked * (-10.0);
    score += predictions.muted * (-5.0);
    score += predictions.not_interested * (-1.5);

    return score;
}
```

### 計算例

```
【Phoenix Scoreの計算例】

投稿Aに対するユーザーXの予測:
- いいね確率: 40% (0.4)
- リポスト確率: 10% (0.1)
- リプライ確率: 5% (0.05)
- プロフィールクリック確率: 3% (0.03)
- フォロー確率: 1% (0.01)
- 通報確率: 0.1% (0.001)

計算:
0.4 × 0.5   = 0.20  (いいね)
0.1 × 1.0   = 0.10  (リポスト)
0.05 × 13.5 = 0.675 (リプライ) ← これが最大
0.03 × 12.0 = 0.36  (プロフクリック)
0.01 × 4.0  = 0.04  (フォロー)
0.001 × -10 = -0.01 (通報)

Phoenix Score = 0.20 + 0.10 + 0.675 + 0.36 + 0.04 - 0.01
             = 1.365
```

リプライ確率がわずか5%でも、重みが13.5なので最大の貢献をしていることに注目してください。

---

## 5.3 OON Scorer：フォロー外ペナルティ

OON（Out of Network）Scorerは、投稿主とユーザーの関係性に基づくスコア調整を行います。

### 仕組み

```rust
// oon_scorer.rs より

fn calculate_oon_score(
    user_id: &str,
    author_id: &str,
    follow_graph: &FollowGraph,
) -> f32 {
    if follow_graph.is_following(user_id, author_id) {
        // フォロー中（IN: In-Network）
        return 1.0;  // ペナルティなし
    } else {
        // フォロー外（OON: Out-of-Network）
        return 0.85; // 15%ペナルティ
    }
}
```

### 影響の計算

```
【OON Scorerの影響】

Phoenix Score: 1.365 の場合

フォロワーからの閲覧（IN）:
最終スコア = 1.365 × 1.0 = 1.365

非フォロワーからの閲覧（OON）:
最終スコア = 1.365 × 0.85 = 1.16

差分: 1.365 - 1.16 = 0.205（約15%減）
```

### 戦略的含意

```
【OON Scorerの戦略的含意】

1. フォロワーへのリーチが最優先
   → 同じ投稿でも、フォロワーに届きやすい
   → まずINでの反応を獲得することが重要

2. OON拡散は「ハードル上げ」
   → 非フォロワーに届くには、より高いスコアが必要
   → INで強い反応を得た投稿がOONに拡散

3. フォロワー数が「基盤」
   → フォロワーが多いほど、IN到達の母数が増える
   → OON拡散の起点が増える
```

---

## 5.4 Author Diversity Scorer：著者多様性

同じ著者の投稿がタイムラインに連続して表示されることを防ぐスコアラーです。

### 仕組み

```rust
// author_diversity_scorer.rs より

fn calculate_diversity_score(
    author_id: &str,
    timeline: &[Tweet],
) -> f32 {
    // タイムライン上に同じ著者の投稿がいくつあるか
    let same_author_count = timeline
        .iter()
        .filter(|t| t.author_id == author_id)
        .count();

    // 0.95の累乗で減衰
    let decay_factor = 0.95_f32.powf(same_author_count as f32);

    return decay_factor;
}
```

### 減衰計算

```
【Author Diversity減衰率】

同一著者の表示数 → 減衰係数
──────────────────────────
0個目（初回）  → 1.0    （ペナルティなし）
1個目         → 0.95   （5%減）
2個目         → 0.9025 （約10%減）
3個目         → 0.857  （約14%減）
4個目         → 0.815  （約19%減）
5個目         → 0.774  （約23%減）
10個目        → 0.599  （約40%減）
```

### 影響の計算

```
【Author Diversityの影響】

Phoenix Score: 1.365
OON Score: 1.0（フォロワー）

同一著者の2つ目の投稿:
最終スコア = 1.365 × 1.0 × 0.95 = 1.297（5%減）

同一著者の5つ目の投稿:
最終スコア = 1.365 × 1.0 × 0.774 = 1.057（23%減）
```

### 戦略的含意

```
【Author Diversityの戦略的含意】

1. 連投は避ける
   → 短時間に複数投稿すると、後の投稿ほど不利
   → 各投稿が独立して評価される時間を空ける

2. 投稿間隔の目安
   → 最低4時間以上空ける
   → フォロワーのタイムラインが入れ替わる時間

3. 1日の投稿数上限
   → 3投稿程度が目安
   → それ以上は累積ペナルティが大きくなる
```

---

## 5.5 VQV Scorer：動画品質評価

動画コンテンツに対する品質ボーナスを与えるスコアラーです。

### VQVの定義

VQV（Video Quality View）とは、以下の条件を満たす動画視聴のことです：

```rust
// VQV判定基準

fn is_quality_view(view: &VideoView, video: &Video) -> bool {
    // 条件1: 最低視聴時間を満たす
    let min_duration = min(10_000, video.duration_ms / 2);
    let duration_ok = view.watch_time_ms >= min_duration;

    // 条件2: 音声がオン
    let audio_ok = view.audio_enabled;

    // 条件3: スクロールで通過していない
    let not_scrolled = view.not_scrolled_past;

    return duration_ok && audio_ok && not_scrolled;
}
```

### VQVボーナス

```
【VQV Scorerの計算】

VQV条件を満たす場合:
VQV Score = 1.5（50%ボーナス）

VQV条件を満たさない場合:
VQV Score = 1.0（ボーナスなし）

※ 動画でない投稿: VQV Score = 1.0
```

### 影響の計算

```
【VQVボーナスの影響】

動画投稿のPhoenix Score: 1.365

VQV条件を満たす場合:
最終スコア = 1.365 × 1.5 = 2.048（50%増）

VQV条件を満たさない場合:
最終スコア = 1.365 × 1.0 = 1.365（変化なし）
```

---

## 5.6 最終スコアの合成

すべてのスコアラーがどのように合成されるかを見ましょう。

### 合成式

```
【最終スコア計算式】

Final Score = Phoenix Score
            × OON Score
            × Author Diversity Score
            × VQV Score
            × (その他のスコアラー...)
```

### 総合計算例

```
【総合計算例】

状況:
- 動画投稿
- フォロワーからの閲覧
- タイムラインに同一著者の投稿が2つ既にある
- VQV条件を満たす視聴

計算:
Phoenix Score:     1.365
OON Score:         1.0   （フォロワー）
Diversity Score:   0.9025（3つ目なので0.95²）
VQV Score:         1.5   （VQV条件クリア）

Final Score = 1.365 × 1.0 × 0.9025 × 1.5
            = 1.848
```

### 各要素の影響度

```
【各スコアラーの影響度】

上記の例で、各要素が0になった場合の影響:

OONが0.85（非フォロワー）になった場合:
1.848 × (0.85/1.0) = 1.571（15%減）

Diversityが0.774（5つ目）になった場合:
1.848 × (0.774/0.9025) = 1.585（14%減）

VQVが1.0（条件未達）になった場合:
1.848 × (1.0/1.5) = 1.232（33%減）

→ VQVの影響が最も大きい（動画の場合）
```

---

## 5.7 スコアリング攻略チェックリスト

すべてのスコアラーを考慮した攻略チェックリストです。

```
【スコアリング攻略チェックリスト】

Phoenix Score最大化
□ リプライを誘発する内容にする（重み13.5）
□ プロフィールへの興味を喚起する（重み12.0）
□ フォローのメリットを示す（重み4.0）
□ 攻撃的な内容を避ける（通報-10.0を防ぐ）

OON Score最大化
□ フォロワーからの反応を最優先
□ INで強い反応を得てからOON拡散を狙う
□ フォロワー基盤を着実に拡大

Author Diversity対策
□ 連投を避ける（最低4時間間隔）
□ 1日3投稿を目安にする
□ 質の高い投稿を厳選

VQV Score最大化（動画の場合）
□ 冒頭3秒でフックを入れる
□ 10秒以上視聴してもらう工夫
□ 音声ありで楽しめるコンテンツ
□ スクロールで飛ばされない魅力
```

---

## 5.8 この章のまとめ

```
【第5章 重要ポイント】

✓ 最終スコアは複数スコアラーの掛け算
  → 一つでも弱いと全体が大きく下がる

✓ Phoenix Score: ML予測の重み付き合計
  → リプライ(13.5)とプロフクリック(12.0)が最重要

✓ OON Score: フォロー外は15%ペナルティ
  → フォロワーへのリーチが最優先

✓ Author Diversity: 連投で最大40%減
  → 投稿間隔を空ける（最低4時間）

✓ VQV Score: 動画品質視聴で50%ボーナス
  → 10秒ルールをクリアする
```

```
【今日からできること】

□ 投稿前に「リプライを誘発できるか？」を確認
□ 投稿間隔を4時間以上空ける
□ 動画は冒頭3秒と10秒を意識して制作
□ フォロワーからの反応を最優先に考える
```

---

**次章予告**: 第6章では、スコアリング以前に候補から除外されてしまう「フィルター」について解説します。どんなにスコアが高くても、フィルターに引っかかれば表示されません。

---

[← 第4章に戻る](./chapter-04-phoenix.md) | [目次](./README.md) | [第6章へ進む →](./chapter-06-filters.md)

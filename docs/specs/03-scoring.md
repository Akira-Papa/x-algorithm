# スコアリングシステム仕様書

## 1. 概要

Xアルゴリズムのスコアリングシステムは、投稿候補に対してユーザーエンゲージメントを予測し、最終的なランキングスコアを算出する。本システムは複数のScorerコンポーネントで構成され、パイプライン形式で順次処理を行う。

### 1.1 アーキテクチャ

```
投稿候補 → PhoenixScorer → WeightedScorer → AuthorDiversityScorer → OONScorer → 最終スコア
```

### 1.2 Scorerトレイト

すべてのScorerは共通のトレイトを実装する：

```rust
pub trait Scorer<Q, C>: Send + Sync {
    /// 実行可否の判定
    fn enable(&self, _query: &Q) -> bool { true }

    /// 候補のスコアリング（非同期）
    async fn score(&self, query: &Q, candidates: &[C]) -> Result<Vec<C>, String>;

    /// 単一候補の更新
    fn update(&self, candidate: &mut C, scored: C);

    /// 全候補の一括更新
    fn update_all(&self, candidates: &mut [C], scored: Vec<C>);
}
```

**重要**: `score`メソッドは入力と同じ順序・同じ数の候補を返す必要がある。候補の削除はScorerではなくFilterステージで行う。

---

## 2. Phoenix Scorer

### 2.1 概要

Phoenix ScorerはPhoenixモデルを用いて、各投稿に対するユーザーアクションの発生確率を予測する。

### 2.2 入力

- `user_id`: ユーザーID
- `user_action_sequence`: ユーザーの過去のアクション履歴
- `tweet_infos`: 投稿情報（ツイートID、著者ID）

リツイートの場合、元ツイートのIDと著者IDを使用する：
```rust
let tweet_id = c.retweeted_tweet_id.unwrap_or(c.tweet_id as u64);
let author_id = c.retweeted_user_id.unwrap_or(c.author_id);
```

### 2.3 予測アクション一覧

Phoenixモデルは以下のアクションの発生確率を予測する：

#### ポジティブアクション（離散）

| アクション名 | 内部名 | 説明 |
|------------|--------|------|
| いいね | `ServerTweetFav` | ツイートにいいねを付ける |
| リプライ | `ServerTweetReply` | ツイートに返信する |
| リツイート | `ServerTweetRetweet` | ツイートをリツイートする |
| 引用 | `ServerTweetQuote` | 引用ツイートを作成する |
| 画像展開 | `ClientTweetPhotoExpand` | 画像を展開して表示する |
| クリック | `ClientTweetClick` | ツイート詳細を開く |
| プロフィールクリック | `ClientTweetClickProfile` | 著者プロフィールを閲覧する |
| ビデオ品質視聴 | `ClientTweetVideoQualityView` | 動画を一定時間視聴する |
| シェア | `ClientTweetShare` | ツイートをシェアする |
| DMでシェア | `ClientTweetClickSendViaDirectMessage` | DMでツイートを共有する |
| リンクコピー | `ClientTweetShareViaCopyLink` | ツイートリンクをコピーする |
| 滞在 | `ClientTweetRecapDwelled` | ツイート上で滞在する |
| 引用クリック | `ClientQuotedTweetClick` | 引用元ツイートをクリックする |
| フォロー | `ClientTweetFollowAuthor` | 著者をフォローする |

#### ネガティブアクション（離散）

| アクション名 | 内部名 | 説明 |
|------------|--------|------|
| 興味なし | `ClientTweetNotInterestedIn` | 「興味がない」を選択する |
| ブロック | `ClientTweetBlockAuthor` | 著者をブロックする |
| ミュート | `ClientTweetMuteAuthor` | 著者をミュートする |
| 報告 | `ClientTweetReport` | ツイートを報告する |

#### 連続アクション

| アクション名 | 内部名 | 説明 |
|------------|--------|------|
| 滞在時間 | `DwellTime` | ツイート上での滞在時間（秒） |

### 2.4 ログ確率からの変換

Phoenixモデルはアクションのログ確率を出力する。これを確率に変換する：

```rust
let action_probs: HashMap<usize, f64> = distribution
    .top_log_probs
    .iter()
    .enumerate()
    .map(|(idx, log_prob)| (idx, (*log_prob as f64).exp()))
    .collect();
```

数学的表現：
```
P(action) = exp(log_prob)
```

### 2.5 出力: PhoenixScores

```rust
pub struct PhoenixScores {
    pub favorite_score: Option<f64>,        // いいね確率
    pub reply_score: Option<f64>,           // リプライ確率
    pub retweet_score: Option<f64>,         // リツイート確率
    pub photo_expand_score: Option<f64>,    // 画像展開確率
    pub click_score: Option<f64>,           // クリック確率
    pub profile_click_score: Option<f64>,   // プロフィールクリック確率
    pub vqv_score: Option<f64>,             // ビデオ品質視聴確率
    pub share_score: Option<f64>,           // シェア確率
    pub share_via_dm_score: Option<f64>,    // DMシェア確率
    pub share_via_copy_link_score: Option<f64>, // リンクコピー確率
    pub dwell_score: Option<f64>,           // 滞在確率
    pub quote_score: Option<f64>,           // 引用確率
    pub quoted_click_score: Option<f64>,    // 引用クリック確率
    pub follow_author_score: Option<f64>,   // フォロー確率
    pub not_interested_score: Option<f64>,  // 興味なし確率
    pub block_author_score: Option<f64>,    // ブロック確率
    pub mute_author_score: Option<f64>,     // ミュート確率
    pub report_score: Option<f64>,          // 報告確率
    pub dwell_time: Option<f64>,            // 予測滞在時間
}
```

---

## 3. Weighted Scorer

### 3.1 概要

Weighted Scorerは、Phoenix Scorerが出力した各アクション確率に重みを掛け合わせ、最終的な重み付きスコアを算出する。

### 3.2 重み計算式

```
Final Score = Σ (weight_i × P(action_i))
```

より詳細には：

```rust
combined_score =
    favorite_score × FAVORITE_WEIGHT
  + reply_score × REPLY_WEIGHT
  + retweet_score × RETWEET_WEIGHT
  + photo_expand_score × PHOTO_EXPAND_WEIGHT
  + click_score × CLICK_WEIGHT
  + profile_click_score × PROFILE_CLICK_WEIGHT
  + vqv_score × VQV_WEIGHT (条件付き)
  + share_score × SHARE_WEIGHT
  + share_via_dm_score × SHARE_VIA_DM_WEIGHT
  + share_via_copy_link_score × SHARE_VIA_COPY_LINK_WEIGHT
  + dwell_score × DWELL_WEIGHT
  + quote_score × QUOTE_WEIGHT
  + quoted_click_score × QUOTED_CLICK_WEIGHT
  + dwell_time × CONT_DWELL_TIME_WEIGHT
  + follow_author_score × FOLLOW_AUTHOR_WEIGHT
  + not_interested_score × NOT_INTERESTED_WEIGHT
  + block_author_score × BLOCK_AUTHOR_WEIGHT
  + mute_author_score × MUTE_AUTHOR_WEIGHT
  + report_score × REPORT_WEIGHT
```

### 3.3 アクション重みの分類

#### ポジティブアクション重み

| アクション | 重みパラメータ | 説明 |
|-----------|--------------|------|
| いいね | `FAVORITE_WEIGHT` | エンゲージメントの基本指標 |
| リプライ | `REPLY_WEIGHT` | 会話参加の意思を示す |
| リツイート | `RETWEET_WEIGHT` | 拡散価値の高いコンテンツ |
| 画像展開 | `PHOTO_EXPAND_WEIGHT` | 視覚コンテンツへの興味 |
| クリック | `CLICK_WEIGHT` | 詳細閲覧の意思 |
| プロフィールクリック | `PROFILE_CLICK_WEIGHT` | 著者への興味 |
| シェア | `SHARE_WEIGHT` | 外部共有の意思 |
| DMシェア | `SHARE_VIA_DM_WEIGHT` | プライベート共有 |
| リンクコピー | `SHARE_VIA_COPY_LINK_WEIGHT` | 外部参照の意図 |
| 滞在 | `DWELL_WEIGHT` | コンテンツ消費時間 |
| 引用 | `QUOTE_WEIGHT` | コメント付き拡散 |
| 引用クリック | `QUOTED_CLICK_WEIGHT` | 引用元への興味 |
| 滞在時間 | `CONT_DWELL_TIME_WEIGHT` | 連続的な滞在時間 |
| フォロー | `FOLLOW_AUTHOR_WEIGHT` | 継続的な関係構築 |

#### ネガティブアクション重み

ネガティブアクションの重みは**負の値**を持ち、スコアを減少させる：

| アクション | 重みパラメータ | 説明 |
|-----------|--------------|------|
| 興味なし | `NOT_INTERESTED_WEIGHT` | 明示的な拒否 |
| ブロック | `BLOCK_AUTHOR_WEIGHT` | 強い拒否反応 |
| ミュート | `MUTE_AUTHOR_WEIGHT` | 中程度の拒否 |
| 報告 | `REPORT_WEIGHT` | 規約違反の可能性 |

### 3.4 Video Quality View (VQV) 重み

VQV重みは動画投稿にのみ適用される条件付き重み：

```rust
fn vqv_weight_eligibility(candidate: &PostCandidate) -> f64 {
    if candidate.video_duration_ms.is_some_and(|ms| ms > MIN_VIDEO_DURATION_MS) {
        VQV_WEIGHT
    } else {
        0.0
    }
}
```

条件：
- 投稿に動画が含まれている（`video_duration_ms`が存在）
- 動画の長さが最小閾値（`MIN_VIDEO_DURATION_MS`）を超えている

### 3.5 スコアオフセット処理

負のスコアを適切に処理するためのオフセット計算：

```rust
fn offset_score(combined_score: f64) -> f64 {
    if WEIGHTS_SUM == 0.0 {
        combined_score.max(0.0)
    } else if combined_score < 0.0 {
        (combined_score + NEGATIVE_WEIGHTS_SUM) / WEIGHTS_SUM * NEGATIVE_SCORES_OFFSET
    } else {
        combined_score + NEGATIVE_SCORES_OFFSET
    }
}
```

- `WEIGHTS_SUM`: 全重みの合計
- `NEGATIVE_WEIGHTS_SUM`: ネガティブ重みの合計（絶対値）
- `NEGATIVE_SCORES_OFFSET`: スコア調整用のオフセット値

### 3.6 スコア正規化

最終的な重み付きスコアは正規化される：

```rust
let normalized_weighted_score = normalize_score(candidate, weighted_score);
```

正規化により、異なる投稿間でスコアの比較が可能になる。

---

## 4. Author Diversity Scorer

### 4.1 概要

Author Diversity Scorerは、フィード内での著者の多様性を確保するため、同一著者の連続投稿に対してスコアを減衰させる。

### 4.2 パラメータ

| パラメータ | 説明 |
|-----------|------|
| `decay_factor` | 減衰係数（0-1の範囲） |
| `floor` | スコア乗数の下限値（最低保証） |

デフォルト値：
```rust
impl Default for AuthorDiversityScorer {
    fn default() -> Self {
        Self::new(AUTHOR_DIVERSITY_DECAY, AUTHOR_DIVERSITY_FLOOR)
    }
}
```

### 4.3 減衰計算式

著者の投稿が表示されるたびに、その著者の次の投稿のスコア乗数が減少する：

```
multiplier = (1 - floor) × decay_factor^position + floor
```

ここで：
- `position`: その著者の投稿が現れた回数（0から開始）
- `decay_factor`: 減衰の速度を制御（例: 0.5）
- `floor`: 乗数の最小値（例: 0.1）

```rust
fn multiplier(&self, position: usize) -> f64 {
    (1.0 - self.floor) * self.decay_factor.powf(position as f64) + self.floor
}
```

### 4.4 処理フロー

1. 候補を`weighted_score`の降順でソート
2. 著者ごとの出現回数をカウント
3. 各候補に対して乗数を適用

```rust
let adjusted_score = candidate.weighted_score.map(|score| score * multiplier);
```

### 4.5 減衰曲線の例

`decay_factor = 0.5`, `floor = 0.1` の場合：

| 出現位置 | 乗数 |
|---------|------|
| 0 (初回) | 1.00 |
| 1 | 0.55 |
| 2 | 0.325 |
| 3 | 0.2125 |
| 4 | 0.15625 |
| 5+ | ≈ 0.1 (floor) |

### 4.6 効果

- 同一著者の投稿が連続して表示されることを抑制
- フィードの多様性を向上
- ユーザー体験の改善

---

## 5. Out-of-Network (OON) Scorer

### 5.1 概要

OON Scorerは、ユーザーがフォローしていない著者（ネットワーク外）の投稿と、フォローしている著者（ネットワーク内）の投稿のバランスを調整する。

### 5.2 インネットワーク優先係数

```rust
match c.in_network {
    Some(false) => base_score * OON_WEIGHT_FACTOR,
    _ => base_score,
}
```

| 投稿タイプ | スコア乗数 |
|-----------|----------|
| インネットワーク | 1.0 (変更なし) |
| アウトオブネットワーク | `OON_WEIGHT_FACTOR` |

### 5.3 パラメータ

| パラメータ | 説明 |
|-----------|------|
| `OON_WEIGHT_FACTOR` | ネットワーク外投稿の重み係数（通常 < 1.0） |

### 5.4 効果

- フォローしている著者の投稿を優先
- レコメンデーション（ネットワーク外）投稿の露出を制御
- ユーザーのソーシャルグラフを尊重

---

## 6. スコアの流れと最終出力

### 6.1 スコアフィールド

`PostCandidate`には複数のスコアフィールドが存在：

```rust
pub struct PostCandidate {
    // ...
    pub phoenix_scores: PhoenixScores,    // Phoenixモデルの予測結果
    pub weighted_score: Option<f64>,       // 重み付きスコア
    pub score: Option<f64>,                // 最終スコア
    // ...
}
```

### 6.2 スコア計算パイプライン

```
PhoenixScorer:
  入力: 候補リスト + ユーザーアクション履歴
  出力: phoenix_scores (各アクション確率)
    ↓
WeightedScorer:
  入力: phoenix_scores
  出力: weighted_score (重み付き合計)
    ↓
AuthorDiversityScorer:
  入力: weighted_score
  出力: score (多様性調整後)
    ↓
OONScorer:
  入力: score
  出力: score (ネットワーク調整後) ← 最終スコア
```

### 6.3 スコア正規化

各段階でスコアの正規化が行われ、以下を保証：

1. スコアの比較可能性
2. 数値的安定性
3. 下流処理との互換性

---

## 7. 設定パラメータ一覧

すべてのスコアリング関連パラメータは`params`モジュールで定義される（セキュリティ上の理由でオープンソースリリースから除外）。

### 7.1 重みパラメータ

| パラメータ名 | 用途 |
|------------|------|
| `FAVORITE_WEIGHT` | いいね重み |
| `REPLY_WEIGHT` | リプライ重み |
| `RETWEET_WEIGHT` | リツイート重み |
| `PHOTO_EXPAND_WEIGHT` | 画像展開重み |
| `CLICK_WEIGHT` | クリック重み |
| `PROFILE_CLICK_WEIGHT` | プロフィールクリック重み |
| `VQV_WEIGHT` | ビデオ品質視聴重み |
| `SHARE_WEIGHT` | シェア重み |
| `SHARE_VIA_DM_WEIGHT` | DMシェア重み |
| `SHARE_VIA_COPY_LINK_WEIGHT` | リンクコピー重み |
| `DWELL_WEIGHT` | 滞在重み |
| `QUOTE_WEIGHT` | 引用重み |
| `QUOTED_CLICK_WEIGHT` | 引用クリック重み |
| `CONT_DWELL_TIME_WEIGHT` | 連続滞在時間重み |
| `FOLLOW_AUTHOR_WEIGHT` | フォロー重み |
| `NOT_INTERESTED_WEIGHT` | 興味なし重み（負） |
| `BLOCK_AUTHOR_WEIGHT` | ブロック重み（負） |
| `MUTE_AUTHOR_WEIGHT` | ミュート重み（負） |
| `REPORT_WEIGHT` | 報告重み（負） |

### 7.2 多様性パラメータ

| パラメータ名 | 用途 |
|------------|------|
| `AUTHOR_DIVERSITY_DECAY` | 著者多様性の減衰係数 |
| `AUTHOR_DIVERSITY_FLOOR` | 著者多様性の下限値 |

### 7.3 ネットワークパラメータ

| パラメータ名 | 用途 |
|------------|------|
| `OON_WEIGHT_FACTOR` | ネットワーク外重み係数 |

### 7.4 動画パラメータ

| パラメータ名 | 用途 |
|------------|------|
| `MIN_VIDEO_DURATION_MS` | VQV適用の最小動画長（ミリ秒） |

### 7.5 正規化パラメータ

| パラメータ名 | 用途 |
|------------|------|
| `WEIGHTS_SUM` | 全重みの合計 |
| `NEGATIVE_WEIGHTS_SUM` | ネガティブ重みの合計 |
| `NEGATIVE_SCORES_OFFSET` | 負スコアオフセット |

---

## 8. 関連ファイル

- `/home-mixer/scorers/phoenix_scorer.rs` - Phoenix Scorer実装
- `/home-mixer/scorers/weighted_scorer.rs` - Weighted Scorer実装
- `/home-mixer/scorers/author_diversity_scorer.rs` - Author Diversity Scorer実装
- `/home-mixer/scorers/oon_scorer.rs` - OON Scorer実装
- `/home-mixer/candidate_pipeline/candidate.rs` - PostCandidate, PhoenixScores定義
- `/candidate-pipeline/scorer.rs` - Scorerトレイト定義

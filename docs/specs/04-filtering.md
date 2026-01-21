# フィルタリングシステム仕様書

## 1. フィルタリングシステム概要

### 1.1 目的

フィルタリングシステムは、Xのホームタイムラインにおいて、ユーザーに表示される投稿の品質と関連性を確保するための重要なコンポーネントです。候補となる投稿群から不適切、重複、または不要な投稿を効率的に除外し、最終的にユーザーに最適なコンテンツのみを配信します。

### 1.2 設計原則

- **早期除外（Early Filtering）**: 不要な投稿を可能な限り早い段階で除外し、後続処理の計算コストを削減
- **段階的フィルタリング**: Pre-Scoring FiltersとPost-Selection Filtersの2段階構成
- **効率性**: HashSetやBloom Filterを活用した高速な重複検出
- **ユーザープライバシー尊重**: ブロック・ミュート設定の完全な反映

### 1.3 アーキテクチャ

```
┌─────────────────────────────────────────────────────────────────┐
│                    候補投稿（Candidates）                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Pre-Scoring Filters（10種類）                   │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐         │
│  │DropDuplicates │→│CoreDataHydra- │→│  AgeFilter    │→ ...    │
│  │    Filter     │ │  tionFilter   │ │               │         │
│  └───────────────┘ └───────────────┘ └───────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Scoring（スコアリング）                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Selection（選択）                             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                Post-Selection Filters（2種類）                   │
│  ┌───────────────┐ ┌───────────────────────┐                    │
│  │   VFFilter    │→│DedupConversationFilter│                    │
│  └───────────────┘ └───────────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    最終結果（Final Results）                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Pre-Scoring Filters

スコアリング処理の前に適用されるフィルター群です。計算コストの高いスコアリング処理の前に明らかに不要な投稿を除外することで、システム全体の効率を向上させます。

### 2.1 DropDuplicatesFilter（重複排除フィルター）

#### 概要

同一の`tweet_id`を持つ重複した投稿候補を除外します。複数のソース（Phoenix、Thunder等）から取得された候補に同じ投稿が含まれる場合に発生します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/drop_duplicates_filter.rs` |
| データ構造 | `HashSet<i64>` |
| 計算量 | O(n) |
| 判定条件 | `tweet_id`が既出の場合に除外 |

#### ロジック

```rust
let mut seen_ids = HashSet::new();
for candidate in candidates {
    if seen_ids.insert(candidate.tweet_id) {
        // 初出のtweet_id: 保持
        kept.push(candidate);
    } else {
        // 重複したtweet_id: 除外
        removed.push(candidate);
    }
}
```

#### 特記事項

- パイプライン内で最初に実行されるフィルター
- 後続フィルターの処理対象数を削減する重要な役割

---

### 2.2 CoreDataHydrationFilter（メタデータ検証フィルター）

#### 概要

投稿の基本メタデータ（コアデータ）が正しくハイドレート（取得・設定）されているかを検証します。不完全なデータを持つ投稿を除外します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/core_data_hydration_filter.rs` |
| 判定条件 | `author_id != 0` かつ `tweet_text`が空でない |
| 計算量 | O(n) |

#### ロジック

```rust
candidates.into_iter().partition(|c| {
    c.author_id != 0 && !c.tweet_text.trim().is_empty()
})
```

#### 検証項目

| フィールド | 検証内容 |
|-----------|---------|
| `author_id` | 0でないこと（有効なユーザーID） |
| `tweet_text` | 空文字または空白のみでないこと |

#### 特記事項

- データ取得の失敗やタイムアウトにより不完全なデータが発生する場合がある
- 不完全なデータは後続処理でエラーを引き起こす可能性があるため早期に除外

---

### 2.3 AgeFilter（古い投稿除外フィルター）

#### 概要

指定された期間より古い投稿を除外します。タイムラインの鮮度を維持するために使用されます。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/age_filter.rs` |
| 設定値 | `params::MAX_POST_AGE`（秒単位） |
| 判定方法 | Snowflake IDからの時刻抽出 |
| 計算量 | O(n) |

#### ロジック

```rust
fn is_within_age(&self, tweet_id: i64) -> bool {
    snowflake::duration_since_creation_opt(tweet_id)
        .map(|age| age <= self.max_age)
        .unwrap_or(false)
}
```

#### Snowflake IDについて

XのツイートIDはSnowflake形式を採用しており、ID自体に作成時刻が埋め込まれています：

```
┌─────────────────────────────────────────────────────────────────┐
│ 64-bit Snowflake ID                                             │
├─────────────┬──────────────┬────────────┬───────────────────────┤
│ 1bit (未使用) │ 41bit (時刻) │ 10bit (DC) │ 12bit (シーケンス)   │
└─────────────┴──────────────┴────────────┴───────────────────────┘
```

- 41ビットの時刻部分からミリ秒単位のタイムスタンプを抽出
- 基準時刻（Twitter Epoch: 2010-11-04T01:42:54.657Z）からの経過時間

#### 特記事項

- 時刻抽出に失敗した場合（不正なID）は除外される
- 設定値は`params`モジュールで管理（セキュリティ上、オープンソースリリースから除外）

---

### 2.4 SelfTweetFilter（自分の投稿除外フィルター）

#### 概要

閲覧ユーザー自身が投稿したツイートをタイムラインから除外します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/self_tweet_filter.rs` |
| 判定条件 | `candidate.author_id != query.user_id` |
| 計算量 | O(n) |

#### ロジック

```rust
let viewer_id = query.user_id as u64;
candidates.into_iter().partition(|c| c.author_id != viewer_id)
```

#### 特記事項

- 自分のツイートはプロフィールページで確認できるため、ホームタイムラインでは除外
- リツイートの場合は`retweeted_user_id`ではなく`author_id`（リツイートした人）で判定

---

### 2.5 RetweetDeduplicationFilter（リツイート重複排除フィルター）

#### 概要

同一の投稿が複数のリツイートとして候補に含まれる場合、最初に出現したもののみを保持し、重複を除外します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/retweet_deduplication_filter.rs` |
| データ構造 | `HashSet<u64>` |
| 計算量 | O(n) |

#### ロジック

```rust
for candidate in candidates {
    match candidate.retweeted_tweet_id {
        Some(retweeted_id) => {
            // リツイートの場合: 元ツイートIDで重複チェック
            if seen_tweet_ids.insert(retweeted_id) {
                kept.push(candidate);  // 初出: 保持
            } else {
                removed.push(candidate);  // 重複: 除外
            }
        }
        None => {
            // オリジナルツイートの場合: IDを記録して保持
            seen_tweet_ids.insert(candidate.tweet_id as u64);
            kept.push(candidate);
        }
    }
}
```

#### 重複排除のケース

| ケース | 動作 |
|--------|------|
| オリジナルツイートA → リツイートA | オリジナルを保持、リツイートを除外 |
| リツイートA（ユーザーX）→ リツイートA（ユーザーY）| 先に出現したリツイートを保持 |

#### 特記事項

- 順序が重要：先に出現した候補が優先される
- 複数のフォロワーが同じ投稿をリツイートした場合に効果を発揮

---

### 2.6 IneligibleSubscriptionFilter（サブスクリプション制限フィルター）

#### 概要

有料サブスクリプション専用コンテンツに対して、閲覧ユーザーがそのクリエイターをサブスクライブしていない場合に除外します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/ineligible_subscription_filter.rs` |
| 参照データ | `query.user_features.subscribed_user_ids` |
| 計算量 | O(n) |

#### ロジック

```rust
let subscribed_user_ids: HashSet<u64> = query
    .user_features
    .subscribed_user_ids
    .iter()
    .map(|id| *id as u64)
    .collect();

candidates.into_iter().partition(|candidate| {
    match candidate.subscription_author_id {
        Some(author_id) => subscribed_user_ids.contains(&author_id),
        None => true,  // サブスクリプション専用でない投稿は保持
    }
})
```

#### 判定フロー

```
投稿にsubscription_author_idがある？
    │
    ├─ いいえ → 保持（通常の投稿）
    │
    └─ はい → ユーザーがそのクリエイターをサブスクライブしている？
                │
                ├─ はい → 保持
                │
                └─ いいえ → 除外
```

#### 特記事項

- X Premium（旧Twitter Blue）のクリエイターサブスクリプション機能に対応
- サブスクリプション情報は`UserFeatures`から取得

---

### 2.7 PreviouslySeenPostsFilter（既読投稿除外フィルター）

#### 概要

ユーザーが既に閲覧した投稿を除外します。Bloom Filterと明示的な既読リストの両方を使用して効率的に判定します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/previously_seen_posts_filter.rs` |
| データ構造 | `Vec<BloomFilter>` + `Vec<i64>` |
| 計算量 | O(n * m)（m = Bloom Filter数） |

#### ロジック

```rust
let bloom_filters = query
    .bloom_filter_entries
    .iter()
    .map(BloomFilter::from_entry)
    .collect::<Vec<_>>();

candidates.into_iter().partition(|c| {
    get_related_post_ids(c).iter().any(|&post_id| {
        // 明示的な既読リストでチェック
        query.seen_ids.contains(&post_id)
            // Bloom Filterでチェック
            || bloom_filters.iter().any(|filter| filter.may_contain(post_id))
    })
})
```

#### Bloom Filterについて

Bloom Filterは確率的データ構造で、以下の特性を持ちます：

| 判定結果 | 意味 |
|---------|------|
| `may_contain() = false` | 確実に含まれていない |
| `may_contain() = true` | 含まれている可能性がある（偽陽性あり） |

- 偽陽性率は設定可能（通常1%以下）
- メモリ効率が良く、大量のIDを少ないメモリで管理可能
- クライアントから送信され、サーバー側で検証に使用

#### 関連投稿ID（Related Post IDs）

`get_related_post_ids()`は以下のIDを返します：
- 投稿自体のID
- リツイートの場合は元投稿のID
- 引用ツイートの場合は引用元のID

---

### 2.8 PreviouslyServedPostsFilter（既配信投稿除外フィルター）

#### 概要

直前のタイムラインリクエストで既に配信された投稿を除外します。無限スクロール時の重複を防ぎます。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/previously_served_posts_filter.rs` |
| 有効条件 | `query.is_bottom_request == true` |
| 参照データ | `query.served_ids` |
| 計算量 | O(n * m)（m = served_ids数） |

#### ロジック

```rust
fn enable(&self, query: &ScoredPostsQuery) -> bool {
    query.is_bottom_request  // 下方向スクロール時のみ有効
}

async fn filter(&self, query: &ScoredPostsQuery, candidates: Vec<PostCandidate>) {
    candidates.into_iter().partition(|c| {
        get_related_post_ids(c)
            .iter()
            .any(|id| query.served_ids.contains(id))
    })
}
```

#### 有効化条件

| リクエストタイプ | フィルター動作 |
|-----------------|---------------|
| 初回読み込み | 無効（全候補を対象） |
| 上方向スクロール（Pull-to-refresh） | 無効 |
| 下方向スクロール（Load more） | 有効 |

#### 特記事項

- `served_ids`はクライアントが前回のレスポンスで受け取ったIDを送信
- `PreviouslySeenPostsFilter`との違い：
  - `seen`: ユーザーが実際に画面で見た投稿
  - `served`: サーバーから配信されたがまだ見ていない可能性のある投稿

---

### 2.9 MutedKeywordFilter（ミュートキーワードフィルター）

#### 概要

ユーザーが設定したミュートキーワードを含む投稿を除外します。トークナイザーを使用して正確なキーワードマッチングを行います。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/muted_keyword_filter.rs` |
| 依存ライブラリ | `xai_post_text` |
| 参照データ | `query.user_features.muted_keywords` |
| 計算量 | O(n * k)（k = キーワード数） |

#### ロジック

```rust
// ミュートキーワードをトークン化
let tokenized = muted_keywords.iter().map(|k| self.tokenizer.tokenize(k));
let token_sequences: Vec<TokenSequence> = tokenized.collect();
let user_mutes = UserMutes::new(token_sequences);
let matcher = MatchTweetGroup::new(user_mutes);

for candidate in candidates {
    let tweet_text_token_sequence = self.tokenizer.tokenize(&candidate.tweet_text);
    if matcher.matches(&tweet_text_token_sequence) {
        removed.push(candidate);  // マッチ: 除外
    } else {
        kept.push(candidate);     // 非マッチ: 保持
    }
}
```

#### トークナイザーの役割

`TweetTokenizer`は以下の処理を行います：

1. テキストの正規化（Unicode正規化、小文字化など）
2. 単語境界での分割
3. ハッシュタグ、メンション、URLの特別扱い
4. 絵文字・特殊文字の処理

#### 最適化

- ミュートキーワードが空の場合は早期リターン（フィルタリングをスキップ）
- トークナイザーは`Arc`で共有され、フィルターインスタンス間で再利用

---

### 2.10 AuthorSocialgraphFilter（ブロック/ミュートユーザーフィルター）

#### 概要

閲覧ユーザーがブロックまたはミュートしているユーザーの投稿を除外します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/author_socialgraph_filter.rs` |
| 参照データ | `query.user_features.blocked_user_ids`, `query.user_features.muted_user_ids` |
| 計算量 | O(n) |

#### ロジック

```rust
for candidate in candidates {
    let author_id = candidate.author_id as i64;
    let muted = viewer_muted_user_ids.contains(&author_id);
    let blocked = viewer_blocked_user_ids.contains(&author_id);
    if muted || blocked {
        removed.push(candidate);
    } else {
        kept.push(candidate);
    }
}
```

#### ソーシャルグラフデータ

`UserFeatures`に含まれるソーシャルグラフ情報：

| フィールド | 説明 |
|-----------|------|
| `blocked_user_ids` | ブロックしているユーザーIDリスト |
| `muted_user_ids` | ミュートしているユーザーIDリスト |
| `followed_user_ids` | フォローしているユーザーIDリスト |

#### 最適化

- ブロック・ミュートリストが共に空の場合は早期リターン

---

## 3. Post-Selection Filters

スコアリングと選択（TopK選出）の後に適用されるフィルター群です。選択された上位候補に対してのみ実行されるため、より計算コストの高い処理を行うことができます。

### 3.1 VFFilter（Visibility Filtering - 違反コンテンツフィルター）

#### 概要

Visibility Filteringサービスの結果に基づいて、ポリシー違反コンテンツを除外します。削除済み、スパム、暴力的コンテンツなどが対象です。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/vf_filter.rs` |
| 依存サービス | `xai_visibility_filtering` |
| 事前処理 | `VFCandidateHydrator`によるハイドレーション |
| 計算量 | O(n) |

#### ロジック

```rust
fn should_drop(reason: &Option<FilteredReason>) -> bool {
    match reason {
        Some(FilteredReason::SafetyResult(safety_result)) => {
            matches!(safety_result.action, Action::Drop(_))
        }
        Some(_) => true,  // その他のFilteredReasonも除外
        None => false,    // 理由なし = 問題なし
    }
}

candidates.into_iter().partition(|c| should_drop(&c.visibility_reason))
```

#### Visibility Filteringサービス

Post-Selectionハイドレーターである`VFCandidateHydrator`が事前に呼び出され、各投稿の`visibility_reason`を設定します：

```rust
// VFCandidateHydrator内での処理
let in_network_future = Self::fetch_vf_results(
    client, in_network_ids, TimelineHome, user_id, context
);
let oon_future = Self::fetch_vf_results(
    client, oon_ids, TimelineHomeRecommendations, user_id, context
);
```

#### Safety Level

| レベル | 対象 | 説明 |
|-------|------|------|
| `TimelineHome` | In-Network投稿 | フォロー中ユーザーの投稿向け |
| `TimelineHomeRecommendations` | Out-of-Network投稿 | おすすめ投稿向け（より厳格） |

#### 除外されるコンテンツ

| カテゴリ | 説明 |
|---------|------|
| 削除済み | ユーザーまたは運営により削除された投稿 |
| スパム | スパム判定された投稿 |
| 暴力的コンテンツ | 暴力を含む投稿 |
| ヘイトスピーチ | 差別的発言を含む投稿 |
| センシティブコンテンツ | 成人向けコンテンツなど |
| ポリシー違反 | その他のプラットフォームポリシー違反 |

#### 特記事項

- Post-Selectionで実行される理由：VFサービス呼び出しは高コストのため、選択後の少数候補のみを対象
- In-NetworkとOut-of-Networkで異なるSafety Levelを適用

---

### 3.2 DedupConversationFilter（会話スレッド重複排除フィルター）

#### 概要

同一会話スレッド内の複数の投稿が選択された場合、最もスコアの高い投稿のみを保持します。

#### 実装詳細

| 項目 | 内容 |
|------|------|
| ファイル | `home-mixer/filters/dedup_conversation_filter.rs` |
| データ構造 | `HashMap<u64, (usize, f64)>` |
| 計算量 | O(n) |

#### ロジック

```rust
let mut best_per_convo: HashMap<u64, (usize, f64)> = HashMap::new();

for candidate in candidates {
    let conversation_id = get_conversation_id(&candidate);
    let score = candidate.score.unwrap_or(0.0);

    if let Some((kept_idx, best_score)) = best_per_convo.get_mut(&conversation_id) {
        if score > *best_score {
            // 現在の候補の方がスコアが高い: 置き換え
            let previous = std::mem::replace(&mut kept[*kept_idx], candidate);
            removed.push(previous);
            *best_score = score;
        } else {
            // 既存の方がスコアが高い: 現在の候補を除外
            removed.push(candidate);
        }
    } else {
        // この会話の最初の候補: 保持
        let idx = kept.len();
        best_per_convo.insert(conversation_id, (idx, score));
        kept.push(candidate);
    }
}
```

#### 会話IDの決定

```rust
fn get_conversation_id(candidate: &PostCandidate) -> u64 {
    candidate
        .ancestors
        .iter()
        .copied()
        .min()  // 最も古い祖先 = 会話の起点
        .unwrap_or(candidate.tweet_id as u64)  // 祖先がない場合は自身のID
}
```

#### 会話スレッドの構造

```
会話の起点（Conversation Root）: ID = 100
    │
    ├─ 返信1: ID = 101, ancestors = [100]
    │   │
    │   └─ 返信1-1: ID = 103, ancestors = [100, 101]
    │
    └─ 返信2: ID = 102, ancestors = [100]
```

全ての投稿の`conversation_id`は`100`（最小の祖先ID）となります。

#### 特記事項

- Post-Selectionで実行される理由：最終的な表示順序を考慮した重複排除のため
- スコアベースの優先度付けにより、最も関連性の高い投稿を保持

---

## 4. フィルタリングパイプラインの実行順序

### 4.1 完全な実行順序

```
[候補取得]
    │
    ▼
[Pre-Scoring Filters - 順序固定]
    │
    ├── 1. DropDuplicatesFilter        # 重複排除（最優先）
    │
    ├── 2. CoreDataHydrationFilter     # メタデータ検証
    │
    ├── 3. AgeFilter                   # 古い投稿除外
    │
    ├── 4. SelfTweetFilter             # 自分の投稿除外
    │
    ├── 5. RetweetDeduplicationFilter  # リツイート重複排除
    │
    ├── 6. IneligibleSubscriptionFilter # サブスクリプション制限
    │
    ├── 7. PreviouslySeenPostsFilter   # 既読投稿除外
    │
    ├── 8. PreviouslyServedPostsFilter # 既配信投稿除外
    │
    ├── 9. MutedKeywordFilter          # ミュートキーワード
    │
    └── 10. AuthorSocialgraphFilter    # ブロック/ミュートユーザー
    │
    ▼
[Scoring - スコアリング]
    │
    ├── PhoenixScorer
    ├── WeightedScorer
    ├── AuthorDiversityScorer
    └── OONScorer
    │
    ▼
[Selection - TopK選択]
    │
    ▼
[Post-Selection Hydrators]
    │
    └── VFCandidateHydrator           # Visibility情報取得
    │
    ▼
[Post-Selection Filters - 順序固定]
    │
    ├── 1. VFFilter                    # 違反コンテンツ除外
    │
    └── 2. DedupConversationFilter     # 会話スレッド重複排除
    │
    ▼
[最終結果]
```

### 4.2 実行順序の設計原則

#### Pre-Scoring Filtersの順序

| 順序 | フィルター | 理由 |
|------|-----------|------|
| 1 | DropDuplicates | 重複を最初に除外し、後続処理を効率化 |
| 2 | CoreDataHydration | 不完全データを早期排除 |
| 3 | Age | シンプルな判定で大量除外可能 |
| 4 | SelfTweet | シンプルな判定 |
| 5 | RetweetDeduplication | 重複系フィルターの後半 |
| 6 | IneligibleSubscription | ユーザー設定に基づくフィルター開始 |
| 7 | PreviouslySeen | Bloom Filter使用（やや複雑） |
| 8 | PreviouslyServed | 条件付きフィルター |
| 9 | MutedKeyword | テキスト処理（計算コスト高め） |
| 10 | AuthorSocialgraph | ユーザー設定フィルターの最後 |

#### Post-Selection Filtersの順序

| 順序 | フィルター | 理由 |
|------|-----------|------|
| 1 | VFFilter | ポリシー違反を先に除外 |
| 2 | DedupConversation | スコアベースの重複排除は最後 |

### 4.3 フィルターの有効化条件

一部のフィルターは条件に応じて有効/無効が切り替わります：

| フィルター | 有効化条件 | デフォルト |
|-----------|-----------|-----------|
| PreviouslyServedPostsFilter | `is_bottom_request == true` | 無効 |
| MutedKeywordFilter | `muted_keywords`が空でない | 有効（空なら即リターン） |
| AuthorSocialgraphFilter | ブロック/ミュートリストが空でない | 有効（空なら即リターン） |

---

## 5. データ構造

### 5.1 PostCandidate（投稿候補）

フィルターが処理する主要なデータ構造です。

```rust
pub struct PostCandidate {
    pub tweet_id: i64,                          // ツイートID
    pub author_id: u64,                         // 投稿者ID
    pub tweet_text: String,                     // 投稿テキスト
    pub in_reply_to_tweet_id: Option<u64>,      // 返信先ツイートID
    pub retweeted_tweet_id: Option<u64>,        // リツイート元ツイートID
    pub retweeted_user_id: Option<u64>,         // リツイート元ユーザーID
    pub score: Option<f64>,                     // 最終スコア
    pub in_network: Option<bool>,               // フォロー中ユーザーの投稿か
    pub ancestors: Vec<u64>,                    // 会話の祖先ツイートIDリスト
    pub visibility_reason: Option<FilteredReason>, // VF結果
    pub subscription_author_id: Option<u64>,    // サブスク専用投稿の著者ID
    // ... その他のフィールド
}
```

### 5.2 ScoredPostsQuery（クエリ）

フィルターに渡されるコンテキスト情報です。

```rust
pub struct ScoredPostsQuery {
    pub user_id: i64,                           // 閲覧ユーザーID
    pub seen_ids: Vec<i64>,                     // 既読投稿IDリスト
    pub served_ids: Vec<i64>,                   // 既配信投稿IDリスト
    pub is_bottom_request: bool,                // 下方向スクロールか
    pub bloom_filter_entries: Vec<BloomFilterEntry>, // Bloom Filter
    pub user_features: UserFeatures,            // ユーザー設定
    // ... その他のフィールド
}
```

### 5.3 UserFeatures（ユーザー設定）

```rust
pub struct UserFeatures {
    pub muted_keywords: Vec<String>,            // ミュートキーワード
    pub blocked_user_ids: Vec<i64>,             // ブロックユーザーID
    pub muted_user_ids: Vec<i64>,               // ミュートユーザーID
    pub followed_user_ids: Vec<i64>,            // フォローユーザーID
    pub subscribed_user_ids: Vec<i64>,          // サブスクライブ中ユーザーID
}
```

### 5.4 FilterResult（フィルター結果）

```rust
pub struct FilterResult<C> {
    pub kept: Vec<C>,      // 保持された候補
    pub removed: Vec<C>,   // 除外された候補
}
```

---

## 6. パフォーマンス考慮事項

### 6.1 計算量まとめ

| フィルター | 時間計算量 | 空間計算量 |
|-----------|-----------|-----------|
| DropDuplicatesFilter | O(n) | O(n) |
| CoreDataHydrationFilter | O(n) | O(1) |
| AgeFilter | O(n) | O(1) |
| SelfTweetFilter | O(n) | O(1) |
| RetweetDeduplicationFilter | O(n) | O(n) |
| IneligibleSubscriptionFilter | O(n) | O(m) |
| PreviouslySeenPostsFilter | O(n * b) | O(b) |
| PreviouslyServedPostsFilter | O(n * s) | O(1) |
| MutedKeywordFilter | O(n * k * t) | O(k) |
| AuthorSocialgraphFilter | O(n) | O(1) |
| VFFilter | O(n) | O(1) |
| DedupConversationFilter | O(n) | O(c) |

凡例：
- n: 候補数
- m: サブスクライブユーザー数
- b: Bloom Filter数
- s: served_ids数
- k: ミュートキーワード数
- t: 平均トークン数
- c: 会話数

### 6.2 最適化テクニック

1. **早期リターン**: 空のリストに対する処理をスキップ
2. **HashSet活用**: O(1)ルックアップのためのHashSet使用
3. **Bloom Filter**: メモリ効率の良い確率的データ構造
4. **Arc共有**: トークナイザー等の重いオブジェクトの共有
5. **パーティション最適化**: `partition`メソッドによる効率的な分割

---

## 7. 関連ドキュメント

- [01-overview.md](./01-overview.md) - システム全体概要
- [02-ranking.md](./02-ranking.md) - ランキングシステム仕様
- [03-scoring.md](./03-scoring.md) - スコアリングシステム仕様
- [05-hydration.md](./05-hydration.md) - ハイドレーションシステム仕様

# X Algorithm マスタリーカリキュラム: 第7章〜第9章

> **対話形式で学ぶ X アルゴリズムの仕組み**
>
> このドキュメントでは、X（旧Twitter）のFor Youフィードを支えるレコメンデーションアルゴリズムについて、先生と生徒の対話形式で解説します。

---

## 第7章: 動画コンテンツの特別扱い

### 7.1 動画はなぜ特別なのか

**生徒**: 先生、X のタイムラインを見ていると、動画コンテンツがよく表示される気がします。動画は何か特別な扱いを受けているのでしょうか？

**先生**: 鋭い観察ですね。実は、X のアルゴリズムは動画コンテンツに対して専用の評価指標を持っています。それが **VQV（Video Quality View）スコア** です。

**生徒**: VQV スコア...初めて聞きました。具体的にはどういうものですか？

**先生**: VQV は「動画品質視聴」を意味します。単に動画が再生されただけでなく、ユーザーが一定時間以上しっかり視聴したかどうかを測る指標です。コードを見てみましょう。

```rust
// home-mixer/scorers/phoenix_scorer.rs より
vqv_score: p.get(ActionName::ClientTweetVideoQualityView),
```

**生徒**: 普通の「動画再生」とは違うのですか？

**先生**: はい、大きく違います。ユーザーがスクロール中に動画が自動再生されただけでは VQV にはカウントされません。一定時間以上の視聴、つまり「質の高い視聴」があった場合にのみ VQV スコアが加算されます。

### 7.2 最小動画長の要件

**生徒**: すべての動画が VQV の対象になるわけではないのですか？

**先生**: 良い質問です。実は、VQV スコアが適用されるには **最小動画長の要件** があります。Thunder のコードを見てみましょう。

```rust
// thunder/kafka/tweet_events_listener.rs より
fn is_eligible_video(tweet: &Tweet) -> bool {
    let Some(media) = tweet.media.as_ref() else {
        return false;
    };

    let [first_media] = media.as_slice() else {
        return false;
    };

    let Some(MediaInfo::VideoInfo(video_info)) =
        first_media.media_info.as_ref()
    else {
        return false;
    };

    video_info
        .duration_millis
        .map(|d| d >= MIN_VIDEO_DURATION_MS)
        .unwrap_or(false)
}
```

**生徒**: `MIN_VIDEO_DURATION_MS` という閾値があるのですね。

**先生**: その通りです。この閾値を下回る短い動画は VQV の対象外となります。これは、あまりに短い動画では「品質視聴」を測定することが難しいためです。

### 7.3 VQV の重み付け計算

**生徒**: VQV スコアは最終的なランキングにどう影響するのですか？

**先生**: 重み付けスコアラーで、VQV は他のエンゲージメント指標と一緒に計算されます。ただし、動画長の要件を満たした場合のみです。

```rust
// home-mixer/scorers/weighted_scorer.rs より
fn vqv_weight_eligibility(candidate: &PostCandidate) -> f64 {
    if candidate
        .video_duration_ms
        .is_some_and(|ms| ms > p::MIN_VIDEO_DURATION_MS)
    {
        p::VQV_WEIGHT
    } else {
        0.0  // 要件を満たさない場合、VQVの重みは0
    }
}

fn compute_weighted_score(candidate: &PostCandidate) -> f64 {
    let s: &PhoenixScores = &candidate.phoenix_scores;
    let vqv_weight = Self::vqv_weight_eligibility(candidate);

    let combined_score = Self::apply(s.favorite_score, p::FAVORITE_WEIGHT)
        + Self::apply(s.reply_score, p::REPLY_WEIGHT)
        + Self::apply(s.retweet_score, p::RETWEET_WEIGHT)
        // ... 他のスコア ...
        + Self::apply(s.vqv_score, vqv_weight)  // VQVスコア
        // ...
}
```

**生徒**: なるほど。動画長が足りないと、VQV の重みが 0 になって、実質的に VQV スコアは無視されるわけですね。

**先生**: 正解です。これにより、意味のある動画視聴体験を提供するコンテンツが優遇される仕組みになっています。

### 7.4 動画投稿の最適化戦略

**生徒**: クリエイターとして、動画をアルゴリズムに評価されやすくするにはどうすればいいですか？

**先生**: いくつかの重要なポイントがあります。

#### 戦略1: 適切な動画長を確保する

**先生**: まず、最小動画長の要件を満たすことが必須です。短すぎる動画は VQV の対象にならないため、アルゴリズム上不利になります。

**生徒**: 具体的にどのくらいの長さが必要ですか？

**先生**: 正確な閾値は設定で変更可能ですが、視聴者が「しっかり見た」と判断できる程度の長さが必要です。数秒程度の超短尺動画は避けた方がよいでしょう。

#### 戦略2: 冒頭で視聴者を引き込む

**先生**: VQV は「品質視聴」を測定するため、視聴者が最後まで見てくれることが重要です。

**生徒**: つまり、最初の数秒で興味を引けないと離脱されてしまうということですね。

**先生**: その通りです。冒頭で価値を示す、興味を引くフックを入れることが大切です。

#### 戦略3: Thunder による専用ルートを活用

**先生**: Thunder システムには、動画専用の取得ルートがあります。

```rust
// thunder/thunder_service.rs より
let all_posts: Vec<LightPost> = if req.is_video_request {
    post_store.get_videos_by_users(
        &following_user_ids,
        &exclude_tweet_ids,
        start_time,
        request_user_id,
    )
} else {
    post_store.get_all_posts_by_users(...)
};
```

**生徒**: 動画専用のリクエストがあるのですね。

**先生**: はい。これは X のタイムラインが動画コンテンツを重視していることの表れです。質の高い動画を投稿すれば、この専用ルートで優先的に取得される可能性があります。

---

## 第8章: ユーザー履歴とパーソナライゼーション

### 8.1 エンゲージメント履歴の重要性

**生徒**: 先生、For You フィードは人によって全然違う内容が表示されますよね。これはどのように実現されているのですか？

**先生**: 素晴らしい質問です。X のアルゴリズムの核心は **ユーザーの過去のエンゲージメント履歴** にあります。システムは、あなたが過去にどのような投稿に対して、どのようなアクションを取ったかを詳細に記録しています。

**生徒**: 具体的にはどのようなアクションが記録されるのですか？

**先生**: Phoenix モデルが予測する全てのアクションが対象です。

```rust
// home-mixer/scorers/phoenix_scorer.rs より
PhoenixScores {
    favorite_score: p.get(ActionName::ServerTweetFav),        // いいね
    reply_score: p.get(ActionName::ServerTweetReply),         // 返信
    retweet_score: p.get(ActionName::ServerTweetRetweet),     // リポスト
    photo_expand_score: p.get(ActionName::ClientTweetPhotoExpand), // 画像拡大
    click_score: p.get(ActionName::ClientTweetClick),         // クリック
    profile_click_score: p.get(ActionName::ClientTweetClickProfile), // プロフィールクリック
    vqv_score: p.get(ActionName::ClientTweetVideoQualityView), // 動画品質視聴
    share_score: p.get(ActionName::ClientTweetShare),         // 共有
    dwell_score: p.get(ActionName::ClientTweetRecapDwelled),  // 滞在
    follow_author_score: p.get(ActionName::ClientTweetFollowAuthor), // フォロー
    not_interested_score: p.get(ActionName::ClientTweetNotInterestedIn), // 興味なし
    block_author_score: p.get(ActionName::ClientTweetBlockAuthor), // ブロック
    mute_author_score: p.get(ActionName::ClientTweetMuteAuthor), // ミュート
    report_score: p.get(ActionName::ClientTweetReport),       // 報告
    // ...
}
```

**生徒**: ポジティブなアクションだけでなく、ネガティブなアクション（ブロック、ミュート、報告）も記録されているのですね。

**先生**: はい、これが非常に重要なポイントです。ネガティブなシグナルは、あなたに見せるべきでないコンテンツを学習するために使われます。

### 8.2 User Action Sequence（ユーザーアクションシーケンス）

**生徒**: 履歴データはどのような形で保存されているのですか？

**先生**: **User Action Sequence（UAS）** という形式で保存されています。これは、時系列順に並べられたあなたの過去のアクションのリストです。

```rust
// home-mixer/query_hydrators/user_action_seq_query_hydrator.rs より
impl UserActionSeqQueryHydrator {
    fn aggregate_user_action_sequence(
        &self,
        user_id: i64,
        uas_thrift: ThriftUserActionSequence,
    ) -> Result<UserActionSequence, String> {
        // ユーザーアクションを取得
        let thrift_user_actions = uas_thrift.user_actions.clone().unwrap_or_default();

        // フィルタリング
        let filtered_actions = self.global_filter.run(thrift_user_actions);

        // 集約処理
        let mut aggregated_actions =
            self.aggregator.run(&filtered_actions, p::UAS_WINDOW_TIME_MS, 0);

        // 最大長に切り詰め（最新のN件を保持）
        if aggregated_actions.len() > p::UAS_MAX_SEQUENCE_LENGTH {
            let drain_count = aggregated_actions.len() - p::UAS_MAX_SEQUENCE_LENGTH;
            aggregated_actions.drain(0..drain_count);
        }

        // ...
    }
}
```

**生徒**: `UAS_MAX_SEQUENCE_LENGTH` で履歴の長さに制限があるのですね。

**先生**: はい、直近の一定数のアクションのみが使用されます。これにより、最近の興味が反映されやすくなっています。古い興味よりも、今のあなたの興味が重視されるわけです。

### 8.3 Transformer モデルがどのように学習するか

**生徒**: 集められた履歴データは、どのように使われるのですか？

**先生**: ここからが面白いところです。Phoenix は **Grok ベースの Transformer モデル** を使用しています。このモデルは、あなたの履歴を「文脈」として読み取り、新しい候補投稿に対するあなたの反応を予測します。

```python
# phoenix/recsys_model.py より
def build_inputs(
    self,
    batch: RecsysBatch,
    recsys_embeddings: RecsysEmbeddings,
) -> Tuple[jax.Array, jax.Array, int]:
    """入力エンベディングを構築する

    Returns:
        embeddings: [B, 1 + history_len + num_candidates, D]
        padding_mask: [B, 1 + history_len + num_candidates]
        candidate_start_offset: 候補が始まる位置
    """
    # ユーザーエンベディング
    user_embeddings, user_padding_mask = block_user_reduce(...)

    # 履歴エンベディング（投稿 + 著者 + アクション + 表示場所）
    history_embeddings, history_padding_mask = block_history_reduce(
        batch.history_post_hashes,
        recsys_embeddings.history_post_embeddings,
        recsys_embeddings.history_author_embeddings,
        history_product_surface_embeddings,
        history_actions_embeddings,  # どのアクションを取ったか
        ...
    )

    # 候補エンベディング
    candidate_embeddings, candidate_padding_mask = block_candidate_reduce(...)

    # すべてを連結: [ユーザー, 履歴..., 候補...]
    embeddings = jnp.concatenate(
        [user_embeddings, history_embeddings, candidate_embeddings], axis=1
    )
```

**生徒**: 入力が [ユーザー, 履歴, 候補] という順番で連結されるのですね。

**先生**: その通りです。Transformer は Self-Attention メカニズムを使って、履歴の中のパターンを学習します。例えば、「この人は最近AIに関する投稿によくいいねしている」「この著者の投稿にはいつも返信している」といったパターンを自動的に見つけ出します。

### 8.4 候補の独立性（Candidate Isolation）

**生徒**: 候補同士は影響し合わないのですか？

**先生**: 鋭い質問です。実は、これは Phoenix の **重要な設計上の決定** です。候補は互いに Attention を向けることができません。

```
        候補の独立性を示す Attention マスク

         Keys（参照先）
         ─────────────────────────────────────────────▶
         │ User │    History (S positions)    │   Candidates (C positions)    │
    ┌────┼──────┼─────────────────────────────┼───────────────────────────────┤
    │ U  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✗   ✗   ✗   ✗    │
    ├────┼──────┼─────────────────────────────┼───────────────────────────────┤
  Q │ H  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✗   ✗   ✗   ✗    │
  u │ i  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✗   ✗   ✗   ✗    │
  e │ s  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✗   ✗   ✗   ✗    │
  r │ t  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✗   ✗   ✗   ✗    │
  i ├────┼──────┼─────────────────────────────┼───────────────────────────────┤
  e │    │      │                             │  対角線のみ（自己参照）       │
  s │ C  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✓   ✗   ✗   ✗   ✗   ✗   ✗    │
    │ a  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✓   ✗   ✗   ✗   ✗   ✗    │
    │ n  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✓   ✗   ✗   ✗   ✗    │
    │ d  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✓   ✗   ✗   ✗    │
    │ i  │  ✓   │  ✓   ✓   ✓   ✓   ✓   ✓   ✓  │  ✗   ✗   ✗   ✗   ✓   ✗   ✗    │

    ✓ = 参照可能    ✗ = 参照不可
```

**生徒**: 候補は User と History は見られるけど、他の候補は見られないのですね。なぜこのような設計なのですか？

**先生**: これには重要な理由があります。

1. **スコアの一貫性**: ある投稿のスコアが、たまたま同じバッチに入った他の投稿に依存しなくなります
2. **キャッシュ可能性**: 各投稿のスコアを独立してキャッシュできます
3. **公平性**: 投稿は自分自身のメリットだけで評価されます

### 8.5 プロダクトサーフェスの概念

**生徒**: コードの中に `product_surface` というものがありましたが、これは何ですか？

**先生**: **Product Surface（プロダクトサーフェス）** は、ユーザーがどの「場所」でそのアクションを取ったかを表す情報です。

```python
# phoenix/recsys_model.py より
product_surface_vocab_size: int = 16  # 16種類の表示場所

# 履歴の各アクションに対してプロダクトサーフェスを埋め込み
history_product_surface_embeddings = self._single_hot_to_embeddings(
    batch.history_product_surface,
    config.product_surface_vocab_size,
    config.emb_size,
    "product_surface_embedding_table",
)
```

**生徒**: 「場所」とは具体的にどういうものですか？

**先生**: 例えば以下のようなものです：

- For You タイムライン
- フォロー中タイムライン
- 検索結果
- 通知
- プロフィールページ
- 引用リポスト
- など

**生徒**: なるほど。同じ投稿でも、どこで見たかによって意味が変わるということですね。

**先生**: その通りです。例えば、For You で表示されて「いいね」された投稿と、検索結果で表示されて「いいね」された投稿では、その「いいね」の意味が異なる可能性があります。モデルはこの文脈も学習します。

---

## 第9章: リアルタイム性と鮮度

### 9.1 Thunder によるリアルタイムインジェスト

**生徒**: 先生、X のタイムラインはかなりリアルタイムに更新されますよね。どうやってそんなに速く新しい投稿を取得しているのですか？

**先生**: それを可能にしているのが **Thunder** システムです。Thunder は、全てのユーザーの最新投稿をインメモリで保持するリアルタイムインジェストパイプラインです。

```rust
// README.md より
// Thunder:
// - Consumes post create/delete events from Kafka
// - Maintains per-user stores for original posts, replies/reposts, and video posts
// - Serves "in-network" post candidates from accounts the requesting user follows
// - Automatically trims posts older than the retention period
```

**生徒**: インメモリということは、データベースにアクセスしないのですか？

**先生**: はい、それが Thunder の核心的な設計です。サブミリ秒のレイテンシで、フォローしているアカウントの投稿を取得できます。

```rust
// thunder/thunder_service.rs より
// Thunder enables sub-millisecond lookups for in-network content
// without hitting an external database.
```

### 9.2 Kafka イベント処理

**生徒**: 新しい投稿はどのように Thunder に届くのですか？

**先生**: **Kafka** というメッセージングシステムを通じて、投稿の作成・削除イベントがリアルタイムで配信されます。

```rust
// thunder/kafka/tweet_events_listener.rs より
async fn process_tweet_events(
    consumer: Arc<RwLock<KafkaConsumer>>,
    batch_size: usize,
    producer: Option<Arc<RwLock<KafkaProducer>>>,
    post_retention_sec: i64,
) -> Result<()> {
    let mut message_buffer = Vec::new();
    let mut batch_num = 0;

    loop {
        let poll_result = {
            let mut consumer_lock = consumer.write().await;
            consumer_lock.poll(100).await  // 100msごとにポーリング
        };

        match poll_result {
            Ok(messages) => {
                message_buffer.extend(messages);

                // バッチサイズに達したら処理
                if message_buffer.len() >= batch_size {
                    batch_num += 1;
                    let messages = std::mem::take(&mut message_buffer);
                    process_message_batch(messages, batch_num, producer_clone, post_retention_sec)
                        .await?;
                    consumer.write().await.commit_offsets()?;
                }
            }
            // ...
        }
    }
}
```

**生徒**: 100ms ごとにポーリングして、バッチで処理するのですね。

**先生**: はい。効率性とリアルタイム性のバランスを取っています。個別のイベントを一つずつ処理するより、バッチ処理の方が効率的です。

### 9.3 イベントの種類

**生徒**: どのようなイベントが処理されるのですか？

**先生**: 主に以下の3種類です。

```rust
// thunder/kafka/tweet_events_listener.rs より
match data {
    TweetEventData::TweetCreateEvent(create_event) => {
        // 新しい投稿が作成された
        create_tweets.push(LightPost {
            post_id: tweet.id.unwrap(),
            author_id: create_event.user.as_ref().unwrap().id.unwrap(),
            created_at: core_data.created_at_secs.unwrap(),
            in_reply_to_post_id: core_data.reply.as_ref().and_then(|r| r.in_reply_to_status_id),
            is_retweet: core_data.share.is_some(),
            is_reply: core_data.reply.is_some(),
            has_video: is_eligible_video(tweet),
            // ...
        });
    }
    TweetEventData::TweetDeleteEvent(delete_event) => {
        // 投稿が削除された
        delete_tweets.push(delete_event.tweet.as_ref().unwrap().id.unwrap());
    }
    TweetEventData::QuotedTweetDeleteEvent(delete_event) => {
        // 引用元の投稿が削除された
        delete_tweets.push(delete_event.quoting_tweet_id.unwrap());
    }
    // ...
}
```

**生徒**: 削除も即座に反映されるのですね。

**先生**: はい、重要なポイントです。削除された投稿がフィードに表示され続けることを防いでいます。

### 9.4 投稿の鮮度がスコアに与える影響

**生徒**: 新しい投稿は古い投稿より優遇されるのですか？

**先生**: はい、複数のメカニズムで鮮度が考慮されます。

#### 1. 年齢フィルター（Age Filter）

```rust
// home-mixer/filters/age_filter.rs より
pub struct AgeFilter {
    pub max_age: Duration,  // 最大許容年齢
}

impl AgeFilter {
    fn is_within_age(&self, tweet_id: i64) -> bool {
        snowflake::duration_since_creation_opt(tweet_id)
            .map(|age| age <= self.max_age)
            .unwrap_or(false)
    }
}

#[async_trait]
impl Filter<ScoredPostsQuery, PostCandidate> for AgeFilter {
    async fn filter(
        &self,
        _query: &ScoredPostsQuery,
        candidates: Vec<PostCandidate>,
    ) -> Result<FilterResult<PostCandidate>, String> {
        let (kept, removed): (Vec<_>, Vec<_>) = candidates
            .into_iter()
            .partition(|c| self.is_within_age(c.tweet_id));

        Ok(FilterResult { kept, removed })
    }
}
```

**生徒**: `max_age` を超えた投稿は完全に除外されるのですね。

**先生**: その通りです。これにより、非常に古い投稿がタイムラインに表示されることを防いでいます。

#### 2. Thunder の保持期間

**生徒**: Thunder にも保持期間の制限がありますか？

**先生**: はい、Thunder は設定された保持期間を超えた投稿を自動的に削除します。

```rust
// thunder/kafka/tweet_events_listener.rs より
// 削除イベントの処理時、保持期間外の古い投稿は無視
let created_at_secs = delete_event.tweet.as_ref().unwrap()
    .core_data.as_ref().unwrap()
    .created_at_secs.unwrap();

if now_secs - created_at_secs > post_retention_sec {
    continue;  // 保持期間外なので無視
}
```

#### 3. リアルタイム取得での鮮度優先

```rust
// thunder/thunder_service.rs より
fn score_recent(mut light_posts: Vec<LightPost>, max_results: usize) -> Vec<LightPost> {
    // 作成日時の降順でソート（新しい順）
    light_posts.sort_unstable_by_key(|post| Reverse(post.created_at));

    // 上位N件を返す
    light_posts.into_iter().take(max_results).collect()
}
```

**生徒**: Thunder からの取得時点で、すでに新しい投稿が優先されているのですね。

**先生**: はい。これはあくまで「候補の取得」段階です。最終的なランキングは Phoenix モデルが行いますが、候補プールに入る時点で鮮度が考慮されています。

### 9.5 統計とモニタリング

**生徒**: システムはどのように鮮度を監視しているのですか？

**先生**: Thunder は詳細な統計を収集しています。

```rust
// thunder/thunder_service.rs より
fn analyze_and_report_post_statistics(posts: &[LightPost], stage: &str) {
    // 最新投稿からの経過時間
    let time_since_most_recent = posts.iter()
        .map(|post| post.created_at)
        .max()
        .map(|most_recent| now - most_recent);

    // 最古投稿からの経過時間
    let time_since_oldest = posts.iter()
        .map(|post| post.created_at)
        .min()
        .map(|oldest| now - oldest);

    // メトリクスを報告
    GET_IN_NETWORK_POSTS_FOUND_FRESHNESS_SECONDS
        .with_label_values(&[stage])
        .observe(freshness as f64);

    GET_IN_NETWORK_POSTS_FOUND_TIME_RANGE_SECONDS
        .with_label_values(&[stage])
        .observe(time_range as f64);
}
```

**生徒**: `FRESHNESS_SECONDS` で最新投稿の鮮度を、`TIME_RANGE_SECONDS` で投稿の時間幅を監視しているのですね。

**先生**: はい。これらのメトリクスは、システムが健全に動作しているかを確認するために使われます。もし鮮度が悪化したら、何か問題が起きている可能性があります。

### 9.6 クリエイターへの実践的アドバイス

**生徒**: リアルタイム性を理解した上で、クリエイターはどう活用すべきですか？

**先生**: いくつかのポイントがあります。

#### 1. タイミングを意識する

**先生**: 投稿の鮮度は重要な要素です。フォロワーがアクティブな時間帯に投稿することで、タイムラインに表示されやすくなります。

#### 2. 初動のエンゲージメントが重要

**先生**: 投稿直後のエンゲージメントは特に重要です。Thunder は新しい投稿を優先的に取得するため、投稿直後にエンゲージメントを獲得できると、より多くのユーザーのタイムラインに表示される機会が増えます。

#### 3. 削除は即座に反映される

**生徒**: 間違えて投稿してもすぐ消せば大丈夫ということですね。

**先生**: はい、削除イベントはリアルタイムで処理されます。ただし、すでにユーザーのデバイスにキャッシュされている場合は、即座には消えないこともあります。

#### 4. 継続的な投稿が有利

**先生**: Thunder は「最近の投稿」を保持するシステムです。定期的に投稿することで、常にあなたのコンテンツが候補プールに存在する状態を維持できます。長期間投稿しないと、フォロワーの For You タイムラインにあなたのコンテンツが候補として挙がりにくくなります。

---

## まとめ

### 第7章のポイント
- VQV（Video Quality View）スコアは動画の「品質視聴」を測定
- 最小動画長の要件を満たさないと VQV スコアは適用されない
- Thunder には動画専用の取得ルートがある

### 第8章のポイント
- User Action Sequence がユーザーの履歴を時系列で保持
- Transformer モデルが履歴パターンから学習
- 候補の独立性により公平で一貫したスコアリング
- Product Surface がアクションの文脈を提供

### 第9章のポイント
- Thunder がリアルタイムで投稿を Kafka から取得
- Age Filter が古すぎる投稿を除外
- 鮮度は候補取得の段階から考慮される
- 投稿タイミングと初動エンゲージメントが重要

---

*次章では、アウトオブネットワーク（Out-of-Network）コンテンツの検索とTwo-Towerモデルについて詳しく学びます。*

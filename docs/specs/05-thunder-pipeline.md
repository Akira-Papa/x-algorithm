# Thunder & Candidate Pipeline 仕様書

本ドキュメントでは、X (Twitter) アルゴリズムにおける Thunder（インネットワーク投稿ストア）と Candidate Pipeline Framework の詳細仕様について解説する。

---

## 1. Thunder（インネットワーク投稿ストア）

### 1.1 概要と目的

Thunder は、ユーザーがフォローしているアカウント（インネットワーク）からの投稿をリアルタイムで保持・提供するための高性能インメモリストアである。

**主な目的:**
- フォロー中ユーザーの最新投稿への高速アクセス
- ホームタイムラインにおけるインネットワーク候補の即座提供
- Kafka からのリアルタイムイベント処理
- 投稿タイプ別（オリジナル、リプライ/リツイート、動画）の効率的な管理

**アーキテクチャ上の位置づけ:**
Thunder は Home Mixer の候補パイプラインにおいて `ThunderSource` として統合され、フォロー中ユーザーからの投稿候補を提供する主要なデータソースの一つである。

### 1.2 Kafka からのリアルタイムインジェスト

Thunder は Kafka からツイートイベントを消費し、リアルタイムでインメモリストアを更新する。

**イベント処理フロー:**

```
Kafka (tweet_events) → Consumer → Deserializer → PostStore
```

**サポートされるイベントタイプ:**
- `TweetCreateEvent`: 新規投稿の作成
- `TweetDeleteEvent`: 投稿の削除
- `QuotedTweetDeleteEvent`: 引用ツイートの削除

**マルチスレッド処理:**
```rust
// パーティション分散によるスレッド処理
let num_partitions = args.tweet_events_num_partitions;
let kafka_num_threads = args.kafka_num_threads;
let partitions_per_thread = num_partitions.div_ceil(kafka_num_threads);
```

各スレッドは割り当てられたパーティションのサブセットを処理し、以下の機能を持つ:
- バッチ処理（設定可能なバッチサイズ）
- パーティションラグ監視
- エラー時の自動リトライ

**メッセージバッチ処理:**
```rust
// バッチが一定サイズに達したら処理を実行
if message_buffer.len() >= batch_size {
    let messages = std::mem::take(&mut message_buffer);
    process_message_batch(messages, batch_num, producer_clone, post_retention_sec).await?;
    consumer.write().await.commit_offsets()?;
}
```

**初期化フェーズ:**
サービス起動時、Thunder は全パーティションからの初期データ読み込みが完了するまで待機する:
```rust
// Kafka catchup 完了を待機
for _ in 0..args.kafka_num_threads {
    rx.recv().await;
}
post_store.finalize_init().await?;
```

### 1.3 ユーザー別投稿ストア構造

PostStore は DashMap を使用した並行安全なインメモリデータ構造である。

**データ構造:**
```rust
pub struct PostStore {
    /// 投稿ID から完全な投稿データへのマップ
    posts: Arc<DashMap<i64, LightPost>>,

    /// ユーザーID からオリジナル投稿参照リストへのマップ
    original_posts_by_user: Arc<DashMap<i64, VecDeque<TinyPost>>>,

    /// ユーザーID からリプライ/リツイート参照リストへのマップ
    secondary_posts_by_user: Arc<DashMap<i64, VecDeque<TinyPost>>>,

    /// ユーザーID から動画投稿参照リストへのマップ
    video_posts_by_user: Arc<DashMap<i64, VecDeque<TinyPost>>>,

    /// 削除された投稿のトラッキング
    deleted_posts: Arc<DashMap<i64, bool>>,

    /// 保持期間（秒）
    retention_seconds: u64,

    /// リクエストタイムアウト
    request_timeout: Duration,
}
```

**TinyPost（軽量参照）:**
ユーザータイムラインには最小限の参照情報のみを保持:
```rust
pub struct TinyPost {
    pub post_id: i64,
    pub created_at: i64,
}
```

**LightPost（完全な投稿データ）:**
投稿の詳細情報を保持（protobuf で定義）:
- `post_id`: 投稿ID
- `author_id`: 作者ID
- `created_at`: 作成タイムスタンプ
- `in_reply_to_post_id`: リプライ先投稿ID
- `in_reply_to_user_id`: リプライ先ユーザーID
- `is_retweet`: リツイートフラグ
- `is_reply`: リプライフラグ
- `source_post_id`: リツイート元投稿ID
- `source_user_id`: リツイート元ユーザーID
- `has_video`: 動画コンテンツフラグ
- `conversation_id`: 会話ID

### 1.4 投稿タイプ（オリジナル、リプライ/リツイート、動画）

Thunder は投稿を3つのカテゴリに分類して管理する:

**1. オリジナル投稿 (original_posts_by_user)**
- リプライでもリツイートでもない投稿
- 判定条件: `!post.is_reply && !post.is_retweet`

**2. セカンダリ投稿 (secondary_posts_by_user)**
- リプライまたはリツイート
- 追加のフィルタリングロジック適用（フォロー中ユーザーへのリプライを優先）

**3. 動画投稿 (video_posts_by_user)**
- 動画コンテンツを含む投稿
- 最小動画長の条件あり（MIN_VIDEO_DURATION_MS）
- リツイートの元投稿の動画も考慮
- リプライは動画対象から除外

**投稿分類ロジック:**
```rust
// 投稿挿入時の分類
if is_original {
    original_posts_by_user.entry(author_id).or_default().push_back(tiny_post);
} else {
    secondary_posts_by_user.entry(author_id).or_default().push_back(tiny_post);
}

// 動画投稿の判定
let mut video_eligible = post.has_video;
if !video_eligible && post.is_retweet {
    if let Some(source_post) = self.posts.get(&source_post_id) {
        video_eligible = !source_post.is_reply && source_post.has_video;
    }
}
if post.is_reply {
    video_eligible = false;
}
```

**ユーザー別取得制限:**
各ユーザーから取得する投稿数には制限がある:
- `MAX_ORIGINAL_POSTS_PER_AUTHOR`: オリジナル投稿の最大数
- `MAX_REPLY_POSTS_PER_AUTHOR`: リプライ/リツイートの最大数
- `MAX_VIDEO_POSTS_PER_AUTHOR`: 動画投稿の最大数
- `MAX_TINY_POSTS_PER_USER_SCAN`: スキャン時の最大参照数

### 1.5 保持期間と自動トリム

Thunder は設定可能な保持期間に基づいて古い投稿を自動的に削除する。

**保持期間の設定:**
```rust
// デフォルト: 2日間
impl Default for PostStore {
    fn default() -> Self {
        Self::new(2 * 24 * 60 * 60, 0)  // 2日 = 172,800秒
    }
}
```

**投稿挿入時のフィルタリング:**
```rust
// 保持期間内かつ未来の投稿でないことを確認
posts.retain(|p| {
    p.created_at < current_time
        && current_time - p.created_at <= (self.retention_seconds as i64)
});
```

**自動トリムタスク:**
```rust
// バックグラウンドで定期的に古い投稿を削除
pub fn start_auto_trim(self: Arc<Self>, interval_minutes: u64) {
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(interval_minutes * 60));
        loop {
            interval.tick().await;
            let trimmed = self.trim_old_posts().await;
            if trimmed > 0 {
                info!("Auto-trim: removed {} old posts", trimmed);
            }
        }
    });
}
```

**トリム処理の詳細:**
- 各ユーザーのタイムラインを走査
- 保持期間を超えた投稿を VecDeque の先頭から削除
- 空になったユーザーエントリを削除
- メモリ効率化のためキャパシティを縮小

### 1.6 gRPC サービス（InNetworkPostsService）

Thunder は gRPC を通じて投稿データを提供する。

**サービス定義:**
```rust
#[tonic::async_trait]
impl InNetworkPostsService for ThunderServiceImpl {
    async fn get_in_network_posts(
        &self,
        request: Request<GetInNetworkPostsRequest>,
    ) -> Result<Response<GetInNetworkPostsResponse>, Status>
}
```

**リクエストパラメータ:**
- `user_id`: リクエストユーザーID
- `following_user_ids`: フォロー中ユーザーIDリスト
- `exclude_tweet_ids`: 除外する投稿IDリスト
- `max_results`: 返却する最大投稿数
- `is_video_request`: 動画投稿のみを要求するフラグ
- `debug`: デバッグモードフラグ

**レスポンス:**
```rust
pub struct GetInNetworkPostsResponse {
    pub posts: Vec<LightPost>,
}
```

**圧縮対応:**
```rust
pub fn server(self) -> InNetworkPostsServiceServer<Self> {
    InNetworkPostsServiceServer::new(self)
        .accept_compressed(tonic::codec::CompressionEncoding::Zstd)
        .send_compressed(tonic::codec::CompressionEncoding::Zstd)
}
```

**統計分析とメトリクス:**
レスポンス生成時に以下の統計を計算・記録:
- 最新投稿からの経過時間（freshness）
- 投稿の時間範囲
- リプライ比率
- ユニーク投稿者数
- 投稿者あたりの投稿数

### 1.7 負荷制御（セマフォ、同時接続制限）

Thunder は過負荷保護のためのメカニズムを実装している。

**同時リクエスト制限:**
```rust
pub struct ThunderServiceImpl {
    post_store: Arc<PostStore>,
    strato_client: Arc<StratoClient>,
    /// 同時リクエスト数を制限するセマフォ
    request_semaphore: Arc<Semaphore>,
}
```

**リクエスト処理時の制御:**
```rust
// ノンブロッキングでセマフォ取得を試行
let _permit = match self.request_semaphore.try_acquire() {
    Ok(permit) => {
        IN_FLIGHT_REQUESTS.inc();
        permit
    }
    Err(_) => {
        REJECTED_REQUESTS.inc();
        return Err(Status::resource_exhausted(
            "Server at capacity, please retry",
        ));
    }
};
```

**入力リスト制限:**
```rust
// フォロー中ユーザーリストの制限
let following_user_ids: Vec<u64> = following_user_ids
    .into_iter()
    .take(MAX_INPUT_LIST_SIZE)
    .collect();

// 除外リストの制限
let exclude_tweet_ids: Vec<u64> = req.exclude_tweet_ids
    .into_iter()
    .take(MAX_INPUT_LIST_SIZE)
    .collect();
```

**リクエストタイムアウト:**
```rust
// イテレーション中のタイムアウトチェック
if !self.request_timeout.is_zero() && start_time.elapsed() >= self.request_timeout {
    POST_STORE_REQUEST_TIMEOUTS.inc();
    break;
}
```

**メトリクス監視:**
- `IN_FLIGHT_REQUESTS`: 処理中のリクエスト数
- `REJECTED_REQUESTS`: 拒否されたリクエスト数
- `POST_STORE_REQUESTS`: 総リクエスト数
- `POST_STORE_REQUEST_TIMEOUTS`: タイムアウト数

---

## 2. Candidate Pipeline Framework

### 2.1 概要と設計思想

Candidate Pipeline Framework は、推薦候補の取得から最終選択までの処理を構造化されたパイプラインとして実装するためのフレームワークである。

**設計原則:**
- **モジュラー構成**: 各処理ステージが独立したコンポーネント
- **並列実行**: 可能な限り処理を並列化して性能向上
- **エラー耐性**: 個別コンポーネントの失敗がパイプライン全体を停止させない
- **拡張性**: トレイトベースの設計で新しいコンポーネントを容易に追加可能

**パイプラインステージ:**
```rust
pub enum PipelineStage {
    QueryHydrator,        // クエリの補完
    Source,               // 候補取得
    Hydrator,             // データ補完
    PostSelectionHydrator, // 選択後のデータ補完
    Filter,               // フィルタリング
    PostSelectionFilter,  // 選択後のフィルタリング
    Scorer,               // スコアリング
}
```

**パイプライン実行フロー:**
```
Query → QueryHydrator → Sources → Hydrators → Filters
      → Scorers → Selector → PostSelectionHydrators
      → PostSelectionFilters → SideEffects → Result
```

### 2.2 トレイト定義

#### 2.2.1 Source（候補取得）

Source は外部システムから候補を取得するコンポーネントである。

```rust
#[async_trait]
pub trait Source<Q, C>: Any + Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// このソースを有効にするか判定
    fn enable(&self, _query: &Q) -> bool {
        true
    }

    /// 候補を取得
    async fn get_candidates(&self, query: &Q) -> Result<Vec<C>, String>;

    /// ログ/メトリクス用の名前
    fn name(&self) -> &'static str;
}
```

**実行特性:**
- 全ての有効な Source が並列実行
- 各 Source の結果は収集され結合
- エラー発生時はログを記録し継続

**実装例（ThunderSource）:**
```rust
// Thunder からインネットワーク投稿を取得
let thunder_source = Box::new(ThunderSource { thunder_client });
```

#### 2.2.2 Hydrator（データ補完）

Hydrator は候補に追加データを付与するコンポーネントである。

```rust
#[async_trait]
pub trait Hydrator<Q, C>: Any + Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// このハイドレーターを有効にするか判定
    fn enable(&self, _query: &Q) -> bool {
        true
    }

    /// 候補にデータを補完
    /// 重要: 返却ベクターは入力と同じ順序・同じ候補数を維持すること
    async fn hydrate(&self, query: &Q, candidates: &[C]) -> Result<Vec<C>, String>;

    /// 単一候補にハイドレート結果を適用
    fn update(&self, candidate: &mut C, hydrated: C);

    /// 全候補にハイドレート結果を適用
    fn update_all(&self, candidates: &mut [C], hydrated: Vec<C>) {
        for (c, h) in candidates.iter_mut().zip(hydrated) {
            self.update(c, h);
        }
    }

    fn name(&self) -> &'static str;
}
```

**実行特性:**
- 全ての有効な Hydrator が並列実行
- 結果の長さが一致しない場合はスキップ
- 各 Hydrator は担当フィールドのみを更新

**実装例:**
```rust
// 各種ハイドレーターの構成
let hydrators: Vec<Box<dyn Hydrator<ScoredPostsQuery, PostCandidate>>> = vec![
    Box::new(InNetworkCandidateHydrator),
    Box::new(CoreDataCandidateHydrator::new(tes_client.clone()).await),
    Box::new(VideoDurationCandidateHydrator::new(tes_client.clone()).await),
    Box::new(SubscriptionHydrator::new(tes_client.clone()).await),
    Box::new(GizmoduckCandidateHydrator::new(gizmoduck_client).await),
];
```

#### 2.2.3 Filter（フィルタリング）

Filter は候補を条件に基づいて保持/除外に分類するコンポーネントである。

```rust
pub struct FilterResult<C> {
    pub kept: Vec<C>,    // 保持された候補
    pub removed: Vec<C>, // 除外された候補
}

#[async_trait]
pub trait Filter<Q, C>: Any + Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// このフィルターを有効にするか判定
    fn enable(&self, _query: &Q) -> bool {
        true
    }

    /// 候補をフィルタリング
    async fn filter(&self, query: &Q, candidates: Vec<C>) -> Result<FilterResult<C>, String>;

    fn name(&self) -> &'static str;
}
```

**実行特性:**
- Filter は順次実行（前の結果を次に渡す）
- エラー発生時は元の候補リストを保持して継続
- 除外された候補は別途追跡

**実装例:**
```rust
// 各種フィルターの構成
let filters: Vec<Box<dyn Filter<ScoredPostsQuery, PostCandidate>>> = vec![
    Box::new(DropDuplicatesFilter),
    Box::new(CoreDataHydrationFilter),
    Box::new(AgeFilter::new(Duration::from_secs(params::MAX_POST_AGE))),
    Box::new(SelfTweetFilter),
    Box::new(RetweetDeduplicationFilter),
    Box::new(IneligibleSubscriptionFilter),
    Box::new(PreviouslySeenPostsFilter),
    Box::new(PreviouslyServedPostsFilter),
    Box::new(MutedKeywordFilter::new()),
    Box::new(AuthorSocialgraphFilter),
];
```

#### 2.2.4 Scorer（スコアリング）

Scorer は候補にスコアを付与するコンポーネントである。

```rust
#[async_trait]
pub trait Scorer<Q, C>: Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// このスコアラーを有効にするか判定
    fn enable(&self, _query: &Q) -> bool {
        true
    }

    /// 候補にスコアを付与
    /// 重要: 返却ベクターは入力と同じ順序・同じ候補数を維持すること
    async fn score(&self, query: &Q, candidates: &[C]) -> Result<Vec<C>, String>;

    /// 単一候補にスコア結果を適用
    fn update(&self, candidate: &mut C, scored: C);

    /// 全候補にスコア結果を適用
    fn update_all(&self, candidates: &mut [C], scored: Vec<C>) {
        for (c, s) in candidates.iter_mut().zip(scored) {
            self.update(c, s);
        }
    }

    fn name(&self) -> &'static str;
}
```

**実行特性:**
- Scorer は順次実行
- 複数のスコアを組み合わせて最終スコアを算出可能

**実装例:**
```rust
// 各種スコアラーの構成
let scorers: Vec<Box<dyn Scorer<ScoredPostsQuery, PostCandidate>>> = vec![
    Box::new(PhoenixScorer { phoenix_client }),  // ML予測スコア
    Box::new(WeightedScorer),                     // 重み付けスコア
    Box::new(AuthorDiversityScorer::default()),  // 著者多様性スコア
    Box::new(OONScorer),                          // OONスコア
];
```

#### 2.2.5 Selector（選択）

Selector は最終的な候補選択を行うコンポーネントである。

```rust
pub trait Selector<Q, C>: Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// デフォルト選択: ソートと切り詰め
    fn select(&self, _query: &Q, candidates: Vec<C>) -> Vec<C> {
        let mut sorted = self.sort(candidates);
        if let Some(limit) = self.size() {
            sorted.truncate(limit);
        }
        sorted
    }

    /// このセレクターを有効にするか判定
    fn enable(&self, _query: &Q) -> bool {
        true
    }

    /// 候補からスコアを抽出
    fn score(&self, candidate: &C) -> f64;

    /// 候補をスコア降順でソート
    fn sort(&self, candidates: Vec<C>) -> Vec<C> {
        let mut sorted = candidates;
        sorted.sort_by(|a, b| {
            self.score(b)
                .partial_cmp(&self.score(a))
                .unwrap_or(std::cmp::Ordering::Equal)
        });
        sorted
    }

    /// 選択する候補数（None = 制限なし）
    fn size(&self) -> Option<usize> {
        None
    }

    fn name(&self) -> &'static str;
}
```

**実行特性:**
- Selector はスコアに基づいて候補をソート
- 上位N件を選択

#### 2.2.6 SideEffect（副作用処理）

SideEffect はパイプライン結果に影響を与えない非同期処理を行うコンポーネントである。

```rust
#[derive(Clone)]
pub struct SideEffectInput<Q, C> {
    pub query: Arc<Q>,
    pub selected_candidates: Vec<C>,
}

#[async_trait]
pub trait SideEffect<Q, C>: Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// この副作用を有効にするか判定
    fn enable(&self, _query: Arc<Q>) -> bool {
        true
    }

    /// 副作用を実行
    async fn run(&self, input: Arc<SideEffectInput<Q, C>>) -> Result<(), String>;

    fn name(&self) -> &'static str;
}
```

**実行特性:**
- SideEffect は別タスクで並列実行
- パイプライン結果の返却をブロックしない
- キャッシュ更新、ログ記録、メトリクス送信などに使用

**実装例:**
```rust
// リクエスト情報のキャッシュ保存
let side_effects: Arc<Vec<Box<dyn SideEffect<ScoredPostsQuery, PostCandidate>>>> =
    Arc::new(vec![Box::new(CacheRequestInfoSideEffect { strato_client })]);
```

### 2.3 並列実行とエラーハンドリング

#### 並列実行パターン

**QueryHydrator の並列実行:**
```rust
async fn hydrate_query(&self, query: Q) -> Q {
    let hydrators: Vec<_> = self.query_hydrators()
        .iter()
        .filter(|h| h.enable(&query))
        .collect();

    // 全ハイドレーターを並列実行
    let hydrate_futures = hydrators.iter().map(|h| h.hydrate(&query));
    let results = join_all(hydrate_futures).await;

    // 結果をマージ
    let mut hydrated_query = query;
    for (hydrator, result) in hydrators.iter().zip(results) {
        match result {
            Ok(hydrated) => hydrator.update(&mut hydrated_query, hydrated),
            Err(err) => error!("QueryHydrator {} failed: {}", hydrator.name(), err),
        }
    }
    hydrated_query
}
```

**Source の並列実行:**
```rust
async fn fetch_candidates(&self, query: &Q) -> Vec<C> {
    let sources: Vec<_> = self.sources()
        .iter()
        .filter(|s| s.enable(query))
        .collect();

    // 全ソースを並列実行
    let source_futures = sources.iter().map(|s| s.get_candidates(query));
    let results = join_all(source_futures).await;

    // 結果を収集
    let mut collected = Vec::new();
    for (source, result) in sources.iter().zip(results) {
        match result {
            Ok(mut candidates) => collected.append(&mut candidates),
            Err(err) => error!("Source {} failed: {}", source.name(), err),
        }
    }
    collected
}
```

#### エラーハンドリング戦略

1. **継続戦略**: コンポーネントエラー時も他のコンポーネントは処理続行
2. **ログ記録**: 全エラーは request_id、ステージ、コンポーネント名と共にログ
3. **フォールバック**: Filter エラー時は元の候補リストを保持
4. **長さ検証**: Hydrator/Scorer の結果長が不一致の場合はスキップ

```rust
// エラー時のフォールバック例（Filter）
match filter.filter(query, candidates).await {
    Ok(result) => {
        candidates = result.kept;
        all_removed.extend(result.removed);
    }
    Err(err) => {
        error!("Filter {} failed: {}", filter.name(), err);
        candidates = backup;  // 元のリストを復元
    }
}
```

### 2.4 パイプライン構成のカスタマイズ

CandidatePipeline トレイトを実装することで、カスタムパイプラインを構築できる。

**トレイト定義:**
```rust
#[async_trait]
pub trait CandidatePipeline<Q, C>: Send + Sync
where
    Q: HasRequestId + Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    fn query_hydrators(&self) -> &[Box<dyn QueryHydrator<Q>>];
    fn sources(&self) -> &[Box<dyn Source<Q, C>>];
    fn hydrators(&self) -> &[Box<dyn Hydrator<Q, C>>];
    fn filters(&self) -> &[Box<dyn Filter<Q, C>>];
    fn scorers(&self) -> &[Box<dyn Scorer<Q, C>>];
    fn selector(&self) -> &dyn Selector<Q, C>;
    fn post_selection_hydrators(&self) -> &[Box<dyn Hydrator<Q, C>>];
    fn post_selection_filters(&self) -> &[Box<dyn Filter<Q, C>>];
    fn side_effects(&self) -> Arc<Vec<Box<dyn SideEffect<Q, C>>>>;
    fn result_size(&self) -> usize;
}
```

**実装例（PhoenixCandidatePipeline）:**
```rust
pub struct PhoenixCandidatePipeline {
    query_hydrators: Vec<Box<dyn QueryHydrator<ScoredPostsQuery>>>,
    sources: Vec<Box<dyn Source<ScoredPostsQuery, PostCandidate>>>,
    hydrators: Vec<Box<dyn Hydrator<ScoredPostsQuery, PostCandidate>>>,
    filters: Vec<Box<dyn Filter<ScoredPostsQuery, PostCandidate>>>,
    scorers: Vec<Box<dyn Scorer<ScoredPostsQuery, PostCandidate>>>,
    selector: TopKScoreSelector,
    post_selection_hydrators: Vec<Box<dyn Hydrator<ScoredPostsQuery, PostCandidate>>>,
    post_selection_filters: Vec<Box<dyn Filter<ScoredPostsQuery, PostCandidate>>>,
    side_effects: Arc<Vec<Box<dyn SideEffect<ScoredPostsQuery, PostCandidate>>>>,
}
```

**パイプライン実行:**
```rust
async fn execute(&self, query: Q) -> PipelineResult<Q, C> {
    // 1. クエリ補完
    let hydrated_query = self.hydrate_query(query).await;

    // 2. 候補取得
    let candidates = self.fetch_candidates(&hydrated_query).await;

    // 3. データ補完
    let hydrated_candidates = self.hydrate(&hydrated_query, candidates).await;

    // 4. フィルタリング
    let (kept_candidates, filtered_candidates) =
        self.filter(&hydrated_query, hydrated_candidates).await;

    // 5. スコアリング
    let scored_candidates = self.score(&hydrated_query, kept_candidates).await;

    // 6. 選択
    let selected_candidates = self.select(&hydrated_query, scored_candidates);

    // 7. 選択後処理
    let post_hydrated = self.hydrate_post_selection(&hydrated_query, selected_candidates).await;
    let (final_candidates, _) = self.filter_post_selection(&hydrated_query, post_hydrated).await;

    // 8. 結果サイズ制限
    final_candidates.truncate(self.result_size());

    // 9. 副作用実行（非同期、結果待機なし）
    self.run_side_effects(input);

    PipelineResult { ... }
}
```

**パイプライン結果:**
```rust
pub struct PipelineResult<Q, C> {
    pub retrieved_candidates: Vec<C>,   // 取得された全候補
    pub filtered_candidates: Vec<C>,     // 除外された候補
    pub selected_candidates: Vec<C>,     // 最終選択された候補
    pub query: Arc<Q>,                   // 補完後のクエリ
}
```

---

## 3. Thunder と Candidate Pipeline の統合

Thunder は Candidate Pipeline の Source として統合される。

**ThunderSource の役割:**
1. Thunder gRPC クライアントを通じてインネットワーク投稿を取得
2. 取得した投稿を PostCandidate に変換
3. Home Mixer の候補プールに追加

**統合フロー:**
```
User Request → ScoredPostsQuery
    ↓
PhoenixCandidatePipeline.execute()
    ↓
Sources (並列実行):
    ├── PhoenixSource (OON候補)
    └── ThunderSource (インネットワーク候補) ← Thunder
    ↓
[候補結合] → Hydrators → Filters → Scorers → Selector
    ↓
Final Timeline
```

この統合により、フォロー中ユーザーからの最新投稿と、アルゴリズムで発見されたアウトオブネットワークコンテンツが適切にブレンドされ、パーソナライズされたホームタイムラインが生成される。

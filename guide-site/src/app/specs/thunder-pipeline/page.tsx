'use client';

import Link from 'next/link';
import { ChevronLeftIcon, BoltIcon, CircleStackIcon, ShieldCheckIcon, CommandLineIcon, CubeTransparentIcon, SignalIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

// セクションコンポーネント
function Section({ id, title, children, className }: { id?: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("mb-12", className)}>
      <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 pl-3 border-l-4 border-primary dark:border-blue-500">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
        {children}
      </div>
    </section>
  );
}

// サブセクションコンポーネント
function SubSection({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// コードブロックコンポーネント
function CodeBlock({ children, title, language }: { children: string; title?: string; language?: string }) {
  return (
    <div className="my-6 border border-border rounded-lg overflow-hidden">
      {(title || language) && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 border-b border-border flex justify-between items-center">
          <span>{title}</span>
          {language && <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">{language}</span>}
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-slate-800 text-slate-200">
        <code className="text-sm whitespace-pre font-mono">{children}</code>
      </pre>
    </div>
  );
}

// テーブルコンポーネント
function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="bg-primary dark:bg-blue-800 text-white px-4 py-2 text-left font-medium border border-border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 border border-border">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 図表ボックスコンポーネント
function FigureBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-8 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
        <span className="text-sm font-bold text-primary dark:text-blue-300">{title}</span>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">{children}</div>
    </div>
  );
}

// インフォボックスコンポーネント
function InfoBox({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'tip'; title?: string; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-300',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-300',
    tip: 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300',
  };

  return (
    <div className={cn("border-l-4 p-4 my-6 rounded-r-lg", styles[type])}>
      {title && <p className="font-bold mb-2">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  );
}

// 特徴カードコンポーネント
function FeatureCard({ icon: Icon, title, description, color = 'blue' }: {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: 'blue' | 'amber' | 'green' | 'purple';
}) {
  const colorStyles = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg", colorStyles[color])}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}


// 目次コンポーネント
function TableOfContents() {
  const sections = [
    { id: 'thunder', title: '1. Thunder（インネットワーク投稿ストア）' },
    { id: 'candidate-pipeline', title: '2. Candidate Pipeline Framework' },
    { id: 'integration', title: '3. Thunder と Candidate Pipeline の統合' },
  ];

  return (
    <nav className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-border">
      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">目次</h3>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ThunderPipelineSpecPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>目次に戻る</span>
          </Link>
          <span className="text-sm font-medium text-primary dark:text-blue-300 flex items-center gap-2">
            <BoltIcon className="w-4 h-4" />
            仕様書
          </span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* タイトルセクション */}
        <div className="mb-12 pb-8 border-b-2 border-primary dark:border-blue-600">
          <div className="flex items-center gap-2 mb-2">
            <BoltIcon className="w-6 h-6 text-primary dark:text-blue-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Technical Specification</span>
          </div>
          <h1 className="text-3xl font-bold text-primary dark:text-blue-300 mb-3">
            Thunder & Candidate Pipeline 仕様書
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            X (Twitter) アルゴリズムにおける Thunder（インネットワーク投稿ストア）と Candidate Pipeline Framework の詳細仕様です。
          </p>
        </div>

        {/* 目次 */}
        <TableOfContents />

        {/* 1. Thunder */}
        <Section id="thunder" title="1. Thunder（インネットワーク投稿ストア）">
          <SubSection title="1.1 概要と目的">
            <p>
              Thunder は、ユーザーがフォローしているアカウント（インネットワーク）からの投稿をリアルタイムで保持・提供するための高性能インメモリストアです。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <FeatureCard
                icon={BoltIcon}
                title="高速アクセス"
                description="フォロー中ユーザーの最新投稿への高速アクセスを実現"
                color="amber"
              />
              <FeatureCard
                icon={CircleStackIcon}
                title="インネットワーク候補提供"
                description="ホームタイムラインにおけるインネットワーク候補の即座提供"
                color="blue"
              />
              <FeatureCard
                icon={SignalIcon}
                title="リアルタイム処理"
                description="Kafka からのリアルタイムイベント処理"
                color="green"
              />
              <FeatureCard
                icon={CubeTransparentIcon}
                title="投稿タイプ別管理"
                description="オリジナル、リプライ/リツイート、動画の効率的な管理"
                color="purple"
              />
            </div>

            <InfoBox type="info" title="アーキテクチャ上の位置づけ">
              Thunder は Home Mixer の候補パイプラインにおいて <code>ThunderSource</code> として統合され、
              フォロー中ユーザーからの投稿候補を提供する主要なデータソースの一つです。
            </InfoBox>
          </SubSection>

          <SubSection title="1.2 Kafka からのリアルタイムインジェスト">
            <p>
              Thunder は Kafka からツイートイベントを消費し、リアルタイムでインメモリストアを更新します。
            </p>

            <FigureBox title="イベント処理フロー">
              <div className="flex items-center justify-between text-sm font-mono overflow-x-auto">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">Kafka (tweet_events)</div>
                <div className="flex-shrink-0 px-2">→</div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">Consumer</div>
                <div className="flex-shrink-0 px-2">→</div>
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded">Deserializer</div>
                <div className="flex-shrink-0 px-2">→</div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">PostStore</div>
              </div>
            </FigureBox>

            <p className="font-medium mt-4 mb-2">サポートされるイベントタイプ:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code>TweetCreateEvent</code>: 新規投稿の作成</li>
              <li><code>TweetDeleteEvent</code>: 投稿の削除</li>
              <li><code>QuotedTweetDeleteEvent</code>: 引用ツイートの削除</li>
            </ul>

            <CodeBlock language="rust" title="マルチスレッド処理">{`// パーティション分散によるスレッド処理
let num_partitions = args.tweet_events_num_partitions;
let kafka_num_threads = args.kafka_num_threads;
let partitions_per_thread = num_partitions.div_ceil(kafka_num_threads);`}</CodeBlock>

            <p>各スレッドは割り当てられたパーティションのサブセットを処理し、以下の機能を持ちます:</p>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>バッチ処理（設定可能なバッチサイズ）</li>
              <li>パーティションラグ監視</li>
              <li>エラー時の自動リトライ</li>
            </ul>

            <CodeBlock language="rust" title="メッセージバッチ処理">{`// バッチが一定サイズに達したら処理を実行
if message_buffer.len() >= batch_size {
    let messages = std::mem::take(&mut message_buffer);
    process_message_batch(messages, batch_num, producer_clone, post_retention_sec).await?;
    consumer.write().await.commit_offsets()?;
}`}</CodeBlock>

            <CodeBlock language="rust" title="初期化フェーズ">{`// Kafka catchup 完了を待機
for _ in 0..args.kafka_num_threads {
    rx.recv().await;
}
post_store.finalize_init().await?;`}</CodeBlock>
          </SubSection>

          <SubSection title="1.3 ユーザー別投稿ストア構造">
            <p>
              PostStore は DashMap を使用した並行安全なインメモリデータ構造です。
            </p>

            <CodeBlock language="rust" title="PostStore データ構造">{`pub struct PostStore {
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
}`}</CodeBlock>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">TinyPost（軽量参照）</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ユーザータイムラインには最小限の参照情報のみを保持
                </p>
                <CodeBlock language="rust">{`pub struct TinyPost {
    pub post_id: i64,
    pub created_at: i64,
}`}</CodeBlock>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">LightPost（完全な投稿データ）</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  投稿の詳細情報を保持（protobuf で定義）:
                </p>
                <ul className="text-xs space-y-1 mt-2 text-gray-600 dark:text-gray-400">
                  <li>- post_id, author_id, created_at</li>
                  <li>- in_reply_to_post_id/user_id</li>
                  <li>- is_retweet, is_reply</li>
                  <li>- source_post_id/user_id</li>
                  <li>- has_video, conversation_id</li>
                </ul>
              </div>
            </div>
          </SubSection>

          <SubSection title="1.4 投稿タイプ（オリジナル、リプライ/リツイート、動画）">
            <p>Thunder は投稿を3つのカテゴリに分類して管理します:</p>

            <div className="space-y-4 mt-4">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-300">1. オリジナル投稿 (original_posts_by_user)</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  リプライでもリツイートでもない投稿
                </p>
                <code className="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded mt-2 inline-block">
                  判定: !post.is_reply && !post.is_retweet
                </code>
              </div>

              <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 rounded-r-lg">
                <h4 className="font-bold text-amber-800 dark:text-amber-300">2. セカンダリ投稿 (secondary_posts_by_user)</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  リプライまたはリツイート。追加のフィルタリングロジック適用（フォロー中ユーザーへのリプライを優先）
                </p>
              </div>

              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg">
                <h4 className="font-bold text-purple-800 dark:text-purple-300">3. 動画投稿 (video_posts_by_user)</h4>
                <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                  動画コンテンツを含む投稿。最小動画長の条件あり、リツイートの元投稿の動画も考慮、リプライは除外
                </p>
              </div>
            </div>

            <CodeBlock language="rust" title="投稿分類ロジック">{`// 投稿挿入時の分類
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
}`}</CodeBlock>

            <Table
              headers={['制限項目', '説明']}
              rows={[
                ['MAX_ORIGINAL_POSTS_PER_AUTHOR', 'オリジナル投稿の最大数'],
                ['MAX_REPLY_POSTS_PER_AUTHOR', 'リプライ/リツイートの最大数'],
                ['MAX_VIDEO_POSTS_PER_AUTHOR', '動画投稿の最大数'],
                ['MAX_TINY_POSTS_PER_USER_SCAN', 'スキャン時の最大参照数'],
              ]}
            />
          </SubSection>

          <SubSection title="1.5 保持期間と自動トリム">
            <p>Thunder は設定可能な保持期間に基づいて古い投稿を自動的に削除します。</p>

            <CodeBlock language="rust" title="保持期間の設定">{`// デフォルト: 2日間
impl Default for PostStore {
    fn default() -> Self {
        Self::new(2 * 24 * 60 * 60, 0)  // 2日 = 172,800秒
    }
}`}</CodeBlock>

            <CodeBlock language="rust" title="自動トリムタスク">{`// バックグラウンドで定期的に古い投稿を削除
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
}`}</CodeBlock>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium mb-2">トリム処理の詳細:</p>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>- 各ユーザーのタイムラインを走査</li>
                <li>- 保持期間を超えた投稿を VecDeque の先頭から削除</li>
                <li>- 空になったユーザーエントリを削除</li>
                <li>- メモリ効率化のためキャパシティを縮小</li>
              </ul>
            </div>
          </SubSection>

          <SubSection title="1.6 gRPC サービス（InNetworkPostsService）">
            <p>Thunder は gRPC を通じて投稿データを提供します。</p>

            <CodeBlock language="rust" title="サービス定義">{`#[tonic::async_trait]
impl InNetworkPostsService for ThunderServiceImpl {
    async fn get_in_network_posts(
        &self,
        request: Request<GetInNetworkPostsRequest>,
    ) -> Result<Response<GetInNetworkPostsResponse>, Status>
}`}</CodeBlock>

            <Table
              headers={['パラメータ', '説明']}
              rows={[
                ['user_id', 'リクエストユーザーID'],
                ['following_user_ids', 'フォロー中ユーザーIDリスト'],
                ['exclude_tweet_ids', '除外する投稿IDリスト'],
                ['max_results', '返却する最大投稿数'],
                ['is_video_request', '動画投稿のみを要求するフラグ'],
                ['debug', 'デバッグモードフラグ'],
              ]}
            />

            <CodeBlock language="rust" title="圧縮対応">{`pub fn server(self) -> InNetworkPostsServiceServer<Self> {
    InNetworkPostsServiceServer::new(self)
        .accept_compressed(tonic::codec::CompressionEncoding::Zstd)
        .send_compressed(tonic::codec::CompressionEncoding::Zstd)
}`}</CodeBlock>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium mb-2">統計分析とメトリクス:</p>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>- 最新投稿からの経過時間（freshness）</li>
                <li>- 投稿の時間範囲</li>
                <li>- リプライ比率</li>
                <li>- ユニーク投稿者数</li>
                <li>- 投稿者あたりの投稿数</li>
              </ul>
            </div>
          </SubSection>

          <SubSection title="1.7 負荷制御（セマフォ、同時接続制限）">
            <p>Thunder は過負荷保護のためのメカニズムを実装しています。</p>

            <CodeBlock language="rust" title="同時リクエスト制限">{`pub struct ThunderServiceImpl {
    post_store: Arc<PostStore>,
    strato_client: Arc<StratoClient>,
    /// 同時リクエスト数を制限するセマフォ
    request_semaphore: Arc<Semaphore>,
}`}</CodeBlock>

            <CodeBlock language="rust" title="リクエスト処理時の制御">{`// ノンブロッキングでセマフォ取得を試行
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
};`}</CodeBlock>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">入力リスト制限</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>- フォロー中ユーザーリストの制限</li>
                  <li>- 除外リストの制限</li>
                  <li>- MAX_INPUT_LIST_SIZE で上限設定</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">メトリクス監視</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>- IN_FLIGHT_REQUESTS: 処理中</li>
                  <li>- REJECTED_REQUESTS: 拒否数</li>
                  <li>- POST_STORE_REQUESTS: 総数</li>
                  <li>- POST_STORE_REQUEST_TIMEOUTS: タイムアウト</li>
                </ul>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* 2. Candidate Pipeline Framework */}
        <Section id="candidate-pipeline" title="2. Candidate Pipeline Framework">
          <SubSection title="2.1 概要と設計思想">
            <p>
              Candidate Pipeline Framework は、推薦候補の取得から最終選択までの処理を構造化されたパイプラインとして実装するためのフレームワークです。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <FeatureCard
                icon={CubeTransparentIcon}
                title="モジュラー構成"
                description="各処理ステージが独立したコンポーネント"
                color="blue"
              />
              <FeatureCard
                icon={BoltIcon}
                title="並列実行"
                description="可能な限り処理を並列化して性能向上"
                color="amber"
              />
              <FeatureCard
                icon={ShieldCheckIcon}
                title="エラー耐性"
                description="個別コンポーネントの失敗がパイプライン全体を停止させない"
                color="green"
              />
              <FeatureCard
                icon={CommandLineIcon}
                title="拡張性"
                description="トレイトベースの設計で新しいコンポーネントを容易に追加可能"
                color="purple"
              />
            </div>

            <FigureBox title="パイプラインステージ">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { stage: '1', title: 'QueryHydrator', desc: 'クエリの補完' },
                  { stage: '2', title: 'Source', desc: '候補取得' },
                  { stage: '3', title: 'Hydrator', desc: 'データ補完' },
                  { stage: '4', title: 'Filter', desc: 'フィルタリング' },
                  { stage: '5', title: 'Scorer', desc: 'スコアリング' },
                  { stage: '6', title: 'Selector', desc: '最終選択' },
                  { stage: '7', title: 'PostSelectionHydrator', desc: '選択後のデータ補完' },
                  { stage: '8', title: 'PostSelectionFilter', desc: '選択後のフィルタリング' },
                ].map((item) => (
                  <div key={item.stage} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="w-6 h-6 rounded-full bg-primary dark:bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {item.stage}
                    </span>
                    <div>
                      <span className="font-medium text-sm">{item.title}</span>
                      <span className="text-xs text-gray-500 ml-2">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FigureBox>

            <FigureBox title="パイプライン実行フロー">
              <div className="font-mono text-xs overflow-x-auto">
                <p className="text-center">
                  Query → QueryHydrator → Sources → Hydrators → Filters
                </p>
                <p className="text-center mt-1">
                  → Scorers → Selector → PostSelectionHydrators
                </p>
                <p className="text-center mt-1">
                  → PostSelectionFilters → SideEffects → Result
                </p>
              </div>
            </FigureBox>
          </SubSection>

          <SubSection title="2.2 トレイト定義">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs">1</span>
                  Source（候補取得）
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  外部システムから候補を取得するコンポーネント。全ての有効な Source が並列実行され、エラー発生時はログを記録し継続します。
                </p>
                <CodeBlock language="rust" title="Source トレイト">{`#[async_trait]
pub trait Source<Q, C>: Any + Send + Sync
where
    Q: Clone + Send + Sync + 'static,
    C: Clone + Send + Sync + 'static,
{
    /// このソースを有効にするか判定
    fn enable(&self, _query: &Q) -> bool { true }

    /// 候補を取得
    async fn get_candidates(&self, query: &Q) -> Result<Vec<C>, String>;

    /// ログ/メトリクス用の名前
    fn name(&self) -> &'static str;
}`}</CodeBlock>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-xs">2</span>
                  Hydrator（データ補完）
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  候補に追加データを付与するコンポーネント。全ての有効な Hydrator が並列実行されます。
                </p>
                <CodeBlock language="rust" title="Hydrator トレイト">{`#[async_trait]
pub trait Hydrator<Q, C>: Any + Send + Sync
{
    fn enable(&self, _query: &Q) -> bool { true }

    /// 候補にデータを補完
    /// 重要: 返却ベクターは入力と同じ順序・同じ候補数を維持すること
    async fn hydrate(&self, query: &Q, candidates: &[C]) -> Result<Vec<C>, String>;

    /// 単一候補にハイドレート結果を適用
    fn update(&self, candidate: &mut C, hydrated: C);

    fn name(&self) -> &'static str;
}`}</CodeBlock>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded text-xs">3</span>
                  Filter（フィルタリング）
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  候補を条件に基づいて保持/除外に分類するコンポーネント。Filter は順次実行されます。
                </p>
                <CodeBlock language="rust" title="Filter トレイト">{`pub struct FilterResult<C> {
    pub kept: Vec<C>,    // 保持された候補
    pub removed: Vec<C>, // 除外された候補
}

#[async_trait]
pub trait Filter<Q, C>: Any + Send + Sync
{
    fn enable(&self, _query: &Q) -> bool { true }

    /// 候補をフィルタリング
    async fn filter(&self, query: &Q, candidates: Vec<C>) -> Result<FilterResult<C>, String>;

    fn name(&self) -> &'static str;
}`}</CodeBlock>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs">4</span>
                  Scorer（スコアリング）
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  候補にスコアを付与するコンポーネント。Scorer は順次実行されます。
                </p>
                <CodeBlock language="rust" title="Scorer トレイト">{`#[async_trait]
pub trait Scorer<Q, C>: Send + Sync
{
    fn enable(&self, _query: &Q) -> bool { true }

    /// 候補にスコアを付与
    async fn score(&self, query: &Q, candidates: &[C]) -> Result<Vec<C>, String>;

    fn update(&self, candidate: &mut C, scored: C);

    fn name(&self) -> &'static str;
}`}</CodeBlock>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs">5</span>
                  Selector（選択）
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  最終的な候補選択を行うコンポーネント。スコアに基づいてソートし上位N件を選択。
                </p>
                <CodeBlock language="rust" title="Selector トレイト">{`pub trait Selector<Q, C>: Send + Sync
{
    fn select(&self, _query: &Q, candidates: Vec<C>) -> Vec<C> {
        let mut sorted = self.sort(candidates);
        if let Some(limit) = self.size() {
            sorted.truncate(limit);
        }
        sorted
    }

    fn enable(&self, _query: &Q) -> bool { true }
    fn score(&self, candidate: &C) -> f64;
    fn sort(&self, candidates: Vec<C>) -> Vec<C>;
    fn size(&self) -> Option<usize> { None }
    fn name(&self) -> &'static str;
}`}</CodeBlock>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">6</span>
                  SideEffect（副作用処理）
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  パイプライン結果に影響を与えない非同期処理。別タスクで並列実行され、結果の返却をブロックしません。
                </p>
                <CodeBlock language="rust" title="SideEffect トレイト">{`#[async_trait]
pub trait SideEffect<Q, C>: Send + Sync
{
    fn enable(&self, _query: Arc<Q>) -> bool { true }

    /// 副作用を実行
    async fn run(&self, input: Arc<SideEffectInput<Q, C>>) -> Result<(), String>;

    fn name(&self) -> &'static str;
}`}</CodeBlock>
              </div>
            </div>
          </SubSection>

          <SubSection title="2.3 並列実行とエラーハンドリング">
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="p-4 border border-green-300 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">並列実行パターン</h4>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>- QueryHydrator: 全て並列実行</li>
                  <li>- Source: 全て並列実行</li>
                  <li>- Hydrator: 全て並列実行</li>
                  <li>- Filter: 順次実行</li>
                  <li>- Scorer: 順次実行</li>
                  <li>- SideEffect: 別タスクで並列</li>
                </ul>
              </div>
              <div className="p-4 border border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">エラーハンドリング戦略</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                  <li>- 継続戦略: エラー時も他は続行</li>
                  <li>- ログ記録: request_id付きで記録</li>
                  <li>- フォールバック: 元リストを保持</li>
                  <li>- 長さ検証: 不一致時はスキップ</li>
                </ul>
              </div>
            </div>

            <CodeBlock language="rust" title="Source の並列実行">{`async fn fetch_candidates(&self, query: &Q) -> Vec<C> {
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
}`}</CodeBlock>

            <CodeBlock language="rust" title="Filter のエラー時フォールバック">{`// エラー時のフォールバック例
match filter.filter(query, candidates).await {
    Ok(result) => {
        candidates = result.kept;
        all_removed.extend(result.removed);
    }
    Err(err) => {
        error!("Filter {} failed: {}", filter.name(), err);
        candidates = backup;  // 元のリストを復元
    }
}`}</CodeBlock>
          </SubSection>

          <SubSection title="2.4 パイプライン構成のカスタマイズ">
            <p>
              CandidatePipeline トレイトを実装することで、カスタムパイプラインを構築できます。
            </p>

            <CodeBlock language="rust" title="CandidatePipeline トレイト">{`#[async_trait]
pub trait CandidatePipeline<Q, C>: Send + Sync
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
}`}</CodeBlock>

            <CodeBlock language="rust" title="パイプライン実行の流れ">{`async fn execute(&self, query: Q) -> PipelineResult<Q, C> {
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
}`}</CodeBlock>

            <CodeBlock language="rust" title="PipelineResult">{`pub struct PipelineResult<Q, C> {
    pub retrieved_candidates: Vec<C>,   // 取得された全候補
    pub filtered_candidates: Vec<C>,     // 除外された候補
    pub selected_candidates: Vec<C>,     // 最終選択された候補
    pub query: Arc<Q>,                   // 補完後のクエリ
}`}</CodeBlock>
          </SubSection>
        </Section>

        {/* 3. Thunder と Candidate Pipeline の統合 */}
        <Section id="integration" title="3. Thunder と Candidate Pipeline の統合">
          <p>
            Thunder は Candidate Pipeline の Source として統合されます。
          </p>

          <div className="space-y-4 mt-6">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">ThunderSource の役割</h4>
              <ol className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Thunder gRPC クライアントを通じてインネットワーク投稿を取得</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>取得した投稿を PostCandidate に変換</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Home Mixer の候補プールに追加</span>
                </li>
              </ol>
            </div>
          </div>

          <FigureBox title="統合フロー">
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                User Request → ScoredPostsQuery
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-gray-400"></div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded text-center border border-blue-300 dark:border-blue-700">
                PhoenixCandidatePipeline.execute()
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-gray-400"></div>
              </div>
              <div className="p-4 border border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <p className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-center">Sources（並列実行）</p>
                <div className="flex justify-center gap-4">
                  <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded text-center">
                    <p className="font-medium">PhoenixSource</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">OON候補</p>
                  </div>
                  <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded text-center border-2 border-amber-500">
                    <p className="font-medium">ThunderSource</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">インネットワーク候補</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-gray-400"></div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded text-center border border-green-300 dark:border-green-700">
                [候補結合] → Hydrators → Filters → Scorers → Selector
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-gray-400"></div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded text-center border border-purple-300 dark:border-purple-700 font-medium">
                Final Timeline
              </div>
            </div>
          </FigureBox>

          <InfoBox type="tip" title="パーソナライズされたホームタイムライン">
            この統合により、フォロー中ユーザーからの最新投稿と、アルゴリズムで発見されたアウトオブネットワークコンテンツが適切にブレンドされ、パーソナライズされたホームタイムラインが生成されます。
          </InfoBox>
        </Section>

        {/* 関連ドキュメント */}
        <Section title="関連ドキュメント">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { href: '/specs/overview', title: 'システム全体概要' },
              { href: '/specs/filtering', title: 'フィルタリングシステム仕様' },
              { href: '/specs/scoring', title: 'スコアリングシステム仕様' },
              { href: '/specs/phoenix-ml', title: 'Phoenix MLモデル仕様' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-primary dark:text-blue-400">{link.title}</span>
              </Link>
            ))}
          </div>
        </Section>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          X レコメンドアルゴリズム - オープンソース ドキュメント
        </div>
      </footer>
    </div>
  );
}

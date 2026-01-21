'use client';

import Link from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ServerIcon,
  CloudIcon,
  CircleStackIcon,
  ArrowDownIcon,
  FunnelIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

// セクションヘッダーコンポーネント
function SectionHeader({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
      <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
        <span className="text-blue-500 dark:text-blue-400">#</span>
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// 図表ボックスコンポーネント
function FigureBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// コードブロックコンポーネント
function CodeBlock({ children, title, language }: { children: string; title?: string; language?: string }) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <span>{title}</span>
          {language && <span className="text-gray-400">{language}</span>}
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-slate-900 text-slate-200">
        <code className="text-sm whitespace-pre font-mono">{children}</code>
      </pre>
    </div>
  );
}

// テーブルコンポーネント
function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-750'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
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

// パイプラインステージカード
function PipelineStageCard({
  stage,
  title,
  icon: Icon,
  description,
  details,
  color
}: {
  stage: number;
  title: string;
  icon: React.ElementType;
  description: string;
  details: string[];
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    cyan: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
    pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
  };

  return (
    <div className={`p-5 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
          {stage}
        </div>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      <ul className="space-y-1">
        {details.map((detail, i) => (
          <li key={i} className="text-xs text-gray-500 dark:text-gray-500 flex items-start gap-2">
            <span className="text-blue-500">-</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

// gRPCサービスカード
function GrpcServiceCard({
  name,
  port,
  rpc,
  description
}: {
  name: string;
  port: string;
  rpc: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">Port: {port}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      <code className="text-xs text-purple-600 dark:text-purple-400">RPC: {rpc}</code>
    </div>
  );
}

export default function SpecArchitecturePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/specs/overview"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>システム概要</span>
          </Link>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">仕様書</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <span>目次</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* タイトルセクション */}
        <div className="mb-12 pb-8 border-b-2 border-blue-500">
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-2">
            <DocumentTextIcon className="w-4 h-4" />
            <span>Technical Specification</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            X For You フィードアルゴリズム - アーキテクチャ仕様書
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>バージョン: 1.0</span>
            <span>|</span>
            <span>最終更新日: 2026-01-21</span>
            <span>|</span>
            <span className="text-green-600 dark:text-green-400">ステータス: 公開</span>
          </div>
        </div>

        {/* 目次 */}
        <nav className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">目次</h2>
          <ol className="grid md:grid-cols-2 gap-2 text-sm">
            {[
              { id: 'overview', title: '概要' },
              { id: 'architecture', title: 'システムアーキテクチャ全体図' },
              { id: 'pipeline', title: '8段階パイプライン詳細' },
              { id: 'grpc', title: 'gRPCサービス構成' },
              { id: 'datamodel', title: 'データモデルとスキーマ' },
              { id: 'communication', title: 'コンポーネント間の通信フロー' },
              { id: 'ml', title: 'MLモデルアーキテクチャ' },
              { id: 'operations', title: '運用考慮事項' },
            ].map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="text-blue-500 font-medium">{i + 1}.</span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* セクション 1: 概要 */}
        <section className="mb-16">
          <SectionHeader id="overview" title="概要" />

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              X For You フィードアルゴリズムは、ユーザーに最も関連性の高いコンテンツを提供する推薦システムです。
              本システムは2つのソースからコンテンツを取得し、Grokベースのトランスフォーマーモデル (Phoenix) を使用してランキングを行います。
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">主要コンポーネント</h3>
          <DataTable
            headers={['コンポーネント', '役割', '実装言語']}
            rows={[
              ['Home Mixer', 'オーケストレーション層、パイプライン実行', 'Rust'],
              ['Thunder', 'インネットワーク投稿のリアルタイム配信', 'Rust'],
              ['Phoenix', 'ML予測（検索・ランキング）', 'Python/JAX'],
              ['Candidate Pipeline', 'パイプラインフレームワーク', 'Rust'],
            ]}
          />

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">設計原則</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">手作業による特徴量エンジニアリングの排除</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">Grokトランスフォーマーがユーザーのエンゲージメント履歴から関連性を学習</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">候補間の独立性</h4>
              <p className="text-sm text-green-700 dark:text-green-400">ランキング時、候補同士はアテンションしない（スコアの一貫性とキャッシャビリティを確保）</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">ハッシュベース埋め込み</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">複数のハッシュ関数による埋め込みルックアップ</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">マルチアクション予測</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">単一の関連性スコアではなく、複数のアクション確率を予測</p>
            </div>
          </div>
        </section>

        {/* セクション 2: システムアーキテクチャ */}
        <section className="mb-16">
          <SectionHeader id="architecture" title="システムアーキテクチャ全体図" />

          <FigureBox title="高レベルアーキテクチャ">
            <div className="space-y-4">
              {/* クライアント */}
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">クライアントリクエスト (iOS / Android / Web App)</span>
              </div>

              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400" />

              {/* API Gateway */}
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                <span className="font-semibold text-slate-700 dark:text-slate-300">API Gateway Layer (認証・レート制限・ルーティング)</span>
              </div>

              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400" />

              {/* Home Mixer */}
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-4">
                  <CloudIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">HOME MIXER (オーケストレーション層)</h4>
                  <code className="text-xs text-blue-600 dark:text-blue-400">gRPC: ScoredPostsService</code>
                </div>

                {/* 8 Stages */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { num: 1, name: 'Query Hydration', color: 'bg-blue-100 dark:bg-blue-800' },
                    { num: 2, name: 'Candidate Sources', color: 'bg-green-100 dark:bg-green-800' },
                    { num: 3, name: 'Hydration', color: 'bg-amber-100 dark:bg-amber-800' },
                    { num: 4, name: 'Pre-Scoring Filters', color: 'bg-red-100 dark:bg-red-800' },
                    { num: 5, name: 'Scoring', color: 'bg-purple-100 dark:bg-purple-800' },
                    { num: 6, name: 'Selection', color: 'bg-cyan-100 dark:bg-cyan-800' },
                    { num: 7, name: 'Post-Selection', color: 'bg-pink-100 dark:bg-pink-800' },
                    { num: 8, name: 'Side Effects', color: 'bg-indigo-100 dark:bg-indigo-800' },
                  ].map((stage) => (
                    <div key={stage.num} className={`p-2 ${stage.color} rounded text-center`}>
                      <span className="font-bold">[{stage.num}]</span> {stage.name}
                    </div>
                  ))}
                </div>
              </div>

              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400" />

              {/* Response */}
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
                <span className="font-semibold text-green-700 dark:text-green-300">RANKED FEED RESPONSE (スコア付き投稿リスト返却)</span>
              </div>
            </div>
          </FigureBox>

          <FigureBox title="コンポーネント間通信図">
            <div className="space-y-4 text-sm">
              <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="font-semibold">外部クライアント / API Gateway</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-500">
                <span>gRPC (HTTP/2)</span>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center mb-4">
                  <span className="font-bold text-blue-800 dark:text-blue-300">HOME MIXER (ScoredPostsService)</span>
                </div>

                <div className="grid md:grid-cols-4 gap-3">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded text-center">
                    <span className="font-semibold text-amber-800 dark:text-amber-300 text-xs">THUNDER</span>
                    <p className="text-xs mt-1 text-amber-700 dark:text-amber-400">InNetworkPostsService</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded text-center">
                    <span className="font-semibold text-purple-800 dark:text-purple-300 text-xs">PHOENIX RETRIEVAL</span>
                    <p className="text-xs mt-1 text-purple-700 dark:text-purple-400">RetrievalService</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded text-center">
                    <span className="font-semibold text-purple-800 dark:text-purple-300 text-xs">PHOENIX RANKING</span>
                    <p className="text-xs mt-1 text-purple-700 dark:text-purple-400">PredictionService</p>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-300 text-xs">EXTERNAL</span>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Gizmoduck, TES, Strato...</p>
                  </div>
                </div>
              </div>
            </div>
          </FigureBox>
        </section>

        {/* セクション 3: 8段階パイプライン詳細 */}
        <section className="mb-16">
          <SectionHeader id="pipeline" title="8段階パイプライン詳細" subtitle="Home Mixerが実行するパイプラインの各ステージ" />

          <div className="grid md:grid-cols-2 gap-6">
            <PipelineStageCard
              stage={1}
              title="Query Hydration"
              icon={CircleStackIcon}
              description="リクエストに必要なユーザーコンテキスト情報を取得"
              details={[
                'UserActionSeqQueryHydrator: エンゲージメント履歴取得',
                'UserFeaturesQueryHydrator: フォローリスト、設定等取得',
                '両Hydratorは並列実行 (join_all)',
              ]}
              color="blue"
            />

            <PipelineStageCard
              stage={2}
              title="Candidate Sources"
              icon={ServerIcon}
              description="2つのソースから候補投稿を取得"
              details={[
                'Thunder: インネットワーク投稿 (メモリ内ストア)',
                'Phoenix Retrieval: アウトオブネットワーク (Two-Tower Model)',
                '両ソースは並列実行',
              ]}
              color="green"
            />

            <PipelineStageCard
              stage={3}
              title="Hydration"
              icon={CircleStackIcon}
              description="候補に追加データを付与"
              details={[
                'CoreDataCandidateHydrator: 投稿メタデータ',
                'GizmoduckCandidateHydrator: 著者情報',
                'VideoDurationCandidateHydrator: 動画長',
                'SubscriptionHydrator: サブスクリプション状態',
              ]}
              color="amber"
            />

            <PipelineStageCard
              stage={4}
              title="Pre-Scoring Filters"
              icon={FunnelIcon}
              description="スコアリング前に不適格な候補を除外"
              details={[
                'DropDuplicatesFilter: 重複投稿IDを除外',
                'AgeFilter: MAX_POST_AGE より古い投稿を除外',
                'MutedKeywordFilter: ミュートキーワード含む投稿を除外',
                'AuthorSocialgraphFilter: ブロック/ミュート済み著者を除外',
              ]}
              color="red"
            />

            <PipelineStageCard
              stage={5}
              title="Scoring"
              icon={SparklesIcon}
              description="ML予測を実行し、最終スコアを計算"
              details={[
                'PhoenixScorer: Grok Transformerで19種類の確率予測',
                'WeightedScorer: 重み付け合計スコア計算',
                'AuthorDiversityScorer: 同一著者スコア減衰',
                'OONScorer: Out-of-Networkスコア調整',
              ]}
              color="purple"
            />

            <PipelineStageCard
              stage={6}
              title="Selection"
              icon={ChartBarIcon}
              description="スコア順にソートし、上位K件を選択"
              details={[
                'TopKScoreSelector: 降順ソート',
                'K = params::RESULT_SIZE (設定可能)',
                'スコアが高い順にカットオフ',
              ]}
              color="cyan"
            />

            <PipelineStageCard
              stage={7}
              title="Post-Selection Processing"
              icon={ShieldCheckIcon}
              description="選択後の最終検証とフィルタリング"
              details={[
                'VFCandidateHydrator: 可視性フィルタリングデータ取得',
                'VFFilter: 削除/スパム/暴力コンテンツ除外',
                'DedupConversationFilter: 会話スレッド重複排除',
              ]}
              color="pink"
            />

            <PipelineStageCard
              stage={8}
              title="Side Effects"
              icon={CogIcon}
              description="非同期の副作用処理（キャッシュ、ロギング等）"
              details={[
                'CacheRequestInfoSideEffect: リクエスト情報キャッシュ',
                'レスポンスをブロックしない (fire-and-forget)',
                '並列実行 (tokio::spawn)',
              ]}
              color="indigo"
            />
          </div>
        </section>

        {/* セクション 4: gRPCサービス構成 */}
        <section className="mb-16">
          <SectionHeader id="grpc" title="gRPCサービス構成" />

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <GrpcServiceCard
              name="Home Mixer Service"
              port="50051"
              rpc="GetScoredPosts"
              description="メインのオーケストレーションサービス。クライアントからのリクエストを受け、パイプラインを実行"
            />
            <GrpcServiceCard
              name="Thunder Service"
              port="50052"
              rpc="GetInNetworkPosts"
              description="インネットワーク投稿を高速に取得。Zstd圧縮対応"
            />
            <GrpcServiceCard
              name="Phoenix Prediction Service"
              port="50053"
              rpc="Predict"
              description="ユーザーアクションシーケンスと候補からエンゲージメント確率を予測"
            />
            <GrpcServiceCard
              name="Phoenix Retrieval Service"
              port="50054"
              rpc="Retrieve"
              description="ユーザー特徴からTop-Kアウトオブネットワーク候補を取得"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">外部サービス依存関係</h3>
          <DataTable
            headers={['サービス名', '役割', '使用コンポーネント']}
            rows={[
              ['Gizmoduck', 'ユーザープロフィール情報', 'GizmoduckCandidateHydrator'],
              ['TES (Tweet Entity Service)', 'ツイートメタデータ', 'CoreDataCandidateHydrator等'],
              ['Strato', 'KVストア/設定', 'UserFeaturesQueryHydrator, CacheSideEffect'],
              ['SocialGraph', 'フォロー/ブロック関係', 'AuthorSocialgraphFilter'],
              ['VisibilityFiltering', 'コンテンツ可視性', 'VFFilter'],
              ['UAS', 'ユーザーアクション履歴', 'UserActionSeqQueryHydrator'],
            ]}
          />
        </section>

        {/* セクション 5: データモデル */}
        <section className="mb-16">
          <SectionHeader id="datamodel" title="データモデルとスキーマ" />

          <FigureBox title="ScoredPostsQuery (パイプライン入力クエリ)">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Core Fields</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li><code className="text-purple-600 dark:text-purple-400">user_id: i64</code> - リクエストユーザーID</li>
                  <li><code className="text-purple-600 dark:text-purple-400">client_app_id: i32</code> - クライアントアプリ識別子</li>
                  <li><code className="text-purple-600 dark:text-purple-400">country_code: String</code> - 国コード</li>
                  <li><code className="text-purple-600 dark:text-purple-400">language_code: String</code> - 言語コード</li>
                  <li><code className="text-purple-600 dark:text-purple-400">seen_ids: Vec&lt;i64&gt;</code> - 既読投稿ID</li>
                  <li><code className="text-purple-600 dark:text-purple-400">served_ids: Vec&lt;i64&gt;</code> - 既配信投稿ID</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Hydrated Fields</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li><code className="text-purple-600 dark:text-purple-400">user_action_sequence</code> - エンゲージメント履歴</li>
                  <li><code className="text-purple-600 dark:text-purple-400">user_features</code> - フォローリスト、ミュートキーワード等</li>
                  <li><code className="text-purple-600 dark:text-purple-400">request_id: String</code> - トレーシング用ID</li>
                </ul>
              </div>
            </div>
          </FigureBox>

          <FigureBox title="PhoenixScores (ML予測スコア群)">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Positive Engagement</h4>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
                  {[
                    'favorite_score', 'reply_score', 'retweet_score', 'quote_score',
                    'click_score', 'profile_click_score', 'photo_expand_score', 'vqv_score',
                    'share_score', 'dwell_score', 'follow_author_score', 'dwell_time'
                  ].map((score) => (
                    <div key={score} className="p-1 bg-green-50 dark:bg-green-900/20 rounded">
                      <code className="text-green-600 dark:text-green-400">{score}</code>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">Negative Engagement</h4>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
                  {[
                    'not_interested_score', 'block_author_score', 'mute_author_score', 'report_score'
                  ].map((score) => (
                    <div key={score} className="p-1 bg-red-50 dark:bg-red-900/20 rounded">
                      <code className="text-red-600 dark:text-red-400">{score}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FigureBox>

          <CodeBlock title="Thunder PostStore データ構造" language="Rust">
{`pub struct PostStore {
    posts: Arc<DashMap<i64, LightPost>>,                    // post_id -> 完全なポストデータ
    original_posts_by_user: Arc<DashMap<i64, VecDeque<TinyPost>>>,  // user_id -> オリジナル投稿
    secondary_posts_by_user: Arc<DashMap<i64, VecDeque<TinyPost>>>, // user_id -> リプライ/RT
    video_posts_by_user: Arc<DashMap<i64, VecDeque<TinyPost>>>,     // user_id -> 動画投稿
    deleted_posts: Arc<DashMap<i64, bool>>,                         // 削除済み投稿
    retention_seconds: u64,                                         // 保持期間
    request_timeout: Duration,                                      // リクエストタイムアウト
}`}</CodeBlock>
        </section>

        {/* セクション 6: 通信フロー */}
        <section className="mb-16">
          <SectionHeader id="communication" title="コンポーネント間の通信フロー" />

          <FigureBox title="リクエストフロー詳細">
            <div className="space-y-3 text-sm">
              {[
                { step: '1', action: 'GetScoredPosts', from: 'Client', to: 'Home Mixer', desc: 'クライアントからのフィードリクエスト' },
                { step: '2a', action: 'Query Hydration (parallel)', from: 'Home Mixer', to: 'External', desc: 'UAS, Stratoからユーザー情報取得' },
                { step: '2b', action: 'GetInNetwork + Retrieve', from: 'Home Mixer', to: 'Thunder/Phoenix', desc: '候補ソースから投稿取得 (並列)' },
                { step: '3', action: 'Hydration (parallel)', from: 'Home Mixer', to: 'TES/Gizmoduck', desc: '候補データ補完' },
                { step: '4', action: 'Pre-Scoring Filters', from: 'Home Mixer', to: 'Internal', desc: '内部処理 - 外部コール無し' },
                { step: '5', action: 'Predict', from: 'Home Mixer', to: 'Phoenix', desc: 'ML予測実行' },
                { step: '6', action: 'Selection', from: 'Home Mixer', to: 'Internal', desc: '内部処理 - ソート + 切り詰め' },
                { step: '7', action: 'VF Call', from: 'Home Mixer', to: 'VisibilityFiltering', desc: '可視性フィルタリング' },
                { step: '8', action: 'Side Effects (async)', from: 'Home Mixer', to: 'Strato', desc: 'キャッシュ更新 (非ブロック)' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{item.action}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-xs text-gray-500">{item.from} → {item.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FigureBox>
        </section>

        {/* セクション 7: MLモデルアーキテクチャ */}
        <section className="mb-16">
          <SectionHeader id="ml" title="MLモデルアーキテクチャ" />

          <FigureBox title="Phoenix Ranking Model Architecture">
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
                <span className="font-bold text-green-800 dark:text-green-300">OUTPUT LOGITS</span>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">[B, num_candidates, num_actions]</p>
              </div>

              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400 rotate-180" />

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-800 dark:text-purple-300 text-center mb-3">GROK TRANSFORMER (N layers)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded">
                    <span className="font-semibold">Multi-Head Attention</span>
                    <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>- num_q_heads: Queryヘッド数</li>
                      <li>- num_kv_heads: Key/Valueヘッド数 (GQA対応)</li>
                      <li>- Rotary Position Embedding (RoPE)</li>
                      <li>- Candidate Isolation Attention Mask</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded">
                    <span className="font-semibold">Dense Block (FFN)</span>
                    <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>- Linear V: [D] → [ffn_size]</li>
                      <li>- Linear W1 + GELU: [D] → [ffn_size]</li>
                      <li>- Element-wise multiply</li>
                      <li>- Linear: [ffn_size] → [D]</li>
                    </ul>
                  </div>
                </div>
              </div>

              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400 rotate-180" />

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 text-center mb-2">INPUT CONSTRUCTION</h4>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded">[User: 1, D]</span>
                  <span className="text-gray-400">+</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded">[History: S, D]</span>
                  <span className="text-gray-400">+</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded">[Candidates: C, D]</span>
                </div>
              </div>

              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400 rotate-180" />

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-center">
                <span className="font-bold text-amber-800 dark:text-amber-300">HASH-BASED EMBEDDINGS</span>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Multiple hash functions → embedding lookup → concat → project</p>
              </div>
            </div>
          </FigureBox>

          <FigureBox title="Candidate Isolation Attention Mask">
            <div className="text-sm">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                候補同士が互いを参照できないようにする特殊なアテンションマスク:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-xs mb-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="font-semibold text-green-700 dark:text-green-300">User + History</span>
                  <p className="text-green-600 dark:text-green-400 mt-1">双方向アテンション (互いに参照可能)</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">Candidates → Context</span>
                  <p className="text-blue-600 dark:text-blue-400 mt-1">候補はユーザーコンテキストを参照可能</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                  <span className="font-semibold text-red-700 dark:text-red-300">Candidates → Candidates</span>
                  <p className="text-red-600 dark:text-red-400 mt-1">候補間は参照不可 (自己参照のみ)</p>
                </div>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <span className="font-semibold">Benefits:</span>
                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>- スコアの一貫性: 候補のスコアがバッチ内の他の候補に依存しない</li>
                  <li>- キャッシャビリティ: 同一 (user, candidate) ペアは常に同じスコア</li>
                  <li>- 並列推論: バッチサイズを任意に変更可能</li>
                </ul>
              </div>
            </div>
          </FigureBox>

          <FigureBox title="Phoenix Retrieval Model (Two-Tower)">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <CpuChipIcon className="w-5 h-5" />
                  USER TOWER
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>- Grok Transformer (候補分離なし)</li>
                  <li>- Mean Pooling over valid positions</li>
                  <li>- L2 Normalization</li>
                  <li>- 出力: user_representation [B, D]</li>
                </ul>
                <p className="mt-3 text-xs text-blue-600 dark:text-blue-400">オンラインでリアルタイム計算</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                  <CircleStackIcon className="w-5 h-5" />
                  CANDIDATE TOWER
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>- Hash Embeddings (post + author)</li>
                  <li>- MLP Projection (2-layer + SiLU)</li>
                  <li>- L2 Normalization</li>
                  <li>- 出力: corpus_embeddings [N, D]</li>
                </ul>
                <p className="mt-3 text-xs text-purple-600 dark:text-purple-400">オフラインで事前計算、インデックス化</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-center">
              <span className="font-semibold">Retrieval:</span>
              <code className="ml-2 text-sm text-purple-600 dark:text-purple-400">dot(user_emb, corpus_emb.T) → ANN search (FAISS, ScaNN)</code>
            </div>
          </FigureBox>
        </section>

        {/* セクション 8: 運用考慮事項 */}
        <section className="mb-16">
          <SectionHeader id="operations" title="運用考慮事項" />

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">スケーラビリティ</h3>
          <DataTable
            headers={['コンポーネント', 'スケーリング戦略']}
            rows={[
              ['Home Mixer', '水平スケーリング（ステートレス）'],
              ['Thunder', 'シャーディング（ユーザーID範囲）'],
              ['Phoenix Prediction', 'GPU クラスタ、バッチ処理'],
              ['Phoenix Retrieval', 'ANN インデックス + レプリカ'],
            ]}
          />

          <FigureBox title="レイテンシバジェット (P99 Target)">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <span className="font-bold text-blue-800 dark:text-blue-300">Total Request</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">&lt; 200ms</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { name: 'Query Hydration', time: '~20ms', type: 'parallel' },
                  { name: 'Candidate Sources', time: '~30ms', type: 'parallel' },
                  { name: 'Hydration', time: '~30ms', type: 'parallel' },
                  { name: 'Pre-Scoring Filters', time: '~10ms', type: 'sequential' },
                  { name: 'Phoenix Scoring', time: '~80ms', type: 'GPU' },
                  { name: 'Weighted/Diversity', time: '~5ms', type: 'CPU' },
                  { name: 'Selection', time: '~2ms', type: 'sort' },
                  { name: 'Post-Selection', time: '~20ms', type: 'VF call' },
                ].map((item) => (
                  <div key={item.name} className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-500">{item.type}</span>
                      <span className="font-mono text-purple-600 dark:text-purple-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FigureBox>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">エラーハンドリング戦略</h3>
          <DataTable
            headers={['ステージ', '失敗時の動作']}
            rows={[
              ['Query Hydration', 'エラーログ記録、デフォルト値で続行'],
              ['Thunder Source', 'スキップ、Phoenix のみで続行'],
              ['Phoenix Source', 'スキップ、Thunder のみで続行'],
              ['Hydration', '部分データで続行'],
              ['Phoenix Scoring', 'キャッシュスコア使用、または 0 スコア'],
              ['VF Filter', '全候補通過（フェイルオープン）'],
            ]}
          />

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">設定パラメータ</h3>
          <DataTable
            headers={['パラメータ', 'デフォルト値', '説明']}
            rows={[
              ['MAX_POST_AGE', '172800s (2日)', '投稿の最大経過時間'],
              ['RESULT_SIZE', '50', '返却する投稿数'],
              ['MAX_POSTS_TO_RETURN', '1500', 'Thunder から取得する最大投稿数'],
              ['MAX_INPUT_LIST_SIZE', '5000', 'フォローリストの最大サイズ'],
              ['RETENTION_SECONDS', '172800s', 'Thunder の投稿保持期間'],
            ]}
          />
        </section>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/specs/overview"
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            システム概要
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            目次に戻る
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Copyright 2026 X.AI Corp. - Licensed under Apache License 2.0</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuChipIcon,
  ServerIcon,
  CloudIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  CircleStackIcon,
  BoltIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
  UserGroupIcon,
  GlobeAltIcon,
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

// 特徴カードコンポーネント
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

// コンポーネントカード
function ComponentCard({
  icon: Icon,
  name,
  directory,
  description,
  color
}: {
  icon: React.ElementType;
  name: string;
  directory: string;
  description: string;
  color: 'blue' | 'amber' | 'purple' | 'green';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };
  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    amber: 'text-amber-600 dark:text-amber-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
  };

  return (
    <div className={`p-5 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-6 h-6 ${iconColorClasses[color]}`} />
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
          <code className="text-xs text-gray-500 dark:text-gray-400">{directory}</code>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default function SpecOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>目次に戻る</span>
          </Link>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">仕様書</span>
          </div>
          <Link
            href="/specs/architecture"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <span>アーキテクチャ</span>
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
            X Algorithm 仕様書: システム概要
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>バージョン: 1.0</span>
            <span>|</span>
            <span>最終更新日: 2026年1月</span>
            <span>|</span>
            <span className="text-green-600 dark:text-green-400">ステータス: 公開</span>
          </div>
        </div>

        {/* 目次 */}
        <nav className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">目次</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'overview', title: 'プロジェクト概要' },
              { id: 'foryou', title: 'For Youフィードとは' },
              { id: 'components', title: '主要コンポーネント一覧' },
              { id: 'tech-stack', title: '技術スタック' },
              { id: 'design', title: 'システム全体の目的と設計思想' },
              { id: 'dataflow', title: 'データフロー概要' },
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

        {/* セクション 1: プロジェクト概要 */}
        <section className="mb-16">
          <SectionHeader id="overview" title="プロジェクト概要" />

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              本リポジトリは、Xの「For You」フィードを支えるコアレコメンデーションシステムの実装を含みます。
              このシステムは、ユーザーがフォローしているアカウントからのコンテンツ（イン・ネットワーク）と、
              機械学習ベースの検索で発見されたコンテンツ（アウト・オブ・ネットワーク）を組み合わせ、
              Grokベースのトランスフォーマーモデルを使用してランキングします。
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">主な特徴</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <FeatureCard
              icon={CpuChipIcon}
              title="手動特徴量エンジニアリングの排除"
              description="システムはGrokベースのトランスフォーマーに完全に依存し、ユーザーのエンゲージメント履歴から関連性を学習します"
            />
            <FeatureCard
              icon={CubeTransparentIcon}
              title="候補分離（Candidate Isolation）"
              description="ランキング時に候補同士が互いに参照できないよう特殊なアテンションマスクを使用"
            />
            <FeatureCard
              icon={BoltIcon}
              title="マルチアクション予測"
              description="単一の「関連性」スコアではなく、複数のエンゲージメントタイプの確率を予測"
            />
            <FeatureCard
              icon={CircleStackIcon}
              title="構成可能なパイプラインアーキテクチャ"
              description="柔軟で拡張可能なレコメンデーションパイプラインフレームワーク"
            />
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>トランスフォーマー実装について:</strong> 本システムのトランスフォーマー実装は、
              xAIによるGrok-1オープンソースリリースからポートされ、レコメンデーションシステムのユースケースに適応されています。
            </p>
          </div>
        </section>

        {/* セクション 2: For Youフィードとは */}
        <section className="mb-16">
          <SectionHeader id="foryou" title="For Youフィードとは" subtitle="パーソナライズされたタイムラインの仕組み" />

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For Youフィードは、Xにおけるパーソナライズされたタイムラインであり、各ユーザーに最も関連性の高いコンテンツを表示することを目的としています。
              従来の時系列ベースのタイムラインとは異なり、機械学習モデルがユーザーの興味・関心に基づいてコンテンツを選択・順序付けします。
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">コンテンツソース</h3>
          <DataTable
            headers={['ソース', '説明', 'コンポーネント']}
            rows={[
              ['イン・ネットワーク', 'ユーザーがフォローしているアカウントからの投稿', 'Thunder'],
              ['アウト・オブ・ネットワーク', 'グローバルコーパスからML検索で発見された投稿', 'Phoenix Retrieval'],
            ]}
          />

          <FigureBox title="処理フロー概要">
            <div className="space-y-3">
              {[
                { step: 'ユーザーリクエスト', desc: 'フィードリクエスト受信' },
                { step: '候補取得 (Sourcing)', desc: 'Thunder（イン・ネットワーク）+ Phoenix（アウト・オブ・ネットワーク）' },
                { step: 'データ補完 (Hydration)', desc: '投稿メタデータ、著者情報等を付加' },
                { step: 'フィルタリング (Filtering)', desc: '重複排除、ブロック/ミュート適用' },
                { step: 'スコアリング (Scoring)', desc: 'Phoenix ML予測 → 重み付けスコア' },
                { step: '選択 (Selection)', desc: '上位K件を選択' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{item.step}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">{item.desc}</span>
                  </div>
                  {i < 5 && <ArrowDownIcon className="w-4 h-4 text-gray-400" />}
                </div>
              ))}
            </div>
          </FigureBox>
        </section>

        {/* セクション 3: 主要コンポーネント一覧 */}
        <section className="mb-16">
          <SectionHeader id="components" title="主要コンポーネント一覧" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ComponentCard
              icon={CloudIcon}
              name="Home Mixer"
              directory="home-mixer/"
              description="For Youフィードを組み立てるオーケストレーションレイヤー。Candidate Pipelineフレームワークを活用し、各ステージを実行します。"
              color="blue"
            />
            <ComponentCard
              icon={ServerIcon}
              name="Thunder"
              directory="thunder/"
              description="イン・ネットワークコンテンツを提供するリアルタイム投稿ストア。Kafkaから投稿イベントを消費し、サブミリ秒のルックアップを実現。"
              color="amber"
            />
            <ComponentCard
              icon={CpuChipIcon}
              name="Phoenix"
              directory="phoenix/"
              description="機械学習ベースの検索とランキングを担当。Two-Tower ModelによるRetrievalとTransformerによるRankingの2機能を持ちます。"
              color="purple"
            />
            <ComponentCard
              icon={CubeTransparentIcon}
              name="Candidate Pipeline"
              directory="candidate-pipeline/"
              description="再利用可能なレコメンデーションパイプラインフレームワーク。Source, Hydrator, Filter, Scorer, Selectorなどのトレイトを定義。"
              color="green"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Home Mixerのステージ</h3>
          <DataTable
            headers={['ステージ', '説明', '主要コンポーネント']}
            rows={[
              ['Query Hydrators', 'ユーザーコンテキストの取得', 'UserActionSeqQueryHydrator, UserFeaturesQueryHydrator'],
              ['Sources', '候補の取得', 'ThunderSource, PhoenixSource'],
              ['Hydrators', '候補データの補完', 'CoreDataCandidateHydrator, GizmoduckHydrator等'],
              ['Filters', '不適格な候補の除去', 'AgeFilter, MutedKeywordFilter, AuthorSocialgraphFilter等'],
              ['Scorers', 'スコア計算', 'PhoenixScorer, WeightedScorer, AuthorDiversityScorer, OONScorer'],
              ['Selector', '上位候補の選択', 'TopKScoreSelector'],
              ['Post-Selection Filters', '最終検証', 'VFFilter, DedupConversationFilter'],
              ['Side Effects', '非同期処理', 'CacheRequestInfoSideEffect'],
            ]}
          />

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Phoenix: 予測されるアクション</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">ポジティブアクション</h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                favorite, reply, repost, quote, click, profile_click, video_view, photo_expand, share, dwell, follow_author
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">ネガティブアクション</h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                not_interested, block_author, mute_author, report
              </p>
            </div>
          </div>
        </section>

        {/* セクション 4: 技術スタック */}
        <section className="mb-16">
          <SectionHeader id="tech-stack" title="技術スタック" />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">プログラミング言語</h3>
              <DataTable
                headers={['言語', '用途', 'バージョン']}
                rows={[
                  ['Rust', 'Home Mixer, Thunder, Candidate Pipeline', '安定版'],
                  ['Python', 'Phoenix ML モデル', '3.10+'],
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">機械学習フレームワーク</h3>
              <DataTable
                headers={['フレームワーク', '用途']}
                rows={[
                  ['JAX', '高性能数値計算、自動微分'],
                  ['Haiku', 'JAX上のニューラルネットワークライブラリ'],
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">通信・インフラ</h3>
              <DataTable
                headers={['技術', '用途']}
                rows={[
                  ['gRPC', 'サービス間通信（Home Mixer, Thunder, Phoenix間）'],
                  ['Protocol Buffers', 'データシリアライゼーション'],
                  ['Kafka', 'リアルタイムイベントストリーミング（投稿イベント）'],
                  ['Tonic', 'Rust gRPCフレームワーク'],
                  ['Axum', 'Rust HTTPフレームワーク'],
                  ['Tokio', '非同期ランタイム'],
                  ['gzip/Zstd', 'gRPCメッセージ圧縮'],
                ]}
              />
            </div>
          </div>

          <FigureBox title="技術スタック構成図">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">アプリケーション層</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm">Home Mixer (Rust)</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm">Thunder (Rust)</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm">Phoenix (Python/JAX/Haiku)</span>
                </div>
              </div>
              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400" />
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">フレームワーク層</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded text-sm">Candidate Pipeline (Rust)</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded text-sm">Tonic (gRPC)</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded text-sm">Axum (HTTP)</span>
                </div>
              </div>
              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400" />
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">ランタイム層</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">Tokio (Rust非同期)</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">JAX (Python数値計算)</span>
                </div>
              </div>
              <ArrowDownIcon className="w-5 h-5 mx-auto text-gray-400" />
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">インフラストラクチャ層</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 rounded text-sm">Kafka (イベントストリーム)</span>
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 rounded text-sm">Protocol Buffers</span>
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300 rounded text-sm">gzip/Zstd (圧縮)</span>
                </div>
              </div>
            </div>
          </FigureBox>
        </section>

        {/* セクション 5: 設計思想 */}
        <section className="mb-16">
          <SectionHeader id="design" title="システム全体の目的と設計思想" />

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">設計目標</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-blue-500" />
                ユーザー体験の最適化
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">-</span>
                  <span><strong>パーソナライゼーション:</strong> 各ユーザーの興味・関心に合わせたコンテンツ提供</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">-</span>
                  <span><strong>発見性:</strong> フォロー外の関連コンテンツを適切に提示</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">-</span>
                  <span><strong>多様性:</strong> 単一著者のコンテンツ偏重を防止</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5 text-purple-500" />
                技術的優位性
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">-</span>
                  <span><strong>スケーラビリティ:</strong> 数億ユーザー規模に対応</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">-</span>
                  <span><strong>レイテンシ:</strong> サブミリ秒〜数十ミリ秒でのレスポンス</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">-</span>
                  <span><strong>柔軟性:</strong> 新しいソース、フィルタ、スコアラーの容易な追加</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">主要な設計決定</h3>

          <div className="space-y-6">
            <FigureBox title="1. 手動特徴量エンジニアリングの排除">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">従来のアプローチ</p>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">生データ</span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded">手動特徴量エンジニアリング</span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">MLモデル</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">ドメイン知識・仮説が必要</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">本システムのアプローチ</p>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">エンゲージメント履歴シーケンス</span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded">Grok Transformer</span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">特徴量学習を自動化</p>
                </div>
              </div>
            </FigureBox>

            <FigureBox title="2. ランキングにおける候補分離">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="mb-3">
                  <strong>問題:</strong> 候補間の相互参照がある場合、スコアがバッチ構成に依存し、キャッシュ不可で不安定な結果となる
                </p>
                <p className="mb-3">
                  <strong>解決策:</strong> 候補分離マスクにより、各候補はユーザーコンテキストのみ参照可能
                </p>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <strong className="text-green-700 dark:text-green-300">結果:</strong>
                  <span className="ml-2">スコアが一貫性を持ち、キャッシュ可能</span>
                </div>
              </div>
            </FigureBox>

            <FigureBox title="3. マルチアクション予測">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="mb-3">単一の「関連性」スコアではなく、複数のエンゲージメントタイプの確率を予測:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['P(like)', 'P(reply)', 'P(repost)', 'P(quote)', 'P(click)', 'P(dwell)', 'P(follow)'].map((p) => (
                    <span key={p} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">{p}</span>
                  ))}
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-xs">
                  Weighted Score = Σ (weight × P(action))
                  <br />
                  ポジティブ: +weight / ネガティブ: -weight
                </div>
              </div>
            </FigureBox>
          </div>
        </section>

        {/* セクション 6: データフロー概要 */}
        <section className="mb-16">
          <SectionHeader id="dataflow" title="データフロー概要" />

          <FigureBox title="コンポーネント間通信">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded font-semibold">Kafka</div>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">投稿イベント (create/delete)</span>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded font-semibold">Thunder</div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-semibold">Home Mixer</div>
                <div className="flex-1 flex items-center gap-2 justify-center">
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">gRPC</span>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded font-semibold">Thunder</div>
                  <div className="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded font-semibold">Phoenix</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300">
                  <strong>プロトコル:</strong> gRPC (Protocol Buffers) |
                  <strong className="ml-2">圧縮:</strong> gzip, Zstd |
                  <strong className="ml-2">認証:</strong> 内部サービス間認証
                </p>
              </div>
            </div>
          </FigureBox>
        </section>

        {/* 用語集 */}
        <section className="mb-16">
          <SectionHeader id="glossary" title="用語集" />
          <DataTable
            headers={['用語', '説明']}
            rows={[
              ['イン・ネットワーク', 'ユーザーがフォローしているアカウントからのコンテンツ'],
              ['アウト・オブ・ネットワーク', 'フォロー外のアカウントからのコンテンツ'],
              ['候補分離', 'ランキング時に候補同士が互いに参照できないようにする設計'],
              ['Two-Tower Model', 'ユーザーとアイテムを別々のタワーでエンコードする検索モデル'],
              ['ハイドレーション', '候補データに追加情報を付与するプロセス'],
              ['ANN', 'Approximate Nearest Neighbor（近似最近傍探索）'],
            ]}
          />
        </section>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            目次に戻る
          </Link>
          <Link
            href="/specs/architecture"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            アーキテクチャ仕様書
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

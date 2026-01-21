'use client';

import Link from 'next/link';
import { ChevronLeftIcon, FunnelIcon, ShieldCheckIcon, ClockIcon, UserIcon, DocumentDuplicateIcon, EyeSlashIcon, ChatBubbleLeftEllipsisIcon, NoSymbolIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
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

// フィルターカードコンポーネント
function FilterCard({ name, icon: Icon, description, file, complexity, condition }: {
  name: string;
  icon: React.ElementType;
  description: string;
  file: string;
  complexity: string;
  condition: string;
}) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 dark:bg-blue-900/30">
          <Icon className="w-5 h-5 text-primary dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-gray-100">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-500">ファイル:</span>
              <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{file}</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-500">計算量:</span>
              <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{complexity}</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-500">判定条件:</span>
              <span className="text-gray-700 dark:text-gray-300">{condition}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 目次コンポーネント
function TableOfContents() {
  const sections = [
    { id: 'overview', title: '1. フィルタリングシステム概要' },
    { id: 'pre-scoring', title: '2. Pre-Scoring Filters' },
    { id: 'post-selection', title: '3. Post-Selection Filters' },
    { id: 'execution-order', title: '4. フィルタリングパイプラインの実行順序' },
    { id: 'data-structures', title: '5. データ構造' },
    { id: 'performance', title: '6. パフォーマンス考慮事項' },
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

export default function FilteringSpecPage() {
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
            <FunnelIcon className="w-4 h-4" />
            仕様書
          </span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* タイトルセクション */}
        <div className="mb-12 pb-8 border-b-2 border-primary dark:border-blue-600">
          <div className="flex items-center gap-2 mb-2">
            <FunnelIcon className="w-6 h-6 text-primary dark:text-blue-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Technical Specification</span>
          </div>
          <h1 className="text-3xl font-bold text-primary dark:text-blue-300 mb-3">
            フィルタリングシステム仕様書
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Xのホームタイムラインにおいて、ユーザーに表示される投稿の品質と関連性を確保するためのフィルタリングシステムの詳細仕様です。
          </p>
        </div>

        {/* 目次 */}
        <TableOfContents />

        {/* 1. フィルタリングシステム概要 */}
        <Section id="overview" title="1. フィルタリングシステム概要">
          <SubSection title="1.1 目的">
            <p>
              フィルタリングシステムは、Xのホームタイムラインにおいて、ユーザーに表示される投稿の品質と関連性を確保するための重要なコンポーネントです。
              候補となる投稿群から不適切、重複、または不要な投稿を効率的に除外し、最終的にユーザーに最適なコンテンツのみを配信します。
            </p>
          </SubSection>

          <SubSection title="1.2 設計原則">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">早期除外（Early Filtering）</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  不要な投稿を可能な限り早い段階で除外し、後続処理の計算コストを削減
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">段階的フィルタリング</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pre-Scoring FiltersとPost-Selection Filtersの2段階構成
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">効率性</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  HashSetやBloom Filterを活用した高速な重複検出
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">ユーザープライバシー尊重</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ブロック・ミュート設定の完全な反映
                </p>
              </div>
            </div>
          </SubSection>

          <SubSection title="1.3 アーキテクチャ">
            <FigureBox title="フィルタリングパイプライン全体像">
              <div className="space-y-3 text-sm font-mono">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                  候補投稿（Candidates）
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300 dark:border-blue-700">
                  <p className="font-bold text-center mb-2">Pre-Scoring Filters（10種類）</p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">DropDuplicates</span>
                    <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">CoreDataHydration</span>
                    <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">AgeFilter</span>
                    <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">...</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded border border-amber-300 dark:border-amber-700 text-center">
                  Scoring（スコアリング）
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded border border-green-300 dark:border-green-700 text-center">
                  Selection（選択）
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-300 dark:border-purple-700">
                  <p className="font-bold text-center mb-2">Post-Selection Filters（2種類）</p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <span className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">VFFilter</span>
                    <span className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">DedupConversation</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                  最終結果（Final Results）
                </div>
              </div>
            </FigureBox>
          </SubSection>
        </Section>

        {/* 2. Pre-Scoring Filters */}
        <Section id="pre-scoring" title="2. Pre-Scoring Filters">
          <p>
            スコアリング処理の前に適用されるフィルター群です。計算コストの高いスコアリング処理の前に明らかに不要な投稿を除外することで、システム全体の効率を向上させます。
          </p>

          <div className="grid gap-4 mt-6">
            <FilterCard
              name="1. DropDuplicatesFilter"
              icon={DocumentDuplicateIcon}
              description="同一のtweet_idを持つ重複した投稿候補を除外。複数のソース（Phoenix、Thunder等）から取得された候補に同じ投稿が含まれる場合に発生。"
              file="home-mixer/filters/drop_duplicates_filter.rs"
              complexity="O(n)"
              condition="tweet_idが既出の場合に除外"
            />

            <FilterCard
              name="2. CoreDataHydrationFilter"
              icon={ShieldCheckIcon}
              description="投稿の基本メタデータ（コアデータ）が正しくハイドレート（取得・設定）されているかを検証。不完全なデータを持つ投稿を除外。"
              file="home-mixer/filters/core_data_hydration_filter.rs"
              complexity="O(n)"
              condition="author_id != 0 かつ tweet_textが空でない"
            />

            <FilterCard
              name="3. AgeFilter"
              icon={ClockIcon}
              description="指定された期間より古い投稿を除外。タイムラインの鮮度を維持するために使用。Snowflake IDから時刻を抽出して判定。"
              file="home-mixer/filters/age_filter.rs"
              complexity="O(n)"
              condition="Snowflake IDからの時刻 <= MAX_POST_AGE"
            />

            <FilterCard
              name="4. SelfTweetFilter"
              icon={UserIcon}
              description="閲覧ユーザー自身が投稿したツイートをタイムラインから除外。プロフィールページで確認できるため除外。"
              file="home-mixer/filters/self_tweet_filter.rs"
              complexity="O(n)"
              condition="candidate.author_id != query.user_id"
            />

            <FilterCard
              name="5. RetweetDeduplicationFilter"
              icon={DocumentDuplicateIcon}
              description="同一の投稿が複数のリツイートとして候補に含まれる場合、最初に出現したもののみを保持。"
              file="home-mixer/filters/retweet_deduplication_filter.rs"
              complexity="O(n)"
              condition="元ツイートIDで重複チェック"
            />

            <FilterCard
              name="6. IneligibleSubscriptionFilter"
              icon={NoSymbolIcon}
              description="有料サブスクリプション専用コンテンツに対して、ユーザーがサブスクライブしていない場合に除外。"
              file="home-mixer/filters/ineligible_subscription_filter.rs"
              complexity="O(n)"
              condition="サブスクライブ済みまたは通常投稿"
            />

            <FilterCard
              name="7. PreviouslySeenPostsFilter"
              icon={EyeSlashIcon}
              description="ユーザーが既に閲覧した投稿を除外。Bloom Filterと明示的な既読リストの両方を使用して効率的に判定。"
              file="home-mixer/filters/previously_seen_posts_filter.rs"
              complexity="O(n * m)"
              condition="seen_idsまたはBloom Filterに含まれる場合"
            />

            <FilterCard
              name="8. PreviouslyServedPostsFilter"
              icon={EyeSlashIcon}
              description="直前のタイムラインリクエストで既に配信された投稿を除外。無限スクロール時の重複を防止。"
              file="home-mixer/filters/previously_served_posts_filter.rs"
              complexity="O(n * m)"
              condition="is_bottom_request時にserved_idsに含まれる場合"
            />

            <FilterCard
              name="9. MutedKeywordFilter"
              icon={ChatBubbleLeftEllipsisIcon}
              description="ユーザーが設定したミュートキーワードを含む投稿を除外。トークナイザーを使用して正確なキーワードマッチング。"
              file="home-mixer/filters/muted_keyword_filter.rs"
              complexity="O(n * k)"
              condition="ミュートキーワードにマッチする場合"
            />

            <FilterCard
              name="10. AuthorSocialgraphFilter"
              icon={NoSymbolIcon}
              description="閲覧ユーザーがブロックまたはミュートしているユーザーの投稿を除外。"
              file="home-mixer/filters/author_socialgraph_filter.rs"
              complexity="O(n)"
              condition="ブロック/ミュートユーザーリストに含まれる場合"
            />
          </div>

          <SubSection title="Snowflake IDについて">
            <p>
              XのツイートIDはSnowflake形式を採用しており、ID自体に作成時刻が埋め込まれています。
            </p>
            <FigureBox title="64-bit Snowflake ID 構造">
              <div className="font-mono text-sm overflow-x-auto">
                <div className="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <div className="px-3 py-2 bg-gray-200 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 text-center">
                    <div className="text-xs text-gray-500">1bit</div>
                    <div>未使用</div>
                  </div>
                  <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 border-r border-gray-300 dark:border-gray-600 text-center flex-1">
                    <div className="text-xs text-gray-500">41bit</div>
                    <div>時刻</div>
                  </div>
                  <div className="px-3 py-2 bg-green-100 dark:bg-green-900/30 border-r border-gray-300 dark:border-gray-600 text-center">
                    <div className="text-xs text-gray-500">10bit</div>
                    <div>DC</div>
                  </div>
                  <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-center">
                    <div className="text-xs text-gray-500">12bit</div>
                    <div>シーケンス</div>
                  </div>
                </div>
              </div>
              <ul className="mt-4 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>- 41ビットの時刻部分からミリ秒単位のタイムスタンプを抽出</li>
                <li>- 基準時刻（Twitter Epoch: 2010-11-04T01:42:54.657Z）からの経過時間</li>
              </ul>
            </FigureBox>
          </SubSection>

          <SubSection title="Bloom Filterについて">
            <p>
              Bloom Filterは確率的データ構造で、メモリ効率が良く大量のIDを少ないメモリで管理可能です。
            </p>
            <Table
              headers={['判定結果', '意味']}
              rows={[
                [<code key="1">may_contain() = false</code>, '確実に含まれていない'],
                [<code key="2">may_contain() = true</code>, '含まれている可能性がある（偽陽性あり）'],
              ]}
            />
            <InfoBox type="info">
              偽陽性率は設定可能（通常1%以下）。クライアントから送信され、サーバー側で検証に使用されます。
            </InfoBox>
          </SubSection>
        </Section>

        {/* 3. Post-Selection Filters */}
        <Section id="post-selection" title="3. Post-Selection Filters">
          <p>
            スコアリングと選択（TopK選出）の後に適用されるフィルター群です。選択された上位候補に対してのみ実行されるため、より計算コストの高い処理を行うことができます。
          </p>

          <SubSection title="3.1 VFFilter（Visibility Filtering）">
            <div className="p-4 border border-border rounded-lg bg-card mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <ShieldCheckIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">違反コンテンツフィルター</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Visibility Filteringサービスの結果に基づいて、ポリシー違反コンテンツを除外します。
                  </p>
                </div>
              </div>
            </div>

            <Table
              headers={['Safety Level', '対象', '説明']}
              rows={[
                ['TimelineHome', 'In-Network投稿', 'フォロー中ユーザーの投稿向け'],
                ['TimelineHomeRecommendations', 'Out-of-Network投稿', 'おすすめ投稿向け（より厳格）'],
              ]}
            />

            <p className="font-medium mt-4 mb-2">除外されるコンテンツ:</p>
            <div className="grid gap-2 md:grid-cols-2">
              {['削除済み投稿', 'スパム', '暴力的コンテンツ', 'ヘイトスピーチ', 'センシティブコンテンツ', 'ポリシー違反'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <XCircleIcon className="w-4 h-4 text-red-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <InfoBox type="warning" title="Post-Selectionで実行される理由">
              VFサービス呼び出しは高コストのため、選択後の少数候補のみを対象としています。
              In-NetworkとOut-of-Networkで異なるSafety Levelが適用されます。
            </InfoBox>
          </SubSection>

          <SubSection title="3.2 DedupConversationFilter">
            <div className="p-4 border border-border rounded-lg bg-card mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">会話スレッド重複排除フィルター</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    同一会話スレッド内の複数の投稿が選択された場合、最もスコアの高い投稿のみを保持します。
                  </p>
                </div>
              </div>
            </div>

            <FigureBox title="会話スレッドの構造">
              <div className="font-mono text-sm space-y-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  会話の起点（Conversation Root）: ID = 100
                </div>
                <div className="ml-6 space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded border-l-2 border-blue-400">
                    返信1: ID = 101, ancestors = [100]
                    <div className="ml-4 mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded border-l-2 border-gray-400">
                      返信1-1: ID = 103, ancestors = [100, 101]
                    </div>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded border-l-2 border-blue-400">
                    返信2: ID = 102, ancestors = [100]
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  全ての投稿の conversation_id は 100（最小の祖先ID）となります
                </p>
              </div>
            </FigureBox>
          </SubSection>
        </Section>

        {/* 4. フィルタリングパイプラインの実行順序 */}
        <Section id="execution-order" title="4. フィルタリングパイプラインの実行順序">
          <SubSection title="4.1 完全な実行順序">
            <FigureBox title="パイプライン実行フロー">
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center font-medium">
                  [候補取得]
                </div>

                <div className="border border-blue-300 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                  <p className="font-bold text-blue-800 dark:text-blue-300 mb-3">Pre-Scoring Filters（順序固定）</p>
                  <ol className="space-y-2">
                    {[
                      { num: 1, name: 'DropDuplicatesFilter', desc: '重複排除（最優先）' },
                      { num: 2, name: 'CoreDataHydrationFilter', desc: 'メタデータ検証' },
                      { num: 3, name: 'AgeFilter', desc: '古い投稿除外' },
                      { num: 4, name: 'SelfTweetFilter', desc: '自分の投稿除外' },
                      { num: 5, name: 'RetweetDeduplicationFilter', desc: 'リツイート重複排除' },
                      { num: 6, name: 'IneligibleSubscriptionFilter', desc: 'サブスクリプション制限' },
                      { num: 7, name: 'PreviouslySeenPostsFilter', desc: '既読投稿除外' },
                      { num: 8, name: 'PreviouslyServedPostsFilter', desc: '既配信投稿除外' },
                      { num: 9, name: 'MutedKeywordFilter', desc: 'ミュートキーワード' },
                      { num: 10, name: 'AuthorSocialgraphFilter', desc: 'ブロック/ミュートユーザー' },
                    ].map((filter) => (
                      <li key={filter.num} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 flex items-center justify-center text-xs font-bold">
                          {filter.num}
                        </span>
                        <span className="font-medium">{filter.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">- {filter.desc}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>

                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded text-center border border-amber-300 dark:border-amber-700">
                  <p className="font-medium text-amber-800 dark:text-amber-300">[Scoring - スコアリング]</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">PhoenixScorer, WeightedScorer, AuthorDiversityScorer, OONScorer</p>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>

                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded text-center border border-green-300 dark:border-green-700 font-medium text-green-800 dark:text-green-300">
                  [Selection - TopK選択]
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>

                <div className="border border-purple-300 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                  <p className="font-bold text-purple-800 dark:text-purple-300 mb-3">Post-Selection Filters（順序固定）</p>
                  <ol className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 flex items-center justify-center text-xs font-bold">1</span>
                      <span className="font-medium">VFFilter</span>
                      <span className="text-gray-500 dark:text-gray-400">- 違反コンテンツ除外</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 flex items-center justify-center text-xs font-bold">2</span>
                      <span className="font-medium">DedupConversationFilter</span>
                      <span className="text-gray-500 dark:text-gray-400">- 会話スレッド重複排除</span>
                    </li>
                  </ol>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center font-medium">
                  [最終結果]
                </div>
              </div>
            </FigureBox>
          </SubSection>

          <SubSection title="4.2 実行順序の設計原則">
            <Table
              headers={['順序', 'フィルター', '理由']}
              rows={[
                ['1', 'DropDuplicates', '重複を最初に除外し、後続処理を効率化'],
                ['2', 'CoreDataHydration', '不完全データを早期排除'],
                ['3', 'Age', 'シンプルな判定で大量除外可能'],
                ['4', 'SelfTweet', 'シンプルな判定'],
                ['5', 'RetweetDeduplication', '重複系フィルターの後半'],
                ['6', 'IneligibleSubscription', 'ユーザー設定に基づくフィルター開始'],
                ['7', 'PreviouslySeen', 'Bloom Filter使用（やや複雑）'],
                ['8', 'PreviouslyServed', '条件付きフィルター'],
                ['9', 'MutedKeyword', 'テキスト処理（計算コスト高め）'],
                ['10', 'AuthorSocialgraph', 'ユーザー設定フィルターの最後'],
              ]}
            />
          </SubSection>

          <SubSection title="4.3 フィルターの有効化条件">
            <Table
              headers={['フィルター', '有効化条件', 'デフォルト']}
              rows={[
                ['PreviouslyServedPostsFilter', <code key="1">is_bottom_request == true</code>, '無効'],
                ['MutedKeywordFilter', <><code key="2">muted_keywords</code>が空でない</>, '有効（空なら即リターン）'],
                ['AuthorSocialgraphFilter', 'ブロック/ミュートリストが空でない', '有効（空なら即リターン）'],
              ]}
            />
          </SubSection>
        </Section>

        {/* 5. データ構造 */}
        <Section id="data-structures" title="5. データ構造">
          <SubSection title="5.1 PostCandidate（投稿候補）">
            <p>フィルターが処理する主要なデータ構造です。</p>
            <CodeBlock language="rust" title="PostCandidate 構造体">{`pub struct PostCandidate {
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
}`}</CodeBlock>
          </SubSection>

          <SubSection title="5.2 ScoredPostsQuery（クエリ）">
            <p>フィルターに渡されるコンテキスト情報です。</p>
            <CodeBlock language="rust" title="ScoredPostsQuery 構造体">{`pub struct ScoredPostsQuery {
    pub user_id: i64,                           // 閲覧ユーザーID
    pub seen_ids: Vec<i64>,                     // 既読投稿IDリスト
    pub served_ids: Vec<i64>,                   // 既配信投稿IDリスト
    pub is_bottom_request: bool,                // 下方向スクロールか
    pub bloom_filter_entries: Vec<BloomFilterEntry>, // Bloom Filter
    pub user_features: UserFeatures,            // ユーザー設定
    // ... その他のフィールド
}`}</CodeBlock>
          </SubSection>

          <SubSection title="5.3 UserFeatures（ユーザー設定）">
            <CodeBlock language="rust" title="UserFeatures 構造体">{`pub struct UserFeatures {
    pub muted_keywords: Vec<String>,            // ミュートキーワード
    pub blocked_user_ids: Vec<i64>,             // ブロックユーザーID
    pub muted_user_ids: Vec<i64>,               // ミュートユーザーID
    pub followed_user_ids: Vec<i64>,            // フォローユーザーID
    pub subscribed_user_ids: Vec<i64>,          // サブスクライブ中ユーザーID
}`}</CodeBlock>
          </SubSection>

          <SubSection title="5.4 FilterResult（フィルター結果）">
            <CodeBlock language="rust" title="FilterResult 構造体">{`pub struct FilterResult<C> {
    pub kept: Vec<C>,      // 保持された候補
    pub removed: Vec<C>,   // 除外された候補
}`}</CodeBlock>
          </SubSection>
        </Section>

        {/* 6. パフォーマンス考慮事項 */}
        <Section id="performance" title="6. パフォーマンス考慮事項">
          <SubSection title="6.1 計算量まとめ">
            <Table
              headers={['フィルター', '時間計算量', '空間計算量']}
              rows={[
                ['DropDuplicatesFilter', 'O(n)', 'O(n)'],
                ['CoreDataHydrationFilter', 'O(n)', 'O(1)'],
                ['AgeFilter', 'O(n)', 'O(1)'],
                ['SelfTweetFilter', 'O(n)', 'O(1)'],
                ['RetweetDeduplicationFilter', 'O(n)', 'O(n)'],
                ['IneligibleSubscriptionFilter', 'O(n)', 'O(m)'],
                ['PreviouslySeenPostsFilter', 'O(n * b)', 'O(b)'],
                ['PreviouslyServedPostsFilter', 'O(n * s)', 'O(1)'],
                ['MutedKeywordFilter', 'O(n * k * t)', 'O(k)'],
                ['AuthorSocialgraphFilter', 'O(n)', 'O(1)'],
                ['VFFilter', 'O(n)', 'O(1)'],
                ['DedupConversationFilter', 'O(n)', 'O(c)'],
              ]}
            />
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-2">凡例:</p>
              <ul className="space-y-1 ml-4">
                <li>n: 候補数</li>
                <li>m: サブスクライブユーザー数</li>
                <li>b: Bloom Filter数</li>
                <li>s: served_ids数</li>
                <li>k: ミュートキーワード数</li>
                <li>t: 平均トークン数</li>
                <li>c: 会話数</li>
              </ul>
            </div>
          </SubSection>

          <SubSection title="6.2 最適化テクニック">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { title: '早期リターン', desc: '空のリストに対する処理をスキップ' },
                { title: 'HashSet活用', desc: 'O(1)ルックアップのためのHashSet使用' },
                { title: 'Bloom Filter', desc: 'メモリ効率の良い確率的データ構造' },
                { title: 'Arc共有', desc: 'トークナイザー等の重いオブジェクトの共有' },
                { title: 'パーティション最適化', desc: 'partitionメソッドによる効率的な分割' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* 関連ドキュメント */}
        <Section title="関連ドキュメント">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { href: '/specs/overview', title: 'システム全体概要' },
              { href: '/specs/scoring', title: 'スコアリングシステム仕様' },
              { href: '/specs/phoenix-ml', title: 'Phoenix MLモデル仕様' },
              { href: '/specs/thunder-pipeline', title: 'Thunder パイプライン仕様' },
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

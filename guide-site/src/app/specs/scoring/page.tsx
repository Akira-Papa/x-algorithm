'use client';

import Link from 'next/link';
import {
  ChevronLeftIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ScaleIcon,
  UsersIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

// セクションヘッダーコンポーネント
function SectionHeader({ id, number, title, icon: Icon }: { id: string; number: string; title: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3 pt-8 border-t border-gray-200 dark:border-gray-700 mt-8 first:mt-0 first:border-t-0 first:pt-0">
      <span className="flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
        <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      </span>
      <span className="text-gray-400 dark:text-gray-500 font-normal">{number}.</span>
      {title}
    </h2>
  );
}

// サブセクションヘッダーコンポーネント
function SubSectionHeader({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <h3 id={id} className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8 flex items-center gap-2">
      <span className="text-gray-400 dark:text-gray-500 font-normal text-lg">{number}</span>
      {title}
    </h3>
  );
}

// コードブロックコンポーネント
function CodeBlock({ children, title, language }: { children: string; title?: string; language?: string }) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {(title || language) && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span>{title}</span>
          {language && <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">{language}</span>}
        </div>
      )}
      <pre
        className="p-4 overflow-x-auto"
        style={{ background: '#1e293b', color: '#e2e8f0' }}
      >
        <code className="text-sm whitespace-pre font-mono">{children}</code>
      </pre>
    </div>
  );
}

// テーブルコンポーネント
function DataTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-800/50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
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
function DiagramBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{title}</span>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
}

// インフォボックスコンポーネント
function InfoBox({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'important'; title?: string; children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-400 bg-blue-50 dark:bg-blue-900/20',
    warning: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
    important: 'border-red-400 bg-red-50 dark:bg-red-900/20',
  };
  const textStyles = {
    info: 'text-blue-800 dark:text-blue-300',
    warning: 'text-amber-800 dark:text-amber-300',
    important: 'text-red-800 dark:text-red-300',
  };

  return (
    <div className={`my-6 border-l-4 rounded-r-lg p-4 ${styles[type]}`}>
      {title && <p className={`font-semibold mb-2 ${textStyles[type]}`}>{title}</p>}
      <div className={`text-sm ${textStyles[type]}`}>{children}</div>
    </div>
  );
}

// 目次コンポーネント
function TableOfContents() {
  const sections = [
    { id: 'overview', number: '1', title: '概要' },
    { id: 'phoenix-scorer', number: '2', title: 'Phoenix Scorer' },
    { id: 'weighted-scorer', number: '3', title: 'Weighted Scorer' },
    { id: 'author-diversity', number: '4', title: 'Author Diversity Scorer' },
    { id: 'oon-scorer', number: '5', title: 'Out-of-Network (OON) Scorer' },
    { id: 'score-flow', number: '6', title: 'スコアの流れと最終出力' },
    { id: 'parameters', number: '7', title: '設定パラメータ一覧' },
    { id: 'files', number: '8', title: '関連ファイル' },
  ];

  return (
    <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <DocumentTextIcon className="w-5 h-5 text-amber-500" />
        目次
      </h2>
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1"
          >
            <span className="text-gray-400 mr-2">{section.number}.</span>
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

// パイプラインステップコンポーネント
function PipelineStep({ step, title, color }: { step: string; title: string; color: string }) {
  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  };

  return (
    <div className={`px-4 py-2 rounded-lg border ${colorClasses[color]}`}>
      <span className="font-semibold">{step}</span>
      <p className="text-sm opacity-80">{title}</p>
    </div>
  );
}

export default function ScoringPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>ガイドに戻る</span>
          </Link>
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <CalculatorIcon className="w-4 h-4" />
            技術仕様書
          </span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* タイトルセクション */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full">
              SPEC DOCUMENT
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            スコアリングシステム仕様書
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            投稿候補のエンゲージメント予測から最終ランキングスコア算出までの技術仕様
          </p>
        </div>

        {/* 目次 */}
        <TableOfContents />

        {/* セクション1: 概要 */}
        <SectionHeader id="overview" number="1" title="概要" icon={ChartBarIcon} />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Xアルゴリズムのスコアリングシステムは、投稿候補に対してユーザーエンゲージメントを予測し、最終的なランキングスコアを算出します。本システムは複数のScorerコンポーネントで構成され、パイプライン形式で順次処理を行います。
        </p>

        <SubSectionHeader id="architecture" number="1.1" title="アーキテクチャ" />

        <DiagramBox title="スコアリングパイプライン">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <PipelineStep step="入力" title="投稿候補" color="blue" />
            <span className="text-gray-400">→</span>
            <PipelineStep step="1" title="PhoenixScorer" color="purple" />
            <span className="text-gray-400">→</span>
            <PipelineStep step="2" title="WeightedScorer" color="amber" />
            <span className="text-gray-400">→</span>
            <PipelineStep step="3" title="AuthorDiversityScorer" color="blue" />
            <span className="text-gray-400">→</span>
            <PipelineStep step="4" title="OONScorer" color="green" />
            <span className="text-gray-400">→</span>
            <PipelineStep step="出力" title="最終スコア" color="green" />
          </div>
        </DiagramBox>

        <SubSectionHeader id="scorer-trait" number="1.2" title="Scorerトレイト" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          すべてのScorerは共通のトレイトを実装します：
        </p>

        <CodeBlock language="rust" title="Scorer トレイト定義">{`pub trait Scorer<Q, C>: Send + Sync {
    /// 実行可否の判定
    fn enable(&self, _query: &Q) -> bool { true }

    /// 候補のスコアリング（非同期）
    async fn score(&self, query: &Q, candidates: &[C]) -> Result<Vec<C>, String>;

    /// 単一候補の更新
    fn update(&self, candidate: &mut C, scored: C);

    /// 全候補の一括更新
    fn update_all(&self, candidates: &mut [C], scored: Vec<C>);
}`}</CodeBlock>

        <InfoBox type="important" title="重要">
          <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">score</code>メソッドは入力と同じ順序・同じ数の候補を返す必要があります。候補の削除はScorerではなくFilterステージで行います。
        </InfoBox>

        {/* セクション2: Phoenix Scorer */}
        <SectionHeader id="phoenix-scorer" number="2" title="Phoenix Scorer" icon={CalculatorIcon} />

        <SubSectionHeader id="phoenix-overview" number="2.1" title="概要" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Phoenix ScorerはPhoenixモデルを用いて、各投稿に対するユーザーアクションの発生確率を予測します。
        </p>

        <SubSectionHeader id="phoenix-input" number="2.2" title="入力" />

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><code className="text-amber-600 dark:text-amber-400">user_id</code>: ユーザーID</li>
            <li><code className="text-amber-600 dark:text-amber-400">user_action_sequence</code>: ユーザーの過去のアクション履歴</li>
            <li><code className="text-amber-600 dark:text-amber-400">tweet_infos</code>: 投稿情報（ツイートID、著者ID）</li>
          </ul>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          リツイートの場合、元ツイートのIDと著者IDを使用します：
        </p>

        <CodeBlock language="rust">{`let tweet_id = c.retweeted_tweet_id.unwrap_or(c.tweet_id as u64);
let author_id = c.retweeted_user_id.unwrap_or(c.author_id);`}</CodeBlock>

        <SubSectionHeader id="predicted-actions" number="2.3" title="予測アクション一覧" />

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          ポジティブアクション（離散）
        </h4>

        <DataTable
          headers={['アクション名', '内部名', '説明']}
          rows={[
            ['いいね', <code key="a1" className="text-green-600 dark:text-green-400">ServerTweetFav</code>, 'ツイートにいいねを付ける'],
            ['リプライ', <code key="a2" className="text-green-600 dark:text-green-400">ServerTweetReply</code>, 'ツイートに返信する'],
            ['リツイート', <code key="a3" className="text-green-600 dark:text-green-400">ServerTweetRetweet</code>, 'ツイートをリツイートする'],
            ['引用', <code key="a4" className="text-green-600 dark:text-green-400">ServerTweetQuote</code>, '引用ツイートを作成する'],
            ['画像展開', <code key="a5" className="text-green-600 dark:text-green-400">ClientTweetPhotoExpand</code>, '画像を展開して表示する'],
            ['クリック', <code key="a6" className="text-green-600 dark:text-green-400">ClientTweetClick</code>, 'ツイート詳細を開く'],
            ['プロフィールクリック', <code key="a7" className="text-green-600 dark:text-green-400">ClientTweetClickProfile</code>, '著者プロフィールを閲覧する'],
            ['ビデオ品質視聴', <code key="a8" className="text-green-600 dark:text-green-400">ClientTweetVideoQualityView</code>, '動画を一定時間視聴する'],
            ['シェア', <code key="a9" className="text-green-600 dark:text-green-400">ClientTweetShare</code>, 'ツイートをシェアする'],
            ['DMでシェア', <code key="a10" className="text-green-600 dark:text-green-400">ClientTweetClickSendViaDirectMessage</code>, 'DMでツイートを共有する'],
            ['リンクコピー', <code key="a11" className="text-green-600 dark:text-green-400">ClientTweetShareViaCopyLink</code>, 'ツイートリンクをコピーする'],
            ['滞在', <code key="a12" className="text-green-600 dark:text-green-400">ClientTweetRecapDwelled</code>, 'ツイート上で滞在する'],
            ['引用クリック', <code key="a13" className="text-green-600 dark:text-green-400">ClientQuotedTweetClick</code>, '引用元ツイートをクリックする'],
            ['フォロー', <code key="a14" className="text-green-600 dark:text-green-400">ClientTweetFollowAuthor</code>, '著者をフォローする'],
          ]}
        />

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6 flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          ネガティブアクション（離散）
        </h4>

        <DataTable
          headers={['アクション名', '内部名', '説明']}
          rows={[
            ['興味なし', <code key="n1" className="text-red-600 dark:text-red-400">ClientTweetNotInterestedIn</code>, '「興味がない」を選択する'],
            ['ブロック', <code key="n2" className="text-red-600 dark:text-red-400">ClientTweetBlockAuthor</code>, '著者をブロックする'],
            ['ミュート', <code key="n3" className="text-red-600 dark:text-red-400">ClientTweetMuteAuthor</code>, '著者をミュートする'],
            ['報告', <code key="n4" className="text-red-600 dark:text-red-400">ClientTweetReport</code>, 'ツイートを報告する'],
          ]}
        />

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6 flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
          連続アクション
        </h4>

        <DataTable
          headers={['アクション名', '内部名', '説明']}
          rows={[
            ['滞在時間', <code key="c1" className="text-amber-600 dark:text-amber-400">DwellTime</code>, 'ツイート上での滞在時間（秒）'],
          ]}
        />

        <SubSectionHeader id="log-prob-conversion" number="2.4" title="ログ確率からの変換" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Phoenixモデルはアクションのログ確率を出力します。これを確率に変換します：
        </p>

        <CodeBlock language="rust">{`let action_probs: HashMap<usize, f64> = distribution
    .top_log_probs
    .iter()
    .enumerate()
    .map(|(idx, log_prob)| (idx, (*log_prob as f64).exp()))
    .collect();`}</CodeBlock>

        <div className="my-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">数学的表現</p>
          <code className="text-amber-700 dark:text-amber-400">P(action) = exp(log_prob)</code>
        </div>

        <SubSectionHeader id="phoenix-output" number="2.5" title="出力: PhoenixScores" />

        <CodeBlock language="rust" title="PhoenixScores 構造体">{`pub struct PhoenixScores {
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
}`}</CodeBlock>

        {/* セクション3: Weighted Scorer */}
        <SectionHeader id="weighted-scorer" number="3" title="Weighted Scorer" icon={ScaleIcon} />

        <SubSectionHeader id="weighted-overview" number="3.1" title="概要" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Weighted Scorerは、Phoenix Scorerが出力した各アクション確率に重みを掛け合わせ、最終的な重み付きスコアを算出します。
        </p>

        <SubSectionHeader id="weight-formula" number="3.2" title="重み計算式" />

        <div className="my-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">基本計算式</p>
          <code className="text-amber-700 dark:text-amber-400 text-lg">Final Score = &Sigma; (weight_i &times; P(action_i))</code>
        </div>

        <CodeBlock language="rust" title="詳細な計算式">{`combined_score =
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
  + report_score × REPORT_WEIGHT`}</CodeBlock>

        <SubSectionHeader id="weight-classification" number="3.3" title="アクション重みの分類" />

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          ポジティブアクション重み
        </h4>

        <DataTable
          headers={['アクション', '重みパラメータ', '説明']}
          rows={[
            ['いいね', <code key="w1" className="text-green-600 dark:text-green-400">FAVORITE_WEIGHT</code>, 'エンゲージメントの基本指標'],
            ['リプライ', <code key="w2" className="text-green-600 dark:text-green-400">REPLY_WEIGHT</code>, '会話参加の意思を示す'],
            ['リツイート', <code key="w3" className="text-green-600 dark:text-green-400">RETWEET_WEIGHT</code>, '拡散価値の高いコンテンツ'],
            ['画像展開', <code key="w4" className="text-green-600 dark:text-green-400">PHOTO_EXPAND_WEIGHT</code>, '視覚コンテンツへの興味'],
            ['クリック', <code key="w5" className="text-green-600 dark:text-green-400">CLICK_WEIGHT</code>, '詳細閲覧の意思'],
            ['プロフィールクリック', <code key="w6" className="text-green-600 dark:text-green-400">PROFILE_CLICK_WEIGHT</code>, '著者への興味'],
            ['シェア', <code key="w7" className="text-green-600 dark:text-green-400">SHARE_WEIGHT</code>, '外部共有の意思'],
            ['DMシェア', <code key="w8" className="text-green-600 dark:text-green-400">SHARE_VIA_DM_WEIGHT</code>, 'プライベート共有'],
            ['リンクコピー', <code key="w9" className="text-green-600 dark:text-green-400">SHARE_VIA_COPY_LINK_WEIGHT</code>, '外部参照の意図'],
            ['滞在', <code key="w10" className="text-green-600 dark:text-green-400">DWELL_WEIGHT</code>, 'コンテンツ消費時間'],
            ['引用', <code key="w11" className="text-green-600 dark:text-green-400">QUOTE_WEIGHT</code>, 'コメント付き拡散'],
            ['引用クリック', <code key="w12" className="text-green-600 dark:text-green-400">QUOTED_CLICK_WEIGHT</code>, '引用元への興味'],
            ['滞在時間', <code key="w13" className="text-green-600 dark:text-green-400">CONT_DWELL_TIME_WEIGHT</code>, '連続的な滞在時間'],
            ['フォロー', <code key="w14" className="text-green-600 dark:text-green-400">FOLLOW_AUTHOR_WEIGHT</code>, '継続的な関係構築'],
          ]}
        />

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6 flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          ネガティブアクション重み
        </h4>

        <InfoBox type="warning" title="注意">
          ネガティブアクションの重みは<strong>負の値</strong>を持ち、スコアを減少させます。
        </InfoBox>

        <DataTable
          headers={['アクション', '重みパラメータ', '説明']}
          rows={[
            ['興味なし', <code key="nw1" className="text-red-600 dark:text-red-400">NOT_INTERESTED_WEIGHT</code>, '明示的な拒否'],
            ['ブロック', <code key="nw2" className="text-red-600 dark:text-red-400">BLOCK_AUTHOR_WEIGHT</code>, '強い拒否反応'],
            ['ミュート', <code key="nw3" className="text-red-600 dark:text-red-400">MUTE_AUTHOR_WEIGHT</code>, '中程度の拒否'],
            ['報告', <code key="nw4" className="text-red-600 dark:text-red-400">REPORT_WEIGHT</code>, '規約違反の可能性'],
          ]}
        />

        <SubSectionHeader id="vqv-weight" number="3.4" title="Video Quality View (VQV) 重み" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          VQV重みは動画投稿にのみ適用される条件付き重みです：
        </p>

        <CodeBlock language="rust" title="VQV重み適用判定">{`fn vqv_weight_eligibility(candidate: &PostCandidate) -> f64 {
    if candidate.video_duration_ms.is_some_and(|ms| ms > MIN_VIDEO_DURATION_MS) {
        VQV_WEIGHT
    } else {
        0.0
    }
}`}</CodeBlock>

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">適用条件：</p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>- 投稿に動画が含まれている（<code className="text-amber-600 dark:text-amber-400">video_duration_ms</code>が存在）</li>
            <li>- 動画の長さが最小閾値（<code className="text-amber-600 dark:text-amber-400">MIN_VIDEO_DURATION_MS</code>）を超えている</li>
          </ul>
        </div>

        <SubSectionHeader id="score-offset" number="3.5" title="スコアオフセット処理" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          負のスコアを適切に処理するためのオフセット計算：
        </p>

        <CodeBlock language="rust" title="オフセット処理">{`fn offset_score(combined_score: f64) -> f64 {
    if WEIGHTS_SUM == 0.0 {
        combined_score.max(0.0)
    } else if combined_score < 0.0 {
        (combined_score + NEGATIVE_WEIGHTS_SUM) / WEIGHTS_SUM * NEGATIVE_SCORES_OFFSET
    } else {
        combined_score + NEGATIVE_SCORES_OFFSET
    }
}`}</CodeBlock>

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            <li><code className="text-amber-600 dark:text-amber-400">WEIGHTS_SUM</code>: 全重みの合計</li>
            <li><code className="text-amber-600 dark:text-amber-400">NEGATIVE_WEIGHTS_SUM</code>: ネガティブ重みの合計（絶対値）</li>
            <li><code className="text-amber-600 dark:text-amber-400">NEGATIVE_SCORES_OFFSET</code>: スコア調整用のオフセット値</li>
          </ul>
        </div>

        {/* セクション4: Author Diversity Scorer */}
        <SectionHeader id="author-diversity" number="4" title="Author Diversity Scorer" icon={UsersIcon} />

        <SubSectionHeader id="diversity-overview" number="4.1" title="概要" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Author Diversity Scorerは、フィード内での著者の多様性を確保するため、同一著者の連続投稿に対してスコアを減衰させます。
        </p>

        <SubSectionHeader id="diversity-parameters" number="4.2" title="パラメータ" />

        <DataTable
          headers={['パラメータ', '説明']}
          rows={[
            [<code key="d1" className="text-blue-600 dark:text-blue-400">decay_factor</code>, '減衰係数（0-1の範囲）'],
            [<code key="d2" className="text-blue-600 dark:text-blue-400">floor</code>, 'スコア乗数の下限値（最低保証）'],
          ]}
        />

        <CodeBlock language="rust" title="デフォルト値">{`impl Default for AuthorDiversityScorer {
    fn default() -> Self {
        Self::new(AUTHOR_DIVERSITY_DECAY, AUTHOR_DIVERSITY_FLOOR)
    }
}`}</CodeBlock>

        <SubSectionHeader id="decay-formula" number="4.3" title="減衰計算式" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          著者の投稿が表示されるたびに、その著者の次の投稿のスコア乗数が減少します：
        </p>

        <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">減衰計算式</p>
          <code className="text-blue-700 dark:text-blue-400 text-lg">multiplier = (1 - floor) &times; decay_factor^position + floor</code>
        </div>

        <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            <li><code className="text-blue-600 dark:text-blue-400">position</code>: その著者の投稿が現れた回数（0から開始）</li>
            <li><code className="text-blue-600 dark:text-blue-400">decay_factor</code>: 減衰の速度を制御（例: 0.5）</li>
            <li><code className="text-blue-600 dark:text-blue-400">floor</code>: 乗数の最小値（例: 0.1）</li>
          </ul>
        </div>

        <CodeBlock language="rust" title="乗数計算実装">{`fn multiplier(&self, position: usize) -> f64 {
    (1.0 - self.floor) * self.decay_factor.powf(position as f64) + self.floor
}`}</CodeBlock>

        <SubSectionHeader id="decay-curve" number="4.4" title="減衰曲線の例" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-600 dark:text-blue-400">decay_factor = 0.5</code>, <code className="text-blue-600 dark:text-blue-400">floor = 0.1</code> の場合：
        </p>

        <DataTable
          headers={['出現位置', '乗数']}
          rows={[
            ['0 (初回)', <span key="m0" className="font-semibold text-green-600 dark:text-green-400">1.00</span>],
            ['1', '0.55'],
            ['2', '0.325'],
            ['3', '0.2125'],
            ['4', '0.15625'],
            ['5+', <span key="m5" className="text-gray-500">≒ 0.1 (floor)</span>],
          ]}
        />

        <SubSectionHeader id="diversity-effect" number="4.5" title="効果" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">連続表示の抑制</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">同一著者の投稿が連続して表示されることを抑制</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="font-semibold text-green-800 dark:text-green-300 mb-2">多様性の向上</p>
            <p className="text-sm text-green-700 dark:text-green-400">フィード全体の著者バリエーションを増加</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="font-semibold text-purple-800 dark:text-purple-300 mb-2">UX改善</p>
            <p className="text-sm text-purple-700 dark:text-purple-400">ユーザー体験の質を向上</p>
          </div>
        </div>

        {/* セクション5: OON Scorer */}
        <SectionHeader id="oon-scorer" number="5" title="Out-of-Network (OON) Scorer" icon={GlobeAltIcon} />

        <SubSectionHeader id="oon-overview" number="5.1" title="概要" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          OON Scorerは、ユーザーがフォローしていない著者（ネットワーク外）の投稿と、フォローしている著者（ネットワーク内）の投稿のバランスを調整します。
        </p>

        <SubSectionHeader id="in-network-priority" number="5.2" title="インネットワーク優先係数" />

        <CodeBlock language="rust" title="OON スコア調整">{`match c.in_network {
    Some(false) => base_score * OON_WEIGHT_FACTOR,
    _ => base_score,
}`}</CodeBlock>

        <DataTable
          headers={['投稿タイプ', 'スコア乗数']}
          rows={[
            [<span key="t1" className="font-semibold text-green-600 dark:text-green-400">インネットワーク</span>, '1.0 (変更なし)'],
            [<span key="t2" className="font-semibold text-amber-600 dark:text-amber-400">アウトオブネットワーク</span>, <code key="v2" className="text-amber-600 dark:text-amber-400">OON_WEIGHT_FACTOR</code>],
          ]}
        />

        <SubSectionHeader id="oon-effect" number="5.3" title="効果" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="font-semibold text-green-800 dark:text-green-300 mb-2">フォロー優先</p>
            <p className="text-sm text-green-700 dark:text-green-400">フォローしている著者の投稿を優先表示</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">レコメンド制御</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">ネットワーク外投稿の露出を適切に制御</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">ソーシャルグラフ尊重</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">ユーザーの人間関係を尊重した表示</p>
          </div>
        </div>

        {/* セクション6: スコアの流れと最終出力 */}
        <SectionHeader id="score-flow" number="6" title="スコアの流れと最終出力" icon={ArrowPathIcon} />

        <SubSectionHeader id="score-fields" number="6.1" title="スコアフィールド" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <code className="text-amber-600 dark:text-amber-400">PostCandidate</code>には複数のスコアフィールドが存在します：
        </p>

        <CodeBlock language="rust" title="PostCandidate スコアフィールド">{`pub struct PostCandidate {
    // ...
    pub phoenix_scores: PhoenixScores,    // Phoenixモデルの予測結果
    pub weighted_score: Option<f64>,       // 重み付きスコア
    pub score: Option<f64>,                // 最終スコア
    // ...
}`}</CodeBlock>

        <SubSectionHeader id="score-pipeline" number="6.2" title="スコア計算パイプライン" />

        <DiagramBox title="スコア計算パイプライン詳細">
          <div className="space-y-4 font-mono text-sm">
            <div className="border border-purple-200 dark:border-purple-800 rounded p-3 bg-purple-50 dark:bg-purple-900/20">
              <p className="font-semibold text-purple-800 dark:text-purple-300">PhoenixScorer</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">入力: 候補リスト + ユーザーアクション履歴</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">出力: phoenix_scores (各アクション確率)</p>
            </div>
            <div className="text-center text-gray-400">↓</div>
            <div className="border border-amber-200 dark:border-amber-800 rounded p-3 bg-amber-50 dark:bg-amber-900/20">
              <p className="font-semibold text-amber-800 dark:text-amber-300">WeightedScorer</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">入力: phoenix_scores</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">出力: weighted_score (重み付き合計)</p>
            </div>
            <div className="text-center text-gray-400">↓</div>
            <div className="border border-blue-200 dark:border-blue-800 rounded p-3 bg-blue-50 dark:bg-blue-900/20">
              <p className="font-semibold text-blue-800 dark:text-blue-300">AuthorDiversityScorer</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">入力: weighted_score</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">出力: score (多様性調整後)</p>
            </div>
            <div className="text-center text-gray-400">↓</div>
            <div className="border border-green-200 dark:border-green-800 rounded p-3 bg-green-50 dark:bg-green-900/20">
              <p className="font-semibold text-green-800 dark:text-green-300">OONScorer</p>
              <p className="text-xs text-green-600 dark:text-green-400">入力: score</p>
              <p className="text-xs text-green-700 dark:text-green-300 font-semibold">出力: score (ネットワーク調整後) ← 最終スコア</p>
            </div>
          </div>
        </DiagramBox>

        <SubSectionHeader id="score-normalization" number="6.3" title="スコア正規化" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          各段階でスコアの正規化が行われ、以下を保証します：
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <p className="font-semibold text-gray-800 dark:text-gray-200">1. 比較可能性</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">スコアの比較可能性</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <p className="font-semibold text-gray-800 dark:text-gray-200">2. 数値安定性</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">数値計算の安定性</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <p className="font-semibold text-gray-800 dark:text-gray-200">3. 互換性</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">下流処理との互換性</p>
          </div>
        </div>

        {/* セクション7: 設定パラメータ一覧 */}
        <SectionHeader id="parameters" number="7" title="設定パラメータ一覧" icon={Cog6ToothIcon} />

        <InfoBox type="info" title="情報">
          すべてのスコアリング関連パラメータは<code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">params</code>モジュールで定義されます（セキュリティ上の理由でオープンソースリリースから除外）。
        </InfoBox>

        <SubSectionHeader id="weight-parameters" number="7.1" title="重みパラメータ" />

        <DataTable
          headers={['パラメータ名', '用途']}
          rows={[
            [<code key="p1" className="text-amber-600 dark:text-amber-400">FAVORITE_WEIGHT</code>, 'いいね重み'],
            [<code key="p2" className="text-amber-600 dark:text-amber-400">REPLY_WEIGHT</code>, 'リプライ重み'],
            [<code key="p3" className="text-amber-600 dark:text-amber-400">RETWEET_WEIGHT</code>, 'リツイート重み'],
            [<code key="p4" className="text-amber-600 dark:text-amber-400">PHOTO_EXPAND_WEIGHT</code>, '画像展開重み'],
            [<code key="p5" className="text-amber-600 dark:text-amber-400">CLICK_WEIGHT</code>, 'クリック重み'],
            [<code key="p6" className="text-amber-600 dark:text-amber-400">PROFILE_CLICK_WEIGHT</code>, 'プロフィールクリック重み'],
            [<code key="p7" className="text-amber-600 dark:text-amber-400">VQV_WEIGHT</code>, 'ビデオ品質視聴重み'],
            [<code key="p8" className="text-amber-600 dark:text-amber-400">SHARE_WEIGHT</code>, 'シェア重み'],
            [<code key="p9" className="text-amber-600 dark:text-amber-400">SHARE_VIA_DM_WEIGHT</code>, 'DMシェア重み'],
            [<code key="p10" className="text-amber-600 dark:text-amber-400">SHARE_VIA_COPY_LINK_WEIGHT</code>, 'リンクコピー重み'],
            [<code key="p11" className="text-amber-600 dark:text-amber-400">DWELL_WEIGHT</code>, '滞在重み'],
            [<code key="p12" className="text-amber-600 dark:text-amber-400">QUOTE_WEIGHT</code>, '引用重み'],
            [<code key="p13" className="text-amber-600 dark:text-amber-400">QUOTED_CLICK_WEIGHT</code>, '引用クリック重み'],
            [<code key="p14" className="text-amber-600 dark:text-amber-400">CONT_DWELL_TIME_WEIGHT</code>, '連続滞在時間重み'],
            [<code key="p15" className="text-amber-600 dark:text-amber-400">FOLLOW_AUTHOR_WEIGHT</code>, 'フォロー重み'],
            [<code key="p16" className="text-red-600 dark:text-red-400">NOT_INTERESTED_WEIGHT</code>, '興味なし重み（負）'],
            [<code key="p17" className="text-red-600 dark:text-red-400">BLOCK_AUTHOR_WEIGHT</code>, 'ブロック重み（負）'],
            [<code key="p18" className="text-red-600 dark:text-red-400">MUTE_AUTHOR_WEIGHT</code>, 'ミュート重み（負）'],
            [<code key="p19" className="text-red-600 dark:text-red-400">REPORT_WEIGHT</code>, '報告重み（負）'],
          ]}
        />

        <SubSectionHeader id="diversity-parameters" number="7.2" title="多様性パラメータ" />

        <DataTable
          headers={['パラメータ名', '用途']}
          rows={[
            [<code key="d1" className="text-blue-600 dark:text-blue-400">AUTHOR_DIVERSITY_DECAY</code>, '著者多様性の減衰係数'],
            [<code key="d2" className="text-blue-600 dark:text-blue-400">AUTHOR_DIVERSITY_FLOOR</code>, '著者多様性の下限値'],
          ]}
        />

        <SubSectionHeader id="network-parameters" number="7.3" title="ネットワークパラメータ" />

        <DataTable
          headers={['パラメータ名', '用途']}
          rows={[
            [<code key="n1" className="text-green-600 dark:text-green-400">OON_WEIGHT_FACTOR</code>, 'ネットワーク外重み係数'],
          ]}
        />

        <SubSectionHeader id="video-parameters" number="7.4" title="動画パラメータ" />

        <DataTable
          headers={['パラメータ名', '用途']}
          rows={[
            [<code key="v1" className="text-purple-600 dark:text-purple-400">MIN_VIDEO_DURATION_MS</code>, 'VQV適用の最小動画長（ミリ秒）'],
          ]}
        />

        <SubSectionHeader id="normalization-parameters" number="7.5" title="正規化パラメータ" />

        <DataTable
          headers={['パラメータ名', '用途']}
          rows={[
            [<code key="norm1" className="text-gray-600 dark:text-gray-400">WEIGHTS_SUM</code>, '全重みの合計'],
            [<code key="norm2" className="text-gray-600 dark:text-gray-400">NEGATIVE_WEIGHTS_SUM</code>, 'ネガティブ重みの合計'],
            [<code key="norm3" className="text-gray-600 dark:text-gray-400">NEGATIVE_SCORES_OFFSET</code>, '負スコアオフセット'],
          ]}
        />

        {/* セクション8: 関連ファイル */}
        <SectionHeader id="files" number="8" title="関連ファイル" icon={AdjustmentsHorizontalIcon} />

        <DataTable
          headers={['ファイル', '説明']}
          rows={[
            [<code key="f1" className="text-amber-600 dark:text-amber-400">/home-mixer/scorers/phoenix_scorer.rs</code>, 'Phoenix Scorer実装'],
            [<code key="f2" className="text-amber-600 dark:text-amber-400">/home-mixer/scorers/weighted_scorer.rs</code>, 'Weighted Scorer実装'],
            [<code key="f3" className="text-amber-600 dark:text-amber-400">/home-mixer/scorers/author_diversity_scorer.rs</code>, 'Author Diversity Scorer実装'],
            [<code key="f4" className="text-amber-600 dark:text-amber-400">/home-mixer/scorers/oon_scorer.rs</code>, 'OON Scorer実装'],
            [<code key="f5" className="text-amber-600 dark:text-amber-400">/home-mixer/candidate_pipeline/candidate.rs</code>, 'PostCandidate, PhoenixScores定義'],
            [<code key="f6" className="text-amber-600 dark:text-amber-400">/candidate-pipeline/scorer.rs</code>, 'Scorerトレイト定義'],
          ]}
        />

        {/* フッターナビゲーション */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Link
              href="/specs/phoenix-ml"
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">関連仕様書</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">Phoenix ML モデル仕様書</span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              <span className="font-semibold text-amber-700 dark:text-amber-300">ガイドに戻る</span>
            </Link>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          X レコメンドアルゴリズム - オープンソース技術仕様書
        </div>
      </footer>
    </div>
  );
}

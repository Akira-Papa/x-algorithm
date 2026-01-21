'use client';

import Link from 'next/link';
import {
  CheckCircleIcon,
  CalculatorIcon,
  ScaleIcon,
  UserMinusIcon,
  UsersIcon,
  PlayCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LightBulbIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from '@/components/ui/Quiz';
import { FAQ } from '@/components/ui/Accordion';
import { ChapterNav } from '@/components/ui/ChapterNav';

// Section Header Component
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-800 pb-3">
      <span className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 font-mono text-lg font-bold text-white">
        {number}
      </span>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
    </div>
  );
}

// Textbook Box Component
function TextbookBox({
  type,
  title,
  children,
}: {
  type: 'info' | 'warning' | 'important' | 'definition';
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      border: 'border-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      header: 'bg-blue-400 text-white',
      icon: <InformationCircleIcon className="h-5 w-5" />,
    },
    warning: {
      border: 'border-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      header: 'bg-amber-400 text-white',
      icon: <ExclamationTriangleIcon className="h-5 w-5" />,
    },
    important: {
      border: 'border-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      header: 'bg-red-400 text-white',
      icon: <LightBulbIcon className="h-5 w-5" />,
    },
    definition: {
      border: 'border-slate-400',
      bg: 'bg-slate-50 dark:bg-slate-800',
      header: 'bg-slate-600 text-white',
      icon: <BookOpenIcon className="h-5 w-5" />,
    },
  };

  const style = styles[type];

  return (
    <div className={`my-6 overflow-hidden rounded border-2 ${style.border}`}>
      <div className={`flex items-center gap-2 px-4 py-2 ${style.header}`}>
        {style.icon}
        <span className="font-bold">{title}</span>
      </div>
      <div className={`p-4 ${style.bg}`}>{children}</div>
    </div>
  );
}

// Code Block Component
function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="my-6 overflow-hidden rounded border border-border">
      {title && (
        <div className="border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-sm text-muted-foreground">{title}</span>
        </div>
      )}
      <pre
        className="overflow-x-auto p-4 font-mono text-sm"
        style={{ background: '#1e293b', color: '#e2e8f0' }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Formula Box Component
function FormulaBox({ formula, description }: { formula: string; description?: string }) {
  return (
    <div className="my-6 rounded border border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-600 dark:bg-slate-800">
      <div className="font-mono text-lg text-slate-800 dark:text-slate-200">{formula}</div>
      {description && (
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</div>
      )}
    </div>
  );
}

// Score Composition Diagram
function ScoreCompositionDiagram() {
  return (
    <div className="my-8">
      <div className="rounded border-2 border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
        <h4 className="mb-4 text-center text-lg font-bold text-slate-800 dark:text-slate-100">
          図5-1：最終スコアの合成（掛け算）
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="rounded border border-purple-300 bg-purple-50 px-4 py-3 text-center dark:border-purple-700 dark:bg-purple-900/30">
            <div className="text-xs text-purple-600 dark:text-purple-400">Phoenix</div>
            <div className="text-xl font-bold text-purple-800 dark:text-purple-200">1.365</div>
          </div>
          <XMarkIcon className="h-5 w-5 text-slate-400" />
          <div className="rounded border border-blue-300 bg-blue-50 px-4 py-3 text-center dark:border-blue-700 dark:bg-blue-900/30">
            <div className="text-xs text-blue-600 dark:text-blue-400">OON</div>
            <div className="text-xl font-bold text-blue-800 dark:text-blue-200">1.0</div>
          </div>
          <XMarkIcon className="h-5 w-5 text-slate-400" />
          <div className="rounded border border-green-300 bg-green-50 px-4 py-3 text-center dark:border-green-700 dark:bg-green-900/30">
            <div className="text-xs text-green-600 dark:text-green-400">Diversity</div>
            <div className="text-xl font-bold text-green-800 dark:text-green-200">0.9025</div>
          </div>
          <XMarkIcon className="h-5 w-5 text-slate-400" />
          <div className="rounded border border-orange-300 bg-orange-50 px-4 py-3 text-center dark:border-orange-700 dark:bg-orange-900/30">
            <div className="text-xs text-orange-600 dark:text-orange-400">VQV</div>
            <div className="text-xl font-bold text-orange-800 dark:text-orange-200">1.5</div>
          </div>
          <span className="text-2xl font-bold text-slate-400">=</span>
          <div className="rounded border-2 border-slate-800 bg-slate-800 px-4 py-3 text-center dark:border-slate-200 dark:bg-slate-700">
            <div className="text-xs text-slate-300">最終スコア</div>
            <div className="text-2xl font-bold text-white">1.848</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Weight Table Component
function WeightTable() {
  const weights = [
    { engagement: 'リプライ', weight: 13.5, type: 'positive', note: '最高重み' },
    { engagement: 'プロフィールクリック', weight: 12.0, type: 'positive', note: '2番目' },
    { engagement: 'フォロー', weight: 4.0, type: 'positive', note: '' },
    { engagement: '引用', weight: 1.1, type: 'positive', note: '' },
    { engagement: 'リポスト', weight: 1.0, type: 'positive', note: '' },
    { engagement: 'いいね', weight: 0.5, type: 'positive', note: '最低重み' },
    { engagement: '通報', weight: -10.0, type: 'negative', note: '最大ペナルティ' },
    { engagement: 'ブロック', weight: -10.0, type: 'negative', note: '' },
    { engagement: 'ミュート', weight: -5.0, type: 'negative', note: '' },
    { engagement: '興味なし', weight: -1.5, type: 'negative', note: '' },
  ];

  return (
    <div className="my-6 overflow-hidden rounded border border-slate-300 dark:border-slate-600">
      <div className="border-b border-slate-300 bg-slate-100 px-4 py-2 dark:border-slate-600 dark:bg-slate-700">
        <span className="font-bold text-slate-700 dark:text-slate-200">表5-1：エンゲージメント重み付け一覧</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800">
            <th className="border-b border-r border-slate-300 px-4 py-2 text-left dark:border-slate-600">エンゲージメント</th>
            <th className="border-b border-r border-slate-300 px-4 py-2 text-center dark:border-slate-600">重み</th>
            <th className="border-b border-slate-300 px-4 py-2 text-left dark:border-slate-600">備考</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((item, index) => (
            <tr key={index} className={item.type === 'negative' ? 'bg-red-50 dark:bg-red-900/10' : ''}>
              <td className="border-b border-r border-slate-300 px-4 py-2 dark:border-slate-600">{item.engagement}</td>
              <td className={`border-b border-r border-slate-300 px-4 py-2 text-center font-mono font-bold dark:border-slate-600 ${
                item.type === 'negative' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                {item.weight > 0 ? '+' : ''}{item.weight}
              </td>
              <td className="border-b border-slate-300 px-4 py-2 text-slate-600 dark:border-slate-600 dark:text-slate-400">{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Decay Table Component
function DecayTable() {
  const data = [
    { count: 0, factor: 1.0, penalty: '0%' },
    { count: 1, factor: 0.95, penalty: '5%' },
    { count: 2, factor: 0.9025, penalty: '10%' },
    { count: 3, factor: 0.857, penalty: '14%' },
    { count: 4, factor: 0.815, penalty: '19%' },
    { count: 5, factor: 0.774, penalty: '23%' },
    { count: 9, factor: 0.630, penalty: '37%' },
  ];

  return (
    <div className="my-6 overflow-hidden rounded border border-slate-300 dark:border-slate-600">
      <div className="border-b border-slate-300 bg-slate-100 px-4 py-2 dark:border-slate-600 dark:bg-slate-700">
        <span className="font-bold text-slate-700 dark:text-slate-200">表5-2：Author Diversity減衰係数</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800">
            <th className="border-b border-r border-slate-300 px-4 py-2 text-center dark:border-slate-600">同一著者数</th>
            <th className="border-b border-r border-slate-300 px-4 py-2 text-center dark:border-slate-600">係数 (0.95^n)</th>
            <th className="border-b border-slate-300 px-4 py-2 text-center dark:border-slate-600">ペナルティ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border-b border-r border-slate-300 px-4 py-2 text-center dark:border-slate-600">{item.count}件目</td>
              <td className="border-b border-r border-slate-300 px-4 py-2 text-center font-mono dark:border-slate-600">{item.factor}</td>
              <td className={`border-b border-slate-300 px-4 py-2 text-center dark:border-slate-600 ${
                item.penalty === '0%' ? 'text-emerald-600' : 'text-red-600'
              }`}>{item.penalty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Scorer Card Component
function ScorerCard({
  icon,
  title,
  description,
  formula,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  formula?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
      <div className="flex items-center gap-3 border-b border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-600 dark:bg-slate-700">
        <div className="text-slate-600 dark:text-slate-300">{icon}</div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <div className="p-4">
        {formula && (
          <div className="mb-4 rounded bg-slate-50 p-3 text-center font-mono dark:bg-slate-900">
            {formula}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// FAQ Data
const faqData = [
  {
    question: 'なぜ複数のスコアラーが掛け算で合成されるのですか？',
    answer: '掛け算による合成には重要な特性があります：一つでも弱い要素があると、全体のスコアが大きく下がります。例えば、Phoenix Scoreが高くてもAuthor Diversityペナルティがある場合、全体スコアが低下します。これにより、すべての次元でバランスの取れた品質が確保されます。',
  },
  {
    question: 'OON Scorerの15%ペナルティはどのくらい影響がありますか？',
    answer: '非フォロワーは0.85の係数（15%ペナルティ）を受けます。例：Phoenix Score 1.365の投稿がフォロワーに届く場合は1.365 x 1.0 = 1.365、非フォロワーに届く場合は1.365 x 0.85 = 1.16となります。まずフォロワー基盤を構築し、IN（ネットワーク内）で強いエンゲージメントを生み出すことが重要です。',
  },
  {
    question: 'Author Diversityの0.95減衰とは何ですか？',
    answer: 'Author Diversityは、同じ著者が複数回表示される際に指数減衰（0.95^n）を適用します。1番目は1.0（ペナルティなし）、2番目は0.95（5%減少）、3番目は0.9025（10%減少）となります。最適なリーチのために投稿間隔を4時間以上空けることを推奨します。',
  },
  {
    question: 'VQV Scorerのボーナスを得るための条件は？',
    answer: 'VQV（Video Quality View）は3つの条件すべてを満たす必要があります：(1) 最小視聴時間 - min(10秒, 動画時間/2)を視聴、(2) 音声オン - ミュートされた自動再生は不可、(3) スクロールで通過していない - 意図的な視聴であること。すべて満たすと1.5倍の乗数（50%ボーナス）を獲得できます。',
  },
  {
    question: 'スコアを最大化するための優先順位は？',
    answer: '最高優先度はリプライを誘発するコンテンツ（重み13.5）とプロフィールクリック（重み12.0）です。中優先度はフォロワーエンゲージメント優先（OON 1.0 vs 0.85）と動画品質（VQV 1.5倍）。基盤優先度は投稿頻度（4時間以上の間隔）とネガティブシグナル回避（通報-10、ブロック-10）です。',
  },
];

// Quiz Questions Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'スコアの合成方法は？',
    choices: [
      { id: 'A', text: '足し算' },
      { id: 'B', text: '掛け算' },
      { id: 'C', text: '平均' },
      { id: 'D', text: '最大値選択' },
    ],
    correctAnswer: 'B',
    explanation: 'スコアは掛け算で合成されるため、どの領域でも弱点があると最終スコアに大きく影響します。',
  },
  {
    id: 2,
    question: 'OONペナルティの係数は？',
    choices: [
      { id: 'A', text: '0.75' },
      { id: 'B', text: '0.80' },
      { id: 'C', text: '0.85' },
      { id: 'D', text: '0.90' },
    ],
    correctAnswer: 'C',
    explanation: 'フォロー外ユーザーはフォロワーと比較して0.85の係数（15%ペナルティ）を受けます。',
  },
  {
    id: 3,
    question: 'Author Diversityの減衰係数は？',
    choices: [
      { id: 'A', text: '0.90' },
      { id: 'B', text: '0.95' },
      { id: 'C', text: '0.98' },
      { id: 'D', text: '0.99' },
    ],
    correctAnswer: 'B',
    explanation: '同じ著者からの追加投稿ごとに0.95が掛けられ、指数関数的に減衰します。',
  },
  {
    id: 4,
    question: 'VQVボーナスの倍率は？',
    choices: [
      { id: 'A', text: '1.2倍' },
      { id: 'B', text: '1.3倍' },
      { id: 'C', text: '1.5倍' },
      { id: 'D', text: '2.0倍' },
    ],
    correctAnswer: 'C',
    explanation: 'すべての条件が満たされると、Video Quality Viewsは1.5倍の乗数（50%ボーナス）を受けます。',
  },
  {
    id: 5,
    question: 'Phoenix Scoreで最も重み付けが高いエンゲージメントは？',
    choices: [
      { id: 'A', text: 'いいね (0.5)' },
      { id: 'B', text: 'リポスト (1.0)' },
      { id: 'C', text: 'リプライ (13.5)' },
      { id: 'D', text: 'フォロー (4.0)' },
    ],
    correctAnswer: 'C',
    explanation: 'リプライが13.5で最高の重みを持ち、次いでプロフィールクリックが12.0です。',
  },
];

// Main Component
export default function Chapter5Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>目次に戻る</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/chapters/4" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              第4章
            </Link>
            <Link href="/chapters/6" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              第6章
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Title */}
        <div className="mb-8 border-b-4 border-double border-slate-800 pb-6">
          <div className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">第5章</div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 md:text-4xl">
            スコアリングシステム完全ガイド
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            複数スコアラーの仕組みと最終スコア計算
          </p>
        </div>

        {/* Section 5.1 */}
        <section className="mb-12">
          <SectionHeader number="5.1" title="なぜ複数のスコアラーが存在するのか" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            第4章で説明したPhoenixモデルは19種類のエンゲージメント確率を予測しますが、それだけでは最終的なランキングは決まりません。Xのレコメンデーションシステムには、Phoenix以外にも複数の<strong>スコアラー</strong>があります。
          </p>

          <TextbookBox type="warning" title="重要な設計原則">
            <p className="text-slate-700 dark:text-slate-300">
              これらのスコアは<strong>足し算</strong>ではなく、<strong>掛け算</strong>で合成されます。つまり、一つでも弱い要素があると、全体のスコアが大きく下がります。
            </p>
          </TextbookBox>

          <ScoreCompositionDiagram />

          <FormulaBox
            formula="最終スコア = Phoenix x OON x Author Diversity x VQV x ..."
            description="各スコアラーの出力を掛け合わせて最終スコアを算出"
          />
        </section>

        {/* Section 5.2 */}
        <section className="mb-12">
          <SectionHeader number="5.2" title="Phoenix Scorer" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Phoenix Scorerは、機械学習モデルによる基礎スコアを計算します。19種類のエンゲージメント確率にそれぞれ重みを掛けて合計します。
          </p>

          <ScorerCard
            icon={<CalculatorIcon className="h-6 w-6" />}
            title="Phoenix Scorer"
            description="ML予測に基づく重み付きスコア"
            formula="Score = Σ (予測確率 x 重み)"
          >
            <WeightTable />
          </ScorerCard>

          <CodeBlock
            title="phoenix_scorer.rs"
            code={`fn calculate_phoenix_score(predictions: &EngagementPredictions) -> f32 {
    let mut score = 0.0;

    // ポジティブエンゲージメント
    score += predictions.favorited * 0.5;
    score += predictions.retweeted * 1.0;
    score += predictions.replied * 13.5;      // 最高重み
    score += predictions.profile_clicked * 12.0;  // 2番目
    score += predictions.followed * 4.0;

    // ネガティブエンゲージメント
    score += predictions.reported * (-10.0);
    score += predictions.blocked * (-10.0);
    score += predictions.muted * (-5.0);

    return score;
}`}
          />

          <TextbookBox type="info" title="重み付けのポイント">
            <p className="text-slate-700 dark:text-slate-300">
              リプライ確率がわずか5%でも、重み13.5により最大の貢献者となります。「いいね」より「リプライ」や「プロフィールクリック」を誘発するコンテンツが有利です。
            </p>
          </TextbookBox>
        </section>

        {/* Section 5.3 */}
        <section className="mb-12">
          <SectionHeader number="5.3" title="OON Scorer" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            OON（Out of Network）Scorerは、投稿者と閲覧者の関係に基づいてスコアを調整します。
          </p>

          <ScorerCard
            icon={<UserMinusIcon className="h-6 w-6" />}
            title="OON Scorer"
            description="フォロー関係によるスコア調整"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded border border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-700 dark:bg-emerald-900/20">
                <UsersIcon className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
                <div className="text-sm text-emerald-600 dark:text-emerald-400">フォロワー（IN）</div>
                <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">x 1.0</div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400">ペナルティなし</div>
              </div>
              <div className="rounded border border-orange-300 bg-orange-50 p-4 text-center dark:border-orange-700 dark:bg-orange-900/20">
                <UserMinusIcon className="mx-auto mb-2 h-8 w-8 text-orange-600" />
                <div className="text-sm text-orange-600 dark:text-orange-400">非フォロワー（OON）</div>
                <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">x 0.85</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">15%ペナルティ</div>
              </div>
            </div>
          </ScorerCard>

          <CodeBlock
            title="oon_scorer.rs"
            code={`fn calculate_oon_score(user_id: &str, author_id: &str, follow_graph: &FollowGraph) -> f32 {
    if follow_graph.is_following(user_id, author_id) {
        return 1.0;  // フォロー中（ペナルティなし）
    } else {
        return 0.85; // フォロー外（15%ペナルティ）
    }
}`}
          />

          <TextbookBox type="important" title="戦略的含意">
            <p className="text-slate-700 dark:text-slate-300">
              まずフォロワー基盤を構築し、IN（ネットワーク内）で強いエンゲージメントを生み出すことが重要です。フォロワーでの反応が良ければ、OONへの拡大も期待できます。
            </p>
          </TextbookBox>
        </section>

        {/* Section 5.4 */}
        <section className="mb-12">
          <SectionHeader number="5.4" title="Author Diversity Scorer" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            このスコアラーは、同じ著者からの連続投稿がタイムラインを支配するのを防ぎます。
          </p>

          <ScorerCard
            icon={<ScaleIcon className="h-6 w-6" />}
            title="Author Diversity Scorer"
            description="同一著者の連続表示を抑制"
            formula="decay_factor = 0.95^n （n = 同一著者の投稿数）"
          >
            <DecayTable />
          </ScorerCard>

          <CodeBlock
            title="author_diversity_scorer.rs"
            code={`fn calculate_diversity_score(author_id: &str, timeline: &[Tweet]) -> f32 {
    // タイムライン内の同一著者投稿数をカウント
    let same_author_count = timeline
        .iter()
        .filter(|t| t.author_id == author_id)
        .count();

    // 0.95の指数減衰を適用
    let decay_factor = 0.95_f32.powf(same_author_count as f32);

    return decay_factor;
}`}
          />

          <TextbookBox type="info" title="ベストプラクティス">
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li>投稿間隔は最低4時間空ける</li>
              <li>1日の投稿数は3件程度に</li>
              <li>量より質を重視する</li>
            </ul>
          </TextbookBox>
        </section>

        {/* Section 5.5 */}
        <section className="mb-12">
          <SectionHeader number="5.5" title="VQV Scorer" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            VQV（Video Quality View）は、特定の条件を満たす動画コンテンツに品質ボーナスを提供します。
          </p>

          <ScorerCard
            icon={<PlayCircleIcon className="h-6 w-6" />}
            title="VQV Scorer"
            description="動画品質視聴ボーナス"
          >
            <div className="mb-4 grid gap-4 md:grid-cols-3">
              <div className="rounded border border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-600 dark:bg-slate-700">
                <ClockIcon className="mx-auto mb-2 h-8 w-8 text-slate-600 dark:text-slate-300" />
                <div className="font-bold text-slate-800 dark:text-slate-200">10秒以上</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">最小視聴時間</div>
              </div>
              <div className="rounded border border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-600 dark:bg-slate-700">
                <span className="mx-auto mb-2 block text-3xl">🔊</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">音声オン</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">サウンド有効</div>
              </div>
              <div className="rounded border border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-600 dark:bg-slate-700">
                <span className="mx-auto mb-2 block text-3xl">⬇️</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">スキップなし</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">スクロールで通過しない</div>
              </div>
            </div>
            <div className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900/30">
              <div className="text-sm text-orange-600 dark:text-orange-400">全条件達成時</div>
              <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">x 1.5</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">50%ボーナス</div>
            </div>
          </ScorerCard>

          <CodeBlock
            title="vqv_scorer.rs"
            code={`fn is_quality_view(view: &VideoView, video: &Video) -> bool {
    // 条件1: 最小視聴時間
    let min_duration = min(10_000, video.duration_ms / 2);
    let duration_ok = view.watch_time_ms >= min_duration;

    // 条件2: 音声オン
    let audio_ok = view.audio_enabled;

    // 条件3: スクロールで通過していない
    let not_scrolled = view.not_scrolled_past;

    return duration_ok && audio_ok && not_scrolled;
}`}
          />
        </section>

        {/* Section 5.6 */}
        <section className="mb-12">
          <SectionHeader number="5.6" title="この章のまとめ" />

          <div className="rounded border-2 border-slate-800 bg-slate-50 p-6 dark:bg-slate-800">
            <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">
              第5章 重要ポイント
            </h3>
            <ul className="space-y-3">
              {[
                'スコアは掛け算で合成 - 一つでも弱い要素があると全体に大きく影響',
                'Phoenix Score - リプライ（13.5）とプロフィールクリック（12.0）が最高重み',
                'OON Score - 非フォロワーは15%ペナルティ（0.85係数）',
                'Author Diversity - 連続投稿は最大40%減',
                'VQV Score - 品質動画視聴は50%ボーナス（1.5倍）',
              ].map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <TextbookBox type="info" title="今日から実践">
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li>投稿前に「これはリプライを呼ぶか？」と自問する</li>
              <li>投稿間隔は4時間以上空ける</li>
              <li>動画は最初の3秒と10秒地点に注力</li>
              <li>まずフォロワーとのエンゲージメントを優先</li>
            </ul>
          </TextbookBox>
        </section>

        {/* FAQ Section */}
        <FAQ items={faqData} />

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        {/* Next Chapter Preview */}
        <div className="mt-8 rounded border-2 border-blue-300 bg-blue-50 p-6 dark:border-blue-700 dark:bg-blue-900/20">
          <h4 className="mb-2 font-bold text-blue-800 dark:text-blue-200">次回予告：第6章 - フィルター</h4>
          <p className="text-blue-700 dark:text-blue-300">
            第6章では、スコアリング前にコンテンツを候補から除外できる「フィルター」について説明します。どんなに高いスコアでも、フィルターされたコンテンツは表示されません。
          </p>
        </div>

        {/* Chapter Navigation */}
        <ChapterNav currentChapter={5} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-slate-500">
          <p>Xアルゴリズム攻略ガイド</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LightBulbIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ArrowDownIcon,
  CpuChipIcon,
  ServerIcon,
  CloudIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from '@/components/ui/Quiz';
import { FAQ } from '@/components/ui/Accordion';
import { ChapterNav } from '@/components/ui/ChapterNav';

// 図表ボックスコンポーネント
function FigureBox({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="my-8 border border-gray-300 dark:border-gray-600 rounded">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
        <span className="text-sm font-bold text-primary dark:text-blue-300">図{number}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// コードブロックコンポーネント
function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-6 border border-border rounded overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border">
          {title}
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

// クイズデータ
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Xの推薦システムの設計思想は？',
    choices: [
      { id: 'A', text: 'いいね最大化' },
      { id: 'B', text: '滞在時間最大化' },
      { id: 'C', text: 'フォロワー最大化' },
      { id: 'D', text: '投稿数最大化' },
    ],
    correctAnswer: 'B',
    explanation: 'Xのアルゴリズムは「滞在時間最大化」を目的として設計されています。単純ないいね数ではなく、ユーザーがXを使い続けるかどうかまで予測しています。',
  },
  {
    id: 2,
    question: 'Phoenix MLモデルの主な役割は？',
    choices: [
      { id: 'A', text: 'リクエスト受付' },
      { id: 'B', text: 'フィルタリング' },
      { id: 'C', text: 'エンゲージメント予測' },
      { id: 'D', text: 'キャッシュ管理' },
    ],
    correctAnswer: 'C',
    explanation: 'Phoenixは機械学習モデルを用いて19種類のエンゲージメント確率を予測します。「この投稿を見たユーザーは、いいねするか？リプライするか？」といった行動を予測する「予測の頭脳」です。',
  },
  {
    id: 3,
    question: '8段階パイプラインで最初に大量候補を集めるステージは？',
    choices: [
      { id: 'A', text: 'Candidate Retrieval' },
      { id: 'B', text: 'Ranking' },
      { id: 'C', text: 'Post-Filtering' },
      { id: 'D', text: 'Blending' },
    ],
    correctAnswer: 'A',
    explanation: 'Candidate Retrieval（Stage 2）は数十万〜数百万の候補となる投稿を取得するステージです。Two-Tower検索を使用して大量の候補を効率的に収集します。',
  },
  {
    id: 4,
    question: 'Thunderはどの言語で書かれている？',
    choices: [
      { id: 'A', text: 'Python' },
      { id: 'B', text: 'Java' },
      { id: 'C', text: 'Rust' },
      { id: 'D', text: 'Go' },
    ],
    correctAnswer: 'C',
    explanation: 'Thunderは高速処理が求められるため、Rustで書かれています。8段階のパイプラインを数百ミリ秒で処理する必要があるため、パフォーマンスに優れたRustが選択されました。',
  },
  {
    id: 5,
    question: 'オープンソースで公開されていないものは？',
    choices: [
      { id: 'A', text: 'システム設計図' },
      { id: 'B', text: '学習済みモデルの重み' },
      { id: 'C', text: 'パイプライン構造' },
      { id: 'D', text: 'スコアリング方式' },
    ],
    correctAnswer: 'B',
    explanation: '学習済みモデルの重み（パラメータ）は非公開です。公開されているのは「システムの設計図」であり、「学習された知識」ではありません。その他、実際の特徴量定義の一部やインフラ詳細も非公開です。',
  },
];

// FAQデータ
const faqData = [
  {
    question: 'Q1: アルゴリズムを理解することで、具体的にどんなメリットがありますか？',
    answer: 'アルゴリズムを理解することで、自分の投稿がなぜ表示されるのか/されないのかを論理的に分析できるようになります。具体的には、どのようなエンゲージメント（いいね、リプライ、リツイートなど）がスコアに影響するかを把握し、投稿のタイミング、内容、形式を最適化できます。「なぜバズったのか」「なぜ伸びなかったのか」を推測ではなく技術的根拠に基づいて分析できるため、再現性のある戦略を立てることが可能になります。',
  },
  {
    question: 'Q2: Home Mixer、Thunder、Phoenixの役割の違いを簡単に説明してください',
    answer: 'Home Mixerは「受付係」で、ユーザーのリクエストを受け取り、最終的なタイムラインを組み立てて返します。Thunderは「処理係」で、8段階のパイプラインを通じて数百万の候補から最適な投稿を選別します。Phoenixは「予測係」で、機械学習モデルを使って「この投稿を見たらユーザーはどう反応するか」を19種類の確率として予測します。3つが連携することで、あなたに最適なタイムラインが生成されます。',
  },
  {
    question: 'Q3: 8段階パイプラインの中で最も重要なステージはどれですか？',
    answer: 'すべてのステージが重要ですが、特に「Stage 5: ML Scoring（Phoenix）」が核心部分です。ここでGrok Transformerモデルが19種類のエンゲージメント確率を予測し、各投稿にスコアを付けます。このスコアが最終的なランキングの基礎となるため、Phoenixの予測精度がタイムラインの質を決定づけます。',
  },
  {
    question: 'Q4: なぜXは2023年にアルゴリズムをオープンソース化したのですか？',
    answer: 'イーロン・マスク氏は「透明性」を重視しており、ユーザーがアルゴリズムの仕組みを理解できるようにすることで信頼性を高めることを目指しました。また、オープンソース化により外部の開発者やセキュリティ研究者からのフィードバックを得られる利点もあります。ただし、学習済みモデルの重み（パラメータ）や一部の特徴量定義は非公開のままです。',
  },
  {
    question: 'Q5: 「滞在時間最大化」という設計思想は、投稿戦略にどう影響しますか？',
    answer: '滞在時間最大化を理解すると、単純に「いいね」を集めるだけでは不十分だとわかります。アルゴリズムは「この投稿を見た後、ユーザーがXを使い続けるか」まで予測しています。詳細を開かせる（クリックさせる）投稿、リプライを促す投稿、フォローにつながる投稿が高く評価されます。',
  },
];

export default function Chapter1Page() {

  const pipelineStages = [
    { stage: 1, title: 'Candidate Source Selection', description: 'どこから候補を集めるかを決定', items: ['フォロー中のユーザーの投稿', 'おすすめの投稿（OON）', 'トレンドトピック'] },
    { stage: 2, title: 'Candidate Retrieval', description: '候補となる投稿を大量に取得', items: ['数十万〜数百万の候補', 'Two-Tower検索'] },
    { stage: 3, title: 'Pre-Filtering', description: '明らかに不適切な候補を除外', items: ['ブロック・ミュート関係', '安全性フィルター'] },
    { stage: 4, title: 'Feature Extraction', description: '各候補の特徴量を抽出', items: ['ツイートの内容・メディア', 'ユーザーとの関係性'] },
    { stage: 5, title: 'ML Scoring (Phoenix)', description: '機械学習による予測スコアリング', items: ['19種類のエンゲージメント予測', 'Grok Transformer'] },
    { stage: 6, title: 'Post-Filtering', description: 'スコア後の品質フィルタリング', items: ['重複排除', '著者多様性確保'] },
    { stage: 7, title: 'Ranking', description: '最終的な順位決定', items: ['複数スコアの統合', 'ビジネスルール適用'] },
    { stage: 8, title: 'Blending & Serving', description: '最終タイムラインの構築', items: ['広告挿入', 'キャッシュと配信'] },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>目次</span>
          </Link>
          <span className="text-sm font-medium text-primary dark:text-blue-300">第1章</span>
          <Link
            href="/chapters/2"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <span>第2章</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* タイトルセクション */}
        <div className="mb-12 pb-8 border-b-2 border-primary dark:border-blue-600">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Chapter 1</p>
          <h1 className="text-3xl font-bold text-primary dark:text-blue-300 mb-3">
            Xアルゴリズムの全体像と思想
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            推薦システムの設計思想から3層アーキテクチャ、8段階パイプラインまでを解説します。
          </p>
        </div>

        {/* セクション 1.1 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <span className="text-gray-400 font-normal">1.1</span>
            なぜアルゴリズムを理解すべきか
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
            <p>
              あなたがXを開くたびに、画面には何百万もの投稿の中から選ばれた数十件だけが表示されます。この「選別」を行っているのが、推薦アルゴリズムです。
            </p>
            <p>
              多くの人は、Xのタイムラインを「フォローしている人の投稿が時系列で流れてくる場所」だと考えています。しかし現実は大きく異なります。Xは2016年から、機械学習を用いた推薦システムを導入しており、あなたが見る投稿は、高度なアルゴリズムによって厳選されたものです。
            </p>
            <p>
              2023年3月、イーロン・マスク氏の決定により、Xの推薦アルゴリズムがオープンソースとして公開されました。これにより、私たちは初めて「なぜある投稿が広く表示され、別の投稿が埋もれるのか」を技術的に理解できるようになりました。
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
              <p className="text-blue-800 dark:text-blue-300 text-sm flex items-start gap-2">
                <LightBulbIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  本書は、2026年1月時点で公開されているXの推薦アルゴリズムのオープンソースコードを徹底解析し、アルゴリズムの仕組みを実践的な戦略に落とし込んだガイドです。
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* セクション 1.2 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <span className="text-gray-400 font-normal">1.2</span>
            Xの設計思想：滞在時間の最大化
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
            <p>
              Xの推薦アルゴリズムには、明確な設計思想があります。それは<strong className="text-primary dark:text-blue-300">「ユーザーの滞在時間を最大化する」</strong>ことです。
            </p>
            <p>
              これは単純な「いいねが多い投稿を上に表示する」というものではありません。アルゴリズムは以下を予測しています：
            </p>

            <FigureBox number="1-1" title="アルゴリズムが予測する3つの観点">
              <div className="space-y-4 text-sm">
                <div className="border border-gray-200 dark:border-gray-600 rounded p-3">
                  <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">1. 即時反応の予測</p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 pl-4">
                    <li>・いいねするか？</li>
                    <li>・リプライするか？</li>
                    <li>・詳細を開くか？</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded p-3">
                  <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">2. 後続行動の予測</p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 pl-4">
                    <li>・Xを続けて使うか？</li>
                    <li>・別のアプリに移るか？</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded p-3">
                  <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">3. 長期的価値の予測</p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1 pl-4">
                    <li>・フォローにつながるか？</li>
                    <li>・ミュート・ブロックされるか？</li>
                  </ul>
                </div>
              </div>
            </FigureBox>

            <p>
              つまり、アルゴリズムは「今この瞬間の反応」だけでなく、「この投稿がユーザーの行動にどう影響するか」までを予測しているのです。この理解は極めて重要です。
            </p>
          </div>
        </section>

        {/* セクション 1.3 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <span className="text-gray-400 font-normal">1.3</span>
            3層アーキテクチャの全体像
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
            <p>
              Xの推薦システムは、3つの主要コンポーネントで構成されています。
            </p>

            <FigureBox number="1-2" title="3層アーキテクチャ構成図">
              <div className="space-y-3">
                {/* Home Mixer */}
                <div className="border border-blue-300 dark:border-blue-600 rounded p-4 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-blue-800 dark:text-blue-300">Home Mixer（Rust）</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    役割：リクエスト受付と最終タイムライン組み立て
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowDownIcon className="w-5 h-5 text-gray-400" />
                </div>

                {/* Thunder */}
                <div className="border border-amber-300 dark:border-amber-600 rounded p-4 bg-amber-50 dark:bg-amber-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ServerIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="font-bold text-amber-800 dark:text-amber-300">Thunder（Rust）</span>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    役割：8段階パイプライン処理（候補生成・フィルタ・スコアリング・ランキング）
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowDownIcon className="w-5 h-5 text-gray-400" />
                </div>

                {/* Phoenix */}
                <div className="border border-purple-300 dark:border-purple-600 rounded p-4 bg-purple-50 dark:bg-purple-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CpuChipIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-bold text-purple-800 dark:text-purple-300">Phoenix（Python/JAX）</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    役割：機械学習による19種類のエンゲージメント予測
                  </p>
                </div>
              </div>
            </FigureBox>

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              Home Mixer：オーケストラの指揮者
            </h3>
            <p>
              Home Mixerは、ユーザーがXを開いた瞬間にリクエストを受け取る「入口」です。Rustで書かれた高速なサービスで、各コンポーネントに処理を依頼し、結果を統合してタイムラインを構築します。
            </p>

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              Thunder：パイプラインの実行者
            </h3>
            <p>
              Thunderは、推薦処理の中核を担うコンポーネントです。8段階のパイプラインを通じて、数百万の候補から数十件の「あなたに最適な投稿」を選び出します。
            </p>

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              Phoenix：予測の頭脳
            </h3>
            <p>
              Phoenixは、機械学習モデルを用いてエンゲージメント予測を行うコンポーネントです。「この投稿を見たユーザーは、いいねするか？リプライするか？」といった19種類の行動確率を予測します。
            </p>
          </div>
        </section>

        {/* セクション 1.4 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <span className="text-gray-400 font-normal">1.4</span>
            8段階パイプラインの流れ
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
            <p>
              Thunderが実行する8段階のパイプラインを詳しく見ていきましょう。
            </p>

            <FigureBox number="1-3" title="8段階パイプライン処理フロー">
              <div className="space-y-2">
                {pipelineStages.map((stage) => (
                  <div key={stage.stage} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary dark:bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {stage.stage}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{stage.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stage.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {stage.items.map((item, i) => (
                          <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FigureBox>

            <p>
              この8段階のパイプラインは、1リクエストあたり数百ミリ秒で処理されます。あなたがXを開くたびに、このすべての処理が裏側で実行されているのです。
            </p>
          </div>
        </section>

        {/* セクション 1.5 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <span className="text-gray-400 font-normal">1.5</span>
            オープンソース化と透明性
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-4">
            <p>
              2023年3月31日、イーロン・マスク氏のツイートとともに、Xの推薦アルゴリズムがGitHubで公開されました。
            </p>

            <CodeBlock title="公開されたコンポーネント">{`├── home-mixer/          # Home Mixer（Rust）
├── thunder/             # Thunder パイプライン（Rust）
├── phoenix/             # Phoenix MLモデル（Python/JAX）
└── candidate-pipeline/  # 候補生成パイプライン`}</CodeBlock>

            <p>
              ただし、すべてが公開されているわけではありません：
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded p-4 my-4">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">非公開の要素</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>・学習済みモデルの重み（パラメータ）</li>
                <li>・実際の特徴量定義の一部</li>
                <li>・インフラストラクチャの詳細</li>
                <li>・リアルタイムで更新される閾値</li>
              </ul>
            </div>

            <p>
              つまり、私たちが見ることができるのは「システムの設計図」であり、「学習された知識」ではありません。しかし、設計図だけでも、アルゴリズムがどのように動作するかを深く理解することは可能です。
            </p>
          </div>
        </section>

        {/* セクション 1.6 まとめ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <span className="text-gray-400 font-normal">1.6</span>
            この章のまとめ
          </h2>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">Xのアルゴリズムは「滞在時間最大化」を目指している</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">単純ないいね数ではなく、ユーザー行動全体を予測</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">3層アーキテクチャで構成されている</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Home Mixer → Thunder → Phoenix</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">8段階のパイプラインで投稿が選別される</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">候補収集 → フィルタリング → スコアリング → ランキング</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">2023年にオープンソース化された</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">設計図は公開、学習済みパラメータは非公開</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQセクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 flex items-center gap-2">
            <QuestionMarkCircleIcon className="w-6 h-6" />
            よくある質問
          </h2>
          <FAQ items={faqData} />
        </section>

        {/* クイズセクション */}
        <Quiz questions={quizQuestions} />

        {/* 章ナビゲーション */}
        <ChapterNav currentChapter={1} />
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          X レコメンドアルゴリズム - オープンソース ドキュメント
        </div>
      </footer>
    </div>
  );
}

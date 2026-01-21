'use client';

import Link from 'next/link';
import {
  ArrowDownIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  CpuChipIcon,
  UserIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClockIcon,
  LightBulbIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
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

// Simple Architecture Diagram
function ArchitectureDiagram() {
  return (
    <div className="my-8">
      <div className="rounded border-2 border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
        <h4 className="mb-4 text-center text-lg font-bold text-slate-800 dark:text-slate-100">
          図4-1：Phoenix Transformerアーキテクチャ
        </h4>

        {/* Input Layer */}
        <div className="mb-4">
          <div className="mb-2 text-sm font-bold text-slate-600 dark:text-slate-300">入力層</div>
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded border border-slate-300 bg-slate-100 p-3 text-center dark:border-slate-600 dark:bg-slate-700">
              <UserIcon className="mx-auto mb-1 h-6 w-6 text-blue-600" />
              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">ユーザー</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">256次元</div>
            </div>
            <div className="rounded border border-slate-300 bg-slate-100 p-3 text-center dark:border-slate-600 dark:bg-slate-700">
              <DocumentTextIcon className="mx-auto mb-1 h-6 w-6 text-green-600" />
              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">ツイート</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">512次元</div>
            </div>
            <div className="rounded border border-slate-300 bg-slate-100 p-3 text-center dark:border-slate-600 dark:bg-slate-700">
              <UserGroupIcon className="mx-auto mb-1 h-6 w-6 text-purple-600" />
              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">投稿者</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">128次元</div>
            </div>
            <div className="rounded border border-slate-300 bg-slate-100 p-3 text-center dark:border-slate-600 dark:bg-slate-700">
              <ClockIcon className="mx-auto mb-1 h-6 w-6 text-orange-600" />
              <div className="text-sm font-bold text-slate-700 dark:text-slate-200">コンテキスト</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">64次元</div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="my-4 flex justify-center">
          <ArrowDownIcon className="h-8 w-8 text-slate-400" />
        </div>

        {/* Transformer Block */}
        <div className="mb-4 rounded border-2 border-dashed border-slate-400 p-4">
          <div className="mb-2 text-center text-sm font-bold text-slate-600 dark:text-slate-300">
            Grok Transformer（8層 x 16ヘッド）
          </div>
          <div className="space-y-2">
            <div className="rounded border border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-700">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Multi-Head Self-Attention + Candidate Isolation
              </div>
            </div>
            <div className="flex justify-center">
              <ArrowDownIcon className="h-4 w-4 text-slate-400" />
            </div>
            <div className="rounded border border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-700">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Feed-Forward Network（1024次元）
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-xs italic text-slate-500">※ 8回繰り返し</div>
        </div>

        {/* Arrow */}
        <div className="my-4 flex justify-center">
          <ArrowDownIcon className="h-8 w-8 text-slate-400" />
        </div>

        {/* Output Layer */}
        <div className="rounded border border-slate-300 bg-slate-100 p-4 text-center dark:border-slate-600 dark:bg-slate-700">
          <CpuChipIcon className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
          <div className="font-bold text-slate-700 dark:text-slate-200">19種類のエンゲージメント確率出力</div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <span className="rounded bg-white px-2 py-1 dark:bg-slate-600">favorited_prob</span>
            <span className="rounded bg-white px-2 py-1 dark:bg-slate-600">retweeted_prob</span>
            <span className="rounded bg-white px-2 py-1 dark:bg-slate-600">replied_prob</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Candidate Isolation Diagram
function CandidateIsolationDiagram() {
  return (
    <div className="my-8">
      <div className="rounded border-2 border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
        <h4 className="mb-4 text-center text-lg font-bold text-slate-800 dark:text-slate-100">
          図4-2：Candidate Isolationのアテンションマスク
        </h4>

        <div className="flex justify-center">
          <div className="overflow-hidden rounded border border-slate-300 dark:border-slate-600">
            <table className="text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border-b border-r border-slate-300 px-4 py-2 dark:border-slate-600"></th>
                  <th className="border-b border-r border-slate-300 px-4 py-2 text-red-600 dark:border-slate-600">A</th>
                  <th className="border-b border-r border-slate-300 px-4 py-2 text-yellow-600 dark:border-slate-600">B</th>
                  <th className="border-b border-r border-slate-300 px-4 py-2 text-green-600 dark:border-slate-600">C</th>
                  <th className="border-b border-slate-300 px-4 py-2 text-blue-600 dark:border-slate-600">User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-r border-slate-300 bg-slate-50 px-4 py-2 font-bold text-red-600 dark:border-slate-600 dark:bg-slate-700">A</td>
                  <td className="border-b border-r border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                  <td className="border-b border-r border-slate-300 px-4 py-2 text-center text-slate-300 dark:border-slate-600">0</td>
                  <td className="border-b border-r border-slate-300 px-4 py-2 text-center text-slate-300 dark:border-slate-600">0</td>
                  <td className="border-b border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-slate-300 bg-slate-50 px-4 py-2 font-bold text-yellow-600 dark:border-slate-600 dark:bg-slate-700">B</td>
                  <td className="border-b border-r border-slate-300 px-4 py-2 text-center text-slate-300 dark:border-slate-600">0</td>
                  <td className="border-b border-r border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                  <td className="border-b border-r border-slate-300 px-4 py-2 text-center text-slate-300 dark:border-slate-600">0</td>
                  <td className="border-b border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-slate-300 bg-slate-50 px-4 py-2 font-bold text-green-600 dark:border-slate-600 dark:bg-slate-700">C</td>
                  <td className="border-b border-r border-slate-300 px-4 py-2 text-center text-slate-300 dark:border-slate-600">0</td>
                  <td className="border-b border-r border-slate-300 px-4 py-2 text-center text-slate-300 dark:border-slate-600">0</td>
                  <td className="border-b border-r border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                  <td className="border-b border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                </tr>
                <tr>
                  <td className="border-r border-slate-300 bg-slate-50 px-4 py-2 font-bold text-blue-600 dark:border-slate-600 dark:bg-slate-700">User</td>
                  <td className="border-r border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                  <td className="border-r border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                  <td className="border-r border-slate-300 bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:border-slate-600 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                  <td className="bg-emerald-100 px-4 py-2 text-center font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-emerald-200 dark:bg-emerald-700"></span>
            <span className="text-slate-600 dark:text-slate-300">1 = 参照可能</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-600"></span>
            <span className="text-slate-600 dark:text-slate-300">0 = マスク（参照不可）</span>
          </div>
        </div>
      </div>
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

// Comparison Table Component
function ComparisonTable() {
  return (
    <div className="my-6 overflow-hidden rounded border border-slate-300 dark:border-slate-600">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-700">
            <th className="border-b border-r border-slate-300 px-4 py-3 text-left dark:border-slate-600">項目</th>
            <th className="border-b border-r border-slate-300 px-4 py-3 text-left dark:border-slate-600">従来のランキング</th>
            <th className="border-b border-slate-300 px-4 py-3 text-left dark:border-slate-600">Phoenix MLランキング</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-r border-slate-300 px-4 py-3 font-medium dark:border-slate-600">評価方法</td>
            <td className="border-b border-r border-slate-300 px-4 py-3 dark:border-slate-600">過去の実績（いいね数など）</td>
            <td className="border-b border-slate-300 px-4 py-3 dark:border-slate-600">個人別の予測確率</td>
          </tr>
          <tr>
            <td className="border-b border-r border-slate-300 px-4 py-3 font-medium dark:border-slate-600">評価対象</td>
            <td className="border-b border-r border-slate-300 px-4 py-3 dark:border-slate-600">投稿の一般的な人気</td>
            <td className="border-b border-slate-300 px-4 py-3 dark:border-slate-600">「あなた」がどう反応するか</td>
          </tr>
          <tr>
            <td className="border-r border-slate-300 px-4 py-3 font-medium dark:border-slate-600">特徴</td>
            <td className="border-r border-slate-300 px-4 py-3 dark:border-slate-600">全員に同じランキング</td>
            <td className="px-4 py-3">ユーザーごとに異なるランキング</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// FAQ Data
const faqData = [
  {
    question: 'Grok Transformerとは何ですか？',
    answer: 'Grok Transformerは、Phoenixモデルの中核となる深層学習アーキテクチャです。8層のTransformer Encoderで構成され、16個のAttention headによる並列的な特徴抽出を行います。通常のTransformerがテキストの文脈理解に特化しているのに対し、Grok Transformerはユーザーの行動予測に最適化されています。',
  },
  {
    question: 'Candidate Isolation（候補分離）はなぜ重要ですか？',
    answer: 'Candidate Isolationは、各投稿を公平かつ独立して評価するための仕組みです。これにより、順序バイアス（入力順で先にある投稿が有利になる）、競合バイアス（他の「良い」投稿があると相対的にスコアが下がる）、情報漏洩（他の候補の内容がスコアリングに影響する）を防ぎます。',
  },
  {
    question: '入力特徴量の4種類は何ですか？',
    answer: 'Phoenixモデルは4種類の入力特徴量を使用します：(1) User Features（256次元）- 過去の行動履歴、興味カテゴリ、フォローグラフ、(2) Tweet Features（512次元）- テキスト埋め込み、メディア特徴、エンゲージメント統計、(3) Author Features（128次元）- フォロワー数、投稿頻度、エンゲージメント率、(4) Context Features（64次元）- 時間帯、デバイス、言語設定。',
  },
  {
    question: '「他の投稿と競争していない」とはどういう意味ですか？',
    answer: 'Candidate Isolationにより、各投稿は独立して評価されます。自分の投稿がターゲットユーザーの興味にマッチするかが評価対象であり、他の投稿の存在は自分のスコアに影響しません。「みんなに届けたい」ではなく「誰に届けたいか」を明確にすることが重要です。',
  },
  {
    question: 'Phoenix Transformerは何種類の確率を出力しますか？',
    answer: 'Phoenix Transformerは19種類のエンゲージメント確率を出力します。主なものは：いいね、リポスト、リプライ、引用、プロフィールクリック、フォロー、動画品質視聴、ブックマーク（ポジティブ）と、通報、ミュート、ブロック、興味なし（ネガティブ）です。リプライ（13.5倍）やプロフィールクリック（12倍）は、いいね（0.5倍）より重みが大きいです。',
  },
];

// Quiz Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Phoenix Transformerの層数は？',
    choices: [
      { id: 'A', text: '4層' },
      { id: 'B', text: '6層' },
      { id: 'C', text: '8層' },
      { id: 'D', text: '12層' },
    ],
    correctAnswer: 'C',
    explanation: 'Phoenix Transformerは8層のTransformer Encoderで構成されています。この層数は推薦タスクに最適化されており、精度と計算効率のバランスが取れています。',
  },
  {
    id: 2,
    question: 'Attention headの数は？',
    choices: [
      { id: 'A', text: '8' },
      { id: 'B', text: '12' },
      { id: 'C', text: '16' },
      { id: 'D', text: '32' },
    ],
    correctAnswer: 'C',
    explanation: 'Multi-Head Self-Attentionでは16個のheadが使用されています。複数のheadが並列で異なる特徴を抽出し、ユーザーとコンテンツの関係を多角的に分析します。',
  },
  {
    id: 3,
    question: 'Candidate Isolationの目的は？',
    choices: [
      { id: 'A', text: '計算速度向上' },
      { id: 'B', text: '候補間の独立評価' },
      { id: 'C', text: 'メモリ節約' },
      { id: 'D', text: 'セキュリティ' },
    ],
    correctAnswer: 'B',
    explanation: 'Candidate Isolationの主目的は、各候補投稿を他の候補から独立して評価することです。これにより順序バイアスや競合バイアスを防ぎ、公平な評価を実現します。',
  },
  {
    id: 4,
    question: 'PhoenixはどのMLフレームワークを使用？',
    choices: [
      { id: 'A', text: 'PyTorch' },
      { id: 'B', text: 'TensorFlow' },
      { id: 'C', text: 'JAX' },
      { id: 'D', text: 'Keras' },
    ],
    correctAnswer: 'C',
    explanation: 'XのPhoenixモデルはJAXフレームワークを使用して実装されています。JAXは高速な数値計算と自動微分が可能で、大規模な推薦システムに適しています。',
  },
  {
    id: 5,
    question: 'user_embedding_dimの次元数は？',
    choices: [
      { id: 'A', text: '64' },
      { id: 'B', text: '128' },
      { id: 'C', text: '256' },
      { id: 'D', text: '512' },
    ],
    correctAnswer: 'C',
    explanation: 'ユーザー特徴量の埋め込み次元は256です。ユーザーの過去の行動履歴、興味カテゴリ、フォローグラフなどの情報が256次元のベクトルに圧縮されます。',
  },
];

// Main Component
export default function Chapter4Page() {
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
            <Link href="/chapters/3" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              第3章
            </Link>
            <Link href="/chapters/5" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              第5章
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Title */}
        <div className="mb-8 border-b-4 border-double border-slate-800 pb-6">
          <div className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">第4章</div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 md:text-4xl">
            Phoenix MLモデルの詳細
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Grok TransformerアーキテクチャとCandidate Isolationの仕組み
          </p>
        </div>

        {/* Section 4.1 */}
        <section className="mb-12">
          <SectionHeader number="4.1" title="機械学習ランキングとは" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Phoenix（フェニックス）は、Xの推薦システムにおける「頭脳」です。機械学習モデルを用いて、各投稿が各ユーザーに対してどれだけ価値があるかを予測します。
          </p>

          <TextbookBox type="definition" title="定義：Phoenix">
            <p className="text-slate-700 dark:text-slate-300">
              PhoenixはXの推薦エンジンの中核となる機械学習モデルです。ユーザーの過去の行動パターンを学習し、新しい投稿に対する反応（いいね、リプライ、フォローなど）を確率として予測します。
            </p>
          </TextbookBox>

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            従来のランキングシステムと機械学習ランキングの違いを表4-1に示します。
          </p>

          <div className="mb-4 text-center text-sm font-bold text-slate-600 dark:text-slate-400">
            表4-1：ランキングシステムの比較
          </div>
          <ComparisonTable />

          <TextbookBox type="important" title="重要なポイント">
            <p className="text-slate-700 dark:text-slate-300">
              Phoenixは「この投稿が過去にどれだけ反応を集めたか」ではなく、「この投稿を見た<strong>あなた</strong>がどう反応するか」を予測しています。
            </p>
          </TextbookBox>
        </section>

        {/* Section 4.2 */}
        <section className="mb-12">
          <SectionHeader number="4.2" title="Grok Transformerアーキテクチャ" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Phoenixの中核は、<strong>Grok Transformer</strong>と呼ばれる深層学習モデルです。図4-1にその全体構造を示します。
          </p>

          <ArchitectureDiagram />

          <TextbookBox type="info" title="モデルの設定値">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-bold text-slate-700 dark:text-slate-200">入力特徴量</div>
                <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>ユーザー: 256次元</li>
                  <li>ツイート: 512次元</li>
                  <li>投稿者: 128次元</li>
                  <li>コンテキスト: 64次元</li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-slate-700 dark:text-slate-200">Transformer設定</div>
                <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>層数: 8</li>
                  <li>Attention heads: 16</li>
                  <li>隠れ層: 1024次元</li>
                  <li>Dropout: 0.1</li>
                </ul>
              </div>
            </div>
          </TextbookBox>

          <CodeBlock
            title="recsys_model.py - モデル構造"
            code={`class PhoenixModel:
    # 入力特徴量の次元
    user_embedding_dim = 256
    tweet_embedding_dim = 512
    author_embedding_dim = 128
    context_embedding_dim = 64

    # Transformer設定
    num_layers = 8           # 8層
    num_attention_heads = 16 # 16ヘッド
    hidden_dim = 1024        # 隠れ層次元
    dropout_rate = 0.1       # Dropout率

    # 出力
    num_engagement_types = 19  # 19種類の確率出力`}
          />
        </section>

        {/* Section 4.3 */}
        <section className="mb-12">
          <SectionHeader number="4.3" title="Candidate Isolation" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Phoenixの最も特徴的な技術が<strong>Candidate Isolation（候補分離）</strong>です。通常のTransformerでは、入力されたすべての要素が互いに情報を交換しますが、推薦システムでこれを行うと問題が発生します。
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
              <h4 className="font-bold text-red-800 dark:text-red-300">問題1: 順序バイアス</h4>
              <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                先に入力された投稿が有利になる
              </p>
            </div>
            <div className="rounded border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
              <h4 className="font-bold text-red-800 dark:text-red-300">問題2: 競合バイアス</h4>
              <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                他の「良い」投稿があるとスコアが下がる
              </p>
            </div>
            <div className="rounded border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
              <h4 className="font-bold text-red-800 dark:text-red-300">問題3: 情報漏洩</h4>
              <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                他の候補の内容がスコアリングに影響
              </p>
            </div>
          </div>

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            これらの問題を解決するため、Candidate Isolationではアテンションマスクを使用します（図4-2）。
          </p>

          <CandidateIsolationDiagram />

          <TextbookBox type="important" title="戦略的含意">
            <p className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-200">
              あなたの投稿は、他の候補投稿と「競争」しているのではありません。
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              アルゴリズムは、あなたの投稿を「このユーザーにとって、どれだけ価値があるか」で独立して評価しています。他のアカウントを意識するより、ターゲットユーザーの興味を理解することが重要です。
            </p>
          </TextbookBox>
        </section>

        {/* Section 4.4 */}
        <section className="mb-12">
          <SectionHeader number="4.4" title="予測から表示までの流れ" />

          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Phoenixがスコアを計算した後、どのように表示が決まるかを見ていきましょう。
          </p>

          <div className="space-y-4">
            {[
              { step: 1, title: '特徴量抽出', desc: 'ユーザー・候補投稿・投稿者の特徴を取得' },
              { step: 2, title: 'Phoenix推論', desc: '1000件の各候補に対して19種類の確率を計算' },
              { step: 3, title: '重み付きスコア', desc: '確率 x 重みの合計を計算' },
              { step: 4, title: '追加スコアラー', desc: 'OON、多様性、VQVなどの調整を適用' },
              { step: 5, title: '最終ランキング', desc: 'スコア順に並べてタイムラインに表示' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 font-bold text-white">
                  {item.step}
                </div>
                <div className="flex-1 rounded border border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4.5 */}
        <section className="mb-12">
          <SectionHeader number="4.5" title="この章のまとめ" />

          <div className="rounded border-2 border-slate-800 bg-slate-50 p-6 dark:bg-slate-800">
            <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">
              第4章 重要ポイント
            </h3>
            <ul className="space-y-3">
              {[
                'PhoenixはGrok Transformerベースの機械学習モデル（8層、16ヘッド、1024次元）',
                'Candidate Isolationで候補を独立評価（他の投稿との「競争」ではなく「マッチング」）',
                '19種類のエンゲージメント確率を予測（重み付き合計が最終スコア）',
                'パーソナライゼーションは絶対（同じ投稿でも、見る人によってスコアは異なる）',
              ].map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <TextbookBox type="info" title="今日からできること">
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li>ターゲットを明確に絞る（全員に届けようとしない）</li>
              <li>リプライ・プロフィールクリックを誘発する内容を意識</li>
              <li>他の投稿との競争ではなく、ターゲットとのマッチングに集中</li>
              <li>ネガティブエンゲージメントの確率を下げる（攻撃的な内容を避ける）</li>
            </ul>
          </TextbookBox>
        </section>

        {/* FAQ Section */}
        <FAQ items={faqData} />

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        {/* Chapter Navigation */}
        <ChapterNav currentChapter={4} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center text-sm text-muted-foreground">
          Xアルゴリズム攻略ガイド
        </div>
      </footer>
    </div>
  );
}

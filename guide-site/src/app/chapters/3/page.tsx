'use client';

import Link from 'next/link';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  BookOpenIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  UserIcon,
  DocumentTextIcon,
  ArrowsRightLeftIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from '@/components/ui/Quiz';
import { FAQ, type FAQItem } from '@/components/ui/Accordion';
import { ChapterNav } from '@/components/ui/ChapterNav';

// FAQ Data
const faqData: FAQItem[] = [
  {
    question: 'Two-Tower検索はどのタブで主に使われますか？',
    answer: 'Two-Tower検索は主に「おすすめ」タブ（For You）や「発見」機能で使用されます。フォローしていないユーザーの投稿でも、あなたの興味に合致する可能性が高いコンテンツをタイムラインに表示することができます。',
  },
  {
    question: 'User Towerはどのような情報を分析していますか？',
    answer: '4つの主要カテゴリの情報を分析します：(1)過去の行動履歴（いいね、リプライ、滞在時間など）、(2)フォローパターン、(3)興味カテゴリ、(4)メタ情報（使用言語、活動時間帯など）。',
  },
  {
    question: 'コサイン類似度とは何ですか？',
    answer: '2つのベクトルがどれだけ同じ方向を向いているかを測る指標です。-1.0から1.0の範囲で表され、1.0は完全マッチ、0.0は関連性なし、-1.0は完全に不一致を意味します。',
  },
  {
    question: '「発見」されやすくなるには、なぜニッチが重要なのですか？',
    answer: '明確なニッチを持つことで、Content Towerが生成するベクトルが特定の方向に集中します。同じ興味を持つユーザークラスタと強くマッチし、高いコサイン類似度スコアを獲得できます。',
  },
  {
    question: 'Two-Towerの「コールドスタート問題」とは何ですか？',
    answer: '新規アカウントや新規投稿がTwo-Towerシステムで不利になる現象です。行動履歴やエンゲージメント履歴が少ないため、ベクトルの精度が低くなり、適切なマッチングが難しくなります。',
  },
];

// Quiz Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Two-Towerの2つの塔は何？',
    choices: [
      { id: 'A', text: 'User TowerとContent Tower' },
      { id: 'B', text: 'Phoenix TowerとThunder Tower' },
      { id: 'C', text: 'IN TowerとOON Tower' },
      { id: 'D', text: 'Score TowerとFilter Tower' },
    ],
    correctAnswer: 'A',
    explanation: 'Two-Tower検索は「User Tower（ユーザー塔）」と「Content Tower（コンテンツ塔）」の2つで構成されています。User Towerはユーザーを、Content Towerは投稿をそれぞれベクトル化します。',
  },
  {
    id: 2,
    question: 'ベクトルの次元数は？',
    choices: [
      { id: 'A', text: '64次元' },
      { id: 'B', text: '128次元' },
      { id: 'C', text: '256次元' },
      { id: 'D', text: '512次元' },
    ],
    correctAnswer: 'B',
    explanation: 'User TowerとContent Towerの両方とも、128次元のベクトルを生成します。この次元数は精度と計算効率のバランスを考慮して設計されています。',
  },
  {
    id: 3,
    question: 'Two-Tower検索が主に使われるのは？',
    choices: [
      { id: 'A', text: 'フォロワーのタイムライン' },
      { id: 'B', text: 'おすすめタブ' },
      { id: 'C', text: '検索結果' },
      { id: 'D', text: '通知' },
    ],
    correctAnswer: 'B',
    explanation: 'Two-Tower検索は主に「おすすめ」タブ（For You）や「発見」機能で使用されます。フォローしていない人の投稿をマッチングするために設計されています。',
  },
  {
    id: 4,
    question: 'User Towerが分析しないものは？',
    choices: [
      { id: 'A', text: '過去の行動履歴' },
      { id: 'B', text: 'フォローパターン' },
      { id: 'C', text: '投稿のテキスト内容' },
      { id: 'D', text: '興味カテゴリ' },
    ],
    correctAnswer: 'C',
    explanation: '投稿のテキスト内容はContent Tower（コンテンツ塔）が分析します。User Towerはユーザーの行動履歴、フォローパターン、興味カテゴリ、メタ情報を分析します。',
  },
  {
    id: 5,
    question: 'コサイン類似度が1.0の場合は？',
    choices: [
      { id: 'A', text: '関連性なし' },
      { id: 'B', text: '完全に不一致' },
      { id: 'C', text: '完全にマッチ' },
      { id: 'D', text: 'エラー' },
    ],
    correctAnswer: 'C',
    explanation: 'コサイン類似度1.0は「完全にマッチ」を意味します。0.0は関連性なし、-1.0は完全に不一致です。値が1.0に近いほど、ユーザーとコンテンツの相性が良いことを示します。',
  },
];

// Section Number Component
function SectionNumber({ number, color = 'blue' }: { number: string; color?: 'blue' | 'green' | 'purple' | 'amber' | 'red' }) {
  const colorClasses = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    purple: 'bg-purple-600 text-white',
    amber: 'bg-amber-600 text-white',
    red: 'bg-red-600 text-white',
  };

  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded ${colorClasses[color]} font-bold text-sm mr-3`}>
      {number}
    </span>
  );
}

// Note Box Component
function NoteBox({ type, children }: { type: 'important' | 'tip' | 'warning'; children: React.ReactNode }) {
  const config = {
    important: {
      icon: ExclamationTriangleIcon,
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-400 dark:border-amber-600',
      title: '重要',
      titleColor: 'text-amber-700 dark:text-amber-400',
    },
    tip: {
      icon: LightBulbIcon,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-400 dark:border-blue-600',
      title: 'Point',
      titleColor: 'text-blue-700 dark:text-blue-400',
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-400 dark:border-red-600',
      title: '注意',
      titleColor: 'text-red-700 dark:text-red-400',
    },
  };

  const { icon: Icon, bg, border, title, titleColor } = config[type];

  return (
    <div className={`my-4 p-4 ${bg} border-l-4 ${border} rounded-r`}>
      <div className={`flex items-center gap-2 font-bold ${titleColor} mb-2`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

// Code Block Component
function CodeBlock({ title, children }: { title?: string; children: string }) {
  return (
    <div className="my-4 border border-border rounded overflow-hidden">
      {title && (
        <div className="px-3 py-1.5 bg-muted border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">{title}</span>
        </div>
      )}
      <pre
        className="p-3 overflow-x-auto"
        style={{ background: '#1e293b', color: '#e2e8f0' }}
      >
        <code className="text-xs font-mono whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

// Two-Tower Architecture Diagram
function TwoTowerDiagram() {
  return (
    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 text-center">図3.1 Two-Tower アーキテクチャ概念図</h4>
      <div className="flex flex-col items-center gap-4">
        {/* Two Towers */}
        <div className="flex justify-center gap-6 md:gap-12 w-full">
          {/* User Tower */}
          <div className="flex flex-col items-center">
            <div className="w-32 md:w-40 bg-blue-500 rounded-t rounded-b-sm p-3 text-white text-center">
              <UserIcon className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm font-bold">User Tower</div>
              <div className="text-xs opacity-80">（ユーザー塔）</div>
              <div className="mt-2 pt-2 border-t border-blue-400/50 text-xs">
                <p>あなたは</p>
                <p className="font-medium">どんな人？</p>
              </div>
            </div>
            <div className="w-0.5 h-8 bg-blue-500"></div>
            <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 rounded text-xs text-blue-700 dark:text-blue-300">
              128次元ベクトル
            </div>
          </div>

          {/* Content Tower */}
          <div className="flex flex-col items-center">
            <div className="w-32 md:w-40 bg-purple-500 rounded-t rounded-b-sm p-3 text-white text-center">
              <DocumentTextIcon className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm font-bold">Content Tower</div>
              <div className="text-xs opacity-80">（コンテンツ塔）</div>
              <div className="mt-2 pt-2 border-t border-purple-400/50 text-xs">
                <p>この投稿は</p>
                <p className="font-medium">どんな内容？</p>
              </div>
            </div>
            <div className="w-0.5 h-8 bg-purple-500"></div>
            <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 rounded text-xs text-purple-700 dark:text-purple-300">
              128次元ベクトル
            </div>
          </div>
        </div>

        {/* Connection */}
        <div className="flex items-center justify-center w-full">
          <div className="w-16 h-0.5 bg-blue-400"></div>
          <ArrowsRightLeftIcon className="w-6 h-6 text-gray-400 mx-2" />
          <div className="w-16 h-0.5 bg-purple-400"></div>
        </div>

        {/* Cosine Similarity */}
        <div className="w-48 bg-amber-500 rounded p-2 text-white text-center">
          <div className="text-sm font-bold">コサイン類似度</div>
          <div className="text-xs opacity-80">計算</div>
        </div>

        {/* Arrow */}
        <ChevronDownIcon className="w-5 h-5 text-gray-400" />

        {/* Result */}
        <div className="px-6 py-2 bg-white dark:bg-gray-800 rounded border-2 border-green-500">
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">類似度スコア</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">0.0 - 1.0</div>
            <div className="text-xs text-green-600 dark:text-green-400">（高いほどマッチ）</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cosine Similarity Diagram
function CosineSimilarityDiagram() {
  return (
    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">図3.2 コサイン類似度の直感的理解</h4>
      <div className="grid grid-cols-3 gap-3">
        {/* Perfect Match */}
        <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16 mb-2">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <defs>
                <marker id="arrow1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#22c55e" />
                </marker>
              </defs>
              <line x1="5" y1="20" x2="55" y2="20" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow1)" />
              <line x1="5" y1="24" x2="55" y2="24" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.5" markerEnd="url(#arrow1)" />
            </svg>
          </div>
          <div className="text-center">
            <span className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs font-medium">
              = 1.0
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">完全マッチ</p>
          </div>
        </div>

        {/* Orthogonal */}
        <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16 mb-2">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <defs>
                <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="10" y1="35" x2="50" y2="35" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow2)" />
              <line x1="15" y1="35" x2="15" y2="8" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow2)" />
            </svg>
          </div>
          <div className="text-center">
            <span className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
              = 0.0
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">関連性なし</p>
          </div>
        </div>

        {/* Opposite */}
        <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16 mb-2">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <defs>
                <marker id="arrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
                </marker>
              </defs>
              <line x1="5" y1="17" x2="55" y2="17" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow3)" />
              <line x1="55" y1="23" x2="5" y2="23" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow3)" />
            </svg>
          </div>
          <div className="text-center">
            <span className="inline-block px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs font-medium">
              = -1.0
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">完全に不一致</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Tower Categories
function UserTowerCategories() {
  const categories = [
    {
      title: '1. 過去の行動履歴',
      items: ['いいねした投稿の傾向', 'リプライした相手と内容', 'リポストしたコンテンツ', '滞在時間が長かった投稿'],
      color: 'blue',
    },
    {
      title: '2. フォローパターン',
      items: ['フォローしているアカウントの属性', 'フォロー/アンフォローの傾向', '通知をオンにしているアカウント'],
      color: 'green',
    },
    {
      title: '3. 興味カテゴリ',
      items: ['よく反応するトピック', '検索キーワード履歴', '参加しているコミュニティ'],
      color: 'purple',
    },
    {
      title: '4. メタ情報',
      items: ['使用言語', '活動時間帯', '使用デバイス', '地理的情報'],
      color: 'amber',
    },
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300' },
    green: { bg: 'bg-green-50 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-300' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300' },
  };

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      {categories.map((cat, idx) => {
        const c = colorClasses[cat.color];
        return (
          <div key={idx} className={`p-3 ${c.bg} border ${c.border} rounded`}>
            <h5 className={`font-semibold ${c.text} text-sm mb-2`}>{cat.title}</h5>
            <ul className="space-y-1">
              {cat.items.map((item, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1">
                  <span className="text-gray-400">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// Content Tower Categories
function ContentTowerCategories() {
  const categories = [
    { title: '1. ツイート内容', items: ['テキストの意味（NLP）', 'キーワード・ハッシュタグ', 'メンション・言語'], color: 'purple' },
    { title: '2. メディア情報', items: ['画像の内容（画像認識）', '動画のテーマ・長さ', 'リンク先の内容'], color: 'pink' },
    { title: '3. 著者情報', items: ['フォロワー数・影響力', '専門分野・過去の投稿傾向', 'エンゲージメント率'], color: 'indigo' },
    { title: '4. エンゲージメント履歴', items: ['これまでの反応数・率', 'どんなユーザーが反応したか', 'ネガティブ反応の有無'], color: 'teal' },
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300' },
    pink: { bg: 'bg-pink-50 dark:bg-pink-900/30', border: 'border-pink-200 dark:border-pink-800', text: 'text-pink-700 dark:text-pink-300' },
    indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/30', border: 'border-indigo-200 dark:border-indigo-800', text: 'text-indigo-700 dark:text-indigo-300' },
    teal: { bg: 'bg-teal-50 dark:bg-teal-900/30', border: 'border-teal-200 dark:border-teal-800', text: 'text-teal-700 dark:text-teal-300' },
  };

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      {categories.map((cat, idx) => {
        const c = colorClasses[cat.color];
        return (
          <div key={idx} className={`p-3 ${c.bg} border ${c.border} rounded`}>
            <h5 className={`font-semibold ${c.text} text-sm mb-2`}>{cat.title}</h5>
            <ul className="space-y-1">
              {cat.items.map((item, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1">
                  <span className="text-gray-400">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// Strategy Comparison Component
function StrategyComparison({ bad, good }: { bad: { title: string; items: string[] }; good: { title: string; items: string[] } }) {
  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
        <div className="flex items-center gap-1 mb-2">
          <XMarkIcon className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-red-700 dark:text-red-400 text-sm">{bad.title}</span>
        </div>
        <ul className="space-y-1">
          {bad.items.map((item, idx) => (
            <li key={idx} className="text-xs text-red-700 dark:text-red-400 flex items-start gap-1">
              <span className="text-red-400">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
        <div className="flex items-center gap-1 mb-2">
          <CheckIcon className="w-4 h-4 text-green-500" />
          <span className="font-semibold text-green-700 dark:text-green-400 text-sm">{good.title}</span>
        </div>
        <ul className="space-y-1">
          {good.items.map((item, idx) => (
            <li key={idx} className="text-xs text-green-700 dark:text-green-400 flex items-start gap-1">
              <span className="text-green-400">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// Limitation Box Component
function LimitationBox({ number, title, items }: { number: number; title: string; items: string[] }) {
  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded">
      <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2">
        <span className="w-5 h-5 bg-red-100 dark:bg-red-900/50 rounded flex items-center justify-center text-red-600 dark:text-red-400 text-xs font-bold">
          {number}
        </span>
        {title}
      </h5>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className={`text-xs flex items-start gap-1 ${idx === items.length - 1 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
            <span className="text-gray-400">{idx === items.length - 1 ? '->' : '-'}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Chapter3Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ChevronLeftIcon className="w-4 h-4" />
            目次
          </Link>
          <span className="text-sm font-medium text-gray-900 dark:text-white">第3章</span>
          <Link href="/chapters/4" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            次章
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <span className="inline-block px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium mb-3">
            Chapter 3
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Two-Tower検索の仕組み
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            ユーザーとコンテンツをマッチングする技術の全貌を解説します。
          </p>
        </div>

        {/* Section 3.1 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.1" color="blue" />
            Two-Towerとは何か
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Two-Tower（二塔）検索は、ユーザーとコンテンツをマッチングするための技術です。名前の通り、2つの「塔」（Tower）で構成されています。
          </p>

          <TwoTowerDiagram />

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            この仕組みにより、Xは「あなたが興味を持ちそうなコンテンツ」を、あなたがフォローしていない人の投稿からも見つけ出すことができます。
          </p>

          <NoteBox type="tip">
            Two-Tower検索は主に「おすすめ」タブ（For You）や「発見」機能で使用されます。フォローしていない人の投稿があなたのタイムラインに表示されるのは、この仕組みのおかげです。
          </NoteBox>
        </section>

        {/* Section 3.2 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.2" color="blue" />
            User Tower：あなたはどんな人？
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            User Tower（ユーザー塔）は、あなた自身を数値化（ベクトル化）するシステムです。
          </p>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-blue-500" />
            3.2.1 入力される情報
          </h3>

          <UserTowerCategories />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6 flex items-center gap-2">
            <CubeIcon className="w-4 h-4 text-blue-500" />
            3.2.2 ベクトル化のプロセス
          </h3>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            これらの情報は、128次元の数値ベクトルに変換されます。
          </p>

          <CodeBlock title="ユーザーベクトルのイメージ">
{`あなた = [0.23, -0.15, 0.87, 0.42, ..., 0.31]
          ^        ^        ^        ^
        技術への   政治への  スタートアップ デザイン
        興味度    興味度    への興味度   への興味度`}
          </CodeBlock>

          <NoteBox type="important">
            このベクトルは<strong>常に更新される</strong>ということです。あなたが今日いいねした投稿、リプライした内容、プロフィールを見に行ったアカウント――これらすべてが、リアルタイムであなたのUser Towerベクトルに反映されます。
          </NoteBox>
        </section>

        {/* Section 3.3 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.3" color="purple" />
            Content Tower：これはどんなコンテンツ？
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Content Tower（コンテンツ塔）は、各投稿を数値化するシステムです。
          </p>

          <ContentTowerCategories />

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            投稿もまた、128次元のベクトルに変換されます。
          </p>

          <CodeBlock title="コンテンツベクトルのイメージ">
{`投稿A = [0.45, -0.08, 0.92, 0.38, ..., 0.27]
         ^        ^        ^        ^
       技術的    政治的   スタートアップ デザイン
       な内容   な内容   関連の内容   関連の内容`}
          </CodeBlock>
        </section>

        {/* Section 3.4 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.4" color="amber" />
            マッチング：コサイン類似度計算
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            User TowerとContent Towerで生成された2つのベクトルは、<strong className="text-gray-900 dark:text-white">コサイン類似度</strong>という指標で比較されます。
          </p>

          <CosineSimilarityDiagram />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">3.4.1 計算例</h3>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded">
            <div className="text-xs font-mono mb-3">
              <span className="text-gray-500 dark:text-gray-400">あなたのベクトル: </span>
              <span className="text-gray-900 dark:text-white">[技術:0.9, 政治:0.1, スタートアップ:0.8, ...]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded">
                <p className="text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">
                  投稿A: [技術:0.85, 政治:0.05, スタートアップ:0.9, ...]
                </p>
                <p className="text-xs">
                  <span className="text-green-600 dark:text-green-400 font-bold">類似度: 0.95</span>
                  <span className="text-gray-500 ml-1">→ おすすめに表示</span>
                </p>
              </div>
              <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded">
                <p className="text-xs font-mono text-gray-700 dark:text-gray-300 mb-1">
                  投稿B: [技術:0.1, 政治:0.9, スタートアップ:0.1, ...]
                </p>
                <p className="text-xs">
                  <span className="text-red-600 dark:text-red-400 font-bold">類似度: 0.15</span>
                  <span className="text-gray-500 ml-1">→ 表示されにくい</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3.5 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.5" color="green" />
            発見タブで見つけてもらう戦略
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Two-Towerの仕組みを理解した上で、「発見」されやすくなる戦略を考えましょう。
          </p>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">戦略1：明確なニッチを持つ</h3>
          <StrategyComparison
            bad={{ title: '「マーケティング全般」', items: ['ベクトルが分散', 'どのクラスタにも強く属さない', 'マッチングスコアが中途半端'] }}
            good={{ title: '「SaaSのPLG戦略」', items: ['ベクトルが特定方向に集中', '同じ興味を持つユーザーと強くマッチ', '高い類似度スコアを獲得'] }}
          />

          <NoteBox type="tip">
            <strong>実践:</strong> あなたの専門分野を3つ以内に絞り、投稿の80%をその分野に集中させましょう。
          </NoteBox>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">戦略2：一貫したコンテンツテーマ</h3>
          <StrategyComparison
            bad={{ title: '投稿ごとにテーマがバラバラ', items: ['Content Towerのベクトルが毎回異なる', 'アルゴリズムが専門性を学習できない'] }}
            good={{ title: 'テーマが一貫している', items: ['Content Towerのベクトルが安定', 'アルゴリズムが専門性を認識'] }}
          />

          <NoteBox type="tip">
            <strong>実践:</strong> 毎日の投稿で、同じキーワードやトピックを繰り返し使用しましょう。
          </NoteBox>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">戦略3：ターゲット層との相互作用</h3>
          <StrategyComparison
            bad={{ title: '一方的に投稿するだけ', items: ['User Towerの「関係性」情報が薄い', '類似ユーザークラスタへの接続が弱い'] }}
            good={{ title: 'ターゲット層にリプライ・引用RT', items: ['User Towerに「この界隈の人」という情報が追加', 'そのクラスタのユーザーに発見されやすくなる'] }}
          />

          <NoteBox type="tip">
            <strong>実践:</strong> 見つけてほしい層が反応しそうなアカウントを10個リストアップし、定期的にリプライや引用RTで関わりましょう。
          </NoteBox>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">戦略4：エンゲージメントの質を高める</h3>
          <StrategyComparison
            bad={{ title: 'いいねは多いが、リプライが少ない', items: ['Content Towerの「エンゲージメント履歴」が薄い', '「会話は生まない」と学習される'] }}
            good={{ title: 'リプライやプロフィールクリックが多い', items: ['「深い関与を生む」と学習される', '発見タブでの露出が増加'] }}
          />

          <NoteBox type="tip">
            <strong>実践:</strong> 第2章で学んだ「リプライ誘発」「プロフィール誘導」のテクニックを活用しましょう。
          </NoteBox>
        </section>

        {/* Section 3.6 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.6" color="red" />
            Two-Towerの限界と注意点
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Two-Towerにも限界があります。
          </p>

          <div className="space-y-3">
            <LimitationBox
              number={1}
              title="コールドスタート問題"
              items={['新規アカウントはUser Tower情報が少ない', '新規投稿はContent Tower情報が少ない', '最初は発見されにくい']}
            />
            <LimitationBox
              number={2}
              title="フィルターバブル"
              items={['類似コンテンツばかり推薦される', '新しい分野への拡張が難しい', '意図的な多様性確保が必要']}
            />
            <LimitationBox
              number={3}
              title="短期的な興味への偏り"
              items={['直近の行動が重視される', '一時的な興味が長期的な推薦に影響', '慎重な行動が必要']}
            />
          </div>
        </section>

        {/* Section 3.7 - Summary */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="3.7" color="blue" />
            この章のまとめ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2 text-sm">
                <BookOpenIcon className="w-4 h-4" />
                重要ポイント
              </h4>
              <ul className="space-y-2 text-xs text-blue-800 dark:text-blue-300">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-3 h-3 mt-0.5 text-green-500" />
                  <span>Two-Towerはユーザーとコンテンツをマッチングする仕組み</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-3 h-3 mt-0.5 text-green-500" />
                  <span>User Towerはあなたの行動・興味を128次元ベクトル化</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-3 h-3 mt-0.5 text-green-500" />
                  <span>Content Towerは投稿の内容・著者を128次元ベクトル化</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-3 h-3 mt-0.5 text-green-500" />
                  <span>発見されるには「明確なニッチ」と「一貫性」が重要</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
              <h4 className="font-bold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2 text-sm">
                <AcademicCapIcon className="w-4 h-4" />
                今日からできること
              </h4>
              <ul className="space-y-2 text-xs text-green-800 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 border border-green-400 rounded-sm" />
                  <span>自分の専門分野を3つ以内に絞る</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 border border-green-400 rounded-sm" />
                  <span>投稿の80%を専門分野に集中させる</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 border border-green-400 rounded-sm" />
                  <span>ターゲット層のアカウント10個をリストアップ</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 border border-green-400 rounded-sm" />
                  <span>毎日、ターゲット層のコンテンツにリプライする</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ items={faqData} />

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        {/* Chapter Navigation */}
        <ChapterNav currentChapter={3} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          Xアルゴリズム攻略ガイド
        </div>
      </footer>
    </div>
  );
}

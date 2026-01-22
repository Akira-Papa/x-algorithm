'use client';

import {
  CheckIcon,
  XMarkIcon,
  BookOpenIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  HandThumbUpIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from '@/components/ui/Quiz';
import { FAQ } from '@/components/ui/Accordion';
import { ChapterNav } from '@/components/ui/ChapterNav';
import { ChapterHeader } from '@/components/ui/ChapterHeader';

// Types
interface EngagementData {
  name: string;
  nameEn: string;
  weight: number | string;
  description: string;
  likeRatio?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// Engagement Data
const basicInteractions: EngagementData[] = [
  { name: 'いいね', nameEn: 'favorited', weight: 0.5, description: '最も頻繁に行われるが、重みは低い。気軽にできるため、深いエンゲージメントとは見なされない', likeRatio: '1倍' },
  { name: 'リポスト', nameEn: 'retweeted', weight: 1.0, description: 'いいねの2倍の重み。「自分のフォロワーにも見せたい」という意思表示', likeRatio: '2倍' },
  { name: 'リプライ', nameEn: 'replied', weight: 13.5, description: '最も重要なエンゲージメント。会話が生まれる = 滞在時間増加につながる', likeRatio: '27倍' },
  { name: '引用RT', nameEn: 'quoted', weight: 1.1, description: 'リポストよりわずかに高い。自分の意見を付加している = より深い関与', likeRatio: '2.2倍' },
];

const deepEngagements: EngagementData[] = [
  { name: 'プロフィールクリック', nameEn: 'profile_clicked', weight: 12.0, description: 'リプライに次ぐ高さ。「この人をもっと知りたい」という強い興味', likeRatio: '24倍' },
  { name: '詳細展開', nameEn: 'detail_expanded', weight: 0.3, description: '投稿をクリックして全文を見る。興味はあるが、アクションまでは至っていない', likeRatio: '0.6倍' },
  { name: '動画50%視聴', nameEn: 'video_playback_50', weight: 0.005, description: '非常に低い重み。単なる視聴より、VQV（後述）が重要', likeRatio: '0.01倍' },
  { name: 'VQV動画視聴', nameEn: 'video_quality_view', weight: 1.5, description: 'Video Quality View - 10秒以上、音声ON、スクロール通過でない視聴', likeRatio: '3倍' },
  { name: '滞在時間', nameEn: 'dwell_time_ms', weight: '動的計算', description: '投稿を見ていた時間（ミリ秒）。長いほど高評価だが、上限あり', likeRatio: '-' },
];

const followRelated: EngagementData[] = [
  { name: 'フォロー', nameEn: 'followed', weight: 4.0, description: '継続的な関係構築の始まり。一度のフォローがいいね8回分の価値', likeRatio: '8倍' },
  { name: '後のアンフォロー', nameEn: 'unfollowed_later', weight: '追跡対象', description: 'ネガティブシグナルとして追跡。フォロー後すぐのアンフォローはペナルティ要因', likeRatio: '-' },
  { name: '通知オン', nameEn: 'notification_enabled', weight: 2.0, description: '「この人の投稿を見逃したくない」。フォローの半分の重みだが、非常に強い興味表示', likeRatio: '4倍' },
];

const otherPositive: EngagementData[] = [
  { name: 'リンククリック', nameEn: 'link_clicked', weight: 1.1, description: '外部リンクへのクリック。投稿の情報に価値を感じた証拠', likeRatio: '2.2倍' },
  { name: 'ブックマーク', nameEn: 'bookmark_added', weight: 1.0, description: '「後で見返したい」。リポストと同じ重みだが、非公開の行動', likeRatio: '2倍' },
  { name: '外部共有', nameEn: 'shared_externally', weight: 1.2, description: 'X外へのシェア。Xのコンテンツを外部に広める価値', likeRatio: '2.4倍' },
];

const negativeEngagements: EngagementData[] = [
  { name: '通報', nameEn: 'reported', weight: -10.0, description: '最も重いペナルティ。1件の通報で、いいね20回分の価値が消える', likeRatio: '-20倍' },
  { name: 'ブロック', nameEn: 'blocked', weight: -10.0, description: '通報と同等のペナルティ。この投稿主との関係を完全に断つ意思表示', likeRatio: '-20倍' },
  { name: 'ミュート', nameEn: 'muted', weight: -5.0, description: 'ブロックより軽いが重大。「見たくないが、関係は断たない」', likeRatio: '-10倍' },
  { name: '興味なし', nameEn: 'not_interested', weight: -1.5, description: '最も軽いネガティブシグナル。「おすすめ」でのフィードバック', likeRatio: '-3倍' },
];

const rankingData = [
  { rank: 1, name: 'リプライ', weight: 13.5, likeRatio: '27倍' },
  { rank: 2, name: 'プロフィールクリック', weight: 12.0, likeRatio: '24倍' },
  { rank: 3, name: 'フォロー', weight: 4.0, likeRatio: '8倍' },
  { rank: 4, name: '通知オン', weight: 2.0, likeRatio: '4倍' },
  { rank: 5, name: 'VQV動画視聴', weight: 1.5, likeRatio: '3倍' },
  { rank: 6, name: '外部共有', weight: 1.2, likeRatio: '2.4倍' },
  { rank: 7, name: '引用RT', weight: 1.1, likeRatio: '2.2倍' },
  { rank: 8, name: 'リンククリック', weight: 1.1, likeRatio: '2.2倍' },
  { rank: 9, name: 'リポスト', weight: 1.0, likeRatio: '2倍' },
  { rank: 10, name: 'ブックマーク', weight: 1.0, likeRatio: '2倍' },
  { rank: 11, name: 'いいね', weight: 0.5, likeRatio: '1倍' },
];

// FAQ Data
const faqData: FAQItem[] = [
  {
    question: 'Q1: なぜリプライの重み(13.5)がいいね(0.5)の27倍も高いのですか？',
    answer: 'Xのアルゴリズムは「滞在時間」と「会話の生成」を最も重視しています。リプライは会話を生み、他のユーザーもその会話を読むために滞在時間が伸びます。いいねは一瞬で完了するアクションですが、リプライは内容を考え、タイプし、投稿するという一連の深い関与を必要とします。',
  },
  {
    question: 'Q2: ネガティブエンゲージメントはどのくらいの影響がありますか？',
    answer: '非常に大きな影響があります。1件の通報(-10.0)やブロック(-10.0)は、いいね20回分のポジティブな価値を完全に打ち消します。継続的にネガティブエンゲージメントを受けるアカウントは、全体的なリーチが制限される可能性があります。',
  },
  {
    question: 'Q3: プロフィールクリックを増やすにはどうすればいいですか？',
    answer: '効果的な戦略は3つあります。1つ目は「実績の断片を見せる」こと。2つ目は「希少情報の予告」。3つ目は「専門性のアピール」。重要なのは、プロフィール自体も魅力的に整えておくことです。',
  },
  {
    question: 'Q4: VQV(Video Quality View)とは具体的に何ですか？',
    answer: 'VQVは動画の「質の高い視聴」を測定する指標です。条件は(1)10秒以上の視聴、(2)音声がONの状態での視聴、(3)スクロール通過ではなく意図的な視聴、の3つすべてを満たす必要があります。',
  },
  {
    question: 'Q5: エンゲージメントの重みは今後変更される可能性はありますか？',
    answer: 'はい、変更される可能性は十分にあります。ただし、「深い関与を浅い関与より重視する」という方針は変わらないでしょう。具体的な数値よりも、背後にある原則を理解することが長期的に有効です。',
  },
];

// Quiz Data with explanations for immediate feedback
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '最も重みが高いポジティブエンゲージメントは？',
    choices: [
      { id: 'A', text: 'いいね' },
      { id: 'B', text: 'リポスト' },
      { id: 'C', text: 'リプライ' },
      { id: 'D', text: 'フォロー' },
    ],
    correctAnswer: 'C',
    explanation: 'リプライ（13.5）は最も高い重みを持つエンゲージメントです。会話を生み出し、滞在時間を増加させるため、Xのアルゴリズムが最も高く評価しています。',
  },
  {
    id: 2,
    question: 'いいねの重みはいくつ？',
    choices: [
      { id: 'A', text: '0.5' },
      { id: 'B', text: '1.0' },
      { id: 'C', text: '1.5' },
      { id: 'D', text: '2.0' },
    ],
    correctAnswer: 'A',
    explanation: 'いいねの重みは0.5です。最も頻繁に行われるアクションですが、深いエンゲージメントとは見なされないため、重みは低く設定されています。',
  },
  {
    id: 3,
    question: '通報(reported)の重みは？',
    choices: [
      { id: 'A', text: '-1.5' },
      { id: 'B', text: '-5.0' },
      { id: 'C', text: '-10.0' },
      { id: 'D', text: '-15.0' },
    ],
    correctAnswer: 'C',
    explanation: '通報の重みは-10.0で、最も重いペナルティです。1件の通報で、いいね20回分の価値が消えます。ブロックも同様に-10.0です。',
  },
  {
    id: 4,
    question: 'プロフィールクリックの重みは？',
    choices: [
      { id: 'A', text: '4.0' },
      { id: 'B', text: '8.0' },
      { id: 'C', text: '12.0' },
      { id: 'D', text: '13.5' },
    ],
    correctAnswer: 'C',
    explanation: 'プロフィールクリックの重みは12.0で、リプライ（13.5）に次ぐ高さです。「この人をもっと知りたい」という強い興味を示すため、高く評価されています。',
  },
  {
    id: 5,
    question: '以下で最も重みが低いのは？',
    choices: [
      { id: 'A', text: 'リポスト' },
      { id: 'B', text: 'ブックマーク' },
      { id: 'C', text: '引用RT' },
      { id: 'D', text: 'いいね' },
    ],
    correctAnswer: 'D',
    explanation: 'いいね（0.5）が最も低い重みです。リポスト（1.0）、ブックマーク（1.0）、引用RT（1.1）はすべていいねより高い重みを持っています。',
  },
];

// Section Number Component
function SectionNumber({ number, color = 'blue' }: { number: string; color?: 'blue' | 'green' | 'red' | 'purple' | 'amber' }) {
  const colorClasses = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    red: 'bg-red-600 text-white',
    purple: 'bg-purple-600 text-white',
    amber: 'bg-amber-600 text-white',
  };

  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded ${colorClasses[color]} font-bold text-sm mr-3`}>
      {number}
    </span>
  );
}

// Textbook Table Component
function TextbookTable({ title, data, variant = 'positive' }: { title: string; data: EngagementData[]; variant?: 'positive' | 'negative' }) {
  return (
    <div className="my-6 border border-gray-300 dark:border-gray-600 rounded">
      <div className={`px-4 py-2 ${variant === 'positive' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-red-50 dark:bg-red-900/30'} border-b border-gray-300 dark:border-gray-600`}>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">エンゲージメント</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">変数名</th>
              <th className="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">重み</th>
              <th className="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">いいね比</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">説明</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/30'}>
                <td className="px-3 py-2 font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">{item.name}</td>
                <td className="px-3 py-2 font-mono text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">{item.nameEn}</td>
                <td className={`px-3 py-2 text-center font-bold border-b border-gray-200 dark:border-gray-700 ${variant === 'positive' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>{item.weight}</td>
                <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">{item.likeRatio}</td>
                <td className="px-3 py-2 text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Ranking Table Component
function RankingTable() {
  return (
    <div className="my-6 border border-gray-300 dark:border-gray-600 rounded">
      <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
          <ArrowTrendingUpIcon className="w-4 h-4" />
          表2.1 重み順位表（ポジティブエンゲージメント）
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600 w-16">順位</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">エンゲージメント</th>
              <th className="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600 w-20">重み</th>
              <th className="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600 w-20">いいね比</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item, index) => (
              <tr key={item.rank} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/30'}>
                <td className="px-3 py-2 text-center border-b border-gray-200 dark:border-gray-700">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    item.rank <= 3 ? 'bg-amber-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.rank}
                  </span>
                </td>
                <td className="px-3 py-2 font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">{item.name}</td>
                <td className="px-3 py-2 text-center font-bold text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700">{item.weight}</td>
                <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">{item.likeRatio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      title: '戦略的ポイント',
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


// Strategy List Component
function StrategyList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded">
      <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{title}</p>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-gray-400 font-mono text-xs mt-0.5">{String(index + 1).padStart(2, '0')}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Chapter2Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ChapterHeader currentChapter={2} />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <span className="inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium mb-3">
            Chapter 2
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            エンゲージメント19種類の完全解説
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Xアルゴリズムが各エンゲージメントにどのような重みを設定しているのか、ソースコードから抽出したデータを完全解説します。
          </p>
        </div>

        {/* Section 2.1 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="2.1" color="blue" />
            エンゲージメントとは何か
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            エンゲージメントとは、ユーザーが投稿に対して行うあらゆる反応のことです。いいね、リプライ、リポストといった明示的なアクションから、投稿をどれだけの時間見ていたかという暗黙的な行動まで、すべてがエンゲージメントとして計測されています。
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Xのアルゴリズムは、各エンゲージメントに<strong className="text-gray-900 dark:text-white">重み（weight）</strong>を設定しています。この重みは、そのエンゲージメントがどれだけ「価値がある」とアルゴリズムが判断しているかを示します。
          </p>

          <NoteBox type="important">
            重要なのは、すべてのエンゲージメントが同じ価値ではないということです。いいね1回とリプライ1回では、アルゴリズム的な価値が<strong>27倍</strong>も異なります。
          </NoteBox>
        </section>

        {/* Section 2.2 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="2.2" color="green" />
            ポジティブエンゲージメント15種類
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Twitter公式オープンソースリリース（2023年4月）に記載されたデータです。
          </p>

          {/* ソース注記 */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <span className="font-semibold">📚 データソース:</span>{' '}
              <a href="https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">twitter/the-algorithm-ml</a>
              （2023年4月公開時点の値）
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              ※ 2026年1月公開の <a href="https://github.com/xai-org/x-algorithm" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">xai-org/x-algorithm</a> では、Grokベースのスコアリングに移行しています。会話の文章の内容や意味自体もAIにより計測されるため、質の高い会話を促進する投稿がより重要になっています。
            </p>
          </div>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <HandThumbUpIcon className="w-4 h-4 text-green-500" />
            2.2.1 基本インタラクション（4種類）
          </h3>

          <CodeBlock title="エンゲージメント重み（2023年4月公式リリースより）">
{`favorited: 0.5    // いいね
retweeted: 1.0    // リポスト
replied: 13.5     // リプライ（最重要）
quoted: 1.1       // 引用RT`}
          </CodeBlock>

          <TextbookTable title="表2.2 基本インタラクション" data={basicInteractions} />

          <NoteBox type="tip">
            リプライの重みが13.5という異常に高い値であることに注目してください。これは、Xが「会話を生み出すコンテンツ」を最も高く評価していることを意味します。
          </NoteBox>

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6 flex items-center gap-2">
            <HandThumbUpIcon className="w-4 h-4 text-green-500" />
            2.2.2 深いエンゲージメント（5種類）
          </h3>

          <TextbookTable title="表2.3 深いエンゲージメント" data={deepEngagements} />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6 flex items-center gap-2">
            <HandThumbUpIcon className="w-4 h-4 text-green-500" />
            2.2.3 フォロー関連（3種類）
          </h3>

          <TextbookTable title="表2.4 フォロー関連" data={followRelated} />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6 flex items-center gap-2">
            <HandThumbUpIcon className="w-4 h-4 text-green-500" />
            2.2.4 その他（3種類）
          </h3>

          <TextbookTable title="表2.5 その他のポジティブエンゲージメント" data={otherPositive} />
        </section>

        {/* Section 2.3 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="2.3" color="red" />
            ネガティブエンゲージメント4種類
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            ネガティブエンゲージメントは、投稿の評価を大きく下げる要因です。
          </p>

          <CodeBlock title="ネガティブエンゲージメント重み（2023年4月公式リリースより）">
{`reported: -10.0       // 通報
blocked: -10.0        // ブロック
muted: -5.0           // ミュート
not_interested: -1.5  // 興味なし`}
          </CodeBlock>

          <TextbookTable title="表2.6 ネガティブエンゲージメント" data={negativeEngagements} variant="negative" />

          <NoteBox type="warning">
            <strong>重要な理解</strong>: ネガティブエンゲージメントの影響は非常に大きいです。1件の通報やブロック（-10.0）は、20いいね分の価値を消し去ります。攻撃的・不快なコンテンツは、たとえ「バズ」しても、最終的にはアカウント全体の評価を下げます。
          </NoteBox>
        </section>

        {/* Section 2.4 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="2.4" color="purple" />
            重みの戦略的含意
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            19種類の重みを戦略的な観点から整理します。
          </p>

          <RankingTable />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">戦略1：リプライを誘発する</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            リプライ（13.5）は最も価値が高いエンゲージメントです。
          </p>

          <StrategyList
            title="リプライを誘発する技術"
            items={[
              '質問で終わる（「みなさんはどう思いますか？」）',
              '意見が分かれるテーマを選ぶ',
              '体験の共有を促す（「同じ経験をした人いますか？」）',
            ]}
          />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">戦略2：プロフィールへの誘導</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            プロフィールクリック（12.0）は、リプライに次ぐ高価値です。
          </p>

          <StrategyList
            title="プロフィールクリックを誘発する技術"
            items={[
              '実績の断片を見せる（「3年で0→10万フォロワー」）',
              '希少情報の予告（「詳細はプロフィールで」）',
              '専門性のアピール（「10年間この分野を研究」）',
            ]}
          />

          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">戦略3：ネガティブを避ける</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <h4 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-2">通報・ブロックを招く行為</h4>
              <ul className="space-y-1 text-xs text-red-700 dark:text-red-400">
                <li className="flex items-center gap-1"><XMarkIcon className="w-3 h-3" /> 攻撃的・差別的な表現</li>
                <li className="flex items-center gap-1"><XMarkIcon className="w-3 h-3" /> 虚偽の情報の拡散</li>
                <li className="flex items-center gap-1"><XMarkIcon className="w-3 h-3" /> スパム的な大量投稿</li>
              </ul>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
              <h4 className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-2">ミュートを招く行為</h4>
              <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-400">
                <li className="flex items-center gap-1"><XMarkIcon className="w-3 h-3" /> 同じ内容の繰り返し投稿</li>
                <li className="flex items-center gap-1"><XMarkIcon className="w-3 h-3" /> 過度な自己宣伝</li>
                <li className="flex items-center gap-1"><XMarkIcon className="w-3 h-3" /> 興味と乖離した内容</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2.5 */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="2.5" color="amber" />
            よくある誤解と正解
          </h2>

          <div className="space-y-3">
            {[
              { mistake: '「いいねを大量に獲得すれば拡散される」', correct: 'いいね（0.5）よりリプライ（13.5）の方が27倍重要です。' },
              { mistake: '「バズれば勝ち」', correct: '通報やブロックが発生すれば、アカウント全体の評価が下がります。' },
              { mistake: '「リポストは最も重要」', correct: 'リポスト（1.0）はリプライ（13.5）やプロフィールクリック（12.0）より低いです。' },
              { mistake: '「動画は再生数が大事」', correct: '単純な再生（0.005）よりVQV（1.5）の方が300倍重要です。' },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                <div className="px-3 py-2 bg-red-50 dark:bg-red-900/30 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">誤解{index + 1}：{item.mistake}</p>
                </div>
                <div className="px-3 py-2 bg-green-50 dark:bg-green-900/30">
                  <p className="text-sm text-green-800 dark:text-green-300"><strong>正解：</strong>{item.correct}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2.6 - Summary */}
        <section className="mb-10">
          <h2 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <SectionNumber number="2.6" color="blue" />
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
                  <span>19種類のエンゲージメントには明確な重み付けがある</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-3 h-3 mt-0.5 text-green-500" />
                  <span>リプライ（13.5）とプロフィールクリック（12.0）が最重要</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-3 h-3 mt-0.5 text-green-500" />
                  <span>ネガティブエンゲージメントの影響は甚大</span>
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
                  <span>投稿を質問で終わらせる習慣をつける</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 border border-green-400 rounded-sm" />
                  <span>プロフィールへの誘導文を入れる</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 border border-green-400 rounded-sm" />
                  <span>攻撃的・不快なコンテンツを避ける</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
            よくある質問（FAQ）
          </h2>
          <FAQ items={faqData} />
        </section>

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        {/* Chapter Navigation */}
        <ChapterNav currentChapter={2} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-gray-500 dark:text-gray-500">
          X Algorithm Guide - 第2章 エンゲージメント19種類の完全解説
        </div>
      </footer>
    </div>
  );
}

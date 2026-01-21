'use client';

import Link from 'next/link';
import {
  FunnelIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from '@/components/ui/Quiz';
import { FAQ } from '@/components/ui/Accordion';
import { ChapterNav } from '@/components/ui/ChapterNav';

// フィルターデータ
const contentQualityFilters = [
  { name: 'SafetyFilter', target: '暴力、ヘイト、テロ、違法行為', result: 'SAFE / SENSITIVE / UNSAFE', impact: 'UNSAFEは完全除外' },
  { name: 'NsfwFilter', target: '性的コンテンツ、成人向け', result: '一般 / 要年齢確認 / 禁止', impact: '禁止は完全除外' },
  { name: 'SpamFilter', target: '大量投稿、自動化、リンク乱用', result: '正常 / 疑わしい / スパム', impact: 'スパムはアカウント凍結も' },
  { name: 'QualityFilter', target: '情報価値、オリジナリティ', result: '高品質 / 標準 / 低品質', impact: '低品質は除外orリーチ制限' },
];

const userRelationFilters = [
  { name: 'BlockedFilter', target: 'ブロック関係', logic: '双方向でブロックがあれば除外', impact: '完全除外' },
  { name: 'MutedFilter', target: 'ミュート関係、キーワード', logic: 'ミュート設定に該当すれば除外', impact: '除外（相手に非通知）' },
  { name: 'FollowFilter', target: 'フォロー関係', logic: '「フォロー中のみ」設定時に適用', impact: '設定依存' },
];

const contentTypeFilters = [
  { name: 'MediaTypeFilter', target: 'テキスト、画像、動画、リンク', behavior: 'ユーザーの好みを学習', impact: 'スコア調整が主' },
  { name: 'LanguageFilter', target: '投稿の言語', behavior: '言語不一致で大幅スコア減', impact: '実質除外に近い' },
  { name: 'TopicFilter', target: 'トピック分類', behavior: '興味/ミュート設定を参照', impact: 'ミュートは完全除外' },
];

const timeFreshnessFilters = [
  { name: 'FreshnessFilter', target: '投稿の経過時間', behavior: '48時間超は原則除外、24時間超は0.5倍', impact: '新しさ重視' },
  { name: 'DuplicateFilter', target: '重複・類似コンテンツ', behavior: '同一内容の後続投稿を除外', impact: '重複は除外' },
];

// FAQ データ
const faqData = [
  {
    question: 'フィルターの「バイナリ判定」とはどういう意味ですか？',
    answer: 'バイナリ判定とは、「通過」か「除外」かの二択で判定される仕組みです。スコアリングのような連続的な数値ではなく、完全に白か黒かで判断されます。どんなに高品質なコンテンツでも、1つのフィルターに引っかかれば候補から完全に除外され、誰のタイムラインにも表示されなくなります。',
  },
  {
    question: 'SafetyFilterで除外される内容は何ですか？',
    answer: '暴力的なコンテンツ、ヘイトスピーチ、テロリズム関連、自傷・自殺関連、違法行為の助長などです。判定結果は「SAFE」「SENSITIVE」「UNSAFE」の3段階で、UNSAFEと判定されると完全に除外されます。',
  },
  {
    question: 'SpamFilterに引っかからないためのコツは？',
    answer: '(1)同一内容の繰り返し投稿を避ける (2)短時間での大量投稿を控える (3)不自然なリンクを多用しない (4)フォロー/アンフォローを繰り返さない (5)エンゲージメント購入をしない。予防が最も重要です。',
  },
  {
    question: '言語フィルターはどのように動作しますか？',
    answer: '投稿の言語が自動検出され、ユーザーの言語設定と比較されます。言語が一致しない場合、スコアが約0.1倍（90%減）になるため、実質的にほとんど表示されなくなります。',
  },
  {
    question: 'フィルターに引っかかったことはどうやってわかりますか？',
    answer: '直接通知されることはありません。間接的なサインとして、インプレッションが極端に少ない、エンゲージメントがほぼゼロ、検索結果に表示されない、他のアカウントから見えないなどがあります。',
  },
];

// クイズデータ
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'フィルターの判定方式は？',
    choices: [
      { id: 'A', text: 'スコア方式' },
      { id: 'B', text: 'バイナリ判定' },
      { id: 'C', text: '確率方式' },
      { id: 'D', text: '重み付け方式' },
    ],
    correctAnswer: 'B',
    explanation: 'フィルターはバイナリ判定（二値判定）です。通過か除外かの二択で、一つでも引っかかれば完全に除外されます。',
  },
  {
    id: 2,
    question: 'フィルターの総数は？',
    choices: [
      { id: 'A', text: '8種類' },
      { id: 'B', text: '10種類' },
      { id: 'C', text: '12種類' },
      { id: 'D', text: '15種類' },
    ],
    correctAnswer: 'C',
    explanation: 'フィルターは全部で12種類あります。コンテンツ品質4種類、ユーザー関係3種類、コンテンツタイプ3種類、時間・鮮度2種類です。',
  },
  {
    id: 3,
    question: 'SpamFilterで検出されるものは？',
    choices: [
      { id: 'A', text: '暴力的コンテンツ' },
      { id: 'B', text: '同一内容の大量投稿' },
      { id: 'C', text: '古い投稿' },
      { id: 'D', text: '言語不一致' },
    ],
    correctAnswer: 'B',
    explanation: 'SpamFilterは同一内容の大量投稿、自動化された投稿パターン、不自然なリンクの多用などを検出します。',
  },
  {
    id: 4,
    question: 'FreshnessFilterで優先されるのは？',
    choices: [
      { id: 'A', text: '48時間以内' },
      { id: 'B', text: '24時間以内' },
      { id: 'C', text: '12時間以内' },
      { id: 'D', text: '1時間以内' },
    ],
    correctAnswer: 'B',
    explanation: '24時間以内の投稿が優先されます。48時間を超えると原則除外、24時間超はスコア0.5倍、1時間以内は1.2倍ボーナスです。',
  },
  {
    id: 5,
    question: 'ブロック関係のフィルターの動作は？',
    choices: [
      { id: 'A', text: 'スコア減少' },
      { id: 'B', text: 'リーチ制限' },
      { id: 'C', text: '完全除外' },
      { id: 'D', text: '警告表示' },
    ],
    correctAnswer: 'C',
    explanation: 'BlockedFilterは完全除外を行います。ブロック関係にある相手の投稿は双方向で完全に遮断されます。',
  },
];

export default function Chapter6Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <ChevronLeftIcon className="w-4 h-4" />
            目次に戻る
          </Link>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">第6章 / 全12章</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* タイトルセクション */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <FunnelIcon className="w-4 h-4" />
            フィルターシステム
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            第6章：12種類のフィルター
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            スコアリングの前に立ちはだかる「関門」を理解する。一つでも引っかかれば、どんなに良いコンテンツでも完全除外されます。
          </p>
        </div>

        {/* 6.1 フィルターとは */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.1 フィルターの位置づけ
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            フィルターは、候補となる投稿がスコアリングされる<strong>前に</strong>適用される「関門」です。
            スコアリングが「どれくらい良いか」を連続的な値で評価するのに対し、
            フィルターは「通過か除外か」の<strong>バイナリ判定</strong>（二値判定）を行います。
          </p>

          {/* 処理フロー図 */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">処理の流れ</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="text-2xl mb-2">1</div>
                <div className="font-medium text-blue-800 dark:text-blue-200">候補投稿</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">数百万件</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-zinc-400 hidden md:block" />
              <div className="flex-1 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="text-2xl mb-2">2</div>
                <div className="font-medium text-purple-800 dark:text-purple-200">12種類のフィルター</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">バイナリ判定</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-zinc-400 hidden md:block" />
              <div className="flex-1 bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                <div className="text-2xl mb-2">3</div>
                <div className="font-medium text-amber-800 dark:text-amber-200">スコアリング</div>
                <div className="text-sm text-amber-600 dark:text-amber-400">連続値で評価</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-zinc-400 hidden md:block" />
              <div className="flex-1 bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="text-2xl mb-2">4</div>
                <div className="font-medium text-green-800 dark:text-green-200">最終表示</div>
                <div className="text-sm text-green-600 dark:text-green-400">数十件</div>
              </div>
            </div>
          </div>

          {/* バイナリ vs スコアリング */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-5 border border-red-200 dark:border-red-800">
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
                <XCircleIcon className="w-5 h-5" />
                フィルター（バイナリ判定）
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                「通過」か「除外」の二択。一つでも引っかかれば<strong>候補から完全除外</strong>。スコアが高くても関係ありません。
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                スコアリング（連続値）
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                0.5、1.2、3.8などの連続的な値。スコアが低くても<strong>表示される可能性はある</strong>。
              </p>
            </div>
          </div>
        </section>

        {/* 6.2 コンテンツ品質フィルター */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.2 コンテンツ品質フィルター（4種類）
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              コンテンツそのものの品質・安全性を判定するフィルターです。
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">フィルター名</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">判定対象</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">判定結果</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">影響</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                {contentQualityFilters.map((filter, index) => (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 font-mono text-sm">{filter.name}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.target}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.result}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-red-600 dark:text-red-400">{filter.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 詳細説明 */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">SafetyFilterの判定対象</h4>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2"><XCircleIcon className="w-4 h-4 text-red-500" /> 暴力的なコンテンツ</li>
              <li className="flex items-center gap-2"><XCircleIcon className="w-4 h-4 text-red-500" /> ヘイトスピーチ</li>
              <li className="flex items-center gap-2"><XCircleIcon className="w-4 h-4 text-red-500" /> テロリズム関連</li>
              <li className="flex items-center gap-2"><XCircleIcon className="w-4 h-4 text-red-500" /> 自傷・自殺関連</li>
              <li className="flex items-center gap-2"><XCircleIcon className="w-4 h-4 text-red-500" /> 違法行為の助長</li>
            </ul>
          </div>
        </section>

        {/* 6.3 ユーザー関係フィルター */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.3 ユーザー関係フィルター（3種類）
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              ユーザー間の関係性に基づくフィルターです。
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">フィルター名</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">対象</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">ロジック</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">影響</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                {userRelationFilters.map((filter, index) => (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 font-mono text-sm">{filter.name}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.target}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.logic}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-pink-600 dark:text-pink-400">{filter.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ブロックとミュートの違い */}
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-5 border border-pink-200 dark:border-pink-800">
            <h4 className="font-bold text-pink-800 dark:text-pink-200 mb-3">ブロックとミュートの違い</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-pink-800 dark:text-pink-200 mb-2">ブロック（強）</p>
                <ul className="space-y-1 text-pink-700 dark:text-pink-300">
                  <li>- 双方向で完全遮断</li>
                  <li>- 相手にも見えなくなる</li>
                  <li>- 最も強い関係遮断</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-pink-800 dark:text-pink-200 mb-2">ミュート（緩）</p>
                <ul className="space-y-1 text-pink-700 dark:text-pink-300">
                  <li>- 自分からだけ見えない</li>
                  <li>- 相手には通知されない</li>
                  <li>- キーワードミュートも可</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6.4 コンテンツタイプフィルター */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.4 コンテンツタイプフィルター（3種類）
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              コンテンツの種類や属性に基づくフィルターです。
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">フィルター名</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">対象</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">動作</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">影響</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                {contentTypeFilters.map((filter, index) => (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 font-mono text-sm">{filter.name}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.target}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.behavior}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-indigo-600 dark:text-indigo-400">{filter.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-5 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-800 dark:text-indigo-200 mb-3">言語フィルターの仕組み</h4>
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <p className="text-zinc-400"># 判定ロジック</p>
              <p className="text-green-400">user_languages = [&quot;ja&quot;, &quot;en&quot;]</p>
              <p className="text-green-400">tweet_language = &quot;fr&quot;</p>
              <p className="text-zinc-300 mt-2">if tweet_language not in user_languages:</p>
              <p className="text-red-400 ml-4">score *= 0.1  # 90%減</p>
            </div>
          </div>
        </section>

        {/* 6.5 時間・鮮度フィルター */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.5 時間・鮮度フィルター（2種類）
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              時間に関連するフィルターです。
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">フィルター名</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">対象</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">動作</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">影響</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                {timeFreshnessFilters.map((filter, index) => (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 font-mono text-sm">{filter.name}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.target}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">{filter.behavior}</td>
                    <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-violet-600 dark:text-violet-400">{filter.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 鮮度タイムライン */}
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-5 border border-violet-200 dark:border-violet-800">
            <h4 className="font-bold text-violet-800 dark:text-violet-200 mb-4">鮮度による影響タイムライン</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 border border-green-300 dark:border-green-700">
                <div className="text-lg font-bold text-green-700 dark:text-green-300">1.2x</div>
                <div className="text-green-600 dark:text-green-400">1時間以内</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3 border border-yellow-300 dark:border-yellow-700">
                <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">1.0x</div>
                <div className="text-yellow-600 dark:text-yellow-400">24時間以内</div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3 border border-orange-300 dark:border-orange-700">
                <div className="text-lg font-bold text-orange-700 dark:text-orange-300">0.5x</div>
                <div className="text-orange-600 dark:text-orange-400">24-48時間</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border border-red-300 dark:border-red-700">
                <div className="text-lg font-bold text-red-700 dark:text-red-300">除外</div>
                <div className="text-red-600 dark:text-red-400">48時間超</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6.6 フィルター回避の鉄則 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.6 フィルター回避の鉄則
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-5 border border-red-200 dark:border-red-800">
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                <XCircleIcon className="w-5 h-5" />
                避けるべきこと
              </h4>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li>- 暴力的・攻撃的な表現</li>
                <li>- 差別的・ヘイト的な内容</li>
                <li>- 同一内容の繰り返し投稿</li>
                <li>- 短時間での大量投稿</li>
                <li>- 不自然なリンクの多用</li>
                <li>- 意味のない短文の連投</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                意識すべきこと
              </h4>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>- 投稿言語とターゲット層を一致</li>
                <li>- 24時間以内の新鮮な投稿</li>
                <li>- 毎回オリジナルの内容</li>
                <li>- 引用RTには独自意見を追加</li>
                <li>- 多言語は分けて投稿</li>
                <li>- ブロックされる行為を避ける</li>
              </ul>
            </div>
          </div>

          {/* 重要ポイント */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-5 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              覚えておくべきフィルターの特性
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 text-center">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">バイナリ判定</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">通過か除外か中間なし</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 text-center">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">累積効果</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">アカウント信頼に影響</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 text-center">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">復旧の難しさ</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">予防が最重要</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 text-center">
                <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">透明性の欠如</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">通知されない</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6.7 まとめ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            6.7 この章のまとめ
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              重要ポイント
            </h3>
            <ul className="space-y-3 text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>フィルターは<strong>「バイナリ判定」</strong> - 通過か除外かの二択</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>12種類</strong>のフィルター（品質4 + 関係3 + タイプ3 + 時間2）</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>一つでも引っかかれば<strong>完全除外</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>予防が最重要</strong> - 復旧は困難</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={faqData} />

        {/* クイズ */}
        <Quiz questions={quizQuestions} />

        {/* ナビゲーション */}
        <ChapterNav currentChapter={6} />
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Xアルゴリズム攻略ガイド
        </div>
      </footer>
    </div>
  );
}

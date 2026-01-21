'use client';

import {
  UsersIcon,
  ArrowPathIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { Quiz, QuizQuestion } from '@/components/ui/Quiz';
import { FAQ, FAQItem } from '@/components/ui/Accordion';
import { ChapterNav } from '@/components/ui/ChapterNav';
import { ChapterHeader } from '@/components/ui/ChapterHeader';

// FAQ データ
const faqData: FAQItem[] = [
  {
    question: 'INとOONの違いは何ですか？',
    answer: 'IN（In-Network）はあなたをフォローしているユーザーを指し、投稿は自然にタイムラインに表示されます。OON（Out-of-Network）はフォローしていないユーザーを指し、アルゴリズムの「おすすめ」を通じてのみ投稿を見ることができます。OON投稿には15%のペナルティ（スコアが0.85倍）がかかります。',
  },
  {
    question: '15%ペナルティの影響はどの程度ですか？',
    answer: '15%は一見小さく見えますが、限られた表示枠を多くの投稿が競うランキングでは大きな意味を持ちます。さらに、このペナルティは他のスコアラーのペナルティ（Author Diversityなど）と累積し、スコアが20%以上減少する可能性があります。',
  },
  {
    question: 'IN-First戦略とは何ですか？',
    answer: 'IN-First戦略とは、非フォロワーにリーチする前に、まずフォロワーからのエンゲージメントを優先する戦略です。フォロワー（IN）からの強いエンゲージメントがPhoenix Scoreを高め、それによってOONペナルティを克服して非フォロワーにリーチできるようになります。',
  },
  {
    question: 'フェーズ1とフェーズ2の違いは何ですか？',
    answer: 'フェーズ1（フォロワー1,000人まで）はフォロワーとの強い関係構築と高いエンゲージメント率の確立に注力します。フェーズ2（1,000人以上）はINエンゲージメントを維持しながらOONリーチの拡大にシフトします。',
  },
  {
    question: 'フォロワー数によって戦略はどう変わりますか？',
    answer: '0-100: 質の高いフォロワーを増やす。100-1,000: エンゲージメント率を最大化、成功パターンを特定。1,000-10,000: INを維持しながらOONを拡大。10,000以上: 影響力を維持、質とリーチのバランスを取る。',
  },
];

// クイズデータ
const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'IN（In-Network）とは何を指しますか？',
    choices: [
      { id: 'A', text: 'あなたをフォローしていないユーザー' },
      { id: 'B', text: 'あなたをフォローしているユーザー' },
      { id: 'C', text: 'あなたがブロックしたユーザー' },
      { id: 'D', text: 'アルゴリズムが推奨するユーザー' },
    ],
    correctAnswer: 'B',
    explanation: 'IN（In-Network）はあなたをフォローしているユーザーを指します。これらのユーザーへの投稿は自然にタイムラインに表示されます。',
  },
  {
    id: 2,
    question: 'OONペナルティの係数はいくつですか？',
    choices: [
      { id: 'A', text: '0.90（10%ペナルティ）' },
      { id: 'B', text: '0.85（15%ペナルティ）' },
      { id: 'C', text: '0.80（20%ペナルティ）' },
      { id: 'D', text: '0.75（25%ペナルティ）' },
    ],
    correctAnswer: 'B',
    explanation: 'OON（非フォロワー）への投稿には0.85の係数がかかります。つまり15%のペナルティです。',
  },
  {
    id: 3,
    question: 'IN-First戦略で優先されるものは何ですか？',
    choices: [
      { id: 'A', text: '投稿頻度の増加' },
      { id: 'B', text: 'ハッシュタグの使用' },
      { id: 'C', text: 'フォロワーの反応' },
      { id: 'D', text: '投稿のタイミング' },
    ],
    correctAnswer: 'C',
    explanation: 'IN-First戦略はフォロワー（IN）からの強い反応を優先します。この高いエンゲージメントがOON拡大の「燃料」となります。',
  },
  {
    id: 4,
    question: 'フェーズ2の目安となるフォロワー数は？',
    choices: [
      { id: 'A', text: '500フォロワー' },
      { id: 'B', text: '1,000フォロワー' },
      { id: 'C', text: '5,000フォロワー' },
      { id: 'D', text: '10,000フォロワー' },
    ],
    correctAnswer: 'B',
    explanation: 'フォロワー約1,000人を超えると、INの反応がOON拡大を駆動し始め、成長サイクルが確立されます。',
  },
  {
    id: 5,
    question: 'OON拡大の前提条件は何ですか？',
    choices: [
      { id: 'A', text: '高額な広告費' },
      { id: 'B', text: 'バイラルコンテンツ' },
      { id: 'C', text: '強いIN反応' },
      { id: 'D', text: '投稿頻度' },
    ],
    correctAnswer: 'C',
    explanation: 'OON拡大にはまずフォロワー（IN）からの強い反応を確保する必要があります。これによりPhoenix Scoreが上がり、OONペナルティを克服できます。',
  },
];

export default function Chapter7Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
<ChapterHeader currentChapter={7} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* タイトルセクション */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <UsersIcon className="w-4 h-4" />
            フォロワー戦略
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            第7章：IN vs OON（フォロー内 vs フォロー外）
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            アルゴリズムがフォロワーと非フォロワーをどう扱うかを理解し、成長戦略を最適化しましょう。
          </p>
        </div>

        {/* 7.1 INとOONとは */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            7.1 INとOONとは？
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            Xのアルゴリズムは投稿を見るユーザーを<strong>2つのカテゴリ</strong>に分類し、明確に異なる扱いをします。
          </p>

          {/* IN vs OON 定義 */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <UserPlusIcon className="w-5 h-5" />
                IN（In-Network）
              </h4>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>- あなたをフォローしているユーザー</li>
                <li>- 投稿は自然にタイムラインに流れる</li>
                <li>- フォロー関係に基づくリーチ</li>
                <li className="font-bold">スコア係数: 1.0（ペナルティなし）</li>
              </ul>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5 border border-orange-200 dark:border-orange-800">
              <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5" />
                OON（Out-of-Network）
              </h4>
              <ul className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                <li>- あなたをフォローしていないユーザー</li>
                <li>- 投稿は「おすすめ」を通じてリーチ</li>
                <li>- アルゴリズムの推奨に基づくリーチ</li>
                <li className="font-bold">スコア係数: 0.85（15%ペナルティ）</li>
              </ul>
            </div>
          </div>

          {/* 比較表 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">項目</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">IN（フォロー内）</th>
                  <th className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">OON（フォロー外）</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">スコア係数</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 font-mono text-green-600 dark:text-green-400">1.0</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3 font-mono text-orange-600 dark:text-orange-400">0.85</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">リーチ経路</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">タイムライン</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">おすすめ</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">必要スコア</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">標準</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">標準の約1.18倍</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">信頼レベル</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">高</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">証明が必要</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7.2 15%ペナルティの重要性 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            7.2 15%ペナルティの重要性
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            OON Scorerによる15%のペナルティは、見た目以上に<strong>大きな影響</strong>があります。
          </p>

          {/* 計算例 */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 mb-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              影響計算例
            </h4>
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 font-mono text-sm">
              <p className="text-zinc-400 mb-2"># 同じPhoenix Score 100の場合:</p>
              <p className="text-green-400">IN最終スコア: 100 x 1.0 = <strong>100</strong></p>
              <p className="text-orange-400">OON最終スコア: 100 x 0.85 = <strong>85</strong></p>
            </div>
          </div>

          {/* 累積効果 */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-5 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5" />
              累積効果（ペナルティは乗算される）
            </h4>
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 font-mono text-sm mb-3">
              <p className="text-zinc-300">Phoenix Score: 100</p>
              <p className="text-zinc-300">OON Score: 0.85（非フォロワー）</p>
              <p className="text-zinc-300">Author Diversity: 0.95（2投稿目）</p>
              <p className="text-zinc-300 pt-2 border-t border-zinc-700 mt-2">
                <strong className="text-red-400">最終スコア = 100 x 0.85 x 0.95 = 80.75</strong>
              </p>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              ペナルティなしのIN: 100 x 1.0 x 1.0 = 100（<strong>約20%の差</strong>）
            </p>
          </div>
        </section>

        {/* 7.3 IN-First戦略 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            7.3 IN-First戦略
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            OONリーチを狙う前に、まず<strong>INでの成功を確保</strong>する戦略です。
          </p>

          {/* なぜIN-Firstなのか */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 mb-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5" />
              なぜIN-Firstなのか？
            </h4>
            <div className="space-y-4 text-blue-700 dark:text-blue-300">
              <div>
                <p className="font-medium mb-2">1. INの反応がOON拡大の「燃料」になる</p>
                <ul className="ml-4 text-sm space-y-1">
                  <li>- 高いINエンゲージメントがPhoenix Scoreを上げる</li>
                  <li>- 高いPhoenix ScoreがOONペナルティを相殺</li>
                  <li>- OONリーチが新規フォロワーとIN拡大につながる</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">2. INは「確実なリーチ」</p>
                <ul className="ml-4 text-sm space-y-1">
                  <li>- フォロワーのタイムラインに優先表示</li>
                  <li>- ペナルティなしでスコア評価</li>
                  <li>- 反応を得やすい（すでにあなたを知っている）</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">3. OONは「不確実なリーチ」</p>
                <ul className="ml-4 text-sm space-y-1">
                  <li>- 15%ペナルティのハンデ</li>
                  <li>- あなたを知らない人にリーチする必要がある</li>
                  <li>- より高いスコアが必要</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 実践ステップ */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">IN-First実践ステップ</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">ステップ1: フォロワーとの関係を深める</p>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
                  <li>- フォロワーのリプライには必ず返信</li>
                  <li>- フォロワーの投稿にいいね・リプライ</li>
                  <li>- フォロワーの興味に合ったコンテンツを投稿</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">ステップ2: IN反応を最大化</p>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
                  <li>- フォロワーのアクティブ時間に投稿</li>
                  <li>- エンゲージメントを誘う質問で締めくくる</li>
                  <li>- プロフィール訪問を促すCTAを含める</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">ステップ3: IN反応を観察</p>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
                  <li>- どの投稿がリプライを集めたか？</li>
                  <li>- どの投稿がプロフィールクリックを生んだか？</li>
                  <li>- 成功パターンを特定</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">ステップ4: 成功パターンを継続</p>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
                  <li>- 効果があった形式を繰り返す</li>
                  <li>- 効果がなかった形式は避ける</li>
                  <li>- 継続的な改善サイクル</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7.4 2フェーズ成長戦略 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            7.4 2フェーズ成長戦略
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            フォロワー数に応じた<strong>戦略調整</strong>が必要です。
          </p>

          {/* 成長サイクル図 */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 mb-6 border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-center flex items-center justify-center gap-2">
              <ArrowPathIcon className="w-5 h-5" />
              INからOONへの成長サイクル
            </h4>
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm w-full max-w-xs text-center border border-zinc-200 dark:border-zinc-700">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold mb-2">1</span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">高いINエンゲージメント</p>
              </div>
              <ChevronDownIcon className="w-6 h-6 text-zinc-400" />
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm w-full max-w-xs text-center border border-zinc-200 dark:border-zinc-700">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold mb-2">2</span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">Phoenix Scoreが上昇</p>
              </div>
              <ChevronDownIcon className="w-6 h-6 text-zinc-400" />
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm w-full max-w-xs text-center border border-zinc-200 dark:border-zinc-700">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold mb-2">3</span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">OONリーチ（ペナルティ相殺）</p>
              </div>
              <ChevronDownIcon className="w-6 h-6 text-zinc-400" />
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm w-full max-w-xs text-center border border-zinc-200 dark:border-zinc-700">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold mb-2">4</span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">新規フォロワー獲得</p>
              </div>
              <ChevronDownIcon className="w-6 h-6 text-green-500" />
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 shadow-sm w-full max-w-xs text-center border-2 border-green-500">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold mb-2">5</span>
                <p className="font-bold text-green-800 dark:text-green-200">IN基盤が拡大（サイクル継続）</p>
              </div>
            </div>
          </div>

          {/* フェーズ比較 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-5 border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center gap-2">
                <RocketLaunchIcon className="w-5 h-5" />
                フェーズ1（フォロワー1,000人まで）
              </h4>
              <div className="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
                <div>
                  <p className="font-medium">目標:</p>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>- フォロワーとの強い関係構築</li>
                    <li>- 高いエンゲージメント率の維持</li>
                    <li>- 成功する投稿パターンの確立</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">主要指標:</p>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>- エンゲージメント率（目標5%以上）</li>
                    <li>- リプライ率（目標1%以上）</li>
                    <li>- フォロワーあたりの価値</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800">
              <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5" />
                フェーズ2（1,000人以上）
              </h4>
              <div className="space-y-3 text-sm text-purple-700 dark:text-purple-300">
                <div>
                  <p className="font-medium">変化:</p>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>- IN反応がOON拡大を駆動し始める</li>
                    <li>- 「おすすめ」への露出が増加</li>
                    <li>- 新規フォロワー獲得サイクルが始まる</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">主要指標:</p>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>- OONインプレッション比率</li>
                    <li>- 新規フォロワー獲得数</li>
                    <li>- フォローコンバージョン率</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7.5 フォロワー数別の戦略調整 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            7.5 フォロワー数別の戦略調整
          </h2>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            フォロワー数の範囲別のより<strong>詳細な戦略</strong>です。
          </p>

          <div className="space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 border border-zinc-200 dark:border-zinc-700">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">0-100フォロワー</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <strong>状況:</strong> INが非常に少ない、アルゴリズムがあなたを学習中、OONリーチはほぼ期待できない
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>戦略:</strong> 質の高いフォロワーを増やす、ターゲットアカウントにリプライ、専門性を明確化、プロフィールの最適化
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 border border-zinc-200 dark:border-zinc-700">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">100-1,000フォロワー</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <strong>状況:</strong> INが形成されつつある、反応が安定し始める、時々OONリーチがある
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>戦略:</strong> INエンゲージメント率を最大化、成功パターンを特定、質と頻度のバランスを取る
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 border border-zinc-200 dark:border-zinc-700">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">1,000-10,000フォロワー</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <strong>状況:</strong> INの規模が十分、定期的なOONリーチ、成長サイクルが始まっている
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>戦略:</strong> INを維持しながらOONを拡大、コンテンツタイプの多様化、フォローコンバージョンの最適化
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-5 border border-zinc-200 dark:border-zinc-700">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">10,000フォロワー以上</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <strong>状況:</strong> 影響力のあるアカウント、OONが主な成長エンジン、バイラルになりやすい
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>戦略:</strong> コンテンツの質を維持、フォロワーとの関係を大切に、影響力の責任ある活用
              </p>
            </div>
          </div>
        </section>

        {/* 7.6 まとめ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700">
            7.6 この章のまとめ
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              重要ポイント
            </h3>
            <ul className="space-y-3 text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>IN（フォロワー）とOON（非フォロワー）は異なる扱い</strong>を受ける - OONには15%のペナルティ</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>IN-First戦略が基本</strong> - まずフォロワーからの強い反応を確保し、それがOON拡大の燃料になる</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>フォロワー数に応じた戦略調整</strong>が必要 - フェーズ1: IN構築（1,000人まで）、フェーズ2: OON拡大（1,000人以上）</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>成長サイクルを回す</strong> - IN反応 → 高スコア → OONリーチ → 新規IN</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
            <QuestionMarkCircleIcon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
            よくある質問（FAQ）
          </h2>
          <FAQ items={faqData} />
        </section>

        {/* クイズ */}
        <Quiz questions={quizData} />

        {/* ナビゲーション */}
        <ChapterNav currentChapter={7} />
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Xアルゴリズムガイド - 第7章：IN vs OON
        </div>
      </footer>
    </div>
  );
}

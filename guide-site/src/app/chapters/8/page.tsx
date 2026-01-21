"use client";

import {
  ClockIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Quiz, QuizQuestion } from "@/components/ui/Quiz";
import { FAQ, FAQItem } from "@/components/ui/Accordion";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ChapterHeader } from '@/components/ui/ChapterHeader';

// Section Header Component
function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3 pb-3 border-b-2 border-zinc-200 dark:border-zinc-700">
      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">
        {number}
      </span>
      {title}
    </h2>
  );
}

export default function Chapter8Page() {
  const faqItems: FAQItem[] = [
    {
      question: "0.95減衰の具体的な影響は?",
      answer:
        "0.95の減衰係数は指数関数的に適用されます。1投稿目はペナルティなし(1.0)ですが、2投稿目は0.95、3投稿目は0.903、4投稿目は0.857、5投稿目には0.774(約23%減少)まで下がります。つまり、短時間で5回連続投稿すると、最後の投稿のスコアは最初と比べてほぼ4分の1減少します。",
    },
    {
      question: "なぜ高速連続投稿は危険なのですか?",
      answer:
        "高速連続投稿は「連続投稿のパラドックス」に陥ります。「投稿が多い = 露出が増える」と思いがちですが、累積減衰により後の投稿のスコアが大幅に低下します。結果として、多く投稿しているにもかかわらず、後の投稿が埋もれ、少ない回数で適切な間隔を空けた場合より総露出が減少する可能性があります。",
    },
    {
      question: "最適な投稿間隔は?",
      answer:
        "最適な投稿間隔は少なくとも4時間です。これにより、ほとんどのフォロワーのタイムラインが更新され、Author Diversityペナルティが実質的にリセットされます。理想的には6-8時間の間隔を空けることで、各投稿が独立して評価されます。",
    },
    {
      question: "1日の投稿上限は?",
      answer:
        "推奨される1日の投稿数は2-3投稿です。これにより複数のタイムゾーンをカバーしながら、Author Diversityペナルティを回避できます。1日5投稿以上は質の維持が難しく、累積ペナルティにより後の投稿が埋もれやすくなります。",
    },
    {
      question: "時間帯別戦略とは?",
      answer:
        "時間帯別戦略とは、ターゲットオーディエンスの最適な時間に投稿することです。例えば、ビジネスパーソンは午前7-8時(通勤時)、12-13時(昼休み)、20-21時(退勤後)にアクティブです。これらの時間帯に2-3投稿を分散させることで、Author Diversityペナルティを回避しながらリーチを最大化できます。",
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Author Diversityの減衰係数はいくつですか?",
      choices: [
        { id: 'A', text: "0.90" },
        { id: 'B', text: "0.95" },
        { id: 'C', text: "0.85" },
        { id: 'D', text: "0.99" },
      ],
      correctAnswer: 'B',
      explanation:
        "Author Diversity Scorerは、同じ著者の投稿がタイムラインに連続表示されるたびに0.95の係数を適用します。",
    },
    {
      id: 2,
      question: "5投稿目のスコアはどれくらい減少しますか?",
      choices: [
        { id: 'A', text: "約10%" },
        { id: 'B', text: "約15%" },
        { id: 'C', text: "約23%" },
        { id: 'D', text: "約30%" },
      ],
      correctAnswer: 'C',
      explanation:
        "5投稿目では、係数は0.95^4 = 0.774となり、約23%の減少になります。",
    },
    {
      id: 3,
      question: "推奨される投稿間隔は?",
      choices: [
        { id: 'A', text: "少なくとも1時間" },
        { id: 'B', text: "少なくとも2時間" },
        { id: 'C', text: "少なくとも4時間" },
        { id: 'D', text: "少なくとも8時間" },
      ],
      correctAnswer: 'C',
      explanation:
        "少なくとも4時間が推奨される最小間隔です。これにより、ほとんどのフォロワーのタイムラインが更新され、各投稿が独立して評価されます。",
    },
    {
      id: 4,
      question: "推奨される1日の投稿数は?",
      choices: [
        { id: 'A', text: "1投稿" },
        { id: 'B', text: "2-3投稿" },
        { id: 'C', text: "5-6投稿" },
        { id: 'D', text: "10投稿以上" },
      ],
      correctAnswer: 'B',
      explanation:
        "1日2-3投稿が推奨されます。これにより複数のタイムゾーンをカバーし、質を維持しながら、Author Diversityペナルティを回避できます。",
    },
    {
      id: 5,
      question: "「連続投稿のパラドックス」とは何ですか?",
      choices: [
        { id: 'A', text: "最初の投稿のパフォーマンスが悪い" },
        { id: 'B', text: "後の投稿が埋もれる" },
        { id: 'C', text: "すべての投稿が同じパフォーマンス" },
        { id: 'D', text: "投稿がパフォーマンスを向上させる" },
      ],
      correctAnswer: 'B',
      explanation:
        "連続投稿のパラドックスとは、高速連続投稿により累積減衰で後の投稿のスコアが低下し、埋もれてしまう現象を指します。結果として総露出が減少する可能性があります。",
    },
  ];

  // Decay calculation data
  const decayData = [
    { count: 1, coefficient: 1.0, penalty: 0 },
    { count: 2, coefficient: 0.95, penalty: 5 },
    { count: 3, coefficient: 0.903, penalty: 9.7 },
    { count: 4, coefficient: 0.857, penalty: 14.3 },
    { count: 5, coefficient: 0.815, penalty: 18.5 },
    { count: 6, coefficient: 0.774, penalty: 22.6 },
    { count: 7, coefficient: 0.735, penalty: 26.5 },
    { count: 8, coefficient: 0.698, penalty: 30.2 },
  ];

  // Time schedule data
  const timeScheduleData = [
    { time: "5:00-7:00", activity: "早朝", level: "低", description: "アクティブユーザー少、競合少" },
    { time: "7:00-9:00", activity: "朝のピーク", level: "高", description: "通勤中、モバイル中心" },
    { time: "12:00-14:00", activity: "昼のピーク", level: "高", description: "昼休み、素早い消費" },
    { time: "14:00-17:00", activity: "午後", level: "中", description: "仕事の合間" },
    { time: "18:00-22:00", activity: "夜のピーク", level: "最高", description: "最高アクティビティ" },
    { time: "22:00-24:00", activity: "深夜", level: "低", description: "就寝前チェック" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
<ChapterHeader currentChapter={8} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              第8章
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            著者多様性と投稿タイミング
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Author Diversityペナルティのメカニズムを理解し、最適な投稿スケジュールを設計する方法を学びます。
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 mb-10 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5" />
            この章で学ぶこと
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              Author Diversityの仕組みと0.95減衰係数
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              連続投稿のパラドックスと回避方法
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              最適な投稿間隔と時間帯別戦略
            </li>
          </ul>
        </div>

        {/* Section 8.1 */}
        <section className="mb-12">
          <SectionHeader number="8.1" title="Author Diversityとは?" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            Author Diversityは、タイムラインが単一の著者の投稿で占められることを防ぐメカニズムです。ユーザー体験を向上させるために設計されています。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-3">
                <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h4 className="font-bold text-red-800 dark:text-red-200">
                  問題
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  誰かが1時間に10回投稿する
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  フォロワーのTLがその人の投稿で埋まる
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  他のアカウントの投稿が見えなくなる
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h4 className="font-bold text-green-800 dark:text-green-200">
                  解決策
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  同じ著者の連続投稿にペナルティ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  タイムラインの多様性を確保
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  全アカウントの投稿を公平に表示
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>注意:</strong> これは多作なクリエイターにとって「逆風」のように感じるかもしれませんが、ユーザー体験を考慮すると合理的な設計です。
              </p>
            </div>
          </div>
        </section>

        {/* Section 8.2 */}
        <section className="mb-12">
          <SectionHeader number="8.2" title="0.95減衰メカニズム" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            Author Diversity Scorerは、同じ著者の投稿がタイムラインにすでに存在する場合、後続の投稿にペナルティを与えます。
          </p>

          {/* Code Block */}
          <div className="rounded-xl overflow-hidden mb-6 border border-border">
            <div className="px-4 py-2 bg-muted text-muted-foreground text-sm font-mono">
              author_diversity_scorer.rs
            </div>
            <pre className="p-4 overflow-x-auto" style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <code className="text-sm">
{`fn calculate_diversity_score(
    author_id: &str,
    timeline: &[Tweet],
) -> f32 {
    // タイムライン上の同じ著者の投稿数をカウント
    let same_author_count = timeline
        .iter()
        .filter(|t| t.author_id == author_id)
        .count();

    // 0.95の累乗で減衰
    let decay_factor = 0.95_f32.powf(same_author_count as f32);

    return decay_factor;
}`}
              </code>
            </pre>
          </div>

          {/* Decay Table */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-6">
            <div className="px-5 py-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Author Diversity 減衰率表
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                      投稿番号
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                      減衰係数
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                      累積ペナルティ
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                      スコア維持率
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700 dark:text-zinc-300">
                  {decayData.map((row) => (
                    <tr key={row.count} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="px-4 py-3">
                        {row.count === 1 ? (
                          <span className="inline-flex items-center gap-1">
                            {row.count}投稿目
                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-1.5 py-0.5 rounded">
                              基準
                            </span>
                          </span>
                        ) : (
                          `${row.count}投稿目`
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">
                        {row.coefficient.toFixed(3)}
                      </td>
                      <td className="px-4 py-3">
                        {row.penalty === 0 ? (
                          <span className="text-green-600 dark:text-green-400">なし</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">-{row.penalty.toFixed(1)}%</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                              style={{ width: `${row.coefficient * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-zinc-500">{Math.round(row.coefficient * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5" />
              計算例
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              基本Phoenix Score: 100, OON Score: 1.0(フォロワー)の場合
            </p>
            <div className="space-y-3 font-mono text-sm">
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">1投稿目:</span>
                <span>100 x 1.0 x <strong className="text-green-600 dark:text-green-400">1.000</strong> = <strong className="text-green-600 dark:text-green-400">100</strong></span>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">2投稿目:</span>
                <span>100 x 1.0 x <strong className="text-amber-600 dark:text-amber-400">0.950</strong> = <strong className="text-amber-600 dark:text-amber-400">95</strong></span>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">5投稿目:</span>
                <span>100 x 1.0 x <strong className="text-red-600 dark:text-red-400">0.774</strong> = <strong className="text-red-600 dark:text-red-400">77.4</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8.3 */}
        <section className="mb-12">
          <SectionHeader number="8.3" title="連続投稿のパラドックス" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            「投稿が多い = 露出が増える」は一見論理的に思えます。しかし、Author Diversityを考慮すると、必ずしもそうではありません。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border-2 border-red-300 dark:border-red-800">
              <div className="flex items-center gap-2 mb-4">
                <XCircleIcon className="w-6 h-6 text-red-500" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                  シナリオA: 1時間で5投稿
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                <li>1投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">100</strong></li>
                <li>2投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">95</strong></li>
                <li>3投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">90</strong></li>
                <li>4投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">86</strong></li>
                <li>5投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">81</strong></li>
              </ul>
              <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3 text-center">
                <span className="text-sm text-red-700 dark:text-red-300">合計スコア: </span>
                <strong className="text-red-600 dark:text-red-400 text-lg">452</strong>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border-2 border-green-300 dark:border-green-800">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                  シナリオB: 5時間で5投稿
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                <li>1投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">100</strong></li>
                <li>2投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">100</strong></li>
                <li>3投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">100</strong></li>
                <li>4投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">100</strong></li>
                <li>5投稿目: スコア <strong className="text-zinc-900 dark:text-zinc-100">100</strong></li>
              </ul>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 text-center">
                <span className="text-sm text-green-700 dark:text-green-300">合計スコア: </span>
                <strong className="text-green-600 dark:text-green-400 text-lg">500</strong>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
            <p className="text-center font-bold text-lg text-zinc-900 dark:text-zinc-100">
              結論: 分散投稿の方が <span className="text-green-600 dark:text-green-400">約10%高い</span> 総露出
            </p>
          </div>
        </section>

        {/* Section 8.4 */}
        <section className="mb-12">
          <SectionHeader number="8.4" title="最適な投稿間隔" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            では、投稿間にどれくらいの間隔が必要でしょうか? タイムラインの「更新」を考慮する必要があります。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-3">
                <ClockIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-amber-800 dark:text-amber-200">
                  最小間隔: 4時間
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">-</span>
                  ほとんどのフォロワーのTLが更新済み
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">-</span>
                  Diversityペナルティが実質リセット
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">-</span>
                  各投稿が独立して評価される
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h4 className="font-bold text-green-800 dark:text-green-200">
                  理想的な間隔: 6-8時間
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  より確実なタイムライン更新
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  異なるタイムゾーンにリーチ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  余裕のあるスケジューリング
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8.5 */}
        <section className="mb-12">
          <SectionHeader number="8.5" title="時間帯別の投稿戦略" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            投稿間隔だけでなく、投稿時間も重要です。ターゲットオーディエンスがアクティブな時間を狙いましょう。
          </p>

          {/* Time Table */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-6">
            <div className="px-5 py-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                時間帯別ユーザー行動(日本)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">時間帯</th>
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">活動</th>
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">アクティビティ</th>
                    <th className="px-4 py-3 text-left font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">特徴</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700 dark:text-zinc-300">
                  {timeScheduleData.map((row, idx) => (
                    <tr key={idx} className={`border-b border-zinc-100 dark:border-zinc-800 ${
                      row.level === "高" || row.level === "最高"
                        ? "bg-green-50 dark:bg-green-900/20"
                        : ""
                    }`}>
                      <td className="px-4 py-3 font-mono font-medium">{row.time}</td>
                      <td className="px-4 py-3">{row.activity}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          row.level === "最高"
                            ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                            : row.level === "高"
                              ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                              : row.level === "中"
                                ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200"
                                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                        }`}>
                          {row.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Target Audience */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">ビジネスパーソン向け</h4>
              </div>
              <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>朝 7:00-8:00(通勤中)</li>
                <li>昼 12:00-13:00(休憩)</li>
                <li>夜 20:00-21:00(退勤後)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <UsersIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">学生向け</h4>
              </div>
              <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>朝 8:00-9:00(通学中)</li>
                <li>昼 12:00-13:00(休憩)</li>
                <li>夜 21:00-24:00(自由時間)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8.6 */}
        <section className="mb-12">
          <SectionHeader number="8.6" title="1日の投稿ガイドライン" />

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 text-center">
              <div className="text-4xl font-black text-zinc-400 dark:text-zinc-600 mb-2">1</div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">最小</h4>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 text-left space-y-1">
                <li>- 存在感の維持</li>
                <li>- フォロワーとの接点</li>
                <li>- アルゴリズムへのシグナル</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-2 border-blue-500 text-center">
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">2-3</div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">推奨</h4>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 text-left space-y-1">
                <li>- 複数タイムゾーンをカバー</li>
                <li>- Diversityペナルティ回避</li>
                <li>- 持続可能なペース</li>
              </ul>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 text-center">
              <div className="text-4xl font-black text-zinc-400 dark:text-zinc-600 mb-2">5+</div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">上限</h4>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 text-left space-y-1">
                <li>- 質の維持が困難</li>
                <li>- 累積ペナルティ発生</li>
                <li>- 「うるさい」リスク</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <SectionHeader number="8.7" title="章のまとめ" />

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4">重要ポイント</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Author Diversityは同じ著者の連続投稿にペナルティを与える</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">0.95の指数減衰(5投稿で約23%減少)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">連続投稿は総露出を減少させる可能性がある</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">分散投稿は各投稿が独立して評価される</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">最適な投稿間隔は4-6時間</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">フォロワーのタイムラインが更新される時間</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">1日2-3投稿が最適</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">複数のタイムゾーンをカバーしながら質を維持</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-zinc-200 dark:border-zinc-700">
            <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              よくある質問
            </h2>
          </div>
          <FAQ items={faqItems} />
        </section>

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <ChapterNav currentChapter={8} />
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowPathIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FAQ, type FAQItem } from "@/components/ui/Accordion";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ChapterHeader } from '@/components/ui/ChapterHeader';

// KPI Table Component
function KPITable({
  title,
  items,
  frequency,
  colorClass
}: {
  title: string;
  items: { name: string; description: string; target: string }[];
  frequency: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className={`px-6 py-4 ${colorClass} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <ChartBarIcon className="w-6 h-6" />
          <h4 className="font-bold text-lg">{title}</h4>
        </div>
        <span className="text-sm opacity-80">{frequency}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">指標</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">説明</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">目標</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.name}</td>
                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</td>
                <td className="px-6 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{item.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// PDCA Step Component
function PDCAStep({
  name,
  nameJa,
  items,
  colorClass,
  isActive,
  onClick
}: {
  name: string;
  nameJa: string;
  items: string[];
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-lg border-2 transition-all cursor-pointer ${
        isActive ? `${colorClass} shadow-lg` : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
      }`}
      onClick={onClick}
    >
      <div className={`px-4 py-3 ${isActive ? 'bg-white/10' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg">{name}</span>
          <span className="text-sm opacity-70">{nameJa}</span>
        </div>
        {isActive && (
          <ul className="space-y-1 text-sm mt-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Analysis Schedule Card
function ScheduleCard({
  period,
  time,
  timing,
  tasks,
  colorClass
}: {
  period: string;
  time: string;
  timing: string;
  tasks: string[];
  colorClass: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className={`px-5 py-4 ${colorClass}`}>
        <h4 className="font-bold text-lg">{period}分析</h4>
        <div className="flex items-center gap-3 mt-1 text-sm opacity-80">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {time}
          </span>
          <span>|</span>
          <span>{timing}</span>
        </div>
      </div>
      <div className="p-5">
        <ul className="space-y-2">
          {tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <TableCellsIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Growth Phase Component
function GrowthPhase({
  phase,
  followers,
  period,
  focus,
  strategy,
  kpi,
  colorClass
}: {
  phase: string;
  followers: string;
  period: string;
  focus: string;
  strategy: string;
  kpi: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-5">
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${colorClass}`}>
          {phase}
        </span>
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{followers}フォロワー</span>
        <span className="text-sm text-zinc-500">({period})</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase">重点</span>
          <p className="text-zinc-700 dark:text-zinc-300 mt-1">{focus}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase">戦略</span>
          <p className="text-zinc-700 dark:text-zinc-300 mt-1">{strategy}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase">KPI</span>
          <p className={`font-semibold mt-1 ${colorClass.replace('bg-', 'text-')}`}>{kpi}</p>
        </div>
      </div>
    </div>
  );
}

// FAQ Data
const faqData: FAQItem[] = [
  {
    question: 'プライマリKPIとは？',
    answer: `プライマリKPIは、最も重要な指標で毎週必ず確認すべきものです。

1. インプレッション/投稿 - 目標: フォロワー数の10-20%以上
2. エンゲージメント率 - 目標: 3-5%以上
3. フォロワー純増数 - 目標: 週50人以上(1,000フォロワー以下の場合)
4. プロフィールクリック率 - 目標: 0.5%以上`
  },
  {
    question: '週次分析で確認することは？',
    answer: `週次分析（所要時間30分）で確認すべきこと：

・週間インプレッション合計
・週間エンゲージメント率
・フォロワー純増数
・最も成功した投稿TOP3の分析
・最も反応が悪かった投稿の分析
・投稿パターンの振り返り

分析の観点: 時間帯、テーマ、形式、文字数、メディアの効果を比較します。`
  },
  {
    question: 'PDCAサイクルの回し方は？',
    answer: `X運用におけるPDCAサイクル：

【Plan】週の始めに: 投稿テーマ決定、スケジュール作成、目標設定（数値で）

【Do】計画に沿って: スケジュール通りに投稿、リプライに返信、異常があれば記録

【Check】週末に: 目標達成度、計画と実績の差分、成功/失敗投稿の分析

【Act】次週への反映: 成功パターン継続、失敗パターン排除、戦略修正`
  },
  {
    question: '成功パターンの見つけ方は？',
    answer: `成功パターン特定の5ステップ：

1. 上位投稿を抽出（インプレッションorエンゲージメント上位10%）
2. 共通点を分析（投稿時間、曜日、テーマ、形式、文字数、メディア、冒頭の言葉）
3. 仮説を立てる（「〜だから成功した」）
4. 検証する（同じパターンで投稿して結果確認）
5. パターンとして蓄積（再現性が確認できたら登録）`
  },
  {
    question: '長期成長のフェーズ分けは？',
    answer: `フォロワー数別の4つのフェーズ：

【Phase 1】0-1,000フォロワー（3-6ヶ月）
基盤構築期。ニッチ特化、濃い関係構築。

【Phase 2】1,000-5,000フォロワー（6-12ヶ月）
成長期。OON到達開始、成功パターンの横展開。

【Phase 3】5,000-10,000フォロワー（6-12ヶ月）
拡大期。影響力の確立、テーマの少し拡大。

【Phase 4】10,000+フォロワー（継続）
確立期。持続可能な運用、ブランド化。`
  }
];

// Quiz Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'エンゲージメント率の目標値は何%以上ですか？',
    choices: [
      { id: 'A', text: '1-2%' },
      { id: 'B', text: '3-5%' },
      { id: 'C', text: '7-10%' },
      { id: 'D', text: '15%以上' },
    ],
    correctAnswer: 'B',
    explanation: 'エンゲージメント率の目標は3-5%以上です。計算式は (いいね+RT+リプライ) / インプレッション × 100 です。',
  },
  {
    id: 2,
    question: '週次分析に推奨される時間は何分ですか？',
    choices: [
      { id: 'A', text: '5分' },
      { id: 'B', text: '15分' },
      { id: 'C', text: '30分' },
      { id: 'D', text: '1時間' },
    ],
    correctAnswer: 'C',
    explanation: '週次分析には30分が推奨されています。日次分析は5分、月次分析は1時間が目安です。',
  },
  {
    id: 3,
    question: 'PDCAサイクルの最初のステップは何ですか？',
    choices: [
      { id: 'A', text: 'Do（実行）' },
      { id: 'B', text: 'Check（検証）' },
      { id: 'C', text: 'Act（改善）' },
      { id: 'D', text: 'Plan（計画）' },
    ],
    correctAnswer: 'D',
    explanation: 'PDCAサイクルはPlan（計画）から始まります。週の始めに投稿テーマ決定、スケジュール作成、目標設定を行います。',
  },
  {
    id: 4,
    question: 'Phase 1（基盤構築期）の終了目安は何フォロワーですか？',
    choices: [
      { id: 'A', text: '500フォロワー' },
      { id: 'B', text: '1,000フォロワー' },
      { id: 'C', text: '3,000フォロワー' },
      { id: 'D', text: '5,000フォロワー' },
    ],
    correctAnswer: 'B',
    explanation: 'Phase 1（基盤構築期）は0-1,000フォロワーの期間です。INエンゲージメント構築に重点を置き、ニッチ特化で濃い関係を作ります。',
  },
  {
    id: 5,
    question: '健全性KPI（ネガティブエンゲージメント率など）の確認頻度は？',
    choices: [
      { id: 'A', text: '毎日' },
      { id: 'B', text: '毎週' },
      { id: 'C', text: '毎月' },
      { id: 'D', text: '四半期' },
    ],
    correctAnswer: 'D',
    explanation: '健全性KPIは四半期ごとに確認します。ネガティブエンゲージメント率、フォロー/アンフォロー比率、IN vs OON比率などを追跡します。',
  },
];

export default function Chapter11Page() {
  const [activePDCA, setActivePDCA] = useState<number | null>(null);

  const primaryKPIs = [
    { name: 'インプレッション/投稿', description: '1投稿あたり何人に表示されたか', target: 'フォロワー数の10-20%以上' },
    { name: 'エンゲージメント率', description: '(いいね+RT+リプライ) / インプレッション', target: '3-5%以上' },
    { name: 'フォロワー純増数', description: '新規フォロー - アンフォロー', target: '週50人以上' },
    { name: 'プロフィールクリック率', description: 'インプレッションに対するプロフクリック割合', target: '0.5%以上' },
  ];

  const secondaryKPIs = [
    { name: 'リプライ率', description: '投稿あたりのリプライ数', target: '1%以上' },
    { name: '動画VQV率', description: '動画視聴者のVQV条件達成割合', target: '40%以上' },
    { name: 'ブックマーク率', description: '投稿あたりのブックマーク数', target: '0.1%以上' },
    { name: 'フォロー転換率', description: 'プロフクリックからフォローへの転換率', target: '5%以上' },
  ];

  const healthKPIs = [
    { name: 'ネガティブエンゲージメント率', description: 'ミュート・ブロック・通報の発生率', target: '0.01%以下' },
    { name: 'フォロー/アンフォロー比率', description: '新規フォローに対するアンフォロー割合', target: 'アンフォロー率20%以下' },
    { name: 'IN vs OONエンゲージメント比率', description: 'フォロワーvs非フォロワーからの反応比率', target: 'IN70%以上（初期）' },
    { name: 'リーチ成長率', description: '月ごとの1投稿あたりリーチ変化', target: '前月比10%以上成長' },
  ];

  const pdcaSteps = [
    {
      name: 'Plan',
      nameJa: '計画',
      items: ['今週の投稿テーマを決定', '投稿スケジュール作成', '使用テンプレート選択', '投稿時間設定', '週の目標設定（数値で）'],
      colorClass: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200',
    },
    {
      name: 'Do',
      nameJa: '実行',
      items: ['スケジュール通りに投稿', '計画したテンプレートを使用', 'リプライに迅速に返信', '同分野との交流を継続', '異常があれば記録'],
      colorClass: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200',
    },
    {
      name: 'Check',
      nameJa: '検証',
      items: ['目標に対する達成度', '計画と実績の差分', '成功した投稿の分析', '失敗した投稿の分析', '仮説の検証'],
      colorClass: 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
    },
    {
      name: 'Act',
      nameJa: '改善',
      items: ['成功パターンの継続', '失敗パターンの排除', '新しい仮説の設定', '目標の調整', '戦略の修正'],
      colorClass: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200',
    },
  ];

  const schedules = [
    { period: '日次', time: '5分', timing: '朝の投稿前', tasks: ['前日の投稿のインプレッション', 'エンゲージメント確認', '特に反応が良い/悪い投稿の特定', 'リプライ返信漏れチェック'], colorClass: 'bg-blue-600 text-white' },
    { period: '週次', time: '30分', timing: '週末 or 週初め', tasks: ['週間インプレッション合計', '週間エンゲージメント率', 'フォロワー純増数', 'TOP3/WORST投稿分析'], colorClass: 'bg-emerald-600 text-white' },
    { period: '月次', time: '1時間', timing: '月初め', tasks: ['月間KPI集計', '前月比成長率計算', '成功パターン抽出', '来月の目標設定'], colorClass: 'bg-purple-600 text-white' },
  ];

  const phases = [
    { phase: 'Phase 1', followers: '0-1,000', period: '3-6ヶ月', focus: 'INエンゲージメント構築', strategy: 'ニッチ特化、濃い関係', kpi: 'エンゲージメント率5%以上', colorClass: 'bg-blue-500' },
    { phase: 'Phase 2', followers: '1,000-5,000', period: '6-12ヶ月', focus: 'OON到達開始', strategy: '成功パターンの横展開', kpi: '週100人以上増加', colorClass: 'bg-emerald-500' },
    { phase: 'Phase 3', followers: '5,000-10,000', period: '6-12ヶ月', focus: '影響力の確立', strategy: 'テーマの少し拡大', kpi: 'OON比率30%以上', colorClass: 'bg-purple-500' },
    { phase: 'Phase 4', followers: '10,000+', period: '継続', focus: '持続可能な運用', strategy: 'ブランド化、多角化', kpi: 'エンゲージメント率維持', colorClass: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <ChapterHeader currentChapter={11} />

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* タイトルセクション */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">第11章</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            データ分析と継続的改善
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            知識を成果に変換する - データに基づくPDCAサイクルで長期成長を実現
          </p>
        </div>

        {/* なぜデータ分析が必要か */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            11.1 なぜデータ分析が必要か
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h4 className="font-semibold text-red-800 dark:text-red-300">感覚に頼る運用の問題</h4>
              </div>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
                <li className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>「なんとなく伸びた」で終わる</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>成功パターンを再現できない</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>失敗パターンを繰り返す</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>長期的な成長が安定しない</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <LightBulbIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-green-800 dark:text-green-300">データに基づく運用のメリット</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>成功要因を特定できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>再現性のある戦略を構築</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>失敗を早期に検知・修正</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>長期的な成長を実現</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* KPI体系 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <ChartBarIcon className="w-6 h-6" />
            11.2 追跡すべきKPI体系
          </h2>

          <div className="space-y-6">
            <KPITable
              title="プライマリKPI"
              items={primaryKPIs}
              frequency="週次追跡"
              colorClass="bg-blue-600 text-white"
            />

            <KPITable
              title="セカンダリKPI"
              items={secondaryKPIs}
              frequency="月次追跡"
              colorClass="bg-emerald-600 text-white"
            />

            <KPITable
              title="健全性KPI"
              items={healthKPIs}
              frequency="四半期追跡"
              colorClass="bg-purple-600 text-white"
            />
          </div>
        </section>

        {/* 分析サイクル */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <CalendarDaysIcon className="w-6 h-6" />
            11.3 分析サイクルの設計
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {schedules.map((schedule, index) => (
              <ScheduleCard key={index} {...schedule} />
            ))}
          </div>
        </section>

        {/* PDCAサイクル */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <ArrowPathIcon className="w-6 h-6" />
            11.4 PDCA for X
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            各ステップをクリックして詳細を確認してください。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {pdcaSteps.map((step, index) => (
              <PDCAStep
                key={index}
                {...step}
                isActive={activePDCA === index}
                onClick={() => setActivePDCA(activePDCA === index ? null : index)}
              />
            ))}
          </div>
        </section>

        {/* パターン特定 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <LightBulbIcon className="w-6 h-6" />
            11.5 成功/失敗パターンの特定
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                成功パターン特定の手順
              </h4>
              <ol className="space-y-3 text-sm text-green-700 dark:text-green-400">
                {['上位投稿を抽出（上位10%）', '共通点を分析（時間、テーマ、形式等）', '仮説を立てる', '検証する', 'パターンとして蓄積'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                <XCircleIcon className="w-5 h-5" />
                失敗パターン特定の手順
              </h4>
              <ol className="space-y-3 text-sm text-red-700 dark:text-red-400">
                {['下位投稿を抽出（下位10%）', '共通点を分析', '原因を推定', '回避策を立てる', 'ブラックリストに登録'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 長期成長ロードマップ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <RocketLaunchIcon className="w-6 h-6" />
            11.6 長期成長ロードマップ
          </h2>

          <div className="space-y-4">
            {phases.map((phase, index) => (
              <GrowthPhase key={index} {...phase} />
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            11.7 この章のまとめ
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6">
            <ul className="space-y-4">
              {[
                { title: 'データに基づく改善が長期成長の鍵', desc: '感覚ではなく数値で判断する' },
                { title: 'KPIは3層で管理', desc: 'プライマリ（週次）、セカンダリ（月次）、健全性（四半期）' },
                { title: 'PDCAサイクルを回す', desc: 'Plan → Do → Check → Act の継続' },
                { title: '成功/失敗パターンを蓄積', desc: '再現性のある戦略を構築' },
                { title: '長期視点でフェーズに応じた戦略を実行', desc: '段階的な成長を目指す' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQセクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            よくある質問（FAQ）
          </h2>
          <FAQ items={faqData} />
        </section>

        {/* クイズセクション */}
        <section className="mb-16">
          <Quiz questions={quizQuestions} />
        </section>

        {/* ナビゲーション */}
        <ChapterNav currentChapter={11} />
      </main>
    </div>
  );
}

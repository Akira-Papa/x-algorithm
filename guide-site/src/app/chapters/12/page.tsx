'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  SparklesIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FAQ, type FAQItem } from "@/components/ui/Accordion";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ChapterHeader } from '@/components/ui/ChapterHeader';

// Pipeline Step Component
function PipelineStep({
  step,
  title,
  description,
  keyPoint,
  colorClass,
}: {
  step: number;
  title: string;
  description: string;
  keyPoint: string;
  colorClass: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
        {step}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{description}</p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">💡 {keyPoint}</p>
      </div>
    </div>
  );
}

// Top Signal Card Component
function TopSignalCard({
  rank,
  signal,
  impact,
  chapter,
  colorClass,
}: {
  rank: number;
  signal: string;
  impact: string;
  chapter: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-4">
      <span className={`w-10 h-10 rounded-full ${colorClass} text-white font-bold flex items-center justify-center text-lg flex-shrink-0`}>
        {rank}
      </span>
      <div className="flex-1">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{signal}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{impact}</p>
      </div>
      <span className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">{chapter}</span>
    </div>
  );
}

// Phase Card Component
function PhaseCard({
  phase,
  followers,
  period,
  focus,
  actions,
  kpi,
  colorClass,
}: {
  phase: string;
  followers: string;
  period: string;
  focus: string;
  actions: string[];
  kpi: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className={`px-5 py-4 ${colorClass}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">{phase}</h3>
          <span className="text-sm opacity-80">{period}</span>
        </div>
        <p className="text-2xl font-bold mt-1">{followers}</p>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase">重点</span>
          <p className="text-zinc-900 dark:text-zinc-100 mt-1">{focus}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase">主要アクション</span>
          <ul className="mt-1 space-y-1">
            {actions.map((action, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-semibold text-zinc-500 uppercase">成功指標</span>
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">{kpi}</p>
        </div>
      </div>
    </div>
  );
}

// Routine Time Block
function RoutineBlock({
  time,
  duration,
  activity,
  tasks,
  colorClass,
}: {
  time: string;
  duration: string;
  activity: string;
  tasks: string[];
  colorClass: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-lg ${colorClass} text-white flex flex-col items-center justify-center`}>
          <span className="text-sm font-bold">{time}</span>
          <span className="text-xs opacity-80">{duration}</span>
        </div>
        <div className="w-0.5 h-full bg-zinc-200 dark:bg-zinc-700 mt-2"></div>
      </div>
      <div className="flex-1 pb-6">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{activity}</h4>
        <ul className="mt-2 space-y-1">
          {tasks.map((task, i) => (
            <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
              <ArrowRightIcon className="w-3 h-3 mt-1.5 flex-shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Checklist Section
function ChecklistSection({
  title,
  icon,
  items,
  colorClass,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; detail: string }[];
  colorClass: string;
}) {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (index: number) => {
    setChecked(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className={`px-5 py-4 ${colorClass} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="font-bold">{title}</h4>
        </div>
        <span className="text-sm opacity-80">
          {checked.length}/{items.length} 完了
        </span>
      </div>
      <div className="p-5 space-y-3">
        {items.map((item, i) => (
          <label
            key={i}
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => toggle(i)}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              checked.includes(i)
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-zinc-300 dark:border-zinc-600 group-hover:border-emerald-500'
            }`}>
              {checked.includes(i) && <CheckIcon className="w-3 h-3 text-white" />}
            </div>
            <div>
              <p className={`font-medium transition-colors ${
                checked.includes(i)
                  ? 'text-zinc-400 line-through'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}>
                {item.label}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{item.detail}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// FAQ Data
const faqData: FAQItem[] = [
  {
    question: '全12章で最も重要な章は？',
    answer: `すべての章が連携していますが、特に重要なのは：

1. 第2章「エンゲージメント19種類」- スコアリングの基礎
2. 第5章「スコアリングシステム」- ランキング計算の核心
3. 第7章「IN vs OON」- 成長戦略の分岐点

これらを理解すれば、他の章の知識も活きてきます。`
  },
  {
    question: 'どのフェーズから始めればいい？',
    answer: `現在のフォロワー数で判断します：

・0-1,000フォロワー → Phase 1（基盤構築）
・1,000-5,000フォロワー → Phase 2（成長期）
・5,000-10,000フォロワー → Phase 3（拡大期）
・10,000+フォロワー → Phase 4（確立期）

各フェーズには適切な戦略があります。焦らず段階的に進めましょう。`
  },
  {
    question: '毎日どれくらい時間をかければいい？',
    answer: `推奨時間配分：

・投稿作成: 15-30分
・エンゲージメント活動: 15-20分
・分析: 5分（日次）

合計: 約35-55分/日

週末に30分の週次分析を追加。継続できる範囲で調整してください。`
  },
  {
    question: 'テンプレート集と技術仕様書の使い分けは？',
    answer: `用途に応じて使い分けます：

【テンプレート集】
・投稿ネタに困ったとき
・新しい投稿パターンを試したいとき
・効率的に投稿を作成したいとき

【技術仕様書】
・アルゴリズムの詳細を確認したいとき
・戦略の根拠を理解したいとき
・深い理解が必要なとき`
  },
  {
    question: 'やってはいけないことTOP5は？',
    answer: `避けるべき行動TOP5：

1. 外部リンクの多用（スコア低下）
2. フォロワー購入（Trust Score壊滅）
3. 攻撃的な発言（NEV急増→フィルター対象）
4. 連続投稿の乱発（Author Diversityペナルティ）
5. エンゲージメントベイト（検出→減点）

これらは短期的に効果があるように見えても、長期的には大きなマイナスです。`
  }
];

// Quiz Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Xアルゴリズムの8段階パイプラインで最初に行われるのは？',
    choices: [
      { id: 'A', text: 'スコアリング' },
      { id: 'B', text: 'Two-Tower検索による候補取得' },
      { id: 'C', text: 'フィルタリング' },
      { id: 'D', text: 'ブレンディング' },
    ],
    correctAnswer: 'B',
    explanation: '最初にTwo-Tower検索で約1500件の候補を取得し、その後スコアリング、フィルタリングと続きます。第3章で詳しく解説しています。',
  },
  {
    id: 2,
    question: 'エンゲージメント19種類の中で最も重み係数が高いのは？',
    choices: [
      { id: 'A', text: 'いいね（0.5x）' },
      { id: 'B', text: 'リツイート（1x）' },
      { id: 'C', text: '2分以上の滞在（22x）' },
      { id: 'D', text: 'リプライ（13.5x）' },
    ],
    correctAnswer: 'C',
    explanation: '2分以上の滞在時間が22xで最高の重み係数です。深いエンゲージメントほど高く評価される設計です。第2章で全19種類を解説しています。',
  },
  {
    id: 3,
    question: 'フォロワー1,000人未満の初期フェーズで最も重要なのは？',
    choices: [
      { id: 'A', text: 'OON（フォロー外）への拡散' },
      { id: 'B', text: 'IN（フォロワー）との濃い関係構築' },
      { id: 'C', text: 'バズ狙いの投稿' },
      { id: 'D', text: '広告出稿' },
    ],
    correctAnswer: 'B',
    explanation: '初期フェーズではIN（フォロワー）との濃い関係構築が最重要です。信頼スコアを上げることで、後のOON拡散の基盤になります。第7章で詳しく解説しています。',
  },
  {
    id: 4,
    question: '動画でVQV（Value Quality View）と判定される条件は？',
    choices: [
      { id: 'A', text: '50%以上視聴 or 31秒以上視聴 or 完全視聴' },
      { id: 'B', text: '10秒以上視聴' },
      { id: 'C', text: '最後まで視聴のみ' },
      { id: 'D', text: 'いいねを押すこと' },
    ],
    correctAnswer: 'A',
    explanation: 'VQVは「50%以上視聴」「31秒以上視聴」「完全視聴」のいずれかで成立します。第9章で動画最適化戦略を解説しています。',
  },
  {
    id: 5,
    question: '12種類のフィルターに含まれないものは？',
    choices: [
      { id: 'A', text: 'Trust & Safety Filter' },
      { id: 'B', text: 'Author Diversity Filter' },
      { id: 'C', text: 'Engagement Filter' },
      { id: 'D', text: 'Visibility Filter' },
    ],
    correctAnswer: 'C',
    explanation: 'Engagement Filterは存在しません。フィルターは安全性、多様性、品質などを確保するためのもので、エンゲージメントはスコアリング段階で評価されます。第6章で全12種類を解説しています。',
  },
];

export default function Chapter12Page() {
  const pipelineSteps = [
    { step: 1, title: '候補取得', description: 'Two-Tower検索で約1500件の候補を取得', keyPoint: 'SimClustersで興味ベースのマッチング', colorClass: 'bg-blue-500' },
    { step: 2, title: 'スコアリング', description: 'Phoenix MLモデルでエンゲージメント予測', keyPoint: '19種類の重み付けで精密計算', colorClass: 'bg-blue-600' },
    { step: 3, title: 'フィルタリング', description: '12種類のフィルターで品質確保', keyPoint: '安全性・多様性・健全性チェック', colorClass: 'bg-indigo-500' },
    { step: 4, title: 'ブレンディング', description: 'IN/OONコンテンツの最適配合', keyPoint: 'フォロワー内外のバランス調整', colorClass: 'bg-indigo-600' },
    { step: 5, title: '多様性確保', description: 'Author Diversityで偏り防止', keyPoint: '連続投稿ペナルティに注意', colorClass: 'bg-purple-500' },
    { step: 6, title: '広告挿入', description: '広告と有機コンテンツの統合', keyPoint: '広告もスコアリング対象', colorClass: 'bg-purple-600' },
    { step: 7, title: '最終調整', description: '表示位置の最終決定', keyPoint: 'タイムライン上の配置最適化', colorClass: 'bg-pink-500' },
    { step: 8, title: '配信', description: 'ユーザーのタイムラインへ', keyPoint: 'リアルタイム更新', colorClass: 'bg-pink-600' },
  ];

  const topSignals = [
    { rank: 1, signal: '2分以上の滞在時間', impact: '重み係数22x - 深い関心の証明', chapter: '第2章' },
    { rank: 2, signal: 'リプライ', impact: '重み係数13.5x - 会話を生む投稿', chapter: '第2章' },
    { rank: 3, signal: 'プロフィールクリック→フォロー', impact: '重み係数24x - 新規フォロワー獲得', chapter: '第2章' },
    { rank: 4, signal: '引用リツイート', impact: '重み係数1x - 議論の拡散', chapter: '第2章' },
    { rank: 5, signal: 'VQV（動画品質視聴）', impact: '40%以上で高評価 - 動画の価値証明', chapter: '第9章' },
  ];

  const avoidActions = [
    { action: '外部リンクの多用', reason: 'X外への離脱を促すためスコア大幅低下', chapter: '第5章' },
    { action: 'フォロワー購入', reason: 'Trust Score壊滅、長期的に成長不能に', chapter: '第10章' },
    { action: '攻撃的な発言', reason: 'NEV急増→Trust & Safety Filter対象に', chapter: '第6章' },
    { action: '連続投稿の乱発', reason: 'Author Diversityペナルティで全投稿が埋もれる', chapter: '第8章' },
    { action: 'エンゲージメントベイト', reason: 'ML検出で減点、繰り返すと重いペナルティ', chapter: '第5章' },
  ];

  const phases = [
    {
      phase: 'Phase 1: 基盤構築',
      followers: '0 - 1,000',
      period: '3-6ヶ月',
      focus: 'INエンゲージメントの構築',
      actions: [
        'ニッチな専門性を確立',
        '毎日1-2投稿を継続',
        'フォロワーのリプライに必ず返信',
        '同分野のアカウントと積極的に交流',
      ],
      kpi: 'エンゲージメント率 5%以上',
      colorClass: 'bg-blue-600 text-white',
    },
    {
      phase: 'Phase 2: 成長期',
      followers: '1,000 - 5,000',
      period: '6-12ヶ月',
      focus: 'OON到達の開始',
      actions: [
        '成功パターンの横展開',
        'テーマを少し広げる',
        'スレッド投稿の活用',
        'エンゲージメント活動を効率化',
      ],
      kpi: '週100人以上のフォロワー増加',
      colorClass: 'bg-emerald-600 text-white',
    },
    {
      phase: 'Phase 3: 拡大期',
      followers: '5,000 - 10,000',
      period: '6-12ヶ月',
      focus: '影響力の確立',
      actions: [
        'OON比率30%以上を目指す',
        'コラボレーション企画',
        '動画コンテンツの導入',
        'ブランディングの強化',
      ],
      kpi: 'OONエンゲージメント比率 30%以上',
      colorClass: 'bg-purple-600 text-white',
    },
    {
      phase: 'Phase 4: 確立期',
      followers: '10,000+',
      period: '継続',
      focus: '持続可能な運用',
      actions: [
        'エンゲージメント率の維持',
        'コンテンツの質を最優先',
        '分析と改善の習慣化',
        '長期的な価値提供',
      ],
      kpi: 'エンゲージメント率 3%以上を維持',
      colorClass: 'bg-pink-600 text-white',
    },
  ];

  const dailyRoutine = [
    {
      time: '朝',
      duration: '5分',
      activity: '分析チェック',
      tasks: ['前日の投稿パフォーマンス確認', '通知の確認', 'トレンドのチェック'],
      colorClass: 'bg-amber-500',
    },
    {
      time: '午前',
      duration: '15-30分',
      activity: '投稿作成・予約',
      tasks: ['メイン投稿の作成', '画像・動画の準備', '最適時間に予約設定'],
      colorClass: 'bg-blue-500',
    },
    {
      time: '午後',
      duration: '15分',
      activity: 'エンゲージメント',
      tasks: ['リプライへの返信', '同分野アカウントとの交流', '気になる投稿へのコメント'],
      colorClass: 'bg-emerald-500',
    },
    {
      time: '夜',
      duration: '5分',
      activity: '振り返り',
      tasks: ['今日の投稿パフォーマンス', '明日のネタ検討', '気づきのメモ'],
      colorClass: 'bg-purple-500',
    },
  ];

  const prePostChecklist = [
    { label: 'ターゲット読者を明確にした', detail: '誰に向けた投稿か確認' },
    { label: '価値を提供している', detail: '読者が得られるメリットを確認' },
    { label: '冒頭で興味を引ける', detail: '最初の1行で続きを読みたくなるか' },
    { label: '外部リンクは必要最小限', detail: 'リンクなしで完結できないか再検討' },
    { label: '画像・動画は適切', detail: '視覚的要素が内容を強化しているか' },
    { label: '投稿時間は最適', detail: 'ターゲットがアクティブな時間か' },
  ];

  const weeklyChecklist = [
    { label: '週間インプレッション合計を記録', detail: '前週との比較も' },
    { label: 'エンゲージメント率を計算', detail: '(いいね+RT+リプライ)/インプレッション' },
    { label: 'フォロワー純増数を確認', detail: '新規フォロー - アンフォロー' },
    { label: 'TOP3投稿を分析', detail: '成功要因を特定' },
    { label: 'WORST投稿を分析', detail: '失敗要因を特定' },
    { label: '来週の投稿計画を立てる', detail: 'テーマとスケジュール' },
  ];

  const monthlyChecklist = [
    { label: '月間KPI達成度を評価', detail: '目標との差分を確認' },
    { label: '成功パターンを文書化', detail: '再現可能な形で記録' },
    { label: '失敗パターンをブラックリスト化', detail: '避けるべき行動を明確に' },
    { label: '来月の目標を設定', detail: '数値で具体的に' },
    { label: '戦略の修正点を洗い出す', detail: 'PDCAのAct' },
    { label: 'フェーズの進捗を確認', detail: '次のフェーズへの準備' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <ChapterHeader currentChapter={12} />

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* タイトルセクション */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">第12章</span>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded">最終章</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            総まとめと実践ロードマップ
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            全11章の知識を実践に落とし込む - チェックリストとフェーズ別戦略
          </p>
        </div>

        {/* 8段階パイプライン */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <CpuChipIcon className="w-6 h-6" />
            12.1 アルゴリズム8段階パイプライン
          </h2>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 mb-6">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              あなたの投稿がタイムラインに表示されるまでの8つのステップ。各段階を理解することで、最適化ポイントが見えてきます。
            </p>

            <div className="space-y-4">
              {pipelineSteps.map((step) => (
                <PipelineStep key={step.step} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* 最重要シグナルTOP5 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6" />
            12.2 最重要シグナル TOP5
          </h2>

          <div className="space-y-3 mb-8">
            {topSignals.map((signal, i) => (
              <TopSignalCard
                key={i}
                {...signal}
                colorClass={
                  i === 0 ? 'bg-yellow-500' :
                  i === 1 ? 'bg-zinc-400' :
                  i === 2 ? 'bg-amber-600' :
                  'bg-blue-500'
                }
              />
            ))}
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
            やってはいけない TOP5
          </h3>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-red-100 dark:bg-red-900/40">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-red-800 dark:text-red-300">行動</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-red-800 dark:text-red-300">理由</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-red-800 dark:text-red-300">参照</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-200 dark:divide-red-800">
                {avoidActions.map((item, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-sm font-medium text-red-900 dark:text-red-200">{item.action}</td>
                    <td className="px-4 py-3 text-sm text-red-700 dark:text-red-400">{item.reason}</td>
                    <td className="px-4 py-3 text-xs text-red-600 dark:text-red-500">{item.chapter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* フェーズ別ロードマップ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <RocketLaunchIcon className="w-6 h-6" />
            12.3 フェーズ別ロードマップ
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            フォロワー数に応じた4つの成長フェーズ。各フェーズに適した戦略で着実に成長しましょう。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {phases.map((phase, i) => (
              <PhaseCard key={i} {...phase} />
            ))}
          </div>
        </section>

        {/* 1日のルーティン */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <CalendarDaysIcon className="w-6 h-6" />
            12.4 1日のルーティン
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            合計約35-55分/日。継続可能なペースで運用しましょう。
          </p>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            {dailyRoutine.map((block, i) => (
              <RoutineBlock key={i} {...block} />
            ))}
          </div>
        </section>

        {/* チェックリスト */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <ClipboardDocumentCheckIcon className="w-6 h-6" />
            12.5 実践チェックリスト
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ChecklistSection
              title="投稿前チェック"
              icon={<DocumentTextIcon className="w-5 h-5" />}
              items={prePostChecklist}
              colorClass="bg-blue-600 text-white"
            />
            <ChecklistSection
              title="週次レビュー"
              icon={<ChartBarIcon className="w-5 h-5" />}
              items={weeklyChecklist}
              colorClass="bg-emerald-600 text-white"
            />
            <ChecklistSection
              title="月次振り返り"
              icon={<CalendarDaysIcon className="w-5 h-5" />}
              items={monthlyChecklist}
              colorClass="bg-purple-600 text-white"
            />
          </div>
        </section>

        {/* 次のステップ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <LightBulbIcon className="w-6 h-6" />
            12.6 次のステップ
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/templates" className="block">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <DocumentTextIcon className="w-8 h-8" />
                  <h3 className="text-xl font-bold">投稿テンプレート集</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  14カテゴリ × 10個 = 140個のテンプレートですぐに投稿作成
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span>テンプレートを見る</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link href="/specs" className="block">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <AcademicCapIcon className="w-8 h-8" />
                  <h3 className="text-xl font-bold">技術仕様書</h3>
                </div>
                <p className="text-purple-100 mb-4">
                  アルゴリズムの詳細な技術仕様を確認
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span>技術仕様を見る</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              各章の復習リンク
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 11 }, (_, i) => (
                <Link
                  key={i}
                  href={`/chapters/${i + 1}`}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  第{i + 1}章 →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* まとめ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            12.7 この章のまとめ
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6">
            <ul className="space-y-4">
              {[
                { title: '8段階パイプラインで投稿が処理される', desc: '各段階に最適化ポイントがある' },
                { title: '最重要シグナルは「深いエンゲージメント」', desc: '2分滞在、リプライ、フォローが高評価' },
                { title: 'フェーズに応じた戦略が必要', desc: '初期はIN重視、成長後はOON拡大' },
                { title: '継続可能なルーティンを確立する', desc: '1日35-55分の習慣化' },
                { title: 'チェックリストで品質を担保', desc: '投稿前・週次・月次の3層管理' },
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

        {/* 本書の総括 */}
        <section className="mb-16">
          <div className="bg-zinc-900 dark:bg-zinc-800 rounded-lg p-8 text-white">
            <div className="text-center mb-8">
              <UserGroupIcon className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-bold">全12章の学習お疲れさまでした</h2>
              <p className="text-zinc-400 mt-2">アルゴリズムを味方に、価値ある発信を続けてください</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-800 dark:bg-zinc-700 rounded-lg p-5">
                <h3 className="font-semibold text-blue-400 mb-3">理解した知識</h3>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li>• 3層アーキテクチャ</li>
                  <li>• 8段階パイプライン</li>
                  <li>• 19種類のエンゲージメント</li>
                  <li>• 12種類のフィルター</li>
                </ul>
              </div>
              <div className="bg-zinc-800 dark:bg-zinc-700 rounded-lg p-5">
                <h3 className="font-semibold text-emerald-400 mb-3">身につけた戦略</h3>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li>• IN vs OON戦略</li>
                  <li>• 最適な投稿タイミング</li>
                  <li>• 動画VQV最適化</li>
                  <li>• Trust Score構築</li>
                </ul>
              </div>
              <div className="bg-zinc-800 dark:bg-zinc-700 rounded-lg p-5">
                <h3 className="font-semibold text-purple-400 mb-3">実践するスキル</h3>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li>• データ分析とPDCA</li>
                  <li>• チェックリスト活用</li>
                  <li>• フェーズ別戦略実行</li>
                  <li>• 継続的な改善</li>
                </ul>
              </div>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700">
              <p className="text-zinc-300 text-center">
                アルゴリズムの理解は手段であり、目的ではありません。<br />
                <span className="text-white font-medium">大切なのは、読者に価値を提供し続けること。</span><br />
                <span className="text-zinc-400">誠実な発信を続ける人が、長期的に成功します。</span>
              </p>
            </div>
          </div>
        </section>

        {/* ナビゲーション */}
        <ChapterNav currentChapter={12} />
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            目次に戻る
          </Link>
          <Link href="/complete" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            完了ページへ
          </Link>
        </div>
      </footer>
    </div>
  );
}

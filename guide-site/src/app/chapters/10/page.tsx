'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  BookmarkIcon,
  ArrowPathRoundedSquareIcon,
  UserPlusIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CheckIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FAQ, type FAQItem } from "@/components/ui/Accordion";
import { ChapterNav } from "@/components/ui/ChapterNav";

// Section Header Component
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-blue-600">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg font-bold text-lg">
        {number}
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
    </div>
  );
}

// Template Box Component
function TemplateBox({
  number,
  title,
  target,
  weight,
  description,
  structure,
  example,
  tips,
  icon: Icon,
  color,
}: {
  number: number;
  title: string;
  target: string;
  weight: string;
  description: string;
  structure: string[];
  example: string;
  tips: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const colorClasses: Record<string, { bg: string; border: string; text: string; light: string }> = {
    purple: { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-600', light: 'bg-purple-50 dark:bg-purple-900/20' },
    blue: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20' },
    pink: { bg: 'bg-pink-600', border: 'border-pink-500', text: 'text-pink-600', light: 'bg-pink-50 dark:bg-pink-900/20' },
    orange: { bg: 'bg-orange-600', border: 'border-orange-500', text: 'text-orange-600', light: 'bg-orange-50 dark:bg-orange-900/20' },
    green: { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-600', light: 'bg-green-50 dark:bg-green-900/20' },
  };

  const styles = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`border-2 ${isExpanded ? styles.border : 'border-zinc-200 dark:border-zinc-700'} rounded-xl overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className={`flex-shrink-0 w-14 h-14 ${styles.bg} rounded-xl flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              テンプレート {number}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles.light} ${styles.text}`}>
              {target}：{weight}
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{description}</p>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-zinc-200 dark:border-zinc-700">
          {/* Structure */}
          <div className="mt-5">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <ClipboardDocumentListIcon className="w-5 h-5 text-zinc-500" />
              基本構成
            </h4>
            <div className="space-y-2">
              {structure.map((line, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300 pt-0.5">{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-zinc-500" />
              例文
            </h4>
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed font-mono">
                {example}
              </p>
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5 text-yellow-500" />
              成功のコツ
            </h4>
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Engagement Weight Chart
function EngagementWeightChart() {
  const weights = [
    { name: 'リプライ', weight: 13.5, percent: 100 },
    { name: 'プロフィールクリック', weight: 12.0, percent: 89 },
    { name: 'フォロー', weight: 4.0, percent: 30 },
    { name: '引用RT', weight: 1.1, percent: 8 },
    { name: 'リポスト', weight: 1.0, percent: 7 },
    { name: 'ブックマーク', weight: 1.0, percent: 7 },
    { name: 'いいね', weight: 0.5, percent: 4 },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-700 px-5 py-3 border-b border-zinc-200 dark:border-zinc-600">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5" />
          エンゲージメント重み一覧
        </h4>
      </div>
      <div className="p-5 space-y-4">
        {weights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="w-32 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {item.name}
            </span>
            <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-700 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded transition-all duration-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <span className="w-12 text-right font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {item.weight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Weekly Schedule
function WeeklySchedule() {
  const schedule = [
    { day: '月', template: '質問', color: 'bg-purple-500' },
    { day: '火', template: '保存', color: 'bg-pink-500' },
    { day: '水', template: 'プロフ', color: 'bg-blue-500' },
    { day: '木', template: '質問', color: 'bg-purple-500' },
    { day: '金', template: '引用RT', color: 'bg-orange-500' },
    { day: '土', template: '保存', color: 'bg-pink-500' },
    { day: '日', template: 'フォロー', color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-700 px-5 py-3 border-b border-zinc-200 dark:border-zinc-600">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CalendarDaysIcon className="w-5 h-5" />
          週間テンプレートスケジュール例
        </h4>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-7 gap-2">
          {schedule.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-xs font-bold text-zinc-500 mb-2">{item.day}</div>
              <div className={`${item.color} text-white text-xs font-medium px-2 py-3 rounded-lg`}>
                {item.template}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-4 text-center">
          ※ 目標に合わせてバランスよく配置することを推奨
        </p>
      </div>
    </div>
  );
}

// Failure Patterns
function FailurePatterns() {
  const patterns = [
    { issue: '質問が難しすぎる', symptom: 'リプライがない', fix: '誰でも答えられる質問にする' },
    { issue: '過激すぎる', symptom: '炎上、ブロック', fix: '議論と批判を区別する' },
    { issue: 'CTAが弱い', symptom: 'アクションがない', fix: '明確なCTAを追加する' },
    { issue: '価値が不明確', symptom: '無視される', fix: '読者のメリットを明確に' },
    { issue: '長すぎる', symptom: '途中で離脱', fix: '簡潔に、余白を残す' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-red-200 dark:border-red-800 overflow-hidden">
      <div className="bg-red-50 dark:bg-red-900/30 px-5 py-3 border-b border-red-200 dark:border-red-800">
        <h4 className="font-bold text-red-800 dark:text-red-200 flex items-center gap-2">
          <ExclamationTriangleIcon className="w-5 h-5" />
          避けるべき失敗パターン
        </h4>
      </div>
      <div className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-2 pr-4 font-medium text-zinc-900 dark:text-zinc-100">問題</th>
                <th className="text-left py-2 pr-4 font-medium text-zinc-900 dark:text-zinc-100">症状</th>
                <th className="text-left py-2 font-medium text-zinc-900 dark:text-zinc-100">対策</th>
              </tr>
            </thead>
            <tbody>
              {patterns.map((pattern, idx) => (
                <tr key={idx} className="border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
                  <td className="py-3 pr-4 text-red-700 dark:text-red-300 font-medium">{pattern.issue}</td>
                  <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">{pattern.symptom}</td>
                  <td className="py-3 text-green-700 dark:text-green-300">{pattern.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Action Checklist
function ActionChecklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(5).fill(false));

  const items = [
    '5種類のテンプレートを保存する',
    '今日の投稿に1つ適用してみる',
    '効果を計測する（どのテンプレートが反応良いか）',
    '自分に合ったテンプレートをカスタマイズ',
    '成功パターンを蓄積していく'
  ];

  const toggleItem = (idx: number) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  const progress = (checked.filter(Boolean).length / items.length) * 100;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-green-500 overflow-hidden">
      <div className="bg-green-500 px-5 py-3">
        <div className="flex items-center justify-between text-white">
          <span className="font-bold flex items-center gap-2">
            <SparklesIcon className="w-5 h-5" />
            アクションアイテム
          </span>
          <span className="text-sm">{checked.filter(Boolean).length}/{items.length}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => toggleItem(idx)}
                className="w-5 h-5 rounded border-zinc-300 text-green-500 focus:ring-green-500"
              />
              <span className={`text-sm ${checked[idx] ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Chapter10() {
  const faqItems: FAQItem[] = [
    {
      question: '質問誘発型テンプレートの効果は？',
      answer: '質問誘発型はXアルゴリズムで最も重要な「リプライ」（重み13.5）を狙います。答えやすい質問、自分の意見を先に出す、正解がない質問にすることがポイントです。'
    },
    {
      question: 'プロフィール誘導型のコツは？',
      answer: 'プロフィールクリック（重み12.0）を獲得するには、具体的な数字で信憑性を出し、「続きはプロフで」の理由を作り、プロフィール自体を最適化しておくことが重要です。'
    },
    {
      question: '保存誘発型の特徴は？',
      answer: 'ブックマーク（重み1.0）を狙います。【保存版】などで明示的に促し、網羅的で体系的な情報（リスト、チェックリスト）を箇条書きで見やすく提供します。'
    },
    {
      question: '引用RT誘発型の注意点は？',
      answer: '引用リポスト（重み1.1）を狙いますが、「やや」controversialに留めることが重要です。根拠を示し、反論を歓迎する姿勢を見せましょう。'
    },
    {
      question: 'テンプレートの使い分けは？',
      answer: '目標に応じて選択します。リプライ増加→質問型、プロフィール→誘導型、保存→保存型、議論→引用RT型、フォロワー→フォロー型。週間スケジュールを組んでバランスよく使います。'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: '質問誘発型テンプレートが狙うエンゲージメントは？',
      choices: [
        { id: 'A', text: 'いいね' },
        { id: 'B', text: 'リプライ' },
        { id: 'C', text: 'ブックマーク' },
        { id: 'D', text: 'リポスト' },
      ],
      correctAnswer: 'B',
      explanation: '質問誘発型はリプライ（重み13.5）を狙います。Xアルゴリズムで最も重要なエンゲージメントです。'
    },
    {
      id: 2,
      question: 'プロフィールクリックのエンゲージメント重みは？',
      choices: [
        { id: 'A', text: '4.0' },
        { id: 'B', text: '8.0' },
        { id: 'C', text: '12.0' },
        { id: 'D', text: '13.5' },
      ],
      correctAnswer: 'C',
      explanation: 'プロフィールクリックの重みは12.0で、リプライ（13.5）に次いで2番目に高いです。'
    },
    {
      id: 3,
      question: '保存誘発型テンプレートが狙うエンゲージメントは？',
      choices: [
        { id: 'A', text: 'フォロー' },
        { id: 'B', text: 'リプライ' },
        { id: 'C', text: 'ブックマーク' },
        { id: 'D', text: '引用RT' },
      ],
      correctAnswer: 'C',
      explanation: '保存誘発型はブックマーク（重み1.0）を狙います。「後で見返したい」という強い興味の表れです。'
    },
    {
      id: 4,
      question: '引用RT誘発型で避けるべきことは？',
      choices: [
        { id: 'A', text: '根拠を示すこと' },
        { id: 'B', text: '過激すぎる主張' },
        { id: 'C', text: '反論を歓迎すること' },
        { id: 'D', text: '質問で終わること' },
      ],
      correctAnswer: 'B',
      explanation: '引用RT誘発型は「やや」controversialに留めることが重要。過激すぎると炎上リスクがあります。'
    },
    {
      id: 5,
      question: 'この章で紹介されているテンプレートは全部で何種類？',
      choices: [
        { id: 'A', text: '3種類' },
        { id: 'B', text: '4種類' },
        { id: 'C', text: '5種類' },
        { id: 'D', text: '6種類' },
      ],
      correctAnswer: 'C',
      explanation: '5種類のテンプレート：質問誘発型、プロフィール誘導型、保存誘発型、引用RT誘発型、フォロー誘発型。'
    }
  ];

  const templates = [
    {
      number: 1,
      title: '質問誘発型テンプレート',
      target: 'リプライ',
      weight: '13.5',
      description: 'リプライを自然に誘発する質問形式',
      structure: [
        '業界の常識/一般的な意見への問いかけ',
        '自分の考え・仮説を提示',
        '読者への質問（必ず疑問形で終わる）'
      ],
      example: `「毎日投稿すれば伸びる」とよく言われますが、
本当にそうでしょうか？

私は週3回の投稿に減らしてから、
むしろエンゲージメント率が上がりました。

皆さんの最適な投稿頻度は？
教えてください`,
      tips: [
        '答えやすい質問にする（はい/いいえや選択式）',
        '自分の意見を先に出して議論の起点を作る',
        '正解がない質問にする（あなたの経験を聞く）',
        '最後は必ず疑問形で終わる'
      ],
      icon: ChatBubbleLeftRightIcon,
      color: 'purple'
    },
    {
      number: 2,
      title: 'プロフィール誘導型テンプレート',
      target: 'プロフィールクリック',
      weight: '12.0',
      description: '好奇心を刺激してプロフィールへ誘導',
      structure: [
        '実績・成果を数字で示す',
        '希少な情報/価値の予告',
        'プロフィールへの誘導'
      ],
      example: `3ヶ月で0→1万フォロワーを達成しました。

やったことは実はシンプルで、
3つのことを徹底しただけです。

その3つはプロフィールの固定ツイートで公開しています。`,
      tips: [
        '具体的な数字を入れる（「成果を出した」より「月100万円」）',
        '「続きはプロフで」の理由を作る（全部言わない）',
        'プロフィールを最適化しておく（固定ツイート、専門性明示）',
        '嘘や誇張はNG（信頼を失う）'
      ],
      icon: UserCircleIcon,
      color: 'blue'
    },
    {
      number: 3,
      title: '保存誘発型テンプレート',
      target: 'ブックマーク',
      weight: '1.0',
      description: '後で見返したい価値ある情報を提供',
      structure: [
        '「保存推奨」「永久保存版」などの明示',
        '網羅的なリストの予告',
        '箇条書きで価値ある情報を列挙'
      ],
      example: `【保存版】X運用で絶対やるべきこと12選

1. プロフィールは3行以内
2. 固定ツイートは成果報告
3. 投稿は朝・昼・夜の3回
4. リプライには必ず返信
5. 質問で終わる投稿を増やす
...

保存してチェックリストにどうぞ`,
      tips: [
        '「保存」を明示的に促す（【保存版】など）',
        '網羅的で体系的な情報を提供',
        '後で見返す価値（チェックリスト、用語集、比較表）',
        '視覚的に見やすく（箇条書き、改行）'
      ],
      icon: BookmarkIcon,
      color: 'pink'
    },
    {
      number: 4,
      title: '引用RT誘発型テンプレート',
      target: '引用RT',
      weight: '1.1',
      description: '議論を呼ぶ内容で引用RTを誘発',
      structure: [
        'やや議論を呼ぶ主張（過激すぎず）',
        '根拠・理由の提示',
        '「反論歓迎」「意見求む」の明示'
      ],
      example: `「毎日投稿」より「週3回の高品質投稿」の方が
フォロワー増加率が高いというデータがあります。

（自社調査n=500アカウント）

「そんなことない」という方、
ぜひ引用RTで反論してください。
議論したいです。`,
      tips: [
        '「やや」controversialに留める（炎上回避）',
        '根拠を示す（データ、経験、論理）',
        '反論を歓迎する姿勢（「教えてください」）',
        '引用RTを明示的に促す'
      ],
      icon: ArrowPathRoundedSquareIcon,
      color: 'orange'
    },
    {
      number: 5,
      title: 'フォロー誘発型テンプレート',
      target: 'フォロー',
      weight: '4.0',
      description: '今後の価値を予告してフォローを促す',
      structure: [
        '今後の価値予告（シリーズ、継続発信）',
        '過去の実績・信頼性の証明',
        'フォローのCTA（行動喚起）'
      ],
      example: `来週から「X収益化の完全ロードマップ」を
10回シリーズで投稿します。

過去のシリーズは平均500RT、
フォロワー1000人増でした。

見逃したくない方はフォローを`,
      tips: [
        'フォローする「理由」を明確に（何が得られるか）',
        '実績で信頼性を示す（過去の成果、フォロワー推移）',
        '継続性を示す（毎日、毎週、シリーズ）',
        'CTAを明確に（「フォロー」という言葉を使う）'
      ],
      icon: UserPlusIcon,
      color: 'green'
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-2"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            目次へ戻る
          </Link>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            第10章 / 全12章
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm font-medium mb-4">
            <DocumentTextIcon className="w-4 h-4" />
            第10章
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            投稿テンプレート5種類
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            アルゴリズム知識を実際の投稿に落とし込む5種類のテンプレートと具体例
          </p>
        </div>

        {/* Section 10.1 */}
        <section className="mb-12">
          <SectionHeader number="10.1" title="エンゲージメントの重み" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            テンプレートを使う前に、各エンゲージメントの重みを理解しておきましょう。
            リプライとプロフィールクリックが特に高い重みを持っています。
          </p>
          <EngagementWeightChart />
        </section>

        {/* Section 10.2 */}
        <section className="mb-12">
          <SectionHeader number="10.2" title="5種類のテンプレート" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            各テンプレートは特定のエンゲージメントを狙って設計されています。
            クリックして詳細な構成と例文を確認してください。
          </p>
          <div className="space-y-4">
            {templates.map((template) => (
              <TemplateBox key={template.number} {...template} />
            ))}
          </div>
        </section>

        {/* Section 10.3 */}
        <section className="mb-12">
          <SectionHeader number="10.3" title="使い方ガイド" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            テンプレートは週間スケジュールを組んでバランスよく使うことで、
            様々なエンゲージメントを獲得できます。
          </p>
          <WeeklySchedule />
        </section>

        {/* Section 10.4 */}
        <section className="mb-12">
          <SectionHeader number="10.4" title="失敗パターンと対策" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            よくある失敗パターンを把握し、事前に対策しておきましょう。
          </p>
          <FailurePatterns />
        </section>

        {/* Section 10.5 */}
        <section className="mb-12">
          <SectionHeader number="10.5" title="よくある質問" />
          <FAQ items={faqItems} />
        </section>

        {/* Section 10.6 */}
        <section className="mb-12">
          <SectionHeader number="10.6" title="理解度チェック" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            この章で学んだ内容を5問のクイズで確認しましょう。
          </p>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Section 10.7 */}
        <section className="mb-12">
          <SectionHeader number="10.7" title="今日から始めよう" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            学んだテンプレートを実践に移すためのアクションアイテムです。
          </p>
          <ActionChecklist />
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-zinc-900 dark:bg-zinc-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white dark:text-zinc-900 mb-4">
              第10章のまとめ
            </h3>
            <ul className="space-y-3">
              {[
                '5種類のテンプレートで主要なエンゲージメントをカバー',
                'リプライ（13.5）とプロフィールクリック（12.0）が最高価値',
                '週間スケジュールでバランスよく使う',
                '失敗パターンを避ける：難しすぎ、過激すぎ、CTAが弱い',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white dark:text-zinc-900">
                  <CheckIcon className="w-5 h-5 text-green-400 dark:text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ChapterNav currentChapter={10} />
      </main>
    </div>
  );
}

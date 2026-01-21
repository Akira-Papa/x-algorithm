'use client';

import { useState } from 'react';
import {
  ShieldCheckIcon,
  StarIcon,
  UserCircleIcon,
  PhotoIcon,
  PencilSquareIcon,
  AtSymbolIcon,
  DocumentTextIcon,
  BookmarkSquareIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FAQ, type FAQItem } from "@/components/ui/Accordion";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ChapterHeader } from '@/components/ui/ChapterHeader';

// Section Header Component
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-purple-600">
      <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg font-bold text-lg">
        {number}
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
    </div>
  );
}

// Info Box Component
function InfoBox({
  title,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'orange';
  children: React.ReactNode;
}) {
  const colorClasses = {
    blue: { bg: 'bg-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
    green: { bg: 'bg-green-600', light: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
    purple: { bg: 'bg-purple-600', light: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
    orange: { bg: 'bg-orange-600', light: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800' },
  };

  const styles = colorClasses[color];

  return (
    <div className={`rounded-xl border-2 ${styles.border} overflow-hidden`}>
      <div className={`${styles.bg} px-5 py-3 flex items-center gap-3`}>
        <Icon className="w-6 h-6 text-white" />
        <h4 className="font-bold text-white">{title}</h4>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// Profile Card Component
function ProfileCard({
  type,
  content,
  note,
}: {
  type: 'good' | 'bad';
  content: string[];
  note?: string;
}) {
  const isGood = type === 'good';

  return (
    <div className={`rounded-xl border-2 overflow-hidden ${
      isGood ? 'border-green-500' : 'border-red-500'
    }`}>
      <div className={`px-4 py-2 flex items-center gap-2 ${
        isGood ? 'bg-green-500' : 'bg-red-500'
      } text-white`}>
        {isGood ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <XMarkIcon className="w-5 h-5" />
        )}
        <span className="font-bold">{isGood ? '良い例' : '悪い例'}</span>
      </div>
      <div className="p-4 bg-white dark:bg-zinc-800">
        {content.map((line, idx) => (
          <p key={idx} className="text-zinc-700 dark:text-zinc-300 text-sm mb-1 last:mb-0">
            {line}
          </p>
        ))}
        {note && (
          <p className={`text-xs mt-3 ${isGood ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

// Checklist Component
function Checklist({ title, items, icon: Icon }: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggleItem = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const progress = (checked.filter(Boolean).length / items.length) * 100;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-700 px-5 py-3 border-b border-zinc-200 dark:border-zinc-600">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </h4>
          <span className="text-sm text-zinc-500">{checked.filter(Boolean).length}/{items.length}</span>
        </div>
        <div className="h-1.5 bg-zinc-200 dark:bg-zinc-600 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item, idx) => (
          <label
            key={idx}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => toggleItem(idx)}
              className="w-5 h-5 rounded border-zinc-300 text-green-500 focus:ring-green-500 mt-0.5"
            />
            <span className={`text-sm ${checked[idx] ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Theme Distribution Chart
function ThemeDistributionChart() {
  const themes = [
    { name: 'メインテーマ1', percent: 40, color: 'bg-blue-500' },
    { name: 'メインテーマ2', percent: 25, color: 'bg-indigo-500' },
    { name: 'メインテーマ3', percent: 15, color: 'bg-purple-500' },
    { name: 'サブテーマ', percent: 20, color: 'bg-zinc-400' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-700 px-5 py-3 border-b border-zinc-200 dark:border-zinc-600">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ChartPieIcon className="w-5 h-5" />
          推奨テーマ配分
        </h4>
      </div>
      <div className="p-5 space-y-4">
        {themes.map((theme, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">{theme.name}</span>
              <span className="text-zinc-500">{theme.percent}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded h-4 overflow-hidden">
              <div
                className={`${theme.color} h-4 rounded transition-all duration-500`}
                style={{ width: `${theme.percent}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs text-zinc-500 mt-4">
          ※ メインテーマ3つで80%、サブテーマで20%の配分が理想的
        </p>
      </div>
    </div>
  );
}

// Profile Elements
function ProfileElements() {
  const elements = [
    { icon: PhotoIcon, title: 'アイコン画像', desc: '顔写真 or 認識しやすいロゴ' },
    { icon: PhotoIcon, title: 'ヘッダー画像', desc: '専門性やブランドを表現' },
    { icon: PencilSquareIcon, title: '表示名', desc: '覚えやすく、検索されやすい' },
    { icon: AtSymbolIcon, title: 'ユーザー名', desc: 'シンプルで覚えやすい' },
    { icon: DocumentTextIcon, title: '自己紹介文(160字)', desc: '何者か、何を発信するか' },
    { icon: BookmarkSquareIcon, title: '固定ツイート', desc: '最も見せたい投稿' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {elements.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-zinc-800 rounded-xl p-4 border-2 border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h4>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Warning Box
function WarningBox({ items }: { items: string[] }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-2 border-red-300 dark:border-red-800 overflow-hidden">
      <div className="bg-red-500 px-5 py-3 flex items-center gap-3">
        <ExclamationTriangleIcon className="w-6 h-6 text-white" />
        <h4 className="font-bold text-white">避けるべきこと</h4>
      </div>
      <div className="p-5 grid md:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <XMarkIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Data
const faqData: FAQItem[] = [
  {
    question: 'Trust Scoreとは？',
    answer: 'Trust Score（信頼スコア）は、アカウントの信頼性を示す指標です。アカウント年齢、認証状態、プロフィール完成度、通報・ブロック履歴、エンゲージメント品質などから算出されます。'
  },
  {
    question: 'Topical Authorityとは？',
    answer: 'Topical Authority（専門性スコア）は、特定分野における専門性を示す指標です。特定トピックでの継続的な投稿、同分野の専門家からの反応、引用・言及される頻度などから算出されます。'
  },
  {
    question: 'プロフィール最適化のポイントは？',
    answer: '3つのポイント：(1) 何者かを明確に - 肩書き・実績を1行目に、(2) 何を発信するかを明示 - フォローする理由を示す、(3) フォローのメリットを伝える - 具体的な価値提供を約束。'
  },
  {
    question: 'テーマを絞る理由は？',
    answer: 'テーマを絞ることでTopical Authorityが向上し、アルゴリズムから専門家として認識されやすくなります。メインテーマは3つ以内、投稿の80%をメインテーマに集中させましょう。'
  },
  {
    question: '相互作用で避けるべきことは？',
    answer: '避けるべき行為：大量フォロー/アンフォロー、同じ内容の大量リプライ、無関係な投稿への大量いいね、他者を攻撃するリプライ、炎上に乗じた批判、リプライでの無関係な自己宣伝。'
  }
];

// Quiz Data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Xのアルゴリズムがアカウントを評価する2つの軸は？',
    choices: [
      { id: 'A', text: 'フォロワー数とインプレッション数' },
      { id: 'B', text: 'Trust ScoreとTopical Authority' },
      { id: 'C', text: 'エンゲージメント率とリーチ数' },
      { id: 'D', text: '投稿頻度とコンテンツ品質' },
    ],
    correctAnswer: 'B',
    explanation: 'Xのアルゴリズムは「Trust Score（信頼スコア）」と「Topical Authority（専門性スコア）」の2つの軸でアカウントを評価しています。'
  },
  {
    id: 2,
    question: 'メインテーマは何個以内に絞ることが推奨されていますか？',
    choices: [
      { id: 'A', text: '1つ以内' },
      { id: 'B', text: '2つ以内' },
      { id: 'C', text: '3つ以内' },
      { id: 'D', text: '5つ以内' },
    ],
    correctAnswer: 'C',
    explanation: 'メインテーマは3つ以内に絞ることが推奨されています。これにより一貫性が保たれ、Topical Authorityが向上します。'
  },
  {
    id: 3,
    question: '投稿の何%をメインテーマに集中させるべきですか？',
    choices: [
      { id: 'A', text: '50%' },
      { id: 'B', text: '60%' },
      { id: 'C', text: '70%' },
      { id: 'D', text: '80%' },
    ],
    correctAnswer: 'D',
    explanation: '投稿の80%をメインテーマに集中させ、残り20%は関連テーマや日常の投稿に充てることが推奨されています。'
  },
  {
    id: 4,
    question: '自己紹介文の最大文字数は何字ですか？',
    choices: [
      { id: 'A', text: '100字' },
      { id: 'B', text: '140字' },
      { id: 'C', text: '160字' },
      { id: 'D', text: '200字' },
    ],
    correctAnswer: 'C',
    explanation: '自己紹介文は160字以内で、「何者か」「何を発信するか」「フォローのメリット」を簡潔に伝えることが重要です。'
  },
  {
    id: 5,
    question: '固定ツイートの推奨される見直し頻度は？',
    choices: [
      { id: 'A', text: '毎日' },
      { id: 'B', text: '週1回' },
      { id: 'C', text: '月1回' },
      { id: 'D', text: '四半期に1回' },
    ],
    correctAnswer: 'C',
    explanation: '固定ツイートは月1回は見直すことが推奨されています。より良い投稿があれば入れ替え、季節やトレンドに合わせて調整しましょう。'
  }
];

export default function Chapter10() {
  const trustScoreChecklist = [
    'プロフィールを100%完成させる',
    '電話番号・メールアドレスを確認済みにする',
    'プロフィール画像を設定する',
    'ヘッダー画像を設定する',
    '自己紹介文を充実させる',
    '一貫した投稿パターンを維持',
    'ガイドラインを遵守',
    'スパム的行為を避ける'
  ];

  const topicalAuthorityChecklist = [
    'メインテーマを3つ以内に絞る',
    '投稿の80%をメインテーマに集中',
    'プロフィールで専門分野を明示',
    '固定ツイートで専門性をアピール',
    '深い洞察を含む投稿をする',
    '具体的な数字・事例を含める',
    '業界の最新動向にコメント',
    '同分野のアカウントと交流する'
  ];

  const avoidItems = [
    'フォロワー購入',
    'エンゲージメント購入',
    '大量フォロー/アンフォロー',
    '自動化ツールの乱用',
    '複数アカウントでの自作自演'
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <ChapterHeader currentChapter={10} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm font-medium mb-4">
            <UserCircleIcon className="w-4 h-4" />
            第10章
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            アカウント設計とブランディング
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            個々の投稿だけでなく、アカウント全体の評価を高めて拡散力を最大化する
          </p>
        </div>

        {/* Section 10.1 - Introduction */}
        <section className="mb-12">
          <SectionHeader number="10.1" title="アカウント評価の仕組み" />
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-6">
            <p className="mb-4">
              Xのアルゴリズムは、個々の投稿だけでなく、アカウント全体も評価しています。
              同じ内容の投稿でも、アカウントの評価が高ければより多くの人に届きます。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheckIcon className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Trust Score</h3>
                    <p className="text-white/80 text-sm">このアカウントは信頼できるか？</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <StarIcon className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Topical Authority</h3>
                    <p className="text-white/80 text-sm">このアカウントは何の専門家か？</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10.2 - Trust Score */}
        <section className="mb-12">
          <SectionHeader number="10.2" title="Trust Score：信頼スコア" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Trust Score（信頼スコア）は、アカウントの信頼性を示す指標です。
            アカウント属性と行動履歴から総合的に評価されます。
          </p>

          <div className="space-y-6">
            <InfoBox title="Trust Scoreの構成要素" icon={ShieldCheckIcon} color="blue">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">アカウント属性</h5>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      アカウント年齢（古いほど有利）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      認証状態（青バッジ、ゴールドバッジ等）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      プロフィールの完成度
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      連絡先の確認状態
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">行動履歴</h5>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      通報された回数（少ないほど良い）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      ブロックされた回数（少ないほど良い）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      スパム判定を受けた回数
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      アカウント凍結・制限の履歴
                    </li>
                  </ul>
                </div>
              </div>
            </InfoBox>

            <Checklist
              title="Trust Score向上チェックリスト"
              items={trustScoreChecklist}
              icon={ShieldCheckIcon}
            />

            <WarningBox items={avoidItems} />
          </div>
        </section>

        {/* Section 10.3 - Topical Authority */}
        <section className="mb-12">
          <SectionHeader number="10.3" title="Topical Authority：専門性スコア" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Topical Authority（専門性スコア）は、特定分野における専門性を示す指標です。
            テーマを絞り、深い知識を継続的に発信することで向上します。
          </p>

          <div className="space-y-6">
            <InfoBox title="Topical Authorityの構成要素" icon={StarIcon} color="green">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">コンテンツの一貫性</h5>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      特定トピックでの継続的な投稿
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      投稿内容のテーマの統一性
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      専門用語の適切な使用
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      深い知識を示す投稿
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">ネットワーク</h5>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      同分野のアカウントとの相互作用
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      同分野のアカウントからのフォロー
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      関連コミュニティへの参加
                    </li>
                  </ul>
                </div>
              </div>
            </InfoBox>

            <Checklist
              title="Topical Authority向上チェックリスト"
              items={topicalAuthorityChecklist}
              icon={StarIcon}
            />
          </div>
        </section>

        {/* Section 10.4 - Profile Optimization */}
        <section className="mb-12">
          <SectionHeader number="10.4" title="プロフィール最適化" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            プロフィールは「フォローするかどうか」の判断材料です。
            以下の6要素を最適化しましょう。
          </p>

          <ProfileElements />

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <ProfileCard
              type="good"
              content={[
                'SaaSマーケター｜3年で0→ARR10億円を達成',
                'Xで「SaaS成長戦略」を毎日発信中',
                'フォローで明日から使えるグロースハックを'
              ]}
              note="何者か、何を発信するか、フォローのメリットが明確"
            />
            <ProfileCard
              type="bad"
              content={[
                '色々やってます。趣味は読書と映画。',
                '最近ハマってるのはコーヒー',
                'よろしくお願いします！'
              ]}
              note="何者か不明、フォローの理由がない"
            />
          </div>
        </section>

        {/* Section 10.5 - Theme Distribution */}
        <section className="mb-12">
          <SectionHeader number="10.5" title="投稿テーマの配分" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            テーマを絞ることでTopical Authorityが向上します。
            メインテーマ3つで80%、サブテーマで20%の配分が理想的です。
          </p>
          <ThemeDistributionChart />
        </section>

        {/* Section 10.6 - FAQ */}
        <section className="mb-12">
          <SectionHeader number="10.6" title="よくある質問" />
          <FAQ items={faqData} />
        </section>

        {/* Section 10.7 - Quiz */}
        <section className="mb-12">
          <Quiz questions={quizQuestions} />
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-zinc-900 dark:bg-zinc-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white dark:text-zinc-900 mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5" />
              第10章のまとめ
            </h3>
            <ul className="space-y-3">
              {[
                'アカウントは Trust Score と Topical Authority で評価される',
                'Trust Scoreは信頼性：一貫した行動、ガイドライン遵守',
                'Topical Authorityは専門性：テーマを絞り、深い知識を示す',
                'プロフィールはフォロー判断の決め手',
                '一貫性がアルゴリズムに好まれる',
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

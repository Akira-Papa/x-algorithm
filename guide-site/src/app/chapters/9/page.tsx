"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlayIcon,
  ClockIcon,
  SpeakerWaveIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";
import { Quiz, type QuizQuestion } from "@/components/ui/Quiz";
import { FAQ, type FAQItem } from "@/components/ui/Accordion";
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
      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600 text-white text-sm font-bold">
        {number}
      </span>
      {title}
    </h2>
  );
}

// VQV Condition Card Component
function VQVConditionCard({
  number,
  title,
  description,
  details,
  icon: Icon,
  color,
}: {
  number: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  color: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300",
      icon: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-700 dark:text-green-300",
      icon: "text-green-600 dark:text-green-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-300",
      icon: "text-purple-600 dark:text-purple-400",
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`rounded-xl border-2 ${colors.border} overflow-hidden transition-all cursor-pointer hover:shadow-md ${
        isExpanded ? "shadow-lg" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`${colors.bg} p-5`}>
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 flex items-center justify-center border ${colors.border}`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white bg-purple-600 px-2 py-0.5 rounded">
                条件 {number}
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {title}
            </h3>
            <p className={`text-sm ${colors.text}`}>
              {description}
            </p>
          </div>
          <ChevronDownIcon
            className={`w-5 h-5 text-zinc-400 transition-transform flex-shrink-0 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <ul className="space-y-2">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Video Checklist Component
function VideoChecklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(7).fill(false));

  const items = [
    "冒頭1秒で視覚的インパクトがあるか",
    "3秒以内に「何の動画か」わかるか",
    "「音声ONで」の誘導があるか",
    "キャプション(字幕)が入っているか",
    "10秒まで飽きさせない構成か",
    "サムネイルは目を引くか",
    "タイトル・説明文と内容が一致しているか",
  ];

  const toggleItem = (idx: number) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  const progress = (checked.filter(Boolean).length / items.length) * 100;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          動画制作チェックリスト
        </h3>
        <span className="text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
          {checked.filter(Boolean).length}/{items.length}
        </span>
      </div>

      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <label
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
              checked[idx]
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => toggleItem(idx)}
              className="w-5 h-5 rounded border-zinc-300 text-green-500 focus:ring-green-500"
            />
            <span className={`text-sm ${checked[idx] ? "text-green-700 dark:text-green-300 line-through" : "text-zinc-700 dark:text-zinc-300"}`}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function Chapter9Page() {
  const faqItems: FAQItem[] = [
    {
      question: "VQVの3条件とは?",
      answer:
        "VQV(Video Quality View)は3つの条件すべてを満たす必要があります:(1) 最低視聴時間(10秒または動画長の50%の短い方)、(2) 音声がON状態、(3) スクロール通過ではなく意図的な視聴。これらを満たすと1.5倍のスコアボーナスが適用されます。",
    },
    {
      question: "冒頭3秒が重要な理由は?",
      answer:
        "ユーザーはタイムラインを高速でスクロールし、1投稿あたりの判断時間はわずか数秒です。冒頭3秒で「見る/見ない」が決まるため、この時間でスクロールを止め、音声ONにさせ、継続視聴への起点を作る必要があります。",
    },
    {
      question: "10秒の壁を超えるコツは?",
      answer:
        "4つのテクニックが効果的です:(1) テンポの維持(2-3秒ごとにカット変更)、(2) 情報の段階的開示(「さらに」「実は」で展開)、(3) 視覚的な変化(テロップ、図解、アニメーション)、(4) エモーショナルフック(共感、驚き、笑い)。",
    },
    {
      question: "音声ONにさせる方法は?",
      answer:
        "複数のアプローチがあります:動画冒頭にキャプション「音声ONで」、説明文での誘導、BGMや効果音で音があることを示唆、音声でしか得られない情報を入れる。同時に、キャプション(字幕)を必ず入れ、音声OFFでも最低限理解できる設計にすることも重要です。",
    },
    {
      question: "VQV率の目標値は?",
      answer:
        "VQV率(VQV達成視聴数/総視聴数x100)の目標は:最低ライン20%、良好30-40%、優秀40%以上、トップクリエイター50%以上です。40%以上を目指すことで、動画の「質」を示す重要な指標となります。",
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "VQVの最低視聴時間は何秒ですか?",
      choices: [
        { id: "A", text: "5秒" },
        { id: "B", text: "10秒" },
        { id: "C", text: "15秒" },
        { id: "D", text: "30秒" },
      ],
      correctAnswer: "B",
      explanation:
        "VQVの最低視聴時間は10秒、または動画長の50%のいずれか短い方です。",
    },
    {
      id: 2,
      question: "VQVボーナスの倍率はいくつですか?",
      choices: [
        { id: "A", text: "1.2倍" },
        { id: "B", text: "1.3倍" },
        { id: "C", text: "1.5倍" },
        { id: "D", text: "2.0倍" },
      ],
      correctAnswer: "C",
      explanation:
        "VQV条件を満たすと1.5倍(50%増)のスコアボーナスが適用されます。",
    },
    {
      id: 3,
      question: "VQV判定に必要な条件の数は?",
      choices: [
        { id: "A", text: "2つ" },
        { id: "B", text: "3つ" },
        { id: "C", text: "4つ" },
        { id: "D", text: "5つ" },
      ],
      correctAnswer: "B",
      explanation:
        "VQVには3つの条件(最低視聴時間、音声ON、意図的視聴)すべてを満たす必要があります。",
    },
    {
      id: 4,
      question: "VQV率の目標値として「良好」とされるのは?",
      choices: [
        { id: "A", text: "20%" },
        { id: "B", text: "30-40%" },
        { id: "C", text: "50%" },
        { id: "D", text: "60%" },
      ],
      correctAnswer: "B",
      explanation:
        "VQV率30-40%が良好、40%以上が優秀とされています。",
    },
    {
      id: 5,
      question: "動画の冒頭で最も重要な秒数は?",
      choices: [
        { id: "A", text: "1秒" },
        { id: "B", text: "3秒" },
        { id: "C", text: "5秒" },
        { id: "D", text: "10秒" },
      ],
      correctAnswer: "B",
      explanation:
        "冒頭3秒が勝負です。ユーザーは3秒で「見る/見ない」を決定します。",
    },
  ];

  // Timeline data for first 10 seconds
  const timelineData = [
    { time: "0-1秒", title: "アテンションキャッチ", desc: "スクロールを止める視覚的インパクト", color: "bg-red-500" },
    { time: "1-3秒", title: "フック", desc: "動画の内容を示す", color: "bg-orange-500" },
    { time: "3-7秒", title: "価値の深堀り", desc: "具体的なコンテンツへ", color: "bg-yellow-500" },
    { time: "7-10秒", title: "引き込み", desc: "メインコンテンツへの橋渡し", color: "bg-green-500" },
  ];

  // VQV Rate targets
  const vqvTargets = [
    { label: "最低ライン", value: "20%", color: "bg-amber-400" },
    { label: "良好", value: "30-40%", color: "bg-blue-400" },
    { label: "優秀", value: "40%以上", color: "bg-green-500" },
    { label: "トップクリエイター", value: "50%以上", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <ChapterHeader currentChapter={9} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <FilmIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              第9章
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            動画コンテンツとVQV最適化
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            VQV(Video Quality View)を理解し、動画コンテンツで最大1.5倍のスコアボーナスを獲得する方法を学びます。
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 mb-10 border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5" />
            この章で学ぶこと
          </h3>
          <ul className="space-y-2 text-purple-800 dark:text-purple-200">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              VQVの定義と3つの判定条件
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              冒頭3秒の重要性と設計テクニック
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              10秒の壁を超える動画構成
            </li>
          </ul>
        </div>

        {/* Section 9.1 - VQV Definition */}
        <section className="mb-12">
          <SectionHeader number="9.1" title="VQVとは?" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            VQV(Video Quality View)は「質の高い動画視聴」を定義するXの指標です。3つの条件すべてを満たすことで、スコアに1.5倍のボーナスが適用されます。
          </p>

          {/* VQV Stats */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <PlayIcon className="w-8 h-8" />
              <h3 className="text-xl font-bold">Video Quality View</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <p className="text-sm opacity-80 mb-1">ボーナス倍率</p>
                <p className="text-3xl font-black">1.5x</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <p className="text-sm opacity-80 mb-1">必要条件</p>
                <p className="text-3xl font-black">3つ</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <p className="text-sm opacity-80 mb-1">最低視聴時間</p>
                <p className="text-3xl font-black">10秒</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex gap-3">
              <SparklesIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>重要:</strong> VQVを達成すると、通常の視聴と比較してスコアが50%増加します。動画コンテンツで成功するための鍵となる指標です。
              </p>
            </div>
          </div>
        </section>

        {/* Section 9.2 - VQV 3 Conditions */}
        <section className="mb-12">
          <SectionHeader number="9.2" title="VQVの3条件" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            VQVとしてカウントされるには、以下の3つの条件をすべて満たす必要があります。
          </p>

          <div className="space-y-4">
            <VQVConditionCard
              number={1}
              title="最低視聴時間"
              description="10秒 または 動画長の50% のいずれか短い方"
              details={[
                "15秒動画 → 7.5秒(50%)が閾値",
                "30秒動画 → 10秒(固定値)が閾値",
                "5分動画 → 10秒(固定値)が閾値",
                "短い動画ほどハードルが低い",
              ]}
              icon={ClockIcon}
              color="blue"
            />
            <VQVConditionCard
              number={2}
              title="音声ON"
              description="デバイスの音声がON状態であること"
              details={[
                "ミュートでの視聴はVQV対象外",
                "イヤホン使用もOK",
                "自動ミュート再生はNG",
                "キャプション誘導で音声ONを促す",
              ]}
              icon={SpeakerWaveIcon}
              color="green"
            />
            <VQVConditionCard
              number={3}
              title="意図的な視聴"
              description="スクロールで通過していない意図的な視聴"
              details={[
                "タイムライン流し見通過はNG",
                "立ち止まって視聴する必要あり",
                "意図的な視聴行動が必要",
                "自動再生だけではカウントされない",
              ]}
              icon={EyeIcon}
              color="purple"
            />
          </div>
        </section>

        {/* Section 9.3 - VQV Score Visualization */}
        <section className="mb-12">
          <SectionHeader number="9.3" title="VQVスコアボーナス" />

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-600 dark:text-zinc-400">VQVなし</span>
                  <div className="flex items-center gap-3">
                    <div className="w-28 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-zinc-400 rounded-full" />
                    </div>
                    <span className="font-mono text-sm font-bold w-12 text-right">x1.0</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border-2 border-green-500">
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">VQVあり</span>
                  <div className="flex items-center gap-3">
                    <div className="w-28 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
                    </div>
                    <span className="font-mono text-sm font-bold text-green-600 dark:text-green-400 w-12 text-right">x1.5</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                    +50%
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                    スコアアップ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9.4 - First 3 Seconds */}
        <section className="mb-12">
          <SectionHeader number="9.4" title="決定的な最初の3秒" />

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h4 className="font-bold text-red-800 dark:text-red-200">
                なぜ3秒が重要なのか
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">-</span>
                タイムラインは高速でスクロールされる
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">-</span>
                1投稿あたりの判断時間はわずか数秒
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">-</span>
                見る/見ないは3秒で決まる
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">-</span>
                フックできなければスクロールで通過される
              </li>
            </ul>
          </div>

          {/* Hook Patterns */}
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">冒頭3秒のフックパターン</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "ショック/驚き", desc: "「信じられないかもしれませんが...」", example: "ビフォーアフターの劇的な変化" },
              { title: "質問/好奇心", desc: "「〜だと思っていませんか?」", example: "「なぜトップ営業マンは早起きするのか?」" },
              { title: "結論ファースト", desc: "「結論から言うと〜です」", example: "「1ヶ月で10kg痩せました。方法はこれ。」" },
              { title: "ストーリー導入", desc: "「去年の今頃、私は...」", example: "どん底から成功への物語" },
            ].map((pattern, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{pattern.title}</h5>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{pattern.desc}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">例: {pattern.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9.5 - 10 Second Structure */}
        <section className="mb-12">
          <SectionHeader number="9.5" title="10秒の壁を超える" />

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            VQVの最低視聴時間である10秒を達成するための動画構成を学びましょう。
          </p>

          {/* Timeline */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <ClockIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">10秒動画の構成</h3>
            </div>
            <div className="space-y-4">
              {timelineData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-20 text-center py-2 px-3 rounded-lg ${item.color} text-white text-xs font-bold flex-shrink-0`}>
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </span>
                      <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h4 className="font-bold text-green-800 dark:text-green-200">やるべきこと</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  2-3秒ごとにカット変更
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  BGMでリズムを作る
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  情報を段階的に開示
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">-</span>
                  視覚的なバリエーションを加える
                </li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-3">
                <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h4 className="font-bold text-red-800 dark:text-red-200">避けるべきこと</h4>
              </div>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  長いオープニングロゴ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  ゆっくりしたフェードイン
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  挨拶から始める
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  最初の3秒で内容が不明確
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9.6 - KPI Goals */}
        <section className="mb-12">
          <SectionHeader number="9.6" title="動画KPIの目標" />

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* VQV Rate Targets */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChartBarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 className="font-bold text-green-800 dark:text-green-200">VQV率の目標</h4>
              </div>
              <div className="space-y-3">
                {vqvTargets.map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${goal.color}`} />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 flex-1">{goal.label}</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{goal.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other KPIs */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">その他の動画KPI</h4>
              </div>
              <div className="space-y-3">
                {[
                  { label: "完走率", target: "30%以上" },
                  { label: "平均視聴時間", target: "動画長の40%以上" },
                  { label: "音声ON率", target: "50%以上" },
                  { label: "エンゲージメント率", target: "5%以上" },
                ].map((kpi, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{kpi.label}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{kpi.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 9.7 - Checklist */}
        <section className="mb-12">
          <SectionHeader number="9.7" title="制作チェックリスト" />
          <VideoChecklist />
        </section>

        {/* Summary */}
        <section className="mb-12">
          <SectionHeader number="9.8" title="章のまとめ" />

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-4">重要ポイント</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">VQV = 10秒以上 + 音声ON + 意図的視聴 = 1.5倍ボーナス</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">3つの条件すべてを満たす必要がある</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">最初の3秒で見る/見ないが決まる</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">フックパターンを活用してスクロールを止める</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">10秒の壁にはテンポ、視覚、感情が必要</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">2-3秒ごとのカット変更で飽きさせない</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">VQV率40%以上を目指す</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">質の高いコンテンツの指標</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-zinc-200 dark:border-zinc-700">
            <QuestionMarkCircleIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              よくある質問
            </h2>
          </div>
          <FAQ items={faqItems} />
        </section>

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <ChapterNav currentChapter={9} />
      </main>
    </div>
  );
}

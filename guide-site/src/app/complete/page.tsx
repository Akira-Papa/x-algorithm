'use client';

import Link from 'next/link';
import {
  CheckCircleIcon,
  HomeIcon,
  ArrowPathIcon,
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

// Chapter Summary Card
function ChapterCard({
  number,
  title,
  summary,
}: {
  number: number;
  title: string;
  summary: string;
}) {
  return (
    <Link
      href={`/chapters/${number}`}
      className="group bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm font-medium">
          {number}
        </span>
        <div className="min-w-0">
          <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{summary}</p>
        </div>
      </div>
    </Link>
  );
}

// Key Takeaway Card
function TakeawayCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{title}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function CompletePage() {
  const chapters = [
    { number: 1, title: 'アルゴリズム概要', summary: '3層アーキテクチャと設計思想' },
    { number: 2, title: 'エンゲージメント', summary: '19種類の反応と重み付け' },
    { number: 3, title: 'Two-Tower', summary: 'コンテンツ発見の仕組み' },
    { number: 4, title: 'Phoenix ML', summary: 'ランキングを決める機械学習' },
    { number: 5, title: 'スコアリング', summary: '複数スコアラーの掛け算' },
    { number: 6, title: 'フィルター', summary: '12種類のフィルタリング' },
    { number: 7, title: 'IN vs OON', summary: 'フォロワー内外の違い' },
    { number: 8, title: 'タイミング', summary: 'Author Diversityと投稿時間' },
    { number: 9, title: '動画VQV', summary: '動画のQuality View判定' },
    { number: 10, title: 'テンプレート', summary: '5種類の投稿パターン' },
    { number: 11, title: 'ブランディング', summary: 'Trust ScoreとAuthority' },
    { number: 12, title: '継続的改善', summary: 'KPI管理とPDCAサイクル' },
  ];

  const takeaways = [
    {
      title: 'アルゴリズムを理解する',
      description: 'Xのアルゴリズムは「良いコンテンツを届ける」仕組み。その原理を知ることで、戦略的な運用が可能になります。',
      icon: ChartBarIcon,
    },
    {
      title: 'エンゲージメントの質を重視',
      description: 'いいねよりもリプライ、RTよりも引用RT+コメント。深い関与を促すコンテンツが高く評価されます。',
      icon: SparklesIcon,
    },
    {
      title: '一貫性がカギ',
      description: 'テーマを絞り、投稿パターンを維持することで、Trust ScoreとTopical Authorityが向上します。',
      icon: RocketLaunchIcon,
    },
    {
      title: 'データで継続改善',
      description: '感覚ではなくデータに基づいてPDCAを回す。成功パターンを蓄積し、再現性のある戦略を構築しましょう。',
      icon: ArrowPathIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <ChevronLeftIcon className="w-4 h-4" />
            ホームに戻る
          </Link>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">学習完了</span>
          <Link href="/chapters/1" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            第1章から復習
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 完了メッセージ */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
            <CheckBadgeIcon className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            学習完了おめでとうございます
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            全12章のXアルゴリズム完全ガイドを完了しました。<br />
            アルゴリズムの仕組みを理解した上で、価値あるコンテンツを発信していきましょう。
          </p>

          {/* 達成バッジ */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-5 py-3 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">12</div>
              <div className="text-xs text-zinc-500">完了した章</div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-5 py-3 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs text-zinc-500">達成率</div>
            </div>
          </div>
        </section>

        {/* 学んだ内容のまとめ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <BookOpenIcon className="w-6 h-6" />
            学んだ内容のまとめ
          </h2>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">1</span>
                  基礎理解
                </h3>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5">
                  <li>- 3層アーキテクチャ</li>
                  <li>- 19種類のエンゲージメント</li>
                  <li>- Two-Tower検索</li>
                  <li>- Phoenix MLモデル</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">2</span>
                  技術詳解
                </h3>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5">
                  <li>- スコアリングシステム</li>
                  <li>- 12種類のフィルター</li>
                  <li>- IN vs OONの違い</li>
                  <li>- 動画VQVの仕組み</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs">3</span>
                  実践応用
                </h3>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5">
                  <li>- 5種類の投稿テンプレート</li>
                  <li>- アカウント設計</li>
                  <li>- ブランディング</li>
                  <li>- データ分析とPDCA</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 重要なポイント */}
          <div className="grid md:grid-cols-2 gap-4">
            {takeaways.map((takeaway, index) => (
              <TakeawayCard key={index} {...takeaway} />
            ))}
          </div>
        </section>

        {/* 全12章の振り返り */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <AcademicCapIcon className="w-6 h-6" />
            全12章の振り返り
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.number} {...chapter} />
            ))}
          </div>
        </section>

        {/* 次のステップ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <RocketLaunchIcon className="w-6 h-6" />
            次のステップ
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://x.com/compose/post"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <SparklesIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">実践してみる</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">学んだ知識を活かして投稿を改善</p>
            </a>
            <a
              href="https://analytics.x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-5 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                <ChartBarIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">分析を始める</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">X Analyticsでデータを確認</p>
            </a>
            <Link
              href="/chapters/1"
              className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-5 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                <BookOpenIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">復習する</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">苦手な章をもう一度確認</p>
            </Link>
          </div>
        </section>

        {/* 最後のメッセージ */}
        <section className="mb-16">
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-8 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-center">最後に</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed">
              アルゴリズムを理解することは、ゴールではなくスタートです。<br />
              本当に大切なのは、読者に価値を提供し、誠実なコミュニケーションを続け、<br />
              長期的な視点で継続的に改善していくこと。<br /><br />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">あなたのX運用の成功を心から願っています。</span>
            </p>
          </div>
        </section>

        {/* ナビゲーション */}
        <section className="border-t border-zinc-200 dark:border-zinc-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              <span>ホームに戻る</span>
            </Link>
            <Link
              href="/chapters/1"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <span>第1章から復習する</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Xアルゴリズム完全ガイド</p>
          <p className="mt-1">Based on the open-sourced X Recommendation Algorithm</p>
        </div>
      </footer>
    </div>
  );
}

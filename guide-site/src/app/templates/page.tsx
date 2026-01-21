"use client";

import Link from "next/link";
import {
  BookOpenIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  QueueListIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  NewspaperIcon,
  MegaphoneIcon,
  PhotoIcon,
  VideoCameraIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { categories } from "@/lib/templates/categories";
import type { Category } from "@/lib/templates/types";

// アイコンマッピング
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartIcon,
  ArrowPathRoundedSquareIcon,
  QueueListIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BookOpenIcon,
  NewspaperIcon,
  MegaphoneIcon,
  PhotoIcon,
  VideoCameraIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  ClockIcon,
  UserCircleIcon,
};

// カラーマッピング
const colorMap: Record<string, string> = {
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
};

// カラーバッジマッピング
const badgeColorMap: Record<string, string> = {
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
};

export default function TemplatesPage() {
  const categoryCount = categories.length;
  const templateCount = categoryCount * 10;

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpenIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Xアルゴリズム攻略ガイド</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* パンくずリスト */}
      <nav className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-3 text-sm">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ホーム
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">投稿テンプレート</span>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="border-b border-border px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            {/* 装飾ライン */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="text-xs tracking-widest text-muted-foreground">
                STRATEGIC TEMPLATES
              </span>
              <div className="h-px w-12 bg-border" />
            </div>

            {/* タイトル */}
            <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              戦略的投稿テンプレート集
            </h1>

            {/* サブタイトル */}
            <p className="mb-8 text-muted-foreground">
              Xアルゴリズムに最適化された{templateCount}個の実践例
            </p>

            {/* 統計 */}
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {categoryCount}
                </div>
                <div className="text-xs text-muted-foreground">カテゴリ</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {templateCount}
                </div>
                <div className="text-xs text-muted-foreground">テンプレート</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          {/* セクションヘッダー */}
          <div className="mb-8 flex items-center gap-3">
            <DocumentTextIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">カテゴリ一覧</h2>
          </div>

          {/* カテゴリカード一覧 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* 補足情報 */}
          <div className="mt-12 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 text-sm font-semibold">テンプレートの使い方</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              各テンプレートには例文・解説・効果的なポイント・注意点が含まれています。
              自分の発信内容に合わせてカスタマイズしてご利用ください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/chapters/10"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                第10章: 投稿テンプレートを学ぶ
                <ArrowLeftIcon className="h-3 w-3 rotate-180" />
              </Link>
              <Link
                href="/chapters/2"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                エンゲージメント19種類を理解する
                <ArrowLeftIcon className="h-3 w-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-border px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <span>Xアルゴリズム攻略ガイド</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/twitter/the-algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub (公式ソースコード)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] || DocumentTextIcon;
  const colorClass = colorMap[category.color] || colorMap.blue;
  const badgeClass = badgeColorMap[category.color] || badgeColorMap.blue;

  return (
    <Link
      href={`/templates/${category.id}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/30 hover:bg-accent/50 hover:shadow-sm"
    >
      {/* アイコン */}
      <div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${colorClass}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* カテゴリ名 */}
      <h3 className="mb-2 text-base font-semibold group-hover:text-foreground">
        {category.name}
      </h3>

      {/* 説明 */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {category.description}
      </p>

      {/* フッター */}
      <div className="flex items-center justify-between">
        {/* テンプレート数バッジ */}
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
        >
          10テンプレート
        </span>

        {/* 詳細リンク */}
        <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          詳細
          <ArrowLeftIcon className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

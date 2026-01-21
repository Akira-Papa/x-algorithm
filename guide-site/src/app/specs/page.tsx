"use client";

import Link from "next/link";
import {
  BookOpenIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  FunnelIcon,
  BoltIcon,
  ChartBarSquareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const specPages = [
  {
    title: "全体概要",
    description:
      "X推薦アルゴリズムの全体像を解説。For Youタイムラインがどのように構築されるか、主要コンポーネントの役割を理解します。",
    href: "/specs/overview",
    icon: BookOpenIcon,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "アーキテクチャ",
    description:
      "システム全体の設計思想とコンポーネント間の関係性を詳解。データフローとサービス構成を図解します。",
    href: "/specs/architecture",
    icon: CubeTransparentIcon,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Phoenix ML",
    description:
      "機械学習による候補生成の仕組み。SimClusters、TwHIN、ユーザー/ツイート埋め込みなどのMLモデルを解説します。",
    href: "/specs/phoenix-ml",
    icon: CpuChipIcon,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "スコアリング",
    description:
      "ツイートのランキングスコア計算の詳細。Heavy Rankerの仕組み、特徴量、スコア計算式を解説します。",
    href: "/specs/scoring",
    icon: ChartBarSquareIcon,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    title: "フィルタリング",
    description:
      "品質フィルター、セーフティフィルター、スパム検出など、不適切なコンテンツを除外する仕組みを解説します。",
    href: "/specs/filtering",
    icon: FunnelIcon,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    title: "Thunderパイプライン",
    description:
      "リアルタイム処理を実現するThunderパイプラインの構造。高速なツイート処理とキャッシュ戦略を解説します。",
    href: "/specs/thunder-pipeline",
    icon: BoltIcon,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
];

export default function SpecsPage() {
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
          <span className="font-medium">仕様解説</span>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          {/* ページタイトル */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                ホームに戻る
              </Link>
            </div>
            <h1 className="mb-3 text-2xl font-bold md:text-3xl">仕様解説</h1>
            <p className="text-muted-foreground">
              X推薦アルゴリズムの技術仕様をコンポーネントごとに詳しく解説します。
              <br className="hidden sm:block" />
              オープンソースコードに基づいた正確な情報で、システムの内部構造を理解しましょう。
            </p>
          </div>

          {/* カード一覧 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specPages.map((spec) => (
              <SpecCard key={spec.href} {...spec} />
            ))}
          </div>

          {/* 補足情報 */}
          <div className="mt-12 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 text-sm font-semibold">学習の進め方</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              仕様解説は、Xの推薦アルゴリズムの技術的な詳細を理解したい方向けのコンテンツです。
              まずは「全体概要」から始めて、興味のあるコンポーネントを深掘りしていくことをお勧めします。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/chapters/1"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                攻略ガイドを読む
                <ArrowLeftIcon className="h-3 w-3 rotate-180" />
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                用語集を見る
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

function SpecCard({
  title,
  description,
  href,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/30 hover:bg-accent/50 hover:shadow-sm"
    >
      {/* アイコン */}
      <div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* タイトル */}
      <h3 className="mb-2 text-base font-semibold group-hover:text-foreground">
        {title}
      </h3>

      {/* 説明 */}
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* 詳細を見るリンク */}
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        詳細を見る
        <ArrowLeftIcon className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

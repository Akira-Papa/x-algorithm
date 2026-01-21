"use client";

import Link from "next/link";
import {
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CodeBracketIcon,
  BookmarkIcon,
  CpuChipIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { chapters } from "@/lib/chapters";
import { rankingData } from "@/lib/rankings";
import { WebSiteJsonLd } from "@/components/ui/JsonLd";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <WebSiteJsonLd
        name="Xアルゴリズム攻略ガイド"
        url="https://x-algorithm-guide.vercel.app"
        description="X（旧Twitter）の推薦アルゴリズムをオープンソースコードから徹底解析。全12章で仕組みを完全理解。"
      />
      {/* ヘッダー */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-foreground" />
            <span className="text-sm font-medium">Xアルゴリズム攻略ガイド</span>
          </div>
          <a
            href="https://github.com/xai-org/x-algorithm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span>公式コード</span>
          </a>
        </div>
      </header>

      {/* メインビジュアル - 教科書表紙風 */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            {/* 教科書風の装飾ライン */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="text-xs tracking-widest text-muted-foreground">
                TECHNICAL GUIDE
              </span>
              <div className="h-px w-12 bg-border" />
            </div>

            {/* タイトル */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Xアルゴリズム攻略ガイド
            </h1>

            {/* サブタイトル */}
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              オープンソースコードから読み解く
              <br className="sm:hidden" />
              X推薦システムの仕組み
            </p>

            {/* 学習を始めるボタン */}
            <Link
              href="/chapters/1"
              className="inline-flex items-center gap-2 rounded border border-foreground bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              学習を始める
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* このガイドについて */}
      <section className="border-b border-border px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-lg font-semibold">
            このガイドについて
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AboutItem
              icon={<CodeBracketIcon className="h-5 w-5" />}
              title="オープンソース解析"
              description="公開されたソースコードに基づく正確な情報"
            />
            <AboutItem
              icon={<ChartBarIcon className="h-5 w-5" />}
              title="体系的な学習"
              description="基礎から応用まで12章で完全網羅"
            />
            <AboutItem
              icon={<LightBulbIcon className="h-5 w-5" />}
              title="実践的な戦略"
              description="理論を実際の運用に落とし込む方法"
            />
            <AboutItem
              icon={<AcademicCapIcon className="h-5 w-5" />}
              title="理解度チェック"
              description="各章末にFAQとクイズを収録"
            />
          </div>
        </div>
      </section>

      {/* X行動ランキング */}
      <section className="border-b border-border px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <TrophyIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">X行動ランキング↑↓</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* やったほうがいい TOP 10 */}
            <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5 dark:border-green-800 dark:bg-green-950/30">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-green-700 dark:text-green-300">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                  ↑
                </span>
                やったほうがいい TOP 10
              </h3>
              <ol className="space-y-2">
                {rankingData.dos.map((item) => (
                  <li
                    key={item.rank}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-green-200 text-xs font-bold text-green-800 dark:bg-green-800 dark:text-green-200">
                      {item.rank}
                    </span>
                    <span className="text-foreground">{item.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* やってはいけない TOP 10 */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-5 dark:border-red-800 dark:bg-red-950/30">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-red-700 dark:text-red-300">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                  ↓
                </span>
                やってはいけない TOP 10
              </h3>
              <ol className="space-y-2">
                {rankingData.donts.map((item) => (
                  <li
                    key={item.rank}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-red-200 text-xs font-bold text-red-800 dark:bg-red-800 dark:text-red-200">
                      {item.rank}
                    </span>
                    <span className="text-foreground">{item.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 詳しくはこちら */}
          <div className="mt-6 text-center">
            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              詳しくはこちら
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 目次 */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <DocumentTextIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">目次</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                number={chapter.number}
                title={chapter.title}
                description={chapter.description}
                href={`/chapters/${chapter.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 参考資料 */}
      <section className="border-t border-border px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <BookmarkIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">参考資料</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ReferenceItem
              icon={<BookOpenIcon className="h-5 w-5" />}
              title="用語集"
              description="Xアルゴリズムで使われる専門用語の解説"
              href="/glossary"
            />
            <ReferenceItem
              icon={<CpuChipIcon className="h-5 w-5" />}
              title="技術仕様"
              description="アルゴリズムの詳細な技術仕様とパラメータ"
              href="/specs"
            />
          </div>
        </div>
      </section>

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

function AboutItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-3 inline-flex rounded-full border border-border p-2.5 text-muted-foreground">
        {icon}
      </div>
      <h3 className="mb-1 text-sm font-medium">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function ChapterItem({
  number,
  title,
  description,
  href,
}: {
  number: number;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex gap-4 rounded border border-border bg-card p-4 transition-colors hover:border-foreground/30 hover:bg-accent/50"
    >
      {/* 章番号 */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-muted text-sm font-bold text-muted-foreground">
        {number.toString().padStart(2, "0")}
      </div>

      {/* 章の内容 */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-sm font-medium leading-tight">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}

function ReferenceItem({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex gap-4 rounded border border-border bg-card p-4 transition-colors hover:border-foreground/30 hover:bg-accent/50"
    >
      {/* アイコン */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
        {icon}
      </div>

      {/* コンテンツ */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-sm font-medium leading-tight">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}

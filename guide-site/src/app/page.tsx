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

"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ChapterNavigation {
  prev?: {
    href: string;
    title: string;
  };
  next?: {
    href: string;
    title: string;
  };
}

interface ChapterLayoutProps {
  title: string;
  description?: string;
  readingTime?: string;
  chapter?: number;
  totalChapters?: number;
  navigation?: ChapterNavigation;
  children: React.ReactNode;
  className?: string;
}

export function ChapterLayout({
  title,
  description,
  readingTime,
  chapter,
  totalChapters,
  navigation,
  children,
  className,
}: ChapterLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {chapter && totalChapters && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                第{chapter}章 / 全{totalChapters}章
              </span>
            )}
            {readingTime && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4" />
                {readingTime}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="h-5 w-5 text-primary" />
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              X アルゴリズム ガイド
            </Link>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Chapter Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </article>

        {/* Navigation */}
        {navigation && (navigation.prev || navigation.next) && (
          <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
            {navigation.prev ? (
              <Link
                href={navigation.prev.href}
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="block text-xs uppercase tracking-wider">
                    前へ
                  </span>
                  <span className="text-foreground">{navigation.prev.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {navigation.next ? (
              <Link
                href={navigation.next.href}
                className="group flex items-center gap-2 text-right text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <div>
                  <span className="block text-xs uppercase tracking-wider">
                    次へ
                  </span>
                  <span className="text-foreground">{navigation.next.title}</span>
                </div>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              X レコメンドアルゴリズム - オープンソース ドキュメント
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ホーム
              </Link>
              <Link
                href="/chapters/1"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                はじめる
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Content Section Component
interface ContentSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ title, children, className }: ContentSectionProps) {
  return (
    <section className={cn("mb-12", className)}>
      {title && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      )}
      {children}
    </section>
  );
}

// Info Box Component
interface InfoBoxProps {
  type?: "info" | "warning" | "tip" | "note";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoBox({ type = "info", title, children, className }: InfoBoxProps) {
  const styles = {
    info: "border-blue-500/50 bg-blue-50 dark:bg-blue-900/20",
    warning: "border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/20",
    tip: "border-green-500/50 bg-green-50 dark:bg-green-900/20",
    note: "border-purple-500/50 bg-purple-50 dark:bg-purple-900/20",
  };

  const defaultTitles = {
    info: "情報",
    warning: "警告",
    tip: "ヒント",
    note: "注意",
  };

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        styles[type],
        className
      )}
    >
      <p className="font-semibold mb-2">{title || defaultTitles[type]}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

// Code Block Component
interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ language, filename, children, className }: CodeBlockProps) {
  return (
    <div className={cn("my-6 overflow-hidden rounded-lg border border-border", className)}>
      {(language || filename) && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2 text-xs">
          {filename && <span className="font-medium">{filename}</span>}
          {language && (
            <span className="ml-auto rounded bg-muted px-2 py-0.5 text-muted-foreground">
              {language}
            </span>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// 章データ
const chapters = [
  { id: 1, title: "全体像と思想" },
  { id: 2, title: "エンゲージメント19種類" },
  { id: 3, title: "Two-Tower検索" },
  { id: 4, title: "Phoenix MLモデル" },
  { id: 5, title: "スコアリングシステム" },
  { id: 6, title: "12種類のフィルター" },
  { id: 7, title: "IN vs OON" },
  { id: 8, title: "著者多様性と投稿タイミング" },
  { id: 9, title: "動画コンテンツとVQV" },
  { id: 10, title: "投稿テンプレート" },
  { id: 11, title: "アカウント設計とブランディング" },
  { id: 12, title: "データ分析と継続的改善" },
];

interface ChapterNavProps {
  currentChapter: number;
  totalChapters?: number;
  className?: string;
}

export function ChapterNav({
  currentChapter,
  totalChapters = 12,
  className,
}: ChapterNavProps) {
  const prevChapter =
    currentChapter > 1 ? chapters.find((c) => c.id === currentChapter - 1) : null;
  const nextChapter =
    currentChapter < totalChapters
      ? chapters.find((c) => c.id === currentChapter + 1)
      : null;

  return (
    <nav
      className={cn(
        "flex items-center justify-between py-6 border-t border-border",
        className
      )}
      aria-label="章ナビゲーション"
    >
      {prevChapter ? (
        <Link
          href={`/chapters/${prevChapter.id}`}
          className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <div className="text-sm">
            <span className="block text-xs text-muted-foreground">前の章</span>
            <span className="text-foreground font-medium">
              第{prevChapter.id}章 {prevChapter.title}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextChapter ? (
        <Link
          href={`/chapters/${nextChapter.id}`}
          className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div className="text-sm">
            <span className="block text-xs text-muted-foreground">次の章</span>
            <span className="text-foreground font-medium">
              第{nextChapter.id}章 {nextChapter.title}
            </span>
          </div>
          <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link
          href="/complete"
          className="group flex items-center gap-3 text-primary hover:text-primary/80 transition-colors text-right"
        >
          <div className="text-sm">
            <span className="block text-xs">おめでとうございます！</span>
            <span className="font-medium">学習完了ページへ</span>
          </div>
          <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}

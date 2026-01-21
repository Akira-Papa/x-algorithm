"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ChapterHeaderProps {
  currentChapter: number;
  totalChapters?: number;
}

export function ChapterHeader({
  currentChapter,
  totalChapters = 12,
}: ChapterHeaderProps) {
  const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
  const nextChapter = currentChapter < totalChapters ? currentChapter + 1 : null;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-6 pr-16 lg:px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>目次</span>
        </Link>
        <span className="text-sm font-medium text-primary dark:text-blue-300">
          第{currentChapter}章
        </span>
        {nextChapter ? (
          <Link
            href={`/chapters/${nextChapter}`}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <span>第{nextChapter}章</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/complete"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <span>完了</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        )}
      </div>
    </header>
  );
}

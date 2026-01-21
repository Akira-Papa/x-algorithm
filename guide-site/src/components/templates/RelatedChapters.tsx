import Link from "next/link";
import { BookOpenIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { chapters, type Chapter } from "@/lib/chapters";
import { cn } from "@/lib/utils";

interface RelatedChaptersProps {
  /** 関連する章番号の配列 */
  chapterNumbers: number[];
  /** 追加のクラス名 */
  className?: string;
  /** タイトル（オプション） */
  title?: string;
}

/**
 * 関連章リンク
 * - 関連する章番号を受け取り、リンク表示
 * - chapters配列のデータを使用
 */
export function RelatedChapters({
  chapterNumbers,
  className,
  title = "関連する章",
}: RelatedChaptersProps) {
  // 章番号から章データを取得
  const relatedChapters: Chapter[] = chapterNumbers
    .map((num) => chapters.find((ch) => ch.number === num))
    .filter((ch): ch is Chapter => ch !== undefined);

  if (relatedChapters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/40 border-b border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
            {title}
          </span>
        </div>
      </div>

      {/* Chapter Links */}
      <div className="p-4 space-y-2">
        {relatedChapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapters/${chapter.id}`}
            className="group flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-zinc-800 border border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{chapter.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                第{chapter.number}章: {chapter.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                {chapter.description}
              </p>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}

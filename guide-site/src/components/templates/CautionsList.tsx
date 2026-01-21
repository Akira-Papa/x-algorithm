import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

interface CautionsListProps {
  /** 注意点の配列 */
  cautions: string[];
  /** 追加のクラス名 */
  className?: string;
  /** タイトル（オプション） */
  title?: string;
}

/**
 * 注意点リスト
 * - 警告アイコン付きリスト
 * - 黄色/オレンジのアクセント
 */
export function CautionsList({ cautions, className, title = "注意点" }: CautionsListProps) {
  if (cautions.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-amber-100 dark:bg-amber-900/40 border-b border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-bold text-amber-800 dark:text-amber-200">
            {title}
          </span>
        </div>
      </div>

      {/* Cautions List */}
      <ul className="p-4 space-y-3">
        {cautions.map((caution, index) => (
          <li key={index} className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {caution}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

interface PointsListProps {
  /** ポイントの配列 */
  points: string[];
  /** 追加のクラス名 */
  className?: string;
  /** タイトル（オプション） */
  title?: string;
}

/**
 * ポイントリスト
 * - チェックマークアイコン付きリスト
 * - 緑色のアクセント
 */
export function PointsList({ points, className, title = "ポイント" }: PointsListProps) {
  if (points.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-green-100 dark:bg-green-900/40 border-b border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-bold text-green-800 dark:text-green-200">
            {title}
          </span>
        </div>
      </div>

      {/* Points List */}
      <ul className="p-4 space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

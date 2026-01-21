"use client";

import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { EngagementLevel, EngagementExpectation } from "@/lib/templates/types";

/** エンゲージメントタイプ */
type EngagementType = keyof EngagementExpectation;

/** エンゲージメントアイコンのマッピング */
const ENGAGEMENT_ICONS: Record<EngagementType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  likes: HeartIcon,
  replies: ChatBubbleOvalLeftIcon,
  reposts: ArrowPathRoundedSquareIcon,
  bookmarks: BookmarkIcon,
};

/** エンゲージメントラベルのマッピング */
const ENGAGEMENT_LABELS: Record<EngagementType, string> = {
  likes: "いいね",
  replies: "リプライ",
  reposts: "リポスト",
  bookmarks: "ブックマーク",
};

/** レベルを●○で表示 */
function LevelDots({ level }: { level: EngagementLevel }) {
  const filledCount = level === "low" ? 1 : level === "medium" ? 2 : 3;

  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            i < filledCount
              ? "bg-current"
              : "bg-current opacity-20"
          )}
        />
      ))}
    </span>
  );
}

interface EngagementItemProps {
  /** エンゲージメントタイプ */
  type: EngagementType;
  /** レベル */
  level: EngagementLevel;
  /** サイズ */
  size?: "sm" | "md" | "lg";
  /** ラベルを表示するか */
  showLabel?: boolean;
  /** ツールチップを表示するか */
  showTooltip?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

export function EngagementItem({
  type,
  level,
  size = "md",
  showLabel = false,
  className,
}: EngagementItemProps) {
  const Icon = ENGAGEMENT_ICONS[type];
  const label = ENGAGEMENT_LABELS[type];

  const colorClasses: Record<EngagementLevel, string> = {
    low: "text-slate-400 dark:text-slate-500",
    medium: "text-amber-500 dark:text-amber-400",
    high: "text-emerald-500 dark:text-emerald-400",
  };

  const iconSizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        colorClasses[level],
        className
      )}
      title={`${label}: ${level === "low" ? "低" : level === "medium" ? "中" : "高"}`}
    >
      <Icon className={cn(iconSizeClasses[size], "flex-shrink-0")} />
      <LevelDots level={level} />
      {showLabel && (
        <span className={cn(textSizeClasses[size], "ml-0.5")}>{label}</span>
      )}
    </div>
  );
}

interface EngagementIndicatorProps {
  /** エンゲージメント期待値 */
  engagement: EngagementExpectation;
  /** サイズ */
  size?: "sm" | "md" | "lg";
  /** 表示するエンゲージメントタイプ（指定なしで全て） */
  types?: EngagementType[];
  /** ラベルを表示するか */
  showLabels?: boolean;
  /** レイアウト */
  layout?: "horizontal" | "vertical" | "grid";
  /** 追加のクラス名 */
  className?: string;
}

export function EngagementIndicator({
  engagement,
  size = "md",
  types = ["likes", "replies", "reposts", "bookmarks"],
  showLabels = false,
  layout = "horizontal",
  className,
}: EngagementIndicatorProps) {
  const layoutClasses = {
    horizontal: "flex flex-wrap items-center gap-3",
    vertical: "flex flex-col gap-2",
    grid: "grid grid-cols-2 gap-2",
  };

  return (
    <div className={cn(layoutClasses[layout], className)}>
      {types.map((type) => (
        <EngagementItem
          key={type}
          type={type}
          level={engagement[type]}
          size={size}
          showLabel={showLabels}
        />
      ))}
    </div>
  );
}

/** コンパクトなサマリー表示 */
interface EngagementSummaryProps {
  /** エンゲージメント期待値 */
  engagement: EngagementExpectation;
  /** 追加のクラス名 */
  className?: string;
}

export function EngagementSummary({ engagement, className }: EngagementSummaryProps) {
  // 総合スコアを計算（high=3, medium=2, low=1）
  const scoreMap: Record<EngagementLevel, number> = { low: 1, medium: 2, high: 3 };
  const totalScore =
    scoreMap[engagement.likes] +
    scoreMap[engagement.replies] +
    scoreMap[engagement.reposts] +
    scoreMap[engagement.bookmarks];

  // 最大スコアは12（全てhigh）
  const percentage = Math.round((totalScore / 12) * 100);

  const getColorClass = () => {
    if (percentage >= 75) return "text-emerald-500 dark:text-emerald-400";
    if (percentage >= 50) return "text-amber-500 dark:text-amber-400";
    return "text-slate-400 dark:text-slate-500";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", getColorClass().replace("text-", "bg-"))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={cn("text-xs font-medium", getColorClass())}>
        {percentage}%
      </span>
    </div>
  );
}

export { ENGAGEMENT_ICONS, ENGAGEMENT_LABELS };
export type { EngagementType };

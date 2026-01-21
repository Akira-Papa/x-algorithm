"use client";

import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/templates/types";
import { DIFFICULTY_LABELS } from "@/lib/templates/types";

/** 難易度カラーのマッピング */
const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; text: string; border: string }> = {
  beginner: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-300 dark:border-green-700",
  },
  intermediate: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-300 dark:border-yellow-700",
  },
  advanced: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
  },
};

/** 難易度アイコン（星で表現） */
const DIFFICULTY_STARS: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

interface DifficultyBadgeProps {
  /** 難易度 */
  difficulty: Difficulty;
  /** サイズ */
  size?: "sm" | "md" | "lg";
  /** 星を表示するか */
  showStars?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

export function DifficultyBadge({
  difficulty,
  size = "md",
  showStars = false,
  className,
}: DifficultyBadgeProps) {
  const colors = DIFFICULTY_COLORS[difficulty];
  const label = DIFFICULTY_LABELS[difficulty];
  const starCount = DIFFICULTY_STARS[difficulty];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-base gap-2",
  };

  const starSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
        className
      )}
    >
      {showStars && (
        <span className={cn("flex", starSizeClasses[size])}>
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              className={cn(
                i < starCount ? "opacity-100" : "opacity-30"
              )}
            >
              ★
            </span>
          ))}
        </span>
      )}
      <span>{label}</span>
    </span>
  );
}

export { DIFFICULTY_COLORS, DIFFICULTY_STARS };

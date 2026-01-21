"use client";

import {
  HeartIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PhotoIcon,
  VideoCameraIcon,
  MegaphoneIcon,
  UserGroupIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { CategoryId, Category } from "@/lib/templates/types";

/** カテゴリアイコンのマッピング */
const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  engagement: HeartIcon,
  viral: FireIcon,
  thread: ChatBubbleLeftRightIcon,
  question: QuestionMarkCircleIcon,
  value: LightBulbIcon,
  story: BookOpenIcon,
  news: NewspaperIcon,
  opinion: ChatBubbleOvalLeftEllipsisIcon,
  visual: PhotoIcon,
  video: VideoCameraIcon,
  cta: MegaphoneIcon,
  community: UserGroupIcon,
  timing: ClockIcon,
  personal: UserIcon,
};

/** カテゴリカラーのマッピング（Tailwindクラス） */
const CATEGORY_COLORS: Record<CategoryId, { bg: string; text: string; border: string }> = {
  engagement: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-800",
  },
  viral: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
  thread: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  question: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  value: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  story: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  news: {
    bg: "bg-slate-100 dark:bg-slate-900/30",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-800",
  },
  opinion: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  visual: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  video: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
  },
  cta: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
  },
  community: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800",
  },
  timing: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-200 dark:border-sky-800",
  },
  personal: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800",
  },
};

/** カテゴリ名のマッピング */
const CATEGORY_NAMES: Record<CategoryId, string> = {
  engagement: "エンゲージメント",
  viral: "バイラル",
  thread: "スレッド",
  question: "質問",
  value: "価値提供",
  story: "ストーリー",
  news: "ニュース",
  opinion: "意見",
  visual: "ビジュアル",
  video: "動画",
  cta: "CTA",
  community: "コミュニティ",
  timing: "タイミング",
  personal: "パーソナル",
};

interface CategoryBadgeProps {
  /** カテゴリID */
  categoryId: CategoryId;
  /** カテゴリオブジェクト（指定時はこちらを優先） */
  category?: Category;
  /** サイズ */
  size?: "sm" | "md" | "lg";
  /** アイコンを表示するか */
  showIcon?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

export function CategoryBadge({
  categoryId,
  category,
  size = "md",
  showIcon = true,
  className,
}: CategoryBadgeProps) {
  const Icon = CATEGORY_ICONS[categoryId];
  const colors = CATEGORY_COLORS[categoryId];
  const name = category?.name ?? CATEGORY_NAMES[categoryId];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-base gap-2",
  };

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
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
      {showIcon && Icon && (
        <Icon className={cn(iconSizeClasses[size], "flex-shrink-0")} />
      )}
      <span>{name}</span>
    </span>
  );
}

export { CATEGORY_ICONS, CATEGORY_COLORS, CATEGORY_NAMES };

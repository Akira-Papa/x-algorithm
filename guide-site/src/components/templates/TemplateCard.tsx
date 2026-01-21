"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { Template } from "@/lib/templates/types";
import { CategoryBadge } from "./CategoryBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import { EngagementIndicator, EngagementSummary } from "./EngagementIndicator";

interface TemplateCardProps {
  /** テンプレートデータ */
  template: Template;
  /** カードのバリアント */
  variant?: "default" | "compact" | "featured";
  /** エンゲージメント表示モード */
  engagementDisplay?: "icons" | "summary" | "none";
  /** 追加のクラス名 */
  className?: string;
}

export function TemplateCard({
  template,
  variant = "default",
  engagementDisplay = "icons",
  className,
}: TemplateCardProps) {
  const href = `/templates/${template.category}/${template.id}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-4 rounded-lg border border-border bg-card p-4",
          "transition-all duration-200",
          "hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm",
          className
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CategoryBadge categoryId={template.category} size="sm" />
            <DifficultyBadge difficulty={template.difficulty} size="sm" />
          </div>
          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {template.title}
          </h3>
        </div>
        <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex flex-col rounded-xl border-2 border-primary/20 bg-gradient-to-br from-card to-accent/30 p-6",
          "transition-all duration-300",
          "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
          className
        )}
      >
        {/* Featured badge */}
        <div className="absolute -top-2 -right-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          Featured
        </div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge categoryId={template.category} size="md" />
            <DifficultyBadge difficulty={template.difficulty} size="md" showStars />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {template.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Effects preview */}
        {template.effects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {template.effects.slice(0, 3).map((effect, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {effect}
              </span>
            ))}
            {template.effects.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                +{template.effects.length - 3}
              </span>
            )}
          </div>
        )}

        {engagementDisplay !== "none" && (
          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">期待エンゲージメント</p>
            {engagementDisplay === "icons" ? (
              <EngagementIndicator engagement={template.expectedEngagement} size="sm" />
            ) : (
              <EngagementSummary engagement={template.expectedEngagement} />
            )}
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            詳細を見る
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-card p-5",
        "transition-all duration-200",
        "hover:border-primary/50 hover:bg-accent/30 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge categoryId={template.category} size="sm" />
          <DifficultyBadge difficulty={template.difficulty} size="sm" showStars />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {template.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
        {template.description}
      </p>

      {engagementDisplay !== "none" && (
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">期待エンゲージメント</p>
          {engagementDisplay === "icons" ? (
            <EngagementIndicator engagement={template.expectedEngagement} size="sm" />
          ) : (
            <EngagementSummary engagement={template.expectedEngagement} />
          )}
        </div>
      )}

      <div className="flex items-center justify-end mt-4">
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary group-hover:gap-2 transition-all">
          詳細
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/** テンプレートカードグリッド */
interface TemplateCardGridProps {
  /** テンプレートリスト */
  templates: Template[];
  /** カードのバリアント */
  variant?: "default" | "compact" | "featured";
  /** エンゲージメント表示モード */
  engagementDisplay?: "icons" | "summary" | "none";
  /** グリッドの列数 */
  columns?: 1 | 2 | 3 | 4;
  /** 追加のクラス名 */
  className?: string;
}

export function TemplateCardGrid({
  templates,
  variant = "default",
  engagementDisplay = "icons",
  columns = 3,
  className,
}: TemplateCardGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          variant={variant}
          engagementDisplay={engagementDisplay}
        />
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { Template, EngagementExpectation } from "@/lib/templates/types";
import { CategoryBadge } from "./CategoryBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import { EngagementItem, type EngagementType } from "./EngagementIndicator";

interface TemplateListItemProps {
  /** テンプレートデータ */
  template: Template;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * 高エンゲージメントのタイプのみを抽出
 */
function getHighEngagementTypes(engagement: EngagementExpectation): EngagementType[] {
  const types: EngagementType[] = [];
  if (engagement.likes === "high") types.push("likes");
  if (engagement.replies === "high") types.push("replies");
  if (engagement.reposts === "high") types.push("reposts");
  if (engagement.bookmarks === "high") types.push("bookmarks");
  return types;
}

export function TemplateListItem({ template, className }: TemplateListItemProps) {
  const href = `/templates/${template.category}/${template.id}`;
  const highEngagementTypes = getHighEngagementTypes(template.expectedEngagement);

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3",
        "transition-all duration-200",
        "hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm",
        className
      )}
    >
      {/* Category Badge */}
      <div className="flex-shrink-0">
        <CategoryBadge categoryId={template.category} size="sm" />
      </div>

      {/* Title and Description */}
      <div className="flex-1 min-w-0">
        <Link
          href={href}
          className="font-medium text-foreground group-hover:text-primary transition-colors block truncate"
        >
          {template.title}
        </Link>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {template.description}
        </p>
      </div>

      {/* Difficulty Badge */}
      <div className="flex-shrink-0 hidden sm:block">
        <DifficultyBadge difficulty={template.difficulty} size="sm" />
      </div>

      {/* High Engagement Indicators */}
      {highEngagementTypes.length > 0 && (
        <div className="flex-shrink-0 hidden md:flex items-center gap-2">
          {highEngagementTypes.map((type) => (
            <EngagementItem
              key={type}
              type={type}
              level="high"
              size="sm"
            />
          ))}
        </div>
      )}

      {/* Detail Link Button */}
      <Link
        href={href}
        className={cn(
          "flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-md",
          "text-sm font-medium text-muted-foreground",
          "border border-border bg-background",
          "transition-all duration-200",
          "hover:border-primary hover:text-primary hover:bg-primary/5",
          "group-hover:border-primary/50"
        )}
      >
        詳細
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

/** テンプレートリストアイテムのリスト */
interface TemplateListProps {
  /** テンプレートリスト */
  templates: Template[];
  /** 追加のクラス名 */
  className?: string;
}

export function TemplateList({ templates, className }: TemplateListProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {templates.map((template) => (
        <TemplateListItem key={template.id} template={template} />
      ))}
    </div>
  );
}

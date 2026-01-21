import Link from "next/link";
import { DocumentTextIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// テンプレートデータの型定義
export interface Template {
  id: string;
  number: number;
  title: string;
  target: string;
  weight: string;
  description: string;
  color: string;
}

// テンプレートカラーのマッピング
const templateColors: Record<string, { bg: string; text: string; border: string }> = {
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-800",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
};

// テンプレートカラーのアクセントマッピング
const templateAccentColors: Record<string, string> = {
  purple: "bg-purple-600 dark:bg-purple-500",
  blue: "bg-blue-600 dark:bg-blue-500",
  pink: "bg-pink-600 dark:bg-pink-500",
  orange: "bg-orange-600 dark:bg-orange-500",
  green: "bg-green-600 dark:bg-green-500",
};

interface RelatedTemplatesProps {
  /** 関連テンプレートの配列 */
  templates: Template[];
  /** 追加のクラス名 */
  className?: string;
  /** タイトル（オプション） */
  title?: string;
  /** 最大表示件数（デフォルト: 3） */
  maxItems?: number;
  /** テンプレート詳細ページへのベースURL（オプション） */
  baseUrl?: string;
}

/**
 * 関連テンプレート
 * - 関連テンプレートIDを受け取り、カード形式で表示
 * - 最大3件表示
 */
export function RelatedTemplates({
  templates,
  className,
  title = "関連テンプレート",
  maxItems = 3,
  baseUrl = "/chapters/10",
}: RelatedTemplatesProps) {
  // 最大件数で制限
  const displayTemplates = templates.slice(0, maxItems);

  if (displayTemplates.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {title}
          </span>
        </div>
      </div>

      {/* Template Cards */}
      <div className="p-4 space-y-3">
        {displayTemplates.map((template) => {
          const colors = templateColors[template.color] || templateColors.blue;
          const accentColor = templateAccentColors[template.color] || templateAccentColors.blue;

          return (
            <Link
              key={template.id}
              href={`${baseUrl}#template-${template.number}`}
              className={cn(
                "group block p-4 rounded-lg border transition-all duration-200",
                colors.border,
                "hover:shadow-md hover:border-opacity-80"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Template Number Badge */}
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                    accentColor
                  )}
                >
                  <span className="text-sm font-bold text-white">{template.number}</span>
                </div>

                {/* Template Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {template.title}
                    </h4>
                    <span
                      className={cn(
                        "flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded",
                        colors.bg,
                        colors.text
                      )}
                    >
                      {template.target}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      重み: {template.weight}
                    </span>
                    <ArrowRightIcon className="w-3 h-3 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* More Link */}
        {templates.length > maxItems && (
          <Link
            href={baseUrl}
            className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            他{templates.length - maxItems}件のテンプレートを見る
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

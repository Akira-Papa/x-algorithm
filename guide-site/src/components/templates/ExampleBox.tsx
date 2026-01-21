"use client";

import { useState, useCallback } from "react";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ExampleBoxProps {
  /** 表示する例文 */
  example: string;
  /** 追加のクラス名 */
  className?: string;
  /** ラベルテキスト（オプション） */
  label?: string;
}

/**
 * 例文表示ボックス
 * - 例文を大きく表示
 * - コピーボタン付き（クリックでクリップボードにコピー）
 * - コピー成功時にフィードバック表示
 */
export function ExampleBox({ example, className, label = "例文" }: ExampleBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(example);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  }, [example]);

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {label}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
            copied
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
          )}
          aria-label={copied ? "コピーしました" : "例文をコピー"}
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>コピーしました</span>
            </>
          ) : (
            <>
              <DocumentDuplicateIcon className="w-4 h-4" />
              <span>コピー</span>
            </>
          )}
        </button>
      </div>

      {/* Example Content */}
      <div className="p-5">
        <p className="text-base text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
          {example}
        </p>
      </div>
    </div>
  );
}

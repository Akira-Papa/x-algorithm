"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  CheckCircleIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
}

interface SidebarProps {
  chapters: Chapter[];
}

interface SidebarContentProps {
  chapters: Chapter[];
  pathname: string;
  setIsMobileMenuOpen: (open: boolean) => void;
}

function SidebarContent({
  chapters,
  pathname,
  setIsMobileMenuOpen,
}: SidebarContentProps) {
  const isActive = (path: string) => pathname === path;
  const isChapterActive = (chapterId: string) =>
    pathname === `/chapters/${chapterId}`;

  return (
    <div className="flex h-full flex-col bg-sidebar-bg">
      {/* ヘッダー - 教科書タイトル風 */}
      <div className="border-b-2 border-sidebar-border px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <BookOpenIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">
              Xアルゴリズム
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">攻略ガイド</p>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll">
        {/* ホームリンク */}
        <div className="px-3 pt-4 pb-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              isActive("/")
                ? "bg-info text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HomeIcon className="h-5 w-5 flex-shrink-0" />
            <span>ホーム</span>
          </Link>
        </div>

        {/* ガイドセクション */}
        <div className="px-3 pb-4">
          <div className="mb-3 flex items-center gap-2 px-3">
            <AcademicCapIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider">
              ガイド
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 章一覧 - 教科書スタイル */}
          <div className="space-y-1">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className={cn(
                  "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                  isChapterActive(chapter.id)
                    ? "bg-info"
                    : "hover:bg-secondary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* 章番号バッジ */}
                <span
                  className={cn(
                    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-xs font-bold transition-colors",
                    isChapterActive(chapter.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
                  )}
                >
                  {chapter.number}
                </span>
                {/* 章タイトル */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <span
                    className={cn(
                      "block text-sm leading-tight transition-colors",
                      isChapterActive(chapter.id)
                        ? "font-medium text-primary"
                        : "text-foreground group-hover:text-foreground"
                    )}
                  >
                    {chapter.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 完了ページリンク */}
          <div className="mt-2">
            <Link
              href="/complete"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/complete")
                  ? "bg-success text-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CheckCircleIcon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive("/complete") ? "text-success-border" : ""
                )}
              />
              <span>学習完了</span>
            </Link>
          </div>
        </div>

        {/* 技術仕様セクション */}
        <div className="px-3 pb-4">
          <div className="mb-3 flex items-center gap-2 px-3">
            <CpuChipIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider">
              技術仕様
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-1">
            <Link
              href="/specs"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">仕様一覧</span>
            </Link>
            <Link
              href="/specs/overview"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs/overview")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">概要</span>
            </Link>
            <Link
              href="/specs/architecture"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs/architecture")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">アーキテクチャ</span>
            </Link>
            <Link
              href="/specs/phoenix-ml"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs/phoenix-ml")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">Phoenix ML</span>
            </Link>
            <Link
              href="/specs/scoring"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs/scoring")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">スコアリング</span>
            </Link>
            <Link
              href="/specs/filtering"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs/filtering")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">フィルタリング</span>
            </Link>
            <Link
              href="/specs/thunder-pipeline"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/specs/thunder-pipeline")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="ml-1">Thunder Pipeline</span>
            </Link>
          </div>
        </div>

        {/* 用語集セクション */}
        <div className="px-3 pb-4">
          <div className="mb-3 flex items-center gap-2 px-3">
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider">
              用語集
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            href="/glossary"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              isActive("/glossary")
                ? "bg-info text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="ml-1">用語一覧</span>
          </Link>
        </div>
      </nav>

      {/* フッター */}
      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs text-muted-foreground text-center">
          全12章 | オープンソース解析
        </p>
      </div>
    </div>
  );
}

export function Sidebar({ chapters }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-md border border-border lg:hidden"
        aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Bars3Icon className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {/* モバイルオーバーレイ */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* モバイルサイドバー */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          chapters={chapters}
          pathname={pathname}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </aside>

      {/* デスクトップサイドバー */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-sidebar-border lg:shadow-sm">
        <SidebarContent
          chapters={chapters}
          pathname={pathname}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </aside>
    </>
  );
}

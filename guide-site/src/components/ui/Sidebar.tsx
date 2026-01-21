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
  ChevronLeftIcon,
  ChevronRightIcon,
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
  isCollapsed?: boolean;
}

function SidebarContent({
  chapters,
  pathname,
  setIsMobileMenuOpen,
  isCollapsed = false,
}: SidebarContentProps) {
  const isActive = (path: string) => pathname === path;
  const isChapterActive = (chapterId: string) =>
    pathname === `/chapters/${chapterId}`;

  return (
    <div className="flex h-full flex-col bg-sidebar-bg">
      {/* ヘッダー - 教科書タイトル風 */}
      <div className="border-b-2 border-sidebar-border px-5 py-5">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary flex-shrink-0">
            <BookOpenIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">
                Xアルゴリズム
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">攻略ガイド</p>
            </div>
          )}
        </Link>
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
            title="ホーム"
          >
            <HomeIcon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>ホーム</span>}
          </Link>
        </div>

        {/* ガイドセクション */}
        <div className="px-3 pb-4">
          {!isCollapsed && (
            <div className="mb-3 flex items-center gap-2 px-3">
              <AcademicCapIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                ガイド
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

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
                title={`第${chapter.number}章 ${chapter.title}`}
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
                {!isCollapsed && (
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
                )}
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
              title="学習完了"
            >
              <CheckCircleIcon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive("/complete") ? "text-success-border" : ""
                )}
              />
              {!isCollapsed && <span>学習完了</span>}
            </Link>
          </div>
        </div>

        {/* 技術仕様セクション */}
        <div className="px-3 pb-4">
          {!isCollapsed && (
            <div className="mb-3 flex items-center gap-2 px-3">
              <CpuChipIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                技術仕様
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          <div className="space-y-1">
            {[
              { href: "/specs", label: "仕様一覧" },
              { href: "/specs/overview", label: "概要" },
              { href: "/specs/architecture", label: "アーキテクチャ" },
              { href: "/specs/phoenix-ml", label: "Phoenix ML" },
              { href: "/specs/scoring", label: "スコアリング" },
              { href: "/specs/filtering", label: "フィルタリング" },
              { href: "/specs/thunder-pipeline", label: "Thunder Pipeline" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                  isActive(item.href)
                    ? "bg-info text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                title={item.label}
              >
                {isCollapsed ? (
                  <CpuChipIcon className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <span className="ml-1">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* 用語集セクション */}
        <div className="px-3 pb-4">
          {!isCollapsed && (
            <div className="mb-3 flex items-center gap-2 px-3">
              <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                用語集
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          <Link
            href="/glossary"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              isActive("/glossary")
                ? "bg-info text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
            title="用語一覧"
          >
            {isCollapsed ? (
              <DocumentTextIcon className="h-5 w-5 flex-shrink-0" />
            ) : (
              <span className="ml-1">用語一覧</span>
            )}
          </Link>
        </div>
      </nav>

      {/* フッター */}
      {!isCollapsed && (
        <div className="border-t border-sidebar-border px-5 py-4">
          <p className="text-xs text-muted-foreground text-center">
            全12章 | オープンソース解析
          </p>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ chapters }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* モバイルメニューボタン - 右側 */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-md border border-border lg:hidden"
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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* モバイルサイドバー - 右側から出る */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 transform shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <SidebarContent
          chapters={chapters}
          pathname={pathname}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </aside>

      {/* デスクトップサイドバー - 左側、伸縮可能 */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col lg:border-r lg:border-sidebar-border lg:shadow-sm transition-all duration-300",
          isCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <SidebarContent
          chapters={chapters}
          pathname={pathname}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isCollapsed={isCollapsed}
        />
        {/* 伸縮ボタン */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-secondary transition-colors"
          aria-label={isCollapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </aside>
    </>
  );
}

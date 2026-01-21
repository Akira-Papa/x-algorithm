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
  Squares2X2Icon,
  InformationCircleIcon,
  CubeTransparentIcon,
  SparklesIcon,
  ChartBarIcon,
  FunnelIcon,
  BoltIcon,
  LightBulbIcon,
  TrophyIcon,
  HeartIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  NewspaperIcon,
  MegaphoneIcon,
  PhotoIcon,
  VideoCameraIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// GitHub アイコンコンポーネント
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// X（旧Twitter）アイコンコンポーネント
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
        <div className="flex items-center justify-between">
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

        {/* X行動ランキングリンク */}
        <div className="px-3 pb-2">
          <Link
            href="/rankings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              isActive("/rankings")
                ? "bg-info text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
            title="X行動ランキング"
          >
            <TrophyIcon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>X行動ランキング10↑↓</span>}
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
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
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
                  <div className="min-w-0 flex-1">
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

        {/* テンプレート集セクション */}
        <div className="px-3 pb-4">
          {!isCollapsed && (
            <div className="mb-3 flex items-center gap-2 px-3">
              <LightBulbIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                テンプレート集
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          <div className="space-y-1">
            {/* テンプレート一覧リンク */}
            <Link
              href="/templates"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive("/templates")
                  ? "bg-info text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              title="テンプレート一覧"
            >
              <Squares2X2Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>一覧</span>}
            </Link>

            {/* カテゴリリンク */}
            {[
              { href: "/templates?category=engagement", category: "engagement", label: "エンゲージ", icon: HeartIcon },
              { href: "/templates?category=viral", category: "viral", label: "バイラル", icon: FireIcon },
              { href: "/templates?category=thread", category: "thread", label: "スレッド", icon: ChatBubbleLeftRightIcon },
              { href: "/templates?category=question", category: "question", label: "質問", icon: QuestionMarkCircleIcon },
              { href: "/templates?category=value", category: "value", label: "価値提供", icon: AcademicCapIcon },
              { href: "/templates?category=story", category: "story", label: "ストーリー", icon: BookOpenIcon },
              { href: "/templates?category=news", category: "news", label: "ニュース", icon: NewspaperIcon },
              { href: "/templates?category=opinion", category: "opinion", label: "意見", icon: MegaphoneIcon },
              { href: "/templates?category=visual", category: "visual", label: "ビジュアル", icon: PhotoIcon },
              { href: "/templates?category=video", category: "video", label: "動画", icon: VideoCameraIcon },
              { href: "/templates?category=cta", category: "cta", label: "CTA", icon: CursorArrowRaysIcon },
              { href: "/templates?category=community", category: "community", label: "コミュニティ", icon: UserGroupIcon },
              { href: "/templates?category=timing", category: "timing", label: "タイミング", icon: ClockIcon },
              { href: "/templates?category=personal", category: "personal", label: "パーソナル", icon: UserCircleIcon },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                  pathname === "/templates" && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("category") === item.category
                    ? "bg-info text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                title={item.label}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
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
              { href: "/specs", label: "仕様一覧", icon: Squares2X2Icon },
              { href: "/specs/overview", label: "概要", icon: InformationCircleIcon },
              { href: "/specs/architecture", label: "アーキテクチャ", icon: CubeTransparentIcon },
              { href: "/specs/phoenix-ml", label: "Phoenix ML", icon: SparklesIcon },
              { href: "/specs/scoring", label: "スコアリング", icon: ChartBarIcon },
              { href: "/specs/filtering", label: "フィルタリング", icon: FunnelIcon },
              { href: "/specs/thunder-pipeline", label: "Thunder Pipeline", icon: BoltIcon },
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
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* フッター */}
      {!isCollapsed && (
        <div className="border-t border-sidebar-border px-4 py-4 space-y-2">
          <a
            href="https://x.com/akira_papa_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="あきらパパ @akira_papa_IT"
          >
            <XIcon className="h-4 w-4" />
            <span>あきらパパ</span>
          </a>
          <div className="flex items-center justify-center gap-2 text-[10px]">
            <Link
              href="/terms"
              className="text-muted-foreground/70 hover:text-muted-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              利用規約
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link
              href="/privacy"
              className="text-muted-foreground/70 hover:text-muted-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              プライバシー
            </Link>
          </div>
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

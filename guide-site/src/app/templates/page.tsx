"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpenIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { getAllTemplates, getAllCategories } from "@/lib/templates";
import type { CategoryId, Difficulty, SortOption, ViewMode, Template } from "@/lib/templates/types";
import {
  TemplateCard,
  TemplateList,
  TemplatesSearchInput,
  TemplatesSortSelect,
  TemplatesCategoryFilter,
  TemplatesDifficultyFilter,
  TemplatesViewToggle,
  TemplatesPagination,
} from "@/components/templates";

const ITEMS_PER_PAGE = 20;

function TemplatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL状態の読み取り
  const categoryParam = searchParams.get("category");
  const selectedCategories: CategoryId[] = categoryParam
    ? (categoryParam.split(",") as CategoryId[])
    : [];
  const selectedDifficulty = searchParams.get("difficulty") as Difficulty | null;
  const searchQuery = searchParams.get("search") || "";
  const sortBy = (searchParams.get("sort") || "default") as SortOption;
  const sortOrder = (searchParams.get("order") || "asc") as "asc" | "desc";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const viewMode = (searchParams.get("view") || "card") as ViewMode;

  // フィルター展開状態
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  // URL更新関数
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      // ページをリセット（検索/フィルター変更時）
      if (!("page" in updates)) {
        params.delete("page");
      }
      const queryString = params.toString();
      router.push(queryString ? `/templates?${queryString}` : "/templates", { scroll: false });
    },
    [searchParams, router]
  );

  // データ取得
  const allTemplates = useMemo(() => getAllTemplates(), []);
  const categories = useMemo(() => getAllCategories(), []);

  // フィルタリング
  const filteredTemplates = useMemo(() => {
    let result = allTemplates;

    // カテゴリフィルタ
    if (selectedCategories.length > 0) {
      result = result.filter((t) => selectedCategories.includes(t.category));
    }

    // 難易度フィルタ
    if (selectedDifficulty) {
      result = result.filter((t) => t.difficulty === selectedDifficulty);
    }

    // 検索フィルタ
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.effects.some((e) => e.toLowerCase().includes(query))
      );
    }

    return result;
  }, [allTemplates, selectedCategories, selectedDifficulty, searchQuery]);

  // ソート
  const sortedTemplates = useMemo(() => {
    const sorted = [...filteredTemplates];

    switch (sortBy) {
      case "category":
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "difficulty": {
        const diffOrder: Record<string, number> = {
          beginner: 1,
          intermediate: 2,
          advanced: 3,
        };
        sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
        break;
      }
      case "engagement": {
        const getScore = (t: Template) => {
          const levels: Record<string, number> = { low: 1, medium: 2, high: 3 };
          return Object.values(t.expectedEngagement).reduce(
            (sum, level) => sum + levels[level],
            0
          );
        };
        sorted.sort((a, b) => getScore(b) - getScore(a));
        break;
      }
      default:
        // デフォルト順（ID順）
        break;
    }

    if (sortOrder === "desc") sorted.reverse();
    return sorted;
  }, [filteredTemplates, sortBy, sortOrder]);

  // ページネーション
  const totalPages = Math.ceil(sortedTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedTemplates.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedTemplates, currentPage]);

  // フィルター状態テキスト
  const getFilterStatusText = () => {
    const parts: string[] = [];
    if (selectedCategories.length > 0) {
      const catNames = selectedCategories
        .map((id) => categories.find((c) => c.id === id)?.name || id)
        .join(", ");
      parts.push(catNames);
    }
    if (selectedDifficulty) {
      const diffLabels: Record<string, string> = {
        beginner: "初級",
        intermediate: "中級",
        advanced: "上級",
      };
      parts.push(diffLabels[selectedDifficulty]);
    }
    if (searchQuery) {
      parts.push(`「${searchQuery}」`);
    }
    return parts.length > 0 ? parts.join(" / ") : "すべて";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpenIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Xアルゴリズム攻略ガイド</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* パンくずリスト */}
      <nav className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-3 text-sm">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ホーム
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">投稿テンプレート</span>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="border-b border-border px-6 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            {/* 装飾ライン */}
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="text-xs tracking-widest text-muted-foreground">
                STRATEGIC TEMPLATES
              </span>
              <div className="h-px w-12 bg-border" />
            </div>

            {/* タイトル */}
            <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              戦略的投稿テンプレート集
            </h1>

            {/* サブタイトル */}
            <p className="mb-6 text-muted-foreground">
              Xアルゴリズムに最適化された{allTemplates.length}個の実践例
            </p>

            {/* 統計 */}
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {categories.length}
                </div>
                <div className="text-xs text-muted-foreground">カテゴリ</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {allTemplates.length}
                </div>
                <div className="text-xs text-muted-foreground">テンプレート</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="px-6 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          {/* 検索・フィルターセクション */}
          <div className="mb-6 rounded-lg border border-border bg-card p-4">
            {/* 検索バー + ソート + 表示切替 */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 max-w-md">
                <TemplatesSearchInput
                  value={searchQuery}
                  onChange={(value) => updateParams({ search: value || null })}
                />
              </div>
              <div className="flex items-center gap-3">
                <TemplatesSortSelect
                  sortBy={sortBy}
                  onSortByChange={(value) => updateParams({ sort: value === "default" ? null : value })}
                  order={sortOrder}
                  onOrderChange={(value) => updateParams({ order: value === "asc" ? null : value })}
                />
                <TemplatesViewToggle
                  view={viewMode}
                  onChange={(value) => updateParams({ view: value === "card" ? null : value })}
                />
              </div>
            </div>

            {/* フィルター展開トグル */}
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FunnelIcon className="h-4 w-4" />
              <span>フィルター</span>
              {isFiltersExpanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>

            {/* フィルター詳細 */}
            {isFiltersExpanded && (
              <div className="mt-4 space-y-4 border-t border-border pt-4">
                {/* カテゴリフィルター */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    カテゴリ
                  </label>
                  <TemplatesCategoryFilter
                    selectedCategories={selectedCategories}
                    onChange={(cats) =>
                      updateParams({ category: cats.length > 0 ? cats.join(",") : null })
                    }
                  />
                </div>

                {/* 難易度フィルター */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    難易度
                  </label>
                  <TemplatesDifficultyFilter
                    selectedDifficulty={selectedDifficulty}
                    onChange={(diff) => updateParams({ difficulty: diff })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 結果ステータス */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{getFilterStatusText()}</span>
              {" "}の{sortedTemplates.length}件
              {totalPages > 1 && ` (${currentPage}/${totalPages}ページ)`}
            </p>
            {(selectedCategories.length > 0 || selectedDifficulty || searchQuery) && (
              <button
                onClick={() =>
                  updateParams({
                    category: null,
                    difficulty: null,
                    search: null,
                  })
                }
                className="text-sm text-primary hover:underline"
              >
                フィルターをクリア
              </button>
            )}
          </div>

          {/* テンプレート一覧 */}
          {paginatedTemplates.length > 0 ? (
            <>
              {viewMode === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              ) : (
                <TemplateList templates={paginatedTemplates} />
              )}

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <TemplatesPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => updateParams({ page: page === 1 ? null : String(page) })}
                    totalItems={sortedTemplates.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                該当するテンプレートが見つかりませんでした
              </p>
              <button
                onClick={() =>
                  updateParams({
                    category: null,
                    difficulty: null,
                    search: null,
                  })
                }
                className="mt-4 text-sm text-primary hover:underline"
              >
                フィルターをリセット
              </button>
            </div>
          )}

          {/* 補足情報 */}
          <div className="mt-12 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 text-sm font-semibold">テンプレートの使い方</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              各テンプレートには例文・解説・効果的なポイント・注意点が含まれています。
              自分の発信内容に合わせてカスタマイズしてご利用ください。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/chapters/10"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                第10章: 投稿テンプレートを学ぶ
                <ArrowLeftIcon className="h-3 w-3 rotate-180" />
              </Link>
              <Link
                href="/chapters/2"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                エンゲージメント19種類を理解する
                <ArrowLeftIcon className="h-3 w-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-border px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <span>Xアルゴリズム攻略ガイド</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/twitter/the-algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub (公式ソースコード)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">読み込み中...</div>}>
      <TemplatesContent />
    </Suspense>
  );
}

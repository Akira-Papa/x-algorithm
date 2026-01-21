import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
  SparklesIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CategoryBadge } from '@/components/templates/CategoryBadge';
import { DifficultyBadge } from '@/components/templates/DifficultyBadge';
import { ExampleBox } from '@/components/templates/ExampleBox';
import { PointsList } from '@/components/templates/PointsList';
import { CautionsList } from '@/components/templates/CautionsList';
import { EngagementIndicator } from '@/components/templates/EngagementIndicator';
import { RelatedChapters } from '@/components/templates/RelatedChapters';
import { TemplateCard } from '@/components/templates/TemplateCard';
import {
  getAllTemplates,
  getTemplate,
  getTemplatesByCategory,
  getCategory,
  getRelatedTemplates,
  categoryIds,
  type CategoryId,
  type Template,
} from '@/lib/templates';
import { cn } from '@/lib/utils';

// テンプレートデータの初期化
import '@/lib/templates/data';

interface PageProps {
  params: Promise<{ category: string; id: string }>;
}

/** 静的パラメータの生成 - 140ページ分 */
export async function generateStaticParams() {
  const templates = getAllTemplates();
  return templates.map((template) => ({
    category: template.category,
    id: template.id,
  }));
}

/** メタデータの生成 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplate(id);
  const category = template ? getCategory(template.category) : null;

  if (!template || !category) {
    return {
      title: 'テンプレートが見つかりません',
    };
  }

  return {
    title: `${template.title} - ${category.name}テンプレート`,
    description: `${template.description} ${template.effects.join('、')}が期待できる投稿テンプレート。`,
    openGraph: {
      title: `${template.title} | Xアルゴリズム攻略ガイド`,
      description: template.description,
    },
    twitter: {
      title: `${template.title}`,
      description: template.description,
    },
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { category: categoryId, id } = await params;
  const template = getTemplate(id);
  const category = getCategory(categoryId as CategoryId);

  // テンプレートが存在しない、またはカテゴリが一致しない場合は404
  if (!template || !category || template.category !== categoryId) {
    notFound();
  }

  // 同じカテゴリのテンプレート一覧を取得（前後ナビゲーション用）
  const categoryTemplates = getTemplatesByCategory(categoryId as CategoryId);
  const currentIndex = categoryTemplates.findIndex((t) => t.id === template.id);
  const prevTemplate = currentIndex > 0 ? categoryTemplates[currentIndex - 1] : null;
  const nextTemplate = currentIndex < categoryTemplates.length - 1 ? categoryTemplates[currentIndex + 1] : null;

  // 関連テンプレートを取得
  const relatedTemplates = getRelatedTemplates(template.id);

  return (
    <div className="min-h-screen bg-background">
      {/* メインコンテンツ */}
      <main className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl">
          {/* パンくずリスト */}
          <Breadcrumb
            items={[
              { label: 'テンプレート集', href: '/templates' },
              { label: category.name, href: `/templates/${category.id}` },
              { label: template.title, href: `/templates/${category.id}/${template.id}` },
            ]}
          />

          {/* 戻るリンク */}
          <Link
            href={`/templates/${category.id}`}
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {category.name}テンプレート一覧に戻る
          </Link>

          {/* ヘッダーセクション */}
          <header className="mb-8">
            {/* バッジ群 */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <CategoryBadge categoryId={template.category} size="md" />
              <DifficultyBadge difficulty={template.difficulty} size="md" showStars />
            </div>

            {/* タイトル */}
            <h1 className="text-2xl font-bold md:text-3xl mb-3">
              {template.title}
            </h1>

            {/* 説明 */}
            <p className="text-muted-foreground text-lg">
              {template.description}
            </p>
          </header>

          {/* 効果タグ */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <SparklesIcon className="h-5 w-5 text-amber-500" />
              <h2 className="text-sm font-semibold text-muted-foreground">期待できる効果</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.effects.map((effect, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1 text-sm font-medium text-amber-700 dark:text-amber-300"
                >
                  <TagIcon className="h-3.5 w-3.5" />
                  {effect}
                </span>
              ))}
            </div>
          </section>

          {/* 例文ボックス */}
          <section className="mb-8">
            <ExampleBox example={template.example} label="投稿例" />
          </section>

          {/* 解説セクション */}
          <section className="mb-8">
            <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 overflow-hidden">
              <div className="px-4 py-3 bg-blue-100 dark:bg-blue-900/40 border-b border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                    例文の解説
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {template.explanation}
                </p>
              </div>
            </div>
          </section>

          {/* ポイントと注意点 */}
          <section className="mb-8 grid gap-4 md:grid-cols-2">
            <PointsList points={template.points} title="効果的に使うポイント" />
            <CautionsList cautions={template.cautions} title="注意点" />
          </section>

          {/* 期待エンゲージメント */}
          <section className="mb-8">
            <div className="rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
              <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  期待されるエンゲージメント
                </span>
              </div>
              <div className="p-5">
                <EngagementIndicator
                  engagement={template.expectedEngagement}
                  size="lg"
                  showLabels
                  layout="grid"
                />
              </div>
            </div>
          </section>

          {/* 関連する章 */}
          {template.relatedChapters.length > 0 && (
            <section className="mb-8">
              <RelatedChapters
                chapterNumbers={template.relatedChapters}
                title="関連するガイド章"
              />
            </section>
          )}

          {/* 関連テンプレート */}
          {relatedTemplates.length > 0 && (
            <section className="mb-8">
              <div className="rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 overflow-hidden">
                <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
                  <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    関連テンプレート
                  </span>
                </div>
                <div className="p-4 grid gap-3 md:grid-cols-2">
                  {relatedTemplates.slice(0, 4).map((relatedTemplate) => (
                    <TemplateCard
                      key={relatedTemplate.id}
                      template={relatedTemplate}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 前後ナビゲーション */}
          <nav className="mt-12 border-t border-border pt-8">
            <div className="grid gap-4 md:grid-cols-2">
              {/* 前のテンプレート */}
              {prevTemplate ? (
                <Link
                  href={`/templates/${prevTemplate.category}/${prevTemplate.id}`}
                  className="group flex flex-col items-start rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-accent/50"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <ChevronLeftIcon className="h-3 w-3" />
                    前のテンプレート
                  </span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {prevTemplate.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {/* 次のテンプレート */}
              {nextTemplate ? (
                <Link
                  href={`/templates/${nextTemplate.category}/${nextTemplate.id}`}
                  className="group flex flex-col items-end rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-accent/50 md:text-right"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    次のテンプレート
                    <ChevronRightIcon className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {nextTemplate.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* カテゴリ一覧に戻る */}
            <div className="mt-6 text-center">
              <Link
                href={`/templates/${category.id}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                {category.name}テンプレート一覧に戻る
              </Link>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}

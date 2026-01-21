import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TemplateCard } from '@/components/templates/TemplateCard';
import {
  getAllCategories,
  getCategory,
  getTemplatesByCategory,
  categoryIds,
  type CategoryId,
  type Category,
} from '@/lib/templates';
import { cn } from '@/lib/utils';

/** カテゴリアイコンのマッピング */
const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
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

/** カテゴリカラーのマッピング */
const CATEGORY_COLORS: Record<CategoryId, { bg: string; iconBg: string; text: string }> = {
  engagement: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    iconBg: 'bg-rose-100 dark:bg-rose-900/50',
    text: 'text-rose-600 dark:text-rose-400',
  },
  viral: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    text: 'text-purple-600 dark:text-purple-400',
  },
  thread: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-600 dark:text-blue-400',
  },
  question: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    iconBg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-600 dark:text-green-400',
  },
  value: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    text: 'text-amber-600 dark:text-amber-400',
  },
  story: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    iconBg: 'bg-orange-100 dark:bg-orange-900/50',
    text: 'text-orange-600 dark:text-orange-400',
  },
  news: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    iconBg: 'bg-red-100 dark:bg-red-900/50',
    text: 'text-red-600 dark:text-red-400',
  },
  opinion: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
    text: 'text-indigo-600 dark:text-indigo-400',
  },
  visual: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    iconBg: 'bg-pink-100 dark:bg-pink-900/50',
    text: 'text-pink-600 dark:text-pink-400',
  },
  video: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/50',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  cta: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  community: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    iconBg: 'bg-violet-100 dark:bg-violet-900/50',
    text: 'text-violet-600 dark:text-violet-400',
  },
  timing: {
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    iconBg: 'bg-sky-100 dark:bg-sky-900/50',
    text: 'text-sky-600 dark:text-sky-400',
  },
  personal: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    iconBg: 'bg-teal-100 dark:bg-teal-900/50',
    text: 'text-teal-600 dark:text-teal-400',
  },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

/** 静的パラメータの生成 */
export async function generateStaticParams() {
  return categoryIds.map((category) => ({
    category,
  }));
}

/** メタデータの生成 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId as CategoryId);

  if (!category) {
    return {
      title: 'カテゴリが見つかりません',
    };
  }

  return {
    title: `${category.name}テンプレート一覧`,
    description: `${category.description} ${category.targetEngagement.join('、')}を狙える投稿テンプレートを10種類紹介します。`,
    openGraph: {
      title: `${category.name}テンプレート一覧 | Xアルゴリズム攻略ガイド`,
      description: category.description,
    },
    twitter: {
      title: `${category.name}テンプレート一覧`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId as CategoryId);

  // カテゴリが存在しない場合は404
  if (!category) {
    notFound();
  }

  const templates = getTemplatesByCategory(categoryId as CategoryId);
  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter((c) => c.id !== categoryId);

  const Icon = CATEGORY_ICONS[category.id];
  const colors = CATEGORY_COLORS[category.id];

  return (
    <div className="min-h-screen bg-background">
      {/* メインコンテンツ */}
      <main className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-5xl">
          {/* パンくずリスト */}
          <Breadcrumb
            items={[
              { label: 'テンプレート集', href: '/templates' },
              { label: category.name, href: `/templates/${category.id}` },
            ]}
          />

          {/* 戻るリンク */}
          <Link
            href="/templates"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            テンプレート一覧に戻る
          </Link>

          {/* カテゴリヘッダー */}
          <div className={cn('mb-10 rounded-xl p-6 md:p-8', colors.bg)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              {/* カテゴリアイコン */}
              <div
                className={cn(
                  'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl md:h-20 md:w-20',
                  colors.iconBg
                )}
              >
                <Icon className={cn('h-8 w-8 md:h-10 md:w-10', colors.text)} />
              </div>

              {/* カテゴリ情報 */}
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">{category.name}</h1>
                <p className="mb-4 text-muted-foreground">{category.description}</p>

                {/* 狙えるエンゲージメント */}
                <div className="flex flex-wrap gap-2">
                  {category.targetEngagement.map((engagement) => (
                    <span
                      key={engagement}
                      className={cn(
                        'rounded-full px-3 py-1 text-sm font-medium',
                        colors.iconBg,
                        colors.text
                      )}
                    >
                      {engagement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* テンプレート一覧 */}
          <section className="mb-12">
            <h2 className="mb-6 text-lg font-semibold">
              テンプレート一覧
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({templates.length}件)
              </span>
            </h2>

            {templates.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  このカテゴリのテンプレートは現在準備中です。
                </p>
              </div>
            )}
          </section>

          {/* 他のカテゴリへのナビゲーション */}
          <section>
            <h2 className="mb-6 text-lg font-semibold">他のカテゴリを見る</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherCategories.map((otherCategory) => {
                const OtherIcon = CATEGORY_ICONS[otherCategory.id];
                const otherColors = CATEGORY_COLORS[otherCategory.id];

                return (
                  <Link
                    key={otherCategory.id}
                    href={`/templates/${otherCategory.id}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-foreground/30 hover:bg-accent/50"
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                        otherColors.iconBg
                      )}
                    >
                      <OtherIcon className={cn('h-5 w-5', otherColors.text)} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium group-hover:text-foreground">
                        {otherCategory.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {otherCategory.targetEngagement.slice(0, 2).join('・')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

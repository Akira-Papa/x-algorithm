import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  LightBulbIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import {
  rankingData,
  getImpactLabel,
  getImpactColorClass,
  type RankingItem,
  type MisconceptionItem,
} from "@/lib/rankings";

export const metadata: Metadata = {
  title: "Xの行動ランキング | Xアルゴリズム攻略ガイド",
  description:
    "Xアルゴリズムでやったほうがいいこと・やってはいけないことをランキング形式で解説。公式オープンソースのエンゲージメント重みに基づく正確なスコア影響度も一目でわかります。",
};

// ランキングカードコンポーネント
function RankingCard({
  item,
  type,
}: {
  item: RankingItem;
  type: "do" | "dont";
}) {
  const isDo = type === "do";

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 p-4 transition-all hover:shadow-md h-full flex flex-col",
        isDo
          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30"
          : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30"
      )}
    >
      {/* ランク番号 */}
      <div
        className={cn(
          "absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold shadow-lg",
          isDo
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        )}
      >
        {item.rank}
      </div>

      {/* コンテンツ */}
      <div className="ml-6 flex flex-col flex-1">
        {/* タイトルとインパクト */}
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-bold text-foreground pr-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-bold",
                getImpactColorClass(item.impactLevel, type)
              )}
            >
              {getImpactLabel(item.impactLevel)}
            </span>
            <span
              className={cn(
                "flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold",
                isDo
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              )}
            >
              {isDo ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {item.impact}
            </span>
          </div>
        </div>

        {/* 説明 */}
        <p className="mb-3 text-sm text-muted-foreground leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Tips */}
        {item.tips && (
          <div
            className={cn(
              "mb-3 flex items-start gap-2 rounded-lg p-2 text-sm",
              isDo
                ? "bg-green-100/50 dark:bg-green-900/30"
                : "bg-red-100/50 dark:bg-red-900/30"
            )}
          >
            <LightBulbIcon
              className={cn(
                "h-4 w-4 flex-shrink-0 mt-0.5",
                isDo ? "text-green-600" : "text-red-600"
              )}
            />
            <span className="text-muted-foreground">{item.tips}</span>
          </div>
        )}

        {/* 関連章 */}
        <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
          <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">関連:</span>
          {item.relatedChapters.map((chapter) => (
            <Link
              key={chapter}
              href={`/chapters/${chapter}`}
              className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              第{chapter}章
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// 誤解カードコンポーネント
function MisconceptionCard({ item }: { item: MisconceptionItem }) {
  const isDo = item.type === "do";

  return (
    <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-foreground">{item.title}</h4>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                isDo
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              )}
            >
              {isDo ? "やったほうがいい系" : "やってはいけない系"}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-medium text-amber-700 dark:text-amber-400 flex-shrink-0">
                ❌ 誤解:
              </span>
              <span className="text-muted-foreground">{item.myth}</span>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-green-100/50 p-2 dark:bg-green-900/20">
              <span className="font-medium text-green-700 dark:text-green-400 flex-shrink-0">
                ✅ 実際:
              </span>
              <span className="text-foreground">{item.reality}</span>
            </div>
          </div>
          {/* 関連章 */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-amber-200 dark:border-amber-800">
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">関連:</span>
            {item.relatedChapters.map((chapter) => (
              <Link
                key={chapter}
                href={`/chapters/${chapter}`}
                className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                第{chapter}章
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// セクションヘッダーコンポーネント
function SectionHeader({
  title,
  description,
  type,
  icon: Icon,
}: {
  title: string;
  description: string;
  type: "do" | "dont";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const isDo = type === "do";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl p-4",
        isDo
          ? "bg-green-100 dark:bg-green-900/50"
          : "bg-red-100 dark:bg-red-900/50"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0",
          isDo ? "bg-green-500" : "bg-red-500"
        )}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-primary/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium text-primary">
                公式オープンソース基準
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-primary">Xの行動</span>ランキング
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Twitter公式オープンソースリリース（2023年4月）の
              <br className="hidden sm:inline" />
              エンゲージメント重みに基づく、やったほうがいい・やってはいけない行動TOP10
            </p>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 注意書き */}
        <div className="mb-10 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium">データソースについて</p>
              <p className="mt-1 text-blue-700 dark:text-blue-300">
                このランキングはTwitter公式オープンソースリリース（2023年4月）の
                エンゲージメント重みと、第2章・第6章・第12章の解説に基づいています。
                詳細な解説は関連章のリンクから確認できます。
              </p>
              <p className="mt-2 text-blue-700 dark:text-blue-300">
                📚 ソース: <a href="https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">twitter/the-algorithm-ml</a>（2023年4月公開時点）
              </p>
              <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                ※ 2026年1月公開の <a href="https://github.com/xai-org/x-algorithm" target="_blank" rel="noopener noreferrer" className="underline">xai-org/x-algorithm</a> では、Grokベースのスコアリングに移行しています。会話の文章の内容や意味自体もAIにより計測されるため、質の高い会話がより重要になっています。
              </p>
            </div>
          </div>
        </div>

        {/* モバイル表示: それぞれまとめて表示 */}
        <div className="lg:hidden space-y-8">
          {/* やったほうがいい TOP 10 */}
          <div>
            <SectionHeader
              title="やったほうがいい TOP 10"
              description="アルゴリズムに好まれる行動"
              type="do"
              icon={CheckBadgeIcon}
            />
            <div className="mt-6 space-y-4">
              {rankingData.dos.map((item) => (
                <RankingCard key={item.rank} item={item} type="do" />
              ))}
            </div>
          </div>

          {/* やってはいけない TOP 10 */}
          <div>
            <SectionHeader
              title="やってはいけない TOP 10"
              description="避けるべき行動・ペナルティ対象"
              type="dont"
              icon={ExclamationTriangleIcon}
            />
            <div className="mt-6 space-y-4">
              {rankingData.donts.map((item) => (
                <RankingCard key={item.rank} item={item} type="dont" />
              ))}
            </div>
          </div>
        </div>

        {/* デスクトップ表示: 左右で高さ揃えて表示 */}
        <div className="hidden lg:block">
          {/* セクションヘッダー */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <SectionHeader
              title="やったほうがいい TOP 10"
              description="アルゴリズムに好まれる行動"
              type="do"
              icon={CheckBadgeIcon}
            />
            <SectionHeader
              title="やってはいけない TOP 10"
              description="避けるべき行動・ペナルティ対象"
              type="dont"
              icon={ExclamationTriangleIcon}
            />
          </div>

          {/* ランキングカード - 各ランクごとに横並び */}
          <div className="space-y-6">
            {rankingData.dos.map((doItem, index) => {
              const dontItem = rankingData.donts[index];
              return (
                <div key={doItem.rank} className="grid grid-cols-2 gap-6">
                  <RankingCard item={doItem} type="do" />
                  <RankingCard item={dontItem} type="dont" />
                </div>
              );
            })}
          </div>
        </div>

        {/* よくある誤解セクション */}
        <div className="mt-16">
          <div className="flex items-center gap-3 rounded-xl bg-amber-100 p-4 dark:bg-amber-900/50 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 flex-shrink-0">
              <InformationCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                よくある誤解
              </h2>
              <p className="text-sm text-muted-foreground">
                ソースコードを網羅的に解析した結果、以下の「常識」にはアルゴリズム上の根拠がありませんでした
              </p>
            </div>
          </div>

          {/* やったほうがいい系の誤解 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckBadgeIcon className="h-5 w-5 text-green-500" />
              「やったほうがいい」の誤解
            </h3>
            <div className="space-y-4">
              {rankingData.misconceptions
                .filter((item) => item.type === "do")
                .map((item, index) => (
                  <MisconceptionCard key={index} item={item} />
                ))}
            </div>
          </div>

          {/* やってはいけない系の誤解 */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
              「やってはいけない」の誤解
            </h3>
            <div className="space-y-4">
              {rankingData.misconceptions
                .filter((item) => item.type === "dont")
                .map((item, index) => (
                  <MisconceptionCard key={index} item={item} />
                ))}
            </div>
          </div>
        </div>

        {/* CTAセクション */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            さらに詳しく学ぶ
          </h2>
          <p className="mt-2 text-muted-foreground">
            各ランキングの詳細な解説と実践方法は、ガイドの各章で解説しています。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/chapters/2"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <BookOpenIcon className="h-5 w-5" />
              スコアリングを学ぶ
            </Link>
            <Link
              href="/chapters/6"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              フィルタリングを理解する
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

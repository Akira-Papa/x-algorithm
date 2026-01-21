export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
}

export const chapters: Chapter[] = [
  {
    id: "1",
    number: 1,
    title: "全体像と思想",
    description: "Xアルゴリズムの設計思想、3層アーキテクチャ、8段階パイプラインの全体像を解説します。",
  },
  {
    id: "2",
    number: 2,
    title: "エンゲージメント19種類",
    description: "いいね、リプライ、リポストなど19種類のエンゲージメントとその重み付けを完全解説します。",
  },
  {
    id: "3",
    number: 3,
    title: "Two-Tower検索",
    description: "SimClustersとTwo-Tower検索によるコンテンツ発見の仕組みを解説します。",
  },
  {
    id: "4",
    number: 4,
    title: "Phoenix MLモデル",
    description: "Grok Transformerを使ったエンゲージメント予測モデルの詳細を解説します。",
  },
  {
    id: "5",
    number: 5,
    title: "スコアリングシステム",
    description: "複数のスコアラーが掛け算で統合される仕組みと最終スコアの計算方法を解説します。",
  },
  {
    id: "6",
    number: 6,
    title: "12種類のフィルター",
    description: "安全性、品質、多様性を確保する12種類のフィルターの仕組みを解説します。",
  },
  {
    id: "7",
    number: 7,
    title: "IN vs OON",
    description: "フォロー内（IN）とフォロー外（OON）の扱いの違いと戦略を解説します。",
  },
  {
    id: "8",
    number: 8,
    title: "著者多様性と投稿タイミング",
    description: "Author Diversityペナルティと最適な投稿タイミング戦略を解説します。",
  },
  {
    id: "9",
    number: 9,
    title: "動画コンテンツとVQV",
    description: "動画の品質評価（VQV）の3条件と動画最適化戦略を解説します。",
  },
  {
    id: "10",
    number: 10,
    title: "投稿テンプレート",
    description: "質問誘発型、プロフィール誘導型など5種類の成功パターンを解説します。",
  },
  {
    id: "11",
    number: 11,
    title: "アカウント設計とブランディング",
    description: "Trust ScoreとTopical Authorityの構築方法とプロフィール最適化を解説します。",
  },
  {
    id: "12",
    number: 12,
    title: "データ分析と継続的改善",
    description: "KPI設定、PDCAサイクル、長期成長ロードマップを解説します。",
  },
];

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getChapterNavigation(id: string) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  if (index === -1) return { prev: undefined, next: undefined };

  return {
    prev:
      index > 0
        ? {
            href: `/chapters/${chapters[index - 1].id}`,
            title: `第${chapters[index - 1].number}章: ${chapters[index - 1].title}`,
          }
        : undefined,
    next:
      index < chapters.length - 1
        ? {
            href: `/chapters/${chapters[index + 1].id}`,
            title: `第${chapters[index + 1].number}章: ${chapters[index + 1].title}`,
          }
        : {
            href: "/complete",
            title: "完了ページ",
          },
  };
}

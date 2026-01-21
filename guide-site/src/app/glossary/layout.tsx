import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '用語集',
  description: 'Xアルゴリズムに関する専門用語を解説。Phoenix ML、Two-Tower検索、エンゲージメント、スコアリングなど、推薦システムの用語を網羅的に説明します。',
  openGraph: {
    title: '用語集 | Xアルゴリズム攻略ガイド',
    description: 'Xアルゴリズムに関する専門用語を解説。推薦システムの用語を網羅的に説明します。',
  },
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

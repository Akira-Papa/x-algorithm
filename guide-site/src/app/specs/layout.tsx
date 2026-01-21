import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '技術仕様',
  description: 'Xアルゴリズムの技術仕様ドキュメント。アーキテクチャ、Phoenix ML、スコアリング、フィルタリング、Thunder Pipelineなどの詳細な技術解説。',
  openGraph: {
    title: '技術仕様 | Xアルゴリズム攻略ガイド',
    description: 'Xアルゴリズムの技術仕様ドキュメント。詳細な技術解説を提供します。',
  },
};

export default function SpecsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

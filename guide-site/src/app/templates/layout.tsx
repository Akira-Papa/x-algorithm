import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '戦略的投稿テンプレート集',
  description: 'Xアルゴリズムに最適化された140個の投稿テンプレート。14カテゴリ別に例文・解説・ポイント・注意点付きで紹介。',
  openGraph: {
    title: '戦略的投稿テンプレート集 | Xアルゴリズム攻略ガイド',
    description: 'Xアルゴリズムに最適化された140個の投稿テンプレート。14カテゴリ別に例文・解説・ポイント・注意点付きで紹介。',
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/ui/Sidebar";
import { chapters } from "@/lib/chapters";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://x-algorithm-guide.vercel.app'),
  title: {
    default: 'Xアルゴリズム攻略ガイド - オープンソースコード徹底解析',
    template: '%s | Xアルゴリズム攻略ガイド',
  },
  description:
    'X（旧Twitter）の推薦アルゴリズムをオープンソースコードから徹底解析。エンゲージメント19種類の重み付け、Two-Tower検索、Phoenix MLモデルなど、全12章で仕組みを完全理解。',
  keywords: [
    'Xアルゴリズム',
    'Twitter アルゴリズム',
    '推薦システム',
    'エンゲージメント',
    'X運用',
    'SNSマーケティング',
    'Two-Tower',
    'Phoenix ML',
    'おすすめ表示',
  ],
  authors: [{ name: 'X Algorithm Guide Team' }],
  creator: 'X Algorithm Guide Team',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://x-algorithm-guide.vercel.app',
    siteName: 'Xアルゴリズム攻略ガイド',
    title: 'Xアルゴリズム攻略ガイド - オープンソースコード徹底解析',
    description:
      'X（旧Twitter）の推薦アルゴリズムをオープンソースコードから徹底解析。全12章で仕組みを完全理解。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Xアルゴリズム攻略ガイド',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xアルゴリズム攻略ガイド',
    description: 'X（旧Twitter）の推薦アルゴリズムを徹底解析。全12章で仕組みを完全理解。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar chapters={chapters} />
        <div className="lg:pl-72">{children}</div>
      </body>
    </html>
  );
}

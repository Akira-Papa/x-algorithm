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
  title: "Xアルゴリズム攻略ガイド - オープンソースコード徹底解析",
  description:
    "X（旧Twitter）の推薦アルゴリズムを徹底解析。エンゲージメント19種類の重み付け、Two-Tower検索、Phoenix MLモデルなど、アルゴリズムの仕組みを理解して戦略的にX運用を行いましょう。",
  keywords: [
    "Xアルゴリズム",
    "Twitter アルゴリズム",
    "推薦システム",
    "エンゲージメント",
    "X運用",
    "SNSマーケティング",
  ],
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

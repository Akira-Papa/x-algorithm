import { Metadata } from 'next';

const siteConfig = {
  name: 'Xアルゴリズム攻略ガイド',
  description: 'X（旧Twitter）の推薦アルゴリズムをオープンソースコードから徹底解析。全12章で仕組みを完全理解。',
  url: 'https://x-algorithm-guide.vercel.app',
  ogImage: '/og-image.png',
  creator: 'X Algorithm Guide Team',
};

export function generateMetadata({
  title,
  description,
  path = '',
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: ['Xアルゴリズム', 'Twitter アルゴリズム', '推薦システム', 'エンゲージメント', 'X運用', 'SNSマーケティング'],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateChapterMetadata(chapterNumber: number, title: string, description: string): Metadata {
  return generateMetadata({
    title: `第${chapterNumber}章 ${title}`,
    description,
    path: `/chapters/${chapterNumber}`,
  });
}

export { siteConfig };

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { BreadcrumbJsonLd } from './JsonLd';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function Breadcrumb({ items, baseUrl = 'https://x-algorithm-guide.vercel.app' }: BreadcrumbProps) {
  const allItems = [{ label: 'ホーム', href: '/' }, ...items];

  return (
    <>
      <BreadcrumbJsonLd
        items={allItems.map((item) => ({
          name: item.label,
          url: `${baseUrl}${item.href}`,
        }))}
      />
      <nav aria-label="パンくずリスト" className="mb-4">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && <ChevronRightIcon className="h-3 w-3" />}
              {index === allItems.length - 1 ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {index === 0 && <HomeIcon className="h-3 w-3" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

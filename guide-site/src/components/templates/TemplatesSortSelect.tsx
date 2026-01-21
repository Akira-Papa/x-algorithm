'use client';

import { ChevronUpDownIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { SortOption } from '@/lib/templates/types';
import { cn } from '@/lib/utils';

interface TemplatesSortSelectProps {
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  order: 'asc' | 'desc';
  onOrderChange: (order: 'asc' | 'desc') => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'デフォルト' },
  { value: 'category', label: 'カテゴリ順' },
  { value: 'difficulty', label: '難易度順' },
  { value: 'engagement', label: 'エンゲージメント順' },
];

export function TemplatesSortSelect({
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
}: TemplatesSortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as SortOption)}
          className="appearance-none pl-3 pr-8 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          aria-label="ソート順"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronUpDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      <button
        onClick={() => onOrderChange(order === 'asc' ? 'desc' : 'asc')}
        className={cn(
          "p-2 border border-border rounded-lg hover:bg-muted transition-colors",
          order === 'desc' && "bg-muted"
        )}
        aria-label={order === 'asc' ? '降順に変更' : '昇順に変更'}
      >
        {order === 'asc' ? (
          <ArrowUpIcon className="w-4 h-4" />
        ) : (
          <ArrowDownIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

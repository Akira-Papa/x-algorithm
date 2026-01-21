'use client';

import { CategoryId } from '@/lib/templates/types';
import { getAllCategories } from '@/lib/templates/categories';
import { cn } from '@/lib/utils';

interface TemplatesCategoryFilterProps {
  selectedCategories: CategoryId[];
  onChange: (categories: CategoryId[]) => void;
}

// Create a color map for badge backgrounds based on category color
const colorClasses: Record<string, { active: string; inactive: string }> = {
  rose: { active: 'bg-rose-500 text-white', inactive: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 hover:bg-rose-200' },
  purple: { active: 'bg-purple-500 text-white', inactive: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200' },
  blue: { active: 'bg-blue-500 text-white', inactive: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200' },
  green: { active: 'bg-green-500 text-white', inactive: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200' },
  amber: { active: 'bg-amber-500 text-white', inactive: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200' },
  orange: { active: 'bg-orange-500 text-white', inactive: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200' },
  red: { active: 'bg-red-500 text-white', inactive: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200' },
  indigo: { active: 'bg-indigo-500 text-white', inactive: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200' },
  pink: { active: 'bg-pink-500 text-white', inactive: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200' },
  cyan: { active: 'bg-cyan-500 text-white', inactive: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 hover:bg-cyan-200' },
  emerald: { active: 'bg-emerald-500 text-white', inactive: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-200' },
  violet: { active: 'bg-violet-500 text-white', inactive: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 hover:bg-violet-200' },
  sky: { active: 'bg-sky-500 text-white', inactive: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 hover:bg-sky-200' },
  teal: { active: 'bg-teal-500 text-white', inactive: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-200' },
};

export function TemplatesCategoryFilter({ selectedCategories, onChange }: TemplatesCategoryFilterProps) {
  const categories = getAllCategories();
  const isAllSelected = selectedCategories.length === 0;

  const toggleCategory = (categoryId: CategoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter(c => c !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  const selectAll = () => {
    onChange([]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={selectAll}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
          isAllSelected
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        )}
      >
        すべて
      </button>
      {categories.map((category) => {
        const isActive = selectedCategories.includes(category.id);
        const colors = colorClasses[category.color] || colorClasses.blue;

        return (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              isActive ? colors.active : colors.inactive
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

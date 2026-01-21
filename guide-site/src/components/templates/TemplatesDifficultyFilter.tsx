'use client';

import { Difficulty } from '@/lib/templates/types';
import { cn } from '@/lib/utils';

interface TemplatesDifficultyFilterProps {
  selectedDifficulty: Difficulty | null;
  onChange: (difficulty: Difficulty | null) => void;
}

const difficulties: { value: Difficulty; label: string; stars: number }[] = [
  { value: 'beginner', label: '初級', stars: 1 },
  { value: 'intermediate', label: '中級', stars: 2 },
  { value: 'advanced', label: '上級', stars: 3 },
];

export function TemplatesDifficultyFilter({
  selectedDifficulty,
  onChange,
}: TemplatesDifficultyFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
          selectedDifficulty === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        )}
      >
        すべて
      </button>
      {difficulties.map((diff) => {
        const isActive = selectedDifficulty === diff.value;
        return (
          <button
            key={diff.value}
            onClick={() => onChange(isActive ? null : diff.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1',
              isActive
                ? 'bg-amber-500 text-white'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200'
            )}
          >
            {diff.label}
            <span className="ml-1">
              {'★'.repeat(diff.stars)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

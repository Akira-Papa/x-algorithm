'use client';

import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ViewMode } from '@/lib/templates/types';
import { cn } from '@/lib/utils';

interface TemplatesViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function TemplatesViewToggle({ view, onChange }: TemplatesViewToggleProps) {
  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => onChange('list')}
        className={cn(
          'p-2 transition-colors',
          view === 'list'
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-muted-foreground hover:bg-muted'
        )}
        aria-label="リスト表示"
        aria-pressed={view === 'list'}
      >
        <ListBulletIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => onChange('card')}
        className={cn(
          'p-2 transition-colors',
          view === 'card'
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-muted-foreground hover:bg-muted'
        )}
        aria-label="カード表示"
        aria-pressed={view === 'card'}
      >
        <Squares2X2Icon className="w-5 h-5" />
      </button>
    </div>
  );
}

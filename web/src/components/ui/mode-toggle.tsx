'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { THEME_MODE_OPTIONS } from '@/constants/ui/theme-options';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (theme ?? 'system') : 'system';

  return (
    <div
      className={cn(
        'relative inline-grid h-10 grid-cols-3 items-center gap-1 rounded-full border border-border bg-muted/60 p-1',
        className,
      )}
      role='group'
      aria-label='Theme mode'
    >
      {THEME_MODE_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = activeTheme === option.value;

        return (
          <Button
            key={option.value}
            type='button'
            size='sm'
            variant='ghost'
            onClick={() => setTheme(option.value)}
            className={cn(
              'h-8 rounded-full px-2.5 text-[11px] font-medium transition-all',
              isActive
                ? 'bg-background text-foreground shadow-sm hover:bg-background'
                : 'text-text-subtle hover:bg-background/70 hover:text-foreground',
            )}
            aria-pressed={isActive}
            disabled={!mounted}
            title={`Use ${option.label.toLowerCase()} mode`}
          >
            <Icon className='mr-1.5 h-3.5 w-3.5' />
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { Shuffle, Check } from 'lucide-react';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCardThemes, getCardThemeByColorName } from '@/utils/card/theme';
import { getRandomCardPatternKey, CARD_PATTERNS } from '@/constants/card/patterns';
import type { CardFormData } from '@/hooks/use-card-wizard';
import type { CardFormFieldErrors } from '@/utils/card/validation';

export type Step5DesignProps = {
  formData: CardFormData;
  errors: CardFormFieldErrors;
  onFieldChange: (field: keyof CardFormData, value: string) => void;
  onSkip?: () => void;
};

type ThemeOption = {
  colorName: string;
  label: string;
  surface: string;
  border: string;
  pattern?: string;
  patternLabel?: string;
};

export function Step5Design({
  formData,
  errors,
  onFieldChange,
  onSkip,
}: Step5DesignProps) {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [shuffleAnimating, setShuffleAnimating] = useState(false);

  const themes = useMemo(() => {
    const baseThemes = getCardThemes();
    return baseThemes.map((theme) => ({
      colorName: theme.colorName,
      label: theme.colorName,
      surface: theme.surface,
      border: theme.border,
    }));
  }, []);

  const themeOptions = useMemo(() => {
    return themes.map((theme) => ({
      ...theme,
      pattern: undefined,
      patternLabel: undefined,
    }));
  }, [themes]);

  const selectedTheme = useMemo(() => {
    return getCardThemeByColorName(formData.colorName);
  }, [formData.colorName]);

  const isSelected = (colorName: string) => {
    return selectedTheme.colorName.toLowerCase() === colorName.toLowerCase();
  };

  const handleThemeSelect = (colorName: string) => {
    onFieldChange('colorName', colorName);
  };

  const handleShuffle = () => {
    setShuffleAnimating(true);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    onFieldChange('colorName', randomTheme.colorName);
    setTimeout(() => {
      setShuffleAnimating(false);
    }, 600);
  };

  return (
    <div className='w-full space-y-6'>
      {/* Help Text */}
      <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20'>
        <p className='text-sm text-blue-900 dark:text-blue-100'>
          Choose a color and pattern for your card or use a random theme. You can skip this step
          to use the default theme.
        </p>
      </div>

      {/* Shuffle Button */}
      <div className='flex justify-center'>
        <Button
          type='button'
          variant='outline'
          onClick={handleShuffle}
          disabled={shuffleAnimating}
          className={cn(
            'gap-2 transition-all duration-300',
            shuffleAnimating && 'opacity-50',
          )}
        >
          <Shuffle className={cn('h-4 w-4', shuffleAnimating && 'animate-spin')} />
          Random Theme
        </Button>
      </div>

      {/* Theme Grid */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-slate-900 dark:text-slate-100'>
          Available Themes
        </label>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
          {themeOptions.map((theme) => {
            const selected = isSelected(theme.colorName);
            const hovered = hoveredTheme === theme.colorName;

            return (
              <button
                key={theme.colorName}
                type='button'
                onClick={() => handleThemeSelect(theme.colorName)}
                onMouseEnter={() => setHoveredTheme(theme.colorName)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={cn(
                  'group relative flex flex-col gap-2 overflow-hidden rounded-xl transition-all duration-200',
                  selected ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950' : '',
                  hovered && !selected
                    ? 'ring-2 ring-slate-300 ring-offset-1 dark:ring-slate-600 dark:ring-offset-slate-950'
                    : '',
                  !selected && !hovered
                    ? 'ring-1 ring-slate-200 dark:ring-slate-700'
                    : '',
                )}
              >
                {/* Mini Card Preview */}
                <div
                  className={cn(
                    'relative h-24 overflow-hidden rounded-lg transition-transform duration-200',
                    hovered ? 'scale-105' : 'scale-100',
                  )}
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                >
                  <div
                    className={cn(
                      'absolute inset-0 h-full w-full rounded-lg',
                      theme.surface,
                    )}
                  >
                    {/* Pattern Overlay */}
                    <div
                      className='absolute inset-0'
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px,rgba(255,255,255,0.18) 1px,transparent 0)`,
                        backgroundSize: '12px 12px',
                      }}
                    />

                    {/* Border glow effect */}
                    <div
                      className='absolute inset-0 rounded-lg'
                      style={{
                        border: `2px solid ${theme.border}`,
                        boxShadow: `inset 0 0 12px rgba(255,255,255,0.1)`,
                      }}
                    />
                  </div>

                  {/* Selected indicator */}
                  {selected && (
                    <div
                      className={cn(
                        'absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-sm transition-opacity duration-200',
                        'bg-blue-600/40',
                      )}
                    >
                      <Check className='h-6 w-6 text-white drop-shadow-lg' />
                    </div>
                  )}
                </div>

                {/* Theme Name */}
                <div className='flex-1 overflow-hidden'>
                  <p
                    className={cn(
                      'truncate text-xs font-medium transition-colors duration-200',
                      selected
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300',
                    )}
                  >
                    {theme.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pattern Selection Info */}
      <div className='rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50'>
        <p className='text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide'>
          Available Patterns
        </p>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
          {CARD_PATTERNS.map((pattern) => (
            <div
              key={pattern.key}
              className='group flex items-center gap-2 rounded-lg p-2 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            >
              {/* Pattern Preview */}
              <div className='h-6 w-6 flex-shrink-0 rounded bg-slate-200 dark:bg-slate-700'>
                <div
                  className='h-full w-full rounded'
                  style={{
                    backgroundImage: pattern.swatchClassName.includes('radial-gradient')
                      ? pattern.swatchClassName.split('bg-[')[1]?.split(']')[0]
                      : undefined,
                  }}
                />
              </div>
              <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
                {pattern.label}
              </span>
            </div>
          ))}
        </div>
        <p className='mt-3 text-xs text-slate-500 dark:text-slate-500'>
          Patterns are applied on top of the selected color theme.
        </p>
      </div>

      {/* Selected Theme Info */}
      <div className='rounded-lg bg-gradient-to-br p-4 dark:bg-gradient-to-br'>
        <div
          className={cn(
            'rounded-lg p-4 text-white',
            selectedTheme.surface,
          )}
          style={{
            backgroundImage: selectedTheme.surface,
          }}
        >
          <p className='text-xs font-medium opacity-80 uppercase tracking-wide'>
            Current Selection
          </p>
          <p className='mt-1 text-sm font-semibold'>
            {selectedTheme.colorName}
          </p>
        </div>
      </div>

      {/* Skip Button */}
      {onSkip && (
        <div className='flex gap-2 justify-center'>
          <Button
            type='button'
            variant='ghost'
            onClick={onSkip}
            className='text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          >
            Skip & Use Default
          </Button>
        </div>
      )}
    </div>
  );
}

'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_PATTERNS } from '@/constants/card/patterns';
import type { CardTheme } from '@/models/card';

export type PatternSelectorProps = {
  patternKey: string;
  currentColor?: CardTheme; // Optional: for showing pattern preview with actual color
  onChange: (patternKey: string) => void;
};

export function PatternSelector({
  patternKey,
  currentColor,
  onChange,
}: PatternSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Pattern</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {CARD_PATTERNS.map((pattern) => (
          <button
            key={pattern.key}
            onClick={() => onChange(pattern.key)}
            type="button"
            className={cn(
              'relative w-full aspect-square rounded border-2 overflow-hidden',
              'transition-all hover:scale-105',
              patternKey === pattern.key
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-200 bg-gray-100'
            )}
            title={pattern.label}
          >
            {currentColor ? (
              // Show pattern preview with actual card color
              <div className={cn('w-full h-full', currentColor.surface)}>
                <div className={cn('w-full h-full', pattern.overlayClassName)} />
              </div>
            ) : (
              // Show pattern swatch on gray background
              <div className={cn('w-full h-full bg-gray-100', pattern.swatchClassName)} />
            )}

            {/* Checkmark for selected */}
            {patternKey === pattern.key && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

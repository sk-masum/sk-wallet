'use client';

import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_THEMES } from '@/constants/card/themes';
import { CARD_PATTERNS } from '@/constants/card/patterns';

export type ThemeColorPickerProps = {
  colorName: string;
  patternKey: string;
  onColorChange: (colorName: string) => void;
  onPatternChange: (patternKey: string) => void;
  onZoneToggle: (active: boolean) => void;
  isActive?: boolean;
};

function getPatternClass(patternKey: string): string {
  const pattern = CARD_PATTERNS.find((p) => p.key === patternKey);
  return pattern?.overlayClassName || '';
}

function getThemeByColorName(colorName: string) {
  return CARD_THEMES.find((t) => t.colorName === colorName);
}

export function ThemeColorPicker({
  colorName,
  patternKey,
  onColorChange,
  onPatternChange,
  onZoneToggle,
  isActive = false,
}: ThemeColorPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to deactivate
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onZoneToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, onZoneToggle]);

  if (isActive) {
    return (
      <div
        ref={containerRef}
        className="space-y-6 p-4 border rounded-lg bg-gray-50"
      >
        {/* Color Grid */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Colors</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {CARD_THEMES.map((theme) => (
              <button
                key={theme.colorName}
                onClick={() => onColorChange(theme.colorName)}
                className={cn(
                  'relative w-full aspect-square rounded-lg border-2 overflow-hidden',
                  'transition-all hover:scale-105',
                  colorName === theme.colorName
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-200'
                )}
                title={theme.colorName}
                type="button"
              >
                {/* Theme color background */}
                <div className={cn('w-full h-full', theme.surface)}>
                  {/* Pattern preview overlay */}
                  <div className={cn('w-full h-full', getPatternClass(patternKey))}>
                    {/* Checkmark for selected */}
                    {colorName === theme.colorName && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                {/* Color name on hover */}
                <div className="absolute inset-0 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity pb-1 pointer-events-none">
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                    {theme.colorName}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Selection */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Pattern</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {CARD_PATTERNS.map((pattern) => (
              <button
                key={pattern.key}
                onClick={() => onPatternChange(pattern.key)}
                className={cn(
                  'relative w-full aspect-square rounded border-2 overflow-hidden bg-gray-100',
                  'transition-all hover:scale-105',
                  patternKey === pattern.key
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-200'
                )}
                title={pattern.label}
                type="button"
              >
                {/* Pattern preview */}
                <div className={cn('w-full h-full', pattern.swatchClassName)} />
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
      </div>
    );
  }

  // Inactive state: Show preview button
  const theme = getThemeByColorName(colorName);

  return (
    <button
      type="button"
      onClick={() => onZoneToggle(true)}
      className="w-full px-3 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
    >
      {theme && (
        <div className={cn('w-10 h-10 rounded border border-gray-200', theme.surface)}>
          <div className={cn('w-full h-full', getPatternClass(patternKey))} />
        </div>
      )}
      <span className="text-gray-600">Select Theme & Pattern</span>
    </button>
  );
}

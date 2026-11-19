'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CardNameEditorProps = {
  cardName: string;
  onChange: (name: string) => void;
  onZoneToggle: (active: boolean) => void;
  isActive?: boolean;
  errors?: string;
};

const MAX_LENGTH = 32;
const WARNING_THRESHOLD = 24;

// Valid characters: letters, numbers, spaces, hyphens, underscores, dots
const VALID_CHAR_PATTERN = /^[a-zA-Z0-9\s\-_\.]*$/;

export function CardNameEditor({
  cardName,
  onChange,
  onZoneToggle,
  isActive = false,
  errors,
}: CardNameEditorProps) {
  const [localValue, setLocalValue] = useState(cardName || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isFull = localValue.length >= WARNING_THRESHOLD;
  const displayName = localValue || 'New Card';

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isActive]);

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

  const handleChange = (value: string) => {
    // Filter out invalid characters
    const filtered = value
      .split('')
      .filter((char) => VALID_CHAR_PATTERN.test(char))
      .join('');

    // Respect max length
    const truncated = filtered.slice(0, MAX_LENGTH);

    setLocalValue(truncated);
    onChange(truncated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape to deactivate without saving
    if (e.key === 'Escape') {
      setLocalValue(cardName || '');
      onZoneToggle(false);
    }
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };

  const handleActivate = () => {
    onZoneToggle(true);
  };

  if (isActive) {
    return (
      <div ref={containerRef} className="space-y-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_LENGTH}
            placeholder="Enter card name"
            className={cn(
              'w-full px-3 py-2 pr-10 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-2',
              isFull || errors
                ? 'border-amber-300 focus:ring-amber-400'
                : 'border-gray-300 focus:ring-blue-400',
              errors && 'border-red-500 focus:ring-red-400',
            )}
          />
          {localValue && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'text-gray-400 hover:text-gray-600 transition-colors',
                'p-0.5 rounded hover:bg-gray-100',
              )}
              title="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div
            className={cn(
              'text-sm font-medium',
              errors
                ? 'text-red-500'
                : isFull
                  ? 'text-amber-600'
                  : 'text-gray-500',
            )}
          >
            {errors || `${localValue.length}/${MAX_LENGTH}`}
          </div>
          {isFull && !errors && (
            <div className="text-xs text-amber-600">Limit approaching</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleActivate}
      className={cn(
        'w-full px-3 py-2 text-left border rounded-lg',
        'transition-colors duration-150',
        'border-gray-300 hover:bg-gray-50 hover:border-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-400',
      )}
    >
      <span className={cn(displayName === 'New Card' && 'text-gray-400')}>
        {displayName}
      </span>
    </button>
  );
}

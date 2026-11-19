'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ExpiryDateSelectorProps = {
  expiryMonth: number;
  expiryYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onZoneToggle: (active: boolean) => void;
  isActive?: boolean;
  errors?: { month?: string; year?: string };
};

type MonthOption = {
  value: number;
  label: string;
};

type YearOption = {
  value: number;
  label: string;
};

function generateMonthOptions(): MonthOption[] {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months.map((month, index) => ({
    value: index + 1,
    label: `${month} (${String(index + 1).padStart(2, '0')})`,
  }));
}

function generateYearOptions(): YearOption[] {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 15; i++) {
    years.push({
      value: currentYear + i,
      label: String(currentYear + i),
    });
  }
  return years;
}

function getMinValidMonth(year: number): number {
  const now = new Date();
  if (year === now.getFullYear()) {
    return now.getMonth() + 1;
  }
  return 1;
}

function formatExpiryDisplay(month: number, year: number): string {
  if (!month || !year) return 'MM/YY';
  return `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`;
}

function isExpiryValid(month: number, year: number): boolean {
  if (!month || !year) return false;
  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  return expiryDate > now;
}

export function ExpiryDateSelector({
  expiryMonth,
  expiryYear,
  onMonthChange,
  onYearChange,
  onZoneToggle,
  isActive = false,
  errors,
}: ExpiryDateSelectorProps) {
  const [openDropdown, setOpenDropdown] = useState<'month' | 'year' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const monthOptions = generateMonthOptions();
  const yearOptions = generateYearOptions();
  const minValidMonth = getMinValidMonth(expiryYear);

  const handleMonthChange = (month: number) => {
    onMonthChange(month);
    setOpenDropdown(null);
  };

  const handleYearChange = (year: number) => {
    onYearChange(year);
    setOpenDropdown(null);
  };

  const handleDisplayClick = () => {
    if (!isActive) {
      onZoneToggle(true);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (isActive) {
        onZoneToggle(false);
      }
      setOpenDropdown(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isActive) {
        onZoneToggle(false);
      }
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    if (isActive || openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isActive, openDropdown]);

  const hasErrors = !!(errors?.month || errors?.year);
  const displayText = formatExpiryDisplay(expiryMonth, expiryYear);

  if (!isActive) {
    return (
      <button
        type="button"
        onClick={handleDisplayClick}
        className={cn(
          'flex items-center justify-center px-4 py-2 w-full border rounded-lg transition-colors',
          hasErrors
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400',
          'cursor-pointer',
        )}
      >
        <span className={cn('text-base font-medium', !expiryMonth || !expiryYear ? 'text-gray-400' : 'text-gray-900')}>
          {displayText}
        </span>
      </button>
    );
  }

  return (
    <div ref={containerRef} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Month Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
            className={cn(
              'flex items-center justify-between px-4 py-2 w-full border rounded-lg transition-colors',
              errors?.month
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-white hover:border-gray-400',
              'cursor-pointer',
            )}
          >
            <span className={cn('text-base', expiryMonth ? 'text-gray-900 font-medium' : 'text-gray-400')}>
              {expiryMonth ? monthOptions.find((m) => m.value === expiryMonth)?.label.split(' ')[0] : 'MM'}
            </span>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform flex-shrink-0',
                openDropdown === 'month' ? 'rotate-180' : '',
              )}
            />
          </button>

          {openDropdown === 'month' && (
            <div className="absolute top-full mt-1 w-full border border-gray-300 rounded-lg bg-white shadow-lg z-50 max-h-48 overflow-y-auto">
              {monthOptions.map((option) => {
                const isDisabled = option.value < minValidMonth && expiryYear === new Date().getFullYear();
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !isDisabled && handleMonthChange(option.value)}
                    disabled={isDisabled}
                    className={cn(
                      'flex items-center px-4 py-2 w-full text-left transition-colors text-sm',
                      expiryMonth === option.value ? 'bg-blue-50 font-semibold text-blue-900' : 'hover:bg-gray-50',
                      isDisabled ? 'opacity-50 cursor-not-allowed text-gray-400' : 'cursor-pointer',
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {errors?.month && <p className="text-xs text-red-500 mt-1">{errors.month}</p>}
        </div>

        {/* Year Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')}
            className={cn(
              'flex items-center justify-between px-4 py-2 w-full border rounded-lg transition-colors',
              errors?.year ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400',
              'cursor-pointer',
            )}
          >
            <span className={cn('text-base', expiryYear ? 'text-gray-900 font-medium' : 'text-gray-400')}>
              {expiryYear ? String(expiryYear).slice(-2) : 'YY'}
            </span>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform flex-shrink-0',
                openDropdown === 'year' ? 'rotate-180' : '',
              )}
            />
          </button>

          {openDropdown === 'year' && (
            <div className="absolute top-full mt-1 w-full border border-gray-300 rounded-lg bg-white shadow-lg z-50 max-h-48 overflow-y-auto">
              {yearOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleYearChange(option.value)}
                  className={cn(
                    'flex items-center px-4 py-2 w-full text-left transition-colors text-sm',
                    expiryYear === option.value ? 'bg-blue-50 font-semibold text-blue-900' : 'hover:bg-gray-50',
                    'cursor-pointer',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {errors?.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
        </div>
      </div>

      {/* Validation Info */}
      {!isExpiryValid(expiryMonth, expiryYear) && (expiryMonth || expiryYear) && (
        <p className="text-xs text-red-500">Please enter a valid future date</p>
      )}
    </div>
  );
}

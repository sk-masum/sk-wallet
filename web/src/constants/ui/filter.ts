import type { FilterOptions } from '@/models/filter';

export const ALL_FILTER_VALUE = 'ALL' as const;
export const ALL_CATEGORY_FILTER_VALUE = 'all' as const;

export const DAY_OF_MONTH_FILTER_OPTIONS: FilterOptions<string> = Array.from(
  { length: 31 },
  (_, index) => {
    const day = String(index + 1);
    return {
      value: day,
      label: `Day ${day}`,
    };
  },
);

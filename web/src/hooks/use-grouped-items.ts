'use client';

import { useMemo } from 'react';

export type GroupedItems<T> = {
  label: string;
  items: T[];
};

export function useGroupedItems<T>(
  items: T[],
  getGroupLabel: (item: T) => string,
): GroupedItems<T>[] {
  return useMemo(() => {
    const groups = new Map<string, T[]>();

    for (const item of items) {
      const label = getGroupLabel(item);
      const current = groups.get(label) ?? [];
      current.push(item);
      groups.set(label, current);
    }

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, groupedItems]) => ({ label, items: groupedItems }));
  }, [items, getGroupLabel]);
}

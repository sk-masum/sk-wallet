import { useMemo } from 'react';

type UseActiveFilterControlsOptions = {
  query: string;
  activityFlags: boolean[];
  countFlags?: boolean[];
};

type ActiveFilterControlsState = {
  hasTextQuery: boolean;
  hasActiveControls: boolean;
  activeFilterCount: number;
};

export function useActiveFilterControls({
  query,
  activityFlags,
  countFlags,
}: UseActiveFilterControlsOptions): ActiveFilterControlsState {
  return useMemo(() => {
    const hasTextQuery = query.length > 0;
    const effectiveCountFlags = countFlags ?? activityFlags;
    const activeFilterCount = effectiveCountFlags.reduce((count, flag) => count + Number(flag), 0);
    const hasActiveControls = hasTextQuery || activityFlags.some(Boolean);

    return {
      hasTextQuery,
      hasActiveControls,
      activeFilterCount,
    };
  }, [activityFlags, countFlags, query]);
}

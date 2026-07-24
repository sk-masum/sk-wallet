'use client';

import { useEffect } from 'react';

export function useResetStateOnChange<TValue, TState>(
  value: TValue,
  setState: (next: TState) => void,
  resetValue: TState,
) {
  useEffect(() => {
    setState(resetValue);
  }, [value, setState, resetValue]);
}

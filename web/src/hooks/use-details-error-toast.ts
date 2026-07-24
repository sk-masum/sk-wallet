'use client';

import { useEffect } from 'react';

import { showToast } from '@/lib/toast';

export function useDetailsErrorToast(detailsError: string | null) {
  useEffect(() => {
    if (!detailsError) return;

    showToast({
      message: detailsError,
      variant: 'error',
    });
  }, [detailsError]);
}

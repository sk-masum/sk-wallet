'use client';

import { useEffect } from 'react';

import { showToast } from '@/lib/toast';

type UseSuccessQueryToastOptions = {
  successMessage: string | null;
  onConsumed?: () => void;
};

export function useSuccessQueryToast({
  successMessage,
  onConsumed,
}: UseSuccessQueryToastOptions) {
  useEffect(() => {
    if (!successMessage) return;

    showToast({ message: successMessage, variant: 'success' });
    onConsumed?.();
  }, [onConsumed, successMessage]);
}

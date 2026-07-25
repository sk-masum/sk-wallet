'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { showToast, type AppToastVariant } from '@/lib/toast';

export function QueryToastBridge() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handledKeyRef = useRef<string>('');

  useEffect(() => {
    const paramsString = searchParams.toString();
    if (!paramsString) return;

    const errorMessage = searchParams.get('error');
    const successMessage = searchParams.get('success');

    if (!errorMessage && !successMessage) {
      handledKeyRef.current = '';
      return;
    }

    const key = `${pathname}?${paramsString}`;
    if (handledKeyRef.current === key) return;
    handledKeyRef.current = key;

    const message = errorMessage ?? successMessage ?? '';
    const variant: AppToastVariant = errorMessage ? 'error' : 'success';

    if (message) {
      showToast({
        message: decodeURIComponent(message),
        variant,
      });
    }

    const nextParams = new URLSearchParams(paramsString);
    nextParams.delete('error');
    nextParams.delete('success');

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}

'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { APP_TOAST_EVENT, type AppToastPayload, type AppToastVariant } from '@/lib/toast';

type ToastItem = {
  id: string;
  message: string;
  variant: AppToastVariant;
};

const DEFAULT_DURATION_MS = 3200;

function getVariantClasses(variant: AppToastVariant) {
  switch (variant) {
    case 'success':
      return 'border-emerald-300/40 bg-emerald-500/15 text-emerald-100';
    case 'error':
      return 'border-red-300/40 bg-red-500/15 text-red-100';
    default:
      return 'border-slate-300/40 bg-slate-500/15 text-slate-100';
  }
}

export function AppToaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<AppToastPayload>;
      const detail = customEvent.detail;

      if (!detail?.message) return;

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const variant = detail.variant ?? 'info';
      const durationMs = detail.durationMs ?? DEFAULT_DURATION_MS;

      setToasts((previous) => [...previous, { id, message: detail.message, variant }]);

      window.setTimeout(() => {
        setToasts((previous) => previous.filter((toast) => toast.id !== id));
      }, durationMs);
    };

    window.addEventListener(APP_TOAST_EVENT, onToast as EventListener);
    return () => window.removeEventListener(APP_TOAST_EVENT, onToast as EventListener);
  }, []);

  const hasToasts = useMemo(() => toasts.length > 0, [toasts.length]);

  if (!hasToasts) return null;

  return (
    <div className='pointer-events-none fixed right-4 top-4 z-[100] flex max-w-sm flex-col gap-2'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-2 rounded-md border px-3 py-2 text-sm shadow-lg backdrop-blur-md',
            getVariantClasses(toast.variant),
          )}
          role='status'
          aria-live='polite'
        >
          <p className='min-w-0 flex-1'>{toast.message}</p>
          <button
            type='button'
            onClick={() => setToasts((previous) => previous.filter((item) => item.id !== toast.id))}
            className='rounded p-0.5 opacity-80 transition-opacity hover:opacity-100'
            aria-label='Dismiss notification'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      ))}
    </div>
  );
}

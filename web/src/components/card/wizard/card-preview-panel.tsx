'use client';

import { useMemo } from 'react';

import { CardFace } from '@/components/card/card-face';
import { cn } from '@/lib/utils';
import type { WalletCard } from '@/models/card';
import { resolveNetworkLabel } from '@/utils/card/network';
import { getCardTheme, getCardThemeByColorName } from '@/utils/card/theme';

export type CardPreviewPanelProps = {
  cardData: Partial<WalletCard>;
  isAnimating?: boolean;
  className?: string;
};

export function CardPreviewPanel({
  cardData,
  isAnimating = false,
  className,
}: CardPreviewPanelProps) {
  const previewCard = useMemo<WalletCard>(() => {
    const id = cardData.id ?? 'preview';
    const colorName = cardData.color_name?.trim() ?? '';
    const theme = colorName
      ? getCardThemeByColorName(colorName)
      : getCardTheme(String(id));

    return {
      id,
      owner_id: cardData.owner_id ?? null,
      created_at: cardData.created_at ?? null,
      updated_at: cardData.updated_at ?? null,
      expiry_month: cardData.expiry_month ?? null,
      expiry_year: cardData.expiry_year ?? null,
      card_name: cardData.card_name ?? 'New Card',
      color_name: theme.colorName,
      tags: cardData.tags ?? null,
      provider: cardData.provider ?? null,
      provider_id: cardData.provider_id ?? null,
      credit_limit: cardData.credit_limit ?? null,
      billing_date: cardData.billing_date ?? null,
      payment_date: cardData.payment_date ?? null,
      number: cardData.number ?? '',
      cvv: cardData.cvv ?? '',
      holder_name: cardData.holder_name ?? 'CARD HOLDER',
      network: cardData.network ?? 1,
      isCredit: cardData.isCredit ?? false,
      status: cardData.status ?? undefined,
    };
  }, [cardData]);

  const networkLabel = useMemo(
    () => resolveNetworkLabel(previewCard.network),
    [previewCard.network],
  );

  const provider = useMemo(
    () => previewCard.provider?.trim() || 'No Provider',
    [previewCard.provider],
  );

  const cardType = useMemo(() => {
    return previewCard.isCredit ? 'Credit Card' : 'Debit Card';
  }, [previewCard.isCredit]);

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div className='w-full space-y-2'>
        <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
          Card Preview
        </h2>
        <p className='text-sm text-slate-600 dark:text-slate-400'>
          Real-time preview of your card
        </p>
      </div>

      <div
        className={cn(
          'relative w-full transition-all duration-300 ease-out',
          isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100',
        )}
      >
        <div
          className={cn(
            'transform transition-all duration-300 ease-out',
            isAnimating ? 'animate-pulse' : '',
          )}
          style={{
            animation: isAnimating
              ? 'cardPulse 0.6s ease-in-out'
              : 'none',
          }}
        >
          <style>{`
            @keyframes cardPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.85; }
            }
            @keyframes cardEntrance {
              from {
                opacity: 0;
                transform: scale(0.95) rotateX(20deg);
              }
              to {
                opacity: 1;
                transform: scale(1) rotateX(0deg);
              }
            }
            .card-entrance {
              animation: cardEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}</style>
          <div className='card-entrance max-w-sm mx-auto'>
            <CardFace card={previewCard} className='shadow-xl' />
          </div>
        </div>
      </div>

      <div className='w-full max-w-sm space-y-4'>
        <div className='rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                Card Type
              </span>
              <span className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                {cardType}
              </span>
            </div>

            <div className='h-px bg-slate-200 dark:bg-slate-700' />

            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                Network
              </span>
              <span className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                {networkLabel}
              </span>
            </div>

            <div className='h-px bg-slate-200 dark:bg-slate-700' />

            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
                Provider
              </span>
              <span className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                {provider}
              </span>
            </div>
          </div>
        </div>

        {previewCard.card_name && previewCard.card_name !== 'New Card' && (
          <div className='rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20'>
            <p className='text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wide'>
              Card Name
            </p>
            <p className='mt-1 text-sm font-semibold text-blue-900 dark:text-blue-100 truncate'>
              {previewCard.card_name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

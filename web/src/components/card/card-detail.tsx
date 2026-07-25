import { Eye, EyeOff } from 'lucide-react';
import type { WalletCard } from '@/models/card';
import { Button } from '../ui/button';
import { responsiveIconSizes } from '../ui/icon-sizes';
import { CardFace } from './card-face';
import { cn } from '@/lib/utils';
import { DialogActions } from '../shared/dialog-actions';
import { CardStatusSelect } from './card-status-select';
import type { CardStatus } from '@/models/card';
import { SURFACE_REVEAL_CLASS } from '@/constants/ui/animation';

interface CardDetailProps {
  selectedCard: WalletCard;
  showCardNumber: boolean;
  isUpdatingStatus: boolean;
  isDeleting: boolean;
  hydrated: boolean;
  router: { push: (href: string) => void };
  selectedStatus: CardStatus;
  toggleNumberVisibility: () => void;
  setConfirmDeleteOpen: (open: boolean) => void;
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (itemId: string) => void;
  setSelectedStatus: (status: CardStatus) => void;
  handleStatusUpdate: () => void;
}

export function CardDetail({
  selectedCard,
  showCardNumber,
  toggleNumberVisibility,
  isUpdatingStatus,
  isDeleting,
  setConfirmDeleteOpen,
  hydrated,
  isFavorite,
  toggleFavorite,
  router,
  selectedStatus,
  setSelectedStatus,
  handleStatusUpdate,
}: CardDetailProps) {
  return (
    <div>
      <CardFace
        card={selectedCard}
        showCardNumber={showCardNumber}
        showCreditLimit
        expiryAlignStart
        className='rounded-b-none'
        allowCopyNumber
        allowCopyExpiry
        allowCopyCvv
      />

      <div className='-mt-px rounded-b-2xl border border-t-0 border-border/65 bg-linear-to-b from-background/94 to-muted/35 px-3 pb-3 pt-2.5 backdrop-blur-md sm:px-4 sm:pb-4 sm:pt-3'>
        {selectedCard.billing_date != null || selectedCard.payment_date != null ? (
          <div className='mb-2.5 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs'>
            <div>
              <p className='text-[11px] font-semibold tracking-[0.08em] text-text-subtle uppercase'>
                Billing date
              </p>
              <p className='mt-0.5 text-sm font-medium text-foreground'>
                {selectedCard.billing_date != null ? `${selectedCard.billing_date}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className='text-[11px] font-semibold tracking-[0.08em] text-text-subtle uppercase'>
                Payment date
              </p>
              <p className='mt-0.5 text-sm font-medium text-foreground'>
                {selectedCard.payment_date != null ? `${selectedCard.payment_date}` : 'N/A'}
              </p>
            </div>
          </div>
        ) : null}

        <div className={cn('grid grid-cols-4 gap-2', SURFACE_REVEAL_CLASS)}>
          <Button
            type='button'
            variant='action'
            size='action'
            onClick={() => toggleNumberVisibility()}
            disabled={isUpdatingStatus || isDeleting}
          >
            {showCardNumber ? (
              <EyeOff className={cn(responsiveIconSizes.action, 'text-text-subtle')} />
            ) : (
              <Eye className={cn(responsiveIconSizes.action, 'text-text-subtle')} />
            )}
          </Button>
          <DialogActions
            handleToggleFavorite={() => {
              if (!selectedCard) return;
              toggleFavorite(`card:${selectedCard.id}`);
            }}
            handleEdit={() => {
              if (!selectedCard) return;
              router.push(`/card/${selectedCard.id}`);
            }}
            handleDelete={() => setConfirmDeleteOpen(true)}
            isProcessing={isUpdatingStatus || isDeleting}
            isSelectedFavorite={selectedCard && hydrated && isFavorite(`card:${selectedCard.id}`)}
          />
        </div>

        <div
          className={cn(
            'mt-2.5 border-t border-border/55 pt-2.5 sm:mt-3 sm:pt-3',
            SURFACE_REVEAL_CLASS,
          )}
        >
          <div className='space-y-2 rounded-xl border border-border/60 bg-background/75 p-4'>
            <p className='text-[11px] font-semibold tracking-[0.08em] text-text-subtle uppercase'>
              Card status
            </p>
            <div className='flex gap-2 flex-row sm:items-center'>
              <CardStatusSelect
                value={selectedStatus}
                onStatusChange={setSelectedStatus}
                disabled={isUpdatingStatus || isDeleting}
                triggerClassName='h-10 flex-1 rounded-lg border border-border/65 bg-background px-3 text-sm'
              />
              <Button
                type='button'
                variant='neutral'
                size='md'
                className='rounded-lg'
                onClick={handleStatusUpdate}
                disabled={isUpdatingStatus || isDeleting}
              >
                {isUpdatingStatus ? 'Updating...' : 'Update status'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

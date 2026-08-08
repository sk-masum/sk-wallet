import { Skeleton } from '@/components/ui/skeleton';
import { ListingPageLoading } from '@/components/shared/listing-page-loading';
import { VaultListLoadingGrid } from '@/components/shared/vault-list-loading-grid';

export default function Loading() {
  return (
    <ListingPageLoading title='Documents'>
      <VaultListLoadingGrid
        renderItem={() => (
          <div className='relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm'>
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-glass-overlay to-transparent dark:via-glass-overlay-soft' />
            <div className='relative space-y-3'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-4 w-42' />
              <div className='flex items-center justify-between gap-2'>
                <Skeleton className='h-4 w-34' />
                <Skeleton className='h-5 w-18 rounded-full' />
              </div>
            </div>
          </div>
        )}
      />
    </ListingPageLoading>
  );
}

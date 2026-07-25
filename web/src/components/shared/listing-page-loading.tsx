import { Skeleton } from '@/components/ui/skeleton';

import { ListingPageLayout } from '@/components/shared/listing-page-layout';

type ListingPageLoadingProps = {
  title: string;
  showFilters?: boolean;
  showCardFilters?: boolean;
  children: React.ReactNode;
};

export function ListingPageLoading({
  title,
  showFilters = true,
  showCardFilters = false,
  children,
}: ListingPageLoadingProps) {
  return (
    <ListingPageLayout title={title} addLabel='Add' addHref='#'>
      <div className='listing-mobile-sticky-shell'>
        {showFilters ? (
          <>
            <div className='mb-4 sm:hidden'>
              <div className='flex items-center gap-2 py-2'>
                <Skeleton className='h-10 flex-1 rounded-xl' />
                <Skeleton className='h-10 w-28 rounded-xl' />
              </div>
            </div>

            <div className='mb-4 hidden items-center gap-3 sm:flex'>
              <Skeleton className='h-10 flex-1 rounded-xl' />
              <Skeleton className='h-10 w-26 rounded-xl' />
              <Skeleton className='h-10 w-20 rounded-xl' />
            </div>
          </>
        ) : null}
      </div>

      {showCardFilters ? (
        <>
          <div className='mb-5 hidden gap-2 sm:flex'>
            <Skeleton className='h-6 w-28 rounded-full' />
            <Skeleton className='h-6 w-24 rounded-full' />
          </div>
        </>
      ) : null}

      {children}

      <div className='pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden'>
        <div className='flex items-center'>
          <Skeleton className='h-15 w-70 rounded-4xl' />
          <Skeleton className='ml-3 h-15 w-15 rounded-4xl' />
        </div>
      </div>
    </ListingPageLayout>
  );
}

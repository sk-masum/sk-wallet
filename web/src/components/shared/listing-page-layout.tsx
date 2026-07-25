import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { BottomTabBar } from '../ui/bottom-tab-bar';
import { ListingPageHeader } from './listing-page-header';

type ListingPageLayoutProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  filters?: any;
  title: string;
  addLabel: string;
  addHref?: string;
};

export function ListingPageLayout({
  children,
  className,
  contentClassName,
  filters,
  title,
  addLabel,
  addHref,
}: ListingPageLayoutProps) {
  return (
    <main className={cn('min-h-screen', className)}>
      <div
        className={cn(
          'max-w-212.5 mx-auto w-full px-4 pb-28 pt-0 sm:pt-12 sm:px-6 lg:px-8',
          contentClassName,
        )}
      >
        <ListingPageHeader
          title={title}
          className='pt-6'
          showBackButton
          backHref='/'
          backButtonLabel='Back to dashboard'
          addLabel={addLabel}
          mobileFilters={filters}
        />
        <section className='pt-4 sm:pt-8'>{children}</section>

        <BottomTabBar addHref={addHref} addLabel={addLabel} />
      </div>
    </main>
  );
}

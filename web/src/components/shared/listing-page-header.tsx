import type { ReactNode } from 'react';

import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';

type ListingPageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  addLabel: string;
  className?: string;
  showBackButton?: boolean;
  backHref?: string;
  backButtonLabel?: string;
  mobileFilters?: ReactNode;
  desktopFilters?: ReactNode;
  activeFilters?: ReactNode;
  mobileStickyHeader?: boolean;
};

const sharedDesktopAddButtonClass =
  'hidden sm:inline-flex ring-1 ring-primary/30 shadow-[0_14px_28px_-16px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-16px_hsl(var(--primary)/0.72)]';

export function ListingPageHeader({
  title,
  addLabel,
  className,
  showBackButton = false,
  backHref = '/',
  backButtonLabel,
  mobileFilters,
  desktopFilters,
  activeFilters,
  mobileStickyHeader = false,
}: ListingPageHeaderProps) {
  return (
    <>
      {mobileStickyHeader ? (
        <div className={cn('listing-mobile-sticky-shell sm:mb-4', mobileFilters ? 'mb-4' : 'mb-0')}>
          <PageHeader
            title={title}
            showBackButton={showBackButton}
            backHref={backHref}
            backButtonLabel={backButtonLabel}
            backButtonIcon='dashboard'
            backButtonAlign='right'
            showAddButton
            addButtonLabel={addLabel}
            addButtonClassName={sharedDesktopAddButtonClass}
            className={cn('mb-3 sm:mb-4', className)}
          />
          {mobileFilters}
        </div>
      ) : (
        <>
          <PageHeader
            title={title}
            showBackButton={showBackButton}
            backHref={backHref}
            backButtonLabel={backButtonLabel}
            backButtonIcon='dashboard'
            backButtonAlign='right'
            showAddButton
            addButtonLabel={addLabel}
            addButtonClassName={sharedDesktopAddButtonClass}
            className={cn('mb-3 sm:mb-8', className)}
          />
          {mobileFilters}
        </>
      )}

      {desktopFilters}
      {activeFilters}
    </>
  );
}

type ListingFilterRowProps = {
  children: ReactNode;
  className?: string;
};

export function ListingDesktopFilterRow({ children, className }: ListingFilterRowProps) {
  return (
    <div
      className={cn(
        'mb-4 hidden items-center gap-3 rounded-2xl border border-glass-border-soft bg-glass p-3 shadow-neu-raised-sm backdrop-blur  sm:flex',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ListingActiveFiltersRow({ children, className }: ListingFilterRowProps) {
  return (
    <div className={cn('mb-5 hidden flex-wrap items-center gap-2 sm:flex', className)}>
      {children}
    </div>
  );
}

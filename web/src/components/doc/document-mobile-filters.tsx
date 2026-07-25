'use client';

import { usePathname } from 'next/navigation';
import { CreditCard } from 'lucide-react';

import {
  ListingFilterDesktopActions,
  ListingFilterDesktopPanel,
  ListingFilterDesktopSection,
  ListingFilterMobileActions,
  ListingFilterMobileSection,
  ListingFilterMobileSheet,
} from '@/components/shared/listing-filter-panels';
import { ListingFilterSelect } from '@/components/shared/listing-filter-select';
import { ListingFilterTopBar } from '@/components/shared/listing-filter-topbar';
import { useFilterDialogState } from '@/hooks/use-filter-dialog-state';
import { DOCUMENT_SORT_OPTIONS } from '@/constants/doc/filters';
import { DOCUMENT_CATEGORY_OPTIONS } from '@/constants/document/categories';
import { DOCUMENT_TYPE_OPTIONS } from '@/constants/document/types';
import { ALL_CATEGORY_FILTER_VALUE, ALL_FILTER_VALUE } from '@/constants/ui/filter';
import {
  DEFAULT_DOCUMENT_SORT,
  type DocumentSort,
  useDocumentVaultStore,
} from '@/lib/stores/document-vault-store';
import { useActiveFilterControls } from '@/hooks/use-active-filter-controls';
import {
  hasNonDefaultFilterValue,
  hasSpecificFilterValue,
  toTypedFilterValue,
} from '@/utils/filter/value';

export function DocumentMobileFilters() {
  const {
    mobileOpen,
    desktopOpen,
    openMobileFilters,
    setMobileOpen,
    toggleDesktopFilters,
    closeDesktopFilters,
  } = useFilterDialogState();
  const pathname = usePathname();
  const query = useDocumentVaultStore((state) => state.query);
  const selectedType = useDocumentVaultStore((state) => state.typeFilter);
  const selectedCategory = useDocumentVaultStore((state) => state.categoryFilter);
  const selectedSort = useDocumentVaultStore((state) => state.sortBy);
  const setFilters = useDocumentVaultStore((state) => state.setFilters);
  const setSortBy = useDocumentVaultStore((state) => state.setSortBy);

  const hasTypeFilter = hasSpecificFilterValue(selectedType, ALL_FILTER_VALUE);
  const hasCategoryFilter = hasSpecificFilterValue(selectedCategory, ALL_CATEGORY_FILTER_VALUE);
  const hasSortSelection = hasNonDefaultFilterValue(selectedSort, DEFAULT_DOCUMENT_SORT);
  const { hasTextQuery, hasActiveControls, activeFilterCount } = useActiveFilterControls({
    query,
    activityFlags: [hasTypeFilter, hasCategoryFilter, hasSortSelection],
  });

  const clearAll = () => {
    setFilters({
      query: '',
      typeFilter: ALL_FILTER_VALUE,
      categoryFilter: ALL_CATEGORY_FILTER_VALUE,
    });
    setSortBy(DEFAULT_DOCUMENT_SORT);
  };

  const handleTypeChange = (value: string) => {
    setFilters({ typeFilter: value });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ categoryFilter: value });
  };

  const handleSortChange = (value: string) => {
    setSortBy(toTypedFilterValue<DocumentSort>(value));
  };

  return (
    <>
      <ListingFilterTopBar
        formAction={pathname}
        searchValue={query}
        searchMode='controlled'
        onSearchChange={(value) => setFilters({ query: value })}
        onClearSearch={() => setFilters({ query: '' })}
        mobileSearchPlaceholder='Search documents'
        desktopSearchPlaceholder='Search by number, type, or name'
        mobileSearchAriaLabel='Search documents'
        desktopSearchAriaLabel='Search documents'
        mobileFilterCount={activeFilterCount}
        onOpenMobileFilters={openMobileFilters}
        hasTextQuery={hasTextQuery}
        hasActiveControls={hasActiveControls}
        onResetAll={clearAll}
        desktopFilterOpen={desktopOpen}
        onToggleDesktopFilters={toggleDesktopFilters}
        desktopExpandedClassName=''
        desktopPanel={
          <ListingFilterDesktopPanel>
            <div className='grid grid-cols-2 gap-4'>
              <ListingFilterDesktopSection label='Type'>
                <ListingFilterSelect
                  value={selectedType}
                  onValueChange={handleTypeChange}
                  ariaLabel='Filter by document type'
                  placeholder='Filter by type'
                  allOption={{ value: ALL_FILTER_VALUE, label: 'All types' }}
                  options={DOCUMENT_TYPE_OPTIONS.map((item) => ({
                    value: item.code,
                    label: item.label,
                  }))}
                />
              </ListingFilterDesktopSection>

              <ListingFilterDesktopSection label='Category'>
                <ListingFilterSelect
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  ariaLabel='Filter by document category'
                  placeholder='Filter by category'
                  allOption={{ value: ALL_CATEGORY_FILTER_VALUE, label: 'All categories' }}
                  options={DOCUMENT_CATEGORY_OPTIONS.map((item) => ({
                    value: item.value,
                    label: item.label,
                  }))}
                />
              </ListingFilterDesktopSection>
            </div>

            <ListingFilterDesktopSection label='Sort'>
              <ListingFilterSelect
                value={selectedSort}
                onValueChange={handleSortChange}
                ariaLabel='Sort documents'
                placeholder='Newest first'
                options={DOCUMENT_SORT_OPTIONS.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />
            </ListingFilterDesktopSection>

            <ListingFilterDesktopActions
              hasActiveControls={hasActiveControls}
              onReset={clearAll}
              onCollapse={closeDesktopFilters}
            />
          </ListingFilterDesktopPanel>
        }
      />

      <ListingFilterMobileSheet
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        title='Refine documents'
        description='Apply document filters in one place.'
      >
        <ListingFilterMobileSection label='Type' icon={<CreditCard className='h-3.5 w-3.5' />}>
          <ListingFilterSelect
            value={selectedType}
            onValueChange={handleTypeChange}
            ariaLabel='Filter by document type'
            placeholder='Filter by type'
            allOption={{ value: ALL_FILTER_VALUE, label: 'All types' }}
            options={DOCUMENT_TYPE_OPTIONS.map((item) => ({ value: item.code, label: item.label }))}
          />
        </ListingFilterMobileSection>

        <ListingFilterMobileSection label='Category' icon={<CreditCard className='h-3.5 w-3.5' />}>
          <ListingFilterSelect
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            ariaLabel='Filter by document category'
            placeholder='Filter by category'
            allOption={{ value: ALL_CATEGORY_FILTER_VALUE, label: 'All categories' }}
            options={DOCUMENT_CATEGORY_OPTIONS.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        </ListingFilterMobileSection>

        <ListingFilterMobileSection label='Sort' icon={<CreditCard className='h-3.5 w-3.5' />}>
          <ListingFilterSelect
            value={selectedSort}
            onValueChange={handleSortChange}
            ariaLabel='Sort documents'
            placeholder='Newest first'
            options={DOCUMENT_SORT_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
        </ListingFilterMobileSection>

        <ListingFilterMobileActions
          hasActiveControls={hasActiveControls}
          onReset={clearAll}
          onDone={() => setMobileOpen(false)}
        />
      </ListingFilterMobileSheet>
    </>
  );
}

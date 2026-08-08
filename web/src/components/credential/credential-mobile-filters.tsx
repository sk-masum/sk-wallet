'use client';

import { usePathname } from 'next/navigation';
import { ArrowUpDown, CreditCard } from 'lucide-react';

import {
  ListingFilterDesktopActions,
  ListingFilterDesktopPanel,
  ListingFilterMobileActions,
  ListingFilterMobileSheet,
} from '@/components/shared/listing-filter-panels';
import {
  ListingFilterDesktopSelectSections,
  ListingFilterMobileSelectSections,
  type ListingFilterSelectSectionConfig,
} from '@/components/shared/listing-filter-select-sections';
import { ListingFilterTopBar } from '@/components/shared/listing-filter-topbar';
import { CREDENTIAL_GROUP_OPTIONS, CREDENTIAL_SORT_OPTIONS } from '@/constants/credential/filters';
import { CREDENTIAL_TYPE_OPTIONS } from '@/constants/credential/types';
import { ALL_FILTER_VALUE } from '@/constants/ui/filter';
import { useActiveFilterControls } from '@/hooks/use-active-filter-controls';
import { useFilterDialogState } from '@/hooks/use-filter-dialog-state';
import {
  DEFAULT_CREDENTIAL_GROUP,
  DEFAULT_CREDENTIAL_SORT,
  type CredentialGroup,
  type CredentialSort,
  useCredentialVaultStore,
} from '@/lib/stores/credential-vault-store';
import {
  hasNonDefaultFilterValue,
  hasSpecificFilterValue,
  toTypedFilterValue,
} from '@/utils/filter/value';

export function CredentialMobileFilters() {
  const {
    mobileOpen,
    desktopOpen,
    openMobileFilters,
    setMobileOpen,
    toggleDesktopFilters,
    closeDesktopFilters,
  } = useFilterDialogState();
  const pathname = usePathname();
  const query = useCredentialVaultStore((state) => state.query);
  const selectedType = useCredentialVaultStore((state) => state.typeFilter);
  const selectedSort = useCredentialVaultStore((state) => state.sortBy);
  const selectedGroup = useCredentialVaultStore((state) => state.groupBy);
  const setFilters = useCredentialVaultStore((state) => state.setFilters);
  const setSortBy = useCredentialVaultStore((state) => state.setSortBy);
  const setGroupBy = useCredentialVaultStore((state) => state.setGroupBy);

  const hasTypeFilter = hasSpecificFilterValue(selectedType);
  const hasSortOverride = hasNonDefaultFilterValue(selectedSort, DEFAULT_CREDENTIAL_SORT);
  const hasGroupSelection = hasNonDefaultFilterValue(selectedGroup, DEFAULT_CREDENTIAL_GROUP);
  const { hasTextQuery, hasActiveControls, activeFilterCount } = useActiveFilterControls({
    query,
    activityFlags: [hasTypeFilter, hasSortOverride, hasGroupSelection],
    countFlags: [hasTypeFilter],
  });

  const clearAll = () => {
    setFilters({ query: '', typeFilter: ALL_FILTER_VALUE });
    setSortBy(DEFAULT_CREDENTIAL_SORT);
    setGroupBy(DEFAULT_CREDENTIAL_GROUP);
  };

  const handleTypeChange = (value: string) => {
    setFilters({ typeFilter: value });
  };

  const filterSections: ListingFilterSelectSectionConfig[] = [
    {
      id: 'type',
      desktopLabel: 'Credential type',
      mobileLabel: 'Type',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: selectedType,
      onValueChange: handleTypeChange,
      ariaLabel: 'Filter by credential type',
      placeholder: 'Filter by type',
      allOption: { value: ALL_FILTER_VALUE, label: 'All types' },
      options: CREDENTIAL_TYPE_OPTIONS.map((item) => ({
        value: item.code,
        label: item.label,
      })),
    },
    {
      id: 'group',
      desktopLabel: 'Group',
      mobileLabel: 'Group',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: selectedGroup,
      onValueChange: (value) => setGroupBy(toTypedFilterValue<CredentialGroup>(value)),
      ariaLabel: 'Group credentials',
      placeholder: 'No grouping',
      options: CREDENTIAL_GROUP_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    },
    {
      id: 'sort',
      desktopLabel: 'Sort',
      mobileLabel: 'Sort',
      mobileIcon: <ArrowUpDown className='h-3.5 w-3.5' />,
      value: selectedSort,
      onValueChange: (value) => setSortBy(toTypedFilterValue<CredentialSort>(value)),
      ariaLabel: 'Sort credentials',
      placeholder: 'Sort credentials',
      options: CREDENTIAL_SORT_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    },
  ];

  return (
    <>
      <ListingFilterTopBar
        formAction={pathname}
        searchValue={query}
        searchMode='controlled'
        onSearchChange={(value) => setFilters({ query: value })}
        onClearSearch={() => setFilters({ query: '' })}
        mobileSearchPlaceholder='Search credentials'
        desktopSearchPlaceholder='Search credentials by service, identifier, or type'
        mobileSearchAriaLabel='Search credentials'
        desktopSearchAriaLabel='Search credentials'
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
            <ListingFilterDesktopSelectSections sections={filterSections} />

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
        title='Refine credentials'
        description='Apply credential filters in one place.'
      >
        <ListingFilterMobileSelectSections sections={filterSections} />

        <ListingFilterMobileActions
          hasActiveControls={hasActiveControls}
          onReset={clearAll}
          onDone={() => setMobileOpen(false)}
        />
      </ListingFilterMobileSheet>
    </>
  );
}

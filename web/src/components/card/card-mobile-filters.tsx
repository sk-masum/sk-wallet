'use client';

import { useEffect, useState } from 'react';
import { ArrowUpDown, CreditCard, Layers3, Network } from 'lucide-react';

import {
  ListingFilterDesktopActions,
  ListingFilterDesktopPanel,
  ListingFilterDesktopSection,
  ListingFilterMobileActions,
  ListingFilterMobileSection,
  ListingFilterMobileSheet,
} from '@/components/shared/listing-filter-panels';
import {
  ListingFilterDesktopSelectSections,
  ListingFilterMobileSelectSections,
  type ListingFilterSelectSectionConfig,
} from '@/components/shared/listing-filter-select-sections';
import { ListingFilterTopBar } from '@/components/shared/listing-filter-topbar';
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group';
import {
  CARD_EXPIRY_OPTIONS,
  CARD_GROUP_OPTIONS,
  CARD_SORT_OPTIONS,
} from '@/constants/card/filters';
import { ALL_FILTER_VALUE, DAY_OF_MONTH_FILTER_OPTIONS } from '@/constants/ui/filter';
import { useFilterDialogState } from '@/hooks/use-filter-dialog-state';
import {
  selectCardFilterMeta,
  useCardVaultStore,
  type CardGroup,
  type CardExpiryFilter,
  type CardSort,
} from '@/lib/stores/card-vault-store';
import {
  fromFilterSelectValue,
  toFilterSelectValue,
  toTypedFilterValue,
} from '@/utils/filter/value';

export function CardMobileFilters() {
  const {
    mobileOpen,
    desktopOpen,
    openMobileFilters,
    setMobileOpen,
    toggleDesktopFilters,
    closeDesktopFilters,
  } = useFilterDialogState();
  const [creditLimitRange, setCreditLimitRange] = useState<[number, number]>([0, 0]);

  const query = useCardVaultStore((state) => state.query);
  const selectedType = useCardVaultStore((state) => state.typeFilter);
  const selectedNetwork = useCardVaultStore((state) => state.networkFilter);
  const selectedProvider = useCardVaultStore((state) => state.providerFilter);
  const selectedTag = useCardVaultStore((state) => state.tagFilter);
  const selectedExpiry = useCardVaultStore((state) => state.expiryFilter);
  const selectedBillingDate = useCardVaultStore((state) => state.billingDate);
  const selectedPaymentDate = useCardVaultStore((state) => state.paymentDate);
  const selectedSort = useCardVaultStore((state) => state.sortBy);
  const selectedGroup = useCardVaultStore((state) => state.groupBy);

  const setFilters = useCardVaultStore((state) => state.setFilters);
  const setSortBy = useCardVaultStore((state) => state.setSortBy);
  const setGroupBy = useCardVaultStore((state) => state.setGroupBy);
  const setCreditLimitRangeInStore = useCardVaultStore((state) => state.setCreditLimitRange);
  const resetFilters = useCardVaultStore((state) => state.resetFilters);

  const meta = useCardVaultStore(selectCardFilterMeta);

  useEffect(() => {
    setCreditLimitRange([meta.selectedCreditLimitMin, meta.selectedCreditLimitMax]);
  }, [meta.selectedCreditLimitMin, meta.selectedCreditLimitMax]);

  const commitCreditLimitRange = (minLimit: number, maxLimit: number) => {
    if (meta.creditLimitBounds.min >= meta.creditLimitBounds.max) {
      setCreditLimitRangeInStore(null, null);
      return;
    }

    const normalizedMin = Math.max(meta.creditLimitBounds.min, Math.min(minLimit, maxLimit));
    const normalizedMax = Math.min(meta.creditLimitBounds.max, Math.max(minLimit, maxLimit));

    setCreditLimitRangeInStore(
      normalizedMin <= meta.creditLimitBounds.min ? null : normalizedMin,
      normalizedMax >= meta.creditLimitBounds.max ? null : normalizedMax,
    );
  };

  const selectSections: ListingFilterSelectSectionConfig[] = [
    {
      id: 'network',
      desktopLabel: 'Network',
      mobileLabel: 'Network',
      mobileIcon: <Network className='h-3.5 w-3.5' />,
      value: toFilterSelectValue(selectedNetwork),
      onValueChange: (value) => setFilters({ networkFilter: fromFilterSelectValue(value) }),
      ariaLabel: 'Filter by network',
      placeholder: 'All networks',
      allOption: { value: ALL_FILTER_VALUE, label: 'All networks' },
      options: meta.networkOptions.map((network) => ({
        value: network,
        label: network,
      })),
    },
    {
      id: 'provider',
      desktopLabel: 'Provider',
      mobileLabel: 'Provider',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: toFilterSelectValue(selectedProvider),
      onValueChange: (value) => setFilters({ providerFilter: fromFilterSelectValue(value) }),
      ariaLabel: 'Filter by provider',
      placeholder: 'All providers',
      allOption: { value: ALL_FILTER_VALUE, label: 'All providers' },
      options: meta.providerOptions.map((provider) => ({
        value: provider,
        label: provider,
      })),
    },
    {
      id: 'tag',
      desktopLabel: 'Tag',
      mobileLabel: 'Tag',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: toFilterSelectValue(selectedTag),
      onValueChange: (value) => setFilters({ tagFilter: fromFilterSelectValue(value) }),
      ariaLabel: 'Filter by tag',
      placeholder: 'All tags',
      allOption: { value: ALL_FILTER_VALUE, label: 'All tags' },
      options: meta.tagOptions.map((tag) => ({ value: tag, label: tag })),
    },
    {
      id: 'expiry',
      desktopLabel: 'Expiry',
      mobileLabel: 'Expiry',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: selectedExpiry,
      onValueChange: (value) =>
        setFilters({ expiryFilter: toTypedFilterValue<CardExpiryFilter>(value) }),
      ariaLabel: 'Filter by expiry',
      placeholder: 'All cards',
      options: CARD_EXPIRY_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    },
    {
      id: 'billingDate',
      desktopLabel: 'Billing date',
      mobileLabel: 'Billing date',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: toFilterSelectValue(selectedBillingDate),
      onValueChange: (value) => setFilters({ billingDate: fromFilterSelectValue(value) }),
      ariaLabel: 'Filter by billing date',
      placeholder: 'All dates',
      allOption: { value: ALL_FILTER_VALUE, label: 'All dates' },
      options: DAY_OF_MONTH_FILTER_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    },
    {
      id: 'paymentDate',
      desktopLabel: 'Payment date',
      mobileLabel: 'Payment date',
      mobileIcon: <CreditCard className='h-3.5 w-3.5' />,
      value: toFilterSelectValue(selectedPaymentDate),
      onValueChange: (value) => setFilters({ paymentDate: fromFilterSelectValue(value) }),
      ariaLabel: 'Filter by payment date',
      placeholder: 'All dates',
      allOption: { value: ALL_FILTER_VALUE, label: 'All dates' },
      options: DAY_OF_MONTH_FILTER_OPTIONS.map((option) => ({
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
      onValueChange: (value) => setSortBy(value as CardSort),
      ariaLabel: 'Sort cards',
      placeholder: 'Newest first',
      options: CARD_SORT_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    },
    {
      id: 'group',
      desktopLabel: 'Group',
      mobileLabel: 'Group',
      mobileIcon: <Layers3 className='h-3.5 w-3.5' />,
      value: selectedGroup,
      onValueChange: (value) => setGroupBy(value as CardGroup),
      ariaLabel: 'Group cards',
      placeholder: 'No grouping',
      options: CARD_GROUP_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    },
  ];

  const preCreditLimitSections = selectSections.filter((section) =>
    ['network', 'provider', 'tag', 'expiry'].includes(section.id),
  );
  const postCreditLimitSections = selectSections.filter((section) =>
    ['billingDate', 'paymentDate', 'sort', 'group'].includes(section.id),
  );

  const renderCreditLimitControls = () => (
    <div className='space-y-2'>
      <div className='flex items-center justify-between text-xs text-text-subtle'>
        <span>Min: {creditLimitRange[0]}</span>
        <span>Max: {creditLimitRange[1]}</span>
      </div>
      <input
        type='range'
        min={meta.creditLimitBounds.min}
        max={meta.creditLimitBounds.max}
        step={100}
        value={creditLimitRange[0]}
        onChange={(event) => {
          const nextMin = Number(event.target.value);
          setCreditLimitRange(([_, currentMax]) => [Math.min(nextMin, currentMax), currentMax]);
        }}
        onMouseUp={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
        onTouchEnd={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
        className='w-full accent-primary'
        aria-label='Minimum credit limit'
        disabled={meta.creditLimitBounds.min >= meta.creditLimitBounds.max}
      />
      <input
        type='range'
        min={meta.creditLimitBounds.min}
        max={meta.creditLimitBounds.max}
        step={100}
        value={creditLimitRange[1]}
        onChange={(event) => {
          const nextMax = Number(event.target.value);
          setCreditLimitRange(([currentMin]) => [currentMin, Math.max(currentMin, nextMax)]);
        }}
        onMouseUp={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
        onTouchEnd={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
        className='w-full accent-primary'
        aria-label='Maximum credit limit'
        disabled={meta.creditLimitBounds.min >= meta.creditLimitBounds.max}
      />
    </div>
  );

  return (
    <>
      <ListingFilterTopBar
        formAction='/card'
        searchValue={query}
        searchMode='controlled'
        onSearchChange={(value) => setFilters({ query: value })}
        onClearSearch={() => setFilters({ query: '' })}
        mobileSearchPlaceholder='Search cards'
        desktopSearchPlaceholder='Search cards by name, provider, or number'
        mobileSearchAriaLabel='Search cards'
        desktopSearchAriaLabel='Search cards by name, provider, or number'
        mobileFilterCount={meta.activeFilterCount}
        onOpenMobileFilters={openMobileFilters}
        hasTextQuery={meta.hasTextQuery}
        hasActiveControls={meta.hasActiveControls}
        onResetAll={resetFilters}
        desktopFilterOpen={desktopOpen}
        onToggleDesktopFilters={toggleDesktopFilters}
        desktopExpandedClassName=''
        desktopPanel={
          <ListingFilterDesktopPanel>
            <div className='grid grid-cols-1 gap-4'>
              <ListingFilterDesktopSection label='Card type' className='space-y-2'>
                <CardTypeButtonGroup
                  selectedType={selectedType}
                  onSelect={(type) => setFilters({ typeFilter: type })}
                  className='h-10 w-full max-w-none rounded-xl'
                />
              </ListingFilterDesktopSection>

              <ListingFilterDesktopSelectSections sections={preCreditLimitSections} />

              <ListingFilterDesktopSection label='Credit limit'>
                {renderCreditLimitControls()}
              </ListingFilterDesktopSection>

              <ListingFilterDesktopSelectSections sections={postCreditLimitSections} />
            </div>

            <ListingFilterDesktopActions
              hasActiveControls={meta.hasActiveControls}
              onReset={resetFilters}
              collapseLabel='Save'
              onCollapse={closeDesktopFilters}
            />
          </ListingFilterDesktopPanel>
        }
      />

      <ListingFilterMobileSheet
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        title='Refine cards'
        description='Apply filters, sorting, and grouping in one place.'
      >
        <ListingFilterMobileSection label='Type' icon={<CreditCard className='h-3.5 w-3.5' />}>
          <CardTypeButtonGroup
            selectedType={selectedType}
            onSelect={(type) => setFilters({ typeFilter: type })}
            className='h-10 max-w-none rounded-xl'
          />
        </ListingFilterMobileSection>

        <ListingFilterMobileSelectSections sections={preCreditLimitSections} />

        <ListingFilterMobileSection
          label='Credit limit'
          icon={<CreditCard className='h-3.5 w-3.5' />}
        >
          {renderCreditLimitControls()}
        </ListingFilterMobileSection>

        <ListingFilterMobileSelectSections sections={postCreditLimitSections} />

        <ListingFilterMobileActions
          hasActiveControls={meta.hasActiveControls}
          onReset={resetFilters}
          doneLabel='Save'
          onDone={() => setMobileOpen(false)}
        />
      </ListingFilterMobileSheet>
    </>
  );
}

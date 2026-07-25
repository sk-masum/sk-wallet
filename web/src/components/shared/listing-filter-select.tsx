'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type ListingFilterSelectOption = {
  value: string;
  label: string;
};

type ListingFilterSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  placeholder: string;
  options: ListingFilterSelectOption[];
  allOption?: ListingFilterSelectOption;
};

export function ListingFilterSelect({
  value,
  onValueChange,
  ariaLabel,
  placeholder,
  options,
  allOption,
}: ListingFilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className='listing-filter-select-trigger' aria-label={ariaLabel}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allOption ? <SelectItem value={allOption.value}>{allOption.label}</SelectItem> : null}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

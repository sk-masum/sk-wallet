import { ALL_FILTER_VALUE } from '@/constants/ui/filter';

export function toFilterSelectValue(value: string, allValue: string = ALL_FILTER_VALUE) {
  return value || allValue;
}

export function fromFilterSelectValue(value: string, allValue: string = ALL_FILTER_VALUE) {
  return value === allValue ? '' : value;
}

export function isAllFilterValue(value: string, allValue: string = ALL_FILTER_VALUE) {
  return value === allValue;
}

export function hasSpecificFilterValue(value: string, allValue: string = ALL_FILTER_VALUE) {
  return !isAllFilterValue(value, allValue);
}

export function hasNonDefaultFilterValue<TValue extends string>(
  value: TValue,
  defaultValue: TValue,
) {
  return value !== defaultValue;
}

export function toTypedFilterValue<TValue extends string>(value: string) {
  return value as TValue;
}

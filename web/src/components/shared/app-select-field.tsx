'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type AppSelectOption = {
  value: string;
  label: string;
};

type AppSelectFieldProps = {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: AppSelectOption[];
  id?: string;
  ariaLabel?: string;
  disabled?: boolean;
  required?: boolean;
  ariaInvalid?: boolean;
  triggerClassName?: string;
};

export function AppSelectField({
  value,
  onValueChange,
  placeholder,
  options,
  id,
  ariaLabel,
  disabled,
  required,
  ariaInvalid,
  triggerClassName,
}: AppSelectFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled} required={required}>
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        className={cn(triggerClassName)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

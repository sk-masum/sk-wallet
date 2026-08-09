'use client';

import { AppSelectField, type AppSelectOption } from '@/components/shared/app-select-field';
import { FormField } from '@/components/ui/form-field';
import { entityFormSelectClass } from '@/components/shared/entity-form-ui';
import { cn } from '@/lib/utils';

type EntityTypeSelectFieldProps = {
    id: string;
    label: string;
    value?: string;
    onValueChange: (value: string) => void;
    options: AppSelectOption[];
    placeholder: string;
    error?: string;
    hint?: string;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    required?: boolean;
    triggerClassName?: string;
};

export function EntityTypeSelectField({
    id,
    label,
    value,
    onValueChange,
    options,
    placeholder,
    error,
    hint,
    className,
    labelClassName,
    disabled,
    required,
    triggerClassName,
}: EntityTypeSelectFieldProps) {
    return (
        <FormField
            id={id}
            label={label}
            hint={hint}
            error={error}
            className={className}
            labelClassName={labelClassName}
        >
            <AppSelectField
                id={id}
                value={value}
                onValueChange={onValueChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                ariaInvalid={Boolean(error)}
                triggerClassName={cn(entityFormSelectClass, error && 'border-destructive', triggerClassName)}
                options={options}
            />
        </FormField>
    );
}
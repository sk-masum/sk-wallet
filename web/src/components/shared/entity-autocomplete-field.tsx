'use client';

import { useMemo, useState } from 'react';

import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { entityFormControlClass } from '@/components/shared/entity-form-ui';
import { cn } from '@/lib/utils';

type EntityAutocompleteFieldProps = {
    id: string;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: string[];
    error?: string;
    hint?: string;
    className?: string;
    labelClassName?: string;
    name?: string;
    placeholder?: string;
    maxLength?: number;
    inputClassName?: string;
    emptyStateText?: string;
    allowCreate?: boolean;
    normalizeInput?: (value: string) => string;
    onSelectOption?: (option: string, details: { isNew: boolean }) => void;
};

function defaultNormalizeInput(value: string) {
    return value.trim();
}

export function EntityAutocompleteField({
    id,
    label,
    value,
    onValueChange,
    options,
    error,
    hint,
    className,
    labelClassName,
    name,
    placeholder,
    maxLength,
    inputClassName,
    emptyStateText = 'No matching options',
    allowCreate = true,
    normalizeInput = defaultNormalizeInput,
    onSelectOption,
}: EntityAutocompleteFieldProps) {
    const [open, setOpen] = useState(false);

    const normalizedQuery = value.trim().toLowerCase();
    const filteredOptions = useMemo(() => {
        if (!normalizedQuery) return options;
        return options.filter((option) => option.toLowerCase().includes(normalizedQuery));
    }, [options, normalizedQuery]);

    const normalizedValue = normalizeInput(value);
    const canCreateOption =
        allowCreate &&
        Boolean(normalizedValue) &&
        !options.some((option) => option.toLowerCase() === normalizedValue.toLowerCase());

    const selectOption = (option: string, isNew: boolean) => {
        onValueChange(option);
        onSelectOption?.(option, { isNew });
        setOpen(false);
    };

    return (
        <FormField
            id={id}
            label={label}
            hint={hint}
            error={error}
            className={className}
            labelClassName={labelClassName}
        >
            <div className='relative space-y-2'>
                <Input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onFocus={() => setOpen(true)}
                    onBlur={() => {
                        window.setTimeout(() => setOpen(false), 120);
                    }}
                    onChange={(event) => {
                        onValueChange(event.target.value);
                        setOpen(true);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && canCreateOption) {
                            event.preventDefault();
                            selectOption(normalizedValue, true);
                        }
                    }}
                    className={cn(
                        entityFormControlClass,
                        error && 'border-destructive focus-visible:ring-destructive',
                        inputClassName,
                    )}
                    aria-invalid={Boolean(error)}
                    maxLength={maxLength}
                    autoComplete='off'
                />

                {open ? (
                    <div className='absolute z-40 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-border/70 bg-popover p-1 shadow-md'>
                        {canCreateOption ? (
                            <button
                                type='button'
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => selectOption(normalizedValue, true)}
                                className='flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent'
                            >
                                <span>Add "{normalizedValue}"</span>
                                <span className='text-xs text-text-subtle'>new</span>
                            </button>
                        ) : null}

                        {filteredOptions.map((option) => (
                            <button
                                key={option}
                                type='button'
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => selectOption(option, false)}
                                className={cn(
                                    'flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent',
                                    normalizedQuery === option.toLowerCase() && 'bg-accent',
                                )}
                            >
                                {option}
                            </button>
                        ))}

                        {filteredOptions.length === 0 && !canCreateOption ? (
                            <p className='px-2 py-1.5 text-sm text-text-subtle'>{emptyStateText}</p>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </FormField>
    );
}
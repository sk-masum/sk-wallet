'use client';

import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
    entityFormControlClass,
    entityFormDateButtonClass,
    entityFormTextareaClass,
} from '@/components/shared/entity-form-ui';
import { cn } from '@/lib/utils';

type SharedFieldProps = {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    className?: string;
    labelClassName?: string;
};

type EntityInputFieldProps = SharedFieldProps & {
    inputClassName?: string;
    inputProps?: Omit<import('react').ComponentProps<typeof Input>, 'id' | 'className'>;
};

export function EntityInputField({
    id,
    label,
    error,
    hint,
    className,
    labelClassName,
    inputClassName,
    inputProps,
}: EntityInputFieldProps) {
    return (
        <FormField
            id={id}
            label={label}
            hint={hint}
            error={error}
            className={className}
            labelClassName={labelClassName}
        >
            <Input
                id={id}
                className={cn(
                    entityFormControlClass,
                    error && 'border-destructive focus-visible:ring-destructive',
                    inputClassName,
                )}
                aria-invalid={Boolean(error)}
                {...inputProps}
            />
        </FormField>
    );
}

type EntityTextareaFieldProps = SharedFieldProps & {
    textareaClassName?: string;
    textareaProps?: Omit<import('react').ComponentProps<typeof Textarea>, 'id' | 'className'>;
};

export function EntityTextareaField({
    id,
    label,
    error,
    hint,
    className,
    labelClassName,
    textareaClassName,
    textareaProps,
}: EntityTextareaFieldProps) {
    return (
        <FormField
            id={id}
            label={label}
            hint={hint}
            error={error}
            className={className}
            labelClassName={labelClassName}
        >
            <Textarea
                id={id}
                className={cn(
                    entityFormTextareaClass,
                    error && 'border-destructive focus-visible:ring-destructive',
                    textareaClassName,
                )}
                aria-invalid={Boolean(error)}
                {...textareaProps}
            />
        </FormField>
    );
}

type EntityDatePickerFieldProps = SharedFieldProps & {
    value?: Date;
    placeholder: string;
    onSelect: (value: Date | undefined) => void;
    buttonClassName?: string;
};

export function EntityDatePickerField({
    id,
    label,
    error,
    hint,
    className,
    labelClassName,
    value,
    placeholder,
    onSelect,
    buttonClassName,
}: EntityDatePickerFieldProps) {
    return (
        <FormField
            id={id}
            label={label}
            hint={hint}
            error={error}
            className={className}
            labelClassName={labelClassName}
        >
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        type='button'
                        variant='outline'
                        className={cn(
                            entityFormDateButtonClass,
                            !value && 'text-text-subtle',
                            error && 'border-destructive',
                            buttonClassName,
                        )}
                        aria-invalid={Boolean(error)}
                    >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {value ? format(value, 'PPP') : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar mode='single' selected={value} onSelect={onSelect} />
                </PopoverContent>
            </Popover>
        </FormField>
    );
}

'use client';

import type { ReactNode } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EntityModeToggleOption = {
    value: string;
    title: string;
    subtitle: string;
    icon: ReactNode;
};

type EntityModeToggleCardGroupProps = {
    name: string;
    value: string;
    options: EntityModeToggleOption[];
    onValueChange: (value: string) => void;
    required?: boolean;
    className?: string;
};

export function EntityModeToggleCardGroup({
    name,
    value,
    options,
    onValueChange,
    required = false,
    className,
}: EntityModeToggleCardGroupProps) {
    return (
        <div className={cn('grid gap-2 sm:grid-cols-2', className)}>
            {options.map((option) => {
                const isChecked = option.value === value;

                return (
                    <label key={option.value} className='relative cursor-pointer'>
                        <input
                            type='radio'
                            name={name}
                            value={option.value}
                            checked={isChecked}
                            onChange={() => onValueChange(option.value)}
                            required={required}
                            className='peer sr-only'
                        />
                        <span
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'sm' }),
                                'h-auto min-h-14 w-full justify-start rounded-xl border-border/70 bg-background/88 px-3 py-2 text-left shadow-sm transition-all duration-200',
                                'hover:border-border hover:bg-background',
                                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                                'peer-checked:border-primary/70 peer-checked:bg-primary/12 peer-checked:text-foreground peer-checked:shadow-[0_8px_18px_-14px_hsl(var(--primary))]',
                            )}
                        >
                            <span className='inline-flex w-full items-center gap-2.5'>
                                <span className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/90 text-text-subtle peer-checked:border-primary/45 peer-checked:bg-primary/16 peer-checked:text-primary'>
                                    {option.icon}
                                </span>
                                <span className='leading-tight'>
                                    <span className='block text-sm font-semibold'>{option.title}</span>
                                    <span className='block text-[11px] text-text-subtle'>{option.subtitle}</span>
                                </span>
                            </span>
                        </span>
                    </label>
                );
            })}
        </div>
    );
}
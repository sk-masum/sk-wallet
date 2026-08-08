import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ListingActiveFilterChip = {
    key: string;
    label: string;
    value: ReactNode;
    capitalize?: boolean;
};

type ListingActiveFilterChipsProps = {
    chips: ListingActiveFilterChip[];
    onReset: () => void;
    resetLabel?: string;
};

export function ListingActiveFilterChips({
    chips,
    onReset,
    resetLabel = 'Reset filters',
}: ListingActiveFilterChipsProps) {
    if (chips.length === 0) {
        return null;
    }

    return (
        <div className='hidden flex-wrap items-center gap-2 sm:flex'>
            {chips.map((chip) => (
                <span key={chip.key} className={cn('filter-chip-glass', chip.capitalize && 'capitalize')}>
                    {chip.label}: {chip.value}
                </span>
            ))}
            <Button variant='outline' size='chip' onClick={onReset}>
                {resetLabel}
            </Button>
        </div>
    );
}

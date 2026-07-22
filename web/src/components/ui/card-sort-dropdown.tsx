'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export const CARD_SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'expiry-asc', label: 'Expiry (Soonest)' },
    { value: 'expiry-desc', label: 'Expiry (Latest)' },
    { value: 'credit-limit-asc', label: 'Credit limit (Low-High)' },
    { value: 'credit-limit-desc', label: 'Credit limit (High-Low)' },
    { value: 'billing-date-asc', label: 'Billing date (Earliest)' },
    { value: 'billing-date-desc', label: 'Billing date (Latest)' },
    { value: 'payment-date-asc', label: 'Payment date (Earliest)' },
    { value: 'payment-date-desc', label: 'Payment date (Latest)' },
] as const

const SORT_FIELDS = [
    { value: 'created', label: 'Created date' },
    { value: 'name', label: 'Name' },
    { value: 'expiry', label: 'Expiry date' },
    { value: 'credit-limit', label: 'Credit limit' },
    { value: 'billing-date', label: 'Billing date' },
    { value: 'payment-date', label: 'Payment date' },
] as const

const SORT_DIRECTIONS = [
    { value: 'asc', label: 'Asc' },
    { value: 'desc', label: 'Desc' },
] as const

type CardSortValue = (typeof CARD_SORT_OPTIONS)[number]['value']
type SortFieldValue = (typeof SORT_FIELDS)[number]['value']
type SortDirectionValue = (typeof SORT_DIRECTIONS)[number]['value']

type CardSortDropdownProps = {
    selectedSort: CardSortValue
    className?: string
}

function parseSelectedSort(value: CardSortValue): { field: SortFieldValue; direction: SortDirectionValue } {
    if (value === 'newest') {
        return { field: 'created', direction: 'desc' }
    }

    if (value === 'oldest') {
        return { field: 'created', direction: 'asc' }
    }

    if (value.endsWith('-asc')) {
        return {
            field: value.slice(0, -4) as SortFieldValue,
            direction: 'asc',
        }
    }

    return {
        field: value.slice(0, -5) as SortFieldValue,
        direction: 'desc',
    }
}

function toSortValue(field: SortFieldValue, direction: SortDirectionValue): CardSortValue {
    if (field === 'created') {
        return direction === 'desc' ? 'newest' : 'oldest'
    }

    return `${field}-${direction}` as CardSortValue
}

export function CardSortDropdown({ selectedSort, className }: CardSortDropdownProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { field, direction } = parseSelectedSort(selectedSort)

    const pushSortValue = (value: CardSortValue) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === 'newest') {
            params.delete('sort')
        } else {
            params.set('sort', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    const handleFieldChange = (value: string) => {
        const nextField = value as SortFieldValue
        pushSortValue(toSortValue(nextField, direction))
    }

    const handleDirectionChange = (value: string) => {
        const nextDirection = value as SortDirectionValue
        pushSortValue(toSortValue(field, nextDirection))
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <Select value={field} onValueChange={handleFieldChange}>
                <SelectTrigger className={className} aria-label="Sort by field">
                    <SelectValue placeholder="Sort field" />
                </SelectTrigger>
                <SelectContent>
                    {SORT_FIELDS.map((sortField) => (
                        <SelectItem key={sortField.value} value={sortField.value}>
                            {sortField.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={direction} onValueChange={handleDirectionChange}>
                <SelectTrigger className={className} aria-label="Sort direction">
                    <SelectValue placeholder="Direction" />
                </SelectTrigger>
                <SelectContent>
                    {SORT_DIRECTIONS.map((sortDirection) => (
                        <SelectItem key={sortDirection.value} value={sortDirection.value}>
                            {sortDirection.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

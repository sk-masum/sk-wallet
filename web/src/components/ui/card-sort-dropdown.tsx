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
] as const

type CardSortValue = (typeof CARD_SORT_OPTIONS)[number]['value']

type CardSortDropdownProps = {
    selectedSort: CardSortValue
    className?: string
}

export function CardSortDropdown({ selectedSort, className }: CardSortDropdownProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === 'newest') {
            params.delete('sort')
        } else {
            params.set('sort', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    return (
        <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className={className} aria-label="Sort cards">
                <SelectValue placeholder="Newest first" />
            </SelectTrigger>
            <SelectContent>
                {CARD_SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

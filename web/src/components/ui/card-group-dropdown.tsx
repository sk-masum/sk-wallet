'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export const CARD_GROUP_OPTIONS = [
    { value: 'none', label: 'No grouping' },
    { value: 'provider', label: 'Group by provider' },
    { value: 'network', label: 'Group by network' },
] as const

type CardGroupValue = (typeof CARD_GROUP_OPTIONS)[number]['value']

type CardGroupDropdownProps = {
    selectedGroup: CardGroupValue
    className?: string
}

export function CardGroupDropdown({ selectedGroup, className }: CardGroupDropdownProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleGroupChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === 'none') {
            params.delete('group')
        } else {
            params.set('group', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    return (
        <Select value={selectedGroup} onValueChange={handleGroupChange}>
            <SelectTrigger className={className} aria-label="Group cards">
                <SelectValue placeholder="No grouping" />
            </SelectTrigger>
            <SelectContent>
                {CARD_GROUP_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

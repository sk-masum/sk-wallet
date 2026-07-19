'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

type ProviderFilterDropdownProps = {
    options: string[]
    selectedProvider: string
    className?: string
}

export function ProviderFilterDropdown({
    options,
    selectedProvider,
    className,
}: ProviderFilterDropdownProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleProviderChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === 'ALL') {
            params.delete('provider')
        } else {
            params.set('provider', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    return (
        <Select value={selectedProvider || 'ALL'} onValueChange={handleProviderChange}>
            <SelectTrigger className={className} aria-label="Filter by provider">
                <SelectValue placeholder="All providers" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">All providers</SelectItem>
                {options.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                        {provider}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

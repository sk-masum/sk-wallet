'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

type TagFilterDropdownProps = {
    options: string[]
    selectedTag: string
    className?: string
}

export function TagFilterDropdown({ options, selectedTag, className }: TagFilterDropdownProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const hasSelectedTag = selectedTag.length > 0 && options.includes(selectedTag)

    const handleTagChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === 'ALL') {
            params.delete('tag')
        } else {
            params.set('tag', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    return (
        <Select value={hasSelectedTag ? selectedTag : 'ALL'} onValueChange={handleTagChange}>
            <SelectTrigger className={className} aria-label="Filter by tag">
                <SelectValue placeholder="All tags" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">All tags</SelectItem>
                {options.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                        {tag}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

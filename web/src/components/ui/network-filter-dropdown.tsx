'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CardType = 'all' | 'credit' | 'debit'

interface NetworkFilterDropdownProps {
  options: string[]
  selectedNetwork: string
  query: string
  selectedType: CardType
  className?: string
}

export function NetworkFilterDropdown({
  options,
  selectedNetwork,
  query,
  selectedType,
  className,
}: NetworkFilterDropdownProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleNetworkChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }

    if (selectedType !== 'all') {
      params.set('type', selectedType)
    } else {
      params.delete('type')
    }

    if (value === 'ALL') {
      params.delete('network')
    } else {
      params.set('network', value)
    }

    const serialized = params.toString()
    router.push(serialized ? `${pathname}?${serialized}` : pathname)
  }

  return (
    <Select value={selectedNetwork || 'ALL'} onValueChange={handleNetworkChange}>
      <SelectTrigger className={className} aria-label="Filter by network">
        <SelectValue placeholder="All networks" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All networks</SelectItem>
        {options.map((network) => (
          <SelectItem key={network} value={network}>
            {network}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

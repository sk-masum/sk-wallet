'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CARD_STATUS_OPTIONS, isCardStatus } from '@/constants/card/status'

type CardStatusFormProps = {
    cardId: string
    initialStatus: 'active' | 'inactive' | 'blocked' | 'replaced'
    action: (formData: FormData) => void | Promise<void>
}

export function CardStatusForm({ cardId, initialStatus, action }: CardStatusFormProps) {
    const [status, setStatus] = useState(initialStatus)

    return (
        <form action={action} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <input type="hidden" name="id" value={cardId} />
            <input type="hidden" name="status" value={status} />
            <div className="flex-1 space-y-1.5">
                <label htmlFor="status-select" className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                    Status
                </label>
                <Select
                    value={status}
                    onValueChange={(value) => {
                        if (isCardStatus(value)) {
                            setStatus(value)
                        }
                    }}
                >
                    <SelectTrigger id="status-select" className="h-11 w-full rounded-xl border border-border/65 bg-background/90 px-3 text-sm">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {CARD_STATUS_OPTIONS.map((statusOption) => (
                            <SelectItem key={statusOption.value} value={statusOption.value}>
                                {statusOption.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" variant="primary" size="actionWide">
                Update status
            </Button>
        </form>
    )
}

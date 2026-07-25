'use client'

import { useState } from 'react'

import { CardStatusSelect } from '@/components/card/card-status-select'
import { Button } from '@/components/ui/button'
import type { CardStatus } from '@/models/card'

type CardStatusFormProps = {
    cardId: string
    initialStatus: CardStatus
    action: (formData: FormData) => void | Promise<void>
}

export function CardStatusForm({ cardId, initialStatus, action }: CardStatusFormProps) {
    const [status, setStatus] = useState(initialStatus)

    return (
        <form action={action} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <input type="hidden" name="id" value={cardId} />
            <input type="hidden" name="status" value={status} />
            <div className="flex-1 space-y-1.5">
                <label htmlFor="status-select" className="text-[11px] font-semibold tracking-[0.08em] text-text-subtle uppercase">
                    Status
                </label>
                <CardStatusSelect
                    id="status-select"
                    value={status}
                    onStatusChange={setStatus}
                    triggerClassName="h-11 w-full rounded-xl border border-border/65 bg-background/90 px-3 text-sm"
                />
            </div>
            <Button type="submit" variant="primary" size="actionWide">
                Update status
            </Button>
        </form>
    )
}

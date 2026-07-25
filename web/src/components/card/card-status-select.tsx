'use client'

import { AppSelectField } from '@/components/shared/app-select-field'
import { CARD_STATUS_OPTIONS, isCardStatus } from '@/constants/card/status'
import type { CardStatus } from '@/models/card'

type CardStatusSelectProps = {
    value: CardStatus
    onStatusChange: (value: CardStatus) => void
    placeholder?: string
    triggerClassName: string
    disabled?: boolean
    id?: string
    ariaLabel?: string
}

export function CardStatusSelect({
    value,
    onStatusChange,
    placeholder = 'Select status',
    triggerClassName,
    disabled,
    id,
    ariaLabel,
}: CardStatusSelectProps) {
    return (
        <AppSelectField
            id={id}
            value={value}
            onValueChange={(nextValue) => {
                if (isCardStatus(nextValue)) {
                    onStatusChange(nextValue)
                }
            }}
            ariaLabel={ariaLabel}
            disabled={disabled}
            placeholder={placeholder}
            triggerClassName={triggerClassName}
            options={CARD_STATUS_OPTIONS.map((statusOption) => ({ value: statusOption.value, label: statusOption.label }))}
        />
    )
}
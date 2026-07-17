'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'
import { CardNetwork } from '@/models/card'

type CardNumberInputProps = {
  id?: string
  className?: string
  defaultValue?: string
  network?: number | string
  required?: boolean
  onChange?: (value: string) => void
}

function getMaxDigits(network?: number | string) {
  return Number(network) === CardNetwork.AMEX ? 15 : 19
}

function normalizeDigits(value: string, network?: number | string) {
  return value.replace(/\D/g, '').slice(0, getMaxDigits(network))
}

function formatAmexCardNumber(digits: string) {
  const part1 = digits.slice(0, 4)
  const part2 = digits.slice(4, 10)
  const part3 = digits.slice(10, 15)

  return [part1, part2, part3].filter(Boolean).join(' - ')
}

function formatCardNumber(value: string, network?: number | string) {
  const digits = normalizeDigits(value, network)

  if (Number(network) === CardNetwork.AMEX) {
    return formatAmexCardNumber(digits)
  }

  return digits.replace(/(.{4})/g, '$1 - ').replace(/\s-\s$/, '').trim()
}

export function CardNumberInput({
  id,
  className,
  defaultValue = '',
  network,
  required = false,
  onChange,
}: CardNumberInputProps) {
  const defaultDigits = useMemo(() => normalizeDigits(defaultValue, network), [defaultValue, network])
  const [displayValue, setDisplayValue] = useState(formatCardNumber(defaultDigits, network))
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDisplayValue(formatCardNumber(defaultDigits, network))
  }, [defaultDigits, network])

  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return

    const handleReset = () => {
      setDisplayValue(formatCardNumber(defaultDigits, network))
    }

    form.addEventListener('reset', handleReset)
    return () => form.removeEventListener('reset', handleReset)
  }, [defaultDigits, network])

  const isAmex = Number(network) === CardNetwork.AMEX
  const maxLength = isAmex ? 21 : 39
  const placeholder = isAmex ? '1234 - 567890 - 12345' : '1234 - 5678 - 9012 - 3456'

  return (
    <>
      <Input
        id={id}
        ref={inputRef}
        name="number"
        placeholder={placeholder}
        className={className}
        inputMode="numeric"
        autoComplete="cc-number"
        minLength={13}
        maxLength={maxLength}
        pattern="[0-9\\s-]{13,39}"
        value={displayValue}
        onChange={(event) => {
          const formattedValue = formatCardNumber(event.target.value, network)
          setDisplayValue(formattedValue)
          onChange?.(formattedValue)
        }}
        required={required}
      />
    </>
  )
}

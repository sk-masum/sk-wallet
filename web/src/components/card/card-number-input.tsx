'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

type CardNumberInputProps = {
  defaultValue?: string
  required?: boolean
}

function normalizeDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 19)
}

function formatCardNumber(value: string) {
  return normalizeDigits(value).replace(/(.{4})/g, '$1 ').trim()
}

export function CardNumberInput({ defaultValue = '', required = false }: CardNumberInputProps) {
  const defaultDigits = useMemo(() => normalizeDigits(defaultValue), [defaultValue])
  const [displayValue, setDisplayValue] = useState(formatCardNumber(defaultDigits))
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDisplayValue(formatCardNumber(defaultDigits))
  }, [defaultDigits])

  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return

    const handleReset = () => {
      setDisplayValue(formatCardNumber(defaultDigits))
    }

    form.addEventListener('reset', handleReset)
    return () => form.removeEventListener('reset', handleReset)
  }, [defaultDigits])

  return (
    <>
      <Input
        ref={inputRef}
        name="number"
        placeholder="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        minLength={13}
        maxLength={23}
        pattern="[0-9\\s-]{13,23}"
        value={displayValue}
        onChange={(event) => setDisplayValue(formatCardNumber(event.target.value))}
        required={required}
      />
    </>
  )
}

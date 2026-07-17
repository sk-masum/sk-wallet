'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type CvvOtpInputProps = {
  id?: string
  name?: string
  defaultValue?: string
  required?: boolean
  length: number
  invalid?: boolean
  onChange?: (value: string) => void
}

function normalizeDigits(value: string, length: number) {
  return value.replace(/\D/g, '').slice(0, length)
}

export function CvvOtpInput({
  id,
  name = 'cvv',
  defaultValue = '',
  required = false,
  length,
  invalid = false,
  onChange,
}: CvvOtpInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const initialDigits = useMemo(() => normalizeDigits(defaultValue, length), [defaultValue, length])
  const [digits, setDigits] = useState(initialDigits)

  useEffect(() => {
    setDigits(normalizeDigits(defaultValue, length))
  }, [defaultValue, length])

  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return

    const handleReset = () => {
      setDigits(normalizeDigits(defaultValue, length))
      onChange?.(normalizeDigits(defaultValue, length))
    }

    form.addEventListener('reset', handleReset)
    return () => form.removeEventListener('reset', handleReset)
  }, [defaultValue, length, onChange])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        name={name}
        value={digits}
        required={required}
        minLength={length}
        maxLength={length}
        pattern={`\\d{${length}}`}
        inputMode="numeric"
        autoComplete="cc-csc"
        className="sr-only"
        aria-invalid={invalid}
        onChange={(event) => {
          const nextValue = normalizeDigits(event.target.value, length)
          setDigits(nextValue)
          onChange?.(nextValue)
        }}
      />

      <button
        type="button"
        className="w-full"
        onClick={() => inputRef.current?.focus()}
        aria-label="Enter CVV"
      >
        <div className="flex items-center gap-2">
          {Array.from({ length }).map((_, index) => {
            const value = digits[index] ?? ''
            return (
              <div
                key={index}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors',
                  invalid
                    ? 'border-destructive ring-1 ring-destructive/70'
                    : 'border-input bg-transparent'
                )}
              >
                {value}
              </div>
            )
          })}
        </div>
      </button>
    </div>
  )
}

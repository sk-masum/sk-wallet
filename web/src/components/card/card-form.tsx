'use client'

import { useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardNumberInput } from '@/components/card/card-number-input'
import { cn } from '@/lib/utils'
import { getCardThemes } from '@/utils/card/theme'

type CardFormValues = {
  cardType: 'credit' | 'debit' | ''
  colorName: string
  cardName: string
  provider: string
  network: string
  number: string
  holderName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

type CardFormProps = {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  showReset?: boolean
  cardId?: string
  initialValues?: Partial<CardFormValues>
}

function FormPendingOverlay() {
  const { pending } = useFormStatus()

  if (!pending) return null

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-[1px]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-24 w-40">
          <div className="absolute left-2 top-3 h-20 w-32 rounded-xl border border-border/50 bg-muted/50" />
          <div className="absolute left-4 top-1 h-20 w-32 rounded-xl border border-cyan-300/70 bg-linear-to-br from-cyan-600 via-blue-700 to-indigo-800 shadow-lg animate-bounce" />
          <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-40 animate-ping" />
            <span className="relative text-sm font-bold">+</span>
          </div>
        </div>
        <p className="text-sm font-medium text-foreground">Saving card...</p>
      </div>
    </div>
  )
}

type FormActionsProps = {
  submitLabel: string
  showReset: boolean
}

function FormActions({ submitLabel, showReset }: FormActionsProps) {
  const { pending } = useFormStatus()

  return (
    <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row">
      <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
        {pending ? 'Saving...' : submitLabel}
      </Button>
      {showReset ? (
        <Button type="reset" variant="outline" className="w-full sm:w-auto" disabled={pending}>
          Reset
        </Button>
      ) : null}
    </div>
  )
}

const MONTH_OPTIONS = [
  { label: 'Jan', value: '1' },
  { label: 'Feb', value: '2' },
  { label: 'Mar', value: '3' },
  { label: 'Apr', value: '4' },
  { label: 'May', value: '5' },
  { label: 'Jun', value: '6' },
  { label: 'Jul', value: '7' },
  { label: 'Aug', value: '8' },
  { label: 'Sep', value: '9' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' },
]

const NETWORK_OPTIONS = [
  { label: 'Visa', value: '1' },
  { label: 'RuPay', value: '2' },
  { label: 'Mastercard', value: '3' },
  { label: 'Amex', value: '4' },
]

export function CardForm({
  action,
  submitLabel,
  showReset = false,
  cardId,
  initialValues,
}: CardFormProps) {
  const values: CardFormValues = {
    cardType: initialValues?.cardType ?? 'credit',
    colorName: initialValues?.colorName ?? '',
    cardName: initialValues?.cardName ?? '',
    provider: initialValues?.provider ?? '',
    network: initialValues?.network ?? '',
    number: initialValues?.number ?? '',
    holderName: initialValues?.holderName ?? '',
    expiryMonth: initialValues?.expiryMonth ?? '',
    expiryYear: initialValues?.expiryYear ?? '',
    cvv: initialValues?.cvv ?? '',
  }

  const themes = useMemo(() => getCardThemes(), [])
  const initialColorName = values.colorName || themes[0]?.colorName || ''
  const [selectedColorName, setSelectedColorName] = useState(initialColorName)

  return (
    <form action={action} className="relative grid gap-4 sm:grid-cols-2">
      {cardId ? <input type="hidden" name="id" value={cardId} /> : null}
      <input type="hidden" name="color_name" value={selectedColorName} />
      <FormPendingOverlay />

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">Card type</legend>
        <div className="flex flex-wrap gap-2">
          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="card_type"
              value="credit"
              defaultChecked={values.cardType === 'credit'}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'border-input',
                'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground'
              )}
            >
              Credit
            </span>
          </label>

          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="card_type"
              value="debit"
              defaultChecked={values.cardType === 'debit'}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'border-input',
                'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground'
              )}
            >
              Debit
            </span>
          </label>
        </div>
      </fieldset>

      <Input
        name="card_name"
        placeholder="Card name"
        minLength={2}
        maxLength={80}
        defaultValue={values.cardName}
        required
      />
      <Input
        name="provider"
        placeholder="Provider"
        maxLength={50}
        defaultValue={values.provider}
      />

      <fieldset className="min-w-0 sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">Card color</legend>
        <div className="w-full max-w-full overflow-x-auto overscroll-x-contain py-2 pl-1">
          <div className="flex min-w-max flex-nowrap items-center gap-2 pr-1">
            {themes.map((theme) => {
              const isSelected = selectedColorName === theme.colorName

              return (
                <button
                  key={theme.colorName}
                  type="button"
                  onClick={() => setSelectedColorName(theme.colorName)}
                  className={cn(
                    'h-9 w-9 shrink-0 rounded-full border border-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    theme.surface,
                    isSelected && 'ring-2 ring-primary ring-offset-2'
                  )}
                  aria-label={`Select ${theme.colorName} color`}
                  title={theme.colorName}
                />
              )
            })}
          </div>
        </div>
      </fieldset>

      <select
        name="network"
        defaultValue={values.network}
        required
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          Network
        </option>
        {NETWORK_OPTIONS.map((networkOption) => (
          <option key={networkOption.value} value={networkOption.value}>
            {networkOption.label}
          </option>
        ))}
      </select>

      <CardNumberInput defaultValue={values.number} required />

      <Input
        name="holder_name"
        placeholder="Holder name"
        autoComplete="cc-name"
        minLength={2}
        maxLength={80}
        defaultValue={values.holderName}
        required
      />

      <select
        name="expiry_month"
        defaultValue={values.expiryMonth}
        required
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          Expiry month
        </option>
        {MONTH_OPTIONS.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      <Input
        name="expiry_year"
        placeholder="Expiry year (YYYY)"
        inputMode="numeric"
        pattern="[0-9]{4}"
        minLength={4}
        maxLength={4}
        defaultValue={values.expiryYear}
        required
      />

      <Input
        name="cvv"
        placeholder="CVV"
        inputMode="numeric"
        autoComplete="cc-csc"
        minLength={3}
        maxLength={4}
        pattern="[0-9]{3,4}"
        defaultValue={values.cvv}
        required
      />

      <FormActions submitLabel={submitLabel} showReset={showReset} />
    </form>
  )
}

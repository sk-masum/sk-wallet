'use client'

import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import { FormActions } from '@/components/ui/form-actions'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { CardNumberInput } from '@/components/card/card-number-input'
import { CvvOtpInput } from '@/components/card/cvv-otp-input'
import { cn } from '@/lib/utils'
import { MONTH_OPTIONS } from '@/constants/card/month-options'
import { CARD_NETWORK_FORM_OPTIONS } from '@/utils/card/network'
import { getCardThemes } from '@/utils/card/theme'
import { getExpectedCvvLength, validateCardFormFields, type CardFormFieldErrors } from '@/utils/card/validation'

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

type CardFormActionsProps = {
  submitLabel: string
  showReset: boolean
}

function CardFormActions({ submitLabel, showReset }: CardFormActionsProps) {
  const { pending } = useFormStatus()

  return (
    <FormActions
      submitLabel={submitLabel}
      isSubmitting={pending}
      showReset={showReset}
      className="gap-2.5 sm:justify-end"
      submitClassName="h-11 rounded-xl px-8 text-sm font-semibold uppercase tracking-wide"
      resetClassName="h-11 rounded-xl px-8 text-sm font-semibold uppercase tracking-wide"
    />
  )
}

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
  const [selectedNetwork, setSelectedNetwork] = useState(values.network)
  const [fieldErrors, setFieldErrors] = useState<CardFormFieldErrors>({})
  const formRef = useRef<HTMLFormElement | null>(null)
  const cvvLength = getExpectedCvvLength(Number(selectedNetwork)) ?? 3
  const fieldControlClass = 'h-10 rounded-xl border-border/70 bg-background/80 px-3 text-sm shadow-sm'

  const getFieldErrorsFromForm = () => {
    if (!formRef.current) return {}

    const formData = new FormData(formRef.current)
    return validateCardFormFields({
      cardName: String(formData.get('card_name') ?? '').trim(),
      provider: String(formData.get('provider') ?? '').trim(),
      number: String(formData.get('number') ?? '').trim(),
      holderName: String(formData.get('holder_name') ?? '').trim(),
      cardType: String(formData.get('card_type') ?? '').trim().toLowerCase(),
      network: Number(formData.get('network')),
      expiryMonth: Number(formData.get('expiry_month')),
      expiryYearRaw: String(formData.get('expiry_year') ?? '').trim(),
      cvv: String(formData.get('cvv') ?? '').trim(),
    })
  }

  const validateFields = (fields: Array<keyof CardFormFieldErrors>) => {
    const nextFieldErrors = getFieldErrorsFromForm()

    setFieldErrors((previous) => {
      const next = { ...previous }

      for (const field of fields) {
        const message = nextFieldErrors[field]
        if (message) {
          next[field] = message
        } else {
          delete next[field]
        }
      }

      return next
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextFieldErrors = getFieldErrorsFromForm()

    if (Object.keys(nextFieldErrors).length > 0) {
      event.preventDefault()
      setFieldErrors(nextFieldErrors)
      return
    }

    setFieldErrors({})
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={handleSubmit}
      className="relative grid gap-x-4 gap-y-5 sm:grid-cols-2"
    >
      {cardId ? <input type="hidden" name="id" value={cardId} /> : null}
      <input type="hidden" name="color_name" value={selectedColorName} />
      <FormPendingOverlay />

      <FormField
        id="color_name"
        label="Card Type"
        error={fieldErrors.card_type}
        className="rounded-2xl border border-border/60 bg-muted/35 p-3 sm:col-span-2"
        labelClassName="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
      >
        <div className="flex flex-wrap gap-2">
          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="card_type"
              value="credit"
              defaultChecked={values.cardType === 'credit'}
              onChange={() => validateFields(['card_type'])}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-10 min-w-28 rounded-xl border-border/70 bg-background/85 text-sm shadow-sm',
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
              onChange={() => validateFields(['card_type'])}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-10 min-w-28 rounded-xl border-border/70 bg-background/85 text-sm shadow-sm',
                'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground'
              )}
            >
              Debit
            </span>
          </label>
        </div>
      </FormField>

      <FormField id="card_name" label="CARD NAME" error={fieldErrors.card_name}>
        <Input
          id="card_name"
          name="card_name"
          placeholder="e.g. Personal Visa"
          onChange={() => validateFields(['card_name'])}
          className={cn(fieldControlClass, fieldErrors.card_name && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.card_name)}
          minLength={2}
          maxLength={80}
          defaultValue={values.cardName}
          required
        />
      </FormField>
      <FormField id="number" label="CARD NUMBER" error={fieldErrors.number}>
        <CardNumberInput
          id="number"
          defaultValue={values.number}
          network={selectedNetwork}
          required
          onChange={() => validateFields(['number'])}
          className={cn(fieldControlClass, fieldErrors.number && 'border-destructive focus-visible:ring-destructive')}
        />
      </FormField>


      <FormField
        id="color"
        label="Color"
        className="min-w-0 rounded-2xl border border-border/60 bg-muted/35 p-3 sm:col-span-2"
        labelClassName="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
      >
        <div className="w-full max-w-full overflow-x-auto overscroll-x-contain py-1 pl-1">
          <div className="flex min-w-max flex-nowrap items-center gap-2 pr-1">
            {themes.map((theme) => {
              const isSelected = selectedColorName === theme.colorName

              return (
                <button
                  key={theme.colorName}
                  type="button"
                  onClick={() => setSelectedColorName(theme.colorName)}
                  className={cn(
                    'h-10 w-10 shrink-0 rounded-full border border-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
      </FormField>

      <FormField id="provider" label="PROVIDER" error={fieldErrors.provider}>
        <Input
          id="provider"
          name="provider"
          placeholder="e.g. HBL"
          onChange={() => validateFields(['provider'])}
          className={cn(fieldControlClass, fieldErrors.provider && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.provider)}
          maxLength={50}
          defaultValue={values.provider}
        />
      </FormField>

      <FormField id="holder_name" label="HOLDER NAME" error={fieldErrors.holder_name}>
        <Input
          id="holder_name"
          name="holder_name"
          placeholder="As printed on card"
          onChange={() => validateFields(['holder_name'])}
          className={cn(fieldControlClass, fieldErrors.holder_name && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.holder_name)}
          autoComplete="cc-name"
          minLength={2}
          maxLength={80}
          defaultValue={values.holderName}
          required
        />
      </FormField>

      <FormField id="expiry_month" label="EXPIRY MONTH" error={fieldErrors.expiry_month}>
        <select
          id="expiry_month"
          name="expiry_month"
          defaultValue={values.expiryMonth}
          onChange={() => validateFields(['expiry_month', 'expiry_year'])}
          required
          aria-invalid={Boolean(fieldErrors.expiry_month)}
          className={cn(
            'flex h-10 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            fieldErrors.expiry_month && 'border-destructive focus-visible:ring-destructive'
          )}
        >
          <option value="" disabled>
            Select month
          </option>
          {MONTH_OPTIONS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="expiry_year" label="EXPIRY YEAR" error={fieldErrors.expiry_year}>
        <Input
          id="expiry_year"
          name="expiry_year"
          placeholder="YYYY"
          onChange={() => validateFields(['expiry_year'])}
          className={cn(fieldControlClass, fieldErrors.expiry_year && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.expiry_year)}
          inputMode="numeric"
          pattern="[0-9]{4}"
          minLength={4}
          maxLength={4}
          defaultValue={values.expiryYear}
          required
        />
      </FormField>


      <FormField id="network" label="NETWORK" error={fieldErrors.network}>
        <select
          id="network"
          name="network"
          defaultValue={values.network}
          onChange={(event) => {
            setSelectedNetwork(event.target.value)
            validateFields(['network', 'number', 'cvv'])
          }}
          required
          aria-invalid={Boolean(fieldErrors.network)}
          className={cn(
            'flex h-10 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-1 text-sm shadow-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            fieldErrors.network && 'border-destructive focus-visible:ring-destructive'
          )}
        >
          <option value="" disabled>
            Select network
          </option>
          {CARD_NETWORK_FORM_OPTIONS.map((networkOption) => (
            <option key={networkOption.value} value={networkOption.value}>
              {networkOption.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="cvv" label="CVV" error={fieldErrors.cvv}>
        <CvvOtpInput
          id="cvv"
          defaultValue={values.cvv}
          required
          length={cvvLength}
          invalid={Boolean(fieldErrors.cvv)}
          onChange={() => validateFields(['cvv'])}
        />
      </FormField>

      <div className="sm:col-span-2 border-t border-border/60 pt-4">
        <CardFormActions submitLabel={submitLabel} showReset={showReset} />
      </div>
    </form>
  )
}

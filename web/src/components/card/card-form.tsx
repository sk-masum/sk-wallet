'use client'

import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, buttonVariants } from '@/components/ui/button'
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

type FormActionsProps = {
  submitLabel: string
  showReset: boolean
}

function FormActions({ submitLabel, showReset }: FormActionsProps) {
  const { pending } = useFormStatus()

  return (
    <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row">
      <Button type="submit" className="px-6 w-full text-md uppercase tracking-wider sm:w-auto" disabled={pending}>
        {pending ? 'Saving...' : submitLabel}
      </Button>
      {showReset ? (
        <Button type="reset" variant="outline" className="px-6 w-full text-md uppercase tracking-wider sm:w-auto" disabled={pending}>
          Reset
        </Button>
      ) : null}
    </div>
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
    <form ref={formRef} action={action} onSubmit={handleSubmit} className="relative grid gap-4 sm:grid-cols-2">
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
              onChange={() => validateFields(['card_type'])}
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
              onChange={() => validateFields(['card_type'])}
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
        {fieldErrors.card_type ? <p className="mt-1 text-xs text-destructive">{fieldErrors.card_type}</p> : null}
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="card_name" className="text-xs font-medium text-muted-foreground uppercase">
          CARD NAME
        </label>
        <Input
          id="card_name"
          name="card_name"
          placeholder="e.g. Personal Visa"
          onChange={() => validateFields(['card_name'])}
          className={fieldErrors.card_name ? 'border-destructive focus-visible:ring-destructive' : ''}
          aria-invalid={Boolean(fieldErrors.card_name)}
          minLength={2}
          maxLength={80}
          defaultValue={values.cardName}
          required
        />
        {fieldErrors.card_name ? <p className="text-xs text-destructive">{fieldErrors.card_name}</p> : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="provider" className="text-xs font-medium text-muted-foreground uppercase">
          PROVIDER
        </label>
        <Input
          id="provider"
          name="provider"
          placeholder="e.g. HBL"
          onChange={() => validateFields(['provider'])}
          className={fieldErrors.provider ? 'border-destructive focus-visible:ring-destructive' : ''}
          aria-invalid={Boolean(fieldErrors.provider)}
          maxLength={50}
          defaultValue={values.provider}
        />
        {fieldErrors.provider ? <p className="text-xs text-destructive">{fieldErrors.provider}</p> : null}
      </div>

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

      <div className="space-y-1">
        <label htmlFor="network" className="text-xs font-medium text-muted-foreground uppercase">
          NETWORK
        </label>
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
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
        {fieldErrors.network ? <p className="text-xs text-destructive">{fieldErrors.network}</p> : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="number" className="text-xs font-medium text-muted-foreground uppercase">
          CARD NUMBER
        </label>
        <CardNumberInput
          id="number"
          defaultValue={values.number}
          network={selectedNetwork}
          required
          onChange={() => validateFields(['number'])}
          className={fieldErrors.number ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {fieldErrors.number ? <p className="text-xs text-destructive">{fieldErrors.number}</p> : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="holder_name" className="text-xs font-medium text-muted-foreground uppercase">
          HOLDER NAME
        </label>
        <Input
          id="holder_name"
          name="holder_name"
          placeholder="As printed on card"
          onChange={() => validateFields(['holder_name'])}
          className={fieldErrors.holder_name ? 'border-destructive focus-visible:ring-destructive' : ''}
          aria-invalid={Boolean(fieldErrors.holder_name)}
          autoComplete="cc-name"
          minLength={2}
          maxLength={80}
          defaultValue={values.holderName}
          required
        />
        {fieldErrors.holder_name ? <p className="text-xs text-destructive">{fieldErrors.holder_name}</p> : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="expiry_month" className="text-xs font-medium text-muted-foreground uppercase">
          EXPIRY MONTH
        </label>
        <select
          id="expiry_month"
          name="expiry_month"
          defaultValue={values.expiryMonth}
          onChange={() => validateFields(['expiry_month', 'expiry_year'])}
          required
          aria-invalid={Boolean(fieldErrors.expiry_month)}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
        {fieldErrors.expiry_month ? <p className="text-xs text-destructive">{fieldErrors.expiry_month}</p> : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="expiry_year" className="text-xs font-medium text-muted-foreground uppercase">
          EXPIRY YEAR
        </label>
        <Input
          id="expiry_year"
          name="expiry_year"
          placeholder="YYYY"
          onChange={() => validateFields(['expiry_year'])}
          className={fieldErrors.expiry_year ? 'border-destructive focus-visible:ring-destructive' : ''}
          aria-invalid={Boolean(fieldErrors.expiry_year)}
          inputMode="numeric"
          pattern="[0-9]{4}"
          minLength={4}
          maxLength={4}
          defaultValue={values.expiryYear}
          required
        />
        {fieldErrors.expiry_year ? <p className="text-xs text-destructive">{fieldErrors.expiry_year}</p> : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="cvv" className="text-xs font-medium text-muted-foreground uppercase">
          CVV
        </label>
        <CvvOtpInput
          id="cvv"
          defaultValue={values.cvv}
          required
          length={cvvLength}
          invalid={Boolean(fieldErrors.cvv)}
          onChange={() => validateFields(['cvv'])}
        />
        {fieldErrors.cvv ? <p className="text-xs text-destructive">{fieldErrors.cvv}</p> : null}
      </div>

      <FormActions submitLabel={submitLabel} showReset={showReset} />
    </form>
  )
}

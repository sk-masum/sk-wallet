'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useFormStatus } from 'react-dom'
import { Check, CreditCard, Landmark, Shuffle } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { FormActions } from '@/components/ui/form-actions'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CardNumberInput } from '@/components/card/card-number-input'
import { CvvOtpInput } from '@/components/card/cvv-otp-input'
import { CARD_PATTERNS, getRandomCardPatternKey } from '@/constants/card/patterns'
import { CARD_TAG_SUGGESTIONS } from '@/constants/card/tags'
import { CardNetwork } from '@/models/card'
import {
  entityFormActionsDividerClass,
  entityFormControlClass,
  entityFormFieldCardClass,
  entityFormGridClass,
  entityFormLabelClass,
  entityFormSectionCardClass,
  entityFormSelectClass,
} from '@/components/shared/entity-form-ui'
import { cn } from '@/lib/utils'
import { MONTH_OPTIONS } from '@/constants/card/month-options'
import { CARD_NETWORK_FORM_OPTIONS } from '@/utils/card/network'
import { buildCardAppearance, getCardThemes, parseCardAppearance } from '@/utils/card/theme'
import { parseCardTags } from '@/utils/card/form-data'
import { getExpectedCvvLength, validateCardFormFields, type CardFormFieldErrors } from '@/utils/card/validation'

type CardProviderApiResponse = {
  data?: string[]
}

function normalizeProvider(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

function mergeProviderOptions(existing: string[], additions: string[]) {
  const unique = new Map<string, string>()

  for (const option of [...existing, ...additions]) {
    const normalized = normalizeProvider(option)
    if (!normalized) continue

    const key = normalized.toLowerCase()
    if (!unique.has(key)) {
      unique.set(key, normalized)
    }
  }

  return Array.from(unique.values()).sort((a, b) => a.localeCompare(b))
}

function getExpectedCardNumberLengths(network: string) {
  const normalizedNetwork = Number(network)

  if (normalizedNetwork === CardNetwork.AMEX) return [15]
  if (normalizedNetwork === CardNetwork.MASTERCARD) return [16]
  if (normalizedNetwork === CardNetwork.RUPAY) return [16, 19]
  if (normalizedNetwork === CardNetwork.VISA) return [13, 16, 19]

  return [13, 14, 15, 16, 17, 18, 19]
}

function formatExpectedLengthsLabel(lengths: number[]) {
  if (lengths.length === 1) return `${lengths[0]} digits`
  if (lengths.length === 2) return `${lengths[0]} or ${lengths[1]} digits`
  return `${lengths[0]}-${lengths[lengths.length - 1]} digits`
}

type CardFormValues = {
  cardType: 'credit' | 'debit' | ''
  colorName: string
  tags: string
  cardName: string
  provider: string
  creditLimit: string
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

const TAG_PICKER_PLACEHOLDER = '__pick_tag__'

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
      className="mt-1"
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
    tags: initialValues?.tags ?? '',
    cardName: initialValues?.cardName ?? '',
    provider: initialValues?.provider ?? '',
    creditLimit: initialValues?.creditLimit ?? '',
    network: initialValues?.network ?? '',
    number: initialValues?.number ?? '',
    holderName: initialValues?.holderName ?? '',
    expiryMonth: initialValues?.expiryMonth ?? '',
    expiryYear: initialValues?.expiryYear ?? '',
    cvv: initialValues?.cvv ?? '',
  }

  const themes = useMemo(() => getCardThemes(), [])
  const appearance = parseCardAppearance(values.colorName)
  const initialColorName = appearance.colorName || themes[0]?.colorName || ''
  const initialPatternKey = appearance.patternKey
  const [selectedColorName, setSelectedColorName] = useState(initialColorName)
  const [selectedPatternKey, setSelectedPatternKey] = useState(initialPatternKey)
  const [selectedCardType, setSelectedCardType] = useState<'credit' | 'debit'>(
    values.cardType === 'debit' ? 'debit' : 'credit'
  )
  const [selectedNetwork, setSelectedNetwork] = useState(values.network)
  const [numberValue, setNumberValue] = useState(values.number)
  const [tagsValue, setTagsValue] = useState(values.tags)
  const [tagPickerValue, setTagPickerValue] = useState(TAG_PICKER_PLACEHOLDER)
  const [providerValue, setProviderValue] = useState(values.provider)
  const [showProviderSuggestions, setShowProviderSuggestions] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<CardFormFieldErrors>({})
  const formRef = useRef<HTMLFormElement | null>(null)
  const cvvLength = getExpectedCvvLength(Number(selectedNetwork)) ?? 3
  const selectedTagsSet = useMemo(() => {
    return new Set(parseCardTags(tagsValue).map((tag) => tag.toLowerCase()))
  }, [tagsValue])
  const availableTagSuggestions = useMemo(() => {
    return CARD_TAG_SUGGESTIONS.filter((tag) => !selectedTagsSet.has(tag.toLowerCase()))
  }, [selectedTagsSet])
  const initialProviderOptions = useMemo(() => {
    const normalizedCurrentProvider = normalizeProvider(values.provider)
    return normalizedCurrentProvider ? [normalizedCurrentProvider] : []
  }, [values.provider])
  const [providerOptions, setProviderOptions] = useState(initialProviderOptions)
  const filteredProviderOptions = useMemo(() => {
    const normalizedQuery = providerValue.trim().toLowerCase()

    if (!normalizedQuery) return providerOptions

    return providerOptions.filter((providerOption) =>
      providerOption.toLowerCase().includes(normalizedQuery)
    )
  }, [providerOptions, providerValue])
  const canAddProviderOption = useMemo(() => {
    const normalizedValue = normalizeProvider(providerValue)
    if (!normalizedValue) return false

    return !providerOptions.some(
      (providerOption) => providerOption.toLowerCase() === normalizedValue.toLowerCase()
    )
  }, [providerOptions, providerValue])
  const cardNumberDigitsCount = useMemo(() => numberValue.replace(/\D/g, '').length, [numberValue])
  const expectedCardNumberLengths = useMemo(
    () => getExpectedCardNumberLengths(selectedNetwork),
    [selectedNetwork]
  )
  const isCardNumberLengthMatch = useMemo(
    () => expectedCardNumberLengths.includes(cardNumberDigitsCount),
    [expectedCardNumberLengths, cardNumberDigitsCount]
  )
  const cardNumberMatchHint = useMemo(() => {
    if (cardNumberDigitsCount === 0) {
      return `Expected: ${formatExpectedLengthsLabel(expectedCardNumberLengths)}`
    }

    if (isCardNumberLengthMatch) {
      return `Length matched (${cardNumberDigitsCount} digits)`
    }

    return `Entered ${cardNumberDigitsCount} digits. Expected: ${formatExpectedLengthsLabel(expectedCardNumberLengths)}`
  }, [cardNumberDigitsCount, expectedCardNumberLengths, isCardNumberLengthMatch])

  useEffect(() => {
    let ignore = false

    const fetchProviderOptions = async () => {
      try {
        const response = await fetch('/api/card-provider', { cache: 'no-store' })
        if (!response.ok) return

        const result = (await response.json()) as CardProviderApiResponse
        const providerNames = Array.isArray(result.data) ? result.data : []

        if (ignore) return
        setProviderOptions((previous) => mergeProviderOptions(previous, providerNames))
      } catch {
        // Keep existing local options if loading fails.
      }
    }

    void fetchProviderOptions()

    return () => {
      ignore = true
    }
  }, [])

  const scheduleTagValidation = () => {
    window.requestAnimationFrame(() => validateFields(['tags']))
  }

  const handleTagPickerChange = (tag: string) => {
    if (tag === TAG_PICKER_PLACEHOLDER) return

    const mergedTags = parseCardTags([tagsValue, tag].filter(Boolean).join(', ')).join(', ')
    setTagsValue(mergedTags)
    setTagPickerValue(TAG_PICKER_PLACEHOLDER)
    scheduleTagValidation()
  }

  const handleProviderOptionSelect = (providerOption: string, addIfMissing = false) => {
    const normalizedProvider = normalizeProvider(providerOption)
    if (!normalizedProvider) return

    setProviderValue(normalizedProvider)

    if (addIfMissing) {
      setProviderOptions((previous) => mergeProviderOptions(previous, [normalizedProvider]))
    }

    setShowProviderSuggestions(false)
    window.requestAnimationFrame(() => validateFields(['provider']))
  }

  const getFieldErrorsFromForm = () => {
    if (!formRef.current) return {}

    const formData = new FormData(formRef.current)
    return validateCardFormFields({
      cardName: String(formData.get('card_name') ?? '').trim(),
      tags: parseCardTags(String(formData.get('tags') ?? '')),
      provider: String(formData.get('provider') ?? '').trim(),
      creditLimitRaw: String(formData.get('credit_limit') ?? '').trim(),
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
      className={entityFormGridClass}
    >
      {cardId ? <input type="hidden" name="id" value={cardId} /> : null}
      {!cardId ? <input type="hidden" name="status" value="active" /> : null}
      <input type="hidden" name="color_name" value={buildCardAppearance(selectedColorName, selectedPatternKey)} />
      <FormPendingOverlay />

      <FormField
        id="color_name"
        label="Card Type"
        error={fieldErrors.card_type}
        className={cn(entityFormSectionCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
        hint="Choose whether this card charges credit or debits directly from balance."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="card_type"
              value="credit"
              defaultChecked={values.cardType === 'credit'}
              onChange={() => {
                setSelectedCardType('credit')
                validateFields(['card_type', 'credit_limit'])
              }}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-auto min-h-14 w-full justify-start rounded-xl border-border/70 bg-background/88 px-3 py-2 text-left shadow-sm transition-all duration-200',
                'hover:border-border hover:bg-background',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                'peer-checked:border-primary/70 peer-checked:bg-primary/12 peer-checked:text-foreground peer-checked:shadow-[0_8px_18px_-14px_hsl(var(--primary))]'
              )}
            >
              <span className="inline-flex w-full items-center gap-2.5">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/90 text-muted-foreground peer-checked:border-primary/45 peer-checked:bg-primary/16 peer-checked:text-primary">
                  <CreditCard className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">Credit</span>
                  <span className="block text-[11px] text-muted-foreground">Pay later billing cycle</span>
                </span>
              </span>
            </span>
          </label>

          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="card_type"
              value="debit"
              defaultChecked={values.cardType === 'debit'}
              onChange={() => {
                setSelectedCardType('debit')
                validateFields(['card_type', 'credit_limit'])
              }}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-auto min-h-14 w-full justify-start rounded-xl border-border/70 bg-background/88 px-3 py-2 text-left shadow-sm transition-all duration-200',
                'hover:border-border hover:bg-background',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                'peer-checked:border-primary/70 peer-checked:bg-primary/12 peer-checked:text-foreground peer-checked:shadow-[0_8px_18px_-14px_hsl(var(--primary))]'
              )}
            >
              <span className="inline-flex w-full items-center gap-2.5">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/90 text-muted-foreground peer-checked:border-primary/45 peer-checked:bg-primary/16 peer-checked:text-primary">
                  <Landmark className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">Debit</span>
                  <span className="block text-[11px] text-muted-foreground">Instant balance deduction</span>
                </span>
              </span>
            </span>
          </label>
        </div>
      </FormField>

      {selectedCardType === 'credit' ? (
        <FormField
          id="credit_limit"
          label="CREDIT LIMIT"
          error={fieldErrors.credit_limit}
          className={entityFormFieldCardClass}
          labelClassName={entityFormLabelClass}
          hint="Required for credit cards. Enter total approved limit."
        >
          <Input
            id="credit_limit"
            name="credit_limit"
            placeholder="e.g. 250000"
            onChange={() => validateFields(['credit_limit'])}
            className={cn(entityFormControlClass, fieldErrors.credit_limit && 'border-destructive focus-visible:ring-destructive')}
            aria-invalid={Boolean(fieldErrors.credit_limit)}
            inputMode="decimal"
            defaultValue={values.creditLimit}
            required
          />
        </FormField>
      ) : null}

      <FormField id="card_name" label="CARD NAME" error={fieldErrors.card_name} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Input
          id="card_name"
          name="card_name"
          placeholder="e.g. Personal Visa"
          onChange={() => validateFields(['card_name'])}
          className={cn(entityFormControlClass, fieldErrors.card_name && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.card_name)}
          minLength={2}
          maxLength={80}
          defaultValue={values.cardName}
          required
        />
      </FormField>

      <FormField
        id="tags"
        label="TAGS"
        error={fieldErrors.tags}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
        hint="Optional: type comma-separated tags, use autocomplete, or pick from dropdown."
      >
        <div className="space-y-2">
          <Input
            id="tags"
            name="tags"
            list="card-tag-suggestions"
            placeholder="e.g. travel, family, recurring"
            value={tagsValue}
            onChange={(event) => {
              setTagsValue(event.target.value)
              validateFields(['tags'])
            }}
            className={cn(entityFormControlClass, fieldErrors.tags && 'border-destructive focus-visible:ring-destructive')}
            aria-invalid={Boolean(fieldErrors.tags)}
            maxLength={220}
            autoComplete="off"
          />
          <datalist id="card-tag-suggestions">
            {availableTagSuggestions.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>

          <Select
            value={tagPickerValue === TAG_PICKER_PLACEHOLDER ? undefined : tagPickerValue}
            onValueChange={handleTagPickerChange}
          >
            <SelectTrigger className={cn(entityFormSelectClass, 'h-10')} aria-label="Quick add tag">
              <SelectValue placeholder="Quick add tag" />
            </SelectTrigger>
            <SelectContent>
              {availableTagSuggestions.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FormField>
      <FormField id="number" label="CARD NUMBER" error={fieldErrors.number} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <div className="space-y-1.5">
          <CardNumberInput
            id="number"
            defaultValue={values.number}
            network={selectedNetwork}
            required
            onChange={(value) => {
              setNumberValue(value)
              validateFields(['number'])
            }}
            className={cn(entityFormControlClass, fieldErrors.number && 'border-destructive focus-visible:ring-destructive')}
          />
          <p
            className={cn(
              'text-xs',
              fieldErrors.number
                ? 'text-destructive'
                : isCardNumberLengthMatch
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-muted-foreground'
            )}
          >
            {cardNumberMatchHint}
          </p>
        </div>
      </FormField>


      <FormField
        id="color"
        label="Color"
        className={cn('min-w-0', entityFormSectionCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
        hint="Pick a color theme for quick visual identification."
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
                    'relative h-10 w-10 shrink-0 rounded-full border border-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    theme.surface,
                    isSelected && 'ring-2 ring-primary ring-offset-2'
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Select ${theme.colorName} color`}
                  title={theme.colorName}
                >
                  {isSelected ? (
                    <span className="absolute inset-0 inline-flex items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </FormField>

      <FormField
        id="pattern"
        label="Pattern"
        className={cn(entityFormSectionCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
        hint="Choose a texture overlay or randomize for variety."
      >
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {CARD_PATTERNS.map((pattern) => {
              const isSelected = selectedPatternKey === pattern.key

              return (
                <button
                  key={pattern.key}
                  type="button"
                  onClick={() => setSelectedPatternKey(pattern.key)}
                  className={cn(
                    'relative inline-flex h-11 items-center justify-center rounded-xl border px-2 text-[11px] font-semibold transition-all',
                    'bg-background/92 hover:bg-background',
                    pattern.swatchClassName,
                    isSelected
                      ? 'border-primary ring-2 ring-primary/40 ring-offset-1 ring-offset-background'
                      : 'border-border/70'
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Select ${pattern.label} pattern`}
                  title={pattern.label}
                >
                  <span className="relative z-10 text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                    {pattern.label}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setSelectedPatternKey(getRandomCardPatternKey())}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/70 bg-background/90 px-3 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-background"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Random pattern
          </button>
        </div>
      </FormField>

      <FormField
        id="provider"
        label="PROVIDER"
        error={fieldErrors.provider}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
        hint="Optional: type to search or add a new issuer."
      >
        <div className="relative space-y-2">
          <Input
            id="provider"
            name="provider"
            placeholder="e.g. HBL"
            value={providerValue}
            onFocus={() => setShowProviderSuggestions(true)}
            onBlur={() => {
              window.setTimeout(() => setShowProviderSuggestions(false), 120)
            }}
            onChange={(event) => {
              setProviderValue(event.target.value)
              setShowProviderSuggestions(true)
              validateFields(['provider'])
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && canAddProviderOption) {
                event.preventDefault()
                handleProviderOptionSelect(providerValue, true)
              }
            }}
            className={cn(entityFormControlClass, fieldErrors.provider && 'border-destructive focus-visible:ring-destructive')}
            aria-invalid={Boolean(fieldErrors.provider)}
            maxLength={50}
            autoComplete="off"
          />
          {showProviderSuggestions ? (
            <div className="absolute z-40 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-border/70 bg-popover p-1 shadow-md">
              {canAddProviderOption ? (
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleProviderOptionSelect(providerValue, true)}
                  className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <span>Add "{providerValue.trim()}"</span>
                  <span className="text-xs text-muted-foreground">new</span>
                </button>
              ) : null}
              {filteredProviderOptions.map((providerOption) => (
                <button
                  key={providerOption}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleProviderOptionSelect(providerOption)}
                  className={cn(
                    'flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent',
                    providerValue.trim().toLowerCase() === providerOption.toLowerCase() && 'bg-accent'
                  )}
                >
                  {providerOption}
                </button>
              ))}
              {filteredProviderOptions.length === 0 && !canAddProviderOption ? (
                <p className="px-2 py-1.5 text-sm text-muted-foreground">No matching providers</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </FormField>

      <FormField id="holder_name" label="HOLDER NAME" error={fieldErrors.holder_name} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Input
          id="holder_name"
          name="holder_name"
          placeholder="As printed on card"
          onChange={() => validateFields(['holder_name'])}
          className={cn(entityFormControlClass, fieldErrors.holder_name && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.holder_name)}
          autoComplete="cc-name"
          minLength={2}
          maxLength={80}
          defaultValue={values.holderName}
          required
        />
      </FormField>

      <FormField id="expiry_month" label="EXPIRY MONTH" error={fieldErrors.expiry_month} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <select
          id="expiry_month"
          name="expiry_month"
          defaultValue={values.expiryMonth}
          onChange={() => validateFields(['expiry_month', 'expiry_year'])}
          required
          aria-invalid={Boolean(fieldErrors.expiry_month)}
          className={cn(entityFormSelectClass, fieldErrors.expiry_month && 'border-destructive focus-visible:ring-destructive')}
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

      <FormField id="expiry_year" label="EXPIRY YEAR" error={fieldErrors.expiry_year} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Input
          id="expiry_year"
          name="expiry_year"
          placeholder="YYYY"
          onChange={() => validateFields(['expiry_year'])}
          className={cn(entityFormControlClass, fieldErrors.expiry_year && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.expiry_year)}
          inputMode="numeric"
          pattern="[0-9]{4}"
          minLength={4}
          maxLength={4}
          defaultValue={values.expiryYear}
          required
        />
      </FormField>


      <FormField
        id="network"
        label="NETWORK"
        error={fieldErrors.network}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
        hint="Selecting network improves card number and CVV validation accuracy."
      >
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
          className={cn(entityFormSelectClass, fieldErrors.network && 'border-destructive focus-visible:ring-destructive')}
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

      <FormField
        id="cvv"
        label="CVV"
        error={fieldErrors.cvv}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
        hint={`Enter the ${cvvLength}-digit security code.`}
      >
        <CvvOtpInput
          id="cvv"
          defaultValue={values.cvv}
          required
          length={cvvLength}
          invalid={Boolean(fieldErrors.cvv)}
          onChange={() => validateFields(['cvv'])}
        />
      </FormField>

      <div className={entityFormActionsDividerClass}>
        <CardFormActions submitLabel={submitLabel} showReset={showReset} />
      </div>
    </form>
  )
}

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardNumberInput } from '@/components/card/card-number-input'
import { cn } from '@/lib/utils'

type CardFormValues = {
  cardType: 'credit' | 'debit' | ''
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
    cardType: initialValues?.cardType ?? '',
    cardName: initialValues?.cardName ?? '',
    provider: initialValues?.provider ?? '',
    network: initialValues?.network ?? '',
    number: initialValues?.number ?? '',
    holderName: initialValues?.holderName ?? '',
    expiryMonth: initialValues?.expiryMonth ?? '',
    expiryYear: initialValues?.expiryYear ?? '',
    cvv: initialValues?.cvv ?? '',
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      {cardId ? <input type="hidden" name="id" value={cardId} /> : null}

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

      <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto">
          {submitLabel}
        </Button>
        {showReset ? (
          <Button type="reset" variant="outline" className="w-full sm:w-auto">
            Reset
          </Button>
        ) : null}
      </div>
    </form>
  )
}

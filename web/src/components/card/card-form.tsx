'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useFormStatus } from 'react-dom';
import { Check, CreditCard, Landmark, Shuffle } from 'lucide-react';

import { FormActions } from '@/components/ui/form-actions';
import {
  EntityAutocompleteField,
  EntityInputField,
  EntityModeToggleCardGroup,
} from '@/components/shared/entity-form-kit';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { AppSelectField } from '@/components/shared/app-select-field';
import { CardNumberInput } from '@/components/card/card-number-input';
import { CvvOtpInput } from '@/components/card/cvv-otp-input';
import { CARD_PATTERNS, getRandomCardPatternKey } from '@/constants/card/patterns';
import { CARD_TAG_SUGGESTIONS } from '@/constants/card/tags';
import { CardNetwork } from '@/models/card';
import {
  entityFormActionsDividerClass,
  entityFormControlClass,
  entityFormGridClass,
  entityFormLabelClass,
  entityFormSectionCardClass,
  entityFormSelectClass,
} from '@/components/shared/entity-form-ui';
import { cn } from '@/lib/utils';
import { MONTH_OPTIONS } from '@/constants/card/month-options';
import { CARD_NETWORK_FORM_OPTIONS } from '@/utils/card/network';
import { buildCardAppearance, getCardThemes, parseCardAppearance } from '@/utils/card/theme';
import { parseCardTags } from '@/utils/card/form-data';
import { useEntityFormFieldMetadata } from '@/hooks/use-entity-form-field-metadata';
import {
  getExpectedCvvLength,
  validateCardFormFields,
  type CardFormFieldErrors,
} from '@/utils/card/validation';
import { CardFormPendingOverlay } from './card-form-overlay';

type CardProviderApiResponse = {
  data?: string[];
};

function normalizeProvider(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}

function mergeProviderOptions(existing: string[], additions: string[]) {
  const unique = new Map<string, string>();

  for (const option of [...existing, ...additions]) {
    const normalized = normalizeProvider(option);
    if (!normalized) continue;

    const key = normalized.toLowerCase();
    if (!unique.has(key)) {
      unique.set(key, normalized);
    }
  }

  return Array.from(unique.values()).sort((a, b) => a.localeCompare(b));
}

function getExpectedCardNumberLengths(network: string) {
  const normalizedNetwork = Number(network);

  if (normalizedNetwork === CardNetwork.AMEX) return [15];
  if (normalizedNetwork === CardNetwork.MASTERCARD) return [16];
  if (normalizedNetwork === CardNetwork.RUPAY) return [16, 19];
  if (normalizedNetwork === CardNetwork.VISA) return [13, 16, 19];

  return [13, 14, 15, 16, 17, 18, 19];
}

function formatExpectedLengthsLabel(lengths: number[]) {
  if (lengths.length === 1) return `${lengths[0]} digits`;
  if (lengths.length === 2) return `${lengths[0]} or ${lengths[1]} digits`;
  return `${lengths[0]}-${lengths[lengths.length - 1]} digits`;
}

type CardFormValues = {
  cardType: 'credit' | 'debit' | '';
  colorName: string;
  tags: string;
  cardName: string;
  provider: string;
  creditLimit: string;
  billingDate: string;
  paymentDate: string;
  network: string;
  number: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

type CardFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  showReset?: boolean;
  cardId?: string;
  initialValues?: Partial<CardFormValues>;
};

const TAG_PICKER_PLACEHOLDER = '__pick_tag__';

type CardFormActionsProps = {
  submitLabel: string;
  showReset: boolean;
};

function CardFormActions({ submitLabel, showReset }: CardFormActionsProps) {
  const { pending } = useFormStatus();

  return (
    <FormActions
      submitLabel={submitLabel}
      isSubmitting={pending}
      showReset={showReset}
      className='mt-1'
    />
  );
}

export function CardForm({
  action,
  submitLabel,
  showReset = false,
  cardId,
  initialValues,
}: CardFormProps) {
  const fieldMeta = useEntityFormFieldMetadata('card');
  const values: CardFormValues = {
    cardType: initialValues?.cardType ?? 'credit',
    colorName: initialValues?.colorName ?? '',
    tags: initialValues?.tags ?? '',
    cardName: initialValues?.cardName ?? '',
    provider: initialValues?.provider ?? '',
    creditLimit: initialValues?.creditLimit ?? '',
    billingDate: initialValues?.billingDate ?? '',
    paymentDate: initialValues?.paymentDate ?? '',
    network: initialValues?.network ?? '',
    number: initialValues?.number ?? '',
    holderName: initialValues?.holderName ?? '',
    expiryMonth: initialValues?.expiryMonth ?? '',
    expiryYear: initialValues?.expiryYear ?? '',
    cvv: initialValues?.cvv ?? '',
  };

  const themes = useMemo(() => getCardThemes(), []);
  const appearance = parseCardAppearance(values.colorName);
  const initialColorName = appearance.colorName || themes[0]?.colorName || '';
  const initialPatternKey = appearance.patternKey;
  const [selectedColorName, setSelectedColorName] = useState(initialColorName);
  const [selectedPatternKey, setSelectedPatternKey] = useState(initialPatternKey);
  const [selectedCardType, setSelectedCardType] = useState<'credit' | 'debit'>(
    values.cardType === 'debit' ? 'debit' : 'credit',
  );
  const [selectedExpiryMonth, setSelectedExpiryMonth] = useState(values.expiryMonth);
  const [selectedNetwork, setSelectedNetwork] = useState(values.network);
  const [numberValue, setNumberValue] = useState(values.number);
  const [tagsValue, setTagsValue] = useState(values.tags);
  const [tagPickerValue, setTagPickerValue] = useState(TAG_PICKER_PLACEHOLDER);
  const [providerValue, setProviderValue] = useState(values.provider);
  const [fieldErrors, setFieldErrors] = useState<CardFormFieldErrors>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const cvvLength = getExpectedCvvLength(Number(selectedNetwork)) ?? 3;
  const selectedTagsSet = useMemo(() => {
    return new Set(parseCardTags(tagsValue).map((tag) => tag.toLowerCase()));
  }, [tagsValue]);
  const availableTagSuggestions = useMemo(() => {
    return CARD_TAG_SUGGESTIONS.filter((tag) => !selectedTagsSet.has(tag.toLowerCase()));
  }, [selectedTagsSet]);
  const initialProviderOptions = useMemo(() => {
    const normalizedCurrentProvider = normalizeProvider(values.provider);
    return normalizedCurrentProvider ? [normalizedCurrentProvider] : [];
  }, [values.provider]);
  const [providerOptions, setProviderOptions] = useState(initialProviderOptions);
  const cardNumberDigitsCount = useMemo(() => numberValue.replace(/\D/g, '').length, [numberValue]);
  const expectedCardNumberLengths = useMemo(
    () => getExpectedCardNumberLengths(selectedNetwork),
    [selectedNetwork],
  );
  const isCardNumberLengthMatch = useMemo(
    () => expectedCardNumberLengths.includes(cardNumberDigitsCount),
    [expectedCardNumberLengths, cardNumberDigitsCount],
  );
  const cardNumberMatchHint = useMemo(() => {
    if (cardNumberDigitsCount === 0) {
      return `Expected: ${formatExpectedLengthsLabel(expectedCardNumberLengths)}`;
    }

    if (isCardNumberLengthMatch) {
      return `Length matched (${cardNumberDigitsCount} digits)`;
    }

    return `Entered ${cardNumberDigitsCount} digits. Expected: ${formatExpectedLengthsLabel(expectedCardNumberLengths)}`;
  }, [cardNumberDigitsCount, expectedCardNumberLengths, isCardNumberLengthMatch]);

  useEffect(() => {
    let ignore = false;

    const fetchProviderOptions = async () => {
      try {
        const response = await fetch('/api/card-provider', { cache: 'no-store' });
        if (!response.ok) return;

        const result = (await response.json()) as CardProviderApiResponse;
        const providerNames = Array.isArray(result.data) ? result.data : [];

        if (ignore) return;
        setProviderOptions((previous) => mergeProviderOptions(previous, providerNames));
      } catch {
        // Keep existing local options if loading fails.
      }
    };

    void fetchProviderOptions();

    return () => {
      ignore = true;
    };
  }, []);

  const scheduleTagValidation = () => {
    window.requestAnimationFrame(() => validateFields(['tags']));
  };

  const handleTagPickerChange = (tag: string) => {
    if (tag === TAG_PICKER_PLACEHOLDER) return;

    const mergedTags = parseCardTags([tagsValue, tag].filter(Boolean).join(', ')).join(', ');
    setTagsValue(mergedTags);
    setTagPickerValue(TAG_PICKER_PLACEHOLDER);
    scheduleTagValidation();
  };

  const handleProviderOptionSelect = (providerOption: string, addIfMissing = false) => {
    const normalizedProvider = normalizeProvider(providerOption);
    if (!normalizedProvider) return;

    setProviderValue(normalizedProvider);

    if (addIfMissing) {
      setProviderOptions((previous) => mergeProviderOptions(previous, [normalizedProvider]));
    }

    window.requestAnimationFrame(() => validateFields(['provider']));
  };

  const getFieldErrorsFromForm = () => {
    if (!formRef.current) return {};

    const formData = new FormData(formRef.current);
    return validateCardFormFields({
      cardName: String(formData.get('card_name') ?? '').trim(),
      tags: parseCardTags(String(formData.get('tags') ?? '')),
      provider: String(formData.get('provider') ?? '').trim(),
      creditLimitRaw: String(formData.get('credit_limit') ?? '').trim(),
      billingDateRaw: String(formData.get('billing_date') ?? '').trim(),
      paymentDateRaw: String(formData.get('payment_date') ?? '').trim(),
      number: String(formData.get('number') ?? '').trim(),
      holderName: String(formData.get('holder_name') ?? '').trim(),
      cardType: String(formData.get('card_type') ?? '')
        .trim()
        .toLowerCase(),
      network: Number(formData.get('network')),
      expiryMonth: Number(formData.get('expiry_month')),
      expiryYearRaw: String(formData.get('expiry_year') ?? '').trim(),
      cvv: String(formData.get('cvv') ?? '').trim(),
    });
  };

  const validateFields = (fields: Array<keyof CardFormFieldErrors>) => {
    const nextFieldErrors = getFieldErrorsFromForm();

    setFieldErrors((previous) => {
      const next = { ...previous };

      for (const field of fields) {
        const message = nextFieldErrors[field];
        if (message) {
          next[field] = message;
        } else {
          delete next[field];
        }
      }

      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextFieldErrors = getFieldErrorsFromForm();

    if (Object.keys(nextFieldErrors).length > 0) {
      event.preventDefault();
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
  };

  return (
    <form ref={formRef} action={action} onSubmit={handleSubmit} className={entityFormGridClass}>
      {cardId ? <input type='hidden' name='id' value={cardId} /> : null}
      {!cardId ? <input type='hidden' name='status' value='active' /> : null}
      <input
        type='hidden'
        name='color_name'
        value={buildCardAppearance(selectedColorName, selectedPatternKey)}
      />
      <CardFormPendingOverlay />

      <FormField
        id='color_name'
        label={fieldMeta.card_type.label}
        error={fieldErrors.card_type}
        className={cn(entityFormSectionCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.card_type.hint}
      >
        <EntityModeToggleCardGroup
          name='card_type'
          value={selectedCardType}
          required
          onValueChange={(value) => {
            setSelectedCardType(value === 'debit' ? 'debit' : 'credit');
            validateFields(['card_type', 'credit_limit']);
          }}
          options={[
            {
              value: 'credit',
              title: fieldMeta.card_type.options?.[0]?.title ?? 'Credit',
              subtitle: fieldMeta.card_type.options?.[0]?.subtitle ?? 'Pay later billing cycle',
              icon: <CreditCard className='h-4 w-4' />,
            },
            {
              value: 'debit',
              title: fieldMeta.card_type.options?.[1]?.title ?? 'Debit',
              subtitle:
                fieldMeta.card_type.options?.[1]?.subtitle ?? 'Instant balance deduction',
              icon: <Landmark className='h-4 w-4' />,
            },
          ]}
        />
      </FormField>

      {selectedCardType === 'credit' ? (
        <EntityInputField
          id='credit_limit'
          label={fieldMeta.credit_limit.label}
          error={fieldErrors.credit_limit}
          labelClassName={entityFormLabelClass}
          hint={fieldMeta.credit_limit.hint}
          inputProps={{
            name: 'credit_limit',
            placeholder: fieldMeta.credit_limit.placeholder,
            onChange: () => validateFields(['credit_limit']),
            inputMode: fieldMeta.credit_limit.inputMode,
            defaultValue: values.creditLimit,
            required: fieldMeta.credit_limit.required,
          }}
        />
      ) : null}

      <EntityInputField
        id='card_name'
        label={fieldMeta.card_name.label}
        error={fieldErrors.card_name}
        labelClassName={entityFormLabelClass}
        inputProps={{
          name: 'card_name',
          placeholder: fieldMeta.card_name.placeholder,
          onChange: () => validateFields(['card_name']),
          minLength: 2,
          maxLength: fieldMeta.card_name.maxLength,
          defaultValue: values.cardName,
          required: fieldMeta.card_name.required,
        }}
      />

      <FormField
        id='tags'
        label={fieldMeta.tags.label}
        error={fieldErrors.tags}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.tags.hint}
      >
        <div className='space-y-2'>
          <Input
            id='tags'
            name='tags'
            list='card-tag-suggestions'
            placeholder={fieldMeta.tags.placeholder}
            value={tagsValue}
            onChange={(event) => {
              setTagsValue(event.target.value);
              validateFields(['tags']);
            }}
            className={cn(
              entityFormControlClass,
              fieldErrors.tags && 'border-destructive focus-visible:ring-destructive',
            )}
            aria-invalid={Boolean(fieldErrors.tags)}
            maxLength={fieldMeta.tags.maxLength}
            autoComplete='off'
          />
          <datalist id='card-tag-suggestions'>
            {availableTagSuggestions.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>

          <AppSelectField
            value={tagPickerValue === TAG_PICKER_PLACEHOLDER ? undefined : tagPickerValue}
            onValueChange={handleTagPickerChange}
            ariaLabel='Quick add tag'
            placeholder='Quick add tag'
            triggerClassName={cn(entityFormSelectClass, 'h-10')}
            options={availableTagSuggestions.map((tag) => ({ value: tag, label: tag }))}
          />
        </div>
      </FormField>
      <FormField
        id='number'
        label={fieldMeta.number.label}
        error={fieldErrors.number}
        labelClassName={entityFormLabelClass}
      >
        <div className='space-y-1.5'>
          <CardNumberInput
            id='number'
            defaultValue={values.number}
            network={selectedNetwork}
            required
            onChange={(value) => {
              setNumberValue(value);
              validateFields(['number']);
            }}
            className={cn(
              entityFormControlClass,
              fieldErrors.number && 'border-destructive focus-visible:ring-destructive',
            )}
          />
          <p
            className={cn(
              'text-xs',
              fieldErrors.number
                ? 'text-destructive'
                : isCardNumberLengthMatch
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-text-subtle',
            )}
          >
            {cardNumberMatchHint}
          </p>
        </div>
      </FormField>

      <FormField
        id='color'
        label={fieldMeta.color.label}
        className={cn('min-w-0', entityFormSectionCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.color.hint}
      >
        <div className='w-full max-w-full overflow-x-auto overscroll-x-contain py-1 pl-1'>
          <div className='flex min-w-max flex-nowrap items-center gap-2 pr-1'>
            {themes.map((theme) => {
              const isSelected = selectedColorName === theme.colorName;

              return (
                <button
                  key={theme.colorName}
                  type='button'
                  onClick={() => setSelectedColorName(theme.colorName)}
                  className={cn(
                    'relative h-10 w-10 shrink-0 rounded-full border border-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    theme.surface,
                    isSelected && 'ring-2 ring-primary ring-offset-2',
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Select ${theme.colorName} color`}
                  title={theme.colorName}
                >
                  {isSelected ? (
                    <span className='absolute inset-0 inline-flex items-center justify-center text-media-foreground drop-shadow-media-strong'>
                      <Check className='h-4 w-4' />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </FormField>

      <FormField
        id='pattern'
        label={fieldMeta.pattern.label}
        className={cn(entityFormSectionCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.pattern.hint}
      >
        <div className='space-y-2'>
          <div className='grid grid-cols-3 gap-2 sm:grid-cols-6'>
            {CARD_PATTERNS.map((pattern) => {
              const isSelected = selectedPatternKey === pattern.key;

              return (
                <button
                  key={pattern.key}
                  type='button'
                  onClick={() => setSelectedPatternKey(pattern.key)}
                  className={cn(
                    'relative inline-flex h-11 items-center justify-center rounded-xl border px-2 text-[11px] font-semibold transition-all',
                    'bg-background/92 hover:bg-background',
                    pattern.swatchClassName,
                    isSelected
                      ? 'border-primary ring-2 ring-primary/40 ring-offset-1 ring-offset-background'
                      : 'border-border/70',
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Select ${pattern.label} pattern`}
                  title={pattern.label}
                >
                  <span className='relative z-10 text-foreground drop-shadow-media-soft'>
                    {pattern.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type='button'
            onClick={() => setSelectedPatternKey(getRandomCardPatternKey())}
            className='inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/70 bg-background/90 px-3 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-background'
          >
            <Shuffle className='h-3.5 w-3.5' />
            Random pattern
          </button>
        </div>
      </FormField>

      <EntityAutocompleteField
        id='provider'
        label={fieldMeta.provider.label}
        error={fieldErrors.provider}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.provider.hint}
        name='provider'
        value={providerValue}
        onValueChange={(nextValue) => {
          setProviderValue(nextValue);
          validateFields(['provider']);
        }}
        options={providerOptions}
        placeholder={fieldMeta.provider.placeholder}
        maxLength={fieldMeta.provider.maxLength}
        normalizeInput={normalizeProvider}
        onSelectOption={(option, details) => handleProviderOptionSelect(option, details.isNew)}
      />

      <EntityInputField
        id='holder_name'
        label={fieldMeta.holder_name.label}
        error={fieldErrors.holder_name}
        labelClassName={entityFormLabelClass}
        inputProps={{
          name: 'holder_name',
          placeholder: fieldMeta.holder_name.placeholder,
          onChange: () => validateFields(['holder_name']),
          autoComplete: 'cc-name',
          minLength: 2,
          maxLength: fieldMeta.holder_name.maxLength,
          defaultValue: values.holderName,
          required: fieldMeta.holder_name.required,
        }}
      />

      <FormField
        id='expiry_month'
        label={fieldMeta.expiry_month.label}
        error={fieldErrors.expiry_month}
        labelClassName={entityFormLabelClass}
      >
        <>
          <input type='hidden' id='expiry_month' name='expiry_month' value={selectedExpiryMonth} />
          <AppSelectField
            value={selectedExpiryMonth}
            onValueChange={(value) => {
              setSelectedExpiryMonth(value);
              validateFields(['expiry_month', 'expiry_year']);
            }}
            required
            ariaInvalid={Boolean(fieldErrors.expiry_month)}
            placeholder={fieldMeta.expiry_month.placeholder ?? 'Select month'}
            triggerClassName={cn(
              entityFormSelectClass,
              fieldErrors.expiry_month && 'border-destructive focus-visible:ring-destructive',
            )}
            options={MONTH_OPTIONS.map((month) => ({ value: month.value, label: month.label }))}
          />
        </>
      </FormField>

      <EntityInputField
        id='expiry_year'
        label={fieldMeta.expiry_year.label}
        error={fieldErrors.expiry_year}
        labelClassName={entityFormLabelClass}
        inputProps={{
          name: 'expiry_year',
          placeholder: fieldMeta.expiry_year.placeholder,
          onChange: () => validateFields(['expiry_year']),
          inputMode: fieldMeta.expiry_year.inputMode,
          pattern: '[0-9]{4}',
          minLength: 4,
          maxLength: fieldMeta.expiry_year.maxLength,
          defaultValue: values.expiryYear,
          required: fieldMeta.expiry_year.required,
        }}
      />

      <EntityInputField
        id='billing_date'
        label={fieldMeta.billing_date.label}
        error={fieldErrors.billing_date}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.billing_date.hint}
        inputProps={{
          name: 'billing_date',
          placeholder: fieldMeta.billing_date.placeholder,
          onChange: () => validateFields(['billing_date']),
          inputMode: fieldMeta.billing_date.inputMode,
          pattern: '[0-9]{1,2}',
          min: 1,
          max: 31,
          defaultValue: values.billingDate,
        }}
      />

      <EntityInputField
        id='payment_date'
        label={fieldMeta.payment_date.label}
        error={fieldErrors.payment_date}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.payment_date.hint}
        inputProps={{
          name: 'payment_date',
          placeholder: fieldMeta.payment_date.placeholder,
          onChange: () => validateFields(['payment_date']),
          inputMode: fieldMeta.payment_date.inputMode,
          pattern: '[0-9]{1,2}',
          min: 1,
          max: 31,
          defaultValue: values.paymentDate,
        }}
      />

      <FormField
        id='network'
        label={fieldMeta.network.label}
        error={fieldErrors.network}
        labelClassName={entityFormLabelClass}
        hint={fieldMeta.network.hint}
      >
        <>
          <input type='hidden' id='network' name='network' value={selectedNetwork} />
          <AppSelectField
            value={selectedNetwork}
            onValueChange={(value) => {
              setSelectedNetwork(value);
              validateFields(['network', 'number', 'cvv']);
            }}
            required
            ariaInvalid={Boolean(fieldErrors.network)}
            placeholder={fieldMeta.network.placeholder ?? 'Select network'}
            triggerClassName={cn(
              entityFormSelectClass,
              fieldErrors.network && 'border-destructive focus-visible:ring-destructive',
            )}
            options={CARD_NETWORK_FORM_OPTIONS.map((networkOption) => ({
              value: networkOption.value,
              label: networkOption.label,
            }))}
          />
        </>
      </FormField>

      <FormField
        id='cvv'
        label={fieldMeta.cvv.label}
        error={fieldErrors.cvv}
        labelClassName={entityFormLabelClass}
        hint={`Enter the ${cvvLength}-digit security code.`}
      >
        <CvvOtpInput
          id='cvv'
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
  );
}

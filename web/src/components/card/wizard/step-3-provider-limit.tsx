'use client';

import { useEffect, useState } from 'react';
import { EntityAutocompleteField } from '@/components/shared/entity-form-kit';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { clientApiGet } from '@/lib/api/client';
import { cn } from '@/lib/utils';
import type { CardFormData } from '@/hooks/use-card-wizard';
import type { CardFormFieldErrors } from '@/utils/card/validation';

type Step3ProviderProps = {
  formData: CardFormData;
  cardType: 'credit' | 'debit' | '';
  errors: CardFormFieldErrors;
  onFieldChange: (field: keyof CardFormData, value: string) => void;
  providerOptions?: string[];
};

const DEFAULT_PROVIDERS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'Yes Bank', 'IndusInd Bank', 'HSBC', 'Citibank', 'Standard Chartered'];

const entityFormControlClass = 'flex h-9 w-full rounded-md border border-glass-border bg-glass px-3 py-1 text-base text-foreground shadow-neu-inset backdrop-blur-md transition-all file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50';

export function Step3Provider({
  formData,
  cardType,
  errors,
  onFieldChange,
  providerOptions,
}: Step3ProviderProps) {
  const [providers, setProviders] = useState<string[]>(providerOptions || DEFAULT_PROVIDERS);
  const [isLoadingProviders, setIsLoadingProviders] = useState(!providerOptions);

  useEffect(() => {
    if (providerOptions) {
      setProviders(providerOptions);
      setIsLoadingProviders(false);
      return;
    }

    const fetchProviders = async () => {
      try {
        setIsLoadingProviders(true);
        const { data, response } = await clientApiGet<{ providers?: string[] }>('/api/card-provider');
        
        if (response.ok && data?.providers && Array.isArray(data.providers)) {
          setProviders(data.providers);
        } else {
          setProviders(DEFAULT_PROVIDERS);
        }
      } catch {
        setProviders(DEFAULT_PROVIDERS);
      } finally {
        setIsLoadingProviders(false);
      }
    };

    fetchProviders();
  }, [providerOptions]);

  const handleProviderChange = (value: string) => {
    onFieldChange('provider', value);
  };

  const handleCreditLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFieldChange('creditLimit', value);
  };

  const isCreditCard = cardType === 'credit';
  const providerError = errors.provider;
  const creditLimitError = errors.credit_limit;

  return (
    <div className="w-full space-y-6">
      {/* Provider Field */}
      <EntityAutocompleteField
        id="provider"
        label="Card Provider"
        value={formData.provider}
        onValueChange={handleProviderChange}
        options={providers}
        error={providerError}
        hint="Your card's issuing bank or provider"
        placeholder="Select or enter your bank name"
        emptyStateText="No matching banks found"
        allowCreate={true}
        normalizeInput={(value) => value.trim()}
      />

      {/* Credit Limit Field - Only for credit cards */}
      {isCreditCard ? (
        <FormField
          id="credit-limit"
          label="Credit Limit"
          hint="Enter your credit limit (numbers only, e.g., 50000)"
          error={creditLimitError}
        >
          <Input
            id="credit-limit"
            type="text"
            placeholder="e.g., 50000"
            value={formData.creditLimit}
            onChange={handleCreditLimitChange}
            className={cn(
              entityFormControlClass,
              creditLimitError && 'border-destructive focus-visible:ring-destructive',
            )}
            aria-invalid={Boolean(creditLimitError)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </FormField>
      ) : null}

      {/* Info message for debit cards */}
      {cardType === 'debit' && (
        <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-900">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Credit limits are not applicable for debit cards
          </p>
        </div>
      )}
    </div>
  );
}

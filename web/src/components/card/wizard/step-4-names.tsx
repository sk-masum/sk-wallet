'use client';

import { useMemo } from 'react';
import { EntityInputField } from '@/components/shared/entity-form-kit';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { CardFormData } from '@/hooks/use-card-wizard';
import type { CardFormFieldErrors } from '@/utils/card/validation';

export type Step4NamesProps = {
  formData: CardFormData;
  errors: CardFormFieldErrors;
  onFieldChange: (field: keyof CardFormData, value: string) => void;
};

const CARD_NAME_MAX = 50;
const HOLDER_NAME_MAX = 26;

const CARD_NAME_SUGGESTIONS = ['Personal Use', 'Shopping', 'Travel', 'Work', 'Emergency', 'Dining', 'Subscriptions'];

const entityFormControlClass =
  'flex h-9 w-full rounded-md border border-glass-border bg-glass px-3 py-1 text-base text-foreground shadow-neu-inset backdrop-blur-md transition-all file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50';

function getCharacterCounterColor(current: number, max: number): string {
  const percentage = current / max;
  if (percentage >= 0.9) {
    return 'text-red-600 dark:text-red-400';
  }
  if (percentage >= 0.75) {
    return 'text-amber-600 dark:text-amber-400';
  }
  return 'text-text-subtle';
}

export function Step4Names({ formData, errors, onFieldChange }: Step4NamesProps) {
  const cardNameLength = formData.cardName.length;
  const holderNameLength = formData.holderName.length;

  const cardNameCounterColor = useMemo(
    () => getCharacterCounterColor(cardNameLength, CARD_NAME_MAX),
    [cardNameLength]
  );

  const holderNameCounterColor = useMemo(
    () => getCharacterCounterColor(holderNameLength, HOLDER_NAME_MAX),
    [holderNameLength]
  );

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, CARD_NAME_MAX);
    onFieldChange('cardName', value);
  };

  const handleHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .slice(0, HOLDER_NAME_MAX)
      .toUpperCase()
      .replace(/[^A-Z0-9\s\-']/g, '');
    onFieldChange('holderName', value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onFieldChange('cardName', suggestion);
  };

  return (
    <div className="w-full space-y-6">
      {/* Card Name Field */}
      <FormField
        id="card-name"
        label="Card Name"
        hint="Give your card a recognizable name for easy identification"
        error={errors.card_name}
        className="space-y-3"
      >
        <div className="space-y-2">
          <Input
            id="card-name"
            type="text"
            placeholder="e.g., My Primary Card, Travel Card"
            value={formData.cardName}
            onChange={handleCardNameChange}
            maxLength={CARD_NAME_MAX}
            className={cn(
              entityFormControlClass,
              errors.card_name && 'border-destructive focus-visible:ring-destructive'
            )}
            aria-invalid={Boolean(errors.card_name)}
          />
          <div className={cn('text-xs font-medium', cardNameCounterColor)}>
            {cardNameLength} / {CARD_NAME_MAX} characters
          </div>
        </div>

        {/* Card Name Suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-text-subtle uppercase tracking-wide font-medium">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {CARD_NAME_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 rounded-full text-xs bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors border border-slate-300 dark:border-slate-600"
                aria-label={`Use suggestion: ${suggestion}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </FormField>

      {/* Holder Name Field */}
      <FormField
        id="holder-name"
        label="Cardholder Name"
        hint="Name as it appears on your card (automatically converted to uppercase)"
        error={errors.holder_name}
        className="space-y-3"
      >
        <div className="space-y-2">
          <Input
            id="holder-name"
            type="text"
            placeholder="e.g., JOHN DOE"
            value={formData.holderName}
            onChange={handleHolderNameChange}
            maxLength={HOLDER_NAME_MAX}
            className={cn(
              entityFormControlClass,
              errors.holder_name && 'border-destructive focus-visible:ring-destructive'
            )}
            aria-invalid={Boolean(errors.holder_name)}
          />
          <div className={cn('text-xs font-medium', holderNameCounterColor)}>
            {holderNameLength} / {HOLDER_NAME_MAX} characters
          </div>
        </div>
      </FormField>

      {/* Help Text */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50 space-y-2">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Card Name:</strong> This is for your personal reference. Use names like "Personal Use", "Shopping", or
          "Travel" to easily identify this card.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Cardholder Name:</strong> This should match the name on your physical card. Names are limited to 26
          characters to match standard card printing specifications.
        </p>
      </div>
    </div>
  );
}

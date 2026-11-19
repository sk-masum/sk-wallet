'use client';

import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CardFace } from '@/components/card/card-face';
import { CardNumberInput } from '@/components/card/card-number-input';
import { CvvOtpInput } from '@/components/card/cvv-otp-input';
import { useCardCreatorV2, type CardCreatorV2State } from '@/hooks/use-card-creator-v2';
import { CARD_NETWORK_FORM_OPTIONS } from '@/utils/card/network';
import { getCardThemes } from '@/utils/card/theme';
import { CARD_PATTERNS } from '@/constants/card/patterns';
import { MONTH_OPTIONS } from '@/constants/card/month-options';
import { cn } from '@/lib/utils';
import type { WalletCard } from '@/models/card';

export type InteractiveCardFormProps = {
  onSubmit: (data: CardCreatorV2State) => Promise<void>;
  isSubmitting?: boolean;
};

/**
 * Builds a WalletCard object from CardCreatorV2State for preview rendering.
 * This creates a temporary card object that CardFace can render.
 */
function buildPreviewCard(state: CardCreatorV2State): WalletCard {
  return {
    id: 'preview',
    owner_id: null,
    created_at: null,
    card_name: state.cardName,
    holder_name: state.holderName || 'CARDHOLDER',
    network: state.network,
    number: state.cardNumber,
    expiry_month: state.expiryMonth,
    expiry_year: state.expiryYear,
    cvv: state.cvv,
    color_name: state.colorName,
    provider: state.provider || null,
    credit_limit: state.creditLimit || null,
    billing_date: state.billingDate || null,
    payment_date: state.paymentDate || null,
    isCredit: state.isCredit,
    status: 'active',
  };
}

/**
 * Gets available year options (current year + 10 years into future)
 */
function getYearOptions(): Array<{ value: number; label: string }> {
  const currentYear = new Date().getFullYear();
  const years: Array<{ value: number; label: string }> = [];

  for (let i = 0; i <= 10; i++) {
    const year = currentYear + i;
    years.push({ value: year, label: String(year) });
  }

  return years;
}

/**
 * Zone section wrapper component for consistent styling
 */
function ZoneSection({
  title,
  children,
  error,
  isActive,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  error?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border-2 p-4 transition-all duration-200 cursor-pointer',
        isActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700',
        error && 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        {error && (
          <span className="text-xs font-medium text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * InteractiveCardForm - Main orchestrator component for card creator v2 flow.
 * Provides a responsive, interactive form with live card preview and zone-based editing.
 *
 * Layout:
 * - Desktop (lg+): 2-column grid with form on left, sticky card preview on right
 * - Mobile: Single column stack with card preview on top, form below
 *
 * Features:
 * - Live card preview that updates in real-time
 * - Zone-based form sections with inline editing
 * - Real-time validation with error display
 * - Responsive design with Tailwind CSS
 * - SessionStorage persistence via useCardCreatorV2 hook
 */
export function InteractiveCardForm({
  onSubmit,
  isSubmitting = false,
}: InteractiveCardFormProps) {
  const cardForm = useCardCreatorV2();
  const previewCard = useMemo(() => buildPreviewCard(cardForm), [cardForm]);
  const yearOptions = useMemo(() => getYearOptions(), []);
  const themes = useMemo(() => getCardThemes(), []);
  const patterns = useMemo(() => Object.entries(CARD_PATTERNS), []);

  /**
   * Handles form submission with validation
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cardForm.validateAll()) {
      return;
    }

    try {
      await onSubmit(cardForm.getFormData());
    } catch (error) {
      console.error('Card creation error:', error);
    }
  };

  const hasErrors = Object.keys(cardForm.errors).length > 0;
  const isFormInvalid = isSubmitting || hasErrors;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Responsive grid container: 2 cols on desktop, 1 col on mobile */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        {/* Left side: Interactive form zones */}
        <div className="space-y-6">
          {/* Zone 1: Network Selector */}
          <ZoneSection
            title="Card Network"
            isActive={cardForm.activeZone === 'network'}
            onClick={() =>
              cardForm.setActiveZone(
                cardForm.activeZone === 'network' ? undefined : 'network',
              )
            }
            error={cardForm.errors.network}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {
                    CARD_NETWORK_FORM_OPTIONS.find(
                      (opt) => opt.value === String(cardForm.network),
                    )?.label
                  }
                </div>
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              </div>

              {cardForm.activeZone === 'network' && (
                <select
                  value={String(cardForm.network)}
                  onChange={(e) => cardForm.updateNetwork(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                >
                  {CARD_NETWORK_FORM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </ZoneSection>

          {/* Zone 2: Card Number */}
          <ZoneSection
            title="Card Number"
            isActive={cardForm.activeZone === 'cardNumber'}
            onClick={() =>
              cardForm.setActiveZone(
                cardForm.activeZone === 'cardNumber' ? undefined : 'cardNumber',
              )
            }
            error={cardForm.errors.number}
          >
            <div className="space-y-3">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {cardForm.cardNumber
                  ? cardForm.cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
                  : 'Enter card number'}
              </div>

              {cardForm.activeZone === 'cardNumber' && (
                <CardNumberInput
                  defaultValue={cardForm.cardNumber}
                  onChange={cardForm.updateCardNumber}
                  network={cardForm.network}
                />
              )}
            </div>
          </ZoneSection>

          {/* Zone 3: Card Name */}
          <ZoneSection
            title="Card Name"
            isActive={cardForm.activeZone === 'cardName'}
            onClick={() =>
              cardForm.setActiveZone(
                cardForm.activeZone === 'cardName' ? undefined : 'cardName',
              )
            }
            error={cardForm.errors.card_name}
          >
            <div className="space-y-3">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {cardForm.cardName || 'No name set'}
              </div>

              {cardForm.activeZone === 'cardName' && (
                <Input
                  type="text"
                  value={cardForm.cardName}
                  onChange={(e) => cardForm.updateCardName(e.target.value)}
                  placeholder="e.g., My Business Card"
                  maxLength={32}
                  autoFocus
                  className="text-sm"
                />
              )}
            </div>
          </ZoneSection>

          {/* Zone 4: Expiry & CVV */}
          <ZoneSection
            title="Expiry & CVV"
            isActive={cardForm.activeZone === 'expiry'}
            onClick={() =>
              cardForm.setActiveZone(
                cardForm.activeZone === 'expiry' ? undefined : 'expiry',
              )
            }
            error={cardForm.errors.expiry_month || cardForm.errors.expiry_year || cardForm.errors.cvv}
          >
            <div className="space-y-3">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {cardForm.expiryMonth && cardForm.expiryYear
                  ? `${String(cardForm.expiryMonth).padStart(2, '0')}/${String(cardForm.expiryYear).slice(-2)}`
                  : 'Set expiry date'}
              </div>

              {cardForm.activeZone === 'expiry' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={cardForm.expiryMonth || ''}
                      onChange={(e) => cardForm.updateExpiryMonth(Number(e.target.value))}
                      className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                    >
                      <option value="">Month</option>
                      {MONTH_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <select
                      value={cardForm.expiryYear || ''}
                      onChange={(e) => cardForm.updateExpiryYear(Number(e.target.value))}
                      className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                    >
                      <option value="">Year</option>
                      {yearOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <CvvOtpInput
                    defaultValue={cardForm.cvv}
                    onChange={cardForm.updateCvv}
                    length={4}
                  />
                </div>
              )}
            </div>
          </ZoneSection>

          {/* Zone 5: Theme & Pattern */}
          <ZoneSection
            title="Theme & Pattern"
            isActive={cardForm.activeZone === 'theme'}
            onClick={() =>
              cardForm.setActiveZone(
                cardForm.activeZone === 'theme' ? undefined : 'theme',
              )
            }
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full border-2 border-neutral-300"
                  style={{ backgroundColor: themes.find((t) => t.colorName === cardForm.colorName)?.surface }}
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {cardForm.colorName}
                </span>
              </div>

              {cardForm.activeZone === 'theme' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-2 block">
                      Theme Color
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {themes.map((theme) => (
                        <button
                          key={theme.colorName}
                          type="button"
                          onClick={() => cardForm.updateColorName(theme.colorName)}
                          className={cn(
                            'h-8 w-8 rounded-lg border-2 transition-all',
                            cardForm.colorName === theme.colorName
                              ? 'border-neutral-900 dark:border-neutral-100 ring-2 ring-blue-500'
                              : 'border-neutral-300 dark:border-neutral-700',
                          )}
                          style={{ backgroundColor: theme.surface }}
                          title={theme.colorName}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-2 block">
                      Pattern
                    </label>
                    <select
                      value={cardForm.patternKey}
                      onChange={(e) => cardForm.updatePatternKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                    >
                      {patterns.map(([key, pattern]) => (
                        <option key={key} value={key}>
                          {pattern.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </ZoneSection>

          {/* Zone 6: More Details (Collapsible) */}
          <ZoneSection
            title="More Details"
            isActive={cardForm.activeZone === 'details'}
            onClick={() =>
              cardForm.setActiveZone(
                cardForm.activeZone === 'details' ? undefined : 'details',
              )
            }
          >
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {cardForm.showMoreDetails
                ? 'Provider, holder name, and billing details'
                : 'Optional fields (provider, dates, etc.)'}
            </div>

            {cardForm.activeZone === 'details' && (
              <div className="space-y-4 mt-4">
                {/* Holder Name */}
                <FormField
                  id="holder-name"
                  label="Holder Name"
                  hint="Name as it appears on card"
                  error={cardForm.errors.holder_name}
                >
                  <Input
                    type="text"
                    value={cardForm.holderName}
                    onChange={(e) => cardForm.updateHolderName(e.target.value)}
                    placeholder="JOHN DOE"
                    maxLength={26}
                  />
                </FormField>

                {/* Card Type */}
                <FormField id="card-type" label="Card Type">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => cardForm.updateIsCredit(false)}
                      className={cn(
                        'flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-all',
                        !cardForm.isCredit
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300',
                      )}
                    >
                      Debit
                    </button>
                    <button
                      type="button"
                      onClick={() => cardForm.updateIsCredit(true)}
                      className={cn(
                        'flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-all',
                        cardForm.isCredit
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300',
                      )}
                    >
                      Credit
                    </button>
                  </div>
                </FormField>

                {/* Credit Limit (only if credit card) */}
                {cardForm.isCredit && (
                  <FormField
                    id="credit-limit"
                    label="Credit Limit"
                    error={cardForm.errors.credit_limit}
                  >
                    <Input
                      type="number"
                      value={cardForm.creditLimit || ''}
                      onChange={(e) =>
                        cardForm.updateCreditLimit(Number(e.target.value) || 0)
                      }
                      placeholder="e.g., 50000"
                      min="0"
                    />
                  </FormField>
                )}

                {/* Provider */}
                <FormField id="provider" label="Provider (Optional)">
                  <Input
                    type="text"
                    value={cardForm.provider || ''}
                    onChange={(e) => cardForm.updateProvider(e.target.value)}
                    placeholder="e.g., HDFC, ICICI"
                  />
                </FormField>

                {/* Billing Date */}
                <FormField
                  id="billing-date"
                  label="Billing Date (Optional)"
                  hint="Day of month (1-31)"
                  error={cardForm.errors.billing_date}
                >
                  <Input
                    type="number"
                    value={cardForm.billingDate || ''}
                    onChange={(e) =>
                      cardForm.updateBillingDate(Number(e.target.value) || 0)
                    }
                    placeholder="1-31"
                    min="1"
                    max="31"
                  />
                </FormField>

                {/* Payment Date */}
                <FormField
                  id="payment-date"
                  label="Payment Date (Optional)"
                  hint="Day of month (1-31)"
                  error={cardForm.errors.payment_date}
                >
                  <Input
                    type="number"
                    value={cardForm.paymentDate || ''}
                    onChange={(e) =>
                      cardForm.updatePaymentDate(Number(e.target.value) || 0)
                    }
                    placeholder="1-31"
                    min="1"
                    max="31"
                  />
                </FormField>
              </div>
            )}
          </ZoneSection>
        </div>

        {/* Right side: Card preview (sticky on desktop) */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Card Preview
            </h3>
            <div className="flex items-center justify-center min-h-[280px]">
              <CardFace
                card={previewCard}
                showCardNumber={true}
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-8 flex gap-3">
        <Button
          type="submit"
          disabled={isFormInvalid}
          className="min-w-[200px]"
        >
          {isSubmitting ? 'Creating Card...' : 'Create Card'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => cardForm.reset()}
          disabled={isSubmitting}
        >
          Clear
        </Button>
      </div>

      {/* Display form-level errors if validation fails */}
      {hasErrors && (
        <div className="mt-4 p-4 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
            Please fix the following errors:
          </p>
          <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
            {Object.entries(cardForm.errors).map(([field, error]) => (
              error && (
                <li key={field}>
                  • {error}
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

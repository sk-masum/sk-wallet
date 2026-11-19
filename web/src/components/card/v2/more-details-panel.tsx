'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MoreDetailsPanelProps = {
  isExpanded: boolean;
  onToggle: () => void;
  provider?: string;
  billingDate?: number;
  paymentDate?: number;
  isCredit: boolean;
  creditLimit?: number;
  errors?: Partial<{
    provider: string;
    billingDate: string;
    paymentDate: string;
    creditLimit: string;
  }>;
  onProviderChange: (provider: string) => void;
  onBillingDateChange: (date: number) => void;
  onPaymentDateChange: (date: number) => void;
  onIsCreditChange: (isCredit: boolean) => void;
  onCreditLimitChange: (limit: number) => void;
};

export function MoreDetailsPanel({
  isExpanded,
  onToggle,
  provider = '',
  billingDate,
  paymentDate,
  isCredit,
  creditLimit,
  errors = {},
  onProviderChange,
  onBillingDateChange,
  onPaymentDateChange,
  onIsCreditChange,
  onCreditLimitChange,
}: MoreDetailsPanelProps) {
  return (
    <div className="border-t pt-4 mt-4">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        More Details
        <ChevronDown
          size={18}
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-in fade-in duration-200">
          {/* Provider Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider (Optional)
            </label>
            <input
              type="text"
              value={provider}
              onChange={(e) => onProviderChange(e.target.value)}
              placeholder="e.g., HDFC, ICICI, Axis"
              maxLength={50}
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                errors.provider
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              )}
            />
            {errors.provider && (
              <p className="text-sm text-red-500 mt-1">{errors.provider}</p>
            )}
          </div>

          {/* Billing Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Date (Optional)
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={billingDate || ''}
              onChange={(e) =>
                onBillingDateChange(e.target.value ? Number(e.target.value) : 0)
              }
              placeholder="Day (1-31)"
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                errors.billingDate
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              )}
            />
            {errors.billingDate && (
              <p className="text-sm text-red-500 mt-1">{errors.billingDate}</p>
            )}
          </div>

          {/* Payment Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date (Optional)
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={paymentDate || ''}
              onChange={(e) =>
                onPaymentDateChange(e.target.value ? Number(e.target.value) : 0)
              }
              placeholder="Day (1-31)"
              className={cn(
                'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                errors.paymentDate
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              )}
            />
            {errors.paymentDate && (
              <p className="text-sm text-red-500 mt-1">{errors.paymentDate}</p>
            )}
          </div>

          {/* Is Credit Card Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is-credit"
              checked={isCredit}
              onChange={(e) => onIsCreditChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-400 cursor-pointer"
            />
            <label
              htmlFor="is-credit"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              This is a credit card
            </label>
          </div>

          {/* Credit Limit Field - Conditional */}
          {isCredit && (
            <div className="animate-in fade-in duration-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Limit (₹)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={creditLimit || ''}
                onChange={(e) =>
                  onCreditLimitChange(e.target.value ? Number(e.target.value) : 0)
                }
                placeholder="Enter credit limit"
                className={cn(
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.creditLimit
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-400'
                )}
              />
              {errors.creditLimit && (
                <p className="text-sm text-red-500 mt-1">{errors.creditLimit}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

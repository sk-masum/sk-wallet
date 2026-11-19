'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

import { CardNumberInput } from '@/components/card/card-number-input';
import { CardNetwork } from '@/models/card';
import { validateCardFormFields } from '@/utils/card/validation';
import { cn } from '@/lib/utils';

export type CardNumberEditorProps = {
  cardNumber: string;
  network: CardNetwork;
  errors?: string;
  onChange: (number: string) => void;
  onZoneToggle: (active: boolean) => void;
  isActive?: boolean;
};

function formatCardNumberDisplay(value: string, network: CardNetwork): string {
  const digits = value.replace(/\D/g, '');
  if (network === CardNetwork.AMEX) {
    const part1 = digits.slice(0, 4);
    const part2 = digits.slice(4, 10);
    const part3 = digits.slice(10, 15);
    return [part1, part2, part3].filter(Boolean).join(' - ');
  }
  return digits
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function getExpectedCardLength(network: CardNetwork): string {
  switch (network) {
    case CardNetwork.VISA:
      return '13 or 16 digits';
    case CardNetwork.MASTERCARD:
      return '16 digits';
    case CardNetwork.AMEX:
      return '15 digits';
    case CardNetwork.RUPAY:
      return '16 or 19 digits';
    default:
      return '13-19 digits';
  }
}

function getNetworkName(network: CardNetwork): string {
  switch (network) {
    case CardNetwork.VISA:
      return 'Visa';
    case CardNetwork.MASTERCARD:
      return 'Mastercard';
    case CardNetwork.AMEX:
      return 'American Express';
    case CardNetwork.RUPAY:
      return 'RuPay';
    default:
      return 'Unknown';
  }
}

function getExpectedLengths(network: CardNetwork): number[] {
  switch (network) {
    case CardNetwork.VISA:
      return [13, 16, 19];
    case CardNetwork.MASTERCARD:
      return [16];
    case CardNetwork.AMEX:
      return [15];
    case CardNetwork.RUPAY:
      return [16, 19];
    default:
      return [13, 14, 15, 16, 17, 18, 19];
  }
}

function getValidationFeedback(number: string, network: CardNetwork): {
  status: 'valid' | 'error' | 'warning' | 'idle';
  message: string;
} {
  const digitsOnly = number.replace(/\D/g, '');

  if (!digitsOnly) {
    return { status: 'idle', message: '' };
  }

  const errors = validateCardFormFields({
    cardName: 'temp',
    network,
    number: digitsOnly,
    expiryMonth: 1,
    expiryYearRaw: '2025',
    cvv: '000',
    holderName: 'temp',
    cardType: 'debit',
    provider: '',
    creditLimitRaw: '',
    billingDateRaw: '',
    paymentDateRaw: '',
    tags: [],
    status: 'active',
  });

  if (errors.number) {
    return { status: 'error', message: errors.number };
  }

  const expectedLengths = getExpectedLengths(network);
  if (!expectedLengths.includes(digitsOnly.length)) {
    return {
      status: 'warning',
      message: `Entered ${digitsOnly.length} digits. Expected: ${getExpectedCardLength(network)}`,
    };
  }

  return { status: 'valid', message: `Valid ${getNetworkName(network)} card` };
}

export function CardNumberEditor({
  cardNumber,
  network,
  errors,
  onChange,
  onZoneToggle,
  isActive = false,
}: CardNumberEditorProps) {
  const [isInternalActive, setIsInternalActive] = useState(isActive);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorInputRef = useRef<HTMLInputElement | null>(null);

  const displayNumber = cardNumber.replace(/\D/g, '');
  const feedback = getValidationFeedback(cardNumber, network);
  const hasError = !!errors || feedback.status === 'error';

  useEffect(() => {
    setIsInternalActive(isActive);
  }, [isActive]);

  useEffect(() => {
    if (isInternalActive && editorInputRef.current) {
      editorInputRef.current.focus();
    }
  }, [isInternalActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsInternalActive(false);
        onZoneToggle(false);
      }
    };

    if (isInternalActive) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isInternalActive, onZoneToggle]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsInternalActive(false);
      onZoneToggle(false);
    }
  };

  const handleActivate = () => {
    setIsInternalActive(true);
    onZoneToggle(true);
  };

  const handleClear = () => {
    onChange('');
  };

  if (isInternalActive) {
    return (
      <div ref={containerRef} className='space-y-3'>
        <div className='relative'>
          <CardNumberInput
            network={network}
            defaultValue={cardNumber}
            onChange={onChange}
            className={cn(
              'transition-all',
              hasError && 'border-destructive focus:border-destructive',
              feedback.status === 'valid' && 'border-green-600 focus:border-green-600',
            )}
          />
          {displayNumber && (
            <button
              type='button'
              onClick={handleClear}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded transition-colors'
              aria-label='Clear card number'
            >
              <X className='w-4 h-4 text-gray-400' />
            </button>
          )}
        </div>

        <div className='space-y-2'>
          {errors && (
            <div className='flex items-start gap-2'>
              <AlertCircle className='w-4 h-4 text-destructive flex-shrink-0 mt-0.5' />
              <p className='text-xs text-destructive'>{errors}</p>
            </div>
          )}

          {!errors && feedback.message && (
            <div
              className={cn(
                'flex items-start gap-2 text-xs',
                feedback.status === 'error' && 'text-destructive',
                feedback.status === 'valid' && 'text-green-600',
                feedback.status === 'warning' && 'text-amber-500',
              )}
            >
              {feedback.status === 'valid' && (
                <Check className='w-4 h-4 flex-shrink-0 mt-0.5' />
              )}
              {feedback.status === 'warning' && (
                <AlertCircle className='w-4 h-4 flex-shrink-0 mt-0.5' />
              )}
              <p>{feedback.message}</p>
            </div>
          )}

          <p className='text-xs text-text-subtle'>
            {getNetworkName(network)}: {getExpectedCardLength(network)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={handleActivate}
      className={cn(
        'w-full px-3 py-2 rounded border text-left transition-all',
        hasError
          ? 'border-destructive bg-red-950 hover:bg-red-900'
          : 'border-gray-600 bg-gray-900 hover:bg-gray-800',
      )}
    >
      {displayNumber ? (
        <div className='space-y-1'>
          <p className='text-sm font-mono text-gray-100'>
            {formatCardNumberDisplay(cardNumber, network)}
          </p>
          {errors && <p className='text-xs text-destructive'>{errors}</p>}
        </div>
      ) : (
        <p className='text-sm text-gray-400'>Enter card number</p>
      )}
    </button>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { CardNetwork } from '@/models/card';
import {
  validateCardFormFields,
  CardFormFieldErrors,
  getExpectedCvvLength,
} from '@/utils/card/validation';
import { CARD_THEMES } from '@/constants/card/themes';
import { CARD_PATTERNS, CARD_PATTERN_NONE } from '@/constants/card/patterns';

const SESSION_STORAGE_KEY = 'cardCreatorV2State';

/**
 * State interface for card creator v2 form
 */
export interface CardCreatorV2State {
  // Basic info
  cardName: string;
  network: CardNetwork;
  cardNumber: string;

  // Card security
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  holderName: string;

  // Appearance
  colorName: string;
  patternKey: string;

  // Additional details
  provider?: string;
  billingDate?: number;
  paymentDate?: number;
  isCredit: boolean;
  creditLimit?: number;

  // UI state
  activeZone?: string;
  showMoreDetails: boolean;
  errors: CardFormFieldErrors;
  isLoading?: boolean;
}

/**
 * Actions interface for card creator v2
 */
export interface CardCreatorV2Actions {
  // Field updates
  updateCardName: (name: string) => void;
  updateNetwork: (network: CardNetwork) => void;
  updateCardNumber: (number: string) => void;
  updateExpiryMonth: (month: number) => void;
  updateExpiryYear: (year: number) => void;
  updateCvv: (cvv: string) => void;
  updateHolderName: (name: string) => void;
  updateColorName: (color: string) => void;
  updatePatternKey: (pattern: string) => void;
  updateProvider: (provider: string) => void;
  updateBillingDate: (date: number) => void;
  updatePaymentDate: (date: number) => void;
  updateIsCredit: (isCredit: boolean) => void;
  updateCreditLimit: (limit: number) => void;

  // UI actions
  setActiveZone: (zone: string | undefined) => void;
  toggleMoreDetails: () => void;

  // Form actions
  validateField: (field: keyof CardCreatorV2State, value: any) => string | null;
  validateAll: () => boolean;
  reset: () => void;

  // Data
  getFormData: () => any;
}

/**
 * Combined type for the hook return value
 */
export type UseCardCreatorV2 = CardCreatorV2State & CardCreatorV2Actions;

const DEFAULT_STATE: CardCreatorV2State = {
  cardName: 'New Card',
  network: CardNetwork.VISA,
  cardNumber: '',
  expiryMonth: 0,
  expiryYear: new Date().getFullYear(),
  cvv: '',
  holderName: '',
  colorName: CARD_THEMES[0]?.colorName ?? 'Blue Indigo',
  patternKey: CARD_PATTERN_NONE,
  provider: '',
  billingDate: undefined,
  paymentDate: undefined,
  isCredit: false,
  creditLimit: undefined,
  activeZone: undefined,
  showMoreDetails: false,
  errors: {},
  isLoading: false,
};

/**
 * Hook for managing card creator v2 form state and validation
 * Provides complete state management with sessionStorage persistence
 */
export function useCardCreatorV2(): UseCardCreatorV2 {
  const [state, setState] = useState<CardCreatorV2State>(DEFAULT_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState((current) => ({
          ...current,
          ...parsed,
          errors: {}, // Clear errors on restore
        }));
      } catch {
        // Invalid stored state, use defaults
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist state to sessionStorage
  useEffect(() => {
    if (!isHydrated) return;

    const toStore = {
      cardName: state.cardName,
      network: state.network,
      cardNumber: state.cardNumber,
      expiryMonth: state.expiryMonth,
      expiryYear: state.expiryYear,
      cvv: state.cvv,
      holderName: state.holderName,
      colorName: state.colorName,
      patternKey: state.patternKey,
      provider: state.provider,
      billingDate: state.billingDate,
      paymentDate: state.paymentDate,
      isCredit: state.isCredit,
      creditLimit: state.creditLimit,
      activeZone: state.activeZone,
      showMoreDetails: state.showMoreDetails,
    };

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(toStore));
  }, [state, isHydrated]);

  /**
   * Validates a single field and returns error message if any
   */
  const validateField = useCallback(
    (field: keyof CardCreatorV2State, value: any): string | null => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      switch (field) {
        case 'cardName': {
          const name = String(value ?? '').trim();
          if (!name || name.length < 1) return 'Card name is required.';
          if (name.length > 32) return 'Card name cannot exceed 32 characters.';
          return null;
        }

        case 'holderName': {
          const name = String(value ?? '').trim();
          if (name.length > 26) return 'Holder name cannot exceed 26 characters.';
          return null;
        }

        case 'cardNumber': {
          const number = String(value ?? '').trim();
          const digitsOnly = number.replace(/\D/g, '');

          if (!digitsOnly) return 'Card number is required.';
          if (!/^\d{13,19}$/.test(digitsOnly)) {
            return 'Card number must contain 13 to 19 digits.';
          }

          // Use existing validation
          const errors = validateCardFormFields({
            cardName: state.cardName,
            network: state.network,
            number: digitsOnly,
            expiryMonth: state.expiryMonth,
            expiryYearRaw: String(state.expiryYear),
            cvv: state.cvv,
            holderName: state.holderName,
            cardType: state.isCredit ? 'credit' : 'debit',
            provider: state.provider ?? '',
            creditLimitRaw: String(state.creditLimit ?? ''),
            billingDateRaw: state.billingDate ? String(state.billingDate) : '',
            paymentDateRaw: state.paymentDate ? String(state.paymentDate) : '',
            tags: [],
            status: 'active',
          });

          return errors.number ?? null;
        }

        case 'expiryMonth': {
          const month = Number(value);
          if (!Number.isInteger(month) || month < 1 || month > 12) {
            return 'Expiry month must be between 1 and 12.';
          }
          return null;
        }

        case 'expiryYear': {
          const year = Number(value);
          if (!Number.isInteger(year) || year < currentYear) {
            return 'Expiry year must be in the future.';
          }

          // Check if month is in the past for current year
          if (year === currentYear && state.expiryMonth < currentMonth) {
            return 'Card expiry date cannot be in the past.';
          }

          return null;
        }

        case 'cvv': {
          const cvv = String(value ?? '').trim();
          const cvvDigits = cvv.replace(/\D/g, '');
          const expectedLength = getExpectedCvvLength(state.network);

          if (!cvvDigits) return 'CVV is required.';

          if (expectedLength === 4 && !/^\d{4}$/.test(cvvDigits)) {
            return 'Amex CVV must be 4 digits.';
          }

          if (expectedLength === 3 && !/^\d{3}$/.test(cvvDigits)) {
            return 'CVV must be 3 digits for the selected network.';
          }

          return null;
        }

        case 'creditLimit': {
          if (state.isCredit) {
            const limit = Number(value);
            if (!Number.isFinite(limit) || limit <= 0) {
              return 'Credit limit must be a positive number.';
            }
            if (limit > 99999999) {
              return 'Credit limit is too large.';
            }
          }
          return null;
        }

        case 'billingDate': {
          const date = Number(value);
          if (value !== undefined && value !== null && value !== '') {
            if (!Number.isInteger(date) || date < 1 || date > 31) {
              return 'Billing date must be a day between 1 and 31.';
            }
          }
          return null;
        }

        case 'paymentDate': {
          const date = Number(value);
          if (value !== undefined && value !== null && value !== '') {
            if (!Number.isInteger(date) || date < 1 || date > 31) {
              return 'Payment date must be a day between 1 and 31.';
            }
          }
          return null;
        }

        default:
          return null;
      }
    },
    [state.network, state.isCredit, state.expiryMonth, state.provider, state.cardName],
  );

  /**
   * Updates a field and validates it
   */
  const updateField = useCallback(
    (field: keyof CardCreatorV2State, value: any) => {
      setState((current) => ({
        ...current,
        [field]: value,
        errors: {
          ...current.errors,
          [field]: validateField(field, value),
        },
      }));
    },
    [validateField],
  );

  /**
   * Updates card name
   */
  const updateCardName = useCallback((name: string) => {
    updateField('cardName', name);
  }, [updateField]);

  /**
   * Updates network
   */
  const updateNetwork = useCallback((network: CardNetwork) => {
    setState((current) => ({
      ...current,
      network,
      cvv: '', // Clear CVV when network changes
      errors: {
        ...current.errors,
        network: undefined,
        cvv: undefined,
      },
    }));
  }, []);

  /**
   * Updates card number
   */
  const updateCardNumber = useCallback((number: string) => {
    updateField('cardNumber', number);
  }, [updateField]);

  /**
   * Updates expiry month
   */
  const updateExpiryMonth = useCallback((month: number) => {
    updateField('expiryMonth', month);
  }, [updateField]);

  /**
   * Updates expiry year
   */
  const updateExpiryYear = useCallback((year: number) => {
    updateField('expiryYear', year);
  }, [updateField]);

  /**
   * Updates CVV
   */
  const updateCvv = useCallback((cvv: string) => {
    updateField('cvv', cvv);
  }, [updateField]);

  /**
   * Updates holder name
   */
  const updateHolderName = useCallback((name: string) => {
    updateField('holderName', name);
  }, [updateField]);

  /**
   * Updates color name
   */
  const updateColorName = useCallback((color: string) => {
    setState((current) => ({
      ...current,
      colorName: color,
    }));
  }, []);

  /**
   * Updates pattern key
   */
  const updatePatternKey = useCallback((pattern: string) => {
    setState((current) => ({
      ...current,
      patternKey: pattern,
    }));
  }, []);

  /**
   * Updates provider
   */
  const updateProvider = useCallback((provider: string) => {
    setState((current) => ({
      ...current,
      provider,
    }));
  }, []);

  /**
   * Updates billing date
   */
  const updateBillingDate = useCallback((date: number) => {
    updateField('billingDate', date);
  }, [updateField]);

  /**
   * Updates payment date
   */
  const updatePaymentDate = useCallback((date: number) => {
    updateField('paymentDate', date);
  }, [updateField]);

  /**
   * Updates is credit flag
   */
  const updateIsCredit = useCallback((isCredit: boolean) => {
    setState((current) => ({
      ...current,
      isCredit,
      creditLimit: isCredit ? current.creditLimit : undefined,
      errors: {
        ...current.errors,
        credit_limit: undefined,
      },
    }));
  }, []);

  /**
   * Updates credit limit
   */
  const updateCreditLimit = useCallback((limit: number) => {
    updateField('creditLimit', limit);
  }, [updateField]);

  /**
   * Sets active zone for UI editing
   */
  const setActiveZone = useCallback((zone: string | undefined) => {
    setState((current) => ({
      ...current,
      activeZone: zone,
    }));
  }, []);

  /**
   * Toggles more details panel
   */
  const toggleMoreDetails = useCallback(() => {
    setState((current) => ({
      ...current,
      showMoreDetails: !current.showMoreDetails,
    }));
  }, []);

  /**
   * Validates all fields and returns true if valid
   */
  const validateAll = useCallback((): boolean => {
    const errors: CardFormFieldErrors = {};

    // Validate required fields
    if (!state.cardName || state.cardName.length < 1) {
      errors.card_name = 'Card name is required.';
    }

    if (!state.cardNumber) {
      errors.number = 'Card number is required.';
    }

    if (state.expiryMonth < 1 || state.expiryMonth > 12) {
      errors.expiry_month = 'Expiry month must be between 1 and 12.';
    }

    if (state.expiryYear < new Date().getFullYear()) {
      errors.expiry_year = 'Expiry year must be in the future.';
    }

    if (!state.cvv) {
      errors.cvv = 'CVV is required.';
    }

    if (!state.holderName || state.holderName.length < 1) {
      errors.holder_name = 'Holder name is required.';
    }

    if (state.isCredit && (!state.creditLimit || state.creditLimit <= 0)) {
      errors.credit_limit = 'Credit limit is required for credit cards.';
    }

    setState((current) => ({
      ...current,
      errors,
    }));

    return Object.keys(errors).length === 0;
  }, [state.cardName, state.cardNumber, state.expiryMonth, state.expiryYear, state.cvv, state.holderName, state.isCredit, state.creditLimit]);

  /**
   * Resets form to default state and clears sessionStorage
   */
  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  /**
   * Returns form data ready for submission
   */
  const getFormData = useCallback(() => {
    return {
      cardName: state.cardName,
      network: state.network,
      cardNumber: state.cardNumber,
      expiryMonth: state.expiryMonth,
      expiryYear: state.expiryYear,
      cvv: state.cvv,
      holderName: state.holderName,
      colorName: state.colorName,
      patternKey: state.patternKey,
      provider: state.provider,
      billingDate: state.billingDate,
      paymentDate: state.paymentDate,
      isCredit: state.isCredit,
      creditLimit: state.creditLimit,
    };
  }, [state.cardName, state.network, state.cardNumber, state.expiryMonth, state.expiryYear, state.cvv, state.holderName, state.colorName, state.patternKey, state.provider, state.billingDate, state.paymentDate, state.isCredit, state.creditLimit]);

  return {
    // State
    ...state,

    // Actions
    updateCardName,
    updateNetwork,
    updateCardNumber,
    updateExpiryMonth,
    updateExpiryYear,
    updateCvv,
    updateHolderName,
    updateColorName,
    updatePatternKey,
    updateProvider,
    updateBillingDate,
    updatePaymentDate,
    updateIsCredit,
    updateCreditLimit,
    setActiveZone,
    toggleMoreDetails,
    validateField,
    validateAll,
    reset,
    getFormData,
  };
}

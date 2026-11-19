'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { validateCardFormFields, CardFormFieldErrors } from '@/utils/card/validation';
import type { CardNetwork } from '@/models/card';

// Step configuration mapping steps to their required fields
const STEP_FIELDS: Record<number, (keyof CardFormData)[]> = {
  1: ['cardType', 'network', 'number'],
  2: ['expiryMonth', 'expiryYear', 'cvv'],
  3: ['provider', 'creditLimit'],
  4: ['cardName', 'holderName'],
  5: ['colorName'],
  6: ['billingDate', 'paymentDate'],
};

export interface CardFormData {
  cardType: 'credit' | 'debit' | '';
  network: number;
  number: string;
  expiryMonth: number;
  expiryYear: string;
  cvv: string;
  provider: string;
  creditLimit: string;
  cardName: string;
  holderName: string;
  colorName: string;
  billingDate: string;
  paymentDate: string;
}

export interface CardWizardState {
  currentStep: number;
  formData: CardFormData;
  errors: CardFormFieldErrors;
  isValidating: boolean;
  isSubmitting: boolean;
  completedSteps: Set<number>;
  skippedSteps: Set<number>;
}

export interface UseCardWizardReturn {
  state: CardWizardState;
  goToStep: (step: number) => boolean;
  nextStep: () => boolean;
  prevStep: () => void;
  skipStep: () => void;
  updateField: (fieldName: keyof CardFormData, value: unknown) => void;
  updateFormData: (data: Partial<CardFormData>) => void;
  getFormData: () => CardFormData;
  resetForm: () => void;
  validateCurrentStep: () => CardFormFieldErrors;
  formDataForPreview: () => CardFormData;
}

const DEFAULT_FORM_DATA: CardFormData = {
  cardType: 'credit',
  network: 0,
  number: '',
  expiryMonth: 0,
  expiryYear: '',
  cvv: '',
  provider: '',
  creditLimit: '',
  cardName: '',
  holderName: '',
  colorName: '',
  billingDate: '',
  paymentDate: '',
};

const TOTAL_STEPS = 6;
const SESSION_STORAGE_KEY = 'card-wizard-state';
const DEBOUNCE_DELAY = 300;

export function useCardWizard(): UseCardWizardReturn {
  const [state, setState] = useState<CardWizardState>({
    currentStep: 1,
    formData: DEFAULT_FORM_DATA,
    errors: {},
    isValidating: false,
    isSubmitting: false,
    completedSteps: new Set(),
    skippedSteps: new Set(),
  });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Initialize from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        const { currentStep, formData, completedSteps, skippedSteps } = JSON.parse(stored);
        setState((prev) => ({
          ...prev,
          currentStep,
          formData,
          completedSteps: new Set(completedSteps),
          skippedSteps: new Set(skippedSteps),
        }));
      } catch (e) {
        // Silently ignore parse errors
      }
    }
  }, []);

  // Persist state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        currentStep: state.currentStep,
        formData: state.formData,
        completedSteps: Array.from(state.completedSteps),
        skippedSteps: Array.from(state.skippedSteps),
      })
    );
  }, [state.currentStep, state.formData, state.completedSteps, state.skippedSteps]);

  /**
   * Validate fields relevant to the current step
   */
  const validateCurrentStep = useCallback((): CardFormFieldErrors => {
    const stepFields = STEP_FIELDS[state.currentStep];
    if (!stepFields) return {};

    const validationInput = {
      cardName: state.formData.cardName,
      provider: state.formData.provider,
      creditLimitRaw: state.formData.creditLimit,
      billingDateRaw: state.formData.billingDate,
      paymentDateRaw: state.formData.paymentDate,
      number: state.formData.number,
      holderName: state.formData.holderName,
      cardType: state.formData.cardType,
      network: state.formData.network,
      expiryMonth: state.formData.expiryMonth,
      expiryYearRaw: state.formData.expiryYear,
      cvv: state.formData.cvv,
    };

    const allErrors = validateCardFormFields(validationInput);

    // Filter errors to only those relevant to current step
    const stepErrors: CardFormFieldErrors = {};
    const fieldMap: Record<keyof CardFormData, keyof CardFormFieldErrors> = {
      cardType: 'card_type',
      network: 'network',
      number: 'number',
      expiryMonth: 'expiry_month',
      expiryYear: 'expiry_year',
      cvv: 'cvv',
      provider: 'provider',
      creditLimit: 'credit_limit',
      cardName: 'card_name',
      holderName: 'holder_name',
      colorName: 'card_name', // colorName doesn't have validation
      billingDate: 'billing_date',
      paymentDate: 'payment_date',
    };

    for (const field of stepFields) {
      const errorKey = fieldMap[field];
      if (errorKey && allErrors[errorKey]) {
        stepErrors[errorKey] = allErrors[errorKey];
      }
    }

    return stepErrors;
  }, [state.currentStep, state.formData]);

  /**
   * Navigate to a specific step with validation
   */
  const goToStep = useCallback(
    (step: number): boolean => {
      if (step < 1 || step > TOTAL_STEPS) return false;

      if (step > state.currentStep) {
        // Moving forward: validate current step
        const errors = validateCurrentStep();
        if (Object.keys(errors).length > 0) {
          setState((prev) => ({ ...prev, errors }));
          return false;
        }
      }

      setState((prev) => ({
        ...prev,
        currentStep: step,
        errors: {},
      }));
      return true;
    },
    [state.currentStep, validateCurrentStep]
  );

  /**
   * Move to next step if current step is valid
   */
  const nextStep = useCallback((): boolean => {
    if (state.currentStep >= TOTAL_STEPS) return false;

    const errors = validateCurrentStep();
    if (Object.keys(errors).length > 0) {
      setState((prev) => ({ ...prev, errors }));
      return false;
    }

    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
      completedSteps: new Set([...prev.completedSteps, prev.currentStep]),
      errors: {},
    }));
    return true;
  }, [state.currentStep, validateCurrentStep]);

  /**
   * Move to previous step
   */
  const prevStep = useCallback((): void => {
    if (state.currentStep > 1) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
        errors: {},
      }));
    }
  }, [state.currentStep]);

  /**
   * Skip current step (only allowed on steps 5 & 6)
   */
  const skipStep = useCallback((): void => {
    if (state.currentStep === 5 || state.currentStep === 6) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        skippedSteps: new Set([...prev.skippedSteps, prev.currentStep]),
        errors: {},
      }));
    }
  }, [state.currentStep]);

  /**
   * Update a single field with debounced validation
   */
  const updateField = useCallback(
    (fieldName: keyof CardFormData, value: unknown) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [fieldName]: value,
        },
      }));

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new debounce timer for validation
      debounceTimerRef.current = setTimeout(() => {
        setState((prev) => {
          const validationInput = {
            cardName: prev.formData.cardName,
            provider: prev.formData.provider,
            creditLimitRaw: prev.formData.creditLimit,
            billingDateRaw: prev.formData.billingDate,
            paymentDateRaw: prev.formData.paymentDate,
            number: prev.formData.number,
            holderName: prev.formData.holderName,
            cardType: prev.formData.cardType,
            network: prev.formData.network,
            expiryMonth: prev.formData.expiryMonth,
            expiryYearRaw: prev.formData.expiryYear,
            cvv: prev.formData.cvv,
          };

          const allErrors = validateCardFormFields(validationInput);

          // Keep only errors for current step
          const stepFields = STEP_FIELDS[prev.currentStep];
          const stepErrors: CardFormFieldErrors = {};
          const fieldMap: Record<keyof CardFormData, keyof CardFormFieldErrors> = {
            cardType: 'card_type',
            network: 'network',
            number: 'number',
            expiryMonth: 'expiry_month',
            expiryYear: 'expiry_year',
            cvv: 'cvv',
            provider: 'provider',
            creditLimit: 'credit_limit',
            cardName: 'card_name',
            holderName: 'holder_name',
            colorName: 'card_name',
            billingDate: 'billing_date',
            paymentDate: 'payment_date',
          };

          for (const field of stepFields) {
            const errorKey = fieldMap[field];
            if (errorKey && allErrors[errorKey]) {
              stepErrors[errorKey] = allErrors[errorKey];
            }
          }

          return {
            ...prev,
            isValidating: false,
            errors: stepErrors,
          };
        });
      }, DEBOUNCE_DELAY);

      setState((prev) => ({
        ...prev,
        isValidating: true,
      }));
    },
    []
  );

  /**
   * Update multiple fields at once
   */
  const updateFormData = useCallback((data: Partial<CardFormData>): void => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        ...data,
      },
    }));
  }, []);

  /**
   * Get current form data
   */
  const getFormData = useCallback((): CardFormData => {
    return state.formData;
  }, [state.formData]);

  /**
   * Reset form to default state
   */
  const resetForm = useCallback((): void => {
    setState({
      currentStep: 1,
      formData: DEFAULT_FORM_DATA,
      errors: {},
      isValidating: false,
      isSubmitting: false,
      completedSteps: new Set(),
      skippedSteps: new Set(),
    });
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  /**
   * Get form data for real-time card preview
   */
  const formDataForPreview = useCallback((): CardFormData => {
    return state.formData;
  }, [state.formData]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    state,
    goToStep,
    nextStep,
    prevStep,
    skipStep,
    updateField,
    updateFormData,
    getFormData,
    resetForm,
    validateCurrentStep,
    formDataForPreview,
  };
}

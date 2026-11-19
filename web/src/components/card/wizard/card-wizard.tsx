'use client';

import { useMemo } from 'react';
import { useCardWizard, type CardFormData } from '@/hooks/use-card-wizard';
import { StepContainer } from './step-container';
import { ProgressIndicator } from './progress-indicator';
import { StepNavigator } from './step-navigator';
import { CardPreviewPanel } from './card-preview-panel';
import { Step1Basics } from './step-1-basics';
import { Step2ExpiryAndCvv } from './step-2-expiry-cvv';
import { Step3Provider } from './step-3-provider-limit';
import { Step4Names } from './step-4-names';
import { Step5Design } from './step-5-design';
import { Step6Dates } from './step-6-dates';
import { cn } from '@/lib/utils';

type CardWizardProps = {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: Partial<CardFormData>;
  className?: string;
  showPreview?: boolean;
};

export function CardWizard({
  action,
  initialValues,
  className,
  showPreview = true,
}: CardWizardProps) {
  const wizard = useCardWizard();

  // Build FormData object for submission
  const buildFormData = (): FormData => {
    const formData = new FormData();
    const data = wizard.state.formData;

    formData.append('card_type', data.cardType || '');
    formData.append('network', String(data.network));
    formData.append('number', data.number);
    formData.append('expiry_month', String(data.expiryMonth));
    formData.append('expiry_year', data.expiryYear);
    formData.append('cvv', data.cvv);
    formData.append('provider', data.provider);
    formData.append('credit_limit', data.creditLimit);
    formData.append('card_name', data.cardName);
    formData.append('holder_name', data.holderName);
    formData.append('color_name', data.colorName);
    formData.append('billing_date', data.billingDate);
    formData.append('payment_date', data.paymentDate);

    return formData;
  };

  const handleNext = async () => {
    if (wizard.state.currentStep === 6) {
      // Final submission
      const formData = buildFormData();
      await action(formData);
    } else {
      wizard.nextStep();
    }
  };

  const handlePrev = () => {
    wizard.prevStep();
  };

  const handleSkip = () => {
    wizard.skipStep();
  };

  // Convert preview data format for CardFace component
  const previewCardData = useMemo(() => {
    const data = wizard.formDataForPreview();
    return {
      id: 'preview',
      owner_id: null,
      created_at: null,
      card_name: data.cardName || 'New Card',
      color_name: data.colorName || '',
      number: data.number,
      cvv: data.cvv,
      holder_name: data.holderName || 'CARD HOLDER',
      network: data.network,
      expiry_month: data.expiryMonth,
      expiry_year: data.expiryYear,
      isCredit: data.cardType === 'credit',
      provider: data.provider,
      credit_limit: data.creditLimit,
      billing_date: data.billingDate,
      payment_date: data.paymentDate,
    };
  }, [wizard]);

  const stepTitles: Record<number, { title: string; description: string }> = {
    1: {
      title: 'Card Basics',
      description: 'Tell us about your card type and card number',
    },
    2: {
      title: 'Expiry & Security',
      description: 'Enter your card expiry date and security code',
    },
    3: {
      title: 'Provider & Limit',
      description: 'Specify your card provider and credit limit',
    },
    4: {
      title: 'Card Identity',
      description: 'Name your card and enter cardholder name',
    },
    5: {
      title: 'Design (Optional)',
      description: 'Customize your card appearance or use defaults',
    },
    6: {
      title: 'Billing Dates (Optional)',
      description: 'Set up billing and payment dates if needed',
    },
  };

  const stepConfig = stepTitles[wizard.state.currentStep];
  const isLastStep = wizard.state.currentStep === 6;
  const isOptionalStep = wizard.state.currentStep >= 5;

  return (
    <div className={cn('w-full', className)}>
      {/* Layout Container */}
      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Main Form Section */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={wizard.state.currentStep}
            totalSteps={6}
            skippedSteps={wizard.state.skippedSteps}
          />

          {/* Step Container with Dynamic Content */}
          <StepContainer
            stepNumber={wizard.state.currentStep}
            totalSteps={6}
            title={stepConfig.title}
            description={stepConfig.description}
          >
            {/* Render appropriate step component based on current step */}
            {wizard.state.currentStep === 1 && (
              <Step1Basics
                formData={wizard.state.formData}
                errors={wizard.state.errors}
                onFieldChange={(field, value) => wizard.updateField(field, value)}
              />
            )}
            {wizard.state.currentStep === 2 && (
              <Step2ExpiryAndCvv
                formData={wizard.state.formData}
                network={wizard.state.formData.network}
                errors={wizard.state.errors}
                onFieldChange={(field, value) => wizard.updateField(field, value)}
              />
            )}
            {wizard.state.currentStep === 3 && (
              <Step3Provider
                formData={wizard.state.formData}
                cardType={wizard.state.formData.cardType}
                errors={wizard.state.errors}
                onFieldChange={(field, value) => wizard.updateField(field, value)}
              />
            )}
            {wizard.state.currentStep === 4 && (
              <Step4Names
                formData={wizard.state.formData}
                errors={wizard.state.errors}
                onFieldChange={(field, value) => wizard.updateField(field, value)}
              />
            )}
            {wizard.state.currentStep === 5 && (
              <Step5Design
                formData={wizard.state.formData}
                errors={wizard.state.errors}
                onFieldChange={(field, value) => wizard.updateField(field, value)}
                onSkip={handleSkip}
              />
            )}
            {wizard.state.currentStep === 6 && (
              <Step6Dates
                formData={wizard.state.formData}
                errors={wizard.state.errors}
                onFieldChange={(field, value) => wizard.updateField(field, value)}
                onSkip={handleSkip}
              />
            )}
          </StepContainer>

          {/* Navigation */}
          <StepNavigator
            currentStep={wizard.state.currentStep}
            totalSteps={6}
            onNext={handleNext}
            onPrev={handlePrev}
            onSkip={isOptionalStep ? handleSkip : undefined}
            canNext={Object.keys(wizard.state.errors).length === 0}
            canPrev={true}
            canSkip={isOptionalStep}
            isLoading={wizard.state.isSubmitting}
            nextLabel={isLastStep ? 'Complete Setup' : 'Next Step'}
            prevLabel='Back'
            skipLabel='Skip for Now'
          />
        </div>

        {/* Card Preview Section (Desktop Only) */}
        {showPreview && (
          <div className='hidden lg:block'>
            <div className='sticky top-8'>
              <CardPreviewPanel cardData={previewCardData} isAnimating={false} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Preview (shown above form on small screens) */}
      {showPreview && (
        <div className='mb-8 lg:hidden'>
          <CardPreviewPanel cardData={previewCardData} isAnimating={false} />
        </div>
      )}
    </div>
  );
}

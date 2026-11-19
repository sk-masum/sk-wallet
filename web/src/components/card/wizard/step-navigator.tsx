'use client';

import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type StepNavigatorProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip?: () => void;
  canNext?: boolean;
  canPrev?: boolean;
  canSkip?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  skipLabel?: string;
  className?: string;
  children?: ReactNode;
};

export function StepNavigator({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  canNext = true,
  canPrev = true,
  canSkip = false,
  isLoading = false,
  nextLabel = currentStep === totalSteps ? 'Complete' : 'Next',
  prevLabel = 'Back',
  skipLabel = 'Skip',
  className,
  children,
}: StepNavigatorProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Optional Children (e.g., error messages) */}
      {children && <div>{children}</div>}

      {/* Button Group */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        {/* Previous Button */}
        <Button
          type='button'
          variant='outline'
          onClick={onPrev}
          disabled={isFirstStep || !canPrev || isLoading}
          className='gap-2'
        >
          <ChevronLeft className='h-4 w-4' />
          {prevLabel}
        </Button>

        {/* Skip Button (only on optional steps) */}
        {canSkip && onSkip && (
          <Button
            type='button'
            variant='ghost'
            onClick={onSkip}
            disabled={isLoading}
            className='gap-2'
          >
            <SkipForward className='h-4 w-4' />
            {skipLabel}
          </Button>
        )}

        {/* Next/Complete Button */}
        <Button
          type='button'
          onClick={onNext}
          disabled={!canNext || isLoading}
          className='gap-2'
        >
          {nextLabel}
          {!isLastStep && <ChevronRight className='h-4 w-4' />}
        </Button>
      </div>

      {/* Step Counter */}
      <div className='text-center'>
        <span className='text-sm text-slate-600 dark:text-slate-400'>
          Step <span className='font-semibold'>{currentStep}</span> of{' '}
          <span className='font-semibold'>{totalSteps}</span>
        </span>
      </div>
    </div>
  );
}

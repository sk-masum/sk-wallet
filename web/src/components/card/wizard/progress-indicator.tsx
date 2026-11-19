'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  skippedSteps?: Set<number>;
  className?: string;
};

export function ProgressIndicator({
  currentStep,
  totalSteps,
  skippedSteps,
  className,
}: ProgressIndicatorProps) {
  const progressPercentage = useMemo(() => {
    return (currentStep / totalSteps) * 100;
  }, [currentStep, totalSteps]);

  const steps = useMemo(() => {
    return Array.from({ length: totalSteps }, (_, i) => i + 1);
  }, [totalSteps]);

  return (
    <div className={cn('w-full space-y-3', className)}>
      {/* Progress Bar */}
      <div className='relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700'>
        <div
          className='h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out dark:from-blue-400 dark:to-blue-500'
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className='flex items-center justify-between gap-2'>
        {steps.map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isSkipped = skippedSteps?.has(step) ?? false;

          return (
            <div key={step} className='flex flex-col items-center gap-1'>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                  isCurrent && 'bg-blue-500 text-white ring-2 ring-blue-300 dark:ring-blue-700',
                  isCompleted && 'bg-green-500 text-white',
                  !isCurrent && !isCompleted && 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
                  isSkipped && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                )}
              >
                {isCompleted ? '✓' : step}
              </div>
              {isSkipped && (
                <span className='text-xs font-medium text-amber-600 dark:text-amber-400'>Skip</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Percentage Text */}
      <div className='text-right'>
        <span className='text-xs font-semibold text-slate-600 dark:text-slate-400'>
          {Math.round(progressPercentage)}%
        </span>
      </div>
    </div>
  );
}

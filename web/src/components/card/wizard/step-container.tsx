'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type StepContainerProps = {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function StepContainer({
  stepNumber,
  totalSteps,
  title,
  description,
  children,
  className,
}: StepContainerProps) {
  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Step Header */}
      <div className='space-y-2'>
        <div className='text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
          Step {stepNumber} of {totalSteps}
        </div>
        <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>{title}</h2>
        {description && (
          <p className='text-slate-600 dark:text-slate-400'>{description}</p>
        )}
      </div>

      {/* Step Content */}
      <div className='py-2'>{children}</div>
    </div>
  );
}

import * as React from 'react';

import { cn } from '@/lib/utils';

type FormFieldProps = {
  id: string;
  label: React.ReactNode;
  className?: string;
  labelClassName?: string;
  hint?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
};

function FormField({
  id,
  label,
  className,
  labelClassName,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className={cn('text-[10px] font-medium text-gray-300 uppercase', labelClassName)}
      >
        {label}
      </label>
      {children}
      {hint ? <p className='text-xs text-text-subtle'>{hint}</p> : null}
      {error ? <p className='text-xs text-destructive'>{error}</p> : null}
    </div>
  );
}

export { FormField };

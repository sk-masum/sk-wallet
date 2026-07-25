'use client';

import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, ResponsiveDialogContent } from '@/components/ui/dialog';

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  processingLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  onConfirm: () => void;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Delete',
  processingLabel = 'Deleting...',
  cancelLabel = 'Cancel',
  isProcessing = false,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className='max-w-sm' showCloseButton={false}>
        <div className='space-y-3'>
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-destructive/25 bg-destructive/10 text-destructive'>
            <AlertTriangle className='h-5 w-5' />
          </div>

          <div className='space-y-1'>
            <h3 className='text-lg font-semibold'>{title}</h3>
            <p className='text-sm text-text-subtle'>{description}</p>
          </div>

          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              {cancelLabel}
            </Button>
            <Button type='button' variant='destructive' onClick={onConfirm} disabled={isProcessing}>
              {isProcessing ? processingLabel : confirmLabel}
            </Button>
          </div>
        </div>
      </ResponsiveDialogContent>
    </Dialog>
  );
}

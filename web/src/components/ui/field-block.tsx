import { CopyButton } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';

type FieldBlockProps = {
  label: string;
  value: string;
  preserveWhitespace?: boolean;
};

export function FieldBlock({ label, value, preserveWhitespace = false }: FieldBlockProps) {
  return (
    <div>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-xs text-muted-foreground dark:text-foreground/78'>{label}</p>
        <CopyButton
          value={value}
          label={label}
          className='inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent'
          showStatusIcon
          copyIconClassName='h-3.5 w-3.5'
          checkIconClassName='h-3.5 w-3.5 text-green-600'
        />
      </div>
      <p className={cn(preserveWhitespace && 'whitespace-pre-wrap')}>{value}</p>
    </div>
  );
}

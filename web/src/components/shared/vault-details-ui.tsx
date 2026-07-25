import type { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SURFACE_REVEAL_CLASS } from '@/constants/ui/animation';
import { cn } from '@/lib/utils';
import { CopyButton } from '../ui/copy-button';

type VaultDetailsCardProps = {
    title: ReactNode;
    subtitle?: ReactNode;
    className?: string;
    contentClassName?: string;
    children: ReactNode;
};

export function VaultDetailsCard({
    title,
    subtitle,
    className,
    contentClassName,
    children,
}: VaultDetailsCardProps) {
    return (
        <Card
            className={cn(
                'bg-[linear-gradient(to_bottom,hsl(var(--card)/0.5),hsl(var(--surface-elevated)/0.94))] backdrop-blur-xl mx-auto w-full max-w-120 border-border/70 shadow-lg',
                SURFACE_REVEAL_CLASS,
                className,
            )}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
            </CardHeader>
            <CardContent className={cn('space-y-3 text-sm px-3 sm:px-4 sm:pt-4', contentClassName)}>{children}</CardContent>
        </Card>
    );
}

type VaultDetailsBlockProps = {
    label: string;
    value?: string;
    children?: ReactNode;
    trailing?: ReactNode;
    hasCopy?: boolean;
    className?: string;
    preserveWhitespace?: boolean;
};

export function VaultDetailsBlock({
    label,
    value,
    children,
    hasCopy = true,
    trailing,
    className,
    preserveWhitespace = false,
}: VaultDetailsBlockProps) {
    return (
        <div className={cn('rounded-xl border border-border/65 bg-background/70 p-3', className)}>
            <div className='flex items-center justify-between gap-2'>
                <p className='text-xs text-text-subtle'>{label}</p>
                {hasCopy && value ? (
                    <CopyButton
                        value={value}
                        label={label}
                        className='inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent'
                        showStatusIcon
                        copyIconClassName='h-3.5 w-3.5'
                        checkIconClassName='h-3.5 w-3.5 text-green-600'
                    />
                ) : (
                    <div className='shrink-0'>{trailing}</div>
                )}
            </div>
            <div className='mt-1'>
                {children ? (
                    children
                ) : (
                    <p
                        className={cn(
                            'font-medium text-foreground',
                            preserveWhitespace && 'whitespace-pre-wrap',
                        )}
                    >
                        {value}
                    </p>
                )}
            </div>
        </div>
    );
}

export type VaultDetailsFieldDescriptor = {
    key: string;
    label: string;
    value?: string;
    children?: ReactNode;
    trailing?: ReactNode;
    hasCopy?: boolean;
    className?: string;
    preserveWhitespace?: boolean;
    hidden?: boolean;
};

type VaultDetailsFieldListProps = {
    fields: VaultDetailsFieldDescriptor[];
};

export function VaultDetailsFieldList({ fields }: VaultDetailsFieldListProps) {
    return (
        <>
            {fields
                .filter((field) => !field.hidden)
                .map((field) => (
                    <VaultDetailsBlock
                        key={field.key}
                        label={field.label}
                        value={field.value}
                        trailing={field.trailing}
                        hasCopy={field.hasCopy}
                        className={field.className}
                        preserveWhitespace={field.preserveWhitespace}
                    >
                        {field.children}
                    </VaultDetailsBlock>
                ))}
        </>
    );
}

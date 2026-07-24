import type { ReactNode } from 'react'
import { Check, Copy, LoaderCircle } from 'lucide-react'

import { VaultDetailsBlock, VaultDetailsCard, VaultDetailsGrid } from '@/components/shared/vault-details-ui'
import { CopyButton } from '@/components/ui/copy-button'
import { getCredentialTypeConfig } from '@/constants/credential/types'
import { cn } from '@/lib/utils'
import type { UserCredential } from '@/models/credential'

type CredentialDetailsCardProps = {
    credential: UserCredential
    title?: string
    primaryAction?: ReactNode
    showActions?: boolean
    actions?: ReactNode
    actionsClassName?: string
    className?: string
    onCopyActualSecret?: () => void
    isCopyingSecret?: boolean
    secretCopied?: boolean
}

function formatDateTime(value: string | null | undefined) {
    if (!value) return 'N/A'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'N/A'
    return parsed.toLocaleString()
}

export function CredentialDetailsCard({
    credential,
    title,
    primaryAction,
    showActions = false,
    actions,
    actionsClassName,
    className,
    onCopyActualSecret,
    isCopyingSecret = false,
    secretCopied = false,
}: CredentialDetailsCardProps) {
    const resolvedTitle = title || 'Credential details'
    const typeLabel = getCredentialTypeConfig(credential.credential_type)?.label ?? credential.credential_type

    return (
        <VaultDetailsCard title={resolvedTitle} subtitle={typeLabel} className={className}>
            <VaultDetailsBlock label="Service">
                <p className="font-medium text-foreground">{credential.service_name}</p>
            </VaultDetailsBlock>

            <VaultDetailsGrid>
                <VaultDetailsBlock
                    label="Identifier"
                    trailing={
                        credential.identifier ? (
                            <CopyButton
                                value={credential.identifier}
                                label="Identifier"
                                className="inline-flex h-7 items-center rounded-md border border-border/65 px-2 text-xs"
                                showStatusIcon
                            />
                        ) : undefined
                    }
                >
                    <p className="truncate font-medium text-foreground">{credential.identifier || 'N/A'}</p>
                </VaultDetailsBlock>

                <VaultDetailsBlock
                    label="Secret"
                    trailing={
                        onCopyActualSecret ? (
                            <button
                                type="button"
                                onClick={onCopyActualSecret}
                                disabled={isCopyingSecret}
                                className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                                aria-label="Copy password"
                            >
                                {isCopyingSecret ? (
                                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                                ) : secretCopied ? (
                                    <Check className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                            </button>
                        ) : undefined
                    }
                >
                    <p className="font-mono text-foreground">{credential.masked_secret}</p>
                </VaultDetailsBlock>
            </VaultDetailsGrid>

            <VaultDetailsGrid>
                <VaultDetailsBlock label="Website">
                    {credential.url ? (
                        <a className="block truncate font-medium text-primary hover:underline" href={credential.url} target="_blank" rel="noreferrer">
                            {credential.url}
                        </a>
                    ) : (
                        <p className="truncate font-medium text-foreground">N/A</p>
                    )}
                </VaultDetailsBlock>

                <VaultDetailsBlock label="Updated">
                    <p className="font-medium text-foreground">{formatDateTime(credential.updated_at)}</p>
                </VaultDetailsBlock>
            </VaultDetailsGrid>

            {credential.notes ? (
                <VaultDetailsBlock label="Notes">
                    <p className="whitespace-pre-wrap text-foreground">{credential.notes}</p>
                </VaultDetailsBlock>
            ) : null}

            {primaryAction ? <div className="flex justify-end pt-1">{primaryAction}</div> : null}

            {showActions && actions ? <div className={cn('pt-2', actionsClassName)}>{actions}</div> : null}
        </VaultDetailsCard>
    )
}

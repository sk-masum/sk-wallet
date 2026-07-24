import type { ReactNode } from 'react'
import { Check, Copy, LoaderCircle } from 'lucide-react'

import { VaultDetailsCard, VaultDetailsFieldList, type VaultDetailsFieldDescriptor } from '@/components/shared/vault-details-ui'
import { getCredentialTypeConfig } from '@/constants/credential/types'
import type { UserCredential } from '@/models/credential'

type CredentialDetailsCardProps = {
    credential: UserCredential
    title?: string
    showActions?: boolean
    actions?: ReactNode
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
    showActions = false,
    actions,
    className,
    onCopyActualSecret,
    isCopyingSecret = false,
    secretCopied = false,
}: CredentialDetailsCardProps) {
    const resolvedTitle = title || 'Credential details'
    const typeLabel = getCredentialTypeConfig(credential.credential_type)?.label ?? credential.credential_type
    const fields: VaultDetailsFieldDescriptor[] = [
        {
            key: 'identifier',
            label: 'Identifier',
            value: credential.identifier || 'N/A',
            hidden: !credential.identifier,
        },
        {
            key: 'secret',
            label: 'Secret',
            value: credential.masked_secret,
            hasCopy: false,
            trailing: onCopyActualSecret ? (
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
            ) : undefined,
        },
        {
            key: 'website',
            label: 'Website',
            hidden: !credential.url,
            children: credential.url ? (
                <a className="block truncate font-medium text-primary hover:underline" href={credential.url} target="_blank" rel="noreferrer">
                    {credential.url}
                </a>
            ) : undefined,
        },
        {
            key: 'updated',
            label: 'Updated',
            value: formatDateTime(credential.updated_at),
        },
        {
            key: 'notes',
            label: 'Notes',
            value: credential.notes ?? undefined,
            preserveWhitespace: true,
            hidden: !credential.notes,
        },
    ]

    return (
        <VaultDetailsCard title={resolvedTitle} subtitle={typeLabel} className={className}>
            <VaultDetailsFieldList fields={fields} />

            {showActions && actions ? <div className="pt-2 grid gap-2 grid-cols-3">{actions}</div> : null}
        </VaultDetailsCard>
    )
}

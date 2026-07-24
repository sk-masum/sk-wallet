import type { ReactNode } from 'react'

import { VaultDetailsBlock, VaultDetailsCard, VaultDetailsGrid } from '@/components/shared/vault-details-ui'
import { CopyButton } from '@/components/ui/copy-button'
import { getDocumentCategoryLabel } from '@/constants/document/categories'
import { cn } from '@/lib/utils'
import type { UserDocument } from '@/models/document'
import { getDocumentDisplayTypeLabel } from '@/utils/document/label'

type DocumentDetails = UserDocument & {
    document_number?: string
}

type DocumentDetailsCardProps = {
    document: DocumentDetails
    showActions?: boolean
    actions?: ReactNode
    actionsClassName?: string
    className?: string
}

const RESERVED_METADATA_KEYS = new Set([
    'issued_date',
    'expiry_date',
    'address',
    'guardian_name',
    'other_details',
    'other_type_label',
    'custom_fields',
])

function formatDateTime(value: string | null | undefined) {
    if (!value) return 'N/A'

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'N/A'

    return parsed.toLocaleString()
}

function getMetadataText(metadata: Record<string, unknown> | null | undefined, key: string) {
    if (!metadata) return ''
    const value = metadata[key]
    if (typeof value !== 'string') return ''
    return value.trim()
}

function getCustomMetadataEntries(metadata: Record<string, unknown> | null | undefined) {
    if (!metadata) return []

    return Object.entries(metadata)
        .filter(([key, value]) => {
            if (RESERVED_METADATA_KEYS.has(key)) return false
            return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        })
        .map(([key, value]) => ({
            key,
            label: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
            value: String(value).trim(),
        }))
        .filter((item) => item.value.length > 0)
}

function getCategoryBadgeClass(category: string) {
    if (category === 'personal') return 'bg-sky-500/15 text-sky-600 border-sky-500/30'
    if (category === 'professional') return 'bg-blue-500/15 text-blue-600 border-blue-500/30'
    if (category === 'education') return 'bg-violet-500/15 text-violet-600 border-violet-500/30'
    if (category === 'health') return 'bg-rose-500/15 text-rose-600 border-rose-500/30'
    if (category === 'financial') return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
    if (category === 'legal') return 'bg-amber-500/15 text-amber-600 border-amber-500/30'
    if (category === 'family') return 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30'
    if (category === 'vehicle') return 'bg-red-500/15 text-red-600 border-red-500/30'
    if (category === 'travel') return 'bg-purple-500/15 text-purple-600 border-purple-500/30'

    return 'bg-muted text-muted-foreground border-border'
}

type FieldBlockProps = {
    label: string
    value: string
    preserveWhitespace?: boolean
}

function FieldBlock({ label, value, preserveWhitespace = false }: FieldBlockProps) {
    return (
        <VaultDetailsBlock
            label={label}
            trailing={
                <CopyButton
                    value={value}
                    label={label}
                    className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                    showStatusIcon
                    copyIconClassName="h-3.5 w-3.5"
                    checkIconClassName="h-3.5 w-3.5 text-green-600"
                />
            }
        >
            <p className={cn(preserveWhitespace && 'whitespace-pre-wrap')}>{value}</p>
        </VaultDetailsBlock>
    )
}

export function DocumentDetailsCard({
    document,
    showActions = false,
    actions,
    actionsClassName,
    className,
}: DocumentDetailsCardProps) {
    const customMetadata = getCustomMetadataEntries(document.metadata)
    const title = getDocumentDisplayTypeLabel(document.document_type, document.metadata)
    const documentNumber = document.document_number || document.masked_number
    const category = String(document.category ?? 'other')

    return (
        <VaultDetailsCard title={title} subtitle={`Updated ${formatDateTime(document.updated_at)}`} className={className}>
            <VaultDetailsBlock
                label="Category"
                trailing={
                    <CopyButton
                        value={getDocumentCategoryLabel(category)}
                        label="Category"
                        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                        showStatusIcon
                        copyIconClassName="h-3.5 w-3.5"
                        checkIconClassName="h-3.5 w-3.5 text-green-600"
                    />
                }
            >
                <span
                    className={cn(
                        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
                        getCategoryBadgeClass(category)
                    )}
                >
                    {getDocumentCategoryLabel(category)}
                </span>
            </VaultDetailsBlock>

            <VaultDetailsGrid>
                <FieldBlock label="Document number" value={documentNumber} />
                <FieldBlock label="Name on document" value={document.name_on_document || 'N/A'} />
            </VaultDetailsGrid>

            <VaultDetailsGrid>
                {getMetadataText(document.metadata, 'issued_date') ? (
                    <FieldBlock label="Issued date" value={getMetadataText(document.metadata, 'issued_date')} />
                ) : null}

                {getMetadataText(document.metadata, 'expiry_date') ? (
                    <FieldBlock label="Expiry date" value={getMetadataText(document.metadata, 'expiry_date')} />
                ) : null}
            </VaultDetailsGrid>

            <VaultDetailsGrid>
                {getMetadataText(document.metadata, 'guardian_name') ? (
                    <FieldBlock label="Guardian name" value={getMetadataText(document.metadata, 'guardian_name')} />
                ) : null}

                {getMetadataText(document.metadata, 'address') ? (
                    <FieldBlock label="Address" value={getMetadataText(document.metadata, 'address')} />
                ) : null}
            </VaultDetailsGrid>

            {getMetadataText(document.metadata, 'other_details') ? (
                <FieldBlock
                    label="Other details"
                    value={getMetadataText(document.metadata, 'other_details')}
                    preserveWhitespace
                />
            ) : null}

            <VaultDetailsGrid>
                {document.verified_at ? (
                    <FieldBlock label="Verified at" value={formatDateTime(document.verified_at)} />
                ) : null}

                {document.expires_at ? (
                    <FieldBlock label="Expires at" value={formatDateTime(document.expires_at)} />
                ) : null}
            </VaultDetailsGrid>

            {customMetadata.length > 0 ? (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground dark:text-foreground/78">Custom fields</p>
                    <div className="space-y-2">
                        {customMetadata.map((item) => (
                            <FieldBlock key={item.key} label={item.label} value={item.value} preserveWhitespace />
                        ))}
                    </div>
                </div>
            ) : null}

            {showActions && actions ? (
                <div className={cn('pt-2', actionsClassName)}>{actions}</div>
            ) : null}
        </VaultDetailsCard>
    )
}

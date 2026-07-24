import type { ReactNode } from 'react'
import { getDocumentCategoryLabel } from '@/constants/document/categories'
import { cn } from '@/lib/utils'
import type { UserDocument } from '@/models/document'
import { getDocumentDisplayTypeLabel } from '@/utils/document/label'
import { VaultDetailsCard, VaultDetailsFieldList, type VaultDetailsFieldDescriptor } from '../shared/vault-details-ui'

type DocumentDetails = UserDocument & {
    document_number?: string
}

type DocumentDetailsCardProps = {
    document: DocumentDetails
    showActions?: boolean
    actions?: ReactNode
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


export function DocumentDetailsCard({
    document,
    showActions = false,
    actions,
    className,
}: DocumentDetailsCardProps) {
    const customMetadata = getCustomMetadataEntries(document.metadata)
    const title = getDocumentDisplayTypeLabel(document.document_type, document.metadata)
    const documentNumber = document.document_number || document.masked_number
    const category = String(document.category ?? 'other')
    const fields: VaultDetailsFieldDescriptor[] = [
        {
            key: 'category',
            label: 'Category',
            children: (
                <span
                    className={cn(
                        'mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
                        getCategoryBadgeClass(category)
                    )}
                >
                    {getDocumentCategoryLabel(category)}
                </span>
            ),
        },
        {
            key: 'document-number',
            label: 'Document number',
            value: documentNumber,
        },
        {
            key: 'name-on-document',
            label: 'Name on document',
            value: document.name_on_document || 'N/A',
        },
        {
            key: 'issued-date',
            label: 'Issued date',
            value: getMetadataText(document.metadata, 'issued_date'),
            hidden: !getMetadataText(document.metadata, 'issued_date'),
        },
        {
            key: 'expiry-date',
            label: 'Expiry date',
            value: getMetadataText(document.metadata, 'expiry_date'),
            hidden: !getMetadataText(document.metadata, 'expiry_date'),
        },
        {
            key: 'guardian-name',
            label: 'Guardian name',
            value: getMetadataText(document.metadata, 'guardian_name'),
            hidden: !getMetadataText(document.metadata, 'guardian_name'),
        },
        {
            key: 'address',
            label: 'Address',
            value: getMetadataText(document.metadata, 'address'),
            hidden: !getMetadataText(document.metadata, 'address'),
        },
        {
            key: 'other-details',
            label: 'Other details',
            value: getMetadataText(document.metadata, 'other_details'),
            preserveWhitespace: true,
            hidden: !getMetadataText(document.metadata, 'other_details'),
        },
        {
            key: 'verified-at',
            label: 'Verified at',
            value: document.verified_at ? formatDateTime(document.verified_at) : '',
            hidden: !document.verified_at,
        },
        {
            key: 'expires-at',
            label: 'Expires at',
            value: document.expires_at ? formatDateTime(document.expires_at) : '',
            hidden: !document.expires_at,
        },
    ]
    const customMetadataFields: VaultDetailsFieldDescriptor[] = customMetadata.map((item) => ({
        key: item.key,
        label: item.label,
        value: item.value,
        preserveWhitespace: true,
    }))

    return (
        <VaultDetailsCard
            title={title}
            subtitle={`Updated ${formatDateTime(document.updated_at)}`}
            className={className}
        >
            <VaultDetailsFieldList fields={fields} />

            {customMetadata.length > 0 ? (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground dark:text-foreground/78">Custom fields</p>
                    <VaultDetailsFieldList fields={customMetadataFields} />
                </div>
            ) : null}

            {showActions && actions ? (
                <div className='pt-2 grid gap-2 grid-cols-3'>{actions}</div>
            ) : null}
        </VaultDetailsCard>
    )
}

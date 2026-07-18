'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'

import NoDocIcon from '@/components/icons/nodoc-icon'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { CREDENTIAL_TYPE_OPTIONS, getCredentialTypeConfig } from '@/constants/credential/types'
import { clientApiDelete } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { UserCredential } from '@/models/credential'

type CredentialVaultProps = {
    initialCredentials: UserCredential[]
    initialError?: string
}

function formatDateTime(value: string | null | undefined) {
    if (!value) return 'N/A'

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'N/A'

    return parsed.toLocaleString()
}

export function CredentialVault({ initialCredentials, initialError = '' }: CredentialVaultProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [credentials, setCredentials] = useState<UserCredential[]>(initialCredentials)
    const [selectedCredentialId, setSelectedCredentialId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const searchValue = (searchParams.get('q') ?? '').trim()
    const selectedTypeParam = (searchParams.get('type') ?? 'ALL').trim().toUpperCase()
    const selectedType = CREDENTIAL_TYPE_OPTIONS.some((item) => item.code === selectedTypeParam)
        ? selectedTypeParam
        : 'ALL'

    useEffect(() => {
        setCredentials(initialCredentials)
    }, [initialCredentials])

    useEffect(() => {
        if (initialError) {
            showToast({ message: initialError, variant: 'error' })
            return
        }

        const success = searchParams.get('success')
        if (success) {
            showToast({ message: success, variant: 'success' })
            router.replace('/credential')
        }
    }, [initialError, searchParams, router])

    const sortedCredentials = useMemo(
        () => [...credentials].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()),
        [credentials]
    )

    const filteredCredentials = useMemo(() => {
        const query = searchValue.trim().toLowerCase()

        return sortedCredentials.filter((cred) => {
            if (selectedType !== 'ALL' && cred.credential_type !== selectedType) {
                return false
            }

            if (!query) return true

            const typeLabel = getCredentialTypeConfig(cred.credential_type)?.label ?? cred.credential_type
            const searchable = [
                typeLabel,
                cred.credential_type,
                cred.service_name,
                cred.identifier ?? '',
                cred.masked_secret,
            ]
                .join(' ')
                .toLowerCase()

            return searchable.includes(query)
        })
    }, [searchValue, selectedType, sortedCredentials])

    const selectedCredential = useMemo(
        () => filteredCredentials.find((cred) => cred.id === selectedCredentialId) ?? null,
        [filteredCredentials, selectedCredentialId]
    )

    const hasFilters = searchValue.length > 0 || selectedType !== 'ALL'

    function getCredentialTypeBadgeClass(type: string) {
        if (type === 'LOGIN') return 'bg-blue-500/15 text-blue-600 border-blue-500/30'
        if (type === 'BANKING') return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
        if (type === 'PIN') return 'bg-amber-500/15 text-amber-600 border-amber-500/30'
        if (type === 'API_KEY') return 'bg-violet-500/15 text-violet-600 border-violet-500/30'
        if (type === 'WIFI') return 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30'
        return 'bg-muted text-muted-foreground border-border'
    }

    const handleDelete = async () => {
        if (!selectedCredential || isDeleting) return

        const shouldDelete = window.confirm('Delete this credential? This action cannot be undone.')
        if (!shouldDelete) return

        setIsDeleting(true)
        try {
            const { response, data } = await clientApiDelete<{ success?: boolean; error?: string }>(
                `/api/credential/${selectedCredential.id}`
            )

            if (!response.ok) {
                showToast({ message: data?.error || 'Failed to delete credential.', variant: 'error' })
                return
            }

            showToast({ message: 'Credential deleted successfully.', variant: 'success' })
            setSelectedCredentialId(null)
            router.refresh()
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <section className="mx-auto w-full max-w-5xl space-y-4">
            {filteredCredentials.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {sortedCredentials.length === 0 ? 'No credentials yet' : 'No matching credentials'}
                        </CardTitle>
                        <CardDescription>
                            {sortedCredentials.length === 0
                                ? 'Add login, API, PIN, Wi-Fi, and other credentials from the add credential page.'
                                : 'Try changing your search or type filter, or add a new credential.'}
                        </CardDescription>
                    </CardHeader>
                    {sortedCredentials.length > 0 ? (
                        <CardContent className="flex justify-center pb-6 pt-0">
                            <NoDocIcon className="h-28 w-full max-w-65" />
                        </CardContent>
                    ) : null}
                </Card>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCredentials.map((cred, index) => {
                        const label = getCredentialTypeConfig(cred.credential_type)?.label ?? cred.credential_type

                        return (
                            <button
                                key={cred.id}
                                type="button"
                                className={cn(
                                    'text-left transition-transform duration-300 ease-out hover:-translate-y-0.5',
                                    'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500'
                                )}
                                style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}
                                onClick={() => setSelectedCredentialId(cred.id)}
                            >
                                <Card className="group transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="line-clamp-1 text-base">{cred.service_name}</CardTitle>
                                        <CardDescription className="line-clamp-1">{cred.identifier || label}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2 pt-0">
                                        <p className="font-mono text-sm">{cred.masked_secret}</p>
                                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                                            <span className="truncate">{cred.url || 'No website'}</span>
                                            <span
                                                className={cn(
                                                    'inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                                                    getCredentialTypeBadgeClass(cred.credential_type)
                                                )}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </button>
                        )
                    })}
                </div>
            )}

            <Dialog open={Boolean(selectedCredential)} onOpenChange={(open) => !open && setSelectedCredentialId(null)}>
                {selectedCredential ? (
                    <DetailDialogContent>
                        <div className="space-y-3 rounded-xl border border-border bg-background p-4 text-sm shadow-xl backdrop-blur-md">
                            <DialogHeader>
                                <DialogTitle>{selectedCredential.service_name}</DialogTitle>
                                <DialogDescription>Updated {formatDateTime(selectedCredential.updated_at)}</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-xs text-muted-foreground">Credential type</p>
                                    <p>{getCredentialTypeConfig(selectedCredential.credential_type)?.label ?? selectedCredential.credential_type}</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-muted-foreground">Identifier</p>
                                        <CopyButton
                                            value={selectedCredential.identifier || ''}
                                            label="Identifier"
                                            className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                                            showStatusIcon
                                            copyIconClassName="h-3.5 w-3.5"
                                            checkIconClassName="h-3.5 w-3.5 text-green-600"
                                        />
                                    </div>
                                    <p>{selectedCredential.identifier || 'N/A'}</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-muted-foreground">Masked secret</p>
                                        <CopyButton
                                            value={selectedCredential.masked_secret}
                                            label="Masked secret"
                                            className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                                            showStatusIcon
                                            copyIconClassName="h-3.5 w-3.5"
                                            checkIconClassName="h-3.5 w-3.5 text-green-600"
                                        />
                                    </div>
                                    <p className="font-mono">{selectedCredential.masked_secret}</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-muted-foreground">Website</p>
                                        <CopyButton
                                            value={selectedCredential.url || ''}
                                            label="Website"
                                            className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                                            showStatusIcon
                                            copyIconClassName="h-3.5 w-3.5"
                                            checkIconClassName="h-3.5 w-3.5 text-green-600"
                                        />
                                    </div>
                                    {selectedCredential.url ? (
                                        <a
                                            className="text-primary hover:underline"
                                            href={selectedCredential.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {selectedCredential.url}
                                        </a>
                                    ) : (
                                        <p>N/A</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-muted-foreground">Notes</p>
                                        <CopyButton
                                            value={selectedCredential.notes || ''}
                                            label="Notes"
                                            className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                                            showStatusIcon
                                            copyIconClassName="h-3.5 w-3.5"
                                            checkIconClassName="h-3.5 w-3.5 text-green-600"
                                        />
                                    </div>
                                    <p className="whitespace-pre-wrap">{selectedCredential.notes || 'N/A'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedCredentialId(null)
                                            router.push(`/credential/${selectedCredential.id}`)
                                        }}
                                    >
                                        <Pencil className="mr-1 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="mr-1 h-4 w-4" />
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DetailDialogContent>
                ) : null}
            </Dialog>
        </section>
    )
}

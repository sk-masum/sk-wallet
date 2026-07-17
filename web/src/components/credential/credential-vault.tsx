'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import NoDocIcon from '@/components/icons/nodoc-icon'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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
    const [searchValue, setSearchValue] = useState('')
    const [selectedType, setSelectedType] = useState('ALL')
    const [selectedCredentialId, setSelectedCredentialId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

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
        <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search by service, identifier, or type"
                    className="sm:flex-1"
                    aria-label="Search credentials"
                />

                <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:ml-auto sm:w-56" aria-label="Filter by credential type">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All types</SelectItem>
                        {CREDENTIAL_TYPE_OPTIONS.map((item) => (
                            <SelectItem key={item.code} value={item.code}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

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
                <div className="grid gap-3 sm:grid-cols-2">
                    {filteredCredentials.map((cred) => {
                        const label = getCredentialTypeConfig(cred.credential_type)?.label ?? cred.credential_type

                        return (
                            <button
                                key={cred.id}
                                type="button"
                                className="text-left"
                                onClick={() => setSelectedCredentialId(cred.id)}
                            >
                                <Card className="transition-colors hover:border-primary/50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">{cred.service_name}</CardTitle>
                                        <CardDescription className="line-clamp-1">{cred.identifier || label}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="font-mono text-sm">{cred.masked_secret}</p>
                                    </CardContent>
                                </Card>
                            </button>
                        )
                    })}
                </div>
            )}

            <Dialog open={Boolean(selectedCredential)} onOpenChange={(open) => !open && setSelectedCredentialId(null)}>
                {selectedCredential ? (
                    <DialogContent className="max-sm:top-auto max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:border-x-0 max-sm:pb-6 max-sm:max-h-[85svh] max-sm:overflow-y-auto sm:max-h-[85vh]">
                        <div className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-muted sm:hidden" />
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

                            <div className="flex justify-end gap-2 pt-2">
                                <Link
                                    href={`/credential/${selectedCredential.id}`}
                                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                    onClick={() => setSelectedCredentialId(null)}
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className={cn(buttonVariants({ variant: 'destructive', size: 'sm' }))}
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                ) : null}
            </Dialog>
        </section>
    )
}

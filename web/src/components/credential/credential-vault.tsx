'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Copy, LoaderCircle, Pencil, Star, Trash2 } from 'lucide-react'

import NoDocIcon from '@/components/icons/nodoc-icon'
import { useDashboardFavorites } from '@/components/dashboard/use-dashboard-favorites'
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCredentialTypeConfig } from '@/constants/credential/types'
import { clientApiDelete, clientApiGet } from '@/lib/api/client'
import {
    BIOMETRIC_CREDENTIAL_STORAGE_KEY,
    isBiometricVaultUnlocked,
    isWebAuthnSupported,
    unlockBiometricVault,
} from '@/lib/biometric'
import {
    selectVisibleCredentials,
    useCredentialVaultStore,
} from '@/lib/stores/credential-vault-store'
import { showToast } from '@/lib/toast'
import { copyToClipboard } from '@/utils/copy'
import { cn } from '@/lib/utils'
import type { UserCredential } from '@/models/credential'

type CredentialVaultProps = {
    initialCredentials: UserCredential[]
    initialError?: string
}

type CredentialSecretResponse = {
    data?: {
        id: string
        secret: string
    }
    error?: string
}

function formatDateTime(value: string | null | undefined) {
    if (!value) return 'N/A'

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'N/A'

    return parsed.toLocaleString()
}

export function CredentialVault({ initialCredentials, initialError = '' }: CredentialVaultProps) {
    const router = useRouter()
    const { hydrated, isFavorite, toggleFavorite } = useDashboardFavorites()
    const searchParams = useSearchParams()
    const [selectedCredentialId, setSelectedCredentialId] = useState<string | null>(null)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isCopyingSecret, setIsCopyingSecret] = useState(false)
    const [secretCopied, setSecretCopied] = useState(false)
    const secretCopyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const credentials = useCredentialVaultStore((state) => state.credentials)
    const visibleCredentials = useCredentialVaultStore(selectVisibleCredentials)
    const groupBy = useCredentialVaultStore((state) => state.groupBy)
    const setCredentials = useCredentialVaultStore((state) => state.setCredentials)
    const removeCredential = useCredentialVaultStore((state) => state.removeCredential)

    useEffect(() => {
        setCredentials(initialCredentials)
    }, [initialCredentials, setCredentials])

    useEffect(() => {
        return () => {
            if (secretCopyTimeoutRef.current) {
                clearTimeout(secretCopyTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        setConfirmDeleteOpen(false)
    }, [selectedCredentialId])

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

    const selectedCredential = useMemo(
        () => credentials.find((cred) => cred.id === selectedCredentialId) ?? null,
        [credentials, selectedCredentialId]
    )

    const groupedCredentials = useMemo(() => {
        if (groupBy === 'none') return []

        const groups = new Map<string, UserCredential[]>()

        for (const credential of visibleCredentials) {
            const key =
                groupBy === 'type'
                    ? (getCredentialTypeConfig(credential.credential_type)?.label ?? credential.credential_type)
                    : (credential.service_name || 'Unknown service')

            const current = groups.get(key) ?? []
            current.push(credential)
            groups.set(key, current)
        }

        return Array.from(groups.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([label, items]) => ({ label, items }))
    }, [visibleCredentials, groupBy])

    const renderCredentialCard = (cred: UserCredential, index: number) => {
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
                    <CardHeader>
                        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                            <CardTitle className="line-clamp-1 text-base">{cred.service_name}</CardTitle>
                            <span
                                className={cn(
                                    'inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                                    getCredentialTypeBadgeClass(cred.credential_type)
                                )}
                            >
                                {label}
                            </span>
                        </div>

                        <CardDescription className="line-clamp-1">{cred.identifier || label}</CardDescription>
                    </CardHeader>
                </Card>
            </button>
        )
    }

    function getCredentialTypeBadgeClass(type: string) {
        if (type === 'LOGIN') return 'bg-blue-500/15 text-blue-600 border-blue-500/30'
        if (type === 'EMAIL') return 'bg-sky-500/15 text-sky-600 border-sky-500/30'
        if (type === 'SOCIAL') return 'bg-fuchsia-500/15 text-fuchsia-600 border-fuchsia-500/30'
        if (type === 'BANKING') return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
        if (type === 'PIN') return 'bg-amber-500/15 text-amber-600 border-amber-500/30'
        if (type === 'OTP') return 'bg-orange-500/15 text-orange-600 border-orange-500/30'
        if (type === 'WALLET') return 'bg-lime-500/15 text-lime-600 border-lime-500/30'
        if (type === 'API_KEY') return 'bg-violet-500/15 text-violet-600 border-violet-500/30'
        if (type === 'SERVER') return 'bg-indigo-500/15 text-indigo-600 border-indigo-500/30'
        if (type === 'DATABASE') return 'bg-teal-500/15 text-teal-600 border-teal-500/30'
        if (type === 'WIFI') return 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30'
        return 'bg-muted text-muted-foreground border-border'
    }

    const handleDelete = async () => {
        if (!selectedCredential || isDeleting) return

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
            setConfirmDeleteOpen(false)
            setSelectedCredentialId(null)
            removeCredential(selectedCredential.id)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleCopyActualSecret = async () => {
        if (!selectedCredential || isCopyingSecret) return

        if (typeof window === 'undefined') {
            return
        }

        if (!isWebAuthnSupported()) {
            showToast({
                message: 'Biometric authentication is not supported on this device.',
                variant: 'error',
            })
            return
        }

        const biometricCredentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY)
        if (!biometricCredentialId) {
            showToast({
                message: 'Set up biometrics in settings first to copy the actual password.',
                variant: 'error',
            })
            return
        }

        setIsCopyingSecret(true)
        try {
            const verified = isBiometricVaultUnlocked() ? true : await unlockBiometricVault()
            if (!verified) {
                showToast({ message: 'Biometric verification failed.', variant: 'error' })
                return
            }

            const { response, data } = await clientApiGet<CredentialSecretResponse>(
                `/api/credential/${selectedCredential.id}/secret`
            )

            if (!response.ok) {
                showToast({ message: data?.error || 'Failed to fetch password.', variant: 'error' })
                return
            }

            const copyResult = await copyToClipboard(data?.data?.secret ?? '')
            if (!copyResult.ok) {
                showToast({ message: 'Failed to copy password.', variant: 'error' })
                return
            }

            showToast({ message: 'Password copied.', variant: 'success' })
            setSecretCopied(true)

            if (secretCopyTimeoutRef.current) {
                clearTimeout(secretCopyTimeoutRef.current)
            }
            secretCopyTimeoutRef.current = setTimeout(() => {
                setSecretCopied(false)
            }, 1200)
        } catch {
            showToast({ message: 'Biometric verification failed.', variant: 'error' })
        } finally {
            setIsCopyingSecret(false)
        }
    }

    return (
        <section className="mx-auto w-full max-w-5xl space-y-4">
            {visibleCredentials.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {credentials.length === 0 ? 'No credentials yet' : 'No matching credentials'}
                        </CardTitle>
                        <CardDescription>
                            {credentials.length === 0
                                ? 'Add login, API, PIN, Wi-Fi, and other credentials from the add credential page.'
                                : 'Try changing your search or type filter, or add a new credential.'}
                        </CardDescription>
                    </CardHeader>
                    {credentials.length > 0 ? (
                        <CardContent className="flex justify-center pb-6 pt-0">
                            <NoDocIcon className="h-28 w-full max-w-65" />
                        </CardContent>
                    ) : null}
                </Card>
            ) : groupBy === 'none' ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleCredentials.map((cred, index) => renderCredentialCard(cred, index))}
                </div>
            ) : (
                <div className="space-y-5">
                    {groupedCredentials.map((group, groupIndex) => (
                        <section key={group.label} className="space-y-2">
                            <h3 className="px-1 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                                {group.label}
                            </h3>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {group.items.map((cred, index) => renderCredentialCard(cred, groupIndex * 20 + index))}
                            </div>
                        </section>
                    ))}
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
                                        <p className="text-xs text-muted-foreground">Password</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                void handleCopyActualSecret()
                                            }}
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

                                <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleFavorite(`credential:${selectedCredential.id}`)}
                                    >
                                        <Star
                                            className={cn(
                                                'mr-1 h-4 w-4',
                                                hydrated && isFavorite(`credential:${selectedCredential.id}`)
                                                    ? 'fill-amber-500 text-amber-500'
                                                    : ''
                                            )}
                                        />
                                        {hydrated && isFavorite(`credential:${selectedCredential.id}`)
                                            ? 'Unfavourite'
                                            : 'Favourite'}
                                    </Button>
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
                                        onClick={() => setConfirmDeleteOpen(true)}
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

            <DeleteConfirmDialog
                open={confirmDeleteOpen}
                onOpenChange={(open) => !isDeleting && setConfirmDeleteOpen(open)}
                title="Delete credential?"
                description="This action cannot be undone."
                confirmLabel="Delete"
                processingLabel="Deleting..."
                isProcessing={isDeleting}
                onConfirm={handleDelete}
            />
        </section>
    )
}

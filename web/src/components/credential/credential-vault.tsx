'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { CredentialDetailsCard } from '@/components/credential/credential-details-card'
import NoDocIcon from '@/components/icons/nodoc-icon'
import { useDashboardFavorites } from '@/hooks/use-dashboard-favorites'
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { withVaultBootstrap } from '@/hoc/with-vault-bootstrap'
import { useDetailsErrorToast } from '@/hooks/use-details-error-toast'
import { useEntityDetailsDialog } from '@/hooks/use-entity-details-dialog'
import { useGroupedItems } from '@/hooks/use-grouped-items'
import { useResetStateOnChange } from '@/hooks/use-reset-state-on-change'
import { useSuccessQueryToast } from '@/hooks/use-success-query-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
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
import { DialogActions } from '../shared/dialog-actions'

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

type CredentialDetailsResponse = {
    data?: UserCredential
    error?: string
}

function CredentialVaultContent({ initialCredentials, initialError = '' }: CredentialVaultProps) {
    const router = useRouter()
    const { hydrated, isFavorite, toggleFavorite } = useDashboardFavorites()
    const searchParams = useSearchParams()
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isCopyingSecret, setIsCopyingSecret] = useState(false)
    const [secretCopied, setSecretCopied] = useState(false)
    const secretCopyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const credentials = useCredentialVaultStore((state) => state.credentials)
    const visibleCredentials = useCredentialVaultStore(selectVisibleCredentials)
    const groupBy = useCredentialVaultStore((state) => state.groupBy)
    const removeCredential = useCredentialVaultStore((state) => state.removeCredential)

    useEffect(() => {
        return () => {
            if (secretCopyTimeoutRef.current) {
                clearTimeout(secretCopyTimeoutRef.current)
            }
        }
    }, [])

    const {
        selectedItem,
        setSelectedItem,
        detailData: selectedCredentialDetail,
        detailsError,
        dialogOpen,
        closeDialog,
    } = useEntityDetailsDialog<'credential', UserCredential>({
        fetchDetails: async (item) => {
            const { response, data } = await clientApiGet<CredentialDetailsResponse>(`/api/credential/${item.id}`)

            if (!response.ok || !data?.data) {
                throw new Error(data?.error || 'Failed to load credential details.')
            }

            return data.data
        },
        getErrorMessage: () => 'Failed to load credential details.',
    })

    useResetStateOnChange(selectedItem?.id, setConfirmDeleteOpen, false)

    useEffect(() => {
        if (!initialError) return
        showToast({ message: initialError, variant: 'error' })
    }, [initialError])

    const successMessage = initialError ? null : searchParams.get('success')
    const handleSuccessConsumed = useCallback(() => {
        router.replace('/credential')
    }, [router])
    useSuccessQueryToast({
        successMessage,
        onConsumed: handleSuccessConsumed,
    })

    const selectedCredential = useMemo(() => {
        if (selectedCredentialDetail) return selectedCredentialDetail
        if (!selectedItem) return null

        return credentials.find((cred) => cred.id === selectedItem.id) ?? null
    }, [credentials, selectedCredentialDetail, selectedItem])

    useDetailsErrorToast(detailsError)

    const getGroupLabel = useCallback(
        (credential: UserCredential) =>
            groupBy === 'type'
                ? (getCredentialTypeConfig(credential.credential_type)?.label ?? credential.credential_type)
                : (credential.service_name || 'Unknown service'),
        [groupBy]
    )
    const groupedCredentials = useGroupedItems(visibleCredentials, getGroupLabel)

    const renderCredentialCard = (cred: UserCredential, index: number) => {
        const label = getCredentialTypeConfig(cred.credential_type)?.label ?? cred.credential_type

        return (
            <button
                key={cred.id}
                type="button"
                className={cn(
                    'vault-list-item-trigger'
                )}
                style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}
                onClick={() => setSelectedItem({ id: cred.id, type: 'credential', href: `/credential/${cred.id}` })}
            >
                <Card className="vault-list-card">
                    <CardHeader>
                        <div className="flex items-center justify-between gap-2 text-xs text-text-subtle">
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
        return 'bg-muted text-text-subtle border-border'
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
            closeDialog()
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
        <section className="vault-listing-shell">
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
                <div className="vault-list-grid">
                    {visibleCredentials.map((cred, index) => renderCredentialCard(cred, index))}
                </div>
            ) : (
                <div className="space-y-5">
                    {groupedCredentials.map((group, groupIndex) => (
                        <section key={group.label} className="space-y-2">
                            <h3 className="px-1 text-xs font-semibold tracking-[0.08em] text-text-subtle uppercase">
                                {group.label}
                            </h3>
                            <div className="vault-list-grid">
                                {group.items.map((cred, index) => renderCredentialCard(cred, groupIndex * 20 + index))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
                {selectedCredential ? (
                    <DetailDialogContent>
                        <CredentialDetailsCard
                            credential={selectedCredential}
                            title={selectedCredential.service_name}
                            onCopyActualSecret={() => {
                                void handleCopyActualSecret()
                            }}
                            isCopyingSecret={isCopyingSecret}
                            secretCopied={secretCopied}
                            showActions
                            actions={(
                                <DialogActions
                                    handleDelete={() => setConfirmDeleteOpen(true)}
                                    handleEdit={() => {
                                        if (!selectedCredential) return
                                        router.push(`/credential/${selectedCredential.id}`)
                                    }}
                                    handleToggleFavorite={() => {
                                        if (!selectedCredential) return
                                        toggleFavorite(`credential:${selectedCredential.id}`)
                                    }}
                                    isSelectedFavorite={hydrated && selectedCredential ? isFavorite(`credential:${selectedCredential.id}`) : false}
                                    isProcessing={isDeleting}
                                />
                            )}
                        />
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

export const CredentialVault = withVaultBootstrap<CredentialVaultProps, UserCredential>(
    CredentialVaultContent,
    {
        useSetItems: () => useCredentialVaultStore((state) => state.setCredentials),
        getItems: (props) => props.initialCredentials,
        getError: (props) => props.initialError,
    }
)

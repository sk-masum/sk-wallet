'use client'

import { useMemo, useState, type FormEvent } from 'react'

import { FormActions } from '@/components/ui/form-actions'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import {
    entityFormActionsDividerClass,
    entityFormControlClass,
    entityFormFieldCardClass,
    entityFormGridClass,
    entityFormLabelClass,
    entityFormSelectClass,
    entityFormTextareaClass,
} from '@/components/shared/entity-form-ui'
import { AppSelectField } from '@/components/shared/app-select-field'
import { Textarea } from '@/components/ui/textarea'
import { CREDENTIAL_TYPE_OPTIONS, getCredentialTypeConfig } from '@/constants/credential/types'
import type { CredentialFormFieldErrors, CredentialFormPayload } from '@/models/credential'
import { cn } from '@/lib/utils'
import { validateCredentialFormFields } from '@/utils/credential/validation'

type CredentialFormValues = {
    type: string
    serviceName: string
    identifier: string
    secret: string
    url: string
    notes: string
}

type CredentialFormProps = {
    submitLabel?: string
    initialValues?: Partial<CredentialFormValues>
    showReset?: boolean
    allowEmptySecret?: boolean
    lockTypeField?: boolean
    onSubmit?: (payload: CredentialFormPayload) => Promise<void> | void
}

export function CredentialForm({
    submitLabel = 'Save credential',
    initialValues,
    showReset = true,
    allowEmptySecret = false,
    lockTypeField = false,
    onSubmit,
}: CredentialFormProps) {
    const [values, setValues] = useState<CredentialFormValues>({
        type: initialValues?.type ?? '',
        serviceName: initialValues?.serviceName ?? '',
        identifier: initialValues?.identifier ?? '',
        secret: initialValues?.secret ?? '',
        url: initialValues?.url ?? '',
        notes: initialValues?.notes ?? '',
    })
    const [fieldErrors, setFieldErrors] = useState<CredentialFormFieldErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const typeConfig = useMemo(() => getCredentialTypeConfig(values.type), [values.type])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const payload: CredentialFormPayload = {
            type: values.type,
            serviceName: values.serviceName,
            identifier: values.identifier,
            secret: values.secret,
            url: values.url,
            notes: values.notes,
        }

        const errors = validateCredentialFormFields(payload, { allowEmptySecret })
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        setFieldErrors({})

        if (!onSubmit) return

        setIsSubmitting(true)
        try {
            await onSubmit(payload)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={entityFormGridClass}>
            <FormField id="cred-type" label="Credential type" error={fieldErrors.type} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
                <AppSelectField
                    id="cred-type"
                    disabled={lockTypeField}
                    value={values.type}
                    onValueChange={(value) => {
                        setValues((prev) => ({ ...prev, type: value }))
                        setFieldErrors((prev) => ({ ...prev, type: undefined }))
                    }}
                    placeholder="Select credential type"
                    triggerClassName={cn(entityFormSelectClass, fieldErrors.type && 'border-destructive')}
                    options={CREDENTIAL_TYPE_OPTIONS.map((item) => ({ value: item.code, label: item.label }))}
                />
            </FormField>

            <FormField id="cred-service" label="Service name" error={fieldErrors.serviceName} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
                <Input
                    id="cred-service"
                    value={values.serviceName}
                    onChange={(event) => {
                        setValues((prev) => ({ ...prev, serviceName: event.target.value }))
                        setFieldErrors((prev) => ({ ...prev, serviceName: undefined }))
                    }}
                    placeholder="e.g. Gmail, GitHub, HBL"
                    className={cn(entityFormControlClass, fieldErrors.serviceName && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={Boolean(fieldErrors.serviceName)}
                    maxLength={120}
                    required
                />
            </FormField>

            <FormField id="cred-identifier" label="Identifier (optional)" error={fieldErrors.identifier} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
                <Input
                    id="cred-identifier"
                    value={values.identifier}
                    onChange={(event) => {
                        setValues((prev) => ({ ...prev, identifier: event.target.value }))
                        setFieldErrors((prev) => ({ ...prev, identifier: undefined }))
                    }}
                    placeholder="email / username / phone"
                    className={cn(entityFormControlClass, fieldErrors.identifier && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={Boolean(fieldErrors.identifier)}
                    maxLength={120}
                />
            </FormField>

            <FormField
                id="cred-secret"
                label={allowEmptySecret ? 'Secret (leave empty to keep existing)' : 'Secret'}
                hint={typeConfig?.hint ?? 'Store only trusted credentials.'}
                error={fieldErrors.secret}
                className={entityFormFieldCardClass}
                labelClassName={entityFormLabelClass}
            >
                <Input
                    id="cred-secret"
                    type="password"
                    value={values.secret}
                    onChange={(event) => {
                        setValues((prev) => ({ ...prev, secret: event.target.value }))
                        setFieldErrors((prev) => ({ ...prev, secret: undefined }))
                    }}
                    placeholder={typeConfig?.placeholder ?? 'Enter secret'}
                    className={cn(entityFormControlClass, fieldErrors.secret && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={Boolean(fieldErrors.secret)}
                    autoCapitalize="none"
                    autoComplete="off"
                    required={!allowEmptySecret}
                />
            </FormField>

            <FormField id="cred-url" label="Website URL (optional)" error={fieldErrors.url} className={cn(entityFormFieldCardClass, 'sm:col-span-2')} labelClassName={entityFormLabelClass}>
                <Input
                    id="cred-url"
                    value={values.url}
                    onChange={(event) => {
                        setValues((prev) => ({ ...prev, url: event.target.value }))
                        setFieldErrors((prev) => ({ ...prev, url: undefined }))
                    }}
                    placeholder="https://example.com"
                    className={cn(entityFormControlClass, fieldErrors.url && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={Boolean(fieldErrors.url)}
                    maxLength={400}
                />
            </FormField>

            <FormField id="cred-notes" label="Notes (optional)" error={fieldErrors.notes} className={cn(entityFormFieldCardClass, 'sm:col-span-2')} labelClassName={entityFormLabelClass}>
                <Textarea
                    id="cred-notes"
                    value={values.notes}
                    onChange={(event) => {
                        setValues((prev) => ({ ...prev, notes: event.target.value }))
                        setFieldErrors((prev) => ({ ...prev, notes: undefined }))
                    }}
                    placeholder="Any extra details"
                    className={cn(entityFormTextareaClass, fieldErrors.notes && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={Boolean(fieldErrors.notes)}
                    maxLength={1000}
                />
            </FormField>

            <div className={entityFormActionsDividerClass}>
                <FormActions submitLabel={submitLabel} isSubmitting={isSubmitting} showReset={showReset} />
            </div>
        </form>
    )
}

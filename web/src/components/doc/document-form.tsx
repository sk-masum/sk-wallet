'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormActions } from '@/components/ui/form-actions'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import {
  entityFormActionsDividerClass,
  entityFormControlClass,
  entityFormDateButtonClass,
  entityFormFieldCardClass,
  entityFormGridClass,
  entityFormLabelClass,
  entityFormSelectClass,
  entityFormTextareaClass,
} from '@/components/shared/entity-form-ui'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DOCUMENT_CATEGORY_OPTIONS } from '@/constants/document/categories'
import { DOCUMENT_TYPE_OPTIONS, getDocumentTypeConfig } from '@/constants/document/types'
import type { DocumentFormFieldErrors, DocumentFormPayload } from '@/models/document'
import { cn } from '@/lib/utils'
import { validateDocumentFormFields } from '@/utils/document/validation'

type DocumentFormValues = {
  type: string
  category: string
  number: string
  nameOnDocument: string
  issuedDate: string
  expiryDate: string
  address: string
  guardianName: string
  otherDetails: string
}

type DocumentFormProps = {
  submitLabel?: string
  initialValues?: Partial<DocumentFormValues>
  showReset?: boolean
  lockTypeField?: boolean
  lockNumberField?: boolean
  validateIdentityFields?: boolean
  onSubmit?: (payload: DocumentFormPayload) => Promise<void> | void
}

export function DocumentForm({
  submitLabel = 'Save document',
  initialValues,
  showReset = true,
  lockTypeField = false,
  lockNumberField = false,
  validateIdentityFields = true,
  onSubmit,
}: DocumentFormProps) {
  const [values, setValues] = useState<DocumentFormValues>({
    type: initialValues?.type ?? '',
    category: initialValues?.category ?? 'other',
    number: initialValues?.number ?? '',
    nameOnDocument: initialValues?.nameOnDocument ?? '',
    issuedDate: initialValues?.issuedDate ?? '',
    expiryDate: initialValues?.expiryDate ?? '',
    address: initialValues?.address ?? '',
    guardianName: initialValues?.guardianName ?? '',
    otherDetails: initialValues?.otherDetails ?? '',
  })
  const [fieldErrors, setFieldErrors] = useState<DocumentFormFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const typeConfig = useMemo(() => getDocumentTypeConfig(values.type), [values.type])

  const issuedDateValue = useMemo(() => {
    if (!values.issuedDate) return undefined
    const parsed = new Date(`${values.issuedDate}T00:00:00`)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed
  }, [values.issuedDate])

  const expiryDateValue = useMemo(() => {
    if (!values.expiryDate) return undefined
    const parsed = new Date(`${values.expiryDate}T00:00:00`)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed
  }, [values.expiryDate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: DocumentFormPayload = {
      type: values.type,
      category: values.category,
      number: values.number,
      nameOnDocument: values.nameOnDocument,
      issuedDate: values.issuedDate,
      expiryDate: values.expiryDate,
      address: values.address,
      guardianName: values.guardianName,
      otherDetails: values.otherDetails,
    }

    const errors = validateDocumentFormFields(payload)
    if (!validateIdentityFields) {
      delete errors.type
      delete errors.number
    }
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
      <FormField id="doc-type" label="Document type" error={fieldErrors.type} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Select
          disabled={lockTypeField}
          value={values.type}
          onValueChange={(value) => {
            setValues((prev) => ({ ...prev, type: value, number: '' }))
            setFieldErrors((prev) => ({ ...prev, type: undefined, number: undefined }))
          }}
        >
          <SelectTrigger id="doc-type" className={cn(entityFormSelectClass, fieldErrors.type && 'border-destructive')}>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_TYPE_OPTIONS.map((item) => (
              <SelectItem key={item.code} value={item.code}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField id="doc-category" label="Category" error={fieldErrors.category} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Select
          value={values.category}
          onValueChange={(value) => {
            setValues((prev) => ({ ...prev, category: value }))
            setFieldErrors((prev) => ({ ...prev, category: undefined }))
          }}
        >
          <SelectTrigger id="doc-category" className={cn(entityFormSelectClass, fieldErrors.category && 'border-destructive')}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_CATEGORY_OPTIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField
        id="doc-number"
        label="Document number"
        hint={typeConfig?.hint ?? 'Choose a type to see validation hint'}
        error={fieldErrors.number}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <Input
          id="doc-number"
          value={values.number}
          onChange={(event) => {
            const nextValue = event.target.value
            setValues((prev) => ({ ...prev, number: nextValue }))
            setFieldErrors((prev) => ({ ...prev, number: undefined }))
          }}
          placeholder={typeConfig?.placeholder ?? 'Enter document number'}
          className={cn(entityFormControlClass, fieldErrors.number && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.number)}
          autoCapitalize="characters"
          disabled={lockNumberField}
          required={validateIdentityFields && !lockNumberField}
        />
      </FormField>

      <FormField id="doc-name" label="Name on document (optional)" error={fieldErrors.nameOnDocument} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Input
          id="doc-name"
          value={values.nameOnDocument}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, nameOnDocument: event.target.value }))
            setFieldErrors((prev) => ({ ...prev, nameOnDocument: undefined }))
          }}
          placeholder="As printed on document"
          className={cn(entityFormControlClass, fieldErrors.nameOnDocument && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.nameOnDocument)}
          maxLength={120}
        />
      </FormField>

      <FormField id="doc-issued-date" label="Issued date (optional)" error={fieldErrors.issuedDate} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="doc-issued-date"
              type="button"
              variant="outline"
              className={cn(
                entityFormDateButtonClass,
                !issuedDateValue && 'text-muted-foreground',
                fieldErrors.issuedDate && 'border-destructive'
              )}
              aria-invalid={Boolean(fieldErrors.issuedDate)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {issuedDateValue ? format(issuedDateValue, 'PPP') : 'Select issued date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={issuedDateValue}
              onSelect={(date) => {
                setValues((prev) => ({
                  ...prev,
                  issuedDate: date ? format(date, 'yyyy-MM-dd') : '',
                }))
                setFieldErrors((prev) => ({ ...prev, issuedDate: undefined }))
              }}
            />
          </PopoverContent>
        </Popover>
      </FormField>

      <FormField id="doc-expiry-date" label="Expiry date (optional)" error={fieldErrors.expiryDate} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="doc-expiry-date"
              type="button"
              variant="outline"
              className={cn(
                entityFormDateButtonClass,
                !expiryDateValue && 'text-muted-foreground',
                fieldErrors.expiryDate && 'border-destructive'
              )}
              aria-invalid={Boolean(fieldErrors.expiryDate)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiryDateValue ? format(expiryDateValue, 'PPP') : 'Select expiry date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={expiryDateValue}
              onSelect={(date) => {
                setValues((prev) => ({
                  ...prev,
                  expiryDate: date ? format(date, 'yyyy-MM-dd') : '',
                }))
                setFieldErrors((prev) => ({ ...prev, expiryDate: undefined }))
              }}
            />
          </PopoverContent>
        </Popover>
      </FormField>

      <FormField id="doc-guardian" label="Guardian name (optional)" error={fieldErrors.guardianName} className={entityFormFieldCardClass} labelClassName={entityFormLabelClass}>
        <Input
          id="doc-guardian"
          value={values.guardianName}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, guardianName: event.target.value }))
            setFieldErrors((prev) => ({ ...prev, guardianName: undefined }))
          }}
          placeholder="Father / Mother / Guardian"
          className={cn(entityFormControlClass, fieldErrors.guardianName && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.guardianName)}
          maxLength={120}
        />
      </FormField>

      <FormField id="doc-address" label="Address (optional)" error={fieldErrors.address} className={cn(entityFormFieldCardClass, 'sm:col-span-2')} labelClassName={entityFormLabelClass}>
        <Input
          id="doc-address"
          value={values.address}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, address: event.target.value }))
            setFieldErrors((prev) => ({ ...prev, address: undefined }))
          }}
          placeholder="Current address"
          className={cn(entityFormControlClass, fieldErrors.address && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.address)}
          maxLength={240}
        />
      </FormField>

      <FormField
        id="doc-other-details"
        label="Other details (optional)"
        error={fieldErrors.otherDetails}
        className={cn(entityFormFieldCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
      >
        <Textarea
          id="doc-other-details"
          value={values.otherDetails}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, otherDetails: event.target.value }))
            setFieldErrors((prev) => ({ ...prev, otherDetails: undefined }))
          }}
          placeholder="Any additional notes"
          className={cn(entityFormTextareaClass, fieldErrors.otherDetails && 'border-destructive focus-visible:ring-destructive')}
          aria-invalid={Boolean(fieldErrors.otherDetails)}
          maxLength={500}
        />
      </FormField>

      <div className={entityFormActionsDividerClass}>
        <FormActions
          submitLabel={submitLabel}
          isSubmitting={isSubmitting}
          showReset={showReset}
        />
      </div>
    </form>
  )
}

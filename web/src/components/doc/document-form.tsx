'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormActions } from '@/components/ui/form-actions';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import {
  entityFormActionsDividerClass,
  entityFormControlClass,
  entityFormDateButtonClass,
  entityFormFieldCardClass,
  entityFormGridClass,
  entityFormLabelClass,
  entityFormSelectClass,
  entityFormTextareaClass,
} from '@/components/shared/entity-form-ui';
import { AppSelectField } from '@/components/shared/app-select-field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { isDocumentCategory } from '@/constants/document/categories';
import { DOCUMENT_CATEGORY_OPTIONS } from '@/constants/document/categories';
import { DOCUMENT_TYPE_OPTIONS, getDocumentTypeConfig } from '@/constants/document/types';
import {
  DocumentTypeCode,
  type DocumentFormFieldErrors,
  type DocumentFormPayload,
} from '@/models/document';
import { cn } from '@/lib/utils';
import { validateDocumentFormFields } from '@/utils/document/validation';

type DocumentFormValues = {
  type: string;
  category: string;
  number: string;
  nameOnDocument: string;
  issuedDate: string;
  expiryDate: string;
  address: string;
  guardianName: string;
  otherDetails: string;
};

type DocumentCustomFieldInput = {
  id: string;
  key: string;
  value: string;
};

type DocumentFormInitialValues = Partial<DocumentFormValues> & {
  customFields?: Array<{
    key: string;
    value: string;
  }>;
};

type DocumentFormProps = {
  submitLabel?: string;
  initialValues?: DocumentFormInitialValues;
  showReset?: boolean;
  lockTypeField?: boolean;
  lockNumberField?: boolean;
  validateIdentityFields?: boolean;
  onSubmit?: (payload: DocumentFormPayload) => Promise<void> | void;
};

function createCustomFieldId() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function toInitialCustomFields(
  value: DocumentFormInitialValues['customFields'],
): DocumentCustomFieldInput[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) => ({
    id: createCustomFieldId(),
    key: String(item?.key ?? ''),
    value: String(item?.value ?? ''),
  }));
}

function ensurePassbookCustomFields(fields: DocumentCustomFieldInput[]) {
  const requiredKeys = ['IFSC Number', 'Branch Name'];
  const existingKeys = new Set(fields.map((field) => field.key.trim().toLowerCase()));
  const missingFields = requiredKeys
    .filter((key) => !existingKeys.has(key.toLowerCase()))
    .map((key) => ({ id: createCustomFieldId(), key, value: '' }));

  if (missingFields.length === 0) {
    return fields;
  }

  return [...fields, ...missingFields];
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
  });
  const [customFields, setCustomFields] = useState<DocumentCustomFieldInput[]>(
    toInitialCustomFields(initialValues?.customFields),
  );
  const [fieldErrors, setFieldErrors] = useState<DocumentFormFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const typeConfig = useMemo(() => getDocumentTypeConfig(values.type), [values.type]);

  const issuedDateValue = useMemo(() => {
    if (!values.issuedDate) return undefined;
    const parsed = new Date(`${values.issuedDate}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }, [values.issuedDate]);

  const expiryDateValue = useMemo(() => {
    if (!values.expiryDate) return undefined;
    const parsed = new Date(`${values.expiryDate}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }, [values.expiryDate]);

  useEffect(() => {
    if (values.type !== DocumentTypeCode.PASSBOOK) return;

    setCustomFields((prev) => ensurePassbookCustomFields(prev));
  }, [values.type]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      customFields: customFields.map((item) => ({
        key: item.key.trim(),
        value: item.value.trim(),
      })),
    };

    const errors = validateDocumentFormFields(payload);
    if (!validateIdentityFields) {
      delete errors.type;
      delete errors.number;
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={entityFormGridClass}>
      <FormField
        id='doc-type'
        label='Document type'
        error={fieldErrors.type}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <AppSelectField
          id='doc-type'
          disabled={lockTypeField}
          value={values.type}
          onValueChange={(value) => {
            setValues((prev) => ({
              ...prev,
              type: value,
              number: '',
              category:
                value === DocumentTypeCode.OTHERS
                  ? isDocumentCategory(prev.category)
                    ? ''
                    : prev.category
                  : isDocumentCategory(prev.category)
                    ? prev.category
                    : 'other',
            }));
            setFieldErrors((prev) => ({
              ...prev,
              type: undefined,
              number: undefined,
              category: undefined,
            }));
          }}
          placeholder='Select document type'
          triggerClassName={cn(entityFormSelectClass, fieldErrors.type && 'border-destructive')}
          options={DOCUMENT_TYPE_OPTIONS.map((item) => ({ value: item.code, label: item.label }))}
        />
      </FormField>

      {values.type === DocumentTypeCode.OTHERS ? (
        <FormField
          id='doc-custom-label'
          label='Custom label'
          hint='This label will be shown instead of Others in your vault.'
          error={fieldErrors.category}
          className={entityFormFieldCardClass}
          labelClassName={entityFormLabelClass}
        >
          <Input
            id='doc-custom-label'
            value={values.category}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, category: event.target.value }));
              setFieldErrors((prev) => ({ ...prev, category: undefined }));
            }}
            placeholder='e.g. Employee ID'
            className={cn(
              entityFormControlClass,
              fieldErrors.category && 'border-destructive focus-visible:ring-destructive',
            )}
            aria-invalid={Boolean(fieldErrors.category)}
            maxLength={60}
            required
          />
        </FormField>
      ) : null}

      {values.type !== DocumentTypeCode.OTHERS ? (
        <FormField
          id='doc-category'
          label='Category'
          error={fieldErrors.category}
          className={entityFormFieldCardClass}
          labelClassName={entityFormLabelClass}
        >
          <AppSelectField
            id='doc-category'
            value={values.category}
            onValueChange={(value) => {
              setValues((prev) => ({ ...prev, category: value }));
              setFieldErrors((prev) => ({ ...prev, category: undefined }));
            }}
            placeholder='Select category'
            triggerClassName={cn(
              entityFormSelectClass,
              fieldErrors.category && 'border-destructive',
            )}
            options={DOCUMENT_CATEGORY_OPTIONS.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        </FormField>
      ) : null}

      <FormField
        id='doc-number'
        label='Document number'
        hint={typeConfig?.hint ?? 'Choose a type to see validation hint'}
        error={fieldErrors.number}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <Input
          id='doc-number'
          value={values.number}
          onChange={(event) => {
            const nextValue = event.target.value;
            setValues((prev) => ({ ...prev, number: nextValue }));
            setFieldErrors((prev) => ({ ...prev, number: undefined }));
          }}
          placeholder={typeConfig?.placeholder ?? 'Enter document number'}
          className={cn(
            entityFormControlClass,
            fieldErrors.number && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.number)}
          autoCapitalize='characters'
          disabled={lockNumberField}
          required={validateIdentityFields && !lockNumberField}
        />
      </FormField>

      <FormField
        id='doc-name'
        label='Name on document (optional)'
        error={fieldErrors.nameOnDocument}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <Input
          id='doc-name'
          value={values.nameOnDocument}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, nameOnDocument: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, nameOnDocument: undefined }));
          }}
          placeholder='As printed on document'
          className={cn(
            entityFormControlClass,
            fieldErrors.nameOnDocument && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.nameOnDocument)}
          maxLength={120}
        />
      </FormField>

      <FormField
        id='doc-issued-date'
        label='Issued date (optional)'
        error={fieldErrors.issuedDate}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='doc-issued-date'
              type='button'
              variant='outline'
              className={cn(
                entityFormDateButtonClass,
                !issuedDateValue && 'text-text-subtle',
                fieldErrors.issuedDate && 'border-destructive',
              )}
              aria-invalid={Boolean(fieldErrors.issuedDate)}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {issuedDateValue ? format(issuedDateValue, 'PPP') : 'Select issued date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={issuedDateValue}
              onSelect={(date) => {
                setValues((prev) => ({
                  ...prev,
                  issuedDate: date ? format(date, 'yyyy-MM-dd') : '',
                }));
                setFieldErrors((prev) => ({ ...prev, issuedDate: undefined }));
              }}
            />
          </PopoverContent>
        </Popover>
      </FormField>

      <FormField
        id='doc-expiry-date'
        label='Expiry date (optional)'
        error={fieldErrors.expiryDate}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='doc-expiry-date'
              type='button'
              variant='outline'
              className={cn(
                entityFormDateButtonClass,
                !expiryDateValue && 'text-text-subtle',
                fieldErrors.expiryDate && 'border-destructive',
              )}
              aria-invalid={Boolean(fieldErrors.expiryDate)}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {expiryDateValue ? format(expiryDateValue, 'PPP') : 'Select expiry date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={expiryDateValue}
              onSelect={(date) => {
                setValues((prev) => ({
                  ...prev,
                  expiryDate: date ? format(date, 'yyyy-MM-dd') : '',
                }));
                setFieldErrors((prev) => ({ ...prev, expiryDate: undefined }));
              }}
            />
          </PopoverContent>
        </Popover>
      </FormField>

      <FormField
        id='doc-guardian'
        label='Guardian name (optional)'
        error={fieldErrors.guardianName}
        className={entityFormFieldCardClass}
        labelClassName={entityFormLabelClass}
      >
        <Input
          id='doc-guardian'
          value={values.guardianName}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, guardianName: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, guardianName: undefined }));
          }}
          placeholder='Father / Mother / Guardian'
          className={cn(
            entityFormControlClass,
            fieldErrors.guardianName && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.guardianName)}
          maxLength={120}
        />
      </FormField>

      <FormField
        id='doc-address'
        label='Address (optional)'
        error={fieldErrors.address}
        className={cn(entityFormFieldCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
      >
        <Input
          id='doc-address'
          value={values.address}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, address: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, address: undefined }));
          }}
          placeholder='Current address'
          className={cn(
            entityFormControlClass,
            fieldErrors.address && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.address)}
          maxLength={240}
        />
      </FormField>

      <FormField
        id='doc-other-details'
        label='Other details (optional)'
        error={fieldErrors.otherDetails}
        className={cn(entityFormFieldCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
      >
        <Textarea
          id='doc-other-details'
          value={values.otherDetails}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, otherDetails: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, otherDetails: undefined }));
          }}
          placeholder='Any additional notes'
          className={cn(
            entityFormTextareaClass,
            fieldErrors.otherDetails && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.otherDetails)}
          maxLength={500}
        />
      </FormField>

      <FormField
        id='doc-custom-fields'
        label='Custom fields (optional)'
        hint='Add your own key/value metadata entries for this document.'
        error={fieldErrors.customFields}
        className={cn(entityFormFieldCardClass, 'sm:col-span-2')}
        labelClassName={entityFormLabelClass}
      >
        <div className='space-y-3'>
          {customFields.length === 0 ? (
            <p className='text-xs text-text-subtle'>No custom fields added yet.</p>
          ) : (
            customFields.map((item, index) => (
              <div
                key={item.id}
                className='grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_40px]'
              >
                <Input
                  id={`doc-custom-key-${item.id}`}
                  value={item.key}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setCustomFields((prev) =>
                      prev.map((field) =>
                        field.id === item.id ? { ...field, key: nextValue } : field,
                      ),
                    );
                    setFieldErrors((prev) => ({ ...prev, customFields: undefined }));
                  }}
                  placeholder={`Field name ${index + 1}`}
                  className={entityFormControlClass}
                  maxLength={60}
                />
                <Input
                  id={`doc-custom-value-${item.id}`}
                  value={item.value}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setCustomFields((prev) =>
                      prev.map((field) =>
                        field.id === item.id ? { ...field, value: nextValue } : field,
                      ),
                    );
                    setFieldErrors((prev) => ({ ...prev, customFields: undefined }));
                  }}
                  placeholder={`Field value ${index + 1}`}
                  className={entityFormControlClass}
                  maxLength={240}
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='h-10 w-10 rounded-xl text-text-subtle hover:text-destructive'
                  onClick={() => {
                    setCustomFields((prev) => prev.filter((field) => field.id !== item.id));
                    setFieldErrors((prev) => ({ ...prev, customFields: undefined }));
                  }}
                  aria-label={`Remove custom field ${index + 1}`}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            ))
          )}

          <Button
            type='button'
            variant='outline'
            className='h-10 rounded-xl'
            onClick={() => {
              setCustomFields((prev) => [
                ...prev,
                { id: createCustomFieldId(), key: '', value: '' },
              ]);
              setFieldErrors((prev) => ({ ...prev, customFields: undefined }));
            }}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add custom field
          </Button>
        </div>
      </FormField>

      <div className={entityFormActionsDividerClass}>
        <FormActions submitLabel={submitLabel} isSubmitting={isSubmitting} showReset={showReset} />
      </div>
    </form>
  );
}

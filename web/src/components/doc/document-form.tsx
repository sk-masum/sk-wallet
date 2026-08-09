'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { format } from 'date-fns';

import {
  EntityDatePickerField,
  EntityInputField,
  EntityTextareaField,
  EntityCustomFieldsEditor,
  EntityTypeSelectField,
  type EntityCustomFieldItem,
} from '@/components/shared/entity-form-kit';
import { FormActions } from '@/components/ui/form-actions';
import { FormField } from '@/components/ui/form-field';
import {
  entityFormActionsDividerClass,
  entityFormGridClass,
  entityFormLabelClass,
} from '@/components/shared/entity-form-ui';
import { submitEntityForm } from '@/components/shared/entity-form-submit';
import { isDocumentCategory } from '@/constants/document/categories';
import { DOCUMENT_CATEGORY_OPTIONS } from '@/constants/document/categories';
import { DOCUMENT_TYPE_OPTIONS, getDocumentTypeConfig } from '@/constants/document/types';
import {
  DocumentTypeCode,
  type DocumentFormFieldErrors,
  type DocumentFormPayload,
} from '@/models/document';
import { useEntityFormFieldMetadata } from '@/hooks/use-entity-form-field-metadata';
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

type DocumentCustomFieldInput = EntityCustomFieldItem;

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
  const fieldMeta = useEntityFormFieldMetadata('document');
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

    await submitEntityForm({
      payload,
      validate: validateDocumentFormFields,
      mutateErrors: (errors) => {
        if (!validateIdentityFields) {
          delete errors.type;
          delete errors.number;
        }
      },
      setFieldErrors,
      setIsSubmitting,
      onSubmit,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        entityFormGridClass,
        'overflow-hidden rounded-2xl border border-glass-border-strong bg-[radial-gradient(circle_at_8%_6%,hsl(var(--primary)/0.22),transparent_48%),radial-gradient(circle_at_94%_10%,hsl(var(--accent)/0.16),transparent_44%),radial-gradient(circle_at_20%_94%,hsl(var(--info)/0.14),transparent_52%),linear-gradient(160deg,hsl(var(--card)/0.86),hsl(var(--surface-elevated)/0.8))] p-3 shadow-neu-raised-sm backdrop-blur-md sm:p-4',
      )}
    >
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-10 -top-14 h-56 w-56 rounded-full bg-primary/18 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-12 top-1/4 h-52 w-52 rounded-full bg-accent/14 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-info/12 blur-3xl'
      />
      <EntityTypeSelectField
        id='doc-type'
        label={fieldMeta.type.label}
        error={fieldErrors.type}
        labelClassName={entityFormLabelClass}
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
        placeholder={fieldMeta.type.placeholder ?? 'Select document type'}
        options={DOCUMENT_TYPE_OPTIONS.map((item) => ({ value: item.code, label: item.label }))}
      />

      {values.type === DocumentTypeCode.OTHERS ? (
        <EntityInputField
          id='doc-custom-label'
          label={fieldMeta.customLabel.label}
          hint={fieldMeta.customLabel.hint}
          error={fieldErrors.category}
          labelClassName={entityFormLabelClass}
          inputProps={{
            value: values.category,
            onChange: (event) => {
              setValues((prev) => ({ ...prev, category: event.target.value }));
              setFieldErrors((prev) => ({ ...prev, category: undefined }));
            },
            placeholder: fieldMeta.customLabel.placeholder,
            maxLength: fieldMeta.customLabel.maxLength,
            required: fieldMeta.customLabel.required,
          }}
        />
      ) : null}

      {values.type !== DocumentTypeCode.OTHERS ? (
        <EntityTypeSelectField
          id='doc-category'
          label={fieldMeta.category.label}
          error={fieldErrors.category}
          labelClassName={entityFormLabelClass}
          value={values.category}
          onValueChange={(value) => {
            setValues((prev) => ({ ...prev, category: value }));
            setFieldErrors((prev) => ({ ...prev, category: undefined }));
          }}
          placeholder={fieldMeta.category.placeholder ?? 'Select category'}
          options={DOCUMENT_CATEGORY_OPTIONS.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
        />
      ) : null}

      <EntityInputField
        id='doc-number'
        label={fieldMeta.number.label}
        hint={typeConfig?.hint ?? 'Choose a type to see validation hint'}
        error={fieldErrors.number}
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.number,
          onChange: (event) => {
            const nextValue = event.target.value;
            setValues((prev) => ({ ...prev, number: nextValue }));
            setFieldErrors((prev) => ({ ...prev, number: undefined }));
          },
          placeholder: typeConfig?.placeholder ?? fieldMeta.number.placeholder,
          autoCapitalize: 'characters',
          disabled: lockNumberField,
          required: validateIdentityFields && !lockNumberField,
        }}
      />

      <EntityInputField
        id='doc-name'
        label={fieldMeta.nameOnDocument.label}
        error={fieldErrors.nameOnDocument}
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.nameOnDocument,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, nameOnDocument: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, nameOnDocument: undefined }));
          },
          placeholder: fieldMeta.nameOnDocument.placeholder,
          maxLength: fieldMeta.nameOnDocument.maxLength,
        }}
      />

      <EntityDatePickerField
        id='doc-issued-date'
        label={fieldMeta.issuedDate.label}
        error={fieldErrors.issuedDate}
        labelClassName={entityFormLabelClass}
        value={issuedDateValue}
        placeholder={fieldMeta.issuedDate.placeholder ?? 'Select issued date'}
        onSelect={(date) => {
          setValues((prev) => ({
            ...prev,
            issuedDate: date ? format(date, 'yyyy-MM-dd') : '',
          }));
          setFieldErrors((prev) => ({ ...prev, issuedDate: undefined }));
        }}
      />

      <EntityDatePickerField
        id='doc-expiry-date'
        label={fieldMeta.expiryDate.label}
        error={fieldErrors.expiryDate}
        labelClassName={entityFormLabelClass}
        value={expiryDateValue}
        placeholder={fieldMeta.expiryDate.placeholder ?? 'Select expiry date'}
        onSelect={(date) => {
          setValues((prev) => ({
            ...prev,
            expiryDate: date ? format(date, 'yyyy-MM-dd') : '',
          }));
          setFieldErrors((prev) => ({ ...prev, expiryDate: undefined }));
        }}
      />

      <EntityInputField
        id='doc-guardian'
        label={fieldMeta.guardianName.label}
        error={fieldErrors.guardianName}
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.guardianName,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, guardianName: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, guardianName: undefined }));
          },
          placeholder: fieldMeta.guardianName.placeholder,
          maxLength: fieldMeta.guardianName.maxLength,
        }}
      />

      <EntityInputField
        id='doc-address'
        label={fieldMeta.address.label}
        error={fieldErrors.address}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.address,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, address: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, address: undefined }));
          },
          placeholder: fieldMeta.address.placeholder,
          maxLength: fieldMeta.address.maxLength,
        }}
      />

      <EntityTextareaField
        id='doc-other-details'
        label={fieldMeta.otherDetails.label}
        error={fieldErrors.otherDetails}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
        textareaProps={{
          value: values.otherDetails,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, otherDetails: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, otherDetails: undefined }));
          },
          placeholder: fieldMeta.otherDetails.placeholder,
          maxLength: fieldMeta.otherDetails.maxLength,
        }}
      />

      <FormField
        id='doc-custom-fields'
        label={fieldMeta.customFields.label}
        hint={fieldMeta.customFields.hint}
        error={fieldErrors.customFields}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
      >
        <EntityCustomFieldsEditor
          fields={customFields}
          createId={createCustomFieldId}
          onChange={setCustomFields}
          onTouched={() => setFieldErrors((prev) => ({ ...prev, customFields: undefined }))}
        />
      </FormField>

      <div className={entityFormActionsDividerClass}>
        <FormActions submitLabel={submitLabel} isSubmitting={isSubmitting} showReset={showReset} />
      </div>
    </form>
  );
}

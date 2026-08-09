'use client';

import { useEffect, useState } from 'react';

import {
  ENTITY_FORM_FIELD_METADATA,
  type EntityFormFieldMetadataMap,
  type SupportedFormEntity,
} from '@/constants/form/field-metadata';

type FormMetadataResponse<T extends SupportedFormEntity> = {
  data?: Partial<EntityFormFieldMetadataMap[T]>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function useEntityFormFieldMetadata<T extends SupportedFormEntity>(entity: T) {
  const [fieldMeta, setFieldMeta] = useState<EntityFormFieldMetadataMap[T]>(
    ENTITY_FORM_FIELD_METADATA[entity],
  );

  useEffect(() => {
    let ignore = false;

    const loadFieldMetadata = async () => {
      try {
        const response = await fetch(`/api/form-metadata?entity=${entity}`, {
          cache: 'no-store',
        });

        if (!response.ok) return;

        const result = (await response.json()) as FormMetadataResponse<T>;

        if (ignore || !isRecord(result?.data)) {
          return;
        }

        setFieldMeta((previous) => ({
          ...previous,
          ...(result.data as Partial<EntityFormFieldMetadataMap[T]>),
        }));
      } catch {
        // Keep local metadata fallback when API is unavailable.
      }
    };

    void loadFieldMetadata();

    return () => {
      ignore = true;
    };
  }, [entity]);

  return fieldMeta;
}

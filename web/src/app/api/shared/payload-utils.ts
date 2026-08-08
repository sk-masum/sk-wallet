export type NormalizedCustomField = {
  key: string;
  value: string;
};

export function normalizeTrimmedText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  return text.slice(0, maxLength);
}

export function toMetadataRecordOrNull(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

export function toMutableMetadataRecord(value: unknown) {
  return { ...(toMetadataRecordOrNull(value) ?? {}) };
}

export function normalizeCustomFields(
  value: unknown,
  {
    keyMaxLength = 60,
    valueMaxLength = 240,
    maxItems = 12,
  }: {
    keyMaxLength?: number;
    valueMaxLength?: number;
    maxItems?: number;
  } = {},
): NormalizedCustomField[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const key = normalizeTrimmedText((item as { key?: unknown })?.key, keyMaxLength);
      const fieldValue = normalizeTrimmedText((item as { value?: unknown })?.value, valueMaxLength);
      if (!key || !fieldValue) return null;
      return { key, value: fieldValue };
    })
    .filter((item): item is NormalizedCustomField => Boolean(item))
    .slice(0, maxItems);
}

import {
  DEFAULT_CREDENTIAL_GROUP,
  DEFAULT_CREDENTIAL_SORT,
  type CredentialGroup,
  type CredentialSort,
} from '@/lib/stores/credential-vault-store';
import type { FilterOptions } from '@/models/filter';

export const CREDENTIAL_SORT_OPTIONS: FilterOptions<CredentialSort> = [
  { value: DEFAULT_CREDENTIAL_SORT, label: 'Last updated (newest)' },
  { value: 'updated_asc', label: 'Last updated (oldest)' },
  { value: 'service_asc', label: 'Service name (A-Z)' },
  { value: 'service_desc', label: 'Service name (Z-A)' },
];

export const CREDENTIAL_GROUP_OPTIONS: FilterOptions<CredentialGroup> = [
  { value: DEFAULT_CREDENTIAL_GROUP, label: 'No grouping' },
  { value: 'type', label: 'Group by type' },
  { value: 'service', label: 'Group by service name' },
];

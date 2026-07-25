import { useSyncExternalStore } from 'react';

import { getCredentialTypeConfig } from '@/constants/credential/types';
import type { UserCredential } from '@/models/credential';

export type CredentialSort = 'updated_desc' | 'updated_asc' | 'service_asc' | 'service_desc';
export type CredentialGroup = 'none' | 'type' | 'service';

type CredentialVaultFilters = {
  query?: string;
  typeFilter?: string;
};

type CredentialVaultState = {
  credentials: UserCredential[];
  query: string;
  typeFilter: string;
  sortBy: CredentialSort;
  groupBy: CredentialGroup;
  setCredentials: (credentials: UserCredential[]) => void;
  setFilters: (filters: CredentialVaultFilters) => void;
  setSortBy: (sortBy: CredentialSort) => void;
  setGroupBy: (groupBy: CredentialGroup) => void;
  removeCredential: (id: string) => void;
};

export const DEFAULT_CREDENTIAL_SORT: CredentialSort = 'updated_desc';
export const DEFAULT_CREDENTIAL_GROUP: CredentialGroup = 'none';

const listeners = new Set<() => void>();

let store: CredentialVaultState;

function setStore(patch: Partial<CredentialVaultState>) {
  store = {
    ...store,
    ...patch,
  };
  notify();
}

store = {
  credentials: [],
  query: '',
  typeFilter: 'ALL',
  sortBy: DEFAULT_CREDENTIAL_SORT,
  groupBy: DEFAULT_CREDENTIAL_GROUP,
  setCredentials(credentials) {
    setStore({ credentials });
  },
  setFilters(filters) {
    setStore({
      query: filters.query ?? store.query,
      typeFilter: filters.typeFilter ?? store.typeFilter,
    });
  },
  setSortBy(sortBy) {
    setStore({ sortBy });
  },
  setGroupBy(groupBy) {
    setStore({ groupBy });
  },
  removeCredential(id) {
    setStore({ credentials: store.credentials.filter((cred) => cred.id !== id) });
  },
};

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return store;
}

export function useCredentialVaultStore<T>(selector: (state: CredentialVaultState) => T) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return selector(snapshot);
}

function sortCredentials(items: UserCredential[], sortBy: CredentialSort) {
  const sorted = [...items];

  if (sortBy === 'updated_asc') {
    sorted.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
    return sorted;
  }

  if (sortBy === 'service_asc') {
    sorted.sort((a, b) => a.service_name.localeCompare(b.service_name));
    return sorted;
  }

  if (sortBy === 'service_desc') {
    sorted.sort((a, b) => b.service_name.localeCompare(a.service_name));
    return sorted;
  }

  sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  return sorted;
}

export function selectVisibleCredentials(state: CredentialVaultState) {
  const normalizedQuery = state.query.trim().toLowerCase();

  const filtered = state.credentials.filter((cred) => {
    if (state.typeFilter !== 'ALL' && cred.credential_type !== state.typeFilter) {
      return false;
    }

    if (!normalizedQuery) return true;

    const typeLabel = getCredentialTypeConfig(cred.credential_type)?.label ?? cred.credential_type;
    const searchable = [
      typeLabel,
      cred.credential_type,
      cred.service_name,
      cred.identifier ?? '',
      cred.masked_secret,
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });

  return sortCredentials(filtered, state.sortBy);
}

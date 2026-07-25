'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const DASHBOARD_FAVORITES_SYNC_EVENT = 'dashboard-favorites:sync';

function sanitizeFavoriteKeys(items: unknown) {
  if (!Array.isArray(items)) return [] as string[];
  return items
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 300);
}

async function fetchFavoriteKeys() {
  const response = await fetch('/api/dashboard/favorite', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    return [] as string[];
  }

  const payload = (await response.json().catch(() => null)) as {
    data?: unknown;
  } | null;
  return sanitizeFavoriteKeys(payload?.data);
}

async function persistFavoriteKey(key: string, active: boolean) {
  await fetch('/api/dashboard/favorite', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ key, active }),
  });
}

function broadcastFavoriteSync(keys: string[]) {
  window.dispatchEvent(
    new CustomEvent(DASHBOARD_FAVORITES_SYNC_EVENT, {
      detail: keys,
    }),
  );
}

export function useDashboardFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const hasLocalMutationsRef = useRef(false);
  const favoritesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    const loadFavorites = async () => {
      const keys = await fetchFavoriteKeys();
      if (cancelled) return;

      // Ignore stale hydration payloads once the user has already toggled locally.
      if (hasLocalMutationsRef.current) {
        setHydrated(true);
        return;
      }

      const next = new Set(keys);
      favoritesRef.current = next;
      setFavorites(next);
      setHydrated(true);
    };

    const handleSync = (event: Event) => {
      const payload = (event as CustomEvent<unknown>).detail;
      const keys = sanitizeFavoriteKeys(payload);
      const next = new Set(keys);
      favoritesRef.current = next;
      setFavorites(next);
      setHydrated(true);
    };

    void loadFavorites();
    window.addEventListener(DASHBOARD_FAVORITES_SYNC_EVENT, handleSync);

    return () => {
      cancelled = true;
      window.removeEventListener(DASHBOARD_FAVORITES_SYNC_EVENT, handleSync);
    };
  }, []);

  const toggleFavorite = useCallback((key: string) => {
    const normalized = String(key).trim();
    if (!normalized) return;
    hasLocalMutationsRef.current = true;

    // Allow immediate UI updates even if initial hydration request is still in flight.
    setHydrated(true);

    const next = new Set(favoritesRef.current);
    const nextActive = !next.has(normalized);

    if (!nextActive) {
      next.delete(normalized);
    } else {
      next.add(normalized);
    }

    favoritesRef.current = next;
    setFavorites(next);

    const snapshot = Array.from(next);
    broadcastFavoriteSync(snapshot);
    void persistFavoriteKey(normalized, nextActive);
  }, []);

  const isFavorite = useCallback((key: string) => favorites.has(key), [favorites]);

  const favoriteCount = useMemo(() => favorites.size, [favorites]);

  return {
    hydrated,
    isFavorite,
    toggleFavorite,
    favoriteCount,
  };
}

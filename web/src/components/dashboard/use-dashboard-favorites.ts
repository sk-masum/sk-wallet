'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

const DASHBOARD_FAVORITES_SYNC_EVENT = 'dashboard-favorites:sync'

function sanitizeFavoriteKeys(items: unknown) {
  if (!Array.isArray(items)) return [] as string[]
  return items
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 300)
}

async function fetchFavoriteKeys() {
  const response = await fetch('/api/dashboard/favorite', {
    method: 'GET',
    cache: 'no-store',
  })

  if (!response.ok) {
    return [] as string[]
  }

  const payload = (await response.json().catch(() => null)) as { data?: unknown } | null
  return sanitizeFavoriteKeys(payload?.data)
}

async function persistFavoriteKey(key: string, active: boolean) {
  await fetch('/api/dashboard/favorite', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ key, active }),
  })
}

function broadcastFavoriteSync(keys: string[]) {
  window.dispatchEvent(
    new CustomEvent(DASHBOARD_FAVORITES_SYNC_EVENT, {
      detail: keys,
    })
  )
}

export function useDashboardFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadFavorites = async () => {
      const keys = await fetchFavoriteKeys()
      if (cancelled) return

      setFavorites(new Set(keys))
      setHydrated(true)
    }

    const handleSync = (event: Event) => {
      const payload = (event as CustomEvent<unknown>).detail
      const keys = sanitizeFavoriteKeys(payload)
      setFavorites(new Set(keys))
      setHydrated(true)
    }

    void loadFavorites()
    window.addEventListener(DASHBOARD_FAVORITES_SYNC_EVENT, handleSync)

    return () => {
      cancelled = true
      window.removeEventListener(DASHBOARD_FAVORITES_SYNC_EVENT, handleSync)
    }
  }, [])

  const toggleFavorite = useCallback((key: string) => {
    const normalized = String(key).trim()
    if (!normalized) return

    setFavorites((previous) => {
      const next = new Set(previous)
      const nextActive = !next.has(normalized)

      if (!nextActive) {
        next.delete(normalized)
      } else {
        next.add(normalized)
      }

      const snapshot = Array.from(next)
      broadcastFavoriteSync(snapshot)
      void persistFavoriteKey(normalized, nextActive)

      return next
    })
  }, [])

  const isFavorite = useCallback(
    (key: string) => favorites.has(key),
    [favorites]
  )

  const favoriteCount = useMemo(() => favorites.size, [favorites])

  return {
    hydrated,
    isFavorite,
    toggleFavorite,
    favoriteCount,
  }
}

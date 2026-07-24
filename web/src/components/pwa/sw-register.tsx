'use client'

import { BellRing, Download, X } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'

type DeferredBeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type BillingReminderCard = {
  id: string | number
  card_name: string | null
  billing_date: number | null
}

const BILLING_PERMISSION_DISMISS_KEY = 'sk-wallet:billing-reminder:permission-dismissed'
const BILLING_LAST_CHECK_KEY = 'sk-wallet:billing-reminder:last-check-date'
const BILLING_NOTIFIED_PREFIX = 'sk-wallet:billing-reminder:notified:'

function getTodayKey(now = new Date()) {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getEffectiveBillingDay(rawDay: number, now = new Date()) {
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate()
  return Math.min(rawDay, lastDay)
}

function normalizeBillingCard(input: BillingReminderCard) {
  const numericDay = Number(input.billing_date)
  if (!Number.isInteger(numericDay) || numericDay < 1 || numericDay > 31) {
    return null
  }

  return {
    id: String(input.id),
    name: String(input.card_name ?? '').trim() || 'Card',
    billingDay: numericDay,
  }
}

async function checkAndNotifyBillingDueToday(force = false) {
  if (typeof window === 'undefined') return
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return
  if (Notification.permission !== 'granted') return

  const todayKey = getTodayKey()
  if (!force && localStorage.getItem(BILLING_LAST_CHECK_KEY) === todayKey) {
    return
  }

  try {
    const response = await fetch('/api/card', { cache: 'no-store' })
    const payload = (await response.json().catch(() => null)) as { data?: BillingReminderCard[] } | null

    if (!response.ok || !payload?.data || !Array.isArray(payload.data)) {
      localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey)
      return
    }

    const registration = await navigator.serviceWorker.getRegistration()
    if (!registration) {
      localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey)
      return
    }

    const todayDate = new Date().getDate()

    for (const rawCard of payload.data) {
      const card = normalizeBillingCard(rawCard)
      if (!card) continue

      const effectiveDay = getEffectiveBillingDay(card.billingDay)
      if (effectiveDay !== todayDate) continue

      const notifiedKey = `${BILLING_NOTIFIED_PREFIX}${todayKey}:${card.id}`
      if (localStorage.getItem(notifiedKey) === '1') {
        continue
      }

      await registration.showNotification('Billing date reminder', {
        body: `${card.name}: billing is due today (day ${effectiveDay}).`,
        tag: `billing-reminder-${card.id}-${todayKey}`,
        requireInteraction: false,
        data: {
          url: `/card/${card.id}`,
          cardId: card.id,
        },
      })

      localStorage.setItem(notifiedKey, '1')
    }

    localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey)
  } catch {
    localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey)
  }
}

export function ServiceWorkerRegister() {
  const [installPromptEvent, setInstallPromptEvent] = useState<DeferredBeforeInstallPrompt | null>(null)
  const [showBillingPermissionCard, setShowBillingPermissionCard] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    if (process.env.NODE_ENV !== 'production') {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .catch(() => undefined)

      if ('caches' in window) {
        void caches
          .keys()
          .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
          .catch(() => undefined)
      }

      return
    }

    let hasReloadedForUpdate = false

    const activateWaitingWorker = (registration: ServiceWorkerRegistration) => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hasReloadedForUpdate) return
      hasReloadedForUpdate = true
      showToast({
        message: 'New app version installed. Reloading...',
        variant: 'info',
        durationMs: 1800,
      })
      window.location.reload()
    })

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        activateWaitingWorker(registration)

        registration.addEventListener('updatefound', () => {
          const installing = registration.installing
          if (!installing) return

          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed') {
              activateWaitingWorker(registration)
            }
          })
        })

        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            void checkAndNotifyBillingDueToday()
          } else if (Notification.permission === 'default') {
            const dismissed = localStorage.getItem(BILLING_PERMISSION_DISMISS_KEY) === '1'
            if (!dismissed) {
              setShowBillingPermissionCard(true)
            }
          }
        }
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error)
      })

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && 'Notification' in window && Notification.permission === 'granted') {
        void checkAndNotifyBillingDueToday()
      }
    }

    window.addEventListener('focus', onVisibilityChange)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('focus', onVisibilityChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPromptEvent(event as DeferredBeforeInstallPrompt)
    }

    const onAppInstalled = () => {
      setInstallPromptEvent(null)
      showToast({
        message: 'SK Wallet installed successfully.',
        variant: 'success',
      })
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!installPromptEvent) return

    await installPromptEvent.prompt()
    const choice = await installPromptEvent.userChoice

    if (choice.outcome === 'accepted') {
      showToast({
        message: 'Installing SK Wallet...',
        variant: 'info',
      })
    }

    setInstallPromptEvent(null)
  }

  const handleEnableBillingReminders = async () => {
    if (!('Notification' in window)) return

    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      setShowBillingPermissionCard(false)
      showToast({
        message: 'Billing reminders enabled.',
        variant: 'success',
      })
      void checkAndNotifyBillingDueToday(true)
      return
    }

    if (permission === 'denied') {
      setShowBillingPermissionCard(false)
      localStorage.setItem(BILLING_PERMISSION_DISMISS_KEY, '1')
      showToast({
        message: 'Notification permission denied. You can enable it in browser settings.',
        variant: 'info',
      })
    }
  }

  const handleDismissBillingPrompt = () => {
    setShowBillingPermissionCard(false)
    localStorage.setItem(BILLING_PERMISSION_DISMISS_KEY, '1')
  }

  if (!installPromptEvent && !showBillingPermissionCard) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-110 mx-auto max-w-md">
      <div className="space-y-2">
        {showBillingPermissionCard ? (
          <div className="pointer-events-auto rounded-2xl border border-border/70 bg-card/95 p-3 shadow-xl backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Enable billing reminders</p>
                <p className="text-xs text-text-subtle">Get a push notification on your card billing date.</p>
              </div>
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 text-text-subtle hover:bg-muted/40"
                onClick={handleDismissBillingPrompt}
                aria-label="Dismiss billing reminder prompt"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-3 flex justify-end">
              <Button size="sm" type="button" onClick={handleEnableBillingReminders} className="shrink-0">
                <BellRing className="h-3.5 w-3.5" />
                Enable
              </Button>
            </div>
          </div>
        ) : null}

        {installPromptEvent ? (
          <div className="pointer-events-auto rounded-2xl border border-border/70 bg-card/95 p-3 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Install SK Wallet</p>
                <p className="text-xs text-text-subtle">Add to your home screen for app-like access and offline support.</p>
              </div>
              <Button size="sm" type="button" onClick={handleInstallClick} className="shrink-0">
                <Download className="h-3.5 w-3.5" />
                Install
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

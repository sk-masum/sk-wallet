'use client'

import { Download } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/toast'

type DeferredBeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function ServiceWorkerRegister() {
  const [installPromptEvent, setInstallPromptEvent] = useState<DeferredBeforeInstallPrompt | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
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
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error)
      })
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

  if (!installPromptEvent) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-110 mx-auto max-w-md">
      <div className="pointer-events-auto rounded-2xl border border-border/70 bg-card/95 p-3 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Install SK Wallet</p>
            <p className="text-xs text-muted-foreground">Add to your home screen for app-like access and offline support.</p>
          </div>
          <Button size="sm" type="button" onClick={handleInstallClick} className="shrink-0">
            <Download className="h-3.5 w-3.5" />
            Install
          </Button>
        </div>
      </div>
    </div>
  )
}

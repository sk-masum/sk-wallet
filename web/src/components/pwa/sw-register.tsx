'use client';

import { BellRing, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  BILLING_PERMISSION_DISMISS_KEY,
  checkAndNotifyBillingDueToday,
  clearServiceWorkerAndCachesInDev,
  hasNotificationSupport,
  hasServiceWorkerSupport,
  maybeInitializeBillingPermissionPrompt,
  runBillingCheckIfVisible,
  setupRegistrationUpdateFlow,
  warmOfflineCacheOnReconnect,
  warmOfflineDataCache,
} from '@/lib/pwa/sw-registration';
import { showToast } from '@/lib/toast';

type DeferredBeforeInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type BillingPromptCardProps = {
  onEnable: () => void;
  onDismiss: () => void;
};

type InstallPromptCardProps = {
  onInstall: () => void;
};

function PromptShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='pointer-events-auto rounded-2xl border border-border/70 bg-card/95 p-3 shadow-xl backdrop-blur-sm'>
      {children}
    </div>
  );
}

function BillingPromptCard({ onEnable, onDismiss }: BillingPromptCardProps) {
  return (
    <PromptShell>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <p className='text-sm font-semibold text-foreground'>Enable billing reminders</p>
          <p className='text-xs text-text-subtle'>
            Get a push notification on your card billing date.
          </p>
        </div>
        <button
          type='button'
          className='inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 text-text-subtle hover:bg-muted/40'
          onClick={onDismiss}
          aria-label='Dismiss billing reminder prompt'
        >
          <X className='h-3.5 w-3.5' />
        </button>
      </div>

      <div className='mt-3 flex justify-end'>
        <Button size='sm' type='button' onClick={onEnable} className='shrink-0'>
          <BellRing className='h-3.5 w-3.5' />
          Enable
        </Button>
      </div>
    </PromptShell>
  );
}

function InstallPromptCard({ onInstall }: InstallPromptCardProps) {
  return (
    <PromptShell>
      <div className='flex items-center justify-between gap-3'>
        <div className='min-w-0'>
          <p className='text-sm font-semibold text-foreground'>Install SK Wallet</p>
          <p className='text-xs text-text-subtle'>
            Add to your home screen for app-like access and offline support.
          </p>
        </div>
        <Button size='sm' type='button' onClick={onInstall} className='shrink-0'>
          <Download className='h-3.5 w-3.5' />
          Install
        </Button>
      </div>
    </PromptShell>
  );
}

function useServiceWorkerLifecycle(setShowBillingPermissionCard: (value: boolean) => void) {
  useEffect(() => {
    if (!hasServiceWorkerSupport()) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      void clearServiceWorkerAndCachesInDev();

      return;
    }

    let hasReloadedForUpdate = false;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hasReloadedForUpdate) return;
      hasReloadedForUpdate = true;
      showToast({
        message: 'New app version installed. Reloading...',
        variant: 'info',
        durationMs: 1800,
      });
      window.location.reload();
    });

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        setupRegistrationUpdateFlow(registration);
        void warmOfflineDataCache();
        maybeInitializeBillingPermissionPrompt(setShowBillingPermissionCard);
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });

    window.addEventListener('focus', runBillingCheckIfVisible);
    document.addEventListener('visibilitychange', runBillingCheckIfVisible);
    window.addEventListener('online', warmOfflineCacheOnReconnect);

    return () => {
      window.removeEventListener('focus', runBillingCheckIfVisible);
      document.removeEventListener('visibilitychange', runBillingCheckIfVisible);
      window.removeEventListener('online', warmOfflineCacheOnReconnect);
    };
  }, [setShowBillingPermissionCard]);
}

function useInstallPromptState() {
  const [installPromptEvent, setInstallPromptEvent] = useState<DeferredBeforeInstallPrompt | null>(
    null,
  );

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as DeferredBeforeInstallPrompt);
    };

    const onAppInstalled = () => {
      setInstallPromptEvent(null);
      showToast({
        message: 'SK Wallet installed successfully.',
        variant: 'success',
      });
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) return;

    await installPromptEvent.prompt();
    const choice = await installPromptEvent.userChoice;

    if (choice.outcome === 'accepted') {
      showToast({
        message: 'Installing SK Wallet...',
        variant: 'info',
      });
    }

    setInstallPromptEvent(null);
  };

  return {
    installPromptEvent,
    handleInstallClick,
  };
}

function useBillingReminderPromptState() {
  const [showBillingPermissionCard, setShowBillingPermissionCard] = useState(false);

  useServiceWorkerLifecycle(setShowBillingPermissionCard);

  const handleEnableBillingReminders = async () => {
    if (!hasNotificationSupport()) return;

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      setShowBillingPermissionCard(false);
      showToast({
        message: 'Billing reminders enabled.',
        variant: 'success',
      });
      void checkAndNotifyBillingDueToday(true);
      return;
    }

    if (permission === 'denied') {
      setShowBillingPermissionCard(false);
      localStorage.setItem(BILLING_PERMISSION_DISMISS_KEY, '1');
      showToast({
        message: 'Notification permission denied. You can enable it in browser settings.',
        variant: 'info',
      });
    }
  };

  const handleDismissBillingPrompt = () => {
    setShowBillingPermissionCard(false);
    localStorage.setItem(BILLING_PERMISSION_DISMISS_KEY, '1');
  };

  return {
    showBillingPermissionCard,
    handleEnableBillingReminders,
    handleDismissBillingPrompt,
  };
}

export function ServiceWorkerRegister() {
  const { installPromptEvent, handleInstallClick } = useInstallPromptState();
  const { showBillingPermissionCard, handleEnableBillingReminders, handleDismissBillingPrompt } =
    useBillingReminderPromptState();

  if (!installPromptEvent && !showBillingPermissionCard) {
    return null;
  }

  return (
    <div className='pointer-events-none fixed inset-x-4 bottom-4 z-110 mx-auto max-w-md'>
      <div className='space-y-2'>
        {showBillingPermissionCard ? (
          <BillingPromptCard
            onEnable={handleEnableBillingReminders}
            onDismiss={handleDismissBillingPrompt}
          />
        ) : null}

        {installPromptEvent ? <InstallPromptCard onInstall={handleInstallClick} /> : null}
      </div>
    </div>
  );
}

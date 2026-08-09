type BillingReminderCard = {
  id: string | number;
  card_name: string | null;
  billing_date: number | null;
};

type NormalizedBillingCard = {
  id: string;
  name: string;
  billingDay: number;
};

export const BILLING_PERMISSION_DISMISS_KEY = 'sk-wallet:billing-reminder:permission-dismissed';

const BILLING_LAST_CHECK_KEY = 'sk-wallet:billing-reminder:last-check-date';
const BILLING_NOTIFIED_PREFIX = 'sk-wallet:billing-reminder:notified:';
const OFFLINE_WARMUP_ENDPOINTS = [
  '/api/dashboard',
  '/api/dashboard/alerts',
  '/api/dashboard/favorite',
  '/api/card',
  '/api/credential',
  '/api/document',
];

function hasWindow() {
  return typeof window !== 'undefined';
}

export function hasServiceWorkerSupport() {
  return hasWindow() && 'serviceWorker' in navigator;
}

export function hasNotificationSupport() {
  return hasWindow() && 'Notification' in window;
}

function canUseBillingNotifications() {
  return hasNotificationSupport() && hasServiceWorkerSupport();
}

function getTodayKey(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getEffectiveBillingDay(rawDay: number, now = new Date()) {
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  return Math.min(rawDay, lastDay);
}

function normalizeBillingCard(input: BillingReminderCard) {
  const numericDay = Number(input.billing_date);
  if (!Number.isInteger(numericDay) || numericDay < 1 || numericDay > 31) {
    return null;
  }

  return {
    id: String(input.id),
    name: String(input.card_name ?? '').trim() || 'Card',
    billingDay: numericDay,
  } satisfies NormalizedBillingCard;
}

function shouldShowBillingPermissionPrompt() {
  if (!hasNotificationSupport() || Notification.permission !== 'default') {
    return false;
  }

  return localStorage.getItem(BILLING_PERMISSION_DISMISS_KEY) !== '1';
}

export async function clearServiceWorkerAndCachesInDev() {
  await navigator.serviceWorker
    .getRegistrations()
    .then((registrations) =>
      Promise.all(registrations.map((registration) => registration.unregister())),
    )
    .catch(() => undefined);

  if (!('caches' in window)) {
    return;
  }

  await caches
    .keys()
    .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    .catch(() => undefined);
}

function activateWaitingWorker(registration: ServiceWorkerRegistration) {
  if (registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
}

export function setupRegistrationUpdateFlow(registration: ServiceWorkerRegistration) {
  activateWaitingWorker(registration);

  registration.addEventListener('updatefound', () => {
    const installing = registration.installing;
    if (!installing) return;

    installing.addEventListener('statechange', () => {
      if (installing.state === 'installed') {
        activateWaitingWorker(registration);
      }
    });
  });
}

export async function warmOfflineDataCache() {
  if (!hasWindow() || !navigator.onLine) {
    return;
  }

  await Promise.allSettled(
    OFFLINE_WARMUP_ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'same-origin',
      }),
    ),
  );
}

export async function checkAndNotifyBillingDueToday(force = false) {
  if (!hasWindow()) return;
  if (!canUseBillingNotifications()) return;
  if (Notification.permission !== 'granted') return;

  const todayKey = getTodayKey();
  if (!force && localStorage.getItem(BILLING_LAST_CHECK_KEY) === todayKey) {
    return;
  }

  try {
    const response = await fetch('/api/card', { cache: 'no-store' });
    const payload = (await response.json().catch(() => null)) as {
      data?: BillingReminderCard[];
    } | null;

    if (!response.ok || !payload?.data || !Array.isArray(payload.data)) {
      localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey);
      return;
    }

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey);
      return;
    }

    const todayDate = new Date().getDate();

    for (const rawCard of payload.data) {
      const card = normalizeBillingCard(rawCard);
      if (!card) continue;

      const effectiveDay = getEffectiveBillingDay(card.billingDay);
      if (effectiveDay !== todayDate) continue;

      const notifiedKey = `${BILLING_NOTIFIED_PREFIX}${todayKey}:${card.id}`;
      if (localStorage.getItem(notifiedKey) === '1') {
        continue;
      }

      await registration.showNotification('Billing date reminder', {
        body: `${card.name}: billing is due today (day ${effectiveDay}).`,
        tag: `billing-reminder-${card.id}-${todayKey}`,
        requireInteraction: false,
        data: {
          url: `/card/${card.id}`,
          cardId: card.id,
        },
      });

      localStorage.setItem(notifiedKey, '1');
    }

    localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey);
  } catch {
    localStorage.setItem(BILLING_LAST_CHECK_KEY, todayKey);
  }
}

export function runBillingCheckIfVisible() {
  if (
    document.visibilityState === 'visible' &&
    hasNotificationSupport() &&
    Notification.permission === 'granted'
  ) {
    void checkAndNotifyBillingDueToday();
  }
}

export function warmOfflineCacheOnReconnect() {
  void warmOfflineDataCache();
}

export function maybeInitializeBillingPermissionPrompt(
  setShowBillingPermissionCard: (value: boolean) => void,
) {
  if (hasNotificationSupport() && Notification.permission === 'granted') {
    void checkAndNotifyBillingDueToday();
    return;
  }

  if (shouldShowBillingPermissionPrompt()) {
    setShowBillingPermissionCard(true);
  }
}

'use client';

import {
  CheckCircle2,
  Fingerprint,
  LoaderCircle,
  LogOut,
  PencilLine,
  Settings2,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BottomTabBar } from '@/components/ui/bottom-tab-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  BIOMETRIC_CREDENTIAL_STORAGE_KEY,
  BIOMETRIC_SESSION_UNLOCK_KEY,
  BIOMETRIC_STORAGE_KEY,
  clearBiometricVault,
  initializeBiometricVault,
  isBiometricVaultProvisioned,
  isPlatformAuthenticatorAvailable,
  lockBiometricVault,
  registerBiometricCredential,
  unlockBiometricVault,
} from '@/lib/biometric';
import { useBrowserUser, signOutBrowserSession } from '@/lib/supabase/browser-auth';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: isProfileLoading } = useBrowserUser();
  const [profile, setProfile] = useState<{ email?: string | null; name?: string | null } | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [isBiometricBusy, setIsBiometricBusy] = useState(false);
  const [biometricMessage, setBiometricMessage] = useState<string>('');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string>('');

  useEffect(() => {
    if (!isProfileLoading && user) {
      setProfile({ email: user.email, name: user.name });
    }
  }, [user, isProfileLoading]);

  useEffect(() => {
    const stored = localStorage.getItem(BIOMETRIC_STORAGE_KEY);
    setBiometricEnabled(stored === 'true');

    const checkSupport = async () => {
      try {
        const available = await isPlatformAuthenticatorAvailable();
        setBiometricSupported(available);
      } catch {
        setBiometricSupported(false);
      }
    };

    void checkSupport();
  }, []);

  const fullName = profile?.name ?? null;
  const email = profile?.email ?? null;
  const avatarUrl = null;
  const initials = (fullName ?? email ?? 'U')
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const registerBiometric = async () => {
    if (!biometricSupported) {
      setBiometricMessage('Biometric authentication is not supported on this device.');
      return false;
    }

    try {
      const credentialId = await registerBiometricCredential();
      if (!credentialId) {
        setBiometricMessage('Biometric setup was cancelled.');
        return false;
      }
      return true;
    } catch {
      setBiometricMessage('Unable to set up biometrics on this device.');
      return false;
    }
  };

  const verifyBiometric = async () => {
    if (!biometricSupported) {
      setBiometricMessage('Biometric authentication is not supported on this device.');
      return false;
    }

    const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
    if (!credentialId) {
      setBiometricMessage('No biometric credential is registered yet.');
      return false;
    }

    try {
      const verified = await unlockBiometricVault();
      if (!verified) {
        setBiometricMessage('Biometric verification was cancelled.');
        return false;
      }

      setBiometricMessage('Biometric verification successful.');
      return true;
    } catch {
      setBiometricMessage('Biometric verification failed.');
      return false;
    }
  };

  const onBiometricToggle = async (checked: boolean) => {
    setIsBiometricBusy(true);
    setBiometricMessage('');

    if (checked) {
      const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
      const registered = credentialId ? true : await registerBiometric();

      if (registered) {
        const vaultProvisioned = await isBiometricVaultProvisioned();
        if (!vaultProvisioned) {
          await initializeBiometricVault();
        }

        const unlocked = await unlockBiometricVault();
        if (!unlocked) {
          setBiometricEnabled(false);
          localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false');
          setBiometricMessage('Biometric setup requires one successful verification.');
          setIsBiometricBusy(false);
          return;
        }

        setBiometricEnabled(true);
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'true');
        setBiometricMessage('Biometric unlock enabled for this device.');
      } else {
        setBiometricEnabled(false);
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false');
      }
    } else {
      setBiometricEnabled(false);
      localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false');
      localStorage.removeItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
      sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY);
      await clearBiometricVault();
      setBiometricMessage('Biometric unlock disabled for this device.');
    }

    setIsBiometricBusy(false);
  };
  const onSignOut = async () => {
    if (isSigningOut) return;

    setSignOutError('');
    setIsSigningOut(true);

    try {
      lockBiometricVault();
      sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY);
      await signOutBrowserSession();

      router.replace('/auth');
      router.refresh();
    } catch (err) {
      setSignOutError('Unable to sign out right now. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className='relative min-h-screen overflow-hidden'>
      <div className='mx-auto w-full max-w-3xl px-4 pb-28 pt-12 sm:px-6 lg:px-8'>
        <PageHeader
          title='Settings'
          description='Manage your account preferences.'
          showBackButton
          backHref='/card'
          backButtonLabel='Back to cards'
          className='mb-6'
        />

        <div className='grid gap-6'>
          <Card className='overflow-hidden border-border/70 bg-card/90 shadow-xl backdrop-blur-sm'>
            <div className='bg-linear-to-r from-foreground via-foreground/85 to-primary px-6 py-4 text-primary-foreground'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/75'>
                    Account
                  </p>
                  <h2 className='text-lg font-semibold leading-none'>Profile</h2>
                </div>
                <Button
                  type='button'
                  variant='secondary'
                  size='icon'
                  className='h-9 w-9 rounded-full border border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25'
                  aria-label='Update profile details'
                  onClick={() => {
                    router.push('/settings/profile-update');
                  }}
                >
                  <PencilLine className='h-4 w-4' />
                </Button>
              </div>
            </div>

            <CardContent className='space-y-3 p-4 sm:p-5'>
              {isProfileLoading ? (
                <div className='flex items-center gap-4 rounded-xl border border-border/70 bg-muted/20 p-3'>
                  <Skeleton className='h-14 w-14 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-40' />
                    <Skeleton className='h-4 w-56' />
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-4 rounded-xl border border-border/70 bg-muted/25 p-3'>
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt='Profile avatar'
                      className='h-14 w-14 rounded-full border border-border object-cover'
                    />
                  ) : (
                    <div className='flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-muted-foreground'>
                      {initials}
                    </div>
                  )}
                  <div className='flex min-w-0 flex-1 items-center justify-between gap-3'>
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-semibold'>{fullName ?? 'No name set'}</p>
                      <p className='truncate text-sm text-muted-foreground'>
                        {email ?? 'No email available'}
                      </p>
                    </div>

                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='h-10 w-10 shrink-0 rounded-full shadow-lg'
                      onClick={onSignOut}
                      disabled={isSigningOut}
                      aria-label='Sign out'
                      title='Sign out'
                    >
                      {isSigningOut ? (
                        <LoaderCircle className='h-4 w-4 animate-spin' />
                      ) : (
                        <LogOut className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {signOutError ? <p className='text-xs text-destructive'>{signOutError}</p> : null}
            </CardContent>
          </Card>

          <Card className='overflow-hidden border-border/70 bg-card/90 shadow-lg backdrop-blur-sm'>
            <div className='border-b border-border/60 bg-linear-to-r from-muted/55 via-background/80 to-muted/45 px-5 py-4'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                    Personalization
                  </p>
                  <h3 className='mt-0.5 flex items-center gap-2 text-base font-semibold'>
                    <Settings2 className='h-4 w-4' />
                    Appearance
                  </h3>
                </div>
                <span className='inline-flex items-center rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground'>
                  Theme
                </span>
              </div>
            </div>

            <CardContent className='space-y-3 p-4 sm:p-5'>
              <div className='rounded-xl border border-border/70 bg-muted/20 p-3'>
                <p className='mb-2 text-xs font-medium text-muted-foreground'>
                  Choose your preferred mode
                </p>
                <ModeToggle className='w-full sm:w-fit' />
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden border-border/70 bg-card/90 shadow-lg backdrop-blur-sm'>
            <div className='border-b border-border/60 bg-linear-to-r from-muted/55 via-background/80 to-muted/45 px-5 py-4'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                    Security
                  </p>
                  <h3 className='mt-0.5 flex items-center gap-2 text-base font-semibold'>
                    <ShieldCheck className='h-4 w-4' />
                    Biometric Unlock
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    biometricSupported
                      ? 'border-emerald-400/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'border-border/70 bg-background/80 text-muted-foreground'
                  }`}
                >
                  {biometricSupported ? 'Supported' : 'Unsupported'}
                </span>
              </div>
            </div>

            <CardContent className='space-y-3 p-4 sm:p-5'>
              <label className='flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 p-3'>
                <div className='flex min-w-0 items-start gap-2.5'>
                  <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80'>
                    <Fingerprint className='h-4 w-4 text-muted-foreground' />
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Enable biometric unlock</p>
                    <p className='text-xs text-muted-foreground'>
                      Use Face ID or Touch ID when available.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={biometricEnabled}
                  disabled={isBiometricBusy || !biometricSupported}
                  onCheckedChange={(checked) => {
                    void onBiometricToggle(checked);
                  }}
                />
              </label>

              {!biometricSupported ? (
                <p className='rounded-lg border border-border/70 bg-muted/15 px-3 py-2 text-xs text-muted-foreground'>
                  Biometrics are not available on this device or browser.
                </p>
              ) : null}

              {biometricEnabled ? (
                <Button
                  type='button'
                  variant='outline'
                  className='h-10 w-full justify-center rounded-xl border-border/70 bg-background/85 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:bg-background sm:w-auto'
                  disabled={isBiometricBusy}
                  onClick={() => {
                    void verifyBiometric();
                  }}
                >
                  {isBiometricBusy ? (
                    <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <CheckCircle2 className='mr-2 h-4 w-4' />
                  )}
                  Verify biometrics
                </Button>
              ) : null}

              {biometricMessage ? (
                <p className='rounded-lg border border-border/70 bg-muted/15 px-3 py-2 text-xs text-muted-foreground'>
                  {biometricMessage}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';

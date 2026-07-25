'use client';

import { Lock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BIOMETRIC_STORAGE_KEY,
  BIOMETRIC_SESSION_UNLOCK_KEY,
  isBiometricVaultProvisioned,
  isPlatformAuthenticatorAvailable,
  lockBiometricVault,
  unlockBiometricVault,
} from '@/lib/biometric';

type BiometricGuardProps = {
  children: React.ReactNode;
};

export function BiometricGuard({ children }: BiometricGuardProps) {
  const pathname = usePathname();
  const [isLocked, setIsLocked] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState('');
  const shouldSkip = useMemo(() => pathname?.startsWith('/auth'), [pathname]);

  useEffect(() => {
    if (shouldSkip) {
      lockBiometricVault();
      setIsLocked(false);
      return;
    }

    const setup = async () => {
      const enabled = localStorage.getItem(BIOMETRIC_STORAGE_KEY) === 'true';
      if (!enabled) {
        setIsLocked(false);
        return;
      }

      const alreadyUnlockedInSession =
        sessionStorage.getItem(BIOMETRIC_SESSION_UNLOCK_KEY) === 'true';
      if (alreadyUnlockedInSession) {
        setIsLocked(false);
        return;
      }

      const supported = await isPlatformAuthenticatorAvailable();
      if (!supported) {
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false');
        sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY);
        setIsLocked(false);
        return;
      }

      const hasVaultKey = await isBiometricVaultProvisioned();
      if (!hasVaultKey) {
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false');
        sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY);
        setIsLocked(false);
        return;
      }

      setIsLocked(true);
    };

    void setup();
  }, [pathname, shouldSkip]);

  const unlock = async () => {
    setIsBusy(true);
    setMessage('');
    try {
      const ok = await unlockBiometricVault();
      if (ok) {
        setIsLocked(false);
      } else {
        setMessage('Biometric verification failed.');
      }
    } catch {
      setMessage('Biometric verification failed.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      {children}
      {!shouldSkip && isLocked ? (
        <div className='fixed inset-0 z-60 flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm'>
          <Card className='w-full max-w-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lock className='h-4 w-4' />
                Biometric Lock
              </CardTitle>
              <CardDescription>Verify with Face ID / Touch ID to continue.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                type='button'
                className='w-full'
                disabled={isBusy}
                onClick={() => {
                  void unlock();
                }}
              >
                {isBusy ? 'Verifying...' : 'Unlock with biometrics'}
              </Button>
              {message ? <p className='text-xs text-text-subtle'>{message}</p> : null}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
}

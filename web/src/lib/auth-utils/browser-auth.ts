import { signIn, signOut, useSession } from 'next-auth/react';

export function useBrowserUser() {
  const { data: session, status } = useSession();
  return {
    user: session?.user ?? null,
    isLoading: status === 'loading',
  };
}

export function signInWithEmailPassword(email: string, password: string) {
  return signIn('credentials', { email, password, redirect: false });
}

export function signUpWithEmailPassword(email: string, password: string) {
  // For sign up, you'll need a dedicated endpoint
  return fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

export function updateBrowserUser(attributes: { email?: string; password?: string }) {
  // NextAuth doesn't have built-in user update via browser
  // You'll need a dedicated endpoint
  if (attributes.email || attributes.password) {
    return fetch('/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributes),
    }).then((res) => res.json());
  }
  return Promise.resolve({});
}

export function signOutBrowserSession() {
  return signOut({ redirect: false });
}

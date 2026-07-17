import { createSupabaseBrowserClient } from '@/lib/supabase/client'

function getBrowserAuth() {
  return createSupabaseBrowserClient().auth
}

export async function getBrowserUser() {
  const {
    data: { user },
  } = await getBrowserAuth().getUser()

  return user ?? null
}

export function signInWithEmailPassword(email: string, password: string) {
  return getBrowserAuth().signInWithPassword({ email, password })
}

export function signUpWithEmailPassword(email: string, password: string) {
  return getBrowserAuth().signUp({ email, password })
}

export function updateBrowserUser(attributes: Parameters<ReturnType<typeof getBrowserAuth>['updateUser']>[0]) {
  return getBrowserAuth().updateUser(attributes)
}

export function signOutBrowserSession() {
  return getBrowserAuth().signOut({ scope: 'local' })
}

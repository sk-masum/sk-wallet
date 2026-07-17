import { cookies } from 'next/headers'

import { createClient } from '@/lib/supabase/server'

export async function getServerSupabaseUser() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return {
    supabase,
    user: user ?? null,
  }
}

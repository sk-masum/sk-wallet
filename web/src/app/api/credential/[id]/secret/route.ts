import { NextResponse } from 'next/server'

import { detokenizeCredentialSecret } from '@/lib/security/credential-token'
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth'

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  const { data, error } = await supabase
    .from('credential_record')
    .select('id, secret_token')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 })
  }

  try {
    const secret = detokenizeCredentialSecret(data.secret_token)
    return NextResponse.json({ data: { id: data.id, secret } })
  } catch {
    return NextResponse.json({ error: 'Failed to decode credential secret' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

import { detokenizeCredentialSecret } from '@/lib/security/credential-token'
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth'
import { getRequiredPrismaClient } from '@/lib/prisma'

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  const prisma = getRequiredPrismaClient()

  const data = await prisma.credential_record.findFirst({
    where: { id, user_id: user.id },
    select: { id: true, secret_token: true },
  })

  if (!data) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 })
  }

  try {
    const secret = detokenizeCredentialSecret(data.secret_token)
    return NextResponse.json({ data: { id: data.id, secret } })
  } catch {
    return NextResponse.json({ error: 'Failed to decode credential secret' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth'
import { hashCredentialSecret } from '@/lib/security/credential-hash'
import { tokenizeCredentialSecret } from '@/lib/security/credential-token'
import { isCredentialTypeCode } from '@/constants/credential/types'
import { type CredentialFormPayload, type CredentialTypeCode } from '@/models/credential'
import {
  maskCredentialSecret,
  normalizeCredentialSecret,
  validateCredentialFormFields,
} from '@/utils/credential/validation'

function toMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  return value as Record<string, unknown>
}

function normalizeText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim()
  if (!text) return ''
  return text.slice(0, maxLength)
}

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === '23505') {
    return 'A credential with the same type, service, and identifier already exists.'
  }

  return error.message
}

export async function GET(request: Request) {
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext()
  const { searchParams } = new URL(request.url)
  const requestedType = searchParams.get('type')?.trim().toUpperCase() ?? ''

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  let query = supabase
    .from('credential_record')
    .select('id, user_id, credential_type, service_name, identifier, masked_secret, secret_last4, url, notes, metadata, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (requestedType && isCredentialTypeCode(requestedType)) {
    query = query.eq('credential_type', requestedType)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: getCredentialWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [] })
}

export async function POST(request: Request) {
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  let payload: CredentialFormPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const errors = validateCredentialFormFields(payload)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors: errors }, { status: 400 })
  }

  const type = String(payload.type ?? '').trim().toUpperCase()
  if (!isCredentialTypeCode(type)) {
    return NextResponse.json({ error: 'Unsupported credential type' }, { status: 400 })
  }

  const serviceName = normalizeText(payload.serviceName, 120)
  const identifier = normalizeText(payload.identifier, 120)
  const url = normalizeText(payload.url, 400)
  const notes = normalizeText(payload.notes, 1000)
  const normalizedSecret = normalizeCredentialSecret(payload.secret ?? '')

  let tokenizedSecret = ''
  try {
    tokenizedSecret = tokenizeCredentialSecret(normalizedSecret)
  } catch {
    return NextResponse.json({ error: 'Credential tokenization is not configured correctly' }, { status: 500 })
  }

  const maskedSecret = maskCredentialSecret(normalizedSecret)
  const secretLast4 = normalizedSecret.slice(-4)
  const secretHash = hashCredentialSecret(type as CredentialTypeCode, serviceName.toLowerCase(), identifier.toLowerCase(), normalizedSecret)

  const { data, error } = await supabase
    .from('credential_record')
    .insert({
      user_id: user.id,
      credential_type: type,
      service_name: serviceName,
      identifier: identifier || null,
      secret_token: tokenizedSecret,
      secret_hash: secretHash,
      secret_last4: secretLast4,
      masked_secret: maskedSecret,
      url: url || null,
      notes: notes || null,
      metadata: toMetadata(payload.metadata),
      updated_at: new Date().toISOString(),
    })
    .select('id, user_id, credential_type, service_name, identifier, masked_secret, secret_last4, url, notes, metadata, created_at, updated_at')
    .single()

  if (error) {
    return NextResponse.json({ error: getCredentialWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}

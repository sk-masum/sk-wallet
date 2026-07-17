import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { isCredentialTypeCode } from '@/constants/credential/types'
import { createClient } from '@/lib/supabase/server'
import { hashCredentialSecret } from '@/lib/security/credential-hash'
import { tokenizeCredentialSecret } from '@/lib/security/credential-token'
import type { CredentialFormPayload, CredentialTypeCode } from '@/models/credential'
import {
  maskCredentialSecret,
  normalizeCredentialSecret,
  validateCredentialFormFields,
} from '@/utils/credential/validation'

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'PGRST116') {
    return 'Credential not found'
  }

  if (error.code === '23505') {
    return 'A credential with the same type, service, and identifier already exists.'
  }

  return error.message
}

function normalizeText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim()
  if (!text) return ''
  return text.slice(0, maxLength)
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('credential_record')
    .select('id, user_id, credential_type, service_name, identifier, masked_secret, secret_last4, url, notes, metadata, created_at, updated_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: getCredentialWriteErrorMessage(error) }, { status: 404 })
  }

  return NextResponse.json({ data })
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: CredentialFormPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const errors = validateCredentialFormFields(payload, { allowEmptySecret: true })
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors: errors }, { status: 400 })
  }

  const type = String(payload.type ?? '').trim().toUpperCase()
  if (!isCredentialTypeCode(type)) {
    return NextResponse.json({ error: 'Unsupported credential type' }, { status: 400 })
  }

  const { data: existing, error: existingError } = await supabase
    .from('credential_record')
    .select('id, secret_token, secret_hash, secret_last4, masked_secret')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (existingError || !existing) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 })
  }

  const serviceName = normalizeText(payload.serviceName, 120)
  const identifier = normalizeText(payload.identifier, 120)
  const url = normalizeText(payload.url, 400)
  const notes = normalizeText(payload.notes, 1000)
  const normalizedSecret = normalizeCredentialSecret(payload.secret ?? '')

  let secretToken = existing.secret_token
  let secretHash = existing.secret_hash
  let secretLast4 = existing.secret_last4
  let maskedSecret = existing.masked_secret

  if (normalizedSecret) {
    try {
      secretToken = tokenizeCredentialSecret(normalizedSecret)
    } catch {
      return NextResponse.json({ error: 'Credential tokenization is not configured correctly' }, { status: 500 })
    }

    secretHash = hashCredentialSecret(
      type as CredentialTypeCode,
      serviceName.toLowerCase(),
      identifier.toLowerCase(),
      normalizedSecret
    )
    secretLast4 = normalizedSecret.slice(-4)
    maskedSecret = maskCredentialSecret(normalizedSecret)
  }

  const { data, error } = await supabase
    .from('credential_record')
    .update({
      credential_type: type,
      service_name: serviceName,
      identifier: identifier || null,
      secret_token: secretToken,
      secret_hash: secretHash,
      secret_last4: secretLast4,
      masked_secret: maskedSecret,
      url: url || null,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('id, user_id, credential_type, service_name, identifier, masked_secret, secret_last4, url, notes, metadata, created_at, updated_at')
    .single()

  if (error) {
    return NextResponse.json({ error: getCredentialWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('credential_record')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: getCredentialWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

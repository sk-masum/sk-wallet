import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { isDocumentCategory } from '@/constants/document/categories'
import { detokenizeDocumentNumber } from '@/lib/security/doc-token'
import { createClient } from '@/lib/supabase/server'

type DocumentUpdatePayload = {
  category?: string
  nameOnDocument?: string
  issuedDate?: string
  expiryDate?: string
  address?: string
  guardianName?: string
  otherDetails?: string
}

function getDocumentWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'PGRST116') {
    return 'Document not found'
  }

  return error.message
}

function toMetadataObject(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return { ...(value as Record<string, unknown>) }
}

function normalizeOptionalText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim()
  if (!text) return ''
  return text.slice(0, maxLength)
}

function isValidDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime())
}

function withMetadataField(
  metadata: Record<string, unknown>,
  key: string,
  value: string
) {
  const next = { ...metadata }

  if (value) {
    next[key] = value
  } else {
    delete next[key]
  }

  return next
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
    .from('document_record')
    .select('id, user_id, document_type, document_number_token, masked_number, document_number_last4, name_on_document, category, metadata, verified_at, expires_at, created_at, updated_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: getDocumentWriteErrorMessage(error) }, { status: 404 })
  }

  let documentNumber = ''
  try {
    documentNumber = detokenizeDocumentNumber(data.document_number_token)
  } catch {
    return NextResponse.json({ error: 'Failed to decode document number' }, { status: 500 })
  }

  return NextResponse.json({
    data: {
      ...data,
      document_number: documentNumber,
      document_number_token: undefined,
    },
  })
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

  let payload: DocumentUpdatePayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { data: existing, error: existingError } = await supabase
    .from('document_record')
    .select('id, metadata')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (existingError || !existing) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  const nameOnDocument = normalizeOptionalText(payload.nameOnDocument, 120)
  const category = String(payload.category ?? '').trim().toLowerCase()
  if (category && !isDocumentCategory(category)) {
    return NextResponse.json({ error: 'Unsupported document category' }, { status: 400 })
  }
  const issuedDate = normalizeOptionalText(payload.issuedDate, 10)
  const expiryDate = normalizeOptionalText(payload.expiryDate, 10)
  if (issuedDate && !isValidDateString(issuedDate)) {
    return NextResponse.json({ error: 'Issued date must be a valid date.' }, { status: 400 })
  }
  if (expiryDate && !isValidDateString(expiryDate)) {
    return NextResponse.json({ error: 'Expiry date must be a valid date.' }, { status: 400 })
  }
  if (issuedDate && expiryDate) {
    const issuedTime = new Date(`${issuedDate}T00:00:00Z`).getTime()
    const expiryTime = new Date(`${expiryDate}T00:00:00Z`).getTime()
    if (expiryTime < issuedTime) {
      return NextResponse.json({ error: 'Expiry date cannot be earlier than issued date.' }, { status: 400 })
    }
  }
  const address = normalizeOptionalText(payload.address, 240)
  const guardianName = normalizeOptionalText(payload.guardianName, 120)
  const otherDetails = normalizeOptionalText(payload.otherDetails, 500)

  const mergedMetadata = withMetadataField(
    withMetadataField(
      withMetadataField(toMetadataObject(existing.metadata), 'address', address),
      'guardian_name',
      guardianName
    ),
    'other_details',
    otherDetails
  )

  const metadataWithDates = withMetadataField(
    withMetadataField(mergedMetadata, 'issued_date', issuedDate),
    'expiry_date',
    expiryDate
  )

  const metadata = Object.keys(metadataWithDates).length > 0 ? metadataWithDates : null

  const { data, error } = await supabase
    .from('document_record')
    .update({
      name_on_document: nameOnDocument || null,
      ...(category ? { category } : {}),
      metadata,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('id, user_id, document_type, masked_number, document_number_last4, name_on_document, category, metadata, verified_at, expires_at, created_at, updated_at')
    .single()

  if (error) {
    return NextResponse.json({ error: getDocumentWriteErrorMessage(error) }, { status: 500 })
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
    .from('document_record')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: getDocumentWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

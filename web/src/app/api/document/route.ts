import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { createClient } from '@/lib/supabase/server'
import { type DocumentFormPayload, type DocumentTypeCode } from '@/models/document'
import { hashDocumentIdentity } from '@/lib/security/doc-hash'
import { tokenizeDocumentNumber } from '@/lib/security/doc-token'
import { isDocumentCategory } from '@/constants/document/categories'
import {
  isDocumentTypeCode,
} from '@/constants/document/types'
import {
  maskDocumentNumber,
  normalizeDocumentNumber,
  validateDocumentFormFields,
} from '@/utils/document/validation'

function toMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  return value as Record<string, unknown>
}

function getDocumentWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === '23505') {
    return 'This document number is already registered.'
  }

  return error.message
}

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { searchParams } = new URL(request.url)
  const requestedType = searchParams.get('type')?.trim().toUpperCase() ?? ''

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let query = supabase
    .from('document_record')
    .select('id, user_id, document_type, masked_number, document_number_last4, name_on_document, category, metadata, verified_at, expires_at, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (requestedType && isDocumentTypeCode(requestedType)) {
    query = query.eq('document_type', requestedType)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: getDocumentWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [] })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: DocumentFormPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const errors = validateDocumentFormFields(payload)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors: errors }, { status: 400 })
  }

  const type = String(payload.type ?? '').trim().toUpperCase()
  const category = String(payload.category ?? '').trim().toLowerCase()
  if (!isDocumentTypeCode(type)) {
    return NextResponse.json({ error: 'Unsupported document type' }, { status: 400 })
  }
  if (!isDocumentCategory(category)) {
    return NextResponse.json({ error: 'Unsupported document category' }, { status: 400 })
  }

  const normalizedNumber = normalizeDocumentNumber(type, payload.number)
  const last4 = normalizedNumber.slice(-4)

  let tokenizedNumber = ''
  try {
    tokenizedNumber = tokenizeDocumentNumber(normalizedNumber)
  } catch {
    return NextResponse.json({ error: 'Document tokenization is not configured correctly' }, { status: 500 })
  }

  const documentHash = hashDocumentIdentity(type as DocumentTypeCode, normalizedNumber)
  const maskedNumber = maskDocumentNumber(type, normalizedNumber)
  const nameOnDocument = String(payload.nameOnDocument ?? '').trim()
  const issuedDate = String(payload.issuedDate ?? '').trim()
  const expiryDate = String(payload.expiryDate ?? '').trim()
  const address = String(payload.address ?? '').trim()
  const guardianName = String(payload.guardianName ?? '').trim()
  const otherDetails = String(payload.otherDetails ?? '').trim()
  const metadata = {
    ...(toMetadata(payload.metadata) ?? {}),
    ...(issuedDate ? { issued_date: issuedDate } : {}),
    ...(expiryDate ? { expiry_date: expiryDate } : {}),
    ...(address ? { address } : {}),
    ...(guardianName ? { guardian_name: guardianName } : {}),
    ...(otherDetails ? { other_details: otherDetails } : {}),
  }

  const { data, error } = await supabase
    .from('document_record')
    .upsert(
      {
        user_id: user.id,
        document_type: type,
        document_number_token: tokenizedNumber,
        document_number_last4: last4,
        document_number_hash: documentHash,
        masked_number: maskedNumber,
        name_on_document: nameOnDocument || null,
        category,
        metadata: Object.keys(metadata).length > 0 ? metadata : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,document_type' }
    )
    .select('id, document_type, masked_number, category, updated_at')
    .single()

  if (error) {
    return NextResponse.json({ error: getDocumentWriteErrorMessage(error) }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}

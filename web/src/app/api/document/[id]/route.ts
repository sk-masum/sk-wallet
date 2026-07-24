import { NextResponse } from 'next/server'
import { Prisma } from '@/generated/prisma'

import { isDocumentCategory } from '@/constants/document/categories'
import { isDocumentTypeCode } from '@/constants/document/types'
import { detokenizeDocumentNumber } from '@/lib/security/doc-token'
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth'
import { getRequiredPrismaClient } from '@/lib/prisma'
import { DocumentTypeCode } from '@/models/document'

const RESERVED_METADATA_KEYS = new Set([
  'issued_date',
  'expiry_date',
  'address',
  'guardian_name',
  'other_details',
  'other_type_label',
  'custom_fields',
])

type DocumentUpdatePayload = {
  type?: string
  category?: string
  nameOnDocument?: string
  issuedDate?: string
  expiryDate?: string
  address?: string
  guardianName?: string
  otherDetails?: string
  customFields?: Array<{
    key: string
    value: string
  }>
}

function getDocumentWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2025') {
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

function normalizeCustomFields(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      const key = String((item as { key?: unknown })?.key ?? '').trim().slice(0, 60)
      const fieldValue = String((item as { value?: unknown })?.value ?? '').trim().slice(0, 240)
      if (!key || !fieldValue) return null
      return { key, value: fieldValue }
    })
    .filter((item): item is { key: string; value: string } => Boolean(item))
    .slice(0, 12)
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
  const { user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  const prisma = getRequiredPrismaClient()

  const data = await prisma.document_record.findFirst({
    where: { id, user_id: user.id },
    select: {
      id: true,
      user_id: true,
      document_type: true,
      document_number_token: true,
      masked_number: true,
      document_number_last4: true,
      name_on_document: true,
      category: true,
      metadata: true,
      verified_at: true,
      expires_at: true,
      created_at: true,
      updated_at: true,
    },
  })

  if (!data) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
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
  const { user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  const prisma = getRequiredPrismaClient()

  let payload: DocumentUpdatePayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const existing = await prisma.document_record.findFirst({
    where: { id, user_id: user.id },
    select: { id: true, document_type: true, metadata: true },
  })

  if (!existing) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  const nameOnDocument = normalizeOptionalText(payload.nameOnDocument, 120)
  const rawCategory = String(payload.category ?? '').trim()
  const normalizedCategory = rawCategory.toLowerCase()
  if (normalizedCategory && !isDocumentCategory(normalizedCategory) && !String(payload.type ?? '').trim()) {
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
  const selectedType = String(payload.type ?? '').trim().toUpperCase()
  const existingType = String(existing.document_type ?? '').trim()

  let nextDocumentType = ''
  let nextCategory = ''
  if (selectedType) {
    if (!isDocumentTypeCode(selectedType)) {
      return NextResponse.json({ error: 'Unsupported document type' }, { status: 400 })
    }

    if (selectedType === DocumentTypeCode.OTHERS) {
      const customTypeLabel = normalizeOptionalText(rawCategory, 60)
      if (customTypeLabel.length < 2) {
        return NextResponse.json({ error: 'Please provide a custom label for Others.' }, { status: 400 })
      }
      nextDocumentType = customTypeLabel
      nextCategory = 'other'
    } else {
      if (normalizedCategory && !isDocumentCategory(normalizedCategory)) {
        return NextResponse.json({ error: 'Unsupported document category' }, { status: 400 })
      }
      nextDocumentType = selectedType
      nextCategory = normalizedCategory
    }
  } else if (normalizedCategory && isDocumentCategory(normalizedCategory)) {
    nextCategory = normalizedCategory
  } else if (rawCategory && !isDocumentTypeCode(existingType)) {
    const customTypeLabel = normalizeOptionalText(rawCategory, 60)
    if (customTypeLabel.length < 2) {
      return NextResponse.json({ error: 'Please provide a custom label for Others.' }, { status: 400 })
    }
    nextDocumentType = customTypeLabel
    nextCategory = 'other'
  }

  const hasCustomFields = Object.prototype.hasOwnProperty.call(payload, 'customFields')
  const customFields = normalizeCustomFields(payload.customFields)

  const baseMetadata = toMetadataObject(existing.metadata)
  delete baseMetadata.custom_fields

  const mergedMetadata = withMetadataField(
    withMetadataField(
      withMetadataField(baseMetadata, 'address', address),
      'guardian_name',
      guardianName
    ),
    'other_details',
    otherDetails
  )

  const metadataWithTypeLabel = withMetadataField(mergedMetadata, 'other_type_label', '')

  const metadataWithDates = withMetadataField(
    withMetadataField(metadataWithTypeLabel, 'issued_date', issuedDate),
    'expiry_date',
    expiryDate
  )

  const metadataFromCustomField = { ...metadataWithDates }
  if (hasCustomFields) {
    for (const key of Object.keys(metadataFromCustomField)) {
      if (!RESERVED_METADATA_KEYS.has(key)) {
        delete metadataFromCustomField[key]
      }
    }

    for (const item of customFields) {
      metadataFromCustomField[item.key] = item.value
    }
  }

  const metadata = Object.keys(metadataFromCustomField).length > 0 ? metadataFromCustomField : null

  try {
    const data = await prisma.document_record.update({
      where: { id },
      data: {
      ...(nextDocumentType ? { document_type: nextDocumentType } : {}),
      name_on_document: nameOnDocument || null,
      ...(nextCategory ? { category: nextCategory } : {}),
      metadata: metadata ? (metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
      select: {
        id: true,
        user_id: true,
        document_type: true,
        masked_number: true,
        document_number_last4: true,
        name_on_document: true,
        category: true,
        metadata: true,
        verified_at: true,
        expires_at: true,
        created_at: true,
        updated_at: true,
      },
    })

    if (data.user_id !== user.id) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = getDocumentWriteErrorMessage(error as { code?: string; message: string })
    const status = (error as { code?: string }).code === 'P2025' ? 404 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  const prisma = getRequiredPrismaClient()
  const existing = await prisma.document_record.findFirst({
    where: { id, user_id: user.id },
    select: { id: true },
  })

  if (!existing) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  await prisma.document_record.delete({ where: { id } })

  return NextResponse.json({ success: true })
}

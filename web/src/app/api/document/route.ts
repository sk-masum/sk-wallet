import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { getRequiredPrismaClient } from '@/lib/prisma';
import { DocumentTypeCode, type DocumentFormPayload } from '@/models/document';
import { hashDocumentIdentity } from '@/lib/security/doc-hash';
import { tokenizeDocumentNumber } from '@/lib/security/doc-token';
import { isDocumentCategory } from '@/constants/document/categories';
import { isDocumentTypeCode } from '@/constants/document/types';
import {
  maskDocumentNumber,
  normalizeDocumentNumber,
  validateDocumentFormFields,
} from '@/utils/document/validation';

function toMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function normalizeCustomFields(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const key = String((item as { key?: unknown })?.key ?? '')
        .trim()
        .slice(0, 60);
      const fieldValue = String((item as { value?: unknown })?.value ?? '')
        .trim()
        .slice(0, 240);
      if (!key || !fieldValue) return null;
      return { key, value: fieldValue };
    })
    .filter((item): item is { key: string; value: string } => Boolean(item))
    .slice(0, 12);
}

function getDocumentWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2002') {
    return 'This document number is already registered.';
  }

  return error.message;
}

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();

  const data = await prisma.document_record.findMany({
    where: {
      user_id: user.id,
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
  });

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();

  let payload: DocumentFormPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const errors = validateDocumentFormFields(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors: errors }, { status: 400 });
  }

  const type = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  const rawCategory = String(payload.category ?? '').trim();
  if (!isDocumentTypeCode(type)) {
    return NextResponse.json({ error: 'Unsupported document type' }, { status: 400 });
  }
  if (type !== DocumentTypeCode.OTHERS && !isDocumentCategory(rawCategory.toLowerCase())) {
    return NextResponse.json({ error: 'Unsupported document category' }, { status: 400 });
  }

  const normalizedNumber = normalizeDocumentNumber(type, payload.number);
  const last4 = normalizedNumber.slice(-4);

  let tokenizedNumber = '';
  try {
    tokenizedNumber = tokenizeDocumentNumber(normalizedNumber);
  } catch {
    return NextResponse.json(
      { error: 'Document tokenization is not configured correctly' },
      { status: 500 },
    );
  }

  const customTypeLabel = rawCategory.slice(0, 60);
  const storedType = type === DocumentTypeCode.OTHERS ? customTypeLabel : type;
  const storedCategory = type === DocumentTypeCode.OTHERS ? 'other' : rawCategory.toLowerCase();

  if (type === DocumentTypeCode.OTHERS && storedType.length < 2) {
    return NextResponse.json(
      { error: 'Please provide a custom label for Others.' },
      { status: 400 },
    );
  }

  const documentHash = hashDocumentIdentity(storedType, normalizedNumber);
  const maskedNumber = maskDocumentNumber(type, normalizedNumber);
  const nameOnDocument = String(payload.nameOnDocument ?? '').trim();
  const issuedDate = String(payload.issuedDate ?? '').trim();
  const expiryDate = String(payload.expiryDate ?? '').trim();
  const address = String(payload.address ?? '').trim();
  const guardianName = String(payload.guardianName ?? '').trim();
  const otherDetails = String(payload.otherDetails ?? '').trim();
  const customFields = normalizeCustomFields(payload.customFields);
  const baseMetadata = { ...(toMetadata(payload.metadata) ?? {}) };
  delete baseMetadata.custom_fields;
  const customFieldMetadata = Object.fromEntries(
    customFields.map((item) => [item.key, item.value]),
  );
  const metadata = {
    ...baseMetadata,
    ...(issuedDate ? { issued_date: issuedDate } : {}),
    ...(expiryDate ? { expiry_date: expiryDate } : {}),
    ...(address ? { address } : {}),
    ...(guardianName ? { guardian_name: guardianName } : {}),
    ...(otherDetails ? { other_details: otherDetails } : {}),
    ...customFieldMetadata,
  };

  try {
    const data = await prisma.document_record.create({
      data: {
        user_id: user.id,
        document_type: storedType,
        document_number_token: tokenizedNumber,
        document_number_last4: last4,
        document_number_hash: documentHash,
        masked_number: maskedNumber,
        name_on_document: nameOnDocument || null,
        category: storedCategory,
        metadata:
          Object.keys(metadata).length > 0 ? (metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
      select: {
        id: true,
        document_type: true,
        masked_number: true,
        category: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = getDocumentWriteErrorMessage(error as { code?: string; message: string });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  badRequestResponse,
  deleteOwnedEntityById,
  ownedEntityNotFoundResponse,
  parseJsonBody,
  resolveOwnedRouteContext,
  serverErrorResponse,
} from '@/app/api/shared/owned-route';
import {
  normalizeCustomFields,
  normalizeTrimmedText,
  toMutableMetadataRecord,
} from '@/app/api/shared/payload-utils';
import { documentDetailSelectWithToken, documentListSelect } from '@/app/api/document/shared';
import { isDocumentCategory } from '@/constants/document/categories';
import { isDocumentTypeCode } from '@/constants/document/types';
import { detokenizeDocumentNumber } from '@/lib/security/doc-token';
import { DocumentTypeCode } from '@/models/document';

const RESERVED_METADATA_KEYS = new Set([
  'issued_date',
  'expiry_date',
  'address',
  'guardian_name',
  'other_details',
  'other_type_label',
  'custom_fields',
]);

type DocumentUpdatePayload = {
  type?: string;
  category?: string;
  nameOnDocument?: string;
  issuedDate?: string;
  expiryDate?: string;
  address?: string;
  guardianName?: string;
  otherDetails?: string;
  customFields?: Array<{
    key: string;
    value: string;
  }>;
};

function getDocumentWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2025') {
    return 'Document not found';
  }

  return error.message;
}

function isValidDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

function withMetadataField(metadata: Record<string, unknown>, key: string, value: string) {
  const next = { ...metadata };

  if (value) {
    next[key] = value;
  } else {
    delete next[key];
  }

  return next;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

  const data = await prisma.document_record.findFirst({
    where: { id, user_id: userId },
    select: documentDetailSelectWithToken,
  });

  if (!data) {
    return ownedEntityNotFoundResponse('Document');
  }

  let documentNumber = '';
  try {
    documentNumber = detokenizeDocumentNumber(data.document_number_token);
  } catch {
    return serverErrorResponse('Failed to decode document number');
  }

  return NextResponse.json({
    data: {
      ...data,
      document_number: documentNumber,
      document_number_token: undefined,
    },
  });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<DocumentUpdatePayload>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  const existing = await prisma.document_record.findFirst({
    where: { id, user_id: userId },
    select: { id: true, document_type: true, metadata: true },
  });

  if (!existing) {
    return ownedEntityNotFoundResponse('Document');
  }

  const nameOnDocument = normalizeTrimmedText(payload.nameOnDocument, 120);
  const rawCategory = String(payload.category ?? '').trim();
  const normalizedCategory = rawCategory.toLowerCase();
  if (
    normalizedCategory &&
    !isDocumentCategory(normalizedCategory) &&
    !String(payload.type ?? '').trim()
  ) {
    return badRequestResponse('Unsupported document category');
  }
  const issuedDate = normalizeTrimmedText(payload.issuedDate, 10);
  const expiryDate = normalizeTrimmedText(payload.expiryDate, 10);
  if (issuedDate && !isValidDateString(issuedDate)) {
    return badRequestResponse('Issued date must be a valid date.');
  }
  if (expiryDate && !isValidDateString(expiryDate)) {
    return badRequestResponse('Expiry date must be a valid date.');
  }
  if (issuedDate && expiryDate) {
    const issuedTime = new Date(`${issuedDate}T00:00:00Z`).getTime();
    const expiryTime = new Date(`${expiryDate}T00:00:00Z`).getTime();
    if (expiryTime < issuedTime) {
      return badRequestResponse('Expiry date cannot be earlier than issued date.');
    }
  }
  const address = normalizeTrimmedText(payload.address, 240);
  const guardianName = normalizeTrimmedText(payload.guardianName, 120);
  const otherDetails = normalizeTrimmedText(payload.otherDetails, 500);
  const selectedType = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  const existingType = String(existing.document_type ?? '').trim();

  let nextDocumentType = '';
  let nextCategory = '';
  if (selectedType) {
    if (!isDocumentTypeCode(selectedType)) {
      return badRequestResponse('Unsupported document type');
    }

    if (selectedType === DocumentTypeCode.OTHERS) {
      const customTypeLabel = normalizeTrimmedText(rawCategory, 60);
      if (customTypeLabel.length < 2) {
        return badRequestResponse('Please provide a custom label for Others.');
      }
      nextDocumentType = customTypeLabel;
      nextCategory = 'other';
    } else {
      if (normalizedCategory && !isDocumentCategory(normalizedCategory)) {
        return badRequestResponse('Unsupported document category');
      }
      nextDocumentType = selectedType;
      nextCategory = normalizedCategory;
    }
  } else if (normalizedCategory && isDocumentCategory(normalizedCategory)) {
    nextCategory = normalizedCategory;
  } else if (rawCategory && !isDocumentTypeCode(existingType)) {
    const customTypeLabel = normalizeTrimmedText(rawCategory, 60);
    if (customTypeLabel.length < 2) {
      return badRequestResponse('Please provide a custom label for Others.');
    }
    nextDocumentType = customTypeLabel;
    nextCategory = 'other';
  }

  const hasCustomFields = Object.prototype.hasOwnProperty.call(payload, 'customFields');
  const customFields = normalizeCustomFields(payload.customFields);

  const baseMetadata = toMutableMetadataRecord(existing.metadata);
  delete baseMetadata.custom_fields;

  const mergedMetadata = withMetadataField(
    withMetadataField(
      withMetadataField(baseMetadata, 'address', address),
      'guardian_name',
      guardianName,
    ),
    'other_details',
    otherDetails,
  );

  const metadataWithTypeLabel = withMetadataField(mergedMetadata, 'other_type_label', '');

  const metadataWithDates = withMetadataField(
    withMetadataField(metadataWithTypeLabel, 'issued_date', issuedDate),
    'expiry_date',
    expiryDate,
  );

  const metadataFromCustomField = { ...metadataWithDates };
  if (hasCustomFields) {
    for (const key of Object.keys(metadataFromCustomField)) {
      if (!RESERVED_METADATA_KEYS.has(key)) {
        delete metadataFromCustomField[key];
      }
    }

    for (const item of customFields) {
      metadataFromCustomField[item.key] = item.value;
    }
  }

  const metadata = Object.keys(metadataFromCustomField).length > 0 ? metadataFromCustomField : null;

  try {
    const data = await prisma.document_record.update({
      where: { id },
      data: {
        ...(nextDocumentType ? { document_type: nextDocumentType } : {}),
        name_on_document: nameOnDocument || null,
        ...(nextCategory ? { category: nextCategory } : {}),
        metadata: metadata ? (metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
      select: documentListSelect,
    });

    if (data.user_id !== userId) {
      return ownedEntityNotFoundResponse('Document');
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = getDocumentWriteErrorMessage(error as { code?: string; message: string });
    const status = (error as { code?: string }).code === 'P2025' ? 404 : 500;
    return apiErrorResponse(message, status);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

  return deleteOwnedEntityById({
    id,
    userId,
    entityLabel: 'Document',
    findOwnedById: (recordId, ownerId) =>
      prisma.document_record.findFirst({
        where: { id: recordId, user_id: ownerId },
        select: { id: true },
      }),
    deleteById: (recordId) =>
      prisma.document_record.delete({ where: { id: recordId } }).then(() => undefined),
  });
}

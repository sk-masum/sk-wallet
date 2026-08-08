import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  badRequestResponse,
  parseJsonBody,
  resolveUserRouteContext,
  serverErrorResponse,
  validationFailedResponse,
} from '@/app/api/shared/owned-route';
import {
  normalizeCustomFields,
  normalizeTrimmedText,
  toMutableMetadataRecord,
} from '@/app/api/shared/payload-utils';
import { documentListSelect } from '@/app/api/document/shared';
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

function getDocumentWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2002') {
    return 'This document number is already registered.';
  }

  return error.message;
}

export async function GET() {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const data = await prisma.document_record.findMany({
    where: {
      user_id: userId,
    },
    select: documentListSelect,
  });

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<DocumentFormPayload>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  const errors = validateDocumentFormFields(payload);
  if (Object.keys(errors).length > 0) {
    return validationFailedResponse(errors);
  }

  const type = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  const rawCategory = normalizeTrimmedText(payload.category, 120);
  if (!isDocumentTypeCode(type)) {
    return badRequestResponse('Unsupported document type');
  }
  if (type !== DocumentTypeCode.OTHERS && !isDocumentCategory(rawCategory.toLowerCase())) {
    return badRequestResponse('Unsupported document category');
  }

  const normalizedNumber = normalizeDocumentNumber(type, payload.number);
  const last4 = normalizedNumber.slice(-4);

  let tokenizedNumber = '';
  try {
    tokenizedNumber = tokenizeDocumentNumber(normalizedNumber);
  } catch {
    return serverErrorResponse('Document tokenization is not configured correctly');
  }

  const customTypeLabel = rawCategory.slice(0, 60);
  const storedType = type === DocumentTypeCode.OTHERS ? customTypeLabel : type;
  const storedCategory = type === DocumentTypeCode.OTHERS ? 'other' : rawCategory.toLowerCase();

  if (type === DocumentTypeCode.OTHERS && storedType.length < 2) {
    return badRequestResponse('Please provide a custom label for Others.');
  }

  const documentHash = hashDocumentIdentity(storedType, normalizedNumber);
  const maskedNumber = maskDocumentNumber(type, normalizedNumber);
  const nameOnDocument = normalizeTrimmedText(payload.nameOnDocument, 120);
  const issuedDate = normalizeTrimmedText(payload.issuedDate, 10);
  const expiryDate = normalizeTrimmedText(payload.expiryDate, 10);
  const address = normalizeTrimmedText(payload.address, 240);
  const guardianName = normalizeTrimmedText(payload.guardianName, 120);
  const otherDetails = normalizeTrimmedText(payload.otherDetails, 500);
  const customFields = normalizeCustomFields(payload.customFields);
  const baseMetadata = toMutableMetadataRecord(payload.metadata);
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
        user_id: userId,
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
    return apiErrorResponse(message, 500);
  }
}

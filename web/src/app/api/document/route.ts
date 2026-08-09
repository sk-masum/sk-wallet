import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  badRequestResponse,
  parseJsonBody,
  serverErrorResponse,
  validationFailedResponse,
  withUserRouteContext,
} from '@/app/api/shared/owned-route';
import {
  buildDocumentMetadataForCreate,
  documentListSelect,
  getInvalidDocumentDateMessage,
  normalizeDocumentMutableFields,
} from '@/app/api/document/shared';
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
  return withUserRouteContext(async ({ userId, prisma }) => {
    const data = await prisma.document_record.findMany({
      where: {
        user_id: userId,
      },
      select: documentListSelect,
    });

    return NextResponse.json({ data: data ?? [] });
  });
}

export async function POST(request: Request) {
  return withUserRouteContext(async ({ userId, prisma }) => {
    const payloadOrResponse = await parseJsonBody<DocumentFormPayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const errors = validateDocumentFormFields(payload);
    if (Object.keys(errors).length > 0) {
      return validationFailedResponse(errors);
    }

    const normalizedInput = normalizeDocumentMutableFields(payload, { categoryMaxLength: 120 });
    const type = normalizedInput.selectedType;

    if (!isDocumentTypeCode(type)) {
      return badRequestResponse('Unsupported document type');
    }
    if (
      type !== DocumentTypeCode.OTHERS &&
      !isDocumentCategory(normalizedInput.normalizedCategory)
    ) {
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

    const customTypeLabel = normalizedInput.rawCategory.slice(0, 60);
    const storedType = type === DocumentTypeCode.OTHERS ? customTypeLabel : type;
    const storedCategory =
      type === DocumentTypeCode.OTHERS ? 'other' : normalizedInput.normalizedCategory;

    if (type === DocumentTypeCode.OTHERS && storedType.length < 2) {
      return badRequestResponse('Please provide a custom label for Others.');
    }

    const invalidDateMessage = getInvalidDocumentDateMessage(
      normalizedInput.issuedDate,
      normalizedInput.expiryDate,
    );
    if (invalidDateMessage) {
      return badRequestResponse(invalidDateMessage);
    }

    const documentHash = hashDocumentIdentity(storedType, normalizedNumber);
    const maskedNumber = maskDocumentNumber(type, normalizedNumber);
    const metadata = buildDocumentMetadataForCreate(payload.metadata, normalizedInput);

    try {
      const data = await prisma.document_record.create({
        data: {
          user_id: userId,
          document_type: storedType,
          document_number_token: tokenizedNumber,
          document_number_last4: last4,
          document_number_hash: documentHash,
          masked_number: maskedNumber,
          name_on_document: normalizedInput.nameOnDocument || null,
          category: storedCategory,
          metadata:
            Object.keys(metadata).length > 0
              ? (metadata as Prisma.InputJsonValue)
              : Prisma.JsonNull,
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
  });
}

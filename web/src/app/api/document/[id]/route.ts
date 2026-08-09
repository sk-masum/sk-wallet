import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  badRequestResponse,
  deleteOwnedEntityById,
  ownedEntityNotFoundResponse,
  parseJsonBody,
  serverErrorResponse,
  withOwnedRouteContext,
} from '@/app/api/shared/owned-route';
import {
  buildDocumentMetadataForUpdate,
  documentDetailSelectWithToken,
  documentListSelect,
  getInvalidDocumentDateMessage,
  normalizeDocumentMutableFields,
} from '@/app/api/document/shared';
import { isDocumentCategory } from '@/constants/document/categories';
import { isDocumentTypeCode } from '@/constants/document/types';
import { detokenizeDocumentNumber } from '@/lib/security/doc-token';
import { DocumentTypeCode } from '@/models/document';

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

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
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
  });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
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

    const normalizedInput = normalizeDocumentMutableFields(payload);

    if (
      normalizedInput.normalizedCategory &&
      !isDocumentCategory(normalizedInput.normalizedCategory) &&
      !normalizedInput.selectedType
    ) {
      return badRequestResponse('Unsupported document category');
    }

    const invalidDateMessage = getInvalidDocumentDateMessage(
      normalizedInput.issuedDate,
      normalizedInput.expiryDate,
    );
    if (invalidDateMessage) {
      return badRequestResponse(invalidDateMessage);
    }

    const existingType = String(existing.document_type ?? '').trim();

    let nextDocumentType = '';
    let nextCategory = '';
    if (normalizedInput.selectedType) {
      if (!isDocumentTypeCode(normalizedInput.selectedType)) {
        return badRequestResponse('Unsupported document type');
      }

      if (normalizedInput.selectedType === DocumentTypeCode.OTHERS) {
        const customTypeLabel = normalizedInput.rawCategory.slice(0, 60);
        if (customTypeLabel.length < 2) {
          return badRequestResponse('Please provide a custom label for Others.');
        }
        nextDocumentType = customTypeLabel;
        nextCategory = 'other';
      } else {
        if (
          normalizedInput.normalizedCategory &&
          !isDocumentCategory(normalizedInput.normalizedCategory)
        ) {
          return badRequestResponse('Unsupported document category');
        }
        nextDocumentType = normalizedInput.selectedType;
        nextCategory = normalizedInput.normalizedCategory;
      }
    } else if (
      normalizedInput.normalizedCategory &&
      isDocumentCategory(normalizedInput.normalizedCategory)
    ) {
      nextCategory = normalizedInput.normalizedCategory;
    } else if (normalizedInput.rawCategory && !isDocumentTypeCode(existingType)) {
      const customTypeLabel = normalizedInput.rawCategory.slice(0, 60);
      if (customTypeLabel.length < 2) {
        return badRequestResponse('Please provide a custom label for Others.');
      }
      nextDocumentType = customTypeLabel;
      nextCategory = 'other';
    }

    const metadata = buildDocumentMetadataForUpdate(existing.metadata, normalizedInput);

    try {
      const data = await prisma.document_record.update({
        where: { id },
        data: {
          ...(nextDocumentType ? { document_type: nextDocumentType } : {}),
          name_on_document: normalizedInput.nameOnDocument || null,
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
  });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
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
  });
}

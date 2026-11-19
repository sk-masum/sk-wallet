import { NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { document_record } from '@/db/schema';

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

function getDocumentWriteErrorMessage(error: Error | { message: string }) {
  const message = error.message || String(error);
  if (message.includes('no rows') || message.includes('not found')) {
    return 'Document not found';
  }

  return message;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
    const data = await db
      .select({
        id: document_record.id,
        user_id: document_record.user_id,
        document_type: document_record.document_type,
        masked_number: document_record.masked_number,
        document_number_last4: document_record.document_number_last4,
        name_on_document: document_record.name_on_document,
        category: document_record.category,
        metadata: document_record.metadata,
        verified_at: document_record.verified_at,
        expires_at: document_record.expires_at,
        created_at: document_record.created_at,
        updated_at: document_record.updated_at,
        document_number_token: document_record.document_number_token,
      })
      .from(document_record)
      .where(and(eq(document_record.id, id), eq(document_record.user_id, userId)))
      .limit(1);

    if (!data || data.length === 0) {
      return ownedEntityNotFoundResponse('Document');
    }

    let documentNumber = '';
    try {
      documentNumber = detokenizeDocumentNumber(data[0].document_number_token);
    } catch {
      return serverErrorResponse('Failed to decode document number');
    }

    return NextResponse.json({
      data: {
        ...data[0],
        document_number: documentNumber,
        document_number_token: undefined,
      },
    });
  });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
    const payloadOrResponse = await parseJsonBody<DocumentUpdatePayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const existing = await db
      .select({
        id: document_record.id,
        document_type: document_record.document_type,
        metadata: document_record.metadata,
      })
      .from(document_record)
      .where(and(eq(document_record.id, id), eq(document_record.user_id, userId)))
      .limit(1);

    if (!existing || existing.length === 0) {
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

    const existingType = String(existing[0].document_type ?? '').trim();

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

    const metadata = buildDocumentMetadataForUpdate(existing[0].metadata, normalizedInput);

    try {
      const data = await db
        .update(document_record)
        .set({
          ...(nextDocumentType ? { document_type: nextDocumentType } : {}),
          name_on_document: normalizedInput.nameOnDocument || null,
          ...(nextCategory ? { category: nextCategory } : {}),
          metadata: metadata ? JSON.stringify(metadata) : null,
        })
        .where(eq(document_record.id, id))
        .returning({
          id: document_record.id,
          user_id: document_record.user_id,
          document_type: document_record.document_type,
          masked_number: document_record.masked_number,
          document_number_last4: document_record.document_number_last4,
          name_on_document: document_record.name_on_document,
          category: document_record.category,
          metadata: document_record.metadata,
          verified_at: document_record.verified_at,
          expires_at: document_record.expires_at,
          created_at: document_record.created_at,
          updated_at: document_record.updated_at,
        });

      if (!data || data.length === 0) {
        return ownedEntityNotFoundResponse('Document');
      }

      if (data[0].user_id !== userId) {
        return ownedEntityNotFoundResponse('Document');
      }

      return NextResponse.json({ success: true, data: data[0] });
    } catch (error) {
      const message = getDocumentWriteErrorMessage(error as Error);
      const status = message.includes('not found') ? 404 : 500;
      return apiErrorResponse(message, status);
    }
  });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
    return deleteOwnedEntityById({
      id,
      userId,
      entityLabel: 'Document',
      findOwnedById: (recordId, ownerId) =>
        db
          .select({ id: document_record.id })
          .from(document_record)
          .where(and(eq(document_record.id, recordId), eq(document_record.user_id, ownerId)))
          .limit(1)
          .then((data) => (data.length > 0 ? data[0] : null)),
      deleteById: (recordId) =>
        db
          .delete(document_record)
          .where(eq(document_record.id, recordId))
          .then(() => undefined),
    });
  });
}

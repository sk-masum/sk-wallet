import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { getRequiredPrismaClient } from '@/lib/prisma';
import { hashCredentialSecret } from '@/lib/security/credential-hash';
import { tokenizeCredentialSecret } from '@/lib/security/credential-token';
import { isCredentialTypeCode } from '@/constants/credential/types';
import { type CredentialFormPayload, type CredentialTypeCode } from '@/models/credential';
import {
  maskCredentialSecret,
  normalizeCredentialSecret,
  validateCredentialFormFields,
} from '@/utils/credential/validation';

function toMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function normalizeText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  return text.slice(0, maxLength);
}

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2002') {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return error.message;
}

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();

  const data = await prisma.credential_record.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      id: true,
      user_id: true,
      credential_type: true,
      service_name: true,
      identifier: true,
      masked_secret: true,
      secret_last4: true,
      url: true,
      notes: true,
      metadata: true,
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

  let payload: CredentialFormPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const errors = validateCredentialFormFields(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors: errors }, { status: 400 });
  }

  const type = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  if (!isCredentialTypeCode(type)) {
    return NextResponse.json({ error: 'Unsupported credential type' }, { status: 400 });
  }

  const serviceName = normalizeText(payload.serviceName, 120);
  const identifier = normalizeText(payload.identifier, 120);
  const url = normalizeText(payload.url, 400);
  const notes = normalizeText(payload.notes, 1000);
  const normalizedSecret = normalizeCredentialSecret(payload.secret ?? '');

  let tokenizedSecret = '';
  try {
    tokenizedSecret = tokenizeCredentialSecret(normalizedSecret);
  } catch {
    return NextResponse.json(
      { error: 'Credential tokenization is not configured correctly' },
      { status: 500 },
    );
  }

  const maskedSecret = maskCredentialSecret(normalizedSecret);
  const secretLast4 = normalizedSecret.slice(-4);
  const secretHash = hashCredentialSecret(
    type as CredentialTypeCode,
    serviceName.toLowerCase(),
    identifier.toLowerCase(),
    normalizedSecret,
  );

  try {
    const data = await prisma.credential_record.create({
      data: {
        user_id: user.id,
        credential_type: type,
        service_name: serviceName,
        identifier: identifier || null,
        secret_token: tokenizedSecret,
        secret_hash: secretHash,
        secret_last4: secretLast4,
        masked_secret: maskedSecret,
        url: url || null,
        notes: notes || null,
        metadata: toMetadata(payload.metadata)
          ? (toMetadata(payload.metadata) as Prisma.InputJsonValue)
          : Prisma.JsonNull,
      },
      select: {
        id: true,
        user_id: true,
        credential_type: true,
        service_name: true,
        identifier: true,
        masked_secret: true,
        secret_last4: true,
        url: true,
        notes: true,
        metadata: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = getCredentialWriteErrorMessage(error as { code?: string; message: string });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

import { isCredentialTypeCode } from '@/constants/credential/types';
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { getRequiredPrismaClient } from '@/lib/prisma';
import { hashCredentialSecret } from '@/lib/security/credential-hash';
import { tokenizeCredentialSecret } from '@/lib/security/credential-token';
import type { CredentialFormPayload, CredentialTypeCode } from '@/models/credential';
import {
  maskCredentialSecret,
  normalizeCredentialSecret,
  validateCredentialFormFields,
} from '@/utils/credential/validation';

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2025') {
    return 'Credential not found';
  }

  if (error.code === 'P2002') {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return error.message;
}

function normalizeText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  return text.slice(0, maxLength);
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();

  const data = await prisma.credential_record.findFirst({
    where: { id, user_id: user.id },
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

  if (!data) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
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

  const errors = validateCredentialFormFields(payload, { allowEmptySecret: true });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors: errors }, { status: 400 });
  }

  const type = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  if (!isCredentialTypeCode(type)) {
    return NextResponse.json({ error: 'Unsupported credential type' }, { status: 400 });
  }

  const existing = await prisma.credential_record.findFirst({
    where: { id, user_id: user.id },
    select: {
      id: true,
      secret_token: true,
      secret_hash: true,
      secret_last4: true,
      masked_secret: true,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 });
  }

  const serviceName = normalizeText(payload.serviceName, 120);
  const identifier = normalizeText(payload.identifier, 120);
  const url = normalizeText(payload.url, 400);
  const notes = normalizeText(payload.notes, 1000);
  const normalizedSecret = normalizeCredentialSecret(payload.secret ?? '');

  let secretToken = existing.secret_token;
  let secretHash = existing.secret_hash;
  let secretLast4 = existing.secret_last4;
  let maskedSecret = existing.masked_secret;

  if (normalizedSecret) {
    try {
      secretToken = tokenizeCredentialSecret(normalizedSecret);
    } catch {
      return NextResponse.json(
        { error: 'Credential tokenization is not configured correctly' },
        { status: 500 },
      );
    }

    secretHash = hashCredentialSecret(
      type as CredentialTypeCode,
      serviceName.toLowerCase(),
      identifier.toLowerCase(),
      normalizedSecret,
    );
    secretLast4 = normalizedSecret.slice(-4);
    maskedSecret = maskCredentialSecret(normalizedSecret);
  }

  try {
    const data = await prisma.credential_record.update({
      where: { id },
      data: {
        credential_type: type,
        service_name: serviceName,
        identifier: identifier || null,
        secret_token: secretToken,
        secret_hash: secretHash,
        secret_last4: secretLast4,
        masked_secret: maskedSecret,
        url: url || null,
        notes: notes || null,
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

    if (data.user_id !== user.id) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = getCredentialWriteErrorMessage(error as { code?: string; message: string });
    const status = (error as { code?: string }).code === 'P2025' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();
  const existing = await prisma.credential_record.findFirst({
    where: { id, user_id: user.id },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Credential not found' }, { status: 404 });
  }

  await prisma.credential_record.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

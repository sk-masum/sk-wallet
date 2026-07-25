import { NextResponse } from 'next/server';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { getRequiredPrismaClient } from '@/lib/prisma';
import { isCardStatus } from '@/constants/card/status';
import {
  detokenizeCardCvv,
  detokenizeCardNumber,
  tokenizeCardCvv,
  tokenizeCardNumber,
} from '@/lib/security/card-token';

function toSafeNumber(value: bigint | number | null | undefined) {
  if (value === null || value === undefined) return null;
  return typeof value === 'bigint' ? Number(value) : value;
}

function decodeCardFieldOrEmpty(value: string) {
  try {
    return detokenizeCardNumber(value);
  } catch {
    return '';
  }
}

function decodeCvvFieldOrEmpty(value: string) {
  try {
    return detokenizeCardCvv(value);
  } catch {
    return '';
  }
}

async function resolveOrCreateProvider(
  prisma: ReturnType<typeof getRequiredPrismaClient>,
  rawProvider?: string | null,
) {
  const provider = String(rawProvider ?? '')
    .trim()
    .replace(/\s+/g, ' ');

  if (!provider) {
    return {
      provider,
      providerId: null as bigint | null,
      error: null as string | null,
    };
  }

  const existingProvider = await prisma.card_provider.findFirst({
    where: {
      name: {
        equals: provider,
        mode: 'insensitive',
      },
    },
    select: { id: true, name: true },
  });

  if (existingProvider) {
    return {
      provider: existingProvider.name,
      providerId: existingProvider.id,
      error: null,
    };
  }

  try {
    const createdProvider = await prisma.card_provider.create({
      data: { name: provider },
      select: { id: true, name: true },
    });

    return {
      provider: createdProvider.name,
      providerId: createdProvider.id,
      error: null,
    };
  } catch {
    const resolvedProvider = await prisma.card_provider.findFirst({
      where: {
        name: {
          equals: provider,
          mode: 'insensitive',
        },
      },
      select: { id: true, name: true },
    });

    if (!resolvedProvider) {
      return {
        provider,
        providerId: null,
        error: 'Failed to resolve provider after create',
      };
    }

    return {
      provider: resolvedProvider.name,
      providerId: resolvedProvider.id,
      error: null,
    };
  }
}

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let cardId: bigint;

  try {
    cardId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  const prisma = getRequiredPrismaClient();

  const data = await prisma.card.findFirst({
    where: { id: cardId, owner_id: user.id },
    include: {
      card_provider: {
        select: { name: true },
      },
    },
  });

  if (!data) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      ...data,
      id: toSafeNumber(data.id),
      provider_id: toSafeNumber(data.provider_id),
      provider: data.card_provider?.name ?? null,
      credit_limit: data.credit_limit ? data.credit_limit.toNumber() : null,
      number: decodeCardFieldOrEmpty(data.number),
      cvv: decodeCvvFieldOrEmpty(data.cvv),
      card_provider: undefined,
    },
  });
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let cardId: bigint;

  try {
    cardId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  const prisma = getRequiredPrismaClient();

  const existingCard = await prisma.card.findFirst({
    where: { id: cardId, owner_id: user.id },
    select: { id: true },
  });

  if (!existingCard) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  let payload: {
    color_name?: string;
    status?: string;
    tags?: string[];
    card_name?: string;
    provider?: string | null;
    credit_limit?: number | null;
    billing_date?: number | null;
    payment_date?: number | null;
    number?: string;
    holder_name?: string;
    expiry_month?: number | null;
    expiry_year?: number;
    cvv?: string;
    network?: number;
    isCredit?: boolean;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  let tokenizedNumber = '';
  let tokenizedCvv = '';

  try {
    tokenizedNumber = tokenizeCardNumber(String(payload.number ?? ''));
    tokenizedCvv = tokenizeCardCvv(String(payload.cvv ?? ''));
  } catch {
    return NextResponse.json(
      { error: 'Card tokenization is not configured correctly' },
      { status: 500 },
    );
  }

  const { providerId, error: providerError } = await resolveOrCreateProvider(
    prisma,
    payload.provider,
  );

  if (providerError) {
    return NextResponse.json({ error: providerError }, { status: 500 });
  }

  await prisma.card.update({
    where: { id: cardId },
    data: {
      color_name: payload.color_name?.trim() || null,
      ...(payload.status !== undefined && isCardStatus(String(payload.status).trim().toLowerCase())
        ? { status: String(payload.status).trim().toLowerCase() }
        : {}),
      tags: Array.isArray(payload.tags)
        ? payload.tags
            .map((tag) => String(tag).trim())
            .filter(Boolean)
            .slice(0, 8)
        : [],
      card_name: payload.card_name?.trim() || null,
      provider_id: providerId,
      credit_limit:
        Boolean(payload.isCredit) &&
        typeof payload.credit_limit === 'number' &&
        Number.isFinite(payload.credit_limit)
          ? payload.credit_limit
          : null,
      billing_date:
        typeof payload.billing_date === 'number' &&
        Number.isInteger(payload.billing_date) &&
        payload.billing_date >= 1 &&
        payload.billing_date <= 31
          ? payload.billing_date
          : null,
      payment_date:
        typeof payload.payment_date === 'number' &&
        Number.isInteger(payload.payment_date) &&
        payload.payment_date >= 1 &&
        payload.payment_date <= 31
          ? payload.payment_date
          : null,
      number: tokenizedNumber,
      holder_name: payload.holder_name?.trim() || null,
      expiry_month: payload.expiry_month ?? undefined,
      expiry_year: payload.expiry_year ?? undefined,
      cvv: tokenizedCvv,
      network: payload.network ?? 0,
      isCredit: Boolean(payload.isCredit),
    },
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let cardId: bigint;

  try {
    cardId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  const prisma = getRequiredPrismaClient();

  let payload: {
    status?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const normalizedStatus = String(payload.status ?? '')
    .trim()
    .toLowerCase();

  if (!isCardStatus(normalizedStatus)) {
    return NextResponse.json({ error: 'Invalid card status' }, { status: 400 });
  }

  const existingCard = await prisma.card.findFirst({
    where: { id: cardId, owner_id: user.id },
    select: { id: true },
  });

  if (!existingCard) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  await prisma.card.update({
    where: { id: cardId },
    data: { status: normalizedStatus },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let cardId: bigint;

  try {
    cardId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  const prisma = getRequiredPrismaClient();

  const existingCard = await prisma.card.findFirst({
    where: { id: cardId, owner_id: user.id },
    select: { id: true },
  });

  if (!existingCard) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  await prisma.card.update({ where: { id: cardId }, data: { status: 'replaced' } });

  return NextResponse.json({ success: true });
}

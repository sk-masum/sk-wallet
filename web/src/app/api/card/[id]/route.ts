import { NextResponse } from 'next/server';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { isCardStatus } from '@/constants/card/status';
import { detokenizeCardCvv, detokenizeCardNumber, tokenizeCardCvv, tokenizeCardNumber } from '@/lib/security/card-token';

function getCardWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === '22P02' && error.message.includes('invalid input syntax for type bigint')) {
    return 'Database schema mismatch: change public.card.number and public.card.cvv column types to text before saving tokenized values.';
  }

  return error.message;
}

function isProviderSchemaUnavailable(error: { code?: string; message?: string } | null | undefined) {
  if (!error) return false;

  const message = String(error.message ?? '').toLowerCase();
  return (
    error.code === '42P01' ||
    error.code === '42703' ||
    error.code === 'PGRST200' ||
    message.includes('card_provider') ||
    message.includes('provider_id')
  );
}

function isBillingSchemaUnavailable(error: { code?: string; message?: string } | null | undefined) {
  if (!error) return false;

  const message = String(error.message ?? '').toLowerCase();
  return error.code === '42703' && (message.includes('billing_date') || message.includes('payment_date'));
}

async function resolveOrCreateProvider(
  supabase: Awaited<ReturnType<typeof getRouteSupabaseContext>>['supabase'],
  rawProvider?: string | null,
) {
  const provider = String(rawProvider ?? '').trim().replace(/\s+/g, ' ');

  if (!provider) {
    return {
      provider,
      providerId: null as number | null,
      error: null as string | null,
    };
  }

  const { data: existingProvider, error: existingProviderError } = await supabase
    .from('card_provider')
    .select('id, name')
    .ilike('name', provider)
    .maybeSingle();

  if (existingProviderError) {
    return {
      provider,
      providerId: null,
      error: `Failed to lookup provider: ${existingProviderError.message}`,
    };
  }

  if (existingProvider) {
    return {
      provider: existingProvider.name,
      providerId: Number(existingProvider.id),
      error: null,
    };
  }

  const { data: createdProvider, error: createdProviderError } = await supabase
    .from('card_provider')
    .insert({ name: provider })
    .select('id, name')
    .single();

  if (createdProviderError && createdProviderError.code !== '23505') {
    return {
      provider,
      providerId: null,
      error: `Failed to create provider: ${createdProviderError.message}`,
    };
  }

  if (createdProvider) {
    return {
      provider: createdProvider.name,
      providerId: Number(createdProvider.id),
      error: null,
    };
  }

  const { data: resolvedProvider, error: resolvedProviderError } = await supabase
    .from('card_provider')
    .select('id, name')
    .ilike('name', provider)
    .maybeSingle();

  if (resolvedProviderError || !resolvedProvider) {
    return {
      provider,
      providerId: null,
      error: `Failed to resolve provider after create: ${resolvedProviderError?.message ?? 'Provider not found'}`,
    };
  }

  return {
    provider: resolvedProvider.name,
    providerId: Number(resolvedProvider.id),
    error: null,
  };
}

function extractProviderName(cardProvider: unknown) {
  if (!cardProvider) return null;

  if (Array.isArray(cardProvider)) {
    const first = cardProvider[0] as { name?: string } | undefined;
    return typeof first?.name === 'string' ? first.name : null;
  }

  const single = cardProvider as { name?: string };
  return typeof single.name === 'string' ? single.name : null;
}

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let { data, error } = await supabase
    .from('card')
    .select('*, card_provider:card_provider!card_provider_id_fkey(id,name)')
    .eq('id', id)
    .eq('owner_id', user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: getCardWriteErrorMessage(error) }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  }

  try {
    const { card_provider, ...cardData } = data as typeof data & { card_provider?: unknown };
    const providerName = extractProviderName(card_provider);

    return NextResponse.json({
      data: {
        ...cardData,
        provider: providerName ?? null,
        number: detokenizeCardNumber(cardData.number),
        cvv: detokenizeCardCvv(cardData.cvv),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to decode stored card token' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
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
    return NextResponse.json({ error: 'Card tokenization is not configured correctly' }, { status: 500 });
  }

  const {
    providerId,
    error: providerError,
  } = await resolveOrCreateProvider(supabase, payload.provider);

  if (providerError) {
    return NextResponse.json({ error: providerError }, { status: 500 });
  }

  const providerPayload = { provider_id: providerId };

  const { error } = await supabase
    .from('card')
    .update({
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
      ...providerPayload,
      credit_limit:
        Boolean(payload.isCredit) && typeof payload.credit_limit === 'number' && Number.isFinite(payload.credit_limit)
          ? payload.credit_limit
          : null,
      billing_date:
        typeof payload.billing_date === 'number' && Number.isInteger(payload.billing_date) && payload.billing_date >= 1 && payload.billing_date <= 31
          ? payload.billing_date
          : null,
      payment_date:
        typeof payload.payment_date === 'number' && Number.isInteger(payload.payment_date) && payload.payment_date >= 1 && payload.payment_date <= 31
          ? payload.payment_date
          : null,
      number: tokenizedNumber,
      holder_name: payload.holder_name?.trim() || null,
      expiry_month: payload.expiry_month ?? null,
      expiry_year: payload.expiry_year ?? null,
      cvv: tokenizedCvv,
      network: payload.network ?? null,
      isCredit: Boolean(payload.isCredit),
    })
    .eq('id', id)
    .eq('owner_id', user.id);

  if (error) {
    if (isBillingSchemaUnavailable(error)) {
      const fallbackUpdateWithoutBilling = await supabase
        .from('card')
        .update({
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
          ...providerPayload,
          credit_limit:
            Boolean(payload.isCredit) && typeof payload.credit_limit === 'number' && Number.isFinite(payload.credit_limit)
              ? payload.credit_limit
              : null,
          number: tokenizedNumber,
          holder_name: payload.holder_name?.trim() || null,
          expiry_month: payload.expiry_month ?? null,
          expiry_year: payload.expiry_year ?? null,
          cvv: tokenizedCvv,
          network: payload.network ?? null,
          isCredit: Boolean(payload.isCredit),
        })
        .eq('id', id)
        .eq('owner_id', user.id);

      if (!fallbackUpdateWithoutBilling.error) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let payload: {
    status?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const normalizedStatus = String(payload.status ?? '').trim().toLowerCase();

  if (!isCardStatus(normalizedStatus)) {
    return NextResponse.json({ error: 'Invalid card status' }, { status: 400 });
  }

  const { error } = await supabase
    .from('card')
    .update({ status: normalizedStatus })
    .eq('id', id)
    .eq('owner_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const { error } = await supabase
    .from('card')
    .update({ status: 'replaced' })
    .eq('id', id)
    .eq('owner_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

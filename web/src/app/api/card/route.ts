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

async function resolveOrCreateProvider(
  supabase: Awaited<ReturnType<typeof getRouteSupabaseContext>>['supabase'],
  rawProvider?: string | null,
) {
  const provider = String(rawProvider ?? '').trim().replace(/\s+/g, ' ');

  if (!provider) {
    return {
      provider,
      providerId: null as number | null,
      usesProviderTable: true,
      error: null as string | null,
    };
  }

  const { data: existingProvider, error: existingProviderError } = await supabase
    .from('card_provider')
    .select('id, name')
    .ilike('name', provider)
    .maybeSingle();

  if (existingProviderError) {
    if (isProviderSchemaUnavailable(existingProviderError)) {
      return { provider, providerId: null, usesProviderTable: false, error: null };
    }

    return {
      provider,
      providerId: null,
      usesProviderTable: true,
      error: `Failed to lookup provider: ${existingProviderError.message}`,
    };
  }

  if (existingProvider) {
    return {
      provider: existingProvider.name,
      providerId: Number(existingProvider.id),
      usesProviderTable: true,
      error: null,
    };
  }

  const { data: createdProvider, error: createdProviderError } = await supabase
    .from('card_provider')
    .insert({ name: provider })
    .select('id, name')
    .single();

  if (createdProviderError && createdProviderError.code !== '23505') {
    if (isProviderSchemaUnavailable(createdProviderError)) {
      return { provider, providerId: null, usesProviderTable: false, error: null };
    }

    return {
      provider,
      providerId: null,
      usesProviderTable: true,
      error: `Failed to create provider: ${createdProviderError.message}`,
    };
  }

  if (createdProvider) {
    return {
      provider: createdProvider.name,
      providerId: Number(createdProvider.id),
      usesProviderTable: true,
      error: null,
    };
  }

  const { data: resolvedProvider, error: resolvedProviderError } = await supabase
    .from('card_provider')
    .select('id, name')
    .ilike('name', provider)
    .maybeSingle();

  if (resolvedProviderError || !resolvedProvider) {
    if (isProviderSchemaUnavailable(resolvedProviderError)) {
      return { provider, providerId: null, usesProviderTable: false, error: null };
    }

    return {
      provider,
      providerId: null,
      usesProviderTable: true,
      error: `Failed to resolve provider after create: ${resolvedProviderError?.message ?? 'Provider not found'}`,
    };
  }

  return {
    provider: resolvedProvider.name,
    providerId: Number(resolvedProvider.id),
    usesProviderTable: true,
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

export async function GET(request: Request) {
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let query = supabase
    .from('card')
    .select('*, card_provider:card_provider!card_provider_id_fkey(id,name)')
    .eq('owner_id', user.id)
    .order('id', { ascending: true });

  if (idsParam) {
    const ids = idsParam
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (ids.length > 0) {
      query = query.in('id', ids);
    }
  }

  let { data, error } = await query;

  if (error && isProviderSchemaUnavailable(error)) {
    let fallbackQuery = supabase
      .from('card')
      .select('*')
      .eq('owner_id', user.id)
      .order('id', { ascending: true });

    if (idsParam) {
      const ids = idsParam
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      if (ids.length > 0) {
        fallbackQuery = fallbackQuery.in('id', ids);
      }
    }

    const fallbackResult = await fallbackQuery;
    data = fallbackResult.data;
    error = fallbackResult.error;
  }

  if (error) {
    return NextResponse.json({ error: getCardWriteErrorMessage(error) }, { status: 500 });
  }

  let detokenizedData: typeof data;

  try {
    detokenizedData = (data ?? []).map((card) => {
      const { card_provider, ...cardData } = card as typeof card & { card_provider?: unknown };
      const providerName = extractProviderName(card_provider);

      return {
        ...cardData,
        provider: providerName ?? cardData.provider ?? null,
        number: detokenizeCardNumber(cardData.number),
        cvv: detokenizeCardCvv(cardData.cvv),
      };
    });
  } catch {
    return NextResponse.json({ error: 'Failed to decode stored card token' }, { status: 500 });
  }

  return NextResponse.json({ data: detokenizedData });
}

export async function POST(request: Request) {
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
    provider,
    providerId,
    usesProviderTable,
    error: providerError,
  } = await resolveOrCreateProvider(supabase, payload.provider);

  if (providerError) {
    return NextResponse.json({ error: providerError }, { status: 500 });
  }

  const providerPayload = usesProviderTable
    ? { provider: null, provider_id: providerId }
    : { provider: provider || null };

  const { error } = await supabase.from('card').insert({
    owner_id: user.id,
    color_name: payload.color_name?.trim() || null,
    status: isCardStatus(String(payload.status ?? '').trim().toLowerCase())
      ? String(payload.status).trim().toLowerCase()
      : 'active',
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
  });

  if (error) {
    if (usesProviderTable && isProviderSchemaUnavailable(error)) {
      const fallbackInsert = await supabase.from('card').insert({
        owner_id: user.id,
        color_name: payload.color_name?.trim() || null,
        status: isCardStatus(String(payload.status ?? '').trim().toLowerCase())
          ? String(payload.status).trim().toLowerCase()
          : 'active',
        tags: Array.isArray(payload.tags)
          ? payload.tags
              .map((tag) => String(tag).trim())
              .filter(Boolean)
              .slice(0, 8)
          : [],
        card_name: payload.card_name?.trim() || null,
        provider: provider || null,
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
      });

      if (!fallbackInsert.error) {
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

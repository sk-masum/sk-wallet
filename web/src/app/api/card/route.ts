import { NextResponse } from 'next/server';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { detokenizeCardCvv, detokenizeCardNumber, tokenizeCardCvv, tokenizeCardNumber } from '@/lib/security/card-token';

function getCardWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === '22P02' && error.message.includes('invalid input syntax for type bigint')) {
    return 'Database schema mismatch: change public.card.number and public.card.cvv column types to text before saving tokenized values.';
  }

  return error.message;
}

export async function GET(request: Request) {
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let query = supabase.from('card').select('*').eq('owner_id', user.id).order('id', { ascending: true });

  if (idsParam) {
    const ids = idsParam
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (ids.length > 0) {
      query = query.in('id', ids);
    }
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: getCardWriteErrorMessage(error) }, { status: 500 });
  }

  let detokenizedData: typeof data;

  try {
    detokenizedData = (data ?? []).map((card) => ({
      ...card,
      number: detokenizeCardNumber(card.number),
      cvv: detokenizeCardCvv(card.cvv),
    }));
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
    card_name?: string;
    provider?: string | null;
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

  const { error } = await supabase.from('card').insert({
    owner_id: user.id,
    color_name: payload.color_name?.trim() || null,
    card_name: payload.card_name?.trim() || null,
    provider: payload.provider?.trim() || null,
    number: tokenizedNumber,
    holder_name: payload.holder_name?.trim() || null,
    expiry_month: payload.expiry_month ?? null,
    expiry_year: payload.expiry_year ?? null,
    cvv: tokenizedCvv,
    network: payload.network ?? null,
    isCredit: Boolean(payload.isCredit),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

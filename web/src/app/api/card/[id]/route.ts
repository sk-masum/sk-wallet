import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server';
import { detokenizeCardCvv, detokenizeCardNumber, tokenizeCardCvv, tokenizeCardNumber } from '@/lib/security/card-token';

function getCardWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === '22P02' && error.message.includes('invalid input syntax for type bigint')) {
    return 'Database schema mismatch: change public.card.number and public.card.cvv column types to text before saving tokenized values.';
  }

  return error.message;
}

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('card')
    .select('*')
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
    return NextResponse.json({
      data: {
        ...data,
        number: detokenizeCardNumber(data.number),
        cvv: detokenizeCardCvv(data.cvv),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to decode stored card token' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

  const { error } = await supabase
    .from('card')
    .update({
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
    })
    .eq('id', id)
    .eq('owner_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('card')
    .delete()
    .eq('id', id)
    .eq('owner_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

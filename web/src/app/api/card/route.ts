import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: {
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

  const { error } = await supabase.from('card').insert({
    owner_id: user.id,
    card_name: payload.card_name?.trim() || null,
    provider: payload.provider?.trim() || null,
    number: String(payload.number ?? '').replace(/\D/g, ''),
    holder_name: payload.holder_name?.trim() || null,
    expiry_month: payload.expiry_month ?? null,
    expiry_year: payload.expiry_year ?? null,
    cvv: String(payload.cvv ?? '').replace(/\D/g, ''),
    network: payload.network ?? null,
    isCredit: Boolean(payload.isCredit),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

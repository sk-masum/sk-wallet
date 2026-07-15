import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  let query = supabase.from('card').select('*').order('id', { ascending: true });

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

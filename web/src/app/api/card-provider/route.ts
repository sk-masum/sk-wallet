import { NextResponse } from 'next/server';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';

export async function GET() {
  const { supabase, user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const { data, error } = await supabase
    .from('card_provider')
    .select('name')
    .order('name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const names = Array.from(
    new Set(
      (data ?? [])
        .map((item) => String(item.name ?? '').trim())
        .filter(Boolean)
    )
  );

  return NextResponse.json({ data: names });
}
import { NextResponse } from 'next/server';

import { getRequiredPrismaClient } from '@/lib/prisma';
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';

type FavoriteRow = {
  feature_key: string;
};

function normalizeFavoriteKey(value: unknown) {
  const key = String(value ?? '').trim();
  return key.slice(0, 160);
}

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();

  try {
    const rows = await prisma.$queryRaw<FavoriteRow[]>`
      select feature_key
      from public.dashboard_favorite
      where user_id = ${user.id}::uuid
      order by updated_at desc
    `;

    return NextResponse.json({ data: rows.map((row) => row.feature_key) });
  } catch {
    // If migration has not been applied yet, keep UI functional.
    return NextResponse.json({ data: [] as string[] });
  }
}

export async function POST(request: Request) {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let payload: {
    key?: string;
    active?: boolean;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const key = normalizeFavoriteKey(payload.key);
  const active = payload.active === true;

  if (!key) {
    return NextResponse.json({ error: 'Favorite key is required' }, { status: 400 });
  }

  const prisma = getRequiredPrismaClient();

  try {
    if (active) {
      await prisma.$executeRaw`
        insert into public.dashboard_favorite (user_id, feature_key)
        values (${user.id}::uuid, ${key})
        on conflict (user_id, feature_key)
        do update set updated_at = timezone('utc'::text, now())
      `;
    } else {
      await prisma.$executeRaw`
        delete from public.dashboard_favorite
        where user_id = ${user.id}::uuid
          and feature_key = ${key}
      `;
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error: 'Favorites table is unavailable. Apply dashboard_favorite.sql first.',
      },
      { status: 500 },
    );
  }
}

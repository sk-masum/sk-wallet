import { NextResponse } from 'next/server';

import { parseJsonBody, resolveUserRouteContext } from '@/app/api/shared/owned-route';
import { normalizeTrimmedText } from '@/app/api/shared/payload-utils';

type FavoriteRow = {
  feature_key: string;
};

function normalizeFavoriteKey(value: unknown) {
  return normalizeTrimmedText(value, 160);
}

export async function GET() {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  try {
    const rows = await prisma.$queryRaw<FavoriteRow[]>`
      select feature_key
      from public.dashboard_favorite
      where user_id = ${userId}::uuid
      order by updated_at desc
    `;

    return NextResponse.json({ data: rows.map((row) => row.feature_key) });
  } catch {
    // If migration has not been applied yet, keep UI functional.
    return NextResponse.json({ data: [] as string[] });
  }
}

export async function POST(request: Request) {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<{
    key?: string;
    active?: boolean;
  }>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  const key = normalizeFavoriteKey(payload.key);
  const active = payload.active === true;

  if (!key) {
    return NextResponse.json({ error: 'Favorite key is required' }, { status: 400 });
  }

  try {
    if (active) {
      await prisma.$executeRaw`
        insert into public.dashboard_favorite (user_id, feature_key)
        values (${userId}::uuid, ${key})
        on conflict (user_id, feature_key)
        do update set updated_at = timezone('utc'::text, now())
      `;
    } else {
      await prisma.$executeRaw`
        delete from public.dashboard_favorite
        where user_id = ${userId}::uuid
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

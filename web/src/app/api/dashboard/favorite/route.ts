import { NextResponse } from 'next/server';
import { desc, eq, and } from 'drizzle-orm';

import {
  apiErrorResponse,
  badRequestResponse,
  parseJsonBody,
  withUserRouteContext,
} from '@/app/api/shared/owned-route';
import { normalizeFavoriteKey, type FavoriteRow } from '@/app/api/dashboard/shared';
import { dashboard_favorite } from '@/db/schema';

export async function GET() {
  return withUserRouteContext(async ({ userId, db }) => {
    try {
      const rows = await db
        .select({ feature_key: dashboard_favorite.feature_key })
        .from(dashboard_favorite)
        .where(eq(dashboard_favorite.user_id, userId))
        .orderBy(desc(dashboard_favorite.updated_at));

      return NextResponse.json({ data: rows.map((row) => row.feature_key) });
    } catch {
      // If migration has not been applied yet, keep UI functional.
      return NextResponse.json({ data: [] as string[] });
    }
  });
}

export async function POST(request: Request) {
  return withUserRouteContext(async ({ userId, db }) => {
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
      return badRequestResponse('Favorite key is required');
    }

    try {
      if (active) {
        // Upsert: insert or update if exists
        await db
          .insert(dashboard_favorite)
          .values({
            user_id: userId,
            feature_key: key,
            updated_at: new Date(),
          })
          .onConflictDoUpdate({
            target: [dashboard_favorite.user_id, dashboard_favorite.feature_key],
            set: { updated_at: new Date() },
          });
      } else {
        await db
          .delete(dashboard_favorite)
          .where(and(eq(dashboard_favorite.user_id, userId), eq(dashboard_favorite.feature_key, key)));
      }

      return NextResponse.json({ success: true });
    } catch {
      return apiErrorResponse(
        'Favorites table is unavailable. Apply dashboard_favorite.sql first.',
        500,
      );
    }
  });
}

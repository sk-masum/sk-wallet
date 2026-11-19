import { NextResponse } from 'next/server';

import { getRequiredDb } from '@/db/client';
import type { Db } from '@/db/client';
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';

export type OwnedRouteContext = {
  id: string;
  userId: string;
  db: Db;
};

export type UserRouteContext = {
  userId: string;
  db: Db;
};

type RouteResult = NextResponse | Response;

export function isNextResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}

export function ownedEntityNotFoundResponse(entityLabel: string) {
  return NextResponse.json({ error: `${entityLabel} not found` }, { status: 404 });
}

export function apiErrorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export function badRequestResponse(error: string) {
  return apiErrorResponse(error, 400);
}

export function serverErrorResponse(error: string) {
  return apiErrorResponse(error, 500);
}

export function invalidJsonBodyResponse() {
  return badRequestResponse('Invalid JSON body');
}

export function validationFailedResponse(fieldErrors: Record<string, unknown>) {
  return NextResponse.json({ error: 'Validation failed', fieldErrors }, { status: 400 });
}

export async function parseJsonBody<T>(request: Request): Promise<T | NextResponse> {
  try {
    return (await request.json()) as T;
  } catch {
    return invalidJsonBodyResponse();
  }
}

type DeleteOwnedEntityArgs = {
  id: string;
  userId: string;
  entityLabel: string;
  findOwnedById: (id: string, userId: string) => Promise<unknown | null>;
  deleteById: (id: string) => Promise<void>;
};

type OwnedEntityExistsArgs<TId> = {
  id: TId;
  userId: string;
  findOwnedById: (id: TId, userId: string) => Promise<unknown | null>;
};

export async function hasOwnedEntity<TId>({
  id,
  userId,
  findOwnedById,
}: OwnedEntityExistsArgs<TId>) {
  const existing = await findOwnedById(id, userId);
  return Boolean(existing);
}

export async function deleteOwnedEntityById({
  id,
  userId,
  entityLabel,
  findOwnedById,
  deleteById,
}: DeleteOwnedEntityArgs) {
  const existing = await findOwnedById(id, userId);

  if (!existing) {
    return ownedEntityNotFoundResponse(entityLabel);
  }

  await deleteById(id);

  return NextResponse.json({ success: true });
}

export async function resolveUserRouteContext(): Promise<UserRouteContext | NextResponse> {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  return {
    userId: user.id,
    db: getRequiredDb(),
  };
}

export async function resolveOwnedRouteContext(
  paramsPromise: Promise<{ id: string }>,
): Promise<OwnedRouteContext | NextResponse> {
  const { id } = await paramsPromise;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  return {
    id,
    userId: user.id,
    db: getRequiredDb(),
  };
}

export async function withUserRouteContext(
  handler: (context: UserRouteContext) => Promise<RouteResult> | RouteResult,
) {
  const routeContext = await resolveUserRouteContext();
  if (isNextResponse(routeContext)) {
    return routeContext;
  }

  return handler(routeContext);
}

export async function withOwnedRouteContext(
  paramsPromise: Promise<{ id: string }>,
  handler: (context: OwnedRouteContext) => Promise<RouteResult> | RouteResult,
) {
  const routeContext = await resolveOwnedRouteContext(paramsPromise);
  if (isNextResponse(routeContext)) {
    return routeContext;
  }

  return handler(routeContext);
}

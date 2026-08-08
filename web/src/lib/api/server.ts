import { headers } from 'next/headers';
import { type JsonBody, type JsonRecord, toHeadersObject, withJsonHeaders } from '@/lib/api/shared';

export async function getServerApiContext() {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const proto = requestHeaders.get('x-forwarded-proto') ?? 'http';
  const cookie = requestHeaders.get('cookie') ?? '';

  if (!host) {
    throw new Error('Unable to resolve request host');
  }

  return {
    baseUrl: `${proto}://${host}`,
    cookie,
  };
}

export async function fetchServerApi<T = JsonRecord>(
  path: string,
  init: RequestInit = {},
): Promise<{ response: Response; data: T | null }> {
  const { baseUrl, cookie } = await getServerApiContext();
  const headersObject = toHeadersObject(init.headers);

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...headersObject,
      cookie,
    },
    cache: init.cache ?? 'no-store',
  });

  const data = (await response.json().catch(() => null)) as T | null;
  return { response, data };
}

export function serverApiGet<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchServerApi<T>(path, { ...init, method: 'GET' });
}

export function serverApiPost<T = JsonRecord>(
  path: string,
  body: JsonBody,
  init: RequestInit = {},
) {
  return fetchServerApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function serverApiPut<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchServerApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function serverApiPatch<T = JsonRecord>(
  path: string,
  body: JsonBody,
  init: RequestInit = {},
) {
  return fetchServerApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function serverApiDelete<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchServerApi<T>(path, { ...init, method: 'DELETE' });
}

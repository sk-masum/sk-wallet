import { type JsonBody, type JsonRecord, withJsonHeaders } from '@/lib/api/shared';

export async function fetchClientApi<T = JsonRecord>(
  path: string,
  init: RequestInit = {},
): Promise<{ response: Response; data: T | null }> {
  const response = await fetch(path, {
    ...init,
    cache: init.cache ?? 'no-store',
  });

  const data = (await response.json().catch(() => null)) as T | null;
  return { response, data };
}

export function clientApiGet<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchClientApi<T>(path, { ...init, method: 'GET' });
}

export function clientApiPost<T = JsonRecord>(
  path: string,
  body: JsonBody,
  init: RequestInit = {},
) {
  return fetchClientApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function clientApiPut<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchClientApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function clientApiPatch<T = JsonRecord>(
  path: string,
  body: JsonBody,
  init: RequestInit = {},
) {
  return fetchClientApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export function clientApiDelete<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchClientApi<T>(path, { ...init, method: 'DELETE' });
}

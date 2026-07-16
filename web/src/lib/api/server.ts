import { headers } from 'next/headers'

type JsonRecord = Record<string, unknown>
type JsonBody = JsonRecord | unknown[]

function toHeadersObject(initHeaders?: HeadersInit) {
  if (!initHeaders) return {} as Record<string, string>
  if (initHeaders instanceof Headers) {
    return Object.fromEntries(initHeaders.entries())
  }
  if (Array.isArray(initHeaders)) {
    return Object.fromEntries(initHeaders)
  }
  return { ...initHeaders }
}

export async function getServerApiContext() {
  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
  const proto = requestHeaders.get('x-forwarded-proto') ?? 'http'
  const cookie = requestHeaders.get('cookie') ?? ''

  if (!host) {
    throw new Error('Unable to resolve request host')
  }

  return {
    baseUrl: `${proto}://${host}`,
    cookie,
  }
}

export async function fetchServerApi<T = JsonRecord>(
  path: string,
  init: RequestInit = {}
): Promise<{ response: Response; data: T | null }> {
  const { baseUrl, cookie } = await getServerApiContext()
  const headersObject = toHeadersObject(init.headers)

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...headersObject,
      cookie,
    },
    cache: init.cache ?? 'no-store',
  })

  const data = (await response.json().catch(() => null)) as T | null
  return { response, data }
}

function withJsonHeaders(init: RequestInit = {}) {
  const headersObject = toHeadersObject(init.headers)
  return {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...headersObject,
    },
  }
}

export function serverApiGet<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchServerApi<T>(path, { ...init, method: 'GET' })
}

export function serverApiPost<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchServerApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function serverApiPut<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchServerApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function serverApiPatch<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchServerApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function serverApiDelete<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchServerApi<T>(path, { ...init, method: 'DELETE' })
}

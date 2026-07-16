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

export async function fetchClientApi<T = JsonRecord>(
  path: string,
  init: RequestInit = {}
): Promise<{ response: Response; data: T | null }> {
  const response = await fetch(path, {
    ...init,
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

export function clientApiGet<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchClientApi<T>(path, { ...init, method: 'GET' })
}

export function clientApiPost<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchClientApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function clientApiPut<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchClientApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function clientApiPatch<T = JsonRecord>(path: string, body: JsonBody, init: RequestInit = {}) {
  return fetchClientApi<T>(path, {
    ...withJsonHeaders(init),
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function clientApiDelete<T = JsonRecord>(path: string, init: RequestInit = {}) {
  return fetchClientApi<T>(path, { ...init, method: 'DELETE' })
}

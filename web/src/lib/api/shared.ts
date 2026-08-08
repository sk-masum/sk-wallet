export type JsonRecord = Record<string, unknown>;
export type JsonBody = JsonRecord | unknown[];

export function toHeadersObject(initHeaders?: HeadersInit) {
  if (!initHeaders) return {} as Record<string, string>;
  if (initHeaders instanceof Headers) {
    return Object.fromEntries(initHeaders.entries());
  }
  if (Array.isArray(initHeaders)) {
    return Object.fromEntries(initHeaders);
  }
  return { ...initHeaders };
}

export function withJsonHeaders(init: RequestInit = {}) {
  const headersObject = toHeadersObject(init.headers);
  return {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...headersObject,
    },
  };
}

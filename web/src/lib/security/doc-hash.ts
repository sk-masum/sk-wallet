import { createHash } from 'node:crypto'

import { type DocumentTypeCode } from '@/models/document'

function getDocHashSalt() {
  return process.env.DOC_HASH_SALT?.trim() || process.env.DOC_TOKEN_SECRET?.trim() || 'doc-hash-default'
}

export function hashDocumentIdentity(type: DocumentTypeCode, normalizedNumber: string) {
  const salted = `${type}:${normalizedNumber}:${getDocHashSalt()}`
  return createHash('sha256').update(salted).digest('hex')
}

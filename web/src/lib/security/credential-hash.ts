import { createHash } from 'node:crypto'

import { type CredentialTypeCode } from '@/models/credential'

function getCredentialHashSalt() {
  return (
    process.env.CREDENTIAL_HASH_SALT?.trim() ||
    process.env.CREDENTIAL_TOKEN_SECRET?.trim() ||
    process.env.DOC_HASH_SALT?.trim() ||
    'credential-hash-default'
  )
}

export function hashCredentialSecret(
  type: CredentialTypeCode,
  serviceName: string,
  identifier: string,
  normalizedSecret: string
) {
  const salted = `${type}:${serviceName}:${identifier}:${normalizedSecret}:${getCredentialHashSalt()}`
  return createHash('sha256').update(salted).digest('hex')
}

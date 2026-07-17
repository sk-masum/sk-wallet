import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

const TOKEN_VERSION = 'v1'
const TOKEN_PREFIX = `${TOKEN_VERSION}:`
const IV_LENGTH_BYTES = 12

function getDocTokenSecret() {
  const secret =
    process.env.DOC_TOKEN_SECRET?.trim() ||
    process.env.CARD_TOKEN_SECRET?.trim() ||
    process.env.NEXT_PUBLIC_CARD_TOKEN_SECRET?.trim()

  if (!secret) {
    throw new Error('DOC_TOKEN_SECRET is not configured')
  }

  return secret
}

function deriveKey(secret: string) {
  return createHash('sha256').update(secret).digest()
}

function toBase64Url(value: Buffer) {
  return value.toString('base64url')
}

function fromBase64Url(value: string) {
  return Buffer.from(value, 'base64url')
}

export function tokenizeDocumentNumber(rawValue: string) {
  const normalized = String(rawValue ?? '').trim()

  if (!normalized) {
    return ''
  }

  const key = deriveKey(getDocTokenSecret())
  const iv = randomBytes(IV_LENGTH_BYTES)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(normalized, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return `${TOKEN_PREFIX}${toBase64Url(iv)}.${toBase64Url(encrypted)}.${toBase64Url(authTag)}`
}

export function detokenizeDocumentNumber(value: string | null | undefined) {
  const serialized = String(value ?? '').trim()

  if (!serialized) {
    return ''
  }

  if (!serialized.startsWith(TOKEN_PREFIX)) {
    return serialized
  }

  const payload = serialized.slice(TOKEN_PREFIX.length)
  const [ivPart, encryptedPart, authTagPart] = payload.split('.')

  if (!ivPart || !encryptedPart || !authTagPart) {
    throw new Error('Invalid document token format')
  }

  const key = deriveKey(getDocTokenSecret())
  const iv = fromBase64Url(ivPart)
  const encrypted = fromBase64Url(encryptedPart)
  const authTag = fromBase64Url(authTagPart)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

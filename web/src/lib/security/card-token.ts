import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

const TOKEN_VERSION = 'v1'
const TOKEN_PREFIX = `${TOKEN_VERSION}:`
const IV_LENGTH_BYTES = 12

function getTokenSecret() {
  const secret = process.env.NEXT_PUBLIC_CARD_TOKEN_SECRET?.trim()

  if (!secret) {
    throw new Error('NEXT_PUBLIC_CARD_TOKEN_SECRET is not configured')
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

export function tokenizeCardNumber(rawCardNumber: string) {
  const digits = String(rawCardNumber).replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  const key = deriveKey(getTokenSecret())
  const iv = randomBytes(IV_LENGTH_BYTES)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(digits, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return `${TOKEN_PREFIX}${toBase64Url(iv)}.${toBase64Url(encrypted)}.${toBase64Url(authTag)}`
}

export function detokenizeCardNumber(value: string | null | undefined) {
  const serialized = String(value ?? '').trim()

  if (!serialized) {
    return ''
  }

  if (!serialized.startsWith(TOKEN_PREFIX)) {
    // Backward compatibility for rows persisted before tokenization.
    return serialized.replace(/\D/g, '')
  }

  const payload = serialized.slice(TOKEN_PREFIX.length)
  const [ivPart, encryptedPart, authTagPart] = payload.split('.')

  if (!ivPart || !encryptedPart || !authTagPart) {
    throw new Error('Invalid card token format')
  }

  const key = deriveKey(getTokenSecret())
  const iv = fromBase64Url(ivPart)
  const encrypted = fromBase64Url(encryptedPart)
  const authTag = fromBase64Url(authTagPart)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
  return decrypted.replace(/\D/g, '')
}

export function tokenizeCardCvv(rawCvv: string) {
  return tokenizeCardNumber(rawCvv)
}

export function detokenizeCardCvv(value: string | null | undefined) {
  return detokenizeCardNumber(value)
}
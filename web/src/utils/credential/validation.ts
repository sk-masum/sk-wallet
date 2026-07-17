import type { CredentialFormFieldErrors, CredentialFormPayload } from '@/models/credential'
import { isCredentialTypeCode } from '@/constants/credential/types'

const URL_PROTOCOLS = new Set(['http:', 'https:'])

function isValidUrl(value: string) {
  try {
    const parsed = new URL(value)
    return URL_PROTOCOLS.has(parsed.protocol)
  } catch {
    return false
  }
}

export function maskCredentialSecret(secretRaw: string) {
  const compact = String(secretRaw ?? '').trim()
  if (!compact) return '********'

  const last4 = compact.slice(-4)
  return `********${last4}`
}

export function normalizeCredentialSecret(secretRaw: string) {
  return String(secretRaw ?? '').trim()
}

export function validateCredentialFormFields(payload: CredentialFormPayload, options?: { allowEmptySecret?: boolean }) {
  const errors: CredentialFormFieldErrors = {}

  const type = String(payload.type ?? '').trim().toUpperCase()
  if (!isCredentialTypeCode(type)) {
    errors.type = 'Please select a valid credential type.'
  }

  const serviceName = String(payload.serviceName ?? '').trim()
  if (!serviceName) {
    errors.serviceName = 'Service name is required.'
  } else if (serviceName.length < 2) {
    errors.serviceName = 'Service name must be at least 2 characters.'
  } else if (serviceName.length > 120) {
    errors.serviceName = 'Service name must be at most 120 characters.'
  }

  const identifier = String(payload.identifier ?? '').trim()
  if (identifier.length > 120) {
    errors.identifier = 'Identifier must be at most 120 characters.'
  }

  const secret = normalizeCredentialSecret(payload.secret ?? '')
  if (!options?.allowEmptySecret || secret) {
    if (!secret) {
      errors.secret = 'Secret is required.'
    } else if (secret.length < 4) {
      errors.secret = 'Secret must be at least 4 characters.'
    } else if (secret.length > 200) {
      errors.secret = 'Secret must be at most 200 characters.'
    }
  }

  const url = String(payload.url ?? '').trim()
  if (url && !isValidUrl(url)) {
    errors.url = 'URL must start with http:// or https://'
  }

  const notes = String(payload.notes ?? '').trim()
  if (notes.length > 1000) {
    errors.notes = 'Notes must be at most 1000 characters.'
  }

  return errors
}

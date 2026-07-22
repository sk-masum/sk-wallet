import { DocumentTypeCode, type DocumentFormFieldErrors, type DocumentFormPayload } from '@/models/document'
import { isDocumentCategory } from '@/constants/document/categories'
import { isDocumentTypeCode } from '@/constants/document/types'

function isValidDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime())
}

function normalizeByType(type: DocumentTypeCode, value: string) {
  const compact = String(value ?? '').replace(/\s+/g, '').toUpperCase()

  switch (type) {
    case DocumentTypeCode.AADHAAR:
      return compact.replace(/\D/g, '')
    case DocumentTypeCode.PAN:
    case DocumentTypeCode.VOTER:
    case DocumentTypeCode.DRIVING_LICENSE:
    case DocumentTypeCode.RATION:
    case DocumentTypeCode.PASSPORT:
    case DocumentTypeCode.BIRTH_CERTIFICATE:
    case DocumentTypeCode.VEHICLE_RC:
    case DocumentTypeCode.OTHERS:
      return compact.replace(/[^A-Z0-9]/g, '')
    default:
      return compact
  }
}

function validateNumberByType(type: DocumentTypeCode, number: string) {
  switch (type) {
    case DocumentTypeCode.AADHAAR:
      if (!/^\d{12}$/.test(number)) {
        return 'Aadhaar number must be exactly 12 digits.'
      }
      return null
    case DocumentTypeCode.PAN:
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(number)) {
        return 'PAN must follow format ABCDE1234F.'
      }
      return null
    case DocumentTypeCode.VOTER:
      if (!/^[A-Z]{3}[0-9]{7}$/.test(number)) {
        return 'Voter ID must follow format ABC1234567.'
      }
      return null
    case DocumentTypeCode.DRIVING_LICENSE:
      if (!/^[A-Z0-9]{10,20}$/.test(number)) {
        return 'Driving license must be 10 to 20 letters/digits.'
      }
      return null
    case DocumentTypeCode.RATION:
      if (!/^[A-Z0-9]{8,20}$/.test(number)) {
        return 'Ration card number must be 8 to 20 letters/digits.'
      }
      return null
    case DocumentTypeCode.PASSPORT:
      if (!/^[A-Z][0-9]{7}$/.test(number)) {
        return 'Passport must follow format A1234567.'
      }
      return null
    case DocumentTypeCode.BIRTH_CERTIFICATE:
      if (!/^[A-Z0-9]{6,30}$/.test(number)) {
        return 'Birth certificate number must be 6 to 30 letters/digits.'
      }
      return null
    case DocumentTypeCode.VEHICLE_RC:
      if (!/^[A-Z0-9]{8,20}$/.test(number)) {
        return 'Vehicle RC number must be 8 to 20 letters/digits.'
      }
      return null
    case DocumentTypeCode.OTHERS:
      if (!/^[A-Z0-9]{4,40}$/.test(number)) {
        return 'Document number must be 4 to 40 letters/digits.'
      }
      return null
    default:
      return 'Unsupported document type.'
  }
}

export function normalizeDocumentNumber(typeRaw: string, value: string) {
  if (!isDocumentTypeCode(typeRaw)) return ''
  return normalizeByType(typeRaw, value)
}

export function maskDocumentNumber(type: DocumentTypeCode, normalizedNumber: string) {
  const last4 = normalizedNumber.slice(-4)

  switch (type) {
    case DocumentTypeCode.AADHAAR:
      return `XXXX XXXX ${last4}`
    case DocumentTypeCode.PAN:
      return normalizedNumber.length === 10
        ? `${normalizedNumber.slice(0, 5)}****${normalizedNumber.slice(9)}`
        : `XXXXX****${last4}`
    default:
      return `******${last4}`
  }
}

export function validateDocumentFormFields(payload: DocumentFormPayload) {
  const errors: DocumentFormFieldErrors = {}

  const type = String(payload.type ?? '').trim().toUpperCase()
  if (!isDocumentTypeCode(type)) {
    errors.type = 'Please select a valid document type.'
    return errors
  }

  const category = String(payload.category ?? '').trim().toLowerCase()
  if (!isDocumentCategory(category)) {
    errors.category = 'Please select a valid category.'
  }

  const normalizedNumber = normalizeByType(type, payload.number)
  const numberError = validateNumberByType(type, normalizedNumber)
  if (numberError) {
    errors.number = numberError
  }

  const nameOnDocument = String(payload.nameOnDocument ?? '').trim()
  if (nameOnDocument && nameOnDocument.length < 2) {
    errors.nameOnDocument = 'Name on document must be at least 2 characters.'
  }

  if (nameOnDocument.length > 120) {
    errors.nameOnDocument = 'Name on document must be at most 120 characters.'
  }

  const issuedDate = String(payload.issuedDate ?? '').trim()
  if (issuedDate && !isValidDateString(issuedDate)) {
    errors.issuedDate = 'Issued date must be a valid date.'
  }

  const expiryDate = String(payload.expiryDate ?? '').trim()
  if (expiryDate && !isValidDateString(expiryDate)) {
    errors.expiryDate = 'Expiry date must be a valid date.'
  }

  if (issuedDate && expiryDate && isValidDateString(issuedDate) && isValidDateString(expiryDate)) {
    if (new Date(`${expiryDate}T00:00:00Z`).getTime() < new Date(`${issuedDate}T00:00:00Z`).getTime()) {
      errors.expiryDate = 'Expiry date cannot be earlier than issued date.'
    }
  }

  const address = String(payload.address ?? '').trim()
  if (address.length > 240) {
    errors.address = 'Address must be at most 240 characters.'
  }

  const guardianName = String(payload.guardianName ?? '').trim()
  if (guardianName.length > 120) {
    errors.guardianName = 'Guardian name must be at most 120 characters.'
  }

  const otherDetails = String(payload.otherDetails ?? '').trim()
  if (otherDetails.length > 500) {
    errors.otherDetails = 'Other details must be at most 500 characters.'
  }

  const customFields = Array.isArray(payload.customFields) ? payload.customFields : []
  if (customFields.length > 12) {
    errors.customFields = 'You can add up to 12 custom fields.'
    return errors
  }

  const seenKeys = new Set<string>()
  for (const item of customFields) {
    const key = String(item?.key ?? '').trim()
    const value = String(item?.value ?? '').trim()

    if (!key && !value) continue

    if (!key || !value) {
      errors.customFields = 'Each custom field must include both key and value.'
      return errors
    }

    if (key.length > 60) {
      errors.customFields = 'Custom field key must be at most 60 characters.'
      return errors
    }

    if (value.length > 240) {
      errors.customFields = 'Custom field value must be at most 240 characters.'
      return errors
    }

    const normalizedKey = key.toLowerCase()
    if (seenKeys.has(normalizedKey)) {
      errors.customFields = 'Custom field keys must be unique.'
      return errors
    }
    seenKeys.add(normalizedKey)
  }

  return errors
}

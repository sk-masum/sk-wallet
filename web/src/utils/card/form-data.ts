import { buildCardAppearance, parseCardAppearance } from '@/utils/card/theme'

export type ParsedCardFormData = {
  colorName: string
  cardName: string
  provider: string
  number: string
  normalizedNumber: string
  holderName: string
  cardType: string
  network: number
  expiryMonth: number
  expiryYearRaw: string
  cvv: string
}

export type ParsedCardFormDataWithId = ParsedCardFormData & {
  id: string
}

export function parseCardFormData(formData: FormData): ParsedCardFormData {
  const colorNameRaw = String(formData.get('color_name') ?? '').trim()
  const { colorName, patternKey } = parseCardAppearance(colorNameRaw)
  const cardName = String(formData.get('card_name') ?? '').trim()
  const provider = String(formData.get('provider') ?? '').trim()
  const number = String(formData.get('number') ?? '').trim()
  const normalizedNumber = number.replace(/\D/g, '')
  const holderName = String(formData.get('holder_name') ?? '').trim()
  const cardType = String(formData.get('card_type') ?? '').trim().toLowerCase()
  const network = Number(formData.get('network'))
  const expiryMonth = Number(formData.get('expiry_month'))
  const expiryYearRaw = String(formData.get('expiry_year') ?? '').trim()
  const cvv = String(formData.get('cvv') ?? '').trim()

  return {
    colorName: buildCardAppearance(colorName, patternKey),
    cardName,
    provider,
    number,
    normalizedNumber,
    holderName,
    cardType,
    network,
    expiryMonth,
    expiryYearRaw,
    cvv,
  }
}

export function parseCardFormDataWithId(formData: FormData): ParsedCardFormDataWithId {
  const parsed = parseCardFormData(formData)
  const id = String(formData.get('id') ?? '').trim()

  return {
    ...parsed,
    id,
  }
}

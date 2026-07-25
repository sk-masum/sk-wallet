import { buildCardAppearance, parseCardAppearance } from '@/utils/card/theme';

export type ParsedCardFormData = {
  colorName: string;
  status: string;
  tags: string[];
  cardName: string;
  provider: string;
  creditLimitRaw: string;
  creditLimit: number | null;
  billingDateRaw: string;
  billingDate: number | null;
  paymentDateRaw: string;
  paymentDate: number | null;
  number: string;
  normalizedNumber: string;
  holderName: string;
  cardType: string;
  network: number;
  expiryMonth: number;
  expiryYearRaw: string;
  cvv: string;
};

export type ParsedCardFormDataWithId = ParsedCardFormData & {
  id: string;
};

export function parseCardFormData(formData: FormData): ParsedCardFormData {
  const colorNameRaw = String(formData.get('color_name') ?? '').trim();
  const { colorName, patternKey } = parseCardAppearance(colorNameRaw);
  const status = String(formData.get('status') ?? 'active')
    .trim()
    .toLowerCase();
  const tags = parseCardTags(String(formData.get('tags') ?? ''));
  const cardName = String(formData.get('card_name') ?? '').trim();
  const provider = String(formData.get('provider') ?? '').trim();
  const creditLimitRaw = String(formData.get('credit_limit') ?? '').trim();
  const normalizedCreditLimit = creditLimitRaw.replace(/,/g, '');
  const creditLimit = normalizedCreditLimit.length > 0 ? Number(normalizedCreditLimit) : null;
  const billingDateRaw = String(formData.get('billing_date') ?? '').trim();
  const paymentDateRaw = String(formData.get('payment_date') ?? '').trim();
  const billingDate = billingDateRaw ? Number(billingDateRaw) : null;
  const paymentDate = paymentDateRaw ? Number(paymentDateRaw) : null;
  const number = String(formData.get('number') ?? '').trim();
  const normalizedNumber = number.replace(/\D/g, '');
  const holderName = String(formData.get('holder_name') ?? '').trim();
  const cardType = String(formData.get('card_type') ?? '')
    .trim()
    .toLowerCase();
  const network = Number(formData.get('network'));
  const expiryMonth = Number(formData.get('expiry_month'));
  const expiryYearRaw = String(formData.get('expiry_year') ?? '').trim();
  const cvv = String(formData.get('cvv') ?? '').trim();

  return {
    colorName: buildCardAppearance(colorName, patternKey),
    status,
    tags,
    cardName,
    provider,
    creditLimitRaw,
    creditLimit: Number.isFinite(creditLimit) ? creditLimit : null,
    billingDateRaw,
    billingDate: Number.isInteger(billingDate) ? billingDate : null,
    paymentDateRaw,
    paymentDate: Number.isInteger(paymentDate) ? paymentDate : null,
    number,
    normalizedNumber,
    holderName,
    cardType,
    network,
    expiryMonth,
    expiryYearRaw,
    cvv,
  };
}

export function parseCardTags(rawTags: string) {
  const seen = new Set<string>();

  return rawTags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .filter((tag) => {
      const normalized = tag.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .slice(0, 8);
}

export function parseCardFormDataWithId(formData: FormData): ParsedCardFormDataWithId {
  const parsed = parseCardFormData(formData);
  const id = String(formData.get('id') ?? '').trim();

  return {
    ...parsed,
    id,
  };
}

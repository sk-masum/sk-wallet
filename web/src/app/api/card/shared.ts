import type { UserRouteContext } from '@/app/api/shared/owned-route';
import { isCardStatus } from '@/constants/card/status';
import {
  detokenizeCardCvv,
  detokenizeCardNumber,
  tokenizeCardCvv,
  tokenizeCardNumber,
} from '@/lib/security/card-token';

export type CardWritePayload = {
  color_name?: string;
  status?: string;
  tags?: string[];
  card_name?: string;
  provider?: string | null;
  credit_limit?: number | null;
  billing_date?: number | null;
  payment_date?: number | null;
  number?: string;
  holder_name?: string;
  expiry_month?: number | null;
  expiry_year?: number;
  cvv?: string;
  network?: number;
  isCredit?: boolean;
};

export type CardWriteData = {
  color_name: string | null;
  tags: string[];
  card_name: string | null;
  provider_id: bigint | null;
  credit_limit: number | null;
  billing_date: number | null;
  payment_date: number | null;
  number: string;
  holder_name: string | null;
  expiry_month: number | undefined;
  expiry_year: number | undefined;
  cvv: string;
  network: number;
  isCredit: boolean;
  status?: string;
};

export type CardWritePreparationResult =
  | {
      ok: true;
      writeData: CardWriteData;
    }
  | {
      ok: false;
      errorCode: 'TOKENIZATION' | 'PROVIDER';
      message: string;
    };

export function toSafeNumber(value: bigint | number | null | undefined) {
  if (value === null || value === undefined) return null;
  return typeof value === 'bigint' ? Number(value) : value;
}

export function decodeCardFieldOrEmpty(value: string) {
  try {
    return detokenizeCardNumber(value);
  } catch {
    return '';
  }
}

export function decodeCvvFieldOrEmpty(value: string) {
  try {
    return detokenizeCardCvv(value);
  } catch {
    return '';
  }
}

type CardResponseSource = {
  id: bigint | number;
  provider_id: bigint | number | null;
  credit_limit: { toNumber: () => number } | null;
  number: string;
  cvv: string;
  card_provider?: { name: string } | null;
  [key: string]: unknown;
};

export function mapCardForResponse(card: CardResponseSource) {
  return {
    ...card,
    id: toSafeNumber(card.id),
    provider_id: toSafeNumber(card.provider_id),
    provider: card.card_provider?.name ?? null,
    credit_limit: card.credit_limit ? card.credit_limit.toNumber() : null,
    number: decodeCardFieldOrEmpty(card.number),
    cvv: decodeCvvFieldOrEmpty(card.cvv),
    card_provider: undefined,
  };
}

export async function resolveOrCreateProvider(
  prisma: UserRouteContext['prisma'],
  rawProvider?: string | null,
) {
  const provider = String(rawProvider ?? '')
    .trim()
    .replace(/\s+/g, ' ');

  if (!provider) {
    return {
      provider,
      providerId: null as bigint | null,
      error: null as string | null,
    };
  }

  const existingProvider = await prisma.card_provider.findFirst({
    where: {
      name: {
        equals: provider,
        mode: 'insensitive',
      },
    },
    select: { id: true, name: true },
  });

  if (existingProvider) {
    return {
      provider: existingProvider.name,
      providerId: existingProvider.id,
      error: null,
    };
  }

  try {
    const createdProvider = await prisma.card_provider.create({
      data: { name: provider },
      select: { id: true, name: true },
    });

    return {
      provider: createdProvider.name,
      providerId: createdProvider.id,
      error: null,
    };
  } catch {
    const resolvedProvider = await prisma.card_provider.findFirst({
      where: {
        name: {
          equals: provider,
          mode: 'insensitive',
        },
      },
      select: { id: true, name: true },
    });

    if (!resolvedProvider) {
      return {
        provider,
        providerId: null,
        error: 'Failed to resolve provider after create',
      };
    }

    return {
      provider: resolvedProvider.name,
      providerId: resolvedProvider.id,
      error: null,
    };
  }
}

function sanitizeTags(tags: string[] | undefined) {
  if (!Array.isArray(tags)) return [];

  return tags
    .map((tag) => String(tag).trim())
    .filter(Boolean)
    .slice(0, 8);
}

function normalizeDatePart(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 31) {
    return null;
  }

  return value;
}

export function buildCardWriteData(
  payload: CardWritePayload,
  providerId: bigint | null,
  tokenizedNumber: string,
  tokenizedCvv: string,
  mode: 'create' | 'update',
): CardWriteData {
  const normalizedStatus = String(payload.status ?? '')
    .trim()
    .toLowerCase();

  const data: CardWriteData = {
    color_name: payload.color_name?.trim() || null,
    tags: sanitizeTags(payload.tags),
    card_name: payload.card_name?.trim() || null,
    provider_id: providerId,
    credit_limit:
      Boolean(payload.isCredit) &&
      typeof payload.credit_limit === 'number' &&
      Number.isFinite(payload.credit_limit)
        ? payload.credit_limit
        : null,
    billing_date: normalizeDatePart(payload.billing_date),
    payment_date: normalizeDatePart(payload.payment_date),
    number: tokenizedNumber,
    holder_name: payload.holder_name?.trim() || null,
    expiry_month: payload.expiry_month ?? undefined,
    expiry_year: payload.expiry_year ?? undefined,
    cvv: tokenizedCvv,
    network: payload.network ?? 0,
    isCredit: Boolean(payload.isCredit),
  };

  if (mode === 'create') {
    data.status = isCardStatus(normalizedStatus) ? normalizedStatus : 'active';
  } else if (payload.status !== undefined && isCardStatus(normalizedStatus)) {
    data.status = normalizedStatus;
  }

  return data;
}

export async function prepareCardWriteData(
  prisma: UserRouteContext['prisma'],
  payload: CardWritePayload,
  mode: 'create' | 'update',
): Promise<CardWritePreparationResult> {
  let tokenizedNumber = '';
  let tokenizedCvv = '';

  try {
    tokenizedNumber = tokenizeCardNumber(String(payload.number ?? ''));
    tokenizedCvv = tokenizeCardCvv(String(payload.cvv ?? ''));
  } catch {
    return {
      ok: false,
      errorCode: 'TOKENIZATION',
      message: 'Card tokenization is not configured correctly',
    };
  }

  const { providerId, error: providerError } = await resolveOrCreateProvider(
    prisma,
    payload.provider,
  );

  if (providerError) {
    return {
      ok: false,
      errorCode: 'PROVIDER',
      message: providerError,
    };
  }

  return {
    ok: true,
    writeData: buildCardWriteData(payload, providerId, tokenizedNumber, tokenizedCvv, mode),
  };
}

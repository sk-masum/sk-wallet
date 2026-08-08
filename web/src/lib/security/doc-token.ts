import { detokenizeValue, resolveTokenSecret, tokenizeValue } from '@/lib/security/token-crypto';

function getDocTokenSecret() {
  return resolveTokenSecret(
    ['DOC_TOKEN_SECRET', 'CARD_TOKEN_SECRET', 'NEXT_PUBLIC_CARD_TOKEN_SECRET'],
    'DOC_TOKEN_SECRET',
  );
}

export function tokenizeDocumentNumber(rawValue: string) {
  return tokenizeValue(rawValue, getDocTokenSecret());
}

export function detokenizeDocumentNumber(value: string | null | undefined) {
  return detokenizeValue(value, getDocTokenSecret(), {
    invalidFormatMessage: 'Invalid document token format',
  });
}

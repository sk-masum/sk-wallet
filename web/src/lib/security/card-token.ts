import { detokenizeValue, resolveTokenSecret, tokenizeValue } from '@/lib/security/token-crypto';

function getTokenSecret() {
  return resolveTokenSecret(
    [
      'CARD_TOKEN_SECRET',
      'DOC_TOKEN_SECRET',
      'CREDENTIAL_TOKEN_SECRET',
      'NEXT_PUBLIC_CARD_TOKEN_SECRET',
    ],
    'CARD_TOKEN_SECRET',
  );
}

export function tokenizeCardNumber(rawCardNumber: string) {
  const digits = String(rawCardNumber).replace(/\D/g, '');
  return tokenizeValue(digits, getTokenSecret());
}

export function detokenizeCardNumber(value: string | null | undefined) {
  const decrypted = detokenizeValue(value, getTokenSecret(), {
    invalidFormatMessage: 'Invalid card token format',
    // Backward compatibility for rows persisted before tokenization.
    onLegacyValue: (legacy) => legacy.replace(/\D/g, ''),
  });

  return decrypted.replace(/\D/g, '');
}

export function tokenizeCardCvv(rawCvv: string) {
  return tokenizeCardNumber(rawCvv);
}

export function detokenizeCardCvv(value: string | null | undefined) {
  return detokenizeCardNumber(value);
}

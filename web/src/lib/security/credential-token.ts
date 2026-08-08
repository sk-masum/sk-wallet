import { detokenizeValue, resolveTokenSecret, tokenizeValue } from '@/lib/security/token-crypto';

function getCredentialTokenSecret() {
  return resolveTokenSecret(
    [
      'CREDENTIAL_TOKEN_SECRET',
      'DOC_TOKEN_SECRET',
      'CARD_TOKEN_SECRET',
      'NEXT_PUBLIC_CARD_TOKEN_SECRET',
    ],
    'CREDENTIAL_TOKEN_SECRET',
  );
}

export function tokenizeCredentialSecret(rawValue: string) {
  return tokenizeValue(rawValue, getCredentialTokenSecret());
}

export function detokenizeCredentialSecret(value: string | null | undefined) {
  return detokenizeValue(value, getCredentialTokenSecret(), {
    invalidFormatMessage: 'Invalid credential token format',
  });
}

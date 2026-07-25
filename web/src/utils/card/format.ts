import type { WalletCard } from '@/models/card';

export function maskCardNumber(raw: unknown) {
  const value = typeof raw === 'string' || typeof raw === 'number' ? String(raw) : '';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 8) return '•••• •••• •••• ••••';
  const last4 = digits.slice(-4);
  return `•••• •••• •••• ${last4}`;
}

export function formatExpiry(
  expiryMonth: WalletCard['expiry_month'],
  expiryYear: WalletCard['expiry_year'],
) {
  const monthNum = Number(expiryMonth);
  const yearStr =
    expiryYear === null || expiryYear === undefined ? '' : String(expiryYear).replace(/\D/g, '');

  if (!Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12 || yearStr.length < 2) {
    return 'MM/YY';
  }

  const mm = String(monthNum).padStart(2, '0');
  const yy = yearStr.slice(-2);
  return `${mm}/${yy}`;
}

import { CredentialTypeCode, type CredentialTypeFieldConfig } from '@/models/credential';

export const CREDENTIAL_TYPE_OPTIONS: CredentialTypeFieldConfig[] = [
  {
    code: CredentialTypeCode.LOGIN,
    label: 'Login',
    placeholder: 'Account password',
    hint: 'Use for websites/apps login passwords',
  },
  {
    code: CredentialTypeCode.EMAIL,
    label: 'Email',
    placeholder: 'Email account password',
    hint: 'Use for email account credentials',
  },
  {
    code: CredentialTypeCode.SOCIAL,
    label: 'Social',
    placeholder: 'Social media account password',
    hint: 'Use for social platform credentials',
  },
  {
    code: CredentialTypeCode.BANKING,
    label: 'Banking',
    placeholder: 'Banking password or transaction passcode',
    hint: 'Use for banking credentials',
  },
  {
    code: CredentialTypeCode.PIN,
    label: 'PIN',
    placeholder: '4 to 12 digit PIN',
    hint: 'Use for device/card/app PINs',
  },
  {
    code: CredentialTypeCode.OTP,
    label: 'OTP / 2FA',
    placeholder: 'Backup code or authenticator secret',
    hint: 'Use for one-time passcodes and 2FA backup details',
  },
  {
    code: CredentialTypeCode.WALLET,
    label: 'Wallet',
    placeholder: 'Wallet passphrase or private key',
    hint: 'Use for crypto or digital wallet access data',
  },
  {
    code: CredentialTypeCode.API_KEY,
    label: 'API Key',
    placeholder: 'API token or key',
    hint: 'Use for developer API tokens',
  },
  {
    code: CredentialTypeCode.SERVER,
    label: 'Server',
    placeholder: 'SSH password or server secret',
    hint: 'Use for server login and infrastructure credentials',
  },
  {
    code: CredentialTypeCode.DATABASE,
    label: 'Database',
    placeholder: 'Database user password or connection secret',
    hint: 'Use for database credentials and access secrets',
  },
  {
    code: CredentialTypeCode.WIFI,
    label: 'Wi-Fi',
    placeholder: 'Wi-Fi password',
    hint: 'Use for wireless network passwords',
  },
  {
    code: CredentialTypeCode.OTHER,
    label: 'Other',
    placeholder: 'Credential secret',
    hint: 'Use for any other credential type',
  },
];

const CREDENTIAL_TYPE_SET = new Set(CREDENTIAL_TYPE_OPTIONS.map((item) => item.code));

export function isCredentialTypeCode(value: string): value is CredentialTypeCode {
  return CREDENTIAL_TYPE_SET.has(value as CredentialTypeCode);
}

export function getCredentialTypeConfig(type: string) {
  return CREDENTIAL_TYPE_OPTIONS.find((item) => item.code === type) ?? null;
}

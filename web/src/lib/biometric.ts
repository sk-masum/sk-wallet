export const BIOMETRIC_STORAGE_KEY = 'sk-wallet:biometric-enabled'
export const BIOMETRIC_CREDENTIAL_STORAGE_KEY = 'sk-wallet:biometric-credential-id'
export const BIOMETRIC_SESSION_UNLOCK_KEY = 'sk-wallet:biometric-unlocked-session'

export function isWebAuthnSupported() {
  return typeof window !== 'undefined' && typeof PublicKeyCredential !== 'undefined'
}

export async function isPlatformAuthenticatorAvailable() {
  if (!isWebAuthnSupported()) return false
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

function toBase64Url(bytes: Uint8Array) {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(base64url: string) {
  const padded = base64url.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(base64url.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function randomBytes(length: number) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return bytes
}

export async function registerBiometricCredential() {
  const challenge = randomBytes(32)
  const userId = randomBytes(16)

  const credential = (await navigator.credentials.create({
    publicKey: {
      challenge,
      rp: { name: 'SK Wallet' },
      user: {
        id: userId,
        name: 'sk-wallet-user',
        displayName: 'SK Wallet User',
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 },
      ],
      timeout: 60000,
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
      attestation: 'none',
    },
  })) as PublicKeyCredential | null

  if (!credential) {
    return null
  }

  const credentialId = toBase64Url(new Uint8Array(credential.rawId))
  localStorage.setItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY, credentialId)
  return credentialId
}

export async function verifyBiometricCredential() {
  const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY)
  if (!credentialId) return false

  const challenge = randomBytes(32)
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge,
      allowCredentials: [{
        id: fromBase64Url(credentialId),
        type: 'public-key',
      }],
      userVerification: 'required',
      timeout: 60000,
    },
  })

  return Boolean(assertion)
}

export const BIOMETRIC_STORAGE_KEY = 'sk-wallet:biometric-enabled';
export const BIOMETRIC_CREDENTIAL_STORAGE_KEY = 'sk-wallet:biometric-credential-id';
export const BIOMETRIC_SESSION_UNLOCK_KEY = 'sk-wallet:biometric-unlocked-session';
export const PERSISTENT_STORAGE_ONBOARDED_KEY = 'sk-wallet:persistent-storage-onboarded';

const BIOMETRIC_DB_NAME = 'sk-wallet-biometric';
const BIOMETRIC_DB_VERSION = 1;
const BIOMETRIC_DB_STORE = 'vault';
const BIOMETRIC_VAULT_KEY_ID = 'local-vault-key';

let unlockedVaultKey: CryptoKey | null = null;

export function isWebAuthnSupported() {
  return typeof window !== 'undefined' && typeof PublicKeyCredential !== 'undefined';
}

export type PersistentStorageResult = 'granted' | 'already-granted' | 'denied' | 'unsupported';
export type PersistentStorageOnboardingResult = PersistentStorageResult | 'already-requested';

export async function requestPersistentVaultStorage(): Promise<PersistentStorageResult> {
  if (typeof navigator === 'undefined') {
    return 'unsupported';
  }

  const storageManager = navigator.storage;
  if (!storageManager || typeof storageManager.persist !== 'function') {
    return 'unsupported';
  }

  try {
    if (typeof storageManager.persisted === 'function') {
      const alreadyPersistent = await storageManager.persisted();
      if (alreadyPersistent) {
        return 'already-granted';
      }
    }

    const granted = await storageManager.persist();
    return granted ? 'granted' : 'denied';
  } catch {
    return 'denied';
  }
}

export async function requestPersistentStorageOnFirstLogin(): Promise<PersistentStorageOnboardingResult> {
  if (typeof window === 'undefined') {
    return 'unsupported';
  }

  const alreadyRequested = localStorage.getItem(PERSISTENT_STORAGE_ONBOARDED_KEY) === 'true';
  if (alreadyRequested) {
    return 'already-requested';
  }

  const result = await requestPersistentVaultStorage();

  if (result === 'granted' || result === 'already-granted' || result === 'unsupported') {
    localStorage.setItem(PERSISTENT_STORAGE_ONBOARDED_KEY, 'true');
  }

  return result;
}

export async function isPlatformAuthenticatorAvailable() {
  if (!isWebAuthnSupported()) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

function toBase64Url(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(base64url: string) {
  const padded = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(base64url.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function randomBytes(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function requireBrowserContext() {
  if (typeof window === 'undefined') {
    throw new Error('Biometric utilities are only available in a browser context');
  }
}

function openBiometricDb(): Promise<IDBDatabase> {
  requireBrowserContext();

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(BIOMETRIC_DB_NAME, BIOMETRIC_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(BIOMETRIC_DB_STORE)) {
        db.createObjectStore(BIOMETRIC_DB_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error('Failed to open biometric IndexedDB'));
  });
}

function readVaultKeyFromDb(): Promise<CryptoKey | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openBiometricDb();
      const tx = db.transaction(BIOMETRIC_DB_STORE, 'readonly');
      const store = tx.objectStore(BIOMETRIC_DB_STORE);
      const request = store.get(BIOMETRIC_VAULT_KEY_ID);

      request.onsuccess = () => {
        const value = request.result;
        resolve(value instanceof CryptoKey ? value : null);
      };
      request.onerror = () => reject(request.error ?? new Error('Failed to read vault key'));
      tx.oncomplete = () => db.close();
    } catch (error) {
      reject(error);
    }
  });
}

function writeVaultKeyToDb(key: CryptoKey): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openBiometricDb();
      const tx = db.transaction(BIOMETRIC_DB_STORE, 'readwrite');
      const store = tx.objectStore(BIOMETRIC_DB_STORE);
      const request = store.put(key, BIOMETRIC_VAULT_KEY_ID);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error ?? new Error('Failed to store vault key'));
      tx.oncomplete = () => db.close();
    } catch (error) {
      reject(error);
    }
  });
}

function removeVaultKeyFromDb(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openBiometricDb();
      const tx = db.transaction(BIOMETRIC_DB_STORE, 'readwrite');
      const store = tx.objectStore(BIOMETRIC_DB_STORE);
      const request = store.delete(BIOMETRIC_VAULT_KEY_ID);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error ?? new Error('Failed to clear vault key'));
      tx.oncomplete = () => db.close();
    } catch (error) {
      reject(error);
    }
  });
}

async function createVaultKey() {
  return crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function isBiometricVaultProvisioned() {
  const key = await readVaultKeyFromDb();
  return Boolean(key);
}

export async function initializeBiometricVault() {
  const existing = await readVaultKeyFromDb();
  if (existing) return;

  const key = await createVaultKey();
  await writeVaultKeyToDb(key);
}

export function isBiometricVaultUnlocked() {
  return unlockedVaultKey !== null;
}

export function lockBiometricVault() {
  unlockedVaultKey = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY);
  }
}

export async function clearBiometricVault() {
  lockBiometricVault();
  await removeVaultKeyFromDb();
}

export async function unlockBiometricVault() {
  const verified = await verifyBiometricCredential();
  if (!verified) return false;

  const key = await readVaultKeyFromDb();
  if (!key) {
    throw new Error('Biometric vault is not initialized');
  }

  unlockedVaultKey = key;
  sessionStorage.setItem(BIOMETRIC_SESSION_UNLOCK_KEY, 'true');
  return true;
}

export type BiometricVaultPayload = {
  iv: string;
  ciphertext: string;
};

export async function encryptWithBiometricVault(plainText: string): Promise<BiometricVaultPayload> {
  if (!unlockedVaultKey) {
    throw new Error('Biometric vault is locked');
  }

  const iv = randomBytes(12);
  const encoded = new TextEncoder().encode(plainText);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    unlockedVaultKey,
    encoded,
  );

  return {
    iv: toBase64Url(iv),
    ciphertext: toBase64Url(new Uint8Array(encrypted)),
  };
}

export async function decryptWithBiometricVault(payload: BiometricVaultPayload) {
  if (!unlockedVaultKey) {
    throw new Error('Biometric vault is locked');
  }

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: fromBase64Url(payload.iv),
    },
    unlockedVaultKey,
    fromBase64Url(payload.ciphertext),
  );

  return new TextDecoder().decode(decrypted);
}

export async function registerBiometricCredential() {
  const challenge = randomBytes(32);
  const userId = randomBytes(16);

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
  })) as PublicKeyCredential | null;

  if (!credential) {
    return null;
  }

  const credentialId = toBase64Url(new Uint8Array(credential.rawId));
  localStorage.setItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY, credentialId);
  return credentialId;
}

export async function verifyBiometricCredential() {
  const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
  if (!credentialId) return false;

  const challenge = randomBytes(32);
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge,
      allowCredentials: [
        {
          id: fromBase64Url(credentialId),
          type: 'public-key',
        },
      ],
      userVerification: 'required',
      timeout: 60000,
    },
  });

  return Boolean(assertion);
}

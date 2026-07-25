import { showToast } from '@/lib/toast';

type CopyFailureReason = 'empty' | 'unavailable' | 'failed';

function normalizeText(value: string) {
  return String(value ?? '').trim();
}

export async function copyToClipboard(
  value: string,
): Promise<{ ok: true; text: string } | { ok: false; reason: CopyFailureReason }> {
  const text = normalizeText(value);

  if (!text || text === 'N/A') {
    return { ok: false, reason: 'empty' };
  }

  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return { ok: false, reason: 'unavailable' };
  }

  try {
    await navigator.clipboard.writeText(text);
    return { ok: true, text };
  } catch {
    return { ok: false, reason: 'failed' };
  }
}

export async function copyWithToast(value: string, label: string) {
  const result = await copyToClipboard(value);

  if (result.ok) {
    showToast({ message: `${label} copied.`, variant: 'success' });
    return true;
  }

  if (result.reason === 'empty') {
    showToast({ message: `No ${label.toLowerCase()} to copy.`, variant: 'error' });
    return false;
  }

  if (result.reason === 'unavailable') {
    showToast({ message: 'Clipboard is not available on this device.', variant: 'error' });
    return false;
  }

  showToast({ message: `Failed to copy ${label.toLowerCase()}.`, variant: 'error' });
  return false;
}

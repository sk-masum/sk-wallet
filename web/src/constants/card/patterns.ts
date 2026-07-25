export type CardPattern = {
  key: string;
  label: string;
  overlayClassName: string;
  swatchClassName: string;
};

export const CARD_PATTERN_NONE = 'none';

export const CARD_PATTERNS: CardPattern[] = [
  {
    key: CARD_PATTERN_NONE,
    label: 'None',
    overlayClassName: '',
    swatchClassName: 'bg-transparent',
  },
  {
    key: 'dots',
    label: 'Dots',
    overlayClassName:
      'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] bg-[length:12px_12px]',
    swatchClassName:
      'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] bg-[length:8px_8px]',
  },
  {
    key: 'diagonal',
    label: 'Diagonal',
    overlayClassName:
      'bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_2px,transparent_2px,transparent_12px)]',
    swatchClassName:
      'bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.55)_0px,rgba(255,255,255,0.55)_2px,transparent_2px,transparent_8px)]',
  },
  {
    key: 'grid',
    label: 'Grid',
    overlayClassName:
      'bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:16px_16px]',
    swatchClassName:
      'bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:8px_8px]',
  },
  {
    key: 'waves',
    label: 'Waves',
    overlayClassName:
      'bg-[radial-gradient(120%_70%_at_0%_50%,rgba(255,255,255,0.2)_0%,transparent_60%),radial-gradient(120%_70%_at_100%_50%,rgba(255,255,255,0.14)_0%,transparent_58%)]',
    swatchClassName:
      'bg-[radial-gradient(120%_70%_at_0%_50%,rgba(255,255,255,0.55)_0%,transparent_60%),radial-gradient(120%_70%_at_100%_50%,rgba(255,255,255,0.5)_0%,transparent_58%)]',
  },
  {
    key: 'noise',
    label: 'Noise',
    overlayClassName:
      'bg-[linear-gradient(0deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08)),radial-gradient(rgba(255,255,255,0.14)_0.6px,transparent_0.6px)] bg-[size:auto,3px_3px]',
    swatchClassName:
      'bg-[linear-gradient(0deg,rgba(255,255,255,0.3),rgba(255,255,255,0.3)),radial-gradient(rgba(255,255,255,0.45)_0.6px,transparent_0.6px)] bg-[size:auto,3px_3px]',
  },
];

export function getCardPatternByKey(key: string | null | undefined) {
  const normalized = String(key ?? '')
    .trim()
    .toLowerCase();
  return CARD_PATTERNS.find((pattern) => pattern.key === normalized) ?? CARD_PATTERNS[0];
}

export function getRandomCardPatternKey() {
  const selectable = CARD_PATTERNS.filter((pattern) => pattern.key !== CARD_PATTERN_NONE);
  const picked = selectable[Math.floor(Math.random() * selectable.length)];
  return picked?.key ?? CARD_PATTERN_NONE;
}

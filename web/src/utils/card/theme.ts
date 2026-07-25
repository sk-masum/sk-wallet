import { CARD_THEMES } from '@/constants/card/themes';
import { CARD_PATTERN_NONE, getCardPatternByKey } from '@/constants/card/patterns';

const APPEARANCE_SEPARATOR = '::';

export function getCardThemes() {
  return CARD_THEMES;
}

export function getCardThemeByColorName(colorName: string) {
  const { colorName: parsedColorName } = parseCardAppearance(colorName);
  const normalized = parsedColorName.trim().toLowerCase();
  return (
    CARD_THEMES.find((theme) => theme.colorName.toLowerCase() === normalized) ?? CARD_THEMES[0]
  );
}

export function parseCardAppearance(value: string | null | undefined) {
  const raw = String(value ?? '').trim();
  if (!raw) {
    return {
      colorName: CARD_THEMES[0]?.colorName ?? '',
      patternKey: CARD_PATTERN_NONE,
    };
  }

  const [rawColorName, rawPatternKey] = raw.split(APPEARANCE_SEPARATOR);
  const normalizedColorName = rawColorName?.trim() ?? '';
  const theme =
    CARD_THEMES.find(
      (candidate) => candidate.colorName.toLowerCase() === normalizedColorName.toLowerCase(),
    ) ?? CARD_THEMES[0];
  const pattern = getCardPatternByKey(rawPatternKey);

  return {
    colorName: theme?.colorName ?? '',
    patternKey: pattern.key,
  };
}

export function buildCardAppearance(colorName: string, patternKey: string) {
  const theme = getCardThemeByColorName(colorName);
  const pattern = getCardPatternByKey(patternKey);
  if (pattern.key === CARD_PATTERN_NONE) {
    return theme.colorName;
  }

  return `${theme.colorName}${APPEARANCE_SEPARATOR}${pattern.key}`;
}

export function getCardPatternKeyFromColorName(colorName: string | null | undefined) {
  return parseCardAppearance(colorName).patternKey;
}

export function getCardTheme(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }

  return CARD_THEMES[Math.abs(hash) % CARD_THEMES.length];
}

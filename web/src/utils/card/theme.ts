import { CARD_THEMES } from '@/constants/card/themes'

export function getCardThemes() {
  return CARD_THEMES
}

export function getCardThemeByColorName(colorName: string) {
  const normalized = colorName.trim().toLowerCase()
  return CARD_THEMES.find((theme) => theme.colorName.toLowerCase() === normalized) ?? CARD_THEMES[0]
}

export function getCardTheme(seed: string) {
  let hash = 0

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }

  return CARD_THEMES[Math.abs(hash) % CARD_THEMES.length]
}

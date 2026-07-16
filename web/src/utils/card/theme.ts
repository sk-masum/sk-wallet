import type { CardTheme } from '@/models/card'

const CARD_THEMES: CardTheme[] = [
  {
    surface: 'bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700',
    chip: 'bg-linear-to-br from-amber-300 to-yellow-500',
    mutedText: 'text-blue-100/80',
  },
  {
    surface: 'bg-linear-to-br from-emerald-700 via-teal-700 to-cyan-700',
    chip: 'bg-linear-to-br from-lime-300 to-emerald-400',
    mutedText: 'text-emerald-100/80',
  },
  {
    surface: 'bg-linear-to-br from-rose-700 via-pink-700 to-fuchsia-700',
    chip: 'bg-linear-to-br from-orange-300 to-rose-400',
    mutedText: 'text-rose-100/80',
  },
  {
    surface: 'bg-linear-to-br from-orange-700 via-amber-700 to-yellow-700',
    chip: 'bg-linear-to-br from-zinc-200 to-zinc-400',
    mutedText: 'text-amber-100/80',
  },
  {
    surface: 'bg-linear-to-br from-slate-700 via-slate-800 to-zinc-900',
    chip: 'bg-linear-to-br from-sky-200 to-blue-400',
    mutedText: 'text-slate-200/80',
  },
  {
    surface: 'bg-linear-to-br from-red-700 via-orange-700 to-amber-700',
    chip: 'bg-linear-to-br from-yellow-200 to-amber-400',
    mutedText: 'text-red-100/80',
  },
  {
    surface: 'bg-linear-to-br from-violet-700 via-purple-700 to-indigo-800',
    chip: 'bg-linear-to-br from-fuchsia-200 to-violet-400',
    mutedText: 'text-violet-100/80',
  },
  {
    surface: 'bg-linear-to-br from-cyan-700 via-blue-700 to-indigo-800',
    chip: 'bg-linear-to-br from-cyan-200 to-sky-400',
    mutedText: 'text-cyan-100/80',
  },
]

export function getCardTheme(seed: string) {
  let hash = 0

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }

  return CARD_THEMES[Math.abs(hash) % CARD_THEMES.length]
}

import { Ban, CalendarClock, CreditCard, FileText, OctagonAlert, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'

type SummaryStatIconKey = 'cards' | 'credentials' | 'documents' | 'expiring' | 'blocked' | 'billing'

type SummaryStatCardProps = {
    label: string
    value: string
    icon?: SummaryStatIconKey
    toneClassName?: string
}

const iconMap = {
    cards: CreditCard,
    credentials: Settings,
    documents: FileText,
    expiring: OctagonAlert,
    blocked: Ban,
    billing: CalendarClock,
} as const

export function SummaryStatCard({ label, value, icon, toneClassName }: SummaryStatCardProps) {
    const Icon = icon ? iconMap[icon] : null

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-3xl border border-glass-border-strong bg-[radial-gradient(circle_at_14%_10%,hsl(var(--primary)/0.12),transparent_44%),radial-gradient(circle_at_88%_88%,hsl(var(--ring)/0.1),transparent_44%),var(--color-glass)] px-4 py-4 text-foreground shadow-neu-raised-sm backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[radial-gradient(circle_at_14%_10%,hsl(var(--primary)/0.15),transparent_44%),radial-gradient(circle_at_88%_88%,hsl(var(--ring)/0.12),transparent_44%),var(--color-glass-strong)]  sm:px-5 sm:py-5',
                toneClassName
            )}
        >
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-glass-overlay blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-glass-overlay-soft via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent" />
            <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-1 sm:gap-2">
                    <p className="max-w-[50%] sm:max-w-[70%] text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle">{label}</p>
                    {Icon ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/35 bg-background text-foreground shadow-neu-raised-sm  dark:bg-background/90">
                            <Icon className="h-4 w-4" />
                        </span>
                    ) : null}
                </div>
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{value}</p>
            </div>
        </div>
    )
}

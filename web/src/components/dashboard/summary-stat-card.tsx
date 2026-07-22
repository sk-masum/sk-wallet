import { CreditCard, FileText, OctagonAlert, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'

type SummaryStatIconKey = 'cards' | 'credentials' | 'documents' | 'expiring'

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
} as const

export function SummaryStatCard({ label, value, icon, toneClassName }: SummaryStatCardProps) {
    const Icon = icon ? iconMap[icon] : null

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-border/70 bg-[radial-gradient(circle_at_14%_10%,hsl(var(--primary)/0.14),transparent_44%),radial-gradient(circle_at_88%_88%,hsl(var(--accent)/0.1),transparent_44%),hsl(var(--background))] px-4 py-4 shadow-[0_14px_34px_-28px_rgba(0,0,0,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.6)] sm:px-5 sm:py-5',
                toneClassName
            )}
        >
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-white/18 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent" />
            <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <p className="max-w-[80%] text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/90">{label}</p>
                    {Icon ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]">
                            <Icon className="h-4 w-4" />
                        </span>
                    ) : null}
                </div>
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{value}</p>
            </div>
        </div>
    )
}

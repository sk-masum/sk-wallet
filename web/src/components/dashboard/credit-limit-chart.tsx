import type { DashboardPortfolioRow } from '@/models/dashboard'
import { formatCurrency } from '@/components/dashboard/format'

type CreditLimitChartProps = {
    rows: DashboardPortfolioRow[]
    totalLimit: number
}

const CHART_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#f97316', '#a855f7', '#ef4444', '#64748b']

function toPercent(value: number) {
    return `${Math.round(value)}%`
}

export function CreditLimitChart({ rows, totalLimit }: CreditLimitChartProps) {
    const shownRows = rows.slice(0, 6)
    const shownShare = shownRows.reduce((sum, row) => sum + row.share, 0)
    const otherShare = Math.max(0, 100 - shownShare)
    const hasOther = otherShare > 0.1

    const segments = [
        ...shownRows.map((row, index) => ({
            id: row.id,
            label: row.label,
            share: row.share,
            limit: row.limit,
            color: CHART_COLORS[index % CHART_COLORS.length],
        })),
        ...(hasOther
            ? [
                {
                    id: 'other',
                    label: 'Others',
                    share: otherShare,
                    limit: Math.max(0, totalLimit - shownRows.reduce((sum, row) => sum + row.limit, 0)),
                    color: CHART_COLORS[CHART_COLORS.length - 1],
                },
            ]
            : []),
    ]

    let running = 0
    const conicGradient =
        segments.length > 0
            ? `conic-gradient(${segments
                .map((segment) => {
                    const start = running
                    running += segment.share
                    return `${segment.color} ${start}% ${Math.min(100, running)}%`
                })
                .join(', ')})`
            : 'conic-gradient(#64748b 0% 100%)'

    return (
        <section className="relative overflow-hidden rounded-2xl border border-white/45 bg-[radial-gradient(circle_at_16%_18%,hsl(var(--primary)/0.13),transparent_44%),radial-gradient(circle_at_86%_84%,hsl(var(--accent)/0.1),transparent_44%),var(--glass-surface)] p-4 shadow-(--neu-shadow-raised-sm) backdrop-blur-md dark:border-white/12 sm:p-5 m-2">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />
            <div className="relative mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Credit Limit</h3>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground dark:text-foreground/78">Total Credit Limit</p>
                    <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{formatCurrency(totalLimit)}</p>
                </div>
            </div>
            <div className="relative">
                {rows.length === 0 ? (
                    <p className="text-sm text-muted-foreground dark:text-foreground/78">No credit limits found to render chart.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr] lg:items-start">
                        <div className="mx-auto flex w-full max-w-55 justify-center lg:mx-0">
                            <div className="relative h-44 w-44 rounded-full border border-white/45 shadow-(--neu-shadow-raised-sm) dark:border-white/12" style={{ background: conicGradient }}>
                                <div className="absolute inset-5 rounded-full border border-border/30 bg-background/90 shadow-(--neu-shadow-inset) backdrop-blur-sm" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground dark:text-foreground/78">Coverage</p>
                                    <p className="text-xl font-semibold text-foreground">{toPercent(Math.min(100, shownShare))}</p>
                                    <p className="text-xs text-muted-foreground dark:text-foreground/78">Top cards</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {segments.map((segment) => (
                                <div key={segment.id} className="space-y-1.5">
                                    <div className="flex items-center justify-between gap-2 text-sm">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
                                            <span className="truncate font-medium text-foreground">{segment.label}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-muted-foreground dark:text-foreground/78">{toPercent(segment.share)}</span>
                                            <span className="font-semibold text-foreground">{formatCurrency(segment.limit)}</span>
                                        </div>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-primary/80 shadow-(--neu-shadow-inset-sm)">
                                        <div
                                            className="h-2.5 rounded-full"
                                            style={{
                                                width: `${Math.min(100, Math.max(0, segment.share))}%`,
                                                backgroundColor: segment.color,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="rounded-lg border border-border/35 bg-background/86 px-3 py-2 text-xs text-muted-foreground shadow-(--neu-shadow-inset-sm) dark:text-foreground/78">
                                Percentages represent each card's contribution to your total credit limit.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

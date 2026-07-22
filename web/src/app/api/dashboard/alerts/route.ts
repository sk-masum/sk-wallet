import { NextResponse } from 'next/server'

import { getRequiredPrismaClient } from '@/lib/prisma'
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth'
import type { DashboardAlertsData } from '@/models/dashboard'

function getNextOccurrenceFromDay(day: number, now: Date) {
  if (!Number.isInteger(day) || day < 1 || day > 31) return null

  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const targetDay = Math.min(day, new Date(year, month + 1, 0).getDate())

  if (targetDay >= today) {
    return new Date(year, month, targetDay)
  }

  const nextMonthLastDay = new Date(year, month + 2, 0).getDate()
  return new Date(year, month + 1, Math.min(day, nextMonthLastDay))
}

function getCardExpiryDate(expiryYear: number | null, expiryMonth: number | null) {
  if (!expiryYear || !expiryMonth) return null
  return new Date(Number(expiryYear), Number(expiryMonth), 0)
}

function getDaysLeft(targetDate: Date, now: Date) {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.max(0, Math.ceil((targetDate.getTime() - now.getTime()) / msPerDay))
}

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext()

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse
  }

  const prisma = getRequiredPrismaClient()
  const now = new Date()
  const soonCutoff = new Date(now)
  soonCutoff.setDate(soonCutoff.getDate() + 45)

  const cards = await prisma.card.findMany({
    where: { owner_id: user.id },
    select: {
      id: true,
      card_name: true,
      status: true,
      billing_date: true,
      expiry_month: true,
      expiry_year: true,
    },
    orderBy: { created_at: 'desc' },
  })

  const expiringCards = cards
    .map((card) => {
      const expiryDate = getCardExpiryDate(card.expiry_year, card.expiry_month)
      if (!expiryDate || expiryDate < now || expiryDate > soonCutoff) return null

      return {
        id: String(card.id),
        name: card.card_name || `Card ${String(card.id)}`,
        status: String(card.status ?? 'active').toLowerCase(),
        expiryDate: expiryDate.toISOString(),
        daysLeft: getDaysLeft(expiryDate, now),
        href: `/card/${String(card.id)}`,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())

  const recentBillingCards = cards
    .map((card) => {
      const dueDate = getNextOccurrenceFromDay(card.billing_date ?? -1, now)
      if (!dueDate || card.billing_date == null) return null

      return {
        id: String(card.id),
        name: card.card_name || `Card ${String(card.id)}`,
        billingDay: Number(card.billing_date),
        nextBillingDate: dueDate.toISOString(),
        href: `/card/${String(card.id)}`,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
    .slice(0, 20)

  const blockedOrReplacedCards = cards.filter(
    (card) => card.status === 'replaced' || card.status === 'blocked'
  ).length

  const data: DashboardAlertsData = {
    summary: {
      expiringCardsSoon: expiringCards.length,
      blockedOrReplacedCards,
      cardsWithBillingConfigured: recentBillingCards.length,
    },
    expiringCards,
    recentBillingCards,
  }

  return NextResponse.json({ data })
}

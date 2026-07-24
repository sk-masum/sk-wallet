export type DashboardPortfolioRow = {
  id: string
  label: string
  limit: number
  share: number
}

export type DashboardCardPreview = {
  id: string
  name: string
  maskedNumber: string
  colorName: string
  network: number
  networkLabel: string
  href: string
}

export type DashboardFavoriteVaultItem = {
  id: string
  type: 'credential' | 'document'
  title: string
  subtitle: string
  href: string
  document_type: string
  metadata?: Record<string, unknown> | null
}

export type DashboardRecentBillingCard = {
  id: string
  name: string
  billingDay: number
  nextBillingDate: string
  href: string
}

export type DashboardExpiringCard = {
  id: string
  name: string
  status: string
  expiryDate: string
  daysLeft: number
  href: string
}

export type DashboardAlertsData = {
  summary: {
    expiringCardsSoon: number
    blockedOrReplacedCards: number
    cardsWithBillingConfigured: number
  }
  expiringCards: DashboardExpiringCard[]
  recentBillingCards: DashboardRecentBillingCard[]
}

export type DashboardData = {
  summary: {
    totalCards: number
    activeCredentials: number
    storedDocuments: number
    expiringSoonCount: number
  }
  financial: {
    totalCreditLimit: number
    creditPortfolio: DashboardPortfolioRow[]
  }
  visual: {
    cardsCarousel: DashboardCardPreview[]
    favoriteVaultCarousel: DashboardFavoriteVaultItem[]
    recentBillingCards: DashboardRecentBillingCard[]
  }
}

type BuildCardFilterHrefParams = {
  selectedNetwork: string
  selectedProvider: string
  selectedTag: string
  selectedExpiry: string
  selectedType: string
  selectedSort: string
  selectedGroup: string
  selectedCreditLimitMin: string
  selectedCreditLimitMax: string
  selectedBillingDate: string
  selectedPaymentDate: string
  query: string
}

type CardFilterOverride = {
  network?: string
  provider?: string
  tag?: string
  expiry?: string
  type?: string
  sort?: string
  group?: string
  credit_limit?: string
  credit_limit_min?: string
  credit_limit_max?: string
  billing_date?: string
  payment_date?: string
  q?: string
}

export function buildCardFilterHref(
  current: BuildCardFilterHrefParams,
  next: CardFilterOverride
) {
  const nextNetwork = next.network ?? current.selectedNetwork
  const nextProvider = next.provider ?? current.selectedProvider
  const nextTag = next.tag ?? current.selectedTag
  const nextExpiry = next.expiry ?? current.selectedExpiry
  const nextType = next.type ?? current.selectedType
  const nextSort = next.sort ?? current.selectedSort
  const nextGroup = next.group ?? current.selectedGroup
  const nextCreditLimitMin = next.credit_limit_min ?? current.selectedCreditLimitMin
  const nextCreditLimitMax = next.credit_limit_max ?? current.selectedCreditLimitMax
  const nextBillingDate = next.billing_date ?? current.selectedBillingDate
  const nextPaymentDate = next.payment_date ?? current.selectedPaymentDate
  const nextQuery = next.q ?? current.query
  const nextParams = new URLSearchParams()

  if (nextQuery) {
    nextParams.set('q', nextQuery)
  }

  if (nextNetwork) {
    nextParams.set('network', nextNetwork)
  }

  if (nextProvider) {
    nextParams.set('provider', nextProvider)
  }

  if (nextTag) {
    nextParams.set('tag', nextTag)
  }

  if (nextExpiry && nextExpiry !== 'all') {
    nextParams.set('expiry', nextExpiry)
  }

  if (nextType && nextType !== 'all') {
    nextParams.set('type', nextType)
  }

  if (nextSort && nextSort !== 'newest') {
    nextParams.set('sort', nextSort)
  }

  if (nextGroup && nextGroup !== 'none') {
    nextParams.set('group', nextGroup)
  }

  if (nextCreditLimitMin) {
    nextParams.set('credit_limit_min', nextCreditLimitMin)
  }

  if (nextCreditLimitMax) {
    nextParams.set('credit_limit_max', nextCreditLimitMax)
  }

  if (nextBillingDate) {
    nextParams.set('billing_date', nextBillingDate)
  }

  if (nextPaymentDate) {
    nextParams.set('payment_date', nextPaymentDate)
  }

  const serialized = nextParams.toString()
  return serialized ? `/card?${serialized}` : '/card'
}

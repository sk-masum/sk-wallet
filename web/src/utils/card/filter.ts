type BuildCardFilterHrefParams = {
  selectedNetwork: string
  selectedType: string
  query: string
}

type CardFilterOverride = {
  network?: string
  type?: string
  q?: string
}

export function buildCardFilterHref(
  current: BuildCardFilterHrefParams,
  next: CardFilterOverride
) {
  const nextNetwork = next.network ?? current.selectedNetwork
  const nextType = next.type ?? current.selectedType
  const nextQuery = next.q ?? current.query
  const nextParams = new URLSearchParams()

  if (nextQuery) {
    nextParams.set('q', nextQuery)
  }

  if (nextNetwork) {
    nextParams.set('network', nextNetwork)
  }

  if (nextType && nextType !== 'all') {
    nextParams.set('type', nextType)
  }

  const serialized = nextParams.toString()
  return serialized ? `/card?${serialized}` : '/card'
}

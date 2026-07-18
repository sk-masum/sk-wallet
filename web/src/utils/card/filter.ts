type BuildCardFilterHrefParams = {
  selectedNetwork: string
  selectedType: string
  selectedSort: string
  selectedGroup: string
  query: string
}

type CardFilterOverride = {
  network?: string
  type?: string
  sort?: string
  group?: string
  q?: string
}

export function buildCardFilterHref(
  current: BuildCardFilterHrefParams,
  next: CardFilterOverride
) {
  const nextNetwork = next.network ?? current.selectedNetwork
  const nextType = next.type ?? current.selectedType
  const nextSort = next.sort ?? current.selectedSort
  const nextGroup = next.group ?? current.selectedGroup
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

  if (nextSort && nextSort !== 'newest') {
    nextParams.set('sort', nextSort)
  }

  if (nextGroup && nextGroup !== 'none') {
    nextParams.set('group', nextGroup)
  }

  const serialized = nextParams.toString()
  return serialized ? `/card?${serialized}` : '/card'
}

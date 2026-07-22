export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatInteger(value: number) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function formatDashboardDate(value: string) {
  const date = new Date(value)
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  })
}

export function formatDashboardDateTime(value: string) {
  const date = new Date(value)
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

'use client'

import { useEffect, useRef } from 'react'

import { showToast } from '@/lib/toast'

type CardLoadErrorToastProps = {
  message: string
}

export function CardLoadErrorToast({ message }: CardLoadErrorToastProps) {
  const lastShownRef = useRef('')

  useEffect(() => {
    if (!message) return
    if (lastShownRef.current === message) return

    showToast({
      message,
      variant: 'error',
    })

    lastShownRef.current = message
  }, [message])

  return null
}

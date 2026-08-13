import { useEffect, useCallback } from 'react'

/**
 * Listens for Cmd/Ctrl+K and calls the provided toggle handler.
 */
export function useCommandBarShortcut(onToggle: () => void) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onToggle()
      }
      if (e.key === 'Escape') {
        onToggle()
      }
    },
    [onToggle],
  )

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])
}

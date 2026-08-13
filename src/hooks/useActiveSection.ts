import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in the viewport center.
 * Returns the id string of the active section.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (ids.length === 0) return

    const observers: IntersectionObserver[] = []

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    })

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    observers.push(observer)

    return () => observers.forEach(o => o.disconnect())
  }, [ids])

  return active
}

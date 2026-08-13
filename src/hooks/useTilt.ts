import { useRef, useCallback } from 'react'

/**
 * Applies a subtle 3-D tilt effect to an element on mouse move.
 * Returns ref + event handlers to spread onto the target element.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 8) {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width  - 0.5
      const y = (e.clientY - top)  / height - 0.5
      el.style.transform = `perspective(600px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) translateZ(4px)`
      el.style.transition = 'transform 0.1s ease'
    },
    [maxDeg],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    el.style.transition = 'transform 0.5s ease'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

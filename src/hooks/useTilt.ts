import { useRef, useCallback } from 'react'

export function useTilt<T extends HTMLElement = HTMLDivElement>(intensity = 12) {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateX = ((y - cy) / cy) * -intensity
      const rotateY = ((x - cx) / cx) * intensity
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
    },
    [intensity]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

/* ─────────────────────────────────────────────────────────────
   ParallaxProvider
   Tracks normalised mouse position (-0.5 → +0.5 on each axis)
   and exposes a helper to get per-layer pixel offsets.

   Usage:
     const { getOffset } = useParallax()
     // speed: 0 = no movement, 1 = full 10 px, -1 = reverse
     const { x, y } = getOffset(0.4)

   Max travel is capped at MAX_PX (8 px) so nothing ever
   feels unstable on large screens.
───────────────────────────────────────────────────────────── */

const MAX_PX = 8

interface ParallaxCtx {
  /** Returns { x, y } pixel offsets for the given speed multiplier */
  getOffset: (speed: number) => { x: number; y: number }
}

const Ctx = createContext<ParallaxCtx>({ getOffset: () => ({ x: 0, y: 0 }) })

export function useParallax() {
  return useContext(Ctx)
}

interface Props {
  children: ReactNode
  /** Element to track — defaults to window */
  targetRef?: React.RefObject<HTMLElement>
}

export default function ParallaxProvider({ children, targetRef }: Props) {
  // Smoothed normalised mouse position (-0.5 → +0.5)
  const rawRef    = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const rafRef    = useRef<number>(0)
  const [smooth, setSmooth] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el   = targetRef?.current ?? document.documentElement
      const rect = el.getBoundingClientRect?.() ?? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
      rawRef.current = {
        x: (e.clientX - rect.left) / rect.width  - 0.5,
        y: (e.clientY - rect.top)  / rect.height - 0.5,
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    // Smooth the raw position each frame (lerp factor 0.06 = ~17 fps lag)
    const tick = () => {
      const LERP = 0.06
      const s    = smoothRef.current
      const r    = rawRef.current
      const nx   = s.x + (r.x - s.x) * LERP
      const ny   = s.y + (r.y - s.y) * LERP
      if (Math.abs(nx - s.x) > 0.0001 || Math.abs(ny - s.y) > 0.0001) {
        smoothRef.current = { x: nx, y: ny }
        setSmooth({ x: nx, y: ny })
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [targetRef])

  const getOffset = (speed: number) => ({
    x: smooth.x * MAX_PX * speed,
    y: smooth.y * MAX_PX * speed,
  })

  return <Ctx.Provider value={{ getOffset }}>{children}</Ctx.Provider>
}

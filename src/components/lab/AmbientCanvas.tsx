import { useEffect, useRef } from 'react'

interface Shape {
  x: number; y: number
  rx: number; ry: number
  vx: number; vy: number
  opacity: number
  color: string
  angle: number
  angularV: number
}

const COLORS = [
  '139,92,246',   // violet
  '236,72,153',   // pink
  '34,211,238',   // cyan
  '109,40,217',   // deep violet
  '167,139,250',  // violet-light
]

function makeShape(W: number, H: number): Shape {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    rx: 80 + Math.random() * 180,
    ry: 60 + Math.random() * 140,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.14,
    opacity: 0.018 + Math.random() * 0.028,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: Math.random() * Math.PI * 2,
    angularV: (Math.random() - 0.5) * 0.002,
  }
}

/**
 * AmbientCanvas — layered animated background.
 * Soft drifting ellipses + a slow radial glow layer.
 * Fixed, full-viewport, pointer-events-none.
 * Performance: requestAnimationFrame with opacity-only redraws.
 */
export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let W = 0, H = 0
    const COUNT = 9
    let shapes: Shape[] = []

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      if (!shapes.length) shapes = Array.from({ length: COUNT }, () => makeShape(W, H))
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const s of shapes) {
        // Drift
        s.x += s.vx
        s.y += s.vy
        s.angle += s.angularV
        // Wrap
        if (s.x < -s.rx * 2) s.x = W + s.rx
        if (s.x > W + s.rx * 2) s.x = -s.rx
        if (s.y < -s.ry * 2) s.y = H + s.ry
        if (s.y > H + s.ry * 2) s.y = -s.ry

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.angle)

        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(s.rx, s.ry))
        grd.addColorStop(0,   `rgba(${s.color},${s.opacity})`)
        grd.addColorStop(0.5, `rgba(${s.color},${s.opacity * 0.4})`)
        grd.addColorStop(1,   `rgba(${s.color},0)`)

        ctx.beginPath()
        ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  )
}

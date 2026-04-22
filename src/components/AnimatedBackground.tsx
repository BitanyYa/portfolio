import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  wobble: number
  wobbleSpeed: number
  wobbleOffset: number
}

const COLORS = [
  '139,92,246',   // violet
  '109,40,217',   // deep violet
  '6,182,212',    // cyan
  '217,70,239',   // fuchsia
  '99,102,241',   // indigo
]

function makeParticle(W: number, H: number, fromBottom = false): Particle {
  return {
    x: Math.random() * W,
    y: fromBottom ? H + Math.random() * 100 : Math.random() * H,
    size: Math.random() * 2.5 + 0.5,
    speed: Math.random() * 0.4 + 0.15,
    opacity: Math.random() * 0.5 + 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    wobble: 0,
    wobbleSpeed: Math.random() * 0.02 + 0.005,
    wobbleOffset: Math.random() * Math.PI * 2,
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let W = 0, H = 0
    const COUNT = 70
    let particles: Particle[] = []

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      if (particles.length === 0) {
        particles = Array.from({ length: COUNT }, () => makeParticle(W, H, false))
      }
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      t++
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        // Rise upward with gentle horizontal wobble
        p.y -= p.speed
        p.wobble = Math.sin(t * p.wobbleSpeed + p.wobbleOffset) * 18
        const px = p.x + p.wobble

        // Fade in near bottom, fade out near top
        const progress = 1 - p.y / H
        const alpha = p.opacity * Math.min(progress * 3, 1) * Math.min((1 - progress) * 3, 1)

        ctx.beginPath()
        ctx.arc(px, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${alpha.toFixed(3)})`
        ctx.fill()

        // Glow
        const grd = ctx.createRadialGradient(px, p.y, 0, px, p.y, p.size * 5)
        grd.addColorStop(0, `rgba(${p.color},${(alpha * 0.3).toFixed(3)})`)
        grd.addColorStop(1, `rgba(${p.color},0)`)
        ctx.beginPath()
        ctx.arc(px, p.y, p.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Reset when off screen
        if (p.y < -20) {
          const fresh = makeParticle(W, H, true)
          Object.assign(p, fresh)
        }
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
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

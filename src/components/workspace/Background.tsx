import { motion } from 'framer-motion'
import { useParallax } from './ParallaxProvider'

/*
  Background — Layer 1 + 2
  Owns the room void, wall panel, floor separation, and all
  ambient light sources that bleed from other objects.

  Light sources rendered here (as CSS radial-gradients):
    1. Moonlight   — cool violet-white, upper-right
    2. Monitor glow — cyan, mid-right
    3. Lamp glow   — warm amber, right
    4. Wall ambience — diffuse violet, upper-centre

  Parallax speed: 0.15 (room barely moves)
*/
export default function Background() {
  const { getOffset } = useParallax()
  const { x, y } = getOffset(0.15)

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      {/* ── Base: wall colour ── */}
      <div style={{ position: 'absolute', inset: 0, background: '#1A1628' }} />

      {/* ── Floor — darker, with a clean horizon line ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '38%',
        background: 'linear-gradient(180deg, #13111C 0%, #0E0B18 100%)',
      }} />

      {/* ── Wall / floor split — subtle gradient horizon ── */}
      <div style={{
        position: 'absolute',
        bottom: '37%', left: 0, right: 0,
        height: 32,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Dot grid (wall only) ── */}
      <div style={{
        position: 'absolute',
        inset: 0, bottom: '38%',
        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.16) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.4,
      }} />

      {/* ── Ambient wall lighting — centre diffuse ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-15%', left: '30%',
          width: '55%', height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 65%)',
          filter: 'blur(48px)',
          x, y,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Moonlight — cool blue-violet, upper-right ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%', right: '5%',
          width: '45%', height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(180,160,255,0.07) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
          x: -x * 0.8,
          y: -y * 0.8,
        }}
        animate={{ opacity: [0.6, 0.95, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Monitor glow — cyan, mid-right ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '18%', right: '10%',
          width: '35%', height: '45%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.07) 0%, transparent 65%)',
          filter: 'blur(36px)',
          x: x * 0.6,
          y: y * 0.6,
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Lamp glow — warm amber cone, right ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '25%', right: '8%',
          width: '28%', height: '50%',
          background: 'radial-gradient(ellipse at 70% 20%, rgba(245,158,11,0.09) 0%, transparent 65%)',
          filter: 'blur(30px)',
          x: x * 0.5,
          y: y * 0.5,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ── Pink accent — left ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%', left: '-10%',
          width: '45%', height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.06) 0%, transparent 70%)',
          filter: 'blur(52px)',
          x, y,
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── Floor ambient — desk lamp pool on floor ── */}
      <div style={{
        position: 'absolute',
        bottom: '5%', right: '12%',
        width: '25%', height: '18%',
        background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.05) 0%, transparent 70%)',
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      {/* ── Baseboard shadow ── */}
      <div style={{
        position: 'absolute',
        bottom: '36%', left: 0, right: 0,
        height: 2,
        background: 'rgba(0,0,0,0.4)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

import { motion } from 'framer-motion'
import { useParallax } from './ParallaxProvider'

/*
  Window — Layer 3
  Repositioned to right side of the scene so the left half
  stays open for the introduction text.

  Composition changes:
    • left: 52%  (was centred)
    • Slightly taller aspect ratio (5:4) for presence
    • Moon moved to upper-left of glass for visual balance
    • Moonlight spills down-left onto the wall
    • Sill extends further for a more architectural feel
*/

const STARS: [number, number, number, number, number][] = [
  [8,  10, 1.1, 2.4, 0.0], [18,  4, 0.7, 3.1, 0.4], [28, 13, 1.3, 2.8, 0.8],
  [40,  3, 0.6, 3.6, 1.2], [50,  9, 0.9, 2.2, 0.2], [60,  6, 1.2, 2.9, 0.6],
  [70, 12, 0.7, 3.3, 1.0], [80,  4, 1.0, 2.6, 1.4], [90, 10, 0.8, 3.0, 0.3],
  [14, 24, 0.5, 4.0, 0.7], [24, 30, 1.1, 2.5, 0.1], [36, 20, 0.7, 3.2, 0.9],
  [45, 26, 0.9, 2.7, 0.5], [55, 18, 0.6, 3.8, 1.3], [65, 28, 1.2, 2.3, 0.2],
  [75, 22, 0.8, 3.5, 0.8], [85, 26, 0.5, 2.9, 1.1], [93, 16, 1.0, 3.1, 0.4],
  [6,  38, 0.7, 4.2, 0.6], [16, 44, 0.9, 2.6, 1.2], [26, 36, 0.6, 3.4, 0.0],
  [74, 40, 1.1, 2.8, 0.9], [84, 46, 0.8, 3.7, 0.3], [92, 36, 0.7, 2.4, 1.5],
  [36, 48, 0.5, 3.9, 0.7], [52, 44, 1.0, 2.5, 0.2], [64, 50, 0.6, 3.3, 1.0],
  [78, 52, 0.9, 2.7, 0.5],
]

const CLOUDS: [number, number, number, number, number, number][] = [
  [15, -20, 200, 55, 42, 0.06],
  [35,  25, 165, 48, 58, 0.05],
  [54,  65, 230, 62, 48, 0.05],
]

function Cloud({ top, initX, w, h, duration, opacity }: {
  top: number; initX: number; w: number; h: number; duration: number; opacity: number
}) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: `${top}%`, left: 0,
        width: '100%', height: h,
        pointerEvents: 'none', overflow: 'visible',
      }}
      initial={{ x: `${initX}%` }}
      animate={{ x: [`${initX}%`, `${initX + 115}%`] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ overflow: 'visible', opacity }}>
        <ellipse cx={w*.22} cy={h*.62} rx={w*.20} ry={h*.33} fill="rgba(190,170,255,0.55)" style={{ filter: 'blur(11px)' }} />
        <ellipse cx={w*.44} cy={h*.46} rx={w*.27} ry={h*.40} fill="rgba(165,145,245,0.42)" style={{ filter: 'blur(10px)' }} />
        <ellipse cx={w*.66} cy={h*.62} rx={w*.20} ry={h*.33} fill="rgba(180,160,255,0.42)" style={{ filter: 'blur(11px)' }} />
        <ellipse cx={w*.50} cy={h*.74} rx={w*.30} ry={h*.22} fill="rgba(145,125,225,0.30)" style={{ filter: 'blur(13px)' }} />
      </svg>
    </motion.div>
  )
}

export default function Window() {
  const { getOffset } = useParallax()
  const { x, y } = getOffset(0.25)

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top:   '5%',
        left:  '52%',           /* right column — keeps left open */
        width: 'min(40%, 420px)',
        aspectRatio: '5 / 4',
        zIndex: 3,
        x, y,
      }}
    >
      {/* Outer wall recess */}
      <div style={{
        position: 'absolute', inset: -8,
        borderRadius: 20,
        background: '#111020',
        boxShadow: '0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(139,92,246,0.08)',
      }} />

      {/* Frame */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 14,
        border: '5px solid #2B2443',
        boxShadow: '0 0 0 1px rgba(139,92,246,0.18) inset',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Cross-bars */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: 'calc(50% - 2.5px)', width: 5,
        background: '#2B2443', zIndex: 3, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: 'calc(44% - 2.5px)', height: 5,
        background: '#2B2443', zIndex: 3, pointerEvents: 'none',
      }} />

      {/* Glass */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 10, overflow: 'hidden',
        background: 'linear-gradient(165deg, #05030E 0%, #0B091A 50%, #0F0D22 100%)',
      }}>
        {/* Top glow inside glass */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% -5%, rgba(139,92,246,0.14) 0%, transparent 60%)',
        }} />

        {/* Stars */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 100 100" preserveAspectRatio="none">
          {STARS.map(([cx, cy, r, dur, delay], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r={r} fill="white"
              initial={{ opacity: 0.25 + (i % 5) * 0.12 }}
              animate={{ opacity: [0.15, 0.85, 0.15] }}
              transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
            />
          ))}
        </svg>

        {/* Moon — upper-left of glass */}
        <div style={{ position: 'absolute', top: '10%', left: '12%' }}>
          <motion.div
            style={{
              width: 46, height: 46, borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 38%, #F0EDF8 0%, #C8BEE8 55%, #A898D2 100%)',
              position: 'relative',
              boxShadow: '0 0 24px rgba(180,160,255,0.55), 0 0 48px rgba(139,92,246,0.22)',
            }}
            animate={{ boxShadow: [
              '0 0 24px rgba(180,160,255,0.45), 0 0 48px rgba(139,92,246,0.18)',
              '0 0 36px rgba(180,160,255,0.70), 0 0 72px rgba(139,92,246,0.32)',
              '0 0 24px rgba(180,160,255,0.45), 0 0 48px rgba(139,92,246,0.18)',
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Crescent shadow */}
            <div style={{
              position: 'absolute', top: -3, right: -7,
              width: 46, height: 46, borderRadius: '50%',
              background: '#0B091A', opacity: 0.85,
            }} />
            {/* Crater details */}
            <div style={{ position: 'absolute', top: '26%', left: '20%', width: 7, height: 7, borderRadius: '50%', background: 'rgba(139,92,246,0.14)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '35%', width: 4, height: 4, borderRadius: '50%', background: 'rgba(139,92,246,0.10)' }} />
          </motion.div>

          {/* Moon halo */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 82, height: 82, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(190,170,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Clouds */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {CLOUDS.map((c, i) => (
            <Cloud key={i} top={c[0]} initX={c[1]} w={c[2]} h={c[3]} duration={c[4]} opacity={c[5]} />
          ))}
        </div>

        {/* Glass reflection sheen */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(130deg, rgba(255,255,255,0.03) 0%, transparent 45%)',
          borderRadius: 10,
        }} />
      </div>

      {/* Window sill */}
      <div style={{
        position: 'absolute',
        bottom: -12, left: -14, right: -14, height: 12,
        background: 'linear-gradient(180deg, #2B2443 0%, #201A34 100%)',
        borderRadius: '0 0 6px 6px',
        boxShadow: '0 5px 18px rgba(0,0,0,0.5)',
        zIndex: 4,
      }} />

      {/* Moonlight spill — left-downward onto wall */}
      <div style={{
        position: 'absolute',
        top: '80%', left: '-60%', right: '-10%',
        height: '120px',
        background: 'radial-gradient(ellipse at 30% 0%, rgba(180,160,255,0.08) 0%, transparent 70%)',
        filter: 'blur(16px)',
        pointerEvents: 'none', zIndex: 1,
      }} />
    </motion.div>
  )
}

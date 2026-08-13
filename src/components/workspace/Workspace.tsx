import { motion } from 'framer-motion'
import ParallaxProvider from './ParallaxProvider'
import Scene           from './Scene'

/* ─────────────────────────────────────────────────────────────
   Workspace
   Top-level export for the Engineering Lab scene.

   Responsibilities:
     • Owns the ParallaxProvider (mouse tracking scope)
     • Wraps Scene in an entrance animation
     • Renders the "hover to interact" hint bar below the scene
     • Responsive padding + max-width constraint
     • Exports { Workspace as default } — drop into any section

   Future sprints will:
     • Replace placeholders inside Desk with real components
     • Add Minac as an absolutely-positioned overlay
     • Add the Avatar component
───────────────────────────────────────────────────────────── */

export default function Workspace() {
  return (
    <ParallaxProvider>
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
        }}
      >
        {/* Scene entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0,  scale: 1      }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Scene />
        </motion.div>

        {/* Interaction hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 18px',
              background: 'rgba(139,92,246,0.07)',
              border: '1px solid rgba(139,92,246,0.15)',
              borderRadius: 100,
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Pulsing dot */}
            <motion.span
              style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: '#8B5CF6',
                display: 'block',
                flexShrink: 0,
              }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: '#A095BF',
                letterSpacing: '0.08em',
                userSelect: 'none',
              }}
            >
              Hover & click desk objects to reveal system telemetry
            </span>
          </div>
        </motion.div>
      </div>
    </ParallaxProvider>
  )
}

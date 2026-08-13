import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiSpringboot,
  SiPrisma, SiDocker, SiTailwindcss, SiTypescript,
} from 'react-icons/si'

interface HologramTech {
  name: string
  icon: React.ReactNode
  color: string
  glow: string
  usedIn: string
  /** polar position: angle in degrees, radius in px from center */
  angle: number
  radius: number
  floatDelay: number
  size: 'lg' | 'md' | 'sm'
}

const HOLOGRAMS: HologramTech[] = [
  { name: 'React',      icon: <SiReact />,      color: '#22D3EE', glow: 'rgba(34,211,238,0.5)',  usedIn: 'Smart Task · MediLink · Drive Hub', angle: 320, radius: 155, floatDelay: 0,    size: 'lg' },
  { name: 'Node.js',    icon: <SiNodedotjs />,  color: '#86EFAC', glow: 'rgba(134,239,172,0.5)', usedIn: 'Backend APIs & Microservices',     angle: 40,  radius: 150, floatDelay: 0.4,  size: 'lg' },
  { name: 'Spring',     icon: <SiSpringboot />, color: '#4ADE80', glow: 'rgba(74,222,128,0.5)',  usedIn: 'Enterprise Services & Auth',        angle: 85,  radius: 180, floatDelay: 0.8,  size: 'md' },
  { name: 'Prisma',     icon: <SiPrisma />,     color: '#C4B5FD', glow: 'rgba(196,181,253,0.5)', usedIn: 'Database ORM & Migrations',         angle: 135, radius: 165, floatDelay: 1.2,  size: 'md' },
  { name: 'Docker',     icon: <SiDocker />,     color: '#60A5FA', glow: 'rgba(96,165,250,0.5)',  usedIn: 'Containerization & DevOps',         angle: 185, radius: 172, floatDelay: 0.6,  size: 'lg' },
  { name: 'Next.js',    icon: <SiNextdotjs />,  color: '#F8F7FF', glow: 'rgba(248,247,255,0.4)', usedIn: 'Full-stack Web Applications',       angle: 235, radius: 158, floatDelay: 1.0,  size: 'md' },
  { name: 'Tailwind',   icon: <SiTailwindcss />,color: '#38BDF8', glow: 'rgba(56,189,248,0.5)',  usedIn: 'Design System & UI Components',     angle: 285, radius: 175, floatDelay: 1.5,  size: 'md' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', usedIn: 'Type-safe Enterprise Systems',      angle: 15,  radius: 205, floatDelay: 1.8,  size: 'sm' },
]

const SIZE_MAP = { lg: 48, md: 40, sm: 34 }
const ICON_SIZE = { lg: 20, md: 16, sm: 13 }

function deg2rad(d: number) { return (d * Math.PI) / 180 }

function HologramOrb({ tech }: { tech: HologramTech }) {
  const [hovered, setHovered] = useState(false)

  const rad = deg2rad(tech.angle)
  const x = Math.cos(rad) * tech.radius
  const y = Math.sin(rad) * tech.radius

  const boxSize = SIZE_MAP[tech.size]
  const iconSize = ICON_SIZE[tech.size]

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '45%',
        marginLeft: x - boxSize / 2,
        marginTop:  y - boxSize / 2,
        zIndex: hovered ? 20 : 10,
      }}
      animate={{
        y: [0, -8, 0, -5, 0],
        x: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration: 4 + tech.floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: tech.floatDelay,
      }}
    >
      {/* The orb itself */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={hovered ? {
          scale: 1.35,
          boxShadow: `0 0 32px ${tech.glow}, 0 0 64px ${tech.glow.replace('0.5', '0.2')}`,
        } : {
          scale: 1,
          boxShadow: `0 0 12px ${tech.glow.replace('0.5', '0.25')}, 0 0 24px ${tech.glow.replace('0.5', '0.10')}`,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          width: boxSize,
          height: boxSize,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${tech.color}22 0%, rgba(26,22,40,0.9) 70%)`,
          border: `1px solid ${tech.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          position: 'relative',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ color: tech.color, fontSize: iconSize, display: 'flex' }}>
          {tech.icon}
        </span>

        {/* Rim light */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: -(60 + (tech.size === 'lg' ? 8 : 0)),
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: 140,
              background: 'rgba(34,28,53,0.95)',
              border: `1px solid ${tech.color}35`,
              borderRadius: 10,
              padding: '8px 12px',
              backdropFilter: 'blur(12px)',
              pointerEvents: 'none',
              zIndex: 30,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${tech.color}20`,
              textAlign: 'center',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              color: tech.color,
              marginBottom: 3,
            }}>
              {tech.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: '#6B6485',
              lineHeight: 1.5,
            }}>
              {tech.usedIn}
            </p>
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              bottom: -5,
              left: '50%',
              marginLeft: -5,
              width: 10,
              height: 10,
              background: 'rgba(34,28,53,0.95)',
              border: `1px solid ${tech.color}35`,
              borderTop: 'none',
              borderLeft: 'none',
              transform: 'rotate(45deg)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * FloatingTechHolograms
 *
 * Positions 8 tech orbs in a loose constellation around the avatar.
 * Each orb floats independently with its own animation timing.
 * Hover: expand + glow + tooltip showing which projects used it.
 *
 * Usage: place inside a relative-positioned container that also holds the avatar.
 * The center of the container should align with the avatar center.
 */
export default function FloatingTechHolograms() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'auto' }}>
        {HOLOGRAMS.map(tech => (
          <HologramOrb key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  )
}

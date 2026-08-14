import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import avatarSrc from '../assets/user-avatar.webp'

/* ─────────────────────────────────────────────────────────────
   LandingExperience — Phase 2
   "Bitanya's Digital Engineering Lab"

   Desktop: asymmetric two-column layout
     LEFT  — identity, headline, copy, CTAs, currently-building
     RIGHT — avatar with parallax + ambient glow

   Mobile: stacked, avatar below CTAs
─────────────────────────────────────────────────────────────── */

/* ── Reduced-motion preference ── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

/* ── Cursor-tracking parallax hook ── */
function useParallax(strength = 1) {
  const ref = useRef<HTMLElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 60, damping: 22, mass: 0.6 })

  useEffect(() => {
    const el = ref.current ?? document.documentElement
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width  - 0.5
      const ny = (e.clientY - rect.top)  / rect.height - 0.5
      rawX.set(nx * strength * 14)
      rawY.set(ny * strength * 10)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, strength])

  return { ref, x, y }
}

/* ── Stagger reveal variants ── */
const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const itemV = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

export default function LandingExperience({ onOpen: _onOpen }: { onOpen?: () => void }) {
  const reduced = useReducedMotion()
  const { ref: sectionRef, x: glowX, y: glowY } = useParallax(0.4)
  const { x: avatarX, y: avatarY } = useParallax(0.8)

  /* Avatar breathing — very slow scale pulse */
  const breatheScale = useSpring(1, { stiffness: 8, damping: 10 })
  useEffect(() => {
    if (reduced) return
    let ascending = true
    const interval = setInterval(() => {
      breatheScale.set(ascending ? 1.008 : 1.0)
      ascending = !ascending
    }, 3200)
    return () => clearInterval(interval)
  }, [breatheScale, reduced])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="landing"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        background:  'var(--lab-void)',
        minHeight:   '100vh',
        display:     'flex',
        alignItems:  'center',
        paddingTop:  'clamp(5rem, 10vh, 7rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)',
      }}
    >
      {/* ── Background layers ── */}
      <div className="lab-grid-bg" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />

      {/* Ambient radial glow — follows cursor slowly */}
      <motion.div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '30%',
        width: 800, height: 700,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.11) 0%, rgba(236,72,153,0.04) 45%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        x: reduced ? 0 : glowX,
        y: reduced ? 0 : glowY,
      }} />

      {/* Secondary cyan glow — right side */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(34,211,238,0.055) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Content ── */}
      <div className="lab-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)',
          gap: 'clamp(3rem, 6vw, 7rem)',
          alignItems: 'center',
        }}
          className="hero-grid"
        >
          {/* ════════════════════════════
              LEFT COLUMN — Identity
          ════════════════════════════ */}
          <motion.div
            variants={containerV}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >

            {/* Technical label */}
            <motion.div variants={itemV} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#4B4468',
              }}>
                00 /
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#8B5CF6',
              }}>
                Digital Engineering Lab
              </span>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6,
                marginLeft: 8,
                padding: '3px 8px', borderRadius: 20,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
              }}>
                <motion.span
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'block', flexShrink: 0 }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: '#34D399', textTransform: 'uppercase' }}>
                  Online · Building
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemV}>
              <h1 style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                I Build{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Digital Systems
                </span>
                <br />
                That Solve{' '}
                <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
                  Real Problems.
                </span>
              </h1>
            </motion.div>

            {/* Supporting copy */}
            <motion.p variants={itemV} style={{
              fontSize: '0.9375rem',
              lineHeight: 1.8,
              color: '#6B6485',
              maxWidth: 460,
              margin: 0,
            }}>
              Full-stack software engineer focused on building thoughtful web
              applications, backend systems, and digital experiences for
              real-world problems.
            </motion.p>

            {/* Currently Building module */}
            <motion.div variants={itemV}>
              <CurrentlyBuilding />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemV} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <button
                className="lab-btn-primary"
                onClick={() => scrollTo('projects')}
                style={{ fontSize: '0.8125rem', letterSpacing: '0.04em' }}
              >
                Explore My Work
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={() => scrollTo('lab')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '0.6rem 1.1rem',
                  borderRadius: 10,
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  fontWeight: 500, letterSpacing: '0.06em',
                  color: '#A78BFA',
                  background: 'transparent',
                  border: '1px solid rgba(139,92,246,0.3)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = 'rgba(139,92,246,0.6)'
                  el.style.background  = 'rgba(139,92,246,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = 'rgba(139,92,246,0.3)'
                  el.style.background  = 'transparent'
                }}
              >
                <span style={{ fontSize: 11, opacity: 0.6 }}>⬡</span>
                Enter the Lab
              </button>
            </motion.div>

          </motion.div>

          {/* ════════════════════════════
              RIGHT COLUMN — Avatar
          ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <AvatarColumn
              avatarSrc={avatarSrc}
              avatarX={reduced ? 0 : avatarX}
              avatarY={reduced ? 0 : avatarY}
              breatheScale={reduced ? 1 : breatheScale}
            />
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Mobile grid override ── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-avatar-col {
            order: 2;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   INTERACTIVE AVATAR COLUMN
   Layers:
     1. Ambient glow (static)
     2. Cursor spotlight — soft light that follows mouse
     3. Avatar photo — parallax + breathe
     4. Floating skill chips — appear on hover, each clickable
     5. Availability badge + Role label (always visible)
─────────────────────────────────────────────────────────────── */

const SKILL_CHIPS: {
  label: string; sub: string; accent: string
  pos: { top?: string; bottom?: string; left?: string; right?: string }
  scrollTo: string
  delay: number
}[] = [
  {
    label: 'Full Stack',
    sub: 'Frontend + Backend',
    accent: '#8B5CF6',
    pos: { top: '12%', left: '-8%' },
    scrollTo: 'projects',
    delay: 0,
  },
  {
    label: 'Backend Systems',
    sub: 'Node · NestJS · Laravel',
    accent: '#22D3EE',
    pos: { top: '36%', right: '-10%' },
    scrollTo: 'lab',
    delay: 0.08,
  },
  {
    label: 'Databases',
    sub: 'Postgres · MongoDB',
    accent: '#10B981',
    pos: { bottom: '32%', left: '-12%' },
    scrollTo: 'lab',
    delay: 0.14,
  },
  {
    label: 'Client Work',
    sub: '4 shipped projects',
    accent: '#EC4899',
    pos: { bottom: '14%', right: '-8%' },
    scrollTo: 'projects',
    delay: 0.2,
  },
]

function AvatarColumn({
  avatarSrc,
  avatarX,
  avatarY,
  breatheScale,
}: {
  avatarSrc: string
  avatarX:   unknown
  avatarY:   unknown
  breatheScale: unknown
}) {
  const [hovered, setHovered]         = useState(false)
  const [activeChip, setActiveChip]   = useState<number | null>(null)
  const colRef                        = useRef<HTMLDivElement>(null)
  const spotX                         = useMotionValue(50)   // percent
  const spotY                         = useMotionValue(40)
  const springX                       = useSpring(spotX, { stiffness: 40, damping: 18 })
  const springY                       = useSpring(spotY, { stiffness: 40, damping: 18 })

  /* Track mouse inside the column for spotlight */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = colRef.current?.getBoundingClientRect()
    if (!rect) return
    spotX.set(((e.clientX - rect.left) / rect.width) * 100)
    spotY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [spotX, spotY])

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div
      ref={colRef}
      className="hero-avatar-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActiveChip(null) }}
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        marginTop: '2.5rem',
        paddingLeft: '1rem',
        cursor: 'default',
      }}
    >
      {/* ── Layer 1: Static ambient glow — pulses with avatar ── */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.06, 1, 1.04, 1],
          opacity: [0.7, 1, 0.75, 0.95, 0.7],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{
          position: 'absolute',
          top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '110%', height: '80%',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.18) 0%, rgba(236,72,153,0.08) 45%, transparent 70%)',
          filter: 'blur(24px)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Layer 2: Cursor spotlight ── */}
      <motion.div aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 1,
          background: `radial-gradient(circle at ${springX}% ${springY}%, rgba(139,92,246,0.12) 0%, transparent 55%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          borderRadius: 20,
        }}
      />

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), rgba(34,211,238,0.2), transparent)',
        zIndex: 1,
      }} />

      {/* ── Layer 3: Avatar image ── */}
      <motion.div
        style={{
          position: 'relative', zIndex: 2,
          x: avatarX as number,
          y: avatarY as number,
          scale: breatheScale as number,
        }}
        animate={{
          /* Slow continuous float: gently bobs up and down */
          y: [-6, 6, -3, 5, -6],
          /* Very subtle side sway — feels alive */
          x: [0, 3, -2, 4, 0],
          /* Occasional slight rotation — like shifting weight */
          rotate: [0, 0.6, -0.5, 0.8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {/* Hover ring */}
        <motion.div
          aria-hidden="true"
          animate={hovered ? {
            opacity: 1,
            boxShadow: '0 0 0 2px rgba(139,92,246,0.35), 0 0 40px rgba(139,92,246,0.18)',
          } : {
            opacity: 0,
            boxShadow: '0 0 0 0px rgba(139,92,246,0), 0 0 0px rgba(139,92,246,0)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 16,
            pointerEvents: 'none',
          }}
        />

        <motion.img
          src={avatarSrc}
          alt="Bitanya Wondimagegn — Software Engineer"
          draggable={false}
          /* Breathing — slow scale pulse always running */
          animate={{
            scaleY: [1, 1.012, 1, 1.008, 1],
            scaleX: [1, 0.999, 1, 0.998, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.3, 0.55, 0.8, 1],
          }}
          style={{
            width: '100%', height: 'auto', display: 'block',
            transformOrigin: 'center bottom',
            maskImage: 'linear-gradient(180deg, #000 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 70%, transparent 100%)',
            userSelect: 'none',
            filter: hovered ? 'brightness(1.04) contrast(1.02)' : 'brightness(1)',
            transition: 'filter 0.4s ease',
          }}
        />
      </motion.div>

      {/* ── Layer 4: Floating skill chips ── */}
      <AnimatePresence>
        {hovered && SKILL_CHIPS.map((chip, i) => (
          <motion.button
            key={chip.label}
            initial={{ opacity: 0, scale: 0.75, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 4 }}
            transition={{ duration: 0.28, delay: chip.delay, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => scrollToSection(chip.scrollTo)}
            onMouseEnter={() => setActiveChip(i)}
            onMouseLeave={() => setActiveChip(null)}
            aria-label={`${chip.label} — scroll to ${chip.scrollTo}`}
            style={{
              position: 'absolute',
              ...chip.pos,
              zIndex: activeChip === i ? 10 : 4,
              display: 'flex', flexDirection: 'column', gap: 2,
              padding: '7px 11px',
              background: activeChip === i
                ? `linear-gradient(135deg, ${chip.accent}22, ${chip.accent}10)`
                : 'rgba(26,22,40,0.92)',
              border: `1px solid ${activeChip === i ? chip.accent + '55' : chip.accent + '28'}`,
              borderRadius: 10,
              backdropFilter: 'blur(14px)',
              boxShadow: activeChip === i
                ? `0 8px 28px rgba(0,0,0,0.4), 0 0 16px ${chip.accent}25`
                : '0 4px 16px rgba(0,0,0,0.35)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              transform: activeChip === i ? 'translateY(-2px)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.04em', color: chip.accent,
            }}>
              {chip.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color: 'rgba(183,176,204,0.65)', letterSpacing: '0.04em',
            }}>
              {chip.sub}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* ── Role label ── */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', top: '6%', right: '-2%', zIndex: 5,
          padding: '6px 11px',
          background: 'rgba(26,22,40,0.80)',
          border: '1px solid rgba(139,92,246,0.16)',
          borderRadius: 10, backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.28)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B7FC0' }}>
          Software Engineer
        </span>
      </motion.div>

      {/* ── Hint label on first hover ── */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            style={{
              position: 'absolute', bottom: '-22px', left: 0, right: 0,
              textAlign: 'center', pointerEvents: 'none', zIndex: 5,
              fontFamily: 'var(--font-mono)', fontSize: 8,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(139,92,246,0.45)',
            }}
          >
            click a skill to explore
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Currently Building module
─────────────────────────────────────────────────────────────── */
function CurrentlyBuilding() {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(139,92,246,0.40)' }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 8,
        padding: '12px 16px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-mid)',
        borderRadius: 12,
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.2s ease',
        maxWidth: 300,
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <motion.span
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#8B5CF6', display: 'block', flexShrink: 0 }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#8B5CF6',
        }}>
          Currently Building
        </span>
      </div>

      {/* Project name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}>
          YM Inventory
        </span>

        {/* Tech stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['NestJS', 'Prisma', 'PostgreSQL'].map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9, letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.18)',
              padding: '2px 7px', borderRadius: 4,
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Animated cursor line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: 'var(--text-muted)', letterSpacing: '0.06em',
        }}>
          ~/lab
        </span>
        <motion.span
          style={{
            display: 'inline-block',
            width: 6, height: 10,
            background: '#8B5CF6',
            borderRadius: 1,
          }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Scroll indicator
─────────────────────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      style={{
        position: 'absolute',
        bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        pointerEvents: 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 8,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: '#3D3558',
      }}>
        Scroll to Explore
      </span>
      <motion.div
        style={{ width: 1, height: 32 }}
        animate={{
          background: [
            'linear-gradient(to bottom, rgba(139,92,246,0.55), transparent)',
            'linear-gradient(to bottom, rgba(236,72,153,0.45), transparent)',
            'linear-gradient(to bottom, rgba(139,92,246,0.55), transparent)',
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />
    </motion.div>
  )
}

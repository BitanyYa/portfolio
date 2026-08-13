import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

/**
 * LabAvatar — Premium stylized female SVG avatar.
 *
 * Idle animations:
 *   - Body breathe (subtle scale Y)
 *   - Eyes blink (periodic)
 *   - Head gentle sway
 *   - Hair micro-drift
 *   - Wave once on mount
 *
 * Scroll reaction: slight head tilt toward the top of the page.
 * Design language: premium, illustrative — Apple / Pixar sensibility.
 * NOT anime. NOT cartoon. Clean, warm, modern.
 */
export default function LabAvatar() {
  const [, setHasWaved] = useState(false)
  const [eyesClosed, setEyesClosed] = useState(false)
  const armControls = useAnimation()
  const headControls = useAnimation()
  const scrollTilt = useRef(0)

  /* ── Wave once on mount ── */
  useEffect(() => {
    const t = setTimeout(async () => {
      await armControls.start({
        rotate: [0, -18, 10, -22, 8, 0],
        transition: { duration: 1.2, ease: 'easeInOut' },
      })
      setHasWaved(true)
    }, 1800)
    return () => clearTimeout(t)
  }, [armControls])

  /* ── Blink loop ── */
  useEffect(() => {
    const blink = () => {
      setEyesClosed(true)
      setTimeout(() => setEyesClosed(false), 120)
    }
    const schedule = () => {
      const delay = 2500 + Math.random() * 3000
      return setTimeout(() => { blink(); schedule() }, delay)
    }
    const t = schedule()
    return () => clearTimeout(t)
  }, [])

  /* ── Scroll head tilt ── */
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      scrollTilt.current = pct * 4
      headControls.start({
        rotate: scrollTilt.current,
        transition: { duration: 0.6, ease: 'easeOut' },
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [headControls])

  return (
    <div className="avatar-stage" style={{ width: 280, height: 340 }}>
      {/* Outer glow ring */}
      <div
        className="avatar-glow-ring"
        style={{ width: 300, height: 300, top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }}
      />
      {/* Inner tighter glow */}
      <div
        className="avatar-glow-ring"
        style={{
          width: 180, height: 180,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -42%)',
          background: 'radial-gradient(ellipse, rgba(236,72,153,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Avatar SVG — framer-motion wrapper handles breathe + float */}
      <motion.div
        className="animate-float-y"
        style={{ position: 'relative', zIndex: 2, transformOrigin: 'center bottom' }}
        animate={{ scaleY: [1, 1.012, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.svg
          animate={headControls}
          style={{ transformOrigin: '140px 90px', display: 'block' }}
          width="280"
          height="340"
          viewBox="0 0 280 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Bitanya avatar"
          role="img"
        >
          <defs>
            {/* Skin gradient */}
            <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0C8A0" />
              <stop offset="100%" stopColor="#D4956A" />
            </linearGradient>
            {/* Hair gradient */}
            <linearGradient id="hair" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#2C1A0E" />
              <stop offset="60%" stopColor="#1A0E06" />
              <stop offset="100%" stopColor="#0D0705" />
            </linearGradient>
            {/* Outfit gradient */}
            <linearGradient id="outfit" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            {/* Outfit sheen */}
            <linearGradient id="outfitSheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            {/* Collar accent */}
            <linearGradient id="collar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            {/* Shadow under head */}
            <radialGradient id="neckShadow" cx="50%" cy="0%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            {/* Filter: soft drop shadow */}
            <filter id="softShadow" x="-20%" y="-10%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(139,92,246,0.25)" />
            </filter>
            <filter id="hairGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Shoulders / Body ── */}
          <g filter="url(#softShadow)">
            {/* Main torso */}
            <path
              d="M60 230 Q70 210 95 205 Q110 200 140 198 Q170 200 185 205 Q210 210 220 230 L230 300 Q200 320 140 324 Q80 320 50 300 Z"
              fill="url(#outfit)"
            />
            {/* Outfit sheen layer */}
            <path
              d="M60 230 Q70 210 95 205 Q110 200 140 198 Q170 200 185 205 Q210 210 220 230 L230 300 Q200 320 140 324 Q80 320 50 300 Z"
              fill="url(#outfitSheen)"
            />
            {/* Collar accent strip */}
            <path
              d="M115 198 Q140 194 165 198 L162 215 Q140 208 118 215 Z"
              fill="url(#collar)"
              opacity="0.9"
            />
            {/* Collar neckline detail */}
            <path
              d="M122 212 Q140 206 158 212"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* ── Right arm (raised, for wave) ── */}
          <motion.g
            animate={armControls}
            style={{ transformOrigin: '185px 215px' }}
          >
            {/* Upper arm */}
            <path
              d="M185 215 Q210 210 225 200 Q238 192 242 182"
              stroke="url(#skin)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            {/* Forearm */}
            <path
              d="M242 182 Q248 168 244 155 Q241 144 236 138"
              stroke="url(#skin)"
              strokeWidth="17"
              strokeLinecap="round"
              fill="none"
            />
            {/* Hand simplified */}
            <ellipse cx="233" cy="132" rx="10" ry="13" fill="url(#skin)" />
            {/* Fingers hint */}
            <path d="M228 122 Q233 116 237 122" stroke="#C8804A" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Sleeve cuff */}
            <ellipse cx="213" cy="205" rx="11" ry="5" fill="#5B21B6" opacity="0.7" />
          </motion.g>

          {/* ── Left arm (natural hang) ── */}
          <g>
            <path
              d="M95 215 Q72 218 58 230 Q48 240 46 255"
              stroke="url(#skin)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M46 255 Q44 268 48 278 Q51 285 55 290"
              stroke="url(#skin)"
              strokeWidth="17"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="57" cy="294" rx="10" ry="12" fill="url(#skin)" />
            <ellipse cx="69" cy="218" rx="10" ry="5" fill="#5B21B6" opacity="0.7" />
          </g>

          {/* ── Neck ── */}
          <ellipse cx="140" cy="198" rx="18" ry="8" fill="url(#neckShadow)" />
          <path
            d="M126 174 Q126 196 140 200 Q154 196 154 174"
            fill="url(#skin)"
          />

          {/* ── Head ── */}
          <g filter="url(#softShadow)">
            {/* Head base */}
            <ellipse cx="140" cy="112" rx="52" ry="58" fill="url(#skin)" />
            {/* Subtle jaw shaping */}
            <path
              d="M100 130 Q100 162 118 172 Q140 180 162 172 Q180 162 180 130"
              fill="url(#skin)"
            />
            {/* Cheek warmth */}
            <ellipse cx="106" cy="136" rx="14" ry="10" fill="rgba(220,100,80,0.12)" />
            <ellipse cx="174" cy="136" rx="14" ry="10" fill="rgba(220,100,80,0.12)" />
          </g>

          {/* ── Hair ── */}
          <g filter="url(#hairGlow)">
            {/* Back hair mass */}
            <ellipse cx="140" cy="100" rx="58" ry="64" fill="url(#hair)" />
            {/* Top volume */}
            <path
              d="M88 95 Q85 55 115 42 Q140 34 165 42 Q192 52 192 90 Q185 68 165 60 Q140 52 115 62 Q96 72 92 92 Z"
              fill="#1A0E06"
            />
            {/* Hair flow right */}
            <path
              d="M190 88 Q200 72 196 52 Q192 36 178 30 Q192 44 194 66 Q195 80 190 94 Z"
              fill="#150A04"
            />
            {/* Hair flow left */}
            <path
              d="M90 88 Q80 72 84 52 Q88 36 102 30 Q88 44 86 66 Q85 80 90 94 Z"
              fill="#150A04"
            />
            {/* Part line highlight */}
            <path
              d="M140 36 Q143 50 142 68"
              stroke="rgba(255,200,150,0.08)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Loose strand — left */}
            <motion.path
              d="M95 100 Q88 118 90 136 Q92 150 88 162"
              stroke="#1A0E06"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              animate={{ d: [
                'M95 100 Q88 118 90 136 Q92 150 88 162',
                'M95 100 Q90 118 94 136 Q96 150 92 162',
                'M95 100 Q88 118 90 136 Q92 150 88 162',
              ]}}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Loose strand — right */}
            <motion.path
              d="M185 100 Q192 118 190 136 Q188 150 192 162"
              stroke="#1A0E06"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              animate={{ d: [
                'M185 100 Q192 118 190 136 Q188 150 192 162',
                'M185 100 Q190 118 186 136 Q184 150 188 162',
                'M185 100 Q192 118 190 136 Q188 150 192 162',
              ]}}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>

          {/* ── Ears ── */}
          <ellipse cx="89" cy="118" rx="8" ry="11" fill="url(#skin)" />
          <ellipse cx="191" cy="118" rx="8" ry="11" fill="url(#skin)" />
          {/* Ear detail */}
          <path d="M90 112 Q87 118 90 124" stroke="#C8804A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M190 112 Q193 118 190 124" stroke="#C8804A" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* ── Eyebrows ── */}
          <path d="M114 90 Q122 85 131 88" stroke="#2C1A0E" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M149 88 Q158 85 166 90" stroke="#2C1A0E" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* ── Eyes ── */}
          {/* Left eye */}
          <g>
            <ellipse cx="122" cy="106" rx="12" ry={eyesClosed ? 1.5 : 10} fill="#1A0E06" style={{ transition: 'ry 0.08s ease' }} />
            {!eyesClosed && (
              <>
                <ellipse cx="122" cy="104" rx="5" ry="5" fill="#5B3A8A" />
                <ellipse cx="122" cy="104" rx="3" ry="3" fill="#1A0E06" />
                <ellipse cx="124.5" cy="102" rx="2" ry="2" fill="rgba(255,255,255,0.8)" />
                <ellipse cx="120" cy="107" rx="1" ry="1" fill="rgba(255,255,255,0.4)" />
              </>
            )}
            {/* Lashes top */}
            <path d="M111 100 Q117 94 123 98" stroke="#1A0E06" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M114 97 L113 92" stroke="#1A0E06" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M119 94 L119 89" stroke="#1A0E06" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M124 95 L125 90" stroke="#1A0E06" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Right eye */}
          <g>
            <ellipse cx="158" cy="106" rx="12" ry={eyesClosed ? 1.5 : 10} fill="#1A0E06" style={{ transition: 'ry 0.08s ease' }} />
            {!eyesClosed && (
              <>
                <ellipse cx="158" cy="104" rx="5" ry="5" fill="#5B3A8A" />
                <ellipse cx="158" cy="104" rx="3" ry="3" fill="#1A0E06" />
                <ellipse cx="160.5" cy="102" rx="2" ry="2" fill="rgba(255,255,255,0.8)" />
                <ellipse cx="156" cy="107" rx="1" ry="1" fill="rgba(255,255,255,0.4)" />
              </>
            )}
            {/* Lashes top */}
            <path d="M147 100 Q153 94 159 98" stroke="#1A0E06" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M150 97 L149 92" stroke="#1A0E06" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M155 94 L155 89" stroke="#1A0E06" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M160 95 L161 90" stroke="#1A0E06" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* ── Nose ── */}
          <path
            d="M136 118 Q138 128 140 130 Q142 128 144 118"
            stroke="#C8804A"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path d="M134 130 Q140 134 146 130" stroke="#C8804A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

          {/* ── Mouth ── */}
          {/* Lips */}
          <path
            d="M126 148 Q133 144 140 146 Q147 144 154 148 Q148 158 140 160 Q132 158 126 148 Z"
            fill="#C96080"
          />
          {/* Upper lip */}
          <path
            d="M126 148 Q130 142 134 145 Q137 141 140 146 Q143 141 146 145 Q150 142 154 148"
            fill="#B8506C"
            stroke="none"
          />
          {/* Smile line */}
          <path
            d="M128 148 Q140 156 152 148"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          {/* Smile crease */}
          <path d="M122 150 Q125 152 124 156" stroke="#C8804A" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />
          <path d="M158 150 Q155 152 156 156" stroke="#C8804A" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />

          {/* ── Earrings ── */}
          <circle cx="89" cy="132" r="4" fill="#8B5CF6" opacity="0.9" />
          <circle cx="89" cy="132" r="2" fill="#C4B5FD" />
          <circle cx="191" cy="132" r="4" fill="#8B5CF6" opacity="0.9" />
          <circle cx="191" cy="132" r="2" fill="#C4B5FD" />

          {/* ── Platform glow base ── */}
          <ellipse
            cx="140"
            cy="330"
            rx="70"
            ry="8"
            fill="rgba(139,92,246,0.15)"
            style={{ filter: 'blur(6px)' }}
          />
        </motion.svg>
      </motion.div>

      {/* "ONLINE" indicator below avatar */}
      <div
        style={{
          position: 'absolute',
          bottom: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 10px',
          borderRadius: 20,
          background: 'rgba(26,22,40,0.85)',
          border: '1px solid rgba(139,92,246,0.2)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6B6485', letterSpacing: '0.1em' }}>
          bitanya.lab
        </span>
      </div>
    </div>
  )
}

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import ScrollReveal from '../components/ui/ScrollReveal'

/* ═══════════════════════════════════════════════════════
   DATA — verified only
═══════════════════════════════════════════════════════ */
type EntryCategory = 'education' | 'internship' | 'client-work'

interface JourneyEntry {
  id:          string
  seq:         string
  period:      string
  role:        string
  location:    string
  category:    EntryCategory
  description: string
  learned:     string[]
  projects?:   { id: string; title: string }[]
  accent:      string
  rgb:         string
  tags:        string[]
}

const JOURNEY: JourneyEntry[] = [
  {
    id: 'bsc', seq: '01', period: '2022 – 2026',
    role: 'B.Sc. Computer Science',
    location: 'Addis Ababa, Ethiopia',
    category: 'education', accent: '#22D3EE', rgb: '34,211,238',
    tags: ['Algorithms', 'Data Structures', 'Software Engineering', 'Databases'],
    description:
      'Four years studying algorithms, data structures, software engineering, and database systems. Alongside coursework I built real projects to apply what I was learning.',
    learned: [
      'Think through a problem before writing a single line of code',
      'Data modelling decisions matter long before the application runs',
      'Building something real teaches you more than studying it in theory',
    ],
    projects: [
      { id: 'medilink',         title: 'MediLink'         },
      { id: 'smart-task',       title: 'Smart Task'       },
      { id: 'video-conference', title: 'Video Conference' },
    ],
  },
  {
    id: 'internship', seq: '02', period: 'Jun – Aug 2025',
    role: 'Web Development Intern',
    location: 'Addis Ababa, Ethiopia',
    category: 'internship', accent: '#8B5CF6', rgb: '139,92,246',
    tags: ['WebRTC', 'Next.js', 'PostgreSQL', 'Socket.io'],
    description:
      'First professional engineering environment. Contributed to a real Video Conference web application building core screens, functional flows, and managing persistent data with PostgreSQL.',
    learned: [
      'Production code differs from personal projects standards matter',
      'Understanding existing code before changing it is a skill in itself',
      'WebRTC peer-to-peer communication and real-time signalling patterns',
    ],
    projects: [{ id: 'video-conference', title: 'Video Conference' }],
  },
  {
    id: 'client-work', seq: '03', period: '2024 – 2025',
    role: 'Full Stack Software Engineer',
    location: 'Addis Ababa, Ethiopia',
    category: 'client-work', accent: '#EC4899', rgb: '236,72,153',
    tags: ['Laravel', 'Next.js', 'Supabase', 'Node.js', 'PostgreSQL'],
    description:
      'Designed and delivered full systems for real clients. Each project came with actual requirements, actual deadlines, and an actual person who would use the result.',
    learned: [
      'Translating business requirements into structured software systems',
      'The cost of wrong schema decisions made early in a project',
      'Client communication: what they ask for vs what they actually need',
    ],
    projects: [
      { id: 'cashbook',   title: 'CashBook'             },
      { id: 'awlo',       title: 'AWLO Business Center' },
      { id: 'drive-hub',  title: 'Drive Hub'            },
      { id: 'sms-system', title: 'SMS App'              },
    ],
  },
]

const CAT_LABEL: Record<EntryCategory, string> = {
  education:    'Academic',
  internship:   'Internship',
  'client-work':'Client Work',
}

/* ═══════════════════════════════════════════════════════
   CHAPTER PANEL
   Click a chapter title on the left to illuminate it
   on the right. The right panel fades in like a page
   being opened in a field notebook.
═══════════════════════════════════════════════════════ */
function ChapterPanel({
  entry,
  isActive,
  onProjectClick,
}: {
  entry:          JourneyEntry
  isActive:       boolean
  onProjectClick: (id: string) => void
}) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {/* Chapter number + role */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      8,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         entry.accent,
              opacity:       0.75,
              marginBottom:  8,
              display:       'flex',
              alignItems:    'center',
              gap:           8,
            }}>
              <span>ENTRY {entry.seq}</span>
              <span style={{ opacity: 0.35 }}>/</span>
              <span>{CAT_LABEL[entry.category]}</span>
              <span style={{ opacity: 0.35 }}>/</span>
              <span style={{ color: 'var(--text-muted)', opacity: 0.45 }}>{entry.location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily:    'var(--font-sans)',
                fontWeight:    800,
                fontSize:      'clamp(1.25rem, 2.5vw, 1.6rem)',
                letterSpacing: '-0.03em',
                lineHeight:    1.1,
                color:         'var(--text-primary)',
                margin:        0,
              }}>
                {entry.role}
              </h3>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      11,
                color:         'var(--text-muted)',
                opacity:       0.5,
                letterSpacing: '0.04em',
              }}>
                {entry.period}
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize:    '0.9rem',
            lineHeight:  1.82,
            color:       'var(--text-secondary)',
            margin:      '0 0 20px',
            borderLeft:  `2px solid rgba(${entry.rgb},0.28)`,
            paddingLeft: 14,
          }}>
            {entry.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 22 }}>
            {entry.tags.map(tag => (
              <span key={tag} style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      9,
                color:         entry.accent,
                background:    `rgba(${entry.rgb},0.08)`,
                border:        `1px solid rgba(${entry.rgb},0.2)`,
                padding:       '2px 9px',
                borderRadius:  4,
                letterSpacing: '0.04em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Takeaways — terminal log style */}
          <div style={{
            background:   'rgba(0,0,0,0.18)',
            border:       `1px solid rgba(${entry.rgb},0.12)`,
            borderRadius: 10,
            padding:      '14px 16px',
            marginBottom: 20,
            fontFamily:   'var(--font-mono)',
          }}>
            <div style={{
              fontSize:      8,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         entry.accent,
              opacity:       0.6,
              marginBottom:  10,
            }}>
              $ takeaways --from {entry.seq}
            </div>
            {entry.learned.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.12 + i * 0.08 }}
                style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5 }}
              >
                <span style={{ color: entry.accent, opacity: 0.55, fontSize: 9, flexShrink: 0, marginTop: 3 }}>›</span>
                <span style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--text-muted)' }}>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Project links */}
          {entry.projects && entry.projects.length > 0 && (
            <div>
              <div style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      8,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'var(--text-muted)',
                opacity:       0.4,
                marginBottom:  8,
              }}>
                Built during this phase
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {entry.projects.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => onProjectClick(proj.id)}
                    aria-label={`Go to ${proj.title}`}
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      10,
                      color:         entry.accent,
                      background:    `rgba(${entry.rgb},0.07)`,
                      border:        `1px solid rgba(${entry.rgb},0.22)`,
                      padding:       '4px 12px',
                      borderRadius:  7,
                      cursor:        'pointer',
                      letterSpacing: '0.03em',
                      transition:    'background 0.18s, border-color 0.18s, box-shadow 0.18s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background  = `rgba(${entry.rgb},0.16)`
                      el.style.borderColor = `rgba(${entry.rgb},0.5)`
                      el.style.boxShadow   = `0 0 14px rgba(${entry.rgb},0.2)`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background  = `rgba(${entry.rgb},0.07)`
                      el.style.borderColor = `rgba(${entry.rgb},0.22)`
                      el.style.boxShadow   = 'none'
                    }}
                  >
                    ↗ {proj.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════
   CHAPTER SELECTOR — the left column
   Numbered chapters that glow on hover / active.
   A thin beam scans down from the active entry.
═══════════════════════════════════════════════════════ */
function ChapterSelector({
  entries,
  activeIdx,
  onSelect,
}: {
  entries:   JourneyEntry[]
  activeIdx: number
  onSelect:  (i: number) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {entries.map((entry, i) => {
        const isActive = i === activeIdx
        const isPast   = i < activeIdx

        return (
          <div key={entry.id} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Connector line above (except first) */}
            {i > 0 && (
              <div style={{
                width:      1,
                height:     28,
                marginLeft: 16,
                background: isActive || isPast
                  ? `linear-gradient(180deg, rgba(${entries[i-1].rgb},0.5) 0%, rgba(${entry.rgb},0.4) 100%)`
                  : 'rgba(139,92,246,0.1)',
                transition: 'background 0.4s',
              }} />
            )}

            {/* Chapter row */}
            <button
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              aria-label={`View ${entry.role}`}
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            14,
                padding:        '12px 16px',
                borderRadius:   10,
                background:     isActive ? `rgba(${entry.rgb},0.08)` : 'transparent',
                border:         `1px solid ${isActive ? `rgba(${entry.rgb},0.25)` : 'transparent'}`,
                cursor:         'pointer',
                textAlign:      'left',
                transition:     'background 0.2s, border-color 0.2s',
                width:          '100%',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = `rgba(${entry.rgb},0.05)`
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                }
              }}
            >
              {/* Node dot */}
              <div style={{
                width:          32,
                height:         32,
                borderRadius:   '50%',
                flexShrink:     0,
                background:     isActive ? `rgba(${entry.rgb},0.15)` : 'rgba(139,92,246,0.06)',
                border:         `1.5px solid ${isActive ? entry.accent : 'rgba(139,92,246,0.18)'}`,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                boxShadow:      isActive ? `0 0 16px rgba(${entry.rgb},0.3)` : 'none',
                transition:     'all 0.3s ease',
              }}>
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      10,
                  fontWeight:    700,
                  color:         isActive ? entry.accent : 'var(--text-muted)',
                  transition:    'color 0.2s',
                }}>
                  {entry.seq}
                </span>
              </div>

              {/* Title stack */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      13,
                  fontWeight:    isActive ? 700 : 500,
                  color:         isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  letterSpacing: '-0.01em',
                  lineHeight:    1.3,
                  marginBottom:  2,
                  transition:    'color 0.2s, font-weight 0.15s',
                  overflow:      'hidden',
                  textOverflow:  'ellipsis',
                  whiteSpace:    'nowrap',
                }}>
                  {entry.role}
                </div>
                <div style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      9,
                  color:         isActive ? entry.accent : 'var(--text-muted)',
                  opacity:       isActive ? 0.7 : 0.4,
                  letterSpacing: '0.06em',
                  transition:    'color 0.2s, opacity 0.2s',
                }}>
                  {entry.period}
                </div>
              </div>

              {/* Active indicator chevron */}
              <motion.span
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      10,
                  color:         entry.accent,
                  flexShrink:    0,
                }}
              >
                ›
              </motion.span>
            </button>
          </div>
        )
      })}

      {/* Now node */}
      <div style={{
        width:      1, height: 28, marginLeft: 16,
        background: 'linear-gradient(180deg, rgba(236,72,153,0.4) 0%, rgba(16,185,129,0.5) 100%)',
      }} />
      <div style={{
        display:     'flex',
        alignItems:  'center',
        gap:         14,
        padding:     '10px 16px',
        borderRadius: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(16,185,129,0.1)',
          border: '1.5px solid #10B981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 14px rgba(16,185,129,0.25)',
        }}>
          <motion.div
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            color: '#10B981', letterSpacing: '-0.01em',
          }}>
            Now
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            color: 'rgba(16,185,129,0.55)', letterSpacing: '0.06em',
          }}>
            Active · Building
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   NOW PANEL
═══════════════════════════════════════════════════════ */
function NowPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      <div style={{ marginBottom: 22 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#10B981', opacity: 0.75, marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <motion.div
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span>Currently Active</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 800,
          fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', letterSpacing: '-0.03em',
          lineHeight: 1.1, color: 'var(--text-primary)', margin: 0,
        }}>
          Building · Learning · Iterating
        </h3>
      </div>

      <p style={{
        fontSize: '0.9rem', lineHeight: 1.82,
        color: 'var(--text-secondary)', margin: '0 0 20px',
        borderLeft: '2px solid rgba(16,185,129,0.28)', paddingLeft: 14,
      }}>
        The journey is ongoing. Every project adds something new a pattern to remember,
        a mistake not to repeat, a technique that clicked.
      </p>

      <div style={{
        background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(16,185,129,0.12)',
        borderRadius: 10, padding: '14px 16px', marginBottom: 20, fontFamily: 'var(--font-mono)',
      }}>
        <div style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#10B981', opacity: 0.6, marginBottom: 10 }}>
          $ status --current
        </div>
        {[
          'Building real systems for real clients',
          'Learning from every shipped project',
          "Iterating on what doesn't work",
        ].map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.12 + i * 0.08 }}
            style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5 }}
          >
            <span style={{ color: '#10B981', opacity: 0.55, fontSize: 9, flexShrink: 0, marginTop: 3 }}>›</span>
            <span style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--text-muted)' }}>{line}</span>
          </motion.div>
        ))}
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 14px', borderRadius: 8,
        background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.18)',
      }}>
        <motion.div
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#22D3EE', flexShrink: 0 }}
          animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(34,211,238,0.75)', letterSpacing: '0.03em' }}>
          In development: YM Inventory
        </span>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   AMBIENT GLOW — follows mouse within the section
═══════════════════════════════════════════════════════ */
function useLocalGlow() {
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  const x = useSpring(rawX, { stiffness: 50, damping: 20 })
  const y = useSpring(rawY, { stiffness: 50, damping: 20 })
  const ref = useRef<HTMLElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width)
    rawY.set((e.clientY - rect.top)  / rect.height)
  }, [rawX, rawY])

  return { ref, x, y, onMove }
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const { ref, x, y, onMove } = useLocalGlow()
  const TOTAL = JOURNEY.length + 1 // entries + Now

  const scrollToProject = useCallback((id: string) => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => window.dispatchEvent(new CustomEvent('highlight-project', { detail: id })), 600)
  }, [])

  const activeEntry = activeIdx < JOURNEY.length ? JOURNEY[activeIdx] : null
  const glowColor   = activeEntry ? activeEntry.rgb : '16,185,129'

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      onMouseMove={onMove}
      style={{
        background:   'var(--lab-surface)',
        position:     'relative',
        overflow:     'hidden',
        paddingBlock: 'var(--section-py)',
      }}
    >
      {/* Background grid */}
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.28 }} />

      {/* Mouse-tracked ambient glow */}
      <motion.div aria-hidden="true" style={{
        position:      'absolute',
        width:         600, height: 600,
        borderRadius:  '50%',
        background:    `radial-gradient(circle, rgba(${glowColor},0.07) 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex:        0,
        left:          0, top: 0,
        translateX:    '-50%',
        translateY:    '-50%',
        x:             useSpring(useMotionValue(0), { stiffness: 50, damping: 20 }),
        y:             useSpring(useMotionValue(0), { stiffness: 50, damping: 20 }),
      }}
        animate={{
          left: `calc(${x.get() * 100}%)`,
          top:  `calc(${y.get() * 100}%)`,
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />

      <div className="lab-container relative z-10">

        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <SectionEyebrow>// 02 — experience</SectionEyebrow>
          <h2 style={{
            fontFamily:    'var(--font-sans)',
            fontWeight:    800,
            fontSize:      'clamp(2rem, 5vw, 3.25rem)',
            letterSpacing: '-0.04em',
            lineHeight:    1.04,
            color:         'var(--text-primary)',
            margin:        '0 0 16px',
          }}>
            How I got{' '}
            <span className="gradient-text">here</span>
          </h2>
          <p style={{
            fontSize: '0.9375rem', lineHeight: 1.8,
            color: 'var(--text-secondary)', maxWidth: 520, margin: 0,
          }}>
            I didn't learn software engineering from one project. I learned it by
            building, breaking, debugging, and rebuilding things.
          </p>
        </ScrollReveal>

        {/* Two-column interactive reader */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop:           52,
            display:             'grid',
            gridTemplateColumns: '260px 1fr',
            gap:                 0,
            background:          'var(--lab-elevated)',
            border:              '1px solid var(--border)',
            borderRadius:        18,
            overflow:            'hidden',
            boxShadow:           '0 24px 60px rgba(0,0,0,0.25)',
          }}
          className="exp-reader"
        >
          {/* LEFT — chapter list */}
          <div style={{
            borderRight: '1px solid var(--border)',
            padding:     '28px 0',
            background:  'rgba(0,0,0,0.12)',
          }}>
            {/* Reader label */}
            <div style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      7,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color:         'var(--text-muted)',
              opacity:       0.35,
              paddingInline: 16,
              marginBottom:  18,
            }}>
              Engineering Log
            </div>

            <ChapterSelector
              entries={JOURNEY}
              activeIdx={activeIdx}
              onSelect={i => setActiveIdx(i < TOTAL - 1 ? i : JOURNEY.length)}
            />
          </div>

          {/* RIGHT — chapter content */}
          <div style={{
            padding:  '32px 36px',
            minHeight: 420,
            position: 'relative',
          }}>
            {/* Ambient corner glow that changes with active entry */}
            <motion.div
              aria-hidden="true"
              animate={{ background: `radial-gradient(ellipse at 90% 10%, rgba(${glowColor},0.07) 0%, transparent 65%)` }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {activeEntry ? (
                <ChapterPanel
                  entry={activeEntry}
                  isActive
                  onProjectClick={scrollToProject}
                />
              ) : (
                <NowPanel />
              )}
            </div>

            {/* Keyboard hint */}
            <div style={{
              position:   'absolute', bottom: 16, right: 20,
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color:      'var(--text-muted)', opacity: 0.25,
              letterSpacing: '0.08em',
              display:    'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{activeIdx + 1} / {TOTAL}</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile stack fallback — shown only below breakpoint */}
        <div className="exp-mobile-stack" style={{ marginTop: 32, display: 'none', flexDirection: 'column', gap: 14 }}>
          {JOURNEY.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: 'var(--lab-elevated)', border: '1px solid var(--border)',
                borderTop: `2px solid ${entry.accent}`, borderRadius: 12, padding: '18px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: entry.accent,
                  background: `rgba(${entry.rgb},0.1)`, border: `1px solid rgba(${entry.rgb},0.25)`,
                  padding: '2px 8px', borderRadius: 4,
                }}>
                  {CAT_LABEL[entry.category]}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', opacity: 0.5 }}>
                  {entry.period}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: '0 0 8px' }}>
                {entry.role}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                {entry.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {entry.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    color: 'var(--text-muted)', background: `rgba(${entry.rgb},0.07)`,
                    border: `1px solid rgba(${entry.rgb},0.15)`, padding: '2px 7px', borderRadius: 4,
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .exp-reader { display: none !important; }
          .exp-mobile-stack { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

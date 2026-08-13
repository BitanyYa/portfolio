import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import ScrollReveal from '../components/ui/ScrollReveal'

/* ═══════════════════════════════════════════════════════════════
   DATA LAYER
   All technologies, categories, relationships, and stacks are
   derived strictly from verified project data.
   Source of truth: Projects.tsx and Experience.tsx
═══════════════════════════════════════════════════════════════ */

type Category = 'language' | 'framework' | 'data' | 'tools'
type NodeId = string

interface TechNode {
  id:         NodeId
  label:      string
  category:   Category
  description:string
  usedWith:   NodeId[]   // other tech IDs this commonly pairs with
  projects:   string[]   // verified project names
  notes:      string[]   // what she worked with using this tech
}

const TECH: TechNode[] = [
  /* ── LANGUAGES ──────────────────────────────────────── */
  {
    id: 'typescript', label: 'TypeScript', category: 'language',
    description: 'Primary language across all recent projects.',
    usedWith: ['react', 'nextjs', 'nestjs', 'node', 'prisma'],
    projects: ['Drive Hub', 'SMS App', 'AWLO Business Center', 'Smart Task', 'Video Conference', 'YM Inventory'],
    notes: ['Type-safe API contracts', 'Shared types across frontend and backend', 'Strict mode configuration'],
  },
  {
    id: 'javascript', label: 'JavaScript', category: 'language',
    description: 'Foundation for frontend and Node.js work.',
    usedWith: ['react', 'node', 'express'],
    projects: ['MediLink', 'Drive Hub'],
    notes: ['Async/await patterns', 'Event-driven logic', 'DOM and API interactions'],
  },
  {
    id: 'php', label: 'PHP', category: 'language',
    description: 'Used with Laravel for backend application logic.',
    usedWith: ['laravel', 'mysql'],
    projects: ['CashBook'],
    notes: ['MVC pattern with Laravel', 'Blade templating', 'Eloquent ORM'],
  },
  {
    id: 'sql', label: 'SQL', category: 'language',
    description: 'Relational query language used across multiple database systems.',
    usedWith: ['postgresql', 'sqlite', 'prisma'],
    projects: ['CashBook', 'Drive Hub', 'SMS App', 'Smart Task', 'YM Inventory'],
    notes: ['Schema design', 'Complex joins and aggregations', 'Migration scripts'],
  },

  /* ── FRAMEWORKS ─────────────────────────────────────── */
  {
    id: 'react', label: 'React', category: 'framework',
    description: 'Component-based UI library used for interactive frontends.',
    usedWith: ['typescript', 'nextjs', 'node', 'tailwind'],
    projects: ['Drive Hub', 'MediLink'],
    notes: ['Component architecture', 'State management with hooks', 'API integration'],
  },
  {
    id: 'nextjs', label: 'Next.js', category: 'framework',
    description: 'Full-stack React framework for production web applications.',
    usedWith: ['typescript', 'react', 'prisma', 'postgresql', 'supabase', 'tailwind'],
    projects: ['AWLO Business Center', 'SMS App', 'Smart Task', 'Video Conference'],
    notes: ['App Router', 'Server-side rendering', 'API routes', 'Auth integration'],
  },
  {
    id: 'nestjs', label: 'NestJS', category: 'framework',
    description: 'Structured Node.js backend framework for scalable APIs.',
    usedWith: ['typescript', 'prisma', 'postgresql'],
    projects: ['YM Inventory'],
    notes: ['Modular architecture', 'Controllers and services', 'Dependency injection', 'Database integration with Prisma'],
  },
  {
    id: 'laravel', label: 'Laravel', category: 'framework',
    description: 'PHP framework used for full-stack web application delivery.',
    usedWith: ['php', 'livewire', 'sqlite', 'tailwind'],
    projects: ['CashBook'],
    notes: ['MVC architecture', 'Livewire for reactive UI', 'Eloquent ORM', 'CSV data migration'],
  },
  {
    id: 'express', label: 'Express', category: 'framework',
    description: 'Minimal Node.js web framework for REST API development.',
    usedWith: ['node', 'typescript', 'postgresql'],
    projects: ['Drive Hub'],
    notes: ['REST API design', 'Route handling', 'Middleware pipeline'],
  },
  {
    id: 'node', label: 'Node.js', category: 'framework',
    description: 'JavaScript runtime for server-side and API development.',
    usedWith: ['typescript', 'express', 'postgresql', 'mongodb'],
    projects: ['Drive Hub', 'MediLink', 'Video Conference'],
    notes: ['Event loop and async I/O', 'API server development', 'Real-time with Socket.io'],
  },
  {
    id: 'angular', label: 'Angular', category: 'framework',
    description: 'TypeScript-based frontend framework with structured patterns.',
    usedWith: ['typescript'],
    projects: [],
    notes: ['Component architecture', 'Dependency injection', 'TypeScript-first development'],
  },

  /* ── DATA & BACKEND ─────────────────────────────────── */
  {
    id: 'postgresql', label: 'PostgreSQL', category: 'data',
    description: 'Primary relational database across client and professional projects.',
    usedWith: ['prisma', 'nestjs', 'nextjs', 'node', 'express', 'sql'],
    projects: ['Drive Hub', 'SMS App', 'Smart Task', 'AWLO Business Center', 'Video Conference', 'YM Inventory'],
    notes: ['Schema design and migrations', 'Relational data modelling', 'Indexing strategies', 'RBAC with role tables'],
  },
  {
    id: 'prisma', label: 'Prisma', category: 'data',
    description: 'TypeScript-native ORM for structured database access.',
    usedWith: ['postgresql', 'typescript', 'nestjs', 'nextjs'],
    projects: ['SMS App', 'Smart Task', 'YM Inventory'],
    notes: ['Schema-first modelling', 'Type-safe database queries', 'Migration management', 'Relational data access'],
  },
  {
    id: 'supabase', label: 'Supabase', category: 'data',
    description: 'Managed Postgres backend with storage and auth.',
    usedWith: ['postgresql', 'nextjs', 'typescript'],
    projects: ['AWLO Business Center'],
    notes: ['Row-level security', 'File and media storage', 'Real-time subscriptions', 'Admin dashboard integration'],
  },
  {
    id: 'mongodb', label: 'MongoDB', category: 'data',
    description: 'Document database for flexible and read-optimised data models.',
    usedWith: ['node', 'javascript'],
    projects: ['MediLink'],
    notes: ['Document modelling', 'Compound indexes for read performance', 'Aggregation pipelines'],
  },
  {
    id: 'sqlite', label: 'SQLite', category: 'data',
    description: 'Embedded relational database used in CashBook.',
    usedWith: ['laravel', 'php', 'sql'],
    projects: ['CashBook'],
    notes: ['Lightweight relational storage', 'Single-file database for client deployment', 'CSV migration into tables'],
  },
  {
    id: 'restapi', label: 'REST APIs', category: 'data',
    description: 'Standard HTTP API pattern used across backend systems.',
    usedWith: ['express', 'nestjs', 'node', 'typescript'],
    projects: ['Drive Hub', 'SMS App', 'YM Inventory'],
    notes: ['Resource-oriented endpoints', 'HTTP status conventions', 'Request validation with Zod'],
  },

  /* ── TOOLS & WORKFLOW ───────────────────────────────── */
  {
    id: 'git', label: 'Git', category: 'tools',
    description: 'Version control across all projects.',
    usedWith: ['github'],
    projects: ['CashBook', 'Drive Hub', 'SMS App', 'AWLO Business Center', 'Smart Task', 'Video Conference', 'YM Inventory'],
    notes: ['Branch-based workflow', 'Commit discipline', 'Collaborative development'],
  },
  {
    id: 'github', label: 'GitHub', category: 'tools',
    description: 'Remote repository hosting and collaboration platform.',
    usedWith: ['git'],
    projects: ['Drive Hub', 'SMS App', 'Smart Task', 'Video Conference'],
    notes: ['Repository management', 'Open source project collaboration', 'CI/CD awareness'],
  },
  {
    id: 'postman', label: 'Postman', category: 'tools',
    description: 'API development and testing tool.',
    usedWith: ['restapi', 'express', 'nestjs'],
    projects: ['Drive Hub', 'SMS App', 'YM Inventory'],
    notes: ['API endpoint testing', 'Request collections', 'Environment variable management'],
  },
  {
    id: 'tailwind', label: 'Tailwind CSS', category: 'tools',
    description: 'Utility-first CSS framework for building consistent UI.',
    usedWith: ['react', 'nextjs', 'laravel'],
    projects: ['CashBook', 'AWLO Business Center', 'SMS App', 'Smart Task'],
    notes: ['Responsive layout design', 'Design token consistency', 'Component-level styling'],
  },
  {
    id: 'vercel', label: 'Vercel', category: 'tools',
    description: 'Deployment platform for Next.js and frontend projects.',
    usedWith: ['nextjs'],
    projects: ['AWLO Business Center', 'SMS App', 'Smart Task', 'Video Conference'],
    notes: ['Zero-config Next.js deploys', 'Environment variable management', 'Preview deployments'],
  },
  {
    id: 'railway', label: 'Railway', category: 'tools',
    description: 'Platform for deploying full-stack Node.js applications.',
    usedWith: ['node', 'express', 'postgresql'],
    projects: ['Drive Hub', 'CashBook'],
    notes: ['Full-stack service deployment', 'Managed PostgreSQL hosting', 'Environment configuration'],
  },
]

/* ── Category metadata ─────────────────────────── */
interface CategoryMeta {
  id:      Category
  seq:     string
  label:   string
  accent:  string
  rgb:     string
  glyph:   string
}

const CATEGORIES: CategoryMeta[] = [
  { id: 'language',  seq: '01', label: 'Languages',        accent: '#22D3EE', rgb: '34,211,238',  glyph: '{ }' },
  { id: 'framework', seq: '02', label: 'Frameworks',       accent: '#8B5CF6', rgb: '139,92,246',  glyph: '⬡'   },
  { id: 'data',      seq: '03', label: 'Data & Backend',   accent: '#EC4899', rgb: '236,72,153',  glyph: '◎'   },
  { id: 'tools',     seq: '04', label: 'Tools & Workflow', accent: '#10B981', rgb: '16,185,129',  glyph: '⚙'   },
]

/* lookup helper */
interface BuildLayer {
  seq:    string
  label:  string
  nodes:  NodeId[]
  accent: string
}

const BUILD_LAYERS: BuildLayer[] = [
  { seq: '01', label: 'Interface',      nodes: ['react', 'nextjs', 'angular', 'tailwind'],         accent: '#8B5CF6' },
  { seq: '02', label: 'API',            nodes: ['express', 'nestjs', 'laravel', 'restapi'],         accent: '#22D3EE' },
  { seq: '03', label: 'Business Logic', nodes: ['typescript', 'javascript', 'php', 'node'],         accent: '#EC4899' },
  { seq: '04', label: 'Data',           nodes: ['postgresql', 'prisma', 'mongodb', 'supabase', 'sqlite'], accent: '#F59E0B' },
  { seq: '05', label: 'Deploy',         nodes: ['vercel', 'railway', 'git', 'github'],              accent: '#10B981' },
]

/* lookup helper */
function getTech(id: NodeId): TechNode | undefined {
  return TECH.find(t => t.id === id)
}
function getCategoryMeta(cat: Category): CategoryMeta {
  return CATEGORIES.find(c => c.id === cat)!
}

/* ═══════════════════════════════════════════════════════════════
   TOOL NODE
   Compact interactive chip. Accent colour driven by category.
   Hover → subtle activate. Selected → filled accent background.
   Related → highlighted border. Unrelated → dimmed.
═══════════════════════════════════════════════════════════════ */
function ToolNode({
  tech,
  state,
  onSelect,
}: {
  tech:     TechNode
  state:    'idle' | 'selected' | 'related' | 'dimmed'
  onSelect: (id: NodeId) => void
}) {
  const cat = getCategoryMeta(tech.category)

  const bg =
    state === 'selected' ? `rgba(${cat.rgb},0.22)` :
    state === 'related'  ? `rgba(${cat.rgb},0.10)` :
    state === 'dimmed'   ? 'rgba(255,255,255,0.02)' :
    'rgba(255,255,255,0.04)'

  const borderColor =
    state === 'selected' ? cat.accent :
    state === 'related'  ? `rgba(${cat.rgb},0.5)` :
    state === 'dimmed'   ? 'rgba(255,255,255,0.05)' :
    `rgba(${cat.rgb},0.2)`

  const textColor =
    state === 'selected' ? cat.accent :
    state === 'related'  ? `rgba(${cat.rgb},0.85)` :
    state === 'dimmed'   ? 'rgba(107,100,133,0.45)' :
    'var(--text-secondary)'

  return (
    <motion.button
      onClick={() => onSelect(tech.id)}
      aria-pressed={state === 'selected'}
      aria-label={`${tech.label} — ${tech.category}`}
      initial={false}
      animate={{
        opacity: state === 'dimmed' ? 0.45 : 1,
        scale:   state === 'selected' ? 1.04 : 1,
      }}
      whileHover={{ scale: state === 'dimmed' ? 1.01 : 1.05, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            7,
        padding:        '7px 13px',
        borderRadius:   8,
        background:     bg,
        border:         `1px solid ${borderColor}`,
        cursor:         'pointer',
        transition:     'background 0.2s, border-color 0.2s',
        boxShadow:      state === 'selected' ? `0 0 18px rgba(${cat.rgb},0.22)` : 'none',
        position:       'relative',
        flexShrink:     0,
      }}
    >
      {/* Category glyph */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      9,
        color:         state === 'dimmed' ? 'rgba(107,100,133,0.35)' : cat.accent,
        opacity:       state === 'dimmed' ? 0.4 : 0.75,
        lineHeight:    1,
        flexShrink:    0,
        transition:    'opacity 0.2s',
      }}>
        {cat.glyph}
      </span>

      {/* Label */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      11,
        fontWeight:    state === 'selected' ? 700 : 500,
        color:         textColor,
        letterSpacing: '0.04em',
        whiteSpace:    'nowrap',
        transition:    'color 0.2s, font-weight 0.15s',
      }}>
        {tech.label}
      </span>

      {/* Active dot when selected */}
      {state === 'selected' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            width: 5, height: 5, borderRadius: '50%',
            background: cat.accent,
            flexShrink: 0,
            boxShadow: `0 0 6px ${cat.accent}`,
          }}
        />
      )}
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY GRID
   Renders a labelled row of ToolNodes for one category.
═══════════════════════════════════════════════════════════════ */
function CategoryGrid({
  category,
  selectedId,
  onSelect,
}: {
  category:   CategoryMeta
  selectedId: NodeId | null
  onSelect:   (id: NodeId) => void
}) {
  const nodes = TECH.filter(t => t.category === category.id)

  const getState = (t: TechNode): 'idle' | 'selected' | 'related' | 'dimmed' => {
    if (!selectedId) return 'idle'
    if (t.id === selectedId) return 'selected'
    const sel = getTech(selectedId)
    if (sel && sel.usedWith.includes(t.id)) return 'related'
    return 'dimmed'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {/* Row header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      8,
          color:         category.accent,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity:       0.7,
          flexShrink:    0,
        }}>
          {category.seq} / {category.label}
        </span>
        <div style={{ flex: 1, height: 1, background: `rgba(${category.rgb},0.12)` }} />
      </div>

      {/* Nodes */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {nodes.map(t => (
          <ToolNode
            key={t.id}
            tech={t}
            state={getState(t)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TECH DETAIL PANEL
   Shown when a technology is selected.
   Contains description, usedWith, project list, and notes.
═══════════════════════════════════════════════════════════════ */
function TechDetailPanel({
  tech,
  onClose,
  onNavigate,
}: {
  tech:       TechNode
  onClose:    () => void
  onNavigate: () => void
}) {
  const cat = getCategoryMeta(tech.category)

  return (
    <motion.div
      key={tech.id}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background:    'var(--lab-surface)',
        border:        `1px solid rgba(${cat.rgb},0.25)`,
        borderTop:     `2px solid ${cat.accent}`,
        borderRadius:  14,
        padding:       '20px 22px',
        position:      'relative',
        boxShadow:     `0 0 32px rgba(${cat.rgb},0.1), 0 8px 40px rgba(0,0,0,0.35)`,
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position:   'absolute', top: 0, left: 0, right: 0, height: 64,
        background: `radial-gradient(ellipse at 40% -20%, rgba(${cat.rgb},0.07) 0%, transparent 70%)`,
        borderRadius: '14px 14px 0 0',
        pointerEvents: 'none',
      }} />

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close detail panel"
        style={{
          position:   'absolute', top: 14, right: 14,
          background: 'transparent', border: 'none',
          cursor:     'pointer', color:  'var(--text-muted)',
          fontSize:   14, lineHeight: 1, padding: '2px 5px',
          borderRadius: 5, transition: 'color 0.15s, background 0.15s',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = cat.accent; el.style.background = `rgba(${cat.rgb},0.1)` }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.background = 'transparent' }}
      >✕</button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, position: 'relative' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: `rgba(${cat.rgb},0.12)`,
          border:     `1px solid rgba(${cat.rgb},0.25)`,
          display:    'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 15, color: cat.accent,
        }}>
          {cat.glyph}
        </div>
        <div>
          <div style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      15,
            fontWeight:    700,
            color:         'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight:    1.2,
          }}>
            {tech.label}
          </div>
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      9,
            color:         cat.accent,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity:       0.8,
            marginTop:     3,
          }}>
            {cat.label}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily:  'var(--font-mono)',
        fontSize:    11,
        lineHeight:  1.75,
        color:       'var(--text-secondary)',
        margin:      '0 0 16px',
      }}>
        {tech.description}
      </p>

      {/* Used With */}
      {tech.usedWith.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{
            fontFamily:    'var(--font-mono)', fontSize: 8,
            color:         'var(--text-muted)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 7, opacity: 0.6,
          }}>
            Used With
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {tech.usedWith.map(uid => {
              const u = getTech(uid)
              if (!u) return null
              const uc = getCategoryMeta(u.category)
              return (
                <span key={uid} style={{
                  fontFamily:    'var(--font-mono)', fontSize: 10,
                  color:         uc.accent,
                  background:    `rgba(${uc.rgb},0.08)`,
                  border:        `1px solid rgba(${uc.rgb},0.2)`,
                  padding:       '2px 8px', borderRadius: 5,
                }}>
                  {u.label}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Projects */}
      {tech.projects.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{
            fontFamily:    'var(--font-mono)', fontSize: 8,
            color:         'var(--text-muted)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 7, opacity: 0.6,
          }}>
            Used In
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {tech.projects.map(p => (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--text-secondary)',
              }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: cat.accent, opacity: 0.7, flexShrink: 0 }} />
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {tech.notes.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontFamily:    'var(--font-mono)', fontSize: 8,
            color:         'var(--text-muted)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 7, opacity: 0.6,
          }}>
            What I Worked With
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {tech.notes.map((n, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 7,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--text-muted)', lineHeight: 1.6,
              }}>
                <span style={{ color: cat.accent, opacity: 0.6, flexShrink: 0 }}>→</span>
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigate to projects */}
      {tech.projects.length > 0 && (
        <button
          onClick={onNavigate}
          style={{
            display:       'flex', alignItems: 'center', gap: 6,
            fontFamily:    'var(--font-mono)', fontSize: 10,
            fontWeight:    700, letterSpacing: '0.08em',
            color:         cat.accent,
            background:    `rgba(${cat.rgb},0.1)`,
            border:        `1px solid rgba(${cat.rgb},0.25)`,
            padding:       '7px 14px', borderRadius: 8,
            cursor:        'pointer',
            transition:    'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${cat.rgb},0.18)`; el.style.borderColor = `rgba(${cat.rgb},0.45)` }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${cat.rgb},0.1)`;  el.style.borderColor = `rgba(${cat.rgb},0.25)` }}
          aria-label="View projects using this technology"
        >
          View Projects →
        </button>
      )}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   BUILD FLOW
   A vertical layer diagram showing the development process
   from Interface through to Deploy, with verified tech per layer.
═══════════════════════════════════════════════════════════════ */
function BuildFlow({ onSelectTech }: { onSelectTech: (id: NodeId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 8,
          color: 'var(--text-muted)', letterSpacing: '0.22em',
          textTransform: 'uppercase', opacity: 0.5, flexShrink: 0,
        }}>
          How I Build
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      {/* Layers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 0,
        position: 'relative',
      }}>
        {BUILD_LAYERS.map((layer, li) => {
          const isLast = li === BUILD_LAYERS.length - 1
          return (
            <motion.div
              key={layer.seq}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: li * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                gap:           12,
                padding:       '20px 16px',
                position:      'relative',
              }}
            >
              {/* Connector arrow between layers (hidden on last) */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  style={{
                    position:  'absolute',
                    right:     -1,
                    top:       '50%',
                    transform: 'translateY(-50%)',
                    zIndex:    2,
                    display:   'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-muted)', opacity: 0.3 }}>+</span>
                  <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
                </div>
              )}

              {/* Layer badge */}
              <div style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                gap:           4,
              }}>
                {/* Accent dot */}
                <div style={{
                  width:        28,
                  height:       28,
                  borderRadius: '50%',
                  background:   `rgba(${CATEGORIES.find(c => c.accent === layer.accent)?.rgb ?? '139,92,246'},0.12)`,
                  border:       `1.5px solid rgba(${CATEGORIES.find(c => c.accent === layer.accent)?.rgb ?? '139,92,246'},0.3)`,
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      8,
                    color:         layer.accent,
                    letterSpacing: '0.05em',
                    fontWeight:    700,
                  }}>
                    {layer.seq}
                  </span>
                </div>

                {/* Layer label */}
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      9,
                  color:         layer.accent,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight:    700,
                  opacity:       0.85,
                  textAlign:     'center',
                }}>
                  {layer.label}
                </span>
              </div>

              {/* Tech chips for this layer */}
              <div style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            5,
                width:          '100%',
              }}>
                {layer.nodes.map(nodeId => {
                  const t = getTech(nodeId)
                  if (!t) return null
                  const cat = getCategoryMeta(t.category)
                  return (
                    <button
                      key={nodeId}
                      onClick={() => onSelectTech(nodeId)}
                      aria-label={`Explore ${t.label}`}
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      10,
                        color:         'var(--text-secondary)',
                        background:    'rgba(255,255,255,0.03)',
                        border:        `1px solid rgba(${cat.rgb},0.15)`,
                        padding:       '3px 10px',
                        borderRadius:  6,
                        cursor:        'pointer',
                        letterSpacing: '0.03em',
                        transition:    'color 0.18s, background 0.18s, border-color 0.18s',
                        width:         '100%',
                        textAlign:     'center',
                        whiteSpace:    'nowrap',
                        overflow:      'hidden',
                        textOverflow:  'ellipsis',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color        = cat.accent
                        el.style.background   = `rgba(${cat.rgb},0.1)`
                        el.style.borderColor  = `rgba(${cat.rgb},0.35)`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color       = 'var(--text-secondary)'
                        el.style.background  = 'rgba(255,255,255,0.03)'
                        el.style.borderColor = `rgba(${cat.rgb},0.15)`
                      }}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom navigate CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            display:       'flex',
            alignItems:    'center',
            gap:           8,
            fontFamily:    'var(--font-mono)',
            fontSize:      11,
            fontWeight:    700,
            letterSpacing: '0.1em',
            color:         '#A78BFA',
            background:    'rgba(139,92,246,0.1)',
            border:        '1px solid rgba(139,92,246,0.25)',
            padding:       '10px 22px',
            borderRadius:  10,
            cursor:        'pointer',
            transition:    'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background  = 'rgba(139,92,246,0.18)'
            el.style.borderColor = 'rgba(139,92,246,0.45)'
            el.style.boxShadow   = '0 0 20px rgba(139,92,246,0.2)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background  = 'rgba(139,92,246,0.1)'
            el.style.borderColor = 'rgba(139,92,246,0.25)'
            el.style.boxShadow   = 'none'
          }}
          aria-label="Navigate to selected work projects"
        >
          Explore Projects →
        </button>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION DIVIDER  (thin ruled line with optional label)
═══════════════════════════════════════════════════════════════ */
function Divider({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '48px 0 0' }}>
      {label && (
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      8,
          color:         'var(--text-muted)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity:       0.35,
          flexShrink:    0,
        }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: 'var(--border)', opacity: 0.6 }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   All interactive state lives here so category grid, map,
   and detail panel stay in sync via a single selectedId.
═══════════════════════════════════════════════════════════════ */
export default function TheLabSection() {
  const [selectedId, setSelectedId] = useState<NodeId | null>(null)

  const handleSelect = useCallback((id: NodeId) => {
    setSelectedId(prev => prev === id ? null : id)
  }, [])

  const handleClose  = useCallback(() => setSelectedId(null), [])
  const goToProjects = useCallback(() => {
    setSelectedId(null)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const selectedTech = selectedId ? getTech(selectedId) : null

  return (
    <section
      id="lab"
      style={{ background: 'var(--lab-base)', position: 'relative', overflow: 'hidden', paddingBlock: 'var(--section-py)' }}
    >
      {/* Ambient background glow */}
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.3 }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '6%',  right: '-8%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', left: '-6%', width: 420, height: 420, background: 'radial-gradient(ellipse, rgba(34,211,238,0.03) 0%, transparent 70%)',  pointerEvents: 'none' }} />

      <div
        className="lab-container"
        style={{ position: 'relative', zIndex: 1 }}
      >

        {/* ── Section Header ──────────────────────────── */}
        <ScrollReveal variant="fadeUp">
          {/* Eyebrow chip */}
          <div style={{
            display:    'inline-flex',
            alignItems: 'center',
            gap:        8,
            padding:    '6px 13px',
            background: 'rgba(139,92,246,0.07)',
            border:     '1px solid rgba(139,92,246,0.18)',
            borderRadius: 8,
            marginBottom: 18,
          }}>
            <motion.div
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#8B5CF6' }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      9,
              color:         'rgba(139,92,246,0.7)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}>
              03 / The Lab
            </span>
          </div>

          <SectionEyebrow>// engineering toolbox</SectionEyebrow>

          <h2 style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      'clamp(2rem, 5vw, 3.25rem)',
            fontWeight:    800,
            letterSpacing: '-0.04em',
            lineHeight:    1.04,
            color:         'var(--text-primary)',
            margin:        '0 0 18px',
          }}>
            The{' '}
            <span className="gradient-text">Engineering</span>
            {' '}Toolbox
          </h2>

          <p style={{
            fontSize:   '0.9375rem',
            lineHeight: 1.8,
            color:      'var(--text-secondary)',
            maxWidth:   540,
            margin:     '0 0 6px',
          }}>
            Technologies are more useful when you know how they fit together.
          </p>
          <p style={{
            fontSize:   '0.875rem',
            lineHeight: 1.75,
            color:      'var(--text-muted)',
            maxWidth:   520,
            margin:     0,
            opacity:    0.7,
          }}>
            These are the languages, frameworks, databases, and tools I've used to turn ideas and real requirements into working systems.
          </p>
        </ScrollReveal>

        {/* ── Category Grids + Detail Panel ───────────── */}
        <div style={{ marginTop: 52 }}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: selectedTech ? 'minmax(0,1fr) 340px' : '1fr',
            gap:                 24,
            alignItems:          'start',
          }}
            className="lab-toolbox-grid"
          >
            {/* Left: all four category rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {CATEGORIES.map(cat => (
                <CategoryGrid
                  key={cat.id}
                  category={cat}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {/* Right: detail panel (sticky) */}
            <AnimatePresence mode="wait">
              {selectedTech && (
                <div
                  style={{ position: 'sticky', top: 88 }}
                  className="lab-detail-panel"
                >
                  <TechDetailPanel
                    tech={selectedTech}
                    onClose={handleClose}
                    onNavigate={goToProjects}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Build Flow ───────────────────────────────── */}
        <Divider />
        <div style={{ marginTop: 40, marginBottom: 8 }}>
          <BuildFlow onSelectTech={handleSelect} />
        </div>

      </div>

      {/* ── Responsive styles ────────────────────────── */}
      <style>{`
        /* Collapse side panel on tablet/mobile */
        @media (max-width: 860px) {
          .lab-toolbox-grid {
            grid-template-columns: 1fr !important;
          }
          .lab-detail-panel {
            position: static !important;
          }
        }
      `}</style>
    </section>
  )
}

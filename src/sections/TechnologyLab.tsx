import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import ScrollReveal from '../components/ui/ScrollReveal'
import {
  SiNodedotjs, SiExpress, SiReact, SiTypescript, SiPostgresql,
  SiMongodb, SiWebrtc, SiSocketdotio, SiNextdotjs,
  SiHtml5, SiCss, SiJavascript, SiMysql, SiGit, SiPostman,
  SiFigma, SiLaravel,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

interface Tech {
  name: string
  icon: React.ReactNode
  color: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
  level: 'core' | 'proficient' | 'familiar'
}

const TECH_REGISTRY: Tech[] = [
  { name: 'React',       icon: <SiReact />,       color: '#67E8F9', category: 'frontend',  level: 'core'       },
  { name: 'TypeScript',  icon: <SiTypescript />,  color: '#93C5FD', category: 'frontend',  level: 'core'       },
  { name: 'Next.js',     icon: <SiNextdotjs />,   color: '#B4B0C8', category: 'frontend',  level: 'proficient' },
  { name: 'JavaScript',  icon: <SiJavascript />,  color: '#FDE047', category: 'frontend',  level: 'core'       },
  { name: 'HTML',        icon: <SiHtml5 />,       color: '#FB923C', category: 'frontend',  level: 'core'       },
  { name: 'CSS',         icon: <SiCss />,         color: '#60A5FA', category: 'frontend',  level: 'core'       },
  { name: 'Node.js',     icon: <SiNodedotjs />,   color: '#86EFAC', category: 'backend',   level: 'core'       },
  { name: 'Express',     icon: <SiExpress />,     color: '#94A3B8', category: 'backend',   level: 'core'       },
  { name: 'REST APIs',   icon: <TbApi />,         color: '#F0ABFC', category: 'backend',   level: 'core'       },
  { name: 'WebRTC',      icon: <SiWebrtc />,      color: '#FDBA74', category: 'backend',   level: 'proficient' },
  { name: 'Socket.io',   icon: <SiSocketdotio />, color: '#FDE68A', category: 'backend',   level: 'proficient' },
  { name: 'Laravel',     icon: <SiLaravel />,     color: '#FCA5A5', category: 'backend',   level: 'familiar'   },
  { name: 'MongoDB',     icon: <SiMongodb />,     color: '#6EE7B7', category: 'database',  level: 'core'       },
  { name: 'PostgreSQL',  icon: <SiPostgresql />,  color: '#7DD3FC', category: 'database',  level: 'core'       },
  { name: 'MySQL',       icon: <SiMysql />,       color: '#67E8F9', category: 'database',  level: 'proficient' },
  { name: 'Git',         icon: <SiGit />,         color: '#FB923C', category: 'tools',     level: 'core'       },
  { name: 'Postman',     icon: <SiPostman />,     color: '#FB923C', category: 'tools',     level: 'proficient' },
  { name: 'Figma',       icon: <SiFigma />,       color: '#F0ABFC', category: 'tools',     level: 'familiar'   },
]

const CATEGORY_META: Record<Tech['category'], { label: string; accent: string; description: string }> = {
  frontend: { label: 'Frontend',  accent: '#67E8F9', description: 'UI, state, and user experience layers'  },
  backend:  { label: 'Backend',   accent: '#86EFAC', description: 'APIs, real-time, and server-side logic' },
  database: { label: 'Database',  accent: '#7DD3FC', description: 'Relational and document storage systems' },
  tools:    { label: 'Tools',     accent: '#F0ABFC', description: 'Workflow, design, and collaboration'    },
}

const LEVEL_META: Record<Tech['level'], { label: string; width: string; opacity: number }> = {
  core:       { label: 'Core',       width: '90%', opacity: 1    },
  proficient: { label: 'Proficient', width: '65%', opacity: 0.75 },
  familiar:   { label: 'Familiar',   width: '40%', opacity: 0.5  },
}

type FilterCategory = 'all' | Tech['category']

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const [hovered, setHovered] = useState(false)
  const level = LEVEL_META[tech.level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="holo-card cursor-default"
      style={{
        background: hovered
          ? `rgba(34,28,53,0.9)`
          : 'var(--bg-card)',
        border: `1px solid ${hovered ? tech.color + '40' : 'rgba(139,92,246,0.12)'}`,
        borderRadius: 14,
        padding: '14px 16px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3">
        {/* Icon with glow on hover */}
        <div
          style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hovered ? `${tech.color}18` : 'rgba(139,92,246,0.06)',
            border: `1px solid ${hovered ? tech.color + '35' : 'rgba(139,92,246,0.12)'}`,
            color: tech.color, fontSize: 16,
            boxShadow: hovered ? `0 0 20px ${tech.color}35` : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          {tech.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: hovered ? '#F8F7FF' : '#B7B0CC', transition: 'color 0.2s ease', fontWeight: hovered ? 600 : 400 }}>
              {tech.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: hovered ? tech.color : '#3D3558', flexShrink: 0, transition: 'color 0.2s ease' }}>
              {level.label}
            </span>
          </div>
          {/* Proficiency bar */}
          <div style={{ height: 2, borderRadius: 4, background: 'rgba(139,92,246,0.08)', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${tech.color}, ${tech.color}88)` }}
              initial={{ width: 0 }}
              whileInView={{ width: level.width }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TechnologyLab() {
  const [filter, setFilter] = useState<FilterCategory>('all')

  const filtered = filter === 'all' ? TECH_REGISTRY : TECH_REGISTRY.filter(t => t.category === filter)
  const categories: FilterCategory[] = ['all', 'frontend', 'backend', 'database', 'tools']

  return (
    <section id="lab" className="lab-section relative overflow-hidden" style={{ background: 'var(--lab-base)' }}>
      {/* Ambient grid */}
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Section glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="lab-container relative z-10">
        <ScrollReveal variant="fadeUp">
          <SectionEyebrow>// 05 — technology lab</SectionEyebrow>
          <h2 className="lab-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            The tools of the{' '}
            <span className="gradient-text-vc">engineering lab</span>
          </h2>
          <p className="lab-body mt-4 max-w-lg">
            The technologies I reach for when building systems and the depth to which I've used each one in production.
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mt-12 mb-10">
          {categories.map(cat => {
            const isActive = filter === cat
            const meta = cat !== 'all' ? CATEGORY_META[cat] : null
            return (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '8px 16px', borderRadius: 10,
                  background: isActive ? 'rgba(139,92,246,0.18)' : 'rgba(139,92,246,0.05)',
                  border: isActive ? '1px solid rgba(139,92,246,0.45)' : '1px solid rgba(139,92,246,0.12)',
                  color: isActive ? '#C4B5FD' : '#6B6485',
                  boxShadow: isActive ? '0 4px 20px rgba(139,92,246,0.2)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat === 'all' ? 'All' : meta!.label}
              </motion.button>
            )
          })}
        </div>

        {/* Category context strip */}
        <AnimatePresence mode="wait">
          {filter !== 'all' && (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="mb-8 flex items-center gap-3"
            >
              <div style={{
                width: 3, height: 32, borderRadius: 4,
                background: `linear-gradient(to bottom, ${CATEGORY_META[filter as Tech['category']].accent}, transparent)`,
              }} />
              <p style={{ fontSize: 13, color: '#6B6485' }}>
                {CATEGORY_META[filter as Tech['category']].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div key={filter} layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((tech, i) => <TechCard key={tech.name} tech={tech} index={i} />)}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-10">
          {Object.entries(LEVEL_META).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <div style={{ width: 20, height: 2, borderRadius: 4, background: 'rgba(139,92,246,0.3)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>{val.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


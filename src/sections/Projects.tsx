import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import ScrollReveal from '../components/ui/ScrollReveal'

import driveHubImg  from '../assets/drivehub.png'
import medilinkImg  from '../assets/medilink.png'
import smartTaskImg from '../assets/smart-task.png'
import videoConfImg from '../assets/video-conference.png'

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
type ProjectStatus = 'live' | 'in-development' | 'completed' | 'experiment'
type ProjectTier   = 'featured' | 'secondary' | 'earlier'

interface ProjectDetail {
  context:     string
  role:        string
  engineering: string
  outcome:     string
  learned?:    string[]
  timeline?:   { stage: string; note: string }[]
}

interface Project {
  id:       string
  num:      string
  title:    string
  tagline:  string
  type:     string
  status:   ProjectStatus
  year:     string
  tech:     string[]
  accent:   string
  tier:     ProjectTier
  summary:  string
  detail:   ProjectDetail
  github?:  string
  live?:    string
  image?:   string
  icon:     string
  minacHint?: string   /* contextual hint for Minac */
}

const STATUS_META: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  'live':           { label: 'Live',           color: '#34D399', bg: 'rgba(16,185,129,0.10)'  },
  'in-development': { label: 'In Development', color: '#FBBF24', bg: 'rgba(245,158,11,0.10)'  },
  'completed':      { label: 'Completed',      color: '#A78BFA', bg: 'rgba(139,92,246,0.10)'  },
  'experiment':     { label: 'Experiment',     color: '#64748B', bg: 'rgba(100,116,139,0.10)' },
}

/* ─────────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────────── */
const ALL_PROJECTS: Project[] = [
  {
    id: 'cashbook', num: '01', tier: 'featured', icon: '⬡',
    title: 'CashBook', tagline: 'Business cash management system',
    type: 'Client Project', status: 'completed', year: '2025', accent: '#8B5CF6',
    tech: ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'SQLite'],
    summary: 'A digital cashbook system built to replace manual record-keeping for a real business. Covers income, expenses, cashbook entries, user and business management including a one-time import of existing records from exported CSV data.',
    minacHint: 'One of the projects where I worked with real business requirements.',
    detail: {
      context: 'A business was tracking income and expenses manually. The goal was to replace that workflow with a structured digital system that multiple users could access with appropriate roles.',
      role: 'Designed and built the full system: database schema, Laravel backend, Livewire frontend components, authentication via Laravel Breeze, and the CSV data migration workflow.',
      engineering: 'The most interesting problem was importing existing CSV records accurately into the new schema without data loss. I built a structured import pipeline using Maatwebsite/Excel that mapped legacy columns to the new data model and flagged inconsistencies for review.',
      outcome: 'A working multi-user cashbook application with authentication, business management, income/expense categories, cashbook records, and PDF export plus a successful migration of existing business data.',
      learned: ['Designing business-oriented data workflows','Handling legacy CSV data migration into a relational schema','Building multi-user systems with Laravel Breeze','Livewire reactive components without a separate JS framework','PDF generation with Laravel DomPDF'],
      timeline: [{stage:'Scoping',note:'Mapped manual workflow and designed the data model'},{stage:'Build',note:'Laravel + Livewire, auth, core cashbook CRUD'},{stage:'Migration',note:'Imported existing CSV records into the new schema'},{stage:'Delivered',note:'Handed over working multi-user system to the client'}],
    },
    live: 'https://yonascashbook.up.railway.app/',
  },
  {
    id: 'awlo', num: '02', tier: 'secondary', icon: '◈',
    title: 'AWLO Business Center', tagline: 'LED billboard advertising platform, Addis Ababa',
    type: 'Client Project · Live', status: 'live', year: '2025', accent: '#EC4899',
    tech: ['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'Framer Motion', 'React Hook Form', 'Zod', 'Tailwind CSS'],
    summary: 'A production web platform for AWLO Business Center, an LED billboard advertising business in Addis Ababa. Covers service advertising, media management, client quote workflows, and a dashboard backed by Supabase with PostgreSQL.',
    minacHint: 'This one is live awlobc.com.',
    detail: {
      context: 'AWLO Business Center needed a professional digital presence and a structured system for clients to discover LED billboard services and submit advertising requests.',
      role: 'Designed and built the full platform: Next.js 15 App Router frontend, Supabase backend with PostgreSQL and Row Level Security, multi-step quote/contact form, media storage, email via Resend, and an analytics dashboard.',
      engineering: 'Supabase handled auth, PostgreSQL via custom migrations with RLS policies, and Storage for media uploads. The multi-step quote form used React Hook Form + Zod per step. Framer Motion animated the service sections. Resend handled transactional email on submission.',
      outcome: 'A deployed production website serving a real client responsive across devices, with working quote submission, media uploads, and Supabase auth.',
      learned: ['Supabase Auth, Storage, and PostgreSQL with Row Level Security','Next.js 15 App Router for full-stack production applications','Multi-step form design with React Hook Form and Zod','Transactional email integration with Resend'],
      timeline: [{stage:'Design',note:'Mapped client requirements and designed the service presentation'},{stage:'Build',note:'Next.js 15 App Router, Supabase backend, animated sections'},{stage:'Forms',note:'Multi-step quote workflow with validation and email'},{stage:'Live',note:'Deployed at awlobc.com'}],
    },
    live: 'https://www.awlobc.com/',
  },
  {
    id: 'drive-hub', num: '03', tier: 'secondary', icon: '⟳',
    title: 'Drive Hub', tagline: 'Car rental platform with lottery draw and audit trail',
    type: 'Client Project', status: 'live', year: '2024', accent: '#06B6D4',
    tech: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
    summary: 'A car rental platform built for a real client, featuring a lottery-based booking system, role-based admin dashboard, and a structured payment workflow with full audit trail.',
    minacHint: 'This was built for a real client.',
    detail: {
      context: 'A client needed a platform to manage car rental bookings with a transparent lottery-based allocation system and auditable payment records.',
      role: 'Backend API, database design, lottery algorithm, RBAC system, and payment workflow.',
      engineering: 'Lottery logic was moved fully server-side to prevent manipulation. Every state transition booking, payment, cancellation was logged to a PostgreSQL audit table. Four admin role levels controlled visibility and action permissions.',
      outcome: 'A deployed rental platform with a fair draw system, full audit trail, and role-separated admin dashboard.',
      learned: ['Designing auditable workflows with immutable event logs','Server-side randomness and fair draw algorithm design','Role-based access control with granular permission levels'],
    },
    github: 'https://github.com/HuniyaMusema/Drive-Hub-luck',
    live: 'https://frontend-production-7c43.up.railway.app/',
    image: driveHubImg,
  },
  {
    id: 'sms-system', num: '04', tier: 'secondary', icon: '◎',
    title: 'SMS App',
    tagline: 'Warranty SMS notification system for YM Inventory',
    type: 'Internal System',
    status: 'completed', year: '2025', accent: '#F59E0B',
    tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma', 'Better Auth', 'shadcn/ui', 'Zod', 'Tailwind CSS'],
    summary: 'A warranty notification system that receives registered warranty data from YM Inventory and automatically sends SMS messages to customers confirming their warranty. Stores warranty records and full SMS delivery logs.',
    detail: {
      context: 'When a phone is sold through YM Inventory, customers need an immediate SMS confirming their warranty registration. Manual outreach was not scalable across multiple daily sales.',
      role: 'Built the full system: Next.js App Router frontend, Prisma schema for warranty records and SMS logs, Better Auth for secure access, and the SMS dispatch workflow triggered by incoming warranty data.',
      engineering: 'The system receives warranty payloads from the inventory system, stores the warranty record, composes a confirmation message with the product IMEI and warranty period, dispatches the SMS, and logs the delivery status. Better Auth secured the admin interface. Prisma managed the relational schema linking warranties to customers and SMS logs.',
      outcome: 'A working warranty notification system that automatically SMS-confirms warranty registrations and maintains a queryable log of all sent messages and delivery statuses.',
      learned: [
        'Designing event-driven notification systems triggered by external data',
        'Linking two separate systems through a shared data contract',
        'Prisma schema design for warranty records and SMS delivery logs',
        'Building admin tooling for viewing and auditing notification history',
      ],
    },
    live: 'https://sms-app-ten-nu.vercel.app/',
  },
  {
    id: 'medilink', num: '05', tier: 'earlier', icon: '◇',
    title: 'MediLink', tagline: 'Healthcare pharmacy availability platform',
    type: 'Personal Project', status: 'completed', year: '2024', accent: '#10B981',
    tech: ['Node.js', 'React', 'MongoDB'],
    summary: 'Connects patients to pharmacies with real-time medicine availability. Optimised for high-read operations with compound indexes.',
    detail: {
      context: 'Finding medicines across multiple pharmacies in Addis Ababa was difficult without a unified lookup system.',
      role: 'Built the full-stack application: Node.js/Express API, React frontend, MongoDB data modelling.',
      engineering: 'Denormalized pharmacy-medicine relationships to prioritise read speed. Compound MongoDB indexes reduced query times significantly.',
      outcome: 'A working platform linking pharmacies with medicine availability data.',
    },
    github: 'https://github.com/HawiGenene1/Medilink',
    live: 'https://medilinkpharmacy.vercel.app/',
    image: medilinkImg,
  },
  {
    id: 'smart-task', num: '06', tier: 'earlier', icon: '▣',
    title: 'Smart Task', tagline: 'Kanban task management with authentication and reporting',
    type: 'Personal Project', status: 'completed', year: '2024', accent: '#F97316',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Tailwind CSS'],
    summary: 'Full-stack Kanban task board with JWT authentication, task assignment, and document export functionality.',
    detail: {
      context: 'Built as a technical assessment to implement a full Kanban board from scratch with authentication and data persistence.',
      role: 'Designed and built the full application: Prisma schema, Next.js API routes, JWT auth, task management UI, and PDF/Excel export.',
      engineering: 'Prisma managed the PostgreSQL schema. JWT auth secured the API routes. PDF export with jsPDF; Excel export with the xlsx library.',
      outcome: 'A working full-stack Kanban application with authentication, task management, and document export.',
    },
    github: 'https://github.com/BitanyYa/smart-task',
    live: 'https://smart-task-two.vercel.app/',
    image: smartTaskImg,
  },
  {
    id: 'video-conference', num: '07', tier: 'earlier', icon: '⬟',
    title: 'Video Conference', tagline: 'WebRTC peer-to-peer video conferencing',
    type: 'Internship Project', status: 'completed', year: '2024', accent: '#22D3EE',
    tech: ['Next.js', 'TypeScript', 'WebRTC', 'Socket.io', 'Node.js'],
    summary: 'Real-time video conferencing using WebRTC for peer-to-peer connections. Built during a web development internship.',
    detail: {
      context: 'A core deliverable during my internship building functional video conferencing screens and flows.',
      role: 'Developed core screens and functional flows. Managed persistent data with PostgreSQL.',
      engineering: 'WebRTC for peer-to-peer media. Socket.io for signalling. STUN/TURN relay fallback for NAT traversal.',
      outcome: 'Working conferencing app with screen share, mute controls, and shareable room URLs.',
    },
    github: 'https://github.com/MeronTekle07/Video-Conference-Web-App',
    live:   'https://video-conference-web-app-n68c.vercel.app/',
    image: videoConfImg,
  },
]

/* ─────────────────────────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────────────────────────── */

/* Fire a Minac emotion event */
function triggerMinac(text: string) {
  window.dispatchEvent(new CustomEvent('minac-emotion', {
    detail: { emotion: 'exploring', text },
  }))
}

/* Tech badge pill */
function TechPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 9,
      color: 'var(--text-muted)',
      background: `${accent}10`, border: `1px solid ${accent}22`,
      padding: '3px 9px', borderRadius: 4, display: 'inline-block',
    }}>{label}</span>
  )
}

/* ─────────────────────────────────────────────────────────────────
   CASE FILE MODAL  (shared across all projects)
───────────────────────────────────────────────────────────────── */
function CaseFile({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduced  = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const sm       = STATUS_META[project.status]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      role="dialog" aria-modal="true" aria-label={`Case file: ${project.title}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(14,11,24,0.90)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 3rem)', overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 28, scale: reduced ? 1 : 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduced ? 0 : 12 }}
        transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: 760,
          background: 'var(--lab-elevated)',
          border: `1px solid ${project.accent}30`,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px ${project.accent}12`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          borderBottom: '1px solid var(--border)',
          background: `linear-gradient(135deg, ${project.accent}06, transparent)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: project.accent }}>
                  EXHIBIT {project.num}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: sm.color, background: sm.bg, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
                  {sm.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 4 }}>
                  {project.type}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: '0 0 4px' }}>
                {project.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: project.accent, margin: 0, letterSpacing: '0.04em' }}>
                {project.tagline}
              </p>
            </div>
            <button ref={closeRef} onClick={onClose} aria-label="Close case file"
              style={{ flexShrink: 0, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--text-muted)', fontSize: 14 }}>
              ✕
            </button>
          </div>

          {/* Tech strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 14 }}>
            {project.tech.map(t => <TechPill key={t} label={t} accent={project.accent} />)}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
            {project.summary}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
            {[
              { label: 'The Problem',      text: project.detail.context     },
              { label: 'What I Built',     text: project.detail.role        },
              { label: 'Engineering',      text: project.detail.engineering },
              { label: 'Outcome',          text: project.detail.outcome     },
            ].map(block => (
              <div key={block.label} style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: project.accent, marginBottom: 8 }}>
                  {block.label}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          {project.detail.learned && (
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: project.accent, marginBottom: 12 }}>
                What I Learned
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {project.detail.learned.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: project.accent, opacity: 0.5, flexShrink: 0, fontSize: 10, marginTop: 3 }}>→</span>
                    <span style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.detail.timeline && (
            <CaseTimeline timeline={project.detail.timeline} accent={project.accent} />
          )}

          {/* Footer actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 'clamp(0.75rem, 2vw, 1.25rem)', borderTop: '1px solid var(--border)' }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textDecoration: 'none', background: `linear-gradient(135deg, ${project.accent}CC, ${project.accent}88)`, boxShadow: `0 4px 16px ${project.accent}35` }}>
                Live Demo ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textDecoration: 'none', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                Source ↗
              </a>
            )}
            <button onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', background: 'transparent', border: '1px solid var(--border)', cursor: 'pointer', marginLeft: 'auto' }}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CaseTimeline({ timeline, accent }: { timeline: { stage: string; note: string }[]; accent: string }) {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>Project Timeline</p>
      <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: 0 }}>
        {timeline.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72, position: 'relative', cursor: 'default' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: hovered === i ? `${accent}22` : 'var(--bg-card)', border: `1.5px solid ${hovered === i ? accent : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', boxShadow: hovered === i ? `0 0 10px ${accent}30` : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: hovered === i ? accent : 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: hovered === i ? accent : 'var(--text-muted)', marginTop: 5, textAlign: 'center', transition: 'color 0.2s ease', padding: '0 4px' }}>{item.stage}</span>
              <AnimatePresence>
                {hovered === i && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                    style={{ position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', background: 'var(--lab-overlay)', border: `1px solid ${accent}22`, borderRadius: 8, padding: '8px 12px', minWidth: 160, maxWidth: 200, zIndex: 10, pointerEvents: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>{item.note}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {i < timeline.length - 1 && <div style={{ flex: 1, height: 1.5, background: 'var(--border)', marginTop: 13, minWidth: 16, maxWidth: 36 }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════════
   PROJECT WORLD COMPONENTS — one visual metaphor per project
   Each component receives: hovered boolean, accent color string
═════════════════════════════════════════════════════════════════ */

/* ─── 01 CASHBOOK — web app UI: transaction entry + running balance ─── */
function CashbookWorld({ hovered }: { hovered: boolean }) {
  const [entries, setEntries] = useState([
    { id: 1, desc: 'Office supplies',  amount: -450,  type: 'expense' },
    { id: 2, desc: 'Client payment',   amount: 3200,  type: 'income'  },
    { id: 3, desc: 'Utility bill',     amount: -800,  type: 'expense' },
  ])
  const [adding, setAdding] = useState(false)
  const [saved, setSaved]   = useState(false)

  const balance = entries.reduce((sum, e) => sum + e.amount, 0)

  /* Auto-demo on hover: show a new entry being added then saved */
  useEffect(() => {
    if (!hovered) return
    const t1 = setTimeout(() => setAdding(true), 600)
    const t2 = setTimeout(() => {
      setEntries(prev => [
        ...prev,
        { id: 4, desc: 'Product sale', amount: 1800, type: 'income' },
      ])
      setAdding(false)
      setSaved(true)
    }, 2200)
    const t3 = setTimeout(() => setSaved(false), 3400)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [hovered])

  return (
    <div style={{ width: '100%', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>

      {/* ── App header bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 10px', borderRadius: 7,
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.2)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#A78BFA', fontWeight: 700, letterSpacing: '0.06em' }}>
          CashBook
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-muted)' }}>Balance:</span>
          <motion.span
            key={balance}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              color: balance >= 0 ? '#34D399' : '#F87171',
            }}
          >
            {balance >= 0 ? '+' : ''}{balance.toLocaleString()} ETB
          </motion.span>
        </div>
      </div>

      {/* ── Transaction list ── */}
      <div style={{
        borderRadius: 8, overflow: 'hidden',
        border: '1px solid rgba(139,92,246,0.12)',
        background: 'var(--lab-base)',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          padding: '4px 10px',
          borderBottom: '1px solid rgba(139,92,246,0.08)',
          background: 'rgba(139,92,246,0.05)',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-muted)', opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Description</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-muted)', opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Amount</span>
        </div>

        {/* Rows */}
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              padding: '5px 10px',
              borderBottom: i < entries.length - 1 ? '1px solid rgba(139,92,246,0.06)' : 'none',
              background: entry.id === 4 ? 'rgba(52,211,153,0.05)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: entry.type === 'income' ? '#34D399' : '#F87171',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-secondary)' }}>
                {entry.desc}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 600,
              color: entry.type === 'income' ? '#34D399' : '#F87171',
            }}>
              {entry.amount > 0 ? '+' : ''}{entry.amount.toLocaleString()}
            </span>
          </motion.div>
        ))}

        {/* New entry form row — appears on hover */}
        <AnimatePresence>
          {adding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto',
                alignItems: 'center', padding: '5px 10px',
                borderTop: '1px solid rgba(52,211,153,0.15)',
                background: 'rgba(52,211,153,0.04)',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#34D399', opacity: 0.7 }}>
                  Product sale
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ display: 'inline-block', marginLeft: 2 }}>|</motion.span>
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(52,211,153,0.5)' }}>
                +1,800
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Action row ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
        <div style={{
          display: 'flex', gap: 4,
        }}>
          {['Income', 'Expense'].map(type => (
            <div key={type} style={{
              display: 'flex', alignItems: 'center', gap: 3,
              padding: '3px 8px', borderRadius: 5,
              background: type === 'Income' ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)',
              border: `1px solid ${type === 'Income' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: type === 'Income' ? '#34D399' : '#F87171' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: type === 'Income' ? '#34D399' : '#F87171' }}>{type}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {saved ? (
            <motion.span key="saved"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#34D399', letterSpacing: '0.1em' }}>
              ✓ Saved
            </motion.span>
          ) : (
            <motion.div key="btn"
              exit={{ opacity: 0 }}
              style={{
                padding: '3px 10px', borderRadius: 5,
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.3)',
                fontFamily: 'var(--font-mono)', fontSize: 7,
                color: '#A78BFA', letterSpacing: '0.08em',
              }}>
              + Add Entry
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── 02 AWLO — portrait LED screen mounted on building wall ─── */
const AWLO_SLIDES = [
  {
    headline: 'AWLO',
    sub1: 'BUSINESS CENTER',
    sub2: 'LED ADVERTISING',
    tag: 'ADDIS ABABA',
    color: '#EC4899',
  },
  {
    headline: 'YOUR AD',
    sub1: 'ON THE BILLBOARD',
    sub2: 'BOLE MEDHANIALEM',
    tag: 'GET A QUOTE',
    color: '#A78BFA',
  },
  {
    headline: 'REACH',
    sub1: 'YOUR AUDIENCE',
    sub2: 'TODAY',
    tag: 'awlobc.com',
    color: '#22D3EE',
  },
]

function AwloWorld({ hovered }: { hovered: boolean }) {
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % AWLO_SLIDES.length), 3000)
    return () => clearInterval(t)
  }, [])

  const s = AWLO_SLIDES[slide]

  return (
    <div style={{ width: '100%', userSelect: 'none', display: 'flex', justifyContent: 'center' }}>
      {/* Building wall context */}
      <div style={{
        width: '85%',
        position: 'relative',
        background: 'linear-gradient(180deg, #1A1628 0%, #13111C 100%)',
        borderRadius: 10,
        padding: '18px 16px 24px',
        border: '1px solid rgba(139,92,246,0.12)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}>

        {/* Wall texture lines */}
        {[20, 40, 60, 80].map(y => (
          <div key={y} style={{
            position: 'absolute', left: 0, right: 0, top: `${y}%`,
            height: 1, background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none',
          }} />
        ))}
        {[25, 50, 75].map(x => (
          <div key={x} style={{
            position: 'absolute', top: 0, bottom: 0, left: `${x}%`,
            width: 1, background: 'rgba(255,255,255,0.02)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* ── Top mounting bracket ── */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 28, alignItems: 'center',
        }}>
          {[0, 1].map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: '#2B2443', border: '1px solid rgba(255,255,255,0.1)' }} />
              <div style={{ width: 2, height: 8, background: '#2B2443' }} />
            </div>
          ))}
        </div>

        {/* ── Portrait LED screen ── */}
        <div style={{
          position: 'relative',
          margin: '8px auto 0',
          width: '68%',
          /* Portrait aspect: roughly 9:16 */
          aspectRatio: '9 / 16',
          maxHeight: 160,
        }}>
          {/* Screen outer bezel — thick, dark metal */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 6,
            background: '#0C0A14',
            border: '3px solid #1E1A2E',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.06)',
              `0 0 32px ${s.color}30`,
              '0 8px 32px rgba(0,0,0,0.7)',
              hovered ? `0 0 60px ${s.color}25` : '',
            ].filter(Boolean).join(', '),
            overflow: 'hidden',
          }}>

            {/* LED pixel dot grid overlay */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.35) 1px, transparent 1px)',
              backgroundSize: '3px 3px',
            }} />

            {/* Screen background */}
            <div style={{
              position: 'absolute', inset: 0,
              background: '#04020C',
            }} />

            {/* Scan line sweep */}
            <motion.div
              style={{
                position: 'absolute', left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${s.color}20, transparent)`,
                zIndex: 3, pointerEvents: 'none',
              }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Content area */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 4,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '8px 6px',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}
                >
                  {/* Top accent bar */}
                  <motion.div style={{
                    width: '40%', height: 1.5, borderRadius: 1,
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                    marginBottom: 2,
                  }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Headline */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(11px, 3.5vw, 17px)',
                    fontWeight: 900,
                    color: s.color,
                    letterSpacing: '0.16em',
                    lineHeight: 1,
                    textAlign: 'center',
                    textShadow: `0 0 12px ${s.color}80`,
                  }}>
                    {s.headline}
                  </span>

                  {/* Sub lines */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(6px, 1.8vw, 8px)',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.14em',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}>
                    {s.sub1}
                    <br />
                    {s.sub2}
                  </span>

                  {/* Bottom divider */}
                  <div style={{ width: '50%', height: 1, background: `${s.color}30`, borderRadius: 1, marginTop: 2 }} />

                  {/* Tag */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(5px, 1.5vw, 7px)',
                    color: `${s.color}80`,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    {s.tag}
                  </span>

                  {/* Bottom accent bar */}
                  <motion.div style={{
                    width: '40%', height: 1.5, borderRadius: 1, marginTop: 2,
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner LED accent dots */}
            {[
              { top: 4, left: 4 }, { top: 4, right: 4 },
              { bottom: 4, left: 4 }, { bottom: 4, right: 4 },
            ].map((pos, i) => (
              <motion.div key={i}
                style={{
                  position: 'absolute', ...pos,
                  width: 3, height: 3, borderRadius: '50%',
                  background: s.color, zIndex: 5,
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          {/* ── Glow spill on wall below screen ── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: -20, left: '10%', right: '10%', height: 28,
              background: `radial-gradient(ellipse at 50% 0%, ${s.color}22 0%, transparent 70%)`,
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* ── Bottom mounting bracket ── */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 28, alignItems: 'center',
        }}>
          {[0, 1].map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 2, height: 8, background: '#2B2443' }} />
              <div style={{ width: 6, height: 6, borderRadius: 2, background: '#2B2443', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
          ))}
        </div>

        {/* Slide indicator dots */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 4,
        }}>
          {AWLO_SLIDES.map((sl, i) => (
            <motion.div key={i}
              animate={{ width: i === slide ? 12 : 4, background: i === slide ? sl.color : 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 3, borderRadius: 2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── 03 DRIVE HUB — car fleet grid with booking states ─── */

type CarState = 'available' | 'reserved' | 'lottery' | 'confirmed'

interface CarSlot {
  id:    number
  model: string
  state: CarState
}

const STATE_STYLE: Record<CarState, { label: string; color: string; bg: string; border: string }> = {
  available:  { label: 'Available',  color: '#34D399', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.30)' },
  reserved:   { label: 'Reserved',   color: '#FBBF24', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.30)' },
  lottery:    { label: 'In Draw\u2026',   color: '#A78BFA', bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.45)' },
  confirmed:  { label: 'Confirmed',  color: '#06B6D4', bg: 'rgba(6,182,212,0.10)',   border: 'rgba(6,182,212,0.38)' },
}

function CarSilhouette({ color, size = 52 }: { color: string; size?: number }) {
  /*
    Side-profile sedan silhouette.
    viewBox 0 0 80 38 — car sits between y=4 (roof) and y=30 (wheel base).
    Drawn with realistic proportions:
      - curved roofline blending into boot and bonnet
      - proper wheel arches cut into the body
      - multi-spoke wheels with hub detail
      - glass areas (windscreen + rear window)
      - body character line
      - chrome bumpers
  */
  const body   = color
  const dark   = 'rgba(0,0,0,0.45)'
  const glass  = 'rgba(148,210,252,0.28)'
  const shine  = 'rgba(255,255,255,0.18)'
  const wheel  = '#1a1a2e'
  const rim    = 'rgba(200,200,220,0.55)'
  const chrome = 'rgba(255,255,255,0.22)'

  return (
    <svg
      width={size}
      height={size * 0.48}
      viewBox="0 0 80 38"
      fill="none"
      style={{ display: 'block', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
    >
      {/* ── Ground shadow ── */}
      <ellipse cx="40" cy="36.5" rx="30" ry="2.5" fill="rgba(0,0,0,0.25)" />

      {/* ── Main body ── */}
      {/* Lower body — runs full length, flat bottom */}
      <path
        d={`
          M 8,24
          L 9,19
          L 12,19
          L 12,18
          A 8 8 0 0 1 20,18
          L 20,19
          L 57,19
          L 57,18
          A 8 8 0 0 1 65,18
          L 65,19
          L 70,19
          L 72,24
          L 72,27
          L 8,27 Z
        `}
        fill={body}
      />

      {/* ── Roofline ── */}
      <path
        d={`
          M 20,19
          L 24,8
          Q 27,5 32,4.5
          L 52,4.5
          Q 57,5 60,9
          L 63,15
          L 65,19
          L 57,19
          L 20,19 Z
        `}
        fill={body}
      />

      {/* ── Body shading — lower panel slightly darker ── */}
      <path
        d="M 8,24 L 72,24 L 72,27 L 8,27 Z"
        fill="rgba(0,0,0,0.14)"
      />

      {/* ── Character / body crease line ── */}
      <path
        d="M 10,22 Q 40,21 70,22"
        stroke={shine} strokeWidth="0.7" strokeLinecap="round"
      />

      {/* ── Roof highlight ── */}
      <path
        d="M 27,6 Q 42,5 55,7"
        stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round"
      />

      {/* ── Windscreen ── */}
      <path
        d="M 24,18.5 L 28,7 Q 29,5.5 32,5 L 41,5 L 41,18.5 Z"
        fill={glass}
      />
      {/* Windscreen pillar */}
      <path d="M 24,18.5 L 28,7" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" />
      {/* Windscreen glint */}
      <path d="M 26,16 L 29,8 L 32,7.5 L 28,16 Z" fill="rgba(255,255,255,0.12)" />

      {/* ── Rear window ── */}
      <path
        d="M 55,5 L 58,5.5 Q 61,7 63,13 L 63,18.5 L 52,18.5 L 52,5 Z"
        fill={glass}
      />
      {/* Rear pillar */}
      <path d="M 63,13 L 63,18.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" />

      {/* ── Side window ── */}
      <path
        d="M 41,5 L 52,5 L 52,18.5 L 41,18.5 Z"
        fill={glass}
      />
      {/* B-pillar */}
      <rect x="51" y="5" width="1.5" height="13.5" fill="rgba(0,0,0,0.25)" />

      {/* ── Door line ── */}
      <line x1="41" y1="19" x2="41" y2="26" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />

      {/* ── Door handles ── */}
      <rect x="35" y="22" width="5" height="1.2" rx="0.6" fill={chrome} />
      <rect x="53" y="22" width="4" height="1.2" rx="0.6" fill={chrome} />

      {/* ── Front bumper ── */}
      <path d="M 8,24 Q 6,24.5 5,26 L 5,27 L 8,27 Z" fill="rgba(0,0,0,0.25)" />
      <path d="M 9,19 Q 7,20 6.5,22 L 8,24" stroke={chrome} strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* ── Rear bumper ── */}
      <path d="M 72,24 Q 74,24.5 75,26 L 75,27 L 72,27 Z" fill="rgba(0,0,0,0.25)" />

      {/* ── Headlight ── */}
      <path d="M 9,20.5 Q 9,19.5 11,19.5 L 14,19.5 L 13,22 L 9,22 Z" fill="rgba(255,248,180,0.75)" />
      <path d="M 9,20.5 Q 9,19.5 11,19.5 L 14,19.5 L 13,22 L 9,22 Z" stroke="rgba(255,248,180,0.4)" strokeWidth="0.5" />

      {/* ── Tail light ── */}
      <path d="M 71,20 L 68,20 L 68,22.5 L 71,22.5 Q 73,22 73,21 Q 73,20 71,20 Z" fill="rgba(239,68,68,0.85)" />
      {/* Reverse light */}
      <path d="M 68,20 L 66,20 L 66,22.5 L 68,22.5 Z" fill="rgba(240,240,240,0.4)" />

      {/* ── Wheel arch cutouts (darker) ── */}
      <ellipse cx="21" cy="27" rx="8.5" ry="3.5" fill={dark} />
      <ellipse cx="59" cy="27" rx="8.5" ry="3.5" fill={dark} />

      {/* ── Front wheel ── */}
      <circle cx="21" cy="28" r="7.5" fill={wheel} />
      <circle cx="21" cy="28" r="5.8" fill="#222235" />
      {/* Tyre sidewall highlight */}
      <circle cx="21" cy="28" r="7.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* Rim */}
      <circle cx="21" cy="28" r="4.2" fill="none" stroke={rim} strokeWidth="1.2" />
      {/* Spokes */}
      {[0,60,120,180,240,300].map(deg => {
        const rad = (deg * Math.PI) / 180
        const x1  = 21 + Math.cos(rad) * 1.4
        const y1  = 28 + Math.sin(rad) * 1.4
        const x2  = 21 + Math.cos(rad) * 3.9
        const y2  = 28 + Math.sin(rad) * 3.9
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rim} strokeWidth="0.9" strokeLinecap="round" />
      })}
      {/* Hub */}
      <circle cx="21" cy="28" r="1.3" fill={rim} />
      <circle cx="21" cy="28" r="0.6" fill="#111" />

      {/* ── Rear wheel ── */}
      <circle cx="59" cy="28" r="7.5" fill={wheel} />
      <circle cx="59" cy="28" r="5.8" fill="#222235" />
      <circle cx="59" cy="28" r="7.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="59" cy="28" r="4.2" fill="none" stroke={rim} strokeWidth="1.2" />
      {[0,60,120,180,240,300].map(deg => {
        const rad = (deg * Math.PI) / 180
        const x1  = 59 + Math.cos(rad) * 1.4
        const y1  = 28 + Math.sin(rad) * 1.4
        const x2  = 59 + Math.cos(rad) * 3.9
        const y2  = 28 + Math.sin(rad) * 3.9
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rim} strokeWidth="0.9" strokeLinecap="round" />
      })}
      <circle cx="59" cy="28" r="1.3" fill={rim} />
      <circle cx="59" cy="28" r="0.6" fill="#111" />
    </svg>
  )
}

const INITIAL_FLEET: CarSlot[] = [
  { id: 1, model: 'BYD',  state: 'available' },
  { id: 2, model: 'Suzuki',    state: 'available' },
  { id: 3, model: 'Jetour',  state: 'available' },
  { id: 4, model: 'Honda',  state: 'available' },
  { id: 5, model: 'BMW',    state: 'available' },
  { id: 6, model: 'Audi',  state: 'available' },
]

const NEXT_STATE: Record<CarState, CarState> = {
  available: 'reserved',
  reserved:  'lottery',
  lottery:   'confirmed',
  confirmed: 'available',
}

function DriveHubWorld({ hovered: _hovered }: { hovered: boolean }) {
  const [fleet, setFleet] = useState<CarSlot[]>(INITIAL_FLEET)

  useEffect(() => {
    const id = setInterval(() => {
      setFleet(prev => {
        const idx = Math.floor(Math.random() * prev.length)
        return prev.map((car, i) => i === idx ? { ...car, state: NEXT_STATE[car.state] } : car)
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%', userSelect: 'none' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {fleet.map(car => {
          const s = STATE_STYLE[car.state]
          return (
            <motion.div
              key={car.id}
              animate={{ borderColor: s.border, backgroundColor: s.bg, boxShadow: car.state === 'lottery' ? '0 0 10px rgba(139,92,246,0.35)' : car.state === 'confirmed' ? '0 0 8px rgba(6,182,212,0.25)' : 'none' }}
              transition={{ duration: 0.4 }}
              style={{ border: '1px solid', borderRadius: 8, padding: '7px 6px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, position: 'relative', overflow: 'hidden' }}
            >
              {car.state === 'lottery' && (
                <motion.div
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)', pointerEvents: 'none' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <CarSilhouette color={s.color} size={46} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.06em', opacity: 0.65 }}>{car.model}</span>
              <motion.span animate={{ color: s.color }} transition={{ duration: 0.3 }} style={{ fontFamily: 'var(--font-mono)', fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {s.label}
              </motion.span>
            </motion.div>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, justifyContent: 'center' }}>
        {(Object.entries(STATE_STYLE) as [CarState, typeof STATE_STYLE[CarState]][]).map(([state, s]) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: s.color, opacity: 0.7, letterSpacing: '0.08em' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── 04 SMS APP — warranty notification flow from Yonas Inventory ─── */
function SmsWorld({ hovered }: { hovered: boolean }) {
  const [step, setStep] = useState(0)

  /* Auto-advance through the warranty → SMS flow on hover */
  useEffect(() => {
    if (!hovered) { setStep(0); return }
    const timings = [0, 900, 1800, 2800, 4000]
    const timers = timings.map((ms, i) => setTimeout(() => setStep(i), ms))
    const reset = setTimeout(() => setStep(0), 5800)
    return () => { [...timers, reset].forEach(clearTimeout) }
  }, [hovered])

  const FLOW = [
    { id: 'inventory', icon: '📦', label: 'Yonas Inventory', sub: 'Phone sold · IMEI registered', color: '#22D3EE' },
    { id: 'warranty',  icon: '🛡',  label: 'Warranty Record', sub: 'Stored in DB · linked to customer', color: '#8B5CF6' },
    { id: 'sms',       icon: '💬', label: 'SMS Dispatched',   sub: 'Confirmation sent to customer', color: '#F59E0B' },
    { id: 'log',       icon: '📋', label: 'Delivery Log',     sub: 'Status stored · queryable', color: '#34D399' },
  ]

  return (
    <div style={{ width: '100%', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* ── Integration label ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 6,
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.18)',
      }}>
        <motion.div
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(245,158,11,0.7)', letterSpacing: '0.1em' }}>
          Warranty · SMS · Log
        </span>
      </div>

      {/* ── Flow steps ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {FLOW.map((node, i) => {
          const active  = step >= i + 1
          const current = step === i + 1

          return (
            <div key={node.id} style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
              {/* Left: icon + connector line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 }}>
                <motion.div
                  animate={{
                    background: active ? `${node.color}22` : 'rgba(255,255,255,0.03)',
                    borderColor: active ? `${node.color}60` : 'rgba(255,255,255,0.08)',
                    boxShadow: current ? `0 0 10px ${node.color}40` : 'none',
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1px solid',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, flexShrink: 0,
                  }}
                >
                  {node.icon}
                </motion.div>
                {i < FLOW.length - 1 && (
                  <motion.div
                    animate={{ background: active ? `${node.color}50` : 'rgba(255,255,255,0.06)' }}
                    transition={{ duration: 0.35 }}
                    style={{ width: 1.5, flex: 1, minHeight: 8, borderRadius: 1, marginTop: 3 }}
                  />
                )}
              </div>

              {/* Right: label + sub */}
              <motion.div
                animate={{ opacity: active ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                style={{ flex: 1, paddingTop: 5, paddingBottom: i < FLOW.length - 1 ? 8 : 0 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: current ? 700 : 500,
                    color: active ? node.color : 'var(--text-muted)',
                    transition: 'color 0.3s ease',
                  }}>
                    {node.label}
                  </span>
                  {current && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 7, fontWeight: 600,
                        color: node.color, background: `${node.color}15`,
                        border: `1px solid ${node.color}30`,
                        padding: '1px 5px', borderRadius: 3,
                      }}
                    >
                      now
                    </motion.span>
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 7, margin: '2px 0 0',
                  color: active ? 'var(--text-muted)' : 'rgba(107,100,133,0.4)',
                  transition: 'color 0.3s ease',
                }}>
                  {node.sub}
                </p>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* ── Sample SMS preview ── */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              padding: '7px 10px', borderRadius: 8,
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.22)',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color: 'rgba(245,158,11,0.8)', margin: '0 0 3px',
              letterSpacing: '0.04em', lineHeight: 1.5,
            }}>
              "Your device warranty has been registered. IMEI: 35812...  Warranty valid for 12 months."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#34D399' }}>Delivered</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

/* ─── EARLIER: MediLink — online pharmacy UI ─── */
function MediLinkWorld({ hovered }: { hovered: boolean }) {
  const [cartCount, setCartCount] = useState(0)
  const [searching, setSearching] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [delivered, setDelivered] = useState(false)
  const [searchDot, setSearchDot] = useState(0)

  const MEDS = [
    { name: 'Amoxicillin', type: 'Antibiotic', price: '45 ETB', avail: true,  color: '#10B981' },
    { name: 'Paracetamol', type: 'Painkiller', price: '12 ETB', avail: true,  color: '#06B6D4' },
    { name: 'Metformin',   type: 'Diabetes',   price: '60 ETB', avail: false, color: '#F59E0B' },
  ]

  /* Search pulse */
  useEffect(() => {
    const t = setInterval(() => setSearchDot(d => (d + 1) % 3), 500)
    return () => clearInterval(t)
  }, [])

  /* Auto-demo: add → deliver cycle */
  useEffect(() => {
    if (!hovered) return
    setSearching(true)
    const t1 = setTimeout(() => setActiveCard(0), 600)
    const t2 = setTimeout(() => { setCartCount(1); setActiveCard(null) }, 1300)
    const t3 = setTimeout(() => setActiveCard(1), 1800)
    const t4 = setTimeout(() => { setCartCount(2); setActiveCard(null) }, 2500)
    const t5 = setTimeout(() => setDelivered(true), 3400)
    const t6 = setTimeout(() => { setCartCount(0); setDelivered(false); setSearching(false) }, 5000)
    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout)
  }, [hovered])

  return (
    <div style={{ width: '100%', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>

      {/* ── Search bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 10px', borderRadius: 8,
        background: 'rgba(16,185,129,0.06)',
        border: `1px solid ${searching ? 'rgba(16,185,129,0.45)' : 'rgba(16,185,129,0.18)'}`,
        transition: 'border-color 0.3s ease',
      }}>
        {/* Search icon */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <circle cx="4" cy="4" r="3" stroke="rgba(16,185,129,0.6)" strokeWidth="1.2"/>
          <path d="M6.5 6.5L8.5 8.5" stroke="rgba(16,185,129,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: searching ? 'rgba(16,185,129,0.8)' : 'rgba(16,185,129,0.35)', flex: 1 }}>
          {searching ? `Search medicines${'.'.repeat(searchDot + 1)}` : 'Find your medicine...'}
        </span>
        {/* Cart badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, position: 'relative' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1h1.5l1.5 6h5l1-4H4" stroke="rgba(16,185,129,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="5.5" cy="10" r="1" fill="rgba(16,185,129,0.7)"/>
            <circle cx="8.5" cy="10" r="1" fill="rgba(16,185,129,0.7)"/>
          </svg>
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: 'absolute', top: -4, right: -4,
                width: 10, height: 10, borderRadius: '50%',
                background: '#10B981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 6, color: '#fff', fontWeight: 700,
              }}
            >
              {cartCount}
            </motion.span>
          )}
        </div>
      </div>

      {/* ── Medicine cards ── */}
      <div style={{ display: 'flex', gap: 5 }}>
        {MEDS.map((med, i) => (
          <motion.div key={med.name}
            animate={{
              borderColor: activeCard === i ? med.color : `${med.color}22`,
              boxShadow: activeCard === i ? `0 0 10px ${med.color}40` : 'none',
              y: activeCard === i ? -2 : 0,
            }}
            transition={{ duration: 0.25 }}
            style={{
              flex: 1, padding: '6px 5px', borderRadius: 7,
              background: `${med.color}08`,
              border: '1px solid',
              display: 'flex', flexDirection: 'column', gap: 3,
              opacity: med.avail ? 1 : 0.5,
            }}
          >
            {/* Medicine icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                {/* Pill capsule */}
                <rect x="1" y="6" width="14" height="5" rx="2.5"
                  fill={`${med.color}25`} stroke={med.color} strokeWidth="0.8"/>
                <rect x="1" y="6" width="7" height="5" rx="2.5 0 0 2.5"
                  fill={`${med.color}45`}/>
                <line x1="8" y1="6" x2="8" y2="11"
                  stroke={med.color} strokeWidth="0.6"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: med.color, fontWeight: 700, letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.3 }}>
              {med.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--text-muted)', opacity: 0.6, textAlign: 'center' }}>
              {med.type}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: med.color, fontWeight: 600 }}>
                {med.price}
              </span>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: med.avail ? '#10B981' : '#6B7280',
                boxShadow: med.avail ? '0 0 4px rgba(16,185,129,0.6)' : 'none',
              }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Delivery status bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        padding: '5px 8px', borderRadius: 7,
        background: delivered ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.03)',
        border: `1px solid ${delivered ? 'rgba(16,185,129,0.4)' : 'rgba(16,185,129,0.12)'}`,
        transition: 'all 0.4s ease',
      }}>
        {[
          { icon: '🏥', label: 'Pharmacy' },
          { icon: '📦', label: 'Packed' },
          { icon: '🚚', label: 'Out for delivery' },
          { icon: '✓',  label: 'Delivered' },
        ].map((step, i) => (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
              <motion.span
                animate={{ opacity: delivered || (cartCount > 0 && i === 0) ? 1 : 0.25 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                style={{ fontSize: 9 }}
              >
                {step.icon}
              </motion.span>
              <motion.span
                animate={{ color: delivered ? '#10B981' : cartCount > 0 && i === 0 ? '#10B981' : 'rgba(16,185,129,0.25)' }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 6, textAlign: 'center', letterSpacing: '0.04em', lineHeight: 1.2 }}
              >
                {step.label}
              </motion.span>
            </div>
            {i < 3 && (
              <motion.div
                animate={{ background: delivered ? 'rgba(16,185,129,0.6)' : 'rgba(16,185,129,0.12)' }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                style={{ width: 8, height: 1, flexShrink: 0 }}
              />
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

/* ─── EARLIER: Smart Task ─── */
/* ─── EARLIER: Smart Task — Kanban board with task cards ─── */
const TASK_DATA = [
  { col: 0, title: 'Database schema',  assignee: 'BW', tag: 'Backend',  priority: 'high'   },
  { col: 0, title: 'Auth middleware',  assignee: 'BW', tag: 'API',      priority: 'medium' },
  { col: 1, title: 'Board UI layout',  assignee: 'BW', tag: 'Frontend', priority: 'high'   },
  { col: 1, title: 'Drag & drop',      assignee: 'BW', tag: 'Frontend', priority: 'medium' },
  { col: 2, title: 'JWT auth flow',    assignee: 'BW', tag: 'Auth',     priority: 'done'   },
  { col: 2, title: 'PDF export',       assignee: 'BW', tag: 'Feature',  priority: 'done'   },
  { col: 2, title: 'Excel export',     assignee: 'BW', tag: 'Feature',  priority: 'done'   },
]
const COL_META = [
  { label: 'To Do',       accent: '#F97316', bg: 'rgba(249,115,22,0.06)'  },
  { label: 'In Progress', accent: '#FBBF24', bg: 'rgba(251,191,36,0.06)'  },
  { label: 'Done',        accent: '#34D399', bg: 'rgba(52,211,153,0.06)'  },
]
const PRIORITY_COLOR: Record<string, string> = {
  high:   'rgba(248,113,113,0.75)',
  medium: 'rgba(251,191,36,0.75)',
  done:   'rgba(52,211,153,0.75)',
}

function SmartTaskWorld({ hovered }: { hovered: boolean }) {
  const [dragging, setDragging] = useState(false)
  const [justMoved, setJustMoved] = useState(false)

  /* Simulate a card being dragged from col 0 → col 1 on hover */
  useEffect(() => {
    if (!hovered) { setDragging(false); setJustMoved(false); return }
    const t1 = setTimeout(() => setDragging(true), 700)
    const t2 = setTimeout(() => { setDragging(false); setJustMoved(true) }, 1600)
    const t3 = setTimeout(() => setJustMoved(false), 3000)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [hovered])

  const tasks = TASK_DATA.map((t, i) => {
    /* Move the first col-0 card to col-1 when justMoved */
    if (justMoved && t.col === 0 && i === 0) return { ...t, col: 1 }
    return t
  })

  return (
    <div style={{ width: '100%', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>

      {/* ── App header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: 1, background: '#F97316' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.04em' }}>
            Smart Task
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* JWT badge */}
          <div style={{ padding: '1px 5px', borderRadius: 3, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: '#F97316' }}>JWT</span>
          </div>
          {/* Export button */}
          <div style={{ padding: '1px 6px', borderRadius: 3, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--text-muted)' }}>↓ Export</span>
          </div>
        </div>
      </div>

      {/* ── Kanban columns ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
        {COL_META.map((col, ci) => {
          const colTasks = tasks.filter(t => t.col === ci)
          return (
            <div key={col.label}>
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: col.accent, fontWeight: 700, letterSpacing: '0.08em' }}>
                  {col.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-muted)', opacity: 0.5 }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Column body */}
              <div style={{
                minHeight: 52, borderRadius: 6, padding: '4px',
                background: col.bg,
                border: `1px solid ${col.accent}20`,
                display: 'flex', flexDirection: 'column', gap: 3,
              }}>
                {colTasks.map((task, ti) => {
                  const isDraggingCard = dragging && task.col === 0 && ti === 0
                  return (
                    <motion.div
                      key={task.title}
                      animate={isDraggingCard ? {
                        scale: 1.04,
                        boxShadow: `0 4px 16px rgba(249,115,22,0.4)`,
                        y: -2,
                      } : {
                        scale: 1,
                        boxShadow: 'none',
                        y: 0,
                      }}
                      transition={{ duration: 0.25 }}
                      style={{
                        padding: '5px 6px', borderRadius: 5,
                        background: isDraggingCard ? 'rgba(249,115,22,0.15)' : 'var(--bg-card)',
                        border: `1px solid ${isDraggingCard ? col.accent + '50' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-secondary)', margin: '0 0 4px', lineHeight: 1.3 }}>
                        {task.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Tag */}
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 6,
                          color: col.accent, background: `${col.accent}12`,
                          padding: '1px 4px', borderRadius: 3,
                        }}>
                          {task.tag}
                        </span>
                        {/* Priority dot */}
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: PRIORITY_COLOR[task.priority] }} />
                      </div>
                    </motion.div>
                  )
                })}

                {/* Drop zone hint while dragging */}
                {dragging && ci === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      height: 28, borderRadius: 5,
                      border: `1.5px dashed ${col.accent}60`,
                      background: `${col.accent}05`,
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── EARLIER: Video Conference — WebRTC session UI ─── */
const VC_PARTICIPANTS = [
  { name: 'Bitanya',  initials: 'BW', color: '#22D3EE', muted: false, cam: true  },
  { name: 'Instructor',initials: 'IN', color: '#8B5CF6', muted: true,  cam: true  },
  { name: 'Meron',     initials: 'MT', color: '#EC4899', muted: false, cam: false },
  { name: 'Yonas',     initials: 'YA', color: '#10B981', muted: true,  cam: true  },
]

function VideoConferenceWorld({ hovered }: { hovered: boolean }) {
  const [activeSpeaker, setActiveSpeaker] = useState(0)
  const [sharing, setSharing]             = useState(false)

  useEffect(() => {
    const t = setInterval(() => setActiveSpeaker(s => (s + 1) % VC_PARTICIPANTS.length), 1800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!hovered) { setSharing(false); return }
    const t = setTimeout(() => setSharing(true), 1200)
    return () => clearTimeout(t)
  }, [hovered])

  return (
    <div style={{ width: '100%', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>

      {/* ── Session header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 8px', borderRadius: 6,
        background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-secondary)', fontWeight: 700 }}>
            Live · 4 participants
          </span>
        </div>
        {/* Room link */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3,
          padding: '1px 6px', borderRadius: 3,
          background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)',
        }}>
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
            <path d="M1 3.5h5M3.5 1l2.5 2.5-2.5 2.5" stroke="rgba(34,211,238,0.7)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'rgba(34,211,238,0.7)' }}>
            room/abc-123
          </span>
        </div>
      </div>

      {/* ── Participant grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {VC_PARTICIPANTS.map((p, i) => {
          const isSpeaking = activeSpeaker === i
          const isSharing  = sharing && i === 0

          return (
            <motion.div
              key={p.name}
              animate={{
                borderColor: isSpeaking ? p.color : 'rgba(34,211,238,0.1)',
                boxShadow: isSpeaking ? `0 0 10px ${p.color}35` : 'none',
              }}
              transition={{ duration: 0.3 }}
              style={{
                height: 44, borderRadius: 7, border: '1.5px solid',
                background: p.cam ? `${p.color}08` : 'rgba(255,255,255,0.02)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Camera off overlay */}
              {!p.cam && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 1l8 8M7 2H2a1 1 0 00-1 1v4a1 1 0 001 1h5M8 3.5l1.5-1v5L8 6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
              )}

              {/* Avatar initials */}
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: `${p.color}22`, border: `1.5px solid ${p.color}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: p.color, fontWeight: 700 }}>
                  {p.initials}
                </span>
              </div>

              {/* Name + status row */}
              <div style={{
                position: 'absolute', bottom: 3, left: 5, right: 5,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>
                  {p.name}
                </span>
                <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  {/* Mute indicator */}
                  {p.muted && (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(239,68,68,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="4" height="4" viewBox="0 0 4 4" fill="none" aria-hidden="true">
                        <line x1="0.5" y1="0.5" x2="3.5" y2="3.5" stroke="white" strokeWidth="1"/>
                      </svg>
                    </div>
                  )}
                  {/* Connection quality */}
                  <div style={{ display: 'flex', gap: 0.8, alignItems: 'flex-end' }}>
                    {[3, 5, 7].map((h, bi) => (
                      <div key={bi} style={{ width: 2, height: h, borderRadius: 1, background: `${p.color}${bi < 2 ? '90' : '40'}` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Speaking waveform */}
              {isSpeaking && !p.muted && (
                <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5 }}>
                  {[0, 1, 2, 3].map(b => (
                    <motion.div key={b} style={{ width: 2, borderRadius: 1, background: p.color }}
                      animate={{ height: [2, 7, 3, 8, 2] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: b * 0.1, ease: 'easeInOut' }} />
                  ))}
                </div>
              )}

              {/* Screen share badge */}
              {isSharing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute', top: 3, right: 4,
                    padding: '1px 4px', borderRadius: 3,
                    background: 'rgba(34,211,238,0.2)', border: '1px solid rgba(34,211,238,0.4)',
                  }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: '#22D3EE' }}>↗ sharing</span>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* ── Controls bar ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 8,
        padding: '5px 10px', borderRadius: 8,
        background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.1)',
      }}>
        {[
          { icon: '🎙', label: 'Mic',    active: true  },
          { icon: '📹', label: 'Camera', active: true  },
          { icon: '🖥',  label: 'Share',  active: sharing },
          { icon: '🔴', label: 'End',    active: false },
        ].map(ctrl => (
          <div key={ctrl.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', fontSize: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: ctrl.active ? 'rgba(34,211,238,0.12)' : 'rgba(239,68,68,0.12)',
              border: `1px solid ${ctrl.active ? 'rgba(34,211,238,0.25)' : 'rgba(239,68,68,0.25)'}`,
            }}>
              {ctrl.icon}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 5.5, color: 'var(--text-muted)', opacity: 0.5 }}>
              {ctrl.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Currently Building: Yonas Inventory ─── */
/* ─── PROJECT EXHIBIT WRAPPER ─── */
function TechPillSmall({ label, accent }: { label: string; accent: string }) {
  return <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-muted)', background: `${accent}10`, border: `1px solid ${accent}22`, padding: '2px 7px', borderRadius: 3, display: 'inline-block' }}>{label}</span>
}
function ProjectExhibit({ project, index, onOpen, children, size = 'normal' }: { project: Project; index: number; onOpen: () => void; children: React.ReactNode; size?: 'featured' | 'normal' | 'compact' }) {
  const [hovered, setHovered] = useState(false)
  const sm = STATUS_META[project.status]
  const padding = size === 'featured' ? 'clamp(1.5rem,3vw,2.5rem)' : size === 'compact' ? '14px 16px' : 'clamp(1.1rem,2.5vw,1.75rem)'
  return (
    <motion.article initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,margin:'-30px' }} transition={{ duration:0.55,delay:index*0.06,ease:[0.22,1,0.36,1] }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ background:'var(--bg-card)',border:`1px solid ${hovered?project.accent+'40':'var(--border)'}`,borderRadius:size==='compact'?12:16,padding,cursor:'default',position:'relative',overflow:'hidden',transition:'border-color 0.3s ease,box-shadow 0.3s ease,transform 0.25s ease',boxShadow:hovered?`0 16px 44px rgba(0,0,0,0.32),0 0 0 1px ${project.accent}18`:'0 2px 12px rgba(0,0,0,0.16)',transform:hovered?'translateY(-3px)':'none' }}>
      <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${project.accent},${project.accent}55,transparent)`,opacity:hovered?1:0.28,transition:'opacity 0.3s ease' }} />
      <div style={{ position:'relative',zIndex:1 }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:size==='compact'?8:14,flexWrap:'wrap',gap:6 }}>
          <div style={{ display:'flex',alignItems:'center',gap:6 }}>
            <span style={{ fontFamily:'var(--font-mono)',fontSize:8,letterSpacing:'0.14em',color:project.accent,opacity:0.6 }}>EXHIBIT {project.num}</span>
            <span style={{ fontFamily:'var(--font-mono)',fontSize:7,letterSpacing:'0.12em',textTransform:'uppercase',color:project.accent,background:`${project.accent}12`,border:`1px solid ${project.accent}22`,padding:'2px 6px',borderRadius:3 }}>{project.type}</span>
          </div>
          <span style={{ fontFamily:'var(--font-mono)',fontSize:8,color:sm.color,background:sm.bg,padding:'2px 7px',borderRadius:20,fontWeight:600 }}>{sm.label}</span>
        </div>
        <h3 style={{ fontFamily:'var(--font-sans)',fontWeight:700,fontSize:size==='featured'?'clamp(1.5rem,3vw,2.1rem)':size==='compact'?'0.95rem':'clamp(1.05rem,2vw,1.3rem)',letterSpacing:'-0.025em',lineHeight:1.15,color:'var(--text-primary)',margin:'0 0 3px' }}>{project.title}</h3>
        <p style={{ fontFamily:'var(--font-mono)',fontSize:size==='compact'?9:10,color:project.accent,margin:'0 0 '+(size==='compact'?'10px':'16px'),letterSpacing:'0.03em' }}>{project.tagline}</p>
        <div style={{ marginBottom:size==='compact'?10:16 }}>{children}</div>
        <div style={{ display:'flex',flexWrap:'wrap',gap:4,marginBottom:size==='compact'?8:14 }}>
          {project.tech.slice(0,size==='compact'?3:5).map(t=><TechPillSmall key={t} label={t} accent={project.accent}/>)}
          {project.tech.length>(size==='compact'?3:5)&&<span style={{ fontFamily:'var(--font-mono)',fontSize:8,color:'var(--text-muted)',padding:'2px 4px' }}>+{project.tech.length-(size==='compact'?3:5)}</span>}
        </div>
        <div style={{ display:'flex',gap:8,flexWrap:'wrap',alignItems:'center' }}>
          <button onClick={onOpen} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:size==='featured'?'9px 20px':'6px 13px',borderRadius:8,fontFamily:'var(--font-mono)',fontSize:size==='featured'?11:10,fontWeight:700,letterSpacing:'0.06em',color:'#fff',cursor:'pointer',border:'none',background:`linear-gradient(135deg,${project.accent}CC,${project.accent}88)`,boxShadow:hovered?`0 4px 18px ${project.accent}40`:'none',transition:'box-shadow 0.25s ease' }}>
            Open Case File <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 8L8 2M8 2H4.5M8 2v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          {project.live&&<a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--text-muted)',textDecoration:'none',padding:'5px 10px',border:'1px solid var(--border)',borderRadius:7,letterSpacing:'0.06em' }}>Live ↗</a>}
        </div>
      </div>
    </motion.article>
  )
}
function ExhibitDivider({ label, color='var(--text-muted)' }: { label: string; color?: string }) {
  return (
    <div style={{ display:'flex',alignItems:'center',gap:14,marginTop:48,marginBottom:20 }}>
      <span style={{ fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color,flexShrink:0 }}>{label}</span>
      <div style={{ flex:1,height:1,background:'var(--border)' }} />
    </div>
  )
}
function CurrentlyBuilding({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,margin:'-30px' }} transition={{ duration:0.55,ease:[0.22,1,0.36,1] }}
      style={{ padding:'clamp(1.25rem,3vw,2rem)',background:'rgba(34,211,238,0.03)',border:'1px solid rgba(34,211,238,0.15)',borderRadius:16,position:'relative',overflow:'hidden' }}>
      <div style={{ position:'relative',display:'flex',flexWrap:'wrap',gap:'clamp(1rem,3vw,2rem)',alignItems:'flex-start',justifyContent:'space-between' }}>
        <div style={{ flex:1,minWidth:240,display:'flex',flexDirection:'column',gap:12 }}>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <span style={{ fontFamily:'var(--font-mono)',fontSize:8,color:'rgba(34,211,238,0.5)',background:'rgba(34,211,238,0.06)',border:'1px solid rgba(34,211,238,0.15)',padding:'2px 7px',borderRadius:3 }}>EXHIBIT 05</span>
            <motion.span style={{ width:7,height:7,borderRadius:'50%',background:'#22D3EE',display:'block',flexShrink:0 }} animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.8,repeat:Infinity }} />
            <span style={{ fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.18em',textTransform:'uppercase',color:'#22D3EE' }}>Currently Building</span>
          </div>
          <div>
            <h3 style={{ fontFamily:'var(--font-sans)',fontWeight:700,fontSize:'clamp(1.1rem,2.5vw,1.4rem)',letterSpacing:'-0.02em',color:'var(--text-primary)',margin:'0 0 4px' }}>YM Inventory</h3>
            <p style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(34,211,238,0.6)',margin:0 }}>Inventory management for a mobile electronics business</p>
          </div>
          <div style={{ maxWidth:320 }}><InventoryWorld /></div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:5 }}>
            {['NestJS','TypeScript','Prisma','PostgreSQL'].map(t=>(
              <span key={t} style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--text-muted)',background:'rgba(34,211,238,0.06)',border:'1px solid rgba(34,211,238,0.14)',padding:'3px 9px',borderRadius:4 }}>{t}</span>
            ))}
          </div>
          <button onClick={onOpen} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:8,fontFamily:'var(--font-mono)',fontSize:10,fontWeight:600,color:'#22D3EE',cursor:'pointer',background:'rgba(34,211,238,0.08)',border:'1px solid rgba(34,211,238,0.25)',letterSpacing:'0.06em',width:'fit-content' }}>What I'm building →</button>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:8,flexShrink:0,alignItems:'flex-end' }}>
          <div style={{ display:'flex',alignItems:'center',gap:7,padding:'7px 14px',borderRadius:10,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)' }}>
            <motion.span style={{ width:5,height:5,borderRadius:'50%',background:'#FBBF24',display:'block' }} animate={{ opacity:[1,0.3,1] }} transition={{ duration:2,repeat:Infinity }} />
            <span style={{ fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.14em',textTransform:'uppercase',color:'#FBBF24' }}>In Development</span>
          </div>
          <span style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--text-muted)',opacity:0.45 }}>Client Project · 2025</span>
        </div>
      </div>
    </motion.div>
  )
}
function InventoryWorld() {
  const [flow, setFlow] = useState(0)
  useEffect(() => { const t = setInterval(() => setFlow(f => (f + 1) % 8), 700); return () => clearInterval(t) }, [])
  const stages = [{ label: 'WAREHOUSE', icon: '🏭', note: 'Stock in' }, { label: 'SHOP', icon: '🏪', note: 'Transfer' }, { label: 'SOLD', icon: '✓', note: 'Movement' }]
  return (
    <div style={{ width: '100%', userSelect: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        {stages.map((stage, i) => (
          <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <motion.div animate={{ borderColor: flow >= i * 2 ? 'rgba(34,211,238,0.55)' : 'rgba(34,211,238,0.15)', background: flow >= i * 2 ? 'rgba(34,211,238,0.08)' : 'transparent' }}
              style={{ padding: '5px 8px', borderRadius: 6, border: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 52 }}>
              <span style={{ fontSize: 14 }}>{stage.icon}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, letterSpacing: '0.1em', color: 'rgba(34,211,238,0.5)', textAlign: 'center' }}>{stage.label}</span>
            </motion.div>
            {i < stages.length - 1 && (
              <motion.div style={{ width: 20, height: 1.5, borderRadius: 1 }}
                animate={{ background: flow > i * 2 + 1 ? 'rgba(34,211,238,0.6)' : 'rgba(34,211,238,0.15)' }} transition={{ duration: 0.25 }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, padding: '5px 8px', borderRadius: 5, background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'rgba(34,211,238,0.45)', letterSpacing: '0.1em', marginBottom: 3 }}>SERIALIZED</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'rgba(34,211,238,0.7)' }}>📱 IMEI tracked</div>
        </div>
        <div style={{ flex: 1, padding: '5px 8px', borderRadius: 5, background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'rgba(34,211,238,0.45)', letterSpacing: '0.1em', marginBottom: 3 }}>QUANTITY</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'rgba(34,211,238,0.7)' }}>📦 Batch count</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Shared exhibit wrapper ─── */
/* ─── WORLD MAP ─── */
const YONAS_PROJECT: Project = {
  id: 'yonas-inventory', num: '05', tier: 'secondary', icon: '⬡',
  title: 'YM Inventory', tagline: 'Inventory management for a mobile electronics business',
  type: 'Client Project', status: 'in-development', year: '2025', accent: '#22D3EE',
  tech: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL'],
  summary: 'A backend-heavy inventory system tracking products, warehouses, stock batches, stock movements, and serialized phone IMEIs for a real mobile electronics business.',
  minacHint: "This one's still in the lab.",
  detail: {
    context: 'A mobile/electronics business needed a proper system to track stock across multiple locations, manage incoming stock batches, process sales and returns, and register individual phone IMEIs.',
    role: 'Building the NestJS backend and Prisma data layer. Designing the inventory domain model: products, product units, stock batches, stock movements, warehouse locations, and serialized tracking.',
    engineering: 'The key design challenge was modeling two inventory modes: quantity-based products and serialized products (phones with individual IMEI numbers). Stock movements are immutable audit records.',
    outcome: 'Not yet complete. A working NestJS API with typed Prisma schema covering the core inventory domain.',
  },
}

const WORLD_MAP: Record<string, (hovered: boolean) => React.ReactNode> = {
  'cashbook':         (h) => <CashbookWorld hovered={h} />,
  'awlo':             (h) => <AwloWorld hovered={h} />,
  'drive-hub':        (h) => <DriveHubWorld hovered={h} />,
  'sms-system':       (h) => <SmsWorld hovered={h} />,
  'medilink':         (h) => <MediLinkWorld hovered={h} />,
  'smart-task':       (h) => <SmartTaskWorld hovered={h} />,
  'video-conference': (h) => <VideoConferenceWorld hovered={h} />,
}

function WorldWrapper({ children }: { children: (hovered: boolean) => React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: '100%' }}>
      {children(hovered)}
    </div>
  )
}

/* ─── MAIN EXPORT ─── */
export default function Projects() {
  const [caseFileId, setCaseFileId] = useState<string | null>(null)
  const openCase  = useCallback((id: string) => {
    setCaseFileId(id)
    const project = [...ALL_PROJECTS, YONAS_PROJECT].find(p => p.id === id)
    if (project?.minacHint) triggerMinac(project.minacHint)
  }, [])
  const closeCase = useCallback(() => setCaseFileId(null), [])
  const caseProject = [...ALL_PROJECTS, YONAS_PROJECT].find(p => p.id === caseFileId) ?? null

  const featured  = ALL_PROJECTS.find(p => p.tier === 'featured')!
  const secondary = ALL_PROJECTS.filter(p => p.tier === 'secondary')
  const earlier   = ALL_PROJECTS.filter(p => p.tier === 'earlier')

  return (
    <section id="projects" className="lab-section relative overflow-hidden" style={{ background: 'var(--lab-surface)' }}>
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.4 }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '0%', right: '-8%', width: 440, height: 440, background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="lab-container relative z-10">
        <ScrollReveal variant="fadeUp">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.6 }}>Lab Log</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)' }}>Client products · Backend systems · Full-stack development</span> 
          </div>
          
          <SectionEyebrow> // 01 — selected work</SectionEyebrow>
          <h2 className="lab-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', margin: '0 0 14px' }}>
            Things I've built <span className="gradient-text">and what they taught me.</span>
          </h2>
          <p className="lab-body" style={{ maxWidth: 520, marginTop: 8 }}>
            A collection of systems, client products and experiments I've designed, built, debugged and learned from.
          </p>
        </ScrollReveal>
        <ExhibitDivider label="Recent & Client Work" />
        <WorldWrapper>
          {(h) => (
            <ProjectExhibit project={featured} index={0} onOpen={() => openCase(featured.id)} size="featured">
              {WORLD_MAP[featured.id]?.(h)}
            </ProjectExhibit>
          )}
        </WorldWrapper>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginTop: 14, alignItems: 'start' }}>
          {secondary.map((p, i) => (
            <WorldWrapper key={p.id}>
              {(h) => (
                <ProjectExhibit project={p} index={i + 1} onOpen={() => openCase(p.id)} size="normal">
                  {WORLD_MAP[p.id]?.(h)}
                </ProjectExhibit>
              )}
            </WorldWrapper>
          ))}
        </div>
        <ExhibitDivider label="Currently Building" color="rgba(34,211,238,0.6)" />
        <CurrentlyBuilding onOpen={() => openCase('yonas-inventory')} />
        <ExhibitDivider label="Earlier Work" />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', opacity: 0.6, marginBottom: 14 }}>Personal and exploratory projects that built the foundation.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {earlier.map((p, i) => (
            <WorldWrapper key={p.id}>
              {(h) => (
                <ProjectExhibit project={p} index={i} onOpen={() => openCase(p.id)} size="compact">
                  {WORLD_MAP[p.id]?.(h)}
                </ProjectExhibit>
              )}
            </WorldWrapper>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {caseProject && <CaseFile key={caseProject.id} project={caseProject} onClose={closeCase} />}
      </AnimatePresence>
      <style>{`
        @media (max-width: 600px) {
          [role="dialog"] { padding: 0.5rem !important; align-items: flex-end !important; }
          [role="dialog"] > div { border-radius: 18px 18px 0 0 !important; max-height: 93dvh; overflow-y: auto; }
        }
      `}</style>
    </section>
  )
}

/* ─── BACKWARD-COMPAT EXPORTS ─── */
export type ProjectDef = Pick<Project, 'id' | 'title' | 'tagline' | 'tech' | 'github' | 'accent'> & {
  description: string; liveDemo?: string; status: 'shipped' | 'in-progress' | 'archived'; year: string
}
export const PROJECTS: ProjectDef[] = [
  { id: 'smart-task',       title: 'Smart Task',       tagline: 'Kanban task management', description: 'Full-stack Kanban with JWT auth.',     tech: ['Next.js','TypeScript','Prisma','PostgreSQL'],          github: 'https://github.com/BitanyYa/smart-task',              liveDemo: 'https://smart-task-two.vercel.app/',   accent: '#F97316', status: 'shipped', year: '2024' },
  { id: 'drive-hub',        title: 'Drive Hub',        tagline: 'Car rental with lottery', description: 'Client rental platform with audit.',    tech: ['Node.js','Express','React','TypeScript','PostgreSQL'], github: 'https://github.com/HuniyaMusema/Drive-Hub-luck',        liveDemo: 'https://frontend-production-7c43.up.railway.app/', accent: '#06B6D4', status: 'shipped', year: '2024' },
  { id: 'medilink',         title: 'MediLink',         tagline: 'Healthcare pharmacy',     description: 'Pharmacy availability lookup.',         tech: ['Node.js','React','MongoDB'],                           github: 'https://github.com/HawiGenene1/Medilink',              liveDemo: 'https://medilinkpharmacy.vercel.app/', accent: '#10B981', status: 'shipped', year: '2024' },
  { id: 'video-conference', title: 'Video Conference', tagline: 'WebRTC conferencing',     description: 'Real-time video, built during internship.', tech: ['Next.js','TypeScript','WebRTC','Socket.io','Node.js'], github: 'https://github.com/MeronTekle07/Video-Conference-Web-App', accent: '#22D3EE', status: 'shipped', year: '2024' },
]

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

/* ═══════════════════════════════════════════════════════
   PORTFOLIO KNOWLEDGE BASE
   All facts are verified from actual portfolio data.
   Never invent employers, dates, project features,
   technologies, clients, or achievements.
═══════════════════════════════════════════════════════ */

const KB = {
  about: {
    name: 'Bitanya Wondimagegn',
    role: 'Full Stack Software Engineer',
    location: 'Addis Ababa, Ethiopia',
    summary:
      'Bitanya is a full-stack software engineer from Addis Ababa who builds web applications, backend APIs, and real-world client systems. She studied Computer Science and has shipped projects for real clients and businesses.',
    approach:
      'She builds practical systems that solve real problems. Her work covers both backend architecture and frontend UI, and she has shipped projects under actual client requirements and deadlines.',
    education: 'B.Sc. Computer Science, Addis Ababa (2022–2026).',
  },

  contact: {
    email:     'bethanywondimagegn@gmail.com',
    github:    'https://github.com/BitanyYa',
    linkedin:  'https://linkedin.com/in/bitanya-wondimagegn-05365a392',
    resume:    '/resume.pdf',
    available: 'Available for full-time roles, freelance projects, and technical collaborations.',
    text:      'You can reach Bitanya by email at bethanywondimagegn@gmail.com, via GitHub (BitanyYa), or on LinkedIn. There is also a downloadable resume in the Contact section.',
  },

  experience: [
    {
      seq: '01',
      period: '2022–2026',
      role: 'B.Sc. Computer Science',
      category: 'Education',
      description:
        'Four years studying algorithms, data structures, software engineering, and databases at a university in Addis Ababa. Alongside coursework she built real projects to apply what she was learning.',
      learned: [
        'Core CS fundamentals: algorithms, data structures, systems design',
        'Database design and implementation',
        'Software engineering practices',
        'Problem solving under structured constraints',
      ],
    },
    {
      seq: '02',
      period: 'Jun–Aug 2025',
      role: 'Web Development Intern',
      category: 'Internship',
      description:
        'First professional engineering environment. Contributed to a real Video Conference web application building core screens, functional flows, and managing persistent data with PostgreSQL.',
      learned: [
        'Working within an existing codebase',
        'Professional engineering practices',
        'WebRTC and real-time communication',
        'Translating requirements into working features',
      ],
    },
    {
      seq: '03',
      period: '2024–2025',
      role: 'Full Stack Software Engineer',
      category: 'Client Work',
      description:
        'Designed and delivered full systems for real clients and real businesses. Each project came with actual requirements, actual deadlines, and actual users.',
      learned: [
        'Working with real client requirements',
        'Designing and delivering end-to-end systems',
        'Full stack development across multiple tech stacks',
        'Deployment and production considerations',
        'Database design for real data',
      ],
    },
  ],

  skills: {
    languages:   ['TypeScript', 'JavaScript', 'PHP', 'SQL'],
    frontend:    ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion'],
    backend:     ['Node.js', 'NestJS', 'Express', 'Laravel'],
    databases:   ['PostgreSQL', 'MongoDB', 'SQLite', 'Supabase'],
    orm:         ['Prisma'],
    auth:        ['JWT', 'Better Auth', 'bcryptjs'],
    realtime:    ['WebRTC', 'Socket.io'],
    tools:       ['Git', 'Postman', 'Figma'],
    summary:
      'Her stack includes TypeScript, JavaScript, React, Next.js, NestJS, Laravel, PostgreSQL, Prisma, Supabase, MongoDB, WebRTC, and Socket.io. She works across the full stack and has shipped both frontend-heavy and backend-heavy systems.',
  },

  projects: [
    {
      id: 'cashbook',
      name: 'CashBook',
      type: 'Client Project',
      status: 'completed',
      year: '2025',
      tech: ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'SQLite'],
      summary:
        'A digital cashbook system built to replace manual record-keeping for a real business. Covers income, expenses, cashbook entries, user and business management, and a one-time CSV data migration from existing records.',
      description:
        'CashBook is a business cashbook system Bitanya built for a real client to manage income, expenses, categories, and business users. The work included migrating existing records from CSV files into the new system. She worked across the full application stack.',
      learned: ['Working with real business requirements', 'CSV data migration', 'Multi-user role-based access', 'Full-stack delivery on a deadline'],
    },
    {
      id: 'awlo',
      name: 'AWLO Business Center',
      type: 'Client Project · Live',
      status: 'live',
      year: '2025',
      tech: ['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'Framer Motion'],
      summary:
        'A production web platform for AWLO Business Center, an LED billboard advertising business in Addis Ababa. Includes service advertising, media management, client quote workflows, and an admin dashboard backed by Supabase.',
      description:
        "AWLO Business Center is a live production platform at awlobc.com. It allows clients to discover LED billboard advertising services, explore media packages, and submit quote requests. Bitanya built the full platform including the backend dashboard.",
      learned: ['Building for a live production audience', 'Working with Supabase and PostgreSQL', 'Complex quote and media management flows'],
    },
    {
      id: 'drive-hub',
      name: 'Drive Hub',
      type: 'Client Project',
      status: 'live',
      year: '2024',
      tech: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
      summary:
        'A car rental platform built for a real client with a lottery-based booking system, role-based admin dashboard, and a structured payment workflow with full audit trail.',
      description:
        'Drive Hub is a client project. It manages car rental bookings using a lottery-based allocation system with transparent selection, role-based access control, and a structured payment and audit workflow for accountability.',
      learned: ['Lottery-based resource allocation', 'Role-based access control', 'Audit trail design', 'Client delivery under real constraints'],
    },
    {
      id: 'sms-system',
      name: 'SMS App',
      type: 'Internal System',
      status: 'completed',
      year: '2025',
      tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma', 'Better Auth'],
      summary:
        'A warranty notification system. Receives registered warranty data from YM Inventory and automatically sends SMS confirmations to customers. Stores warranty records and SMS delivery logs.',
      description:
        'The SMS App is an internal system that connects to YM Inventory. When a warranty is registered, the system automatically sends an SMS confirmation to the customer and stores both the warranty record and the delivery log.',
      learned: ['Integrating with an external system', 'Automated SMS delivery workflows', 'Auth with Better Auth and Prisma'],
    },
    {
      id: 'medilink',
      name: 'MediLink',
      type: 'Personal Project',
      status: 'completed',
      year: '2024',
      tech: ['Node.js', 'React', 'MongoDB'],
      summary:
        'Connects patients to pharmacies with real-time medicine availability. Optimised for high-read operations with compound indexes.',
      description:
        'MediLink is a personal project that helps patients find pharmacies stocking specific medicines. Bitanya built the backend API with Node.js and MongoDB, optimising for high-read queries with compound indexes.',
      learned: ['MongoDB data modelling', 'High-read query optimisation', 'Building healthcare-adjacent features responsibly'],
    },
    {
      id: 'smart-task',
      name: 'Smart Task',
      type: 'Personal Project',
      status: 'completed',
      year: '2024',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT'],
      summary:
        'Full-stack Kanban task board with JWT authentication, task assignment, and document export functionality.',
      description:
        'Smart Task is a personal project — a full-stack Kanban board with JWT auth, task creation, assignment, status tracking, and PDF/Excel export. Built to explore full-stack patterns with Next.js, Prisma, and PostgreSQL.',
      learned: ['Kanban workflow design', 'JWT auth flow', 'Document export (PDF/Excel)', 'Full-stack patterns with Next.js and Prisma'],
    },
    {
      id: 'video-conference',
      name: 'Video Conference',
      type: 'Internship Project',
      status: 'completed',
      year: '2024',
      tech: ['Next.js', 'TypeScript', 'WebRTC', 'Socket.io', 'Node.js'],
      summary:
        'Real-time video conferencing using WebRTC for peer-to-peer connections. Built during a web development internship.',
      description:
        'Video Conference is a WebRTC-based peer-to-peer video conferencing app built during her internship. She worked on core screens, functional flows, and the signalling layer using Socket.io.',
      learned: ['WebRTC peer-to-peer connections', 'Signalling with Socket.io', 'Working on a professional engineering team'],
    },
    {
      id: 'yonas-inventory',
      name: 'YM Inventory',
      type: 'Client Project',
      status: 'in-progress',
      year: '2025',
      tech: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL'],
      summary:
        'A backend-heavy inventory system tracking products, warehouses, stock batches, stock movements, and phone IMEIs for a real mobile electronics business.',
      description:
        'YM Inventory is currently in development. It is a client project tracking products, warehouses, stock batches, stock movements, and individual phone IMEIs for a real mobile electronics business in Addis Ababa.',
      learned: ['NestJS architecture at scale', 'Complex inventory domain modelling', 'Prisma ORM with deep relational schemas'],
    },
  ],

  currentWork: {
    project: 'YM Inventory',
    status: 'In development',
    description:
      'She is currently building YM Inventory a backend-heavy inventory system for a real mobile electronics business. Built with NestJS, Prisma, and PostgreSQL. Not yet shipped.',
  },
}

/* ═══════════════════════════════════════════════════════
   RESPONSE ENGINE
   Intent matching → structured KB lookups → natural text
═══════════════════════════════════════════════════════ */

interface MinacAnswer {
  text: string
  nav?: { label: string; section: string }
}

type Intent =
  | 'greeting'
  | 'who'
  | 'experience'
  | 'skills'
  | 'projects_list'
  | 'project_detail'
  | 'client_projects'
  | 'current_work'
  | 'contact'
  | 'backend'
  | 'frontend'
  | 'database'
  | 'learn'
  | 'resume'
  | 'availability'
  | 'lab'
  | 'unknown'

function detectIntent(q: string): { intent: Intent; projectId?: string } {
  const s = q.toLowerCase().trim()

  // Greeting
  if (/^(hi|hello|hey|sup|yo)\b/.test(s))
    return { intent: 'greeting' }

  // Resume / CV
  if (/resume|cv|download/.test(s))
    return { intent: 'resume' }

  // Availability / hire
  if (/availab|hire|open to|looking for|opportunit|freelanc|full.?time/.test(s))
    return { intent: 'availability' }

  // Contact
  if (/contact|reach|email|message|get in touch/.test(s))
    return { intent: 'contact' }

  // Lab / toolbox
  if (/\blab\b|toolbox|engineering lab/.test(s))
    return { intent: 'lab' }

  // Current work
  if (/current|working on|building now|in progress|in dev|latest/.test(s))
    return { intent: 'current_work' }

  // Who is Bitanya
  if (/who (is|are)|about her|about bit|tell me about bit|introduce|background/.test(s))
    return { intent: 'who' }

  // Experience / journey
  if (/\bexperience\b|intern|journey|career|job|work history|how long/.test(s))
    return { intent: 'experience' }

  // Individual project detail — checked BEFORE generic "projects" so
  // "tell me about CashBook" doesn't fall into projects_list
  const projectMap: [RegExp, string][] = [
    [/cashbook/, 'cashbook'],
    [/awlo/, 'awlo'],
    [/drive.?hub/, 'drive-hub'],
    [/\bsms\b|warranty/, 'sms-system'],
    [/medilink|medi.?link/, 'medilink'],
    [/smart.?task/, 'smart-task'],
    [/video.?conf|webrtc/, 'video-conference'],
    [/\bym inventory\b|yonas inventory|\bym\b.*inventor/, 'yonas-inventory'],
  ]
  for (const [re, id] of projectMap) {
    if (re.test(s)) return { intent: 'project_detail', projectId: id }
  }

  // Client projects
  if (/client|real (project|work|business)|paid|professional/.test(s))
    return { intent: 'client_projects' }

  // Project list — "what has she built", "show me her projects", "what projects"
  // Deliberately broad; placed BEFORE backend/frontend/database so it wins
  if (/\bproject(s)?\b|\bbuilt\b|\bshipped\b|show me|portfolio/.test(s))
    return { intent: 'projects_list' }

  // Backend specifically
  if (/\bbackend\b|\bserver.?side\b|nestjs|laravel|\bexpress\b|\bnode\.?js\b/.test(s))
    return { intent: 'backend' }

  // Frontend specifically
  if (/\bfrontend\b|react\.?js|next\.?js|\bangular\b|tailwind/.test(s))
    return { intent: 'frontend' }

  // Database specifically
  if (/\bdatabase\b|\bdb\b|postgres|mongodb|\bsql\b|prisma|supabase/.test(s))
    return { intent: 'database' }

  // Skills / tech (general)
  if (/\btech\b|stack|skill|language|framework|\btool\b|technologies/.test(s))
    return { intent: 'skills' }

  // What did she learn
  if (/learn|gain|grow|improve|takeaway/.test(s))
    return { intent: 'learn' }

  return { intent: 'unknown' }
}

function buildAnswer({ intent, projectId }: { intent: Intent; projectId?: string }): MinacAnswer {
  switch (intent) {
    case 'greeting':
      return { text: "Hey I'm Minac, Bitanya's portfolio assistant. Ask me about her projects, experience, tech stack, or anything else you'd like to know." }

    case 'who':
      return {
        text: `${KB.about.summary} ${KB.about.approach}`,
        nav: { label: 'View Experience →', section: 'experience' },
      }

    case 'experience':
      return {
        text: `Bitanya's engineering journey has three chapters so far: ${KB.experience[0].period} — ${KB.experience[0].role} (${KB.experience[0].category}); ${KB.experience[1].period} — ${KB.experience[1].role} (${KB.experience[1].category}); and ${KB.experience[2].period} — ${KB.experience[2].role} doing client work.`,
        nav: { label: 'View Experience →', section: 'experience' },
      }

    case 'skills':
      return {
        text: KB.skills.summary,
        nav: { label: 'Explore the Lab →', section: 'lab' },
      }

    case 'backend':
      return {
        text: `Her backend stack includes Node.js, NestJS, Express, and Laravel for server-side development plus PostgreSQL, Prisma, Supabase, and MongoDB for data. She has shipped backend-heavy systems for real clients.`,
        nav: { label: 'View Projects →', section: 'projects' },
      }

    case 'frontend':
      return {
        text: `On the frontend she works with React, Next.js, Angular, and Tailwind CSS. Several of her shipped projects have substantial UI work including AWLO Business Center and the portfolio itself.`,
        nav: { label: 'View Projects →', section: 'projects' },
      }

    case 'database':
      return {
        text: `She has worked with PostgreSQL, MongoDB, SQLite, and Supabase. For ORM she uses Prisma. Her client projects rely on PostgreSQL and she has experience with data migrations (CashBook's CSV import is one example).`,
        nav: { label: 'View Projects →', section: 'projects' },
      }

    case 'projects_list': {
      const clientProjects  = KB.projects.filter(p => p.type.includes('Client')).map(p => p.name)
      const personalProjects = KB.projects.filter(p => p.type === 'Personal Project').map(p => p.name)
      const inProgress      = KB.projects.filter(p => p.status === 'in-progress').map(p => p.name)
      return {
        text: `Bitanya has built 8 projects across full-stack web, backend systems, and client work.\n\nClient projects: ${clientProjects.join(', ')}.\nPersonal projects: ${personalProjects.join(', ')}.\nInternship: Video Conference.\n${inProgress.length ? `Currently in progress: ${inProgress.join(', ')}.` : ''}\n\nAsk me about any specific project for more detail.`,
        nav: { label: 'View Projects →', section: 'projects' },
      }
    }

    case 'project_detail': {
      const p = KB.projects.find(x => x.id === projectId)
      if (!p) return { text: "I couldn't find that project. Try asking about CashBook, AWLO, Drive Hub, the SMS App, MediLink, Smart Task, Video Conference, or YM Inventory." }
      const statusNote = p.status === 'in-progress' ? ' It is currently still in development.' : p.status === 'live' ? ' It is live and in production.' : ''
      return {
        text: `${p.description}${statusNote} Tech: ${p.tech.join(', ')}.`,
        nav: { label: 'View Projects →', section: 'projects' },
      }
    }

    case 'client_projects': {
      const clients = KB.projects.filter(p => p.type.includes('Client'))
      const list = clients.map(p => p.name).join(', ')
      return {
        text: `Her client projects are: ${list}. These were built for real clients with actual requirements and deadlines. YM Inventory is still in development.`,
        nav: { label: 'View Projects →', section: 'projects' },
      }
    }

    case 'current_work':
      return {
        text: KB.currentWork.description,
        nav: { label: 'View Projects →', section: 'projects' },
      }

    case 'contact':
      return {
        text: `You can email Bitanya at bethanywondimagegn@gmail.com, find her on GitHub as BitanyYa, or connect on LinkedIn. The Contact section below also has a direct message form.`,
        nav: { label: 'Go to Contact →', section: 'contact' },
      }

    case 'resume':
      return {
        text: 'Her resume is available as a PDF download in the Contact section.',
        nav: { label: 'Download Resume →', section: 'contact' },
      }

    case 'availability':
      return {
        text: 'Bitanya is available for full-time engineering roles, freelance projects, and interesting technical collaborations. The best way to reach her is via the Contact section.',
        nav: { label: 'Get in Touch →', section: 'contact' },
      }

    case 'lab':
      return {
        text: 'The Engineering Toolbox section shows the languages, frameworks, databases, and tools Bitanya has used across her projects and how they connect together.',
        nav: { label: 'Explore the Lab →', section: 'lab' },
      }

    case 'learn':
      return {
        text: `Her projects gave her experience across frontend development, backend APIs, databases, authentication, deployment, and working with real client requirements. Her recent work has particularly strengthened her experience with NestJS, Prisma, and PostgreSQL.`,
        nav: { label: 'View Experience →', section: 'experience' },
      }

    default:
      return {
        text: "I don't have that information but I can tell you about Bitanya's projects, tech stack, experience, or how to get in touch with her.",
      }
  }
}

function getMinacAnswer(query: string): MinacAnswer {
  const parsed = detectIntent(query)
  return buildAnswer(parsed)
}

// Shared export so TheLabSection can reuse it
export { getMinacAnswer }
export type { MinacAnswer }

/* Quick-question suggestions — shown when chat first opens */
export const MINAC_SUGGESTIONS = [
  'Tell me about Bitanya',
  'What projects has she built?',
  'What technologies does she use?',
  'Tell me about her experience',
  'Which projects were client work?',
  'Is there a resume I can view?',
]

/* ═══════════════════════════════════════════════════════
   MINAC CHAT PANEL
   Compact assistant panel opened from the floating orb.
═══════════════════════════════════════════════════════ */
interface ChatMsg {
  role: 'user' | 'minac'
  text: string
  nav?: { label: string; section: string }
}

function scrollToSection(section: string) {
  const el = document.getElementById(section)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function MinacPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: 'minac',
      text: "Hi! I'm Minac Bitanya's portfolio assistant. I can tell you about her projects, experience, technologies, and background. What would you like to know?",
    },
  ])
  const [input, setInput]       = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, thinking])

  const send = useCallback((text: string) => {
    if (!text.trim() || thinking) return
    const q = text.trim()
    setInput('')
    setMsgs(m => [...m, { role: 'user', text: q }])
    setThinking(true)
    setTimeout(() => {
      const answer = getMinacAnswer(q)
      setMsgs(m => [...m, { role: 'minac', text: answer.text, nav: answer.nav }])
      setThinking(false)
    }, 500 + Math.random() * 300)
  }, [thinking])

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const lastIsMinac = msgs.length > 0 && msgs[msgs.length - 1].role === 'minac'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.94 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-label="Minac portfolio assistant"
      aria-modal="true"
      style={{
        width: 320,
        background: 'rgba(26,22,40,0.97)',
        border: '1px solid rgba(139,92,246,0.28)',
        borderRadius: 18,
        backdropFilter: 'blur(24px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.12)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'min(520px, 80vh)',
      }}
    >
      {/* ── Header ── */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(139,92,246,0.14)',
        background: 'rgba(139,92,246,0.05)',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
      }}>
        {/* Orb mini */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: 'radial-gradient(circle at 32% 28%, #C4B5FD 0%, #8B5CF6 30%, #6D28D9 70%, #3B0764 100%)',
          boxShadow: '0 0 12px rgba(139,92,246,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'radial-gradient(circle, #22D3EE 0%, #0891B2 60%)',
            boxShadow: '0 0 6px rgba(34,211,238,0.8)',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#C4B5FD', letterSpacing: '0.06em' }}>
            Minac
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(183,176,204,0.5)', letterSpacing: '0.1em' }}>
            Portfolio assistant
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Minac assistant"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(183,176,204,0.4)', fontSize: 16, lineHeight: 1,
            padding: '2px 6px', borderRadius: 6,
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C4B5FD'; el.style.background = 'rgba(139,92,246,0.12)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(183,176,204,0.4)'; el.style.background = 'transparent' }}
        >
          ✕
        </button>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '14px 14px 8px',
        display: 'flex', flexDirection: 'column', gap: 10,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(139,92,246,0.2) transparent',
      }}>
        {msgs.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 4 }}
          >
            {m.role === 'minac' && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(139,92,246,0.55)', letterSpacing: '0.14em', paddingLeft: 2 }}>
                MINAC
              </span>
            )}
            <div style={{
              maxWidth: '88%', padding: '8px 12px',
              borderRadius: m.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
              background: m.role === 'user' ? 'rgba(236,72,153,0.13)' : 'rgba(139,92,246,0.1)',
              border: `1px solid ${m.role === 'user' ? 'rgba(236,72,153,0.25)' : 'rgba(139,92,246,0.2)'}`,
              fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.65,
              color: m.role === 'user' ? '#F9A8D4' : '#B7B0CC',
            }}>
              {m.text}
              {/* Blinking cursor on last Minac message when idle */}
              {m.role === 'minac' && i === msgs.length - 1 && lastIsMinac && !thinking && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  style={{ display: 'inline-block', marginLeft: 2, color: 'rgba(139,92,246,0.6)' }}
                >▋</motion.span>
              )}
            </div>
            {/* Nav button */}
            {m.role === 'minac' && m.nav && (
              <button
                onClick={() => scrollToSection(m.nav!.section)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  color: '#A78BFA', background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  padding: '3px 10px', borderRadius: 6, cursor: 'pointer',
                  letterSpacing: '0.08em', transition: 'background 0.2s, border-color 0.2s',
                  marginLeft: 2,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(139,92,246,0.2)'; el.style.borderColor = 'rgba(139,92,246,0.45)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(139,92,246,0.1)'; el.style.borderColor = 'rgba(139,92,246,0.25)' }}
                aria-label={m.nav.label}
              >
                {m.nav.label}
              </button>
            )}
          </motion.div>
        ))}

        {thinking && (
          <div style={{ display: 'flex', gap: 5, paddingLeft: 4 }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(139,92,246,0.5)' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Suggestions ── */}
      {msgs.length <= 1 && (
        <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 5, flexShrink: 0 }}>
          {MINAC_SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(183,176,204,0.6)',
                background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)',
                padding: '3px 9px', borderRadius: 6, cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C4B5FD'; el.style.borderColor = 'rgba(139,92,246,0.4)'; el.style.background = 'rgba(139,92,246,0.12)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(183,176,204,0.6)'; el.style.borderColor = 'rgba(139,92,246,0.15)'; el.style.background = 'rgba(139,92,246,0.06)' }}
              aria-label={`Ask: ${s}`}
            >{s}</button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <form
        onSubmit={e => { e.preventDefault(); send(input) }}
        style={{
          padding: '10px 12px',
          borderTop: '1px solid rgba(139,92,246,0.12)',
          display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
          background: 'rgba(139,92,246,0.03)',
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me something…"
          aria-label="Ask Minac a question"
          style={{
            flex: 1, padding: '8px 12px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(139,92,246,0.2)',
            outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 11,
            color: '#F8F7FF', caretColor: '#8B5CF6',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking}
          aria-label="Send message"
          style={{
            width: 34, height: 34, borderRadius: 10, cursor: input.trim() ? 'pointer' : 'default',
            background: input.trim() ? 'rgba(139,92,246,0.25)' : 'transparent',
            border: `1px solid ${input.trim() ? 'rgba(139,92,246,0.45)' : 'rgba(139,92,246,0.12)'}`,
            color: input.trim() ? '#C4B5FD' : 'rgba(139,92,246,0.3)',
            fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', flexShrink: 0,
          }}
        >↗</button>
      </form>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   MINAC ORB + FLOATING SHELL
   The floating orb in the bottom-right corner.
   Clicking it opens/closes the chat panel.
   Keyboard: Enter/Space to toggle, Escape to close.
═══════════════════════════════════════════════════════ */

// Still exported so App.tsx or any external caller can
// emit hint text that appears as a quick bubble
export type MinacEmotion = 'greeting' | 'idle' | 'exploring' | 'celebrating'

export default function Minac() {
  const [open, setOpen]         = useState(false)
  const [hovered, setHovered]   = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [waypointIdx, setWaypointIdx] = useState(0)
  const orbCtrl  = useAnimation()
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Gentle patrol drift — kept as visual polish, no workspace meaning
  const WAYPOINTS = [
    { x: 0, y:  0  },
    { x: 3, y: -6  },
    { x: -3, y: -4 },
    { x: 5, y:  2  },
    { x: -2, y: -5 },
  ]

  /* Blink loop */
  useEffect(() => {
    const scheduleBlink = (): ReturnType<typeof setTimeout> => {
      const d = 1800 + Math.random() * 3200
      return setTimeout(() => {
        setBlinking(true)
        setTimeout(() => {
          setBlinking(false)
          scheduleRef.current = scheduleBlink()
        }, 110)
      }, d)
    }
    scheduleRef.current = scheduleBlink()
    return () => { if (scheduleRef.current) clearTimeout(scheduleRef.current) }
  }, [])

  /* Patrol */
  useEffect(() => {
    const t = setInterval(() => setWaypointIdx(i => (i + 1) % WAYPOINTS.length), 3200)
    return () => clearInterval(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* Occasional curious tilt */
  useEffect(() => {
    const tilt = async () => {
      await orbCtrl.start({ rotate: 10,  transition: { duration: 0.6, ease: 'easeInOut' } })
      await orbCtrl.start({ rotate: -7,  transition: { duration: 0.8, ease: 'easeInOut' } })
      await orbCtrl.start({ rotate: 0,   transition: { duration: 0.5, ease: 'easeOut'  } })
    }
    const schedule = (): ReturnType<typeof setTimeout> => {
      const d = 7000 + Math.random() * 9000
      return setTimeout(() => { tilt(); schedule() }, d)
    }
    const t = schedule()
    return () => clearTimeout(t)
  }, [orbCtrl])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const toggle = useCallback(() => setOpen(v => !v), [])
  const wp = WAYPOINTS[waypointIdx]

  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12,
      pointerEvents: 'none',
    }}>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <div style={{ pointerEvents: 'auto' }}>
            <MinacPanel onClose={() => setOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Floating orb */}
      <motion.button
        aria-label={open ? 'Close Minac portfolio assistant' : 'Open Minac portfolio assistant'}
        aria-expanded={open}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={orbCtrl}
        style={{
          pointerEvents: 'auto',
          width: 54, height: 54, borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 28%, #C4B5FD 0%, #8B5CF6 30%, #6D28D9 65%, #3B0764 100%)',
          border: 'none', cursor: 'pointer',
          position: 'relative', flexShrink: 0,
          outline: 'none',
        }}
        // Visible focus ring for keyboard navigation
        onFocus={e => { e.currentTarget.style.outline = '2px solid rgba(139,92,246,0.7)'; e.currentTarget.style.outlineOffset = '3px' }}
        onBlur={e => { e.currentTarget.style.outline = 'none' }}
      >
        {/* Patrol drift */}
        <motion.div
          animate={{ x: wp.x, y: wp.y }}
          transition={{ duration: 3.2, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
        />

        {/* Glow */}
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
          animate={hovered || open
            ? { boxShadow: '0 0 36px rgba(139,92,246,0.8), 0 0 72px rgba(236,72,153,0.35)' }
            : { boxShadow: '0 0 20px rgba(139,92,246,0.45), 0 0 40px rgba(139,92,246,0.2)' }}
          transition={{ duration: 0.25 }}
        />

        {/* Pulse ring 1 */}
        <motion.div style={{ position: 'absolute', inset: -7, borderRadius: '50%', border: '1px solid rgba(139,92,246,0.45)', pointerEvents: 'none' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: hovered ? 1.2 : 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Pulse ring 2 */}
        <motion.div style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: '1px solid rgba(236,72,153,0.22)', pointerEvents: 'none' }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: hovered ? 1.4 : 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />

        {/* Rim light */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 26% 22%, rgba(255,255,255,0.28) 0%, transparent 55%)', pointerEvents: 'none' }} />

        {/* Iris */}
        <motion.div
          animate={open ? { width: 22, height: 22 } : hovered ? { width: 20, height: 20 } : { width: 18, height: blinking ? 3 : 18 }}
          transition={{ duration: 0.08 }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22D3EE 0%, #0891B2 50%, rgba(34,211,238,0.3) 100%)',
            boxShadow: blinking ? 'none' : '0 0 12px rgba(34,211,238,0.9)',
          }}
        >
          {!blinking && (
            <>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 9, height: 9, borderRadius: '50%', background: '#0E0B18' }} />
              <div style={{ position: 'absolute', top: '14%', left: '55%', width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.75)' }} />
            </>
          )}
        </motion.div>

        {/* Label */}
        <div style={{
          position: 'absolute', bottom: -22, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 8,
          color: 'rgba(139,92,246,0.55)', letterSpacing: '0.14em',
          whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          minac
        </div>
      </motion.button>
    </div>
  )
}

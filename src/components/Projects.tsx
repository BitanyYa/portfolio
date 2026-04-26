import { SiGithub } from 'react-icons/si'
import { HiExternalLink } from 'react-icons/hi'
import { TechBadge } from './TechIcon'
import smartTaskImg from '../assets/smart-task.png'
import drivehubImg  from '../assets/drivehub.png'
import medilinkImg  from '../assets/medilink.png'
import videoConfImg from '../assets/video-conference.png'

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  liveDemo?: string
  accent: string
  icon: string
  screenshot: string
}

const projects: Project[] = [
  {
    title: 'Smart Task',
    description: 'Full-stack Kanban task board with project management and team collaboration. JWT auth, email invites, real-time notifications, and analytics.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/BitanyYa/smart-task',
    liveDemo: 'https://smart-task-two.vercel.app/',
    accent: '#f97316',
    icon: '📋',
    screenshot: smartTaskImg,
  },
  {
    title: 'Drive Hub',
    description: 'Car rental platform with an integrated lottery system, role-based admin dashboard, and structured payment workflow with audit trail.',
    tech: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
    github: 'https://github.com/HuniyaMusema/Drive-Hub-luck',
    liveDemo: 'https://frontend-production-7c43.up.railway.app/',
    accent: '#7c3aed',
    icon: '🚗',
    screenshot: drivehubImg,
  },
  {
    title: 'MediLink',
    description: 'Healthcare platform connecting pharmacies with real-time medicine availability and efficient data modeling for high-read operations.',
    tech: ['Node.js', 'React', 'MongoDB'],
    github: 'https://github.com/HawiGenene1/Medilink',
    liveDemo: 'https://medilinkpharmacy.vercel.app/',
    accent: '#10b981',
    icon: '💊',
    screenshot: medilinkImg,
  },
  {
    title: 'Video Conference',
    description: 'Real-time video conferencing app built on WebRTC and Socket.io for low-latency peer-to-peer communication with shareable meeting links.',
    tech: ['Node.js', 'Express', 'WebRTC', 'Socket.io', 'Next.js', 'TypeScript'],
    github: 'https://github.com/MeronTekle07/Video-Conference-Web-App',
    accent: '#06b6d4',
    icon: '🎥',
    screenshot: videoConfImg,
  },
]

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className="group relative flex rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.25)',
        minHeight: '180px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${p.accent}45`
        el.style.boxShadow = `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${p.accent}18`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)'
      }}
    >
      {/* Screenshot covers the full card on hover */}
      <img
        src={p.screenshot}
        alt={p.title}
        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'rgba(5,5,8,0.68)' }}
      />

      {/* ── Left panel — always same style, no hover change ── */}
      <div
        className="relative z-10 flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          width: '38%',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: `radial-gradient(ellipse at center, ${p.accent}22 0%, ${p.accent}06 50%, transparent 100%)`,
        }}
      >
        {/* Rings */}
        <div className="absolute w-32 h-32 rounded-full" style={{ border: `1px solid ${p.accent}18` }} />
        <div className="absolute w-20 h-20 rounded-full" style={{ border: `1px solid ${p.accent}28` }} />

        {/* Icon + icon buttons — always visible */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl select-none"
            style={{
              background: `${p.accent}15`,
              border: `1px solid ${p.accent}35`,
              boxShadow: `0 0 28px ${p.accent}20`,
            }}
          >
            {p.icon}
          </div>

          <div className="flex items-center gap-2">
            {p.liveDemo && (
              <a
                href={p.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
                style={{
                  background: `${p.accent}18`,
                  border: `1px solid ${p.accent}35`,
                  color: p.accent,
                }}
                title="Live Demo"
              >
                <HiExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8',
              }}
              title="Source Code"
            >
              <SiGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Right — content always on top ── */}
      <div className="relative z-10 flex flex-col justify-center p-6 gap-3 flex-1">
        <h3 className="font-semibold text-base tracking-tight" style={{ color: '#f8fafc' }}>
          {p.title}
        </h3>
        <p className="text-xs leading-[1.75]" style={{ color: '#475569' }}>
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="glow-divider mb-16" />

        <div className="mb-12">
          <p className="section-label mb-4">Projects</p>
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: '#f8fafc' }}
          >
            Things I've built
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map(p => <ProjectCard key={p.title} p={p} />)}
        </div>
      </div>
    </section>
  )
}

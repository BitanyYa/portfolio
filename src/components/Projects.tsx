import { SiGithub } from 'react-icons/si'
import { HiExternalLink, HiCheckCircle } from 'react-icons/hi'
import { TechBadge } from './TechIcon'
import videoConfImg from '../assets/video-conference.png'
import medilinkImg  from '../assets/medilink.png'
import drivehubImg  from '../assets/drivehub.png'

interface Project {
  title: string
  description: string
  tech: string[]
  features: string[]
  github: string
  liveDemo?: string
  screenshot: string
  accentColor: string
}

const projects: Project[] = [
  {
    title: 'Drive Hub',
    description: 'Full-stack car rental platform with an integrated lottery system. Handles bookings, payments, and scheduled automation with a role-based admin dashboard.',
    tech: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
    features: [
      'Role-based admin dashboard for vehicles, rentals & payments',
      'Automated lottery system with configurable rules',
      'Structured payment workflow with approval and audit trail',
    ],
    github: 'https://github.com/HuniyaMusema/Drive-Hub-luck',
    liveDemo: 'https://frontend-production-7c43.up.railway.app/',
    screenshot: drivehubImg,
    accentColor: '#7c3aed',
  },
  {
    title: 'MediLink',
    description: 'Healthcare platform connecting pharmacies with real-time medicine availability. Focused on efficient data modeling for high-read operations and future expansion.',
    tech: ['Node.js', 'React', 'MongoDB'],
    features: [
      'Flexible schemas for pharmacy inventory tracking',
      'APIs for real-time availability queries',
      'Multi-location scalability with clean API boundaries',
    ],
    github: 'https://github.com/HawiGenene1/Medilink',
    liveDemo: 'https://medilinkpharmacy.vercel.app/',
    screenshot: medilinkImg,
    accentColor: '#10b981',
  },
  {
    title: 'Video Conference',
    description: 'Real-time video conferencing app with dynamic participant management, built on WebRTC and Socket.io for low-latency peer-to-peer communication.',
    tech: ['Node.js', 'Express', 'WebRTC', 'Socket.io', 'Next.js', 'TypeScript'],
    features: [
      'Real-time video/audio via WebRTC peer connections',
      'Signaling server with Socket.io',
      'Shareable meeting links and participant sync',
    ],
    github: 'https://github.com/MeronTekle07/Video-Conference-Web-App',
    screenshot: videoConfImg,
    accentColor: '#06b6d4',
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="card group flex flex-col rounded-xl overflow-hidden transition-all duration-200"
    >
      {/* Screenshot — separate wrapper to avoid border artifacts */}
      <div className="overflow-hidden rounded-t-xl" style={{ height: '192px' }}>
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover object-top"
          style={{ opacity: 0.9 }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-semibold text-base mb-2 tracking-tight" style={{ color: '#f8fafc' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-[1.7]" style={{ color: '#475569' }}>
            {project.description}
          </p>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}
        </div>

        {/* Features */}
        <ul className="space-y-2 mt-auto">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-2.5 text-xs leading-[1.6]" style={{ color: '#475569' }}>
              <HiCheckCircle
                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                style={{ color: project.accentColor }}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div
          className="flex gap-2 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex justify-center items-center gap-2 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors duration-200"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <SiGithub className="w-3.5 h-3.5" />
            Source Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-200"
              style={{
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}35`,
                color: project.accentColor,
              }}
            >
              <HiExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="glow-divider mb-16" />

        <div className="mb-12">
          <p className="section-label mb-6">Projects</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: '#f8fafc' }}
            >
              Things I've built
            </h2>
            <p className="text-sm max-w-xs" style={{ color: '#475569' }}>
              Full-stack projects spanning healthcare, lottery systems, and real-time communication.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  )
}

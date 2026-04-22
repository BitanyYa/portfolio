import {
  SiNodedotjs, SiExpress, SiReact, SiTypescript, SiPostgresql,
  SiMongodb, SiWebrtc, SiLaravel, SiSocketdotio, SiNextdotjs,
  SiHtml5, SiCss, SiJavascript, SiMysql, SiGit, SiPostman, SiFigma,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

export interface TechDef {
  name: string
  icon: React.ReactNode
  color: string
  bg: string
  border: string
}

export const techMap: Record<string, TechDef> = {
  HTML:        { name: 'HTML',        icon: <SiHtml5 />,       color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)'  },
  CSS:         { name: 'CSS',         icon: <SiCss />,         color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
  JavaScript:  { name: 'JavaScript',  icon: <SiJavascript />,  color: '#fde047', bg: 'rgba(253,224,71,0.08)',  border: 'rgba(253,224,71,0.2)'  },
  TypeScript:  { name: 'TypeScript',  icon: <SiTypescript />,  color: '#93c5fd', bg: 'rgba(147,197,253,0.08)', border: 'rgba(147,197,253,0.2)' },
  React:       { name: 'React',       icon: <SiReact />,       color: '#67e8f9', bg: 'rgba(103,232,249,0.08)', border: 'rgba(103,232,249,0.2)' },
  'Next.js':   { name: 'Next.js',     icon: <SiNextdotjs />,   color: '#f3f4f6', bg: 'rgba(243,244,246,0.06)', border: 'rgba(243,244,246,0.15)'},
  'Node.js':   { name: 'Node.js',     icon: <SiNodedotjs />,   color: '#86efac', bg: 'rgba(134,239,172,0.08)', border: 'rgba(134,239,172,0.2)' },
  Express:     { name: 'Express',     icon: <SiExpress />,     color: '#d1d5db', bg: 'rgba(209,213,219,0.06)', border: 'rgba(209,213,219,0.15)'},
  Laravel:     { name: 'Laravel',     icon: <SiLaravel />,     color: '#fca5a5', bg: 'rgba(252,165,165,0.08)', border: 'rgba(252,165,165,0.2)' },
  'REST APIs': { name: 'REST APIs',   icon: <TbApi />,         color: '#f0abfc', bg: 'rgba(240,171,252,0.08)', border: 'rgba(240,171,252,0.2)' },
  WebRTC:      { name: 'WebRTC',      icon: <SiWebrtc />,      color: '#fdba74', bg: 'rgba(253,186,116,0.08)', border: 'rgba(253,186,116,0.2)' },
  'Socket.io': { name: 'Socket.io',   icon: <SiSocketdotio />, color: '#fde68a', bg: 'rgba(253,230,138,0.08)', border: 'rgba(253,230,138,0.2)' },
  MongoDB:     { name: 'MongoDB',     icon: <SiMongodb />,     color: '#6ee7b7', bg: 'rgba(110,231,183,0.08)', border: 'rgba(110,231,183,0.2)' },
  PostgreSQL:  { name: 'PostgreSQL',  icon: <SiPostgresql />,  color: '#7dd3fc', bg: 'rgba(125,211,252,0.08)', border: 'rgba(125,211,252,0.2)' },
  MySQL:       { name: 'MySQL',       icon: <SiMysql />,       color: '#67e8f9', bg: 'rgba(103,232,249,0.08)', border: 'rgba(103,232,249,0.2)' },
  Git:         { name: 'Git',         icon: <SiGit />,         color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)'  },
  Postman:     { name: 'Postman',     icon: <SiPostman />,     color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)'  },
  Figma:       { name: 'Figma',       icon: <SiFigma />,       color: '#f0abfc', bg: 'rgba(240,171,252,0.08)', border: 'rgba(240,171,252,0.2)' },
}

export const skillCategories = [
  { label: 'Frontend', techs: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
  { label: 'Backend',  techs: ['Node.js', 'Express', 'Laravel', 'REST APIs'] },
  { label: 'Database', techs: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { label: 'Tools',    techs: ['Git', 'Postman', 'Figma'] },
]

/* ── TechBadge — inline pill with icon ── */
interface TechBadgeProps {
  name: string
  size?: 'sm' | 'md'
}

export function TechBadge({ name, size = 'sm' }: TechBadgeProps) {
  const tech = techMap[name]
  if (!tech) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/[0.04] text-slate-400">
        {name}
      </span>
    )
  }
  const cls = size === 'sm'
    ? 'px-2.5 py-1 text-xs gap-1.5'
    : 'px-3 py-1.5 text-sm gap-2'
  const iconCls = size === 'sm' ? 'text-[12px]' : 'text-[14px]'

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-all duration-200 ${cls}`}
      style={{ color: tech.color, background: tech.bg, borderColor: tech.border }}
    >
      <span className={iconCls}>{tech.icon}</span>
      {name}
    </span>
  )
}

/* ── SkillPill — horizontal row pill ── */
export function SkillPill({ name }: { name: string }) {
  const tech = techMap[name]
  if (!tech) return null

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:-translate-y-px cursor-default"
      style={{ color: tech.color, background: tech.bg, borderColor: tech.border }}
    >
      <span className="text-[13px] leading-none">{tech.icon}</span>
      {name}
    </span>
  )
}

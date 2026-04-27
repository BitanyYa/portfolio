import {
  SiReact, SiNodedotjs, SiTypescript, SiJavascript,
  SiPostgresql, SiMongodb, SiNextdotjs, SiGit,
  SiExpress, SiTailwindcss, SiFigma, SiGithub,
} from 'react-icons/si'
import { useTheme } from '../context/ThemeContext'

// Tech bubbles floating animation component
interface Bubble {
  icon: React.ReactNode
  color: string
  size: number       // px
  left: number       // vw %
  delay: number      // s
  duration: number   // s
  drift: number      // px horizontal drift
  startY: number     // vh % (100 = bottom, 110 = below screen)
}

const bubbles: Bubble[] = [
  { icon: <SiReact />,       color: '#67e8f9', size: 22, left:  8, delay: 0,    duration: 18, drift:  30, startY: 110 },
  { icon: <SiNodedotjs />,   color: '#86efac', size: 18, left: 18, delay: 3,    duration: 22, drift: -20, startY: 110 },
  { icon: <SiTypescript />,  color: '#93c5fd', size: 20, left: 30, delay: 1.5,  duration: 20, drift:  25, startY: 110 },
  { icon: <SiJavascript />,  color: '#fde047', size: 16, left: 42, delay: 5,    duration: 24, drift: -30, startY: 110 },
  { icon: <SiPostgresql />,  color: '#7dd3fc', size: 18, left: 55, delay: 2,    duration: 19, drift:  20, startY: 110 },
  { icon: <SiMongodb />,     color: '#6ee7b7', size: 20, left: 65, delay: 7,    duration: 21, drift: -25, startY: 110 },
  { icon: <SiNextdotjs />,   color: '#f1f5f9', size: 16, left: 75, delay: 4,    duration: 23, drift:  15, startY: 110 },
  { icon: <SiGit />,         color: '#fb923c', size: 18, left: 85, delay: 1,    duration: 17, drift: -20, startY: 110 },
  { icon: <SiExpress />,     color: '#cbd5e1', size: 14, left: 12, delay: 9,    duration: 25, drift:  22, startY: 110 },
  { icon: <SiTailwindcss />, color: '#67e8f9', size: 16, left: 48, delay: 6,    duration: 20, drift: -18, startY: 110 },
  { icon: <SiFigma />,       color: '#f0abfc', size: 14, left: 92, delay: 11,   duration: 22, drift:  12, startY: 110 },
  { icon: <SiGithub />,      color: '#e2e8f0', size: 16, left: 35, delay: 13,   duration: 19, drift: -22, startY: 110 },
]

export default function TechBubbles() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1, opacity: isDark ? 0.18 : 0.35 }}>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0)      translateX(0)           opacity: 0; }
          5%   { opacity: 1; }
          50%  { transform: translateY(-50vh)  translateX(var(--drift)); }
          95%  { opacity: 0.6; }
          100% { transform: translateY(-115vh) translateX(0);           opacity: 0; }
        }
      `}</style>

      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 flex items-center justify-center rounded-xl"
          style={{
            left: `${b.left}%`,
            width:  b.size + 16,
            height: b.size + 16,
            '--drift': `${b.drift}px`,
            animation: `floatUp ${b.duration}s ease-in-out ${b.delay}s infinite`,
            opacity: 0,
            background: isDark ? `${b.color}12` : `${b.color}20`,
            border: isDark ? `1px solid ${b.color}25` : `1px solid ${b.color}40`,
            backdropFilter: 'blur(2px)',
            fontSize: b.size,
            color: b.color,
            filter: isDark ? `drop-shadow(0 0 4px ${b.color}30)` : `drop-shadow(0 0 6px ${b.color}40)`,
          } as React.CSSProperties}
        >
          {b.icon}
        </div>
      ))}
    </div>
  )
}

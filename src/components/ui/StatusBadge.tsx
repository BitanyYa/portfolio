interface Props {
  label: string
  color?: 'emerald' | 'amber' | 'violet' | 'cyan'
}

const colorMap = {
  emerald: { dot: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', text: '#34d399' },
  amber:   { dot: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  text: '#fbbf24' },
  violet:  { dot: '#7c3aed', bg: 'rgba(124,58,237,0.08)',  border: 'rgba(124,58,237,0.25)',  text: '#a78bfa' },
  cyan:    { dot: '#06b6d4', bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.25)',   text: '#67e8f9' },
}

/**
 * Pulsing status badge — e.g. "Available for opportunities"
 */
export default function StatusBadge({ label, color = 'emerald' }: Props) {
  const c = colorMap[color]
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: c.dot, animation: 'pulse-dot 2s ease-in-out infinite' }}
      />
      {label}
    </span>
  )
}

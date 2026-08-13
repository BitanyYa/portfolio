interface Props {
  title?: string
  children: React.ReactNode
  className?: string
  accentBorder?: boolean
}

/**
 * macOS-style window chrome wrapper.
 * Uses CSS variables so it works in both dark (midnight) and light modes.
 */
export default function WindowChrome({ title, children, className = '', accentBorder = false }: Props) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: 'var(--lab-elevated)',
        border: `1px solid ${accentBorder ? 'rgba(139,92,246,0.35)' : 'var(--lab-line)'}`,
        boxShadow: accentBorder
          ? '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.12) inset'
          : '0 16px 48px rgba(0,0,0,0.35)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          borderBottom: '1px solid var(--lab-line)',
          background: 'var(--lab-surface)',
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#febc2e' }} />
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#28c840' }} />
        {title && (
          <span
            className="ml-2 truncate"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}
          >
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

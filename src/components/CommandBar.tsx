import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCommandBarShortcut } from '../hooks/useCommandBar'

interface Command {
  id: string; label: string; description: string; shortcut?: string
  action: () => void; group: 'navigate' | 'action'
}

const NAV_COMMANDS: Omit<Command, 'action'>[] = [
  { id: 'landing',    label: '→ Landing',    description: 'Identity & intro',          group: 'navigate' },
  { id: 'projects',   label: '→ Work',       description: 'Selected projects',         group: 'navigate' },
  { id: 'experience', label: '→ Experience', description: 'Timeline & background',     group: 'navigate' },
  { id: 'lab',        label: '→ The Lab',    description: 'Stack & tools',             group: 'navigate' },
  { id: 'contact',    label: '→ Contact',    description: 'Open a channel',            group: 'navigate' },
]
const ACTION_COMMANDS: Omit<Command, 'action'>[] = [
  { id: 'resume',   label: '↓ Download Resume', description: 'PDF — latest version', shortcut: '⌘R', group: 'action' },
  { id: 'github',   label: '⎋ Open GitHub',     description: 'github.com/BitanyYa',               group: 'action' },
  { id: 'linkedin', label: '⎋ Open LinkedIn',   description: 'View profile',                      group: 'action' },
  { id: 'email',    label: '✉ Send Email',      description: 'bethanywondimagegn@gmail.com',      group: 'action' },
]

interface Props { open: boolean; onClose: () => void }

export default function CommandBar({ open, onClose }: Props) {
  const [query, setQuery]           = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useCommandBarShortcut(onClose)

  const allCommands: Command[] = [
    ...NAV_COMMANDS.map(c => ({
      ...c,
      action: () => {
        document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        onClose()
      },
    })),
    ...ACTION_COMMANDS.map(c => ({
      ...c,
      action: () => {
        if (c.id === 'resume')   { window.open('/resume.pdf'); onClose(); return }
        if (c.id === 'github')   { window.open('https://github.com/BitanyYa', '_blank'); onClose(); return }
        if (c.id === 'linkedin') { window.open('https://linkedin.com/in/bitanya-wondimagegn-05365a392', '_blank'); onClose(); return }
        if (c.id === 'email')    { window.location.href = 'mailto:bethanywondimagegn@gmail.com'; onClose(); return }
      },
    })),
  ]

  const filtered = query.trim()
    ? allCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()))
    : allCommands

  useEffect(() => setHighlighted(0), [query])
  useEffect(() => {
    if (open) { setQuery(''); setHighlighted(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)) }
    if (e.key === 'Enter')     { e.preventDefault(); filtered[highlighted]?.action() }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="cmd-panel"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(139,92,246,0.12)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="4.5" stroke="#6B6485" strokeWidth="1.5"/>
                <path d="M9.5 9.5l2.5 2.5" stroke="#6B6485" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Navigate or search commands…"
                className="flex-1 bg-transparent outline-none"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', caretColor: '#8B5CF6' }}
                spellCheck={false}
                autoComplete="off"
              />
              <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px', borderRadius: 6, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)', color: '#6B6485' }}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="overflow-y-auto" style={{ maxHeight: 360 }}>
              {filtered.length === 0 ? (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3D3558', padding: '32px 16px', textAlign: 'center' }}>
                  No commands match "{query}"
                </p>
              ) : (
                <>
                  {(['navigate', 'action'] as const).map(group => {
                    const groupItems = filtered.filter(c => c.group === group)
                    if (!groupItems.length) return null
                    return (
                      <div key={group}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3D3558', padding: '10px 16px 4px' }}>
                          {group}
                        </p>
                        {groupItems.map(cmd => {
                          const globalIdx = filtered.indexOf(cmd)
                          const active = globalIdx === highlighted
                          return (
                            <button
                              key={cmd.id}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-all duration-100"
                              style={{
                                background: active ? 'rgba(139,92,246,0.12)' : 'transparent',
                                borderLeft: active ? '2px solid #8B5CF6' : '2px solid transparent',
                              }}
                              onMouseEnter={() => setHighlighted(globalIdx)}
                              onClick={cmd.action}
                            >
                              <div>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: active ? '#C4B5FD' : '#B7B0CC', fontWeight: active ? 600 : 400 }}>
                                  {cmd.label}
                                </p>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3D3558', marginTop: 1 }}>
                                  {cmd.description}
                                </p>
                              </div>
                              {cmd.shortcut && (
                                <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px', borderRadius: 6, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)', color: '#6B6485', flexShrink: 0 }}>
                                  {cmd.shortcut}
                                </kbd>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2.5" style={{ borderTop: '1px solid rgba(139,92,246,0.1)', background: 'rgba(14,11,24,0.3)' }}>
              {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([key, hint]) => (
                <span key={key} className="flex items-center gap-1.5">
                  <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px', borderRadius: 6, background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)', color: '#6B6485' }}>
                    {key}
                  </kbd>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>{hint}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

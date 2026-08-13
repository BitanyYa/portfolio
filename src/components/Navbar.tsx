import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'

const SECTIONS = [
  { id: 'landing',    label: 'init',       mono: '00' },
  { id: 'projects',   label: 'work',       mono: '01' },
  { id: 'experience', label: 'experience', mono: '02' },
  { id: 'lab',        label: 'lab',        mono: '03' },
  { id: 'contact',    label: 'contact',    mono: '04' },
]

interface Props {
  activeSection: string
  onOpenCommandBar: () => void
}

export default function Navbar({ activeSection, onOpenCommandBar }: Props) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme }      = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const activeMono  = SECTIONS.find(s => s.id === activeSection)?.mono  ?? '00'
  const activeLabel = SECTIONS.find(s => s.id === activeSection)?.label ?? 'init'

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: theme === 'dark'
            ? 'rgba(19,17,28,0.88)'
            : 'rgba(245,243,255,0.9)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          borderBottom: '1px solid rgba(139,92,246,0.14)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
        } : {}}
      >
        <nav className="lab-container h-14 flex items-center justify-between gap-6">

          {/* Logo */}
          <button
            onClick={() => scrollTo('landing')}
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="Back to top"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                boxShadow: '0 0 16px rgba(139,92,246,0.5)',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)',
              }} />
              B
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}>
              bitanya<span style={{ color: '#8B5CF6' }}>.lab</span>
            </span>
          </button>

          {/* Active section indicator */}
          <div className="hidden lg:flex items-center gap-1.5" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            <span style={{ color: '#3D3558' }}>~/</span>
            <motion.span key={activeSection + '-mono'} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#8B5CF6' }}>
              {activeMono}
            </motion.span>
            <span style={{ color: '#3D3558' }}>·</span>
            <motion.span key={activeSection + '-label'} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#6B6485' }}>
              {activeLabel}
            </motion.span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* ⌘K */}
            <button
              onClick={onOpenCommandBar}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: '#6B6485',
                background: 'rgba(139,92,246,0.07)',
                border: '1px solid rgba(139,92,246,0.15)',
              }}
              aria-label="Open command bar (Ctrl+K)"
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(139,92,246,0.35)'
                el.style.color = '#B7B0CC'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(139,92,246,0.15)'
                el.style.color = '#6B6485'
              }}
            >
              <span style={{ color: '#8B5CF6' }}>⌘K</span>
              <span>navigate</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(139,92,246,0.07)',
                border: '1px solid rgba(139,92,246,0.15)',
                color: '#6B6485',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.35)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.15)' }}
            >
              {theme === 'dark' ? <HiSun className="w-3.5 h-3.5" /> : <HiMoon className="w-3.5 h-3.5" />}
            </button>

            {/* Resume */}
            <a
              href="/resume.pdf"
              download="Bitanya_Wondimagegn_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))',
                border: '1px solid rgba(139,92,246,0.25)',
                color: '#A78BFA',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.25)' }}
            >
              resume.pdf
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 1v6M2.5 4.5 5 7l2.5-2.5M1 8.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`w-5 h-px transition-all duration-200 origin-center ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} style={{ background: '#6B6485' }} />
              <span className={`w-5 h-px transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: '#6B6485' }} />
              <span className={`w-5 h-px transition-all duration-200 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} style={{ background: '#6B6485' }} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
              style={{
                background: 'rgba(19,17,28,0.97)',
                backdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(139,92,246,0.14)',
              }}
            >
              <ul className="lab-container py-4 flex flex-col gap-1">
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150"
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: activeSection === s.id ? '#A78BFA' : '#6B6485',
                        background: activeSection === s.id ? 'rgba(139,92,246,0.1)' : 'transparent',
                        border: activeSection === s.id ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
                      }}
                    >
                      <span style={{ color: '#8B5CF6', opacity: 0.5 }}>{s.mono}</span>
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

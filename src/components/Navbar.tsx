import { useState, useEffect } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrolledBg = theme === 'light'
    ? 'rgba(212,216,225,0.92)'
    : 'rgba(5,5,8,0.88)'

  const scrolledBorder = theme === 'light'
    ? '1px solid rgba(0,0,0,0.12)'
    : '1px solid rgba(255,255,255,0.07)'

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: scrolledBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolledBorder,
      } : {}}
    >
      <nav className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-bold text-base tracking-tight transition-colors duration-200"
          style={{ color: 'var(--text-primary)' }}
        >
          BW<span style={{ color: '#7c3aed' }}>.</span>
        </a>

        {/* Desktop — center links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop — theme toggle + resume button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-px"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {theme === 'dark'
              ? <HiSun className="w-4 h-4" />
              : <HiMoon className="w-4 h-4" />
            }
          </button>

          <a
            href="/resume.pdf"
            download="Bitanya_Wondimagegn_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
            style={{
              background: theme === 'dark' ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.12)',
              border: theme === 'dark' ? '1px solid rgba(124,58,237,0.35)' : '1px solid rgba(124,58,237,0.5)',
              color: theme === 'dark' ? '#c4b5fd' : '#7c3aed',
            }}
          >
            Resume
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v7M3 5l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`w-5 h-px bg-slate-400 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`w-5 h-px bg-slate-400 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-slate-400 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-72' : 'max-h-0'}`}
        style={{
          background: theme === 'light' ? 'rgba(212,216,225,0.97)' : 'rgba(5,5,8,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: open ? '1px solid var(--border)' : 'none',
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              {theme === 'dark'
                ? <><HiSun className="w-4 h-4" /> Light mode</>
                : <><HiMoon className="w-4 h-4" /> Dark mode</>
              }
            </button>
          </li>
          <li>
            <a
              href="/resume.pdf"
              download="Bitanya_Wondimagegn_Resume.pdf"
              className="block text-center px-3 py-2.5 rounded-lg text-sm font-semibold"
              style={{ 
                background: theme === 'dark' ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.12)', 
                border: theme === 'dark' ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(124,58,237,0.5)', 
                color: theme === 'dark' ? '#c4b5fd' : '#7c3aed' 
              }}
              onClick={() => setOpen(false)}
            >
              Resume ↓
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

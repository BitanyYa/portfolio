import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { HiMail, HiArrowRight } from 'react-icons/hi'

const contacts = [
  {
    label: 'Email',
    href: 'mailto:bethanywondimagegn@gmail.com',
    icon: <HiMail className="w-5 h-5" />,
    accent: '#a78bfa',
    accentAlpha: 'rgba(167,139,250,',
    external: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/BitanyYa',
    icon: <SiGithub className="w-5 h-5" />,
    accent: '#64748b',
    accentAlpha: 'rgba(100,116,139,',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bitanya-wondimagegn-05365a392',
    icon: <FaLinkedinIn className="w-5 h-5" />,
    accent: '#60a5fa',
    accentAlpha: 'rgba(96,165,250,',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="glow-divider mb-16" />

        <div className="text-center mb-14">
          <p className="section-label mb-5 justify-center">Contact</p>
          <h2
            className="font-semibold tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Let's work together
          </h2>
          <p className="text-[15px] leading-[1.7] max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Open to full-time roles, freelance projects, and interesting collaborations. I'll get back to you promptly.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
          {contacts.map(c => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center gap-4 p-6 rounded-xl text-center transition-all duration-200 hover:-translate-y-1"
              style={{
                background: 'var(--bg-card)',
                border: '2px solid var(--border)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `${c.accentAlpha}0.5)`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: `${c.accentAlpha}0.1)`,
                  border: `1px solid ${c.accentAlpha}0.2)`,
                  color: c.accent,
                }}
              >
                {c.icon}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {c.label}
              </span>
            </a>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="mailto:bethanywondimagegn@gmail.com"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
            }}
          >
            <HiMail className="w-4 h-4" />
            Send an email
            <HiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

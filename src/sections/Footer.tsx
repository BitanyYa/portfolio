import { motion } from 'framer-motion'

const quickLinks = [
  { label: 'workspace',  href: '#workspace'  },
  { label: 'projects',   href: '#projects'   },
  { label: 'experience', href: '#experience' },
  { label: 'contact',    href: '#contact'    },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--lab-void)', borderTop: '1px solid rgba(139,92,246,0.12)' }}>
      {/* Subtle top glow */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(236,72,153,0.3), transparent)' }} />

      <div className="lab-container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Identity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, boxShadow: '0 0 16px rgba(139,92,246,0.4)', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 60%)' }} />
                B
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                bitanya<span style={{ color: '#8B5CF6' }}>.lab</span>
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3D3558', maxWidth: 280, lineHeight: 1.6 }}>
              Designed & engineered by Bitanya Wondimagegn.<br />
              Built with React, TypeScript, and attention to detail.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {quickLinks.map((link, i) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3D3558', textDecoration: 'none', letterSpacing: '0.06em' }}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ color: '#8B5CF6' }}
                  >
                    ./{link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="lab-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>
          © {year} Bitanya Wondimagegn. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>Available for opportunities</span>
        </div>
      </div>
    </footer>
  )
}

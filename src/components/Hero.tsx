import { SiGithub } from 'react-icons/si'
import { HiArrowRight } from 'react-icons/hi'

const codeLines = [
  { ln: '1',  tokens: [{ t: 'keyword', v: 'const' }, { t: 'text', v: ' ' }, { t: 'var', v: 'developer' }, { t: 'text', v: ' = ' }, { t: 'bracket', v: '{' }] },
  { ln: '2',  tokens: [{ t: 'text', v: '  ' }, { t: 'key', v: 'name' }, { t: 'text', v: ': ' }, { t: 'string', v: '"Bitanya Wondimagegn"' }, { t: 'text', v: ',' }] },
  { ln: '3',  tokens: [{ t: 'text', v: '  ' }, { t: 'key', v: 'role' }, { t: 'text', v: ': ' }, { t: 'string', v: '"Full-Stack Developer"' }, { t: 'text', v: ',' }] },
  { ln: '4',  tokens: [{ t: 'text', v: '  ' }, { t: 'key', v: 'location' }, { t: 'text', v: ': ' }, { t: 'string', v: '"Addis Ababa, ET"' }, { t: 'text', v: ',' }] },
  { ln: '5',  tokens: [{ t: 'text', v: '  ' }, { t: 'key', v: 'stack' }, { t: 'text', v: ': ' }, { t: 'bracket', v: '[' }, { t: 'string', v: '"React"' }, { t: 'text', v: ', ' }, { t: 'string', v: '"Node.js"' }, { t: 'text', v: ', ' }, { t: 'string', v: '"TypeScript"' }, { t: 'bracket', v: ']' }, { t: 'text', v: ',' }] },
  { ln: '6',  tokens: [{ t: 'text', v: '  ' }, { t: 'key', v: 'available' }, { t: 'text', v: ': ' }, { t: 'bool', v: 'true' }, { t: 'text', v: ',' }] },
  { ln: '7',  tokens: [{ t: 'bracket', v: '}' }] },
]

const colorMap: Record<string, string> = {
  keyword: '#c084fc',
  var:     '#93c5fd',
  string:  '#86efac',
  bool:    '#f97316',
  key:     '#f8fafc',
  bracket: '#94a3b8',
  text:    '#94a3b8',
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Subtle violet radial glow — hero only */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: text ── */}
          <div>
            {/* Available badge */}
            <div className="mb-8 fade-up" style={{ animationDelay: '0ms' }}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide"
                style={{
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  color: '#34d399',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                  style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
                />
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-bold tracking-tight leading-[1.06] text-white mb-4 fade-up"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', animationDelay: '60ms' }}
            >
              Bitanya{' '}
              <span className="gradient-text">Wondimagegn</span>
            </h1>

            {/* Role */}
            <p
              className="text-lg font-medium mb-4 fade-up"
              style={{ color: '#94a3b8', animationDelay: '120ms' }}
            >
              Full-Stack Developer
            </p>

            {/* Tagline */}
            <p
              className="text-[15px] leading-[1.7] max-w-md mb-10 fade-up"
              style={{ color: '#475569', animationDelay: '180ms' }}
            >
              I build full-stack projects and real-time web applications — from scalable backends to polished user interfaces.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-3 fade-up"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
                }}
              >
                View Projects
                <HiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/BitanyYa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-all duration-200 hover:-translate-y-px"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <SiGithub className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* ── Right: terminal code block ── */}
          <div
            className="hidden lg:block fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: '#0d0d14',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0a10' }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <span className="ml-3 text-[11px] font-medium" style={{ color: '#475569' }}>developer.ts</span>
              </div>

              {/* Code */}
              <div className="px-5 py-5 font-mono text-[13px] leading-[1.8]">
                {codeLines.map(line => (
                  <div key={line.ln} className="flex gap-4">
                    <span className="select-none w-4 text-right flex-shrink-0" style={{ color: '#334155' }}>
                      {line.ln}
                    </span>
                    <span>
                      {line.tokens.map((tok, i) => (
                        <span key={i} style={{ color: colorMap[tok.t] ?? '#94a3b8' }}>
                          {tok.v}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none fade-up"
        style={{ animationDelay: '480ms' }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#334155' }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-700/50 to-transparent" />
      </div>
    </section>
  )
}

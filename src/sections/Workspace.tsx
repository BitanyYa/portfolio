import { motion } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import WindowChrome from '../components/ui/WindowChrome'
import ScrollReveal from '../components/ui/ScrollReveal'
import { StaggerGroup, StaggerItem } from '../components/ui/StaggerGroup'

const FILE_TREE = [
  { indent: 0, type: 'dir',  name: 'bitanya-workspace/' },
  { indent: 1, type: 'dir',  name: 'src/' },
  { indent: 2, type: 'file', name: 'architect.ts',      color: '#93C5FD' },
  { indent: 2, type: 'file', name: 'builder.tsx',       color: '#67E8F9' },
  { indent: 2, type: 'file', name: 'problem-solver.ts', color: '#86EFAC' },
  { indent: 1, type: 'dir',  name: 'systems/' },
  { indent: 2, type: 'file', name: 'backend.ts',        color: '#86EFAC' },
  { indent: 2, type: 'file', name: 'database.ts',       color: '#7DD3FC' },
  { indent: 2, type: 'file', name: 'realtime.ts',       color: '#FDE047' },
  { indent: 1, type: 'file', name: 'README.md',         color: '#7C6FA0' },
]

interface Trait { icon: string; label: string; description: string; accent: string }

const TRAITS: Trait[] = [
  { icon: '⬡', label: 'Systems Thinker',    description: 'Designs with the full stack in mind — from schema to state management to deployment.', accent: '#8B5CF6' },
  { icon: '◈', label: 'Precision Builder',  description: 'Obsesses over the details that separate good software from great software.',             accent: '#EC4899' },
  { icon: '⟳', label: 'Iterative Mindset', description: 'Ships working software early, then refines through feedback and measurement.',           accent: '#22D3EE' },
  { icon: '⚡', label: 'Performance Aware', description: 'Considers latency, bundle size, and data access patterns as first-class concerns.',       accent: '#F59E0B' },
]

export default function Workspace() {
  return (
    <section id="workspace" className="lab-section relative overflow-hidden" style={{ background: 'var(--lab-base)' }}>
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
      {/* Ambient glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '30%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="lab-container relative z-10">
        <ScrollReveal variant="fadeUp">
          <SectionEyebrow>// 01 — workspace</SectionEyebrow>
          <h2 className="lab-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', maxWidth: 560 }}>
            This is where{' '}
            <span className="gradient-text">engineering happens</span>
          </h2>
          <p className="lab-body mt-4 max-w-lg">
            A glimpse into how I approach software the philosophy, the habits, and the craft that drive every decision.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start mt-14">
          {/* Left — IDE panels */}
          <ScrollReveal variant="slideLeft" delay={0.1}>
            <div className="space-y-4">
              <WindowChrome title="explorer — bitanya-workspace">
                <div className="px-4 py-4">
                  {FILE_TREE.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-0.5" style={{ paddingLeft: `${item.indent * 16}px` }}>
                      <span style={{ fontSize: 11, color: item.type === 'dir' ? '#8B5CF6' : '#3D3558' }}>
                        {item.type === 'dir' ? '▾' : '·'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: item.type === 'dir' ? '#6B6485' : item.color }}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </WindowChrome>

              <WindowChrome title="architect.ts" accentBorder>
                <div className="px-5 py-4" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8 }}>
                  <p><span className="code-comment">// Engineering philosophy</span></p>
                  <p><span className="code-keyword">const</span> <span className="code-var">philosophy</span> <span style={{ color: '#4B4468' }}>=</span> {'{'}</p>
                  <p>&nbsp;&nbsp;<span className="code-key">clarity</span>: <span className="code-string">"write code for humans first"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="code-key">simplicity</span>: <span className="code-string">"complexity is a cost"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="code-key">ownership</span>: <span className="code-string">"ship it, own it, improve it"</span>,</p>
                  <p>{'}'}</p>
                </div>
              </WindowChrome>
            </div>
          </ScrollReveal>

          {/* Right — Trait cards */}
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4" childVariant="scale">
            {TRAITS.map(trait => (
              <StaggerItem key={trait.label}>
                <motion.div
                  className="lab-card p-5 cursor-default h-full"
                  style={{ borderRadius: 14 }}
                  whileHover={{
                    borderColor: `${trait.accent}50`,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${trait.accent}20`,
                    y: -4,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-4" style={{ background: `${trait.accent}12`, border: `1px solid ${trait.accent}30`, color: trait.accent }}>
                    {trait.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{trait.label}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-muted)' }}>{trait.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

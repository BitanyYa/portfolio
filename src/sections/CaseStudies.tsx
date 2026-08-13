import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import ScrollReveal from '../components/ui/ScrollReveal'
import { PROJECTS, type ProjectDef } from './Projects'

interface CaseStudy {
  projectId: string; challenge: string; approach: string; outcome: string
  keyDecision: string; metrics?: { label: string; value: string }[]
}

const CASE_STUDIES: CaseStudy[] = [
  { projectId: 'smart-task', challenge: 'Building a real-time collaborative task board that stays consistent across concurrent users without conflicts.', approach: 'Designed an event-driven backend with MongoDB change streams, JWT-secured WebSocket channels, and optimistic UI updates on the client.', outcome: 'Delivered a fully functional team workspace with sub-100ms notification delivery and conflict-free task state.', keyDecision: 'Chose MongoDB over a relational DB to allow flexible schema evolution as feature requirements changed during development.', metrics: [{ label: 'Notification latency', value: '<100ms' }, { label: 'Concurrent users tested', value: '50+' }, { label: 'Features shipped', value: '12' }] },
  { projectId: 'drive-hub',  challenge: 'Designing a lottery-based car rental system with fair randomness, full audit trail, and role-gated admin controls.', approach: 'Implemented a seeded random draw algorithm server-side, logged every state transition to a PostgreSQL audit table, and built a granular RBAC system.', outcome: 'A transparent, auditable rental workflow that stakeholders could trust and admins could manage without developer intervention.', keyDecision: 'Moved the lottery logic fully server-side to prevent client manipulation, even though it added latency.', metrics: [{ label: 'Audit events captured', value: '100%' }, { label: 'Admin roles defined', value: '4' }, { label: 'DB tables', value: '11' }] },
  { projectId: 'medilink',   challenge: 'Creating a high-read pharmacy lookup platform that returns medicine availability across multiple locations fast.', approach: 'Structured MongoDB indexes for compound queries, implemented a lightweight caching layer, and paginated all listing endpoints.', outcome: 'Sub-50ms average query time for pharmacy lookups under simulated concurrent load.', keyDecision: 'Denormalized pharmacy-medicine relationships to trade write complexity for dramatically faster reads.' },
  { projectId: 'video-conference', challenge: 'Building low-latency peer-to-peer video communication without a third-party media server.', approach: 'Used WebRTC with a STUN/TURN relay fallback, Socket.io for signaling, and Next.js for the frontend to handle SSR of meeting link metadata.', outcome: 'A working conferencing app with screen share, mute controls, and a sharable room URL system.', keyDecision: 'Selected WebRTC over a managed video SDK to gain hands-on experience with the underlying protocol stack.' },
]

function CaseCard({ cs, project, isOpen, onToggle }: { cs: CaseStudy; project: ProjectDef; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="lab-card overflow-hidden"
      style={{ borderRadius: 18, borderColor: isOpen ? `${project.accent}30` : 'var(--border)' }}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}30`, color: project.accent, fontSize: 18 }}>
            ◈
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: project.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Case Study</p>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.title}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{project.tagline}</p>
          </div>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ color: '#4B4468', fontSize: 13, flexShrink: 0 }}>▾</motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 grid md:grid-cols-3 gap-6" style={{ borderTop: '1px solid rgba(139,92,246,0.12)' }}>
              {[
                { label: 'Challenge', text: cs.challenge, icon: '⊘', color: '#EF4444' },
                { label: 'Approach',  text: cs.approach,  icon: '⊕', color: '#8B5CF6' },
                { label: 'Outcome',   text: cs.outcome,   icon: '⊛', color: '#10B981' },
              ].map(col => (
                <div key={col.label} className="pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: col.color, fontSize: 14 }}>{col.icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: col.color }}>{col.label}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)' }}>{col.text}</p>
                </div>
              ))}

              <div className="md:col-span-3 rounded-xl p-4 mt-2" style={{ background: `${project.accent}08`, border: `1px solid ${project.accent}20` }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: project.accent, marginBottom: 8 }}>Key Decision</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{cs.keyDecision}</p>
              </div>

              {cs.metrics && (
                <div className="md:col-span-3 flex flex-wrap gap-4 mt-1">
                  {cs.metrics.map(m => (
                    <div key={m.label} className="flex flex-col gap-0.5 px-4 py-3 rounded-xl" style={{ background: 'var(--lab-elevated)', border: '1px solid rgba(139,92,246,0.12)' }}>
                      <span style={{ fontWeight: 700, color: project.accent, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{m.value}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4B4468' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="cases" className="lab-section relative overflow-hidden" style={{ background: 'var(--lab-base)' }}>
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="lab-container relative z-10">
        <ScrollReveal variant="blur">
          <SectionEyebrow>// 03 — case studies</SectionEyebrow>
          <h2 className="lab-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            The engineering <span className="gradient-text">story behind</span> the code
          </h2>
          <p className="lab-body mt-4 max-w-lg">
            What was the problem? What tradeoffs were made? What was shipped? The context a GitHub repo can't tell you.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-4 mt-14">
          {CASE_STUDIES.map(cs => {
            const project = PROJECTS.find((p: ProjectDef) => p.id === cs.projectId)!
            return (
              <CaseCard key={cs.projectId} cs={cs} project={project}
                isOpen={openId === cs.projectId}
                onToggle={() => setOpenId(id => id === cs.projectId ? null : cs.projectId)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

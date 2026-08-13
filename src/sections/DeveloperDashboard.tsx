import { motion } from 'framer-motion'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import WindowChrome from '../components/ui/WindowChrome'
import ScrollReveal from '../components/ui/ScrollReveal'
import { StaggerGroup, StaggerItem } from '../components/ui/StaggerGroup'

const METRICS = [
  { label: 'Projects Shipped',     value: '4',    sub: 'production builds',  accent: '#8B5CF6', icon: '⬡' },
  { label: 'Technologies',         value: '12+',  sub: 'across full stack',  accent: '#22D3EE', icon: '◈' },
  { label: 'GitHub Contributions', value: '200+', sub: 'commits & PRs',      accent: '#10B981', icon: '⟳' },
  { label: 'Lines of Code',        value: '50K+', sub: 'written & reviewed', accent: '#F59E0B', icon: '⚡' },
]

const ACTIVITY = [
  { type: 'commit',  message: 'feat: implement real-time notifications', repo: 'smart-task',        time: '2h ago',  color: '#8B5CF6' },
  { type: 'deploy',  message: 'deploy: production build to vercel',      repo: 'smart-task',        time: '3h ago',  color: '#10B981' },
  { type: 'commit',  message: 'fix: resolve race condition in WebSocket', repo: 'video-conference',  time: '1d ago',  color: '#8B5CF6' },
  { type: 'feature', message: 'feat: lottery draw + audit log',           repo: 'drive-hub',         time: '3d ago',  color: '#22D3EE' },
  { type: 'commit',  message: 'perf: add compound indexes for lookups',   repo: 'medilink',          time: '1w ago',  color: '#F59E0B' },
  { type: 'review',  message: 'review: merge RBAC branch → main',         repo: 'drive-hub',         time: '1w ago',  color: '#7C6FA0' },
]

const TYPE_ICONS: Record<string, string> = { commit: '○', deploy: '▲', review: '◇', feature: '★' }

const STACK_USAGE = [
  { name: 'TypeScript', pct: 45, color: '#93C5FD' },
  { name: 'JavaScript', pct: 25, color: '#FDE047' },
  { name: 'CSS',        pct: 15, color: '#60A5FA' },
  { name: 'HTML',       pct: 10, color: '#FB923C' },
  { name: 'Other',      pct:  5, color: '#4B4468' },
]

const WEEKS = 26
const HEATMAP = Array.from({ length: WEEKS }, () =>
  Array.from({ length: 7 }, () => Math.random()),
)

export default function DeveloperDashboard() {
  return (
    <section id="dashboard" className="lab-section relative overflow-hidden" style={{ background: 'var(--lab-surface)' }}>
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '5%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="lab-container relative z-10">
        <ScrollReveal variant="fadeUp">
          <SectionEyebrow>// 06 — developer dashboard</SectionEyebrow>
          <h2 className="lab-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Engineering activity <span className="gradient-text-vc">at a glance</span>
          </h2>
          <p className="lab-body mt-4 max-w-lg">
            A dev-first view of what I've been building — metrics, activity, and stack usage the way a dashboard should look.
          </p>
        </ScrollReveal>

        {/* Metric cards */}
        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 mb-6" childVariant="scale">
          {METRICS.map(m => (
            <StaggerItem key={m.label}>
              <motion.div
                className="lab-card px-5 py-5 cursor-default h-full"
                style={{ borderRadius: 14 }}
                whileHover={{ borderColor: `${m.accent}40`, y: -3, boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${m.accent}10` }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-4"
                  style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}25`, color: m.accent }}>
                  {m.icon}
                </div>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, color: m.accent, letterSpacing: '-0.03em', marginBottom: 2 }}>{m.value}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.label}</p>
                {m.sub && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558', marginTop: 2 }}>{m.sub}</p>}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Activity + Stack */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <ScrollReveal variant="slideLeft" delay={0.1} className="lg:col-span-2">
            <WindowChrome title="activity.log — recent commits">
              <div className="divide-y" style={{ borderColor: 'rgba(139,92,246,0.08)' }}>
                {ACTIVITY.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 px-4 py-3">
                    <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, color: item.color }}>
                      {TYPE_ICONS[item.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#B7B0CC' }}>{item.message}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558', marginTop: 2 }}>
                        <span style={{ color: item.color }}>{item.repo}</span>{' · '}{item.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </WindowChrome>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.15}>
            <WindowChrome title="languages.json">
              <div className="px-5 py-5 space-y-4">
                {STACK_USAGE.map((lang, i) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B6485' }}>{lang.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>{lang.pct}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 4, background: 'rgba(139,92,246,0.08)', overflow: 'hidden' }}>
                      <motion.div style={{ height: '100%', borderRadius: 4, background: lang.color }}
                        initial={{ width: 0 }} whileInView={{ width: `${lang.pct}%` }} viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }} />
                    </div>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </ScrollReveal>
        </div>

        {/* Heatmap */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <WindowChrome title="contributions — last 6 months">
            <div className="px-5 py-5 overflow-x-auto">
              <div className="flex gap-1">
                {HEATMAP.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => {
                      const a = day < 0.1 ? 0.05 : day < 0.3 ? 0.18 : day < 0.6 ? 0.4 : day < 0.85 ? 0.65 : 0.9
                      return <div key={di} style={{ width: 12, height: 12, borderRadius: 3, background: `rgba(139,92,246,${a})` }} />
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>Less</span>
                {[0.05, 0.18, 0.4, 0.65, 0.9].map((a, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: `rgba(139,92,246,${a})` }} />
                ))}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#3D3558' }}>More</span>
              </div>
            </div>
          </WindowChrome>
        </ScrollReveal>
      </div>
    </section>
  )
}

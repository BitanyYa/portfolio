import { SkillPill, skillCategories } from './TechIcon'

const stats = [
  { value: '3+',  label: 'Projects shipped' },
  { value: '11+', label: 'Technologies' },
  { value: '1',   label: 'Internship' },
]

const experience = {
  role: 'Web-Development Intern',
  org: 'Addis Ababa, Ethiopia',
  period: 'Jul – Aug 2025',
  points: [
    'Developed core screens and functional flows for a Video Conference Web Application',
    'Managed persistent data using PostgreSQL',
    'Assisted with debugging, testing, and improving application performance',
    'Collaborated with the team using Git and standard workflows',
  ],
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-[1100px] mx-auto space-y-24">

        {/* ── Bio + Stats ── */}
        <div>
          <p className="section-label mb-8">About</p>
          <div className="grid md:grid-cols-5 gap-12 items-start">

            {/* Bio */}
            <div className="md:col-span-3 space-y-5">
              <h2
                className="font-semibold leading-snug tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: 'var(--text-primary)' }}
              >
                CS graduate building<br />full-stack web applications
              </h2>
              <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
                I'm a Computer Science graduate with hands-on experience building Web, Mobile, and Full-Stack applications. Skilled in creating responsive interfaces, implementing core features, and working with databases.
              </p>
              <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                Interested in Frontend and Full-Stack roles where I can contribute to real projects and grow as a developer.
              </p>
            </div>

            {/* Stats */}
            <div className="md:col-span-2 flex flex-col gap-3">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="card rounded-xl px-5 py-4 flex items-center gap-4"
                >
                  <span className="text-2xl font-bold" style={{ color: '#a78bfa' }}>
                    {s.value}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Experience ── */}
        <div>
          <p className="section-label mb-8">Background</p>
          <div
            className="rounded-xl p-6"
            style={{
              background: 'rgba(124,58,237,0.04)',
              border: '1px solid rgba(124,58,237,0.12)',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2"
                  style={{ color: '#7c3aed' }}
                >
                  Experience
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{experience.role}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{experience.org}</p>
              </div>
              <span
                className="flex-shrink-0 text-[11px] font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  color: '#a78bfa',
                }}
              >
                {experience.period}
              </span>
            </div>
            <ul className="space-y-2.5">
              {experience.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                  <span className="mt-2.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(124,58,237,0.5)' }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Skills ── */}
        <div id="skills">
          <p className="section-label mb-8">Skills &amp; Tools</p>
          <div className="space-y-6">
            {skillCategories.map(cat => (
              <div key={cat.label}>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map(tech => (
                    <SkillPill key={tech} name={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

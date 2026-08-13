import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useActiveSection } from './hooks/useActiveSection'

/* ── Lab chrome ── */
import Navbar        from './components/Navbar'
import CommandBar    from './components/CommandBar'
import AmbientCanvas from './components/lab/AmbientCanvas'
import Minac         from './components/lab/Minac'

/* ── Sections ── */
import LandingExperience from './sections/LandingExperience'
import Projects          from './sections/Projects'
import Experience        from './sections/Experience'
import TheLabSection     from './sections/TheLabSection'
import Contact           from './sections/Contact'
import Footer            from './sections/Footer'

/* ── Shared UI ── */
import LabDivider from './components/ui/LabDivider'

/*
  Section IDs — new portfolio structure:
    00  landing
    01  projects   (Selected Work)
    02  experience
    03  lab        (The Lab / Technology Lab)
    04  contact

  Workspace, CaseStudies, and DeveloperDashboard are
  preserved in their own files but removed from the main flow.
*/
const SECTION_IDS = [
  'landing',
  'projects',
  'experience',
  'lab',
  'contact',
]

function AppInner() {
  const { theme }   = useTheme()
  const [cmdOpen, setCmdOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'light') html.classList.add('light')
    else html.classList.remove('light')
  }, [theme])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>

      {/* Global ambient background */}
      <AmbientCanvas />

      {/* Fixed chrome */}
      <Navbar activeSection={activeSection} onOpenCommandBar={() => setCmdOpen(o => !o)} />
      <CommandBar open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Minac floating companion */}
      <Minac />

      <main style={{ position: 'relative', zIndex: 1 }}>

        <LandingExperience onOpen={() => setCmdOpen(true)} />
        <LabDivider />

        <Projects />
        <LabDivider />

        <Experience />
        <LabDivider />

        <TheLabSection />
        <LabDivider />

        <Contact />

      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

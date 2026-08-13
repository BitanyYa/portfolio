import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface DeskItemData {
  id: string
  title: string
  subtitle: string
  icon: string
  description: string
  stats: { label: string; value: string }[]
  codeSnippet?: string
  actionLabel?: string
  minacReaction?: string
}

export const DESK_ITEMS: Record<string, DeskItemData> = {
  monitors: {
    id: 'monitors',
    title: 'Dual 4K Workstation Displays',
    subtitle: 'VS Code & System Architecture',
    icon: '🖥️',
    description: 'Primary engineering workspace displaying real-time code editor, integrated terminal, and microservices architecture flow.',
    stats: [
      { label: 'Resolution', value: '3840 x 2160 @ 144Hz' },
      { label: 'Color Space', value: '100% DCI-P3 Calibrated' },
      { label: 'Active IDE', value: 'VS Code Dark Studio' },
    ],
    codeSnippet: `const system = new EngineeringWorkspace({\n  monitors: 2,\n  theme: 'dark-plum-studio',\n  architecture: ['Frontend', 'API', 'DB']\n});`,
    actionLabel: 'Trigger IDE Linting ⚡',
    minacReaction: 'Code linter ran! 0 errors, 0 warnings. Beautiful clean code ✨',
  },
  laptop: {
    id: 'laptop',
    title: 'Developer Laptop',
    subtitle: 'Mobile Workstation & Hot Reload',
    icon: '💻',
    description: 'High-performance M-series developer machine running local Vite dev server and microservice Docker containers.',
    stats: [
      { label: 'Processor', value: 'Apple Silicon M-Series' },
      { label: 'Dev Server', value: 'Vite HMR Active' },
      { label: 'Build Time', value: '1.1s Production' },
    ],
    codeSnippet: `npm run dev -- --host 0.0.0.0`,
    actionLabel: 'Run Dev Server 🚀',
    minacReaction: 'Vite dev server restarted in 320ms! Hot module replacement ready 🔥',
  },
  keyboard: {
    id: 'keyboard',
    title: 'Custom Mechanical Keyboard',
    subtitle: 'Gateron Switches & PBT Keycaps',
    icon: '⌨️',
    description: 'Precision mechanical keyboard tuned for high-velocity software engineering, typing ergonomics, and quiet tactile feedback.',
    stats: [
      { label: 'Switch Type', value: 'Lubed Linear Switches' },
      { label: 'Keycaps', value: 'Custom Dye-Sub PBT' },
      { label: 'Polling Rate', value: '1000 Hz Low Latency' },
    ],
    codeSnippet: `keyboard.onKeyPress((event) => {\n  if (event.shortcut === 'Cmd+K') openCommandBar();\n});`,
    actionLabel: 'Play Keystroke Sound 🎵',
    minacReaction: 'Tactile thock sound generated! Typing flow state engaged 🎹',
  },
  coffee: {
    id: 'coffee',
    title: 'Artisanal Dark Roast Espresso',
    subtitle: 'High-Octane Engineering Fuel',
    icon: '☕',
    description: 'Freshly brewed single-origin espresso maintaining optimal focus during deep architectural design sprints.',
    stats: [
      { label: 'Roast Level', value: 'Medium-Dark Ethiopian' },
      { label: 'Caffeine Content', value: '180mg Fresh' },
      { label: 'Focus Boost', value: '+45% Cognitive State' },
    ],
    codeSnippet: `while (developer.isCoding()) {\n  developer.drink(coffee);\n}`,
    actionLabel: 'Take a Sip ☕',
    minacReaction: 'Sip taken! Caffeine levels refueled. Ready for continuous integration ☕',
  },
  headphones: {
    id: 'headphones',
    title: 'Active Noise-Cancelling Headphones',
    subtitle: 'Deep Focus & Ambient Soundscapes',
    icon: '🎧',
    description: 'Over-ear acoustic isolation headphones playing lo-fi beats and binaural synthwave for uninterrupted coding concentration.',
    stats: [
      { label: 'Noise Reduction', value: '-35dB Acoustic Seal' },
      { label: 'Current Track', value: 'Lo-Fi Coding Synthwave' },
      { label: 'Focus Mode', value: 'Do Not Disturb Active' },
    ],
    codeSnippet: `audioEngine.playPlaylist('LOFI_CODING_STUDIO');`,
    actionLabel: 'Toggle Lo-Fi Beats 🎶',
    minacReaction: 'Lo-fi beats playing! Ambient noise canceled 🎧',
  },
  bookshelf: {
    id: 'bookshelf',
    title: 'Engineering Reference Library',
    subtitle: 'Systems & Architecture Design',
    icon: '📚',
    description: 'Curated technical library covering distributed systems, clean architecture, refactoring, and modern full-stack engineering.',
    stats: [
      { label: 'Core Topics', value: 'Systems, React, Node, SQL' },
      { label: 'Shelf LED', value: 'Warm Amber Strip Under-glow' },
      { label: 'Read Count', value: '38 Engineering Volumes' },
    ],
    codeSnippet: `library.findBook('Designing Data-Intensive Applications');`,
    actionLabel: 'Browse Book Stack 📖',
    minacReaction: 'Selected "Designing Data-Intensive Applications". Great choice! 📖',
  },
  plant: {
    id: 'plant',
    title: 'Workspace Monstera Plant',
    subtitle: 'Natural Oxygen & Calming Studio Greenery',
    icon: '🪴',
    description: 'Lush indoor plant providing natural air filtration and grounding aesthetics to Bitanya\'s engineering workspace.',
    stats: [
      { label: 'Species', value: 'Monstera Deliciosa' },
      { label: 'Health Index', value: '100% Thriving' },
      { label: 'Air Quality', value: 'Pure Oxygen' },
    ],
    codeSnippet: `plant.photosynthesize(); // O2 levels nominal`,
    actionLabel: 'Water Plant 💧',
    minacReaction: 'Plant watered! Fresh oxygen boost deployed 🌿',
  },
  hologram: {
    id: 'hologram',
    title: '3D Holographic Wireframe Projection',
    subtitle: 'Spatial Telemetry HUD',
    icon: '🛸',
    description: 'Floating mid-air spatial hologram projecting 3D CAD wireframe models, real-time node topology, and glass app launchers.',
    stats: [
      { label: 'Display Type', value: 'Spatial Photonic Hologram' },
      { label: 'Frame Rate', value: '120 FPS Spatial' },
      { label: 'Resolution', value: 'Volumetric Density High' },
    ],
    codeSnippet: `spatialEngine.renderWireframeModel('STARSHIP_V3');`,
    actionLabel: 'Rotate 3D Hologram 🔄',
    minacReaction: 'Hologram rotated 360°! Spatial model synchronized 🛸',
  },
}

interface DeskItemModalProps {
  item: DeskItemData | null
  onClose: () => void
}

export default function DeskItemModal({ item, onClose }: DeskItemModalProps) {
  const [actionDone, setActionDone] = useState(false)

  if (!item) return null

  const handleAction = () => {
    setActionDone(true)
  }

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          background: 'rgba(5, 4, 12, 0.75)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '520px',
            background: 'linear-gradient(135deg, rgba(26, 20, 38, 0.95), rgba(16, 12, 26, 0.98))',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6), 0 0 32px rgba(167, 139, 250, 0.12)',
            color: '#F8F7FF',
            fontFamily: 'var(--font-sans)',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(167, 139, 250, 0.12)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#F3F0F8', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#A78BFA', fontFamily: 'var(--font-mono)', margin: '2px 0 0' }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#A095BF',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <p style={{ fontSize: '13.5px', color: '#C4B8E0', lineHeight: 1.5, marginBottom: '20px' }}>
            {item.description}
          </p>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {item.stats.map((st, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(10, 8, 20, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <div style={{ fontSize: '10px', color: '#8E85AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {st.label}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#67E8F9', marginTop: '4px' }}>
                  {st.value}
                </div>
              </div>
            ))}
          </div>

          {/* Code snippet */}
          {item.codeSnippet && (
            <div style={{ marginBottom: '20px' }}>
              <pre
                style={{
                  background: '#070512',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontSize: '11px',
                  color: '#C4B5FD',
                  fontFamily: 'var(--font-mono)',
                  overflowX: 'auto',
                  margin: 0,
                }}
              >
                {item.codeSnippet}
              </pre>
            </div>
          )}

          {/* Action button */}
          {item.actionLabel && (
            <button
              onClick={handleAction}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: actionDone
                  ? 'rgba(34, 197, 94, 0.15)'
                  : 'linear-gradient(135deg, rgba(167, 139, 250, 0.25), rgba(103, 232, 249, 0.25))',
                border: actionDone ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(167, 139, 250, 0.4)',
                color: actionDone ? '#4ADE80' : '#F3F0F8',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {actionDone ? 'Action Executed ✨' : item.actionLabel}
            </button>
          )}

          {/* Minac Reaction message */}
          {actionDone && item.minacReaction && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(167, 139, 250, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                fontSize: '12px',
                color: '#E9D5FF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>💡</span> <strong>Minac:</strong> {item.minacReaction}
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

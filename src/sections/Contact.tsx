import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import SectionEyebrow from '../components/ui/SectionEyebrow'
import ScrollReveal from '../components/ui/ScrollReveal'

/* ═══════════════════════════════════════════════════════
   CONTACT DATA
   Single source of truth for all contact channels.
═══════════════════════════════════════════════════════ */
const CHANNELS = [
  {
    id:       'email',
    label:    'Email',
    handle:   'bethanywondimagegn@gmail.com',
    href:     'mailto:bethanywondimagegn@gmail.com',
    icon:     (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1" y="2.5" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.35"/>
        <path d="M1 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      </svg>
    ),
    accent:   '#A78BFA',
    rgb:      '167,139,250',
    external: false,
  },
  {
    id:       'github',
    label:    'GitHub',
    handle:   'BitanyYa',
    href:     'https://github.com/BitanyYa',
    icon:     <SiGithub size={15} aria-hidden="true" />,
    accent:   '#8B5CF6',
    rgb:      '139,92,246',
    external: true,
  },
  {
    id:       'linkedin',
    label:    'LinkedIn',
    handle:   'bitanya-wondimagegn',
    href:     'https://linkedin.com/in/bitanya-wondimagegn-05365a392',
    icon:     <FaLinkedinIn size={14} aria-hidden="true" />,
    accent:   '#60A5FA',
    rgb:      '96,165,250',
    external: true,
  },
]

/* ═══════════════════════════════════════════════════════
   FORM STATE TYPES
═══════════════════════════════════════════════════════ */
interface FormFields {
  name:    string
  email:   string
  subject: string
  message: string
}
interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim())
    errors.name = 'Name is required.'
  if (!fields.email.trim())
    errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Please enter a valid email address.'
  if (!fields.message.trim())
    errors.message = 'Message is required.'
  else if (fields.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.'
  return errors
}

/* ═══════════════════════════════════════════════════════
   SIGNAL PULSE  — subtle decorative motif
═══════════════════════════════════════════════════════ */
function SignalPulse() {
  return (
    <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }} aria-hidden="true">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position:     'absolute',
            inset:        -(i * 10),
            borderRadius: '50%',
            border:       `1px solid rgba(139,92,246,${0.45 - i * 0.13})`,
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
        />
      ))}
      <div style={{
        position:     'absolute', inset: 0, borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.08) 60%, transparent 100%)',
        display:      'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <motion.div
          style={{ width: 10, height: 10, borderRadius: '50%', background: '#8B5CF6' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   FIELD  — accessible labelled input / textarea
═══════════════════════════════════════════════════════ */
function Field({
  id, label, type = 'text', value, onChange, error, placeholder, multiline, rows = 5, required,
}: {
  id:          string
  label:       string
  type?:       string
  value:       string
  onChange:    (v: string) => void
  error?:      string
  placeholder: string
  multiline?:  boolean
  rows?:       number
  required?:   boolean
}) {
  const [focused, setFocused] = useState(false)

  const base: React.CSSProperties = {
    width:        '100%',
    padding:      '10px 14px',
    borderRadius: 10,
    background:   focused ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.03)',
    border:       `1px solid ${error ? 'rgba(248,113,113,0.55)' : focused ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.15)'}`,
    outline:      'none',
    fontFamily:   'var(--font-mono)',
    fontSize:     12,
    color:        'var(--text-primary)',
    caretColor:   '#8B5CF6',
    resize:       multiline ? 'vertical' : undefined,
    transition:   'border-color 0.2s, background 0.2s, box-shadow 0.2s',
    boxShadow:    focused ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none',
    lineHeight:   1.7,
    display:      'block',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      9,
          color:         error ? 'rgba(248,113,113,0.8)' : focused ? 'rgba(167,139,250,0.85)' : 'var(--text-muted)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          transition:    'color 0.2s',
        }}
      >
        {label}{required && <span style={{ color: 'rgba(236,72,153,0.7)', marginLeft: 3 }}>*</span>}
      </label>

      {multiline ? (
        <textarea
          id={id} value={value} rows={rows} required={required}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, minHeight: 110 }}
        />
      ) : (
        <input
          id={id} type={type} value={value} required={required}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{
              fontFamily:  'var(--font-mono)',
              fontSize:    10,
              color:       'rgba(248,113,113,0.85)',
              margin:      0,
              lineHeight:  1.5,
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SUCCESS STATE
═══════════════════════════════════════════════════════ */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            20,
        padding:        '40px 24px',
        textAlign:      'center',
        minHeight:      320,
      }}
    >
      {/* Animated check ring */}
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(16,185,129,0.12)',
            border:     '1.5px solid rgba(16,185,129,0.4)',
            display:    'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow:  '0 0 24px rgba(16,185,129,0.2)',
          }}
        >
          <motion.svg
            width="26" height="26" viewBox="0 0 26 26" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.path
              d="M5 13.5l5.5 5.5L21 8"
              stroke="#10B981" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.svg>
        </motion.div>

        {/* Ripple */}
        <motion.div
          style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(16,185,129,0.3)' }}
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>

      {/* Status label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      9,
          color:         '#10B981',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
        }}>
          Connection Established
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      17,
          fontWeight:    700,
          color:         'var(--text-primary)',
          letterSpacing: '-0.01em',
          margin:        0,
        }}>
          Message received.
        </p>
        <p style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    11,
          color:       'var(--text-muted)',
          lineHeight:  1.75,
          margin:      0,
          maxWidth:    260,
        }}>
          Thanks for reaching out. I'll get back to you as soon as I can.
        </p>
      </div>

      <button
        onClick={onReset}
        style={{
          marginTop:     4,
          fontFamily:    'var(--font-mono)',
          fontSize:      10,
          color:         'var(--text-muted)',
          background:    'transparent',
          border:        '1px solid var(--border)',
          padding:       '6px 16px',
          borderRadius:  8,
          cursor:        'pointer',
          letterSpacing: '0.1em',
          transition:    'color 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#A78BFA'; el.style.borderColor = 'rgba(139,92,246,0.4)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--border)' }}
      >
        Send another message
      </button>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════ */
function ContactForm() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const firstErrorRef = useRef<HTMLDivElement>(null)

  const setField = useCallback((key: keyof FormFields) => (val: string) => {
    setFields(f => ({ ...f, [key]: val }))
    // Clear field error on change
    setErrors(e => { const next = { ...e }; delete next[key as keyof FormErrors]; return next })
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Move focus to first error
      setTimeout(() => {
        const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null
        first?.focus()
      }, 50)
      return
    }
    setStatus('sending')
    // Simulate send — replace with actual endpoint if needed
    await new Promise(res => setTimeout(res, 1200))
    setStatus('success')
  }, [fields])

  const handleReset = useCallback(() => {
    setFields({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setStatus('idle')
  }, [])

  if (status === 'success') return <SuccessState onReset={handleReset} />

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" ref={firstErrorRef as React.Ref<HTMLFormElement>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Name + Email row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="contact-form-row">
          <Field id="name"  label="Name"  value={fields.name}  onChange={setField('name')}  error={errors.name}  placeholder="Your name"          required />
          <Field id="email" label="Email" type="email" value={fields.email} onChange={setField('email')} error={errors.email} placeholder="your@email.com" required />
        </div>

        {/* Subject */}
        <Field id="subject" label="Subject" value={fields.subject} onChange={setField('subject')} placeholder="Opportunity / Project / Other" />

        {/* Message */}
        <Field id="message" label="Message" value={fields.message} onChange={setField('message')} error={errors.message} placeholder="Tell me what you'd like to discuss…" multiline rows={5} required />

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={status !== 'sending' ? { y: -2, boxShadow: '0 12px 32px rgba(139,92,246,0.35)' } : {}}
          whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            9,
            padding:        '12px 24px',
            borderRadius:   11,
            fontFamily:     'var(--font-mono)',
            fontSize:       12,
            fontWeight:     700,
            letterSpacing:  '0.1em',
            cursor:         status === 'sending' ? 'default' : 'pointer',
            background:     status === 'sending'
              ? 'rgba(139,92,246,0.12)'
              : 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.15) 100%)',
            border:         '1px solid rgba(139,92,246,0.4)',
            color:          status === 'sending' ? 'rgba(167,139,250,0.5)' : '#C4B5FD',
            transition:     'background 0.25s, color 0.25s',
            marginTop:      4,
          }}
          aria-label={status === 'sending' ? 'Sending message…' : 'Send message'}
        >
          {status === 'sending' ? (
            <>
              <motion.div
                style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(167,139,250,0.4)', borderTopColor: '#A78BFA' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
              />
              Sending…
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 12L12 1M7 1h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Send Message
            </>
          )}
        </motion.button>
      </div>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════
   CHANNEL CARD
═══════════════════════════════════════════════════════ */
function ChannelCard({ ch }: { ch: typeof CHANNELS[number] }) {
  return (
    <motion.a
      href={ch.href}
      target={ch.external ? '_blank' : undefined}
      rel={ch.external ? 'noopener noreferrer' : undefined}
      aria-label={`${ch.label}: ${ch.handle}`}
      whileHover={{ y: -2, borderColor: `rgba(${ch.rgb},0.45)`, boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(${ch.rgb},0.15)` }}
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           14,
        padding:       '14px 18px',
        borderRadius:  12,
        background:    'var(--lab-surface)',
        border:        '1px solid var(--border)',
        textDecoration:'none',
        transition:    'border-color 0.2s, box-shadow 0.2s',
        cursor:        'pointer',
      }}
    >
      {/* Icon */}
      <div style={{
        width:          38, height: 38, borderRadius: 10, flexShrink: 0,
        background:     `rgba(${ch.rgb},0.1)`,
        border:         `1px solid rgba(${ch.rgb},0.22)`,
        color:          ch.accent,
        display:        'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {ch.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
          {ch.label}
        </div>
        <div style={{
          fontFamily:   'var(--font-mono)', fontSize: 10,
          color:        'var(--text-muted)',
          overflow:     'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {ch.handle}
        </div>
      </div>

      {/* Arrow */}
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"
        style={{ color: ch.accent, opacity: 0.5, flexShrink: 0 }}>
        <path d="M2 11L11 2M7 2h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function Contact() {
  return (
    <section
      id="contact"
      style={{ background: 'var(--lab-base)', position: 'relative', overflow: 'hidden', paddingBlock: 'var(--section-py)' }}
    >
      {/* Background */}
      <div className="lab-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.3 }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '15%', right: '-6%', width: 460, height: 460, background: 'radial-gradient(ellipse, rgba(236,72,153,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 380, height: 380, background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="lab-container relative z-10">

        {/* ── Header ── */}
        <ScrollReveal variant="fadeUp">
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
            <SignalPulse />
            <div>
              <SectionEyebrow>// 04 — contact</SectionEyebrow>
              <div style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      9,
                color:         '#10B981',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                display:       'flex',
                alignItems:    'center',
                gap:           6,
                marginTop:     4,
              }}>
                <motion.div
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Channel open · response within 24h
              </div>
            </div>
          </div>

          <h2 style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      'clamp(2rem, 5vw, 3.25rem)',
            fontWeight:    800,
            letterSpacing: '-0.04em',
            lineHeight:    1.04,
            color:         'var(--text-primary)',
            margin:        '0 0 16px',
          }}>
            Let's build something{' '}
            <span className="gradient-text">useful.</span>
          </h2>

          <p style={{
            fontSize:   '0.9375rem',
            lineHeight: 1.8,
            color:      'var(--text-secondary)',
            maxWidth:   500,
            margin:     0,
          }}>
            Have a project, opportunity, or idea you'd like to discuss? I'd love to hear about it.
          </p>
        </ScrollReveal>

        {/* ── Two-column body ── */}
        <div
          style={{ marginTop: 52, display: 'grid', gap: 28, alignItems: 'start' }}
          className="contact-grid"
        >
          {/* LEFT — form */}
          <ScrollReveal variant="slideLeft" delay={0.08}>
            <div style={{
              background:   'var(--lab-surface)',
              border:       '1px solid var(--border)',
              borderRadius: 16,
              padding:      '28px 26px',
              position:     'relative',
              overflow:     'hidden',
            }}>
              {/* Subtle top gradient */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 60,
                background: 'radial-gradient(ellipse at 40% -20%, rgba(139,92,246,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Form header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, position: 'relative' }}>
                <div style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      9,
                  color:         'rgba(139,92,246,0.6)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}>
                  Send a message
                </div>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              <ContactForm />
            </div>
          </ScrollReveal>

          {/* RIGHT — channels + note */}
          <ScrollReveal variant="slideRight" delay={0.14}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Channels label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      8,
                  color:         'var(--text-muted)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  opacity:       0.5,
                  flexShrink:    0,
                }}>
                  Connect directly
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              {/* Channel cards */}
              {CHANNELS.map((ch, i) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <ChannelCard ch={ch} />
                </motion.div>
              ))}

              {/* Resume download */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.28 }}
              >
                <a
                  href="/resume.pdf"
                  download
                  aria-label="Download Bitanya's resume as PDF"
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            9,
                    padding:        '12px 20px',
                    borderRadius:   12,
                    fontFamily:     'var(--font-mono)',
                    fontSize:       11,
                    fontWeight:     700,
                    letterSpacing:  '0.1em',
                    color:          '#A78BFA',
                    background:     'rgba(139,92,246,0.07)',
                    border:         '1px solid rgba(139,92,246,0.22)',
                    textDecoration: 'none',
                    transition:     'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(139,92,246,0.14)'; el.style.borderColor = 'rgba(139,92,246,0.4)'; el.style.boxShadow = '0 0 20px rgba(139,92,246,0.15)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(139,92,246,0.07)'; el.style.borderColor = 'rgba(139,92,246,0.22)'; el.style.boxShadow = 'none' }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M6.5 1v7.5M3.5 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 10.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Download Resume
                </a>
              </motion.div>

              {/* Availability note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{
                  padding:      '14px 16px',
                  borderRadius: 12,
                  background:   'rgba(16,185,129,0.04)',
                  border:       '1px solid rgba(16,185,129,0.14)',
                  display:      'flex',
                  alignItems:   'flex-start',
                  gap:          10,
                  marginTop:    4,
                }}
              >
                <motion.div
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: 3 }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    11,
                  color:       'rgba(16,185,129,0.75)',
                  lineHeight:  1.7,
                  margin:      0,
                }}>
                  Available for full-time roles, freelance projects, and interesting technical collaborations.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        .contact-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 820px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

import { motion, type TargetAndTransition } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'blur'
  once?: boolean
  amount?: number
}

const INITIAL: Record<NonNullable<Props['variant']>, TargetAndTransition> = {
  fadeUp:    { opacity: 0, y: 36, filter: 'blur(4px)' },
  fadeIn:    { opacity: 0, filter: 'blur(4px)' },
  slideLeft: { opacity: 0, x: -36, filter: 'blur(4px)' },
  slideRight:{ opacity: 0, x: 36, filter: 'blur(4px)' },
  scale:     { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  blur:      { opacity: 0, y: 20, filter: 'blur(12px)' },
}

const ANIMATE: Record<NonNullable<Props['variant']>, TargetAndTransition> = {
  fadeUp:    { opacity: 1, y: 0, filter: 'blur(0px)' },
  fadeIn:    { opacity: 1, filter: 'blur(0px)' },
  slideLeft: { opacity: 1, x: 0, filter: 'blur(0px)' },
  slideRight:{ opacity: 1, x: 0, filter: 'blur(0px)' },
  scale:     { opacity: 1, scale: 1, filter: 'blur(0px)' },
  blur:      { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * ScrollReveal — wraps any content with a scroll-triggered entrance.
 */
export default function ScrollReveal({
  children,
  className = '',
  style,
  delay = 0,
  variant = 'fadeUp',
  once = true,
  amount = 0.15,
}: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={INITIAL[variant]}
      whileInView={ANIMATE[variant]}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  staggerDelay?: number
  childVariant?: 'fadeUp' | 'scale' | 'blur'
}

const CHILD_VARIANTS: Record<NonNullable<Props['childVariant']>, Variants> = {
  fadeUp: {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  scale: {
    hidden:  { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1,   transition: { duration: 0.5, ease: 'easeOut' } },
  },
  blur: {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0,       transition: { duration: 0.65, ease: 'easeOut' } },
  },
}

export function StaggerGroup({
  children,
  className = '',
  style,
  staggerDelay = 0.09,
}: Props) {
  const containerV: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
  }
  return (
    <motion.div
      className={className}
      style={style}
      variants={containerV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
  style,
  variant = 'fadeUp',
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: NonNullable<Props['childVariant']>
}) {
  return (
    <motion.div className={className} style={style} variants={CHILD_VARIANTS[variant]}>
      {children}
    </motion.div>
  )
}

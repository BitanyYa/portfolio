interface Props {
  children: React.ReactNode
  className?: string
}

/**
 * Small monospace label that sits above every section heading.
 * e.g. "// 01 — workspace"
 */
export default function SectionEyebrow({ children, className = '' }: Props) {
  return (
    <p className={`section-eyebrow ${className}`}>
      {children}
    </p>
  )
}

export default function Footer() {
  return (
    <footer
      className="py-6 px-6"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <span className="font-bold text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
          BW<span style={{ color: '#7c3aed', opacity: 1 }}>.</span>
        </span>

        {/* Copyright — centered */}
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Bitanya Wondimagegn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

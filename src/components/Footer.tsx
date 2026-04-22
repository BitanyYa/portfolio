export default function Footer() {
  return (
    <footer
      className="py-6 px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <span className="font-bold text-sm" style={{ color: 'rgba(248,250,252,0.5)' }}>
          BW<span style={{ color: '#7c3aed' }}>.</span>
        </span>

        {/* Copyright — centered */}
        <p className="text-xs" style={{ color: '#334155' }}>
          © {new Date().getFullYear()} Bitanya Wondimagegn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

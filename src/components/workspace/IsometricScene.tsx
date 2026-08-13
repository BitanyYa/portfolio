import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ─── Projection Constants ─────────────────────────────────────────────────── */
const SCALE = 52
const OX = 500
const OY = 195
const RW = 8    // room width  (x axis)
const RD = 6    // room depth  (y axis)
const RH = 4.2  // room height (z axis)

function ix(rx: number, ry: number): number {
  return OX + (rx - ry) * SCALE * 0.866
}
function iy(rx: number, ry: number, rz = 0): number {
  return OY + (rx + ry) * SCALE * 0.5 - rz * SCALE
}
function pt(rx: number, ry: number, rz = 0): string {
  return `${ix(rx, ry)},${iy(rx, ry, rz)}`
}
function poly(...pts: [number, number, number?][]): string {
  return pts.map(([rx, ry, rz]) => pt(rx, ry, rz ?? 0)).join(' ')
}

/* ─── Cyberpunk Vivid Colour Helpers ──────────────────────────────────────── */
const V   = (a: number) => `rgba(139,92,246,${a})`   // violet
const Cy  = (a: number) => `rgba(34,211,238,${a})`   // cyan
const Pk  = (a: number) => `rgba(236,72,153,${a})`   // pink/magenta
const Am  = (a: number) => `rgba(245,158,11,${a})`   // amber
const W   = (a: number) => `rgba(255,255,255,${a})`  // white

/* ─── SVG Defs ───────────────────────────────────────────────────────────── */
function Defs() {
  return (
    <defs>
      {/* Night Sky */}
      <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#020617" />
        <stop offset="45%"  stopColor="#0D0B1E" />
        <stop offset="100%" stopColor="#1A0E2E" />
      </linearGradient>

      {/* Wall Gradients */}
      <linearGradient id="wallLeft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#1A1628" />
        <stop offset="100%" stopColor="#221C34" />
      </linearGradient>
      <linearGradient id="wallRight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#1E1A2E" />
        <stop offset="100%" stopColor="#16132A" />
      </linearGradient>

      {/* Acoustic Wood Slats */}
      <linearGradient id="woodSlat" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#2A1D34" />
        <stop offset="60%"  stopColor="#22172A" />
        <stop offset="100%" stopColor="#160E1C" />
      </linearGradient>

      {/* Floor & Rug */}
      <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#1A1626" />
        <stop offset="100%" stopColor="#13111C" />
      </linearGradient>
      <linearGradient id="rugG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#2C2442" />
        <stop offset="100%" stopColor="#1E1730" />
      </linearGradient>

      {/* Glass Desk */}
      <linearGradient id="glassDesk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#1E1936" stopOpacity="0.95" />
        <stop offset="50%"  stopColor="#141026" stopOpacity="0.98" />
        <stop offset="100%" stopColor="#0C0A18" stopOpacity="0.99" />
      </linearGradient>
      <linearGradient id="deskEdgePink" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor={Pk(0.9)} />
        <stop offset="50%"  stopColor={V(0.8)} />
        <stop offset="100%" stopColor={Cy(0.9)} />
      </linearGradient>

      {/* Glass Board Surface */}
      <linearGradient id="glassBoard" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="rgba(34,211,238,0.12)" />
        <stop offset="100%" stopColor="rgba(139,92,246,0.06)" />
      </linearGradient>

      {/* Screen Gradients */}
      <linearGradient id="screenBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#08061C" />
        <stop offset="100%" stopColor="#040310" />
      </linearGradient>

      {/* Glow Filters */}
      <filter id="neonGlowPink" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neonGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="blur12" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="12" />
      </filter>
      <filter id="blur6"  x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  )
}

/* ─── Floor & Area Rug ───────────────────────────────────────────────────── */
function Floor() {
  return (
    <>
      <polygon points={poly([0,0],[RW,0],[RW,RD],[0,RD])} fill="url(#floorG)" />
      <polygon
        points={poly([1.8, 2.5],[4.8, 2.5],[5.2, 5.8],[1.5, 5.8])}
        fill="url(#rugG)"
        stroke={Pk(0.15)}
        strokeWidth="1"
      />
      <polygon
        points={poly([1.8, 2.5],[4.8, 2.5],[4.85, 2.55],[1.75, 2.55])}
        fill={Pk(0.3)}
      />
    </>
  )
}

/* ─── Back-left Wall & Single Framed Quote ───────────────────────────────── */
function WallLeft() {
  return (
    <>
      <polygon points={poly([0,0,0],[0,0,RH],[0,RD,RH],[0,RD,0])} fill="url(#wallLeft)" />
      <polygon points={poly([0,0.4,0.1],[0,0.4,RH-0.1],[0,3.8,RH-0.1],[0,3.8,0.1])} fill="url(#nightSky)" />

      {/* Window Frame */}
      <polygon points={poly([0,0.35,0.05],[0,0.35,RH-0.05],[0,0.45,RH-0.05],[0,0.45,0.05])} fill={W(0.12)} />
      <polygon points={poly([0,3.75,0.05],[0,3.75,RH-0.05],[0,3.85,RH-0.05],[0,3.85,0.05])} fill={W(0.12)} />
      <polygon points={poly([0,0.35,RH-0.1],[0,0.35,RH-0.02],[0,3.85,RH-0.02],[0,3.85,RH-0.1])} fill={W(0.12)} />
      <polygon points={poly([0,0.35,0.02],[0,0.35,0.1],[0,3.85,0.1],[0,3.85,0.02])} fill={W(0.12)} />
      <polygon points={poly([0,2.1,0.1],[0,2.1,RH-0.1],[0,2.2,RH-0.1],[0,2.2,0.1])} fill={W(0.08)} />

      {/* Framed Quote Hanging on Left Wall */}
      <g>
        {/* Wall Nail Hook */}
        <circle cx={ix(0, 4.85)} cy={iy(0, 4.85, 3.65)} r={2.5} fill="#D4D4D8" stroke="#52525B" strokeWidth="0.8" />

        {/* Hanging Wires stretching from Nail to Frame Corners */}
        <line
          x1={ix(0, 4.85)} y1={iy(0, 4.85, 3.65)}
          x2={ix(0, 4.25)} y2={iy(0, 4.25, 3.30)}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.8"
        />
        <line
          x1={ix(0, 4.85)} y1={iy(0, 4.85, 3.65)}
          x2={ix(0, 5.45)} y2={iy(0, 5.45, 3.30)}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.8"
        />

        {/* Frame Wall Shadow */}
        <polygon points={poly([0,4.22,2.08],[0,4.22,3.28],[0,5.52,3.28],[0,5.52,2.08])} fill="rgba(0,0,0,0.5)" filter="url(#blur6)" />

        {/* Outer Frame (Deep Walnut & Chrome Bevel) */}
        <polygon points={poly([0,4.2,2.1],[0,4.2,3.3],[0,5.5,3.3],[0,5.5,2.1])} fill="#0E0B16" stroke={W(0.35)} strokeWidth="1.2" />

        {/* Canvas Mat */}
        <polygon points={poly([0,4.28,2.18],[0,4.28,3.22],[0,5.42,3.22],[0,5.42,2.18])} fill="#181324" />

        {/* Minimalist Quote Typography */}
        <text
          x={ix(0, 4.85)}
          y={iy(0, 4.85, 2.75)}
          textAnchor="middle"
          fill={W(0.88)}
          fontSize="9.5"
          fontFamily="serif"
          fontStyle="italic"
          letterSpacing="0.04em"
        >
          Build things that matter.
        </text>
        <line
          x1={ix(0, 4.55)} y1={iy(0, 4.55, 2.52)}
          x2={ix(0, 5.15)} y2={iy(0, 5.15, 2.55)}
          stroke={V(0.5)}
          strokeWidth="0.8"
        />
      </g>
    </>
  )
}

/* ─── Night Sky View (Moon, Skyline, Cyan Laser, Twinkling Stars) ────────── */
function NightSky() {
  const moonX = ix(0, 1.3)
  const moonY = iy(0, 1.3, RH - 0.7)

  return (
    <>
      <circle cx={moonX} cy={moonY} r={28} fill="rgba(230,220,255,0.2)" filter="url(#blur12)" />
      <circle cx={moonX} cy={moonY} r={12} fill="#F0EAFF" opacity={0.95} />
      <circle cx={moonX + 3} cy={moonY - 2} r={10} fill="#140E26" opacity={0.25} />

      {/* Skyscraper Skyline */}
      {[
        { y: 0.6, w: 0.4, h: 1.4 },
        { y: 1.1, w: 0.5, h: 1.8 },
        { y: 1.7, w: 0.6, h: 1.2 },
        { y: 2.4, w: 0.5, h: 2.1 },
        { y: 3.0, w: 0.6, h: 1.5 },
      ].map((b, i) => (
        <g key={i}>
          <polygon points={poly([0, b.y, 0.1],[0, b.y + b.w, 0.1],[0, b.y + b.w, b.h],[0, b.y, b.h])} fill="#090614" />
          {[0.3, 0.6, 0.9, 1.2].map((wh, wi) => (
            <circle
              key={wi}
              cx={ix(0, b.y + b.w * 0.4)}
              cy={iy(0, b.y + b.w * 0.4, wh)}
              r={1.2}
              fill={wi % 2 === 0 ? Cy(0.8) : Am(0.8)}
            />
          ))}
        </g>
      ))}

      {/* Cyan Laser Streak */}
      <line
        x1={ix(0, 0.5)} y1={iy(0, 0.5, RH - 1.2)}
        x2={ix(0, 3.7)} y2={iy(0, 3.7, RH - 2.2)}
        stroke={Cy(0.85)}
        strokeWidth="1.5"
        filter="url(#neonGlowCyan)"
      />

      {/* Subtle Star Twinkle Animation */}
      {[
        { y: 0.7, z: 3.5, r: 1.1 },
        { y: 1.5, z: 3.8, r: 1.3 },
        { y: 2.3, z: 3.3, r: 0.9 },
        { y: 2.9, z: 3.6, r: 1.1 },
      ].map((st, i) => (
        <motion.circle
          key={i}
          cx={ix(0, st.y)}
          cy={iy(0, st.y, st.z)}
          r={st.r}
          fill={W(0.8)}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      {/* Rare Tiny Shooting Star */}
      <motion.line
        x1={ix(0, 0.8)} y1={iy(0, 0.8, 3.8)}
        x2={ix(0, 1.5)} y2={iy(0, 1.5, 3.4)}
        stroke={Cy(0.8)}
        strokeWidth="1.2"
        strokeLinecap="round"
        animate={{ opacity: [0, 0, 0.9, 0], x2: [ix(0, 0.8), ix(0, 1.6)] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeOut', delay: 4 }}
      />
    </>
  )
}

/* ─── Back-right Wall (Acoustic Wood Slats & Pink Neon Strip) ────────────── */
function WallRight() {
  return (
    <>
      <polygon points={poly([0,0,0],[RW,0,0],[RW,0,RH],[0,0,RH])} fill="url(#wallRight)" />

      {/* Vertical Acoustic Wood Slats */}
      {Array.from({ length: 14 }).map((_, i) => {
        const sx = 3.6 + i * 0.3
        return (
          <polygon
            key={`slat-${i}`}
            points={poly([sx, 0, 0],[sx + 0.18, 0, 0],[sx + 0.18, 0, RH],[sx, 0, RH])}
            fill="url(#woodSlat)"
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="0.5"
          />
        )
      })}

      {/* Vertical Pink Neon Light Strip */}
      <motion.polygon
        points={poly([3.45, 0, 0],[3.52, 0, 0],[3.52, 0, RH],[3.45, 0, RH])}
        fill={Pk(0.95)}
        filter="url(#neonGlowPink)"
        animate={{ opacity: [0.85, 1.0, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Replaced Floating App Icons with Glass Engineering Planning Board */}
      <g>
        {/* Glass Board Surface */}
        <polygon
          points={poly([4.0, 0, 2.1],[6.0, 0, 2.1],[6.0, 0, 3.5],[4.0, 0, 3.5])}
          fill="url(#glassBoard)"
          stroke={Cy(0.5)}
          strokeWidth="1"
          filter="url(#neonGlowCyan)"
        />
        {/* Chrome Corner Mounts */}
        {[[4.1, 2.2], [5.9, 2.2], [4.1, 3.4], [5.9, 3.4]].map(([bx, bz], i) => (
          <circle key={i} cx={ix(bx, 0)} cy={iy(bx, 0, bz)} r={2.5} fill={W(0.6)} />
        ))}

        {/* Clean Architecture Sketch: Frontend -> API -> Database -> Deployment */}
        <g style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5 }}>
          {/* Frontend */}
          <rect x={ix(4.15, 0) - 20} y={iy(4.15, 0, 3.2) - 7} width="40" height="14" rx="3" fill="none" stroke={W(0.7)} strokeWidth="0.8" />
          <text x={ix(4.15, 0)} y={iy(4.15, 0, 3.2) + 3} textAnchor="middle" fill={W(0.9)}>Frontend</text>

          {/* Down Arrow line */}
          <line x1={ix(4.15, 0)} y1={iy(4.15, 0, 3.06)} x2={ix(4.15, 0)} y2={iy(4.15, 0, 2.92)} stroke={Cy(0.8)} strokeWidth="1" />

          {/* API */}
          <rect x={ix(4.15, 0) - 18} y={iy(4.15, 0, 2.82) - 7} width="36" height="14" rx="3" fill="none" stroke={W(0.7)} strokeWidth="0.8" />
          <text x={ix(4.15, 0)} y={iy(4.15, 0, 2.82) + 3} textAnchor="middle" fill={W(0.9)}>API</text>

          {/* Right Arrow line */}
          <line x1={ix(4.7, 0)} y1={iy(4.7, 0, 2.82)} x2={ix(4.9, 0)} y2={iy(4.9, 0, 2.82)} stroke={Cy(0.8)} strokeWidth="1" />

          {/* Database */}
          <rect x={ix(5.3, 0) - 24} y={iy(5.3, 0, 2.82) - 7} width="48" height="14" rx="3" fill="none" stroke={W(0.7)} strokeWidth="0.8" />
          <text x={ix(5.3, 0)} y={iy(5.3, 0, 2.82) + 3} textAnchor="middle" fill={W(0.9)}>Database</text>

          {/* Down Arrow line */}
          <line x1={ix(5.3, 0)} y1={iy(5.3, 0, 2.68)} x2={ix(5.3, 0)} y2={iy(5.3, 0, 2.54)} stroke={Cy(0.8)} strokeWidth="1" />

          {/* Deployment */}
          <rect x={ix(5.3, 0) - 26} y={iy(5.3, 0, 2.42) - 7} width="52" height="14" rx="3" fill="none" stroke={W(0.7)} strokeWidth="0.8" />
          <text x={ix(5.3, 0)} y={iy(5.3, 0, 2.42) + 3} textAnchor="middle" fill={W(0.9)}>Deployment</text>
        </g>
      </g>
    </>
  )
}

/* ─── Bookshelf & Warm LED Under-glow Strip ───────────────────────────────── */
const BOOK_STACK = [
  { body: '#1E293B', acc: Cy(0.9) },
  { body: '#4C1D95', acc: Pk(0.9) },
  { body: '#064E3B', acc: '#10B981' },
  { body: '#78350F', acc: Am(0.9) },
  { body: '#311B92', acc: V(0.9)  },
]

function Bookshelf() {
  const sx = 1.2, ex = 3.2, sy = 0, gy = 0.25, z1 = 2.0, z2 = 3.8
  const midZ = (z1 + z2) / 2

  return (
    <>
      <polygon points={poly([sx,sy,z1],[ex,sy,z1],[ex,sy,z2],[sx,sy,z2])} fill="#140E24" opacity={0.9} />
      <polygon points={poly([sx,sy,z2],[ex,sy,z2],[ex,sy+gy,z2],[sx,sy+gy,z2])} fill="#241B38" />
      <polygon points={poly([sx,sy,midZ],[ex,sy,midZ],[ex,sy+gy,midZ],[sx,sy+gy,midZ])} fill="#201832" />
      <polygon points={poly([sx,sy,z1],[ex,sy,z1],[ex,sy+gy,z1],[sx,sy+gy,z1])} fill="#1A122B" />

      {/* Books row */}
      {BOOK_STACK.map((bk, i) => {
        const bw = 0.35, bx = sx + 0.15 + i * (bw + 0.04)
        return (
          <g key={`bk-${i}`}>
            <polygon points={poly([bx,sy,z1+0.05],[bx+bw,sy,z1+0.05],[bx+bw,sy,midZ-0.1],[bx,sy,midZ-0.1])} fill={bk.body} />
            <polygon points={poly([bx,sy,z1+0.2],[bx+0.08,sy,z1+0.2],[bx+0.08,sy,z1+0.35],[bx,sy,z1+0.35])} fill={bk.acc} />
          </g>
        )
      })}

      {/* Warm LED Strip Underneath Shelf */}
      <polygon points={poly([sx, sy + 0.02, z1 - 0.03],[ex, sy + 0.02, z1 - 0.03],[ex, sy + 0.06, z1 - 0.03],[sx, sy + 0.06, z1 - 0.03])} fill="rgba(253,230,138,0.5)" filter="url(#blur6)" />
      <ellipse cx={ix((sx + ex) / 2, sy + 0.1)} cy={iy((sx + ex) / 2, sy + 0.1, z1 - 0.15)} rx={42} ry={14} fill="rgba(253,230,138,0.18)" filter="url(#blur12)" />
    </>
  )
}

/* ─── Dark Glossy Glass Desk ─────────────────────────────────────────────── */
const DX1 = 1.4, DX2 = 6.2
const DY1 = 0.5, DY2 = 3.1
const DZ  = 0.95
const DT  = 0.10

function GlassDesk() {
  return (
    <>
      {/* Desk Legs */}
      {([
        [DX1 + 0.15, DY1 + 0.15],
        [DX2 - 0.15, DY1 + 0.15],
        [DX1 + 0.15, DY2 - 0.15],
        [DX2 - 0.15, DY2 - 0.15],
      ] as [number, number][]).map(([lx, ly], i) => (
        <polygon key={`dleg-${i}`} points={poly([lx,ly,0],[lx+0.12,ly,0],[lx+0.12,ly,DZ-DT],[lx,ly,DZ-DT])} fill="#0B0916" />
      ))}

      {/* Desk Front Face */}
      <polygon points={poly([DX1,DY2,DZ-DT],[DX2,DY2,DZ-DT],[DX2,DY2,DZ],[DX1,DY2,DZ])} fill="#0F0C1D" />
      <polygon points={poly([DX2,DY1,DZ-DT],[DX2,DY2,DZ-DT],[DX2,DY2,DZ],[DX2,DY1,DZ])} fill="#090714" />

      {/* Top Surface */}
      <polygon points={poly([DX1,DY1,DZ],[DX2,DY1,DZ],[DX2,DY2,DZ],[DX1,DY2,DZ])} fill="url(#glassDesk)" />

      {/* Pink & Cyan LED Strip along Desk Edge */}
      <polygon points={poly([DX1,DY2,DZ],[DX2,DY2,DZ],[DX2,DY2,DZ+0.02],[DX1,DY2,DZ+0.02])} fill="url(#deskEdgePink)" filter="url(#neonGlowPink)" />

      {/* Glass Reflection */}
      <polygon
        points={poly([DX1 + 0.5, DY1 + 0.4, DZ + 0.005],[DX2 - 0.5, DY1 + 0.4, DZ + 0.005],[DX2 - 1.2, DY2 - 0.4, DZ + 0.005],[DX1 + 1.2, DY2 - 0.4, DZ + 0.005])}
        fill="rgba(255,255,255,0.03)"
      />
    </>
  )
}

/* ─── Ultra-wide Curved Dual Monitors (Clean IDE Coding Workspace) ────────── */
const MON_Y = 0.75
const MON_H = 1.35

function CurvedMonitors() {
  const my = MON_Y, mz = DZ

  return (
    <>
      {/* ── Left Curved Monitor (VS Code Primary IDE Workspace) ── */}
      {/* Screen Frame Outer */}
      <polygon points={poly([1.8, my, mz],[3.7, my, mz],[3.7, my, mz + MON_H],[1.8, my, mz + MON_H])} fill="url(#screenBg)" stroke={Cy(0.5)} strokeWidth="1.2" />

      {/* 1. IDE Top Window Bar & File Tabs (Graphic bars only, no raw text strings) */}
      <polygon points={poly([1.82, my - 0.005, mz + MON_H - 0.12],[3.68, my - 0.005, mz + MON_H - 0.12],[3.68, my - 0.005, mz + MON_H - 0.02],[1.82, my - 0.005, mz + MON_H - 0.02])} fill="#090714" />
      {/* Window Controls (Red, Yellow, Green dots) */}
      <circle cx={ix(1.88, my - 0.008)} cy={iy(1.88, my - 0.008, mz + MON_H - 0.07)} r={1.5} fill="#EF4444" />
      <circle cx={ix(1.94, my - 0.008)} cy={iy(1.94, my - 0.008, mz + MON_H - 0.07)} r={1.5} fill="#F59E0B" />
      <circle cx={ix(2.00, my - 0.008)} cy={iy(2.00, my - 0.008, mz + MON_H - 0.07)} r={1.5} fill="#10B981" />

      {/* Active Tab Bar Highlights */}
      <polygon points={poly([2.08, my - 0.006, mz + MON_H - 0.12],[2.52, my - 0.006, mz + MON_H - 0.12],[2.52, my - 0.006, mz + MON_H - 0.02],[2.08, my - 0.006, mz + MON_H - 0.02])} fill="#16102D" stroke={Cy(0.6)} strokeWidth="0.5" />
      <polygon points={poly([2.14, my - 0.007, mz + MON_H - 0.07],[2.44, my - 0.007, mz + MON_H - 0.07],[2.44, my - 0.007, mz + MON_H - 0.05],[2.14, my - 0.007, mz + MON_H - 0.05])} fill={Cy(0.9)} />

      <polygon points={poly([2.55, my - 0.006, mz + MON_H - 0.12],[2.95, my - 0.006, mz + MON_H - 0.12],[2.95, my - 0.006, mz + MON_H - 0.02],[2.55, my - 0.006, mz + MON_H - 0.02])} fill="#0C0A1A" />
      <polygon points={poly([2.60, my - 0.007, mz + MON_H - 0.07],[2.88, my - 0.007, mz + MON_H - 0.07],[2.88, my - 0.007, mz + MON_H - 0.05],[2.60, my - 0.007, mz + MON_H - 0.05])} fill={W(0.4)} />

      {/* 2. Sidebar Explorer Panel */}
      <polygon points={poly([1.82, my - 0.005, mz + 0.08],[2.12, my - 0.005, mz + 0.08],[2.12, my - 0.005, mz + MON_H - 0.13],[1.82, my - 0.005, mz + MON_H - 0.13])} fill="#050410" />
      {[
        { yz: 1.10, col: Cy(0.8), w: 0.12 },
        { yz: 0.98, col: V(0.9),  w: 0.18 },
        { yz: 0.86, col: Cy(0.6), w: 0.15 },
        { yz: 0.74, col: W(0.4),  w: 0.10 },
        { yz: 0.62, col: Am(0.8), w: 0.14 },
      ].map((item, i) => (
        <g key={`tree-${i}`}>
          <circle cx={ix(1.88, my - 0.008)} cy={iy(1.88, my - 0.008, mz + item.yz)} r={1.5} fill={item.col} />
          <polygon points={poly([1.93, my - 0.008, mz + item.yz - 0.015],[1.93 + item.w, my - 0.008, mz + item.yz - 0.015],[1.93 + item.w, my - 0.008, mz + item.yz + 0.015],[1.93, my - 0.008, mz + item.yz + 0.015])} fill={item.col} />
        </g>
      ))}

      {/* 3. Main Code Canvas (Clean Syntax Highlighted Lines & Gutter) */}
      {[
        { rz: 1.12, indent: 0,   col: Pk(0.9),  w: 0.45 },
        { rz: 1.02, indent: 0,   col: V(0.9),   w: 0.55 },
        { rz: 0.92, indent: 0.1, col: Cy(0.85), w: 0.65 },
        { rz: 0.82, indent: 0.1, col: V(0.85),  w: 0.50 },
        { rz: 0.72, indent: 0.2, col: Cy(0.95), w: 0.70 },
        { rz: 0.62, indent: 0.2, col: Pk(0.85), w: 0.40 },
        { rz: 0.52, indent: 0.1, col: V(0.8),   w: 0.25 },
        { rz: 0.42, indent: 0.1, col: Cy(0.9),  w: 0.60 },
      ].map((line, i) => (
        <g key={`codeline-${i}`}>
          <circle cx={ix(2.18, my - 0.008)} cy={iy(2.18, my - 0.008, mz + line.rz)} r={1} fill={W(0.25)} />
          <polygon
            points={poly(
              [2.24 + line.indent, my - 0.005, mz + line.rz - 0.02],
              [2.24 + line.indent + line.w, my - 0.005, mz + line.rz - 0.02],
              [2.24 + line.indent + line.w, my - 0.005, mz + line.rz + 0.025],
              [2.24 + line.indent, my - 0.005, mz + line.rz + 0.025]
            )}
            fill={line.col}
          />
        </g>
      ))}

      {/* Blinking Active Code Cursor */}
      <motion.line
        x1={ix(3.1, my - 0.008)} y1={iy(3.1, my - 0.008, mz + 0.40)}
        x2={ix(3.1, my - 0.008)} y2={iy(3.1, my - 0.008, mz + 0.44)}
        stroke={Cy(1)}
        strokeWidth="2"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 4. Integrated Terminal Panel at Bottom (No raw text strings) */}
      <polygon points={poly([2.15, my - 0.005, mz + 0.08],[3.68, my - 0.005, mz + 0.08],[3.68, my - 0.005, mz + 0.35],[2.15, my - 0.005, mz + 0.35])} fill="#04030C" stroke="rgba(34,211,238,0.25)" strokeWidth="0.5" />
      <polygon points={poly([2.15, my - 0.005, mz + 0.30],[3.68, my - 0.005, mz + 0.30],[3.68, my - 0.005, mz + 0.35],[2.15, my - 0.005, mz + 0.35])} fill="#080616" />

      {/* Terminal Log Indicator Lines */}
      <polygon points={poly([2.22, my - 0.008, mz + 0.22],[2.75, my - 0.008, mz + 0.22],[2.75, my - 0.008, mz + 0.25],[2.22, my - 0.008, mz + 0.25])} fill="#10B981" />
      <polygon points={poly([2.22, my - 0.008, mz + 0.14],[3.25, my - 0.008, mz + 0.14],[3.25, my - 0.008, mz + 0.17],[2.22, my - 0.008, mz + 0.17])} fill={Cy(0.85)} />

      {/* Stand Base Left */}
      <polygon points={poly([2.6, my, mz + 0.02],[2.9, my, mz + 0.02],[2.9, my + 0.15, mz + 0.02],[2.6, my + 0.15, mz + 0.02])} fill="#141026" />


      {/* ── Right Curved Monitor (Secondary IDE Split Pane & Connected Nodes) ── */}
      <polygon points={poly([3.9, my, mz],[5.8, my, mz],[5.8, my, mz + MON_H],[3.9, my, mz + MON_H])} fill="url(#screenBg)" stroke={V(0.5)} strokeWidth="1.2" />

      {/* IDE Top Window Bar */}
      <polygon points={poly([3.92, my - 0.005, mz + MON_H - 0.12],[5.78, my - 0.005, mz + MON_H - 0.12],[5.78, my - 0.005, mz + MON_H - 0.02],[3.92, my - 0.005, mz + MON_H - 0.02])} fill="#090714" />
      <polygon points={poly([3.95, my - 0.006, mz + MON_H - 0.12],[4.45, my - 0.006, mz + MON_H - 0.12],[4.45, my - 0.006, mz + MON_H - 0.02],[3.95, my - 0.006, mz + MON_H - 0.02])} fill="#140F26" stroke={V(0.6)} strokeWidth="0.5" />
      <polygon points={poly([4.00, my - 0.007, mz + MON_H - 0.07],[4.38, my - 0.007, mz + MON_H - 0.07],[4.38, my - 0.007, mz + MON_H - 0.05],[4.00, my - 0.007, mz + MON_H - 0.05])} fill={V(0.9)} />

      {/* Code Lines on Right Monitor */}
      {[
        { rz: 1.10, indent: 0,   col: Cy(0.9),  w: 0.65 },
        { rz: 1.00, indent: 0.1, col: V(0.85),  w: 0.55 },
        { rz: 0.90, indent: 0.2, col: Pk(0.85), w: 0.70 },
        { rz: 0.80, indent: 0.2, col: Cy(0.8),  w: 0.45 },
        { rz: 0.70, indent: 0.1, col: V(0.8),   w: 0.20 },
      ].map((line, i) => (
        <g key={`rcode-${i}`}>
          <circle cx={ix(4.02, my - 0.008)} cy={iy(4.02, my - 0.008, mz + line.rz)} r={1} fill={W(0.25)} />
          <polygon
            points={poly(
              [4.08 + line.indent, my - 0.005, mz + line.rz - 0.02],
              [4.08 + line.indent + line.w, my - 0.005, mz + line.rz - 0.02],
              [4.08 + line.indent + line.w, my - 0.005, mz + line.rz + 0.025],
              [4.08 + line.indent, my - 0.005, mz + line.rz + 0.025]
            )}
            fill={line.col}
          />
        </g>
      ))}

      {/* Live Connected Architecture Graph on Bottom Right Screen */}
      <polygon points={poly([3.95, my - 0.005, mz + 0.08],[5.75, my - 0.005, mz + 0.08],[5.75, my - 0.005, mz + 0.58],[3.95, my - 0.005, mz + 0.58])} fill="#04030E" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />

      {/* Connected Nodes */}
      {([
        [4.2, 0.45], [4.65, 0.52], [4.65, 0.25], [5.2, 0.45], [5.55, 0.32],
      ] as [number, number][]).map(([nx, nz], i) => (
        <motion.circle
          key={`rnode-${i}`}
          cx={ix(nx, my - 0.008)}
          cy={iy(nx, my - 0.008, mz + nz)}
          r={4}
          fill={Cy(0.95)}
          filter="url(#neonGlowCyan)"
          animate={{ r: [3.5, 5, 3.5] }}
          transition={{ duration: 2 + (i % 2), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <line x1={ix(4.2, my - 0.008)} y1={iy(4.2, my - 0.008, mz + 0.45)} x2={ix(4.65, my - 0.008)} y2={iy(4.65, my - 0.008, mz + 0.52)} stroke={Cy(0.7)} strokeWidth="1" />
      <line x1={ix(4.2, my - 0.008)} y1={iy(4.2, my - 0.008, mz + 0.45)} x2={ix(4.65, my - 0.008)} y2={iy(4.65, my - 0.008, mz + 0.25)} stroke={Cy(0.7)} strokeWidth="1" />
      <line x1={ix(4.65, my - 0.008)} y1={iy(4.65, my - 0.008, mz + 0.52)} x2={ix(5.2, my - 0.008)} y2={iy(5.2, my - 0.008, mz + 0.45)} stroke={V(0.8)} strokeWidth="1" />
      <line x1={ix(5.2, my - 0.008)} y1={iy(5.2, my - 0.008, mz + 0.45)} x2={ix(5.55, my - 0.008)} y2={iy(5.55, my - 0.008, mz + 0.32)} stroke={Pk(0.85)} strokeWidth="1" />

      {/* Stand Base Right */}
      <polygon points={poly([4.7, my, mz + 0.02],[5.0, my, mz + 0.02],[5.0, my + 0.15, mz + 0.02],[4.7, my + 0.15, mz + 0.02])} fill="#141026" />
    </>
  )
}

/* ─── Open Laptop (Foreground IDE View) ───────────────────────────────────── */
function OpenLaptop() {
  const lx1 = 4.1, lx2 = 5.1
  const ly1 = 1.3, ly2 = 2.1
  const lz  = DZ + 0.005
  const lidH = 0.65

  return (
    <>
      <polygon points={poly([lx1, ly1, lz],[lx2, ly1, lz],[lx2, ly2, lz],[lx1, ly2, lz])} fill="#161226" stroke={W(0.1)} strokeWidth="0.5" />
      <polygon points={poly([lx1, ly1, lz],[lx2, ly1, lz],[lx2, ly1, lz + lidH],[lx1, ly1, lz + lidH])} fill="#0D091B" stroke={Cy(0.5)} strokeWidth="0.8" />
      <polygon points={poly([lx1+0.06, ly1-0.002, lz+0.05],[lx2-0.06, ly1-0.002, lz+0.05],[lx2-0.06, ly1-0.002, lz+lidH-0.05],[lx1+0.06, ly1-0.002, lz+lidH-0.05])} fill="url(#screenBg)" />

      {/* Laptop IDE Code Lines */}
      {[0.52, 0.40, 0.28, 0.16].map((rz, i) => (
        <g key={`lapc-${i}`}>
          <polygon
            points={poly([lx1+0.10, ly1-0.005, lz+rz],[lx2-0.12, ly1-0.005, lz+rz],[lx2-0.12, ly1-0.005, lz+rz+0.035],[lx1+0.10, ly1-0.005, lz+rz+0.035])}
            fill={i % 2 === 0 ? Cy(0.85) : V(0.85)}
          />
        </g>
      ))}
    </>
  )
}

/* ─── RGB Keyboard, Notebook, Pen, Sticky Note & Earbuds ─────────────────── */
function DeskObjects() {
  const kx1 = 2.4, kx2 = 4.0
  const ky1 = 1.7, ky2 = 2.4
  const kz  = DZ + 0.01

  return (
    <>
      {/* Desk Mat */}
      <polygon points={poly([2.1, 1.4, DZ + 0.002],[4.8, 1.4, DZ + 0.002],[4.8, 2.7, DZ + 0.002],[2.1, 2.7, DZ + 0.002])} fill="#090712" stroke={Pk(0.3)} strokeWidth="0.8" />

      {/* Keyboard Case */}
      <polygon points={poly([kx1, ky1, kz],[kx2, ky1, kz],[kx2, ky2, kz],[kx1, ky2, kz])} fill="#140E24" stroke={Pk(0.6)} strokeWidth="0.8" />

      {/* RGB Key Grid */}
      {Array.from({ length: 4 }).map((_, ri) => {
        const ry = ky1 + 0.08 + ri * 0.15
        return Array.from({ length: 12 }).map((_, ki) => {
          const kxi = kx1 + 0.1 + ki * (1.4 / 12)
          return (
            <polygon
              key={`key-${ri}-${ki}`}
              points={poly([kxi, ry, kz + 0.015],[kxi + 0.09, ry, kz + 0.015],[kxi + 0.09, ry + 0.1, kz + 0.015],[kxi, ry + 0.1, kz + 0.015])}
              fill={ki % 3 === 0 ? Pk(0.8) : ki % 3 === 1 ? Cy(0.7) : V(0.7)}
            />
          )
        })
      })}

      {/* Added: Small Leather Engineering Notebook & Pen (Left of keyboard) */}
      <g>
        <polygon points={poly([1.5, 1.8, DZ + 0.005],[2.0, 1.8, DZ + 0.005],[2.0, 2.5, DZ + 0.005],[1.5, 2.5, DZ + 0.005])} fill="#241B16" stroke={W(0.2)} strokeWidth="0.6" />
        <line x1={ix(1.75, 1.8)} y1={iy(1.75, 1.8, DZ + 0.007)} x2={ix(1.75, 2.5)} y2={iy(1.75, 2.5, DZ + 0.007)} stroke={Am(0.6)} strokeWidth="1" />
        {/* Metallic Pen */}
        <line x1={ix(2.05, 1.9)} y1={iy(2.05, 1.9, DZ + 0.01)} x2={ix(2.05, 2.4)} y2={iy(2.05, 2.4, DZ + 0.01)} stroke={W(0.8)} strokeWidth="1.8" />
      </g>

      {/* Added: Small Yellow Sticky Note (Beside keyboard right) */}
      <g>
        <polygon points={poly([4.05, 1.5, DZ + 0.005],[4.35, 1.5, DZ + 0.005],[4.35, 1.8, DZ + 0.005],[4.05, 1.8, DZ + 0.005])} fill="#FEF08A" opacity={0.9} />
        <line x1={ix(4.1, 1.6)} y1={iy(4.1, 1.6, DZ + 0.007)} x2={ix(4.3, 1.6)} y2={iy(4.3, 1.6, DZ + 0.007)} stroke="#854D0E" strokeWidth="0.8" />
      </g>

      {/* Added: Wireless Earbuds Case (Matte White) */}
      <g>
        <ellipse cx={ix(4.55, 2.4)} cy={iy(4.55, 2.4, DZ + 0.015)} rx={8} ry={5} fill="#E2E8F0" />
      </g>
    </>
  )
}

/* ─── Realistic Isometric Ceramic Coffee Mug & Smooth Steam ───────────────── */
function CoffeeMug() {
  const mx = 1.9, my = 1.9, mz = DZ
  const cx  = ix(mx, my)
  const cyD = iy(mx, my, mz)
  const cy0 = iy(mx, my, mz + 0.01)
  const cy1 = iy(mx, my, mz + 0.35)
  const rx  = 11
  const ry  = 5.5

  return (
    <>
      {/* 1. Dark Walnut Coaster with Shadow & Bevel */}
      <ellipse cx={cx} cy={cyD + 2} rx={18} ry={9} fill="rgba(0,0,0,0.5)" filter="url(#blur6)" />
      <ellipse cx={cx} cy={cyD} rx={17} ry={8.5} fill="#2A1B14" stroke="#784824" strokeWidth="1" />
      <ellipse cx={cx} cy={cyD - 0.5} rx={15} ry={7.5} fill="#1E120D" />

      {/* 2. Ceramic Mug Handle Loop (Behind Right Wall) */}
      <path
        d={`M ${cx + 10} ${cy1 + 2} Q ${cx + 20} ${(cy1 + cy0) / 2} ${cx + 10} ${cy0 - 2}`}
        fill="none"
        stroke="#D8D4EE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* 3. Smooth Isometric Cylinder Body (Curved Bottom Cap & Wall) */}
      <path
        d={`M ${cx - rx} ${cy1} L ${cx + rx} ${cy1} L ${cx + rx} ${cy0} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy0} Z`}
        fill="#DCD9EC"
        stroke="#B8B4D0"
        strokeWidth="0.5"
      />
      {/* Body Cylinder Highlight */}
      <path
        d={`M ${cx - rx + 2} ${cy1} L ${cx - rx + 6} ${cy1} L ${cx - rx + 6} ${cy0} A ${rx} ${ry} 0 0 1 ${cx - rx + 2} ${cy0} Z`}
        fill="rgba(255,255,255,0.22)"
      />

      {/* 4. Top Ceramic Rim & Espresso Crema Surface */}
      <ellipse cx={cx} cy={cy1} rx={rx} ry={ry} fill="#EBE8F6" stroke="#C2BEE0" strokeWidth="0.8" />
      <ellipse cx={cx} cy={cy1 + 0.5} rx={rx - 1.5} ry={ry - 0.75} fill="#1B0C05" stroke="#7C4C28" strokeWidth="1" />
      <ellipse cx={cx} cy={cy1 + 0.5} rx={rx - 2.5} ry={ry - 1.25} fill="#241209" />

      {/* 5. Smooth Curling Steam Animation Wisps */}
      {[0, 0.8].map((d, i) => (
        <motion.path
          key={i}
          d={`M ${cx - 3 + i * 6} ${cy1 - 2} Q ${cx + 4 - i * 3} ${cy1 - 12} ${cx - 1 + i * 4} ${cy1 - 22}`}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.6, 0], y: [0, -6, -12] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: d, ease: 'easeInOut' }}
        />
      ))}
    </>
  )
}

/* ─── Wireless Headphones ─────────────────────────────────────────────────── */
function Headphones() {
  const hx = 5.5, hy = 2.3, hz = DZ + 0.01

  return (
    <>
      <ellipse cx={ix(hx - 0.18, hy)} cy={iy(hx - 0.18, hy, hz + 0.1)} rx={10} ry={6} fill="#1E1632" stroke={Pk(0.7)} strokeWidth="1" />
      <ellipse cx={ix(hx + 0.18, hy)} cy={iy(hx + 0.18, hy, hz + 0.1)} rx={10} ry={6} fill="#1E1632" stroke={Pk(0.7)} strokeWidth="1" />
      <path
        d={`M ${ix(hx - 0.18, hy)} ${iy(hx - 0.18, hy, hz + 0.15)} Q ${ix(hx, hy)} ${iy(hx, hy, hz + 0.45)} ${ix(hx + 0.18, hy)} ${iy(hx + 0.18, hy, hz + 0.15)}`}
        fill="none"
        stroke="#2A2042"
        strokeWidth="3.5"
      />
    </>
  )
}

/* ─── Plants (Monstera, Snake Plant, Desk Plant) ─────────────────────────── */
function Plants() {
  return (
    <>
      {/* Monstera Plant */}
      <g>
        <polygon points={poly([0.3, 2.7, 0],[0.7, 2.7, 0],[0.7, 2.7, 0.55],[0.3, 2.7, 0.55])} fill="#241932" stroke={Pk(0.4)} strokeWidth="0.8" />
        {[
          { rx: -0.2, ry: -0.1, rz: 0.9, w: 22, h: 12, rot: -30 },
          { rx:  0.2, ry:  0.1, rz: 1.1, w: 24, h: 13, rot:  25 },
          { rx: -0.1, ry:  0.2, rz: 1.3, w: 20, h: 11, rot:  -5 },
          { rx:  0.15, ry: -0.2, rz: 1.4, w: 23, h: 12, rot:  35 },
        ].map((l, i) => (
          <motion.ellipse
            key={i}
            cx={ix(0.5 + l.rx, 2.7 + l.ry)}
            cy={iy(0.5 + l.rx, 2.7 + l.ry, l.rz)}
            rx={l.w} ry={l.h}
            fill="#18521A"
            stroke="#228225"
            strokeWidth="0.8"
            animate={{ rotate: [l.rot - 2, l.rot + 2, l.rot - 2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </g>

      {/* Snake Plant */}
      <g>
        <polygon points={poly([0.3, 1.2, 0],[0.65, 1.2, 0],[0.65, 1.2, 0.45],[0.3, 1.2, 0.45])} fill="#1E142B" />
        {[0.6, 0.8, 1.0, 1.15].map((h, i) => (
          <ellipse
            key={i}
            cx={ix(0.48 + (i % 2) * 0.08, 1.2)}
            cy={iy(0.48 + (i % 2) * 0.08, 1.2, 0.45 + h * 0.5)}
            rx={6} ry={h * 20}
            fill="#1E6B22"
          />
        ))}
      </g>

      {/* Small Desk Plant */}
      <g>
        <polygon points={poly([5.8, 1.0, DZ],[6.1, 1.0, DZ],[6.1, 1.0, DZ + 0.22],[5.8, 1.0, DZ + 0.22])} fill="#281C3D" />
        <ellipse cx={ix(5.95, 1.0)} cy={iy(5.95, 1.0, DZ + 0.35)} rx={14} ry={8} fill="#207824" />
      </g>
    </>
  )
}

/* ─── Ergonomic Chair ────────────────────────────────────────────────────── */
function ErgonomicChair() {
  const cx = 2.8, cy = 4.2, cz = 0.55

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        const rad = (i * 72 * Math.PI) / 180
        const wx = cx + Math.cos(rad) * 0.6
        const wy = cy + Math.sin(rad) * 0.6
        return (
          <line key={`carm-${i}`} x1={ix(cx, cy)} y1={iy(cx, cy, 0.1)} x2={ix(wx, wy)} y2={iy(wx, wy, 0.05)} stroke="#141022" strokeWidth="3.5" />
        )
      })}
      <line x1={ix(cx, cy)} y1={iy(cx, cy, 0.05)} x2={ix(cx, cy)} y2={iy(cx, cy, cz)} stroke="#1E1830" strokeWidth="6" />
      <polygon points={poly([cx - 0.55, cy - 0.4, cz],[cx + 0.55, cy - 0.4, cz],[cx + 0.45, cy + 0.4, cz],[cx - 0.45, cy + 0.4, cz])} fill="#2A2448" stroke={Pk(0.3)} strokeWidth="1" />
      <polygon points={poly([cx - 0.45, cy + 0.35, cz],[cx + 0.45, cy + 0.35, cz],[cx + 0.4, cy + 0.35, cz + 1.25],[cx - 0.4, cy + 0.35, cz + 1.25])} fill="#1D162F" stroke={V(0.6)} strokeWidth="1.2" />
      <ellipse cx={ix(cx, cy + 0.35)} cy={iy(cx, cy + 0.35, cz + 0.45)} rx={20} ry={6} fill="none" stroke={Pk(0.8)} strokeWidth="2" />
    </>
  )
}

/* ─── Bitanya Avatar — Isometric Vector Illustration Style ─────────────── */
/*
 * Coordinates are in ROOM 3D SPACE (rx, ry, rz), projected via poly()/ix()/iy().
 * This matches the exact same art style used for all room furniture.
 * Person sits at chair (2.8, 4.2, 0.55), faces monitors in −y direction.
 * All proportions reduced ~20% relative to the chair to feel human-scale.
 */
function BitanyaAvatar({ isTyping }: { isTyping: boolean }) {
  // ── Flat illustration palette (matches room colour temperature) ──────────
  const SK    = '#C07B52'   // skin main
  const SKD   = '#8F5432'   // skin shadow / side face
  const HAIR  = '#140C06'   // hair near-black
  const HAIRM = '#1E1008'   // hair mid-tone (waves)
  const CLF   = '#1A1828'   // clothing front face (dark navy-black)
  const CLD   = '#0D0B16'   // clothing dark side face
  const CLT   = '#141222'   // clothing top face

  // ── Torso bounding box (room 3D units) ───────────────────────────────────
  const TX1 = 2.52, TX2 = 3.08   // x range (0.56 units wide ≈ 29 px)
  const TFY = 3.85                // front y (faces viewer / camera)
  const TBY = 4.18                // back y
  const TZ0 = 0.80                // torso bottom z
  const TZ1 = 1.30                // torso top / shoulder level z
  const SX1 = 2.44, SX2 = 3.16   // shoulder x (slightly wider than torso)

  // ── Head 3D position ─────────────────────────────────────────────────────
  const HX = 2.80, HY = 3.90, HZ = 1.68  // slightly lower for better seating

  // ── Screen positions derived from 3D coords ───────────────────────────────
  const HCX = ix(HX, HY),         HCY = iy(HX, HY, HZ)          // hair pivot
  const FCX = ix(HX - 0.02, HY - 0.06)                           // face centre x
  const FCY = iy(HX - 0.02, HY - 0.06, HZ)                       // face centre y
  const CRSX = ix(HX, TFY),       CRSY = iy(HX, TFY, 1.34)       // cross pendant

  // ── Arm waypoints (3D) ────────────────────────────────────────────────────
  // Left arm → reaches keyboard (larger x = right side of desk, smaller y = forward)
  // Shoulder attaches at body right side, elbow hangs down-forward, hand on keyboard
  const LSX = TX2 + 0.04, LSY = 4.05, LSZ = 1.24    // left shoulder (on right of torso)
  const LEx = 3.32,       LEy = 3.30, LEz = 0.98    // left elbow (hanging midway)
  const LHx = 3.10,       LHy = 2.20, LHz = 0.97    // left hand on keyboard
  // Right arm → rests on keyboard left side / mouse
  const RSX = TX1 - 0.04, RSY = 4.05, RSZ = 1.24    // right shoulder (on left of torso)
  const REx = 2.44,       REy = 3.30, REz = 0.98    // right elbow (hanging midway)
  const RHx = 2.30,       RHy = 2.20, RHz = 0.97    // right hand on keyboard/mouse

  // Precompute screen positions for key points
  const lsx0 = ix(LSX,LSY), lsy0 = iy(LSX,LSY,LSZ)  // left shoulder screen
  const lex0 = ix(LEx,LEy), ley0 = iy(LEx,LEy,LEz)   // left elbow screen
  const lhx0 = ix(LHx,LHy), lhy0 = iy(LHx,LHy,LHz)  // left hand screen
  const rsx0 = ix(RSX,RSY), rsy0 = iy(RSX,RSY,RSZ)  // right shoulder screen
  const rex0 = ix(REx,REy), rey0 = iy(REx,REy,REz)   // right elbow screen
  const rhx0 = ix(RHx,RHy), rhy0 = iy(RHx,RHy,RHz)  // right hand screen

  return (
    <g id="bitanya-avatar">

      {/* ══════════════════════════════════════════════════════════════════════
          ARMS — drawn first so torso/neck/head render on top
          Drawn as quadratic bezier curves: M shoulder Q elbow hand
          This creates a natural bent-arm posture.
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── LEFT ARM (body's right shoulder → keyboard) ── */}
      {/* Shadow/dark underside of left arm */}
      <path
        d={`M ${lsx0} ${lsy0} Q ${lex0+3} ${ley0+3} ${lhx0} ${lhy0}`}
        stroke={SKD} strokeWidth="10" fill="none" strokeLinecap="round"
      />
      {/* Main arm colour */}
      <path
        d={`M ${lsx0} ${lsy0} Q ${lex0} ${ley0} ${lhx0} ${lhy0}`}
        stroke={SK} strokeWidth="8" fill="none" strokeLinecap="round"
      />
      {/* Left hand on keyboard */}
      <motion.ellipse rx={7} ry={4} fill={SK}
        animate={{ cx: isTyping ? [lhx0, lhx0+2, lhx0] : [lhx0],
                   cy: isTyping ? [lhy0, lhy0-3, lhy0] : [lhy0] }}
        transition={{ duration: 0.28, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── RIGHT ARM (body's left shoulder → mouse/keyboard left side) ── */}
      {/* Shadow underside */}
      <path
        d={`M ${rsx0} ${rsy0} Q ${rex0-3} ${rey0+3} ${rhx0} ${rhy0}`}
        stroke={SKD} strokeWidth="10" fill="none" strokeLinecap="round"
      />
      {/* Main arm */}
      <path
        d={`M ${rsx0} ${rsy0} Q ${rex0} ${rey0} ${rhx0} ${rhy0}`}
        stroke={SK} strokeWidth="8" fill="none" strokeLinecap="round"
      />
      {/* Right hand */}
      <motion.ellipse rx={6} ry={3.5} fill={SK}
        animate={{ cx: isTyping ? [rhx0, rhx0+2, rhx0] : [rhx0],
                   cy: isTyping ? [rhy0, rhy0-1, rhy0] : [rhy0] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* Gold bracelet on right wrist */}
      <ellipse cx={rhx0} cy={rhy0-2} rx={8} ry={3.5}
        fill="none" stroke="#D4A017" strokeWidth="2"
      />
      <circle cx={rhx0+6} cy={rhy0-2} r={1.8} fill="#3D9E6A" />

      {/* ══════════════════════════════════════════════════════════════════════
          LOWER BODY — dark clothing on chair seat (mostly behind desk)
      ══════════════════════════════════════════════════════════════════════ */}
      <polygon points={poly([TX1,TFY,0.55],[TX2,TFY,0.55],[TX2,TFY,TZ0],[TX1,TFY,TZ0])} fill={CLD} />
      <polygon points={poly([TX2,TFY,0.55],[TX2,TBY,0.55],[TX2,TBY,TZ0],[TX2,TFY,TZ0])} fill="#09080F" />

      {/* ══════════════════════════════════════════════════════════════════════
          TORSO — black tank top (isometric flat-shaded box)
      ══════════════════════════════════════════════════════════════════════ */}
      {/* Front face (y = TFY, faces camera) */}
      <polygon points={poly([TX1,TFY,TZ0],[TX2,TFY,TZ0],[TX2,TFY,TZ1],[TX1,TFY,TZ1])} fill={CLF} />
      {/* Right face (x = TX2) */}
      <polygon points={poly([TX2,TFY,TZ0],[TX2,TBY,TZ0],[TX2,TBY,TZ1],[TX2,TFY,TZ1])} fill={CLD} />
      {/* Top face / shoulder platform */}
      <polygon points={poly([TX1,TFY,TZ1],[TX2,TFY,TZ1],[TX2,TBY,TZ1],[TX1,TBY,TZ1])} fill={CLT} />

      {/* ══════════════════════════════════════════════════════════════════════
          SHOULDER SKIN — exposed above spaghetti straps
      ══════════════════════════════════════════════════════════════════════ */}
      {/* Left shoulder front */}
      <polygon points={poly([SX1,TFY,1.22],[TX1,TFY,1.22],[TX1,TFY,TZ1],[SX1,TFY,TZ1])} fill={SK} />
      {/* Left shoulder side */}
      <polygon points={poly([SX1,TFY,1.22],[SX1,3.98,1.22],[SX1,3.98,TZ1],[SX1,TFY,TZ1])} fill={SKD} />
      {/* Right shoulder front */}
      <polygon points={poly([TX2,TFY,1.22],[SX2,TFY,1.22],[SX2,TFY,TZ1],[TX2,TFY,TZ1])} fill={SK} />
      {/* Right shoulder side */}
      <polygon points={poly([SX2,TFY,1.22],[SX2,3.98,1.22],[SX2,3.98,TZ1],[SX2,TFY,TZ1])} fill={SKD} />

      {/* ══════════════════════════════════════════════════════════════════════
          NECK
      ══════════════════════════════════════════════════════════════════════ */}
      <polygon points={poly([2.68,TFY,TZ1],[2.92,TFY,TZ1],[2.92,TFY,1.50],[2.68,TFY,1.50])} fill={SK} />
      <polygon points={poly([2.92,TFY,TZ1],[2.92,4.04,TZ1],[2.92,4.04,1.50],[2.92,TFY,1.50])} fill={SKD} />

      {/* ══════════════════════════════════════════════════════════════════════
          GOLD CROSS NECKLACE
      ══════════════════════════════════════════════════════════════════════ */}
      <path
        d={`M ${ix(TX1+0.08,TFY)} ${iy(TX1+0.08,TFY,1.46)} Q ${CRSX} ${iy(HX,TFY,1.42)} ${ix(TX2-0.08,TFY)} ${iy(TX2-0.08,TFY,1.44)}`}
        fill="none" stroke="#D4A017" strokeWidth="1" strokeLinecap="round" opacity={0.9}
      />
      <line x1={CRSX} y1={CRSY-5} x2={CRSX} y2={CRSY+4} stroke="#D4A017" strokeWidth="1.6" strokeLinecap="round" />
      <line x1={CRSX-3} y1={CRSY-1} x2={CRSX+3} y2={CRSY-1} stroke="#D4A017" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx={CRSX} cy={CRSY-1} r={0.9} fill="#F0C840" opacity={0.72} />

      {/* ══════════════════════════════════════════════════════════════════════
          BREATHING GROUP — gentle 1.5px bob, applied to upper body + head
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.g
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* ── HAIR BACK (rendered before face so hair appears behind it) ── */}
        {/* Main hair mass — large dark ellipse anchored to head center */}
        <ellipse cx={HCX+2} cy={HCY+2} rx={22} ry={15} fill={HAIR} />

        {/* Long cascading left-side waves */}
        <path
          d={`M ${HCX-18} ${HCY-4}
              C ${HCX-28} ${HCY+10} ${HCX-32} ${HCY+26} ${HCX-28} ${HCY+44}
              C ${HCX-22} ${HCY+56} ${HCX-18} ${HCY+64} ${HCX-24} ${HCY+74}`}
          fill="none" stroke={HAIR} strokeWidth="11" strokeLinecap="round"
        />
        {/* Curl end, wave back */}
        <path
          d={`M ${HCX-24} ${HCY+74} C ${HCX-18} ${HCY+80} ${HCX-14} ${HCY+78} ${HCX-20} ${HCY+84}`}
          fill="none" stroke={HAIRM} strokeWidth="7" strokeLinecap="round"
        />
        {/* Right-side hair, shorter */}
        <path
          d={`M ${HCX+18} ${HCY+2} C ${HCX+24} ${HCY+14} ${HCX+24} ${HCY+28} ${HCX+18} ${HCY+40}`}
          fill="none" stroke={HAIR} strokeWidth="8" strokeLinecap="round"
        />

        {/* ── FACE — warm caramel ellipse in 3/4 isometric view ── */}
        <ellipse cx={FCX} cy={FCY} rx={17} ry={12} fill={SK} />
        {/* Jaw / right-side shadow */}
        <ellipse cx={FCX+8} cy={FCY+4} rx={7} ry={5} fill={SKD} opacity={0.30} />
        {/* Forehead highlight */}
        <ellipse cx={FCX+4} cy={FCY-5} rx={8} ry={5} fill="rgba(210,155,108,0.36)" />
        {/* Cheek blush — left */}
        <ellipse cx={FCX-8} cy={FCY+2} rx={5} ry={3.5} fill="rgba(220,100,80,0.25)" />
        {/* Cheek blush — right */}
        <ellipse cx={FCX+8} cy={FCY+1} rx={4} ry={3} fill="rgba(220,100,80,0.19)" />

        {/* ── EYEBROWS — bold dark arch ── */}
        <path d={`M ${FCX-13} ${FCY-6} Q ${FCX-6} ${FCY-10} ${FCX-1} ${FCY-6}`}
          fill="none" stroke="#1E0D05" strokeWidth="2.2" strokeLinecap="round" />
        <path d={`M ${FCX+2} ${FCY-6} Q ${FCX+7} ${FCY-10} ${FCX+11} ${FCY-5}`}
          fill="none" stroke="#1E0D05" strokeWidth="1.9" strokeLinecap="round" />

        {/* ── LEFT EYE — cat-eye liner, blinking ── */}
        <motion.g
          animate={{ scaleY: [1, 0.04, 1] }}
          transition={{ duration: 0.14, repeat: Infinity, repeatDelay: 4.8, ease: 'easeInOut' }}
          style={{ transformOrigin: `${FCX-7}px ${FCY-1}px` }}
        >
          <ellipse cx={FCX-7} cy={FCY-1} rx={5.5} ry={3.8} fill="#F5EDE4" />
          <ellipse cx={FCX-6} cy={FCY-1} rx={3.5} ry={3.5} fill="#6B3D20" />
          <ellipse cx={FCX-6} cy={FCY-1} rx={2} ry={2} fill="#0D0604" />
          <ellipse cx={FCX-4.5} cy={FCY-2.5} rx={1.2} ry={1.2} fill="rgba(255,255,255,0.72)" />
          {/* Upper cat-eye lid */}
          <path d={`M ${FCX-13} ${FCY-1} Q ${FCX-6} ${FCY-7} ${FCX} ${FCY-1}`} fill="#0A0504" stroke="none" />
          {/* Flick */}
          <path d={`M ${FCX} ${FCY-1} L ${FCX+2} ${FCY+1}`} fill="none" stroke="#0A0504" strokeWidth="1.2" strokeLinecap="round" />
        </motion.g>

        {/* ── RIGHT EYE — slightly smaller (3/4 perspective) ── */}
        <motion.g
          animate={{ scaleY: [1, 0.04, 1] }}
          transition={{ duration: 0.14, repeat: Infinity, repeatDelay: 4.8, ease: 'easeInOut', delay: 0.04 }}
          style={{ transformOrigin: `${FCX+9}px ${FCY-1}px` }}
        >
          <ellipse cx={FCX+9} cy={FCY-1} rx={4.5} ry={3.2} fill="#F5EDE4" />
          <ellipse cx={FCX+10} cy={FCY-1} rx={2.8} ry={2.8} fill="#6B3D20" />
          <ellipse cx={FCX+10} cy={FCY-1} rx={1.6} ry={1.6} fill="#0D0604" />
          <ellipse cx={FCX+11.5} cy={FCY-2.5} rx={0.9} ry={0.9} fill="rgba(255,255,255,0.65)" />
          <path d={`M ${FCX+3} ${FCY-1} Q ${FCX+9} ${FCY-6} ${FCX+14} ${FCY-1}`} fill="#0A0504" stroke="none" />
          <path d={`M ${FCX+14} ${FCY-1} L ${FCX+16} ${FCY+1}`} fill="none" stroke="#0A0504" strokeWidth="1.1" strokeLinecap="round" />
        </motion.g>

        {/* ── NOSE — subtle dots ── */}
        <circle cx={FCX} cy={FCY+4} r={0.8} fill="rgba(110,58,28,0.38)" />
        <circle cx={FCX+3} cy={FCY+4} r={0.8} fill="rgba(110,58,28,0.33)" />

        {/* ── LIPS — full rosy smile with white teeth ── */}
        <path d={`M ${FCX-8} ${FCY+7} Q ${FCX-3} ${FCY+5} ${FCX} ${FCY+7} Q ${FCX+3} ${FCY+5} ${FCX+7} ${FCY+7}`}
          fill="#BF4E48" stroke="none" />
        <path d={`M ${FCX-8} ${FCY+7} Q ${FCX} ${FCY+11} ${FCX+7} ${FCY+7}`}
          fill="#D06060" stroke="none" />
        <path d={`M ${FCX-6} ${FCY+7} Q ${FCX} ${FCY+10} ${FCX+5} ${FCY+7}`}
          fill="rgba(255,248,245,0.92)" stroke="none" />

        {/* ── EAR ── */}
        <ellipse cx={FCX-16} cy={FCY+1} rx={3} ry={4.5} fill="#AA6840" />

        {/* ── FLOWER EARRING ── */}
        {[0,60,120,180,240,300].map((deg, i) => (
          <ellipse key={`petal-${i}`}
            cx={FCX-16 + Math.cos(deg*Math.PI/180)*3.5}
            cy={FCY-5  + Math.sin(deg*Math.PI/180)*2.5}
            rx={2.2} ry={1.6} fill="#F4F0EA"
          />
        ))}
        <circle cx={FCX-16} cy={FCY-5} r={2} fill="#F8D95C" />

        {/* ── HAIR FRONT DOME (over face edges) ── */}
        <path
          d={`M ${FCX-16} ${FCY-3}
              C ${FCX-20} ${FCY-16} ${FCX-10} ${FCY-26} ${FCX+2} ${FCY-26}
              C ${FCX+14} ${FCY-26} ${FCX+18} ${FCY-16} ${FCX+16} ${FCY-3}`}
          fill={HAIR}
        />
        {/* Center part */}
        <line x1={FCX+2} y1={FCY-26} x2={FCX+1} y2={FCY-10}
          stroke="#0A0604" strokeWidth="0.8" opacity={0.5} />
        {/* Gloss sheen */}
        <path d={`M ${FCX-4} ${FCY-25} C ${FCX+4} ${FCY-27} ${FCX+10} ${FCY-22} ${FCX+8} ${FCY-14}`}
          fill="rgba(255,255,255,0.08)" stroke="none" />
        {/* Wispy front strand */}
        <path d={`M ${FCX-10} ${FCY-24} C ${FCX-14} ${FCY-14} ${FCX-16} ${FCY-6} ${FCX-15} ${FCY-1}`}
          fill="none" stroke={HAIRM} strokeWidth="2.5" strokeLinecap="round" />

        {/* Monitor screen glow on face */}
        <ellipse cx={FCX-4} cy={FCY} rx={14} ry={10}
          fill={`rgba(34,211,238,${isTyping ? 0.06 : 0.03})`}
          filter="url(#blur12)"
        />
      </motion.g>
    </g>
  )
}


/* ─── Monitor Glow Pulse (synced to typing) ──────────────────────────────── */
function MonitorGlowPulse({ isTyping }: { isTyping: boolean }) {
  return (
    <motion.ellipse
      cx={ix(3.75, MON_Y - 0.1)}
      cy={iy(3.75, MON_Y - 0.1, DZ + 0.5)}
      rx={80} ry={30}
      fill={`rgba(34,211,238,${isTyping ? 0.08 : 0.03})`}
      filter="url(#blur12)"
      animate={{ opacity: isTyping ? [0.5, 1, 0.5] : [0.4, 0.7, 0.4] }}
      transition={{ duration: isTyping ? 0.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ─── Holographic Tooltip Anchors ────────────────────────────────────────── */
const ITEM_TOOLTIPS: Record<string, { label: string; cx: number; cy: number }> = {
  glassboard: { label: '📋 Glass Architecture Board',cx: ix(5.0, 0),    cy: iy(5.0, 0, 2.8) - 10 },
  bookshelf:  { label: '📚 Engineering Library', cx: ix(2.2, 0.1),  cy: iy(2.2, 0.1, 3.8) - 15 },
  plant:      { label: '🪴 Workspace Plants',      cx: ix(0.5, 2.7),  cy: iy(0.5, 2.7, 1.4) - 15 },
  laptop:     { label: '💻 Dev Laptop',           cx: ix(4.6, 1.7),  cy: iy(4.6, 1.7, DZ + 0.65) - 15 },
  coffee:     { label: '☕ Espresso Fuel',         cx: ix(1.9, 1.9),  cy: iy(1.9, 1.9, DZ + 0.4) - 15 },
  headphones: { label: '🎧 ANC Headphones',       cx: ix(5.5, 2.3),  cy: iy(5.5, 2.3, DZ + 0.4) - 15 },
  monitors:   { label: '🖥️ Dual Engineering Displays', cx: ix(3.7, 0.75), cy: iy(3.7, 0.75, DZ + MON_H) - 18 },
  keyboard:   { label: '⌨️ Mechanical Keyboard',  cx: ix(3.2, 2.0),  cy: iy(3.2, 2.0, DZ + 0.2) + 20 },
}

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export default function IsometricScene({ onSelectItem }: { onSelectItem?: (id: string) => void }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Bitanya working cycle: idle → typing → pause → mouse → reading → repeat
  const [isTyping, setIsTyping] = useState(false)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const cycle = () => {
      // Wait 8–12 seconds before next cycle
      const waitTime = 8000 + Math.random() * 4000
      timeoutId = setTimeout(() => {
        setIsTyping(true)
        // Type for 2–4 seconds
        const typeTime = 2000 + Math.random() * 2000
        timeoutId = setTimeout(() => {
          setIsTyping(false)
          // Pause, then repeat
          cycle()
        }, typeTime)
      }, waitTime)
    }
    cycle()
    return () => clearTimeout(timeoutId)
  }, [])

  const activeTooltip = hoveredItem ? ITEM_TOOLTIPS[hoveredItem] : null

  return (
    <svg
      viewBox="0 0 960 640"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Isometric cybernetic developer workspace"
      role="img"
    >
      <Defs />

      {/* Background Fill */}
      <rect width={960} height={640} fill="#06040C" />

      {/* 1. Floor & Area Rug */}
      <Floor />

      {/* 2. Window Wall & Single Framed Quote */}
      <WallLeft />

      {/* 3. Night Sky (Moon, Skyline, Cyan Laser, Twinkling Stars & Shooting Star) */}
      <NightSky />

      {/* 4. Right Wall (Acoustic Wood Slats, Pink Neon Strip & Glass Board) */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('glassboard')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('hologram')}
      >
        <WallRight />
      </g>

      {/* 5. Bookshelf with Warm Under-glow LED */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('bookshelf')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('bookshelf')}
      >
        <Bookshelf />
      </g>

      {/* 6. Plants */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('plant')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('plant')}
      >
        <Plants />
      </g>

      {/* 7. Dark Glass Top Desk */}
      <GlassDesk />

      {/* 8. Ultra-wide Curved Dual Monitors */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('monitors')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('monitors')}
      >
        <CurvedMonitors />
      </g>

      {/* 9. Open Laptop */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('laptop')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('laptop')}
      >
        <OpenLaptop />
      </g>

      {/* 10. RGB Mechanical Keyboard & Natural Desk Objects */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('keyboard')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('keyboard')}
      >
        <DeskObjects />
      </g>

      {/* 11. Coffee Mug */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('coffee')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('coffee')}
      >
        <CoffeeMug />
      </g>

      {/* 12. Wireless Headphones */}
      <g
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredItem('headphones')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.('headphones')}
      >
        <Headphones />
      </g>

      {/* 13. Ergonomic Chair */}
      <ErgonomicChair />

      {/* 14. Bitanya Avatar — seated in chair, behind desk edge */}
      <BitanyaAvatar isTyping={isTyping} />

      {/* 14b. Monitor glow pulse synced to typing */}
      <MonitorGlowPulse isTyping={isTyping} />

      {/* 15. Holographic Tooltip Badge on Hover */}
      {activeTooltip && (
        <g style={{ pointerEvents: 'none' }}>
          <circle
            cx={activeTooltip.cx}
            cy={activeTooltip.cy + 8}
            r={5}
            fill="none"
            stroke="#22D3EE"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <rect
            x={activeTooltip.cx - 90}
            y={activeTooltip.cy - 22}
            width={180}
            height={26}
            rx={6}
            fill="rgba(18, 14, 30, 0.95)"
            stroke="rgba(34, 211, 238, 0.7)"
            strokeWidth="1"
          />
          <text
            x={activeTooltip.cx}
            y={activeTooltip.cy - 5}
            textAnchor="middle"
            fill="#F8F7FF"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            {activeTooltip.label}
          </text>
        </g>
      )}

      {/* 16. Vignette & Cyberpunk Ambient Tint */}
      <rect width={960} height={640} fill="url(#vignette)" pointerEvents="none" />
      <rect width={960} height={640} fill={V(0.04)} pointerEvents="none" />
    </svg>
  )
}

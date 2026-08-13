import { motion } from 'framer-motion'
import { useParallax } from './ParallaxProvider'

/*
  Desk.tsx — Sprint 2: Workspace Furniture
  All objects visible, correct colours, nothing clips.
  Positions tuned to 16/10 scene aspect ratio.
*/

const WALNUT      = 'linear-gradient(180deg,#2E2218 0%,#221A10 55%,#1A1208 100%)'
const WALNUT_EDGE = '#110D06'
const ALUMINIUM   = 'linear-gradient(160deg,#1A1820 0%,#111018 60%,#0C0A12 100%)'
const SCREEN_BG   = 'linear-gradient(170deg,#07051A 0%,#0B0920 100%)'

const G = {
  cyan:   (a: number) => `rgba(34,211,238,${a})`,
  amber:  (a: number) => `rgba(245,158,11,${a})`,
  violet: (a: number) => `rgba(139,92,246,${a})`,
  pink:   (a: number) => `rgba(236,72,153,${a})`,
  white:  (a: number) => `rgba(255,255,255,${a})`,
}

/* ── MONITOR ── */
function Monitor() {
  const LINES = [
    { y:'11%', w:'38%', c:G.violet(0.55), i:'8%'  },
    { y:'21%', w:'62%', c:G.cyan(0.45),   i:'12%' },
    { y:'31%', w:'28%', c:G.violet(0.50), i:'12%' },
    { y:'41%', w:'70%', c:G.white(0.15),  i:'16%' },
    { y:'51%', w:'55%', c:G.cyan(0.42),   i:'16%' },
    { y:'61%', w:'32%', c:G.violet(0.50), i:'12%' },
    { y:'71%', w:'58%', c:G.white(0.14),  i:'12%' },
    { y:'81%', w:'42%', c:G.cyan(0.40),   i:'8%'  },
  ]
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      {/* Bezel */}
      <div style={{
        position:'absolute', inset:0,
        background: ALUMINIUM,
        borderRadius:'6px 6px 0 0',
        border:`1.5px solid ${G.white(0.08)}`,
        borderBottom:'none',
        boxShadow:`0 0 0 1px ${G.violet(0.10)} inset`,
      }}>
        {/* Screen */}
        <div style={{
          position:'absolute', top:3, left:3, right:3, bottom:3,
          borderRadius:4, background: SCREEN_BG, overflow:'hidden',
          boxShadow:`inset 0 0 36px ${G.violet(0.08)}`,
        }}>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', background:`linear-gradient(0deg,${G.violet(0.06)},transparent)` }} />
          {/* Status bar */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'8%', background:G.white(0.03), display:'flex', alignItems:'center', padding:'0 6%', gap:'2%' }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:G.violet(0.7) }} />
            <div style={{ flex:1, height:2, borderRadius:1, background:G.white(0.06) }} />
            <div style={{ width:'12%', height:2, borderRadius:1, background:G.white(0.08) }} />
          </div>
          {/* Sidebar */}
          <div style={{ position:'absolute', top:'8%', bottom:0, left:0, width:'6%', background:G.white(0.02), borderRight:`1px solid ${G.white(0.04)}` }}>
            {[22,38,54,70,86].map(t=><div key={t} style={{ position:'absolute', top:`${t}%`, left:'20%', right:'20%', height:3, borderRadius:2, background:G.violet(0.35) }} />)}
          </div>
          {/* Code lines */}
          {LINES.map((l,i)=>(
            <div key={i} style={{ position:'absolute', top:l.y, left:l.i, width:l.w, height:2.5, borderRadius:2, background:l.c }} />
          ))}
          {/* Cursor */}
          <motion.div style={{ position:'absolute', top:'51%', left:'12%', width:1.5, height:8, borderRadius:1, background:G.violet(0.9) }}
            animate={{ opacity:[1,0,1] }} transition={{ duration:1.1, repeat:Infinity }} />
          {/* Screen sheen */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.025) 0%,transparent 40%)', pointerEvents:'none' }} />
        </div>
        {/* Top highlight */}
        <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:G.white(0.14), borderRadius:1 }} />
      </div>
      {/* Stand neck */}
      <div style={{ position:'absolute', bottom:-15, left:'50%', transform:'translateX(-50%)', width:8, height:16, background:'linear-gradient(180deg,#2C2840,#1A1626)' }} />
      {/* Stand base */}
      <div style={{ position:'absolute', bottom:-24, left:'50%', transform:'translateX(-50%)', width:'40%', height:9, background:'linear-gradient(180deg,#2A2640,#1C1828)', borderRadius:'0 0 8px 8px', boxShadow:`0 4px 10px rgba(0,0,0,0.5), 0 1px 0 ${G.white(0.06)} inset` }} />
      {/* Glow spill */}
      <div style={{ position:'absolute', bottom:-28, left:'-15%', right:'-15%', height:22, background:`radial-gradient(ellipse at 50% 0%,${G.violet(0.10)} 0%,transparent 70%)`, filter:'blur(6px)', pointerEvents:'none' }} />
    </div>
  )
}

/* ── KEYBOARD ── */
function Keyboard() {
  const ROWS = [
    { keys:14, lp:'3%',  rp:'3%',  top:'8%',  h:'18%' },
    { keys:13, lp:'5%',  rp:'3%',  top:'30%', h:'18%' },
    { keys:11, lp:'7%',  rp:'4%',  top:'52%', h:'18%' },
    { keys:9,  lp:'11%', rp:'11%', top:'74%', h:'16%' },
  ]
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(180deg,#1A1728 0%,#0F0D18 100%)',
        borderRadius:6, border:`1px solid ${G.violet(0.22)}`,
        boxShadow:`0 4px 18px rgba(0,0,0,0.55), 0 1px 0 ${G.white(0.06)} inset, 0 0 16px ${G.violet(0.09)}`,
      }}>
        {/* RGB strip */}
        <motion.div style={{ position:'absolute', bottom:0, left:'10%', right:'10%', height:2, borderRadius:1, background:`linear-gradient(90deg,${G.violet(0.7)},${G.violet(0.5)},${G.violet(0.7)})` }}
          animate={{ opacity:[0.45,0.9,0.45] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }} />
        {/* Keys */}
        {ROWS.map((row,ri)=>(
          <div key={ri} style={{ position:'absolute', top:row.top, left:row.lp, right:row.rp, height:row.h, display:'flex', gap:'2.5%' }}>
            {Array.from({length:row.keys}).map((_,ki)=>(
              <div key={ki} style={{
                flex:1, height:'100%',
                background:`linear-gradient(180deg,${G.violet(0.16 + (ki%3)*0.04)},rgba(10,8,22,0.9))`,
                border:`0.5px solid ${G.violet(0.16)}`, borderRadius:2,
                boxShadow:`0 1px 0 ${G.white(0.04)} inset`,
              }} />
            ))}
          </div>
        ))}
        {/* Space bar */}
        <div style={{ position:'absolute', bottom:'10%', left:'28%', right:'28%', height:'12%', background:`linear-gradient(180deg,${G.violet(0.18)},rgba(10,8,22,0.9))`, border:`0.5px solid ${G.violet(0.22)}`, borderRadius:3 }} />
      </div>
    </div>
  )
}

/* ── MOUSE ── */
function Mouse() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(155deg,#252038 0%,#181525 55%,#0F0D1A 100%)',
        borderRadius:'48% 48% 38% 38% / 58% 58% 42% 42%',
        border:`1px solid ${G.white(0.08)}`,
        boxShadow:`0 6px 16px rgba(0,0,0,0.5), 0 1px 0 ${G.white(0.08)} inset, 0 0 12px ${G.violet(0.09)}`,
      }}>
        <div style={{ position:'absolute', top:'8%', bottom:'35%', left:'50%', transform:'translateX(-50%)', width:1, background:G.white(0.07) }} />
        <div style={{ position:'absolute', top:'18%', left:'50%', transform:'translateX(-50%)', width:'20%', height:'26%', background:'linear-gradient(180deg,#2A2640,#1A1828)', borderRadius:3, border:`1px solid ${G.white(0.10)}` }}>
          {[25,50,75].map(t=><div key={t} style={{ position:'absolute', top:`${t}%`, left:'10%', right:'10%', height:1, background:G.white(0.15) }} />)}
        </div>
      </div>
    </div>
  )
}

/* ── COFFEE MUG ── */
function Coffee() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      {/* Steam */}
      {[{l:'22%',d:0},{l:'50%',d:0.7},{l:'76%',d:1.4}].map(({l,d},i)=>(
        <motion.div key={i} style={{ position:'absolute', top:'-26%', left:l, width:2, height:'26%', borderRadius:4, background:'linear-gradient(180deg,transparent,rgba(220,215,255,0.28),transparent)', transformOrigin:'bottom center' }}
          animate={{ y:[0,-10,0], opacity:[0,0.5,0], scaleX:[1,1.4,1] }}
          transition={{ duration:2.2, repeat:Infinity, delay:d, ease:'easeInOut' }} />
      ))}
      {/* Body */}
      <div style={{
        position:'absolute', bottom:0, left:'8%', right:'8%', top:'18%',
        background:'linear-gradient(160deg,#D8D4EE 0%,#C0BCDC 100%)',
        borderRadius:'3px 3px 7px 7px',
        boxShadow:`2px 0 0 ${G.white(0.3)} inset, -1px 0 0 rgba(0,0,0,0.15) inset, 0 6px 12px rgba(0,0,0,0.4)`,
      }}>
        <div style={{ position:'absolute', top:3, left:3, right:3, height:5, borderRadius:3, background:'linear-gradient(180deg,#4A2E14,#3A2010)' }} />
        <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:2, background:G.white(0.6), borderRadius:1 }} />
        <div style={{ position:'absolute', top:'20%', left:'8%', width:'18%', bottom:'15%', background:'linear-gradient(180deg,rgba(255,255,255,0.2),transparent)', borderRadius:2 }} />
      </div>
      {/* Handle */}
      <div style={{ position:'absolute', right:'-14%', top:'32%', width:'28%', height:'38%', border:'3px solid #B8B2D4', borderLeft:'none', borderRadius:'0 10px 10px 0' }} />
      {/* Base */}
      <div style={{ position:'absolute', bottom:0, left:'4%', right:'4%', height:3, background:'linear-gradient(180deg,#C0BAD8,#A8A2C2)', borderRadius:'0 0 6px 6px' }} />
    </div>
  )
}

/* ── DESK LAMP ── */
function Lamp() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      {/* Base */}
      <div style={{ position:'absolute', bottom:0, left:'15%', right:'15%', height:'8%', background:'linear-gradient(180deg,#2A2640,#1A1628)', borderRadius:4, boxShadow:'0 4px 10px rgba(0,0,0,0.5)' }} />
      {/* Stem */}
      <div style={{ position:'absolute', bottom:'8%', left:'50%', transform:'translateX(-50%)', width:5, height:'52%', background:'linear-gradient(90deg,#3D3558,#2B2443,#1E1A30)', borderRadius:3 }} />
      {/* Arm */}
      <div style={{ position:'absolute', top:'18%', left:'18%', width:'66%', height:5, background:'linear-gradient(90deg,#3D3558,#2B2443)', borderRadius:3, transform:'rotate(-8deg)', transformOrigin:'right center' }} />
      {/* Head */}
      <div style={{ position:'absolute', top:'4%', left:'6%', width:'66%', height:'20%', background:'linear-gradient(160deg,#38304C,#28243A)', borderRadius:'50% 50% 38% 38% / 60% 60% 40% 40%', border:`1px solid ${G.white(0.08)}` }}>
        {/* Bulb */}
        <motion.div style={{ position:'absolute', bottom:'12%', left:'52%', transform:'translateX(-50%)', width:7, height:7, borderRadius:'50%', background:'#FEF3C7' }}
          animate={{ boxShadow:['0 0 8px rgba(245,158,11,0.7),0 0 20px rgba(245,158,11,0.3)','0 0 14px rgba(245,158,11,1.0),0 0 36px rgba(245,158,11,0.5)','0 0 8px rgba(245,158,11,0.7),0 0 20px rgba(245,158,11,0.3)'] }}
          transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }} />
      </div>
      {/* Warm cone */}
      <motion.div style={{ position:'absolute', top:'22%', left:'-18%', right:'-18%', height:'55%', background:`radial-gradient(ellipse at 42% 0%,${G.amber(0.12)} 0%,transparent 65%)`, filter:'blur(8px)', pointerEvents:'none' }}
        animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }} />
    </div>
  )
}

/* ── PHONE ── */
function Phone() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(155deg,#1C1828 0%,#0E0C18 100%)',
        borderRadius:10,
        border:`1px solid ${G.white(0.10)}`,
        boxShadow:`0 8px 18px rgba(0,0,0,0.55), 2px 0 0 ${G.white(0.06)} inset`,
      }}>
        {/* Notch */}
        <div style={{ position:'absolute', top:'4%', left:'50%', transform:'translateX(-50%)', width:'22%', height:'4%', background:'#0A0814', borderRadius:4 }}>
          <div style={{ position:'absolute', top:'15%', left:'50%', transform:'translateX(-50%)', width:'35%', aspectRatio:'1', borderRadius:'50%', background:'#1A1628', border:`1px solid ${G.white(0.06)}` }} />
        </div>
        {/* Screen off */}
        <div style={{ position:'absolute', top:'8%', left:'6%', right:'6%', bottom:'8%', background:'linear-gradient(155deg,#0E0C1A,#08060F)', borderRadius:8, overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-10%', left:'-10%', width:'60%', height:'40%', background:`radial-gradient(ellipse,${G.violet(0.06)} 0%,transparent 70%)`, transform:'rotate(-25deg)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.025) 0%,transparent 35%)' }} />
        </div>
        {/* Side button */}
        <div style={{ position:'absolute', right:-2, top:'28%', width:2, height:'14%', background:G.white(0.12), borderRadius:'0 2px 2px 0' }} />
        {/* Volume */}
        {['22%','36%'].map((t,i)=><div key={i} style={{ position:'absolute', left:-2, top:t, width:2, height:'10%', background:G.white(0.10), borderRadius:'2px 0 0 2px' }} />)}
        {/* Top edge highlight */}
        <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:G.white(0.15), borderRadius:1 }} />
      </div>
    </div>
  )
}

/* ── NOTEBOOK ── */
function Notebook() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(155deg,#161224,#0E0C18)', borderRadius:4, border:`1px solid ${G.white(0.08)}`, boxShadow:'3px 4px 16px rgba(0,0,0,0.5)' }}>
        <div style={{ position:'absolute', top:0, bottom:0, left:0, width:'13%', background:'linear-gradient(180deg,#1E1830,#161224)', borderRadius:'4px 0 0 4px', borderRight:`1px solid ${G.violet(0.15)}` }}>
          {[20,40,60,80].map(t=><div key={t} style={{ position:'absolute', top:`${t}%`, left:'15%', right:'15%', height:1, background:G.violet(0.25) }} />)}
        </div>
        {[22,36,50,64,78].map(t=><div key={t} style={{ position:'absolute', top:`${t}%`, left:'20%', right:'6%', height:1, background:G.white(0.06) }} />)}
        <div style={{ position:'absolute', bottom:0, right:0, width:'14%', height:'16%', background:'linear-gradient(225deg,#1A1628 50%,transparent 50%)' }} />
      </div>
    </div>
  )
}

/* ── STICKY NOTES ── */
function StickyNotes() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div style={{ position:'absolute', inset:3, background:'linear-gradient(160deg,#FEF08A,#FDE047)', borderRadius:3, transform:'rotate(6deg)', boxShadow:'1px 2px 6px rgba(0,0,0,0.35)', opacity:0.7 }} />
      <div style={{ position:'absolute', inset:3, background:'linear-gradient(160deg,#FEF3C7,#FDE68A)', borderRadius:3, transform:'rotate(-2deg)', boxShadow:'1px 3px 8px rgba(0,0,0,0.4)' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'16%', background:'rgba(245,208,11,0.55)', borderRadius:'3px 3px 0 0' }} />
        {[38,58,76].map(t=><div key={t} style={{ position:'absolute', top:`${t}%`, left:'12%', right:'12%', height:1.5, background:'rgba(100,80,0,0.25)', borderRadius:1 }} />)}
      </div>
    </div>
  )
}

/* ── SHELF BOOKS ── */
const BOOK_DEFS = [
  { w:18, h:62, body:'#1A2A4A', spine:'#0F1E36', acc:G.cyan(0.5)   },
  { w:14, h:54, body:'#3A1540', spine:'#2A0E2E', acc:G.violet(0.6) },
  { w:22, h:68, body:'#0D2E1A', spine:'#092212', acc:'rgba(16,185,129,0.7)' },
  { w:16, h:58, body:'#2D1A08', spine:'#1E1006', acc:G.amber(0.7)  },
  { w:20, h:64, body:'#1A1040', spine:'#110A2C', acc:G.violet(0.6) },
  { w:17, h:50, body:'#3A1020', spine:'#280A16', acc:G.pink(0.6)   },
  { w:15, h:60, body:'#0E2236', spine:'#091622', acc:G.cyan(0.5)   },
]

function Book({ w, h, body, spine, acc }: typeof BOOK_DEFS[0]) {
  return (
    <div style={{ width:w, height:h, flexShrink:0, position:'relative', boxShadow:'1px 2px 8px rgba(0,0,0,0.55)' }}>
      <div style={{ position:'absolute', top:0, bottom:0, left:0, width:4, background:`linear-gradient(90deg,${spine},${body}CC)`, borderRadius:'1px 0 0 1px' }} />
      <div style={{ position:'absolute', top:0, bottom:0, left:4, right:0, background:`linear-gradient(180deg,${body},${spine})`, borderRadius:'0 1px 1px 0' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'rgba(255,255,255,0.12)' }} />
        <div style={{ position:'absolute', top:'14%', left:'14%', right:'14%', height:4, background:acc, borderRadius:1, opacity:0.65 }} />
      </div>
    </div>
  )
}

/* ── DESK PLANT ── */
function DeskPlant() {
  return (
    <motion.div style={{ position:'relative', width:34, height:68, flexShrink:0 }}
      animate={{ rotate:[-0.8,0.8,-0.8] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}>
      {/* Pot */}
      <div style={{ position:'absolute', bottom:0, left:'15%', right:'15%', height:'30%', background:'linear-gradient(160deg,#3A1E0E,#251408)', borderRadius:'2px 2px 5px 5px', border:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:4, background:'#1A0E06', borderRadius:2 }} />
      </div>
      {/* Stem */}
      <div style={{ position:'absolute', bottom:'28%', left:'50%', transform:'translateX(-50%)', width:3, height:'44%', background:'linear-gradient(180deg,#2D5A1B,#1E3E10)', borderRadius:2 }} />
      {/* Leaves */}
      {[
        { r:-35, x:'-30%', y:'6%',  w:22, h:16, c:'#1E5C14' },
        { r: 28, x: '10%', y:'3%',  w:24, h:17, c:'#247A18' },
        { r:-18, x:'-24%', y:'26%', w:20, h:14, c:'#1A5010' },
        { r: 42, x:  '8%', y:'22%', w:20, h:14, c:'#1E6615' },
      ].map((l,i)=>(
        <div key={i} style={{ position:'absolute', top:l.y, left:l.x, width:l.w, height:l.h, background:`linear-gradient(135deg,${l.c},#0E3008)`, borderRadius:'50% 50% 40% 40% / 60% 60% 40% 40%', transform:`rotate(${l.r}deg)`, boxShadow:'0 2px 6px rgba(0,0,0,0.4)', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'40%', left:'15%', right:'15%', height:1, background:'rgba(255,255,255,0.12)' }} />
          <div style={{ position:'absolute', bottom:'10%', left:'42%', width:2, height:'40%', background:'rgba(0,0,0,0.4)' }} />
        </div>
      ))}
    </motion.div>
  )
}

/* ── FLOATING SHELF ── */
function Shelf({ offset }: { offset: { x: number; y: number } }) {
  return (
    <motion.div aria-hidden="true"
      style={{ position:'absolute', top:'48%', right:'5%', width:'min(26%,240px)', zIndex:4 }}
      animate={{ x:offset.x, y:offset.y }}
      transition={{ type:'spring', stiffness:60, damping:20, mass:0.8 }}>
      {/* Books + plant row */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:2, padding:'0 6px' }}>
        {BOOK_DEFS.slice(0,3).map((b,i)=><Book key={i} {...b} />)}
        <DeskPlant />
        {BOOK_DEFS.slice(3).map((b,i)=><Book key={i+3} {...b} />)}
      </div>
      {/* Shelf board — dark walnut */}
      <div style={{ width:'100%', height:10, background:WALNUT, borderRadius:3, boxShadow:`0 6px 18px rgba(0,0,0,0.6), 0 1px 0 ${G.white(0.06)} inset` }}>
        {[22,50,76].map(l=><div key={l} style={{ position:'absolute', top:2, left:`${l}%`, width:'8%', height:1, background:'rgba(0,0,0,0.2)', borderRadius:1 }} />)}
      </div>
      {/* Brackets */}
      {['10%','84%'].map((left,i)=>(
        <div key={i} style={{ position:'absolute', top:'100%', left, width:6, height:14, background:'linear-gradient(180deg,#2A2240,#1A1628)', borderRadius:'0 0 2px 2px' }} />
      ))}
      {/* Wall shadow */}
      <div style={{ position:'absolute', top:'100%', left:'-4%', right:'-4%', height:8, background:'radial-gradient(ellipse at center,rgba(0,0,0,0.3) 0%,transparent 70%)', filter:'blur(4px)' }} />
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════ */
export default function Desk() {
  const { getOffset } = useParallax()
  const shelfP = getOffset(0.30)
  const deskP  = getOffset(0.55)
  const frontP = getOffset(0.80)

  return (
    <>
      {/* ── LAYER 4 — SHELF ── */}
      <Shelf offset={shelfP} />

      {/* ── LAYER 5 — DESK ── */}
      <motion.div aria-hidden="true"
        style={{ position:'absolute', bottom:'8%', left:'0%', right:'2%', zIndex:5 }}
        animate={{ x:deskP.x, y:deskP.y }}
        transition={{ type:'spring', stiffness:60, damping:20, mass:0.8 }}>
        <div style={{ position:'relative' }}>

          {/* Surface — dark walnut */}
          <div style={{
            width:'100%', height:'clamp(110px,14vw,160px)',
            background: WALNUT,
            borderRadius:'12px 12px 0 0',
            border:`1px solid ${G.white(0.07)}`, borderBottom:'none',
            boxShadow:`0 -8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${G.white(0.07)}`,
            position:'relative', overflow:'visible',
          }}>
            {/* Wood grain */}
            {[12,28,44,60,76,90].map(l=>(
              <div key={l} style={{ position:'absolute', top:0, bottom:0, left:`${l}%`, width:'5%', background:'linear-gradient(180deg,transparent,rgba(0,0,0,0.05),transparent)', pointerEvents:'none' }} />
            ))}
            {/* Top edge glow */}
            <div style={{ position:'absolute', top:0, left:'5%', right:'5%', height:1, background:`linear-gradient(90deg,transparent,${G.violet(0.35)},${G.violet(0.20)},transparent)` }} />
            {/* Monitor glow pool */}
            <div style={{ position:'absolute', top:0, left:'14%', right:'24%', height:'100%', background:`radial-gradient(ellipse at 50% 0%,${G.violet(0.07)} 0%,transparent 70%)`, pointerEvents:'none' }} />
            {/* Lamp warm pool */}
            <div style={{ position:'absolute', top:0, right:'0%', width:'20%', height:'100%', background:`radial-gradient(ellipse at 60% 0%,${G.amber(0.10)} 0%,transparent 70%)`, pointerEvents:'none' }} />

            {/* AVATAR placeholder — far left */}
            <div data-placeholder="avatar" style={{
              position:'absolute', left:'1%', bottom:0,
              width:'clamp(44px,9%,72px)', height:'115%',
              border:`1px dashed ${G.pink(0.28)}`, borderRadius:8,
              background:G.pink(0.03),
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:7, color:G.pink(0.38), textTransform:'uppercase', letterSpacing:'0.08em', writingMode:'vertical-rl' }}>avatar</span>
            </div>
            <div style={{ position:'absolute', left:'30%', right:'14%', bottom:0, height:'clamp(90px,72%,118px)' }}>
              <Monitor />
            </div>

            {/* KEYBOARD — centred under monitor */}
            <div style={{ position:'absolute', left:'32%', right:'20%', bottom:'8%', height:'clamp(14px,12%,20px)' }}>
              <Keyboard />
            </div>

            {/* MOUSE — right of keyboard */}
            <div style={{ position:'absolute', right:'13%', bottom:'6%', width:'clamp(20px,3.5%,30px)', height:'clamp(26px,15%,36px)' }}>
              <Mouse />
            </div>

            {/* NOTEBOOK — far left, leaning against avatar zone */}
            <div style={{ position:'absolute', left:'7%', bottom:'4%', width:'clamp(32px,7%,52px)', height:'clamp(26px,20%,34px)' }}>
              <Notebook />
            </div>

            {/* STICKY NOTES — beside monitor right */}
            <div style={{ position:'absolute', right:'15%', bottom:'46%', width:'clamp(20px,4%,30px)', height:'clamp(20px,4%,30px)' }}>
              <StickyNotes />
            </div>

            {/* COFFEE — right area */}
            <div style={{ position:'absolute', right:'6%', bottom:'5%', width:'clamp(16px,3.5%,26px)', height:'clamp(28px,22%,38px)' }}>
              <Coffee />
            </div>

            {/* LAMP — far right */}
            <div style={{ position:'absolute', right:'1%', bottom:0, width:'clamp(26px,5%,42px)', height:'clamp(68px,70%,100px)' }}>
              <Lamp />
            </div>

            {/* PHONE — left of monitor */}
            <div style={{ position:'absolute', left:'24%', bottom:'5%', width:'clamp(14px,2.8%,22px)', height:'clamp(28px,28%,44px)' }}>
              <Phone />
            </div>

            {/* MINAC placeholder — above right area */}
            <div data-placeholder="minac" style={{
              position:'absolute', right:'12%', bottom:'75%',
              width:'clamp(22px,3.5%,32px)', height:'clamp(22px,3.5%,32px)',
              border:`1px dashed ${G.violet(0.38)}`, borderRadius:'50%',
              background:G.violet(0.05),
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:6, color:G.violet(0.42), textTransform:'uppercase' }}>m</span>
            </div>
          </div>

          {/* Front edge */}
          <div style={{ width:'100%', height:'clamp(8px,1.4vw,14px)', background:WALNUT_EDGE, borderRadius:'0 0 6px 6px', boxShadow:'0 6px 24px rgba(0,0,0,0.65)' }} />

          {/* Legs */}
          <div style={{ display:'flex', justifyContent:'space-between', padding:'0 6%' }}>
            {[0,1].map(i=>(
              <div key={i} style={{ width:'clamp(7px,1%,12px)', height:'clamp(16px,2.8vw,30px)', background:'linear-gradient(180deg,#2A2438,#0E0B18)', borderRadius:'0 0 3px 3px' }} />
            ))}
          </div>

          {/* Floor shadow */}
          <div style={{ marginTop:2, marginInline:'4%', height:14, background:'radial-gradient(ellipse at center,rgba(0,0,0,0.65) 0%,transparent 72%)', filter:'blur(6px)' }} />
        </div>
      </motion.div>

      {/* ── LAYER 6 — VIGNETTE ── */}
      <motion.div aria-hidden="true"
        style={{ position:'absolute', bottom:0, left:0, right:0, height:'13%', background:'linear-gradient(0deg,#0E0B18 0%,transparent 100%)', zIndex:6, pointerEvents:'none' }}
        animate={{ x:frontP.x * 0.3 }}
        transition={{ type:'spring', stiffness:60, damping:20, mass:0.8 }} />
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:6, pointerEvents:'none', background:'radial-gradient(ellipse at 62% 72%,transparent 42%,rgba(14,11,24,0.62) 100%)' }} />
    </>
  )
}

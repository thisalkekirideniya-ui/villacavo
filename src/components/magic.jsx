import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useSpring,
} from 'framer-motion'
import { scrollToTop } from '../lib/scroll'

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------------
 * Custom cursor — terracotta dot + trailing ring that grows over links.
 * Add data-cursor="View" to any element to show a label inside the ring.
 * --------------------------------------------------------------------- */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(null) // null = idle, '' = interactive, 'Text' = labelled
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dx = useSpring(x, { stiffness: 900, damping: 50 })
  const dy = useSpring(y, { stiffness: 900, damping: 50 })
  const rx = useSpring(x, { stiffness: 160, damping: 20 })
  const ry = useSpring(y, { stiffness: 160, damping: 20 })

  useEffect(() => {
    if (!canHover()) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const el = e.target.closest?.('[data-cursor], a, button, label, [role="button"]')
      setHover(el ? el.dataset.cursor || '' : null)
    }
    const leave = () => {
      x.set(-100)
      y.set(-100)
    }
    const pd = () => setDown(true)
    const pu = () => setDown(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', pd)
    window.addEventListener('mouseup', pu)
    document.addEventListener('mouseleave', leave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', pd)
      window.removeEventListener('mouseup', pu)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null
  const labelled = !!hover
  const size = labelled ? 88 : hover !== null ? 60 : 34

  return (
    <>
      <motion.div
        style={{ x: dx, y: dy }}
        className="pointer-events-none fixed left-0 top-0 z-[999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-terra-500 shadow-[0_0_0_1.5px_rgba(255,255,255,0.7)]"
        animate={{ scale: hover !== null ? 0 : down ? 0.6 : 1 }}
      />
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full border border-terra-500 shadow-[0_0_0_1px_rgba(255,255,255,0.45)]"
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          scale: down ? 0.85 : 1,
          backgroundColor: labelled ? 'rgba(180,73,31,0.95)' : hover !== null ? 'rgba(180,73,31,0.12)' : 'rgba(180,73,31,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {labelled && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-caps text-[10px] tracking-[0.25em] text-white"
            >
              {hover}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

/* ------------------------------------------------------------------------
 * Leaf burst — every click scatters a handful of tea leaves.
 * --------------------------------------------------------------------- */
const LEAF = 'M12 2C6 6 5 14 12 22C19 14 18 6 12 2Z'
const LEAF_COLORS = ['#B4491F', '#C9704A', '#DC9F7E', '#EAC6AF']

export function LeafBurst() {
  const [bursts, setBursts] = useState([])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onClick = (e) => {
      if (e.target.closest?.('input, textarea, select, iframe')) return
      const id = `${Date.now()}-${Math.random()}`
      const n = 10
      const leaves = Array.from({ length: n }, (_, i) => ({
        angle: (i / n) * Math.PI * 2 + Math.random() * 0.6,
        dist: 40 + Math.random() * 60,
        rot: (Math.random() - 0.5) * 540,
        size: 9 + Math.random() * 9,
        color: LEAF_COLORS[i % LEAF_COLORS.length],
      }))
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, leaves }])
      setTimeout(() => setBursts((b) => b.filter((v) => v.id !== id)), 1600)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[998] overflow-hidden">
      {bursts.map((b) =>
        b.leaves.map((l, i) => {
          const tx = Math.cos(l.angle) * l.dist
          const ty = Math.sin(l.angle) * l.dist
          return (
            <motion.svg
              key={`${b.id}-${i}`}
              viewBox="0 0 24 24"
              className="absolute"
              style={{ left: b.x, top: b.y, width: l.size, height: l.size, marginLeft: -l.size / 2, marginTop: -l.size / 2 }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{ x: [0, tx, tx * 1.15], y: [0, ty, ty + 60], opacity: [1, 1, 0], scale: [0, 1, 0.7], rotate: l.rot }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], times: [0, 0.45, 1] }}
            >
              <path d={LEAF} fill={l.color} />
              <path d="M12 4 V20" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            </motion.svg>
          )
        })
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------
 * Scroll progress line + arch-shaped "back to top" that fills as you scroll
 * --------------------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700))
  const arch = 'M3 62 V24 A21 21 0 0 1 45 24 V62 Z'
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-terra-500" />
      <AnimatePresence>
        {show && (
          <motion.button
            onClick={() => scrollToTop()}
            aria-label="Back to top"
            className="fixed bottom-6 left-6 z-40 h-16 w-12 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ y: -5 }}
          >
            <svg viewBox="0 0 48 64" className="h-full w-full">
              <path d={arch} fill="#fff" stroke="rgba(180,73,31,0.18)" strokeWidth="2" />
              <motion.path d={arch} fill="none" stroke="#B4491F" strokeWidth="2.5" style={{ pathLength: scrollYProgress }} />
              <path d="M24 46 V28 M17.5 34.5 L24 28 L30.5 34.5" stroke="#B4491F" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------------------------------------------------
 * A flock of birds (from the logo) that glides across its container
 * --------------------------------------------------------------------- */
function Bird({ top, delay, scale, duration, color, every }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, scale }}
      initial={{ left: '-12%' }}
      animate={{ left: '112%', y: [0, -18, 6, -10, 0] }}
      transition={{
        left: { duration, delay, repeat: Infinity, repeatDelay: every, ease: 'linear' },
        y: { duration, delay, repeat: Infinity, repeatDelay: every, ease: 'easeInOut' },
      }}
    >
      <svg viewBox="0 0 40 20" className="w-7">
        <motion.path
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ d: ['M2 12 Q10 1 20 12 Q30 1 38 12', 'M2 6 Q10 16 20 12 Q30 16 38 6'] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}

export function Birds({ color = '#FBF4EF', className = '', count = 4, every = 7, start = 1 }) {
  const flock = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        top: `${10 + i * 6 + Math.random() * 8}%`,
        delay: start + i * 0.35 + Math.random() * 0.3,
        scale: 0.6 + Math.random() * 0.6,
        duration: 9 + Math.random() * 2,
      })),
    [count, start]
  )
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '100px' })
  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {inView && flock.map((b, i) => (
        <Bird key={i} {...b} color={color} every={every} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------------
 * Fireflies / floating motes / stars
 * --------------------------------------------------------------------- */
export function Fireflies({ count = 16, color = 'rgba(255,255,255,0.9)', className = '', twinkle = false }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 5 + Math.random() * 7,
        delay: Math.random() * 6,
        dx: (Math.random() - 0.5) * 80,
        dy: -20 - Math.random() * 70,
      })),
    [count]
  )
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '100px' })
  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {inView && dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size * 4,
            height: d.size * 4,
            background: `radial-gradient(circle, ${color} 0%, ${color} 16%, transparent 62%)`,
            willChange: 'transform, opacity',
          }}
          animate={
            twinkle
              ? { opacity: [0.15, 1, 0.15], scale: [0.8, 1.3, 0.8] }
              : { opacity: [0, 1, 0], x: [0, d.dx], y: [0, d.dy] }
          }
          transition={{ duration: twinkle ? d.dur / 2 : d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------------
 * Drifting mist banks
 * --------------------------------------------------------------------- */
export function Mist({ className = '', tone = 'bg-white/45' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '100px' })
  return (
    <div ref={ref} className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 overflow-hidden ${className}`}>
      {inView && [0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute h-40 w-[80%] rounded-full blur-2xl will-change-transform ${tone}`}
          style={{ bottom: `${i * 20 - 12}%` }}
          initial={{ x: i % 2 ? '70%' : '-60%' }}
          animate={{ x: i % 2 ? ['70%', '-30%', '70%'] : ['-60%', '50%', '-60%'] }}
          transition={{ duration: 20 + i * 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------------
 * Magnetic — child gently follows the cursor while hovered
 * --------------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 14 })
  const y = useSpring(0, { stiffness: 220, damping: 14 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={move} onMouseLeave={reset} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------------
 * Tilt — 3D tilt toward the cursor with a moving light glare
 * --------------------------------------------------------------------- */
export function Tilt({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const rx = useSpring(0, { stiffness: 160, damping: 16 })
  const ry = useSpring(0, { stiffness: 160, damping: 16 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const go = useSpring(0, { stiffness: 200, damping: 25 })
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,240,225,0.4), transparent 55%)`

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
    go.set(1)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
    go.set(0)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light" style={{ background: glare, opacity: go }} />
    </motion.div>
  )
}

import { motion } from 'framer-motion'

/**
 * Vector rendition of the Villa Cavo arch emblem (arch, sun, peaks, birds).
 * `animate` draws the lines in — used by the splash screen.
 */
export default function ArchMark({ className = '', animate = false, color = '#B4491F', accent }) {
  const fill = accent ?? (color === '#B4491F' ? '#fff' : '#B4491F')
  const birds = accent ?? (color === '#B4491F' ? '#FBF4EF' : '#B4491F')
  const draw = (delay = 0, duration = 1.4) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.2 } },
        }
      : {}
  const fade = (delay = 0) =>
    animate
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.8 } }
      : {}
  const bird = (delay) =>
    animate
      ? { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7 } }
      : {}

  return (
    <svg viewBox="0 0 120 170" className={className} fill="none" aria-hidden="true">
      {/* Outer arch frame */}
      <motion.path
        d="M5 166 V60 A55 55 0 0 1 115 60 V166 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        {...draw(0, 1.6)}
      />
      {/* Sun / sky */}
      <motion.path d="M13 114 V62 A47 47 0 0 1 107 62 V114 Z" fill={color} {...fade(1.1)} />
      {/* Snowy mountain mass */}
      <motion.path
        d="M12 162 V104 C24 100 32 92 40 84 C44 82 47 84 50 82 L84 54 L92 60 L108 76 V162 Z"
        fill={fill}
        {...fade(1.3)}
      />
      {/* Ridge lines */}
      <g stroke={color} strokeWidth="2.2" strokeLinecap="round">
        <motion.path d="M12 134 C22 128 30 120 38 112 C42 108 46 108 50 106 C54 100 58 96 60 92" {...draw(1.5, 1)} />
        <motion.path d="M90 62 C86 72 88 80 82 92 C79 98 76 102 72 108" {...draw(1.6, 1)} />
        <motion.path d="M92 64 C96 76 100 88 104 96" {...draw(1.7, 0.8)} />
        <motion.path d="M14 166 C28 148 44 138 62 136 C70 135 76 138 84 142" {...draw(1.8, 1)} />
        <motion.path d="M54 138 C66 126 80 120 96 124 C100 126 104 128 108 130" {...draw(1.9, 1)} />
      </g>
      {/* Birds */}
      <g stroke={birds} strokeWidth="1.6" strokeLinecap="round">
        <motion.path d="M44 48 q3 -3 6 0 q3 -3 6 0" {...bird(2.1)} />
        <motion.path d="M58 56 q2.5 -2.5 5 0 q2.5 -2.5 5 0" {...bird(2.25)} />
        <motion.path d="M34 66 q2.5 -2.5 5 0 q2.5 -2.5 5 0" {...bird(2.4)} />
      </g>
    </svg>
  )
}

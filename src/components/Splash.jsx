import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ArchMark from './ArchMark'
import { Fireflies } from './magic'

const ease = [0.22, 1, 0.36, 1]

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4200)
    return () => clearTimeout(t)
  }, [onDone])

  const word = 'CAVO'.split('')

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Rising mist */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-terra-50 via-white/0 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <Fireflies count={22} color="rgba(201,112,74,0.55)" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <ArchMark animate className="h-36 w-auto sm:h-44" />

        <motion.p
          className="mt-8 font-caps text-sm tracking-[0.8em] text-ink sm:text-base"
          initial={{ opacity: 0, letterSpacing: '1.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.8em' }}
          transition={{ delay: 1.9, duration: 1.2, ease }}
        >
          VILLA
        </motion.p>

        <h1 className="mt-1 flex overflow-hidden font-display text-6xl font-normal leading-none text-ink sm:text-7xl">
          {word.map((l, i) => (
            <motion.span
              key={i}
              className="inline-block px-1"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 2.1 + i * 0.09, duration: 0.9, ease }}
            >
              {l === 'A' ? 'Λ' : l}
            </motion.span>
          ))}
        </h1>

        <div className="mt-5 flex items-center gap-4">
          <motion.span
            className="h-px w-16 origin-right bg-terra-500 sm:w-24"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.6, duration: 0.9, ease }}
          />
          <motion.svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-terra-500"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            <Leaf />
          </motion.svg>
          <motion.span
            className="h-px w-16 origin-left bg-terra-500 sm:w-24"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.6, duration: 0.9, ease }}
          />
        </div>

        <motion.p
          className="mt-5 font-caps text-[11px] tracking-[0.5em] text-ink-soft sm:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.9, ease }}
        >
          BENEATH THE MISTY PEAKS
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-terra-500"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />
    </motion.div>
  )
}

export function Leaf() {
  return (
    <g fill="currentColor">
      <path d="M12 22 C12 16 12 10 12 4" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M12 4 C10 6 10 9 12 11 C14 9 14 6 12 4Z" />
      <path d="M12 12 C9 11 6 12 5 14 C8 15 11 14 12 12Z" />
      <path d="M12 12 C15 11 18 12 19 14 C16 15 13 14 12 12Z" />
      <path d="M12 17 C9 16 6 17 5 19 C8 20 11 19 12 17Z" />
      <path d="M12 17 C15 16 18 17 19 19 C16 20 13 19 12 17Z" />
      <path d="M12 8 C10 7 8 7.5 7 9 C9 10 11 9.5 12 8Z" />
      <path d="M12 8 C14 7 16 7.5 17 9 C15 10 13 9.5 12 8Z" />
    </g>
  )
}

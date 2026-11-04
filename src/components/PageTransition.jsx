import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.main>
      {/* Terracotta wipe between pages */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-terra-500"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-terra-500"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  )
}

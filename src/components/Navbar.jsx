import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, contact } from '../data/site'
import { lockScroll } from '../lib/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    lockScroll(open)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 py-3 shadow-[0_1px_0_rgba(20,18,16,0.06)] backdrop-blur-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-luxe flex items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Main">
            {navLinks.slice(1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline font-caps text-[12px] uppercase tracking-[0.25em] transition-colors ${
                    isActive ? 'text-terra-500' : 'text-ink hover:text-terra-500'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/book" className="btn-primary hidden !px-6 !py-3 sm:inline-flex">
              Reserve
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="group flex h-11 w-11 flex-col items-center justify-center gap-[6px] xl:hidden"
              aria-label="Open menu"
            >
              <span className="h-px w-7 bg-ink transition-all group-hover:w-5" />
              <span className="h-px w-7 bg-ink" />
              <span className="h-px w-7 bg-ink transition-all group-hover:w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-white"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-luxe flex items-center justify-between py-6">
              <Logo />
              <button onClick={() => setOpen(false)} className="relative h-11 w-11" aria-label="Close menu">
                <span className="absolute left-2 top-1/2 h-px w-7 rotate-45 bg-ink" />
                <span className="absolute left-2 top-1/2 h-px w-7 -rotate-45 bg-ink" />
              </button>
            </div>

            <nav className="container-luxe flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.6 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `group flex items-baseline gap-4 font-display text-4xl sm:text-5xl ${
                        isActive ? 'text-terra-500' : 'text-ink hover:text-terra-500'
                      }`
                    }
                  >
                    <span className="font-caps text-xs text-terra-400">0{i + 1}</span>
                    <span className="italic transition-transform duration-500 group-hover:translate-x-2">{l.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="container-luxe flex flex-col gap-2 border-t border-ink/10 py-8 text-sm text-ink-soft sm:flex-row sm:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <Link to="/book" className="text-terra-500">Reserve your stay →</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

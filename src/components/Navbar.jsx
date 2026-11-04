import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { navLinks, contact } from '../data/site'
import { lockScroll } from '../lib/scroll'
import ArchMark from './ArchMark'
import { Fireflies } from './magic'
import { socialIcons } from './Footer'

const easeInOut = [0.76, 0, 0.24, 1]

/** Full-screen mobile menu: a terracotta arch rises from the bottom of the screen */
function MobileMenu({ onClose }) {
  const { pathname } = useLocation()
  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden bg-gradient-to-b from-terra-700 via-terra-800 to-terra-900 text-white"
      initial={{ clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0% 0%)' }}
      transition={{ duration: 0.9, ease: easeInOut }}
    >
      {/* faint emblem + fireflies */}
      <motion.div
        className="pointer-events-none absolute -bottom-16 -right-24 h-[75vh]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: easeInOut }}
      >
        <ArchMark color="rgba(255,255,255,0.06)" accent="transparent" className="h-full w-auto" />
      </motion.div>
      <Fireflies count={14} color="rgba(234,198,175,0.75)" />

      <div data-lenis-prevent className="relative flex h-full flex-col overflow-y-auto">
        {/* top bar */}
        <div className="container-luxe flex items-center justify-between py-6">
          <Logo light />
          <motion.button
            onClick={onClose}
            aria-label="Close menu"
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-terra-800"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="absolute h-px w-5 rotate-45 bg-current" />
            <span className="absolute h-px w-5 -rotate-45 bg-current" />
          </motion.button>
        </div>

        <motion.p
          className="container-luxe flex items-center gap-3 font-caps text-[11px] tracking-[0.35em] text-terra-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <span className="h-px w-8 bg-terra-200/70" />
          Menu
        </motion.p>

        {/* links */}
        <nav className="container-luxe mt-4 flex-1" aria-label="Mobile">
          <ul>
            {navLinks.map((l, i) => {
              const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)
              return (
                <li key={l.to} className="relative border-b border-white/10">
                  <motion.span
                    className="absolute bottom-[-1px] left-0 h-px bg-white/40"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.45 + i * 0.06, duration: 0.8, ease: easeInOut }}
                  />
                  <NavLink to={l.to} className="group flex items-center gap-4 py-3.5">
                    <span className="w-6 font-caps text-[11px] text-terra-200">0{i + 1}</span>
                    <span className="block flex-1 overflow-hidden">
                      <motion.span
                        className={`block font-display text-[32px] leading-tight sm:text-5xl ${active ? 'italic text-terra-100' : 'text-white'}`}
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.8, ease: easeInOut }}
                      >
                        {l.label}
                      </motion.span>
                    </span>
                    {active ? (
                      <motion.span
                        className="h-2 w-2 rounded-full bg-terra-200"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 }}
                      />
                    ) : (
                      <span className="text-lg text-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">→</span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* bottom: reserve + contact + socials */}
        <motion.div
          className="container-luxe pb-8 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <Link
            to="/book"
            className="btn w-full bg-white text-terra-700 hover:bg-terra-100"
          >
            Reserve your stay
          </Link>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="space-y-1 text-sm text-white/75">
              <a className="block hover:text-white" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              <a className="block hover:text-white" href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
            <div className="flex gap-2">
              {Object.entries(contact.social).map(([k, href]) => (
                <a
                  key={k}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={socialIcons[k].label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-terra-800"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={socialIcons[k].path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

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

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}

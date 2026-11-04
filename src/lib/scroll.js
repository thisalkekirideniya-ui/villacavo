import Lenis from 'lenis'

/*
 * Site-wide smooth scrolling (Lenis). Desktop wheel/trackpad scrolling is
 * eased; touch devices keep their native scrolling.
 */
let lenis = null

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
  })
  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

/** Freeze / release page scrolling (menus, lightbox, splash) */
export function lockScroll(lock) {
  document.body.style.overflow = lock ? 'hidden' : ''
  if (lenis) (lock ? lenis.stop() : lenis.start())
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

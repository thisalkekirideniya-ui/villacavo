import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Splash from './components/Splash'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import PageTransition from './components/PageTransition'
import { SplashContext } from './context'
import { Cursor, LeafBurst, ScrollProgress } from './components/magic'
import { initSmoothScroll, lockScroll, scrollToTop } from './lib/scroll'

import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Experiences from './pages/Experiences'
import Dining from './pages/Dining'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import NotFound from './pages/NotFound'

const routes = [
  { path: '/', el: <Home /> },
  { path: '/about', el: <About /> },
  { path: '/rooms', el: <Rooms /> },
  { path: '/experiences', el: <Experiences /> },
  { path: '/dining', el: <Dining /> },
  { path: '/gallery', el: <Gallery /> },
  { path: '/contact', el: <Contact /> },
  { path: '/book', el: <Booking /> },
  { path: '*', el: <NotFound /> },
]

export default function App() {
  const location = useLocation()
  const [showSplash, setShowSplash] = useState(true)
  const endSplash = useCallback(() => setShowSplash(false), [])

  useEffect(() => {
    initSmoothScroll()
  }, [])

  useEffect(() => {
    lockScroll(showSplash)
  }, [showSplash])

  return (
    <SplashContext.Provider value={!showSplash}>
      <AnimatePresence>{showSplash && <Splash onDone={endSplash} />}</AnimatePresence>

      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop({ immediate: true })}>
        <Routes location={location} key={location.pathname}>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={<PageTransition>{r.el}</PageTransition>} />
          ))}
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <ScrollProgress />
      <LeafBurst />
      <Cursor />
    </SplashContext.Provider>
  )
}

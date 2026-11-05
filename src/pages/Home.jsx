import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, animate } from 'framer-motion'
import { useSplashDone } from '../context'
import {
  Reveal, MaskText, Img, ParallaxImg, CurtainImg, Eyebrow, SectionHeading, Ornament, CtaBand, ArrowLink, ease,
} from '../components/ui'
import Icon from '../components/Icon'
import ArchMark from '../components/ArchMark'
import { Birds, Fireflies, Magnetic, Mist, Tilt } from '../components/magic'
import { images, rooms, experiences, services, testimonials, dayAtVilla, attractions, gallery, contact } from '../data/site'

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <RoomsShowcase />
      <Services />
      <MistQuote />
      <ExperienceList />
      <DayTimeline />
      <DiningTeaser />
      <Testimonials />
      <Location />
      <GalleryStrip />
      <CtaBand image={images.valley} />
    </>
  )
}

/* ------------------------------------------------------------------ HERO */
/** Full-screen photo slideshow: slow cross-fade + gentle zoom, auto-advancing */
function FullSlider({ slides, interval = 6000, active: run = true, className = '', overlay = 'bg-ink/45', children }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!run) return
    const t = setInterval(() => setI((k) => (k + 1) % slides.length), interval)
    return () => clearInterval(t)
  }, [run, interval, slides.length, i])
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: interval / 1000 + 1.6, ease: 'linear' }}
          >
            <Img src={slides[i].src} alt={slides[i].alt} className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlay}`} />
      {children?.({ i, setI })}
    </div>
  )
}

const heroSlides = [
  { src: images.hero, alt: 'Mist rolling over the mountains near Haputale' },
  { src: images.villa, alt: 'Villa Cavo' },
  { src: images.mist, alt: 'Sunrise above the clouds' },
  { src: images.suite, alt: 'Misty Peak Suite' },
  { src: images.valley, alt: 'The Haputale valley' },
]

/** Typewriter: reveals letters one by one with a blinking caret. Untyped letters stay
 *  in the layout (invisible) so nothing shifts while typing. */
function TypeLines({ lines, start = true, speed = 55, delay = 400, className = '' }) {
  const reduce = useReducedMotion()
  const total = lines.reduce((n, l) => n + l.length, 0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    if (reduce) { setCount(total); return }
    let t
    const d = setTimeout(() => {
      t = setInterval(() => setCount((c) => (c >= total ? (clearInterval(t), c) : c + 1)), speed)
    }, delay)
    return () => { clearTimeout(d); clearInterval(t) }
  }, [start, reduce, total, speed, delay])

  let offset = 0
  return (
    <>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((l) => {
        const from = offset
        offset += l.length
        const typed = Math.max(0, Math.min(l.length, count - from))
        const caretHere = count < total ? typed < l.length && count >= from : from + l.length === total
        return (
          <span key={l} aria-hidden className={`block pb-[0.05em] ${className}`}>
            {l.slice(0, typed)}
            {caretHere && <span className="type-caret" />}
            <span className="invisible">{l.slice(typed)}</span>
          </span>
        )
      })}
    </>
  )
}

function Hero() {
  const ready = useSplashDone()
  const state = ready ? 'show' : 'hidden'
  const fade = {
    hidden: { opacity: 0, y: 28 },
    show: (d) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: d, ease } }),
  }
  return (
    <section className="relative">
      <FullSlider
        slides={heroSlides}
        active={ready}
        className="h-[100svh] min-h-[600px]"
        overlay="bg-gradient-to-b from-ink/55 via-ink/35 to-ink/65"
      >
        {({ i, setI }) => (
          <>
            {ready && <Mist />}
            {ready && <Birds start={2} />}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container-luxe text-center text-white">
                <motion.p
                  className="font-caps text-[12px] uppercase tracking-[0.45em] text-white/85 sm:text-[13px]"
                  variants={fade}
                  custom={0}
                  initial="hidden"
                  animate={state}
                >
                  Welcome to Villa Cavo
                </motion.p>
                <motion.span
                  className="mx-auto mt-5 block h-px w-28 origin-center bg-white/60 sm:w-40"
                  initial={{ scaleX: 0 }}
                  animate={ready ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.2, ease }}
                />
                <h1 className="mt-6 font-display uppercase leading-[1.02] tracking-[0.04em] text-white">
                  <TypeLines lines={['A luxury villa', 'beneath the', 'misty peaks']} start={ready} className="text-[1.75rem] min-[400px]:text-[2rem] sm:text-6xl lg:text-[5.6rem]" />
                </h1>
                <motion.p
                  className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-white/90 sm:text-lg"
                  variants={fade}
                  custom={2.3}
                  initial="hidden"
                  animate={state}
                >
                  Wake above the clouds in Haputale, unwind in private luxury and savour the timeless beauty of
                  Sri Lanka’s hill country.
                </motion.p>
                <motion.div
                  className="mx-auto mt-10 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
                  variants={fade}
                  custom={2.5}
                  initial="hidden"
                  animate={state}
                >
                  <Magnetic className="w-full sm:w-auto">
                    <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hello Villa Cavo, I would like to enquire about a stay.')}`} target="_blank" rel="noreferrer" className="btn-primary w-full">
                      Enquire on WhatsApp
                    </a>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto">
                    <Link to="/contact" className="btn-ghost w-full">
                      Email us
                    </Link>
                  </Magnetic>
                </motion.div>
              </div>
            </div>

            {/* slide indicators */}
            <motion.div
              className="absolute inset-x-0 bottom-8 z-10"
              variants={fade}
              custom={1.1}
              initial="hidden"
              animate={state}
            >
              <div className="container-luxe flex items-center justify-between">
                <span className="hidden font-caps text-[11px] uppercase tracking-[0.35em] text-white/70 sm:block">Haputale · Sri Lanka</span>
                <div className="mx-auto flex items-center gap-3 sm:mx-0">
                  {heroSlides.map((sl, k) => (
                    <button
                      key={sl.alt}
                      onClick={() => setI(k)}
                      aria-label={`Show slide ${k + 1}`}
                      className={`h-[2px] transition-all duration-700 ${k === i ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
                <span className="hidden font-caps text-[11px] tracking-[0.35em] text-white/70 sm:block">
                  0{i + 1} / 0{heroSlides.length}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </FullSlider>
    </section>
  )
}

/* --------------------------------------------------------------- WELCOME */
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}

function Welcome() {
  const stats = [
    { n: 4, s: '', label: 'Private suites' },
    { n: 180, s: '°', label: 'Mountain views' },
    { n: 24, s: 'h', label: 'Butler service' },
  ]
  return (
    <>
      <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* photo composition */}
          <div className="relative pb-12 pr-8 sm:pb-20 sm:pr-16 lg:col-span-6">
            <CurtainImg src={images.villa2} alt="Villa Cavo terrace" className="aspect-square w-full" />
            <Reveal delay={0.3} className="absolute bottom-0 right-0 w-[45%] border-[6px] border-cream shadow-2xl sm:border-8">
              <Img src={images.tea} alt="Ceylon tea" className="aspect-square w-full object-cover" />
            </Reveal>
            <Reveal delay={0.45} className="absolute -left-3 top-6 bg-terra-500 px-4 py-3 text-white shadow-xl sm:-left-6 sm:top-8 sm:px-7 sm:py-5">
              <p className="font-caps text-[9px] uppercase tracking-[0.25em] text-white/80 sm:text-[10px] sm:tracking-[0.3em]">Uva Highlands</p>
              <p className="mt-1 font-display text-xl sm:text-3xl">Haputale</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Welcome to Villa Cavo"
              title={['An intimate retreat', 'in the heart of', 'tea country']}
            />
            <Reveal delay={0.2}>
              <p className="mt-8 text-[16px] leading-relaxed text-ink-soft">
                Set on a quiet ridge above Haputale, Villa Cavo is a private sanctuary where colonial elegance meets the
                untamed beauty of Sri Lanka’s Uva highlands. Mist-veiled peaks, emerald tea terraces and the gentle rhythm
                of hill-country life surround you.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                With only a handful of suites, every stay is personal — attentive hosts, a private chef and spaces
                designed for slowing down.
              </p>
              <div className="mt-10">
                <ArrowLink to="/about">Discover our story</ArrowLink>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 pt-8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1} className={i === 0 ? 'pr-3 sm:pr-6' : 'px-3 sm:px-6'}>
                  <p className="font-display text-3xl text-terra-500 sm:text-5xl">
                    <Counter to={s.n} suffix={s.s} />
                  </p>
                  <p className="mt-2 font-caps text-[10px] uppercase tracking-[0.12em] text-ink-mute sm:tracking-[0.25em]">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* full-screen photo */}
      <section className="relative">
        <ParallaxImg src={images.villa} alt="Villa Cavo" className="h-[100svh] min-h-[520px]" strength={120} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-10 sm:bottom-16">
          <div className="container-luxe text-white">
            <Reveal>
              <p className="font-caps text-[12px] uppercase tracking-[0.35em] text-white/80">Villa Cavo · Haputale</p>
              <p className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-5xl">A home in the clouds.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------ ROOMS (sticky horizontal scroll) */
function useIsDesktop() {
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)')
    const fn = () => setD(m.matches)
    m.addEventListener('change', fn)
    return () => m.removeEventListener('change', fn)
  }, [])
  return d
}

function RoomCard({ room, i }) {
  return (
    <Link to="/rooms" data-cursor="View" className="group block w-[82vw] shrink-0 sm:w-[60vw] lg:w-[34vw] xl:w-[30vw]">
      <Tilt className="overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Img src={room.image} alt={room.name} className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute left-6 top-6 font-caps text-[11px] tracking-[0.3em] text-white/80">0{i + 1}</span>
        <div className="absolute inset-x-6 bottom-6 text-white">
          <p className="font-caps text-[11px] uppercase tracking-[0.3em] text-terra-100">{room.view}</p>
          <h3 className="mt-2 text-3xl sm:text-4xl">{room.name}</h3>
          <div className="mt-4 flex max-h-0 items-center gap-4 overflow-hidden text-xs text-white/80 opacity-0 transition-all duration-700 group-hover:max-h-10 group-hover:opacity-100">
            <span>{room.size}</span>·<span>{room.guests}</span>·<span>{room.view}</span>
          </div>
        </div>
      </div>
      </Tilt>
    </Link>
  )
}

function RoomsShowcase() {
  const isDesktop = useIsDesktop()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    if (!isDesktop) return
    const measure = () => trackRef.current && setDistance(trackRef.current.scrollWidth - window.innerWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isDesktop])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 120, damping: 30 })
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const header = (
    <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-10 sm:w-[60vw] lg:w-[32vw]">
      <Eyebrow>Rooms & Suites</Eyebrow>
      <h2 className="mt-5 text-5xl leading-[1.02] text-ink lg:text-6xl">
        Sleep where <span className="italic text-terra-500">the clouds</span> rest
      </h2>
      <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-ink-soft">
        Four individually designed suites, each with its own character and an uninterrupted view of the hills.
      </p>
      <div className="mt-8">
        <ArrowLink to="/rooms">View all suites</ArrowLink>
      </div>
    </div>
  )

  if (!isDesktop) return <MobileRooms header={header} />

  return (
    <section ref={sectionRef} className="relative bg-cream" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-8 pl-12 pr-24 pt-16 xl:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
          {header}
          {rooms.map((r, i) => (
            <RoomCard key={r.slug} room={r} i={i} />
          ))}
        </motion.div>
        <div className="container-luxe mt-10">
          <div className="h-px w-full bg-ink/10">
            <motion.div style={{ width: progress }} className="h-px bg-terra-500" />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Mobile / tablet: swipeable carousel that also slides on its own */
function MobileRooms({ header }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const inView = useInView(trackRef, { amount: 0.4 })
  const resumeTimer = useRef(null)

  const slideTo = (k) => {
    const track = trackRef.current
    const card = track?.children[k]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.children[0].offsetLeft, behavior: 'smooth' })
  }

  // keep the indicator in sync with manual swipes
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const first = track.children[0]
    const step = track.children[1] ? track.children[1].offsetLeft - first.offsetLeft : 1
    setActive(Math.min(rooms.length - 1, Math.max(0, Math.round(track.scrollLeft / step))))
  }

  // auto-advance every 4s while visible and not being touched
  useEffect(() => {
    if (paused || !inView) return
    const t = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % rooms.length
        slideTo(next)
        return next
      })
    }, 4000)
    return () => clearInterval(t)
  }, [paused, inView])

  // pause while the guest is swiping, resume a few seconds later
  const hold = () => {
    clearTimeout(resumeTimer.current)
    setPaused(true)
  }
  const release = () => {
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), 5000)
  }
  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  return (
    <section className="bg-cream py-24">
      <div className="container-luxe">{header}</div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={hold}
        onTouchEnd={release}
        onPointerDown={hold}
        onPointerUp={release}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {rooms.map((r, i) => (
          <div key={r.slug} className="snap-start">
            <RoomCard room={r} i={i} />
          </div>
        ))}
      </div>
      <div className="container-luxe mt-4 flex items-center gap-3">
        {rooms.map((r, k) => (
          <button
            key={r.slug}
            onClick={() => { hold(); setActive(k); slideTo(k); release() }}
            aria-label={`Show ${r.name}`}
            className="flex h-6 flex-1 items-center"
          >
            <span className="relative block h-px w-full overflow-hidden bg-ink/15">
              {k === active && (
                <motion.span
                  key={`${active}-${paused}`}
                  className="absolute inset-y-0 left-0 bg-terra-500"
                  initial={{ width: paused ? '100%' : '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: paused ? 0 : 4, ease: 'linear' }}
                />
              )}
              {k < active && <span className="absolute inset-0 bg-terra-500/50" />}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- SERVICES */
function Services() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          center
          eyebrow="The Villa Cavo Touch"
          title={['Thoughtful service,', 'quietly delivered']}
          text="From the moment you arrive, our team is devoted to making your stay effortless and unforgettable."
        />
        <div className="mt-12 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:mt-16 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="group relative overflow-hidden bg-white p-5 sm:p-10">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-terra-500 transition-transform duration-700 ease-out group-hover:scale-y-100" />
              <div className="relative">
                <span className="text-terra-500 transition-colors duration-500 group-hover:text-white">
                  <Icon name={s.icon} className="h-7 w-7 sm:h-9 sm:w-9" />
                </span>
                <h3 className="mt-5 text-lg leading-tight text-ink sm:mt-8 sm:text-2xl transition-colors duration-500 group-hover:text-white">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft transition-colors sm:mt-3 sm:text-sm duration-500 group-hover:text-white/85">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ MIST QUOTE */
function MistQuote() {
  return (
    <section className="relative overflow-hidden">
      <ParallaxImg src={images.mist} alt="" className="h-[90vh] min-h-[560px]" strength={140} />
      <div className="absolute inset-0 bg-ink/35" />
      {/* drifting mist layers */}
      <div className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-1/2 animate-drift bg-gradient-to-t from-white/50 via-white/10 to-transparent will-change-transform" />
      <Birds count={5} every={5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-luxe max-w-4xl text-center text-white">
          <Reveal>
            <ArchMark color="#fff" className="mx-auto h-16 w-auto" />
          </Reveal>
          <MaskText
            lines={['“Here, the mountains', 'breathe slowly — and', 'so do you.”']}
            className="mt-8 font-display text-4xl italic leading-[1.1] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-8 font-caps text-[12px] tracking-luxe text-white/80">The Haputale Gap · Uva Province</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------- EXPERIENCES (hover) */
function ExperienceList() {
  const [active, setActive] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 150, damping: 20 })
  const sy = useSpring(my, { stiffness: 150, damping: 20 })
  const listRef = useRef(null)

  const onMove = (e) => {
    const r = listRef.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-luxe">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Curated Experiences" title={['Discover the', 'hill country']} />
          <Reveal>
            <ArrowLink to="/experiences">All experiences</ArrowLink>
          </Reveal>
        </div>

        <div ref={listRef} onMouseMove={onMove} onMouseLeave={() => setActive(null)} className="relative mt-16 border-t border-ink/10">
          {experiences.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <Link
                to="/experiences"
                data-cursor="Explore"
                onMouseEnter={() => setActive(i)}
                className="group relative z-10 grid grid-cols-12 items-center gap-4 border-b border-ink/10 py-5 sm:py-7"
              >
                <span className="col-span-2 font-caps text-xs text-terra-500 sm:col-span-1">0{i + 1}</span>
                <h3 className="col-span-10 text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-terra-500 sm:col-span-7 text-xl sm:text-2xl lg:text-3xl">
                  {e.title}
                </h3>
                <span className="col-span-6 col-start-3 font-caps text-[11px] tracking-[0.3em] text-ink-mute sm:col-span-2 sm:col-start-auto">
                  {e.category}
                </span>
                <span className="col-span-4 text-right text-sm text-ink-mute sm:col-span-2">{e.duration}</span>
              </Link>
            </Reveal>
          ))}

          {/* cursor-following image (desktop) */}
          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={active}
                  className="arch -ml-36 -mt-48 h-96 w-72 overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Img src={experiences[active].image} alt="" className="h-full w-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <PhotoMarquee
        className="mt-16"
        to="/experiences"
        items={experiences.map((e) => ({ src: e.image, label: e.title }))}
      />
    </section>
  )
}

/* ---------------------------------------------------------- PHOTO MARQUEE (left → right) */
function PhotoMarquee({ items, to, fade = 'from-white', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${fade} to-transparent sm:w-32`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${fade} to-transparent sm:w-32`} />
      <div className="animate-marquee-right flex w-max gap-4 py-6 sm:gap-10 sm:py-10">
        {[...items, ...items].map((p, i) => (
          <Link
            key={i}
            to={to}
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : undefined}
            className="arch group block h-60 w-44 shrink-0 overflow-hidden shadow-xl sm:h-96 sm:w-72 sm:shadow-2xl"
          >
            <Img src={p.src} alt={p.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- DAY TIMELINE */
function DayTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const night = useTransform(scrollYProgress, [0.35, 1], [0, 1])
  const sky = useTransform(scrollYProgress, [0.3, 1], ['#B4491F', '#5E2511'])
  return (
    <motion.section style={{ backgroundColor: sky }} className="relative overflow-hidden bg-terra-500 py-24 sm:py-32">
      <motion.div style={{ opacity: night }} className="pointer-events-none absolute inset-0">
        <Fireflies count={40} twinkle />
      </motion.div>
      <ArchMark color="rgba(255,255,255,0.06)" accent="transparent" className="pointer-events-none absolute -right-24 bottom-0 h-[90%] w-auto" />
      <div className="container-luxe relative grid gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading
            light
            eyebrow="A Day at Villa Cavo"
            title={['From mist', 'to starlight']}
            text="Every day in the highlands unfolds at its own gentle pace. Here is how a perfect one might look."
          />
        </div>

        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/20">
            <motion.div style={{ height: h }} className="w-px bg-white" />
          </div>
          <div className="space-y-14">
            {dayAtVilla.map((d, i) => (
              <Reveal key={d.time} delay={0.05 * i} className="relative pl-12">
                <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border border-white bg-terra-500">
                  <span className="absolute inset-[3px] rounded-full bg-white" />
                </span>
                <p className="font-caps text-[12px] tracking-[0.3em] text-terra-100">{d.time}</p>
                <h3 className="mt-2 text-3xl text-white sm:text-4xl">{d.title}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/80">{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ---------------------------------------------------------------- DINING */
function DiningTeaser() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <ParallaxImg src={images.dining} alt="Dining at Villa Cavo" className="!absolute inset-0 h-full" strength={100} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/20" />
      <div className="container-luxe relative flex min-h-[100svh] items-center py-24">
        <div className="max-w-xl text-white">
          <SectionHeading
            light
            eyebrow="Dining"
            title={['Flavours of', 'the highlands']}
            text="Our chef blends heirloom Sri Lankan recipes with produce from local farms and our own kitchen garden. Breakfast on the lawn, high tea at four, candlelit dinners by the fire."
          />
          <Reveal delay={0.3}>
            <ul className="mt-10 space-y-4 border-t border-white/20 pt-8">
              {['Traditional Sri Lankan rice & curry', 'Colonial high tea service', 'Private candlelit dinners', 'Garden-to-table breakfasts'].map((t) => (
                <li key={t} className="flex items-center gap-4 text-[16px] text-white/90">
                  <Icon name="leaf" className="h-4 w-4 text-terra-200" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ArrowLink to="/dining" light>Explore dining</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- TESTIMONIALS */
const slide = {
  enter: (dir) => ({ x: dir > 0 ? 320 : -320, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -320 : 320, opacity: 0 }),
}

function Testimonials() {
  const [[i, dir], setPage] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const n = testimonials.length
  const go = (d) => setPage(([cur]) => [(cur + d + n) % n, d])
  const goTo = (k) => setPage(([cur]) => [k, k > cur ? 1 : -1])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setPage(([cur]) => [(cur + 1) % n, 1]), 7000)
    return () => clearInterval(t)
  }, [i, paused, n])

  const onDragEnd = (_, { offset, velocity }) => {
    const power = offset.x + velocity.x * 0.2
    if (power < -80) go(1)
    else if (power > 80) go(-1)
  }

  const t = testimonials[i]
  return (
    <section className="relative overflow-hidden bg-terra-500 py-24 text-white sm:py-32">
      <ArchMark color="rgba(255,255,255,0.07)" accent="transparent" className="pointer-events-none absolute -left-10 top-1/2 h-[140%] w-auto -translate-y-1/2" />
      <Fireflies count={18} />
      <div className="container-luxe relative max-w-4xl text-center">
        <Reveal>
          <p className="font-caps text-[12px] tracking-luxe text-terra-100">Guest Stories</p>
          <p className="mt-6 font-display text-8xl leading-none text-terra-200">“</p>
        </Reveal>
        <div
          className="relative min-h-[300px] overflow-hidden sm:min-h-[240px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={i}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 260, damping: 30 }, opacity: { duration: 0.3 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragStart={() => setPaused(true)}
              onDragEnd={onDragEnd}
              data-cursor="Drag"
              className="cursor-grab touch-pan-y select-none px-2 active:cursor-grabbing"
            >
              <blockquote className="font-display text-2xl italic leading-snug sm:text-4xl">{t.quote}</blockquote>
              <p className="mt-8 font-caps text-xs tracking-[0.3em]">{t.name}</p>
              <p className="mt-1 text-sm text-white/70">{t.from}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous story"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-terra-500"
          >
            ←
          </button>
          <div className="flex gap-3">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => goTo(k)}
                aria-label={`Show testimonial ${k + 1}`}
                className={`h-[2px] transition-all duration-500 ${k === i ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next story"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-terra-500"
          >
            →
          </button>
        </div>
        <p className="mt-6 font-caps text-[10px] tracking-[0.35em] text-white/50">← Swipe to read more →</p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- LOCATION */
function Location() {
  return (
    <section className="relative overflow-hidden bg-white lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="relative h-[100svh] min-h-[480px] lg:h-auto">
        <ParallaxImg src={images.landscape} alt="Haputale landscape" className="!absolute inset-0 h-full" strength={80} />
      </div>
      <div className="flex items-center px-5 py-24 sm:px-8 lg:px-16 lg:py-28 xl:px-24">
        <div className="w-full max-w-xl">
          <SectionHeading
            eyebrow="The Location"
            title={['Haputale —', 'the edge of the hills']}
            text="Perched at the southern edge of the central highlands, Haputale offers some of Sri Lanka’s most dramatic views — on a clear day, all the way to the southern coast."
          />
          <ul className="mt-12 border-t border-ink/10">
            {attractions.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <li className="group flex items-center justify-between gap-4 border-b border-ink/10 py-5">
                  <span className="flex items-center gap-4 text-[16px] text-ink transition-transform duration-500 group-hover:translate-x-2">
                    <Icon name="mountain" className="h-4 w-4 shrink-0 text-terra-500" />
                    {a.name}
                  </span>
                  <span className="shrink-0 font-caps text-[11px] uppercase tracking-[0.2em] text-ink-mute">{a.distance}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-10">
            <ArrowLink to="/contact">How to reach us</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- GALLERY STRIP */
function GalleryStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const pics = gallery.slice(1, 9).map((g) => ({ src: g.src, alt: g.alt }))
  return (
    <section ref={ref} className="relative">
      <FullSlider slides={pics} active={inView} interval={4500} className="h-[100svh] min-h-[560px]" overlay="bg-gradient-to-b from-ink/50 via-ink/20 to-ink/60">
        {({ i, setI }) => (
          <div className="absolute inset-0 flex flex-col items-center justify-between py-20 text-center text-white">
            <Reveal>
              <p className="font-caps text-[12px] uppercase tracking-[0.4em] text-white/80">Moments</p>
              <h2 className="mt-5 text-4xl uppercase tracking-[0.04em] sm:text-6xl">Life at Villa Cavo</h2>
            </Reveal>
            <div className="flex flex-col items-center gap-8">
              <p className="font-caps text-[12px] uppercase tracking-[0.3em] text-white/80">{pics[i].alt}</p>
              <div className="flex items-center gap-3">
                {pics.map((p, k) => (
                  <button
                    key={p.alt}
                    onClick={() => setI(k)}
                    aria-label={`Show ${p.alt}`}
                    className={`h-[2px] transition-all duration-700 ${k === i ? 'w-10 bg-white' : 'w-5 bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
              <ArrowLink to="/gallery" light>View the gallery</ArrowLink>
            </div>
          </div>
        )}
      </FullSlider>
    </section>
  )
}

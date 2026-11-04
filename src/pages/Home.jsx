import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, animate } from 'framer-motion'
import { useSplashDone } from '../context'
import {
  Reveal, MaskText, Img, ParallaxImg, CurtainImg, Eyebrow, SectionHeading, Ornament, CtaBand, ArrowLink, ease,
} from '../components/ui'
import Icon from '../components/Icon'
import ArchMark from '../components/ArchMark'
import { Birds, Fireflies, Magnetic, Mist, Tilt } from '../components/magic'
import { images, rooms, experiences, services, testimonials, dayAtVilla, attractions, gallery } from '../data/site'

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
function Hero() {
  const ready = useSplashDone()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const state = ready ? 'show' : 'hidden'

  const line = {
    hidden: { y: '110%' },
    show: (i) => ({ y: 0, transition: { duration: 1, delay: 0.05 + i * 0.1, ease } }),
  }
  const fade = {
    hidden: { opacity: 0, y: 24 },
    show: (d) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease } }),
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-28 lg:flex lg:min-h-screen lg:flex-col">
      {/* soft terracotta glow, like the sun in the emblem */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,228,216,0.9) 0%, rgba(251,244,239,0.5) 40%, transparent 70%)' }} />
      {ready && <Fireflies count={14} color="rgba(201,112,74,0.45)" />}

      <div className="container-luxe relative grid items-center gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-6">
          <motion.div variants={fade} custom={0} initial="hidden" animate={state}>
            <Eyebrow>Haputale · Sri Lanka</Eyebrow>
          </motion.div>

          <h1 className="mt-8 font-display text-[3.4rem] leading-[0.92] text-ink sm:text-7xl xl:text-[6.5rem]">
            {['Beneath', 'the misty', 'peaks.'].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? 'shimmer-text italic' : ''}`}
                  variants={line}
                  custom={i}
                  initial="hidden"
                  animate={state}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-md text-[16px] leading-relaxed text-ink-soft sm:text-base"
            variants={fade}
            custom={0.3}
            initial="hidden"
            animate={state}
          >
            A private luxury villa perched in Sri Lanka’s highest tea country — where mornings begin above the clouds
            and evenings end beside the fire.
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4" variants={fade} custom={0.4} initial="hidden" animate={state}>
            <Magnetic className="w-full sm:w-auto"><Link to="/book" className="btn-primary w-full">Reserve your stay</Link></Magnetic>
            <Magnetic className="w-full sm:w-auto"><Link to="/rooms" className="btn-outline w-full">Explore suites</Link></Magnetic>
          </motion.div>
        </motion.div>

        <div className="relative lg:col-span-6">
          <motion.div
            className="arch relative ml-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden lg:h-[68vh] lg:max-w-none lg:aspect-auto"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div style={{ y: imgY }} className="absolute -inset-y-24 inset-x-0">
              <motion.div
                className="h-full w-full"
                initial={{ scale: 1.3 }}
                animate={ready ? { scale: 1 } : {}}
                transition={{ duration: 2.4, ease }}
              >
                <Img src={images.hero} alt="Mist rolling over the mountains near Haputale" className="h-full w-full object-cover" />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            {ready && <Mist />}
            {ready && <Birds start={1.8} />}
          </motion.div>

          {/* overlapping small image */}
          <motion.div
            className="absolute -bottom-8 left-0 hidden w-44 overflow-hidden border-[6px] border-white shadow-2xl shadow-ink/10 sm:block lg:-left-10 lg:w-56"
            variants={fade}
            custom={0.6}
            initial="hidden"
            animate={state}
          >
            <Img src={images.tea} alt="Ceylon tea" className="aspect-square h-full w-full object-cover" />
          </motion.div>

          {/* rotating badge */}
          <motion.div
            className="absolute -top-6 right-4 hidden h-32 w-32 sm:block lg:-left-16 lg:right-auto lg:top-24"
            variants={fade}
            custom={0.7}
            initial="hidden"
            animate={state}
          >
            <RotatingBadge />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="container-luxe relative z-10 pb-12 pt-12 sm:pb-16 sm:pt-20 lg:pb-10 lg:pt-16"
        variants={fade}
        custom={0.5}
        initial="hidden"
        animate={state}
      >
        <BookingBar />
      </motion.div>
    </section>
  )
}

function RotatingBadge() {
  return (
    <div className="relative h-full w-full rounded-full bg-white shadow-xl shadow-ink/5">
      <motion.svg viewBox="0 0 100 100" className="h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        <defs>
          <path id="circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-ink font-caps text-[8.4px] tracking-[0.32em]">
          <textPath href="#circle">LUXURY VILLA • HAPUTALE • SRI LANKA •</textPath>
        </text>
      </motion.svg>
      <ArchMark className="absolute left-1/2 top-1/2 h-12 w-auto -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}

function BookingBar() {
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({ checkin: '', checkout: '', guests: '2' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    navigate(`/book?${new URLSearchParams(form).toString()}`)
  }
  return (
    <form
      onSubmit={submit}
      className="grid gap-0 border border-ink/10 bg-white/95 shadow-2xl shadow-ink/5 backdrop-blur sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-[1fr_1fr_1fr_auto]"
    >
      {[
        { k: 'checkin', label: 'Check in', type: 'date', min: today },
        { k: 'checkout', label: 'Check out', type: 'date', min: form.checkin || today },
      ].map((f) => (
        <label key={f.k} className="flex flex-col gap-1 border-b border-ink/10 px-6 py-4 sm:border-r lg:border-b-0">
          <span className="label-luxe">{f.label}</span>
          <input type={f.type} min={f.min} value={form[f.k]} onChange={set(f.k)} className="border-0 bg-transparent p-0 text-sm text-ink focus:outline-none focus:ring-0" />
        </label>
      ))}
      <label className="flex flex-col gap-1 border-b border-ink/10 px-6 py-4 sm:border-r lg:border-b-0">
        <span className="label-luxe">Guests</span>
        <select value={form.guests} onChange={set('guests')} className="border-0 bg-transparent p-0 text-sm text-ink focus:outline-none focus:ring-0">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
          ))}
        </select>
      </label>
      <button className="btn-primary h-full !py-5">Check availability</button>
    </form>
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
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-12 gap-4">
            <CurtainImg src={images.villa} alt="Villa Cavo" className="arch col-span-7 aspect-[3/4]" />
            <div className="col-span-5 flex flex-col justify-end gap-4 pb-10">
              <CurtainImg src={images.living} alt="Living lounge" className="aspect-[3/4]" delay={0.2} />
              <Reveal delay={0.3}>
                <p className="font-display text-lg italic leading-snug text-terra-500">“A home in the clouds.”</p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-10">
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

          <div className="mt-14 grid grid-cols-3 gap-px overflow-hidden border border-ink/10 bg-ink/10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-white p-4 sm:p-5">
                <p className="font-display text-3xl text-terra-500 sm:text-4xl">
                  <Counter to={s.n} suffix={s.s} />
                </p>
                <p className="mt-2 font-caps text-[10px] tracking-[0.12em] text-ink-mute sm:tracking-[0.25em]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
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
      <Tilt className="arch overflow-hidden">
      <div className="arch relative aspect-[3/4] overflow-hidden">
        <Img src={room.image} alt={room.name} className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute left-6 top-24 font-caps text-[11px] tracking-[0.3em] text-white/80">0{i + 1}</span>
        <div className="absolute inset-x-6 bottom-6 text-white">
          <p className="font-caps text-[11px] tracking-[0.3em] text-terra-100">{room.price} / night</p>
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

  if (!isDesktop) {
    return (
      <section className="bg-cream py-24">
        <div className="container-luxe">{header}</div>
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8">
          {rooms.map((r, i) => (
            <div key={r.slug} className="snap-start">
              <RoomCard room={r} i={i} />
            </div>
          ))}
        </div>
      </section>
    )
  }

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
                className="group relative z-10 grid grid-cols-12 items-center gap-4 border-b border-ink/10 py-7 sm:py-9"
              >
                <span className="col-span-2 font-caps text-xs text-terra-500 sm:col-span-1">0{i + 1}</span>
                <h3 className="col-span-10 text-2xl text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-terra-500 sm:col-span-7 sm:text-4xl lg:text-5xl">
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
    </section>
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
          <Reveal delay={0.3}>
            <CurtainImg src={images.coffee} alt="Morning coffee on the terrace" className="mt-10 hidden aspect-[4/3] lg:block" />
          </Reveal>
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
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <SectionHeading
            eyebrow="Dining"
            title={['Flavours of', 'the highlands']}
            text="Our chef blends heirloom Sri Lankan recipes with produce from local farms and our own kitchen garden. Breakfast on the lawn, high tea at four, candlelit dinners by the fire."
          />
          <Reveal delay={0.3}>
            <ul className="mt-10 space-y-4 border-t border-ink/10 pt-8">
              {['Traditional Sri Lankan rice & curry', 'Colonial high tea service', 'Private candlelit dinners', 'Garden-to-table breakfasts'].map((t) => (
                <li key={t} className="flex items-center gap-4 text-[16px] text-ink-soft">
                  <Icon name="leaf" className="h-4 w-4 text-terra-500" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ArrowLink to="/dining">Explore dining</ArrowLink>
            </div>
          </Reveal>
        </div>
        <div className="relative order-1 lg:order-2 lg:col-span-7">
          <ParallaxImg src={images.dining} alt="Dining at Villa Cavo" className="aspect-[4/3] w-full lg:w-[85%] lg:ml-auto" strength={60} />
          <Reveal delay={0.3} className="absolute -bottom-10 left-0 w-2/5 border-[6px] border-white shadow-2xl shadow-ink/10">
            <Img src={images.food} alt="Chef's plate" className="aspect-square w-full object-cover" />
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
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-luxe grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <CurtainImg src={images.landscape} alt="Haputale landscape" className="arch aspect-[4/5]" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow="The Location"
            title={['Haputale —', 'the edge of the hills']}
            text="Perched at the southern edge of the central highlands, Haputale offers some of Sri Lanka’s most dramatic views — on a clear day, all the way to the southern coast."
          />
          <ul className="mt-12 border-t border-ink/10">
            {attractions.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <li className="group flex items-center justify-between border-b border-ink/10 py-5">
                  <span className="flex items-center gap-4 text-[16px] text-ink transition-transform duration-500 group-hover:translate-x-2">
                    <Icon name="mountain" className="h-4 w-4 text-terra-500" />
                    {a.name}
                  </span>
                  <span className="font-caps text-[11px] tracking-[0.25em] text-ink-mute">{a.distance}</span>
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
  const pics = gallery.slice(0, 6)
  return (
    <section className="bg-cream py-24">
      <div className="container-luxe text-center">
        <Reveal>
          <Eyebrow center>Moments</Eyebrow>
          <h2 className="mt-5 text-4xl text-ink sm:text-5xl">
            Life at <span className="italic text-terra-500">Villa Cavo</span>
          </h2>
        </Reveal>
        <Ornament className="mt-8" />
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 lg:grid-cols-6">
        {pics.map((p, i) => (
          <Reveal key={p.alt} delay={i * 0.07} y={i % 2 ? 60 : 20}>
            <Link to="/gallery" data-cursor="View" className={`group block overflow-hidden ${i % 2 ? 'arch' : ''}`}>
              <Img src={p.src} alt={p.alt} className="aspect-[3/4] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <ArrowLink to="/gallery">View the gallery</ArrowLink>
      </div>
    </section>
  )
}

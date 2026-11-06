import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ArchMark from './ArchMark'
import { Leaf } from './Splash'
import { Birds, Magnetic, Mist } from './magic'
import { contact } from '../data/site'

export const ease = [0.22, 1, 0.36, 1]

/** Fade + rise on scroll into view */
export function Reveal({ children, delay = 0, y = 40, x = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Heading text that slides up line by line out of a mask */
export function MaskText({ lines, className = '', delay = 0, as: Tag = 'h2' }) {
  // The in-view trigger sits on the heading itself: each line starts fully clipped,
  // and a line that wraps onto two rows would otherwise never count as "in view".
  const MotionTag = motion[Tag] || motion.h2
  return (
    <MotionTag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '105%' }, show: { y: 0 } }}
            transition={{ duration: 1.1, delay: delay + i * 0.12, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/** Image with graceful fallback when a URL fails */
export function Img({ src, alt = '', className = '', ...rest }) {
  const [err, setErr] = useState(false)
  if (err || !src)
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-terra-100 via-sand to-terra-200 ${className}`}
      >
        <ArchMark className="h-16 w-auto opacity-40" />
      </div>
    )
  return <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className={className} {...rest} />
}

/** Image that drifts against scroll for depth */
export function ParallaxImg({ src, alt, className = '', strength = 80, imgClass = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, top: -strength - 20, bottom: -strength - 20 }} className="absolute inset-x-0">
        <Img src={src} alt={alt} className={`h-full w-full object-cover ${imgClass}`} />
      </motion.div>
    </div>
  )
}

/** Image reveal: a terracotta curtain wipes away */
export function CurtainImg({ src, alt, className = '', delay = 0 }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay, ease }}
      >
        <Img src={src} alt={alt} className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 origin-top bg-terra-100"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  )
}

export function Eyebrow({ children, center = false, light = false, className = '' }) {
  const line = `h-px w-8 ${light ? 'bg-white/60' : 'bg-terra-500'}`
  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''} ${className}`}>
      <span className={line} />
      <span className={`eyebrow ${light ? '!text-terra-100' : ''}`}>{children}</span>
      {center && <span className={line} />}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, text, center = false, light = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow center={center} light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <MaskText
        lines={Array.isArray(title) ? title : [title]}
        className={`mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-ink'}`}
      />
      {text && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-[16px] leading-relaxed sm:text-base ${light ? 'text-white/80' : 'text-ink-soft'}`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Ornament({ className = '', light = false }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <motion.span
        className={`h-px w-20 origin-right ${light ? 'bg-white/60' : 'bg-terra-500'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      />
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${light ? 'text-white' : 'text-terra-500'}`}><Leaf /></svg>
      <motion.span
        className={`h-px w-20 origin-left ${light ? 'bg-white/60' : 'bg-terra-500'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      />
    </div>
  )
}

/** Inner-page hero: arch image + big serif title on white */
export function PageHero({ eyebrow, title, text, image, images: pair, square = false }) {
  return (
    <section className="relative overflow-hidden bg-white pt-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 80% 55%, rgba(245,228,216,0.9) 0%, rgba(251,244,239,0.6) 45%, transparent 75%), linear-gradient(to bottom, #FFFFFF 0%, #FBF4EF 55%, #F5E4D8 100%)',
        }}
      />
      <div className="container-luxe grid items-end gap-10 pb-16 lg:grid-cols-12 lg:pb-24">
        <div className={pair ? 'lg:col-span-5' : 'lg:col-span-7'}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <h1 className={`mt-6 text-5xl leading-[0.95] text-ink sm:text-7xl ${pair ? 'lg:text-6xl xl:text-7xl' : 'lg:text-8xl'}`}>
            {(Array.isArray(title) ? title : [title]).map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i % 2 === 1 ? 'italic text-terra-500' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          {text && (
            <motion.p
              className="mt-8 max-w-lg text-[16px] leading-relaxed text-ink-soft sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              {text}
            </motion.p>
          )}
        </div>

        {/* Arch image sweeps in from the right edge */}
        <motion.div
          className={pair ? 'lg:col-span-7' : 'lg:col-span-5'}
          initial={{ opacity: 0, x: 260, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.25, ease }}
        >
          {pair ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {pair.map((src, i) => (
                <div key={src} className="relative aspect-square overflow-hidden shadow-[0_30px_60px_-25px_rgba(63,25,11,0.45)]">
                  <motion.div
                    className="h-full w-full"
                    initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.25, x: 60 }}
                    animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1, x: 0 }}
                    transition={{ duration: 1.6, delay: 0.35 + i * 0.2, ease }}
                  >
                    <Img src={src} alt="" className="h-full w-full object-cover" />
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${square ? 'aspect-square' : 'arch aspect-[4/5]'} relative mx-auto max-w-sm overflow-hidden shadow-[0_30px_60px_-25px_rgba(63,25,11,0.45)] lg:ml-auto lg:mr-0`}>
              <motion.div
                className="h-full w-full"
                initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.25, x: 60 }}
                animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1, x: 0 }}
                transition={{ duration: 1.6, delay: 0.35, ease }}
              >
                <Img src={image} alt="" className="h-full w-full object-cover" />
              </motion.div>
              <Mist />
              <Birds count={3} start={1.8} every={9} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/** Full-width booking call-to-action band */
export function CtaBand({ image, title = ['Your escape', 'above the clouds'], text }) {
  return (
    <section className="relative">
      <ParallaxImg src={image} alt="" className="h-[80vh] min-h-[520px]" strength={120} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/60" />
      <Birds start={2} />
      <Mist />
      <div className="absolute inset-0 flex items-center">
        <div className="container-luxe text-center text-white">
          <Reveal>
            <p className="font-caps text-[12px] tracking-luxe text-terra-100">Enquiries</p>
          </Reveal>
          <MaskText lines={title} className="mt-6 text-5xl italic leading-[1] sm:text-7xl lg:text-8xl" />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-md text-white/85">
              {text || 'Limited suites, limitless views. Send us an enquiry by WhatsApp or email and our hosts will reply personally.'}
            </p>
            <div className="mx-auto mt-10 flex max-w-xs flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
              <Magnetic className="w-full sm:w-auto"><Link to="/book" className="btn-primary w-full">Make an enquiry</Link></Magnetic>
              <Magnetic className="w-full sm:w-auto"><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="btn-ghost w-full">WhatsApp us</a></Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function ArrowLink({ to, children, light = false }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-4 font-caps text-[12px] uppercase tracking-[0.3em] ${
        light ? 'text-white' : 'text-terra-500'
      }`}
    >
      {children}
      <span className="relative flex h-px w-10 items-center bg-current transition-all duration-500 group-hover:w-16">
        <span className="absolute right-0 h-2 w-2 rotate-45 border-r border-t border-current" />
      </span>
    </Link>
  )
}

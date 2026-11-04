import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Reveal, Img, SectionHeading, CurtainImg, Eyebrow, MaskText, CtaBand, ease } from '../components/ui'
import Icon from '../components/Icon'
import { Tilt, Fireflies } from '../components/magic'
import { images, experiences, services } from '../data/site'

const spa = [
  { name: 'Abhyanga Ritual', time: '90 min', text: 'Full-body warm herbal oil massage to balance the doshas.' },
  { name: 'Shirodhara', time: '60 min', text: 'A continuous stream of warm oil over the forehead for deep calm.' },
  { name: 'Ceylon Tea Scrub', time: '45 min', text: 'Exfoliating scrub with green tea, coconut and island spices.' },
  { name: 'Highland Herbal Steam', time: '30 min', text: 'Detoxifying steam infused with garden herbs.' },
]

export default function Experiences() {
  const cats = ['All', ...new Set(experiences.map((e) => e.category))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? experiences : experiences.filter((e) => e.category === cat)

  return (
    <>
      <PageHero
        eyebrow="Experiences & Services"
        title={['Moments', 'worth the climb']}
        text="Sunrise viewpoints, tea trails, sacred monasteries and Ayurvedic rituals — curated by our hosts and tailored to you."
        image={images.hike}
      />

      {/* Filterable experiences */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="container-luxe">
          <div className="flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative px-5 py-2.5 font-caps text-[11px] tracking-[0.3em] transition-colors ${cat === c ? 'text-white' : 'text-ink-soft hover:text-terra-500'}`}
              >
                {cat === c && <motion.span layoutId="exp-pill" className="absolute inset-0 bg-terra-500" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((e, i) => (
                <motion.article
                  layout
                  key={e.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease }}
                  className="group"
                >
                  <Tilt className="arch overflow-hidden">
                  <div className="arch relative aspect-[4/5] overflow-hidden">
                    <Img src={e.image} alt={e.title} className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-110" />
                    <span className="absolute left-1/2 top-16 -translate-x-1/2 bg-white/90 px-3 py-1 font-caps text-[10px] tracking-[0.3em] text-terra-500">
                      {e.category}
                    </span>
                  </div>
                  </Tilt>
                  <div className="mt-6 flex items-center justify-between">
                    <h3 className="text-3xl text-ink transition-colors group-hover:text-terra-500">{e.title}</h3>
                  </div>
                  <p className="mt-1 flex items-center gap-2 font-caps text-[11px] tracking-[0.25em] text-ink-mute">
                    <Icon name="clock" className="h-3.5 w-3.5" /> {e.duration}
                  </p>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{e.text}</p>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Spa */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <CurtainImg src={images.spa} alt="Ayurvedic spa" className="arch aspect-[4/5] max-w-lg" />
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Wellness</Eyebrow>
            <MaskText lines={['The Highland', 'Spa']} className="mt-5 text-5xl leading-[1.02] text-ink sm:text-6xl" />
            <Reveal delay={0.2}>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
                Ancient Ayurvedic wisdom meets the restorative calm of the mountains. Treatments are performed by
                trained therapists using oils and herbs prepared fresh each day.
              </p>
            </Reveal>
            <div className="mt-10 border-t border-ink/10">
              {spa.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08} className="flex items-start justify-between gap-6 border-b border-ink/10 py-5">
                  <div>
                    <h3 className="text-2xl text-ink">{s.name}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
                  </div>
                  <span className="shrink-0 font-caps text-[11px] tracking-[0.25em] text-terra-500">{s.time}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading center eyebrow="Villa Services" title={['Everything,', 'taken care of']} />
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-16 sm:gap-10 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.08} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-terra-500/30 text-terra-500 sm:h-20 sm:w-20">
                  <Icon name={s.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mt-5 text-lg leading-tight text-ink sm:mt-6 sm:text-2xl">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[240px] text-[13px] leading-relaxed text-ink-soft sm:text-sm">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrations */}
      <section className="relative overflow-hidden bg-terra-500 py-24 text-white sm:py-32">
        <Fireflies count={18} />
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="font-caps text-[12px] tracking-luxe text-terra-100">Celebrations</p>
            <MaskText lines={['Honeymoons, proposals', '& private occasions']} className="mt-5 text-4xl italic leading-[1.1] sm:text-5xl" />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-white/85">
                From a candlelit dinner on a misty ridge to an intimate vow renewal in the garden, our team will help you
                mark life’s most precious moments in an unforgettable setting.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal><Img src={images.dining2} alt="" className="arch aspect-[3/4] w-full object-cover" /></Reveal>
            <Reveal delay={0.15}><Img src={images.pool} alt="" className="mt-12 aspect-[3/4] w-full object-cover" /></Reveal>
          </div>
        </div>
      </section>

      <CtaBand image={images.waterfall} title={['Let us plan', 'your journey']} />
    </>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Reveal, Img, Eyebrow, SectionHeading, CtaBand, ease } from '../components/ui'
import Icon from '../components/Icon'
import { Fireflies } from '../components/magic'
import { images, rooms, contact } from '../data/site'

const amenities = [
  'Hand-loomed linens', 'Ceylon tea & coffee bar', 'Luxury bath amenities', 'Heated rain showers',
  'Daily turndown service', 'Complimentary Wi-Fi', 'In-room safe', 'Plush robes & slippers',
  'Daily breakfast', 'Evening fireplace setup', 'Mountain-view seating', 'Bottled spring water',
]

export default function Rooms() {
  return (
    <>
      <PageHero
        eyebrow="Rooms & Suites"
        title={['Rest in', 'quiet luxury']}
        text="Each of our suites is a private world — warm timber, soft linens, a fireplace for misty evenings, and views that change with every hour."
        image={images.living}
        square
      />

      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="container-luxe space-y-28 sm:space-y-36">
          {rooms.map((r, i) => (
            <RoomRow key={r.slug} room={r} i={i} />
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="relative overflow-hidden bg-terra-500 py-24 sm:py-32">
        <Fireflies count={16} />
        <div className="container-luxe relative">
          <SectionHeading center light eyebrow="In every suite" title="Thoughtful comforts" />
          <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a, i) => (
              <Reveal key={a} delay={(i % 3) * 0.08} className="flex items-center gap-4 border-b border-white/20 pb-5">
                <Icon name="leaf" className="h-4 w-4 shrink-0 text-terra-100" />
                <span className="text-[16px] text-white/90">{a}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="container-luxe grid gap-10 md:grid-cols-3">
          {[
            { t: 'Check-in & out', d: `Check-in from ${contact.checkIn}, check-out by ${contact.checkOut}. Early arrival and late departure on request.` },
            { t: 'Children', d: 'Families are warmly welcome. Cots and children’s amenities available in the Highland Family Villa.' },
            { t: 'Cancellation', d: 'Free cancellation up to 14 days before arrival. Please contact us for festive-season terms.' },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} className="border-l border-terra-500 pl-6">
              <h3 className="text-2xl text-ink">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand image={images.bedroom} title={['Find your', 'perfect suite']} />
    </>
  )
}

function RoomRow({ room, i }) {
  const [img, setImg] = useState(0)
  const flip = i % 2 === 1
  return (
    <article className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-square overflow-hidden sm:aspect-[4/3]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={img}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Img src={room.gallery[img]} alt={room.name} className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-3">
          {room.gallery.map((g, k) => (
            <button
              key={k}
              onClick={() => setImg(k)}
              aria-label={`Show image ${k + 1}`}
              className={`h-16 w-16 overflow-hidden transition-all duration-500 ${k === img ? 'opacity-100 ring-1 ring-terra-500 ring-offset-2' : 'opacity-50 hover:opacity-100'}`}
            >
              <Img src={g} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </Reveal>

      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <Reveal>
          <Eyebrow>Suite 0{i + 1}</Eyebrow>
          <h2 className="mt-5 text-4xl leading-tight text-ink sm:text-5xl">{room.name}</h2>
          <p className="mt-3 font-display text-xl italic text-terra-500">{room.tagline}</p>
          <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">{room.description}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 grid grid-cols-2 gap-5 border-y border-ink/10 py-6">
            {[
              ['size', room.size],
              ['users', room.guests],
              ['bed', room.bed],
              ['view', room.view],
            ].map(([ic, v]) => (
              <div key={ic} className="flex items-center gap-3 text-sm text-ink-soft">
                <Icon name={ic} className="h-5 w-5 shrink-0 text-terra-500" />
                {v}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {room.features.map((f) => (
              <span key={f} className="border border-ink/10 px-3 py-1.5 text-xs text-ink-soft">{f}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <Link to={`/book?room=${room.slug}`} className="btn-primary">Enquire about this suite</Link>
            <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hello Villa Cavo, I would like to know more about the ${room.name}.`)}`} target="_blank" rel="noreferrer" className="btn-outline">WhatsApp us</a>
          </div>
        </Reveal>
      </div>
    </article>
  )
}

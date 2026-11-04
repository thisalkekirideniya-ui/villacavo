import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Img, Eyebrow, MaskText, ease } from '../components/ui'
import Icon from '../components/Icon'
import ArchMark from '../components/ArchMark'
import { rooms, contact } from '../data/site'
import { scrollToTop } from '../lib/scroll'

const extras = ['Airport transfer', 'Lipton’s Seat sunrise tour', 'Spa ritual', 'Private candlelit dinner', 'Honeymoon setup']

export default function Booking() {
  const [params] = useSearchParams()
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    checkin: params.get('checkin') || '',
    checkout: params.get('checkout') || '',
    guests: params.get('guests') || '2',
    room: params.get('room') || rooms[0].slug,
    name: '',
    email: '',
    phone: '',
    country: '',
    notes: '',
    extras: [],
  })
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const toggle = (x) => setForm({ ...form, extras: form.extras.includes(x) ? form.extras.filter((e) => e !== x) : [...form.extras, x] })

  const room = rooms.find((r) => r.slug === form.room) || rooms[0]
  const nights = useMemo(() => {
    if (!form.checkin || !form.checkout) return 0
    const n = (new Date(form.checkout) - new Date(form.checkin)) / 86400000
    return n > 0 ? n : 0
  }, [form.checkin, form.checkout])

  const message = `Hello Villa Cavo, I'd like to request a reservation.
Suite: ${room.name}
Check-in: ${form.checkin || '-'}
Check-out: ${form.checkout || '-'} (${nights} night${nights === 1 ? '' : 's'})
Guests: ${form.guests}
Extras: ${form.extras.join(', ') || 'None'}
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Country: ${form.country}
Notes: ${form.notes || '-'}`

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
    scrollToTop()
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white pb-24 pt-32 sm:pt-40">
      <div className="container-luxe">
        <div className="max-w-3xl">
          <Reveal><Eyebrow>Reservations</Eyebrow></Reveal>
          <MaskText as="h1" lines={['Reserve', 'your stay']} className="mt-6 text-5xl leading-[0.95] text-ink sm:text-7xl" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft">
              Share your travel dates and preferences — our reservations team will confirm availability and the best
              direct rate within 24 hours.
            </p>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="mx-auto mt-16 max-w-2xl border border-terra-500/30 bg-cream p-10 text-center sm:p-16"
            >
              <ArchMark animate className="mx-auto h-24 w-auto" />
              <h2 className="mt-8 text-4xl text-ink">Almost there, {form.name.split(' ')[0]}.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                Send your request to our reservations team with one tap — via WhatsApp for the fastest reply, or by email.
              </p>
              <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
                <a className="btn-primary" target="_blank" rel="noreferrer" href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`}>Send via WhatsApp</a>
                <a className="btn-outline" href={`mailto:${contact.email}?subject=${encodeURIComponent('Reservation request — ' + room.name)}&body=${encodeURIComponent(message)}`}>Send via email</a>
              </div>
              <button onClick={() => setDone(false)} className="mt-8 text-sm text-ink-mute underline-offset-4 hover:underline">← Edit request</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="mt-16 grid gap-16 lg:grid-cols-12">
              <div className="space-y-14 lg:col-span-7">
                {/* Step 1 */}
                <Step n="01" title="Your stay">
                  <div className="grid gap-8 sm:grid-cols-3">
                    <Field label="Check in"><input required type="date" min={today} value={form.checkin} onChange={set('checkin')} className="input-luxe" /></Field>
                    <Field label="Check out"><input required type="date" min={form.checkin || today} value={form.checkout} onChange={set('checkout')} className="input-luxe" /></Field>
                    <Field label="Guests">
                      <select value={form.guests} onChange={set('guests')} className="input-luxe">
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </Field>
                  </div>
                </Step>

                {/* Step 2 */}
                <Step n="02" title="Choose your suite">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {rooms.map((r) => (
                      <label key={r.slug} className={`group relative flex cursor-pointer gap-4 border p-3 transition-all ${form.room === r.slug ? 'border-terra-500 bg-terra-50' : 'border-ink/10 hover:border-terra-300'}`}>
                        <input type="radio" name="room" value={r.slug} checked={form.room === r.slug} onChange={set('room')} className="sr-only" />
                        <Img src={r.image} alt="" className="arch h-24 w-20 shrink-0 object-cover" />
                        <div className="py-1">
                          <p className="font-display text-xl leading-tight text-ink">{r.name}</p>
                          <p className="mt-1 text-xs text-ink-mute">{r.guests} · {r.size}</p>
                          <p className="mt-2 font-caps text-[10px] tracking-[0.25em] text-terra-500">{r.price}</p>
                        </div>
                        {form.room === r.slug && (
                          <motion.span layoutId="room-check" className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-terra-500 text-[11px] text-white">✓</motion.span>
                        )}
                      </label>
                    ))}
                  </div>
                </Step>

                {/* Step 3 */}
                <Step n="03" title="Enhance your stay">
                  <div className="flex flex-wrap gap-3">
                    {extras.map((x) => (
                      <button type="button" key={x} onClick={() => toggle(x)} className={`border px-4 py-2.5 text-sm transition-all ${form.extras.includes(x) ? 'border-terra-500 bg-terra-500 text-white' : 'border-ink/15 text-ink-soft hover:border-terra-500'}`}>
                        {form.extras.includes(x) ? '✓ ' : '+ '}{x}
                      </button>
                    ))}
                  </div>
                </Step>

                {/* Step 4 */}
                <Step n="04" title="Your details">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field label="Full name"><input required value={form.name} onChange={set('name')} className="input-luxe" /></Field>
                    <Field label="Email"><input required type="email" value={form.email} onChange={set('email')} className="input-luxe" /></Field>
                    <Field label="Phone / WhatsApp"><input required value={form.phone} onChange={set('phone')} className="input-luxe" /></Field>
                    <Field label="Country"><input value={form.country} onChange={set('country')} className="input-luxe" /></Field>
                    <Field label="Special requests" className="sm:col-span-2"><textarea rows={3} value={form.notes} onChange={set('notes')} className="input-luxe resize-none" placeholder="Celebrations, dietary needs, arrival time…" /></Field>
                  </div>
                </Step>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <div className="overflow-hidden border border-ink/10 bg-cream">
                    <AnimatePresence mode="wait">
                      <motion.div key={room.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <Img src={room.image} alt={room.name} className="aspect-[16/10] w-full object-cover" />
                      </motion.div>
                    </AnimatePresence>
                    <div className="p-8">
                      <p className="eyebrow">Your request</p>
                      <h3 className="mt-3 text-3xl text-ink">{room.name}</h3>
                      <dl className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
                        {[
                          ['Check in', form.checkin || '—'],
                          ['Check out', form.checkout || '—'],
                          ['Nights', nights || '—'],
                          ['Guests', form.guests],
                          ['Rate', `${room.price} / night`],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <dt className="text-ink-mute">{k}</dt>
                            <dd className="text-ink">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      {form.extras.length > 0 && (
                        <p className="mt-4 text-xs leading-relaxed text-ink-soft">Extras: {form.extras.join(', ')}</p>
                      )}
                      <button className="btn-primary mt-8 w-full">Request reservation</button>
                      <ul className="mt-6 space-y-2 text-xs text-ink-mute">
                        {['Best rate when booking direct', 'Breakfast included', 'Free cancellation up to 14 days'].map((t) => (
                          <li key={t} className="flex items-center gap-2"><Icon name="leaf" className="h-3.5 w-3.5 text-terra-500" />{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </aside>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Step({ n, title, children }) {
  return (
    <Reveal>
      <div className="mb-8 flex items-baseline gap-4 border-b border-ink/10 pb-4">
        <span className="font-caps text-xs text-terra-500">{n}</span>
        <h2 className="text-3xl text-ink">{title}</h2>
      </div>
      {children}
    </Reveal>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="label-luxe">{label}</span>
      {children}
    </label>
  )
}

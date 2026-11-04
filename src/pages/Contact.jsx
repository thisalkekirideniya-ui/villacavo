import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Reveal, SectionHeading, Eyebrow, ease } from '../components/ui'
import Icon from '../components/Icon'
import { images, contact } from '../data/site'

const faqs = [
  { q: 'How do I get to Villa Cavo?', a: 'Haputale is around 5–6 hours by road from Colombo airport, or a scenic train ride from Kandy (approx. 5 hrs) or Ella (approx. 1 hr). We gladly arrange private chauffeured transfers.' },
  { q: 'What is the best time to visit?', a: 'Haputale is lovely year-round. January to April generally brings the clearest mornings and best views; the misty months have their own magical atmosphere.' },
  { q: 'Is breakfast included?', a: 'Yes — a full Sri Lankan or continental breakfast is included with every stay. Lunch, high tea and dinner can be added.' },
  { q: 'Do you cater to dietary requirements?', a: 'Absolutely. Let us know in advance and our chef will prepare vegetarian, vegan, gluten-free or allergy-friendly menus.' },
  { q: 'What should I pack?', a: 'Evenings can be cool (12–16°C), so bring a warm layer, comfortable walking shoes and a light rain jacket.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General enquiry', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`[Villa Cavo] ${form.subject}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const cards = [
    { icon: 'phone', t: 'Call us', v: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: 'mail', t: 'Email', v: contact.email, href: `mailto:${contact.email}` },
    { icon: 'pin', t: 'Visit', v: 'Haputale, Sri Lanka', href: contact.mapLink },
    { icon: 'clock', t: 'Reception', v: 'Open 24 hours', href: null },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={['We’d love', 'to hear from you']}
        text="Whether you’re planning a getaway, a celebration or simply have a question, our team is here to help."
        image={images.cabin}
      />

      <section className="relative overflow-hidden bg-white py-20">
        <div className="container-luxe">
        <div className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 lg:grid-cols-4">
          {cards.map((c, i) => {
            const Inner = (
              <>
                <Icon name={c.icon} className="h-6 w-6 text-terra-500 sm:h-7 sm:w-7" />
                <p className="mt-4 font-caps text-[10px] tracking-[0.2em] text-ink-mute sm:mt-6 sm:text-[11px] sm:tracking-[0.3em]">{c.t}</p>
                <p className="mt-2 break-words font-display text-lg leading-snug text-ink sm:text-2xl">{c.v}</p>
              </>
            )
            return (
              <Reveal key={c.t} delay={i * 0.08} className="bg-white">
                {c.href ? (
                  <a href={c.href} target={c.icon === 'pin' ? '_blank' : undefined} rel="noreferrer" className="block h-full p-5 transition-colors hover:bg-cream sm:p-8">{Inner}</a>
                ) : (
                  <div className="h-full p-5 sm:p-8">{Inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white pb-24 sm:pb-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Send a message" title={['Begin the', 'conversation']} />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 border border-terra-500/30 bg-terra-50 p-10">
                  <h3 className="text-3xl text-ink">Thank you, {form.name.split(' ')[0] || 'friend'}.</h3>
                  <p className="mt-3 text-[16px] text-ink-soft">Your email app should have opened with your message. If not, write to us at <a className="text-terra-500" href={`mailto:${contact.email}`}>{contact.email}</a>. We usually reply within a few hours.</p>
                  <button onClick={() => setSent(false)} className="btn-outline mt-8">Send another</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="mt-12 grid gap-8 sm:grid-cols-2" exit={{ opacity: 0 }}>
                  <Field label="Full name" className="sm:col-span-1"><input required value={form.name} onChange={set('name')} className="input-luxe" placeholder="Your name" /></Field>
                  <Field label="Email"><input required type="email" value={form.email} onChange={set('email')} className="input-luxe" placeholder="you@example.com" /></Field>
                  <Field label="Phone"><input value={form.phone} onChange={set('phone')} className="input-luxe" placeholder="+94 ..." /></Field>
                  <Field label="Subject">
                    <select value={form.subject} onChange={set('subject')} className="input-luxe">
                      {['General enquiry', 'Reservations', 'Celebrations & events', 'Transfers & tours', 'Press'].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Message" className="sm:col-span-2"><textarea required rows={5} value={form.message} onChange={set('message')} className="input-luxe resize-none" placeholder="How can we help?" /></Field>
                  <div className="sm:col-span-2">
                    <button className="btn-primary w-full sm:w-auto">Send message</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-6">
            <Reveal className="arch h-full min-h-[360px] overflow-hidden border border-ink/10 sm:min-h-[480px]">
              <iframe
                title="Villa Cavo location map"
                src={contact.mapEmbed}
                className="h-full min-h-[480px] w-full grayscale-[60%] sepia-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-terra-500 py-24 sm:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading light eyebrow="FAQ" title={['Good to', 'know']} />
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>
    </>
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

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="border-t border-white/20">
      {faqs.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.05} className="border-b border-white/20">
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open === i}>
            <span className="font-display text-2xl text-white sm:text-3xl">{f.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-3xl font-light text-white">+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-white/80">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  )
}

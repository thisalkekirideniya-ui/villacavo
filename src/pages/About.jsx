import { PageHero, Reveal, SectionHeading, CurtainImg, ParallaxImg, MaskText, Ornament, CtaBand, Eyebrow } from '../components/ui'
import Icon from '../components/Icon'
import ArchMark from '../components/ArchMark'
import { Fireflies } from '../components/magic'
import { images } from '../data/site'

const values = [
  { icon: 'heart', title: 'Heartfelt Hospitality', text: 'Sri Lankan warmth at its most genuine — we welcome every guest as family.' },
  { icon: 'leaf', title: 'Rooted in Nature', text: 'We tread lightly: local sourcing, plastic-free rooms and support for estate communities.' },
  { icon: 'mountain', title: 'Sense of Place', text: 'Design, food and experiences that celebrate the soul of the Uva highlands.' },
]

const story = [
  { year: 'The Land', text: 'A quiet ridge above Haputale, surrounded by tea estates and cloud forest, where the mist rolls in each afternoon.' },
  { year: 'The Vision', text: 'To create a retreat that feels like a private hill-country home — elegant, intimate and deeply connected to its landscape.' },
  { year: 'The Villa', text: 'Built with local craftsmen using timber, stone and hand-loomed textiles, honouring the colonial bungalows of the region.' },
  { year: 'Today', text: 'Villa Cavo welcomes travellers from around the world seeking stillness, beauty and the finest of Sri Lankan hospitality.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={['A home', 'among the clouds']}
        text="Villa Cavo was born from a love of the hill country — its silence, its seasons and its people. This is our story."
        image={images.villa}
      />

      {/* Intro */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Philosophy" title={['Luxury, slowed', 'to the pace of', 'the mountains']} />
            <Reveal delay={0.2}>
              <p className="mt-8 text-[16px] leading-relaxed text-ink-soft">
                We believe true luxury is found in the details that cannot be rushed: a pot of tea brewed just right,
                the first light catching the peaks, a fire lit before you return from your walk.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                Villa Cavo is not a hotel. It is a carefully crafted hill-country home, where a small team of hosts
                looks after a handful of guests with the warmth and care Sri Lanka is famous for.
              </p>
              <p className="mt-8 font-display text-3xl italic text-terra-500">— The Villa Cavo Family</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <CurtainImg src={images.villa2} alt="Villa exterior" className="arch aspect-[3/4]" />
            <CurtainImg src={images.cabin} alt="Highland surroundings" className="mt-16 aspect-[3/4]" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="relative overflow-hidden bg-terra-500 py-24 sm:py-32">
        <ArchMark color="rgba(255,255,255,0.06)" accent="transparent" className="pointer-events-none absolute -left-16 top-0 h-full w-auto" />
        <Fireflies count={16} />
        <div className="container-luxe relative">
          <SectionHeading center light eyebrow="How it began" title="Our journey" />
          <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {story.map((s, i) => (
              <Reveal key={s.year} delay={i * 0.12} className="relative border-t border-white/30 pt-8">
                <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rotate-45 bg-white" />
                <p className="font-caps text-[12px] tracking-[0.3em] text-terra-100">0{i + 1}</p>
                <h3 className="mt-3 text-3xl text-white">{s.year}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-white/80">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big statement */}
      <section className="relative">
        <ParallaxImg src={images.forest} alt="" className="h-[70vh] min-h-[460px]" strength={100} />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-luxe text-center text-white">
            <MaskText
              lines={['Four suites.', 'Endless horizons.', 'One unforgettable stay.']}
              className="font-display text-4xl italic leading-[1.1] sm:text-6xl"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading center eyebrow="What we stand for" title={['Our values']} />
          <Ornament className="mt-8" />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12} className="group text-center">
                <div className="arch mx-auto flex h-28 w-24 items-end justify-center border border-terra-500/40 pb-6 text-terra-500 transition-colors duration-500 group-hover:bg-terra-500 group-hover:text-white">
                  <Icon name={v.icon} className="h-8 w-8" />
                </div>
                <h3 className="mt-8 text-3xl text-ink">{v.title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-[16px] leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Haputale */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <CurtainImg src={images.mist} alt="Haputale mountains" className="aspect-[5/4]" />
          <div>
            <Eyebrow>Haputale, Sri Lanka</Eyebrow>
            <MaskText lines={['Where the', 'hill country ends']} className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl" />
            <Reveal delay={0.2}>
              <p className="mt-8 text-[16px] leading-relaxed text-ink-soft">
                Haputale sits at over 1,400 metres on the southern rim of Sri Lanka’s central highlands. From its ridges
                the land falls away dramatically, revealing views across the plains to the distant coast.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                It is the land of Lipton’s Seat and Dambatenne, of the Adisham monastery and the famous hill-country
                railway — a cool, misty world far from the heat of the lowlands.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
                {[['18–24°C', 'Daytime'], ['4 hrs', 'From Kandy']].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl text-terra-500">{n}</p>
                    <p className="mt-1 font-caps text-[10px] tracking-[0.25em] text-ink-mute">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <Reveal className="container-luxe flex flex-col items-center text-center">
          <ArchMark className="h-20 w-auto" />
          <p className="mt-6 max-w-2xl font-display text-2xl italic leading-relaxed text-ink-soft sm:text-3xl">
            “We built Villa Cavo so that others could feel what we feel every morning here — wonder.”
          </p>
        </Reveal>
      </section>

      <CtaBand image={images.valley} />
    </>
  )
}

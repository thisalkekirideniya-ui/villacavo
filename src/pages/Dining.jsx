import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Reveal, Img, SectionHeading, CurtainImg, ParallaxImg, MaskText, Ornament, CtaBand, Eyebrow, ease } from '../components/ui'
import { images } from '../data/site'

const menus = {
  Breakfast: [
    { n: 'String Hoppers & Kiri Hodi', d: 'Steamed rice noodles, coconut milk gravy, pol sambol' },
    { n: 'Egg Hoppers', d: 'Crisp bowl-shaped pancakes with a soft egg and lunu miris' },
    { n: 'Highland Fruit Platter', d: 'Passion fruit, papaya, rambutan & mangosteen in season' },
    { n: 'Estate Breakfast', d: 'Free-range eggs your way, sourdough, garden herbs & tomatoes' },
  ],
  'High Tea': [
    { n: 'Single-Estate Uva Tea', d: 'Brewed tableside from leaves grown on neighbouring slopes' },
    { n: 'Finger Sandwiches', d: 'Cucumber & mint, egg & cress, spiced chicken' },
    { n: 'Scones', d: 'Warm scones with clotted cream & Adisham jams' },
    { n: 'Sri Lankan Sweets', d: 'Kavum, kokis and love cake' },
  ],
  Dinner: [
    { n: 'Rice & Curry Feast', d: 'Seven curries — jackfruit, dhal, beetroot, chicken & more' },
    { n: 'Black Pork Curry', d: 'Slow-cooked in roasted spices & goraka' },
    { n: 'Highland Lamb', d: 'Herb-crusted, with roasted root vegetables' },
    { n: 'Watalappan', d: 'Jaggery & cardamom custard with cashew' },
  ],
}

export default function Dining() {
  const [tab, setTab] = useState('Breakfast')
  return (
    <>
      <PageHero
        eyebrow="Dining"
        title={['A table set', 'above the clouds']}
        text="Heritage recipes, highland produce and the warmth of a family kitchen. Every meal at Villa Cavo is a celebration of Sri Lanka."
        image={images.dining}
      />

      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Kitchen"
              title={['From garden', 'to table']}
              text="Our chef draws on recipes passed down through generations, cooking with vegetables from our garden, spices from local markets and tea from the estates around us. Menus change with the seasons — and with your wishes."
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <CurtainImg src={images.food} alt="Chef's plate" className="aspect-[3/4]" />
            <CurtainImg src={images.tea} alt="Ceylon tea" className="arch mt-16 aspect-[3/4]" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Menu tabs */}
      <section className="bg-terra-500 py-24 sm:py-32">
        <div className="container-luxe max-w-4xl">
          <div className="text-center">
            <Reveal><Eyebrow center light>Sample Menu</Eyebrow></Reveal>
            <MaskText lines={['A taste of', 'the highlands']} className="mt-5 text-4xl leading-[1.05] text-white sm:text-6xl" />
            <Ornament light className="mt-8" />
          </div>

          <div className="mt-12 flex justify-center gap-8 border-b border-white/20">
            {Object.keys(menus).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative pb-4 font-caps text-[12px] tracking-[0.3em] ${tab === t ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                {t}
                {tab === t && <motion.span layoutId="menu-line" className="absolute -bottom-px left-0 right-0 h-px bg-white" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              className="mt-12 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
            >
              {menus[tab].map((m) => (
                <li key={m.n}>
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-2xl text-white sm:text-3xl">{m.n}</h3>
                    <span className="flex-1 border-b border-dotted border-white/30" />
                  </div>
                  <p className="mt-1 font-display text-lg italic text-white/70">{m.d}</p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <p className="mt-12 text-center text-sm text-white/70">Dietary requirements gladly accommodated — vegetarian, vegan & gluten-free menus available.</p>
        </div>
      </section>

      {/* Dining venues */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading center eyebrow="Where to dine" title="Every corner, a table" />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              { t: 'The Fireside Room', d: 'Candlelit dinners beside the crackling hearth on cool highland nights.', img: images.dining2 },
              { t: 'The Garden Lawn', d: 'Breakfast and high tea in the open air, with mist rising from the valley.', img: images.coffee },
              { t: 'The Ridge Terrace', d: 'Private sunset dinners for two, high above the Haputale gap.', img: images.valley },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.12} className="group">
                <div className="overflow-hidden">
                  <Img src={v.img} alt={v.t} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-110" />
                </div>
                <h3 className="mt-6 text-3xl text-ink">{v.t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <ParallaxImg src={images.tea} alt="" className="h-[60vh] min-h-[400px]" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
          <MaskText lines={['“Tea is the soul', 'of these hills.”']} className="font-display text-4xl italic sm:text-6xl" />
        </div>
      </section>

      <CtaBand image={images.dining} title={['Reserve a', 'private dinner']} />
    </>
  )
}

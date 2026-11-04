import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero, Img, CtaBand, ease } from '../components/ui'
import { images, gallery } from '../data/site'
import { lockScroll } from '../lib/scroll'

export default function Gallery() {
  const cats = ['All', ...new Set(gallery.map((g) => g.cat))]
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = cat === 'All' ? gallery : gallery.filter((g) => g.cat === cat)

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % list.length)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + list.length) % list.length)
    }
    window.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open, list.length])

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={['Glimpses of', 'Villa Cavo']}
        text="Mist-wrapped mornings, golden evenings and every quiet moment in between."
        image={images.landscape}
      />

      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="container-luxe">
          <div className="flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative px-5 py-2.5 font-caps text-[11px] tracking-[0.3em] transition-colors ${cat === c ? 'text-white' : 'text-ink-soft hover:text-terra-500'}`}
              >
                {cat === c && <motion.span layoutId="gal-pill" className="absolute inset-0 bg-terra-500" transition={{ duration: 0.5, ease }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {list.map((g, i) => (
                <motion.button
                  layout
                  key={g.alt}
                  onClick={() => setOpen(i)}
                  data-cursor="Open"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease }}
                  className={`group relative mb-4 block w-full overflow-hidden break-inside-avoid ${i % 5 === 0 ? 'arch' : ''}`}
                >
                  <Img
                    src={g.src}
                    alt={g.alt}
                    className={`w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110 ${['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[4/3]'][i % 4]}`}
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="text-left text-white">
                      <p className="font-caps text-[10px] tracking-[0.3em] text-terra-100">{g.cat}</p>
                      <p className="font-display text-2xl">{g.alt}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open}
                className="max-h-[85vh] max-w-5xl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease }}
                onClick={(e) => e.stopPropagation()}
              >
                <Img src={list[open].src.replace('w=1600', 'w=2200')} alt={list[open].alt} className="max-h-[78vh] w-auto object-contain" />
                <p className="mt-4 text-center font-display text-xl italic text-white/80">{list[open].alt}</p>
              </motion.div>
            </AnimatePresence>
            {[
              { l: '←', f: (e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length) }, c: 'left-4' },
              { l: '→', f: (e) => { e.stopPropagation(); setOpen((open + 1) % list.length) }, c: 'right-4' },
            ].map((b) => (
              <button key={b.l} onClick={b.f} aria-label={b.l === '←' ? 'Previous' : 'Next'} className={`absolute top-1/2 ${b.c} flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-xl text-white hover:bg-white hover:text-ink`}>
                {b.l}
              </button>
            ))}
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-6 top-6 font-caps text-[12px] tracking-[0.3em] text-white/80 hover:text-white">
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBand image={images.mist} />
    </>
  )
}

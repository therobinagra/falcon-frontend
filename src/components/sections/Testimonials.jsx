import { useEffect, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, BadgeCheck, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Rohit Sharma',
    role: 'Verified Customer · Agra',
    initials: 'RS',
    color: 'from-amber-500 to-orange-400',
    rating: 5,
    text: 'The consultation completely changed my confidence. Products arrived in plain packaging within 3 days. Genuinely discreet and effective — this is how men\u2019s health should work.',
  },
  {
    name: 'Aman Verma',
    role: 'Verified Customer · Delhi',
    initials: 'AV',
    color: 'from-fuchsia-500 to-pink-400',
    rating: 5,
    text: 'Finally a brand I can trust. The doctor was professional, the products worked as promised, and support is available anytime I have a question. Highly recommended.',
  },
  {
    name: 'Karan Mehta',
    role: 'Verified Customer · Bengaluru',
    initials: 'KM',
    color: 'from-indigo-500 to-sky-400',
    rating: 5,
    text: 'Quality products at a fair price. I love that everything is doctor-reviewed and lab-tested. My stamina and confidence have never been better. 10/10 experience.',
  },
  {
    name: 'Vikram Singh',
    role: 'Verified Customer · Jaipur',
    initials: 'VS',
    color: 'from-amber-500 to-orange-400',
    rating: 5,
    text: 'Ordered on Monday, delivered Tuesday. The delay spray genuinely works and the discreet box made me feel completely at ease. Will order again for sure.',
  },
  {
    name: 'Arjun Nair',
    role: 'Verified Customer · Kochi',
    initials: 'AN',
    color: 'from-rose-500 to-red-400',
    rating: 5,
    text: 'Tried the Surge + Alpha combo. Solid results in two weeks, zero side effects. The 24/7 chat support answered all my doubts. Worth every rupee.',
  },
]

const AUTOPLAY_MS = 6000

function Testimonials() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), [])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    []
  )

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[index]

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-to-b from-white to-surface py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/10 blur-[110px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInHeader />

        <div className="relative mt-12">
          <div className="overflow-hidden rounded-[2.5rem] border border-line bg-white p-8 shadow-lux sm:p-12">
            <Quote className="h-12 w-12 text-accent/15" />

            <div className="relative mt-2 min-h-[200px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-1 text-star">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-5 w-5 fill-current" />
                    ))}
                  </div>

                  <blockquote className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink/85 sm:text-2xl sm:leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-lg font-extrabold text-white ${t.color}`}>
                      {t.initials}
                    </span>
                    <div className="text-left">
                      <p className="flex items-center gap-1.5 text-base font-bold text-ink">
                        {t.name}
                        <BadgeCheck className="h-4.5 w-4.5 text-accent" />
                      </p>
                      <p className="text-sm text-mist">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-8 bg-accent' : 'w-2 bg-line hover:bg-mist/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '50,000+', label: 'Reviews' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '96%', label: 'Recommend Us' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-line bg-white px-4 py-5 shadow-sm">
                <p className="text-2xl font-extrabold text-accent sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs font-medium text-mist sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FadeInHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Trusted by 1,00,000+ men
      </h2>
    </motion.div>
  )
}

export default Testimonials

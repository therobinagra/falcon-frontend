import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, ChevronRight } from 'lucide-react'

function PolicyPage({ title, intro, updated, sections }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-12 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
              <ShieldCheck className="h-4 w-4" />
              Legal &amp; Policies
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
            {intro && <p className="mx-auto mt-3 max-w-xl text-mist">{intro}</p>}
            {updated && (
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-mist">
                Last updated: {updated}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="overflow-hidden rounded-3xl border border-line bg-white shadow-lux"
        >
          <div className="divide-y divide-line">
            {sections.map((section, i) => (
              <div key={i} className="p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink sm:text-xl">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-black text-accent">
                    {i + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-mist sm:text-[15px]">
                  {Array.isArray(section.body) ? (
                    section.body.map((paragraph, j) =>
                      paragraph.startsWith('•') ? (
                        <p key={j} className="pl-5 text-mist">
                          {paragraph}
                        </p>
                      ) : (
                        <p key={j}>{paragraph}</p>
                      )
                    )
                  ) : (
                    <p>{section.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-line bg-surface p-6 text-sm"
        >
          <span className="text-mist">Have a question about this policy?</span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 font-bold text-accent transition hover:text-accent-dark"
          >
            Contact us
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}

export default PolicyPage

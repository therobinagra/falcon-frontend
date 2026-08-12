import { motion } from 'framer-motion'
import { MessageCircleHeart, Headphones, Truck, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: MessageCircleHeart,
    title: 'Free Consultation',
    desc: 'Get expert Ayurvedic guidance and advice at no cost.',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    desc: 'Our care team is always here to help you, 7 days a week.',
    color: 'from-sky-500 to-indigo-400',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    desc: 'Quick and reliable delivery of your order across India.',
    color: 'from-green-500 to-emerald-400',
  },
]

const paragraphs = [
  'Falcon Ayurveda was considered to be one of the Best and Oldest Ayurvedic Clinic in India. Falcon Ayurveda was started with to treat poor and needy patients with the aid of safe, effective and affordable Ayurvedic medicines.',
  'Falcon ayurved is famous for practicing Ayurveda, Yoga and other performing Arts. The name and fame of Ayurveda was synonymous with India\u2019s heritage and culture. Legendaries from all over the world and has giving Ayurvedic Treatment by Oldest and best Ayurvedic Formulas.',
  'The Falcon Ayurveda is famous for its Oldest And Effective Style of Ayurvedic Formulas. Falcon Ayurveda\u2019s name and fame continue, and it has contributed in its own way in preserving and nurturing the tremendous and rich heritage which is unique to India.',
  'Ayurveda is a 5000 year old Science of health care and herbal treatment with the help of ayurvedic medicine. Ayurveda, is highly effective in common and complicated ailments, assures long term relief and has no side effects. Ayurvedic treatment is practiced here for time immemorial and millions of people have availed this facility. Ayurvedic treatment is carried out in a special and authentic style called \u201cFalcon Ayurveda\u201d.',
]

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-20 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
              <Leaf className="h-4 w-4" />
              About Us
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              Quality by Tradition
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-mist">
              One of the Best and Oldest Ayurvedic Clinics in India — treating patients with safe,
              effective and affordable Ayurvedic medicines for generations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] border border-line bg-white shadow-lux"
          >
            <div className="flex items-center gap-3 border-b border-line bg-accent-soft/60 px-6 py-4 sm:px-8">
              <Sparkles className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm font-extrabold uppercase tracking-widest text-accent">
                Quality by Tradition
              </p>
            </div>
            <div className="space-y-5 px-6 py-8 text-sm leading-relaxed text-mist sm:px-8 sm:text-[15px]">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 sm:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lux"
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg transition group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-mist">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-accent-soft px-6 py-8 text-center sm:flex-row sm:text-left"
        >
          <div>
            <h3 className="text-xl font-extrabold text-ink">Experience the legacy of Ayurveda</h3>
            <p className="mt-1 text-sm text-mist">
              Explore our authentic Ayurvedic products, crafted with time-tested formulas.
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 rounded-full bg-accent px-8 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    </>
  )
}

export default About

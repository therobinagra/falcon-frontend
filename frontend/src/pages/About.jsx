import { motion } from 'framer-motion'
import {
  MessageCircleHeart,
  Headphones,
  Truck,
  Leaf,
  Sparkles,
  Star,
  ScrollText,
  Wand2,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/ui/FadeIn'
import Counter from '../components/ui/Counter'

const story = [
  'Falcon Ayurveda was considered to be one of the Best and Oldest Ayurvedic Clinic in India. Falcon Ayurveda was started with to treat poor and needy patients with the aid of safe, effective and affordable Ayurvedic medicines.',
  'Falcon ayurved is famous for practicing Ayurveda, Yoga and other performing Arts. The name and fame of Ayurveda was synonymous with India\u2019s heritage and culture. Legendaries from all over the world and has giving Ayurvedic Treatment by Oldest and best Ayurvedic Formulas.',
  'The Falcon Ayurveda is famous for its Oldest And Effective Style of Ayurvedic Formulas. Falcon Ayurveda\u2019s name and fame continue, and it has contributed in its own way in preserving and nurturing the tremendous and rich heritage which is unique to India.',
  'Ayurveda is a 5000 year old Science of health care and herbal treatment with the help of ayurvedic medicine. Ayurveda, is highly effective in common and complicated ailments, assures long term relief and has no side effects. Ayurvedic treatment is practiced here for time immemorial and millions of people have availed this facility. Ayurvedic treatment is carried out in a special and authentic style called \u201cFalcon Ayurveda\u201d.',
]

const stats = [
  { to: 5000, suffix: '+', label: 'Years of Ayurveda' },
  { to: 5, suffix: 'M+', label: 'Patients Treated' },
  { to: 100, suffix: '%', label: 'Safe & Natural' },
  { to: 200, suffix: '+', label: 'Authentic Formulas' },
]

const heritage = [
  {
    icon: ScrollText,
    title: 'Oldest & Best Formulas',
    desc: 'Time-tested Ayurvedic formulas, refined over generations and famous across the world for their authentic style and lasting effectiveness.',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Wand2,
    title: 'The Falcon Style',
    desc: 'Ayurvedic treatment is carried out in a special and authentic style called \u201cFalcon Ayurveda\u201d \u2014 practiced here since time immemorial.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Activity,
    title: 'Ayurveda, Yoga & the Arts',
    desc: 'Beyond medicines, Falcon Ayurveda is renowned for practicing Ayurveda, Yoga and other performing arts rooted in India\u2019s heritage.',
    color: 'from-sky-500 to-indigo-400',
  },
]

const services = [
  {
    icon: MessageCircleHeart,
    title: 'Free Consultation',
    desc: 'Get expert Ayurvedic guidance and advice from our experienced doctors, at no cost.',
    color: 'from-amber-500 to-orange-400',
    bg: 'bg-amber-50',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    desc: 'Our dedicated care team is always here to help you, 7 days a week.',
    color: 'from-sky-500 to-indigo-400',
    bg: 'bg-sky-50',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    desc: 'Quick and reliable delivery of your order, right to your doorstep across India.',
    color: 'from-green-500 to-emerald-400',
    bg: 'bg-green-50',
  },
]

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-16 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[130px]" />
        <div className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-orange-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full bg-yellow-100/40 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
                <Leaf className="h-4 w-4" />
                About Falcon Ayurveda
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                Quality by <span className="text-accent">Tradition</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
                One of the Best and Oldest Ayurvedic Clinics in India — healing patients with safe,
                effective and affordable Ayurvedic medicines since generations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark"
                >
                  Explore Our Products
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-accent/30 px-8 py-4 text-sm font-bold text-accent transition hover:bg-accent hover:text-white"
                >
                  Free Consultation
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white p-3 shadow-lux">
                <img
                  src="/images/leaves.webp"
                  alt="Authentic Ayurvedic herbs"
                  className="h-[420px] w-full rounded-[2rem] object-cover"
                />
                <div className="absolute inset-3 rounded-[2rem] bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold text-white">Trusted for Generations</p>
                    <p className="text-sm text-white/80">Best &amp; Oldest Ayurvedic Clinic in India</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 flex items-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 shadow-lux sm:-right-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink">5000+ Years</p>
                  <p className="text-xs text-mist">of Ayurvedic Science</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-white p-8 shadow-lux lg:grid-cols-4 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="bg-gradient-to-br from-accent to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                  <Counter to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-mist">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-24 grid items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
                <Sparkles className="h-4 w-4" />
                Our Story
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Quality by Tradition
              </h2>
              <p className="mt-4 text-mist">
                A legacy of healing that began with a simple goal — to treat the poor and needy with
                safe, effective and affordable Ayurvedic medicines.
              </p>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-mist sm:text-[15px]">
                {story.slice(0, 2).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-5">
              {story.slice(2).map((para, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-line bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lux"
                >
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-sm font-black text-accent">
                      {String(i + 3).padStart(2, '0')}
                    </span>
                    <p className="leading-relaxed text-mist">{para}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-surface to-white py-24">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-200/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-green-200/30 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
              <ScrollText className="h-4 w-4" />
              Our Heritage
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Preserving India&apos;s rich Ayurvedic heritage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-mist">
              Falcon Ayurveda has contributed in its own way in preserving and nurturing the
              tremendous and rich heritage which is unique to India.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {heritage.map((item, i) => (
              <FadeIn key={item.title} delay={0.06 * i}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-lux">
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-amber-500 transition duration-300 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <item.icon className="h-7 w-7" />
                    </span>
                    <span className="text-4xl font-black leading-none text-line/70 transition group-hover:text-accent/15">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-mist">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
            <MessageCircleHeart className="h-4 w-4" />
            Why Patients Choose Us
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Care that goes beyond medicine
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={0.08 * i}>
              <div className={`group h-full rounded-3xl ${service.bg} p-8 transition duration-300 hover:-translate-y-2 hover:shadow-lux`}>
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg transition duration-300 group-hover:scale-110`}>
                  <service.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink">{service.title}</h3>
                <p className="mt-2.5 leading-relaxed text-mist">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent via-amber-700 to-orange-800 px-6 py-16 text-center text-white shadow-2xl shadow-accent/30 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-amber-300/20 blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Start Your Wellness Journey
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Experience the legacy of <br className="hidden sm:block" /> Ayurveda with us
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base text-amber-50/90 sm:text-lg">
                Explore our authentic Ayurvedic products, crafted with the oldest and most effective
                Falcon Ayurveda formulas.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-wide text-accent shadow-xl transition hover:bg-amber-50"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-accent"
                >
                  Book Free Consultation
                </Link>
              </div>

              <p className="mt-6 text-xs text-amber-50/80">
                Free &amp; discreet delivery · COD available · 100% secure payments
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}

export default About

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, Send, CheckCircle2, MapPin, MessageCircleHeart } from 'lucide-react'
import { leadApi } from '../api'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'falconayurveda1@gmail.com',
    sub: 'Replies within 24 hours',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 94128 70756',
    sub: '7 days a week',
    color: 'from-sky-500 to-indigo-400',
  },
  {
    icon: Clock,
    title: 'Support Hours',
    value: '24/7 Live Chat',
    sub: 'Always here for you',
    color: 'from-amber-500 to-orange-400',
  },
]

const details = [
  {
    icon: Mail,
    label: 'Email Address',
    value: 'falconayurveda1@gmail.com',
    href: 'mailto:falconayurveda1@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone Number',
    value: '+91 94128 70756',
    href: 'tel:+919412870756',
  },
  {
    icon: Clock,
    label: 'Support Hours',
    value: '24/7 — Live chat & email',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Head Office',
    value: 'Shanti Nagar, Professor Colony, Kamla Nagar, Agra, Uttar Pradesh 282005',
    href: null,
  },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    try {
      await leadApi.submit(form)
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '3701206c-57ca-46fb-89b1-529896560426',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject || 'Contact Form Lead',
          message: form.message,
        }),
      }).catch(() => {})
      setSent(true)
    } catch {
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-20 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Contact Us
            </h1>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group flex items-start gap-5 rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lux"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${info.color} text-white shadow-lg transition group-hover:scale-110`}>
                  <info.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{info.title}</h3>
                  <p className="mt-1 font-extrabold text-accent">{info.value}</p>
                  <p className="mt-0.5 text-sm text-mist">{info.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-mist">
              Fill in the form and we&apos;ll reply to your email as soon as possible.
            </p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-accent/30 bg-accent-soft px-8 py-16 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <p className="text-xl font-extrabold text-accent">Message sent!</p>
                <p className="max-w-sm text-sm text-mist">
                  Thanks for reaching out, {form.name}. Our care team will get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                  }}
                  className="mt-2 rounded-full border-2 border-accent px-6 py-2.5 text-sm font-bold text-accent transition hover:bg-accent hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-bold text-ink">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you need help with..."
                    className="w-full resize-none rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark disabled:opacity-50 sm:w-auto"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Reach us directly</h2>
            <p className="mt-2 text-mist">Prefer to get in touch another way? We&apos;ve got you covered.</p>

            <div className="mt-8 space-y-4">
              {details.map((item) => {
                const content = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-mist">
                        {item.label}
                      </p>
                      <p className="mt-1 font-bold text-ink">{item.value}</p>
                    </div>
                  </>
                )
                const base = 'flex items-center gap-5 rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lux'
                return item.href ? (
                  <a key={item.label} href={item.href} className={base}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className={base}>
                    {content}
                  </div>
                )
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-white shadow-lux">
              <iframe
                title="FalconCare office location"
                src="https://www.google.com/maps?q=Kamla+Nagar,+Agra,+Uttar+Pradesh&output=embed"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center gap-3 border-t border-line p-5">
                <MessageCircleHeart className="h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm text-mist">
                  Drop by our Agra head office, or reach us online — we&apos;re happy to help.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact

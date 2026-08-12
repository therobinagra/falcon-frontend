import { Flame, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const routes = {
  'About Us': '/about',
  'Track Order': '/track-order',
  'Shipping Policy': '/shipping-policy',
  'Contact Us': '/contact',
  'Privacy Policy': '/privacy-policy',
  'No Return & No Refund Policy': '/returns-refunds',
  'Terms and Conditions': '/terms-conditions',
}

const columns = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog'],
  },
  {
    title: 'Products',
    links: ['Supplements', 'Shilajit'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Track Order', 'Contact Us'],
  },
  {
    title: 'Policies',
    links: ['Privacy Policy', 'No Return & No Refund Policy', 'Shipping Policy', 'Terms and Conditions'],
  },
]

const socials = [
  {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.6a5.2 5.2 0 100 10.4 5.2 5.2 0 000-10.4zm0 8.6a3.4 3.4 0 110-6.8 3.4 3.4 0 010 6.8zm6.7-8.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z',
  },
  {
    label: 'Facebook',
    path: 'M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.6V13h2.7v8h3.2z',
  },
  {
    label: 'YouTube',
    path: 'M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 00-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z',
  },
  {
    label: 'X',
    path: 'M17.8 4h3l-6.6 7.6L22 20h-6.1l-4.8-6.3L5.6 20h-3l7-8.1L2 4h6.3l4.3 5.7L17.8 4zm-1.1 14.4h1.7L7.4 5.5H5.6l11.1 12.9z',
  },
]

function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25">
                <Flame className="h-5 w-5 text-white" />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-ink">
                Falcon<span className="text-accent">Care</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              India&apos;s premium men&apos;s wellness brand. Doctor-approved products for
              performance, stamina and confidence — delivered discreetly.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#contact"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-mist transition hover:border-accent/50 hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-ink">
                {column.title}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-mist">
                {column.links.map((link) =>
                  routes[link] ? (
                    <li key={link}>
                      <Link to={routes[link]} className="transition hover:text-accent">
                        {link}
                      </Link>
                    </li>
                  ) : (
                    <li key={link}>
                      <a href="#top" className="transition hover:text-accent">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line py-7 sm:flex-row">
          <p className="text-xs text-mist">
            © 2026 FalconCare. All rights reserved. This is a demo project.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-mist">
            Made with <Heart className="h-3.5 w-3.5 fill-accent text-accent" /> in India
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

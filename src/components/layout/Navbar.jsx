import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Flame,
  LogOut,
  ChevronDown,
  Package,
  LayoutDashboard,
} from 'lucide-react'
import { useCart } from '../../context/cartContext'
import { useAuth } from '../../context/AuthContext'

const baseLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Blogs', to: '/blog' },
]

function UserMenuLink({ to, icon: Icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft hover:text-accent"
    >
      <Icon className="h-4 w-4 text-accent" />
      {children}
    </Link>
  )
}

function Navbar({ onSearchOpen }) {
  const { totalItems, setIsOpen } = useCart()
  const { user, isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setUserMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const links = isAdmin ? [...baseLinks, { label: 'Admin', to: '/admin' }] : baseLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const iconBtn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'border-b border-line shadow-lux' : 'border-b border-line'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="FalconCare home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg shadow-accent/25">
            <Flame className="h-5 w-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-ink">
            Falcon<span className="text-accent">Care</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold transition hover:text-accent ${
                  isActive(link.to) ? 'text-accent' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold transition hover:text-accent ${
                isActive('/contact') ? 'text-accent' : 'text-ink'
              }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={onSearchOpen} aria-label="Search" className={iconBtn}>
            <Search className="h-5 w-5" />
          </button>
          {user ? (
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="Account menu"
                className="flex h-11 items-center gap-1.5 rounded-full bg-accent pl-0.5 pr-3 text-sm font-extrabold text-white shadow-md shadow-accent/25 transition hover:bg-accent-dark"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-extrabold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-white shadow-lux">
                  <div className="border-b border-line bg-surface/60 px-4 py-3.5">
                    <p className="truncate text-sm font-extrabold text-ink">{user.name}</p>
                    <p className="truncate text-xs text-mist">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <UserMenuLink
                      to="/my-orders"
                      icon={Package}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Orders
                    </UserMenuLink>
                    <UserMenuLink
                      to="/profile"
                      icon={User}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </UserMenuLink>
                    {isAdmin && (
                      <UserMenuLink
                        to="/admin"
                        icon={LayoutDashboard}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </UserMenuLink>
                    )}
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" aria-label="Login" className={`${iconBtn} hidden sm:flex`}>
              <User className="h-5 w-5" />
            </Link>
          )}
          <button onClick={() => setIsOpen(true)} aria-label="Cart" className={`${iconBtn} relative`}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`${iconBtn} lg:hidden`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-accent-soft ${
                    isActive(link.to) ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-accent-soft ${
                  isActive('/contact') ? 'text-accent' : 'text-ink'
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li className="border-t border-line pt-2">
              {user ? (
                <div>
                  <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-mist">
                    {user.email}
                  </p>
                  <div className="space-y-1">
                    <UserMenuLink to="/my-orders" icon={Package} onClick={() => setMenuOpen(false)}>
                      My Orders
                    </UserMenuLink>
                    <UserMenuLink to="/profile" icon={User} onClick={() => setMenuOpen(false)}>
                      Profile
                    </UserMenuLink>
                    {isAdmin && (
                      <UserMenuLink to="/admin" icon={LayoutDashboard} onClick={() => setMenuOpen(false)}>
                        Dashboard
                      </UserMenuLink>
                    )}
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout ({user.name})
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-accent transition hover:bg-accent-soft"
                >
                  <User className="h-5 w-5" />
                  Login / Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar

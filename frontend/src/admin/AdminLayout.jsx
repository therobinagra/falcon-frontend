import { NavLink, Outlet, Link, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tags,
  Newspaper,
  Mail,
  ExternalLink,
  LogOut,
  Flame,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/blogs', label: 'Blog Posts', icon: Newspaper },
  { to: '/admin/leads', label: 'Leads', icon: Mail },
]

function AdminLayout() {
  const { user, isAdmin, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-line px-6 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg shadow-accent/25">
            <Flame className="h-5 w-5" />
          </span>
          <div>
            <p className="text-base font-extrabold text-ink">FalconCare</p>
            <p className="text-xs font-semibold text-accent">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                    : 'text-mist hover:bg-accent-soft hover:text-accent'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-white">
              {user.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{user.name}</p>
              <p className="truncate text-xs text-mist">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-mist transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
              <Flame className="h-4 w-4" />
            </span>
            <span className="font-extrabold text-ink">Admin</span>
          </div>
          <div className="hidden text-sm font-semibold text-mist lg:block">
            Welcome back, <span className="font-bold text-accent">{user.name}</span> 👋
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:border-accent/50 hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" />
              View Site
            </Link>
            <button
              onClick={logout}
              aria-label="Logout"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-mist transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 lg:hidden"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

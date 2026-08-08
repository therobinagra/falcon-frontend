import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  ShoppingBag,
  Users,
  Tags,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import { adminApi } from '../api'
import { Card, PageHeader, Badge, EmptyState } from './ui'
import { formatINR } from '../utils'

const statusTone = {
  Placed: 'blue',
  Confirmed: 'amber',
  Shipped: 'accent',
  Delivered: 'green',
  Cancelled: 'red',
}

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .stats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl border border-line bg-white" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <p className="text-sm text-red-600">
          Could not load dashboard stats. Make sure the backend is running and seeded.
        </p>
        <p className="mt-1 text-xs text-mist">{error}</p>
      </Card>
    )
  }

  const tiles = [
    { label: 'Total Products', value: stats.counts.products, icon: Package, to: '/admin/products', tone: 'text-accent bg-accent-soft' },
    { label: 'Total Orders', value: stats.counts.orders, icon: ShoppingBag, to: '/admin/orders', tone: 'text-sky-600 bg-sky-50' },
    { label: 'Total Users', value: stats.counts.users, icon: Users, to: '/admin/users', tone: 'text-amber-600 bg-amber-50' },
    { label: 'Categories', value: stats.counts.categories, icon: Tags, to: '/admin/categories', tone: 'text-rose-600 bg-rose-50' },
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your storefront performance"
      />

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.label} to={tile.to} className="group">
            <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-lux">
              <div className="flex items-center justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tile.tone}`}>
                  <tile.icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-mist opacity-0 transition group-hover:opacity-100" />
              </div>
              <p className="mt-5 text-3xl font-extrabold text-ink">{tile.value}</p>
              <p className="mt-1 text-sm font-semibold text-mist">{tile.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <IndianRupee className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-mist">Total Revenue</p>
              <p className="text-2xl font-extrabold text-ink">{formatINR(stats.revenue)}</p>
            </div>
          </div>
          <div className="mt-5 border-t border-line pt-5">
            <p className="flex items-center gap-2 text-sm font-bold text-ink">
              <TrendingUp className="h-4 w-4 text-accent" />
              Order status breakdown
            </p>
            <div className="mt-4 space-y-3">
              {stats.statusCounts.length === 0 && (
                <p className="text-sm text-mist">No orders yet.</p>
              )}
              {stats.statusCounts.map((s) => (
                <div key={s._id} className="flex items-center justify-between">
                  <Badge tone={statusTone[s._id] || 'slate'}>{s._id}</Badge>
                  <span className="text-sm font-bold text-ink">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-ink">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm font-bold text-accent hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {stats.recentOrders.length === 0 && (
              <EmptyState icon="🧾" title="No orders yet" sub="Orders will appear here." />
            )}
            {stats.recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{order.customer?.name}</p>
                  <p className="truncate text-xs text-mist">#{order._id?.slice(-6)} · {order.items?.length} item(s)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-ink">{formatINR(order.totalPrice)}</p>
                  <Badge tone={statusTone[order.status] || 'slate'}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-ink">Recent Products</h3>
            <Link to="/admin/products" className="text-sm font-bold text-accent hover:underline">
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {stats.recentProducts.length === 0 && (
              <EmptyState icon="📦" title="No products yet" sub="Add your first product." />
            )}
            {stats.recentProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-11 w-11 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${product.gradient}`}>
                    📦
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{product.name}</p>
                  <p className="text-xs text-mist">{product.category}</p>
                </div>
                <p className="text-sm font-extrabold text-accent">{formatINR(product.price)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

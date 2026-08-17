import { useEffect, useState } from 'react'
import { Trash2, Eye, ShoppingBag } from 'lucide-react'
import { adminApi } from '../api'
import {
  Card,
  PageHeader,
  Btn,
  Badge,
  Modal,
  Select,
  EmptyState,
  Th,
  Td,
} from './ui'
import { formatINR } from '../utils'

const STATUSES = ['Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
const statusTone = {
  Placed: 'blue',
  Confirmed: 'amber',
  Shipped: 'accent',
  Delivered: 'green',
  Cancelled: 'red',
}

function OrderDetail({ order, onClose }) {
  if (!order) return null
  return (
    <Modal open onClose={onClose} title={`Order #${order._id}`}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-mist">Customer</p>
            <p className="mt-1 font-bold text-ink">{order.customer?.name}</p>
            <p className="text-sm text-mist">{order.customer?.email}</p>
            {order.customer?.phone && <p className="text-sm text-mist">{order.customer.phone}</p>}
          </div>
          <div className="rounded-xl bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-mist">Delivery Address</p>
            <p className="mt-1 text-sm font-semibold text-ink">{order.address?.line}</p>
            <p className="text-sm text-mist">
              {order.address?.city}, {order.address?.state} — {order.address?.pincode}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-mist">Items</p>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-soft">📦</span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{item.name}</p>
                  <p className="text-xs text-mist">Qty {item.qty} × {formatINR(item.price)}</p>
                </div>
                <p className="text-sm font-extrabold text-ink">{formatINR(item.qty * item.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-mist">
            <span>Items total</span>
            <span className="font-semibold text-ink">{formatINR(order.itemsPrice)}</span>
          </div>
          <div className="flex justify-between text-mist">
            <span>Shipping</span>
            <span className="font-semibold text-ink">{formatINR(order.shippingPrice)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-ink">
            <span>Total</span>
            <span>{formatINR(order.totalPrice)}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge tone={statusTone[order.status] || 'slate'}>{order.status}</Badge>
            <Badge tone={order.paymentMethod === 'COD' ? 'amber' : 'green'}>{order.paymentMethod}</Badge>
            <Badge tone={order.paymentStatus === 'Paid' ? 'green' : 'amber'}>
              Payment: {order.paymentStatus}
            </Badge>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [detail, setDetail] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getOrders()
      setOrders(Array.isArray(data) ? data : [])
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter)

  const changeStatus = async (order, status) => {
    try {
      await adminApi.updateOrder(order._id, { status })
      setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)))
    } catch (err) {
      alert(err.message)
    }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await adminApi.deleteOrder(confirm._id)
      setConfirm(null)
      await load()
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Track and update customer orders"
        actions={
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        }
      />

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </Card>
      )}

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-surface" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon="🧾" title="No orders found" sub="Orders placed on the store will appear here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="border-b border-line bg-surface/60">
                <tr>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Payment</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((order) => (
                  <tr key={order._id} className="transition hover:bg-surface/50">
                    <Td>
                      <p className="font-bold text-ink">#{order._id?.slice(-6)}</p>
                      <p className="text-xs text-mist">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </Td>
                    <Td>
                      <p className="font-bold text-ink">{order.customer?.name}</p>
                      <p className="max-w-[180px] truncate text-xs text-mist">{order.customer?.email}</p>
                    </Td>
                    <Td>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                        <ShoppingBag className="h-4 w-4 text-accent" />
                        {order.items?.length} item(s)
                      </span>
                    </Td>
                    <Td>
                      <p className="font-extrabold text-ink">{formatINR(order.totalPrice)}</p>
                    </Td>
                    <Td>
                      <Badge tone={order.paymentMethod === 'COD' ? 'amber' : 'green'}>
                        {order.paymentMethod}
                      </Badge>
                    </Td>
                    <Td>
                      <select
                        value={order.status}
                        onChange={(e) => changeStatus(order, e.target.value)}
                        className="rounded-lg border border-line bg-surface px-2 py-1.5 text-xs font-bold text-ink outline-none focus:border-accent/60"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setDetail(order)}
                          aria-label="View order"
                          title="View"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirm(order)}
                          aria-label="Delete order"
                          title="Delete"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <OrderDetail order={detail} onClose={() => setDetail(null)} />

      <Modal open={Boolean(confirm)} title="Delete Order" onClose={() => setConfirm(null)}>
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-mist">
            Are you sure you want to delete order{' '}
            <span className="font-bold text-ink">#{confirm?._id?.slice(-6)}</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={() => setConfirm(null)}>
              Cancel
            </Btn>
            <Btn variant="danger" onClick={remove} disabled={busy}>
              <Trash2 className="h-4 w-4" />
              {busy ? 'Deleting...' : 'Delete Order'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminOrders

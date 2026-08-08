import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, Star, UploadCloud } from 'lucide-react'
import { adminApi, getCategories } from '../api'
import {
  Card,
  PageHeader,
  Btn,
  Badge,
  Modal,
  Input,
  Select,
  Textarea,
  EmptyState,
  Th,
  Td,
} from './ui'
import { formatINR } from '../utils'

const emptyForm = {
  name: '',
  tagline: '',
  description: '',
  category: '',
  price: '',
  mrp: '',
  rating: '',
  reviews: '',
  gradient: 'from-amber-700 to-orange-600',
  badge: '',
  stock: 10,
  featured: false,
  inStock: true,
  image: '',
}

function ProductForm({ initial, categories, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState(initial)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial.image || '')
  const fileRef = useRef(null)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setPreview(URL.createObjectURL(f))
    }
  }

  const submit = (e) => {
    e.preventDefault()
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'featured' || key === 'inStock') {
        payload.append(key, value ? 'true' : 'false')
      } else if (value !== undefined && value !== null) {
        payload.append(key, value)
      }
    })
    if (file) payload.append('image', file)
    onSubmit(payload)
  }

  const gridField = 'grid gap-4 sm:grid-cols-2'

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className={gridField}>
        <div className="sm:col-span-2">
          <Input
            label="Product Name *"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Amrit Urja Capsule"
          />
        </div>
        <Input
          label="Tagline"
          value={form.tagline}
          onChange={(e) => set('tagline', e.target.value)}
          placeholder="Short catchy line"
        />
        <Select label="Category *" required value={form.category} onChange={(e) => set('category', e.target.value)}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        label="Description"
        rows={3}
        value={form.description}
        onChange={(e) => set('description', e.target.value)}
        placeholder="Product description..."
      />

      <div className={gridField}>
        <Input label="Price (₹) *" type="number" min="0" required value={form.price} onChange={(e) => set('price', e.target.value)} />
        <Input label="MRP (₹) *" type="number" min="0" required value={form.mrp} onChange={(e) => set('mrp', e.target.value)} />
        <Input label="Rating (0–5)" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
        <Input label="Reviews" type="number" min="0" value={form.reviews} onChange={(e) => set('reviews', e.target.value)} />
        <Input label="Stock" type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
        <Input label="Badge" value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="e.g. Bestseller" />
      </div>

      <div className={gridField}>
        <Select label="Gradient (fallback)" value={form.gradient} onChange={(e) => set('gradient', e.target.value)}>
          <option value="from-amber-700 to-orange-600">Brown → Orange</option>
          <option value="from-amber-600 via-orange-500 to-red-500">Amber → Red</option>
          <option value="from-stone-600 via-amber-800 to-yellow-900">Stone → Yellow</option>
          <option value="from-orange-700 via-amber-600 to-yellow-500">Orange → Yellow</option>
          <option value="from-rose-500 via-pink-500 to-fuchsia-500">Rose → Fuchsia</option>
          <option value="from-sky-500 via-blue-500 to-indigo-600">Sky → Indigo</option>
        </Select>
        <div className="flex items-end gap-2">
          <label className="flex-1">
            <span className="mb-1.5 block text-sm font-bold text-ink">Product Image</span>
            <div className="flex gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface px-4 py-2.5 text-sm font-bold text-mist transition hover:border-accent hover:text-accent"
              >
                <UploadCloud className="h-4 w-4" />
                Upload
              </button>
            </div>
          </label>
          {preview ? (
            <img src={preview} alt="Preview" className="h-10 w-10 rounded-lg border border-line object-cover" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-mist">📦</span>
          )}
        </div>
      </div>

      <Input
        label="Image URL (optional)"
        value={form.image}
        onChange={(e) => {
          set('image', e.target.value)
          setPreview(e.target.value)
        }}
        placeholder="/images/product5.jpg or https://..."
      />

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm font-bold text-ink">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set('featured', e.target.checked)}
            className="h-4 w-4 rounded border-line text-accent focus:ring-accent"
          />
          Featured product
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-ink">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => set('inStock', e.target.checked)}
            className="h-4 w-4 rounded border-line text-accent focus:ring-accent"
          />
          In stock
        </label>
      </div>

      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <Btn type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Btn>
        <Btn type="submit" disabled={busy}>
          {busy ? 'Saving...' : initial._id ? 'Update Product' : 'Add Product'}
        </Btn>
      </div>
    </form>
  )
}

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)
  const [busy, setBusy] = useState(false)
  const [confirm, setConfirm] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const [p, c] = await Promise.all([adminApi.getProducts(), getCategories()])
      setProducts(Array.isArray(p) ? p : [])
      setCategories(Array.isArray(c) ? c : [])
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

  const openAdd = () =>
    setModal({ mode: 'add', form: { ...emptyForm, category: categories[0] || '' } })

  const openEdit = (product) =>
    setModal({
      mode: 'edit',
      form: {
        name: product.name || '',
        tagline: product.tagline || '',
        description: product.description || '',
        category: product.category || categories[0] || '',
        price: product.price ?? '',
        mrp: product.mrp ?? '',
        rating: product.rating ?? '',
        reviews: product.reviews ?? '',
        gradient: product.gradient || 'from-amber-700 to-orange-600',
        badge: product.badge || '',
        stock: product.stock ?? 10,
        featured: Boolean(product.featured),
        inStock: product.inStock !== false,
        image: product.image || '',
      },
      _id: product._id,
    })

  const submit = async (payload) => {
    setBusy(true)
    try {
      if (modal.mode === 'edit') {
        await adminApi.updateProduct(modal._id, payload)
      } else {
        await adminApi.createProduct(payload)
      }
      setModal(null)
      await load()
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await adminApi.deleteProduct(confirm._id)
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
        title="Products"
        subtitle="Add, edit and remove products from your store"
        actions={
          <Btn onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add Product
          </Btn>
        }
      />

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-600">{error}</p>
          <p className="mt-1 text-xs text-mist">
            Make sure the backend is running. Until then the store uses local demo data.
          </p>
        </Card>
      )}

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-surface" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon="📦"
              title="No products yet"
              sub="Add your first product to get started."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="border-b border-line bg-surface/60">
                <tr>
                  <Th>Product</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Stock</Th>
                  <Th>Rating</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {products.map((product) => (
                  <tr key={product._id} className="transition hover:bg-surface/50">
                    <Td>
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                        ) : (
                          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient}`}>
                            📦
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="max-w-[220px] truncate font-bold text-ink">{product.name}</p>
                          <p className="max-w-[220px] truncate text-xs text-mist">{product.tagline}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <Badge>{product.category}</Badge>
                    </Td>
                    <Td>
                      <p className="font-extrabold text-ink">{formatINR(product.price)}</p>
                      <p className="text-xs text-mist line-through">{formatINR(product.mrp)}</p>
                    </Td>
                    <Td>
                      <Badge tone={product.stock > 0 ? 'green' : 'red'}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </Badge>
                    </Td>
                    <Td>
                      <span className="flex items-center gap-1 text-sm font-bold text-ink">
                        <Star className="h-3.5 w-3.5 fill-star text-star" />
                        {product.rating}
                      </span>
                    </Td>
                    <Td>
                      {product.featured ? (
                        <Badge tone="amber">Featured</Badge>
                      ) : (
                        <Badge tone="slate">Standard</Badge>
                      )}
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => window.open(`/product/${product._id}`, '_blank')}
                          aria-label="View product"
                          title="View on store"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEdit(product)}
                          aria-label="Edit product"
                          title="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirm(product)}
                          aria-label="Delete product"
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

      <Modal
        open={Boolean(modal)}
        title={modal?.mode === 'edit' ? 'Edit Product' : 'Add Product'}
        onClose={() => setModal(null)}
      >
        {modal && (
          <ProductForm
            initial={modal.form}
            categories={categories}
            onSubmit={submit}
            onCancel={() => setModal(null)}
            busy={busy}
          />
        )}
      </Modal>

      <Modal open={Boolean(confirm)} title="Delete Product" onClose={() => setConfirm(null)}>
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-mist">
            Are you sure you want to delete{' '}
            <span className="font-bold text-ink">&ldquo;{confirm?.name}&rdquo;</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={() => setConfirm(null)}>
              Cancel
            </Btn>
            <Btn variant="danger" onClick={remove} disabled={busy}>
              <Trash2 className="h-4 w-4" />
              {busy ? 'Deleting...' : 'Delete Product'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminProducts

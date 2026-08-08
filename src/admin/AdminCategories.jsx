import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Tags } from 'lucide-react'
import { adminApi } from '../api'
import {
  Card,
  PageHeader,
  Btn,
  Badge,
  Modal,
  Input,
  Textarea,
  EmptyState,
  Th,
  Td,
} from './ui'

const emptyForm = { name: '', description: '', image: '' }

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)
  const [busy, setBusy] = useState(false)
  const [confirm, setConfirm] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getCategories()
      setCategories(Array.isArray(data) ? data : [])
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

  const submit = async (e) => {
    e.preventDefault()
    if (!modal.form.name.trim()) return
    setBusy(true)
    try {
      if (modal.mode === 'edit') {
        await adminApi.updateCategory(modal._id, modal.form)
      } else {
        await adminApi.createCategory(modal.form)
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
      await adminApi.deleteCategory(confirm._id)
      setConfirm(null)
      await load()
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  const set = (key, value) => setModal((m) => ({ ...m, form: { ...m.form, [key]: value } }))

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Organize your storefront into categories"
        actions={
          <Btn onClick={() => setModal({ mode: 'add', form: { ...emptyForm } })}>
            <Plus className="h-4 w-4" />
            Add Category
          </Btn>
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
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-surface" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="p-6">
            <EmptyState icon="🏷️" title="No categories yet" sub="Create your first category." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="border-b border-line bg-surface/60">
                <tr>
                  <Th>Category</Th>
                  <Th>Description</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {categories.map((category) => (
                  <tr key={category._id} className="transition hover:bg-surface/50">
                    <Td>
                      <div className="flex items-center gap-3">
                        {category.image ? (
                          <img src={category.image} alt={category.name} className="h-11 w-11 shrink-0 rounded-xl object-cover" />
                        ) : (
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                            <Tags className="h-5 w-5" />
                          </span>
                        )}
                        <span className="font-bold text-ink">{category.name}</span>
                      </div>
                    </Td>
                    <Td>
                      <p className="max-w-[280px] truncate text-sm text-mist">{category.description || '—'}</p>
                    </Td>
                    <Td>
                      {category.isActive ? (
                        <Badge tone="green">Active</Badge>
                      ) : (
                        <Badge tone="red">Hidden</Badge>
                      )}
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            setModal({
                              mode: 'edit',
                              _id: category._id,
                              form: {
                                name: category.name,
                                description: category.description || '',
                                image: category.image || '',
                              },
                            })
                          }
                          aria-label="Edit category"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirm(category)}
                          aria-label="Delete category"
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
        title={modal?.mode === 'edit' ? 'Edit Category' : 'Add Category'}
        onClose={() => setModal(null)}
      >
        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Category Name *"
            required
            value={modal?.form.name || ''}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Bold Supplements"
          />
          <Textarea
            label="Description"
            rows={3}
            value={modal?.form.description || ''}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Short description..."
          />
          <Input
            label="Image URL"
            value={modal?.form.image || ''}
            onChange={(e) => set('image', e.target.value)}
            placeholder="/images/product5.jpg"
          />
          <div className="flex justify-end gap-3 border-t border-line pt-5">
            <Btn type="button" variant="outline" onClick={() => setModal(null)}>
              Cancel
            </Btn>
            <Btn type="submit" disabled={busy}>
              {busy ? 'Saving...' : modal?.mode === 'edit' ? 'Update' : 'Add Category'}
            </Btn>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(confirm)} title="Delete Category" onClose={() => setConfirm(null)}>
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-mist">
            Are you sure you want to delete{' '}
            <span className="font-bold text-ink">&ldquo;{confirm?.name}&rdquo;</span>?
          </p>
          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={() => setConfirm(null)}>
              Cancel
            </Btn>
            <Btn variant="danger" onClick={remove} disabled={busy}>
              <Trash2 className="h-4 w-4" />
              {busy ? 'Deleting...' : 'Delete Category'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminCategories

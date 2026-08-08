import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Newspaper } from 'lucide-react'
import { blogApi } from '../api'
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

const emptyForm = {
  title: '',
  category: 'Wellness',
  date: '',
  readTime: '',
  desc: '',
  body: '',
  image: '',
}

function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)
  const [busy, setBusy] = useState(false)
  const [confirm, setConfirm] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await blogApi.getBlogs()
      setBlogs(Array.isArray(data) ? data : [])
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
    if (!modal.form.title.trim()) return
    setBusy(true)
    try {
      if (modal.mode === 'edit') {
        await blogApi.updateBlog(modal._id, modal.form)
      } else {
        await blogApi.createBlog(modal.form)
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
      await blogApi.deleteBlog(confirm._id)
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
        title="Blog Posts"
        subtitle="Publish and manage wellness articles"
        actions={
          <Btn onClick={() => setModal({ mode: 'add', form: { ...emptyForm } })}>
            <Plus className="h-4 w-4" />
            Add Blog Post
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
        ) : blogs.length === 0 ? (
          <div className="p-6">
            <EmptyState icon="📰" title="No blog posts yet" sub="Create your first article." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="border-b border-line bg-surface/60">
                <tr>
                  <Th>Post</Th>
                  <Th>Category</Th>
                  <Th>Date</Th>
                  <Th>Read Time</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="transition hover:bg-surface/50">
                    <Td>
                      <div className="flex items-center gap-3">
                        {blog.image ? (
                          <img src={blog.image} alt={blog.title} className="h-11 w-11 shrink-0 rounded-xl object-cover" />
                        ) : (
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                            <Newspaper className="h-5 w-5" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="max-w-[280px] truncate font-bold text-ink">{blog.title}</p>
                          <p className="max-w-[280px] truncate text-xs text-mist">{blog.desc || '—'}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <Badge tone="accent">{blog.category}</Badge>
                    </Td>
                    <Td>
                      <p className="text-sm text-mist">{blog.date || '—'}</p>
                    </Td>
                    <Td>
                      <p className="text-sm text-mist">{blog.readTime || '—'}</p>
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            setModal({
                              mode: 'edit',
                              _id: blog._id,
                              form: {
                                title: blog.title,
                                category: blog.category,
                                date: blog.date || '',
                                readTime: blog.readTime || '',
                                desc: blog.desc || '',
                                body: blog.body || '',
                                image: blog.image || '',
                              },
                            })
                          }
                          aria-label="Edit blog post"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirm(blog)}
                          aria-label="Delete blog post"
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
        title={modal?.mode === 'edit' ? 'Edit Blog Post' : 'Add Blog Post'}
        onClose={() => setModal(null)}
      >
        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Title *"
            required
            value={modal?.form.title || ''}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. 5 Natural Ways to Boost Your Stamina"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Category"
              value={modal?.form.category || ''}
              onChange={(e) => set('category', e.target.value)}
              placeholder="Wellness"
            />
            <Input
              label="Date"
              value={modal?.form.date || ''}
              onChange={(e) => set('date', e.target.value)}
              placeholder="Aug 2, 2026"
            />
            <Input
              label="Read Time"
              value={modal?.form.readTime || ''}
              onChange={(e) => set('readTime', e.target.value)}
              placeholder="5 min read"
            />
          </div>
          <Input
            label="Image URL"
            value={modal?.form.image || ''}
            onChange={(e) => set('image', e.target.value)}
            placeholder="/images/article-stamina.jpg"
          />
          <Textarea
            label="Short Description"
            rows={2}
            value={modal?.form.desc || ''}
            onChange={(e) => set('desc', e.target.value)}
            placeholder="One-line summary shown on the blog card..."
          />
          <Textarea
            label="Article Body"
            rows={6}
            value={modal?.form.body || ''}
            onChange={(e) => set('body', e.target.value)}
            placeholder="Write the full article content here..."
          />
          <div className="flex justify-end gap-3 border-t border-line pt-5">
            <Btn type="button" variant="outline" onClick={() => setModal(null)}>
              Cancel
            </Btn>
            <Btn type="submit" disabled={busy}>
              {busy ? 'Saving...' : modal?.mode === 'edit' ? 'Update' : 'Add Blog Post'}
            </Btn>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(confirm)} title="Delete Blog Post" onClose={() => setConfirm(null)}>
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-mist">
            Are you sure you want to delete{' '}
            <span className="font-bold text-ink">&ldquo;{confirm?.title}&rdquo;</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={() => setConfirm(null)}>
              Cancel
            </Btn>
            <Btn variant="danger" onClick={remove} disabled={busy}>
              <Trash2 className="h-4 w-4" />
              {busy ? 'Deleting...' : 'Delete Post'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminBlogs

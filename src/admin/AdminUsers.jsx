import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { adminApi } from '../api'
import { Card, PageHeader, Btn, Badge, Modal, EmptyState, Th, Td } from './ui'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getUsers()
      setUsers(Array.isArray(data) ? data : [])
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

  const changeRole = async (user, role) => {
    try {
      await adminApi.updateUser(user._id, { role })
      setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, role } : u)))
    } catch (err) {
      alert(err.message)
    }
  }

  const toggleActive = async (user) => {
    try {
      const isActive = !user.isActive
      await adminApi.updateUser(user._id, { isActive })
      setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, isActive } : u)))
    } catch (err) {
      alert(err.message)
    }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await adminApi.deleteUser(confirm._id)
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
      <PageHeader title="Users" subtitle="Manage registered users and their roles" />

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
        ) : users.length === 0 ? (
          <div className="p-6">
            <EmptyState icon="👤" title="No users yet" sub="Registered users will appear here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="border-b border-line bg-surface/60">
                <tr>
                  <Th>User</Th>
                  <Th>Contact</Th>
                  <Th>Role</Th>
                  <Th>Status</Th>
                  <Th>Joined</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {users.map((user) => (
                  <tr key={user._id} className="transition hover:bg-surface/50">
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-extrabold text-accent">
                          {user.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-[200px] truncate font-bold text-ink">{user.name}</p>
                          <p className="text-xs text-mist">@{user.email?.split('@')[0]}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <p className="max-w-[220px] truncate text-sm text-ink">{user.email}</p>
                      {user.phone && <p className="text-xs text-mist">{user.phone}</p>}
                    </Td>
                    <Td>
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user, e.target.value)}
                        className="rounded-lg border border-line bg-surface px-2 py-1.5 text-xs font-bold text-ink outline-none focus:border-accent/60"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </Td>
                    <Td>
                      <button onClick={() => toggleActive(user)} title="Toggle active status">
                        {user.isActive ? (
                          <Badge tone="green">Active</Badge>
                        ) : (
                          <Badge tone="red">Disabled</Badge>
                        )}
                      </button>
                    </Td>
                    <Td>
                      <p className="text-sm text-mist">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </Td>
                    <Td>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setConfirm(user)}
                          aria-label="Delete user"
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

      <Modal open={Boolean(confirm)} title="Delete User" onClose={() => setConfirm(null)}>
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
              {busy ? 'Deleting...' : 'Delete User'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminUsers

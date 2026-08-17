import { useEffect, useState } from 'react'
import { Trash2, Eye, Mail, MailOpen } from 'lucide-react'
import { leadApi } from '../api'
import {
  Card,
  PageHeader,
  Btn,
  Badge,
  Modal,
  EmptyState,
  Th,
  Td,
} from './ui'

const statusTone = {
  new: 'blue',
  read: 'amber',
  replied: 'green',
}

function LeadDetail({ lead, onClose, onStatusChange }) {
  if (!lead) return null
  return (
    <Modal open onClose={onClose} title={`Lead from ${lead.name}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-mist">Name</p>
            <p className="font-bold text-ink">{lead.name}</p>
          </div>
          <div>
            <p className="text-mist">Email</p>
            <a href={`mailto:${lead.email}`} className="font-bold text-accent hover:underline">{lead.email}</a>
          </div>
          <div>
            <p className="text-mist">Phone</p>
            <p className="font-bold text-ink">{lead.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-mist">Subject</p>
            <p className="font-bold text-ink">{lead.subject || 'N/A'}</p>
          </div>
          <div>
            <p className="text-mist">Date</p>
            <p className="font-bold text-ink">{new Date(lead.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-mist">Status</p>
            <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
          </div>
        </div>
        <div>
          <p className="text-mist mb-1 text-sm">Message</p>
          <p className="rounded-2xl bg-surface p-4 text-sm leading-relaxed text-ink whitespace-pre-wrap">{lead.message}</p>
        </div>
        <div className="flex gap-3">
          {lead.status !== 'read' && (
            <Btn variant="outline" onClick={() => onStatusChange(lead._id, 'read')}>
              <MailOpen className="h-4 w-4" /> Mark as Read
            </Btn>
          )}
          {lead.status !== 'replied' && (
            <Btn variant="outline" onClick={() => onStatusChange(lead._id, 'replied')}>
              <Mail className="h-4 w-4" /> Mark as Replied
            </Btn>
          )}
        </div>
      </div>
    </Modal>
  )
}

function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchLeads = async () => {
    try {
      const data = await leadApi.getAll()
      setLeads(data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await leadApi.updateStatus(id, status)
      setLeads((prev) => prev.map((l) => (l._id === id ? updated : l)))
      setSelected((prev) => (prev && prev._id === id ? updated : prev))
    } catch {
      // ignore
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead?')) return
    try {
      await leadApi.delete(id)
      setLeads((prev) => prev.filter((l) => l._id !== id))
      setSelected(null)
    } catch {
      // ignore
    }
  }

  const newCount = leads.filter((l) => l.status === 'new').length

  return (
    <div className="space-y-6">
      <PageHeader title="Leads" subtitle={`${leads.length} total${newCount ? ` · ${newCount} new` : ''}`} />

      {loading ? (
        <Card className="p-10 text-center text-mist">Loading leads...</Card>
      ) : leads.length === 0 ? (
        <EmptyState icon={Mail} label="No leads yet" hint="Leads from the contact form will appear here." />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-mist">
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Subject</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-surface">
                    <Td className="font-bold text-ink">{lead.name}</Td>
                    <Td>{lead.email}</Td>
                    <Td>{lead.subject || '—'}</Td>
                    <Td><Badge tone={statusTone[lead.status]}>{lead.status}</Badge></Td>
                    <Td className="text-mist">{new Date(lead.createdAt).toLocaleDateString()}</Td>
                    <Td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelected(lead)} className="rounded-lg p-1.5 text-mist transition hover:bg-surface hover:text-accent">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(lead._id)} className="rounded-lg p-1.5 text-mist transition hover:bg-red-500/10 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selected && (
        <LeadDetail lead={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
      )}
    </div>
  )
}

export default AdminLeads

"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Mail, Phone, MessageSquare, CheckCircle2, Clock, X, Check, Trash2, User } from "lucide-react"

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  message: string
  contacted: boolean
  created_at?: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "attended">("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  async function fetchContacts() {
    try {
      setLoading(true)
      const res = await fetch("/api/leads")
      const data = await res.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch { setContacts([]) }
    finally { setLoading(false) }
  }

  async function markAsAttended(id: number) {
    await fetch("/api/admin", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    fetchContacts()
  }

  async function deleteContact(id: number) {
    await fetch("/api/admin", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    fetchContacts()
  }

  useEffect(() => { fetchContacts() }, [])

  const filtered = useMemo(() => {
    let result = contacts
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.message.toLowerCase().includes(q))
    }
    if (filter === "pending") result = result.filter(c => !c.contacted)
    if (filter === "attended") result = result.filter(c => c.contacted)
    return result
  }, [contacts, search, filter])

  const gradients = [
    "from-blue-500/20 to-cyan-500/20",
    "from-violet-500/20 to-fuchsia-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-amber-500/20 to-orange-500/20",
    "from-rose-500/20 to-pink-500/20",
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Contactos</h1>
        <p className="text-neutral-500 text-sm">Vista detallada de todos los leads recibidos.</p>
      </motion.div>

      {/* Controles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Buscar contacto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/50 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
        </div>
        <div className="flex bg-neutral-900/40 rounded-xl border border-neutral-800/50 p-1">
          {(["all", "pending", "attended"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-blue-500/15 text-blue-400" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              {f === "all" ? `Todos (${contacts.length})` : f === "pending" ? `Pendientes (${contacts.filter(c => !c.contacted).length})` : `Atendidos (${contacts.filter(c => c.contacted).length})`}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-neutral-900/40 rounded-2xl border border-neutral-800/50 p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-800" />
                <div className="flex-1">
                  <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-neutral-800/50 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-neutral-800/30 rounded w-full mb-2" />
              <div className="h-3 bg-neutral-800/30 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <User className="w-12 h-12 text-neutral-700 mb-4" />
          <p className="text-neutral-600 text-sm">No se encontraron contactos.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((contact, i) => (
              <motion.div
                key={contact.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedLead(contact)}
                className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-neutral-800/50 p-5 cursor-pointer hover:border-neutral-700/50 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-sm font-bold text-white/80`}>
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{contact.name}</h3>
                      <p className="text-neutral-600 text-[10px]">
                        {contact.created_at ? new Date(contact.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }) : "Sin fecha"}
                      </p>
                    </div>
                  </div>
                  {contact.contacted ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Atendido
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Clock className="w-2.5 h-2.5" /> Pendiente
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-neutral-500 text-xs">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-neutral-600 text-xs">
                    <MessageSquare className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{contact.message}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal de detalle */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900/90 backdrop-blur-2xl border border-neutral-800/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-xl font-bold text-blue-400">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{selectedLead.name}</h3>
                    <p className="text-neutral-500 text-xs">{selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleString("es-MX") : "Sin fecha"}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-neutral-600 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Email", value: selectedLead.email, icon: Mail },
                  { label: "Teléfono", value: selectedLead.phone || "No proporcionado", icon: Phone },
                  { label: "Mensaje", value: selectedLead.message, icon: MessageSquare },
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-800/20 rounded-xl p-4 border border-neutral-800/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <item.icon className="w-3 h-3 text-neutral-600" />
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">{item.label}</p>
                    </div>
                    <p className="text-neutral-300 text-sm leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                {!selectedLead.contacted && (
                  <button
                    onClick={() => { markAsAttended(selectedLead.id); setSelectedLead(null) }}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-black py-2.5 rounded-xl font-bold text-sm hover:bg-blue-400 transition-all"
                  >
                    <Check className="w-4 h-4" /> Atender
                  </button>
                )}
                <button
                  onClick={() => { deleteContact(selectedLead.id); setSelectedLead(null) }}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-medium text-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

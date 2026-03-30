"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Download, Eye, Check, Trash2, X, Users, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  message: string
  contacted: boolean
  created_at?: string
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 800
    const step = (timestamp: number) => {
      start = start || timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setDisplay(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])
  return <>{display}</>
}

function SkeletonRow() {
  return (
    <tr className="border-b border-neutral-800/30">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-neutral-800/50 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  )
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "attended">("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 8

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

  function exportCSV() {
    const header = "Nombre,Email,Teléfono,Mensaje,Estado,Fecha\n"
    const rows = contacts.map(c =>
      `"${c.name}","${c.email}","${c.phone || ''}","${c.message}","${c.contacted ? 'Atendido' : 'Pendiente'}","${c.created_at || ''}"`
    ).join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "leads.csv"; a.click()
  }

  useEffect(() => { fetchContacts() }, [])

  const filtered = useMemo(() => {
    let result = contacts
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
    }
    if (filter === "pending") result = result.filter(c => !c.contacted)
    if (filter === "attended") result = result.filter(c => c.contacted)
    return result
  }, [contacts, search, filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const total = contacts.length
  const attended = contacts.filter(c => c.contacted).length
  const pending = total - attended

  const metrics = [
    { label: "Total de Contactos", value: total, icon: Users, color: "blue", gradient: "from-blue-500/10 to-transparent" },
    { label: "Pendientes", value: pending, icon: Clock, color: "amber", gradient: "from-amber-500/10 to-transparent" },
    { label: "Atendidos", value: attended, icon: CheckCircle2, color: "emerald", gradient: "from-emerald-500/10 to-transparent" },
  ]

  const colorMap: Record<string, string> = {
    blue: "text-blue-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
  }

  return (
    <div className="min-h-screen">
      {/* Métricas */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl p-6 border border-neutral-800/50 hover:border-neutral-700/50 transition-all duration-300 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">{m.label}</p>
                <h2 className={`text-4xl font-black ${colorMap[m.color]}`}>
                  <AnimatedNumber value={m.value} />
                </h2>
              </div>
              <div className={`p-2.5 rounded-xl bg-neutral-800/30 ${colorMap[m.color]}`}>
                <m.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controles de tabla */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-neutral-800/50 overflow-hidden"
      >
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-800/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-9 pr-4 py-2 bg-neutral-800/30 border border-neutral-800/50 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            </div>
            <div className="flex bg-neutral-800/30 rounded-lg border border-neutral-800/50 p-0.5">
              {(["all", "pending", "attended"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setPage(1) }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f ? "bg-blue-500/20 text-blue-400" : "text-neutral-500 hover:text-neutral-300"}`}
                >
                  {f === "all" ? "Todos" : f === "pending" ? "Pendientes" : "Atendidos"}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-800/30 border border-neutral-800/50 rounded-lg text-xs text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar CSV
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800/30">
                {["Nombre", "Email", "Teléfono", "Mensaje", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-neutral-600 uppercase tracking-[0.15em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="w-10 h-10 text-neutral-700" />
                      <p className="text-neutral-600 text-sm">No hay contactos {filter !== "all" ? "con ese filtro" : "registrados aún"}.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {paginated.map((contact, i) => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-neutral-800/20 hover:bg-blue-500/[0.03] transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400 flex-shrink-0">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-white text-sm">{contact.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-400 text-xs">{contact.email}</td>
                      <td className="px-4 py-3 text-neutral-500 text-xs font-mono">{contact.phone || "—"}</td>
                      <td className="px-4 py-3 text-neutral-400 text-xs max-w-[200px] truncate">{contact.message}</td>
                      <td className="px-4 py-3">
                        {contact.contacted ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> Atendido
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Clock className="w-3 h-3" /> Pendiente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelectedLead(contact)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800/50 transition-all"
                            title="Ver detalle"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {!contact.contacted && (
                            <button
                              onClick={() => markAsAttended(contact.id)}
                              className="p-1.5 rounded-lg text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                              title="Marcar como atendido"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="p-1.5 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-neutral-800/30 flex items-center justify-between">
            <span className="text-[10px] text-neutral-600 font-medium">
              Mostrando {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} de {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800/50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${page === i + 1 ? "bg-blue-500/20 text-blue-400" : "text-neutral-600 hover:text-white"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800/50 disabled:opacity-30 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

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
              className="bg-neutral-900/90 backdrop-blur-2xl border border-neutral-800/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl shadow-black/50"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-lg font-bold text-blue-400">
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

              <div className="space-y-4">
                {[
                  { label: "Email", value: selectedLead.email },
                  { label: "Teléfono", value: selectedLead.phone || "No proporcionado" },
                  { label: "Mensaje", value: selectedLead.message },
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-800/30 rounded-xl p-4 border border-neutral-800/30">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-1.5">{item.label}</p>
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
                    <Check className="w-4 h-4" /> Marcar Atendido
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
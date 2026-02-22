"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"
import { BRANDING } from "@/config/branding.config"

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  message: string
  contacted: boolean
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const router = useRouter()

  async function fetchLeads() {
    const res = await fetch("/api/leads")
    const data = await res.json()
    setLeads(data)
  }

  async function markAsContacted(id: number) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchLeads()
  }

  async function deleteLead(id: number) {
    await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchLeads()
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const total = leads.length
  const contacted = leads.filter(l => l.contacted).length
  const pending = total - contacted

  return (
    <div className={`min-h-screen ${BRANDING.colors.background}`}>

      {/* 🔝 Top Navigation */}
      <div className={`${BRANDING.colors.surface} border-b ${BRANDING.colors.border} px-10 py-4 flex justify-between items-center shadow-sm`}>
        <div>
          <h1 className={`font-semibold text-lg ${BRANDING.colors.text}`}>
            {APP_CONFIG.appName}
          </h1>
          <span className={`${BRANDING.colors.mutedText} text-sm`}>
            Admin Dashboard
          </span>
        </div>

        <button
          onClick={handleLogout}
          className={`px-4 py-2 rounded-lg border ${BRANDING.colors.border} ${BRANDING.colors.text} hover:bg-slate-200 transition`}
        >
          Logout
        </button>
      </div>

      <main className={`${BRANDING.typography.spacing}`}>

        {/* 📊 Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl p-6 border ${BRANDING.colors.border} transition hover:scale-[1.02]`}>
            <p className={`${BRANDING.colors.mutedText} text-sm`}>Total Leads</p>
            <h2 className="text-2xl font-bold mt-2">{total}</h2>
          </div>

          <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl p-6 border ${BRANDING.colors.border} transition hover:scale-[1.02]`}>
            <p className={`${BRANDING.colors.mutedText} text-sm`}>Pendientes</p>
            <h2 className="text-2xl font-bold text-amber-600 mt-2">{pending}</h2>
          </div>

          <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl p-6 border ${BRANDING.colors.border} transition hover:scale-[1.02]`}>
            <p className={`${BRANDING.colors.mutedText} text-sm`}>Contactados</p>
            <h2 className="text-2xl font-bold text-emerald-600 mt-2">{contacted}</h2>
          </div>

        </div>

        <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl border ${BRANDING.colors.border} overflow-hidden`}>

  <table className="w-full text-sm">

    <thead className="bg-slate-300">
      <tr className={`border-b ${BRANDING.colors.border}`}>
        <th className="p-4 text-left font-semibold text-slate-800">Nombre</th>
        <th className="p-4 text-left font-semibold text-slate-800">Email</th>
        <th className="p-4 text-left font-semibold text-slate-800">Teléfono</th>
        <th className="p-4 text-left font-semibold text-slate-800">Mensaje</th>
        <th className="p-4 text-left font-semibold text-slate-800">Estado</th>
        <th className="p-4 text-left font-semibold text-slate-800">Acciones</th>
      </tr>
    </thead>

    <tbody>
      {leads.map((lead) => (
        <tr
          key={lead.id}
          className={`border-b ${BRANDING.colors.border} hover:bg-slate-100 transition`}
        >
          <td className="p-4 font-medium text-slate-900">
            {lead.name}
          </td>

          <td className="p-4 text-slate-700">
            {lead.email}
          </td>

          <td className="p-4 text-slate-700">
            {lead.phone}
          </td>

          <td className="p-4 text-slate-600 max-w-xs truncate">
            {lead.message}
          </td>

          <td className="p-4">
            {lead.contacted ? (
              <span className="text-emerald-700 font-semibold">
                Contactado
              </span>
            ) : (
              <span className="text-amber-700 font-semibold">
                Pendiente
              </span>
            )}
          </td>

          <td className="p-4 flex gap-2">

            {!lead.contacted && (
              <button
                onClick={() => markAsContacted(lead.id)}
                className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm transition hover:opacity-90"
              >
                Marcar
              </button>
            )}

            <button
              onClick={() => deleteLead(lead.id)}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition hover:opacity-90"
            >
              Eliminar
            </button>

          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>

      </main>
    </div>
  )
}
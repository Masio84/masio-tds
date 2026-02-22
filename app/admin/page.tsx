"use client"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    fetchLeads()
  }, [])

  const total = leads.length
  const contacted = leads.filter(l => l.contacted).length
  const pending = total - contacted

  return (
    <main className={`min-h-screen ${BRANDING.colors.background} ${BRANDING.typography.spacing}`}>
      
      {/* Header */}
      <div className="mb-10">
        <h1 className={`text-3xl font-bold ${BRANDING.colors.text}`}>
          {APP_CONFIG.appName} — Dashboard
        </h1>
        <p className={`${BRANDING.colors.mutedText}`}>
          Panel interno de gestión de leads
        </p>
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl p-6 border ${BRANDING.colors.border}`}>
          <p className={`${BRANDING.colors.mutedText}`}>Total Leads</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl p-6 border ${BRANDING.colors.border}`}>
          <p className={`${BRANDING.colors.mutedText}`}>Pendientes</p>
          <h2 className="text-2xl font-bold text-yellow-600">{pending}</h2>
        </div>

        <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl p-6 border ${BRANDING.colors.border}`}>
          <p className={`${BRANDING.colors.mutedText}`}>Contactados</p>
          <h2 className="text-2xl font-bold text-green-600">{contacted}</h2>
        </div>
      </div>

      {/* Table */}
      <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-xl border ${BRANDING.colors.border} overflow-hidden`}>
        <table className="w-full text-sm">
          <thead className={`${BRANDING.colors.background}`}>
            <tr className={`border-b ${BRANDING.colors.border}`}>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Teléfono</th>
              <th className="p-4 text-left">Mensaje</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className={`border-b ${BRANDING.colors.border}`}>
                <td className="p-4">{lead.name}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">{lead.phone}</td>
                <td className="p-4">{lead.message}</td>
                <td className="p-4">
                  {lead.contacted ? (
                    <span className="text-green-600 font-semibold">Contactado</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pendiente</span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  {!lead.contacted && (
                    <button
                      onClick={() => markAsContacted(lead.id)}
                      className={`${BRANDING.colors.primary} ${BRANDING.colors.primaryText} px-3 py-1 rounded-lg text-sm`}
                    >
                      Marcar
                    </button>
                  )}
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className={`${BRANDING.colors.danger} text-white px-3 py-1 rounded-lg text-sm`}
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
  )
}
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"

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
    <div className="min-h-screen">

      {/* 🔝 Top Navigation */}
      <div className="bg-white border-b border-slate-300 px-10 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="font-semibold text-lg text-slate-900">
            {APP_CONFIG.appName}
          </h1>
          <span className="text-slate-600 text-sm">
            Admin Dashboard
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-200 transition"
        >
          Logout
        </button>
      </div>

      <main className="p-10">

        {/* 📊 Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-300 transition hover:scale-[1.02]">
            <p className="text-slate-600 text-sm">Total Leads</p>
            <h2 className="text-2xl font-bold mt-2 text-slate-900">
              {total}
            </h2>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-300 transition hover:scale-[1.02]">
            <p className="text-slate-600 text-sm">Pendientes</p>
            <h2 className="text-2xl font-bold text-amber-700 mt-2">
              {pending}
            </h2>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-300 transition hover:scale-[1.02]">
            <p className="text-slate-600 text-sm">Contactados</p>
            <h2 className="text-2xl font-bold text-emerald-700 mt-2">
              {contacted}
            </h2>
          </div>

        </div>

        {/* 📋 Table */}
        <div className="bg-white shadow-xl rounded-xl border border-slate-300 overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-slate-300">
              <tr className="border-b border-slate-300">
                <th className="p-4 text-left font-semibold text-slate-900">
                  Nombre
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  Email
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  Teléfono
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  Mensaje
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  Estado
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-slate-300 hover:bg-slate-100 transition"
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
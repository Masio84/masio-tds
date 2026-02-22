"use client"

import { useEffect, useState } from "react"

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

  return (
    <main className="min-h-screen bg-black text-green-400 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Panel Interno — MasioTDS
      </h1>

      <table className="w-full border border-green-500">
        <thead>
          <tr className="border-b border-green-500">
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Teléfono</th>
            <th className="p-3 text-left">Mensaje</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-green-800">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3">{lead.message}</td>
              <td className="p-3">
                {lead.contacted ? "Contactado" : "Pendiente"}
              </td>
              <td className="p-3 flex gap-2">
                {!lead.contacted && (
                  <button
                    onClick={() => markAsContacted(lead.id)}
                    className="bg-green-600 text-black px-3 py-1"
                  >
                    Marcar
                  </button>
                )}
                <button
                  onClick={() => deleteLead(lead.id)}
                  className="bg-red-600 text-white px-3 py-1"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
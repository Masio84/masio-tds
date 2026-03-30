"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"
import { BRANDING } from "@/config/branding.config"
import { UI_TEXT } from "@/config/ui.config"

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  message: string
  contacted: boolean
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Lead[]>([])
  const router = useRouter()

  async function fetchContacts() {
    const res = await fetch("/api/leads")
    const data = await res.json()
    setContacts(data)
  }

  async function markAsAttended(id: number) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchContacts()
  }

  async function deleteContact(id: number) {
    await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchContacts()
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const total = contacts.length
  const attended = contacts.filter(c => c.contacted).length
  const pending = total - attended

  return (
    <div className={`min-h-screen ${BRANDING.colors.background}`}>

      {/* 🔝 Barra superior */}
      <div className={`${BRANDING.colors.surface} border-b ${BRANDING.colors.border} px-10 py-5 flex justify-between items-center ${BRANDING.colors.shadow} relative z-10`}>
        <div>
          <h1 className={`font-bold text-xl ${BRANDING.colors.text} tracking-tight`}>
            {APP_CONFIG.appName}
          </h1>
          <span className={`${BRANDING.colors.mutedText} text-xs uppercase font-bold tracking-widest`}>
            {UI_TEXT.panelTitle}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className={`px-5 py-2 rounded-lg border ${BRANDING.colors.border} ${BRANDING.colors.text} hover:bg-slate-200 transition-all font-semibold text-sm`}
        >
          {UI_TEXT.logout}
        </button>
      </div>

      <main className="p-10 max-w-7xl mx-auto">

        {/* 📊 Métricas */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">

          <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-2xl p-8 border ${BRANDING.colors.border} transition-all hover:scale-[1.03] group`}>
            <p className={`${BRANDING.colors.mutedText} text-xs font-bold uppercase tracking-widest mb-3`}>
              {UI_TEXT.totalContacts}
            </p>
            <h2 className={`text-4xl font-black ${BRANDING.colors.text}`}>
              {total}
            </h2>
          </div>

          <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-2xl p-8 border ${BRANDING.colors.border} transition-all hover:scale-[1.03]`}>
            <p className={`${BRANDING.colors.mutedText} text-xs font-bold uppercase tracking-widest mb-3`}>
              {UI_TEXT.pending}
            </p>
            <h2 className="text-4xl font-black text-amber-600">
              {pending}
            </h2>
          </div>

          <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-2xl p-8 border ${BRANDING.colors.border} transition-all hover:scale-[1.03]`}>
            <p className={`${BRANDING.colors.mutedText} text-xs font-bold uppercase tracking-widest mb-3`}>
              {UI_TEXT.attended}
            </p>
            <h2 className={`text-4xl font-black ${BRANDING.colors.success.replace('bg-', 'text-')}`}>
              {attended}
            </h2>
          </div>

        </div>

        {/* 📋 Tabla */}
        <div className={`${BRANDING.colors.surface} ${BRANDING.colors.shadow} rounded-2xl border ${BRANDING.colors.border} overflow-hidden transition-all`}>

          <div className={`p-6 border-b ${BRANDING.colors.border} bg-slate-50`}>
            <h3 className={`font-bold ${BRANDING.colors.text}`}>Lista de Contactos Recientes</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100/50">
                <tr className="border-b border-slate-200">
                  <th className={`p-5 text-left font-bold ${BRANDING.colors.text} uppercase text-xs tracking-wider`}>
                    {UI_TEXT.name}
                  </th>
                  <th className={`p-5 text-left font-bold ${BRANDING.colors.text} uppercase text-xs tracking-wider`}>
                    {UI_TEXT.email}
                  </th>
                  <th className={`p-5 text-left font-bold ${BRANDING.colors.text} uppercase text-xs tracking-wider`}>
                    {UI_TEXT.phone}
                  </th>
                  <th className={`p-5 text-left font-bold ${BRANDING.colors.text} uppercase text-xs tracking-wider`}>
                    {UI_TEXT.message}
                  </th>
                  <th className={`p-5 text-left font-bold ${BRANDING.colors.text} uppercase text-xs tracking-wider`}>
                    {UI_TEXT.status}
                  </th>
                  <th className={`p-5 text-center font-bold ${BRANDING.colors.text} uppercase text-xs tracking-wider`}>
                    {UI_TEXT.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-slate-400 font-medium">
                      No hay contactos registrados aún.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className={`p-5 font-bold ${BRANDING.colors.text}`}>
                        {contact.name}
                      </td>

                      <td className={`p-5 ${BRANDING.colors.mutedText} font-medium`}>
                        {contact.email}
                      </td>

                      <td className={`p-5 ${BRANDING.colors.mutedText}`}>
                        {contact.phone}
                      </td>

                      <td className={`p-5 ${BRANDING.colors.mutedText} max-w-xs truncate`}>
                        {contact.message}
                      </td>

                      <td className="p-5">
                        {contact.contacted ? (
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-emerald-200">
                            {UI_TEXT.contacted}
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-amber-200">
                            {UI_TEXT.notContacted}
                          </span>
                        )}
                      </td>

                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          {!contact.contacted && (
                            <button
                              onClick={() => markAsAttended(contact.id)}
                              className={`${BRANDING.colors.primary} ${BRANDING.colors.primaryText} px-4 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20`}
                            >
                              {UI_TEXT.markAsAttended}
                            </button>
                          )}

                          <button
                            onClick={() => deleteContact(contact.id)}
                            className={`${BRANDING.colors.danger} text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20`}
                          >
                            {UI_TEXT.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
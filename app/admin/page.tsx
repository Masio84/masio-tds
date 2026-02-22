"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"
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
    <div className="min-h-screen">

      {/* 🔝 Barra superior */}
      <div className="bg-white border-b border-slate-300 px-10 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="font-semibold text-lg text-slate-900">
            {APP_CONFIG.appName}
          </h1>
          <span className="text-slate-600 text-sm">
            {UI_TEXT.panelTitle}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-200 transition"
        >
          {UI_TEXT.logout}
        </button>
      </div>

      <main className="p-10">

        {/* 📊 Métricas */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-300 transition hover:scale-[1.02]">
            <p className="text-slate-600 text-sm">
              {UI_TEXT.totalContacts}
            </p>
            <h2 className="text-2xl font-bold mt-2 text-slate-900">
              {total}
            </h2>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-300 transition hover:scale-[1.02]">
            <p className="text-slate-600 text-sm">
              {UI_TEXT.pending}
            </p>
            <h2 className="text-2xl font-bold text-amber-700 mt-2">
              {pending}
            </h2>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6 border border-slate-300 transition hover:scale-[1.02]">
            <p className="text-slate-600 text-sm">
              {UI_TEXT.attended}
            </p>
            <h2 className="text-2xl font-bold text-emerald-700 mt-2">
              {attended}
            </h2>
          </div>

        </div>

        {/* 📋 Tabla */}
        <div className="bg-white shadow-xl rounded-xl border border-slate-300 overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-slate-300">
              <tr className="border-b border-slate-300">
                <th className="p-4 text-left font-semibold text-slate-900">
                  {UI_TEXT.name}
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  {UI_TEXT.email}
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  {UI_TEXT.phone}
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  {UI_TEXT.message}
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  {UI_TEXT.status}
                </th>
                <th className="p-4 text-left font-semibold text-slate-900">
                  {UI_TEXT.actions}
                </th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-slate-300 hover:bg-slate-100 transition"
                >
                  <td className="p-4 font-medium text-slate-900">
                    {contact.name}
                  </td>

                  <td className="p-4 text-slate-700">
                    {contact.email}
                  </td>

                  <td className="p-4 text-slate-700">
                    {contact.phone}
                  </td>

                  <td className="p-4 text-slate-600 max-w-xs truncate">
                    {contact.message}
                  </td>

                  <td className="p-4">
                    {contact.contacted ? (
                      <span className="text-emerald-700 font-semibold">
                        {UI_TEXT.contacted}
                      </span>
                    ) : (
                      <span className="text-amber-700 font-semibold">
                        {UI_TEXT.notContacted}
                      </span>
                    )}
                  </td>

                  <td className="p-4 flex gap-2">

                    {!contact.contacted && (
                      <button
                        onClick={() => markAsAttended(contact.id)}
                        className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm transition hover:opacity-90"
                      >
                        {UI_TEXT.markAsAttended}
                      </button>
                    )}

                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition hover:opacity-90"
                    >
                      {UI_TEXT.delete}
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
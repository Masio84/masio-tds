"use client"

import { usePathname } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"

export default function Sidebar() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md transition ${
      pathname === path
        ? "bg-slate-700 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`

  return (
    <aside className="w-64 min-h-screen bg-slate-900 p-6 flex flex-col justify-between">

      <div>
        <h2 className="text-xl font-bold text-white mb-10">
          {APP_CONFIG.appName}
        </h2>

        <nav className="flex flex-col gap-2 text-sm">
          <a href="/admin" className={linkClass("/admin")}>
            Dashboard
          </a>

          <a href="#" className="text-slate-500 cursor-not-allowed px-3 py-2">
            Leads
          </a>

          <a href="#" className="text-slate-500 cursor-not-allowed px-3 py-2">
            Reportes
          </a>
        </nav>
      </div>

      <div className="text-xs text-slate-500">
        MTDS Starter CRM v1
      </div>
    </aside>
  )
}
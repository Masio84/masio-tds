"use client"

import { APP_CONFIG } from "@/config/app.config"
import { BRANDING } from "@/config/branding.config"

export default function Sidebar() {
  return (
    <aside className={`w-64 min-h-screen ${BRANDING.colors.sidebar} ${BRANDING.colors.sidebarText} p-6 flex flex-col justify-between`}>
      
      <div>
        <h2 className="text-xl font-bold mb-8">
          {APP_CONFIG.appName}
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <a href="/admin" className="hover:text-white transition">
            Dashboard
          </a>
          <a href="#" className="hover:text-white transition">
            Leads
          </a>
          <a href="#" className="hover:text-white transition">
            Reportes
          </a>
        </nav>
      </div>

      <div className="text-xs text-slate-400">
        MTDS Starter CRM v1
      </div>
    </aside>
  )
}
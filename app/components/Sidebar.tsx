"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { APP_CONFIG } from "@/app/../config/app.config"
import { UI_TEXT } from "@/app/../config/ui.config"
import { BRANDING } from "@/app/../config/branding.config"
import ThemeToggle from "./ThemeToggle"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  const activeLinkStyle = `${BRANDING.colors.primary} ${BRANDING.colors.primaryText}`
  const inactiveLinkStyle = `${BRANDING.colors.text} hover:bg-slate-200 dark:hover:bg-slate-800 opacity-70`

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
      pathname === path ? activeLinkStyle : inactiveLinkStyle
    }`

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        h-screen 
        ${BRANDING.colors.surface} 
        border-r 
        ${BRANDING.colors.border} 
        ${BRANDING.colors.shadow} 
        flex 
        flex-col 
        z-30
        relative
      `}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-6 border-b ${BRANDING.colors.border}`}>
        {!collapsed && (
          <h2 className={`font-black ${BRANDING.colors.text} text-xl tracking-tighter`}>
            {APP_CONFIG.appName.split(' ')[0]}
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`${BRANDING.colors.mutedText} hover:${BRANDING.colors.text} transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800`}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 p-4 flex-1">
        <Link href="/admin" className={linkClass("/admin")}>
          <span className="text-lg text-center w-6">📊</span>
          {!collapsed && <span>{UI_TEXT.panelTitle}</span>}
        </Link>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 cursor-not-allowed opacity-50 grayscale">
          <span className="text-lg text-center w-6">👥</span>
          {!collapsed && <span className="font-bold text-sm">{UI_TEXT.contacts}</span>}
        </div>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 cursor-not-allowed opacity-50 grayscale">
          <span className="text-lg text-center w-6">📈</span>
          {!collapsed && <span className="font-bold text-sm">{UI_TEXT.reports}</span>}
        </div>
      </nav>

      {/* Footer */}
      <div className={`mt-auto p-6 border-t ${BRANDING.colors.border} ${BRANDING.colors.mutedText}`}>
        {!collapsed && (
          <div className="flex flex-col gap-4">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              CRM Engine v1.0
            </div>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className={`
                w-full 
                mt-2 
                px-4 
                py-2 
                rounded-lg 
                bg-red-500/10 
                text-red-500 
                border 
                border-red-500/20 
                text-sm 
                font-bold 
                hover:bg-red-500 
                hover:text-white 
                transition-all
              `}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
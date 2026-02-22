"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { APP_CONFIG } from "@/config/app.config"
import { UI_TEXT } from "@/config/ui.config"
import ThemeToggle from "./ThemeToggle"

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      pathname === path
        ? "bg-slate-900 text-white dark:bg-slate-700"
        : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
    }`

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className="
        h-screen 
        bg-white 
        dark:bg-slate-900 
        border-r 
        border-slate-300 
        dark:border-slate-700 
        shadow-lg 
        flex 
        flex-col 
        transition-colors 
        duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-700">
        {!collapsed && (
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
            {APP_CONFIG.appName}
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 text-sm">

        <Link href="/admin" className={linkClass("/admin")}>
          <span>📊</span>
          {!collapsed && <span>{UI_TEXT.panelTitle}</span>}
        </Link>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 dark:text-slate-600 cursor-not-allowed">
          <span>👥</span>
          {!collapsed && <span>{UI_TEXT.contacts}</span>}
        </div>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 dark:text-slate-600 cursor-not-allowed">
          <span>📈</span>
          {!collapsed && <span>{UI_TEXT.reports}</span>}
        </div>

      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
        {!collapsed && (
          <>
            <div className="mb-4">MTDS Starter CRM v1</div>
            <ThemeToggle />
          </>
        )}
      </div>
    </motion.aside>
  )
}
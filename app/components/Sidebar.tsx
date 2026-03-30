"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { LayoutDashboard, Users, BarChart3, LogOut, ChevronLeft, ChevronRight } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  const links = [
    { href: "/admin", label: "Panel de Control", icon: LayoutDashboard },
    { href: "/admin/contacts", label: "Contactos", icon: Users },
    { href: "/admin/reports", label: "Reportes", icon: BarChart3 },
  ]

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen bg-neutral-950 border-r border-neutral-800/50 flex flex-col relative overflow-hidden"
    >
      {/* Glow decorativo */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

      {/* Header con Logo */}
      <div className="flex items-center justify-between p-5 border-b border-neutral-800/50 relative z-10">
        {!collapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <img src="/logo.png" alt="Masio TDS" className="h-9 w-auto invert opacity-80" />
          </motion.div>
        ) : (
          <img src="/logo.png" alt="Masio TDS" className="h-7 w-auto invert opacity-60 mx-auto" />
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-neutral-600 hover:text-neutral-300 transition-colors p-1.5 rounded-lg hover:bg-neutral-800/50"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 flex-1 mt-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium relative overflow-hidden
                ${isActive
                  ? "bg-blue-500/10 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30"
                }
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-400 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800/50">
        {!collapsed ? (
          <div className="flex flex-col gap-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-700">
              CRM Engine v1.0
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-red-500/5 text-red-400/70 border border-red-500/10 text-xs font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2.5 rounded-xl text-red-400/50 hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.aside>
  )
}
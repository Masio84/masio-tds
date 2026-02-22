"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        w-full
        mt-4
        px-4
        py-2
        rounded-lg
        border
        border-slate-300
        dark:border-slate-700
        text-sm
        text-slate-700
        dark:text-slate-200
        hover:bg-slate-200
        dark:hover:bg-slate-800
        transition
      "
    >
      {isDark ? "☀ Modo claro" : "🌙 Modo oscuro"}
    </button>
  )
}
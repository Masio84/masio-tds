"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-500">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-black dark:border-green-500">
        <h1 className="text-xl font-bold text-black dark:text-green-400">
          Masio Technologies & Digital Solutions
        </h1>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 py-2 border border-black dark:border-green-400 text-black dark:text-green-400"
        >
          {theme === "dark" ? "Modo Claro" : "Modo Terminal"}
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-black dark:text-green-400"
        >
          Transformamos Procesos en Sistemas Inteligentes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-gray-700 dark:text-green-300"
        >
          Desarrollo de soluciones digitales, automatización con IA y plataformas web para negocios que buscan evolucionar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex gap-6"
        >
          <button className="px-6 py-3 bg-black text-white dark:bg-green-500 dark:text-black shadow-lg">
            Solicitar Cotización
          </button>

          <button className="px-6 py-3 border border-black dark:border-green-400 text-black dark:text-green-400">
            Ver Servicios
          </button>
        </motion.div>

      </section>

    </main>
  )
}
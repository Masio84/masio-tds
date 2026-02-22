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

      <section className="py-20 px-6 border-t border-black dark:border-green-500">
  <h3 className="text-3xl font-bold text-center mb-10 text-black dark:text-green-400">
    Solicita un Diagnóstico Digital
  </h3>

  <form
    onSubmit={async (e) => {
      e.preventDefault()
      const form = e.currentTarget

      const data = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
      }

      await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(data),
      })

      alert("Solicitud enviada correctamente.")
      form.reset()
    }}
    className="max-w-xl mx-auto flex flex-col gap-4"
  >
    <input name="name" placeholder="Nombre" required className="border p-3 bg-white dark:bg-black dark:text-green-400 border-black dark:border-green-500" />
    <input name="email" placeholder="Correo" required className="border p-3 bg-white dark:bg-black dark:text-green-400 border-black dark:border-green-500" />
    <input name="phone" placeholder="Teléfono" className="border p-3 bg-white dark:bg-black dark:text-green-400 border-black dark:border-green-500" />
    <textarea name="message" placeholder="Mensaje" required className="border p-3 bg-white dark:bg-black dark:text-green-400 border-black dark:border-green-500" />

    <button type="submit" className="bg-black text-white dark:bg-green-500 dark:text-black p-3">
      Enviar
    </button>
  </form>
</section>

    </main>
  )
}
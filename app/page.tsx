<<<<<<< HEAD
"use client"

import { useState } from "react"
import { APP_CONFIG } from "@/config/app.config"
import { BRANDING } from "@/config/branding.config"

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      company: formData.get("company") as string,
    }

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok) {
      alert("Lead enviado correctamente")
      e.currentTarget.reset()
    } else {
      alert("Error: " + result.error)
    }

    setLoading(false)
  }

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center ${BRANDING.colors.background} ${BRANDING.colors.text} ${BRANDING.typography.spacing}`}
    >
      <h1
        className={`${BRANDING.typography.titleSize} font-bold mb-2 text-center`}
      >
        {APP_CONFIG.appName}
      </h1>

      <p className="mb-10 text-center opacity-80">
        {APP_CONFIG.appTagline}
      </p>

      {APP_CONFIG.features.enableContactForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            name="name"
            placeholder="Nombre"
            required
            className={`p-3 ${BRANDING.colors.background} border ${BRANDING.colors.border}`}
          />
          <input
            name="email"
            placeholder="Correo"
            required
            className={`p-3 ${BRANDING.colors.background} border ${BRANDING.colors.border}`}
          />
          <input
            name="phone"
            placeholder="Teléfono"
            className={`p-3 ${BRANDING.colors.background} border ${BRANDING.colors.border}`}
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            required
            className={`p-3 ${BRANDING.colors.background} border ${BRANDING.colors.border}`}
          />

          <input
            type="text"
            name="company"
            style={{ display: "none" }}
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={loading}
className={`p-3 ${BRANDING.colors.primary} ${BRANDING.colors.primaryText} font-bold rounded-lg`}          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      )}
=======
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Services from "@/components/sections/Services"
import Portfolio from "@/components/sections/Portfolio"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
>>>>>>> fe5435f0a26d62894eb6a10d3b02f82b3f681fd5
    </main>
  )
}
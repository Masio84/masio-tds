"use client"

import { useState } from "react"
import { APP_CONFIG } from "@/config/app.config"

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
      company: formData.get("company") as string, // honeypot
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 p-10">
      
      {/* Nombre dinámico */}
      <h1 className="text-4xl font-bold mb-2 text-center">
        {APP_CONFIG.appName}
      </h1>

      {/* Tagline dinámico */}
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
            className="p-3 bg-black border border-green-400"
          />
          <input
            name="email"
            placeholder="Correo"
            required
            className="p-3 bg-black border border-green-400"
          />
          <input
            name="phone"
            placeholder="Teléfono"
            className="p-3 bg-black border border-green-400"
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            required
            className="p-3 bg-black border border-green-400"
          />

          {/* Honeypot invisible */}
          <input
            type="text"
            name="company"
            style={{ display: "none" }}
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-green-500 text-black font-bold"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      )}
    </main>
  )
}
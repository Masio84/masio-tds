"use client"

import { useState } from "react"

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
      <h1 className="text-4xl font-bold mb-10">
        Masio Technologies & Digital Solutions
      </h1>

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

        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-green-500 text-black font-bold"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  )
}
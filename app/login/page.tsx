"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/admin")
    } else {
      const data = await res.json()
      setError(data.error || "Error")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-green-400">
      <form
        onSubmit={handleLogin}
        className="bg-black border border-green-500 p-8 flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold text-center">
          Acceso Administrativo
        </h1>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 bg-black border border-green-400"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-black font-bold p-3"
        >
          Ingresar
        </button>
      </form>
    </main>
  )
}
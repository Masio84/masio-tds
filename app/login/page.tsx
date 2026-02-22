"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"
import { UI_TEXT } from "@/config/ui.config"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/admin")
    } else {
      alert("Contraseña incorrecta")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-2xl w-96 border border-slate-300"
      >
        <h2 className="text-2xl font-bold mb-1 text-slate-900">
          {APP_CONFIG.appName}
        </h2>

        <p className="text-slate-600 mb-6 text-sm">
          {UI_TEXT.appSection}
        </p>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full 
            p-3 
            border 
            border-slate-400 
            rounded 
            mb-6 
            bg-white 
            text-slate-900 
            placeholder:text-slate-500
            focus:outline-none 
            focus:ring-2 
            focus:ring-slate-600
          "
        />

        <button
          type="submit"
          className="
            w-full 
            bg-slate-900 
            text-white 
            py-3 
            rounded-lg 
            transition 
            hover:bg-slate-800
          "
        >
          Ingresar
        </button>
      </form>

    </div>
  )
}
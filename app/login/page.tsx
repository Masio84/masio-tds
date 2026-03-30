"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { APP_CONFIG } from "@/config/app.config"
import { BRANDING } from "@/config/branding.config"
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
    <div
      className={`min-h-screen flex items-center justify-center ${BRANDING.colors.background} transition-colors duration-300`}
    >
      <form
        onSubmit={handleLogin}
        className={`
          ${BRANDING.colors.surface} 
          ${BRANDING.colors.shadow} 
          p-10 
          rounded-xl 
          w-96 
          border 
          ${BRANDING.colors.border}
          transition-all
        `}
      >
        <h2 className={`text-2xl font-bold mb-1 ${BRANDING.colors.text}`}>
          {APP_CONFIG.appName}
        </h2>

        <p className={`${BRANDING.colors.mutedText} mb-6 text-sm uppercase tracking-wider font-semibold`}>
          {UI_TEXT.panelTitle}
        </p>

        <input
          type="password"
          placeholder="Ingresa la contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`
            w-full 
            p-3 
            border 
            ${BRANDING.colors.border} 
            rounded 
            mb-6 
            ${BRANDING.colors.surface} 
            ${BRANDING.colors.text} 
            placeholder:opacity-50
            focus:outline-none 
            focus:ring-2 
            focus:ring-slate-400
          `}
        />

        <button
          type="submit"
          className={`
            w-full 
            ${BRANDING.colors.primary} 
            ${BRANDING.colors.primaryText} 
            py-3 
            rounded-lg 
            font-bold
            transition-all 
            hover:opacity-90
            active:scale-[0.98]
          `}
        >
          {UI_TEXT.login}
        </button>
      </form>
    </div>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push("/admin")
      } else {
        setError("Contraseña incorrecta. Intenta de nuevo.")
        setShake(true)
        setTimeout(() => setShake(false), 600)
      }
    } catch {
      setError("Error de conexión. Intenta más tarde.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Glows de fondo estilo landing */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: shake ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-neutral-900/60 backdrop-blur-2xl p-10 rounded-2xl w-[420px] max-w-[90vw] border border-neutral-800 shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)]"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <img src="/logo.png" alt="Masio TDS" className="h-20 w-auto invert opacity-90" />
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-500 text-center mb-8 text-xs uppercase tracking-[0.2em] font-bold"
        >
          Panel de Administración
        </motion.p>

        {/* Campo de contraseña */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mb-4"
        >
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="w-full pl-11 pr-12 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 text-red-400 text-xs mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Botón */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          type="submit"
          disabled={loading || !password}
          className="w-full bg-blue-500 text-black py-3.5 rounded-xl font-bold transition-all hover:bg-blue-400 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Verificando...
            </span>
          ) : (
            "Ingresar"
          )}
        </motion.button>

        {/* Link de regreso */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          href="/"
          className="block text-center text-neutral-600 text-xs mt-6 hover:text-neutral-400 transition-colors"
        >
          ← Volver al sitio
        </motion.a>
      </motion.form>
    </div>
  )
}
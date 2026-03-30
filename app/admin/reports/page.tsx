"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Clock, CheckCircle2, BarChart3, Activity, CalendarDays } from "lucide-react"

type Lead = {
  id: number
  name: string
  email: string
  contacted: boolean
  created_at?: string
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 1000
    const step = (ts: number) => {
      start = start || ts
      const p = Math.min((ts - start) / duration, 1)
      setDisplay(Math.floor(p * value))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])
  return <>{display}{suffix}</>
}

// Donut Chart SVG
function DonutChart({ attended, pending }: { attended: number; pending: number }) {
  const total = attended + pending
  if (total === 0) return <div className="w-40 h-40 rounded-full border-4 border-neutral-800 flex items-center justify-center text-neutral-600 text-xs">Sin datos</div>
  const attendedPct = (attended / total) * 100
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const attendedStroke = (attendedPct / 100) * circumference
  const pendingStroke = circumference - attendedStroke

  return (
    <div className="relative w-44 h-44">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        {/* Pending arc */}
        <motion.circle
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${pendingStroke} ${circumference - pendingStroke}` }}
          transition={{ duration: 1.2, delay: 0.5 }}
          cx="70" cy="70" r={radius}
          fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="12"
          strokeLinecap="round"
          strokeDashoffset={-attendedStroke}
        />
        {/* Attended arc */}
        <motion.circle
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${attendedStroke} ${circumference - attendedStroke}` }}
          transition={{ duration: 1.2, delay: 0.3 }}
          cx="70" cy="70" r={radius}
          fill="none" stroke="rgba(52,211,153,0.8)" strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{Math.round(attendedPct)}%</span>
        <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Atendidos</span>
      </div>
    </div>
  )
}

// Bar Chart
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-[10px] text-neutral-400 font-bold">{d.value}</span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * 100}%` }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="w-full bg-gradient-to-t from-blue-500/30 to-blue-400/60 rounded-t-lg min-h-[4px] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
          </motion.div>
          <span className="text-[9px] text-neutral-600 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

// Mini Sparkline
function Sparkline({ data, color = "blue" }: { data: number[]; color?: string }) {
  if (data.length < 2) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const w = 80
  const h = 24
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ")
  const colors: Record<string, string> = {
    blue: "rgba(59,130,246,0.6)",
    emerald: "rgba(52,211,153,0.6)",
    amber: "rgba(251,191,36,0.6)",
  }
  return (
    <svg width={w} height={h} className="mt-1">
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
        points={points}
        fill="none"
        stroke={colors[color] || colors.blue}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ReportsPage() {
  const [contacts, setContacts] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch_data() {
      try {
        const res = await fetch("/api/leads")
        const data = await res.json()
        setContacts(Array.isArray(data) ? data : [])
      } catch { setContacts([]) }
      finally { setLoading(false) }
    }
    fetch_data()
  }, [])

  const total = contacts.length
  const attended = contacts.filter(c => c.contacted).length
  const pending = total - attended
  const attendedRate = total > 0 ? Math.round((attended / total) * 100) : 0

  // Contactos por día (últimos 7 días)
  const last7Days = useMemo(() => {
    const days: { label: string; value: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      const dayLabel = date.toLocaleDateString("es-MX", { weekday: "short" }).substring(0, 3)
      const count = contacts.filter(c => c.created_at?.startsWith(dateStr)).length
      days.push({ label: dayLabel, value: count })
    }
    return days
  }, [contacts])

  // Sparkline data (simulado basado en datos reales)
  const sparkData = last7Days.map(d => d.value)
  const attendedSpark = useMemo(() => {
    return last7Days.map(d => contacts.filter(c => c.created_at?.startsWith(new Date(Date.now() - d.value * 86400000).toISOString().split("T")[0]) && c.contacted).length)
  }, [contacts, last7Days])

  // Timeline: últimos 5 contactos
  const recentContacts = contacts.slice(0, 5)

  // Último contacto hace...
  const lastContactAgo = useMemo(() => {
    if (contacts.length === 0) return "Sin datos"
    const last = contacts[0]
    if (!last.created_at) return "Sin fecha"
    const diff = Date.now() - new Date(last.created_at).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `hace ${mins} min`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `hace ${hrs}h`
    const days = Math.floor(hrs / 24)
    return `hace ${days}d`
  }, [contacts])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  const kpis = [
    { label: "Tasa de Atención", value: attendedRate, suffix: "%", icon: TrendingUp, color: "emerald", spark: attendedSpark },
    { label: "Promedio / Día", value: total > 0 ? Math.round(total / 7) : 0, suffix: "", icon: Activity, color: "blue", spark: sparkData },
    { label: "Último Contacto", value: 0, text: lastContactAgo, icon: CalendarDays, color: "amber", spark: [] },
  ]

  const kpiColorMap: Record<string, string> = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Reportes</h1>
        <p className="text-neutral-500 text-sm">Analíticas y métricas de tu CRM.</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl p-5 border border-neutral-800/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">{kpi.label}</p>
                <h2 className={`text-3xl font-black ${kpiColorMap[kpi.color]}`}>
                  {kpi.text || <AnimatedNumber value={kpi.value} suffix={kpi.suffix} />}
                </h2>
              </div>
              <div className={`p-2 rounded-lg bg-neutral-800/30 ${kpiColorMap[kpi.color]}`}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
            {kpi.spark.length > 1 && <Sparkline data={kpi.spark} color={kpi.color} />}
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl p-6 border border-neutral-800/50"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Contactos por Día</h3>
            <span className="text-[9px] text-neutral-600 ml-auto">Últimos 7 días</span>
          </div>
          <BarChart data={last7Days} />
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl p-6 border border-neutral-800/50"
        >
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Estado de Atención</h3>
          </div>
          <div className="flex items-center justify-center gap-8">
            <DonutChart attended={attended} pending={pending} />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-white text-sm font-bold">{attended}</p>
                  <p className="text-neutral-600 text-[10px]">Atendidos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                <div>
                  <p className="text-white text-sm font-bold">{pending}</p>
                  <p className="text-neutral-600 text-[10px]">Pendientes</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-neutral-900/40 backdrop-blur-xl rounded-2xl p-6 border border-neutral-800/50"
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-bold text-white">Actividad Reciente</h3>
        </div>

        {recentContacts.length === 0 ? (
          <p className="text-neutral-600 text-sm text-center py-8">No hay actividad reciente.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-500/30 via-neutral-800/30 to-transparent" />

            <div className="space-y-1">
              {recentContacts.map((contact, i) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-neutral-800/20 transition-colors relative"
                >
                  {/* Dot */}
                  <div className={`w-[10px] h-[10px] rounded-full mt-1.5 flex-shrink-0 border-2 ${contact.contacted ? "bg-emerald-400/30 border-emerald-400" : "bg-amber-400/30 border-amber-400"}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium">{contact.name}</p>
                      {contact.contacted ? (
                        <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">ATENDIDO</span>
                      ) : (
                        <span className="text-[8px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">PENDIENTE</span>
                      )}
                    </div>
                    <p className="text-neutral-500 text-xs truncate">{contact.email}</p>
                    <p className="text-neutral-600 text-[10px] mt-0.5">
                      {contact.created_at ? new Date(contact.created_at).toLocaleString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

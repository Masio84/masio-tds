"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection from "../ui/AnimatedSection"
import { Code2, Rocket, Users, Zap, Shield } from "lucide-react"

const stats = [
    {
        value: "5+",
        label: "Proyectos en Producción",
        description: "Aplicaciones funcionando en tiempo real con usuarios activos.",
        icon: Rocket,
        gradient: "from-blue-500 to-cyan-400",
        glow: "bg-blue-500/20",
    },
    {
        value: "99.9%",
        label: "Uptime Garantizado",
        description: "Infraestructura desplegada en Vercel y servicios cloud de alta disponibilidad.",
        icon: Shield,
        gradient: "from-emerald-400 to-teal-500",
        glow: "bg-emerald-500/20",
    },
    {
        value: "< 1s",
        label: "Tiempo de Carga",
        description: "Optimización extrema con Next.js, SSR y Edge Functions para máxima velocidad.",
        icon: Zap,
        gradient: "from-amber-400 to-orange-500",
        glow: "bg-amber-500/20",
    },
    {
        value: "Full",
        label: "Stack Completo",
        description: "Desde el diseño UI/UX hasta backend, bases de datos y despliegue en la nube.",
        icon: Code2,
        gradient: "from-violet-400 to-fuchsia-500",
        glow: "bg-violet-500/20",
    },
    {
        value: "24/7",
        label: "Soporte Continuo",
        description: "Monitoreo proactivo y atención directa para mantener tu proyecto siempre online.",
        icon: Users,
        gradient: "from-rose-400 to-pink-500",
        glow: "bg-rose-500/20",
    },
]

export default function About() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % stats.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const stat = stats[current]
    const Icon = stat.icon

    return (
        <section id="about" className="py-24 bg-neutral-950 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Nosotros</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Innovación y Diseño <br /> <span className="text-neutral-500">Sin Compromisos</span>
                            </h2>
                            <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
                                En Masio Technologies & Digital Solutions, no solo escribimos código; creamos productos digitales que destacan. Combinamos estética premium con rendimiento excepcional.
                            </p>
                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Especializados en SaaS, aplicaciones web dinámicas y experiencias de usuario que dejan una huella duradera.
                            </p>
                        </div>

                        {/* Card Carousel */}
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-neutral-900/50 backdrop-blur-xl border border-neutral-800/50 flex flex-col items-center justify-center p-10 group">
                            {/* Glow dinámico de fondo */}
                            <div className={`absolute inset-0 ${stat.glow} blur-[80px] opacity-30 transition-all duration-1000`} />
                            
                            {/* Patrón decorativo */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-6 right-6 w-20 h-20 border border-white/20 rounded-full" />
                                <div className="absolute top-10 right-10 w-12 h-12 border border-white/10 rounded-full" />
                                <div className="absolute bottom-8 left-8 w-16 h-[1px] bg-white/10" />
                                <div className="absolute bottom-12 left-8 w-10 h-[1px] bg-white/10" />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center relative z-10 flex flex-col items-center"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Value */}
                                    <span className={`block text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2 leading-tight`}>
                                        {stat.value}
                                    </span>

                                    {/* Label */}
                                    <span className="text-white font-bold text-lg mb-3">{stat.label}</span>

                                    {/* Description */}
                                    <p className="text-neutral-500 text-sm max-w-[280px] leading-relaxed">{stat.description}</p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Indicadores de navegación */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {stats.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={`transition-all duration-300 rounded-full ${i === current ? `w-6 h-2 bg-gradient-to-r ${stats[i].gradient}` : "w-2 h-2 bg-neutral-700 hover:bg-neutral-500"}`}
                                    />
                                ))}
                            </div>

                            {/* Navegación por flechas */}
                            <button
                                onClick={() => setCurrent((current - 1 + stats.length) % stats.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700/50 transition-all opacity-0 group-hover:opacity-100"
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => setCurrent((current + 1) % stats.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700/50 transition-all opacity-0 group-hover:opacity-100"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}

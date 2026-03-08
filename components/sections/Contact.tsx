"use client"

import { useState } from "react"
import AnimatedSection from "../ui/AnimatedSection"

export default function Contact() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget // Capturamos la referencia al formulario de inmediato
        setLoading(true)

        const formData = new FormData(form)
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: formData.get("message") as string,
            company: formData.get("company") as string, // honeypot
        }

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                setSuccess(true)
                form.reset() // Usamos la referencia capturada
                setTimeout(() => setSuccess(false), 5000)
            } else {
                alert("Error del servidor: " + (result.error || "Desconocido"))
            }
        } catch (err) {
            console.error("Fetch error:", err)
            // Solo mostramos el alert si realmente fue un error de red y no uno de código
            if (err instanceof TypeError && err.message.includes('reset')) {
                // Si el error fue por el reset, lo ignoramos porque el envío fue exitoso
            } else {
                alert("Hubo un problema al conectar con el servidor. Revisa tu conexión.")
            }
        }

        setLoading(false)
    }

    return (
        <section id="contact" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                Construyamos el <span className="text-blue-400">Futuro</span>
                            </h2>
                            <p className="text-neutral-400 text-lg mb-8 max-w-md">
                                ¿Tienes una idea en mente? Déjanos un mensaje y te contactaremos a la brevedad para comenzar a trabajar en ella.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center">
                                        <span className="text-blue-400">✉</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-neutral-500 uppercase font-semibold">Email</h4>
                                        <p className="font-medium">masio.tds@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center">
                                        <span className="text-blue-400">📱</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-neutral-500 uppercase font-semibold">WhatsApp</h4>
                                        <p className="font-medium">+52 (449) 234 7305</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
                            {success ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                                    <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-3xl">
                                        ✓
                                    </div>
                                    <h3 className="text-2xl font-bold">¡Mensaje Enviado!</h3>
                                    <p className="text-neutral-400">Nos pondremos en contacto contigo pronto.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5 leading-none">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-neutral-400">Nombre Completo</label>
                                            <input
                                                name="name"
                                                placeholder="Ej: John Doe"
                                                required
                                                className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all placeholder:text-neutral-600"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-neutral-400">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@empresa.com"
                                                required
                                                className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all placeholder:text-neutral-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-neutral-400">Teléfono (Opcional)</label>
                                        <input
                                            name="phone"
                                            placeholder="+52 123 456 7890"
                                            className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all placeholder:text-neutral-600"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-neutral-400">Sobre el Proyecto</label>
                                        <textarea
                                            name="message"
                                            placeholder="Cuéntanos brevemente sobre lo que necesitas..."
                                            rows={4}
                                            required
                                            className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white rounded-xl focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all placeholder:text-neutral-600 resize-none"
                                        />
                                    </div>

                                    {/* Honeypot */}
                                    <input
                                        type="text"
                                        name="company"
                                        style={{ position: 'absolute', left: '-9999px' }}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full p-4 bg-blue-400 hover:bg-blue-300 text-black font-bold rounded-xl transition-colors duration-300 mt-2 flex justify-center items-center"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="animate-spin w-5 h-5 border-2 border-black/20 border-t-black rounded-full" />
                                                Enviando...
                                            </span>
                                        ) : "Enviar Mensaje"}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}

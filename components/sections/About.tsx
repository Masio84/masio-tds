"use client"

import AnimatedSection from "../ui/AnimatedSection"

export default function About() {
    return (
        <section id="about" className="py-24 bg-neutral-950 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
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

                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center p-8 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="text-center">
                                <span className="block text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-2">+100</span>
                                <span className="text-neutral-400 font-medium">Proyectos Entregados</span>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}

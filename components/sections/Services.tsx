"use client"

import { Code, Globe, Smartphone, Rocket } from "lucide-react"
import AnimatedSection from "../ui/AnimatedSection"

const services = [
    {
        title: "Desarrollo Web Custom",
        description: "Aplicaciones web escalables, ultrarrápidas y construidas a medida para tus necesidades.",
        icon: <Code className="w-8 h-8 text-blue-400" />,
    },
    {
        title: "Aplicaciones Móviles",
        description: "Experiencias nativas y cross-platform excepcionales para iOS y Android.",
        icon: <Smartphone className="w-8 h-8 text-blue-400" />,
    },
    {
        title: "Diseño UI/UX Premium",
        description: "Interfaces visualmente deslumbrantes diseñadas para enamorar al usuario final.",
        icon: <Globe className="w-8 h-8 text-blue-400" />,
    },
    {
        title: "SaaS & Escalabilidad",
        description: "Arquitectura e infraestructura Cloud robusta capaz de soportar crecimiento masivo.",
        icon: <Rocket className="w-8 h-8 text-blue-400" />,
    },
]

export default function Services() {
    return (
        <section id="services" className="py-24 bg-black text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto">
                            Soluciones tecnológicas integrales para llevar tu negocio al siguiente nivel.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <div className="group relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-blue-500/50 transition-colors duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 h-14 w-14 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed flex-grow">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

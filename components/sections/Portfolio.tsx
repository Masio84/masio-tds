"use client"

import AnimatedSection from "../ui/AnimatedSection"

const projects = [
    {
        title: "E-Commerce Global",
        category: "Plataforma Web",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Fintech Dashboard",
        category: "SaaS App",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Health Tracker App",
        category: "Mobile iOS",
        image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "AI Image Generator",
        category: "Web App Inteligente",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
]

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-24 bg-neutral-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trabajo Destacado</h2>
                            <p className="text-neutral-400">Una selección de las experiencias digitales que hemos creado.</p>
                        </div>
                        <a href="#contact" className="hidden md:inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Ver todos los proyectos <span className="ml-2">→</span>
                        </a>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <div className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer">
                                {/* Fallback color via CSS incase Unsplash images fail */}
                                <div
                                    className="absolute inset-0 bg-neutral-800 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8">
                                    <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <a href="#contact" className="inline-flex items-center text-blue-400 font-medium">
                        Ver todos los proyectos <span className="ml-2">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

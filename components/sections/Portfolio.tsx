"use client"

import AnimatedSection from "../ui/AnimatedSection"

const projects = [
    {
        title: "MedIQ",
        category: "Sistema Clínico Inteligente",
        description: "Gestión de expedientes médicos, agendas y dashboards para consultorios.",
        image: "/portfolio/mediq.png",
        url: "https://my-mediq.vercel.app/",
        tags: ["Next.js", "Supabase", "IA"],
    },
    {
        title: "SUTEMA",
        category: "Portal Institucional",
        description: "Plataforma de gestión sindical para trabajadores estatales y municipales.",
        image: "/portfolio/sutema.png",
        url: "https://sutema.vercel.app/login",
        tags: ["Next.js", "Auth", "Dashboard"],
    },
    {
        title: "Liga de Profetas",
        category: "Quiniela Deportiva",
        description: "Sistema de predicciones deportivas para Liga MX y Premier League.",
        image: "/portfolio/liga-profetas.png",
        url: "https://liga-de-profetas.vercel.app/",
        tags: ["React", "Gamificación", "API"],
    },
    {
        title: "ImpulsoWeb",
        category: "Landing Studio",
        description: "Estudio de creación de landing pages de alto impacto y conversión.",
        image: "/portfolio/impulsoweb.png",
        url: "https://masio84.github.io/ImpulsoWeb/",
        tags: ["HTML", "CSS", "Particles.js"],
    },
    {
        title: "Esfera de Bloch",
        category: "Visualizador Cuántico",
        description: "Herramienta interactiva 3D para la enseñanza de computación cuántica.",
        image: "/portfolio/esfera-bloch.png",
        url: "https://masio84.github.io/Esfera_de_Bloch/",
        tags: ["Three.js", "Ciencia", "3D"],
    },
]

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
            {/* Glow decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-3 block">Portafolio</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trabajos Destacados</h2>
                            <p className="text-neutral-400 max-w-lg">Proyectos reales que hemos diseñado y desarrollado para clientes y comunidades.</p>
                        </div>
                        <a href="#contact" className="hidden md:inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Inicia tu proyecto <span className="ml-2">→</span>
                        </a>
                    </div>
                </AnimatedSection>

                {/* Grid principal: primer proyecto grande, resto en grid 2x2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl overflow-hidden cursor-pointer block border border-neutral-800/50 hover:border-neutral-700/50 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.2)] ${index === 0 ? 'lg:col-span-2 aspect-[16/8]' : 'aspect-video'}`}
                            >
                                {/* Image */}
                                <div
                                    className="absolute inset-0 bg-neutral-800 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="text-blue-400 text-xs font-bold tracking-[0.15em] uppercase mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Arrow indicator */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </AnimatedSection>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#contact" className="inline-flex items-center text-blue-400 font-medium">
                        Inicia tu proyecto <span className="ml-2">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

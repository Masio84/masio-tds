"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Nosotros", href: "#about" },
        { name: "Servicios", href: "#services" },
        { name: "Portafolio", href: "#portfolio" },
        { name: "Contacto", href: "#contact" },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-neutral-900" : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-3 group relative z-50">
                        {/* Si guardas la imagen en la carpeta public como logo.png, descomenta la siguiente línea y borra el div de abajo */}
                        {/* <img src="/logo.png" alt="Masio TDS Logo" className="h-10 w-auto invert" /> */}

                        {/* Recreación del logo en SVG/Texto para desarrollo */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                                @MASIO.TDS
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                                Creative Developer Studio
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium hover:bg-blue-400 hover:text-black hover:border-blue-400 transition-all duration-300"
                        >
                            Contactar
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-bold text-neutral-400 hover:text-blue-400 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-8 px-8 py-3 rounded-full bg-blue-400 text-black font-bold text-lg"
                        >
                            Iniciemos un Proyecto
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

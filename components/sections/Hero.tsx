"use client"

import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white pt-20">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px]" />
            </div>

            <div className="z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400"
                >
                    Masio Technologies & <br className="hidden md:block" />
                    <span className="text-blue-400">Digital Solutions</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-neutral-400 mb-10 max-w-2xl mx-auto"
                >
                    Transformamos ideas complejas en experiencias digitales elegantes, rápidas y escalables.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="#contact"
                        className="inline-block bg-blue-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-300 transition-colors duration-300"
                    >
                        Iniciemos un Proyecto
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

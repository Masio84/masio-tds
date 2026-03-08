"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove)
            document.addEventListener("mousedown", onMouseDown)
            document.addEventListener("mouseup", onMouseUp)
        }

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mouseup", onMouseUp)
        }

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const onMouseDown = () => {
            setClicked(true)
        }

        const onMouseUp = () => {
            setClicked(false)
        }

        addEventListeners()
        handleLinkHoverEvents()

        return () => {
            removeEventListeners()
        }
    }, [])

    const handleLinkHoverEvents = () => {
        document.querySelectorAll("a, button, input, textarea").forEach((el) => {
            el.addEventListener("mouseenter", () => setLinkHovered(true))
            el.addEventListener("mouseleave", () => setLinkHovered(false))
        })
    }

    return (
        <>
            {/* El "Aura" o mancha de color que sigue al mouse con retraso (efecto magnético) */}
            <motion.div
                className="fixed top-0 left-0 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none z-[99] hidden md:block"
                animate={{
                    x: position.x - 64,
                    y: position.y - 64,
                    scale: linkHovered ? 2 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    mass: 1,
                }}
            />

            {/* El anillo principal con mix-blend-mode */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 rounded-full border border-blue-400 pointer-events-none z-[100] mix-blend-difference hidden md:block"
                animate={{
                    x: position.x - 12,
                    y: position.y - 12,
                    scale: clicked ? 0.5 : linkHovered ? 2.5 : 1,
                    backgroundColor: linkHovered ? "rgba(96, 165, 250, 1)" : "rgba(96, 165, 250, 0)",
                    borderWidth: linkHovered ? "0px" : "1px",
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    mass: 0.5,
                }}
            />

            {/* Rastro pequeño para ultra-dinamismo */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 rounded-full bg-blue-400 pointer-events-none z-[100] hidden md:block"
                animate={{
                    x: position.x - 2,
                    y: position.y - 2,
                }}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 50,
                }}
            />
        </>
    )
}

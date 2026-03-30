"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"

export default function ConditionalNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // No mostrar Navbar/Footer en rutas de admin o login
  const isExcluded = pathname?.startsWith("/admin") || pathname === "/login"
  
  if (isExcluded) {
    return <>{children}</>
  }
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

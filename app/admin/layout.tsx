"use client"

import Sidebar from "@/app/components/Sidebar"
import { BRANDING } from "@/config/branding.config"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`
      flex 
      min-h-screen 
      ${BRANDING.colors.background}
      transition-colors 
      duration-300
    `}>

      <Sidebar />

      <div className="flex-1 transition-all duration-300 relative overflow-hidden">
        {/* Glows de fondo */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-cyan-500/5 blur-[100px] pointer-events-none" />
        
        <div className={`
          p-8 
          ${BRANDING.colors.text}
          transition-colors 
          duration-300
          h-full
        `}>
          {children}
        </div>
      </div>

    </div>
  )
}
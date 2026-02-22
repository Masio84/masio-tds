"use client"

import Sidebar from "@/app/components/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="
      flex 
      min-h-screen 
      bg-gradient-to-br 
      from-slate-200 
      via-slate-300 
      to-slate-200
      dark:from-slate-900 
      dark:via-slate-800 
      dark:to-slate-900
      transition-colors 
      duration-300
    ">

      <Sidebar />

      <div className="flex-1 transition-all duration-300">
        <div className="
          p-8 
          text-slate-900 
          dark:text-slate-100 
          transition-colors 
          duration-300
        ">
          {children}
        </div>
      </div>

    </div>
  )
}
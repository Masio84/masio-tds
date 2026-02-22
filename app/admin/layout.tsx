"use client"

import Sidebar from "@/app/components/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300">
        <div className="p-8">
          {children}
        </div>
      </div>

    </div>
  )
}
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { APP_CONFIG } from "@/config/app.config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginRoute = pathname.startsWith("/login")

  // 🚫 Si el panel está desactivado completamente
  if (!APP_CONFIG.features.enableAdminPanel && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  const session = request.cookies.get("admin_session")?.value

  // 🔐 Si intenta entrar a /admin sin sesión válida
  if (isAdminRoute && session !== "valid") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 🚪 Si ya está logueado y entra a /login
  if (isLoginRoute && session === "valid") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
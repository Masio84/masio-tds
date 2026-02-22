import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginRoute = request.nextUrl.pathname.startsWith("/login")

  const session = request.cookies.get("admin_session")?.value

  // 🔐 Si intenta entrar a /admin sin sesión → redirigir a /login
  if (isAdminRoute && session !== "valid") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 🚪 Si ya tiene sesión y entra a /login → mandarlo a /admin
  if (isLoginRoute && session === "valid") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/login"],
}
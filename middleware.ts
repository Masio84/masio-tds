import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const password = request.nextUrl.searchParams.get("password")
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!password || password !== adminPassword) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin"],
}
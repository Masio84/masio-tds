import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      )
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set("admin_session", "valid", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 horas
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: "Login error" },
      { status: 500 }
    )
  }
}
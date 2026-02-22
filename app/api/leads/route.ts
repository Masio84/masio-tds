import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    await sql`
      INSERT INTO leads (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone}, ${message})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json()

    await sql`
      UPDATE leads
      SET contacted = TRUE
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error updating" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    await sql`
      DELETE FROM leads
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 })
  }
}
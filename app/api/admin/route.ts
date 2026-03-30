import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || "")

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    await sql`UPDATE leads SET contacted = true WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("PATCH Error:", error)
    return NextResponse.json(
      { error: error?.message || "Error updating" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    await sql`DELETE FROM leads WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("DELETE Error:", error)
    return NextResponse.json(
      { error: error?.message || "Error deleting" },
      { status: 500 }
    )
  }
}
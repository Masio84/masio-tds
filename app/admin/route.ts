import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function PATCH(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL not defined" },
        { status: 500 }
      )
    }

    const sql = neon(process.env.DATABASE_URL)

    const { id } = await request.json()

    await sql`
      UPDATE leads
      SET contacted = TRUE
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error updating" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL not defined" },
        { status: 500 }
      )
    }

    const sql = neon(process.env.DATABASE_URL)

    const { id } = await request.json()

    await sql`
      DELETE FROM leads
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error deleting" },
      { status: 500 }
    )
  }
}
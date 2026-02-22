import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

function getSql() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL not defined")
  }

  return neon(databaseUrl)
}

export async function PATCH(request: Request) {
  try {
    const sql = getSql()
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
    const sql = getSql()
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
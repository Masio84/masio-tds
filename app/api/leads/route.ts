import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

function getSql() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error("DATABASE_URL not defined")
  }
  return neon(databaseUrl)
}

// 🔹 GET → Obtener todos los leads
export async function GET() {
  try {
    const sql = getSql()

    const leads = await sql`
      SELECT *
      FROM leads
      ORDER BY created_at DESC
    `

    return NextResponse.json(leads)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error fetching leads" },
      { status: 500 }
    )
  }
}

// 🔹 POST → Crear lead (formulario)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, company } = body

    // Honeypot
    if (company && company.trim() !== "") {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const sql = getSql()

    await sql`
      INSERT INTO leads (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone}, ${message})
    `

    // Telegram elegante
    if (
      process.env.TELEGRAM_BOT_TOKEN &&
      process.env.TELEGRAM_CHAT_ID
    ) {
      const telegramMessage = `
<b>📥 Nuevo Lead — MasioTDS</b>

━━━━━━━━━━━━━━━━━━

<b>👤 Nombre</b>
${name}

<b>📧 Email</b>
<a href="mailto:${email}">${email}</a>

<b>📱 Teléfono</b>
${phone || "No proporcionado"}

<b>📝 Mensaje</b>
${message}

━━━━━━━━━━━━━━━━━━
<i>Creative Developer Studio</i>
`

      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
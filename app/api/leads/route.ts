import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, company } = body

    // 🛑 Honeypot: si el campo oculto tiene algo, es bot
    if (company && company.trim() !== "") {
      return NextResponse.json(
        { success: true }, 
        { status: 200 }
      )
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL not defined" },
        { status: 500 }
      )
    }

    const sql = neon(process.env.DATABASE_URL)

    // Guardar en Neon
    await sql`
      INSERT INTO leads (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone}, ${message})
    `

       // Notificación Telegram (Tarjeta Ejecutiva Elegante)
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
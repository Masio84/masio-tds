import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { APP_CONFIG } from "@/config/app.config"

// Inicializamos Neon
const sql = neon(process.env.DATABASE_URL || "")

// 🔹 GET → Obtener todos los leads
export async function GET() {
  try {
    const data = await sql`SELECT * FROM leads ORDER BY created_at DESC`
    return NextResponse.json(data)
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

    await sql`INSERT INTO leads (name, email, phone, message) VALUES (${name}, ${email}, ${phone || null}, ${message})`

    // Telegram elegante (Opcional - No bloquea el éxito)
    try {
      if (
        APP_CONFIG.features.enableTelegram &&
        process.env.TELEGRAM_BOT_TOKEN &&
        process.env.TELEGRAM_CHAT_ID
      ) {
        const telegramMessage = `
<b>📥 Nuevo Lead — ${APP_CONFIG.appName}</b>

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
<i>${APP_CONFIG.appTagline}</i>
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
    } catch (teleError) {
      console.error("Telegram Notification Error (Non-fatal):", teleError)
    }

    return NextResponse.json({ success: true, message: "Lead registered successfully" })
  } catch (error: any) {
    console.error("Submission Error:", error)
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
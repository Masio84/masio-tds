import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { APP_CONFIG } from "@/config/app.config"

// Inicializamos Supabase
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials in .env file")
  }

  // Usamos el Service Role para escritura directa y bypassing RLS en modo API Server.
  return createClient(supabaseUrl, supabaseServiceKey)
}

// 🔹 GET → Obtener todos los leads
export async function GET() {
  try {
    const supabase = getSupabaseClient()

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

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

    const supabase = getSupabaseClient()

    const { error: supabaseError } = await supabase
      .from("leads")
      .insert([
        { name, email, phone, message }
      ])

    if (supabaseError) throw supabaseError

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
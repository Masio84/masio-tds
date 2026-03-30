import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Inicializamos Supabase
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials in .env file")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function PATCH(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const { error } = await supabase
      .from("leads")
      .update({ contacted: true })
      .eq("id", id)

    if (error) throw error

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
    const supabase = getSupabaseClient()
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("DELETE Error:", error)
    return NextResponse.json(
      { error: error?.message || "Error deleting" },
      { status: 500 }
    )
  }
}
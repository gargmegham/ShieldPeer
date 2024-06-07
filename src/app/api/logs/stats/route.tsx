import { NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("logs_per_day").select("*")
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json(data)
}

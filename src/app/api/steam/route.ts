import { NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data } = await supabase.from("SteamUser").select("*").limit(1).single()
    return NextResponse.json(data)
}

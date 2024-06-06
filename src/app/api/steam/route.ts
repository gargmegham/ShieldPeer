import { NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data } = await supabase.from("SteamUser").select("*").single()
    return NextResponse.json(data)
}

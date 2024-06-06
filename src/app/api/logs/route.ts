import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Log } from "@/types/database"

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { data } = await supabase.from("Logs").select("*")
    return NextResponse.json(data as Log[])
}

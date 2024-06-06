import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Log } from "@/types/database"

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("Logs").select("*")
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json(data as Log[])
}

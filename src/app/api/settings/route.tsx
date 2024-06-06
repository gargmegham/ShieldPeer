import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Setting } from "@/types/database"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data } = await supabase.from("Settings").select("*").single()
    return NextResponse.json(data as Setting)
}

export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload: Setting = await request.json()
    await supabase.from("Settings").upsert([payload], { onConflict: "id" })
    return NextResponse.json({ message: "Successfully updated settings" }, { status: 200 })
}

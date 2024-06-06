import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Setting } from "@/types/database"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("Settings").select("*").single()
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json(data as Setting)
}

export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload: Setting = await request.json()
    const { error } = await supabase.from("Settings").upsert([payload], { onConflict: "user_id" })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully updated settings" }, { status: 200 })
}

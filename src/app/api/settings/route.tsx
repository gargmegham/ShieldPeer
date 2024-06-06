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
    const { data: user } = await supabase.auth.getUser()
    if (user?.user?.id) {
        const { data: row } = await supabase.from("Settings").select("*").single()
        if (!row) await supabase.from("Settings").insert(payload)
        else await supabase.from("Settings").update(payload).eq("id", row.id)
    }
    return NextResponse.json({ message: "Successfully updated settings" }, { status: 200 })
}

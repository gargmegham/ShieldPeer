import { NextRequest, NextResponse } from "next/server"

import { priceEmpire } from "@/utils/price-empire"
import { getSupabaseServiceClient } from "@/utils/supabase"

export async function POST(request: NextRequest) {
    const headers = request.headers
    const key = headers.get("key") ?? ""
    const payload = await request.json()
    const user_id = payload?.user_id
    if (!key || !user_id) return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    const supabase = getSupabaseServiceClient(key)
    const { data: setting, error: settingError } = await supabase
        .from("Settings")
        .select("*")
        .eq("user_id", user_id)
        .limit(1)
        .single()
    if (settingError) return NextResponse.json({ message: settingError.message }, { status: 500 })
    await priceEmpire(supabase, setting)
    return NextResponse.json({ status: 200 })
}

export const maxDuration = 60 // 1 minute as per hobby plan

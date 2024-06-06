import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    return NextResponse.json({ message: "Logged out" })
}

import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/utils/supabase"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    const supabase = createClient()
    await supabase.auth.signOut()
    return NextResponse.json({ message: "Logged out" })
}

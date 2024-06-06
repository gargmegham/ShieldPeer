import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export async function GET(req: NextRequest) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("Secrets").select("*")
    console.log(data, error, "fetch secrets")
}

import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Item } from "@/types/database"

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { data } = await supabase.from("Items").select("*")
    return NextResponse.json(data as Item[])
}

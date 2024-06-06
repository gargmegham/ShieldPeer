import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Item } from "@/types/database"

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page")) || 1
    const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10
    const { data } = await supabase.from("Items").select("*").range(page, itemsPerPage)
    return NextResponse.json(data as Item[])
}

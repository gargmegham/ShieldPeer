import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Listing } from "@/types/database"

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient()
    // item is an alias for Items
    // Items and listing are connected by item_id with a one to many relationship
    const { data, error } = await supabase.from("Listing").select(`
        *,
        item:Items(*)
`)
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json(data as Listing[])
}

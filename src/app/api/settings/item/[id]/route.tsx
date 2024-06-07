import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { ItemSetting } from "@/types/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseClient()
    const id = params.id
    const { data } = await supabase.from("ItemSettings").select("*").match({ item_id: id }).limit(1).single()
    return NextResponse.json(data as ItemSetting)
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    const supabase = getSupabaseClient()
    const payload: ItemSetting = await request.json()
    const { error } = await supabase
        .from("ItemSettings")
        .upsert([{ ...payload, item_id: id }], { onConflict: "item_id, user_id" })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully updated settings" }, { status: 200 })
}

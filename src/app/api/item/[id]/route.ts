import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { Item } from "@/types/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseClient()
    const id = params.id
    const { data } = await supabase.from("Items").select("*").match({ id }).single()
    return NextResponse.json(data as Item)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseClient()
    const id = params.id
    await supabase.from("Items").delete().match({ id })
    return NextResponse.json({ status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    const supabase = getSupabaseClient()
    const payload: Item = await request.json()
    // Users can only update the is_active field
    const is_active = payload.is_active
    const { error } = await supabase.from("Items").update({ is_active }).match({ id })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully updated item" }, { status: 200 })
}

import { NextResponse } from "next/server"

import { Waxpeer } from "waxpeer"

import { getSupabaseClient } from "@/utils/supabase"

import type { Listing } from "@/types/database"

export async function GET() {
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

export async function DELETE() {
    const supabase = getSupabaseClient()
    const { data: settings } = await supabase.from("Settings").select("*").single()
    if (!settings || !settings?.waxpeer_key)
        return NextResponse.json({ message: "Waxpeer API key not set in settings" }, { status: 400 })
    try {
        const waxpeer = new Waxpeer(settings?.waxpeer_key)
        await waxpeer.removeAll()
    } catch (err: any) {
        const response = err?.response?.data
        const status_code = err?.response?.status
        return NextResponse.json(
            {
                message: "Failed to delete item from Waxpeer",
                error: response?.msg ?? "Unknown error",
            },
            { status: status_code ?? 500 }
        )
    }
    const { error } = await await supabase.from("Listing").delete()
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ status: 200 })
}

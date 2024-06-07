import { NextRequest, NextResponse } from "next/server"

import { Waxpeer } from "waxpeer"

import { getSupabaseClient } from "@/utils/supabase"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseClient()
    const { data: settings } = await supabase.from("Settings").select("*").single()
    if (!settings || !settings?.waxpeer_key)
        return NextResponse.json({ message: "Waxpeer API key not set in settings" }, { status: 400 })
    const id = params.id
    try {
        const waxpeer = new Waxpeer(settings?.waxpeer_key)
        await waxpeer.removeItems(id)
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
    const { error } = await await supabase.from("Listing").delete().match({ id })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ status: 200 })
}

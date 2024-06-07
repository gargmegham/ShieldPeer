import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"
import { deleteItemFromWaxpeer } from "@/utils/waxpeer"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseClient()
    const { data: settings } = await supabase.from("Settings").select("*").single()
    if (!settings || !settings?.waxpeer_key)
        return NextResponse.json({ message: "Waxpeer API key not set in settings" }, { status: 400 })
    const id = params.id
    try {
        await deleteItemFromWaxpeer(parseInt(id), settings?.waxpeer_key)
    } catch (err: any) {
        return NextResponse.json(
            {
                message: "Failed to delete item from Waxpeer",
                error: err?.message ?? err.toString(),
            },
            { status: 500 }
        )
    }
    const { error } = await await supabase.from("Listing").delete().match({ id })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ status: 200 })
}

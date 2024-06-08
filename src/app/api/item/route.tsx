import { NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export async function PUT() {
    const supabase = getSupabaseClient()
    // Users can only update the is_active field
    const { error } = await supabase.from("Items").update({
        is_active: true,
    })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully updated item" }, { status: 200 })
}

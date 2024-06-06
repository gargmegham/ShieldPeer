import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { PriceRange } from "@/types/database"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("PriceRange").select("*")
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json(data as PriceRange[])
}

export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload = await request.json()
    const { error } = await supabase.from("PriceRange").insert(payload)
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully added price range." }, { status: 200 })
}

export async function PUT(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload = await request.json()
    if (!payload.id) {
        return NextResponse.json({ message: "Please provide an ID." }, { status: 400 })
    }
    const { error } = await supabase.from("PriceRange").upsert(payload)
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully updated price range." }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    if (!searchParams.has("id")) {
        return NextResponse.json({ message: "Please provide an ID." }, { status: 400 })
    }
    const { error } = await supabase
        .from("PriceRange")
        .delete()
        .match({ id: searchParams.get("id") })
    if (error) return NextResponse.json({ message: error.message }, { status: 500 })
    return NextResponse.json({ message: "Successfully deleted price range." }, { status: 200 })
}

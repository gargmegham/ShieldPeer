import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import type { PriceRange } from "@/types/database"

export async function GET() {
    const supabase = getSupabaseClient()
    const { data } = await supabase.from("PriceRange").select("*")
    return NextResponse.json(data as PriceRange[])
}

export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload = await request.json()
    const { data: user } = await supabase.auth.getUser()
    if (user?.user?.id) {
        await supabase.from("PriceRange").insert(payload)
    }
    return NextResponse.json({ message: "Successfully added price range." }, { status: 200 })
}

export async function PUT(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload = await request.json()
    if (!payload.id) {
        return NextResponse.json({ message: "Please provide an ID." }, { status: 400 })
    }
    await supabase.from("PriceRange").upsert(payload)
    return NextResponse.json({ message: "Successfully updated price range." }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    if (!searchParams.has("id")) {
        return NextResponse.json({ message: "Please provide an ID." }, { status: 400 })
    }
    await supabase
        .from("PriceRange")
        .delete()
        .match({ id: searchParams.get("id") })
    return NextResponse.json({ message: "Successfully deleted price range." }, { status: 200 })
}

import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

import { PriceHistory } from "@/types/price-empire"

export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient()
    const payload = await request.json()
    const market_hash_name = payload.market_hash_name
    const { data, error } = await supabase
        .from("PriceHistory")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
    if (!data || error) {
        return NextResponse.json([])
    }
    const priceHistory: PriceHistory = data.price_history
    const response = priceHistory[market_hash_name] ?? []
    return NextResponse.json(response)
}

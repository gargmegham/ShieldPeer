import { NextResponse } from "next/server"

import { fetchInventoryFromPriceEmpire, formatItems } from "@/utils/price-empire"
import { getSupabaseServiceClient } from "@/utils/supabase"

import type { Setting } from "@/types/database"
import type { Inventory as PriceEmpireInventory } from "@/types/price-empire"

export async function POST() {
    const supabase = getSupabaseServiceClient()
    const { data } = await supabase.from("Settings").select("*")
    for (const setting of data as Setting[]) {
        try {
            const inventory: PriceEmpireInventory = await fetchInventoryFromPriceEmpire(setting)
            const user = inventory.user
            await supabase.from("SteamUser").upsert({
                steam_id: user.steam64Id,
                name: user.name,
                image: user.image,
                country: user.country,
                user_id: setting.user_id,
            })
            const items = inventory.items
            const foramttedItems = formatItems(items)
        } catch (error: any) {
            console.error(`Error ${error?.name ?? "unknown"}: ${error?.message ?? "unknown"}`)
        }
    }
    return NextResponse.json({ status: 200 })
}

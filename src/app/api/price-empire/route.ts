import { NextResponse } from "next/server"

import { fetchInventoryFromPriceEmpire, formatItems } from "@/utils/price-empire"
import { getSupabaseServiceClient } from "@/utils/supabase"

import type { Item, Setting } from "@/types/database"
import type { Inventory as PriceEmpireInventory } from "@/types/price-empire"

export async function POST() {
    const supabase = getSupabaseServiceClient()
    const { data } = await supabase.from("Settings").select("*")
    for (const setting of data as Setting[]) {
        try {
            const inventory: PriceEmpireInventory = await fetchInventoryFromPriceEmpire(setting)
            await supabase.from("SteamUser").upsert(
                {
                    steam_id: inventory.user.steam64Id,
                    name: inventory.user.name,
                    image: inventory.user.image,
                    country: inventory.user.country,
                    user_id: setting.user_id,
                },
                {
                    onConflict: "user_id",
                }
            )
            const items: Item[] = formatItems(inventory.items, setting)
            await supabase.from("Items").upsert(items, {
                onConflict: "asset_id,user_id",
            })
        } catch (error: any) {
            console.error(`Error ${error?.name ?? "unknown"}: ${error?.message ?? "unknown"}`)
        }
    }
    return NextResponse.json({ status: 200 })
}

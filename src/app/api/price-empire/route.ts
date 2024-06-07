import { NextResponse } from "next/server"

import { fetchInventoryFromPriceEmpire, fetchPriceHistoryFromPriceEmpire, formatItems } from "@/utils/price-empire"
import { getSupabaseServiceClient } from "@/utils/supabase"

import type { Item, Setting } from "@/types/database"
import type { Inventory as PriceEmpireInventory, PriceHistory } from "@/types/price-empire"

export async function POST() {
    console.info("Cron job for fetching Price Empire inventory and price history has started...")
    const supabase = getSupabaseServiceClient()
    const { data } = await supabase.from("Settings").select("*")
    for (const setting of data as Setting[]) {
        try {
            console.info(`Fetching inventory for user ${setting.user_id}...`)
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
                onConflict: "asset_id, user_id",
            })
            await supabase.from("Logs").insert({
                name: "Price Empire",
                user_id: setting.user_id,
                message: "Successfully fetched inventory",
                type: "success",
                image: "https://www.shieldpeer.in/price-empire.svg",
            })
        } catch (error: any) {
            await supabase.from("Logs").insert({
                user_id: setting.user_id,
                name: "Price Empire",
                message: "Failed to fetch inventory",
                type: "failure",
                image: "https://www.shieldpeer.in/price-empire.svg",
                meta_data: {
                    error: error?.message ?? "Unknown error",
                },
            })
            console.error(`${error?.name ?? "unknown"}: ${error?.message ?? "unknown"}`)
        }
        try {
            const priceHistory: PriceHistory = await fetchPriceHistoryFromPriceEmpire(setting)
            await supabase.from("PriceHistory").insert({
                price_history: priceHistory,
            })
            await supabase.from("Logs").insert({
                user_id: setting.user_id,
                name: "Price Empire",
                message: "Successfully fetched price history",
                type: "success",
                image: "https://www.shieldpeer.in/price-empire.svg",
            })
        } catch (error: any) {
            await supabase.from("Logs").insert({
                name: "Price Empire",
                user_id: setting.user_id,
                message: "Failed to fetch price history",
                type: "failure",
                image: "https://www.shieldpeer.in/price-empire.svg",
                meta_data: {
                    error: error?.message ?? "Unknown error",
                },
            })
            console.error(`${error?.name ?? "unknown"}: ${error?.message ?? "unknown"}`)
        }
    }
    console.info("Cron job finished.")
    return NextResponse.json({ status: 200 })
}

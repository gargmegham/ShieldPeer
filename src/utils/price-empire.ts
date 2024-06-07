import { getSupabaseServiceClient } from "@/utils/supabase"

import { Item, Setting } from "@/types/database"
import type { Inventory as PriceEmpireInventory, Item as PriceEmpireItem, PriceHistory } from "@/types/price-empire"

export const fetchInventoryFromPriceEmpire = async (setting: Setting) => {
    const apiKey = setting.price_empire_key
    if (!apiKey) {
        const error = new Error()
        error.name = "MissingAPIKey"
        error.message = "Price empire API key is not set in settings"
        throw error
    }
    const steamId = setting.steam_id
    if (!steamId) {
        const error = new Error()
        error.name = "MissingSteamID"
        error.message = "Steam ID is not set in settings"
        throw error
    }
    const apiURLBase = `https://api.pricempire.com/v3/inventory/${steamId}`
    const params = new URLSearchParams({
        api_key: apiKey,
    })
    const apiURL = `${apiURLBase}?${params.toString()}`
    let requestOptions = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    }
    const response = await fetch(apiURL, requestOptions)
    if (!response.ok) {
        const error = new Error()
        error.name = "PriceEmpireError"
        error.message = `Failed to fetch inventory from Price Empire: ${response.statusText}`
        throw error
    }
    return await response.json()
}

const randomBoolean = () => Math.random() < 0.5

export const formatItems = (items: PriceEmpireItem[], setting: Setting, isDemo?: boolean) => {
    return items.map((item: PriceEmpireItem) => {
        const selectedSource = setting.price_empire_source
        const price = selectedSource ? item.prices[selectedSource] : null
        return {
            user_id: setting.user_id,
            asset_id: item.assetId,
            name: item.name,
            type: item.type,
            float: item.float,
            is_active: isDemo ? randomBoolean() : false,
            price,
            prices: item.prices,
            stickers: item.stickers.map((sticker) => ({
                slot: sticker.slot,
                price: sticker.price,
                wear: sticker.wear,
                market_hash_name: sticker.marketHashName,
                image: sticker.image,
            })),
            inspect_link: item.inspectLink,
            exterior: item.exterior,
            rarity_color: item.rarityColor,
            updated_at: new Date().toISOString(),
            tradelock: item.tradelock,
            image: item.image,
            app_id: item.appId,
            quality: item.quality,
            family: item.family,
            category: item.category,
            market_hash_name: item.marketHashName,
            cheapest: item.cheapest,
            liquidity: item.liquidity,
            paint_seed: item.paintSeed,
            weapon_id: item.weaponId,
            pattern: item.pattern,
            d: item.d,
        }
    }) as Item[]
}

export const fetchPriceHistoryFromPriceEmpire = async (setting: Setting) => {
    const apiKey = setting.price_empire_key
    if (!apiKey) {
        const error = new Error()
        error.name = "MissingAPIKey"
        error.message = "Price empire API key is not set in settings"
        throw error
    }
    const source = setting.price_empire_source
    if (!source) {
        const error = new Error()
        error.name = "MissingSource"
        error.message = "Price empire source is not set in settings"
        throw error
    }
    const apiURLBase = "https://api.pricempire.com/v3/items/prices/history"
    const params = new URLSearchParams({
        api_key: apiKey,
        source,
    })
    const apiURL = `${apiURLBase}?${params.toString()}`
    let requestOptions = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    }
    const response = await fetch(apiURL, requestOptions)
    if (!response.ok) {
        const error = new Error()
        error.name = "PriceEmpireError"
        error.message = `Failed to fetch price history from Price Empire: ${response.statusText}`
        throw error
    }
    return await response.json()
}

export const priceEmpire = async () => {
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
                onConflict: "asset_id, user_id",
            })
            await supabase.from("Logs").insert({
                name: "Price Empire",
                message: "Successfully fetched inventory",
                type: "success",
                image: "https://www.shieldpeer.in/price-empires.svg",
            })
        } catch (error: any) {
            await supabase.from("Logs").insert({
                name: "Price Empire",
                message: "Failed to fetch inventory",
                type: "failure",
                image: "https://www.shieldpeer.in/price-empires.svg",
                metadata: {
                    error: error?.message ?? "Unknown error",
                },
            })
            console.error(`Error ${error?.name ?? "unknown"}: ${error?.message ?? "unknown"}`)
        }
        try {
            const priceHistory: PriceHistory = await fetchPriceHistoryFromPriceEmpire(setting)
            await supabase.from("PriceHistory").insert({
                price_history: priceHistory,
            })
            await supabase.from("Logs").insert({
                name: "Price Empire",
                message: "Successfully fetched price history",
                type: "success",
                image: "https://www.shieldpeer.in/price-empires.svg",
            })
        } catch (error: any) {
            await supabase.from("Logs").insert({
                name: "Price Empire",
                message: "Failed to fetch price history",
                type: "failure",
                image: "https://www.shieldpeer.in/price-empires.svg",
                metadata: {
                    error: error?.message ?? "Unknown error",
                },
            })
            console.error(`Error ${error?.name ?? "unknown"}: ${error?.message ?? "unknown"}`)
        }
    }
    console.info("Cron job finished.")
}

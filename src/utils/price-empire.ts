import { type SupabaseClient } from "@supabase/supabase-js"

import { Item, Setting } from "@/types/database"
import type { Inventory as PriceEmpireInventory, Item as PriceEmpireItem, PriceHistory } from "@/types/price-empire"

export const fetchInventoryFromPriceEmpire = async (setting: Setting) => {
    const apiKey = setting.price_empire_key
    if (!apiKey) {
        const error = new Error()
        error.name = "MissingAPIKey"
        error.message = "Missing PriceEmpire API Key in settings"
        throw error
    }
    const steamId = setting.steam_id
    if (!steamId) {
        const error = new Error()
        error.name = "MissingSteamID"
        error.message = "Missing Steam ID in settings"
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
        error.message = `Price Empire Response: ${response.statusText}`
        throw error
    }
    return await response.json()
}

export const formatItems = (items: PriceEmpireItem[], setting: Setting, isDemo?: boolean) => {
    const randomBoolean = () => Math.random() < 0.5
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
        error.message = "Missing PriceEmpire API Key in settings"
        throw error
    }
    const source = setting.price_empire_source
    if (!source) {
        const error = new Error()
        error.name = "MissingSource"
        error.message = "Missing PriceEmpire Source in settings"
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
        error.message = `Price Empire Response: ${response.statusText}`
        throw error
    }
    return await response.json()
}

export async function priceEmpire(supabase: SupabaseClient, setting: Setting) {
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
    } catch (err: any) {
        await supabase.from("Logs").insert({
            name: "Price Empire",
            user_id: setting.user_id,
            message: "Failed to fetch price history",
            type: "failure",
            image: "https://www.shieldpeer.in/price-empire.svg",
            meta_data: {
                error: err?.message ?? "Unknown error",
            },
        })
    }
}

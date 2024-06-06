import { Item, Setting } from "@/types/database"
import type { Item as PriceEmpireItem } from "@/types/price-empire"

export const fetchInventoryFromPriceEmpire = async (setting: Setting) => {
    const apiKey = setting.price_empire_key
    if (!apiKey) {
        const error = new Error()
        error.name = "MissingAPIKey"
        error.message = "Price Empire API key is not set"
        throw error
    }
    const steamId = setting.steam_id
    if (!steamId) {
        const error = new Error()
        error.name = "MissingSteamID"
        error.message = "Steam ID is not set"
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

export const formatItems = (items: PriceEmpireItem[]) => {
    return [{}] as Item[]
}

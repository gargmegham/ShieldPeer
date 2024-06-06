import { Setting } from "@/types/database"

export const fetchInventoryFromPriceEmpire = async (setting: Setting) => {
    const apiKey = setting.price_empire_key
    if (!apiKey) throw new Error("Price Empire API key is not set")
    const steamId = setting.steam_id
    if (!steamId) throw new Error("Steam ID is not set")
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
    return await response.json()
}

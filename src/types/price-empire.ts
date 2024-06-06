export interface Item {
    id: number
    tradelock: boolean
    name?: string
    image: string
    appId: number
    quality?: string
    family?: string
    category: string
    marketHashName: string
    price: number
    cheapest: number
    liquidity: string
    type?: string
    paintSeed?: number
    weaponId?: number
    float?: number
    assetId: string
    d?: string
    prices: {
        [key: string]: number
    }
    pattern?: string
    rarityColor: string
    exterior: string
    inspectLink: string
    stickers: {
        slot: number
        price: number
        wear: number
        marketHashName: string
        image: string
    }[]
}

export interface Inventory {
    user: {
        name: string
        image: string
        steam64Id: string
        created: string
        id: number
        country: string
    }
    items: Item[]
}

export interface PriceHistory {
    [key: string]: number[]
}

export interface ItemDetails {
    data: {
        id: number
        market_hash_name: string
        type: string
        item_type: string
        status: boolean
        created_at: string
        updated_at: string
        meta: {
            slug: string
            keywords: string
            like: number
            dislike: number
            image: string
            color: null
        }
        game: {
            app_id: number
            name: string
            short: string
            slug: null
            image: string
        }
        paint: {
            id: number
            paint_id: number
            weapon_id: number
            released: string
            image: string
            float_min: number
            float_max: number
            souvenir: boolean
            stattrak: boolean
            slug: string
            quality: {
                name: string
                key: string
            }
            family: {
                name: string
            }
            wears: {
                short: string
                name: string
                color: string
            }[]
            containers: [
                {
                    id: number
                    name: string
                    image: string
                    released: string
                    type: string
                    rare: string
                    rare_count: number
                    market_hash_name: string
                    price_from: number
                },
            ]
            collection: {
                key: string
                name: string
                released: string
            }
        }
        base: {
            weapon_id: number
            name: string
            slug: string
            description: string
            sticker_amount: number
        }
        connected_items: {
            market_hash_name: string
            image: string
            slug: null
            price_from: number
        }[]
        variants: []
        stats: {
            "7_day_low": number
            "7_day_high": number
            "30_day_low": number
            "30_day_high": number
            "52_week_low": number
            "52_week_high": number
            count: string
            marketcap: number
            "30d_prev_exists": string
            avg_price: null
            liquidity: string
            currently_listed: number
            steam_volume: number
            d7_trades: number
            marketcap7d: string
        }
    }[]
}

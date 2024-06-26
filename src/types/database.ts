export interface Setting {
    id: string
    created_at: string
    user_id: string
    price_empire_source?: string
    undercut_by_price?: number
    undercut_by_percentage?: number
    undercut_by?: "price" | "percentage"
    is_running?: boolean
    price_empire_key?: string
    waxpeer_key?: string
    steam_id?: string
    steam_key?: string
    steam_trade_url?: string
}

export interface PriceRange {
    id: string
    user_id: string
    source_price_min: number
    source_price_max: number
    listing_price_min: number
    listing_price_max: number
    listing_price_if_no_one_to_undercut: number
    when_no_one_to_undercut_list_at: "listing_price_max" | "listing_price_if_no_one_to_undercut"
    always_undercut_by_percentage_if_listing_price_is_greater_than: number
}

export interface Item {
    id: string
    user_id: string
    asset_id: string
    name?: string
    type?: string
    price: number
    created_at: string
    is_active: boolean
    updated_at: string
    tradelock: boolean
    image: string
    float?: number
    app_id: number
    quality?: string
    family?: string
    category: string
    market_hash_name: string
    cheapest: number
    liquidity: string
    paint_seed?: number
    weapon_id?: number
    d?: string
    prices: {
        [key: string]: number
    }
    pattern?: string
    rarity_color: string
    exterior: string
    inspect_link: string
    stickers: {
        slot: number
        price: number
        wear: number
        market_hash_name: string
        image: string
    }[]
}

export interface ItemSetting {
    id: string
    user_id: string
    created_at: string
    undercut_by_price?: number
    undercut_by_percentage?: number
    undercut_by?: "price" | "percentage"
    listing_price_min?: number
    listing_price_max?: number
    listing_price_if_no_one_to_undercut?: number
    when_no_one_to_undercut_list_at?: "listing_price_max" | "listing_price_if_no_one_to_undercut"
    always_undercut_by_percentage_if_listing_price_is_greater_than?: number
    is_active: boolean
    item_id: Item["id"]
}

export interface Listing {
    id: string
    user_id: string
    item_id: Item["id"]
    price: number
    created_at: string
    updated_at: string
    item: Item
}

export interface Log {
    id: string
    user_id: string
    created_at: string
    type: "success" | "failure" | "caution"
    message: string
    name: Item["name"]
    image: Item["image"]
    meta_data?: {
        listing_id?: Listing["id"]
        error?: string
    }
}

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

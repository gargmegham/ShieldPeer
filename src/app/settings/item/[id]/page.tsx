"use client"

import { useParams } from "next/navigation"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import ItemActiveToggle from "@/components/ItemActiveToggle"
import ItemDelete from "@/components/ItemDelete"
import ItemPriceHistory from "@/components/ItemPriceHistory"
import ItemSettingsForm from "@/components/ItemSettingsForm"

import type { Item, ItemSetting } from "@/types/database"

export default function ItemSettings() {
    const { id } = useParams()
    const [itemSetting, setItemSetting] = useState<ItemSetting>({} as ItemSetting)
    const [loading, setLoading] = useState(true)
    const [itemPriceHistory, setItemPriceHistory] = useState<number[]>([])
    const demoPriceHistory = [
        11, 22, 33, 44, 55, 66, 77, 76, 74, 72, 71, 76, 74, 72, 71, 88, 99, 110, 121, 132, 143, 154, 165, 176, 187, 198,
        209, 220, 231, 242,
    ]
    const [item, setItem] = useState({} as Item)
    const fetchSettings = async () => {
        fetch(`/api/settings/item/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setItemSetting(data)
            })
            .catch(() => {
                toast.error("Failed to fetch item settings")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const fetchItem = async () => {
        fetch(`/api/item/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setItem(data)
            })
            .catch(() => {
                toast.error("Failed to fetch item")
            })
    }
    const fetchPriceHistory = async () => {
        fetch(`/api/item/price-history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                market_hash_name: item.market_hash_name,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setItemPriceHistory(data)
            })
            .catch(() => {
                toast.error("Failed to fetch price history")
            })
    }
    useEffect(() => {
        fetchItem()
        fetchSettings()
        fetchPriceHistory()
    }, [])
    return loading ? (
        <Loader />
    ) : (
        <main className="py-[16vh] relative px-8 md:px-20 space-y-4" id="item-settings">
            <Navbar
                items={[
                    { label: "Inventory", link: "/inventory", icon: MdOutlineInventory },
                    { label: "Logs", link: "/logs", icon: MdOutlineDocumentScanner },
                    {
                        label: "Settings",
                        link: "/settings",
                        icon: IoSettingsOutline,
                        inFocus: true,
                    },
                ]}
                logoLink="/"
            />
            <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
                <ItemActiveToggle isDemo={false} fetchItem={fetchItem} id={id.toString()} item={item} />
                <ItemPriceHistory
                    itemPriceHistory={itemPriceHistory.length === 0 ? demoPriceHistory : itemPriceHistory}
                />
            </div>
            <ItemSettingsForm itemSetting={itemSetting} />
            <ItemDelete id={id.toString()} item={item} />
        </main>
    )
}

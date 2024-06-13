"use client"

import Link from "next/link"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { BiSync } from "react-icons/bi"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import ItemCard from "@/components/Item"

import { formatItems } from "@/utils/price-empire"

import type { Setting } from "@/types/database"
import type { Inventory, Item as PriceEmpireInventoryItem } from "@/types/price-empire"

export default function Inventory() {
    const [demoInventory, setDemoInventory] = useState<PriceEmpireInventoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [setting, setSetting] = useState<Setting>({} as Setting)
    const [user, setUser] = useState<Inventory["user"]>({} as Inventory["user"])
    const [saving, setSaving] = useState(false)
    const activateItems = async () => {
        setSaving(true)
        try {
            setTimeout(() => {}, 250)
            toast.success("Items activated successfully")
        } catch (error: any) {
            toast.error("Failed to activate items")
        } finally {
            setSaving(false)
        }
    }
    useEffect(() => {
        fetch("/demo/inventory.json")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setDemoInventory(data)
            })
            .catch(() => {
                toast.error("Failed to fetch demo inventory")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return loading ? (
        <Loader />
    ) : (
        <main className="py-[16vh] relative flex justify-center px-8 md:px-20" id="demo-inventory">
            <Navbar
                items={[
                    { label: "Inventory", link: "/demo/inventory", icon: MdOutlineInventory, inFocus: true },
                    {
                        label: "Logs",
                        link: "/demo/logs",
                        icon: MdOutlineDocumentScanner,
                    },
                    {
                        label: "Settings",
                        link: "/demo/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/demo"
            />
            <Link
                className="fixed bottom-10 right-10 z-20"
                target="_blank"
                href={`https://steamcommunity.com/profiles/${setting.steam_id}/?utm_source=ShieldPeer`}
            >
                <Avatar className="size-16 border border-rose-100/30 shadow shadow-primary">
                    <AvatarImage src={`https://avatars.akamai.steamstatic.com/${user?.image}_full.jpg`} />
                    <AvatarFallback className="text-amber-300">{user?.name ? user?.name[0] : "N/A"}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="space-y-4">
                <div className="flex justify-end">
                    <Button onClick={activateItems} disabled={saving}>
                        {saving && <BiSync className="animate-spin size-4 mr-2" />}
                        Activate All
                    </Button>
                </div>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {formatItems(
                        demoInventory,
                        {
                            price_empire_source: "buff",
                            user_id: "demo_63728uhkjhgT^R%^RTD",
                        } as Setting,
                        true
                    )
                        .sort((a, b) => (a.price > b.price ? -1 : 1))
                        .map((item) => (
                            <ItemCard item={item} key={item.id} setting={setting} />
                        ))}
                </div>
            </div>
        </main>
    )
}

"use client"

import Link from "next/link"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { BiSync } from "react-icons/bi"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import ItemCard from "@/components/Item"

import { cn } from "@/utils/cn"
import { formatItems } from "@/utils/price-empire"

import type { Item, Setting } from "@/types/database"
import type { Inventory, Item as PriceEmpireInventoryItem } from "@/types/price-empire"

export default function Inventory() {
    const [inventory, setInventory] = useState<Item[]>([])
    const [demoInventory, setDemoInventory] = useState<PriceEmpireInventoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showDemoInventory, setShowDemoInventory] = useState(false)
    const [setting, setSetting] = useState<Setting>({} as Setting)
    const [user, setUser] = useState<Inventory["user"]>({} as Inventory["user"])
    const [saving, setSaving] = useState(false)
    const fetchInventory = async () => {
        try {
            const res = await fetch("/api/inventory")
            const data = await res.json()
            if (!data) return
            setInventory(data)
        } catch (error: any) {
            toast.error("Failed to fetch inventory")
        }
    }
    const activateItems = async () => {
        setSaving(true)
        try {
            await fetch(`/api/item`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            fetchInventory()
            toast.success("Items activated successfully")
        } catch (error: any) {
            toast.error("Failed to activate items")
        } finally {
            setSaving(false)
        }
    }
    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setSetting(data)
            })
            .catch(() => {
                toast.error("Failed to fetch settings")
            })
    }, [])
    useEffect(() => {
        fetch("/api/steam")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setUser(data)
            })
            .catch(() => {
                toast.error("Failed to fetch settings")
            })
    }, [])
    useEffect(() => {
        fetchInventory()
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
        <main
            className={cn(
                inventory.length === 0 && !showDemoInventory && "flex justify-center items-center",
                inventory.length === 0 && showDemoInventory && "py-[16vh] relative flex justify-center px-8 md:px-20",
                inventory.length > 0 && "py-[16vh] relative flex justify-center px-8 md:px-20"
            )}
            id="inventory"
        >
            <Navbar
                items={[
                    { label: "Inventory", link: "/inventory", icon: MdOutlineInventory, inFocus: true },
                    {
                        label: "Logs",
                        link: "/logs",
                        icon: MdOutlineDocumentScanner,
                    },
                    {
                        label: "Settings",
                        link: "/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/"
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
            {inventory.length === 0 && !showDemoInventory && (
                <Card className="w-[350px]">
                    <CardContent className="pt-6 space-y-4">
                        <div>No items in your inventory. Would you like to see some demo items instead?</div>
                        <div className="flex items-center justify-end">
                            <Button onClick={() => setShowDemoInventory(true)}>Yes</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            <div className={cn(inventory.length === 0 && !showDemoInventory && "hidden", "space-y-4")}>
                {(inventory.length > 0 || showDemoInventory) && (
                    <div className="flex justify-end">
                        <Button onClick={activateItems} disabled={saving}>
                            {saving && <BiSync className="animate-spin size-4 mr-2" />}
                            Activate All
                        </Button>
                    </div>
                )}
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {(inventory.length === 0 && showDemoInventory
                        ? formatItems(
                              demoInventory,
                              {
                                  price_empire_source: "buff",
                                  user_id: "demo_63728uhkjhgT^R%^RTD",
                              } as Setting,
                              true
                          )
                        : inventory
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

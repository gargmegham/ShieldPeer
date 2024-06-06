"use client"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import { cn } from "@/utils/cn"
import { formatItems } from "@/utils/price-empire"

import type { Item, Setting } from "@/types/database"
import type { Item as PriceEmpireInventoryItem } from "@/types/price-empire"

export default function Inventory() {
    const [inventory, setInventory] = useState<Item[]>([])
    const [demoInventory, setDemoInventory] = useState<PriceEmpireInventoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [showDemoInventory, setShowDemoInventory] = useState(false)

    useEffect(() => {
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setInventory(data)
            })
            .catch(() => {
                toast.error("Failed to fetch inventory")
            })
            .finally(() => {
                setLoading(false)
            })
        fetch("/demo/inventory.json")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setDemoInventory(data)
            })
            .catch(() => {
                toast.error("Failed to fetch demo inventory")
            })
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <main
            className={cn(
                inventory.length === 0 && !showDemoInventory && "flex justify-center items-center",
                inventory.length === 0 && showDemoInventory && "py-[16vh] relative flex justify-center px-8 md:px-20"
            )}
            id="dashboard"
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
            {inventory.length === 0 && showDemoInventory && (
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {formatItems(demoInventory, {
                        price_empire_source: "buff",
                        user_id: "demo_63728uhkjhgT^R%^RTD",
                    } as Setting).map((item) => (
                        <Card key={item.asset_id} className="">
                            <CardHeader>
                                <CardTitle>{item?.name ?? item.market_hash_name}</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent></CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    )
}

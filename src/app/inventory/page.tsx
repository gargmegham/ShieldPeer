"use client"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import InventoryTable from "@/components/InventoryTable"

import { cn } from "@/utils/cn"

import type { Item } from "@/types/database"

export default function Inventory() {
    const [inventory, setInventory] = useState<Item[]>([])
    const [demoInventory, setDemoInventory] = useState<Item[]>([])
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
            {inventory.length === 0 && showDemoInventory && <InventoryTable items={demoInventory} />}
        </main>
    )
}

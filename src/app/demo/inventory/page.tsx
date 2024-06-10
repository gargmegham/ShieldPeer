"use client"

import Image from "next/image"
import Link from "next/link"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { BiSync } from "react-icons/bi"
import { CgMediaLive } from "react-icons/cg"
import { FaRegPauseCircle } from "react-icons/fa"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory, MdSettings } from "react-icons/md"
import { SiGunicorn } from "react-icons/si"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import config from "@/utils/config"
import { formatItems } from "@/utils/price-empire"
import { getSEOTags } from "@/utils/seo"

import type { Setting } from "@/types/database"
import type { Inventory, Item as PriceEmpireInventoryItem } from "@/types/price-empire"

export const metadata = getSEOTags({
    title: `${config.appName} - Inventory`,
    description: "Here you can see steam inventory along with their prices.",
    keywords: "inventory, items, prices",
})

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
                            <Card key={item.asset_id} className="relative py-6 max-h-[450px]">
                                <div className="px-6 flex items-center text-xs justify-between">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {item.is_active ? (
                                                    <div className="flex items-center gap-2">
                                                        <CgMediaLive className="text-green-300 animate-pulse" />
                                                        Active
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <FaRegPauseCircle className="text-red-500" />
                                                        Inactive
                                                    </div>
                                                )}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {item.is_active
                                                        ? "Item is currently maintained by the bot"
                                                        : "Item will not be listed by the bot"}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="rounded-full border border-yellow-600/30 p-1">
                                                    <SiGunicorn color={item.rarity_color} className="size-4" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Rarity Color</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardContent className="pt-2 pb-4">
                                    <div className="flex justify-center items-center">
                                        <Image
                                            src={`https://community.cloudflare.steamstatic.com/economy/image/${item.image}`}
                                            alt={item.name ?? item.market_hash_name}
                                            className="bg-neutral-800 rounded-lg p-2"
                                            loading="lazy"
                                            width={245}
                                            height={185}
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader className="relative py-0">
                                    <CardTitle className="truncate pr-4 text-sm text-neutral-300">
                                        {item?.name ?? item.market_hash_name}
                                    </CardTitle>
                                    <CardDescription>{item?.exterior ?? "N/A"}</CardDescription>
                                </CardHeader>
                                <div className="px-6 mt-2 space-y-1">
                                    <div className="flex gap-2">
                                        <div className="text-neutral-500 underline decoration-wavy">
                                            {setting.price_empire_source
                                                ? setting.price_empire_source[0].toLocaleUpperCase()
                                                : "B"}
                                            {setting.price_empire_source?.slice(1) ?? "uff"}
                                        </div>
                                        <div className="font-extrabold text-neutral-200 font-bricolage">
                                            {/* prices are in cents */}
                                            {item.price
                                                ? (item.price / 100).toLocaleString("en-US", {
                                                      style: "currency",
                                                      currency: "USD",
                                                  })
                                                : "N/A"}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                        <div className="text-neutral-500">Float</div>
                                        <div className="font-extrabold text-neutral-200">
                                            {item?.float?.toFixed(5) ?? "N/A"}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 mt-4 w-full">
                                    <Link
                                        className="w-full gap-2 relative flex items-center justify-center py-2 bg-zinc-900 rounded-xl border"
                                        href={`/demo/settings/item/${item.id ?? item.asset_id}`}
                                    >
                                        <MdSettings className="size-4 text-amber-500/90" />
                                        Details
                                        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                                    </Link>
                                </div>
                            </Card>
                        ))}
                </div>
            </div>
        </main>
    )
}

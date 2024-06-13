"use client"

import Image from "next/image"

import React, { useState } from "react"

import toast from "react-hot-toast"
import { BiSync } from "react-icons/bi"
import { CgMediaLive } from "react-icons/cg"
import { FaRegPauseCircle } from "react-icons/fa"
import { SiGunicorn } from "react-icons/si"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { Item } from "@/types/database"

export default function ItemActiveToggle({
    id,
    item,
    fetchItem,
    isDemo,
}: {
    id: string
    item: Item
    fetchItem: () => void
    isDemo?: boolean
}) {
    const [saving, setSaving] = useState(false)
    const toggleActiveStatus = async () => {
        setSaving(true)
        try {
            await fetch(`/api/item/${id}`, {
                method: "PUT",
                body: JSON.stringify({ is_active: !item.is_active }),
            })
            toast.success("Item status updated")
            fetchItem()
        } catch (error: any) {
            toast.error("Failed to update item status")
        } finally {
            setSaving(false)
        }
    }
    return (
        <Card className="relative py-6 max-h-[450px]">
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
                                <SiGunicorn color={isDemo ? "#ff0000" : item.rarity_color} className="size-4" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Rarity Color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <CardContent className="pt-2 pb-4">
                <div className="flex justify-center items-center bg-neutral-800 rounded-lg ">
                    <Image
                        src={`https://community.cloudflare.steamstatic.com/economy/image/${item.image ?? "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G9SupUijOjAotyg3w2x_0ZkZ2rzd4OXdgRoYQuE8gDtyL_mg5K4tJ7XiSw0WqKv8kM"}`}
                        alt={isDemo ? "AWP | Neo-Noir (Field-Tested)" : item.name ?? item.market_hash_name ?? "N/A"}
                        className="p-2"
                        loading="lazy"
                        width={245}
                        height={185}
                    />
                </div>
            </CardContent>
            <CardHeader className="relative py-0">
                <CardTitle className="truncate pr-4 text-sm text-neutral-300">
                    {!isDemo ? item?.name ?? item.market_hash_name ?? "N/A" : "AWP | Neo-Noir (Field-Tested)"}
                </CardTitle>
                <CardDescription>{item?.exterior ?? "Field-Tested"}</CardDescription>
            </CardHeader>
            <div className="px-6 mt-2 space-y-1">
                <div className="font-extrabold text-neutral-200 font-bricolage">
                    {!isDemo
                        ? item.price
                            ? item.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                              })
                            : "N/A"
                        : "$9,000"}
                </div>
                <div className="flex gap-2 text-sm">
                    <div className="text-neutral-500">Float</div>
                    <div className="font-extrabold text-neutral-200">
                        {!isDemo ? item?.float?.toFixed(5) ?? "N/A" : "0.5976"}
                    </div>
                </div>
            </div>
            <div className="px-6 mt-4 w-full">
                <Button
                    disabled={saving || isDemo}
                    onClick={toggleActiveStatus}
                    className="w-full gap-2 relative flex items-center justify-center py-2 bg-zinc-900 rounded-xl border"
                    variant="outline"
                >
                    Toggle Active Status
                    {saving && <BiSync className="animate-spin size-4" />}
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                </Button>
            </div>
        </Card>
    )
}

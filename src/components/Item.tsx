"use client"

import Image from "next/image"
import Link from "next/link"

import { CgMediaLive } from "react-icons/cg"
import { FaRegPauseCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"
import { SiGunicorn } from "react-icons/si"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { Item, Setting } from "@/types/database"

export default function Item({ item, setting }: { item: Item; setting: Setting }) {
    return (
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
                        {setting.price_empire_source ? setting.price_empire_source[0].toLocaleUpperCase() : "B"}
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
                    <div className="font-extrabold text-neutral-200">{item?.float?.toFixed(5) ?? "N/A"}</div>
                </div>
            </div>
            <div className="px-6 mt-4 w-full">
                <Link
                    className="w-full gap-2 relative flex items-center justify-center py-2 bg-zinc-900 rounded-xl border"
                    href={`/settings/item/${item.id ?? item.asset_id}`}
                >
                    <MdSettings className="size-4 text-amber-500/90" />
                    Details
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                </Link>
            </div>
        </Card>
    )
}

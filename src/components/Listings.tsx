"use client"

import Image from "next/image"
import Link from "next/link"

import React, { useState } from "react"

import { TrashIcon } from "@radix-ui/react-icons"
import toast from "react-hot-toast"
import { BiSync } from "react-icons/bi"
import { CgMediaLive } from "react-icons/cg"
import { FaRegPauseCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"
import { SiGunicorn } from "react-icons/si"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { Listing, Setting } from "@/types/database"

import { Button } from "./ui/button"

const Listings = ({
    listings,
    setting,
    refreshListings,
}: {
    setting: Setting
    listings: Listing[]
    refreshListings: () => void
}) => {
    const [deleting, setDeleting] = useState(false)
    const removeListing = async (id: string) => {
        try {
            setDeleting(true)
            await fetch(`/api/listings/${id}`, {
                method: "DELETE",
            })
            refreshListings()
        } catch (err: any) {
            toast.error(err?.message ?? "Failed to delete item")
        } finally {
            setDeleting(false)
        }
    }
    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 rounded-3xl">
            {listings
                .sort((a, b) => (a.price > b.price ? -1 : 1))
                .map((listing) => (
                    <Card key={listing.item.asset_id} className="relative py-6 max-h-[510px]">
                        <div className="px-6 flex items-center text-xs justify-between">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {listing.item.is_active ? (
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
                                            {listing.item.is_active
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
                                            <SiGunicorn color={listing.item.rarity_color} className="size-4" />
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
                                    src={`https://community.cloudflare.steamstatic.com/economy/image/${listing.item.image}`}
                                    alt={listing.item.name ?? listing.item.market_hash_name}
                                    className="bg-neutral-800 rounded-lg p-2"
                                    loading="lazy"
                                    width={245}
                                    height={185}
                                />
                            </div>
                        </CardContent>
                        <CardHeader className="relative py-0">
                            <CardTitle className="truncate pr-4 text-sm text-neutral-300">
                                {listing.item?.name ?? listing.item.market_hash_name}
                            </CardTitle>
                            <CardDescription>{listing.item?.exterior ?? "N/A"}</CardDescription>
                        </CardHeader>
                        <div className="px-6 mt-2 space-y-2">
                            <div className="flex gap-2">
                                <div className="text-neutral-400 underline decoration-wavy">Listed At</div>
                                <div className="font-extrabold text-lime-300 font-bricolage">
                                    {/* prices are to be divided by 1000 for waxpeer */}
                                    {listing.price
                                        ? (listing.price / 1000).toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                          })
                                        : "N/A"}
                                </div>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <div className="text-neutral-500">
                                    {setting.price_empire_source
                                        ? setting.price_empire_source[0].toLocaleUpperCase()
                                        : "B"}
                                    {setting.price_empire_source?.slice(1) ?? "uff"}
                                </div>
                                <div className="font-extrabold text-neutral-200 font-bricolage">
                                    {/* prices are in cents */}
                                    {listing.item.price
                                        ? (listing.item.price / 100).toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                          })
                                        : "N/A"}
                                </div>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <div className="text-neutral-500">Float</div>
                                <div className="font-extrabold text-neutral-200">
                                    {listing.item?.float?.toFixed(5) ?? "N/A"}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 mt-4 w-full">
                            <Link
                                className="w-full gap-2 relative flex items-center justify-center py-2 bg-zinc-900 rounded-xl border"
                                href={`/settings/item/${listing.item_id ?? listing.item.asset_id}`}
                            >
                                <MdSettings className="size-4 text-amber-500/90" />
                                Details
                                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                            </Link>
                        </div>
                        <div className="px-6 mt-4 w-full relative">
                            <Button
                                variant={"destructive"}
                                className="w-full bg-neutral-900 flex items-center gap-x-2"
                                onClick={() => removeListing(listing.item.asset_id)}
                            >
                                {deleting ? (
                                    <BiSync className="animate-spin size-4 text-rose-500/90" />
                                ) : (
                                    <TrashIcon className="size-4 text-rose-500/90" />
                                )}
                                Remove
                                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px" />
                            </Button>
                        </div>
                    </Card>
                ))}
        </div>
    )
}

export default Listings

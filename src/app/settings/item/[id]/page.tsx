"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AiOutlineEdit } from "react-icons/ai"
import { CgMediaLive } from "react-icons/cg"
import { FaRegPauseCircle } from "react-icons/fa"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"
import { SiGunicorn } from "react-icons/si"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LineGraph from "@/components/ui/line-graph"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { Item, ItemSetting } from "@/types/database"

const FormSchema = z.object({
    undercut_by_price: z.number(),
    undercut_by_percentage: z.number(),
    undercut_by: z.string(),
    listing_price_min: z.number(),
    listing_price_max: z.number(),
    listing_price_if_no_one_to_undercut: z.number(),
    when_no_one_to_undercut_list_at: z.string(),
    always_undercut_by_percentage_if_listing_price_is_greater_than: z.number(),
    is_active: z.boolean(),
})

export default function ItemSettings() {
    const { id } = useParams()
    const router = useRouter()
    const [itemSetting, setItemSetting] = useState<ItemSetting>({} as ItemSetting)
    const [loading, setLoading] = useState(true)
    const [itemPriceHistory, setItemPriceHistory] = useState<number[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const demoPriceHistory = [
        11, 22, 33, 44, 55, 66, 77, 76, 74, 72, 71, 76, 74, 72, 71, 88, 99, 110, 121, 132, 143, 154, 165, 176, 187, 198,
        209, 220, 231, 242,
    ]
    const [deleteConfirmation, setDeleteConfirmation] = useState("")
    const [saving, setSaving] = useState(false)
    const [item, setItem] = useState({} as Item)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        disabled: !isEditing,
        defaultValues: {
            undercut_by_price: 0.1,
            undercut_by_percentage: 1,
            undercut_by: "price",
            listing_price_min: 120,
            listing_price_max: 130,
            listing_price_if_no_one_to_undercut: 150,
            when_no_one_to_undercut_list_at: "listing_price_max",
            always_undercut_by_percentage_if_listing_price_is_greater_than: 180,
            is_active: false,
        },
    })
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
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.listing_price_min >= data.listing_price_max) {
            toast.error("Listing price min must be less than listing price max")
            return
        }
        setSaving(true)
        try {
            await fetch(`/api/settings/item/${id}`, {
                method: "POST",
                body: JSON.stringify(data),
            })
            toast.success("Item settings saved")
        } catch (error: any) {
            toast.error("Failed to set item settings")
        } finally {
            setSaving(false)
            setIsEditing(false)
        }
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
    const deleteItem = async () => {
        try {
            await fetch(`/api/item/${id}`, {
                method: "DELETE",
            })
            toast.success("Item deleted")
            router.push("/inventory")
        } catch (error: any) {
            toast.error("Failed to delete item")
        }
    }
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
    useEffect(() => {
        form.reset(itemSetting)
    }, [itemSetting])
    return loading ? (
        <Loader />
    ) : (
        <main className="py-[16vh] relative px-8 md:px-20 space-y-4" id="dashboard">
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
                        <div className="flex justify-center items-center bg-neutral-800 rounded-lg ">
                            <Image
                                src={`https://community.cloudflare.steamstatic.com/economy/image/${item.image ?? "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G9SupUijOjAotyg3w2x_0ZkZ2rzd4OXdgRoYQuE8gDtyL_mg5K4tJ7XiSw0WqKv8kM"}`}
                                alt="Waxpeer"
                                className="p-2"
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
                        <div className="font-extrabold text-neutral-200 font-bricolage">
                            {item.price
                                ? item.price.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                  })
                                : "N/A"}
                        </div>
                        <div className="flex gap-2 text-sm">
                            <div className="text-neutral-500">Float</div>
                            <div className="font-extrabold text-neutral-200">{item?.float?.toFixed(5) ?? "N/A"}</div>
                        </div>
                    </div>
                    <div className="px-6 mt-4 w-full">
                        <Button
                            onClick={toggleActiveStatus}
                            className="w-full gap-2 relative flex items-center justify-center py-2 bg-zinc-900 rounded-xl border"
                            variant="outline"
                        >
                            Toggle Active Status
                            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                        </Button>
                    </div>
                </Card>
                <Card className="relative py-6 h-[450px] w-full col-span-1 md:col-span-3">
                    <CardHeader className="pb-0">
                        <CardTitle>Price History</CardTitle>
                        <CardDescription>
                            This graph shows the price history of the item. You can see the price changes over time.
                        </CardDescription>
                        {itemPriceHistory.length === 0 && (
                            <div className="text-amber-400/80 text-xs mt-4">
                                These are demo prices as the item does not have any price history.
                            </div>
                        )}
                    </CardHeader>
                    <LineGraph
                        curve="monotoneX"
                        height="290px"
                        enableSlices="x"
                        data={[
                            {
                                id: "Price",
                                data:
                                    itemPriceHistory.length === 0
                                        ? demoPriceHistory.map((price, index) => ({ x: index, y: price }))
                                        : itemPriceHistory.map((price, index) => ({ x: index, y: price })),
                            },
                        ]}
                        enableArea
                    />
                </Card>
            </div>
            <Card className="relative">
                <Button
                    disabled={isEditing}
                    size={"xs"}
                    className="absolute top-4 right-4"
                    onClick={() => setIsEditing((prev) => !prev)}
                >
                    <AiOutlineEdit className="size-4" />
                </Button>
                <CardHeader>
                    <CardTitle>Item Settings</CardTitle>
                    <CardDescription>
                        Set your listing parameters here. These parameters will be used to list the items on the
                        marketplace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="undercut_by"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Undercut By</FormLabel>
                                            <FormDescription>
                                                Select how you want to undercut other sellers.
                                            </FormDescription>
                                            <Select {...field} defaultValue="price" onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a source" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="price">Price</SelectItem>
                                                        <SelectItem value="percentage">Percentage</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="undercut_by_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Undercut By Price</FormLabel>
                                            <FormDescription>
                                                By how much you want to undercut other sellers.
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="0.01"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={(e) => {
                                                        form.setValue("undercut_by_price", Number(e.target.value))
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="undercut_by_percentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Undercut By Percentage</FormLabel>
                                            <FormDescription>
                                                By how much you want to undercut other sellers.
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="1"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={(e) => {
                                                        form.setValue("undercut_by_percentage", Number(e.target.value))
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="listing_price_min"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>1. Listing Price Min Percentage</FormLabel>
                                            <FormDescription>
                                                Minimum price you want to list the item for.
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    placeholder="110%"
                                                    {...field}
                                                    onChange={(e) => {
                                                        form.setValue("listing_price_min", Number(e.target.value))
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="listing_price_max"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>2. Listing Price Max Percentage</FormLabel>
                                            <FormDescription>
                                                Maximum price you want to list the item for.
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    placeholder="130%"
                                                    {...field}
                                                    onChange={(e) => {
                                                        form.setValue("listing_price_max", Number(e.target.value))
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="when_no_one_to_undercut_list_at"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>3. When No One To Undercut List At</FormLabel>
                                            <FormDescription>
                                                If no one is there to undercut, should we list at max price or at a
                                                specific percentage specified at (4) below.
                                            </FormDescription>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={(value) => {
                                                        form.setValue("when_no_one_to_undercut_list_at", value)
                                                    }}
                                                >
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="listing_price_max">
                                                                Listing Price Max
                                                            </SelectItem>
                                                            <SelectItem value="listing_price_if_no_one_to_undercut">
                                                                Listing Price If No One To Undercut
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="listing_price_if_no_one_to_undercut"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>4. List at this percentage if no one to undercut</FormLabel>
                                            <FormDescription>
                                                If no one is there to undercut, and you have selected to list at a
                                                specific percentage, then we will list at this price.
                                            </FormDescription>
                                            <FormControl>
                                                <Input
                                                    placeholder="130%"
                                                    {...field}
                                                    onChange={(e) => {
                                                        form.setValue(
                                                            "listing_price_if_no_one_to_undercut",
                                                            Number(e.target.value)
                                                        )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="always_undercut_by_percentage_if_listing_price_is_greater_than"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            5. Always undercut by percentage if listing price is greater than
                                        </FormLabel>
                                        <FormDescription>
                                            If listing price is greater than this value, we will always undercut by the
                                            percentage specified below. Even if you have selected to undercut by price
                                            in general settings.
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="130%"
                                                {...field}
                                                onChange={(e) => {
                                                    form.setValue(
                                                        "always_undercut_by_percentage_if_listing_price_is_greater_than",
                                                        Number(e.target.value)
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_active"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-4">
                                        <div>
                                            <FormLabel>Enable/Disable Settings</FormLabel>
                                            <FormDescription>
                                                If Enabled these settings will be used instead of the global settings.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                disabled={saving || !isEditing}
                                                checked={field.value}
                                                onCheckedChange={(e) => {
                                                    field.onChange(e)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={saving || !isEditing}>
                                Save
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Danzer Zone</CardTitle>
                    <CardDescription>
                        This is a zone where you can delete the item. This action cannot be undone.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="text-sm">Enter the item name to confirm deletion</div>
                    <Input
                        placeholder={item?.name ?? item.market_hash_name}
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            if (deleteConfirmation === item?.name ?? item.market_hash_name) deleteItem()
                            else toast.error("Item name does not match!")
                        }}
                        className="w-full !mt-4"
                        variant="destructive"
                    >
                        Delete
                    </Button>
                </CardContent>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px" />
            </Card>
        </main>
    )
}

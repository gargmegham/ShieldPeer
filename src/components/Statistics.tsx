"use client"

import Link from "next/link"

import { useEffect, useState } from "react"

import { ResponsiveCalendar } from "@nivo/calendar"
import { Pie } from "@nivo/pie"
import toast from "react-hot-toast"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { dummyBotStreak, dummyGameWiseInventoryValue } from "@/constants/dummy"
import { apps } from "@/constants/steam"

import { formatItems } from "@/utils/price-empire"

import type { Item, Setting } from "@/types/database"
import { Inventory } from "@/types/price-empire"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const crunchGameWiseInventoryValue = (inventory: Item[]) => {
    const results: {
        [key: string]: number
    } = {}
    inventory.forEach((item) => {
        if (!item.app_id) return
        if (!results[item.app_id.toString()]) results[item.app_id.toString()] = 0
        results[item.app_id.toString()] += item.price ?? 0
    })
    return Object.entries(apps).map(([app_id, app]) => {
        return {
            id: app.name,
            label: app.name,
            color: app.color,
            value: results[app_id] ?? 0,
        }
    })
}

export default function Statistics({
    showDemo,
    user,
    setting,
}: {
    showDemo?: boolean
    setting?: Setting
    user?: Inventory["user"]
}) {
    const [inventory, setInventory] = useState<Item[]>([])
    const [demoInventory, setDemoInventory] = useState<Item[]>([])
    // fetch inventory
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
            .finally(() => {})
        fetch("/demo/inventory.json")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                const formattedItems = formatItems(
                    data,
                    {
                        price_empire_source: "buff",
                        user_id: "demo_63728uhkjhgT^R%^RTD",
                    } as Setting,
                    true
                )
                setDemoInventory(formattedItems)
            })
            .catch(() => {
                toast.error("Failed to fetch demo inventory")
            })
    }, [])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                    {showDemo
                        ? "This is a demo dashboard. You don't have any data yet."
                        : "These are your statistics based on steam inventory, and bot efficiency."}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                <div className="bg-neutral-900 rounded-lg h-96 p-4 col-span-1 lg:col-span-2">
                    <div className="space-y-4 relative">
                        <Link
                            className="absolute top-0 right-0 z-20"
                            target="_blank"
                            href={`https://steamcommunity.com/profiles/${setting?.steam_id}/?utm_source=ShieldPeer`}
                        >
                            <Avatar className="size-16 border border-rose-100/30 shadow shadow-primary">
                                <AvatarImage src={`https://avatars.akamai.steamstatic.com/${user?.image}_full.jpg`} />
                                <AvatarFallback className="text-amber-300">
                                    {user?.name ? user?.name[0] : "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex gap-2">
                            <div className="text-neutral-400">Total Items:</div>
                            <div className="font-extrabold text-neutral-200 font-bricolage">
                                {showDemo ? demoInventory.length : inventory.length}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-neutral-400">Total Value:</div>
                            <div className="font-extrabold text-neutral-200 font-bricolage">
                                {showDemo
                                    ? demoInventory
                                          .reduce((acc, item) => acc + (item.price ?? 0), 0)
                                          .toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                          })
                                    : inventory
                                          .reduce((acc, item) => acc + (item.price ?? 0), 0)
                                          .toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                          })}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-neutral-400">Actively Listed:</div>
                            <div className="font-extrabold text-neutral-200 font-bricolage">
                                {showDemo
                                    ? demoInventory.filter((item) => item.is_active).length
                                    : inventory.filter((item) => item.is_active).length}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-neutral-400">Last Updated:</div>
                            <div className="font-extrabold text-neutral-200 font-bricolage">
                                {showDemo
                                    ? new Date(demoInventory[0]?.updated_at).toLocaleDateString()
                                    : new Date(inventory[0]?.updated_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <ResponsiveCalendar
                        data={dummyBotStreak}
                        from="2024-02-01"
                        to="2024-07-12"
                        emptyColor="#1a1919"
                        colors={["#FFC53D", "#3E9B4F", "#E5484D"]}
                        minValue={0}
                        yearSpacing={45}
                        margin={{
                            left: 20,
                            bottom: 120,
                        }}
                        yearLegendOffset={11}
                        theme={{
                            text: {
                                fill: "rgb(200, 200, 200)",
                            },
                        }}
                        monthBorderWidth={0}
                        monthBorderColor="#0f0f0f"
                        dayBorderWidth={2}
                        tooltip={(e) => {
                            return (
                                <div className="bg-neutral-800 p-1 rounded-lg">
                                    <h2 className="text-xs font-semibold text-neutral-400">{e.day}</h2>
                                    <p className="text-neutral-200 font-extrabold font-bricolage">
                                        <span className="text-xs">Bot updated price</span> {e.value}{" "}
                                        <span className="text-xs">times</span>
                                    </p>
                                </div>
                            )
                        }}
                        dayBorderColor="#000000"
                    />
                </div>
                <div className="bg-neutral-900 rounded-lg h-96 p-4">
                    <h2 className="text-lg font-semibold text-neutral-400">Game wise inventory value</h2>
                    <div className="flex items-center justify-center">
                        <Pie
                            data={showDemo ? dummyGameWiseInventoryValue : crunchGameWiseInventoryValue(inventory)}
                            margin={{ top: -40, right: 80, bottom: 20, left: 80 }}
                            innerRadius={0.4}
                            padAngle={0.7}
                            cornerRadius={6}
                            height={360}
                            width={360}
                            activeOuterRadiusOffset={10}
                            borderWidth={1}
                            borderColor={{ from: "color", modifiers: [["darker", 0.9]] }}
                            arcLinkLabelsSkipAngle={10}
                            enableArcLabels={false}
                            arcLinkLabelsTextColor="#fafafa"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: "color" }}
                            tooltip={(e) => {
                                let { datum: t } = e
                                return (
                                    <div className="bg-neutral-800 p-1 rounded-lg">
                                        <h2 className="text-xs font-semibold text-neutral-400">{t.label}</h2>
                                        <p className="text-neutral-200 font-extrabold font-bricolage">
                                            {t.value.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </p>
                                    </div>
                                )
                            }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                            legends={[
                                {
                                    anchor: "bottom",
                                    direction: "row",
                                    justify: false,
                                    translateX: 10,
                                    translateY: -20,
                                    itemsSpacing: 0,
                                    itemWidth: 70,
                                    itemHeight: 16,
                                    itemTextColor: "#fafafa",
                                    itemDirection: "left-to-right",
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: "circle",
                                    effects: [
                                        {
                                            on: "hover",
                                            style: {
                                                itemTextColor: "#fafafa",
                                            },
                                        },
                                    ],
                                },
                            ]}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

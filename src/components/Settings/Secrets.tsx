"use client"

import Image from "next/image"
import Link from "next/link"

import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AiOutlineEdit } from "react-icons/ai"
import { BiSync } from "react-icons/bi"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import PriceEmpire from "@/assets/logo/price-empire.svg"
import Steam from "@/assets/logo/steam.svg"
import Waxpeer from "@/assets/logo/waxpeer.svg"

import type { Setting } from "@/types/database"

const FormSchema = z.object({
    price_empire_key: z.string(),
    waxpeer_key: z.string(),
    steam_id: z.string(),
    steam_trade_url: z.string().optional().or(z.literal("")),
    steam_key: z.string().optional().or(z.literal("")),
})

export default function Secrets({ setting, isDemo }: { setting: Setting; isDemo?: boolean }) {
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        disabled: !isEditing,
        defaultValues: {
            price_empire_key: "",
            steam_id: "",
            steam_key: "",
            steam_trade_url: "",
            waxpeer_key: "",
        },
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        setSaving(true)
        !isDemo &&
            fetch("/api/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(() => {
                    setIsEditing(false)
                    toast.success("API keys updated successfully.")
                })
                .catch(() => {
                    toast.error("Failed to update API keys.")
                })
                .finally(() => {
                    setSaving(false)
                })
    }
    useEffect(() => {
        form.reset(setting)
    }, [setting])
    return (
        <Card className="w-full relative">
            <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys and secrets.</CardDescription>
            </CardHeader>
            <Button
                disabled={isEditing}
                size={"xs"}
                className="absolute top-4 right-4"
                onClick={() => setIsEditing((prev) => !prev)}
            >
                <AiOutlineEdit className="size-4" />
            </Button>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price_empire_key"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src={PriceEmpire}
                                                alt="PriceEmpire"
                                                className="size-8 border rounded-full border-gray-200/20"
                                                width={32}
                                                height={32}
                                            />
                                            <div>
                                                <FormLabel>PriceEmpire</FormLabel>
                                                <FormDescription>
                                                    You can find your PriceEmpire API key{" "}
                                                    <Link href="https://pricempire.com/api" className="text-amber-400">
                                                        here
                                                    </Link>
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="8dqw30*****" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="waxpeer_key"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center space-x-2">
                                            <Image
                                                src={Waxpeer}
                                                alt="Waxpeer"
                                                className="size-8"
                                                width={32}
                                                height={32}
                                            />
                                            <div>
                                                <FormLabel>Waxpeer</FormLabel>
                                                <FormDescription>
                                                    You can find your Waxpeer API key{" "}
                                                    <Link
                                                        href="https://waxpeer.com/profile/user"
                                                        className="text-amber-400"
                                                    >
                                                        here
                                                    </Link>
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="31hkw30*****" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="steam_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center space-x-2">
                                            <Image src={Steam} alt="Steam" className="size-8" width={32} height={32} />
                                            <div>
                                                <FormLabel>Steam Id</FormLabel>
                                                <FormDescription>
                                                    You can find your Steam ID{" "}
                                                    <Link
                                                        href="https://store.steampowered.com/account/"
                                                        className="text-amber-400"
                                                    >
                                                        here
                                                    </Link>
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="31hkw30*****" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="steam_key"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center space-x-2">
                                            <Image src={Steam} alt="Steam" className="size-8" width={32} height={32} />
                                            <div>
                                                <FormLabel>Steam API key (optional)</FormLabel>
                                                <FormDescription>
                                                    You can find your Steam API key{" "}
                                                    <Link
                                                        href="https://steamcommunity.com/dev/apikey"
                                                        className="text-amber-400"
                                                    >
                                                        here
                                                    </Link>
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="31hkw30*****" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="steam_trade_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center space-x-2">
                                            <Image src={Steam} alt="Steam" className="size-8" width={32} height={32} />
                                            <div>
                                                <FormLabel>Steam trade link (optional)</FormLabel>
                                                <FormDescription>
                                                    You can find your Steam trade link{" "}
                                                    <Link
                                                        href="https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url"
                                                        className="text-amber-400"
                                                    >
                                                        here
                                                    </Link>
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="31hkw30*****" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end self-end">
                                <Button type="submit" disabled={!isEditing || saving}>
                                    {saving && <BiSync className="animate-spin mr-2 size-4" />}
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

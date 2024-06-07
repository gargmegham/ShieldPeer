"use client"

import Image from "next/image"
import Link from "next/link"

import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AiOutlineEdit } from "react-icons/ai"
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
    price_empire_key: z.string().min(5),
    waxpeer_key: z.string().min(5),
    steam_id: z.string().min(5),
})

export default function Secrets({ setting }: { setting: Setting }) {
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        disabled: !isEditing,
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setSaving(true)
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
                                                You can find your PriceEmpire API Key{" "}
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
                                        <Image src={Waxpeer} alt="Waxpeer" className="size-8" width={32} height={32} />
                                        <div>
                                            <FormLabel>Waxpeer</FormLabel>
                                            <FormDescription>
                                                You can find your Waxpeer API Key{" "}
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
                                                You can find your Steam ID by clicking on your profile on Steam website.
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
                        <Button type="submit" disabled={!isEditing || saving}>
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

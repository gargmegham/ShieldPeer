"use client"

import { useParams } from "next/navigation"

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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import type { ItemSetting } from "@/types/database"

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

export default function ItemSettingsForm({ itemSetting, isDemo }: { itemSetting: ItemSetting; isDemo?: boolean }) {
    const { id } = useParams()
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        disabled: !isEditing || isDemo,
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
    useEffect(() => {
        form.reset(itemSetting)
    }, [itemSetting])
    return (
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
                                        <FormDescription>Minimum price you want to list the item for.</FormDescription>
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
                                        <FormDescription>Maximum price you want to list the item for.</FormDescription>
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
                            <FormField
                                control={form.control}
                                name="when_no_one_to_undercut_list_at"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>3. When No One To Undercut List At</FormLabel>
                                        <FormDescription>
                                            If no one is there to undercut, should we list at max price or at a specific
                                            percentage specified at (4) below.
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
                                            If no one is there to undercut, and you have selected to list at a specific
                                            percentage, then we will list at this price.
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
                                        percentage specified below. Even if you have selected to undercut by price in
                                        general settings.
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
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
                                        <div className="flex justify-end self-end">
                                            <FormControl>
                                                <Switch
                                                    disabled={saving || !isEditing}
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        field.onChange(e)
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end self-end">
                                <Button type="submit" disabled>
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

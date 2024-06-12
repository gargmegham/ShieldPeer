"use client"

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

import { sources } from "@/constants/sources"

import { Setting } from "@/types/database"

const FormSchema = z.object({
    price_empire_source: z.string(),
    undercut_by_price: z.number(),
    undercut_by_percentage: z.number(),
    undercut_by: z.string(),
})

export default function UndercutParameters({ setting, isDemo }: { setting: Setting; isDemo?: boolean }) {
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        disabled: !isEditing,
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
                    toast.success("Undercut parameters updated successfully.")
                })
                .catch(() => {
                    toast.error("Failed to update undercut parameters.")
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
                <CardTitle>Undercut Parameters</CardTitle>
                <CardDescription>Set your PriceEmpire source and parameters for undercutting here.</CardDescription>
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
                                name="price_empire_source"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PriceEmpire Source</FormLabel>
                                        <Select {...field} onValueChange={field.onChange} defaultValue="buff">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a source for base" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {sources.map((source) => (
                                                        <SelectItem key={source} value={source}>
                                                            {`${source[0].toUpperCase()}${source.slice(1)}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="undercut_by"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Undercut By</FormLabel>
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
                        </div>
                        <FormField
                            control={form.control}
                            name="undercut_by_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Undercut By Price</FormLabel>
                                    <FormDescription>
                                        This price will be used to undercut other sellers if undercut by price is
                                        selected above.
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
                                        This percentage will be used to undercut other sellers if undercut by percentage
                                        is selected above.
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
                        <div className="flex justify-end self-end">
                            <Button type="submit" disabled={!isEditing || saving}>
                                {saving && <BiSync className="animate-spin mr-2 size-4" />}
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

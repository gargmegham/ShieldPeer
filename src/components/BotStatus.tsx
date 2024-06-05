"use client"

import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

import type { Setting } from "@/types/database"

const FormSchema = z.object({
    is_paused: z.boolean(),
})

export default function BotStatus({ setting }: { setting: Setting }) {
    const [saving, setSaving] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
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
            .then(() => toast.success("Bot status updated successfully."))
            .catch(() => toast.error("Failed to update bot status."))
            .finally(() => {
                setSaving(false)
            })
    }
    useEffect(() => {
        form.reset(setting)
    }, [setting])
    return (
        <Card className="w-full relative">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="is_paused"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormDescription>Enable/disable the listing bot.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                disabled={saving}
                                                checked={field.value}
                                                onCheckedChange={(e) => {
                                                    field.onChange(e)
                                                    form.handleSubmit(onSubmit)()
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

"use client"

import { useEffect, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PriceRange } from "@/types/database"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const FormSchema = z.object({
    source_price_min: z.number(),
    source_price_max: z.number(),
    listing_price_min: z.number(),
    listing_price_max: z.number(),
    listing_price_if_no_one_to_undercut: z.number(),
    when_no_one_to_undercut_list_at: z.string(),
    always_undercut_by_percentage_if_listing_price_is_greater_than: z.number(),
})

export default function AddEditPriceRangeDialog({
    open,
    setOpen,
    refreshTable,
    selectedPriceRange,
}: {
    open: boolean
    setOpen: (open: boolean) => void
    refreshTable?: () => void
    selectedPriceRange: PriceRange | null
}) {
    const [saving, setSaving] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.source_price_min >= data.source_price_max) {
            toast.error("Source price min must be less than source price max")
            return
        }
        if (data.listing_price_min >= data.listing_price_max) {
            toast.error("Listing price min must be less than listing price max")
            return
        }
        const method = selectedPriceRange?.id ? "PUT" : "POST"
        const payload = selectedPriceRange?.id ? { ...selectedPriceRange, ...data } : data
        fetch("/api/price-ranges", {
            method,
            body: JSON.stringify(payload),
        })
            .then(() => {
                toast.success("Price range added successfully")
                refreshTable?.()
                form.reset()
                setOpen(false)
            })
            .catch(() => {
                toast.error("Failed to add price range")
            })
            .finally(() => {
                setSaving(false)
            })
    }
    useEffect(() => {
        if (selectedPriceRange) form.reset(selectedPriceRange)
    }, [selectedPriceRange])
    return (
        <Dialog
            open={open}
            onOpenChange={(val) => {
                form.reset()
                setOpen(val)
            }}
        >
            <DialogContent className="w-[80%] max-h-[90vh] overflow-y-scroll">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="source_price_min"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>1. Source Price Min</FormLabel>
                                        <FormDescription>
                                            The source price of item must be greater than this value.
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="1"
                                                {...field}
                                                onChange={(e) => {
                                                    form.setValue("source_price_min", Number(e.target.value))
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="source_price_max"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>2. Source Price Max</FormLabel>
                                        <FormDescription>
                                            The source price of item must be less than this value.
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="10"
                                                {...field}
                                                onChange={(e) => {
                                                    form.setValue("source_price_max", Number(e.target.value))
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
                                        <FormLabel>3. Listing Price Min Percentage</FormLabel>
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
                                        <FormLabel>4. Listing Price Max Percentage</FormLabel>
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="when_no_one_to_undercut_list_at"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>5. When No One To Undercut List At</FormLabel>
                                        <FormDescription>
                                            If no one is there to undercut, should we list at max price or at a specific
                                            percentage specified at (6) below.
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
                                        <FormLabel>6. List at this percentage if no one to undercut</FormLabel>
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
                                        7. Always undercut by percentage if listing price is greater than
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
                        <Button type="submit" disabled={saving}>
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { useRouter } from "next/navigation"

import React, { useState } from "react"

import toast from "react-hot-toast"
import { BiSync } from "react-icons/bi"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import type { Item } from "@/types/database"

export default function ItemDelete({ id, item, isDemo }: { id: string; item: Item; isDemo?: boolean }) {
    const router = useRouter()
    const [deleteConfirmation, setDeleteConfirmation] = useState("")
    const [saving, setSaving] = useState(false)
    const deleteItem = async () => {
        try {
            setSaving(true)
            await fetch(`/api/item/${id}`, {
                method: "DELETE",
            })
            toast.success("Item deleted")
            router.push("/inventory")
        } catch (error: any) {
            toast.error("Failed to delete item")
        } finally {
            setSaving(false)
        }
    }
    return (
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
                    disabled={saving || isDemo}
                    onClick={() => {
                        if (deleteConfirmation === item?.name ?? item.market_hash_name) deleteItem()
                        else toast.error("Item name does not match!")
                    }}
                    className="w-full !mt-4"
                    variant="destructive"
                >
                    {saving && <BiSync className="animate-spin mr-2 size-4" />}
                    Delete
                </Button>
            </CardContent>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px" />
        </Card>
    )
}

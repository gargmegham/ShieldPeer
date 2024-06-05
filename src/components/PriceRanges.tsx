"use client"

import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PriceRange } from "@/types/database"
import { AiOutlinePlusCircle } from "react-icons/ai"

import AddEditPriceRangeDialog from "./AddEditPriceRangeDialog"
import { DeletionConfirmationDialog } from "./DeletionConfirmationDialog"

/**
 * @description PriceRanges are used for granular control over the listing parameters.
 */
export default function PriceRanges() {
    const [priceRanges, setPriceRanges] = useState<PriceRange[]>([])
    const [open, setOpen] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null)
    const fetchPriceRanges = () => {
        fetch("/api/price-ranges")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setPriceRanges(data)
            })
    }
    const deletePriceRange = () => {
        if (!selectedPriceRange) return
        fetch(`/api/price-ranges?id=${selectedPriceRange.id}`, {
            method: "DELETE",
        }).then(() => {
            fetchPriceRanges()
            setOpenDeleteDialog(false)
        })
    }
    useEffect(() => {
        if (!open) setSelectedPriceRange(null)
    }, [open])
    useEffect(fetchPriceRanges, [])
    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle>Price Ranges</CardTitle>
                <CardDescription>In case of conflict, first price range will be used.</CardDescription>
            </CardHeader>
            <DeletionConfirmationDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                title="Delete Price Range"
                description="Are you sure you want to delete this price range?"
                confirm={deletePriceRange}
                buttonText="Delete"
            />
            {open && (
                <AddEditPriceRangeDialog
                    open={open}
                    setOpen={setOpen}
                    selectedPriceRange={selectedPriceRange}
                    refreshTable={fetchPriceRanges}
                />
            )}
            <Button size={"xs"} className="absolute top-4 right-4" onClick={() => setOpen(true)}>
                <AiOutlinePlusCircle className="size-4" />
            </Button>
            <CardContent>
                <Table>
                    <TableCaption>You can set parameters for different price ranges separately.</TableCaption>
                    <TableHeader className="text-xs">
                        <TableRow>
                            <TableHead>Source Price Min.</TableHead>
                            <TableHead>Source Price Max.</TableHead>
                            <TableHead>Listing Price Min.</TableHead>
                            <TableHead>Listing Price Max.</TableHead>
                            <TableHead>Listing Price If No One To Undercut</TableHead>
                            <TableHead className="w-">When No One To Undercut List At</TableHead>
                            <TableHead>Undercut By Percentage Threshold</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {priceRanges.map((priceRange) => (
                            <TableRow key={priceRange.id}>
                                <TableCell className="font-medium">{priceRange.source_price_min}</TableCell>
                                <TableCell className="font-medium">{priceRange.source_price_max}</TableCell>
                                <TableCell className="font-medium">{priceRange.listing_price_min}%</TableCell>
                                <TableCell className="font-medium">{priceRange.listing_price_max}%</TableCell>
                                <TableCell className="font-medium">
                                    {priceRange.listing_price_if_no_one_to_undercut}%
                                </TableCell>
                                <TableCell className="font-medium">
                                    {priceRange.when_no_one_to_undercut_list_at.split("_").join(" ")}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {priceRange.always_undercut_by_percentage_if_listing_price_is_greater_than}%
                                </TableCell>
                                <TableCell className="flex space-x-1">
                                    <Button
                                        size={"xs"}
                                        className="text-xs"
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedPriceRange(priceRange)
                                            setOpen(true)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size={"xs"}
                                        className="text-xs"
                                        variant="destructive"
                                        onClick={() => {
                                            setSelectedPriceRange(priceRange)
                                            setOpenDeleteDialog(true)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {priceRanges.length === 0 && (
                            <>
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        -
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        No price ranges found.
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        -
                                    </TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

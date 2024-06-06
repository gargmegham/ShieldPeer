"use client"

import Image from "next/image"
import Link from "next/link"

import React from "react"

import { metadata } from "@/app/layout"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { BiSolidErrorAlt } from "react-icons/bi"
import { LuBadgeCheck } from "react-icons/lu"
import { MdErrorOutline } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { cn } from "@/utils/cn"

import { Item } from "@/types/database"

import DataTable from "./DataTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const columns: ColumnDef<Item>[] = [
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Type
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const item = row.original
            let icon = <LuBadgeCheck />
            if (item.type === "failure") icon = <MdErrorOutline />
            if (item.type === "caution") icon = <BiSolidErrorAlt />
            return (
                <div
                    className={cn(
                        "flex items-center gap-x-2 px-4",
                        item.type === "failure" && "text-red-500",
                        item.type === "caution" && "text-yellow-500",
                        item.type === "success" && "text-green-500"
                    )}
                >
                    {icon}
                    {item.type}
                </div>
            )
        },
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Item
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const item = row.original
            return (
                <div className="flex px-4 items-center gap-x-2">
                    <Image
                        src={`https://community.cloudflare.steamstatic.com/economy/image/${item?.meta_data?.image ?? "N/A"}`}
                        alt="Waxpeer"
                        className="size-8 bg-neutral-200 rounded-lg"
                        width={32}
                        height={32}
                    />
                    <div className="flex gap-x-1">
                        <Link
                            href={`https://steamcommunity.com/market/listings/730/${item?.name}`}
                            className="text-amber-400"
                        >
                            {item?.name ?? "N/A"}
                        </Link>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Created At
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="font-medium px-4">{new Date(row.getValue("created_at")).toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        header: () => {
            return <div>Actions</div>
        },
        cell: ({ row }) => {
            const item = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(item.id)
                                toast.success("Item ID copied to clipboard")
                            }}
                        >
                            Copy Item ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function LogTable({ items }: { items: Item[] }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>
                    This is your steam inventory. You can view, sell, and trade items here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable data={items} filterKey="name" filterPlaceholder="Search by item name..." columns={columns} />
            </CardContent>
        </Card>
    )
}

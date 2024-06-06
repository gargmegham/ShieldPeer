"use client"

import Image from "next/image"
import Link from "next/link"

import React from "react"

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { BiSolidErrorAlt } from "react-icons/bi"
import { FaExternalLinkAlt } from "react-icons/fa"
import { LuBadgeCheck } from "react-icons/lu"
import { MdErrorOutline } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import DataTable from "@/components/DataTable"

import { cn } from "@/utils/cn"

import { Log } from "@/types/database"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export const columns: ColumnDef<Log>[] = [
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
            const log = row.original
            let icon = <LuBadgeCheck />
            if (log.type === "failure") icon = <MdErrorOutline />
            if (log.type === "caution") icon = <BiSolidErrorAlt />
            return (
                <div
                    className={cn(
                        "flex items-center gap-2 px-4",
                        log.type === "failure" && "text-red-500/80",
                        log.type === "caution" && "text-yellow-500/80",
                        log.type === "success" && "text-green-500/80"
                    )}
                >
                    {icon}
                    {log.type}
                </div>
            )
        },
    },
    {
        accessorKey: "item_id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Item
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const log = row.original
            return (
                <div className="flex px-4 items-center gap-2">
                    <Image
                        src={`https://community.cloudflare.steamstatic.com/economy/image/${log?.item_image ?? "N/A"}`}
                        alt="Waxpeer"
                        className="size-10 bg-neutral-200 rounded-lg"
                        width={32}
                        loading="lazy"
                        height={32}
                    />
                    <div className="flex gap-1">
                        <Link
                            href={`https://steamcommunity.com/market/listings/730/${log?.item_name}`}
                            className="text-amber-400/80"
                        >
                            {log?.item_name ?? "N/A"}
                        </Link>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "message",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Message
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const log = row.original
            return (
                <div className="font-medium px-4">
                    <div>{log.message}</div>
                    <div className="text-xs text-neutral-400">{log.type === "failure" && log?.meta_data?.error}</div>
                    {log?.meta_data?.listing_id && (
                        <div className="text-xs text-neutral-400">
                            {" "}
                            <Link
                                href={`/listings/${log?.meta_data?.listing_id}`}
                                className="text-amber-400/80 flex items-center gap-2"
                            >
                                Listing <FaExternalLinkAlt />
                            </Link>
                        </div>
                    )}
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
            const log = row.original
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
                                navigator.clipboard.writeText(log.id)
                                toast.success("Log ID copied to clipboard")
                            }}
                        >
                            Copy Log ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function LogTable({ logs }: { logs: Log[] }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Bot Logs</CardTitle>
                <CardDescription>
                    View logs of all bot actions, including errors, warnings, and successes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={logs}
                    hidePagination={true}
                    filterKey="message"
                    filterPlaceholder="Search by log message..."
                    columns={columns}
                />
            </CardContent>
        </Card>
    )
}

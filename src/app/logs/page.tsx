"use client"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import LogTable from "@/components/LogTable"

import { logs as demoLogs } from "@/constants/demo"

import { cn } from "@/utils/cn"

import type { Log } from "@/types/database"

export default function Logs() {
    const [logs, setLogs] = useState<Log[]>([])
    const [loading, setLoading] = useState(true)
    const [showDemoLogs, setShowDemoLogs] = useState(false)

    useEffect(() => {
        fetch("/api/logs")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setLogs(data)
            })
            .catch(() => {
                toast.error("Failed to fetch logs")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <main
            className={cn(
                "bg-black min-h-screen bg-grid-small-white/30",
                logs.length === 0 && !showDemoLogs && "flex justify-center items-center",
                logs.length === 0 && showDemoLogs && "py-[16vh] relative flex justify-center px-8 md:px-20"
            )}
            id="dashboard"
        >
            <Navbar
                items={[
                    { label: "Inventory", link: "/inventory", icon: MdOutlineInventory },
                    {
                        label: "Logs",
                        link: "/logs",
                        icon: MdOutlineDocumentScanner,

                        inFocus: true,
                    },
                    {
                        label: "Settings",
                        link: "/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/"
            />
            {logs.length === 0 && !showDemoLogs && (
                <Card className="w-[350px]">
                    <CardContent className="pt-6 space-y-4">
                        <div>No logs found. Would you like to see some demo logs?</div>
                        <div className="flex items-center justify-end">
                            <Button onClick={() => setShowDemoLogs(true)}>Yes</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            {logs.length === 0 && showDemoLogs && <LogTable logs={demoLogs} />}
        </main>
    )
}

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

import { cn } from "@/utils/cn"

import type { Log } from "@/types/database"

export default function Logs() {
    const [logs, setLogs] = useState<Log[]>([])
    const [demoLogs, setDemoLogs] = useState<Log[]>([])
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
        fetch("/demo/logs.json")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setDemoLogs(data)
            })
            .catch(() => {
                toast.error("Failed to fetch demo logs")
            })
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <main
            className={cn(
                "flex justify-center relative px-8 md:px-20",
                logs.length === 0 && !showDemoLogs && "items-center",
                logs.length === 0 && showDemoLogs && "py-[16vh]",
                logs && logs.length > 0 && "py-[16vh]"
            )}
            id="logs"
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
            {logs.length > 0 && <LogTable logs={logs} />}
        </main>
    )
}

"use client"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import LogTable from "@/components/LogTable"

import type { Log } from "@/types/database"

export default function Logs() {
    const [demoLogs, setDemoLogs] = useState<Log[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("/demo/logs.json")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setDemoLogs(data)
            })
            .catch(() => {
                toast.error("Failed to fetch demo logs")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <main className="flex justify-center relative px-8 md:px-20 py-[16vh]" id="demo-logs">
            <Navbar
                items={[
                    { label: "Inventory", link: "/demo/inventory", icon: MdOutlineInventory },
                    {
                        label: "Logs",
                        link: "/demo/logs",
                        icon: MdOutlineDocumentScanner,

                        inFocus: true,
                    },
                    {
                        label: "Settings",
                        link: "/demo/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/demo"
            />
            <LogTable logs={demoLogs} />
        </main>
    )
}

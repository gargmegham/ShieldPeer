"use client"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import BotStatus from "@/components/Settings/BotStatus"
import PriceRanges from "@/components/Settings/PriceRanges"
import Secrets from "@/components/Settings/Secrets"
import UndercutParameters from "@/components/Settings/UndercutParameters"

import type { Setting } from "@/types/database"

export default function Settings() {
    const [setting, setSetting] = useState<Setting>({} as Setting)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setSetting(data)
            })
            .catch(() => {
                toast.error("Failed to fetch settings")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return loading ? (
        <Loader />
    ) : (
        <main className="py-[16vh] relative px-8 md:px-20 space-y-4" id="settings">
            <Navbar
                items={[
                    { label: "Inventory", link: "/inventory", icon: MdOutlineInventory },
                    { label: "Logs", link: "/logs", icon: MdOutlineDocumentScanner },
                    {
                        label: "Settings",
                        link: "/settings",
                        icon: IoSettingsOutline,
                        inFocus: true,
                    },
                ]}
                logoLink="/"
            />
            <BotStatus setting={setting} />
            <Secrets setting={setting} />
            <UndercutParameters setting={setting} />
            <PriceRanges />
        </main>
    )
}

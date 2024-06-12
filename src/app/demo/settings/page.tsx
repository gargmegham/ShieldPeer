"use client"

import React, { useState } from "react"

import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Navbar from "@/components/ui/navbar"

import BotStatus from "@/components/BotStatus"
import PriceRanges from "@/components/PriceRanges"
import Secrets from "@/components/Secrets"
import UndercutParameters from "@/components/UndercutParameters"

import type { Setting } from "@/types/database"

export default function Settings() {
    const [setting, setSetting] = useState<Setting>({} as Setting)
    return (
        <main className="py-[16vh] relative px-8 md:px-20 space-y-4" id="settings">
            <Navbar
                items={[
                    { label: "Inventory", link: "/demo/inventory", icon: MdOutlineInventory },
                    { label: "Logs", link: "/demo/logs", icon: MdOutlineDocumentScanner },
                    {
                        label: "Settings",
                        link: "/demo/settings",
                        icon: IoSettingsOutline,
                        inFocus: true,
                    },
                ]}
                logoLink="/demo"
            />
            <BotStatus setting={setting} isDemo={true} />
            <Secrets setting={setting} isDemo={true} />
            <UndercutParameters setting={setting} isDemo={true} />
            <PriceRanges isDemo />
        </main>
    )
}

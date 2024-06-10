"use client"

import React, { useState } from "react"

import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Navbar from "@/components/ui/navbar"

import BotStatus from "@/components/BotStatus"
import PriceRanges from "@/components/PriceRanges"
import Secrets from "@/components/Secrets"
import UndercutParameters from "@/components/UndercutParameters"

import config from "@/utils/config"
import { getSEOTags } from "@/utils/seo"

import type { Setting } from "@/types/database"

export const metadata = getSEOTags({
    title: `${config.appName} - Settings`,
    description: "Manage your bot settings here.",
    keywords: "settings, bot, parameters",
})

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <Secrets setting={setting} isDemo={true} />
                    <BotStatus setting={setting} isDemo={true} />
                </div>
                <UndercutParameters setting={setting} isDemo={true} />
            </div>
            <PriceRanges isDemo />
        </main>
    )
}

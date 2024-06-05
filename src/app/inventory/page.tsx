"use client"

import React from "react"

import Navbar from "@/components/ui/navbar"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

export default function Inventory() {
    return (
        <main className="bg-black min-h-screen bg-grid-small-white/30" id="dashboard">
            <Navbar
                items={[
                    {
                        label: "Inventory",
                        link: "/inventory",
                        icon: MdOutlineInventory,
                        inFocus: true,
                    },
                    { label: "Logs", link: "/logs", icon: MdOutlineDocumentScanner },
                    { label: "Logs", link: "/logs", icon: MdOutlineDocumentScanner },
                    {
                        label: "Settings",
                        link: "/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/"
            />
        </main>
    )
}

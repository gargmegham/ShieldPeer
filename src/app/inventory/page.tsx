"use client"

import React from "react"

import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Navbar from "@/components/ui/navbar"

export default function Inventory() {
    return (
        <main id="dashboard">
            <Navbar
                items={[
                    {
                        label: "Inventory",
                        link: "/inventory",
                        icon: MdOutlineInventory,
                        inFocus: true,
                    },
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

"use client"

import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Navbar from "@/components/ui/navbar"

import ActiveToggle from "@/components/Settings/Item/ActiveToggle"
import DanzerZone from "@/components/Settings/Item/DanzerZone"
import Parameters from "@/components/Settings/Item/Parameters"
import PriceHistory from "@/components/Settings/Item/PriceHistory"

import type { Item, ItemSetting } from "@/types/database"

export default function ItemSettings() {
    const demoPriceHistory = [
        11, 22, 33, 44, 55, 66, 77, 76, 74, 72, 71, 76, 74, 72, 71, 88, 99, 110, 121, 132, 143, 154, 165, 176, 187, 198,
        209, 220, 231, 242,
    ]
    return (
        <main className="py-[16vh] relative px-8 md:px-20 space-y-4" id="item-settings">
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
            <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
                <ActiveToggle id={"21678"} item={{} as Item} fetchItem={() => {}} isDemo={true} />
                <PriceHistory itemPriceHistory={demoPriceHistory} />
            </div>
            <Parameters itemSetting={{} as ItemSetting} isDemo={true} />
            <DanzerZone id={"23879"} item={{} as Item} />
        </main>
    )
}

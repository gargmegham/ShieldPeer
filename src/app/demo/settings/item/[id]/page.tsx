"use client"

import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Navbar from "@/components/ui/navbar"

import ItemActiveToggle from "@/components/ItemActiveToggle"
import ItemDelete from "@/components/ItemDelete"
import ItemPriceHistory from "@/components/ItemPriceHistory"
import ItemSettingsForm from "@/components/ItemSettingsForm"

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
                <ItemActiveToggle id={"21678"} item={{} as Item} fetchItem={() => {}} isDemo={true} />
                <ItemPriceHistory itemPriceHistory={demoPriceHistory} />
            </div>
            <ItemSettingsForm itemSetting={{} as ItemSetting} isDemo={true} />
            <ItemDelete id={"23879"} item={{} as Item} />
        </main>
    )
}

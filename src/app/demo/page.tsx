"use client"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import Listings from "@/components/Listings"
import Statistics from "@/components/Statistics"

import type { Listing } from "@/types/database"

export default function Dashboard() {
    const [demoListings, setDemoListings] = useState<Listing[]>([])
    const [loading, setLoading] = useState(true)
    // Fetch listings
    useEffect(() => {
        fetch("/demo/listings.json")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setDemoListings(data)
                setLoading(false)
            })
            .catch(() => {
                toast.error("Failed to fetch demo listings")
            })
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <main className="py-[16vh] relative flex justify-center px-8 md:px-20" id="demo-dashboard">
            <Navbar
                items={[
                    { label: "Inventory", link: "/demo/inventory", icon: MdOutlineInventory },
                    {
                        label: "Logs",
                        link: "/demo/logs",
                        icon: MdOutlineDocumentScanner,
                    },
                    {
                        label: "Settings",
                        link: "/demo/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/demo"
            />
            <div className="space-y-8">
                <Statistics showDemo={true} listings={demoListings} />
                <Listings isDemo={true} listings={demoListings} />
            </div>
        </main>
    )
}

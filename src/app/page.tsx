"use client"

import Link from "next/link"

import React, { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineDocumentScanner, MdOutlineInventory } from "react-icons/md"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Loader from "@/components/ui/Loader"
import Navbar from "@/components/ui/navbar"

import Listings from "@/components/Listings"

import { cn } from "@/utils/cn"

import type { Listing, Setting } from "@/types/database"
import type { Inventory } from "@/types/price-empire"

export default function Dashboard() {
    const [listings, setListings] = useState<Listing[]>([])
    const [demoListings, setDemoListings] = useState<Listing[]>([])
    const [loading, setLoading] = useState(true)
    const [showDemo, setShowDemo] = useState(false)
    const [setting, setSetting] = useState<Setting>({} as Setting)
    const [user, setUser] = useState<Inventory["user"]>({} as Inventory["user"])
    // fetch settings
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
    }, [])
    // Fetch user steam profile
    useEffect(() => {
        fetch("/api/steam")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setUser(data)
            })
            .catch(() => {
                toast.error("Failed to fetch settings")
            })
    }, [])
    // Fetch listings
    useEffect(() => {
        fetch("/api/listings")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return
                setListings(data)
            })
            .catch(() => {
                toast.error("Failed to fetch listings")
            })
            .finally(() => {
                setLoading(false)
            })
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
        <main
            className={cn(
                listings.length === 0 && !showDemo && "flex justify-center items-center",
                listings.length === 0 && showDemo && "py-[16vh] relative flex justify-center px-8 md:px-20",
                listings.length > 0 && "py-[16vh] relative flex justify-center px-8 md:px-20"
            )}
            id="dashboard"
        >
            <Navbar
                items={[
                    { label: "Inventory", link: "/inventory", icon: MdOutlineInventory },
                    {
                        label: "Logs",
                        link: "/logs",
                        icon: MdOutlineDocumentScanner,
                    },
                    {
                        label: "Settings",
                        link: "/settings",
                        icon: IoSettingsOutline,
                    },
                ]}
                logoLink="/"
            />
            <Link
                className="fixed bottom-10 left-10 z-20"
                target="_blank"
                href={`https://steamcommunity.com/profiles/${setting.steam_id}/?utm_source=ShieldPeer`}
            >
                <Avatar className="size-16 border border-rose-100/30 shadow shadow-primary">
                    <AvatarImage src={`https://avatars.akamai.steamstatic.com/${user?.image}_full.jpg`} />
                    <AvatarFallback className="text-amber-300">{user?.name ? user?.name[0] : "N/A"}</AvatarFallback>
                </Avatar>
            </Link>
            {listings.length === 0 && !showDemo ? (
                <Card className="w-[350px]">
                    <CardContent className="pt-6 space-y-4">
                        <div>No items in your listings. Would you like to see some demo listings instead?</div>
                        <div className="flex items-center justify-end">
                            <Button onClick={() => setShowDemo(true)}>Yes</Button>
                        </div>
                    </CardContent>
                </Card>
            ) : listings.length === 0 && showDemo ? (
                <Listings listings={demoListings} setting={setting} />
            ) : (
                <Listings listings={listings} setting={setting} />
            )}
        </main>
    )
}

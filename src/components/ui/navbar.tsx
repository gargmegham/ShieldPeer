"use client"

import Image from "next/image"
import Link from "next/link"

import React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { IoMdLogIn } from "react-icons/io"
import { MdOutlinePriceChange, MdOutlineSupport } from "react-icons/md"

import { cn } from "@/utils/cn"
import config from "@/utils/config"

const Navbar = ({
    logoLink = "/home",
    items = [
        {
            label: "Pricing",
            link: "/home#pricing",
            icon: MdOutlinePriceChange,
        },
        {
            label: "Support",
            link: "mailto:business@meghamgarg.com",
            icon: MdOutlineSupport,
        },
        {
            label: "Get Started",
            link: "/auth",
            icon: IoMdLogIn,
            inFocus: true,
        },
    ],
}: {
    logoLink?: string
    items?: {
        label: string
        link: string
        icon: React.ElementType
        inFocus?: boolean
    }[]
}) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.2,
                }}
                className="flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4"
            >
                <Link
                    href={logoLink}
                    aria-current="page"
                    className="flex gap-2 justify-center md:justify-start items-center"
                >
                    <Image
                        src="/logo.png"
                        alt={`${config.appName} logo`}
                        priority={true}
                        className="w-6 h-6"
                        width={24}
                        height={24}
                    />
                    <strong className="font-extrabold tracking-tight text-base md:text-lg hover:text-neutral-300">
                        {config.appName}
                    </strong>
                </Link>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className={cn(
                            !item.inFocus &&
                                "relative flex items-center justify-center gap-1 px-2 py-1 rounded-full text-white hover:bg-white hover:bg-opacity-10",
                            item.inFocus &&
                                "bg-neutral-900 border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full"
                        )}
                    >
                        <span className="block sm:hidden">
                            <item.icon className="size-4 text-white" />
                        </span>
                        <span className="hidden sm:block text-sm">{item.label}</span>
                        {item.inFocus && (
                            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                        )}
                    </Link>
                ))}
            </motion.div>
        </AnimatePresence>
    )
}

export default Navbar

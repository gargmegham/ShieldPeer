"use client"

import Link from "next/link"

import { FaCommentDollar } from "react-icons/fa6"

export default function FinalCTA() {
    return (
        <section className="bg-grid-white/[0.1] bg-black py-36 space-y-8" id="final-cta">
            <div className="flex justify-center font-extrabold tracking-tight font-bricolage relative px-20">
                <div className="relative text-3xl md:text-4xl lgd:text-5xl ">
                    Make the most of your Steam assets
                    <FaCommentDollar className="absolute top-[-36px] right-[-42px] text-amber-500/90 rotate-[20deg]" />
                </div>
            </div>
            <div className="flex justify-center">
                <Link
                    href="/auth"
                    className="border text-sm font-medium relative border-white/[0.2] text-white w-32 h-12 rounded-xl bg-amber-600 flex items-center justify-center"
                >
                    <span>Get Started Now</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                </Link>
            </div>
            <div className="flex justify-center text-xs text-zinc-500 !mt-2">No CC Required</div>
        </section>
    )
}

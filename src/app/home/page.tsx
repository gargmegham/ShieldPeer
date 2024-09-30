import Link from "next/link"

import { GitHubLogoIcon } from "@radix-ui/react-icons"

import Navbar from "@/components/ui/navbar"

import FAQ from "@/components/Landing/FAQ"
import FinalCTA from "@/components/Landing/FinalCTA"
import Footer from "@/components/Landing/Footer"
import Hero from "@/components/Landing/Hero"
import Note from "@/components/Landing/Note"
import Problem from "@/components/Landing/Problem"

import { getSEOTags } from "@/utils/seo"

export const metadata = getSEOTags({
    canonicalUrlRelative: "/home",
})

export default function Home() {
    return (
        <main id="home" className="relative">
            <Navbar />
            <Hero />
            <Problem />
            <Note />
            <FAQ />
            <FinalCTA />
            <Footer />
            <Link
                href="https://github.com/gargmegham/ShieldPeer"
                target="_blank"
                className="hidden right-4 p-2 bottom-4 border text-sm font-medium border-white/[0.2] text-white rounded-xl bg-black md:flex items-center justify-center fixed"
            >
                <GitHubLogoIcon className="w-5 h-5 mr-2" />
                <span>Star Us On Github</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
            </Link>
        </main>
    )
}

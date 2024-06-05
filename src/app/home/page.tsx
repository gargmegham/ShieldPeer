"use client"

import Navbar from "@/components/ui/navbar"

import FAQ from "@/components/Landing/FAQ"
import Footer from "@/components/Landing/Footer"
import Hero from "@/components/Landing/Hero"
import Pricing from "@/components/Landing/Pricing"
import Problem from "@/components/Landing/Problem"

export default function Home() {
    return (
        <main id="home">
            <Navbar />
            <Hero />
            <Problem />
            <Pricing />
            <FAQ />
            <Footer />
        </main>
    )
}

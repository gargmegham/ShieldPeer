"use client"

import FAQ from "@/components/Landing/FAQ"
import Footer from "@/components/Landing/Footer"
import Hero from "@/components/Landing/Hero"
import Pricing from "@/components/Landing/Pricing"
import Problem from "@/components/Landing/Problem"
import Navbar from "@/components/ui/navbar"

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

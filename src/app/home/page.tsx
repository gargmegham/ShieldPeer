"use client";

import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import Hero from "@/components/Landing/Hero";
import Problem from "@/components/Landing/Problem";
import Pricing from "@/components/Landing/Pricing";
import FAQ from "@/components/Landing/FAQ";

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
  );
}

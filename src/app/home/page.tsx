"use client";

import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import Hero from "@/components/Landing/Hero";

export default function Home() {
  return (
    <main id="home">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}

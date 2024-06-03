"use client";

import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    // Redirect to the app dashboard if the user is authenticated
    router.push("/");
  }

  return (
    <main id="home">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}

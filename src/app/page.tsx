"use client";

import React from "react";
import Navbar from "@/components/ui/navbar";
import { MdOutlineInventory, MdOutlineDocumentScanner } from "react-icons/md";

export default function Dashboard() {
  return (
    <main
      className="bg-black min-h-screen bg-grid-small-white/30"
      id="dashboard"
    >
      <Navbar
        items={[
          { label: "Inventory", link: "/inventory", icon: MdOutlineInventory },
          { label: "Logs", link: "/logs", icon: MdOutlineDocumentScanner },
        ]}
        ctaLabel="Settings"
        ctaLink="/settings"
        logoLink="/"
      />
    </main>
  );
}

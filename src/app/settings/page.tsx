"use client";

import React from "react";
import Navbar from "@/components/ui/navbar";
import { MdOutlineInventory, MdOutlineDocumentScanner } from "react-icons/md";
import Secrets from "@/components/Secrets";

export default function Settings() {
  return (
    <main
      className="py-[16vh] px-20 bg-grid-small-white/[0.3] min-h-screen"
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
      <Secrets />
    </main>
  );
}

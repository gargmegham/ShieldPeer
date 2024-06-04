"use client";

import React from "react";
import Navbar from "@/components/ui/navbar";
import { MdOutlineInventory, MdOutlineDocumentScanner } from "react-icons/md";
import Secrets from "@/components/Secrets";
import PriceRanges from "@/components/PriceRanges";
import BotStatus from "@/components/BotStatus";
import UndercutParameters from "@/components/UndercutParameters";

export default function Settings() {
  return (
    <main
      className="py-[16vh] relative bg-black px-20 bg-grid-small-white/[0.3] min-h-screen space-y-4"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Secrets />
          <BotStatus />
        </div>
        <UndercutParameters />
      </div>
      <PriceRanges />
    </main>
  );
}

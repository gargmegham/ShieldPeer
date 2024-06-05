"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import { MdOutlineInventory, MdOutlineDocumentScanner } from "react-icons/md";
import Secrets from "@/components/Secrets";
import PriceRanges from "@/components/PriceRanges";
import BotStatus from "@/components/BotStatus";
import Loader from "@/components/ui/Loader";
import type { Setting } from "@/types/database";
import UndercutParameters from "@/components/UndercutParameters";
import toast from "react-hot-toast";

export default function Settings() {
  const [setting, setSetting] = useState<Setting>({} as Setting);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        setSetting(data);
      })
      .catch(() => {
        toast.error("Failed to fetch settings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <main
      className="py-[16vh] relative bg-black px-8 md:px-20 bg-grid-small-white/[0.3] min-h-screen space-y-4"
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
          <Secrets setting={setting} />
          <BotStatus setting={setting} />
        </div>
        <UndercutParameters setting={setting} />
      </div>
      <PriceRanges />
    </main>
  );
}

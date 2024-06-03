"use client";

import { useRouter } from "next/navigation";
import React from "react";
import config from "@/utils/config";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { MdOutlinePriceChange, MdOutlineSupport } from "react-icons/md";

const Navbar = () => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4"
      >
        <Link
          href="/#"
          aria-current="page"
          className="flex gap-2 justify-center md:justify-start items-center"
        >
          <Image
            src="/logo.png"
            alt={`${config.appName} logo`}
            priority={true}
            className="w-6 h-6"
            width={24}
            height={24}
          />
          <strong className="font-extrabold tracking-tight text-base md:text-lg">
            {config.appName}
          </strong>
        </Link>
        <button
          onClick={() => {
            router.push("/#pricing");
          }}
          className={cn(
            "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
          )}
        >
          <span className="block sm:hidden">
            <MdOutlinePriceChange className="size-4 text-white" />
          </span>
          <span className="hidden sm:block text-sm">Pricing</span>
        </button>
        <a
          href="mailto:business@meghamgarg.com"
          className={cn(
            "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
          )}
        >
          <span className="block sm:hidden">
            <MdOutlineSupport className="size-4 text-white" />
          </span>
          <span className="hidden sm:block text-sm">Support</span>
        </a>
        <Link
          href="/auth"
          className="bg-neutral-900 border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full"
        >
          <span>Get Started</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;

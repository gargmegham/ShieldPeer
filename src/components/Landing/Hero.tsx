import React from "react";
import Spotlight from "@/components/ui/spotlight";
import TestimonialsAvatars from "@/components/Landing/TestimonialsAvatars";
import integrate from "@/assets/icons/integrate.svg";
import priceEmpire from "@/assets/logo/price-empire.svg";
import Link from "next/link";
import waxpeer from "@/assets/logo/waxpeer.svg";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.1] relative overflow-hidden"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Optimized Trading
          <br />
          <span className="text-3xl md:text-6xl">
            Maximize Earnings with ShieldPeer
          </span>
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Our intelligent bot works tirelessly to sell your CS:GO skins at the
          best prices possible on Waxpeer marketplace, earning you more in less
          time. With user-specified parameters, the bot ensures that it
          undercuts other sellers in a way that maximizes your benefits.
        </p>
        <p className="mt-4 flex justify-center space-x-2">
          <Image
            src={integrate}
            alt="Integrate"
            width={100}
            height={100}
            className="w-20 h-20"
          />
          <Image
            src={priceEmpire}
            alt="Integrate"
            width={100}
            height={100}
            className="w-20 h-20 rounded-full p-2 border border-neutral-300/[0.3]"
          />
          <Image
            src={waxpeer}
            alt="Integrate"
            width={100}
            height={100}
            className="w-20 h-20"
          />
        </p>
        <p className="my-4 flex justify-center space-x-2">
          <a
            href="https://calendly.com/megham-garg/session"
            target="_blank"
            rel="noreferrer"
            className="border text-sm font-medium relative border-white/[0.2] text-white w-32 h-12 rounded-xl bg-gray-950 flex items-center justify-center"
          >
            <span>Schedule Demo</span>
          </a>
          <Link
            href="/auth"
            className="border text-sm font-medium relative border-white/[0.2] text-white w-32 h-12 rounded-xl bg-neutral-900 flex items-center justify-center"
          >
            <span>Get Started</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
          </Link>
        </p>
        <TestimonialsAvatars />
      </div>
    </section>
  );
}

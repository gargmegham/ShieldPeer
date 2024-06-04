"use client";

import { FaGift } from "react-icons/fa";
import Link from "next/link";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="bg-grid-white/[0.1] bg-black text-neutral-50"
    >
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <p className="font-medium text-amber-500 mb-8">Pricing</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Start selling now at lightning fast speed!
          </h2>
          <h3 className="mt-2 text-xs font-extrabold text-servcy-cream md:text-lg flex justify-center items-center">
            <FaGift
              name="material-symbols:featured-seasonal-and-gifts-rounded"
              className="text-green-500"
            />
            <span className="ml-1 mr-2 text-green-500">100% off</span>
            for the first 10 customers (3 left)
          </h3>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <span className="badge text-xs text-cream font-semibold border-0 bg-amber-500 p-2 rounded-md">
                POPULAR
              </span>
            </div>
            <div className="absolute -inset-[1px] rounded-[9px] bg-amber-500 z-10"></div>

            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-neutral-950 p-8 rounded-lg">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold">Once</p>
                  <p className="text-zinc-400 mt-2">
                    Limited time offer, valid for first year subscription only
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-end mb-[4px] text-lg">
                  <p className="relative">
                    <span className="absolute h-[1.5px] inset-x-0 top-[53%]"></span>
                    <span className="text-zinc-400 line-through">$490</span>
                  </p>
                </div>
                <p className="text-5xl font-extrabold">$0</p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs uppercase font-semibold">USD/year</p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed flex-1">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Trade unlimited items</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Customise parameters</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Suggest features</span>
                </li>
              </ul>
              <div className="space-y-2">
                <Link
                  href="/auth"
                  className="border text-sm font-medium relative border-white/[0.2] text-white w-32 h-12 rounded-xl bg-neutral-900 flex items-center justify-center"
                >
                  <span>Get Started</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
                </Link>
                <div className="text-sm text-zinc-400">
                  No credit card required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

"use client";

import Image from "next/image";
import Link from "next/link";
import config from "@/utils/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    // Redirect to the app dashboard if the user is authenticated
    router.push("/");
  }

  return (
    <main
      id="auth"
      className="h-screen flex justify-center items-center px-10 bg-grid-white/[0.1]"
    >
      <div className="bg-neutral-950 p-10 rounded-xl relative">
        <Link href="/home" aria-current="page">
          <div className="flex mb-4 justify-center items-center">
            <Image
              src="/logo.svg"
              alt={`${config.appName} logo`}
              priority={true}
              className="w-[100px] h-[100px]"
              width={24}
              height={24}
            />
          </div>
          <div className="font-extrabold tracking-tight text-2xl md:text-4xl">
            {config.appName}
          </div>
        </Link>
        <span className="mt-8 absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import config from "@/utils/config";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

export default function Auth() {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSignup = async (
    e: any,
    options: {
      type: string;
      provider: Provider;
    }
  ) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const { provider } = options;
      const redirectURL = window.location.origin + "/api/auth/callback";
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectURL,
        },
      });
    } catch (error: any) {
      console.error(error?.message ?? error.toString());
    } finally {
      setIsLoading(false);
    }
  };

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
        <button
          className="flex items-center justify-center gap-2 w-full p-2 mt-8 bg-neutral-800 text-neutral-50 rounded-md"
          onClick={(e) =>
            handleSignup(e, { type: "oauth", provider: "google" })
          }
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
        <span className="mt-8 absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
      </div>
    </main>
  );
}

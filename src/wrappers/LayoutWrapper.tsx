"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"

import { ReactNode, useEffect, useState } from "react"

import { GoogleAnalytics } from "@next/third-parties/google"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Crisp } from "crisp-sdk-web"
import { SessionProvider } from "next-auth/react"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "react-hot-toast"
import { Tooltip } from "react-tooltip"

import config from "@/utils/config"

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* Show a progress bar at the top when navigating between pages */}
            <NextTopLoader color={config.colors.main} showSpinner={false} />
            {/* Content inside app/page.js files  */}
            <SessionProvider>{children}</SessionProvider>
            {/* Show Success/Error messages anywhere from the app with toast() */}
            <Toaster
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#333",
                        color: "#fff",
                    },
                    position: "bottom-right",
                    success: {
                        icon: "🎉",
                        duration: 3000,
                    },
                    error: {
                        icon: "🚧",
                        duration: 3000,
                    },
                }}
            />
            {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
            <Tooltip id="tooltip" className="z-[60] !opacity-100 max-w-sm shadow-lg" />
            {/* Clarity for recording user interactions */}
            <Script type="text/javascript" id="clarity-microsoft">
                {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY}");`}
            </Script>
            {/* Google Analytics */}
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA ?? ""} />
        </>
    )
}

export default LayoutWrapper

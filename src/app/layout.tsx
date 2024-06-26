import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

import config from "@/utils/config"

import "@/assets/css/global.css"

import LayoutWrapper from "@/wrappers/LayoutWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: config.appName,
    description: config.appDescription,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html className="dark" lang="en">
            <body className={inter.className}>
                <Link rel="preconnect" href="https://fonts.gstatic.com" />
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    )
}

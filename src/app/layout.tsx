import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/assets/css/global.css"

import LayoutWrapper from "@/wrappers/LayoutWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "ShieldPeer",
    description: "Automate your selling on Waxpeer",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    )
}

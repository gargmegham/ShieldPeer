import config from "@/utils/config"
import { getSEOTags } from "@/utils/seo"

export const metadata = getSEOTags({
    title: `${config.appName} - Demo`,
    keywords: `${config.keywords}, ShieldPeer demo`,
})

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <div className="fixed top-2 w-full justify-center flex">
                <div className="text-xs px-2 py-1 text-amber-600/80 bg-amber-600/20 max-w-xs text-center rounded-xl">
                    This is a demo site. Please don't use real data.
                </div>
            </div>
        </>
    )
}

import { ConfigProps } from "@/types/config"

const config = {
    appName: "ShieldPeer",
    appDescription:
        "ShieldPeer's secure, and intelligent bot helps you sell your Steam assets swiftly on marketplaces like Waxpeer using the latest price data from PriceEmpire. Customize parameters to maximize your benefits. Get started today!",
    domainName: "www.shieldpeer.in",
    keywords:
        "ShieldPeer, Steam, Waxpeer, PriceEmpire, CS:GO, CS2, Skins Marketplace, Steam Skins, Counter Strike Global Offensive, CSGO, CSGO Skins, CSGO Marketplace, CSGO Skins Marketplace, CSGO Trading, CSGO Trade, CSGO Trade Skins",
    crisp: {
        id: process.env.NEXT_PUBLIC_CRISP_ID ?? "",
        onlyShowOnRoutes: ["/", "/auth", "/settings", "/logs"],
    },
    mailgun: {
        subdomain: "mg",
        // REQUIRED — Email 'From' field to be used when sending magic login links
        fromNoReply: `ShieldPeer <noreply@mg.shieldpeer.in>`,
        // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
        fromAdmin: `Megham at ShieldPeer <business@meghamgarg.com>`,
        // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
        supportEmail: "business@meghamgarg.com",
        // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
        forwardRepliesTo: "business@meghamgarg.com",
    },
    colors: {
        // REQUIRED — Will be reflected on the NextTopLoader. HEX only.
        main: "#f59e0b",
    },
    auth: {
        // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/utils/api.js) upon 401 errors from our API
        loginUrl: "/auth",
        // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/utils/api.js) upon 401 errors from our API & in ButtonSignin.js
        callbackUrl: "/",
    },
    socials: {
        twitter: "https://twitter.com/shieldpeer",
        linkedin: "https://www.linkedin.com/company/shield-peer",
        instagram: "https://www.instagram.com/shieldpeer",
        github: "https://www.github.com/gargmegham/ShieldPeer",
        telegram: "https://t.me/shieldpeer",
        youtube: "https://www.youtube.com/@shieldpeer",
    },
} as ConfigProps

export default config

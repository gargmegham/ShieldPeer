import { ConfigProps } from "@/types/config"

const config = {
    appName: "ShieldPeer",
    appDescription:
        "ShieldPeer's secure, and intelligent bot helps you sell your Steam assets swiftly on marketplaces like Waxpeer using the latest price data from PriceEmpire. Customize parameters to maximize your benefits. Get started today!",
    domainName: "www.shieldpeer.in",
    keywords:
        "ShieldPeer, Steam, Waxpeer, PriceEmpire, CS:GO, CS2, Skins Marketplace, Steam Skins, Counter Strike Global Offensive, CSGO, CSGO Skins, CSGO Marketplace, CSGO Skins Marketplace, CSGO Trading, CSGO Trade, CSGO Trade Skins",
    crisp: {
        // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
        id: "30e2a2f2-6d09-4207-bac4-561ae9ebd38e",
        // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
        onlyShowOnRoutes: ["/", "/auth", "/settings", "/logs"],
    },
    mailgun: {
        // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
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
        // REQUIRED — This color will be reflected on the NextTopLoader. HEX only.
        main: "#f59e0b",
    },
    auth: {
        // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/utils/api.js) upon 401 errors from our API
        loginUrl: "/auth",
        // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/utils/api.js) upon 401 errors from our API & in ButtonSignin.js
        callbackUrl: "/",
    },
} as ConfigProps

export default config

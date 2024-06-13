export const prepareSteamOpenIDURL = () => {
    const base = "https://steamcommunity.com/openid/login"
    const params = new URLSearchParams({
        "openid.mode": "checkid_setup",
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.realm": process.env.NEXT_PUBLIC_CLIENT ?? "",
        "openid.sreg.required": "nickname,email,fullname",
        "openid.assoc_handle": "None",
        "openid.return_to": `${process.env.NEXT_PUBLIC_CLIENT}/api/auth/callback/steam`,
        "openid.ns.sreg": "http://openid.net/extensions/sreg/1.1",
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    })
    return `${base}?${params}`
}

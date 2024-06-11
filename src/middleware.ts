import { NextRequest, NextResponse } from "next/server"

import { getSupabaseClient } from "@/utils/supabase"

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - exempted paths i.e. /home, /auth, /api/price-empire, /api/auth, /tos, /privacy-policy, demo
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - robots.txt (robots file for crawlers)
         * - .(svg|png|jpg|jpeg|gif|webp) (image files)
         */
        "/((?!_next/static|robots.txt|_next/image|home|auth|api/price-empire|api/auth|tos|demo|privacy-policy|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const supabase = getSupabaseClient()
    const { data: session } = await supabase.auth.getSession()
    if (session?.session === null) {
        // Redirect to /home if not logged in
        const requestUrl = new URL(request.url)
        return NextResponse.redirect(requestUrl.origin + "/home")
    }
    return response
}

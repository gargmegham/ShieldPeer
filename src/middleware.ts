import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logos (logo files)
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.jpg|logo.png).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const requestPath = request.nextUrl.pathname;
  const supabase = createMiddlewareClient({
    req: request,
    res: response,
  });
  const { data: session } = await supabase.auth.getSession();
  if (
    session?.session === null &&
    !requestPath.startsWith("/home") &&
    !requestPath.startsWith("/auth") &&
    !requestPath.startsWith("/api/auth")
  ) {
    // Redirect to /home if not logged in and not on /home or /auth
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(requestUrl.origin + "/home");
  }
  return response;
}

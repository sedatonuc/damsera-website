import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const pathname = url.pathname;

  // Local development bypass
  const isLocalhost =
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.endsWith(".local") ||
    hostname.includes("192.168.");

  // Check if it is a static asset or legal page
  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/logo.png") ||
    pathname.startsWith("/icon.png") ||
    pathname.includes(".") || // files like sitemap.xml, robot.txt, etc.
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt";

  const isLegalPage =
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/data-rights";

  // Enforce Canonical Domain in Production
  if (!isLocalhost && hostname !== "www.damseraapp.com") {
    // If it's a static file or legal page, keep the path, just switch domain
    if (isStaticFile || isLegalPage) {
      url.hostname = "www.damseraapp.com";
      url.protocol = "https:";
      url.port = "";
      return NextResponse.redirect(url, 301);
    }
    // For anything else, direct straight to root canonical homepage
    return NextResponse.redirect("https://www.damseraapp.com/", 301);
  }

  // Block and Redirect Deep/Sub-Module or Overview Routes
  if (pathname.startsWith("/modules") || pathname.startsWith("/overview")) {
    if (isLocalhost) {
      // Local redirection to local homepage root
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    } else {
      // Production redirection to canonical root homepage
      return NextResponse.redirect("https://www.damseraapp.com/", 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

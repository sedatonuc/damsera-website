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

  // Static assets
  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/logo.png") ||
    pathname.startsWith("/icon.png") ||
    pathname.includes(".") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt";

  // Legal pages
  const isLegalPage =
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/data-rights";

  // Public pages
  const isPublicPage =
    pathname === "/" ||
    pathname === "/overview" ||
    pathname.startsWith("/modules") ||
    isLegalPage ||
    isStaticFile;

  // Canonical domain enforcement
  if (!isLocalhost && hostname !== "www.damseraapp.com") {
    url.hostname = "www.damseraapp.com";
    url.protocol = "https:";
    url.port = "";

    // Keep route path for allowed pages
    if (isPublicPage) {
      return NextResponse.redirect(url, 301);
    }

    // Redirect unknown routes to homepage
    return NextResponse.redirect("https://www.damseraapp.com/", 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
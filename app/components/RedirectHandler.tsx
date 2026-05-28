"use client";

import { useEffect } from "react";

export default function RedirectHandler() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;

      // Check if we are in local development
      const isLocalhost =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".local") ||
        hostname.includes("192.168.");

      if (!isLocalhost) {
        // Redirection rule: If not on correct www domain, OR if visiting sub-modules/overview, redirect to root canonical homepage!
        const isForbiddenPath =
          pathname.startsWith("/modules") ||
          pathname === "/overview";

        if (hostname !== "www.damseraapp.com" || isForbiddenPath) {
          window.location.replace("https://www.damseraapp.com/");
        }
      } else {
        // On localhost, redirect forbidden sub-paths to local root page
        const isForbiddenPath =
          pathname.startsWith("/modules") ||
          pathname === "/overview";

        if (isForbiddenPath) {
          window.location.replace("/");
        }
      }
    }
  }, []);

  return null;
}

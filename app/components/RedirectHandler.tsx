"use client";

import { useEffect } from "react";

export default function RedirectHandler() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;
      const search = window.location.search;

      // Check if we are in local development
      const isLocalhost =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".local") ||
        hostname.includes("192.168.");

      if (!isLocalhost) {
        // Canonical Domain Redirect: ensure production visitors are always on www.damseraapp.com
        if (hostname !== "www.damseraapp.com") {
          window.location.replace(`https://www.damseraapp.com${pathname}${search}`);
        }
      }
    }
  }, []);

  return null;
}

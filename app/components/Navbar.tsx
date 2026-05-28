"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const homeLinks = [
  { label: "Overview", href: "/overview" },
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === "/";

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome) {
      return `/${href}`;
    }
    return href;
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-5">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <Logo className="h-7 w-7 text-[#1f2428]" />
          <span className="text-sm font-semibold tracking-tight text-[#1f2428]">
            Damsera
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#697077] md:flex">
          {homeLinks.map((link) => (
            <a
              key={link.label}
              href={resolveHref(link.href)}
              className="transition hover:text-[#1f2428]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={isHome ? "#pricing" : "/#pricing"}
            className="hidden rounded-full bg-[#1f2428] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black md:inline-block"
          >
            Download
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-[#1f2428] shadow-sm hover:bg-[#1f2428]/5 transition md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-4 w-4" strokeWidth={2.5} /> : <Menu className="h-4 w-4" strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphic Navigation Panel */}
      {isOpen && (
        <div className="fixed inset-x-6 top-[88px] z-40 max-h-[calc(100vh-110px)] overflow-y-auto rounded-3xl border border-black/5 bg-white/95 p-6 shadow-xl backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-6">
            
            {/* Home Navigation links */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a0a5a8]">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {homeLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={resolveHref(link.href)}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-2xl border border-black/5 bg-neutral-50/60 px-4 py-3.5 text-xs font-bold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-white"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1f2428]/30" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Download call */}
            <div className="pt-2">
              <Link
                href={isHome ? "#pricing" : "/#pricing"}
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-2xl bg-[#1f2428] py-3.5 text-center text-xs font-bold text-white transition hover:bg-black"
              >
                Download App
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
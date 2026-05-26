"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  CreditCard,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
  ReceiptText,
  Repeat,
  Shield,
  Target,
  WalletCards,
  Menu,
  X,
} from "lucide-react";
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

const moduleLinks = [
  { label: "Dashboard", href: "/modules/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/modules/transactions", icon: ReceiptText },
  { label: "Budgets", href: "/modules/budgets", icon: WalletCards },
  { label: "Cashflow", href: "/modules/cashflow", icon: LineChart },
  { label: "Calendar", href: "/modules/calendar", icon: CalendarDays },
  { label: "Subscriptions", href: "/modules/subscriptions", icon: Repeat },
  { label: "Debts", href: "/modules/debts", icon: CreditCard },
  { label: "Loans", href: "/modules/loans", icon: Landmark },
  { label: "Goals", href: "/modules/goals", icon: Target },
  { label: "Reports", href: "/modules/reports", icon: BarChart3 },
  { label: "Insights", href: "/modules/insights", icon: BrainCircuit },
  { label: "Notifications", href: "/modules/notifications", icon: Bell },
  { label: "System", href: "/modules/system", icon: Shield },
];

function NavPillButton({
  href,
  label,
  icon,
  isActive = false,
  compact = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`group relative flex h-10 items-center justify-center overflow-hidden rounded-full text-sm font-semibold transition-all duration-300 ${
        compact ? "w-10 md:hover:w-[152px]" : "w-10 md:hover:w-[140px]"
      } ${
        isActive
          ? "bg-[#1f2428] text-white"
          : "bg-transparent text-[#1f2428] hover:bg-[#1f2428]/6"
      }`}
    >
      <span className="absolute transition-all duration-300 md:group-hover:-translate-x-12 md:group-hover:opacity-0">
        {icon}
      </span>

      <span
        className={`hidden whitespace-nowrap opacity-0 transition-all duration-300 md:block ${
          compact
            ? "translate-x-8 md:group-hover:translate-x-0 md:group-hover:opacity-100"
            : "translate-x-6 md:group-hover:translate-x-0 md:group-hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function NavbarSeparator() {
  return <div className="mx-2 hidden h-6 w-px bg-[#1f2428]/15 md:block" />;
}

function ModuleButtonList({ pathname }: { pathname: string }) {
  return (
    <div className="hidden items-center gap-2 xl:flex">
      {moduleLinks.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <NavPillButton
            key={item.label}
            href={item.href}
            label={item.label}
            isActive={isActive}
            icon={<Icon className="h-4 w-4" strokeWidth={2.2} />}
          />
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === "/";
  const isOverview = pathname === "/overview";
  const isModulePage = pathname.startsWith("/modules");

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome && !isOverview) {
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
        {isModulePage ? (
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
            <NavPillButton
              href="/overview"
              label="Back to Overview"
              icon={<ArrowLeft className="h-4 w-4" />}
              compact
            />

            <NavPillButton
              href="/"
              label="Back to Main Page"
              icon={<Home className="h-4 w-4" />}
              compact
            />

            <NavbarSeparator />

            <ModuleButtonList pathname={pathname} />
          </div>
        ) : (
          <div className="hidden items-center gap-8 text-sm font-medium text-[#697077] md:flex">
            {isOverview ? (
              <>
                <NavPillButton
                  href="/"
                  label="Back Home"
                  icon={<ArrowLeft className="h-4 w-4" />}
                  compact
                />

                <NavbarSeparator />

                <ModuleButtonList pathname={pathname} />
              </>
            ) : (
              homeLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-[#1f2428]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={resolveHref(link.href)}
                    className="transition hover:text-[#1f2428]"
                  >
                    {link.label}
                  </a>
                )
              )
            )}
          </div>
        )}

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2">
          {!isModulePage && (
            <Link
              href={isHome ? "#pricing" : "/#pricing"}
              className="hidden rounded-full bg-[#1f2428] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black md:inline-block"
            >
              Download
            </Link>
          )}

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
            
            {/* Context Back Buttons (For overview or modules) */}
            {(isOverview || isModulePage) && (
              <div className="grid grid-cols-2 gap-2 border-b border-neutral-100 pb-5">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 bg-neutral-50 py-3 text-xs font-bold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-white"
                >
                  <Home className="h-3.5 w-3.5" />
                  Main Page
                </Link>
                <Link
                  href="/overview"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 bg-neutral-50 py-3 text-xs font-bold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Overview
                </Link>
              </div>
            )}

            {/* Home Navigation links */}
            {!isModulePage && !isOverview && (
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a0a5a8]">Navigation</h4>
                <div className="grid grid-cols-2 gap-2">
                  {homeLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href.startsWith("/") ? link.href : resolveHref(link.href)}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 rounded-2xl border border-black/5 bg-neutral-50/60 px-4 py-3.5 text-xs font-bold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-white"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1f2428]/30" />
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/overview"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-2xl border border-black/5 bg-neutral-50/60 px-4 py-3.5 text-xs font-bold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-white"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Overview
                  </Link>
                </div>
              </div>
            )}

            {/* Application Modules Grid (For quick jumping anywhere) */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a0a5a8]">App Modules</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {moduleLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition ${
                        isActive
                          ? "border-[#1f2428] bg-[#1f2428] text-white"
                          : "border-black/5 bg-neutral-50/70 text-[#5f6b73] hover:bg-[#1f2428]/5 hover:text-[#1f2428]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
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